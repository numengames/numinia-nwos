#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// check-prose-in-code — MIS-071's acceptance criterion, made measurable.
//
// WHY THIS EXISTS
// ---------------
// MIS-071 says: "no prose lives only in a component". Nothing measured it.
// Phase 2 extracted ten essays to .md in August and the pages kept their
// copies — a second archive, divergent and silent, and every guard in the
// repo reported green throughout. check-orphan-content declares this exact
// blindness in its own output:
//
//   "content served from outside web/public/ — a route added directly in
//    src/pages is not orphan content and is not examined here"
//
// DBT-003 records the same gap and defers it on purpose: "the .astro
// category is adjacent and larger, and is deliberately not folded in here."
// This guard is that category, measured.
//
// WHAT IT MEASURES
// ----------------
// Characters of prose living in .astro/.tsx files that read no .md. Prose
// is text a human reads: string literals and text nodes over a threshold,
// which is crude but stable — and a ratchet does not need precision, it
// needs a number that cannot go up by accident.
//
// A file that reads its content (getCollection / getEntry / import.meta.glob)
// is not counted, however much prose it renders: that prose comes from the
// archive. The measure is not "how much text does the page show" but "how
// much text exists ONLY here".
//
// HOW IT FAILS
// ------------
// Same ratchet as references/url/naming baselines: the damage is frozen at
// adoption and only NEW damage fails the build. Unlike those three, this
// baseline has a floor of zero and a mission whose completion drives it
// there — MIS-071 phase 4 wires one page at a time, and each landing PR
// lowers the number.
//
// Usage:
//   node scripts/check-prose-in-code.mjs            # verify against baseline
//   node scripts/check-prose-in-code.mjs --report   # per-file breakdown
//   node scripts/check-prose-in-code.mjs --update   # re-freeze (must shrink)

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { declareBlindSpots } from './lib/blindness.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.join(HERE, '..');
const BASELINE = path.join(HERE, 'prose-baseline.json');

const SCAN_ROOTS = ['web/src/pages', 'web/src/views', 'web/src/components'];
const EXTS = new Set(['.astro', '.tsx']);

// A fragment must be at least this long to count as prose rather than a
// label, class list, or identifier. 60 chars is roughly one full sentence.
const MIN_PROSE = 60;

// A file containing any of these reads content from the archive at build
// time, so its prose is not "only here".
const READS_ARCHIVE = /getCollection|getEntry|import\.meta\.glob|astro:content/;

declareBlindSpots('check-prose-in-code');

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (EXTS.has(path.extname(e.name))) out.push(full);
  }
  return out;
}

/**
 * Count prose characters in one file.
 *
 * Two sources: quoted string literals (the data-array pattern this guard
 * exists to catch) and text nodes between tags (prose written straight into
 * the template). Both are filtered to fragments a human would read.
 */
