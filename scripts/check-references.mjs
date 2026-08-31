#!/usr/bin/env node
/**
 * check-references.mjs — the reference lint (ADR-004, known gap).
 *
 * This corpus cites documents THREE ways, and only one of them was ever
 * safe:
 *
 *   1. Markdown links     [text](../path/doc.md)   — breakable, and visible
 *   2. Plain-text IDs     "see MIS-085"             — breakable, INVISIBLE
 *   3. Bare filenames     "see credential-map.md"   — breakable, INVISIBLE,
 *                         and the ONLY way to cite a `registration: exempt`
 *                         document (it has no PREFIX-NNN by design, so check
 *                         2 can never see it). Added MIS-125 (2026-08-31),
 *                         after D-024 closed 24 exempt documents into the
 *                         prefix scheme and this script turned out unable to
 *                         verify a single one of their citations.
 *
 * There are ~1,600+ mentions of kind 2 and, measured on just 2 of the 24
 * newly-registering documents, 29 more of kind 3 — no tool had ever
 * validated either, so a rename or a folder move breaks meaning without
 * breaking a build. This script is the missing verification: it is what
 * makes the archive restructuring a verifiable operation instead of a bet.
 *
 *   node scripts/check-references.mjs              # verify against baseline
 *   node scripts/check-references.mjs --report     # full detail, exit 0
 *   node scripts/check-references.mjs --write-baseline
 *
 * Baseline: known-broken references are frozen at adoption time (kinds 1
 * and 2 originally; kind 3 baselined MIS-125, 2026-08-31, since it had
 * never been measured before and could not honestly start at zero).
 * Failing on pre-existing damage on day one would mean the check never
 * gets adopted. Instead the current damage is frozen in
 * scripts/references-baseline.json and the script fails only on NEW
 * breakage — a ratchet, not a cliff.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = path.join(ROOT, 'scripts', 'references-baseline.json');

const args = process.argv.slice(2);
const REPORT = args.includes('--report');
const WRITE = args.includes('--write-baseline');

/** Identifier prefixes that name a real series (ADR-005 v1.1.0, the
 * 13-series register, MIS-125 2026-08-31). Superseded the 5-prefix map
 * this script shipped with (MIS/ADR/DEC/P/RPT only) — that map went blind
 * to every rename this same mission performs, which would have made this
 * guard's "exit 0" a false green light. */
const SERIES = {
  MIS: 'missions',
  ADR: 'decisions',
  DEC: 'decisions',
  PRO: 'protocols',
  RPT: 'reports',
  DBT: 'debt',
  STD: 'standards',
  CAN: 'canon',
  OPS: 'operations',
  BLU: 'blueprints',
  GLD: 'guilds',
  INF: 'infra',
};

