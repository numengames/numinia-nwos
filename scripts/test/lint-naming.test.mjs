// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Fixture tests for the reports/ rule in lint-naming.mjs (ADR-005 v1.2.0).
//
// Written 2026-09-01 with the reports/ normalisation. The guard is anchored
// to its own repository (git ls-files from ROOT), so each case builds a
// throwaway git repo under a temp dir, copies the guard and its registry in,
// stages the fixture files, and reads `--report` output. Nothing here touches
// the real tree.
//
// What is pinned:
//   - RPT-YYYY-MM-DD.md is legal in reports/ ONLY when subtype: daily
//   - a daily with a numbered id is a violation; a non-daily with a dated id is one too
//   - the date shape is not legal anywhere else (missions/RPT-2026-01-01.md fails)
//   - reports/evidence/** is not held to the series scheme
//   - AUD- is no longer a shape reports/ accepts
//
// Run: npm test

import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); // scripts/

const fixtures = {
  'reports/RPT-2026-01-01.md':               'subtype: daily',
  'reports/RPT-2026-01-02.md':               'subtype: audit',
  'reports/RPT-2026-01-03-with-slug.md':     'subtype: analysis',
  'reports/RPT-001-numbered-daily.md':       'subtype: daily',
  'reports/RPT-003-wardley-map.md':          'subtype: analysis',
  'reports/AUD-2026-08-17-stack.md':         'subtype: audit',
  'reports/evidence/RPT-011/captured.md':    'subtype: audit',
  'missions/RPT-2026-01-01.md':              'subtype: daily',
  'missions/MIS-0001-clean.md':              '',
};

const expect = [
  ['reports/RPT-2026-01-01.md',            null,   'daily with a dated id is clean'],
  ['reports/RPT-2026-01-02.md',            'N-04', 'audit with a dated id fails (date form is for daily only)'],
  ['reports/RPT-2026-01-03-with-slug.md',  'N-04', 'dated id with a slug matches neither shape'],
  ['reports/RPT-001-numbered-daily.md',    'N-04', 'daily with a numbered id fails'],
  ['reports/RPT-003-wardley-map.md',       null,   'RPT-NNN analysis is clean'],
  ['reports/AUD-2026-08-17-stack.md',      'N-04', 'AUD- is retired'],
  ['reports/evidence/RPT-011/captured.md', null,   'evidence annex is not held to the series scheme'],
  ['missions/RPT-2026-01-01.md',           'N-04', 'the date form is not legal outside reports/'],
  ['missions/MIS-0001-clean.md',           null,   'control: an ordinary series file is clean'],
];

const dir = mkdtempSync(path.join(tmpdir(), 'lint-naming-'));
let lines = [];

before(() => {
  /* The guard is run as it ships: its libraries and rules travel with it. */
  mkdirSync(path.join(dir, 'scripts'), { recursive: true });
  cpSync(path.join(HERE, 'lint-naming.mjs'), path.join(dir, 'scripts', 'lint-naming.mjs'));
  cpSync(path.join(HERE, 'lib'), path.join(dir, 'scripts', 'lib'), { recursive: true });
  cpSync(path.join(HERE, 'blind-spots.json'), path.join(dir, 'scripts', 'blind-spots.json'));
  // The classification it shares with std-006 travels too (guards/lib/naming.mjs).
  cpSync(path.join(HERE, '..', 'guards', 'lib'), path.join(dir, 'guards', 'lib'), { recursive: true });

  for (const [rel, sub] of Object.entries(fixtures)) {
    const abs = path.join(dir, rel);
    mkdirSync(path.dirname(abs), { recursive: true });
    const id = path.basename(rel, '.md');
    writeFileSync(abs, `---\nid: "${id}"\ntype: report\n${sub}\nstatus: active\n---\n# ${id}\n`);
  }

  const git = (...a) => execFileSync('git', ['-C', dir, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  git('init', '-q');
  git('add', '-A');

  let out = '';
  try {
    out = execFileSync('node', [path.join(dir, 'scripts', 'lint-naming.mjs'), '--report'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    out = (e.stdout || '') + (e.stderr || '');
  }
  lines = out.split('\n');
});
after(() => rmSync(dir, { recursive: true, force: true }));

for (const [rel, check, why] of expect) {
  test(`${rel} — ${why}`, () => {
    const hits = lines.filter((l) => l.includes(` ${rel} :: `) && l.startsWith('N-04'));
    assert.equal(hits.length, check ? 1 : 0, `expected ${check ? 'one N-04' : 'no N-04'}, got ${hits.length}: ${hits.join(' | ') || lines.join('\n')}`);
  });
}
