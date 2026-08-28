#!/usr/bin/env node
/**
 * lint-frontmatter.mjs — the header lint (S-004, kanban t_1134d057).
 *
 * Implements S-004 "The header in three rings" mechanically: every rule
 * in the standard carries a check id (H-NN); every finding this script
 * prints cites that id. If a rule cannot be expressed here, the standard
 * marks it [MANUAL] — there is no third kind. The mapping is 1:1 BY
 * CONSTRUCTION: read S-004 §2-§7 side by side with CHECKS below.
 *
 *   node scripts/lint-frontmatter.mjs                  # verify vs baseline
 *   node scripts/lint-frontmatter.mjs --report         # full detail, exit 0
 *   node scripts/lint-frontmatter.mjs --write-baseline # freeze current state
 *
 * Enforcement pattern (S-004 §7): strict on the delta, baseline on the
 * stock. Violations present at adoption are frozen in
 * scripts/frontmatter-baseline.json — allowed to exist, not to grow.
 * The baseline's size is the corpus's public entropy metric; migrations
 * (D-009, D-010, ...) shrink it. Zero is the finish line.
 *
 * S-004 is a DRAFT until the Oracle signs. So is this lint's authority:
 * it runs, it reports, it ratchets — it does not gate CI until the
 * Oracle wires it there (D-017: workflows are Oracle territory).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = path.join(ROOT, 'scripts', 'frontmatter-baseline.json');
const args = process.argv.slice(2);
const REPORT = args.includes('--report');
const WRITE = args.includes('--write-baseline');

/* ---------------- S-004 §1: the three rings ---------------- */

const RING1 = ['id', 'title', 'type', 'status', 'version', 'created', 'updated', 'license'];
const RING2 = ['author', 'owner', 'provenance', 'created_source', 'created_confidence',
  'requested_by', 'supersedes', 'superseded_by', 'derived_from'];

/** S-004 §6: the per-series extension registry. A field in no ring is H-30. */
const RING3 = {
  'missions': ['priority', 'effort', 'assigned_to', 'started',
    'completed', 'mission_id', 'type_execution', 'freeze_reason', 'in_review_at',
    'depends_on', 'parent_mission', 'sub_missions', 'blocked_by',
    'requires_oracle_approval', 'human_approval_score', 'paths', 'context',
    'divergence_log'],
  'reports': ['severity', 'period', 'subtype', 'model', 'agent', 'week', 'scope'],
  'decisions': ['deciders', 'consulted', 'outcome'],
  'agents': ['role', 'platform', 'model', 'soul', 'agent'],
  'debt': ['severity', 'severity_reason', 'detected', 'refuted', 'source_audit', 'opened_by'],
  'blueprints': ['extraction_note', 'restoration_note'],
  'operations': ['extraction_note', 'restoration_note'],
  'standards': ['supersedes_version', 'ratified_by', 'subtype'],
  'canon': ['supersedes_version', 'ratified_by'],
  'protocols': ['supersedes_version', 'ratified_by'],
};
const RING3_ALL = ['tags', 'visibility', 'guild', 'territory', 'registration',
  'registration_reason', 'registration_exemption', 'evidence_script',
  'evidence_head', 'uid'];

/** S-004 §4: closed type vocabulary (S-001 §7 + agent, pending its ADR). */
const TYPES = ['mission', 'adr', 'protocol', 'blueprint', 'report', 'seminal',
  'legal', 'charter', 'documentation', 'meta', 'agent'];

/** S-004 §4 H-17 / S-001 §3: type ↔ series, strict except documentation/meta. */
const TYPE_SERIES = {
  mission: 'missions', adr: 'decisions', protocol: 'protocols',
  blueprint: 'blueprints', report: 'reports', seminal: 'canon',
  legal: 'canon', charter: 'guilds', agent: 'agents',
};
const LAX_TYPES = ['documentation', 'meta'];

/** S-004 §5: status lifecycles by type. */
const STATUS = {
  mission: ['todo', 'in-progress', 'in-review', 'done', 'frozen'],
  adr: ['draft', 'active', 'superseded'],
  _default: ['draft', 'active', 'closed'],
};

/** S-004 §4 H-18: registered subtypes per type. */
const SUBTYPES = { report: ['audit', 'daily'], documentation: ['standard', 'guide'] };