function proseChars(src) {
  const frags = [];

  // Quoted literals — the `descripcion: "..."` pattern.
  for (const m of src.matchAll(/["'`]([^"'`<>{}]{60,})["'`]/g)) {
    frags.push(m[1]);
  }
  // Text nodes — prose written directly into markup.
  for (const m of src.matchAll(/>\s*([\p{L}][^<>{}]{60,}?)\s*</gu)) {
    frags.push(m[1]);
  }

  // Drop anything that is plainly not prose. Prose has spaces, does not
  // start like a path or URL, and is not a Tailwind-style class list (a run
  // of lowercase tokens with no sentence punctuation).
  const isClassList = (f) =>
    !/[.!?,;:]/.test(f) && /^[a-z0-9:\-[\]/.%\s]+$/.test(f);

  const real = frags.filter(
    (f) =>
      f.includes(' ') &&
      !f.startsWith('/') &&
      !f.startsWith('http') &&
      !isClassList(f)
  );

  return real.reduce((n, f) => n + f.length, 0);
}

async function measure() {
  const rows = [];
  for (const root of SCAN_ROOTS) {
    for (const file of await walk(path.join(REPO, root))) {
      const src = readFileSync(file, 'utf8');
      const rel = path.relative(REPO, file).replaceAll('\\', '/');
      const readsArchive = READS_ARCHIVE.test(src);
      const chars = proseChars(src);
      if (chars > 0) rows.push({ file: rel, chars, readsArchive });
    }
  }
  rows.sort((a, b) => b.chars - a.chars);
  const orphan = rows.filter((r) => !r.readsArchive);
  return {
    rows,
    orphan,
    total: rows.reduce((n, r) => n + r.chars, 0),
    orphanTotal: orphan.reduce((n, r) => n + r.chars, 0),
  };
}

const args = process.argv.slice(2);
const { rows, orphan, total, orphanTotal } = await measure();

console.log('prose-in-code guard — text that exists only in a component (MIS-071)');
console.log('');
console.log(`  files scanned            : ${rows.length}`);
console.log(`  prose chars, all files   : ${total}`);
console.log(`  ...in files reading .md  : ${total - orphanTotal}`);
console.log(`  ...ONLY in code (orphan) : ${orphanTotal}   <- the measured number`);
console.log('');

if (args.includes('--report')) {
  console.log('  worst offenders (prose living only in code):');
  for (const r of orphan.slice(0, 20)) {
    console.log(`    ${String(r.chars).padStart(6)}  ${r.file}`);
  }
  console.log('');
}

if (args.includes('--update')) {
  const prev = existsSync(BASELINE)
    ? JSON.parse(readFileSync(BASELINE, 'utf8'))
    : null;
  if (prev && orphanTotal > prev.orphan_chars) {
    console.error(
      `✗ refusing to update: ${orphanTotal} > baseline ${prev.orphan_chars}.\n` +
        `  This ratchet only turns one way. Wire a page to its .md instead of\n` +
        `  re-freezing the growth (MIS-071 phase 4).`
    );
    process.exit(1);
  }
  const next = {
    _comment:
      'Prose living only in .astro/.tsx components, frozen at adoption ' +
      '(MIS-071 acceptance criterion, DBT-003 deferred category). The guard ' +
      'fails only when the number GROWS. Unlike the other baselines this one ' +
      'has a floor of zero: each page wired to its .md lowers it. Never grows.',
    generated: new Date().toISOString(),
    orphan_chars: orphanTotal,
    orphan_files: orphan.length,
    entries: orphan.map((r) => `${r.chars} ${r.file}`),
  };
  writeFileSync(BASELINE, JSON.stringify(next, null, 2) + '\n');
  console.log(
    `✓ baseline written: ${orphanTotal} chars across ${orphan.length} files` +
      (prev ? ` (was ${prev.orphan_chars})` : '')
  );
  process.exit(0);
}

if (!existsSync(BASELINE)) {
  console.error(
    `✗ no baseline at scripts/prose-baseline.json.\n` +
      `  Run: node scripts/check-prose-in-code.mjs --update`
  );
  process.exit(1);
}

const base = JSON.parse(readFileSync(BASELINE, 'utf8'));
console.log(`  baseline                 : ${base.orphan_chars}`);
console.log('');

if (orphanTotal > base.orphan_chars) {
  const grew = orphanTotal - base.orphan_chars;
  console.error(
    `✗ prose in code GREW by ${grew} characters (${base.orphan_chars} -> ${orphanTotal}).\n` +
      `\n` +
      `  Someone wrote prose into a component instead of into a .md. That is\n` +
      `  how the archive acquires a silent second copy — MIS-071 exists\n` +
      `  because it already happened once, to ten essays, unnoticed.\n` +
      `\n` +
      `  Put the text in a .md and render it, or explain the exception in the\n` +
      `  PR and re-freeze with --update.\n` +
      `\n` +
      `  Run with --report to see which files carry it.`
  );
  process.exit(1);
}

if (orphanTotal < base.orphan_chars) {
  const shrank = base.orphan_chars - orphanTotal;
  console.log(
    `✓ prose in code SHRANK by ${shrank} characters. Re-freeze the baseline\n` +
      `  in this PR: node scripts/check-prose-in-code.mjs --update`
  );
} else {
  console.log('✓ prose in code held at baseline.');
}
process.exit(0);
