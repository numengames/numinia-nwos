#!/usr/bin/env node
// check-section-citations.mjs — a citation to a numbered section must resolve.
//
// The corpus cites by section: `PRO-010 §3.2`, `STD-023 §14`. DBT-016 measured
// 422 such citations across 107 files and called the numbers load-bearing. No
// guard read them: check-references resolves identifiers, check-internal-links
// resolves markdown links, and neither looks at what follows the §.
//
// The gap is not theoretical. PR #232 cut PRO-010 from 3652 to 1406 words and
// left nine citations pointing at sections that no longer exist. Nothing failed,
// and the breakage sat in main for days.
//
// WHAT IT CHECKS
//   For every `DOC-NNN §X.Y` in the corpus, if DOC-NNN exists AND uses numbered
//   headings, then §X.Y must be one of them.
//
// WHAT IT DELIBERATELY DOES NOT CHECK
//   Documents whose headings are prose ("## Context", "## Decision") — the ADR
//   and report series. A `§2` there means "the second section", which is a
//   convention this guard cannot verify without inventing an ordering rule.
//   Silence is honest; a false failure would teach people to ignore the guard.
//
// MODES
//   bare              every unresolved citation; exit 1 only if one binds (ENG-067)
//   --report          list every unresolved citation, exit 0
//
// BLINDNESS (declared, per PRO-013)
//   - Prose-headed documents (ADR, RPT) are skipped: "§2" there is ordinal.
//   - A citation inside a fenced code block is read like any other text.
//   - It verifies that a section EXISTS, never that it still says what the
//     citing document claims. A renumbered section that resolves to different
//     content passes silently. That is DBT-016's deeper half and stays open.

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { Findings } from "./lib/regime.mjs";
import { declareBlindSpots } from "./lib/blindness.mjs";

declareBlindSpots("check-section-citations");

const root = execSync("git rev-parse --show-toplevel", { encoding: "utf-8" }).trim();
const REPORT = process.argv.includes("--report");
const SKIP = ["web/dist/", "salida/", "templates/", "history/", "node_modules/"];

const files = execSync("git ls-files '*.md'", { cwd: root, encoding: "utf-8" })
  .split("\n")
  .filter((f) => f && !SKIP.some((s) => f.startsWith(s)));

// Index: basename -> set of numbered headings it actually has.
const sections = new Map();
const text = new Map();
for (const rel of files) {
  let t;
  try {
    t = readFileSync(path.join(root, rel), "utf-8");
  } catch {
    continue; // a directory shadowing a .md name, or an unreadable path
  }
  text.set(rel, t);
  const nums = new Set();
  for (const m of t.matchAll(/^#{1,6}\s+(\d+(?:\.\d+)*)[.\s]/gm)) nums.add(m[1]);
  sections.set(path.basename(rel), nums);
}

const resolveDoc = (id) => {
  for (const name of sections.keys()) if (name.startsWith(id)) return name;
  return null;
};

// "PRO-010 §3.2.2", "STD-008 v6.0.0 §13" — the id, then a § close behind it.
//
// The window is deliberately narrow and must not span another identifier. A row
// like "`PRO-013`, `STD-001` §10.4" cites STD-001, not PRO-013; a greedy window
// attributes the section to the first id on the line and reports a false break.
// Verified against exactly that line in MIS-0138.
const CITE = /\b([A-Z]{2,4}-\d{1,4}[a-z]?)\b((?:[^\n§]){0,18}?)§\s*(\d+(?:\.\d+)*)/g;
const INTERVENING_ID = /\b[A-Z]{2,4}-\d{1,4}[a-z]?\b/;

const broken = [];
for (const rel of files) {
  const t = text.get(rel);
  if (!t) continue;
  t.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(CITE)) {
      const [, id, gap, sec] = m;
      if (INTERVENING_ID.test(gap)) continue; // the § belongs to a nearer id
      const name = resolveDoc(id);
      if (!name) continue;                    // cross-repo or unknown id: not ours
      const have = sections.get(name);
      if (!have || have.size === 0) continue; // prose-headed document: not comparable
      if (!have.has(sec)) broken.push({ rel, line: i + 1, id, sec, name });
    }
  });
}

const show = (list, label) => {
  console.error(`${label}\n`);
  for (const b of list) {
    const have = [...sections.get(b.name)].sort();
    console.error(`  ${b.rel}:${b.line}`);
    console.error(`      cites ${b.id} §${b.sec} — ${b.name} has: ${have.join(", ")}`);
  }
  console.error(`
Cite the rule, never the place. A section number is the most fragile part
of a citation: it changes whenever the cited document is reorganised, and
the reader of the citing document never finds out.
`);
};

if (REPORT) {
  if (broken.length === 0) console.log("check-section-citations: OK — every § citation resolves");
  else show(broken, `${broken.length} unresolved citation(s):`);
  process.exit(0);
}

/* ENG-067: a citation to a section that does not exist is CIT-050, "cite
   the document, not the place" (STD-021); it binds by that standard's state. */
if (broken.length) show(broken, `${broken.length} citation(s) to a section that does not exist:`);
const out = new Findings("check-section-citations");
for (const b of broken) out.add("CIT-050", `cites ${b.id} §${b.sec}, which ${b.name} does not have`, `${b.rel}:${b.line}`);
out.finish({ ok: "every § citation resolves." });
