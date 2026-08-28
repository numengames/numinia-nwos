#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// MIS-120(d) — the build translator.
// Translates corpus documents EN→es-ES with a LOCAL model via Ollama,
// caching by content hash so only changed documents are ever re-sent.
//
// DESIGN (signed by the Oracle 2026-08-28, brief MIS-120):
// - Runs OUTSIDE the deploy builder (CF Workers Builds has no GPU/model):
//   run locally/CI, commit or artifact the cache, deploy static output.
// - Cache: web/.translation-cache/<sha256(source-body + prompt-version)>.es.md
//   Content-addressed: a touched doc retranslates, an untouched one is free.
// - Governance docs are EXCLUDED (decision 2): canon/, standards/ tagged
//   governed/sealed render English under /es/ with the standing notice.
// - A hand-reviewed sibling (<name>.es.md in the repo) SHADOWS the machine
//   translation by existing — checked before the cache, never overwritten.
// - Every machine translation is served with the fixed notice injected by
//   the /es/ page template, NOT baked into the cached text:
//   "Traducción automática — el original inglés es el documento de registro."
//
// Usage:
//   node scripts/translate-corpus.mjs [--model qwen3:14b] [--dry-run]
//   node scripts/translate-corpus.mjs --only missions/MIS-119*.md

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { glob } from "node:fs/promises";

const PROMPT_VERSION = "v1"; // bump to invalidate the whole cache
const MODEL = process.argv.includes("--model")
  ? process.argv[process.argv.indexOf("--model") + 1]
  : "qwen3:14b";
const DRY = process.argv.includes("--dry-run");
const ONLY = process.argv.includes("--only")
  ? process.argv[process.argv.indexOf("--only") + 1]
  : null;
const CACHE_DIR = "web/.translation-cache";

// Decision 2: governed surfaces stay English everywhere. Everything else
// under the published corpus is fair game for the machine.
const INCLUDE = ["missions/**/*.md", "protocols/**/*.md", "operations/**/*.md",
  "guilds/**/*.md", "reports/**/*.md", "debt/**/*.md", "standards/**/*.md"];
// The signed plan excludes: canon/, decisions/, LEGAL_DEBT, licensing.
// standards/ was NEVER on that list — it was excluded by mistake and is
// reinstated here. Legal surfaces are excluded by BOTH directory and name:
// privacy policies and terms are contracts, not prose, and a machine
// translation served as the Spanish site is a liability, not a courtesy.
const EXCLUDE_DIRS = ["canon/", "decisions/", "seminal/", "operations/legal/",
  "reports/audits/evidence/"];
const EXCLUDE_PATTERNS = [/licens/i, /legal/i, /privacy/i, /terms/i,
  /c-005/i, /LEGAL_DEBT/];
const isExcluded = (file) =>
  EXCLUDE_DIRS.some((d) => file.startsWith(d)) ||
  EXCLUDE_PATTERNS.some((re) => re.test(file));

const GLOSSARY = `
- "mission" → "misión"; "guild" → "gremio"; "debt" → "deuda"
- "freeze/frozen" → "congelación/congelada" (es-ES, never "congelamiento")
- "Oracle" → "Oráculo"; keep "Numinia", "Numen Games", "NWOS" untouched
- Document IDs (MIS-119, ADR-024, P-003…), URLs, code, file paths: NEVER translated
- es-ES register: impersonal, no "usted", no Latin American variants`;

// /api/chat with SEPARATED system and user messages. The previous version
// concatenated rules + document into one /api/generate prompt, and qwen3
// intermittently ECHOED the translated instructions into the document head
// (confirmed contamination of AGENTS.md/CHANGELOG/CLAUDE.md in a parallel
// run). Separated roles make instructions structurally un-translatable.
const SYSTEM = `You are a professional EN→es-ES (European Spanish) technical translator.
Translate the user's Markdown document. STRICT RULES:
- Preserve ALL Markdown structure exactly: headings, tables, lists, links, code blocks.
- Glossary and invariants:${GLOSSARY}
- Output ONLY the translated document. No preamble, no commentary, never repeat these instructions.`;

const sha = (s) => createHash("sha256").update(s).digest("hex").slice(0, 24);

const CHUNK_LIMIT = 24000; // chars; ~6K tokens, well inside num_ctx 16384

