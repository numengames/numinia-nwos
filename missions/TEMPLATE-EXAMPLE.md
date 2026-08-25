---
id: "MIS-EXAMPLE"
title: "Example — a real small mission written with this template"
status: backlog
priority: medium
effort: S
guild: alchemists
area: web
type_execution: digital
assigned_to: null
completed: null

type: mission
version: "1.0.0"
created: "2026-08-25"
updated: "2026-08-25"
author: "ursa"
owner: "oracle"
tags: [web, archive, example]
license: "CC-BY-4.0"
context: "2026-08-25"
---
# MIS-EXAMPLE — Retire the /print/* intermediates from the served site

> **Summary:** stop serving 278 PDF-generation intermediates that were meant to
> be deleted at build time.
> **Epistemic:** what you learn by reading this document.
> **Pragmatic:** what you can do with it.
> **Audience:** Agents · Oracles

---

> **This document is an example, not a mission.** It is filled with a real,
> measured case so the template is read one way instead of five. It carries
> `id: MIS-EXAMPLE` rather than a number, so it consumes no identifier and
> the glob that publishes `MIS-*.md` does not pick it up as work.

---

## Scope

`web/dist/print/**` and the site that serves it. Only the serving of those
routes — **not** the PDF pipeline itself, and **not** `generate-pdfs.mjs`.

The 278 `/print/*` routes exist because `build:pdf` never runs in the automated
build (`D-035`). They are already excluded from the sitemap; this mission is
about them being reachable.

### Out of scope

Fixing `build:pdf`. Whether the PDFs should exist at all is the decision in
`D-035`, and it is the Oracle's — this mission holds regardless of which of the
three options is chosen there.

---

## Acceptance criteria

- [ ] `curl -o /dev/null -w '%{http_code}' https://numinia.org/print/missions/mis-109/`
      returns **404**
- [ ] `find web/dist/print -name index.html | wc -l` returns **0** after a clean build
- [ ] `curl -s https://numinia.org/sitemap-0.xml | grep -c '/print/'` still returns **0**
      (it already does — this must not regress)
- [ ] `npm run build` exits 0 and the page count drops by exactly 278

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:**
