#!/usr/bin/env node
/**
 * rename-series.mjs — MIS-125 Stage B/C rename tool.
 *
 * Spec: .hermes/plans/2026-08-31_090215-MIS-125-prefix-standardization.md §B.
 * "no rediseñes, ejecuta" — the CLI surface and the 5-step algorithm below
 * are the plan's own words, not a new design. What follows fills in
 * implementation detail the plan left to the builder (numbering assignment
 * for files with no reusable number, date-series merge order, frozen-artifact
 * safety) — declared explicitly, not invented silently.
 *
 *   node scripts/rename-series.mjs \
 *     --dir <dir1[:subtypeValue],dir2[:subtypeValue],...> \
 *     --to <PREFIX> \
 *     [--from <PREFIX1,PREFIX2,...>]   legacy prefix(es) whose NNN is reused
 *     [--digits N]                      zero-pad width, default 3
 *     [--subtype-field <name>]          frontmatter field written per --dir tag
 *     [--order created|filename]        assignment order for unnumbered files
 *     [--include-frozen-artifacts]      opt-in override, see note below
 *     [--apply]                         default: dry-run, prints the plan only
 *
 * Algorithm (plan §B, steps 1-5):
 *   1. List files to rename in --dir.
 *   2. Grep the WHOLE corpus (not just markdown links — ADR-004 documents
 *      1,619+ plain-text mentions invisible to a link-checker; check-references.mjs
 *      independently confirmed a third citation type, bare filenames) for
 *      the old id/filename.
 *   3. --dry-run (default): print the full plan, touch nothing.
 *   4. --apply: git mv, update id: in frontmatter, rewrite every citation
 *      found (old id string + old basename string, corpus-wide, any file
 *      type — not just .md), run check-references.mjs at the end. No commit.
 *   5. One run = one series. Never mixes series in the same pass.
 *
 * FROZEN-ARTIFACT SAFETY (declared, not silent):
 * P-010 §3.2 defines `registration_exemption: frozen-artifact` files as
 * permanent dated snapshots ("a photograph, not a living document") — D-008
 * v2.1.0's "24 exempt enter the scheme" ruling includes 3 such files
 * (standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md,
 * canon/2026_04_15-Epistemic_Relations...md,
 * canon/2026_04_15-Pragmatic_Numen_System...md), which contradicts P-010
 * §3.2 on its face. This is an OPEN, UNRESOLVED conflict between two
 * normative documents (flagged to the Oracle via clarify, 2026-08-31,
 * not yet answered). This tool defaults to EXCLUDING
 * registration_exemption: frozen-artifact files from every series —
 * --include-frozen-artifacts is required to touch them, and even then the
 * tool only ever queues them for --dry-run review, never silently.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);

function flag(name, def = undefined) {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return def;
  return args[i + 1];
}
const APPLY = args.includes('--apply');
const INCLUDE_FROZEN = args.includes('--include-frozen-artifacts');
const INCLUDE_EXEMPT = args.includes('--include-exempt');
const DIR_ARG = flag('dir');
const TO = flag('to');
const FROM = flag('from', '');
const DIGITS = parseInt(flag('digits', '3'), 10);
const SUBTYPE_FIELD = flag('subtype-field', null);
const ORDER = flag('order', 'created');

if (!DIR_ARG || !TO) {
  console.error('usage: rename-series.mjs --dir <d1[:tag],d2[:tag]> --to <PREFIX> [--from p1,p2] [--digits N] [--subtype-field name] [--include-exempt] [--include-frozen-artifacts] [--apply]');
  process.exit(2);
}

const APPARATUS_BASENAMES = new Set(['README.md', 'INDEX.md', 'TEMPLATE.md', 'STANDARDS.md']);
const isApparatusPath = (rel) => /\/_template\//.test(rel) || rel.startsWith('agents/_template/');

function parseFM(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---(\n|$)/);
  if (!m) return null;
  const fields = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_.-]*):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return fields;
}

const dirSpecs = DIR_ARG.split(',').map((d) => {
  const [dir, tag] = d.split(':');
  return { dir, tag: tag || null };
});
const fromPrefixes = FROM ? FROM.split(',').filter(Boolean) : [];

/* ---- 1. collect candidates ---- */
const candidates = [];
for (const { dir, tag } of dirSpecs) {
  const files = execFileSync('git', ['-C', ROOT, 'ls-files', `${dir}/*.md`], { encoding: 'utf8' })
    .split('\n').filter(Boolean);
  for (const rel of files) {
    const base = path.basename(rel);
    if (APPARATUS_BASENAMES.has(base) || isApparatusPath(rel)) continue;
    const text = readFileSync(path.join(ROOT, rel), 'utf8');
    const fm = parseFM(text) || {};
    // P-010 §3.2 detection: by declared field OR by the reserved dated
    // shape itself (YYYY_MM_DD-...). Two files confirmed live
    // (2026_04_14-Read_Me_How_to_Archive-v0.2.0.md,
    // 2026_04_14-Analogous_Terminology_Numina-v0.2.0.md) carry the exact
    // §3.2 name shape but are MISSING the registration_exemption field —
    // a metadata gap, not evidence they were meant to enter a live series.
    // Same unresolved P-010-vs-D-008 conflict either way; do not let a
    // missing field silently bypass the guard the field exists to set.
    const looksLikeFrozenShape = /^\d{4}_\d{2}_\d{2}-.+-v\d+(\.\d+){0,2}\.md$/.test(base);
    const isFrozen = fm.registration_exemption === 'frozen-artifact' || looksLikeFrozenShape;
    if (isFrozen && !INCLUDE_FROZEN) {
      candidates.push({ rel, base, fm, text, skip: 'frozen-artifact (P-010 §3.2 vs D-008 conflict — unresolved, use --include-frozen-artifacts to override)', tag });
      continue;
    }
    // registration: exempt not otherwise ruled in scope. D-008 v2.1.0's
    // "24 exempt enter the scheme" ruling is a closed, ENUMERATED list —
    // it does not mean "every exempt file enters." APPROVAL-REQUEST-template.md
    // was in that pool once, then the Oracle correction (D-024 v1.2.0)
    // pulled it back OUT as permanent apparatus of P-008. Any exempt file
    // this tool doesn't otherwise touch stays exempt by default — an
    // Oracle ruling reopening it belongs in D-008/D-024, not silently
    // assumed by this script matching it into a --dir it can see.
    // --include-exempt: the operator's explicit per-run assertion "this
    // --dir's exempt files ARE the ones D-008's ruling enumerated" —
    // required because guilds/*, operations/security-policy.md,
    // credential-map.md, canon/archive-lore.md, the archive-summa
    // blueprints, and debt/D-024+D-028 ALL carry registration: exempt too,
    // and D-008 rules them IN. This flag does not distinguish
    // file-by-file — verify the --dir's file list against D-008's table
    // before passing it for a real Stage C run.
    if (fm.registration === 'exempt' && !isFrozen && !INCLUDE_EXEMPT) {
      candidates.push({ rel, base, fm, text, skip: `registration: exempt (reason: "${fm.registration_reason || 'unstated'}") — not auto-included; requires --include-exempt after verifying D-008's enumerated list covers this file`, tag });
      continue;
    }
    // idempotency: already matches the target scheme exactly?
    const already = new RegExp(`^${TO}-\\d{${DIGITS}}-`).test(base);
    if (already) continue;
    candidates.push({ rel, base, fm, text, tag });
  }
}

