#!/usr/bin/env node
/**
 * check-references.mjs — the reference lint (ADR-004, known gap).
 *
 * This corpus cites documents two ways, and only one of them is safe:
 *
 *   1. Markdown links   [text](../path/doc.md)   — breakable, and visible
 *   2. Plain-text IDs   "see MIS-085"            — breakable, and INVISIBLE
 *
 * There are ~1,600 mentions of the second kind. No tool has ever validated
 * them, so a rename or a folder move breaks meaning without breaking a build.
 * This script is the missing verification: it is what makes the archive
 * restructuring a verifiable operation instead of a bet.
 *
 *   node scripts/check-references.mjs              # verify against baseline
 *   node scripts/check-references.mjs --report     # full detail, exit 0
 *   node scripts/check-references.mjs --write-baseline
 *
 * Baseline: 14 markdown links are already broken in main. Failing on those
 * on day one would mean the check never gets adopted. Instead the current
 * damage is frozen in scripts/references-baseline.json and the script fails
 * only on NEW breakage — a ratchet, not a cliff.
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

/** Identifier prefixes that name a real series (ADR-004 §1). */
const SERIES = {
  MIS: 'missions',
  ADR: 'decisions',
  DEC: 'decisions',
  P: 'protocols',
  RPT: 'reports/daily',
};

const files = execFileSync('git', ['-C', ROOT, 'ls-files', '*.md'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

/* ---------- 1. Build the index of what actually exists ---------- */

const known = new Set();        // every identifier that resolves to a document
const idOwner = new Map();      // identifier -> file that defines it

for (const rel of files) {
  const base = path.basename(rel, '.md');
  const m = base.match(/^([A-Z]+)-(\d{1,4}|\d{4}-\d{2}-\d{2})/);
  if (m) {
    const id = `${m[1]}-${m[2]}`;
    known.add(id);
    idOwner.set(id, rel);
  }
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

// Identifiers we deliberately do not resolve here:
//  - C-NNN  : canon/ does not apply the scheme consistently yet (ADR-004 ⚠)
//  - BP-*   : blueprints use slugs, not numbers
//  - CON-*, FLAG-*, D-* : registers that live in prose, not as documents
const IGNORED_PREFIX = /^(C|BP|CON|FLAG|D|SEC|ARC|G|S|MISSION)-/;

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
const isPrinciple = (prefix, num) => prefix === 'P' && /^\d{1,2}$/.test(num);

const ID_RE = /\b(MIS|ADR|DEC|RPT|P)-(\d{1,4}|\d{4}-\d{2}-\d{2})\b/g;
const LINK_RE = /\[[^\]]*\]\(([^)\s#]+\.md)(?:#[^)]*)?\)/g;

for (const rel of files) {
  const abs = path.join(ROOT, rel);
  const text = readFileSync(abs, 'utf8');
  const body = text.replace(/^---\s*\n[\s\S]*?\n---/, '');

  // --- markdown links ---
  for (const m of body.matchAll(LINK_RE)) {
    const target = m[1];
    if (/^(https?:|mailto:)/.test(target)) continue;
    const resolved = path.normalize(path.join(path.dirname(abs), target));
    if (!existsSync(resolved)) {
      brokenLinks.push({ from: rel, link: target });
    }
  }

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
}

/* ---------- 3. Compare against the baseline ---------- */

const key = (o) => (o.link ? `LINK ${o.from} -> ${o.link}` : `ID   ${o.from} -> ${o.id}`);
const current = [...brokenLinks, ...unknownIds].map(key).sort();

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

console.log(`reference lint: ${files.length} documents · ${known.size} identifiers indexed`);
console.log(
  `  broken markdown links : ${brokenLinks.length}\n` +
    `  unresolved identifiers: ${unknownIds.length}\n` +
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