/** S-004 §6 H-31: retired fields, each the object of a registered migration. */
const RETIRED = {
  area: 'D-010: area → territory',
  blocked_reason: 'D-002: orphaned by the removal of status blocked',
  documento: 'C-005: Spanish-era key', ambito: 'C-005: Spanish-era key',
  estado: 'C-005: Spanish-era key', fecha: 'C-005: Spanish-era key',
  licencia: 'C-005: Spanish-era key', revision: 'C-005: Spanish-era key',
};

/** ADR-005 / ADR-004: series prefix per top-level dir. */
const PREFIX = {
  missions: 'MIS', decisions: ['ADR', 'DEC'], protocols: 'P', debt: 'D',
  standards: 'S', canon: 'C', agents: 'AG', reports: ['RPT', 'AUD'],
};

/* The corpus tree this standard governs (S-004 §8): tracked .md outside web/. */
const GOVERNED = new Set(Object.keys(RING3));
GOVERNED.add('blueprints').add('guilds').add('operations').add('infra');

const ISO_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})$/;
const SEMVER = /^\d+\.\d+\.\d+$/;

/* ---------------- frontmatter parse (same contract as the census) ---------------- */

function parseFM(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---(\n|$)/);
  if (!m) return null;
  const fields = {};
  for (const line of m[1].split('\n')) {
    if (!line || line.startsWith('#') || /^[\s\t-]/.test(line)) continue;
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_.-]*):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return fields;
}

/* ---------------- the checks ---------------- */

const findings = []; // { check, file, detail }
const F = (check, file, detail) => findings.push({ check, file, detail });

const files = execFileSync('git', ['-C', ROOT, 'ls-files', '*.md'], { encoding: 'utf8' })
  .split('\n').filter(Boolean)
  .filter((f) => {
    const top = f.split('/')[0];
    return GOVERNED.has(top);
  });

