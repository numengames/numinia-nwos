#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// PDF generation for the canon mirror (MIS-088). Run AFTER `astro build`:
//
//   node scripts/generate-pdfs.mjs
//
// Serves dist/ locally, prints every /print/<slug>/ page to
// dist/pdf/<slug>.pdf with Chromium, then removes dist/print/ so the
// intermediates never deploy. Chromium comes from Playwright's cache;
// override with PDF_CHROME=<path-to-chrome> if the default is missing.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const printRoot = path.join(dist, "print");
const pdfRoot = path.join(dist, "pdf");
const CONCURRENCY = 6;

const executablePath =
  process.env.PDF_CHROME ??
  path.join(os.homedir(), ".cache/ms-playwright/chromium-1234/chrome-linux64/chrome");
if (!fs.existsSync(executablePath)) {
  console.error(`Chromium not found at ${executablePath} — set PDF_CHROME.`);
  process.exit(1);
}
if (!fs.existsSync(printRoot)) {
  console.error(`No ${printRoot} — run \`npm run build\` first.`);
  process.exit(1);
}

// Minimal static server over dist/ — only what the print pages request.
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(dist, urlPath);
  if (!file.startsWith(dist)) return void res.writeHead(403).end();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) return void res.writeHead(404).end();
  res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const port = server.address().port;

// Every print page, slug = path under dist/print without /index.html.
const slugs = execFileSync("find", [printRoot, "-name", "index.html"], { encoding: "utf-8" })
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((p) => path.relative(printRoot, path.dirname(p)))
  .sort();

const footerTemplate = `
  <div style="width:100%;font-size:6.5pt;font-family:monospace;color:#6E6259;
              padding:0 16mm;display:flex;justify-content:space-between;">
    <span>numinia.org/<span class="url-slug"></span> · ${new Date().toISOString().slice(0, 10)}</span>
    <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
  </div>`;

const t0 = Date.now();
const browser = await chromium.launch({ executablePath });
const context = await browser.newContext();
let done = 0;
const failed = [];

async function printOne(slug) {
  const page = await context.newPage();
  try {
    await page.goto(`http://127.0.0.1:${port}/print/${slug}/`, { waitUntil: "networkidle" });
    const out = path.join(pdfRoot, `${slug}.pdf`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await page.pdf({
      path: out,
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: footerTemplate.replace('<span class="url-slug"></span>', slug),
      margin: { top: "14mm", bottom: "16mm", left: "0", right: "0" },
    });
    done++;
    if (done % 25 === 0) console.log(`  ${done}/${slugs.length}…`);
  } catch (err) {
    failed.push(`${slug}: ${err.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }
}

const queue = [...slugs];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) await printOne(queue.shift());
  })
);
await browser.close();
server.close();

// The print pages are intermediates — never deploy them.
fs.rmSync(printRoot, { recursive: true, force: true });

const bytes = execFileSync("du", ["-sb", pdfRoot], { encoding: "utf-8" }).split("\t")[0];
console.log(
  `PDF generation: ${done}/${slugs.length} ok, ${failed.length} failed, ` +
    `${(Number(bytes) / 1024 / 1024).toFixed(1)} MB, ${((Date.now() - t0) / 1000).toFixed(0)}s`
);
if (failed.length) {
  console.error(failed.join("\n"));
  process.exit(1);
}
