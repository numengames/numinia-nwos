#!/usr/bin/env node
/**
 * lint-naming.mjs — the filename lint (STD-001 §9, D-001 item 3).
 *
 * STD-001 §9 states three rules about filenames that no instrument checked
 * before this one:
 *
 *   1. Series documents: `<PREFIX>-<NNN|NNNN>-<slug-kebab-case>.md`
 *   2. Never a version or a date in the filename of a LIVING document —
 *      git carries history, `version:` carries the version. Dated names
 *      are reserved for frozen artifacts (P-010 §3.2).
 *   3. Root documents: `UPPERCASE.md`.
 *
 *   node scripts/lint-naming.mjs                  # verify vs baseline
 *   node scripts/lint-naming.mjs --report         # full detail, exit 0
 *   node scripts/lint-naming.mjs --write-baseline # freeze current state
 *
 * Enforcement pattern (same as lint-frontmatter.mjs, STD-004 §7): strict on
 * the delta, baseline on the stock. Violations present at adoption are
 * frozen in scripts/naming-baseline.json — allowed to exist, not to grow.
 *
 * WHAT THIS GUARD DOES NOT CHECK (D-025 — declare your blindness):
 *
 *  - **Whether the slug is actually English.** STD-001 §9 says "english
 *    kebab-case"; this guard verifies the *shape* (lowercase, hyphens,
 *    no underscores/spaces) but cannot verify the *language*. A Spanish
 *    slug in valid kebab-case passes. Same class of gap as STD-001's own
 *    admission about `lint-type-vs-folder.mjs` and documentation/meta:
 *    mechanizable up to a point, [MANUAL] past it.
 *  - **Whether the numeric part is actually free of gaps or collisions.**
 *    That is `check-references.mjs`'s job (duplicate/gap detection over
 *    the id space), not this guard's — this one only checks the filename
 *    SHAPE matches its series' scheme.
 *  - **`agents/`.** Explicitly out of scope: ADR-005 v1.1.0 reversed the
 *    prefix ruling for that series — it is identified by folder name, not
 *    filename, so no naming scheme applies there at all.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { declareBlindSpots } from './lib/blindness.mjs';
declareBlindSpots('lint-naming');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = path.join(ROOT, 'scripts', 'naming-baseline.json');
const args = process.argv.slice(2);
const REPORT = args.includes('--report');
const WRITE = args.includes('--write-baseline');

/** ADR-005 v1.1.0 — the 13-series register, current as of MIS-125.
 *  NOT the stale 8-series map in lint-frontmatter.mjs's PREFIX constant —
 *  that one still reads `debt: 'D'`, `standards: 'S'`, `protocols: 'P'`,
 *  none of which match the current register. This guard uses the same
 *  SERIES map check-references.mjs already carries, verified live. */
const SERIES = {
  missions:        { prefix: 'MIS', digits: 4 },
  decisions:       { prefix: '(?:ADR|DEC)', digits: 3 },
  protocols:       { prefix: 'PRO', digits: 3 },
  debt:            { prefix: 'DBT', digits: 3 },
  standards:       { prefix: 'STD', digits: 3 },
  canon:           { prefix: 'CAN', digits: 3 },
  operations:      { prefix: 'OPS', digits: 3 },
  'reports/daily': { prefix: 'RPT', digits: 3 },
  'reports/audits':{ prefix: 'RPT', digits: 3 },
  blueprints:      { prefix: 'BLU', digits: 3 },
  guilds:          { prefix: 'GLD', digits: 3 },
  infra:           { prefix: 'INF', digits: 3 },
  system:          { prefix: 'SYS', digits: 3 },
  // history/ deliberately absent — ADR-035 §2: superseded records keep the
  // frozen-artifact filename shape (S-005 §3.2), which N-02/N-03 already
  // enforce. A number would assert they are living documents.
  // agents/ deliberately absent — ADR-005 v1.1.0 reversal, folder-named.
};

/* Apparatus: excluded from series naming by the same convention D-008 and
   lint-frontmatter.mjs already use — not a document of the series, the
   scaffolding around it. */
const APPARATUS_BASENAMES = new Set(['README.md', 'INDEX.md', 'TEMPLATE.md']);
const isApparatusPath = (rel) => /\/_template\//.test(rel) || rel.startsWith('agents/_template/');

const ROOT_UPPERCASE_RE = /^[A-Z][A-Z_]*\.md$/;
const KEBAB_SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const VERSION_SUFFIX_RE = /-v\d+(\.\d+){0,2}\.md$/i;
const DATED_PREFIX_RE = /^\d{4}_\d{2}_\d{2}-/;
const FROZEN_ARTIFACT_RE = /^\d{4}_\d{2}_\d{2}-[A-Za-z0-9_]+-v\d+\.\d+\.\d+\.md$/;

function parseFM(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---(\n|$)/);
  if (!m) return null;
  const fields = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_.-]*):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return fields;
}

const findings = []; // { check, file, detail }
const F = (check, file, detail) => findings.push({ check, file, detail });

const files = execFileSync('git', ['-C', ROOT, 'ls-files', '*.md'], { encoding: 'utf8' })
  .split('\n').filter(Boolean)
  .filter((f) => !f.startsWith('web/'));

