---
id: "MIS-076"
title: "Three pillars: La Ciudad, Assets, L.A.P."
type: mission
status: done
version: "1.0.0"
created: "2026-08-17T18:59:03Z"
created_source: "git:b484b68"
created_confidence: exact
updated: "2026-08-17T18:59:03Z"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, ia]
license: "CC-BY-4.0"
mission_id: "MIS-076"
area: "Platform / numinia-web"
guild: "Alchemists"
type_execution: "digital"
priority: "high"
effort: "M"
---

> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-004-three-pillars.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# MISSION-004 — Three pillars: La Ciudad · Assets · L.A.P.

> **For humans.** Mission spec: reorganize the site into three pillars — La Ciudad, Assets, L.A.P. — and charter the law.
>
> **Epistemic value.** Resolves how the site's structure maps to what Numinia actually is (a metagame with a city, a gallery, and a player area).
> **Pragmatic value.** Navigation, new sections, link-integrity gate, and these very charter headers ship under it.
> **In the system.** Observes: the v0.6.0 deck + Oracle directive. Regulates: information architecture. Coupled to: CLAUDE.md, docs/LEY.md.
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

- **Status:** ✅ Done (2026-08-15) — UI design pass pending the Oracle design .md
- **Layer:** 0–1 · **Scope:** UX only (UI design arrives later via the Oracle's design .md)
- **Canonical narrative source:** `2026_06_02-Presentación_Numinia-v0.6.0.pdf` (the deck) + seminal corpus. Numinia is a **metagame**; the platform will live at **numinia.com**.

## Problem

The site accreted tools (gallery, archive, finder, inspector, docs, updates) without a
narrative spine. Three distinct things are tangled: what Numinia IS, the asset gallery
for world-building, and the L.A.P. (player area). Governance .md files lack a uniform
human/agent-readable charter.

## Deliverables

1. **La Ciudad** (`/city/**`): the story of Numinia told from the deck — what it is,
   history (Holberins → Registros Akáshicos → Oráculos), the city (Ágora + 4 districts
   - spaces), inhabitants (ranks, species, guilds, factions — localized names straight
     from `@numinia/domain`), life (roles Venn, agrupaciones, rituals, Akashic Records),
     the game (play as first narrative). Lore prose ES+EN (ADR-002); shell ×5 locales.
2. **Assets hub** (`/assets/`): one pillar page grouping gallery, archive, finder,
   inspector, and resources/docs.
3. **L.A.P.** (`/lap/`): public page explaining the player area (access to the virtual
   game + your citizen information), the six ranks, and its "citizenship required —
   identity under construction" status. No dead links, no fake login.
4. **Navigation**: header = La Ciudad · Assets · L.A.P. (+ language selector);
   footer keeps the full sitemap + legal.
5. **Link integrity gate**: `scripts/link-check.mjs` crawls the built site and fails
   on any broken internal link; wired into `npm run verify`.
6. **The Law**: every governance .md gets a human-first charter header (description,
   epistemic value, pragmatic value, place in the system — systems thinking + active
   inference) and `docs/LEY.md` indexes them all.

## Acceptance (Gherkin)

```gherkin
Given the built site
Then every page's header shows the three pillars and nothing else
And the city, assets hub, and lap pages exist under every locale prefix
And the link-check gate reports zero broken internal links
And every law document begins with a charter block
```
