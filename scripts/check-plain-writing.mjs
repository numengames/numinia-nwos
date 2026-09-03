#!/usr/bin/env node
/**
 * check-plain-writing.mjs — the STD-007 lint.
 *
 * STD-007 says a standard's body speaks in plain names, not IDs, and that
 * every ID it depends on is collected once in a `## References` table at the
 * end. It shipped with four conformance checks, all marked `[MANUAL]`.
 *
 * A rule nobody can check is a rule that decays. That is not a guess about
 * this corpus — it is what already happened to the `D-` prefix: the rule
 * existed, no guard knew it, and a month passed before anyone noticed the
 * citations had rotted. STD-007 exists because of that incident, so shipping
 * it unenforced would be repeating the mistake it was written to prevent.
 *
 * What this checks, on `standards/*.md` only (STD-007 binds no other series):
 *
 *   PW-01  a bare PREFIX-NNN token in body prose, outside the References
 *          table — RULE-01, "name things, don't code them"
 *   PW-02  a §N or §N.N section pointer anywhere — RULE-04, the one thing
 *          banned outright, because section numbers move and citations don't
 *   PW-03  an ID used in the body but missing from `## References` — RULE-03
 *
 * PW-04 (readable start to finish without opening another document) stays
 * manual. It is an editorial judgment; a script claiming to measure it would
 * be lying about what it can see.
 *
 *   node scripts/check-plain-writing.mjs              # verify against baseline
 *   node scripts/check-plain-writing.mjs --report     # full detail, exit 0
 *   node scripts/check-plain-writing.mjs --write-baseline
 *
 * Baseline, same ratchet as the reference lint: the five standards that
 * predate STD-007 do not conform, and STD-007 itself says they conform when
 * next substantively reopened, not by sweep. Failing on day one on damage the
 * standard explicitly grandfathers would mean the check never gets adopted.
 * Current violations freeze in scripts/plain-writing-baseline.json; the guard
 * fails only on NEW ones.
 */
import { declareBlindSpots } from './lib/blindness.mjs';
declareBlindSpots('check-plain-writing');
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = path.join(ROOT, 'scripts', 'plain-writing-baseline.json');

const REPORT = process.argv.includes('--report');
const WRITE = process.argv.includes('--write-baseline');

/* Every series prefix that can appear as a citation. Kept literal rather than
   derived from rules.json: this lint asks "does this look like an ID to a
   reader", which is a question about the text, not about what resolves. */
const ID = /\b(STD|PRO|ADR|CAN|DBT|MIS|RPT|BLU|OPS|SYS|HIS|D|S|P)-\d{3,4}\b/g;
const SECTION = /§\s*\d+(\.\d+)?/g;

/* A fenced code block is not prose — an example of a bad citation is how you
   teach the rule. Same for inline code spans, which is how STD-007 quotes the
   very tokens it bans. */
function stripCode(text) {
  return text
    .replace(/```[\s\S]*?```/g, m => m.replace(/[^\n]/g, ' '))
    .replace(/`[^`\n]*`/g, m => ' '.repeat(m.length));
}

function stripFrontmatter(text) {
  if (!text.startsWith('---')) return text;
  const end = text.indexOf('\n---', 3);
  if (end < 0) return text;
  const fm = text.slice(0, end + 4);
  return fm.replace(/[^\n]/g, ' ') + text.slice(end + 4);
}

/** Split body from the `## References` section. The table is where IDs are
 *  allowed to live, so it is scanned for PW-02 but exempt from PW-01. */
function splitReferences(text) {
  const m = text.match(/^##\s+References\s*$/mi);
  if (!m) return { body: text, references: '' };
  const i = m.index;
  return { body: text.slice(0, i), references: text.slice(i) };
}

const files = execFileSync('git', ['ls-files', 'standards/*.md'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n').filter(Boolean);

const findings = [];

for (const rel of files) {
  const raw = readFileSync(path.join(ROOT, rel), 'utf8');
  const masked = stripCode(stripFrontmatter(raw));
  const { body, references } = splitReferences(masked);

  const lineOf = idx => masked.slice(0, idx).split('\n').length;

  /* A document naming itself is not a pointer that can rot — the title line
     and any self-reference resolve to the file you are already reading.
     STD-007's own heading is the obvious case. */
  const selfId = (rel.match(/\b([A-Z]{3}-\d{3,4})\b/) || [])[1];

  /* PW-02 first: it applies to the whole document, References table included.
     A section pointer is the one thing STD-007 bans with no exception. */
  for (const m of masked.matchAll(SECTION)) {
    findings.push({ check: 'PW-02', file: rel, line: lineOf(m.index), token: m[0].trim() });
  }

  /* PW-01: bare IDs in prose. The References table is the sanctioned place. */
  const used = new Set();
  for (const m of body.matchAll(ID)) {
    if (m[0] === selfId) continue;
    used.add(m[0]);
    findings.push({ check: 'PW-01', file: rel, line: lineOf(m.index), token: m[0] });
  }

  /* PW-03: an ID the body leans on that the References table never lists.
     Only meaningful once a document has a References section at all — a
     standard that cites nothing needs no table. */
  if (references) {
    const listed = new Set(Array.from(references.matchAll(ID), m => m[0]));
    for (const id of used) {
      if (!listed.has(id)) findings.push({ check: 'PW-03', file: rel, line: 0, token: id });
    }
  }
}

const key = f => `${f.check} ${f.file} ${f.token}`;
const current = findings.map(key);

if (WRITE) {
  const uniq = [...new Set(current)].sort();
  writeFileSync(BASELINE, JSON.stringify(uniq, null, 2) + '\n');
  console.log(`plain-writing: baseline written — ${uniq.length} known violation(s) frozen.`);
  process.exit(0);
}

const baseline = existsSync(BASELINE) ? new Set(JSON.parse(readFileSync(BASELINE, 'utf8'))) : new Set();
const fresh = findings.filter(f => !baseline.has(key(f)));

console.log(`plain-writing lint (STD-007): ${files.length} standards · ${findings.length} violation(s) · ${baseline.size} baselined`);

if (REPORT) {
  for (const f of findings) console.log(`  ${f.check} ${f.file}:${f.line || '-'} :: ${f.token}`);
  process.exit(0);
}

if (fresh.length) {
  console.log(`\n✗ ${fresh.length} NEW STD-007 violation(s):\n`);
  for (const f of fresh) console.log(`    ${f.check} ${f.file}:${f.line || '-'} :: ${f.token}`);
  console.log(`
STD-007: name other documents by their plain subject in prose, collect the
IDs you depend on in one \`## References\` table at the end, and never point
at another document's section number — it moves, your citation does not.
Fix the prose, or update the baseline deliberately.`);
  process.exit(1);
}

console.log('✓ no new STD-007 violations.');
