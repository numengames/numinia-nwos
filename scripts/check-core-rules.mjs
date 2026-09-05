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

  /* A negation is not a state claim: `-not-frozen.md` describes a defect about
     another document, it does not encode this one's state. */
  if (/-(draft|final|frozen|old|new|deprecated)\.md$/.test(r) && !/-not-[a-z]+\.md$/.test(r))
    record('CORE-12', 'filename encodes state', r);

  if (/-v\d+(\.\d+)*\.md$/.test(r) && !r.startsWith('history/'))
    record('CORE-13', 'filename carries a version', r);

  if (!body(d).startsWith('---\n'))
    record('CORE-16', 'no frontmatter', r);

  if (!f.license)
    record('CORE-19', 'no licence declared', r);

  if (f.version && !/^\d+\.\d+\.\d+$/.test(String(f.version)))
    record('CORE-21', `version "${f.version}" is not semantic`, r);

  /* CORE-45: `superseded` names its heir; `withdrawn` is the state where the
     rule left and nothing replaced it, so naming an heir there is the error.
     The check is symmetric on purpose: a silent allowance would let a
     `withdrawn` document carry a stale `superseded_by` for ever. `retired` is
     not in the status vocabulary of any series — see rules.json — so it is not
     tested here; lint-frontmatter rejects unknown values. */
  if (f.status === 'superseded' && !f.superseded_by)
    record('CORE-45', 'status superseded with no heir', r);

  if (f.status === 'withdrawn' && f.superseded_by)
    record('CORE-45', `status withdrawn names an heir "${f.superseded_by}" — a withdrawn rule has none; use superseded`, r);

  if (r.startsWith('standards/')) {
    const prose = body(d).replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
    const m = prose.match(/\b[A-Z]{2,4}-\d+\s+§\d[\d.]*/g);
    if (m) record('CORE-50', `cites a section by number: ${m.join(', ')}`, r);
  }

  /* CORE-20: an unknown value is left empty, never guessed. These are the
     shapes a guess takes in this corpus — a template marker left in place,
     or a word standing in for a value nobody looked up. `todo` is excluded:
     it is a legitimate mission status in rules.json, not a placeholder. */
  for (const [k, v] of Object.entries(f)) {
    if (typeof v !== 'string' || k === 'status') continue;
    if (/^(TBD|TODO|XXX|N\/A|\?+|<.*>|YYYY-MM-DD|unknown|placeholder)$/i.test(v.trim()))
      record('CORE-20', `${k} holds a placeholder: "${v}"`, r);
  }

  /* CORE-24: when a document keeps its own changelog, its newest entry must be
     the version in the header. Two places, one fact, and they drift.

     The heading must BE a changelog, not mention one — `## Version history`,
     not `## 7. …register in the design system changelog`. The section ends at
     the next heading; scanning to end of file catches version-shaped numbers
     in unrelated prose. Logs here run oldest-first, so the newest entry is the
     last line, and a log that goes backwards is its own defect. */
  const ch = body(d).match(/^##\s+(?:\d+\.\s*)?(?:version history|changelog)\s*$/im);
  if (ch && f.version) {
    const from = body(d).indexOf(ch[0]) + ch[0].length;
    const rest = body(d).slice(from);
    const end = rest.search(/^##\s/m);
    const section = end === -1 ? rest : rest.slice(0, end);
    const entries = [...section.matchAll(/^[-*]\s+v?(\d+\.\d+\.\d+)/gm)].map((m) => m[1]);
    const cmp = (a, b) => {
      const [x, y] = [a.split('.').map(Number), b.split('.').map(Number)];
      return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
    };
    if (entries.length) {
      const newest = entries[entries.length - 1];
      if (cmp(newest, String(f.version)) !== 0)
        record('CORE-24', `header says ${f.version}, newest log entry is ${newest}`, r);
      for (let i = 1; i < entries.length; i += 1)
        if (cmp(entries[i], entries[i - 1]) < 0)
          record('CORE-21', `change log goes backwards: ${entries[i - 1]} then ${entries[i]}`, r);
    }
  }
}

/* CORE-14: an identifier is never reused. Two documents holding one id means
   one of them is unreachable by citation — the reference resolver picks one. */
const seen = new Map();
for (const d of docs) {
  const id = fm(d).id;
  if (!id) continue;
  if (seen.has(id)) record('CORE-14', `id ${id} is held by two documents`, `${seen.get(id)} + ${rel(d)}`);
  else seen.set(id, rel(d));
}

/* CORE-26: a commit subject is one line. */
const subjects = execFileSync('git', ['log', '-400', '--format=%s'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n').filter(Boolean);
for (const s of subjects) if (s.includes('\n')) record('CORE-26', 'multi-line subject', s.slice(0, 60));

const RULES = ['CORE-12', 'CORE-13', 'CORE-14', 'CORE-16', 'CORE-19', 'CORE-20', 'CORE-21', 'CORE-24', 'CORE-26', 'CORE-45', 'CORE-50'];

/* The standard's own `status` field decides whether these rules bind. `active`
   enforces; anything else reports and exits clean. This is the on/off switch:
   ratification is an edit to STD-009's header, not to this file. */
const std009 = loadDocs().find((d) => (d.rel ?? d.path) === 'standards/STD-009-core-rules.md');
const status = std009?.fm?.status ?? 'draft';
const enforcing = status === 'active';

console.log(`check-core-rules: ${docs.length} bound documents, ${RULES.length} rules executed`);
console.log(`  STD-009 is \`${status}\` — ${enforcing ? 'ENFORCING' : 'reporting only, breaches do not fail the build'}`);

if (failures.length) {
  const out = enforcing ? console.error : console.log;
  for (const f of failures) out(`  ${f.rule}  ${f.what}\n      ${f.where}`);
  out(`\n${failures.length} breach(es).`);
  if (enforcing) process.exit(1);
  console.log('Not enforced: STD-009 awaits ratification.');
  process.exit(0);
}
console.log(`  ${RULES.join(' ')} — all hold.`);