const files = execFileSync('git', ['-C', ROOT, 'ls-files', '*.md'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

// D-049: this guard reads the INDEX, not the working tree. A .md file that
// exists on disk but has not been `git add`ed is invisible here — the guard
// cannot disagree about input it was never given (D-039, sharper form).
// Say so, and refuse to bank a baseline that would omit it.
const untracked = execFileSync('git', ['-C', ROOT, 'ls-files', '--others', '--exclude-standard', '*.md'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);
if (untracked.length) {
  console.warn(`\n\u26a0 ${untracked.length} untracked .md file(s) — NOT scanned (this guard reads git ls-files, D-049):`);
  for (const f of untracked) console.warn(`    ${f}`);
  console.warn('  A green result here says nothing about them. `git add` them first.\n');
}

/* ---------- 1. Build the index of what actually exists ---------- */

const known = new Set();        // every identifier that resolves to a document
const idOwner = new Map();      // identifier -> file that defines it
const basenames = new Set();    // every current file's bare basename ("credential-map.md")
const basenameOwner = new Map();

for (const rel of files) {
  const base = path.basename(rel, '.md');
  const m = base.match(/^([A-Z]+)-(\d{1,4}|\d{4}-\d{2}-\d{2})/);
  if (m) {
    const id = `${m[1]}-${m[2]}`;
    known.add(id);
    idOwner.set(id, rel);
  }
  const bareName = path.basename(rel);
  basenames.add(bareName);
  if (!basenameOwner.has(bareName)) basenameOwner.set(bareName, rel);
  // an identifier may also be declared in frontmatter without being in the name
  const text = readFileSync(path.join(ROOT, rel), 'utf8');
  const fm = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (fm) {
    const decl = fm[1].match(/^id:\s*["']?([A-Z]+-[\w-]+)/m);
    if (decl) {
      known.add(decl[1]);
      if (!idOwner.has(decl[1])) idOwner.set(decl[1], rel);
    }
  }
}

/* ---------- 2. Walk every document looking for references ---------- */

const brokenLinks = [];
const unknownIds = [];
const crossRepo = [];   // identifiers that belong to another repo's namespace
const unknownFilenames = [];  // bare "some-doc.md" mentions that resolve to nothing

// Identifiers we deliberately do not resolve here:
//  - CON-*, FLAG-*, SEC-*, ARC-*, G-*, MISSION- : registers that live in
//    prose, not as documents
//  - BP-* : the OLD blueprints slug scheme (MIS-125 replaces it with
//    BLU-NNN, which DOES resolve below — not ignored)
// Historically this also ignored C-/D-/S- (canon/debt/standards) because
// those series did not apply their scheme consistently. MIS-125
// (2026-08-31) is precisely the mission that makes them consistent
// (CAN-/DBT-/STD-NNN) — leaving them ignored would make this guard blind
// to exactly the breakage it exists to catch.
const IGNORED_PREFIX = /^(CON|FLAG|SEC|ARC|G|MISSION|BP)-/;

/**
 * ADR-006 … ADR-022 exist in numengames/numinia-web, not here. ADR-004 §7
 * requires cross-repo citations to be qualified (web:ADR-012), but ~20
 * mission briefs predate that rule and cite them bare.
 *
 * Reporting them as "missing" would be wrong — the document exists, just not
 * in this repository. They are counted separately so the real signal (a
 * citation to something that exists NOWHERE) is not buried under them.
 */
const WEB_ADR_RANGE = (n) => n >= 6 && n <= 22;

/**
 * `P-NN` (two digits) in archive-summa-fundacional means "operating principle
 * 01…12", a numbered list inside that document — not protocol P-001. Protocol
 * identifiers are always three digits (ADR-004 §1). Same for MIS-999, which is
 * the placeholder used in examples.
 */
const isExample = (id) => id === 'MIS-999';
// Dead since ID_RE dropped bare 'P' (protocols moved P- -> PRO-, MIS-125):
// archive-summa-fundacional's "P-01..P-12" principle numbers can no longer
// match ID_RE at all, so this guard never fires. Left in rather than
// deleted — harmless, and documents why P-01..12 were never a citation risk.
const isPrinciple = (prefix, num) => prefix === 'P' && /^\d{1,2}$/.test(num);

const ID_RE = /\b(MIS|ADR|DEC|RPT|PRO|DBT|STD|CAN|OPS|BLU|GLD|INF)-(\d{1,4}|\d{4}-\d{2}-\d{2})\b/g;
const LINK_RE = /\[[^\]]*\]\(([^)\s#]+\.md)(?:#[^)]*)?\)/g;
// Kind 3: a bare filename mentioned in prose, outside markdown link syntax
// — "see credential-map.md", "documented in APPROVAL-REQUEST-template.md".
// Matches path-or-basename fragments ending in .md; resolved against every
// CURRENT basename in the corpus (not full path — citations are casual and
// rarely include the folder, exactly per D-008/D-024's own finding).
const BARE_FILENAME_RE = /(?:^|[\s(`"'])((?:[\w-]+\/)*[\w][\w.-]*\.md)\b/g;

for (const rel of files) {
  const abs = path.join(ROOT, rel);
  const text = readFileSync(abs, 'utf8');
  const body = text.replace(/^---\s*\n[\s\S]*?\n---/, '');
  const ownBase = path.basename(rel);

  // --- markdown links --- (track their ranges so kind-3 doesn't recount them)
  const linkRanges = [];
  for (const m of body.matchAll(LINK_RE)) {
    linkRanges.push([m.index, m.index + m[0].length]);
    const target = m[1];
    if (/^(https?:|mailto:)/.test(target)) continue;
    const resolved = path.normalize(path.join(path.dirname(abs), target));
    if (!existsSync(resolved)) {
      brokenLinks.push({ from: rel, link: target });
    }
  }
  const insideLink = (i) => linkRanges.some(([s, e]) => i >= s && i < e);

  // --- plain-text identifiers ---
  const seen = new Set();
  for (const m of body.matchAll(ID_RE)) {
    const id = `${m[1]}-${m[2]}`;
    if (seen.has(id)) continue;          // count each id once per document
    seen.add(id);
    if (IGNORED_PREFIX.test(id)) continue;
    if (isExample(id) || isPrinciple(m[1], m[2])) continue;
    if (id === path.basename(rel, '.md').slice(0, id.length)) continue;  // self
    if (known.has(id)) continue;
    // an ADR in web's range is not missing — it is elsewhere, cited unqualified
    if (m[1] === 'ADR' && WEB_ADR_RANGE(Number(m[2]))) {
      crossRepo.push({ from: rel, id });
      continue;
    }
    unknownIds.push({ from: rel, id });
  }

  // --- bare filenames (kind 3) ---
  const seenFile = new Set();
  for (const m of body.matchAll(BARE_FILENAME_RE)) {
    if (insideLink(m.index)) continue;             // already checked as a link
    const cited = m[1];
    const bare = path.basename(cited);
    if (bare === ownBase) continue;                // self-citation
    if (seenFile.has(bare)) continue;
    seenFile.add(bare);
    if (basenames.has(bare)) continue;              // resolves, current corpus
    unknownFilenames.push({ from: rel, file: cited });
  }
}

/* ---------- 3. Compare against the baseline ---------- */

const key = (o) => (o.link ? `LINK ${o.from} -> ${o.link}` : o.id ? `ID   ${o.from} -> ${o.id}` : `FILE ${o.from} -> ${o.file}`);
const current = [...brokenLinks, ...unknownIds, ...unknownFilenames].map(key).sort();

if (WRITE) {
  writeFileSync(
    BASELINE,
    JSON.stringify(
      {
        _comment:
          'Known-broken references frozen at adoption time. The lint fails only on NEW breakage. ' +
          'This list should shrink over time and never grow. Regenerate only when fixing entries.',
        generated: new Date().toISOString(),
        count: current.length,
        entries: current,
      },
      null,
      2,
    ) + '\n',
  );
  console.log(`baseline written: ${current.length} known-broken references`);
  process.exit(0);
}

const baseline = existsSync(BASELINE)
  ? new Set(JSON.parse(readFileSync(BASELINE, 'utf8')).entries)
  : new Set();

const added = current.filter((c) => !baseline.has(c));
const fixed = [...baseline].filter((b) => !current.includes(b));

/* ---------- 4. Report ---------- */

console.log(`reference lint: ${files.length} documents · ${known.size} identifiers indexed · ${basenames.size} filenames indexed`);
console.log(
  `  broken markdown links : ${brokenLinks.length}\n` +
    `  unresolved identifiers: ${unknownIds.length}\n` +
    `  unresolved filenames  : ${unknownFilenames.length}  (kind 3 — bare "doc.md" mentions, MIS-125)\n` +
    `  cross-repo, unqualified: ${crossRepo.length}  (ADR-004 §7 — informational)\n` +
    `  baseline              : ${baseline.size}`,
);

if (REPORT) {
  if (brokenLinks.length) {
    console.log('\n— broken markdown links —');
    for (const b of brokenLinks) console.log(`  ${b.from}\n      -> ${b.link}`);
  }
  if (unknownIds.length) {
    console.log('\n— identifiers cited but not found anywhere —');
    for (const u of unknownIds) console.log(`  ${u.from}\n      -> ${u.id}`);
  }
  if (unknownFilenames.length) {
    console.log('\n— bare filenames cited but not found in the current corpus —');
    for (const u of unknownFilenames) console.log(`  ${u.from}\n      -> ${u.file}`);
  }
  if (crossRepo.length) {
    console.log('\n— cross-repo citations missing their qualifier (ADR-004 §7) —');
    const byId = new Map();
    for (const c of crossRepo) byId.set(c.id, (byId.get(c.id) || 0) + 1);
    for (const [id, n] of [...byId].sort()) console.log(`  ${id}  ×${n}  → should read web:${id}`);
  }
  process.exit(0);
}

if (fixed.length) {
  console.log(`\n✓ ${fixed.length} previously-broken reference(s) now resolve.`);
  console.log('  Run --write-baseline to lock the improvement in.');
  for (const f of fixed.slice(0, 10)) console.log(`    ${f}`);
}

if (added.length) {
  console.error(`\n✗ ${added.length} NEW broken reference(s):\n`);
  for (const a of added) console.error(`    ${a}`);
  console.error(
    '\nA reference in this corpus is usually plain text, so nothing else would\n' +
      'have caught this. Fix the reference, or update the baseline deliberately.',
  );
  process.exit(1);
}

console.log('\n✓ no new broken references.');
