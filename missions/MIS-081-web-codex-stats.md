---
id: "MIS-081"
title: "The Manual opens, the Archive counts"
type: mission
status: done
version: "1.0.0"
created: "2026-08-17T18:59:03Z"
created_source: "git:b484b68"
created_confidence: exact
updated: "2026-08-17T18:59:03Z"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, codex, lap]
license: "CC-BY-4.0"
mission_id: "MIS-081"
territory: "Platform"
guild: "Alchemists"
type_execution: "digital"
priority: "high"
effort: "M"
---

> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-009-codex-stats.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# MISSION-009 — The Manual opens, the Archive counts

> **For humans.** The Codex becomes a book reader for the RPG manual, and the L.A.P. gains honest archive statistics — both reviewed by a UX panel and a Khepri compliance audit before shipping.
>
> **Epistemic value.** Resolves whether the design system survives contact with two hard cases: long-form reading and dense data.
> **Pragmatic value.** The founding text is readable inside the product; the archive's real state is visible; and the platform is now gated across engines, viewports and with JS off.
> **In the system.** Observes: docs/seminal manual (immutable), the real catalog, Khepri §4/§9/§13.11. Regulates: /lap/codex/**, /lap/stats/. Coupled to: MISSION-008, MISSION-006.
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

> **Status:** ✅ Done (2026-08-15) · **Track:** store · **Size:** medium

## What shipped

- **The Codex, two tabs**: _El Manual_ (index of chapters → a reading page per
  chapter) and _Identidades_ (the domain codex from MISSION-008).
- **Manual parser** (`lib/lap/manual.ts`): the seminal text has no markdown
  headings — structure is typographic (`CAPÍTULO N`, `Fragmento N: Título`,
  ALL-CAPS section lines, tab-separated tables). The parser adds structure and
  changes not one character of the author's text; tables stay tables (a
  flattened table destroys which cell belongs to which column), the lead
  fragment carries no title, every fragment gets a slug anchor.
- **Reading page**: paper card, 65ch measure at every viewport, fragment
  summary at the top, lore quotes italic with a seafoam edge, chapter pager,
  and the waxing moon (§10.1-06) tracking the read on its own surface disc.
- **Archive statistics**: §9.5 probes (total, projects), per-format and
  per-storage-layer grids, and a §9.8 redundancy bar with its real percentage
  in Mono. No invented KPIs — sizes are absent because the data repo does not
  record them yet.
- **Gates added**: `e2e/cross-browser.spec.ts` — horizontal-overflow, touch
  targets, mode flip, sheet file round-trip and **content-without-JS**, run on
  Chromium + Firefox (WebKit opt-in, see below), at 375 / 768 / 1280.

## Review findings applied (panel + audit)

UX panel: content invisible without JS (constitution breach — fixed with a
pre-paint `data-js` flag), duplicate chapter titles on cards, flattened
tables, missing fragment anchors, 84-char measure at tablet, moon overlapping
prose on phones, mobile rail not showing the active section.

Khepri audit: wallet truncation (§13.11), empty states with Phosphor `light`
48px (§9.7), dice button no longer versales/amber (§9.1/§3.4), view titles at
`titulo.m`, sidebar 240px, tertiary text lifted to secondary inside surfaces
(§3.2), ink primary no longer lightens on hover (§9.1 — it holds and shows a
Verdemar inner ring), footer version link to `--enlace`, the binaria restored
to the full canonical phrase (§6.1), 44px touch targets in the chrome, fold
button with `aria-expanded`, `--radio-completo` token instead of literals.

## Honest gaps

- **WebKit could not run on this workstation** (missing system libs): the
  gate is written and runs there via `PLAYWRIGHT_WEBKIT=1` or in CI after
  `playwright install-deps`. iPhone layout is covered today by phone-width
  runs on Chromium/Firefox — engine-specific quirks are NOT yet verified.
- Manual is Spanish-only (the corpus is); other locales say so.
- Deferred UX notes: sentence-case chapter titles (corpus is ALL-CAPS),
  identities grid density, character-sheet empty-state invitation.
