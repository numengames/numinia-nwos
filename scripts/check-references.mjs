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
 *   node scripts/check-references.mjs              # every broken reference; exit 1 only if one binds
 *   node scripts/check-references.mjs --report     # full detail, exit 0
 *
 * Every finding is printed. Whether one fails the build is the regime's
 * call (ENG-067): only while STD-020 is `active`.
 */
import { execFileSync } from 'node:child_process';
import { declareBlindSpots } from './lib/blindness.mjs';
import { loadRules, prefixToDir, stripFM, parseFM } from './lib/frontmatter.mjs';
import { isPhotograph } from './lib/rings.mjs';
import { Findings } from './lib/regime.mjs';
declareBlindSpots('check-references');
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const REPORT = args.includes('--report');

/** Identifier prefixes that name a real series (ADR-005 v1.1.0, the
 * 13-series register, MIS-125 2026-08-31). Superseded the 5-prefix map
 * this script shipped with (MIS/ADR/DEC/P/RPT only) — that map went blind
 * to every rename this same mission performs, which would have made this
 * guard's "exit 0" a false green light. */
/* Series register: scripts/lib/rules.json since MIS-138 (2026-09-02) — one
   map shared with lint-naming, lint-frontmatter and the telemetry instrument.
   `prefixToDir` includes the retired D- prefix (rules.json `retiredPrefixes`),
   which this guard must keep resolving — see the ID_RE note below. */
const RULES = loadRules();
const PREFIX_DIR = prefixToDir(RULES);

/* RETIRED IDENTIFIERS (ADR-043 rule 8, ADR-041). A document is deleted when
   no living document depends on it normatively; the historical mentions that
   remain — in decisions, closed missions, the changelog — are kept as written.
   Those citations are not broken: git is the archive, so an identifier whose
   file was deleted resolves against `git log`, to the file that carried it.
   Only identifiers that NEVER existed in this repository are unresolved.
   `known` (below) is what the tree has; this is what the tree had. */
const retired = new Map();  // id -> last path that carried it
for (const line of execFileSync('git', ['-C', ROOT, 'log', '--diff-filter=D', '--name-only', '--format=', '--', '*.md'], { encoding: 'utf8' }).split('\n')) {
  const base = path.basename(line.trim(), '.md');
  const m = base.match(/^([A-Z]{2,5})-(\d{3,4})/);
  if (m && !retired.has(`${m[1]}-${m[2]}`)) retired.set(`${m[1]}-${m[2]}`, line.trim());
}
const retiredBase = new Set([...retired.values()].map((p) => path.basename(p)));

