#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// blindness.test.mjs — D-025 closure condition 3.
//
// "The blind spots are verified by test, not asserted — a guard claiming to
//  see .ts files is checked against a .ts file that breaks."
//
// A declared blind-spot list nobody verified is a claim about coverage with
// the shape of evidence. This suite makes each claim falsifiable:
//
//   STRUCTURAL  every guard in CI has a registry entry; every registry entry
//               points at a script that exists and actually imports the
//               declaration module. Catches a guard added without declaring,
//               and a declaration for a guard that was deleted.
//
//   BEHAVIOURAL the declaration is printed on SUCCESS, not only on failure.
//               That was the whole complaint: green is when the reader most
//               needs to know what was not checked.
//
//   FIXTURE     the interesting blind spots are PROVEN. A file that should
//               trip the guard is built in a scratch clone, the guard is run,
//               and the test asserts the guard stays green — demonstrating
//               the blindness is real and the declaration is honest.
//
// Run: npm test

import { execFileSync, execSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync, mkdirSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry, formatBlindSpots } from '../lib/blindness.mjs';

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const registry = loadRegistry();

import test from 'node:test';
const check = (name, fn) => test(name, () => { fn(); });
function assert(cond, msg) { if (!cond) throw new Error(msg); }

/* ---------- STRUCTURAL ---------- */

// Guards actually wired into .github/workflows/ci.yml. Parsed, not typed out,
// so a guard added to CI without a declaration fails this suite.
const ciYaml = readFileSync(path.join(ROOT, '.github/workflows/ci.yml'), 'utf8');
const ciGuards = [...ciYaml.matchAll(/run:\s*node (scripts\/[\w.-]+)\.mjs/g)].map((m) => m[1]);

check('every guard run by CI has a blind-spot declaration', () => {
  const declared = new Set(Object.values(registry.guards).map((g) => g.script.replace(/\.mjs$/, '')));
  const missing = ciGuards.filter((g) => !declared.has(g));
  assert(missing.length === 0,
    `these guards run in CI but declare no blind spots: ${missing.join(', ')}`);
});

check('every guard run by CI is a build guard or answers to the regime (ENG-067)', () => {
  // ENG-067's exception is declared, not assumed: a guard that bites regardless
  // of any standard's state says so in its registry entry (`build_guard`), and
  // every other guard in CI hands its findings to scripts/lib/regime.mjs. A
  // guard that is neither is exactly the defect of DBT-017 — code obliging
  // where no document obliges.
  const offenders = [];
  for (const g of ciGuards) {
    const entry = Object.values(registry.guards).find((e) => e.script === `${g}.mjs`);
    if (!entry) continue;                              // the check above reports it
    if (entry.build_guard) continue;
    const src = readFileSync(path.join(ROOT, entry.script), 'utf8');
    if (!src.includes('lib/regime.mjs')) offenders.push(g);
  }
  assert(offenders.length === 0,
    `these CI guards neither declare build_guard nor use regime.mjs: ${offenders.join(', ')}`);
});

check('every registry entry points at a script that exists and imports the module', () => {
  for (const [id, g] of Object.entries(registry.guards)) {
    const abs = path.join(ROOT, g.script);
    let src;
    try { src = readFileSync(abs, 'utf8'); }
    catch { throw new Error(`${id}: registry names ${g.script}, which does not exist`); }
    if (!g.script.endsWith('.mjs')) continue;   // .py guards declare in their own output
    assert(src.includes('blindness.mjs'),
      `${id}: ${g.script} has a registry entry but never imports lib/blindness.mjs — ` +
      `it would declare nothing at runtime`);
    assert(src.includes(`declareBlindSpots('${id}')`) || src.includes(`declareBlindSpots("${id}")`),
      `${id}: ${g.script} imports the module but does not call declareBlindSpots('${id}')`);
  }
});

check('every declared blind spot names a coverer or admits there is none', () => {
  for (const [id, g] of Object.entries(registry.guards)) {
    assert(g.blind_to.length > 0, `${id}: declares an empty blind-spot list — that is a claim, not an omission`);
    for (const b of g.blind_to) {
      assert(typeof b.spot === 'string' && b.spot.length > 20,
        `${id}: a blind spot must be described concretely, got ${JSON.stringify(b.spot)}`);
      assert('covered_by' in b,
        `${id}: "${b.spot.slice(0, 40)}…" does not say which guard covers it (use null for none)`);
    }
  }
});

check('formatBlindSpots refuses an unknown guard', () => {
  let threw = false;
  try { formatBlindSpots('no-such-guard'); } catch { threw = true; }
  assert(threw, 'an unregistered guard id must throw, not silently print nothing');
});

/* ---------- BEHAVIOURAL ---------- */

check('the declaration is printed on SUCCESS, not only on failure', () => {
  // check-frontmatter-delimiter is green on a clean corpus: perfect success case.
  const res = spawnGuard('scripts/check-frontmatter-delimiter.mjs', ROOT);
  assert(res.status === 0, `expected a green run to test success output, got exit ${res.status}`);
  assert(/BLIND TO \(D-025\)/.test(res.stderr),
    'a green guard run did not print its blind spots — this is the exact failure D-025 describes');
});

