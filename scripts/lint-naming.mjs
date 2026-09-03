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
import { parseFM, loadRules, isApparatus } from './lib/frontmatter.mjs';
declareBlindSpots('lint-naming');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = path.join(ROOT, 'scripts', 'naming-baseline.json');
const args = process.argv.slice(2);
const REPORT = args.includes('--report');
const WRITE = args.includes('--write-baseline');

/** ADR-005 v1.2.0 register — read from scripts/lib/rules.json since MIS-138
 *  (2026-09-02). Three private copies of this map (here, check-references,
 *  lint-frontmatter's PREFIX) drifted from each other before that; now one
 *  file, shared with the telemetry instrument. history/ and agents/ carry
 *  no filename scheme (ADR-035 §2; ADR-005 v1.1.0 reversal). */
const RULES = loadRules();
const SERIES = Object.fromEntries(Object.entries(RULES.series)
  .filter(([k, v]) => !k.startsWith('_') && v.naming !== false)
  .map(([k, v]) => [k, { prefix: v.prefix.length > 1 ? `(?:${v.prefix.join('|')})` : v.prefix[0], digits: v.digits, dailyDate: !!v.dailyDate }]));

/* Apparatus (D-014): scaffolding around a series, not a member of it. The
   list lives in rules.json (`apparatus`) since MIS-138 — the same list
   count-evidence and lint-frontmatter's IS_TEMPLATE used to hold privately. */

const ROOT_UPPERCASE_RE = /^[A-Z][A-Z_]*\.md$/;
const KEBAB_SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const VERSION_SUFFIX_RE = /-v\d+(\.\d+){0,2}\.md$/i;
const DATED_PREFIX_RE = /^\d{4}_\d{2}_\d{2}-/;
const FROZEN_ARTIFACT_RE = /^\d{4}_\d{2}_\d{2}-[A-Za-z0-9_]+-v\d+\.\d+\.\d+\.md$/;
/* ADR-005 v1.2.0 rule 1 / ADR-004 rule 3: the daily-report shape. No slug —
   the date is the whole identity. */
const DAILY_REPORT_RE = /^RPT-\d{4}-\d{2}-\d{2}\.md$/;

/* parseFM: scripts/lib/frontmatter.mjs (shared with every guard and the instrument). */

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

  const text = readFileSync(path.join(ROOT, rel), 'utf8');
  const fm = parseFM(text) || {};
  if (isApparatus(rel, null)) continue;
  // D-014 (count-evidence.py applies the same rule): `type: meta` IS the
  // apparatus declaration. A document that says so is scaffolding around a
  // series, not a member of it, and no series filename shape applies. Until
  // 2026-09-02 this guard only knew apparatus by basename, so a declared
  // annex (missions/ANNEX-…) failed N-04 while count-evidence excluded it.
  if (isApparatus(rel, fm)) continue;
  const exemption = fm.registration === 'exempt' ? fm.registration_exemption : null;

  /* N-02: version/date in a LIVING document's filename.
     Until 2026-09-03 a dated prefix exempted itself: `looksFrozen` was true
     merely because the name carried a date, so the guard read the filename as
     proof of its own legitimacy and skipped every check below. A name cannot
     license itself. The exemption is now what the frontmatter declares, and
     the legacy dated shape is tolerated only where it is still on disk. */
  /* Any declared exemption counts, whatever word it uses. Two documents in
     history/ still say `frozen-artifact`; they are `status: closed` and are
     not rewritten to chase new vocabulary. What matters is that the exemption
     is declared in the frontmatter, not inferred from the name. */
  const declaredArchive = typeof exemption === 'string' && exemption.length > 0;
  const legacyDated = DATED_PREFIX_RE.test(base);
  if (!declaredArchive && !legacyDated && VERSION_SUFFIX_RE.test(base))
    F('N-02', rel, `filename carries a version suffix — version: lives in frontmatter, not the name (STD-001 §9)`);
  if (!declaredArchive && legacyDated)
    F('N-02', rel, `filename carries a date prefix; dated names are a legacy shape and say nothing about state (STD-001 §9, P-010 §3.2.1)`);

  if (legacyDated || declaredArchive) continue; // legacy names are not held to the series scheme below

  /* N-04: series prefix + id shape + kebab-case slug. */
  const scheme = SERIES[top];
  if (!scheme) continue; // series with no registered naming scheme (e.g. history/)

  /* reports/evidence/<RPT-id>/…: an annex, moved as an opaque block, never
     authored (ADR-005 v1.2.0 rule 5, PRO-010 §3.4 rule 1). Its .md files are
     captured artefacts, not documents of the series. */
  if (top === 'reports' && parts[1] === 'evidence') continue;

  if (scheme.dailyDate && DAILY_REPORT_RE.test(base)) {
    if (fm.subtype !== 'daily')
      F('N-04', rel, `date-shaped identifier on a report whose subtype is "${fm.subtype || '(none)'}" — RPT-YYYY-MM-DD is for subtype: daily only (ADR-005 v1.2.0 rule 1)`);
    continue;
  }

  const re = new RegExp(`^${scheme.prefix}-\\d{${scheme.digits}}-(.+)\\.md$`);
  const m = base.match(re);
  if (!m) {
    /* Message text is part of the baseline key — keep the historic wording
       for every series except reports/, whose rule (and key) changed in
       ADR-005 v1.2.0. Re-keying the other twelve would read as 140 "new"
       violations that are the same old ones. */
    const expected = scheme.dailyDate
      ? `${scheme.prefix}-${'N'.repeat(scheme.digits)}-<slug>.md (or RPT-YYYY-MM-DD.md for subtype: daily) for ${top}/ (STD-001 §9, ADR-005 v1.2.0)`
      : `${scheme.prefix}-${'N'.repeat(scheme.digits)}-<slug>.md for ${top}/ (STD-001 §9, ADR-005 v1.1.0)`;
    F('N-04', rel, `filename does not match ${expected}`);
    continue;
  }
  if (scheme.dailyDate && fm.subtype === 'daily')
    F('N-04', rel, `subtype: daily report carries a numbered identifier — dailies are RPT-YYYY-MM-DD (ADR-005 v1.2.0 rule 1)`);
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
