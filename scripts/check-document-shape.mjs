#!/usr/bin/env node
/**
 * check-document-shape.mjs — the STD-007 shape guard (ADR-043).
 *
 * One page per document: a rule-shaped title, a three-part card, a scope
 * line, plated rules before reasons, and a body that fits its series'
 * budget. This guard MEASURES. It never fails the build: every size limit
 * in STD-007 is a SHOULD, and a guard that blocks on a SHOULD teaches
 * people to ignore it. Form findings (missing card, missing plates) are
 * reported at the same level for now; ADR-043 says they become blocking
 * when the last standard is cut, and that is a one-line change below.
 *
 * WHAT IT MEASURES, per document
 *   S-01  title length (words)                    DOC-001  ≤ 5
 *   S-02  card: Summary / Epistemic / Pragmatic   DOC-002  present, ≤ 40 words each
 *   S-03  scope: Binds / Does not bind lines      DOC-003  present, ≤ 15 words each
 *   S-04  plated rules                            DOC-004  standards & protocols: ≥ 1;
 *                                                          plate shape AAA-NNN
 *   S-05  Why length                              DOC-005  ≤ 80 words
 *   S-06  body length                             DOC-006  ≤ budget for the series
 *   S-07  References rows                         DOC-007  ≤ 5
 *
 * Body = from the scope line (or the end of the card) to `## References`.
 * Frontmatter, H1, card, scope and References are NOT counted.
 *
 * WHAT IT DOES NOT MEASURE
 *   DOC-008 (plates not sections) — check-plain-writing.mjs owns it.
 *   DOC-009/010 (registers, no history) — check-templates.mjs owns them.
 *   Whether a rule is one obligation, or a title is a rule — editorial.
 *
 * Usage:
 *   node scripts/check-document-shape.mjs               # report, exit 0
 *   node scripts/check-document-shape.mjs --json        # machine output
 *   node scripts/check-document-shape.mjs standards/    # one folder
 */

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT, parseFM, stripFM, isApparatus, isTemplate } from './lib/frontmatter.mjs';

// ADR-043 rule 6. Moves to the Series register when that file exists.
const BUDGET = {
  standards: 500, protocols: 500, decisions: 500, missions: 500,
  debt: 300, guilds: 300,
  reports: 1000, blueprints: 1000,
  canon: 1500,
};
const CAP = { title: 5, card: 40, scope: 15, why: 80, refs: 5 };
const PLATE_RE = /\*\*([A-Z]{3}-\d{3})\s+—/g;
// Old-shape plates still valid until the rename PR (ADR-043 consequences).
const LEGACY_PLATE_RE = /\*\*((?:CORE|H|PW|A|RK|SEC|ARC|PM|DEV)-\d{1,2})\*\*/g;
const NEEDS_PLATES = new Set(['standards', 'protocols']);

// Blocking flips here, and only here, when ADR-043 says so.
const BLOCK_ON_FORM = false;

const args = process.argv.slice(2);
const JSON_OUT = args.includes('--json');
const only = args.find((a) => !a.startsWith('--'));

const words = (s) => (s.trim() ? s.trim().split(/\s+/).length : 0);

// Card parts are consecutive `> ` lines; a part runs from its `**Name:**`
// line to the next `**Other:**` line or the end of the blockquote. Parsed
// line by line — no backtracking regex over the whole body (CodeQL ReDoS).
function cardParts(body) {
  const parts = {};
  let current = null;
  for (const raw of body.split('\n')) {
    if (!raw.startsWith('>')) { if (current) break; continue; }
    const line = raw.replace(/^>\s?/, '');
    const head = /^\*\*(\w+):\*\*\s*(.*)$/.exec(line);
    if (head) { current = head[1]; parts[current] = head[2]; continue; }
    if (current) parts[current] += ' ' + line;
  }
  return parts;
}

