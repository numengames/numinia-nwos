---
id: "MIS-078"
title: "Khepri: the platform dresses itself"
type: mission
status: in-progress
version: "1.0.0"
created: "2026-08-15"
updated: "2026-08-17"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, design, khepri]
license: "CC-BY-4.0"
mission_id: "MIS-078"
area: "Platform / numinia-web"
guild: "Alchemists"
type_execution: "digital"
priority: "critical"
effort: "L"
---

> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-006-khepri.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# MISSION-006 — Khepri: the platform dresses itself

> **For humans.** Mission spec: apply the Khepri v4.2.0 design system to the whole platform — prepare first, then execute surface by surface.
>
> **Epistemic value.** Resolves what the platform looks like: Khepri canonizes the palette Numinia already wore and adds everything it lacked (modes, dual type, motion catalog, iconography, platform plan §13.11).
> **Pragmatic value.** Every surface rebuilt or reskinned ships wearing Khepri; nothing new is built in the provisional style again.
> **In the system.** Observes: design-system/2026_08_18-Sistema_de_Diseno-v5_0_0.md (the law of design, §0.3 precedence). Regulates: packages/ui, every page's markup and styles. Coupled to: CLAUDE.md (Sistema de diseño block), MISSION-004 surfaces, MISSION-002 login UX.
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

> **Agent type:** 🤖 Digital (Oracle reviews each phase visually)
> **Priority:** 🔴 Critical — THE priority by Oracle order (2026-08-15)
> **Effort:** L · **Status:** 🔵 In progress — kit installed & verified 2026-08-15
> **Track:** `store` (all current surfaces live there)
> **Governing document:** `design-system/2026_08_18-Sistema_de_Diseno-v5_0_0.md` (Sistema de
> Diseño v5.0.0, CC0; marks excluded §15). **Actualizado 2026-08-18:** la v5.0.0 retira el
> nombre clave «Khepri» (§0.4) y el directorio pasa a `design-system/`; el kit es
> `kit/sistema.{css,js,tokens.json}`. Ninguna regla cambia con el renombrado, pero esta
> misión gana un criterio: **declarar registro antes que medio (§2.8)** — numinia.com es
> **Umbral**, y el Velo solo entra enmarcado con frontera visible. El catálogo de
> movimiento ya no son nueve animaciones sino **catorce** (§10.1).

## 📖 Story Statement

As a visitor to any Numinia surface, I want every page to speak one visual
language — Diurno/Nocturno, ink-dressed actions, measured motion — so that the
platform feels like one product built by one house, not an accretion of tools.

## What arrived (2026-08-15)

- **Kit installed** at `khepri/` per its LEEME order: master .md, living guide
  (`index.html`, verified: fonts load, zero console errors), `kit/`
  (khepri.css · khepri.js · khepri.tokens.json, generated from the .md — link
  or copy, NEVER rewrite), brand SVGs (incl. `Numinia_Word.svg`), Geist/Geist
  Mono/Pixelify woff2 with OFL licenses, textures, pixel-register sprites.
- **CLAUDE.md** carries the mandated design-system block (§0.3 precedence:
  Khepri wins over older material).
- **Heavy materials** (`…Khepri_Materiales-v1.0.0.zip`: 4096² circuit normal,
  bake alpha — 9.9 MB) stay OUT of git per constitution (no binaries); kept in
  `~/Descargas` for now; needed only for 3D/metaverse work (§13.7).
- Companion docs received for the SEPARATE numen.games project (master prompt
  - marketing schema v0.6.0) — different repo, different constitution; not
    part of this mission.

## Phase A — Preparation (before touching any page)

1. **Token bridge**: reconcile `packages/ui/src/tokens.css` with
   `khepri/kit/khepri.tokens.json` (W3C DTCG). Khepri §19.3 is the single
   source of values; existing `--numinia-*` names become aliases or migrate.
   Pinned by a test that fails if the two ever diverge.
2. **Kit adoption**: wire `kit/khepri.css` + `khepri.js` into the store as the
   base layer (copied, not rewritten — §13.1); resolve the theme-persistence
   friction explicitly (khepri.js mode toggle vs constitution's localStorage
   rule) as a recorded decision before shipping.
3. **Surface audit**: walk every existing route family (landing, city, assets
   hub, gallery, archive, finder, inspector, docs, updates, legal, lap,
   spike/auth) against §13.2 (web) and §13.11 (platform); classify each as
   reskin / restructure / leave; size the work.
4. **Gate refresh plan**: visual-regression baselines will ALL change; WCAG
   axe gate re-run per phase; checklist §19.4 added to the DoD for every piece.

## Phase B — Execution (order)

Chrome first (header/footer/nav + mode toggle) → landing → La Ciudad →
Assets surfaces (gallery, archive, finder, inspector) → L.A.P. (with D16:
open to Nomads, login as contextual moment) → docs/updates/legal →
spike/auth login island. One Oracle visual review per block.

## ✅ Acceptance Criteria (Gherkin, to be encoded in features/)

```gherkin
Scenario: Tokens have one source of truth
  Given khepri/kit/khepri.tokens.json and packages/ui tokens
  When the token-bridge test runs
  Then every shared value matches or the build fails

Scenario: Both modes on every surface
  Given any page of the platform
  When rendered in Diurno and in Nocturno
  Then it uses only Khepri tokens, actions dress in ink,
    and WCAG AA contrast holds in both modes

Scenario: Motion stays within the catalog
  Given the nine animations of §10
  When any page animates
  Then only catalog animations occur
  And prefers-reduced-motion renders everything instant
```

## 🚫 Out of scope

The numen.games rebuild (separate repo/prompt), 3D/metaverse materials
(§13.7), pixel-register art production (§13.9), invoice/document templates.
