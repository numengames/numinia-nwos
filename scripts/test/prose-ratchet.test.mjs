#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// prose-ratchet.test.mjs — the guard's own behaviour, proven.
//
// check-prose-in-code exists because MIS-071's acceptance criterion ("no
// prose lives only in a component") was never measured, and ten essays
// acquired silent duplicates while every guard reported green. A ratchet
// nobody tested would be the same mistake one level up: a number that looks
// like evidence.
//
// Each test runs the real guard against a real scratch file and asserts the
// exit code. No mocking — the thing under test is the guard's verdict.
//
// Run: node scripts/test/prose-ratchet.test.mjs

import { spawnSync, execSync } from 'node:child_process';
import { readFileSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import path from 'node:path';

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const GUARD = path.join(ROOT, 'scripts', 'check-prose-in-code.mjs');
const BASELINE = path.join(ROOT, 'scripts', 'prose-baseline.json');

let pass = 0;
const failures = [];
function check(name, fn) {
  try {
    fn();
    pass++;
    console.log(`  ok   ${name}`);
  } catch (e) {
    failures.push([name, e.message]);
    console.log(`  FAIL ${name}`);
    console.log(`       ${e.message}`);
  }
}
function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

/** Run the guard, return { code, out }. */
function runGuard(args = []) {
  const r = spawnSync('node', [GUARD, ...args], { encoding: 'utf8' });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
}

console.log('prose ratchet — the guard is tested, not trusted\n');

check('the baseline file exists and parses', () => {
  const b = JSON.parse(readFileSync(BASELINE, 'utf8'));
  assert(typeof b.orphan_chars === 'number', 'orphan_chars must be a number');
  assert(b.orphan_chars >= 0, 'orphan_chars must not be negative');
  assert(Array.isArray(b.entries), 'entries must be a list');
});

check('an unchanged tree passes', () => {
  const { code, out } = runGuard();
  assert(code === 0, `expected exit 0, got ${code}\n${out}`);
});

check('the guard declares its blind spots on success (D-025)', () => {
  const { out } = runGuard();
  assert(
    out.includes('BLIND TO (D-025)'),
    'the declaration must print on a green run — that is when the reader needs it'
  );
});

// The decisive test: prose written into a component must fail the build.
const SCRATCH = path.join(ROOT, 'web', 'src', 'components', '_ProseRatchetFixture.astro');
check('prose added to a component FAILS the guard', () => {
  writeFileSync(
    SCRATCH,
    '---\n// scratch fixture, deleted by the test\n---\n' +
      '<p>This is a paragraph of prose written straight into a component ' +
      'instead of into a markdown file, which is precisely the failure mode ' +
      'that MIS-071 exists to stop from happening a second time.</p>\n'
  );
  try {
    const { code, out } = runGuard();
    assert(code === 1, `expected exit 1 on growth, got ${code}\n${out}`);
    assert(
      out.includes('GREW by'),
      'the failure must say how much it grew, not just that it failed'
    );
  } finally {
    rmSync(SCRATCH, { force: true });
  }
});

check('removing the fixture restores green', () => {
  const { code } = runGuard();
  assert(code === 0, `expected exit 0 after cleanup, got ${code}`);
});

// A ratchet that only fails is half a tool: it must also recognise progress.
check('prose REMOVED is reported as shrinkage, not silence', () => {
  const target = path.join(ROOT, 'web', 'src', 'pages', 'cao.astro');
  const backup = readFileSync(target, 'utf8');
  try {
    // Strip a chunk of prose the way wiring a page to its .md would.
    const stripped = backup.replace(/>[^<>{}]{200,}</g, '><');
    assert(stripped !== backup, 'fixture precondition: cao.astro must carry prose');
    writeFileSync(target, stripped);
    const { code, out } = runGuard();
    assert(code === 0, `shrinkage must not fail the build, got ${code}`);
    assert(
      out.includes('SHRANK by'),
      'the guard must name the improvement and ask for a re-freeze'
    );
  } finally {
    writeFileSync(target, backup);
  }
});

check('--update refuses to re-freeze growth', () => {
  writeFileSync(
    SCRATCH,
    '---\n---\n<p>More prose in a component, again long enough to be counted ' +
      'as real prose by the measure this guard applies to the tree.</p>\n'
  );
  try {
    const { code, out } = runGuard(['--update']);
    assert(code === 1, `--update must refuse growth, got exit ${code}`);
    assert(
      out.includes('only turns one way'),
      'the refusal must explain that the ratchet is directional'
    );
    // and it must not have written the larger number
    const b = JSON.parse(readFileSync(BASELINE, 'utf8'));
    const { out: out2 } = runGuard();
    const m = out2.match(/orphan\)\s*:\s*(\d+)/);
    assert(m, 'could not read the measured number back');
    assert(
      b.orphan_chars < Number(m[1]),
      'baseline must still hold the smaller, pre-growth number'
    );
  } finally {
    rmSync(SCRATCH, { force: true });
  }
});

check('the tree is left exactly as it was found', () => {
  const dirty = execSync('git status --porcelain web/src', { cwd: ROOT })
    .toString()
    .trim();
  assert(dirty === '', `tests must not leave changes behind:\n${dirty}`);
});

console.log('');
if (failures.length) {
  console.log(`${pass} passed, ${failures.length} failed\n`);
  for (const [n, m] of failures) console.log(`  ${n}\n    ${m}`);
  process.exit(1);
}
console.log(`${pass} passed, 0 failed\n`);
console.log(
  'The ratchet fails on growth, reports shrinkage, refuses to re-freeze\n' +
    'backwards, and cleans up after itself. It is an instrument, not a claim.'
);
