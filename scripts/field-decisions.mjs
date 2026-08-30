#!/usr/bin/env node
/* SPDX-FileCopyrightText: 2026 Numen Games S.L.
 * SPDX-License-Identifier: MIT
 *
 * Field decision index (MIS-126, ADR-030).
 *
 * WHY THIS EXISTS
 * ---------------
 * On 2026-08-30 an agent presented three decisions to the Oracle as "pending"
 * when all three were already ruled and signed in the corpus:
 *
 *   - territory  -> ADR-028 L144-148 (66 map, 76 take TBA)
 *   - the ~111 orphan fields -> S-004 section 6 ("they die by omission")
 *   - the guild vocabulary -> S-001 L957 (four guilds, not the thirteen invented)
 *
 * Root cause: reading the guard's source and concluding that a rule the guard
 * does not implement does not exist. The corpus is ~29,000 lines of governance;
 * a missing check means nothing.
 *
 * This script derives, from the guard itself plus the RETIRED map, a
 * machine-readable answer to one question per field:
 *
 *     "who decided this, and what did they decide?"
 *
 * It is generated, never hand-edited. Regenerate with:
 *
 *     node scripts/field-decisions.mjs --write
 *
 * and read it with:
 *
 *     node scripts/field-decisions.mjs territory
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const GUARD = join(ROOT, 'scripts', 'lint-frontmatter.mjs');
const OUT = join(ROOT, 'scripts', 'field-decisions.json');

const src = readFileSync(GUARD, 'utf8');

/* The guard is the executable half of S-004. Parse its rings rather than
 * restating them here: a second copy would drift, and drift is the defect
 * this file exists to prevent. */
const arrayConst = (name) => {
  const m = src.match(new RegExp(`const ${name}\\s*=\\s*\\[(.*?)\\];`, 's'));
  return m ? [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]) : [];
};

const RING1 = arrayConst('RING1');
const RING2 = arrayConst('RING2');
const RING3_ALL = arrayConst('RING3_ALL');

const RING3 = {};
{
  const m = src.match(/const RING3\s*=\s*\{(.*?)\n\};/s);
  if (m) {
    for (const mm of m[1].matchAll(/'([^']+)':\s*\[(.*?)\]/gs)) {
      RING3[mm[1]] = [...mm[2].matchAll(/'([^']+)'/g)].map((x) => x[1]);
    }
  }
}

const RETIRED = {};
{
  const m = src.match(/const RETIRED\s*=\s*\{(.*?)\n\};/s);
  if (m) {
    for (const mm of m[1].matchAll(/(\w+):\s*'([^']+)'/g)) RETIRED[mm[1]] = mm[2];
  }
}

/* Vocabularies that S-001 closes. A field with a closed vocabulary is ruled
 * twice over: the field may appear, AND its value is constrained. */
const VOCAB = {
  guild: { source: 'S-001 L957', values: ['Sentinels', 'Alchemists', 'Exegetes', 'Procurators'] },
  type_execution: { source: 'S-001', values: ['digital', 'physical', 'hybrid'] },
  territory: {
    source: 'S-001 L964 + ADR-028',
    values: ['CAO', 'Product', 'Platform', 'Infrastructure', 'Content', 'Sales', 'Funding', 'Archive'],
    note: 'ADR-028: documents that do not map take TBA, owned by the mission that closes the vocabulary',
  },
};