check('the declaration survives a failing run too', () => {
  // Force a failure: an unparseable fence in a scratch clone. TXT-002 bites
  // only while its holder STD-006 is `active` (ENG-067); the fixture sets
  // that state itself so the test reads the guard, not the tree's lifecycle.
  const clone = scratchClone();
  try {
    const holder = path.join(clone, 'standards/STD-006-plain-text-is-sovereign.md');
    writeFileSync(holder, readFileSync(holder, 'utf8').replace(/^status: \w+$/m, 'status: active'));
    writeFileSync(path.join(clone, 'debt/D-000-fence-broken.md'), '---\nid: "D-000"\n---# glued\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const res = spawnGuard('scripts/check-frontmatter-delimiter.mjs', clone);
    assert(res.status === 1, `expected the guard to fail on a glued fence, got exit ${res.status}`);
    assert(/BLIND TO \(D-025\)/.test(res.stderr),
      'the blind-spot declaration vanished on the failure path');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

/* ---------- FIXTURE: the blindness is real ---------- */

check('D-047 fixture — a wrong FOLDER in a path citation really does read green', () => {
  const clone = scratchClone();
  try {
    // guilds/alquimistas/GLD-001-charter.md exists; agents/guilds/... does not.
    writeFileSync(path.join(clone, 'debt/D-000-probe.md'),
      '---\nid: "D-000"\nlicense: "CC-BY-4.0"\n---\n\nSee `agents/guilds/alquimistas/GLD-001-charter.md`.\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const res = spawnGuard('scripts/check-references.mjs', clone);
    assert(res.status === 0,
      `the reference guard CAUGHT a wrong folder — D-047 may be fixed; update the registry ` +
      `and delete this fixture (exit ${res.status})`);
    assert(/falls back to basename|FOLDER in a path citation/.test(res.stderr),
      'the guard is blind to the folder but does not say so');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

check('D-049 fixture — an untracked .md is genuinely not scanned, and is named', () => {
  const clone = scratchClone();
  try {
    // Untracked, and broken: a citation to a file that does not exist anywhere.
    writeFileSync(path.join(clone, 'debt/D-000-untracked.md'),
      '---\nid: "D-000"\n---\n\nSee `canon/C-999-does-not-exist.md`.\n');
    const res = spawnGuard('scripts/check-references.mjs', clone);
    assert(res.status === 0,
      `the guard scanned an untracked file — D-049 may be fixed (exit ${res.status})`);
    assert(/NOT scanned/.test(res.stderr),
      'the untracked file was skipped WITHOUT any warning — silent blindness is the bug');
    assert(/D-000-untracked\.md/.test(res.stderr),
      'the warning fired but did not NAME the file it could not see');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

check('license guard fixture — a .md with no license: field is skipped, as declared', () => {
  const clone = scratchClone();
  try {
    writeFileSync(path.join(clone, 'debt/D-000-nolicense.md'), '---\nid: "D-000"\n---\n\nNo licence field.\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const res = spawnGuard('scripts/check-license-frontmatter.mjs', clone);
    assert(res.status === 0,
      `the licence guard flagged a file with no license: field — the declaration is now wrong (exit ${res.status})`);
    assert(/no `license:` field|files with no `license:` field/.test(res.stderr),
      'the guard skips unlicensed files but does not declare that it does');
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

/* ---------- helpers ---------- */

// execFileSync THROWS on a non-zero exit, which would make every failure-path
// assertion unreachable. spawnSync returns the status instead, which is the
// thing under test here.
function spawnGuard(rel, cwd) {
  // Run the guard's copy INSIDE the target tree. These scripts resolve ROOT
  // from their own file location (import.meta.url), not from process.cwd(),
  // so invoking the original binary against a scratch clone would silently
  // inspect the original repo — the fixture would prove nothing.
  const r = spawnSync('node', [path.join(cwd, rel)], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (r.error) throw r.error;
  return { status: r.status, stdout: r.stdout ?? '', stderr: r.stderr ?? '' };
}

// A scratch copy of the WORKING TREE, not `git clone` and not `git ls-files`
// — both are index-bound (D-049, the very blindness under test): a brand-new
// scripts/lib/blindness.mjs is invisible to them, so the fixtures would run
// guards that cannot import it. Copy what is ON DISK.
function scratchClone() {
  const dir = mkdtempSync(path.join(tmpdir(), 'blindness-'));
  const SKIP = new Set(['.git', 'node_modules', 'dist', '.astro', '.hermes']);
  (function copyDir(from, to) {
    mkdirSync(to, { recursive: true });
    for (const ent of readdirSync(from, { withFileTypes: true })) {
      if (SKIP.has(ent.name)) continue;
      const src = path.join(from, ent.name);
      const dst = path.join(to, ent.name);
      if (ent.isDirectory()) copyDir(src, dst);
      else if (ent.isFile()) writeFileSync(dst, readFileSync(src));
    }
  })(ROOT, dir);
  execFileSync('git', ['-C', dir, 'init', '--quiet'], { stdio: 'ignore' });
  execFileSync('git', ['-C', dir, 'add', '-A'], { stdio: 'ignore' });
  // One commit, or the branch is unborn and `git log` is fatal: the reference
  // guard reads the deletion history (git log --diff-filter=D) at load, and
  // an unborn branch made every fixture crash with 128 before it could prove
  // anything — which read as "the blindness may be fixed". It was not.
  execFileSync('git', ['-C', dir, '-c', 'user.name=fixture', '-c', 'user.email=fixture@test',
    'commit', '--quiet', '--allow-empty-message', '-m', ''], { stdio: 'ignore' });
  return dir;
}

