#!/usr/bin/env node
/**
 * lint-frontmatter.mjs — the header lint (STD-004, kanban t_1134d057).
 *
 * Implements STD-004 "The header in three rings" mechanically: every rule
 * in the standard carries a check id (H-NN); every finding this script
 * prints cites that id. If a rule cannot be expressed here, the standard
 * marks it [MANUAL] — there is no third kind. The mapping is 1:1 BY
 * CONSTRUCTION: read STD-016 (the field register) side by side with CHECKS below.
 *
 *   node scripts/lint-frontmatter.mjs                  # verify vs baseline
 *   node scripts/lint-frontmatter.mjs --report         # full detail, exit 0
 *   node scripts/lint-frontmatter.mjs --write-baseline # freeze current state
 *
 * Enforcement pattern (ENG-033): strict on the delta, baseline on the
 * stock. Violations present at adoption are frozen in
 * scripts/frontmatter-baseline.json — allowed to exist, not to grow.
 * The baseline's size is the corpus's public entropy metric; migrations
 * (D-009, D-010, ...) shrink it. Zero is the finish line.
 *
 * STD-004 is a DRAFT until the Oracle signs. So is this lint's authority:
 * it runs, it reports, it ratchets — it does not gate CI until the
 * Oracle wires it there (D-017: workflows are Oracle territory).
 *
 * WHAT THIS GUARD DOES NOT CHECK (D-025 — declare your blindness):
 *
 *  - **Whether a deferral is honest.** HDR-032 checks that a `TBA` names a
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
import { parseFM, NESTED, loadRules, isTemplate } from './lib/frontmatter.mjs';
import { RING1, RING2, RING3, RING3_ALL } from './lib/rings.mjs';
import { Findings } from './lib/regime.mjs';
declareBlindSpots('lint-frontmatter');

/* MIS-138 D1.1 (2026-09-02): the closed vocabularies below are read from
   scripts/lib/rules.json, shared with lint-naming, check-references and the
   telemetry instrument. The ring registry (RING1–3) moved to lib/rings.mjs on
   2026-09-04 (MIS-145 v2), when check-templates became its second consumer. */
const RULES = loadRules();

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = path.join(ROOT, 'scripts', 'frontmatter-baseline.json');
const args = process.argv.slice(2);
const REPORT = args.includes('--report');
const WRITE = args.includes('--write-baseline');

/* ---------------- STD-004 HDR-030: the three rings ---------------- */
/* MIS-145 v2 (2026-09-04): the registry moved to scripts/lib/rings.mjs when
   check-templates.mjs became its second consumer. Same move, same reason as
   MIS-138 D1.1 for the vocabularies: two guards reading one registry, not two
   copies drifting apart. The comments explaining why each field is registered
   travelled with it — they are the record. */

/** STD-016 HDR-003 / HDR-017: type vocabulary and type ↔ series — rules.json `types`. */
const TYPES = RULES.types.all;
const TYPE_SERIES = RULES.types.series;
const LAX_TYPES = RULES.types.lax;

/** STD-016: status lifecycles by type — rules.json `status`. */
const STATUS = RULES.status;

/** STD-016 HDR-018: registered subtypes per type — rules.json `subtypes`. */
const SUBTYPES = RULES.subtypes;

/** STD-004 HDR-031: retired fields, each the object of a registered migration. */
const RETIRED = {
  area: 'D-010: area → territory',
  blocked_reason: 'D-002: orphaned by the removal of status blocked',
  documento: 'C-005: Spanish-era key', ambito: 'C-005: Spanish-era key',
  estado: 'C-005: Spanish-era key', fecha: 'C-005: Spanish-era key',
  licencia: 'C-005: Spanish-era key', revision: 'C-005: Spanish-era key',
};

/** ADR-005 v1.2.0: legal id prefixes per top-level dir — rules.json `series`.
 *  agents: [] — no prefix is legal (ADR-005 v1.1.0 reversal); a series id in
 *  agents/ is always wrong. Directories absent from the register (history/)
 *  are not prefix-checked here. */
