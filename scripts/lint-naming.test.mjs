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
// Run: node scripts/lint-naming.test.mjs

import { mkdtempSync, mkdirSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

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
try {
  mkdirSync(path.join(dir, 'scripts', 'lib'), { recursive: true });
  copyFileSync(path.join(HERE, 'lint-naming.mjs'), path.join(dir, 'scripts', 'lint-naming.mjs'));
  copyFileSync(path.join(HERE, 'lib', 'blindness.mjs'), path.join(dir, 'scripts', 'lib', 'blindness.mjs'));
  copyFileSync(path.join(HERE, 'blind-spots.json'), path.join(dir, 'scripts', 'blind-spots.json'));

  for (const [rel, sub] of Object.entries(fixtures)) {
    const abs = path.join(dir, rel);
    mkdirSync(path.dirname(abs), { recursive: true });
    const id = path.basename(rel, '.md');
    writeFileSync(abs, `---\nid: "${id}"\ntype: report\n${sub}\nstatus: closed\n---\n# ${id}\n`);
  }

  const git = (...a) => execFileSync('git', ['-C', dir, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  git('init', '-q');
  git('add', '-A');

  let out = '';
  try {
    out = execFileSync('node', [path.join(dir, 'scripts', 'lint-naming.mjs'), '--report'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch (e) {
    out = e.stdout || '';
  }
  const lines = out.split('\n');

  let failed = 0;
  for (const [rel, check, why] of expect) {
    const hits = lines.filter((l) => l.includes(` ${rel} :: `) && l.startsWith('N-04'));
    const ok = check ? hits.length === 1 : hits.length === 0;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${rel} — ${why}`);
    if (!ok) {
      failed++;
      console.log(`      expected ${check ? 'one N-04' : 'no N-04'}, got ${hits.length}: ${hits.join(' | ')}`);
    }
  }
  console.log(`\n${expect.length - failed}/${expect.length} passed`);
  process.exit(failed ? 1 : 0);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
