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
import { existsSync, mkdirSync, mkdtempSync, writeFileSync, readFileSync, readdirSync, rmSync, cpSync } from 'node:fs';
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

// Criterion 6: my encoder == tiktoken.encode_ordinary over EVERY document, not one. Needs a python
// with tiktoken (TIKTOKEN_PY, default /tmp/tiktoken-venv/bin/python3) and the rank file; named skip otherwise.
check('tokens: cl100k.mjs equals tiktoken over every tracked .md (criterion 6)', () => {
  const py = process.env.TIKTOKEN_PY ?? '/tmp/tiktoken-venv/bin/python3';
  if (!existsSync(py)) return `skipped: no ${py}`;
  if (t1.figures['tokens.total'].value === null) return `skipped: ${t1.figures['tokens.total'].definition}`;
  const rows = JSON.parse(readFileSync(path.join(ROOT, 'telemetry/docs.json'), 'utf8'));
  const script = "import json,sys,tiktoken\ne=tiktoken.get_encoding('cl100k_base')\nrows=json.load(sys.stdin)\nbad=[r['path'] for r in rows if len(e.encode_ordinary(open(r['path'],encoding='utf-8').read()))!=r['tokens']]\nprint(json.dumps(bad))";
  const bad = JSON.parse(execFileSync(py, ['-c', script], { cwd: ROOT, input: JSON.stringify(rows), encoding: 'utf8', env: { ...process.env, TIKTOKEN_CACHE_DIR: '/tmp/tk' } }));
  return bad.length === 0 || `differ on ${bad.length}: ${bad.slice(0, 3).join(', ')}`;
});

// D4 layer 2: the register is verified against the tree every run — open → resolved when the quote
// leaves its file, moved when it turns up in another tracked .md. The instrument never edits.
check('contradictions: claims.json states follow the tree (open → resolved / moved)', () => {
  const c = scratchClone();
  try {
    const reg = JSON.parse(readFileSync(path.join(c, 'telemetry/claims.json'), 'utf8'));
    // a claim whose quote occurs in exactly one tracked .md — the only kind whose state can move
    const first = reg.claims.find((x) => x.path.endsWith('.md') && execFileSync('git', ['-C', c, 'grep', '-l', '-F', x.quote, '--', '*.md'], { encoding: 'utf8' }).trim().split('\n').length === 1);
    if (!first) return 'skipped: no .md claim in register';
    const f = path.join(c, first.path); const t = readFileSync(f, 'utf8');
    writeFileSync(f, t.split(first.quote).join('QUOTE-GONE'));
    writeFileSync(path.join(c, 'debt/moved-fixture.md'), `---\nid: DBT-999\ntitle: fixture\nstatus: active\n---\n${first.quote}\n`);
    execFileSync('git', ['-C', c, 'add', '-A'], { stdio: 'ignore' });
    const moved = run(c).figures['contradictions.claims'].value.find((r) => r.id === first.id);
    rmSync(path.join(c, 'debt/moved-fixture.md')); execFileSync('git', ['-C', c, 'add', '-A'], { stdio: 'ignore' });
    const resolved = run(c).figures['contradictions.claims'].value.find((r) => r.id === first.id);
    return (moved.state === 'moved' && moved.where === 'debt/moved-fixture.md' && resolved.state === 'resolved') || `got ${moved.state}/${moved.where} then ${resolved.state}`;
  } finally { rmSync(c, { recursive: true, force: true }); }
});

// Criterion 9: the ledger only grows. Every line ever committed in history.jsonl is still in it,
// in order — a ship step that deletes telemetry/ before measuring would truncate it (it did, #211–#213).
check('history.jsonl: no line ever committed has been removed', () => {
  const past = execFileSync('git', ['-C', ROOT, 'log', '--reverse', '--format=%h', '--', 'telemetry/history.jsonl'], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  if (!past.length) return 'skipped: no committed history';
  const now = readFileSync(path.join(ROOT, 'telemetry/history.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l).corpus_hash);
  const missing = new Set();
  for (const c of past) for (const l of execFileSync('git', ['-C', ROOT, 'show', `${c}:telemetry/history.jsonl`], { encoding: 'utf8' }).split('\n').filter(Boolean)) { const h = JSON.parse(l).corpus_hash; if (!now.includes(h)) missing.add(h.slice(0, 12)); }
  return missing.size === 0 || `removed: ${[...missing].join(', ')}`;
});

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
  // telemetry/ is output and stays out — except claims.json, which is input (the register)
  if (existsSync(path.join(ROOT, 'telemetry/claims.json'))) { mkdirSync(path.join(dir, 'telemetry'), { recursive: true }); cpSync(path.join(ROOT, 'telemetry/claims.json'), path.join(dir, 'telemetry/claims.json')); }
  execFileSync('git', ['-C', dir, 'init', '--quiet'], { stdio: 'ignore' });
  execFileSync('git', ['-C', dir, 'add', '-A'], { stdio: 'ignore' });
  execFileSync('git', ['-C', dir, '-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', 'base'], { stdio: 'ignore' });
  return dir;
}

const failed = results.filter((r) => !r.ok);
for (const r of results) console.log(`${r.ok ? '✓' : '✖'} ${r.name}${r.note ? ` — ${r.note}` : ''}`);
console.log(`\n${results.length - failed.length} passed, ${failed.length} failed`);
process.exit(failed.length ? 1 : 0);
