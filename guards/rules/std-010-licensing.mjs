#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// license-frontmatter guard — C-005 §5.
//
// The human-readable `license:` frontmatter field is not an SPDX tag:
// REUSE.toml is the declaration of record. This check fails when the two
// contradict, because that drift is how the pre-LD-001 CC0 default kept
// reappearing — three times, from three different templates. Frontmatter
// only: license strings inside fenced code examples are content, not
// declarations, and are ignored.
//
// Run from anywhere: node guards/rules/std-010-licensing.mjs

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { declareBlindSpots } from "../../scripts/lib/blindness.mjs";
import { parseFM } from "../../scripts/lib/frontmatter.mjs";
import { Findings } from "../../scripts/lib/regime.mjs";
import { regimeOf } from "../../scripts/lib/reuse.mjs";
declareBlindSpots("check-license-frontmatter");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

// Parses the subset of TOML that REUSE.toml uses: [[annotations]] blocks
// with `path = "x"` or `path = ["x", ...]` (possibly multi-line) and
// `SPDX-License-Identifier = "id"`. Block order is preserved because,
// as REUSE.toml itself documents, the last matching annotation wins.

// License declared in the file's own frontmatter (first `---` block at
// byte 0), or null. Fenced examples later in the file never match.
function frontmatterLicense(text) {
  const fm = parseFM(text);
  const v = fm?.license;
  return typeof v === 'string' && v.trim() ? v.trim() : null;
}

const files = execFileSync("git", ["ls-files", "*.md"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean);

const failures = [];
let declared = 0;
for (const file of files) {
  // MIS-145 v2 (2026-09-04): templates/ is exempt HERE and checked harder
  // elsewhere. A mould's `license:` is a worked example of the series it
  // scaffolds, so it must carry the DESTINATION's regime — CC-BY-4.0 in the
  // debt mould, MIT in the infra one — while the mould's own path is
  // templates/**, which REUSE.toml declares CC0-1.0. Comparing a mould's
  // frontmatter against its own path therefore measures the wrong thing: it
  // demands the answer that makes every document copied from it wrong.
  //
  // This is the drift described at the top of this file — "three times, from
  // three different templates" — and it kept recurring because the mould was
  // the one file where this guard's question does not apply. The right
  // comparison is made by scripts/check-templates.mjs (T-04), which resolves
  // each mould's destination directory and checks the regime there. Six
  // moulds were wrong on 2026-09-04 and no guard could see it.
  if (file.startsWith("templates/")) continue;
  const license = frontmatterLicense(readFileSync(path.join(root, file), "utf8"));
  if (!license) continue;
  declared++;
  const regime = regimeOf(file);
  if (!regime) {
    failures.push({ file, license, regime: "(no REUSE.toml annotation)" });
  } else if (license !== regime) {
    failures.push({ file, license, regime });
  }
}

if (failures.length > 0) {
  /* LIC-008 (STD-010): one file, one regime — the header's SPDX must be the
     regime REUSE.toml assigns to the path. Binds by STD-010's state
     (ENG-067). REUSE compliance itself is a build guard and is not this. */
  const out = new Findings("license-frontmatter guard");
  for (const f of failures) out.add("LIC-008", `frontmatter says ${f.license}, regime is ${f.regime}`, f.file);
  console.error(`license-frontmatter guard: ${failures.length} file(s) contradict REUSE.toml — fix the frontmatter to match REUSE.toml (or, with Oracle sign-off, the regime).\n`);
  out.finish();
}
console.log(
  `license-frontmatter guard: OK — ${declared}/${files.length} .md files declare a license, all match REUSE.toml`,
);