/* ---- number extraction / assignment ---- */
function extractExistingNumber(base, fm) {
  for (const p of fromPrefixes) {
    const re = new RegExp(`^${p}-(\\d+)(?:-|\\.md$)`);
    const m = base.match(re) || (fm.id || '').match(new RegExp(`^${p}-(\\d+)$`));
    if (m) return parseInt(m[1], 10);
  }
  return null;
}

function sortKey(c) {
  if (ORDER === 'created' && c.fm.created) return c.fm.created;
  const dm = c.base.match(/(\d{4}-\d{2}-\d{2})|(\d{4}_\d{2}_\d{2})/);
  if (dm) return dm[0].replace(/_/g, '-');
  return c.base;
}

const active = candidates.filter((c) => !c.skip);
const skipped = candidates.filter((c) => c.skip);

// existing numbers (to avoid collisions with reused ones) + files needing
// fresh assignment, in a stable, declared order.
const withNumber = [];
const needsNumber = [];
for (const c of active) {
  const n = extractExistingNumber(c.base, c.fm);
  if (n !== null) withNumber.push({ ...c, num: n });
  else needsNumber.push(c);
}
const used = new Set(withNumber.map((c) => c.num));
needsNumber.sort((a, b) => (sortKey(a) < sortKey(b) ? -1 : sortKey(a) > sortKey(b) ? 1 : 0));
let next = 1;
const assigned = [];
for (const c of needsNumber) {
  while (used.has(next)) next++;
  used.add(next);
  assigned.push({ ...c, num: next });
  next++;
}