const files = execFileSync('git', ['-C', ROOT, 'ls-files', '*.md'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

// D-049: this guard reads the INDEX, not the working tree. A .md file that
// exists on disk but has not been `git add`ed is invisible here — the guard
// cannot disagree about input it was never given (D-039, sharper form).
// Say so.
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
    // ABSORBED IDENTIFIERS (ADR-030, MIS-127). When records merge, the
    // absorbed reasoning survives inside the absorbing document and its
    // identifier keeps resolving — to the record that now contains it.
    // Without this, a merge looks identical to a deletion: every citation
    // of the absorbed ID reports broken, and the guard would force the
    // corpus to choose between consolidating and staying verifiable.
    //
    // Reachability, not file existence, is what ADR-030 requires.
    const abs = fm[1].match(/^absorbs:\s*\[(.*?)\]/m);
    if (abs) {
      for (const raw of abs[1].split(',')) {
        const id = raw.trim().replace(/^["']|["']$/g, '');
        if (!id) continue;
        known.add(id);
        if (!idOwner.has(id)) idOwner.set(id, rel);
      }
    }
    // ADR-004 rule 4 never frees a renumbered document's old identifier, and
    // ADR-035 requires the new file to declare it in `former_id`. A citation
    // to that old identifier is therefore not broken — it resolves here, to
    // the document that used to carry it. Without this, every renumbering
    // breaks every historical citation of the thing it renumbered, and the
    // only way to stay green would be to stop writing down what moved.
    const former = fm[1].match(/^former_id:\s*["']?([A-Z]+-[\w-]+)/m);
    if (former) {
      known.add(former[1]);
      if (!idOwner.has(former[1])) idOwner.set(former[1], rel);
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

// `D` is the debt series' ON-DISK prefix. ADR-005 v1.1.0 registered the series
// as DBT-NNN, and the comment above says C-/D-/S- are no longer ignored — but
// `D` was never added to this alternation, so every D-NNN citation in the
// corpus was invisible to this guard. Proven by probe (RPT-001 §3): a file
// citing ADR-<nonexistent>, DBT-<nonexistent> and D-<nonexistent> reported
// two of three. The debt refactor rewrites ~1,100 D-NNN citations; without
// this the guard would run clean over every one of them without reading one.
// That is D-039's vacuous green, in the guard that exists to prevent it.
//
// `SYS` arrived independently on main (ADR-035 / MIS-129, the system/ shelf).
// Both prefixes are kept: the two changes are additive, not competing — each
// side taught this guard to see a series it was blind to.
const ID_RE = new RegExp(`\\b(${Object.keys(PREFIX_DIR).join('|')})-(\\d{1,4}|\\d{4}-\\d{2}-\\d{2})\\b`, 'g');
const LINK_RE = /\[[^\]]*\]\(([^)\s#]+\.md)(?:#[^)]*)?\)/g;
// Kind 3: a bare filename mentioned in prose, outside markdown link syntax
// — "see credential-map.md", "documented in APPROVAL-REQUEST-template.md".
// Matches path-or-basename fragments ending in .md; resolved against every
// CURRENT basename in the corpus (not full path — citations are casual and
// rarely include the folder, exactly per D-008/D-024's own finding).
const BARE_FILENAME_RE = /(?:^|[\s(`"'])((?:[\w-]+\/)*[\w][\w.-]*\.md)\b/g;

/* A PLACEHOLDER is not a citation. "Copy this to missions/MIS-NNNN-slug.md"
 * names a shape, not a document, and no document will ever have that name.
 *
 * MIS-145 v2 (2026-09-04). Before this, the guard could not tell the two
 * apart, so the nine placeholder patterns already written across the corpus —
 * MIS-NNN-english-slug.md, RPT-YYYY-MM-DD.md, YYYY_MM_DD-Title-vX.Y.Z.md and
 * the rest — were silenced by adding them to the baseline one at a time. That
 * works until you write a template library, at which point every mould in it
 * documents its own destination and the baseline grows by two dozen entries
 * that will never resolve by design.
 *
 * The baseline is for real breakage awaiting repair. A shape is not breakage.
 * Recognising placeholders removes those nine entries and stops the class. */
const PLACEHOLDER_RE = /(^|[^A-Za-z])(N{3,}|X{3,}|YYYY|MM|DD|PREFIX|SLUG|TITLE|vX\.Y\.Z)([^A-Za-z]|$)/;
const isPlaceholder = (cited) =>
  PLACEHOLDER_RE.test(cited) || /[<>{}]/.test(cited) || /\bslug\b/.test(cited);

/* CIT-053 (ADR-041): a broken link inside a closed record is a photograph,
 * not a defect. A `done` mission or a `withdrawn` standard describes what
 * was true then; forcing it to keep resolving would make every deletion
 * either rewrite closed records or grow the baseline forever. Closed records
 * are therefore not walked as citers. They ARE still indexed above, so a
 * living document citing them keeps resolving. What counts as closed is one
 * predicate — isPhotograph: a terminal status (STD-016 `_terminal`), or a
 * series whose threshold is `closed` (STD-001: every report is one from the
 * day it is published, whatever its status says). */
const isClosedRecord = (rel, text) => isPhotograph(rel, parseFM(text)?.status, RULES);
let skippedClosed = 0;

for (const rel of files) {
  const abs = path.join(ROOT, rel);
  const text = readFileSync(abs, 'utf8');
  if (isClosedRecord(rel, text)) { skippedClosed++; continue; }
  const body = stripFM(text);
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
    if (retired.has(id)) continue;     // deleted under ADR-043 rule 8: resolves in git history
    // an ADR in web's range is not missing — it is elsewhere, cited unqualified
    if (m[1] === 'ADR' && WEB_ADR_RANGE(Number(m[2]))) {
      crossRepo.push({ from: rel, id });
      continue;
    }
    // a document that emigrated is elsewhere, not gone
    unknownIds.push({ from: rel, id });
  }

  // --- bare filenames (kind 3) ---
  const seenFile = new Set();
  for (const m of body.matchAll(BARE_FILENAME_RE)) {
    if (insideLink(m.index)) continue;             // already checked as a link
    const cited = m[1];
    const bare = path.basename(cited);
    if (bare === ownBase) continue;                // self-citation
    if (isPlaceholder(cited)) continue;            // a shape, not a document
    if (seenFile.has(bare)) continue;
    seenFile.add(bare);
    if (basenames.has(bare)) continue;              // resolves, current corpus
    if (retiredBase.has(bare)) continue;            // resolves in git history (ADR-043 rule 8)
    unknownFilenames.push({ from: rel, file: cited });
  }
}

/* ---------- 3. Report ---------- */

const key = (o) => (o.link ? `LINK ${o.from} -> ${o.link}` : o.id ? `ID   ${o.from} -> ${o.id}` : `FILE ${o.from} -> ${o.file}`);
const current = [...brokenLinks, ...unknownIds, ...unknownFilenames].map(key).sort();

console.log(`reference lint: ${files.length} documents · ${known.size} identifiers indexed · ${basenames.size} filenames indexed`);
console.log(
  `  broken markdown links : ${brokenLinks.length}\n` +
    `  unresolved identifiers: ${unknownIds.length}\n` +
    `  unresolved filenames  : ${unknownFilenames.length}  (kind 3 — bare "doc.md" mentions)\n` +
    `  cross-repo, unqualified: ${crossRepo.length}  (ADR-004 §7 — informational)`,
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

/* ENG-067: a broken reference is a thing cited that does not exist —
   GIT-048 (STD-020, "Nothing is deleted while cited"). It binds by that
   standard's state. This guard reads body links, bare identifiers and
   filenames; it does not read frontmatter relations (HDR-016 is not here). */
if (current.length)
  console.error(`\n${current.length} broken reference(s) — a reference in this corpus is usually plain text, so nothing else would have caught this.\n`);
const out = new Findings('check-references');
for (const a of current) { const m = /^(\S+)\s+(\S+) -> (.*)$/.exec(a); out.add('GIT-048', `${m[1]} -> ${m[3]}`, m[2]); }
out.finish({ ok: 'no broken references.' });