/* Census of what the corpus actually carries. */
const files = execSync('git ls-files "*.md"', { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

const usage = {};
const carriers = {};
for (const rel of files) {
  let text;
  try {
    text = readFileSync(join(ROOT, rel), 'utf8');
  } catch {
    continue;
  }
  if (!text.startsWith('---')) continue;
  const end = text.indexOf('\n---', 3);
  if (end === -1) continue;
  for (const m of text.slice(3, end).matchAll(/^([a-z_][a-z_0-9]*):/gm)) {
    const k = m[1];
    usage[k] = (usage[k] || 0) + 1;
    (carriers[k] ||= new Set()).add(rel.split('/')[0]);
  }
}

const index = {};
for (const field of Object.keys(usage).sort()) {
  const entry = { usage: usage[field] };

  if (RETIRED[field]) {
    entry.ring = 'retired';
    entry.status = 'ruled';
    entry.decided_by = RETIRED[field].split(':')[0].trim();
    entry.rule = RETIRED[field];
  } else if (RING1.includes(field)) {
    entry.ring = 1;
    entry.status = 'ruled';
    entry.decided_by = 'S-004 §3';
    entry.rule = 'mandatory in every document';
  } else if (RING2.includes(field)) {
    entry.ring = 2;
    entry.status = 'ruled';
    entry.decided_by = 'S-004 §4';
    entry.rule = 'optional, valid anywhere';
  } else if (RING3_ALL.includes(field)) {
    entry.ring = '3-all';
    entry.status = 'ruled';
    entry.decided_by = 'S-004 §6';
    entry.rule = 'registered for every series';
  } else {
    const series = Object.keys(RING3)
      .filter((s) => RING3[s].includes(field))
      .sort();
    if (series.length) {
      entry.ring = 3;
      entry.status = 'ruled';
      entry.decided_by = 'S-004 §6';
      entry.rule = `registered for: ${series.join(', ')}`;
      entry.series = series;
    } else {
      entry.ring = null;
      entry.status = 'unruled';
      entry.decided_by = null;
      entry.rule = 'unregistered — S-004 §6: dies by omission unless it earns an ADR';
    }
  }

  if (VOCAB[field]) entry.vocabulary = VOCAB[field];
  entry.carriers = [...(carriers[field] || [])].sort();

  /* A field registered in one series but carried by another is not corpus
   * debt: it is a transcription gap in the ring table itself. S-004 records
   * two prior corrections of exactly this kind. */
  if (entry.series) {
    const stray = entry.carriers.filter((c) => !entry.series.includes(c) && c.endsWith('s'));
    if (stray.length) entry.ring_table_gap = stray;
  }

  index[field] = entry;
}

const payload = {
  generated_by: 'scripts/field-decisions.mjs',
  generated_from: 'scripts/lint-frontmatter.mjs + S-001 vocabularies',
  note: 'Generated. Do not hand-edit. Ask the canon before asking the Oracle.',
  fields: index,
};

const arg = process.argv[2];

if (arg === '--write') {
  writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`);
  const ruled = Object.values(index).filter((e) => e.status === 'ruled').length;
  const gaps = Object.entries(index).filter(([, e]) => e.ring_table_gap);
  console.log(`field-decisions: ${Object.keys(index).length} fields — ${ruled} ruled, ${Object.keys(index).length - ruled} unruled`);
  if (gaps.length) {
    console.log(`ring-table gaps: ${gaps.length}`);
    for (const [f, e] of gaps) console.log(`  ${f}: registered for ${e.series.join(',')} but carried by ${e.ring_table_gap.join(',')}`);
  }
  console.log(`wrote ${OUT}`);
} else if (arg) {
  const e = index[arg];
  if (!e) {
    console.log(`${arg}: not carried by any document.`);
    process.exit(1);
  }
  console.log(`${arg}  (${e.usage} uses, ring ${e.ring ?? 'none'})`);
  console.log(`  status:     ${e.status}`);
  console.log(`  decided by: ${e.decided_by ?? '— nobody. This one is genuinely open.'}`);
  console.log(`  rule:       ${e.rule}`);
  if (e.vocabulary) console.log(`  vocabulary: ${e.vocabulary.values.join(' · ')}  (${e.vocabulary.source})`);
  if (e.vocabulary?.note) console.log(`  note:       ${e.vocabulary.note}`);
  if (e.ring_table_gap) console.log(`  GAP:        registered for ${e.series.join(',')} but also carried by ${e.ring_table_gap.join(',')}`);
  console.log(`  carried by: ${e.carriers.join(', ')}`);
} else {
  const unruled = Object.entries(index)
    .filter(([, e]) => e.status === 'unruled')
    .sort((a, b) => b[1].usage - a[1].usage);
  console.log(`${Object.keys(index).length} fields — ${Object.keys(index).length - unruled.length} ruled, ${unruled.length} unruled\n`);
  console.log('unruled, by usage:');
  for (const [f, e] of unruled) console.log(`  ${f.padEnd(26)} ${String(e.usage).padStart(3)}  ${e.carriers.join(',')}`);
  console.log('\nUsage: field-decisions.mjs <field> | --write');
}
