---
id: "MIS-078"
title: "Khepri: the platform dresses itself"
type: mission
status: done
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
> **Effort:** L · **Status:** ✅ Done 2026-08-18 — ver Execution Reality
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

## Execution Reality (2026-08-18) — fases A y B cerradas

**A.1 puente de tokens · A.2 adopción del kit:** hechas el 2026-08-15 y
re-ancladas a la v5.0.0. El kit ya no se copia del repo: se **fija** por versión
y digest (`design-source.json`, ADR-022), y dos guardianes lo protegen — un test
que rompe el build si se edita una copia a mano y `npm run design:check` contra
el maestro publicado.

**A.3 auditoría de superficies:** hecha por medición, no por inspección.
Resultado: la paleta ya estaba en casa (solo 7 hexes fuera de canon en todo el
código, de los cuales 4 son legítimos — máscaras `#000`, que §2.7.2 especifica
así — y 3 son tokens del libro pendientes de canonizar, reportados a nwos como
H1) y el movimiento también (4 keyframes, todas del catálogo §10.1).

**B — lo que sí faltaba: la mitad no medida.** El criterio de aceptación 2 pide
AA «en Diurno y en Nocturno»; el gate medía un solo modo, así que la otra mitad
del producto llevaba **cinco fallos AA en producción, en todas las páginas**.
Ninguno era hueco del Sistema: los cinco eran mal uso nuestro de tokens
canónicos, y el primero lo prohíbe la propia checklist §19.4.

| Defecto | Medida | Superficies |
| --- | --- | --- |
| Tinta terciaria sobre superficie (§19.4: terciario solo sobre fondo base) | `#8A7D72` sobre `#1E1A17` = 4.32:1 | badges del archivo, píldoras de ajustes, tags de updates, nodos del mapa de portales |
| Turquesa (relleno interactivo) usada como texto | `#018EA1` = 4.43:1 | badges, `.tag-new` |
| Grana como etiqueta de botón | `#D33440` sobre `#14110F` = 3.88:1 | botón destructivo de la ficha |
| Enlace distinguido solo por color (WCAG 1.4.1) | 2.58:1 contra su propia frase | firma del pie, todas las páginas |

Arreglados con tokens del Sistema; el nodo dormido del mapa dice su estado con
punto hueco en vez de tinta más apagada — **estado por forma, no por color
ilegible**. El gate pasa a recorrer los dos modos: **66 comprobaciones en vez de
33**. Un gate que mide un modo certifica medio producto.

**Remate:** `/spike/auth` se retira (segunda puerta duplicada, con fallbacks
legacy `#888`/`#666`; el login vive en el L.A.P.) y la ficha imprimible deja de
imprimir en blanco puro: imprime en papel de la casa con tinta Noche, como el
libro y como los PDF del corpus. Un solo criterio de papel.

Entregado en `numinia-web` v0.47.0 (`f10d9d0` + release).

- **Technology/approach used:** medición antes que inspección — axe en los dos
  modos como forma de auditar superficies, en vez de revisarlas a ojo.
- **Why it diverged:** la misión suponía «repasar cada familia de rutas y
  reskinear»; la plataforma ya estaba vestida. Lo que faltaba no era pintura,
  era una garantía: el gate certificaba medio producto.
- **Key learning:** un criterio de aceptación que nadie mide es una opinión.
  «AA en ambos modos» estuvo escrito desde el principio y falló desde el
  principio, en silencio, porque el gate solo conocía un modo.
- **Closing date:** 2026-08-18
- **Executing agent:** claude-opus-5 (sesión numinia-web)

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
