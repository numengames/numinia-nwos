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
 *
 * WHAT THIS GUARD DOES NOT CHECK (D-025 — declare your blindness):
 *
 *  - **Whether a deferral is honest.** H-32 checks that a `TBA` names a
 *    mission that will resolve it. It cannot check that the mission is
 *    alive, funded, or ever worked on. A `TBA` owned by an abandoned
 *    mission passes this guard and is exactly the parking space ADR-028
 *    forbids. Only a human reading the mission board catches that.
 *  - **Whether a value is TRUE.** `created: 2026-01-01` with
 *    `created_confidence: exact` passes if the format is right. The
 *    provenance fields record a claim, not a verified fact.
 *  - **The web layer.** 57 missions were invisible on the rendered board
 *    for weeks while every guard here stayed green. Nothing in this file
 *    reads web/.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { declareBlindSpots } from './lib/blindness.mjs';
declareBlindSpots('lint-frontmatter');

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
    'divergence_log',
    // registered 2026-08-30 (final sweep): provenance notes and series
    // metadata that were always written, never registered (S-004 §6)
    'phase', 'updated_note', 'executor', 'blocks', 'mission_mode'],
  'reports': ['severity', 'period', 'subtype', 'model', 'agent', 'week', 'scope',
    // ADR-035: a document reshelved into reports/ from another series carries
    // where it came from (ADR-004 rule 4 never frees the old identifier) and,
    // when the move deliberately did not fix known-wrong content, says so.
    'former_id', 'former_id_note', 'accuracy_warning',
    'editorial_note', 'language', 'day_label', 'cost_estimate', 'context_load',
    'extraction_note'],
  'decisions': ['deciders', 'consulted', 'outcome', 'decision',
    'context', 'pending_dark_council',
    // registered 2026-08-31 (MIS-127). `absorbs` is load-bearing, not a
    // note: check-references.mjs reads it to keep absorbed identifiers
    // resolving, so a merged decision stays reachable (ADR-030). `amends`
    // records a decision that narrows a standard without superseding it.
    'absorbs', 'amends'],
  'agents': ['role', 'platform', 'model', 'soul', 'agent',
    'previous_name', 'previous_name_note', 'translation_note'],
  'debt': ['severity', 'severity_reason', 'detected', 'refuted', 'source_audit', 'opened_by',
    'visibility_reason',
    // registered 2026-08-31 (RPT-001 §12, the debt renumbering). Same
    // load-bearing role as in decisions/: check-references.mjs reads
    // `absorbs` to keep a merged entry's original identifiers resolving,
    // so consolidating debt does not break every citation of it (ADR-030).
    'absorbs',
    'resolved_by', 'question_status', 'visibility_was', 'scope', 'supersedes_pending'],
  'blueprints': ['extraction_note', 'restoration_note', 'semaforo',
    // fondos/graph are read by web/src/pages/archive/ — checked BEFORE
    // registering, the lesson the semaforo taught
    'fondos', 'graph', 'score', 'score_prev', 'scope', 'mission', 'input',
    'related_missions', 'contributors'],
  'operations': ['extraction_note', 'restoration_note',
    'language', 'language_note', 'review_flags', 'source_title'],
  'standards': ['supersedes_version', 'ratified_by', 'subtype', 'threshold',
    'series_change'],
  'canon': ['supersedes_version', 'ratified_by', 'threshold',
    'changelog', 'lore', 'extraction_note'],
  'protocols': ['supersedes_version', 'ratified_by', 'applies_to', 'mandatory',
    'human_approval_score', 'mission', 'review_next'],
  // ADR-035: the two shelves MIS-129 opened. `former_id`/`former_id_note`
  // record a renumbering under ADR-004 rule 4 — the old identifier is never
  // freed, so a moved document must say where it came from.
  // `accuracy_warning` declares known-stale content the move did not edit.
  'system': ['extraction_note', 'restoration_note', 'mission',
    'fondos', 'graph', 'former_id', 'former_id_note', 'accuracy_warning'],
  'history': ['former_id', 'former_id_note', 'supersedes_version'],
};
const RING3_ALL = ['tags', 'visibility', 'guild', 'territory', 'registration',
  'registration_reason', 'registration_exemption', 'evidence_script',
  'evidence_head', 'related', 'uid'];

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
const SUBTYPES = { report: ['audit', 'daily', 'proposal'], documentation: ['standard', 'guide', 'reference'] };