// D-049: this guard reads the INDEX, not the working tree. A .md file that
// exists on disk but has not been `git add`ed is invisible here — the guard
// cannot disagree about input it was never given (D-039, sharper form).
const untracked = execFileSync('git', ['-C', ROOT, 'ls-files', '--others', '--exclude-standard', '*.md'], { encoding: 'utf8' })
  .split('\n').filter(Boolean)
  .filter((f) => !f.startsWith('web/'));
if (untracked.length) {
  console.warn(`\n\u26a0 ${untracked.length} untracked .md file(s) — NOT scanned (this guard reads git ls-files, D-049):`);
  for (const f of untracked) console.warn(`    ${f}`);
  console.warn('  A green result here says nothing about them. `git add` them first.\n');
}

for (const rel of files) {
  const parts = rel.split('/');
  const top = parts[0];
  const base = parts[parts.length - 1];

  /* Root documents: UPPERCASE.md (STD-001 §9). */
  if (parts.length === 1) {
    if (!ROOT_UPPERCASE_RE.test(base))
      F('N-01', rel, `root document "${base}" is not UPPERCASE.md (STD-001 §9)`);
    continue;
  }

  if (top === 'agents') continue; // ADR-005 v1.1.0: no naming scheme applies

  if (APPARATUS_BASENAMES.has(base) || isApparatusPath(rel)) continue;

  const text = readFileSync(path.join(ROOT, rel), 'utf8');
  const fm = parseFM(text) || {};
  const exemption = fm.registration === 'exempt' ? fm.registration_exemption : null;

  /* N-02: version/date in a LIVING document's filename.
     Frozen artifacts (P-010 §3.2) are the one legitimate use of the dated
     shape — checked for the RIGHT shape below, not flagged here. */
  const looksFrozen = DATED_PREFIX_RE.test(base) || exemption === 'frozen-artifact';
  if (!looksFrozen && VERSION_SUFFIX_RE.test(base))
    F('N-02', rel, `filename carries a version suffix — version: lives in frontmatter, not the name (STD-001 §9)`);
  if (!looksFrozen && DATED_PREFIX_RE.test(base))
    F('N-02', rel, `filename carries a date prefix without being a declared frozen artifact (STD-001 §9, P-010 §3.2)`);

  /* Frozen artifacts: verify they actually carry the reserved shape
     (YYYY_MM_DD-Title_With_Underscores-vX.Y.Z.md), not just some date. */
  if (exemption === 'frozen-artifact' && !FROZEN_ARTIFACT_RE.test(base))
    F('N-03', rel, `declared registration_exemption: frozen-artifact but filename does not match YYYY_MM_DD-Title_With_Underscores-vX.Y.Z.md (P-010 §3.2)`);

  if (looksFrozen) continue; // frozen artifacts are not held to the series scheme below

  /* N-04: series prefix + id shape + kebab-case slug. */
  const key = (top === 'reports') ? `reports/${parts[1]}` : top;
  const scheme = SERIES[key];
  if (!scheme) continue; // series with no registered naming scheme (e.g. operations/legal/)

  const re = new RegExp(`^${scheme.prefix}-\\d{${scheme.digits}}-(.+)\\.md$`);
  const m = base.match(re);
  if (!m) {
    F('N-04', rel, `filename does not match ${scheme.prefix}-${'N'.repeat(scheme.digits)}-<slug>.md for ${key}/ (STD-001 §9, ADR-005 v1.1.0)`);
    continue;
  }
  if (!KEBAB_SLUG_RE.test(m[1]))
    F('N-05', rel, `slug "${m[1]}" is not lowercase kebab-case (STD-001 §9)`);
}

/* ---------------- baseline ratchet (same pattern as lint-frontmatter.mjs) ---------------- */

const keys = findings.map((f) => `${f.check} ${f.file} :: ${f.detail}`).sort();

if (WRITE) {
  writeFileSync(BASELINE, JSON.stringify({
    _comment: 'Filename violations frozen at adoption (STD-001 §9, D-001 item 3). The lint fails only on NEW ones. Shrinks as MIS-125 Stage C renames land; never grows.',
    generated: new Date().toISOString(),
    count: keys.length,
    entries: keys,
  }, null, 1) + '\n');
  console.log(`baseline written: ${keys.length} findings frozen`);
  process.exit(0);
}

const byCheck = {};
for (const f of findings) byCheck[f.check] = (byCheck[f.check] || 0) + 1;
const summary = Object.entries(byCheck).sort().map(([c, n]) => `${c}:${n}`).join('  ');

if (REPORT) {
  for (const k of keys) console.log(k);
  console.log(`\n${findings.length} findings across ${files.length} tracked documents`);
  console.log(summary);
  process.exit(0);
}

const baseline = existsSync(BASELINE)
  ? new Set(JSON.parse(readFileSync(BASELINE, 'utf8')).entries)
  : new Set();
const fresh = keys.filter((k) => !baseline.has(k));
const healed = [...baseline].filter((k) => !keys.includes(k));

console.log(`lint-naming: ${findings.length} findings (${baseline.size} baselined) — ${summary}`);
if (healed.length) console.log(`  ${healed.length} baselined finding(s) healed — regenerate the baseline to bank the progress`);
if (fresh.length) {
  console.log(`\nNEW violations (not in baseline) — the ratchet fails:\n`);
  for (const k of fresh) console.log(`  ${k}`);
  process.exit(1);
}
console.log('no new violations — the ratchet holds');
