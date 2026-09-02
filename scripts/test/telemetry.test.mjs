#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// telemetry.test.mjs — MIS-138 acceptance, the parts that hold at step 2.
//
//   SHAPE     every figure carries value/unit/definition; dataset carries head + corpus_hash.
//   DETERMIN. two runs on the same tree agree on every value.
//   LEGACY    series.registration equals count-evidence.py `matricula` per series
//             (registered/total/apparatus) while count-evidence.py still exists (criterion 2).
//   TRUTH     three fixtures counted by hand in a scratch clone come back as counted.
//
// Run: node scripts/test/telemetry.test.mjs
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync, readFileSync, readdirSync, rmSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { ROOT } from '../lib/frontmatter.mjs';

const results = [];
const check = (name, fn) => { try { const r = fn(); results.push({ name, ok: r !== false && typeof r !== 'string', note: typeof r === 'string' ? r : '' }); } catch (e) { results.push({ name, ok: false, note: e.message.split('\n')[0] }); } };
const run = (cwd) => JSON.parse(execFileSync('node', [path.join(cwd, 'scripts/telemetry.mjs'), '--print'], { cwd, encoding: 'utf8' }));

const t1 = run(ROOT); const t2 = run(ROOT);
check('every figure carries value, unit, definition', () => Object.values(t1.figures).every((f) => 'value' in f && typeof f.unit === 'string' && f.definition.length > 10));
check('dataset carries head, corpus_hash (sha256), measured_at, families', () => /^[0-9a-f]{7}(\+index)?$/.test(t1.head) && /^[0-9a-f]{64}$/.test(t1.corpus_hash) && Array.isArray(t1.families));
check('deterministic: two runs agree on every value', () => {
  const diff = Object.keys(t1.figures).filter((k) => JSON.stringify(t1.figures[k].value) !== JSON.stringify(t2.figures[k].value));
  return diff.length === 0 || `differ: ${diff.join(', ')}`;
});
check('keys are namespaced family.key and unique per family', () => Object.keys(t1.figures).every((k) => /^[a-z]+\.[A-Za-z0-9_]+$/.test(k)));

const ce = path.join(ROOT, 'scripts/count-evidence.py');
if (existsSync(ce)) {
  check('legacy: series.registration == count-evidence.py matricula (registered/total/apparatus per series)', () => {
    const j = JSON.parse(execFileSync('python3', [ce, '--json'], { cwd: ROOT, encoding: 'utf8' }));
    const mine = t1.figures['series.registration'].value;
    const bad = Object.entries(j.matricula).filter(([d, r]) => !mine[d] || mine[d].registered !== r.con || mine[d].total !== r.total || mine[d].apparatus !== r.aparato).map(([d]) => d);
    return bad.length === 0 || `differ on: ${bad.join(', ')}`;
  });
}

// Criterion 2, frozen: count-evidence.py --json captured at the HEAD it was retired from, on that
// tree minus telemetry/ (the script counted the dataset's own rendered page; the instrument never does).
// The legacy family must still produce that dict when run on that same tree. Checked here by
// re-running the instrument in a scratch clone checked out at the fixture's HEAD when the
// commit is reachable; skipped (named) when it is not (shallow CI clone).
const fixturesDir = path.join(ROOT, 'scripts/test/fixtures');
const golden = existsSync(fixturesDir) ? readdirSync(fixturesDir).filter((f) => /^count-evidence-[0-9a-f]{7}\.json$/.test(f)) : [];
for (const f of golden) {
  const sha = f.slice('count-evidence-'.length, -'.json'.length);
  check(`legacy: --legacy-json at ${sha} reproduces the golden count-evidence.py dict (${f})`, () => {
    const reachable = spawnSync('git', ['-C', ROOT, 'cat-file', '-e', `${sha}^{commit}`]).status === 0;
    if (!reachable) return `skipped: ${sha} not in this clone`;
    const clone = mkdtempSync(path.join(tmpdir(), 'telemetry-golden-'));
    try {
      execFileSync('git', ['-C', ROOT, 'worktree', 'add', '--detach', '-q', clone, sha], { stdio: 'ignore' });
      // the golden was captured on that tree minus telemetry/ (the instrument's predicate); same here
      spawnSync('git', ['-C', clone, 'rm', '-r', '-q', '--cached', 'telemetry'], { stdio: 'ignore' });
      rmSync(path.join(clone, 'telemetry'), { recursive: true, force: true });
      rmSync(path.join(clone, 'scripts'), { recursive: true, force: true });
      cpSync(path.join(ROOT, 'scripts'), path.join(clone, 'scripts'), { recursive: true });
      const got = JSON.parse(execFileSync('node', [path.join(clone, 'scripts/telemetry.mjs'), '--legacy-json'], { cwd: clone, encoding: 'utf8' }));
      const want = JSON.parse(readFileSync(path.join(fixturesDir, f), 'utf8'));
      const bad = Object.keys(want).filter((k) => JSON.stringify(want[k]) !== JSON.stringify(got[k]));
      return bad.length === 0 || `differ on: ${bad.join(', ')}`;
    } finally {
      spawnSync('git', ['-C', ROOT, 'worktree', 'remove', '--force', clone]);
      rmSync(clone, { recursive: true, force: true });
    }
  });
}

