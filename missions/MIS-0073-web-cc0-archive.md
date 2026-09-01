---
id: "MIS-073"
uid: ""
title: "The CC0 Archive: every public asset browsable in 5 locales"
status: done
priority: "critical"
effort: "L"
guild: "Alchemists"
territory: "Platform"
type_execution: "digital"
assigned_to: null
completed: null

type: mission
version: "1.0.0"
created: "2026-08-17T18:59:03Z"
created_source: "git:b484b68"
created_confidence: exact
updated: "2026-08-17T18:59:03Z"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, archive]
license: "CC0-1.0"
---

> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-001.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# 🪐 MISSION-001 — The CC0 Archive (Phase 1 core)

> **For humans.** Mission record: the Archive — every public asset browsable and downloadable in 5 locales.
>
> **Epistemic value.** Resolves what MISSION-001 promised and what it shipped.
> **Pragmatic value.** Its Gherkin criteria remain binding regression contracts for the archive.
> **In the system.** Observes: MISSION-000 foundations. Regulates: archive behavior. Coupled to: features/archive.feature.
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

> **Agent type:** 🤖 Digital · **Priority:** 🔴 Critical · **Effort:** L
> **Status:** ✅ Done (2026-08-15) — all acceptance criteria verified: 32 public assets × 5 locales = 165 SSG pages, 11/11 Gherkin, 11/11 e2e (incl. WCAG on archive), budgets green. NOT deployed (standing order).
> **Guild / House:** Alchemists (creation) + Procurators (structure)
> **Track:** `store` pages, `com`-grade shared logic. **No deploy, no publish.**

## 📝 Subtitle

The public gallery that replaces numinia.store's Layer 0: one SSG URL per
asset, multi-format viewing, search, downloads — fully local until push day.

## 📖 Story Statement

As a visitor, I want to browse, preview and download CC0 digital goods in my
language, so that Numinia's material culture is useful to me even before I know
the city exists.

## ⚡ Pragmatic Value

Funnel 1 (visitor → downloader) becomes real: every card, filter and download
is instrumented. v0.17.0 material.

## ✅ Acceptance Criteria (Gherkin — features/archive.feature)

- Every public, non-draft asset from the validated catalogs gets a page in all
  five locales, each with `<html lang>`, SEO title/description and OG tags.
- The archive index lists every public asset with name, format and category;
  empty catalogs render a localized empty state.
- Search and format filters narrow the grid client-side (verified in Playwright).
- Each detail page offers the right preview for its format (image/audio/video
  native; GLB+VRM via the 3D island; HYP shows metadata + download only) and a
  download link resolved through the domain storage chain.
- Every interactive element carries `data-metric`; downloads carry
  `archive-download`.
- WCAG A/AA gate passes on the archive index and detail pages; bundle budgets hold.
- Hermetic build: `DATA_SOURCE=fixture` renders the full archive from the
  committed multi-catalog snapshot.

## 🚫 Out of scope

Wallet/auth, LAP, seasons, character sheet, HYP deep parsing, server-side
search, data-repo writes, deploy.

## ⚠️ Risks

| Risk                               | Mitigation                                                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Dead URLs found by data-doctor (4) | Pages render with placeholder + report link; missing binary asset still gets a page but download shows unavailable state |
| 3dprint catalog 404                | Excluded from sources; recorded in data-doctor report                                                                    |
