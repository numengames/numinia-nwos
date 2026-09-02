/**
 * telemetry families `headers` and `provenance`. MIS-138 D3.
 *
 * headers    — the frontmatter as used: fields, uid, dates. Ports frontmatter-census.py.
 * provenance — who and when, as the tree can prove it: nature of `author:` per document
 *              (provenance-census.py's buckets, over the whole corpus instead of the
 *              RPT-011 SBOM grant list), `created:` vs the commit that added the file
 *              (dates-vs-commits.py, over every doc with a created date instead of the
 *              post-tag set), renames that crossed a REUSE.toml regime (regime-crossings.py),
 *              and P-003's anchor rule status ∈ {done,frozen,cancelled,backlog} × owner
 *              (protocol-anchor.py's rule; its CYCLE_* input came from a /tmp file and is not
 *              reproducible — only the rule is ported).
 * Every git fact comes from ONE `git log` walk, cached per run.
 */
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from '../frontmatter.mjs';

const git = (...a) => execFileSync('git', ['-C', ROOT, ...a], { encoding: 'utf8', maxBuffer: 1 << 26 }).trimEnd();
const fig = (value, unit, definition) => ({ value, unit, definition });
const sorted = (o) => Object.fromEntries(Object.entries(o).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)));
const count = (m, k) => { m[k] = (m[k] ?? 0) + 1; };

/** Sole git walk: for every path ever added or renamed, the first add date and the rename pairs. */
let walk = null;
function history() {
  if (walk) return walk;
  const added = {}; const renames = [];
  let date = null;
  for (const line of git('log', '--reverse', '--date=short', '--format=@%ad', '--name-status', '-M', '--diff-filter=AR', '--', '*.md').split('\n')) {
    if (line.startsWith('@')) { date = line.slice(1); continue; }
    const [st, a, b] = line.split('\t');
    if (st === 'A' && !(a in added)) added[a] = date;
    else if (st?.startsWith('R') && b) { renames.push([a, b, date]); if (!(b in added)) added[b] = added[a] ?? date; }
  }
  return (walk = { added, renames });
}

/** REUSE.toml regime of a path: the last matching annotation wins (as reuse does). */
function regimeOf(p, rules) { let r = null; for (const [globs, lic] of rules) if (globs.some((g) => g.test(p))) r = lic; return r; }
function reuseRules() {
  const f = path.join(ROOT, 'REUSE.toml'); if (!existsSync(f)) return [];
  const out = [];
  for (const blk of readFileSync(f, 'utf8').split('[[annotations]]').slice(1)) {
    const paths = [...blk.matchAll(/"([^"]+)"/g)].map((m) => m[1]).filter((s) => !/^[A-Z0-9.-]+$/.test(s) || s.includes('/'));
    const lic = /SPDX-License-Identifier\s*=\s*"([^"]+)"/.exec(blk)?.[1];
    const pth = /path\s*=\s*(\[[^\]]*\]|"[^"]*")/.exec(blk)?.[1] ?? '';
    const globs = [...pth.matchAll(/"([^"]+)"/g)].map((m) => new RegExp('^' + m[1].replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '.*') + '$'));
    if (lic && globs.length) out.push([globs, lic]);
  }
  return out;
}

