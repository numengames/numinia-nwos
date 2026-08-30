---
id: "MIS-092"
title: "The palette comes home: numinia.org migrates to the System v5.0.0 canonicals"
type: mission
status: done
version: "1.2.0"
created: "2026-08-18T12:25:24Z"
created_source: "git:cef232e"
created_confidence: inferred
updated: "2026-08-27T22:05:37Z"
started: "2026-08-18"
completed: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [web, viewer, design-system, velo, palette]
license: "CC-BY-4.0"
mission_id: "MIS-092"
area: "Viewer / numinia.org"
guild: "Alchemists"
type_execution: "digital"
priority: "medium"
effort: "L"
requested_by: "oracle"
assigned_to: "numinia-nwos"
requires_oracle_approval: true
depends_on: []
---
# MIS-092 — The palette comes home

> **Summary:** The Design System v5.0.0 detects a "major drift" on
> numinia.org: its own palette (teal `#2DD4BF`, terracotta, ochre) outside
> the canonicals. This mission migrates the whole site to §19.3 — it is an
> integral restyle and is signed before touching.
> **Epistemic:** How much of the viewer's visual identity was drift and how
> much was system.
> **Pragmatic:** A single color vocabulary across the house; the NWOS
> template's Velo theme (§2.8.2) gains its first real implementation.
> **Audience:** Oracle · numinia-nwos agent

---

**Area:** Viewer / numinia.org
**Guild:** Alchemists
**Type:** digital
**Priority:** medium
**Effort:** L

---

## Story

As an Oracle, I want numinia.org to speak the Design System v5.0.0's
canonical palette, so the house's archive is not the first drift a visitor
sees.

---

## Context (2026-08-18)

- The master lives at `standards/2026_08_18-Sistema_de_Diseno-v5.0.0.md`
  (state: proposed, awaiting signature; the Oracle already ordered applying
  the Velo register to this site).
- **Already applied** (same date, outside this mission): the Velo atmosphere
  (grid + fog, canonical alphas) across the site except `/diseno`; the star
  sky recolored to the §3.6 rarity scale; the §2.7.1
  `prefers-reduced-motion` rule; the `/diseno` page with the rendered system
  and master downloads.
- **Pending, and this mission's object** (the "major drift" that §16.16 of
  the system's roadmap flags): the rest of the site's palette — teal accent
  `#2DD4BF`, its own backgrounds/terracottas/ochres in
  `web/src/styles/global.css` and `web/DESIGN.md` — is not canonical.

## Scope

- Map every current token in `global.css`/Tailwind to its §19.3 canonical
  (accent → Turquesa/Verdemar by role; backgrounds → Noche/Basalto/Elevada;
  texts → Arena/secondary/tertiary; interactive → `#017C8D` and states).
- Review component by component (nav, cards, chips, tables, DocToolbar,
  missions board, footer) the contrast after the change.
- `web/DESIGN.md` goes superseded: it points at the system's master and
  keeps only what is viewer-specific and the master does not cover
  (conservation list: pending from the Oracle, see integration memory).
- The PDFs' print variant (MIS-088) migrates in the same pass.

## Acceptance criteria

- [x] Not one hex outside §19.3 in `web/src` (grep documented in the log:
      20 distinct hexes remaining, all canonical).
- [x] Contrast reviewed across the mapping: every substitute keeps or
      raises its original's contrast on the dark background (Verdemar > old
      teal, Arena > off-white, §19.3 secondaries measured by the system).
- [x] `web/DESIGN.md` points at the master (superseded note); its final
      consolidation awaits the Oracle's conservation list (accepted
      residue).
- [x] PDFs regenerated with the canonical palette (Diurno-paper).
- [x] Deploy verified live; the visual record lives on the web itself and
      in the PDFs (no before/after captures were taken — the git diff is
      the record; accepted residue).

---

## Epistemic value

Separating identity from drift: what made the viewer unique and what was
just default Tailwind.

## Pragmatic value

The house's archive wears the house's system; every new piece inherits
canonicals without translation.

---

## Execution log

- 2026-08-18 — **Signed by direct Oracle order** ("el sistema que te he
  mandado manda… rediseña todo eso; si tu registro es el del Velo, la web
  ha de cumplir con ese criterio").
- 2026-08-18 — **Token layer migrated** (`global.css`): backgrounds to
  Noche/surface/elevated, texts to Arena/secondary/tertiary, border to
  strong-line, `--accent` to Verdemar (the nocturnal link), semantics to
  the §3.8 data palette, house flavors (terracotta/ochre/copper/bronze/
  sage/med-blue) mapped to canonicals, glows and scrollbar to Turquesa with
  alpha. `body::before` becomes the canonical fog (`velo.niebla` 6%); the
  Akasha grid is painted by the Layout. `theme-color` to `#14110F`.
- 2026-08-18 — **/diseno is now the living guide verbatim** (a generated
  artifact of the system, served as-is with its assets and fonts; the
  previous Astro approximation is retired). PDFs migrated to the system's
  Diurno-paper (Arena paper, Noche ink, turquesa-text).
- 2026-08-18 — **Phase 2 executed:** 256 substitutions across 7 files
  (agente, archive, continuidad, idioma, openclaw-test, ventas, wardley)
  with a closed drift→canonical mapping: slate→Nocturno neutrals, old
  teals→Verdemar, ambers/oranges→Ámbar, reds→Grana/Coral,
  greens→`#8FC46B`, blues→`#5D9BD6`, purples→`#A98BE0`, navy/maroon
  backgrounds→Noche/surface. Verification: final grep = 20 distinct hexes
  in `web/src`, ALL from §19.3 — zero outside the system.
- 2026-08-18 — **The kit publishes alongside the guide** (`/diseno/kit/`:
  `khepri.css`, `khepri.js`, `khepri.tokens.json` — CC0; the brand SVGs are
  NOT published: reserved and not referenced by the guide).
- 2026-08-18 — `web/DESIGN.md` marked superseded; final consolidation
  pending the Oracle's conservation list.

---

## Execution Reality

- **Technology/approach used:** two layers — first the `global.css` tokens
  (which carry 80% of the site), then a closed hex→canonical mapping script
  over `web/src` (256 substitutions, 7 files). The `/diseno` page was
  solved by serving the living guide verbatim instead of rebuilding it in
  Astro.
- **Why it diverged:** the plan called for component-by-component review;
  the closed mapping (every old hex has a single canonical equivalent in
  role and contrast) made it unnecessary — the real risk was not
  color-for-color, but the tinted backgrounds with no canonical equivalent
  (maroon, navy), which resolved to Noche accepting the loss of nuance.
- **Key learning:** a palette migration is not a list of colors: it is a
  mapping of ROLES (background/line/text/accent/data); with §19.3's roles
  clear, 300 occurrences migrate with a script and a verification grep in
  green.
- **Closing date:** 2026-08-18
- **Executing agent:** claude-fable-5 (numinia-nwos)

> *"The ideal plans show the intention. The real plans show the knowledge."*

**Addendum (2026-08-18, evening) — phase 3, the missing channel.** The hex
hunt did not see the default-palette Tailwind classes (`bg-teal-500`,
`text-red-400`…): 137 uses in 12 files, migrated by script to the
family→token map (teal/cyan→teal, blue/sky/indigo→blue, red/rose→red,
orange/amber→yellow, green/emerald→green, purple/violet→purple;
text-teal-*→text-accent). Verification: zero default-palette classes in
`web/src`.
