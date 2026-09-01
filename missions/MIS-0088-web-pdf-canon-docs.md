---
id: "MIS-088"
uid: ""
title: "The canon on paper: PDF download of the .md files with design-system formatting"
status: done
priority: "medium"
effort: "M"
guild: "Alchemists"
territory: "TBA"
type_execution: "digital"
assigned_to: "numinia-nwos"
completed: "2026-08-18"

type: mission
version: "1.1.1"
created: "2026-08-18T09:11:14Z"
created_source: "git:90269f6"
created_confidence: exact
updated: "2026-09-02T01:51:14+02:00"
author: "claude-fable-5"
owner: "oracle"
requested_by: "oracle"
tags: [web, viewer, pdf, design-system]
license: "CC0-1.0"

depends_on: ["MIS-087"]
---
# MIS-088 — The canon on paper: PDF download of the .md files with design-system formatting

> **Summary:** Every canon document mirrored on numinia.org can be
> downloaded as a PDF laid out per the design system — not a generic "print
> page", but an artifact with identity.
> **Epistemic:** How a 100% static site produces designed PDFs.
> **Pragmatic:** The canon's .md files circulate outside the web (email,
> print, signature) without losing format or provenance.
> **Audience:** numinia-nwos agent · Oracle

**Guild:** Alchemists
**Type:** digital
**Priority:** medium
**Effort:** M

## Story

As a canon reader, I want to download any .md document as a PDF with the
design system's formatting, to carry it, print it or share it outside the
web while keeping its identity and provenance.

## Verified premises (2026-08-18)

- numinia.org is 100% static on Cloudflare Workers (assets only, no
  runtime): the PDF cannot be generated per request on a server. Real
  options: (a) pre-generate PDFs at build (e.g. headless Chromium/
  Playwright printing each detail page with print CSS), or (b) CSS
  `@media print` + the browser's "Save as PDF" button. (a) gives an
  identical downloadable artifact for everyone; (b) is free in weight but
  the result depends on the user's browser.
- The DocToolbar already exists on every detail page (copy/download .md):
  it is the natural home for the PDF button.
- Volume: ~209 documents if MIS-087 completes the mirror — build time and
  asset-bundle weight must be measured (budget: decide an acceptable
  threshold during execution and record it).
- Design system: `web/DESIGN.md` is dark-only (dark background, teal accent
  #2DD4BF, Geist/Geist Mono). Paper is white: the PDF needs a light
  adaptation of the system (typography and hierarchy are kept; the
  background is not). **Design decision to sign with the Oracle before
  executing**: the system's print variant (recommendation: light
  background, dark ink, teal accent on headings and rules, Geist Mono for
  metadata).
- Oracle context (2026-08-18): `web/DESIGN.md` will be integrated with
  numinia-web's design system (Khepri, more developed), keeping some pieces
  of this one that the Oracle will single out. The print variant must be
  designed looking at Khepri (which already has a book/print blueprint, see
  MIS-085 "printable sheet") to avoid laying out twice — which pieces of the
  local DESIGN.md survive is the Oracle's decision, list pending.

## PDF format (minimums)

- Header with identity: document id, title, version, state, update date.
- Footer with provenance: canonical numinia.org URL and generation date.
- The system's typography (Geist / Geist Mono) embedded.
- Key frontmatter visible as a metadata block, not as raw YAML.

## Acceptance criteria

- [ ] The design system's print-variant decision recorded (with the Oracle)
      before laying out.
- [ ] "PDF" button in every mirrored document's DocToolbar; downloads a PDF
      with the format defined above.
- [ ] The PDF is generated reproducibly at build (or the chosen alternative
      is recorded with its why in Execution Reality).
- [ ] Budget measured and recorded: build time and weight added to the
      deploy; agreed threshold not exceeded.
- [ ] Sample verified in production: one long document (e.g. a mission) and
      one with tables render correctly.
- [ ] License guard and build green; deploy verified.

## Epistemic value

We learn to produce portable artifacts from a static site with no runtime —
a reusable pattern for sheets, reports and seals.

## Pragmatic value

The canon travels: PDFs with identity to print, attach or sign, without
depending on how each person's browser renders.

## Execution log

- 2026-08-18 — Design decision signed by the Oracle ("ejecútala" on the
  recorded recommendation): the system's light print variant — white paper,
  dark ink (#16201f), teal on headings/rules/labels (#0F766E text, #2DD4BF
  rules), Geist for text, Geist Mono for metadata. A4, header with
  frontmatter chips, footer with canonical URL · generation date ·
  pagination.
- 2026-08-18 — `/print/[...slug]` route (213 documents: corpus + missions +
  audits + decisions + blueprints + legal; slugs mirroring the public
  routes), excluded from the sitemap and noindex.
- 2026-08-18 — `scripts/generate-pdfs.mjs` (`npm run build:pdf`): local
  static server + Chromium (playwright-core, Apache-2.0, devDependency) →
  `dist/pdf/<public-route>.pdf`; deletes `dist/print/` after generating.
  `.pdf` button in the DocToolbar of the 6 surfaces.
- 2026-08-18 — **Budget measured:** 213/213 PDFs, 24.2 MB, 22 s
  (concurrency 6). Samples verified: MIS-086 (long, checkboxes) and
  engineering-standards (tables) — correct rendering.
- 2026-08-18 — Deployed and verified live.

## Execution Reality

- **Technology/approach used:** the planned option (a) — build-time
  pre-generation with headless Chromium — using Playwright's already-cached
  Chromium (`~/.cache/ms-playwright`) via `playwright-core` with an
  explicit `executablePath` (`PDF_CHROME` override); self-hosted fontsource
  fonts, 100% offline generation.
- **Why it diverged:** it barely diverged; the only adjustment was keeping
  `build:pdf` OUT of `npm run build` so CI does not need Chromium — the
  deploy flow is build → build:pdf → wrangler deploy (documented in
  CLAUDE.md).
- **Key learning:** with print pages as Astro routes plus a cached
  Chromium, the "designed" PDF costs 22 s and 24 MB for the whole corpus —
  the budget that looked like the risk turned out trivial; the pattern is
  ready for sheets and reports.
- **Closing date:** 2026-08-18
- **Executing agent:** claude-fable-5 (numinia-nwos)

> *"The ideal plans show the intention. The real plans show the knowledge."*

## Version history

- v1.1.1 (2026-09-02) — Form: inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed. missions/ normalisation, lot 3.