const LLM_RE = /(claude|gpt|opus|sonnet|fable|gemini|llm)/i;
const AI_PERSONAS = new Set(['ursa', 'nimrod', 'senet', 'adonaz', 'procurador-01', 'centinela-01', 'procyon', 'khepri', 'alquimista']);
const HUMANS = new Set(['pablo-fm', 'pablofm', 'oracle', 'pablo']);
const ORACLE_SET = new Set(['done', 'frozen', 'cancelled', 'backlog']);
const PLACEHOLDER_RE = /TODO|TBD|FIXME|\{\{|<.*>|xxx/i;
const norm = (v) => String(v ?? '').trim().toLowerCase().replace(/^["']|["']$/g, '');

export const headers = {
  measure({ docs }) {
    const withFm = docs.filter((d) => d.has_fm);
    const fields = {}; const hygiene = { dates_without_time: 0, empty_values: 0, v_prefixed_versions: 0, placeholders: 0 };
    const uids = {};
    for (const d of withFm) {
      for (const [k, v] of Object.entries(d.fm)) {
        count(fields, k);
        const s = v == null ? '' : String(v);
        if (s === '') hygiene.empty_values++;
        if (/^(created|updated)$/.test(k) && /^\d{4}-\d{2}-\d{2}$/.test(s)) hygiene.dates_without_time++;
        if (k === 'version' && /^v\d/.test(s)) hygiene.v_prefixed_versions++;
        if (PLACEHOLDER_RE.test(s)) hygiene.placeholders++;
      }
      if (d.fm.uid) count(uids, String(d.fm.uid));
    }
    const collisions = Object.entries(uids).filter(([, n]) => n > 1);
    return {
      docs_with_frontmatter: fig(withFm.length, 'documents', 'docs whose text opens with a --- block the shared reader parses'),
      docs_without_frontmatter: fig(docs.length - withFm.length, 'documents', 'corpus docs minus docs_with_frontmatter'),
      field_usage: fig(sorted(fields), 'documents', 'per frontmatter key, the number of docs carrying it, most used first'),
      uid_present: fig(Object.values(uids).reduce((a, b) => a + b, 0), 'documents', 'docs with a non-empty uid'),
      uid_collisions: fig(collisions.reduce((a, [, n]) => a + n - 1, 0), 'collisions', 'Σ(n−1) over uid values held by n>1 docs; values as typed (a shared placeholder counts, as in legacy.uid_colisiones)'),
      uid_collision_values: fig(collisions.map(([v, n]) => [v, n]), 'documents', 'the colliding uid values with their holder counts'),
      created_T000000Z: fig(withFm.filter((d) => /T00:00:00Z$/.test(String(d.fm.created ?? ''))).length, 'documents', 'created ending in the midnight-UTC placeholder'),
      hygiene: fig(hygiene, 'values', 'frontmatter-census.py §4: created/updated without time; empty values; version with v prefix; values matching TODO|TBD|FIXME|{{|<…>|xxx'),
    };
  },
};

export const provenance = {
  measure({ docs }) {
    const nature = {}; const byNature = {};
    for (const d of docs) {
      const a = norm(d.fm?.author);
      const n = !d.has_fm ? 'no-frontmatter' : a === '' ? 'no-author' : HUMANS.has(a) ? 'human' : AI_PERSONAS.has(a) ? 'ai-persona' : LLM_RE.test(a) ? 'ai-model' : 'other';
      nature[d.path] = n; count(byNature, n);
    }
    const { added, renames } = history();
    let compared = 0; const ahead = [], behind = [];
    for (const d of docs) {
      const c = String(d.fm?.created ?? '').slice(0, 10); const g = added[d.path];
      if (!/^\d{4}-\d{2}-\d{2}$/.test(c) || !g) continue;
      compared++;
      if (c > g) ahead.push([d.path, c, g]); else if (c < g) behind.push([d.path, c, g]);
    }
    const rules = reuseRules(); const crossings = [];
    for (const [a, b, date] of renames) { const ra = regimeOf(a, rules), rb = regimeOf(b, rules); if (ra && rb && ra !== rb) crossings.push([a, b, `${ra}→${rb}`, date]); }
    const anchor = {};
    for (const d of docs) {
      if (d.dir !== 'missions' || !d.has_fm || d.apparatus) continue;
      const st = norm(d.fm.status), owner = norm(d.fm.owner);
      const k = !ORACLE_SET.has(st) ? 'not-oracle-state' : owner === 'oracle' ? 'anchored' : owner ? 'anchored-weak' : 'anchored-no-owner';
      count(anchor, k);
    }
    return {
      authorship: fig(sorted(byNature), 'documents', 'nature of author: per doc, `author:` normalised → human (Oracle aliases) · ai-persona (agents whose SOUL.md declares a model, list of 2026-08-26) · ai-model (name matches claude|gpt|opus|sonnet|fable|gemini|llm) · other · no-author · no-frontmatter'),
      dates_vs_commits_compared: fig(compared, 'documents', 'docs with a created date AND a first-add commit found by one `git log --diff-filter=AR -M` walk (renames followed)'),
      created_ahead_of_commit: fig(ahead.length, 'documents', 'created day later than the day the file was first added to git (dates-vs-commits.py "DISCREPA", over the whole corpus, not the post-tag set)'),
      created_ahead_list: fig(ahead, 'documents', '[path, created, first-add] for created_ahead_of_commit'),
      created_behind_commit: fig(behind.length, 'documents', 'created day earlier than the first-add commit — expected for migrated or backdated documents; counted, not judged'),
      regime_crossings: fig(crossings.length, 'renames', 'renames in history (git -M) whose source and target resolve to different REUSE.toml licences (last matching annotation wins); regime-crossings.py'),
      regime_crossings_list: fig(crossings, 'renames', '[from, to, regime change, date]'),
      protocol_anchor: fig(sorted(anchor), 'missions', 'P-003 rule as protocol-anchor.py applies it: status ∈ {done,frozen,cancelled,backlog} is Oracle-set → anchored if owner=oracle, anchored-weak if another owner, anchored-no-owner if none; other states not-oracle-state. The CYCLE_* timestamp evidence it also used lived in /tmp and is not reproducible'),
    };
  },
};