function measure(rel) {
  const text = readFileSync(path.join(ROOT, rel), 'utf8');
  const fm = parseFM(text);
  if (!fm) return null;
  const dir = rel.split('/')[0];
  const body = stripFM(text);
  const findings = [];
  const r = { file: rel, dir, id: fm.id ?? null, subtype: fm.subtype ?? null, status: fm.status ?? null };

  // S-01 title
  const h1 = /^#\s+(.+)$/m.exec(body);
  const title = (h1 ? h1[1] : String(fm.title ?? '')).replace(/^[A-Z]{2,4}-\d{3,4}\s*[—–-]\s*/, '');
  r.title_words = words(title);
  if (r.title_words > CAP.title) findings.push(`S-01 title is ${r.title_words} words (≤ ${CAP.title})`);

  const register = fm.subtype === 'register';

  // S-02 card
  r.card = {};
  const cp = cardParts(body);
  for (const part of ['Summary', 'Epistemic', 'Pragmatic']) {
    const p = cp[part] ?? null;
    if (p === null) {
      r.card[part] = null;
      if (!(register && part !== 'Summary')) findings.push(`S-02 card has no **${part}:**`);
      continue;
    }
    r.card[part] = words(p);
    if (r.card[part] > CAP.card) findings.push(`S-02 ${part} is ${r.card[part]} words (≤ ${CAP.card})`);
  }

  // S-03 scope
  const binds = /^\*\*Binds:\*\*\s*(.+)$/m.exec(body);
  const notb = /^\*\*Does not bind:\*\*\s*(.+)$/m.exec(body);
  r.scope = { binds: binds ? words(binds[1]) : null, does_not_bind: notb ? words(notb[1]) : null };
  if (!register && NEEDS_PLATES.has(dir)) {
    if (!binds) findings.push('S-03 no **Binds:** line');
    if (!notb) findings.push('S-03 no **Does not bind:** line');
  }
  if (binds && r.scope.binds > CAP.scope) findings.push(`S-03 Binds is ${r.scope.binds} words (≤ ${CAP.scope})`);
  if (notb && r.scope.does_not_bind > CAP.scope) findings.push(`S-03 Does not bind is ${r.scope.does_not_bind} words (≤ ${CAP.scope})`);

  // Body: after scope (or card) up to ## References
  let start = 0;
  const cardEnd = body.search(/^(?!>)(?!\s*$)(?!#\s)/m);
  if (cardEnd > 0) start = cardEnd;
  const scopeEnd = notb ? notb.index + notb[0].length : (binds ? binds.index + binds[0].length : -1);
  if (scopeEnd > start) start = scopeEnd;
  // skip the H1 if it comes after the card start
  let main = body.slice(start);
  main = main.replace(/^#\s+.+$/m, '');
  const refsIdx = main.search(/^##\s+(\d+\.\s+)?References\b/m);
  const core = refsIdx >= 0 ? main.slice(0, refsIdx) : main;
  const refs = refsIdx >= 0 ? main.slice(refsIdx) : '';

  // S-04 plates
  const plates = [...core.matchAll(PLATE_RE)].map((m) => m[1]);
  const legacy = [...core.matchAll(LEGACY_PLATE_RE)].map((m) => m[1]);
  r.plates = plates.length; r.legacy_plates = legacy.length;
  if (!register && NEEDS_PLATES.has(dir) && plates.length + legacy.length === 0)
    findings.push('S-04 no plated rule (**AAA-NNN — …**)');

  // S-05 why — the section from `## Why` to the next `## `, scanned by line.
  let why = null;
  {
    const lines = core.split('\n');
    const at = lines.findIndex((l) => /^##\s+(\d+\.\s+)?Why\b/.test(l));
    if (at >= 0) {
      const end = lines.findIndex((l, i) => i > at && /^##\s/.test(l));
      why = lines.slice(at + 1, end < 0 ? undefined : end).join('\n');
    }
  }
  r.why_words = why === null ? null : words(why);
  if (why && r.why_words > CAP.why) findings.push(`S-05 Why is ${r.why_words} words (≤ ${CAP.why})`);

  // S-06 body
  const budget = BUDGET[dir] ?? null;
  // S-06 body. Words inside <!-- --> comments are not prose: count line by
  // line, skipping from a line that opens a comment to the one that closes it.
  r.body_words = register ? null : (() => {
    let n = 0, inComment = false;
    for (const line of core.split('\n')) {
      if (inComment) { if (line.includes('-->')) inComment = false; continue; }
      if (line.includes('<!--')) { if (!line.includes('-->')) inComment = true; continue; }
      n += words(line);
    }
    return n;
  })();
  r.budget = register ? 'register' : budget;
  if (!register && budget && r.body_words > budget) {
    const over = Math.round((r.body_words / budget - 1) * 100);
    findings.push(`S-06 body is ${r.body_words} words, budget ${budget} (+${over}%)`);
  }

  // S-07 references
  const rows = refs.split('\n').filter((l) => /^\|\s*`?[A-Z]{2,4}-/.test(l)).length;
  r.refs = refsIdx >= 0 ? rows : null;
  if (r.refs !== null && r.refs > CAP.refs) findings.push(`S-07 ${r.refs} references (≤ ${CAP.refs})`);

  r.findings = findings;
  return r;
}

const files = execFileSync('git', ['-C', ROOT, 'ls-files', '*.md'], { encoding: 'utf8' })
  .split('\n').filter(Boolean)
  .filter((f) => f.split('/')[0] in BUDGET)
  .filter((f) => !only || f.startsWith(only))
  .filter((f) => !isApparatus(f) && !isTemplate(f))
  .filter((f) => !/\/(INDEX|README)\.md$/.test(f));

const results = files.map(measure).filter(Boolean)
  .filter((r) => !['superseded', 'withdrawn'].includes(r.status));

if (JSON_OUT) {
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
}

const bySeries = {};
for (const r of results) {
  const s = (bySeries[r.dir] ??= { n: 0, in: 0, over: 0, words: [], findings: 0 });
  s.n++;
  if (r.body_words !== null) { s.words.push(r.body_words); if (r.budget && r.body_words > r.budget) s.over++; else s.in++; }
  s.findings += r.findings.length;
}
console.log('document shape (STD-007, ADR-043) — report only, exit 0\n');
console.log('series       docs  budget  within  over   median  max   findings');
for (const [d, s] of Object.entries(bySeries).sort()) {
  const w = s.words.sort((a, b) => a - b);
  const med = w.length ? w[Math.floor(w.length / 2)] : '-';
  const max = w.length ? w[w.length - 1] : '-';
  console.log(`${d.padEnd(12)} ${String(s.n).padStart(4)}  ${String(BUDGET[d]).padStart(6)}  ${String(s.in).padStart(6)}  ${String(s.over).padStart(4)}   ${String(med).padStart(6)}  ${String(max).padStart(4)}   ${s.findings}`);
}
const shaped = results.filter((r) => r.findings.length === 0);
console.log(`\n${shaped.length}/${results.length} documents fully in shape.`);
if (only || process.env.SHAPE_VERBOSE) {
  console.log('');
  for (const r of results) {
    const tag = r.findings.length ? '·' : '✓';
    console.log(`${tag} ${r.file}  title=${r.title_words}w body=${r.body_words ?? '-'}/${r.budget} plates=${r.plates + r.legacy_plates} refs=${r.refs ?? '-'}`);
    for (const f of r.findings) console.log(`    ${f}`);
  }
}
const formFails = results.filter((r) => r.findings.some((f) => /^S-0[234] (no|card has no)/.test(f)));
if (BLOCK_ON_FORM && formFails.length) {
  console.error(`\n${formFails.length} document(s) fail on FORM (card, scope or plates). ADR-043: form is MUST.`);
  process.exit(1);
}
