#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// template guard — MIS-145 v2.
//
// WHY THIS EXISTS
// ---------------
// Until now nothing checked the templates. Every other document in the archive
// is read by lint-frontmatter, lint-naming, check-references and the rest; the
// moulds those documents are copied FROM were exempt from all of them, because
// `^templates/` is apparatus and apparatus is skipped. The result was measured
// on 2026-09-04, before this guard existed:
//
//   · 12 of the 14 files carried no `.md` extension, so every markdown tool in
//     the repository — the reference resolver included — was blind to them.
//   · STD-TEMPLATE.md wrote `status: draft  # draft|active|...` on one line,
//     and the telemetry instrument duly registered a status bucket called
//     "draft          # draft|active|superseded|withdrawn". The template
//     taught the exact defect (D-009) that its own sibling warns about.
//   · Six templates declared a `license:` contradicting REUSE.toml for the
//     path they live in — invisible, because check-license-frontmatter reads
//     the file's OWN path, and templates/** is CC0-1.0 whatever the target is.
//
// A template is not a document of its series. It is the mould, and its
// frontmatter is a WORKED EXAMPLE of that series' contract: it must be right
// for the DESTINATION, not for templates/. That is the one thing the general
// guards structurally cannot check, and it is exactly what this one does.
//
// WHAT IT CHECKS
// --------------
//   T-01  every templates/*.md parses as frontmatter + body
//   T-02  the filename is <PREFIX>-TEMPLATE.md for a registered prefix
//         (plus the sanctioned -EXAMPLE / -CHANGES companions, and README.md)
//   T-03  no inline `# comment` after a scalar value — the D-009 shape
//   T-04  `license:` matches the REUSE regime of the DESTINATION directory,
//         not of templates/
//   T-05  `type` matches what STD-004 §4 maps to the destination series
//   T-06  `status` is in the destination series' lifecycle
//   T-07  every frontmatter key is in ring 1, 2 or the destination's ring 3
//   T-08  version is bare SemVer and opens at 0.1.0 (STD-002)
//   T-09  the context card is present, with Summary, Epistemic and Pragmatic
//   T-10  every registered series has a template
//
// Run from anywhere: node scripts/check-templates.mjs

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT, parseFM, rawFM, stripFM, loadRules, seriesDirs } from './lib/frontmatter.mjs';
import { RING1, RING2, RING3, RING3_ALL, lifecycleFor } from './lib/rings.mjs';
import { declareBlindSpots } from './lib/blindness.mjs';
declareBlindSpots('check-templates');

const RULES = loadRules();

/* Which series each template scaffolds. The map is explicit rather than
   derived from the prefix, because two of these files are companions of a
   template (a filled example, a design record) and not templates themselves. */
const DEST = {};
for (const dir of seriesDirs(RULES)) {
  const pfx = RULES.series[dir].prefix[0];
  if (pfx) DEST[`${pfx}-TEMPLATE.md`] = dir;
}
const COMPANIONS = { 'MIS-TEMPLATE-EXAMPLE.md': 'missions', 'MIS-TEMPLATE-CHANGES.md': 'missions' };
const EXEMPT = new Set(['README.md']);

/* Ring 1, ring 2 and the per-series registry come from lib/rings.mjs — the
   same registry lint-frontmatter enforces on the documents. Lifecycles come
   from rules.json, series before type (STD-004 §5). */

const SEMVER = /^\d+\.\d+\.\d+$/;

// --- REUSE.toml, same parse as check-license-frontmatter -------------------
function parseAnnotations(toml) {
  const blocks = []; let cur = null;
  const lines = toml.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/(^|\s)#.*$/, '').trim();
    if (!line) continue;
    if (line === '[[annotations]]') { cur = { paths: [], license: null }; blocks.push(cur); continue; }
    if (!cur) continue;
    if (/^path\s*=/.test(line)) {
      let rhs = line.slice(line.indexOf('=') + 1).trim();
      while (rhs.startsWith('[') && !rhs.endsWith(']')) { i++; rhs += lines[i].replace(/(^|\s)#.*$/, '').trim(); }
      cur.paths = [...rhs.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    } else if (/^SPDX-License-Identifier\s*=/.test(line)) {
      cur.license = /"([^"]+)"/.exec(line)?.[1] ?? null;
    }
  }
  return blocks;
}
function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '.*');
  return new RegExp(`^${escaped}$`);
}
function regimeFor(file, ann) {
  let r = null;
  for (const b of ann) if (b.paths.some((p) => globToRegExp(p).test(file))) r = b.license;
  return r;
}
const ANN = parseAnnotations(readFileSync(path.join(ROOT, 'REUSE.toml'), 'utf8'));

/* The licence a document created from this template will need. Probed with a
   filename of the destination's own shape, because REUSE.toml discriminates by
   path — operations/ splits its regime across two globs. */
function destRegime(dir) {
  const pfx = RULES.series[dir]?.prefix?.[0] ?? 'XXX';
  const digits = RULES.series[dir]?.digits ?? 3;
  const n = '9'.repeat(digits);
  return regimeFor(`${dir}/${pfx}-${n}-probe.md`, ANN);
}

