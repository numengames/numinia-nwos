#!/usr/bin/env node
/**
 * lint-naming.mjs — the identifier a filename carries (IDN-011, STD-018).
 *
 * Since R3 of MIS guards-tests-ci-alpha this guard holds ONE rule: N-04, a
 * series document's name is `<PREFIX>-<NNN|NNNN>-<slug>.md` and the id it
 * carries is the series' shape. The other filename rules (N-01 root
 * UPPERCASE, N-02 no version/date in a living name, N-05 kebab-case slug)
 * are TXT-001 and live in guards/rules/std-006-plain-text.mjs; the
 * classification both share is guards/lib/naming.mjs. This file folds into
 * guards/rules/std-018-one-identifier.mjs next.
 *
 *   node scripts/lint-naming.mjs                  # every finding; exit 1 only if one binds
 *   node scripts/lint-naming.mjs --report         # full detail, exit 0
 *
 * Every finding is printed. Whether one fails the build is the regime's
 * call (ENG-067): only while the standard holding its plate is `active`.
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
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { declareBlindSpots } from './lib/blindness.mjs';
import { Findings } from './lib/regime.mjs';
import { parseFM } from './lib/frontmatter.mjs';
import { classify } from '../guards/lib/naming.mjs';
declareBlindSpots('lint-naming');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const REPORT = args.includes('--report');

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
  const fm = parseFM(readFileSync(path.join(ROOT, rel), 'utf8')) || {};
  const c = classify(rel, fm);
  if (c.kind !== 'series' || !c.scheme) continue;   // root, apparatus, legacy names, history/, evidence: no id shape
  const { base, top, scheme } = c;

  /* N-04: series prefix + id shape. */
  if (c.dailyReport) {
    if (fm.subtype !== 'daily')
      F('N-04', rel, `date-shaped identifier on a report whose subtype is "${fm.subtype || '(none)'}" — RPT-YYYY-MM-DD is for subtype: daily only (ADR-005 v1.2.0 rule 1)`);
    continue;
  }
  if (c.slug === null) {
    const expected = scheme.dailyDate
      ? `${scheme.prefix}-${'N'.repeat(scheme.digits)}-<slug>.md (or RPT-YYYY-MM-DD.md for subtype: daily) for ${top}/ (STD-001 §9, ADR-005 v1.2.0)`
      : `${scheme.prefix}-${'N'.repeat(scheme.digits)}-<slug>.md for ${top}/ (STD-001 §9, ADR-005 v1.1.0)`;
    F('N-04', rel, `filename does not match ${expected}`);
    continue;
  }
  if (scheme.dailyDate && fm.subtype === 'daily')
    F('N-04', rel, `subtype: daily report carries a numbered identifier — dailies are RPT-YYYY-MM-DD (ADR-005 v1.2.0 rule 1)`);
}

/* ---------------- verdict ---------------- */

const keys = findings.map((f) => `${f.check} ${f.file} :: ${f.detail}`).sort();

const byCheck = {};
for (const f of findings) byCheck[f.check] = (byCheck[f.check] || 0) + 1;
const summary = Object.entries(byCheck).sort().map(([c, n]) => `${c}:${n}`).join('  ');

if (REPORT) {
  for (const k of keys) console.log(k);
  console.log(`\n${findings.length} findings across ${files.length} tracked documents`);
  console.log(summary);
  process.exit(0);
}

console.log(`lint-naming: ${findings.length} findings — ${summary}`);
/* ENG-067: N-04 is the identifier the name carries — IDN-011 (STD-018). */
const PLATE = { 'N-04': 'IDN-011' };
const out = new Findings('lint-naming');
for (const k of keys) { const m = /^(\S+) (\S+) :: (.*)$/.exec(k); out.add(PLATE[m[1]] ?? m[1], `${m[1]} ${m[3]}`, m[2]); }
out.finish();