check('fixture: an added done mission without Closure moves missions.total and done_without_closure by exactly 1', () => {
  const clone = scratchClone();
  try {
    writeFileSync(path.join(clone, 'missions/MIS-9999-fixture.md'), '---\nid: "MIS-999"\ntype: mission\nstatus: done\nguild: Alchemists\n---\n# fixture\n\n## Scope\nnone\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const t = run(clone);
    const d = (k) => t.figures[k].value - t1.figures[k].value;
    return (d('missions.total') === 1 && d('missions.done_without_closure') === 1 && d('corpus.docs_total') === 1) || `deltas total=${d('missions.total')} dwc=${d('missions.done_without_closure')} docs=${d('corpus.docs_total')}`;
  } finally { rmSync(clone, { recursive: true, force: true }); }
});
check('fixture: a mis-named file in debt/ lowers series.registration.debt.pct, not the count of registered', () => {
  const clone = scratchClone();
  try {
    writeFileSync(path.join(clone, 'debt/no-prefix-fixture.md'), '---\nid: "X"\ntype: documentation\nstatus: active\n---\n# f\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    const a = t1.figures['series.registration'].value.debt, b = run(clone).figures['series.registration'].value.debt;
    return (b.registered === a.registered && b.total === a.total + 1 && b.pct < a.pct) || `before ${JSON.stringify(a)} after ${JSON.stringify(b)}`;
  } finally { rmSync(clone, { recursive: true, force: true }); }
});
check('fixture: corpus_hash changes when a tracked file changes, and --check then reports STALE', () => {
  const clone = scratchClone();
  try {
    execFileSync('node', [path.join(clone, 'scripts/telemetry.mjs')], { cwd: clone, stdio: 'ignore' });
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    execFileSync('git', ['-C', clone, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'telemetry'], { stdio: 'ignore' });
    let r = spawnSync('node', [path.join(clone, 'scripts/telemetry.mjs'), '--check'], { cwd: clone, encoding: 'utf8' });
    if (r.status !== 0) return `expected OK on a fresh dataset: ${r.stderr.trim()}`;
    const before = JSON.parse(readFileSync(path.join(clone, 'telemetry/latest.json'), 'utf8')).corpus_hash;
    writeFileSync(path.join(clone, 'debt/DBT-999-fixture.md'), '---\nid: "DBT-999"\ntype: documentation\nstatus: active\n---\n# f\n');
    execFileSync('git', ['-C', clone, 'add', '-A'], { stdio: 'ignore' });
    execFileSync('git', ['-C', clone, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'change'], { stdio: 'ignore' });
    r = spawnSync('node', [path.join(clone, 'scripts/telemetry.mjs'), '--check'], { cwd: clone, encoding: 'utf8' });
    if (!(r.status === 1 && /STALE/.test(r.stderr))) return `expected STALE exit 1, got ${r.status}: ${r.stderr.trim()}`;
    const after = run(clone).corpus_hash;
    return before !== after || 'corpus_hash did not change';
  } finally { rmSync(clone, { recursive: true, force: true }); }
});

function scratchClone() {
  // Fresh repo, never the worktree's .git pointer: a fixture `git add` must touch only the clone.
  const dir = mkdtempSync(path.join(tmpdir(), 'telemetry-'));
  cpSync(ROOT, dir, { recursive: true, filter: (src) => !/[\\/](\.git|node_modules|dist|\.astro|\.hermes|telemetry)([\\/]|$)/.test(src) });
  execFileSync('git', ['-C', dir, 'init', '--quiet'], { stdio: 'ignore' });
  execFileSync('git', ['-C', dir, 'add', '-A'], { stdio: 'ignore' });
  execFileSync('git', ['-C', dir, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'base'], { stdio: 'ignore' });
  return dir;
}

const failed = results.filter((r) => !r.ok);
for (const r of results) console.log(`${r.ok ? '✓' : '✖'} ${r.name}${r.note ? ` — ${r.note}` : ''}`);
console.log(`\n${results.length - failed.length} passed, ${failed.length} failed`);
process.exit(failed.length ? 1 : 0);