const PREFIX = Object.fromEntries(Object.entries(RULES.series)
  .filter(([k]) => !k.startsWith('_')).map(([k, v]) => [k, v.prefix]));

/**
 * STD-001 §6.3 / §7: closed vocabularies the linter never checked.
 *
 * Every one of these was already declared in the canon and enforced by nobody,
 * which is why each drifted in the same three ways: an untranslated Spanish
 * value, a lowercase variant, and a template comment left glued to the value.
 *
 * HDR-033 guild · HDR-034 type_execution · HDR-035 visibility · HDR-036 territory
 * HDR-037 priority · HDR-038 effort
 */
const VOCAB = {
  // STD-001 §6.3: "English, plural."
  guild: ['Sentinels', 'Alchemists', 'Exegetes', 'Procurators'],
  // STD-001 §7: digital = an agent can do it; biological = needs a human.
  type_execution: ['digital', 'biological', 'hybrid'],
  // STD-016 Ring 3: public unless a reason says otherwise.
  visibility: ['public', 'restricted-oracle'],
  // STD-001 §territory, the 8 words. TBA is legal under ADR-028; MIS-124
  // (the field's former owner) was closed by the 2026-09-09 mission purge
  // once the corpus reached zero undeclared territory values — see the
  // audit report. No mission currently owns unassigned territory debt.
  territory: ['CAO', 'Product', 'Platform', 'Infrastructure',
    'Content', 'Sales', 'Funding', 'Archive'],
  // STD-001 §7: priority/effort, missions/ only (RING3) — debt/ uses `severity`
  // instead and is untouched by this check since it never carries the field.
  priority: ['critical', 'high', 'medium', 'low'],
  effort: ['XS', 'S', 'M', 'L', 'XL'],
};
const VOCAB_CHECK = { guild: 'HDR-033', type_execution: 'HDR-034', visibility: 'HDR-035', territory: 'HDR-036',
  priority: 'HDR-037', effort: 'HDR-038' };

/* The corpus tree this standard governs (STD-004 scope): tracked .md outside web/. */
const GOVERNED = new Set(RULES.governed.dirs);  // STD-004 scope — rules.json `governed`

const ISO_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})$/;
const SEMVER = /^\d+\.\d+\.\d+$/;

/* ---------------- deferred values (ADR-028) ----------------
 *
 * `TBA` means: the field applies, the value exists, it is not decided yet.
 * STD-001 uses `territory: "TBA"` as the canonical example.
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
/* NESTED: scripts/lib/frontmatter.mjs. */
const DEFERRAL_OWNER = {
  // territory's owner (MIS-124) closed 2026-09-09 — zero territory TBA
  // remains in the corpus. Left empty rather than removed: the mechanism
  // stays live for any field that defers again.
};

