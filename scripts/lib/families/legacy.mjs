/**
 * telemetry family `legacy` — the 20 figure keys of `scripts/count-evidence.py --json` (21 with `head`),
 * same names, same values, so that every document that cites that script can be
 * re-pointed to a telemetry key without its figure moving. MIS-138 D3, criterion 2.
 *
 * Transitional by design. This family reproduces count-evidence's PREDICATE, not
 * the instrument's: its document set is `git ls-files '*.md'` (web/ included; telemetry/
 * excluded — see legacyDocs), its frontmatter reader is
 * the old regex over the raw block, its series map is rules.json (equal by test
 * since step 1). Where a key's predicate is a known defect (uid_colisiones counts
 * blanks), the defect is reproduced and named in the definition. When the last
 * citation moves, delete this file: `telemetry.test.mjs` LEGACY stops with it.
 *
 * Equality is checked on 20 keys; `head` is excluded (both print HEAD, the
 * dataset carries it once, at the top).
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { ROOT, loadRules } from '../frontmatter.mjs';
import { FROZEN_ARTIFACT_RE } from '../corpus.mjs';

const git = (...a) => execFileSync('git', ['-C', ROOT, ...a], { encoding: 'utf8' }).trimEnd();
const APPARATUS_NAMES = new Set(['INDEX.md', 'README.md', 'TEMPLATE.md', 'STANDARDS.md', 'APPROVAL-REQUEST-template.md', 'TEMPLATE-EXAMPLE.md', 'TEMPLATE-CHANGES.md']);
/** count-evidence.py `series` (2026-09-02): 11 dirs, its order, its labels. `system` is absent there, so absent here. */
const LEGACY_SERIES = {
  missions: [/^MIS-\d{4}-/, 'MIS-NNNN'],
  protocols: [/^PRO-\d{3}-/, 'PRO-NNN'],
  decisions: [/^(ADR|DEC)-\d{3}-/, 'ADR/DEC-NNN'],
  reports: [/^RPT-(\d{3}-|\d{4}-\d{2}-\d{2}\.md$)/, 'RPT-NNN · RPT-YYYY-MM-DD (daily)'],
  blueprints: [/^BLU-\d{3}-/, 'BLU-NNN'],
  canon: [/^CAN-\d{3}-/, 'CAN-NNN'],
  standards: [/^STD-\d{3}-/, 'STD-NNN'],
  operations: [/^OPS-\d{3}-/, 'OPS-NNN'],
  debt: [/^DBT-\d{3}-/, 'DBT-NNN'],
  guilds: [/^GLD-\d{3}-/, 'GLD-NNN'],
  infra: [/^INF-\d{3}-/, 'INF-NNN'],
};
const ID_RE = /\b(MIS|ADR|DEC|RPT|AUD|P|C|BP)-\d{1,4}\b/g;
const NULLS = new Set(['null', 'none', '~', '-', 'n/a', '']);

/** count-evidence.frontmatter(): the raw block between the first two `---` lines, or null. */
const rawFM = (text) => { const m = /^---\s*\n([\s\S]*?)\n---/.exec(text); return m ? m[1] : null; };
/** count-evidence's field regex: first `^field:` line, optional opening quote, value up to quote/newline/#. */
const field = (fm, name, stopHash = true) => {
  const m = new RegExp(`^${name}:\\s*["']?([^"'\\n${stopHash ? '#' : ''}]*)`, 'm').exec(fm);
  return m ? m[1].trim() : null;
};
/** Python Counter.most_common: by count desc, ties in first-seen order (Array.sort is stable). */
const mostCommon = (counter) => Object.fromEntries([...counter.entries()].sort((a, b) => b[1] - a[1]));

function legacyDocs() {
  // telemetry/ excluded: count-evidence.py counted telemetry/latest.md as a document (273 @ 6a97fbf);
  // the instrument never measures its own dataset. The golden fixture was captured on the index minus telemetry/.
  return git('ls-files', '*.md').split('\n').filter((f) => f.trim() && !f.startsWith('telemetry/')).map((rel) => {
    const text = readFileSync(path.join(ROOT, rel), 'utf8');
    const fm = rawFM(text);
    return { path: rel, text, fm: fm ?? '', has_fm: fm !== null, base: path.basename(rel) };
  });
}

