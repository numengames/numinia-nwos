#!/usr/bin/env node
/**
 * check-core-rules — execute the mechanically checkable rules of STD-009.
 *
 * STD-009 CORE-31: "A rule that does not break the build does not exist for an
 * agent." This guard is what makes eight of the sixty-two rules exist.
 *
 * Scope comes from the corpus classifier, never from a list kept here.
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { loadDocs } from './lib/corpus.mjs';
import { ROOT } from './lib/frontmatter.mjs';

/* STD-009: files addressing a reader outside the corpus follow the conventions
   of the platform they serve, not the numbered series. */
const OUTWARD =
  /^(AGENTS|CLAUDE|CONTRIBUTING|CHANGELOG|SECURITY|TRADEMARKS|README)\.md$|^\.github\/|^web\//;

const docs = loadDocs().filter((d) => {
  const rel = d.rel ?? d.path;
  return rel && !d.apparatus && !OUTWARD.test(rel);
});

const fm = (d) => d.fm ?? {};
const rel = (d) => d.rel ?? d.path;
const body = (d) => readFileSync(`${ROOT}/${rel(d)}`, 'utf8');

const failures = [];
const record = (rule, what, where) => failures.push({ rule, what, where });

for (const d of docs) {
  const r = rel(d);
  const f = fm(d);

  if (/-(draft|final|frozen|old|new|deprecated)\.md$/.test(r))
    record('CORE-12', 'filename encodes state', r);

  if (/-v\d+(\.\d+)*\.md$/.test(r) && !r.startsWith('history/'))
    record('CORE-13', 'filename carries a version', r);

  if (!body(d).startsWith('---\n'))
    record('CORE-16', 'no frontmatter', r);

  if (!f.license)
    record('CORE-19', 'no licence declared', r);

  if (f.version && !/^\d+\.\d+\.\d+$/.test(String(f.version)))
    record('CORE-21', `version "${f.version}" is not semantic`, r);

  if (['superseded', 'retired', 'withdrawn'].includes(f.status) && !f.superseded_by)
    record('CORE-45', `status ${f.status} with no heir`, r);

  if (r.startsWith('standards/')) {
    const prose = body(d).replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
    const m = prose.match(/\b[A-Z]{2,4}-\d+\s+§\d[\d.]*/g);
    if (m) record('CORE-50', `cites a section by number: ${m.join(', ')}`, r);
  }
}

/* CORE-26: a commit subject is one line. */
const subjects = execFileSync('git', ['log', '-400', '--format=%s'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n').filter(Boolean);
for (const s of subjects) if (s.includes('\n')) record('CORE-26', 'multi-line subject', s.slice(0, 60));

const RULES = ['CORE-12', 'CORE-13', 'CORE-16', 'CORE-19', 'CORE-21', 'CORE-26', 'CORE-45', 'CORE-50'];
console.log(`check-core-rules: ${docs.length} bound documents, ${RULES.length} rules executed`);

if (failures.length) {
  for (const f of failures) console.error(`  ${f.rule}  ${f.what}\n      ${f.where}`);
  console.error(`\n${failures.length} breach(es).`);
  process.exit(1);
}
console.log(`  ${RULES.join(' ')} — all hold.`);