for (const rel of files) {
  const top = rel.split('/')[0];
  const text = readFileSync(path.join(ROOT, rel), 'utf8');
  const fm = parseFM(text);

  if (fm === null) { F('H-00', rel, 'no frontmatter — invisible to every instrument'); continue; }

  /* H-09: empty is absent */
  for (const [k, v] of Object.entries(fm))
    if (v === '') F('H-09', rel, `empty value written for "${k}" — omit the field instead`);

  /* Ring 1 presence */
  for (const k of RING1)
    if (!(k in fm) || fm[k] === '') {
      const map = { id: 'H-01', title: 'H-02', type: 'H-03', status: 'H-04',
        version: 'H-05', created: 'H-06', updated: 'H-07', license: 'H-08' };
      if (k === 'id' && fm.registration === 'exempt') continue; // S-001 §5.0
      F(map[k], rel, `missing mandatory field "${k}"`);
    }

  /* H-01: id shape + series prefix */
  if (fm.id && fm.registration !== 'exempt') {
    const pfx = fm.id.match(/^([A-Z]+)-/)?.[1];
    if (!pfx) F('H-01', rel, `id "${fm.id}" does not match <PREFIX>-<NNN>`);
    else if (PREFIX[top]) {
      const ok = [].concat(PREFIX[top]).includes(pfx);
      if (!ok) F('H-01', rel, `id prefix "${pfx}" does not belong to ${top}/ (ADR-005)`);
    }
  }

  /* H-03: closed type vocabulary */
  if (fm.type && !TYPES.includes(fm.type))
    F('H-03', rel, `type "${fm.type}" not in the closed vocabulary (S-004 §4)`);

  /* H-19: status case; H-04: lifecycle */
  if (fm.status) {
    if (fm.status !== fm.status.toLowerCase())
      F('H-19', rel, `status "${fm.status}" must be lowercase`);
    const life = STATUS[fm.type] || STATUS._default;
    if (!life.includes(fm.status.toLowerCase()))
      F('H-04', rel, `status "${fm.status}" not in the ${fm.type || 'default'} lifecycle [${life.join(' ')}]`);
  }

  /* H-05: semver, no v prefix */
  if (fm.version && !SEMVER.test(fm.version))
    F('H-05', rel, `version "${fm.version}" is not bare SemVer (no v prefix)`);

  /* H-06 / H-07: dates */
  if (fm.created) {
    if (!ISO_TIME.test(fm.created))
      F('H-06', rel, `created "${fm.created}" lacks a real time (ISO 8601 with time)`);
    else if (/T00:00:00(\.0+)?Z?$/.test(fm.created))
      F('H-06', rel, `created "${fm.created}" carries the midnight nobody wrote at (S-001 §8)`);
  }
  if (fm.updated) {
    if (!ISO_TIME.test(fm.updated))
      F('H-07', rel, `updated "${fm.updated}" lacks a real time`);
    else if (fm.created && ISO_TIME.test(fm.created) && fm.updated < fm.created)
      F('H-07', rel, `updated ${fm.updated} < created ${fm.created}`);
  }

  /* H-12..H-14: ring 2 vocabularies */
  if (fm.provenance && !['human', 'ai-assisted', 'ai-generated'].includes(fm.provenance))
    F('H-12', rel, `provenance "${fm.provenance}" invalid`);
  if (fm.created_source && !/^(git:[0-9a-f]{7,40}|declared)$/.test(fm.created_source))
    F('H-13', rel, `created_source "${fm.created_source}" is neither git:<sha> nor declared`);
  if (fm.created_confidence && !['exact', 'inferred'].includes(fm.created_confidence))
    F('H-14', rel, `created_confidence "${fm.created_confidence}" invalid`);

  /* H-17: type ↔ series */
  if (fm.type && TYPE_SERIES[fm.type] && TYPE_SERIES[fm.type] !== top && !LAX_TYPES.includes(fm.type))
    F('H-17', rel, `type "${fm.type}" belongs in ${TYPE_SERIES[fm.type]}/, found in ${top}/`);

  /* H-18: registered subtype */
  if (fm.subtype && SUBTYPES[fm.type] && !SUBTYPES[fm.type].includes(fm.subtype))
    F('H-18', rel, `subtype "${fm.subtype}" not registered for type ${fm.type}`);

  /* H-20: uid reserved-empty */
  if (fm.uid && fm.uid !== '')
    F('H-20', rel, `uid is reserved-empty until the UID system exists (S-001 §6.2)`);

  /* H-31: retired fields */
  for (const k of Object.keys(fm))
    if (RETIRED[k]) F('H-31', rel, `retired field "${k}" (${RETIRED[k]})`);

  /* H-30: the anti-entropy rule — a field in no ring is invalid */
  const allowed = new Set([...RING1, ...RING2, ...RING3_ALL,
    ...(RING3[top] || []), 'subtype']);
  for (const k of Object.keys(fm))
    if (!allowed.has(k) && !RETIRED[k])
      F('H-30', rel, `field "${k}" is in no ring and not registered for ${top}/ (S-004 §6)`);
}

/* ---------------- baseline ratchet ---------------- */

const keys = findings.map((f) => `${f.check} ${f.file} :: ${f.detail}`).sort();

if (WRITE) {
  writeFileSync(BASELINE, JSON.stringify({
    _comment: 'Frontmatter violations frozen at adoption (S-004 §7). The lint fails only on NEW ones. This list shrinks with each migration and never grows; its size is the corpus entropy metric.',
    generated: new Date().toISOString(),
    count: keys.length,
    entries: keys,
  }, null, 1) + '\n');
  console.log(`baseline written: ${keys.length} findings frozen`);
  process.exit(0);
}

const byCheck = {};
for (const f of findings) byCheck[f.check] = (byCheck[f.check] || 0) + 1;
const summary = Object.entries(byCheck).sort().map(([c, n]) => `${c}:${n}`).join('  ');

if (REPORT) {
  for (const k of keys) console.log(k);
  console.log(`\n${findings.length} findings across ${files.length} governed documents`);
  console.log(summary);
  process.exit(0);
}

const baseline = existsSync(BASELINE)
  ? new Set(JSON.parse(readFileSync(BASELINE, 'utf8')).entries)
  : new Set();
const fresh = keys.filter((k) => !baseline.has(k));
const healed = [...baseline].filter((k) => !keys.includes(k));

console.log(`lint-frontmatter: ${findings.length} findings (${baseline.size} baselined) — ${summary}`);
if (healed.length) console.log(`  ${healed.length} baselined finding(s) healed — regenerate the baseline to bank the progress`);
if (fresh.length) {
  console.log(`\nNEW violations (not in baseline) — the ratchet fails:\n`);
  for (const k of fresh) console.log(`  ${k}`);
  process.exit(1);
}
console.log('no new violations — the ratchet holds');