export function measure({ rules = loadRules() } = {}) {
  const docs = legacyDocs();
  const R = {};
  const D = {};
  const put = (k, value, definition, unit = 'documents') => { R[k] = value; D[k] = { unit, definition }; };

  put('docs_total', docs.length, "every tracked path ending in .md (git ls-files '*.md'), web/ included, telemetry/ excluded");
  put('docs_con_frontmatter', docs.filter((d) => d.has_fm).length, 'docs_total whose text starts with a `---` block closed by a second `---` line');
  put('docs_sin_frontmatter', docs.filter((d) => !d.has_fm).length, 'docs_total − docs_con_frontmatter');

  const mentions = new Map();
  for (const d of docs) for (const m of d.text.matchAll(ID_RE)) mentions.set(m[0], (mentions.get(m[0]) ?? 0) + 1);
  put('referencias_textuales_total', [...mentions.values()].reduce((a, b) => a + b, 0), 'occurrences of `(MIS|ADR|DEC|RPT|AUD|P|C|BP)-<1..4 digits>` at word boundaries in the full text of docs_total (frontmatter included)', 'mentions');
  put('referencias_top', [...mentions.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6), 'the six most-mentioned identifiers as [id, count]; ties keep first-seen order (Python Counter.most_common)', 'mentions');

  const isApparatus = (d) => APPARATUS_NAMES.has(d.base) || field(d.fm, 'type') === 'meta';
  const matricula = {}; const excl = { aparato: [], congelados: [] };
  for (const [dir, [pat, esquema]] of Object.entries(LEGACY_SERIES)) {
    const sel = []; let apparatus = 0;
    for (const d of docs) {
      if (!d.path.startsWith(dir + '/') || d.path.includes('/_template/')) continue;
      if (d.path.startsWith('reports/evidence/')) continue;
      if (isApparatus(d)) { excl.aparato.push(d.path); apparatus++; continue; }
      if (FROZEN_ARTIFACT_RE.test(d.base)) { excl.congelados.push(d.path); continue; }
      sel.push(d);
    }
    const ok = sel.filter((d) => pat.test(d.base)).length;
    matricula[dir] = { esquema, con: ok, total: sel.length, aparato: apparatus, pct: sel.length ? Math.round((1000 * ok) / sel.length) / 10 : null };
  }
  put('matricula', matricula, 'per series dir (count-evidence order, 11 dirs — `system` absent, as in the script): con = filenames matching the scheme; total = docs in the dir minus _template/, reports/evidence/, apparatus (canonical name or type: meta, per the guards) and frozen artefacts (dated filename); pct = 100·con/total rounded to 0.1', 'documents');
  put('excluidos', excl, 'the apparatus and frozen paths removed from the matricula denominators, in scan order', 'paths');
  const agentsDir = path.join(ROOT, 'agents');
  const agentDirs = existsSync(agentsDir) ? readdirSync(agentsDir).filter((n) => n !== '_template' && statSync(path.join(agentsDir, n)).isDirectory()) : [];
  put('agents_sin_prefijo_por_diseno', agentDirs.length, 'subdirectories of agents/ other than _template (ADR-005 v1.1.0: agents are named, not numbered)', 'directories');

  const uids = new Map();
  for (const d of docs) { const v = field(d.fm, 'uid'); if (v) uids.set(d.path, v); }
  const fabricated = /-0{8,}\d*$/;
  put('uid_presentes', uids.size, 'docs with a non-empty `uid:` line in the frontmatter');
  put('uid_fabricados', [...uids.values()].filter((v) => fabricated.test(v)).length, 'uid values ending in eight or more zeros plus an optional counter (the hand-made v7 pattern)');
  const uc = new Map(); for (const v of uids.values()) uc.set(v, (uc.get(v) ?? 0) + 1);
  put('uid_colisiones', [...uc.values()].filter((c) => c > 1).reduce((a, c) => a + c - 1, 0), 'Σ(count − 1) over uid values held by more than one doc. Known defect reproduced: values are compared as typed, so a shared placeholder counts as collisions (MIS-122)', 'collisions');

  let rel = 0;
  for (const d of docs) for (const f of ['supersedes', 'superseded_by', 'derived_from', 'replaces']) {
    const v = field(d.fm, f); if (v !== null && !NULLS.has(v.toLowerCase())) { rel++; break; }
  }
  put('docs_con_relacion_declarada', rel, 'docs with at least one of supersedes / superseded_by / derived_from / replaces holding a non-null value (E6)');

  const est = new Map();
  for (const d of docs) {
    if (!d.path.startsWith('missions/')) continue;
    const v = field(d.fm, 'status', false); if (v === null) continue;
    const k = v.includes('#') ? '(corrupto: comentario en el valor)' : v;
    est.set(k, (est.get(k) ?? 0) + 1);
  }
  put('misiones_por_status', mostCommon(est), 'every .md under missions/ (TEMPLATE, ANNEX, INDEX included — the "three predicates" of the brief) by raw `status:` value, most common first');

  const values = (name, prefix = null) => {
    const c = new Map();
    for (const d of docs) { if (prefix && !d.path.startsWith(prefix)) continue; const v = field(d.fm, name); if (v) c.set(v, (c.get(v) ?? 0) + 1); }
    return mostCommon(c);
  };
  put('guild_valores', values('guild'), 'distinct raw `guild:` values with counts, most common first', 'documents');
  put('type_execution_valores', values('type_execution'), 'distinct raw `type_execution:` values with counts', 'documents');
  put('area_valores_distintos', Object.keys(values('area')).length, 'number of distinct non-empty `area:` values', 'values');
  put('created_T000000Z', docs.filter((d) => /^created:.*T00:00:00Z/m.test(d.fm)).length, '`created:` lines whose value carries the midnight-UTC placeholder time');
  put('created_total', docs.filter((d) => /^created:/m.test(d.fm)).length, 'docs with a `created:` line');

  const ci = path.join(ROOT, '.github', 'workflows', 'ci.yml');
  put('ci_workflow_existe', existsSync(ci), '.github/workflows/ci.yml is present', 'boolean');
  put('ci_guards', existsSync(ci) ? [...readFileSync(ci, 'utf8').matchAll(/run:\s*node\s+(scripts\/\S+)/g)].map((m) => m[1]) : [], 'the `run: node scripts/…` steps of ci.yml, in file order', 'paths');

  const figures = {};
  for (const k of Object.keys(R)) figures[k] = { value: R[k], unit: D[k].unit, definition: D[k].definition };
  return figures;
}

/** The dict count-evidence.py --json prints, minus `head`. Consumed by --legacy-json and the LEGACY test. */
export function legacyDict(figures) {
  return Object.fromEntries(Object.entries(figures).map(([k, f]) => [k, f.value]));
}
