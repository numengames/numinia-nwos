---
id: "MIS-075"
title: "Functional parity with the original numinia.store public surface"
type: mission
status: done
version: "1.0.0"
created: "2026-08-17T18:59:03Z"
created_source: "git:b484b68"
created_confidence: exact
updated: "2026-08-17T18:59:03Z"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, parity]
license: "CC-BY-4.0"
mission_id: "MIS-075"
territory: "Platform"
guild: "Alchemists"
type_execution: "digital"
priority: "high"
effort: "M"
---

> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-003-web-parity.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# MISSION-003 — Functional parity with the original web (public surface)

> **For humans.** Mission record: functional parity with the original numinia.store public surface (P1–P5).
>
> **Epistemic value.** Resolves which original sections exist in the rebuild and where each landed.
> **Pragmatic value.** Its phase criteria are the regression contracts for gallery, finder, updates, legal, docs, inspector.
> **In the system.** Observes: the original site + legacy inventory. Regulates: public surface. Coupled to: features/*.feature.
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

- **Status:** ✅ Done (P1–P5 shipped 2026-08-15; legal wording pending Oracle sign-off)
- **Layer:** 0–1 (public, no auth) · **Phase:** 1 of the build roadmap
- **Origin:** Oracle directive 2026-08-15: "tiene que quedar como la versión de la web original" → clarified as **functional parity of the public sections**, rebuilt on the new stack with the new quality bar.
- **Constraint inherited from the constitution:** LAP/admin/profile/login are Layer 2–3 and stay out of this mission (MISSION-002 owns identity). ADR-017: the legacy tree is consulted as feature inventory (file names, routes, the live site we ran locally) — **never** as source code.

## Story

The original numinia.store gave any visitor a gallery of avatars, a file-explorer
of every collection, rich asset detail pages, docs, and legal pages. The rebuild
currently ships landing + Archive only. A citizen returning to the new site must
find everything public the old city offered — faster, accessible, instrumented,
and in 5 locales.

## Parity inventory (original → target)

| Original route                                         | Verdict                                                 | Target             |
| ------------------------------------------------------ | ------------------------------------------------------- | ------------------ |
| `/gallery` (avatar gallery, 3D cards)                  | Rebuild                                                 | P1                 |
| `/finder` (collection tree + preview + batch download) | Rebuild                                                 | P2                 |
| `/assets/[id]`, `/avatars/[id]`                        | Already covered by `/archive/[id]` (unified, 7 formats) | Done (MISSION-001) |
| `/archive` (updates timeline)                          | Rebuild as `/updates/` from extracted changelog data    | P3                 |
| `/legal/*` (privacy, cookies, terms, aviso legal)      | Rebuild (content adapted; Oracle sign-off required)     | P3                 |
| `/docs` (en/ja markdown, sidebar+TOC+search)           | Rebuild on Astro content collections                    | P4                 |
| `/glbinspector`, `/vrminspector`                       | Rebuild as local-file inspector tools                   | P5                 |
| `/login`, `/profile`, `/LAP/*`, `/admin`               | **Out of scope** — Layer 2/3 (MISSION-002+)             | —                  |
| 7 locales (incl. de/zh)                                | Superseded by ADR-001                                   | 5 locales          |

## Phases (each = one PR-sized batch, tests first, all gates green)

### P1 — Gallery (`/gallery/` ×5 locales) — S/M

Curated avatar showcase: grid of VRM avatars from the avatars catalog, thumbnail
cards (no live 3D per card — budget), click → archive detail. Filter by
collection. Distinct from the Archive (all formats, search-first) by being the
visual, avatar-first storefront.

```gherkin
Given the avatars catalog with N public avatars
When I open /gallery/ in any of the 5 locales
Then I see N avatar cards with localized names and thumbnails
And every card links to its /archive/[id] page
And every interactive element carries a data-metric attribute
And the page passes the WCAG A/AA axe gate with zero JS islands
```

### P2 — Finder (`/finder/` ×5 locales) — L (flagship)

Three-pane explorer: collection tree → file list → preview panel (reusing the
unified ModelViewer + native audio/video/image), plus a client-side download
queue with batch download. One React island (`client:load`), catalog data
inlined at build.

```gherkin
Given the full multi-catalog archive
When I browse collections in the tree and select an asset
Then the preview panel renders the right viewer for its format
And I can queue several assets and download them as a batch
And the island stays under the bundle budget
And keyboard navigation works across the three panes (axe + manual checks)
```

### P3 — Updates + Legal (`/updates/`, `/legal/*` ×5 locales) — S

Updates: SSG timeline from `docs/reference/legacy-changelog.md` data (v0.1.0 →
current), continuing in new releases. Legal: four static pages; text drafted
from the originals, adapted to the new stack (analytics/consent per ADR-016,
D12) — **Gherkin acceptance includes an explicit Oracle sign-off step for the
legal wording**.

```gherkin
Given the extracted changelog data
When I open /updates/ in any locale
Then every legacy version v0.1.0–v0.15.0 and each new version is listed
Given the four legal pages
Then each exists in 5 locales, passes axe, and carries a "pending Oracle
  review" banner until the Oracle approves the wording
```

### P4 — Docs (`/docs/**` — content en/ja from origin, shell ×5) — M

Astro content collections; sidebar, TOC, prev/next. Original content exists in
en/ja only: the shell is 5-locale, untranslated content shows the ADR-001 (formerly ADR-002)-style
notice. Client-side search deferred until content volume justifies it.

### P5 — Inspectors (`/inspector/glb`, `/inspector/vrm`) — M

Drag-and-drop a local file → render + metadata readout (bones, materials,
textures, VRM meta). Runs fully client-side (no upload). Reuses viewer-3d.

## Non-negotiables (all phases)

- Test first: Gherkin `.feature` + unit/e2e before implementation.
- 100% per-file coverage on new lib code; axe gate; bundle budgets; visual
  baselines extended per new page; `data-metric` on every interactive element.
- 5 locales via the typed messages pattern (`src/i18n/messages.ts`).
- Components < 200 lines; 3D always lazy; no `any`.
- Nothing published — all local until the Oracle orders otherwise.

## Sequencing & versions

P1 → P2 → P3 → P4 → P5. P1+P2+P3 close the "daily use" parity (v0.17.0
milestone); P4+P5 complete it (v0.18.0). Estimated: P1 one session; P2 two;
P3 one; P4 one–two; P5 one.