/** S-004 §6 H-31: retired fields, each the object of a registered migration. */
const RETIRED = {
  area: 'D-010: area → territory',
  blocked_reason: 'D-002: orphaned by the removal of status blocked',
  documento: 'C-005: Spanish-era key', ambito: 'C-005: Spanish-era key',
  estado: 'C-005: Spanish-era key', fecha: 'C-005: Spanish-era key',
  licencia: 'C-005: Spanish-era key', revision: 'C-005: Spanish-era key',
};

/** ADR-005 / ADR-004: series prefix per top-level dir.
 *
 * `debt: 'DBT'` — ADR-005 v1.1.0 registered the debt series as DBT-NNN. This
 * table still said 'D' (the on-disk prefix at the time) until the renumbering
 * of 2026-08-31 (RPT-001 §12) closed the D- series. Same class of staleness
 * as check-references.mjs's ID_RE: a guard carrying its own private copy of a
 * ruling, drifting from the ruling.
 */
const PREFIX = {
  missions: 'MIS', decisions: ['ADR', 'DEC'], protocols: 'PRO', debt: 'DBT',
  standards: 'S', canon: 'C', agents: 'AG', reports: ['RPT', 'AUD'],
  system: 'SYS',  // ADR-035: reference manuals of how the system works today
};

/**
 * S-001 §6.3 / §7: closed vocabularies the linter never checked.
 *
 * Every one of these was already declared in the canon and enforced by nobody,
 * which is why each drifted in the same three ways: an untranslated Spanish
 * value, a lowercase variant, and a template comment left glued to the value.
 *
 * H-33 guild · H-34 type_execution · H-35 visibility · H-36 territory
 * H-37 priority · H-38 effort
 */
const VOCAB = {
  // S-001 §6.3: "English, plural."
  guild: ['Sentinels', 'Alchemists', 'Exegetes', 'Procurators'],
  // S-001 §7: digital = an agent can do it; biological = needs a human.
  type_execution: ['digital', 'biological', 'hybrid'],
  // S-004 §6: public unless a reason says otherwise.
  visibility: ['public', 'restricted-oracle'],
  // S-001 §territory, the 8 words. TBA is legal under ADR-028 (owner MIS-124).
  territory: ['CAO', 'Product', 'Platform', 'Infrastructure',
    'Content', 'Sales', 'Funding', 'Archive'],
  // S-001 §976: priority/effort, missions/ only (RING3) — debt/ uses `severity`
  // instead and is untouched by this check since it never carries the field.
  priority: ['critical', 'high', 'medium', 'low'],
  effort: ['XS', 'S', 'M', 'L', 'XL'],
};
const VOCAB_CHECK = { guild: 'H-33', type_execution: 'H-34', visibility: 'H-35', territory: 'H-36',
  priority: 'H-37', effort: 'H-38' };

/* The corpus tree this standard governs (S-004 §8): tracked .md outside web/. */
const GOVERNED = new Set(Object.keys(RING3));
GOVERNED.add('blueprints').add('guilds').add('operations').add('infra');
GOVERNED.add('system').add('history');  // ADR-035, the two shelves MIS-129 opened

const ISO_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})$/;
const SEMVER = /^\d+\.\d+\.\d+$/;

/* ---------------- deferred values (ADR-028) ----------------
 *
 * `TBA` means: the field applies, the value exists, it is not decided yet.
 * S-001 uses `territory: "TBA"` as the canonical example.
 *
 * ADR-028 permits it under one condition and forbids it otherwise: a `TBA`
 * without a mission that will resolve it is a parking space. So the guard
 * does not treat `TBA` as a violation — it COUNTS it, and names the mission
 * that owns each one. An uncounted deferral is indistinguishable from a
 * forgotten one, and the difference is the whole point of the rule.
 *
 * To defer a new field: add it here with its owning mission, or the count
 * reports it as unowned and the ratchet fails.
 */
