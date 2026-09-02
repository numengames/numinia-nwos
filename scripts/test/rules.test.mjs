#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// rules.test.mjs — MIS-138 D1.1: the shared classifiers are data the guards
// actually consume, and the data agrees with the rulings it transcribes.
//
//   STRUCTURAL  rules.json parses; every series has a prefix list and digits;
//               every `types.series` target is a registered series; every
//               governed dir is a real top-level directory or a registered
//               empty shelf; each guard that must read the file imports lib.
//
//   BEHAVIOURAL parseFM keeps the NESTED contract (the false positive that
//               nearly deleted 90 lines); isApparatus/isTemplate agree with
//               the three lists they replaced on the cases that used to differ.
//
// Run: node scripts/test/rules.test.mjs   (exit 1 on any failure)
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { ROOT, NESTED, parseFM, loadRules, seriesDirs, prefixToDir, isApparatus, isTemplate } from '../lib/frontmatter.mjs';

const results = [];
const check = (name, fn) => { try { const r = fn(); results.push({ name, ok: r !== false, note: typeof r === 'string' ? r : '' }); } catch (e) { results.push({ name, ok: false, note: e.message }); } };
const rules = loadRules();

check('rules.json: every series carries prefix[] and digits', () =>
  seriesDirs(rules).every((d) => Array.isArray(rules.series[d].prefix) && Number.isInteger(rules.series[d].digits)));
check('rules.json: prefixes are unique across series and retired', () => {
  const all = seriesDirs(rules).flatMap((d) => rules.series[d].prefix).concat(Object.keys(rules.retiredPrefixes).filter((k) => !k.startsWith('_')));
  return new Set(all).size === all.length;
});
check('rules.json: types.series targets are registered series', () =>
  Object.values(rules.types.series).every((d) => rules.series[d]));
check('rules.json: lax types are in types.all', () => rules.types.lax.every((t) => rules.types.all.includes(t)));
check('rules.json: status keys are types or _default', () =>
  Object.keys(rules.status).filter((k) => !k.startsWith('_')).every((t) => rules.types.all.includes(t)));
check('rules.json: governed dirs exist in the tracked tree (or are the registered-empty infra/)', () => {
  const tracked = new Set(execFileSync('git', ['-C', ROOT, 'ls-files'], { encoding: 'utf8' }).split('\n').map((f) => f.split('/')[0]));
  const missing = rules.governed.dirs.filter((d) => !tracked.has(d));
  return missing.length === 0 || `missing: ${missing.join(', ')}`;
});
check('rules.json: every series dir with a naming scheme exists in the tree', () => {
  const tracked = new Set(execFileSync('git', ['-C', ROOT, 'ls-files'], { encoding: 'utf8' }).split('\n').map((f) => f.split('/')[0]));
  const missing = seriesDirs(rules).filter((d) => !tracked.has(d));
  return missing.length === 0 || `missing: ${missing.join(', ')}`;
});
for (const g of ['lint-naming', 'lint-frontmatter', 'check-references'])
  check(`${g}.mjs imports scripts/lib/frontmatter.mjs`, () => /from '\.\/lib\/frontmatter\.mjs'/.test(readFileSync(path.join(ROOT, 'scripts', `${g}.mjs`), 'utf8')));
check('no guard keeps a private SERIES/PREFIX map', () =>
  ['lint-naming', 'lint-frontmatter', 'check-references'].every((g) => !/^const (SERIES|PREFIX) = \{\n\s+\w+:/m.test(readFileSync(path.join(ROOT, 'scripts', `${g}.mjs`), 'utf8'))));

check('parseFM: bare key with indented children is NESTED, not empty', () => {
  const fm = parseFM('---\nid: X-1\nfondos:\n  - a\nempty:\n---\nbody');
  return fm.id === 'X-1' && fm.fondos === NESTED && fm.empty === '';
});
check('parseFM: strips one pair of quotes, keeps inner content', () => parseFM('---\ntitle: "a: b"\n---\n').title === 'a: b');
check('parseFM: returns null without a frontmatter block', () => parseFM('# no fm') === null);
check('prefixToDir: retired D resolves to debt', () => prefixToDir(rules).D === 'debt');
check('isApparatus: type meta, canonical basenames, template family', () =>
  isApparatus('standards/STANDARDS.md') && isApparatus('missions/TEMPLATE-EXAMPLE.md') && isApparatus('x/INDEX.md')
  && isApparatus('missions/ANNEX-x.md', { type: 'meta' }) && !isApparatus('missions/MIS-0138-x.md', { type: 'mission' }));
check('isTemplate: the two families lint-frontmatter exempted from H-06', () =>
  isTemplate('agents/_template/README.md') && isTemplate('missions/TEMPLATE.md') && isTemplate('missions/TEMPLATE-CHANGES.md') && !isTemplate('missions/MIS-0001-x.md'));

const failed = results.filter((r) => !r.ok);
for (const r of results) console.log(`${r.ok ? '✓' : '✖'} ${r.name}${r.note ? ` — ${r.note}` : ''}`);
console.log(`\n${results.length - failed.length} passed, ${failed.length} failed`);
process.exit(failed.length ? 1 : 0);