const plan = [...withNumber, ...assigned].sort((a, b) => a.num - b.num).map((c) => {
  const pad = String(c.num).padStart(DIGITS, '0');
  // Slug: only strip a leading PREFIX- if the file actually had a
  // recognized old-series number (extractExistingNumber matched) — never
  // guess a prefix off an unnumbered basename. "engineering-standards.md"
  // is not "PREFIX=engineering, name=standards"; it is one whole name.
  let slugSource = c.base.replace(/\.md$/, '');
  const hadNumber = fromPrefixes.some((p) => new RegExp(`^${p}-\\d+-`).test(c.base));
  if (hadNumber) {
    const stripped = c.base.match(/^[A-Za-z]+-\d[\d_-]*-(.+)\.md$/);
    if (stripped) slugSource = stripped[1];
  }
  const slug = slugSource.toLowerCase().replace(/[_\s]+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const newBase = `${TO}-${pad}-${slug}.md`;
  const newRel = path.join(path.dirname(c.rel), newBase);
  const oldId = c.fm.id || c.base.replace(/\.md$/, '');
  const newId = `${TO}-${pad}`;
  return { oldRel: c.rel, newRel, oldBase: c.base, newBase, oldId, newId, tag: c.tag };
});

/* ---- 2. corpus-wide citation search (id + bare basename, any file type) ---- */
function grepCorpusCount(needle) {
  try {
    const out = execFileSync('git', ['-C', ROOT, 'grep', '-Fl', needle], { encoding: 'utf8' });
    return out.split('\n').filter(Boolean).filter((f) => !f.startsWith('web/dist/'));
  } catch (e) {
    return []; // git grep exits 1 on no matches
  }
}

/* Ambiguous-basename guard: some basenames (charter.md, roster.md — one per
   guild folder) collide across sibling directories. A bare "charter.md"
   citation in prose, or a templated form like "{my-guild}/charter.md"
   (confirmed live: blueprints/archive-summa-fundacional-v0.1.0.md:95), does
   not say WHICH guild it means — a corpus-wide string-replace of the bare
   basename would silently repoint another guild's citation, or corrupt a
   generic template line, to the file being renamed right now. Only the full
   relative path is unambiguous by construction. A bare basename is only
   safe to auto-rewrite when it is unique across the entire tracked corpus. */
const allBasenames = execFileSync('git', ['-C', ROOT, 'ls-files'], { encoding: 'utf8' })
  .split('\n').filter(Boolean).map((f) => path.basename(f));
const basenameCount = {};
for (const b of allBasenames) basenameCount[b] = (basenameCount[b] || 0) + 1;
function isBasenameUnique(base) { return basenameCount[base] === 1; }

console.log(`rename-series.mjs — ${APPLY ? 'APPLY' : 'DRY-RUN'}`);
console.log(`  dirs: ${DIR_ARG}  to: ${TO}  from: ${FROM || '(none — fresh numbering)'}  digits: ${DIGITS}\n`);

if (skipped.length) {
  console.log(`SKIPPED (${skipped.length}) — not renamed this run:`);
  for (const s of skipped) console.log(`  ${s.rel} — ${s.skip}`);
  console.log('');
}

console.log(`PLAN (${plan.length} files):`);
for (const p of plan) {
  const idHits = grepCorpusCount(p.oldId);
  const pathHits = grepCorpusCount(p.oldRel).filter((f) => f !== p.oldRel);
  const baseUnique = isBasenameUnique(p.oldBase);
  const baseHits = baseUnique
    ? grepCorpusCount(p.oldBase).filter((f) => f !== p.oldRel)
    : [];
  const ambiguousHits = !baseUnique
    ? grepCorpusCount(p.oldBase).filter((f) => f !== p.oldRel && !pathHits.includes(f))
    : [];
  console.log(`  ${p.oldRel}`);
  console.log(`    -> ${p.newRel}`);
  console.log(`    id: "${p.oldId}" -> "${p.newId}"  (${idHits.length} file(s) cite the id)`);
  console.log(`    full-path citations: ${pathHits.length} file(s) — safe, auto-rewritten on --apply`);
  if (baseUnique) {
    console.log(`    bare-basename citations (unique in corpus): ${baseHits.length} file(s) — safe, auto-rewritten on --apply`);
  } else if (ambiguousHits.length) {
    console.log(`    AMBIGUOUS bare-basename citations (shared with other file(s) named "${p.oldBase}"): ${ambiguousHits.length} file(s) — NOT auto-rewritten, manual review required:`);
    for (const f of ambiguousHits) console.log(`      ${f}`);
  }
  if (p.tag && SUBTYPE_FIELD) console.log(`    ${SUBTYPE_FIELD}: ${p.tag}`);
}

if (!APPLY) {
  console.log('\nDry-run only — nothing written. Re-run with --apply to execute.');
  process.exit(0);
}

/* ---- 4. apply ---- */
console.log('\nAPPLYING...');
const manualReview = [];
for (const p of plan) {
  const idHits = grepCorpusCount(p.oldId);
  const pathHits = grepCorpusCount(p.oldRel);
  const baseUnique = isBasenameUnique(p.oldBase);
  const baseHits = baseUnique ? grepCorpusCount(p.oldBase) : [];
  const safeHits = [...new Set([...idHits, ...pathHits, ...baseHits])];

  if (!baseUnique) {
    const ambiguousHits = grepCorpusCount(p.oldBase).filter((f) => f !== p.oldRel && !pathHits.includes(f));
    if (ambiguousHits.length) manualReview.push({ file: p.oldRel, base: p.oldBase, citedBy: ambiguousHits });
  }

  for (const f of safeHits) {
    const abs = path.join(ROOT, f);
    let content = readFileSync(abs, 'utf8');
    const before = content;
    content = content.split(p.oldId).join(p.newId);
    content = content.split(p.oldRel).join(p.newRel);
    if (baseUnique) content = content.split(p.oldBase).join(p.newBase);
    if (content !== before) writeFileSync(abs, content);
  }

  // frontmatter: id + subtype
  const absOld = path.join(ROOT, p.oldRel);
  let text = readFileSync(absOld, 'utf8');
  text = text.replace(/^id:\s*.*/m, `id: "${p.newId}"`);
  if (p.tag && SUBTYPE_FIELD) {
    if (new RegExp(`^${SUBTYPE_FIELD}:`, 'm').test(text)) {
      text = text.replace(new RegExp(`^${SUBTYPE_FIELD}:.*`, 'm'), `${SUBTYPE_FIELD}: ${p.tag}`);
    } else {
      text = text.replace(/^(type:.*)$/m, `$1\n${SUBTYPE_FIELD}: ${p.tag}`);
    }
  }
  writeFileSync(absOld, text);

  execFileSync('git', ['-C', ROOT, 'mv', p.oldRel, p.newRel]);
  console.log(`  done: ${p.oldRel} -> ${p.newRel} (${safeHits.length} citing file(s) auto-updated)`);
}

if (manualReview.length) {
  console.log(`\n⚠ ${manualReview.length} file(s) had AMBIGUOUS basename citations NOT auto-rewritten — fix by hand before commit:`);
  for (const m of manualReview) {
    console.log(`  ${m.file} (now ${m.base} elsewhere too) — cited bare in:`);
    for (const f of m.citedBy) console.log(`    ${f}`);
  }
}

console.log('\nVerifying with check-references.mjs...');
try {
  execFileSync('node', [path.join(ROOT, 'scripts', 'check-references.mjs')], { stdio: 'inherit' });
  console.log('\ncheck-references.mjs: clean.');
} catch (e) {
  console.error('\ncheck-references.mjs: FAILED — review before committing. Nothing was auto-committed.');
  process.exit(1);
}