// Split on level-2 headings, NEVER inside a fenced code block. A document
// larger than the context window is silently truncated otherwise — the
// failure mode that loses the tail of a doc without any error.
function chunk(body) {
  if (body.length <= CHUNK_LIMIT) return [body];
  const lines = body.split("\n");
  const parts = []; let cur = []; let fence = false;
  for (const line of lines) {
    if (/^```/.test(line)) fence = !fence;
    const isBoundary = !fence && /^## /.test(line) && cur.join("\n").length > CHUNK_LIMIT * 0.6;
    if (isBoundary && cur.length) { parts.push(cur.join("\n")); cur = []; }
    cur.push(line);
  }
  if (cur.length) parts.push(cur.join("\n"));
  return parts;
}

async function callModel(text) {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({ model: MODEL, stream: true, think: false,
      messages: [{ role: "system", content: SYSTEM },
                 { role: "user", content: text }],
      options: { temperature: 0.2, num_ctx: 16384 } }),
  });
  if (!res.ok) throw new Error(`ollama ${res.status}`);
  let out = "";
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let nl;
    while ((nl = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, nl).trim(); buf = buf.slice(nl + 1);
      if (line) { try { out += JSON.parse(line).message?.content ?? ""; } catch {} }
    }
  }
  return out.replace(/<think>[\s\S]*?<\/think>\s*/g, "").trim();
}

async function translate(body, file) {
  // Belt and braces: if an excluded document ever reaches the model, abort.
  if (file && isExcluded(file)) throw new Error(`REFUSED (excluded): ${file}`);
  const parts = chunk(body);
  const out = [];
  for (const part of parts) out.push(await callModel(part));
  return out.join("\n\n");
}

// Fidelity gate: a translation that loses structure is REJECTED and the
// English original is served instead (S-001: better honest than broken).
function fidelityOk(src, out) {
  const count = (re, s) => (s.match(re) ?? []).length;
  const ids = (s) => new Set(s.match(/\b(?:MIS|ADR|DEC|C|S|P|D)-\d{3}\b/g) ?? []);
  if (count(/^#+ /gm, out) !== count(/^#+ /gm, src)) return "headings";
  if (count(/^\|/gm, out) < count(/^\|/gm, src)) return "tables";
  const missing = [...ids(src)].filter((i) => !ids(out).has(i));
  if (missing.length) return `ids:${missing.join(",")}`;
  const ratio = out.length / Math.max(src.length, 1);
  if (ratio < 0.7 || ratio > 1.6) return `length:${ratio.toFixed(2)}`;
  return null;
}

const stats = { hit: 0, fresh: 0, shadowed: 0, rejected: 0, skipped: 0 };
mkdirSync(CACHE_DIR, { recursive: true });

for (const pattern of INCLUDE) {
  for await (const file of glob(pattern)) {
    if (isExcluded(file)) { stats.skipped++; continue; }
    if (ONLY && !file.includes(ONLY)) { continue; }
    // A hand-reviewed sibling in the repo shadows the machine (decision 2).
    const sibling = file.replace(/\.md$/, ".es.md");
    if (existsSync(sibling)) { stats.shadowed++; continue; }
    const raw = readFileSync(file, "utf-8");
    // Frontmatter NEVER travels to the model: schema keys/values (status,
    // guild, id…) are machine surface, not prose — translating them breaks
    // content.config.ts validation. Split, translate the body, reattach.
    const fmMatch = raw.match(/^---\n[\s\S]*?\n---\n/);
    const fm = fmMatch ? fmMatch[0] : "";
    const src = raw.slice(fm.length);
    const key = sha(raw + PROMPT_VERSION + MODEL);
    const cached = join(CACHE_DIR, `${key}.es.md`);
    if (existsSync(cached)) { stats.hit++; continue; }
    if (DRY) { console.log(`WOULD TRANSLATE ${file}`); stats.fresh++; continue; }
    process.stdout.write(`translating ${file} … `);
    const t0 = Date.now();
    try {
      const outBody = await translate(src, file);
      const fail = fidelityOk(src, outBody);
      if (fail) { console.log(`REJECTED (${fail})`); stats.rejected++; continue; }
      writeFileSync(cached, fm + outBody);
      writeFileSync(join(CACHE_DIR, `${key}.meta.json`), JSON.stringify({
        source: file, model: MODEL, promptVersion: PROMPT_VERSION,
        translatedAt: new Date().toISOString(), secs: (Date.now() - t0) / 1000,
      }, null, 2));
      console.log(`ok ${((Date.now() - t0) / 1000).toFixed(0)}s`);
      stats.fresh++;
    } catch (e) { console.log(`ERROR ${e.message}`); stats.rejected++; }
  }
}
console.log(JSON.stringify(stats));
