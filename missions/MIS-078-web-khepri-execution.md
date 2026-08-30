---
id: "MIS-078"
title: "Khepri: the platform dresses itself"
type: mission
status: done
version: "1.0.0"
created: "2026-08-17T18:59:03Z"
created_source: "git:b484b68"
created_confidence: exact
updated: "2026-08-27T22:05:37Z"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, design, khepri]
license: "CC-BY-4.0"
mission_id: "MIS-078"
territory: "Platform"
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
> **In the system.** Observes: design-system/2026_08_18-Sistema_de_Diseno-v5_0_0.md (the law of design, §0.3 precedence). Regulates: packages/ui, every page's markup and styles. Coupled to: CLAUDE.md (design-system block), MISSION-004 surfaces, MISSION-002 login UX.
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

> **Agent type:** 🤖 Digital (Oracle reviews each phase visually)
> **Priority:** 🔴 Critical — THE priority by Oracle order (2026-08-15)
> **Effort:** L · **Status:** ✅ Done 2026-08-18 — see Execution Reality
> **Track:** `store` (all current surfaces live there)
> **Governing document:** `design-system/2026_08_18-Sistema_de_Diseno-v5_0_0.md` (Design
> System v5.0.0, CC0; marks excluded §15). **Updated 2026-08-18:** v5.0.0 retires the
> «Khepri» codename (§0.4) and the directory becomes `design-system/`; the kit is
> `kit/sistema.{css,js,tokens.json}`. No rule changes with the rename, but this
> mission gains one criterion: **declare register before medium (§2.8)** — numinia.com is
> **Umbral**, and the Velo only enters framed with a visible boundary. The motion
> catalog is no longer nine animations but **fourteen** (§10.1).

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

## Execution Reality (2026-08-18) — phases A and B closed

**A.1 token bridge · A.2 kit adoption:** done on 2026-08-15 and re-anchored to
v5.0.0. The kit is no longer copied from the repo: it is **pinned** by version
and digest (`design-source.json`, ADR-022), and two guardians protect it — a
test that breaks the build if a copy is hand-edited and `npm run design:check`
against the published master.

**A.3 surface audit:** done by measurement, not inspection. Result: the palette
was already home (only 7 hexes off-canon in the whole codebase, of which 4 are
legitimate — `#000` masks, which §2.7.2 specifies that way — and 3 are tokens
of the book pending canonization, reported to nwos as H1) and so was motion
(4 keyframes, all from the §10.1 catalog).

**B — what was actually missing: the unmeasured half.** Acceptance criterion 2
asks for AA «in Diurno and in Nocturno»; the gate measured a single mode, so
the product's other half carried **five AA failures in production, on every
page**. None was a gap in the System: all five were our misuse of canonical
tokens, and the first is forbidden by the §19.4 checklist itself.

| Defect | Measurement | Surfaces |
| --- | --- | --- |
| Tertiary ink on surface (§19.4: tertiary only on base background) | `#8A7D72` on `#1E1A17` = 4.32:1 | archive badges, settings pills, updates tags, portal-map nodes |
| Turquesa (interactive fill) used as text | `#018EA1` = 4.43:1 | badges, `.tag-new` |
| Grana as a button label | `#D33440` on `#14110F` = 3.88:1 | the sheet's destructive button |
| Link distinguished by color alone (WCAG 1.4.1) | 2.58:1 against its own sentence | footer signature, every page |

Fixed with System tokens; the map's dormant node states itself with a hollow
dot instead of dimmer ink — **state by shape, not by illegible color**. The
gate now walks both modes: **66 checks instead of 33**. A gate that measures
one mode certifies half a product.

**Finishing touch:** `/spike/auth` is retired (a duplicated second door, with
legacy `#888`/`#666` fallbacks; login lives in the L.A.P.) and the printable
sheet stops printing on pure white: it prints on the house's paper with Noche
ink, like the book and like the corpus PDFs. A single paper criterion.

Delivered in `numinia-web` v0.47.0 (`f10d9d0` + release).

- **Technology/approach used:** measurement before inspection — axe in both
  modes as the way to audit surfaces, instead of reviewing them by eye.
- **Why it diverged:** the mission assumed «walk every route family and
  reskin»; the platform was already dressed. What was missing was not paint,
  it was a guarantee: the gate certified half a product.
- **Key learning:** an acceptance criterion nobody measures is an opinion.
  «AA in both modes» was written from the start and failed from the start,
  silently, because the gate only knew one mode.
- **Closing date:** 2026-08-18
- **Executing agent:** claude-opus-5 (numinia-web session)

---

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