/* ---------------- frontmatter parse: scripts/lib/frontmatter.mjs (shared) ---------------- */

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

  if (fm === null) { F('HDR-000', rel, 'no frontmatter — invisible to every instrument'); continue; }

  /* Deferred values (ADR-028). Counted, never flagged — see DEFERRAL_OWNER. */
  for (const [k, v] of Object.entries(fm)) {
    if (v !== DEFERRED) continue;
    deferrals.push({ file: rel, field: k, owner: DEFERRAL_OWNER[k] || null });
    if (!DEFERRAL_OWNER[k])
      F('HDR-032', rel, `"${k}: ${DEFERRED}" defers a value with no mission to resolve it — ADR-028 forbids a parking space`);
  }

  /* HDR-009: empty is absent.
     `uid` is the one exception: STD-001 §6.2 requires it declared and left
     empty ("Oracle decision, non-negotiable") until the UID system exists.
     Flagging it here punished 65 documents for obeying the standard and
     advised the opposite of what the standard says (MIS-122). */
  for (const [k, v] of Object.entries(fm))
    if (v === '' && k !== 'uid')
      F('HDR-009', rel, `empty value written for "${k}" — omit the field instead`);

  /* HDR-033…HDR-036: closed vocabularies (STD-001 §6.3, §7, §territory).
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
      const map = { id: 'HDR-001', title: 'HDR-002', type: 'HDR-003', status: 'HDR-004',
        version: 'HDR-005', created: 'HDR-006', updated: 'HDR-007', license: 'HDR-008' };
      if (k === 'id' && fm.registration === 'exempt') continue; // STD-001 §5.0
      F(map[k], rel, `missing mandatory field "${k}"`);
    }

  /* HDR-001: id shape + series prefix */
  if (fm.id && fm.registration !== 'exempt') {
    const pfx = fm.id.match(/^([A-Z]+)-/)?.[1];
    if (!pfx) F('HDR-001', rel, `id "${fm.id}" does not match <PREFIX>-<NNN>`);
    else if (PREFIX[top]) {
      const ok = [].concat(PREFIX[top]).includes(pfx);
      if (!ok) F('HDR-001', rel, `id prefix "${pfx}" does not belong to ${top}/ (ADR-005)`);
    }
  }

  /* HDR-003: closed type vocabulary */
  if (fm.type && !TYPES.includes(fm.type))
    F('HDR-003', rel, `type "${fm.type}" not in the closed vocabulary (STD-016)`);

  /* HDR-019: status case; HDR-004: lifecycle — the STD-016 table, mirrored in
     rules.json `status`. Two lifecycles: mission, and everything else. */
  if (fm.status) {
    if (fm.status !== fm.status.toLowerCase())
      F('HDR-019', rel, `status "${fm.status}" must be lowercase`);
    /* The filename is not a state (2026-09-03, Oracle ruling): a state is
       declared in a field, never deduced from what a file is called. */
    const life = STATUS[fm.type] || STATUS._default;
    if (!life.includes(fm.status.toLowerCase()))
      F('HDR-004', rel, `status "${fm.status}" not in the ${fm.type === 'mission' ? 'mission' : 'default'} lifecycle [${life.join(' ')}] (STD-016)`);
  }

  /* HDR-005: semver, no v prefix */
  if (fm.version && !SEMVER.test(fm.version))
    F('HDR-005', rel, `version "${fm.version}" is not bare SemVer (no v prefix)`);

  /* HDR-006 / HDR-007: dates.
     Templates are exempt: their placeholder dates ({YYYY-MM-DD}, YYYY-MM-DD)
     ARE the template's content — the instruction to the future writer.
     Same reasoning as A TEMPLATE.md's inline vocabulary comments. */
  const IS_TEMPLATE = isTemplate(rel);  // rules.json `apparatus.templatePatterns`
  if (fm.created && !IS_TEMPLATE) {
    if (!ISO_TIME.test(fm.created))
      F('HDR-006', rel, `created "${fm.created}" lacks a real time (ISO 8601 with time)`);
    else if (/T00:00:00(\.0+)?Z?$/.test(fm.created))
      F('HDR-006', rel, `created "${fm.created}" carries the midnight nobody wrote at (STD-001 §8)`);
  }
  if (fm.updated && !IS_TEMPLATE) {
    if (!ISO_TIME.test(fm.updated))
      F('HDR-007', rel, `updated "${fm.updated}" lacks a real time`);
    else if (fm.created && ISO_TIME.test(fm.created) && fm.updated < fm.created)
      F('HDR-007', rel, `updated ${fm.updated} < created ${fm.created}`);
  }

  /* HDR-012..HDR-014: ring 2 vocabularies */
  if (fm.provenance && !['human', 'ai-assisted', 'ai-generated'].includes(fm.provenance))
    F('HDR-012', rel, `provenance "${fm.provenance}" invalid`);
  if (fm.created_source && !/^(git:[0-9a-f]{7,40}|declared)$/.test(fm.created_source))
    F('HDR-013', rel, `created_source "${fm.created_source}" is neither git:<sha> nor declared`);
  if (fm.created_confidence && !['exact', 'inferred'].includes(fm.created_confidence))
    F('HDR-014', rel, `created_confidence "${fm.created_confidence}" invalid`);

  /* HDR-017: type ↔ series.
     SETTLED_ELSEWHERE: documents whose type is honest but whose home is
     historical — moving them breaks live references (ADR-005 cites the
     AUDIT files by path; 12+ files link them). The mismatch is registered
     here with its reason instead of being parked in the baseline. */
  const SETTLED_ELSEWHERE = {
    'blueprints/AUDIT-2026-04-07-web-vs-repo.md':
      'historical audit, cited by path from ADR-005 and 12+ files',
    'blueprints/AUDIT-numengames-2026-04-08.md':
      'historical audit, cited by path from ADR-005 and 12+ files',
    'operations/OPS-009-secrets-handling.md':
      'operational protocol living with the operations it governs',
    'operations/OPS-003-privacy-policy-numengames.md':
      'operational legal text of numengames, not canon',
    'operations/OPS-004-terms-and-conditions-numengames.md':
      'operational legal text of numengames, not canon',
  };
  if (fm.type && TYPE_SERIES[fm.type] && TYPE_SERIES[fm.type] !== top && !LAX_TYPES.includes(fm.type)
      && !SETTLED_ELSEWHERE[rel])
    F('HDR-017', rel, `type "${fm.type}" belongs in ${TYPE_SERIES[fm.type]}/, found in ${top}/`);

  /* HDR-018: registered subtype */
  if (fm.subtype && SUBTYPES[fm.type] && !SUBTYPES[fm.type].includes(fm.subtype))
    F('HDR-018', rel, `subtype "${fm.subtype}" not registered for type ${fm.type}`);

  /* HDR-020: uid carries a hand-authored value.
     STD-001 §6.2: the 32 legacy values "are removed, not preserved: they were
     never identifiers". The fix is to empty the field, not to delete it —
     emptying is what the standard asks for, and HDR-009 no longer punishes it. */
  if (fm.uid && fm.uid !== '')
    F('HDR-020', rel, `uid carries a hand-authored value — empty the field, keep it declared (STD-001 §6.2)`);

  /* HDR-031: retired fields */
  for (const k of Object.keys(fm))
    if (RETIRED[k]) F('HDR-031', rel, `retired field "${k}" (${RETIRED[k]})`);

  /* HDR-030: the anti-entropy rule — a field in no ring is invalid */
  const allowed = new Set([...RING1, ...RING2, ...RING3_ALL,
    ...(RING3[top] || []), 'subtype']);
  for (const k of Object.keys(fm))
    if (!allowed.has(k) && !RETIRED[k])
      F('HDR-030', rel, `field "${k}" is in no ring and not registered for ${top}/ (STD-016, Ring 3)`);
}

/* ---------------- baseline ratchet ---------------- */

const keys = findings.map((f) => `${f.check} ${f.file} :: ${f.detail}`).sort();

if (WRITE) {
  writeFileSync(BASELINE, JSON.stringify({
    _comment: 'Frontmatter violations frozen at adoption (ENG-033). The lint fails only on NEW ones. This list shrinks with each migration and never grows; its size is the corpus entropy metric.',
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
/* ENG-067: a NEW finding fails the build only while the standard holding
   its plate is active. The baseline is unchanged by this; it says what is
   old, the regime says what bites. */
if (fresh.length) {
  console.log(`\nNEW violations (not in baseline):\n`);
  const out = new Findings('lint-frontmatter');
  for (const k of fresh) { const m = /^(\S+) (\S+) :: (.*)$/.exec(k); out.add(m[1], m[3], m[2]); }
  out.finish();
} else {
  console.log('no new violations — the ratchet holds');
}