const DEFERRED = 'TBA';
/* Sentinel for a key whose value is a nested YAML block (list/map children).
   Never a real value: only used so '' keeps meaning "written empty". */
const NESTED = '\u0000nested\u0000';
const DEFERRAL_OWNER = {
  territory: 'MIS-124',
};

/* ---------------- frontmatter parse (same contract as the census) ---------------- */

function parseFM(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---(\n|$)/);
  if (!m) return null;
  const fields = {};
  const lines = m[1].split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.startsWith('#') || /^[\s\t-]/.test(line)) continue;
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_.-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim().replace(/^["']|["']$/g, '');
    // A bare `key:` followed by an indented line is a YAML mapping/list
    // parent, not an empty value. Flattening it to '' made H-09 punish
    // `fondos:`/`changelog:` for having children — the exact false
    // positive that nearly deleted 90 lines in the final sweep.
    if (v === '' && i + 1 < lines.length && /^[ \t]/.test(lines[i + 1]))
      v = NESTED;
    fields[kv[1]] = v;
  }
  return fields;
}

/* ---------------- the checks ---------------- */

const findings = []; // { check, file, detail }
const deferrals = []; // { file, field, owner } — ADR-028 census, not violations
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

  /* Deferred values (ADR-028). Counted, never flagged — see DEFERRAL_OWNER. */
  for (const [k, v] of Object.entries(fm)) {
    if (v !== DEFERRED) continue;
    deferrals.push({ file: rel, field: k, owner: DEFERRAL_OWNER[k] || null });
    if (!DEFERRAL_OWNER[k])
      F('H-32', rel, `"${k}: ${DEFERRED}" defers a value with no mission to resolve it — ADR-028 forbids a parking space`);
  }

  /* H-09: empty is absent.
     `uid` is the one exception: S-001 §6.2 requires it declared and left
     empty ("Oracle decision, non-negotiable") until the UID system exists.
     Flagging it here punished 65 documents for obeying the standard and
     advised the opposite of what the standard says (MIS-122). */
  for (const [k, v] of Object.entries(fm))
    if (v === '' && k !== 'uid')
      F('H-09', rel, `empty value written for "${k}" — omit the field instead`);

  /* H-33…H-36: closed vocabularies (S-001 §6.3, §7, §territory).
     Declared in the canon since the glossary was written, enforced by nobody
     until now — which is exactly why `Procuradores`, `híbrido` and a stray
     template comment all survived in the corpus. A DEFERRED value is legal
     here: ADR-028 rules it, and the block above already vets its owner. */
  for (const [field, allowed] of Object.entries(VOCAB)) {
    const v = fm[field];
    if (v === undefined || v === '' || v === DEFERRED) continue;
    // A TEMPLATE.md documents the options inline (`digital  # digital|hybrid`).
    // That comment is the template doing its job, not drift: strip it before
    // judging, so the vocabulary is checked and the documentation survives.
    const bare = String(v).replace(/\s+#.*$/, '').trim();
    if (allowed.includes(bare)) continue;
    const near = allowed.find(a => a.toLowerCase() === bare.toLowerCase());
    const hint = near ? ` — did you mean "${near}"?` : ` — allowed: ${allowed.join(' · ')}`;
    F(VOCAB_CHECK[field], rel, `${field}: "${v}" is not in the vocabulary${hint}`);
  }

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

  /* H-06 / H-07: dates.
     Templates are exempt: their placeholder dates ({YYYY-MM-DD}, YYYY-MM-DD)
     ARE the template's content — the instruction to the future writer.
     Same reasoning as A TEMPLATE.md's inline vocabulary comments. */
  const IS_TEMPLATE = rel.startsWith('agents/_template/')
    || /^missions\/TEMPLATE(\.md$|-)/.test(rel);
  if (fm.created && !IS_TEMPLATE) {
    if (!ISO_TIME.test(fm.created))
      F('H-06', rel, `created "${fm.created}" lacks a real time (ISO 8601 with time)`);
    else if (/T00:00:00(\.0+)?Z?$/.test(fm.created))
      F('H-06', rel, `created "${fm.created}" carries the midnight nobody wrote at (S-001 §8)`);
  }
  if (fm.updated && !IS_TEMPLATE) {
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

  /* H-17: type ↔ series.
     SETTLED_ELSEWHERE: documents whose type is honest but whose home is
     historical — moving them breaks live references (ADR-005 cites the
     AUDIT files by path; 12+ files link them). The mismatch is registered
     here with its reason instead of being parked in the baseline. */
  const SETTLED_ELSEWHERE = {
    'blueprints/AUDIT-2026-04-07-web-vs-repo.md':
      'historical audit, cited by path from ADR-005 and 12+ files',
    'blueprints/AUDIT-numengames-2026-04-08.md':
      'historical audit, cited by path from ADR-005 and 12+ files',
    'operations/credential-map.md':
      'operational protocol living with the operations it governs',
    'operations/security-policy.md':
      'operational protocol living with the operations it governs',
    'operations/legal/O-003-privacy-policy-numengames.md':
      'operational legal text of numengames, not canon',
    'operations/legal/O-004-terms-and-conditions-numengames.md':
      'operational legal text of numengames, not canon',
  };
  if (fm.type && TYPE_SERIES[fm.type] && TYPE_SERIES[fm.type] !== top && !LAX_TYPES.includes(fm.type)
      && !SETTLED_ELSEWHERE[rel])
    F('H-17', rel, `type "${fm.type}" belongs in ${TYPE_SERIES[fm.type]}/, found in ${top}/`);

  /* H-18: registered subtype */
  if (fm.subtype && SUBTYPES[fm.type] && !SUBTYPES[fm.type].includes(fm.subtype))
    F('H-18', rel, `subtype "${fm.subtype}" not registered for type ${fm.type}`);

  /* H-20: uid carries a hand-authored value.
     S-001 §6.2: the 32 legacy values "are removed, not preserved: they were
     never identifiers". The fix is to empty the field, not to delete it —
     emptying is what the standard asks for, and H-09 no longer punishes it. */
  if (fm.uid && fm.uid !== '')
    F('H-20', rel, `uid carries a hand-authored value — empty the field, keep it declared (S-001 §6.2)`);

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

/* ADR-028 census: deferrals are reported whether or not anything failed.
   A deferral nobody prints is a deferral nobody resolves. */
const deferralLine = () => {
  if (!deferrals.length) return null;
  const byField = {};
  for (const d of deferrals) (byField[d.field] ||= []).push(d);
  return Object.entries(byField).sort().map(([field, ds]) => {
    const owner = ds[0].owner;
    return `  ${DEFERRED} ${field}: ${ds.length} — ${owner ? `owned by ${owner}` : 'UNOWNED'}`;
  }).join('\n');
};

if (REPORT) {
  for (const k of keys) console.log(k);
  console.log(`\n${findings.length} findings across ${files.length} governed documents`);
  console.log(summary);
  const reportDl = deferralLine();
  if (reportDl) console.log(`\ndeferred values (ADR-028) — counted, not failed:\n${reportDl}`);
  process.exit(0);
}

const baseline = existsSync(BASELINE)
  ? new Set(JSON.parse(readFileSync(BASELINE, 'utf8')).entries)
  : new Set();
const fresh = keys.filter((k) => !baseline.has(k));
const healed = [...baseline].filter((k) => !keys.includes(k));

console.log(`lint-frontmatter: ${findings.length} findings (${baseline.size} baselined) — ${summary}`);
const dl = deferralLine();
if (dl) console.log(`deferred values (ADR-028):\n${dl}`);
if (healed.length) console.log(`  ${healed.length} baselined finding(s) healed — regenerate the baseline to bank the progress`);
if (fresh.length) {
  console.log(`\nNEW violations (not in baseline) — the ratchet fails:\n`);
  for (const k of fresh) console.log(`  ${k}`);
  process.exit(1);
}
console.log('no new violations — the ratchet holds');