// --- the check -------------------------------------------------------------
const failures = [];
const F = (code, file, msg) => failures.push(`  ${code} ${file} :: ${msg}`);

const files = execFileSync('git', ['ls-files', 'templates/*'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n').filter(Boolean);

let checked = 0;
for (const rel of files) {
  const base = path.basename(rel);

  // T-02: shape of the name. Everything in templates/ is a .md file.
  if (!rel.endsWith('.md')) {
    F('T-02', rel, 'is not a .md file — every markdown tool in the repo is blind to it');
    continue;
  }
  if (EXEMPT.has(base)) continue;

  const dir = DEST[base] ?? COMPANIONS[base];
  if (!dir) {
    F('T-02', rel, `does not name a registered series: expected <PREFIX>-TEMPLATE.md for one of ${Object.keys(DEST).length} prefixes`);
    continue;
  }
  checked++;

  const text = readFileSync(path.join(ROOT, rel), 'utf8');
  const fm = parseFM(text);
  if (!fm) { F('T-01', rel, 'no frontmatter — the mould teaches a document with no header'); continue; }

  // T-03: the D-009 shape. An inline `#` after a value lands INSIDE the value
  // in the readers this corpus actually uses.
  for (const line of rawFM(text).split('\n')) {
    const m = /^([A-Za-z_][\w.-]*):\s*(\S.*?)\s+#\s/.exec(line);
    if (m) F('T-03', rel, `inline comment after "${m[1]}" — put it on its own line (this is how D-009's corrupt value was made)`);
  }

  // The companions are records, not moulds: their frontmatter documents a real
  // mission, so the destination checks below do not apply to them.
  if (COMPANIONS[base]) continue;

  // T-04: the licence of the DESTINATION, which no other guard can see.
  const want = destRegime(dir);
  if (want && fm.license !== want)
    F('T-04', rel, `license "${fm.license}" is not the regime of ${dir}/ ("${want}") — a document copied from this mould fails check-license-frontmatter on its first commit`);

  // T-05: type ↔ series, STD-004 §4.
  const allowedTypes = Object.entries(RULES.types.series)
    .filter(([, d]) => d === dir).map(([t]) => t);
  if (fm.type && allowedTypes.length && !allowedTypes.includes(fm.type))
    F('T-05', rel, `type "${fm.type}" does not belong to ${dir}/ (expected ${allowedTypes.join(' | ')})`);

  // T-06: status ↔ lifecycle, STD-004 §5 (series beats type).
  const life = lifecycleFor(dir, fm.type, RULES);
  if (fm.status && !life.includes(fm.status))
    F('T-06', rel, `status "${fm.status}" is not in ${dir}/'s lifecycle [${life.join(' ')}]`);

  // T-07: no field the destination does not register (STD-004 §6, H-30's rule
  // applied one step earlier — at the mould instead of at its copies).
  const ring3 = RING3[dir] ?? [];
  for (const k of Object.keys(fm)) {
    if (RING1.includes(k) || RING2.includes(k) || RING3_ALL.includes(k)) continue;
    if (ring3.includes(k)) continue;
    if (k === 'subtype') continue;                 // lint-frontmatter allows it corpus-wide
    F('T-07', rel, `field "${k}" is registered for no ring of ${dir}/ — a document copied from this mould fails H-30`);
  }

  // T-01 ring 1 presence: a mould that omits a mandatory field teaches its absence.
  for (const k of RING1)
    if (!(k in fm) || fm[k] === '')
      F('T-01', rel, `missing mandatory field "${k}" — the mould must carry the whole ring 1`);

  // T-08: SemVer, opening at 0.1.0 (STD-002: every artifact starts there).
  if (fm.version && !SEMVER.test(fm.version))
    F('T-08', rel, `version "${fm.version}" is not bare SemVer`);
  else if (fm.version && fm.version !== '0.1.0' && dir !== 'reports')
    F('T-08', rel, `version "${fm.version}" — a new artifact opens at 0.1.0 (STD-002), and the mould is what teaches that`);

  // T-09: the context card, STD-004 §9.
  const body = stripFM(text);
  for (const part of ['Summary', 'Epistemic', 'Pragmatic'])
    if (!new RegExp(`^>\\s\\*\\*${part}:\\*\\*`, 'm').test(body))
      F('T-09', rel, `context card has no **${part}:** line`);
}

// T-10: coverage. A registered series with no mould is the gap this library exists to close.
for (const dir of seriesDirs(RULES)) {
  const pfx = RULES.series[dir].prefix[0];
  if (!pfx) continue;                       // agents/ is folder-named: its scaffold is agents/_template/
  if (!files.includes(`templates/${pfx}-TEMPLATE.md`))
    F('T-10', `templates/${pfx}-TEMPLATE.md`, `absent — ${dir}/ is a registered series with no mould to copy from`);
}

if (failures.length) {
  console.error(`template guard: ${failures.length} finding(s) across ${checked} template(s)`);
  for (const f of failures.sort()) console.error(f);
  console.error('\nA template is a worked example of its DESTINATION series\' contract.');
  console.error('Fix the mould, not the documents copied from it.');
  process.exit(1);
}
console.log(`template guard: ${checked} template(s) · every registered series covered · destination contracts hold`);
