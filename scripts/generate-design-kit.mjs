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

// The master is the registered Design System standard. Its version comes
// from the `version:` frontmatter field, not from the filename — a filename
// carries no version (CORE-13), which is why STD-008 was renamed off the
// dated `Sistema_de_Diseno-vN.N.N.md` shape in the first place.
const masterFile = "STD-008-design-system.md";
const masterPath = path.join(standards, masterFile);
if (!fs.existsSync(masterPath))
  throw new Error(`Design System master not found: standards/${masterFile}`);
const doc = fs.readFileSync(masterPath, "utf-8");
const fm = doc.match(/^---\n([\s\S]*?)\n---\n/);
const vMatch = fm && fm[1].match(/^version:\s*"?(\d+\.\d+\.\d+)"?\s*$/m);
if (!vMatch)
  throw new Error(`No version: field in standards/${masterFile} frontmatter`);
const version = vMatch[1];

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
// Tokens are no longer inlined in the master: §19.3 used to carry a copy of
// the JSON, and the copy drifted (it declared v5.0.0 under a 5.1.0 document).
// The published file is the source; this script re-stamps and re-hashes it.
const tokensPath = path.join(root, "web/public/diseno/kit", version, "sistema.tokens.json");
if (!fs.existsSync(tokensPath))
  throw new Error(`Tokens not found for v${version}: ${path.relative(root, tokensPath)}`);
const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
tokens["$description"] = `Numen Games · Sistema de Diseño · v${version} · Solar 40 / Steam 40 / Cyber 20`;
const tokensOut = JSON.stringify(tokens, null, 2) + "\n";

const kitDir = path.join(root, "web/public/diseno/kit", version);
fs.mkdirSync(kitDir, { recursive: true });
const files = {
  "sistema.css": css,
  "sistema.js": js,
  "sistema.tokens.json": tokensOut,
};
// The agent instruction fragment (§19.5) is a published artefact too: it
// ships in the kit and is hashed like the rest, so a consumer can verify it.
const promptPath = path.join(root, "web/public/diseno/kit", version, "sistema.prompt.txt");
if (fs.existsSync(promptPath))
  files["sistema.prompt.txt"] = fs.readFileSync(promptPath, "utf-8");
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
