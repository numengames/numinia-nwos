#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// run-guards.mjs — run every guard that reads the tree, one after another,
// and exit 1 if any of them did.
//
// Which scripts are guards is read from scripts/blind-spots.json, the one
// place that already lists them; a script missing from that file is not a
// guard and is not run here. Guards that need a built site (url-lifecycle)
// or a browser (responsive) are skipped unless their input is present, and
// the skip is printed.
//
// Usage:
//   npm run guards            # every guard, full output
//   npm run guards -- --quiet # one line per guard

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const QUIET = process.argv.includes('--quiet');

const registry = JSON.parse(readFileSync(path.join(HERE, 'blind-spots.json'), 'utf8'));
const guards = Object.keys(registry.guards).sort();

/* A guard that only makes sense against an artefact says so here. */
const needs = {
  'check-url-lifecycle': path.join(ROOT, 'web', 'dist'),
};
/* Not corpus guards: they take arguments or drive a browser. */
const notHere = new Set(['check-deletable', 'check-responsive']);

let failed = 0;
for (const name of guards) {
  if (notHere.has(name)) continue;
  const script = path.join(HERE, `${name}.mjs`);
  if (!existsSync(script)) { console.log(`?? ${name} — registered, no script`); failed += 1; continue; }
  if (needs[name] && !existsSync(needs[name])) { console.log(`-- ${name} — skipped, needs ${path.relative(ROOT, needs[name])}`); continue; }
  const r = spawnSync('node', [script], { cwd: ROOT, encoding: 'utf8' });
  const out = (r.stdout || '') + (r.stderr || '');
  const summary = /(\d+) finding\(s\), (\d+) enforced/.exec(out);
  const tag = r.status === 0 ? 'ok' : 'FAIL';
  console.log(`${tag.padEnd(4)} ${name}${summary ? ` — ${summary[1]} findings, ${summary[2]} enforced` : ''}`);
  if (!QUIET && (r.status !== 0 || summary?.[1] !== '0')) console.log(out.replace(/^/gm, '     '));
  if (r.status !== 0) failed += 1;
}
console.log(`\n${guards.length - notHere.size} guards, ${failed} failed`);
process.exit(failed ? 1 : 0);
