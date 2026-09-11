#!/usr/bin/env node
/**
 * check-core-rules — execute the mechanically checkable rules of the core
 * standards (STD-004, STD-021; once one file, STD-009).
 *
 * STD-005 ENG-001 (once STD-009 CORE-31): "A rule that does not break the build does not exist for an
 * agent." This guard is what makes eight of the sixty-two rules exist.
 *
 * R3 of MIS guards-tests-ci-alpha folds it, one standard at a time, into
 * guards/rules/: IDN-012/013/014 live in std-018-one-identifier.mjs,
 * VER-021/024 in std-019-versions.mjs, GIT-026/045 in std-020-git-is-the-archive.mjs,
 * HDR-040/043/044 in std-004-the-header.mjs. CIT-050 remains; it goes with STD-021.
 *
 * Scope comes from the corpus classifier, never from a list kept here.
 */
import { readFileSync } from 'node:fs';
import { loadDocs } from './lib/corpus.mjs';
import { ROOT } from './lib/frontmatter.mjs';
import { Findings } from './lib/regime.mjs';
import { declareBlindSpots } from './lib/blindness.mjs';
declareBlindSpots('check-core-rules');

/* STD-009 scope: files addressing a reader outside the corpus follow the conventions
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

/* ENG-067: each finding binds by the state of the standard that holds its
   plate. regime.mjs reads that from the axis at run time — a rule that moves
   between standards needs no edit here, and ratification is an edit to the
   holder's header, not to this file. */
const out = new Findings('check-core-rules');
const record = (rule, what, where) => out.add(rule, what, where);

for (const d of docs) {
  const r = rel(d);
  const f = fm(d);

  if (r.startsWith('standards/')) {
    const prose = body(d).replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
    const m = prose.match(/\b[A-Z]{2,4}-\d+\s+§\d[\d.]*/g);
    if (m) record('CIT-050', `cites a section by number: ${m.join(', ')}`, r);
  }

}

const RULES = ['CIT-050'];
console.log(`check-core-rules: ${docs.length} bound documents, ${RULES.length} rules executed`);
out.finish({ ok: `${RULES.join(' ')} — all hold.` });
