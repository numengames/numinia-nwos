#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// Design System kit generator (MIS-068 first case: the emitter publishes).
// Extracts the canonical kit from the CURRENT master in standards/ —
// sistema.css and sistema.js from §13.1, sistema.tokens.json from §19.3 —
// and publishes it under a versioned path with a sha256 manifest:
//
//   web/public/diseno/kit/<version>/sistema.{css,js,tokens.json}
//   web/public/diseno/kit/manifest.json
//
// Run from anywhere: node scripts/generate-design-kit.mjs
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const standards = path.join(root, "standards");

// The current master: highest version among Sistema_de_Diseno files.
const masters = fs
  .readdirSync(standards)
  .filter((f) => /Sistema_de_Diseno-v\d+\.\d+\.\d+\.md$/.test(f))
  .sort();
const masterFile = masters[masters.length - 1];
if (!masterFile) throw new Error("No Design System master found in standards/");
const masterPath = path.join(standards, masterFile);
const doc = fs.readFileSync(masterPath, "utf-8");
const version = masterFile.match(/v(\d+\.\d+\.\d+)\.md$/)[1];

// Fenced-block extraction: first ```css and first ```js after §13.1,
// first ```json after §19.3.
function block(afterHeading, lang) {
  const start = doc.indexOf(afterHeading);
  if (start < 0) throw new Error(`Heading not found: ${afterHeading}`);
  const fence = doc.indexOf("```" + lang + "\n", start);
  if (fence < 0) throw new Error(`No \`\`\`${lang} block after ${afterHeading}`);
  const bodyStart = fence + lang.length + 4;
  const end = doc.indexOf("\n```", bodyStart);
  return doc.slice(bodyStart, end + 1);
}

const header = (ext) =>
  ext === "json"
    ? ""
    : `/* GENERADO de ${masterFile} — Sistema de Diseño · v${version} — no editar aquí: la fuente es el .md */\n`;

const css = header("css") + block("### 13.1", "css");
const js = header("js") + block("### 13.1", "js");
const tokensRaw = block("### 19.3", "json");
const tokens = JSON.parse(tokensRaw); // fail loudly if the master's JSON drifts
tokens["$description"] = `Numen Games · Sistema de Diseño · v${version} · Solar 40 / Steam 40 / Cyber 20`;
const tokensOut = JSON.stringify(tokens, null, 2) + "\n";

const kitDir = path.join(root, "web/public/diseno/kit", version);
fs.mkdirSync(kitDir, { recursive: true });
const files = {
  "sistema.css": css,
  "sistema.js": js,
  "sistema.tokens.json": tokensOut,
};
const sha = (s) => createHash("sha256").update(s).digest("hex");
const manifest = {
  sistema: "Numen Games · Sistema de Diseño",
  version,
  master: {
    path: `standards/${masterFile}`,
    url: `https://numinia.org/corpus/standards/${masterFile.replace(/\.md$/, "").toLowerCase().replace(/\./g, "")}.md`,
    sha256: sha(doc),
  },
  files: {},
};
for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(kitDir, name), content);
  manifest.files[`${version}/${name}`] = sha(content);
}
fs.writeFileSync(
  path.join(root, "web/public/diseno/kit/manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n"
);
console.log(`kit v${version} → web/public/diseno/kit/${version}/`);
console.log(`master sha256: ${manifest.master.sha256}`);
for (const [f, h] of Object.entries(manifest.files)) console.log(`${h.slice(0, 12)}…  ${f}`);
