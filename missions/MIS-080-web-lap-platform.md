---
id: "MIS-080"
title: "The L.A.P. becomes a platform"
type: mission
status: done
version: "1.0.0"
created: "2026-08-15"
updated: "2026-08-17"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, lap]
license: "CC-BY-4.0"
mission_id: "MIS-080"
area: "Platform / numinia-web"
guild: "Alchemists"
type_execution: "digital"
priority: "high"
effort: "M"
---

> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-008-lap-platform.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# MISSION-008 — The L.A.P. becomes a platform

> **For humans.** The player area rebuilt: §13.11 shell, the character sheet as a file you own, the Codex of identities — open to every Nomad (D16).
>
> **Epistemic value.** Resolves how the platform surface works before identity ships: persistence is a portable file, not an account.
> **Pragmatic value.** The legacy L.A.P.'s core (sheet, sections, dice) lives again under the current constitution: no DB, no localStorage, File Over App.
> **In the system.** Observes: legacy numinia-digital-goods (read-only survey, veda lifted by the Oracle for reference), Khepri §13.11/§9, D16, MISSION-005 (data dignity in practice). Regulates: /lap/**. Coupled to: @numinia/domain, MISSION-002 (future session-linked sync).
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

> **Status:** ✅ Done (2026-08-15) · **Track:** store · **Size:** medium (Oracle-approved scope)

## Decisions taken with the Oracle

- **Sheet persistence = the player's own .md file** (export/import; memory
  while editing). Data dignity in practice: no accounts, no server, no silent
  storage. Session-linked sync arrives with MISSION-002 Steps 1–3.
- **Scope**: shell + Character + Codex read-only + Portals/Loot/Seasons as
  honest §9.7 empty states. Admin sections (users/stats/upload) stay in
  Phase 3+.
- **Dice**: simple `N`d6 per stat (the legacy table rule), Mono results —
  no 3D dice yet.

## What shipped

- `/lap/**` ×5 locales: Overview (the old pillar page, pins kept) ·
  Character · Codex · Portals/Loot/Seasons (empty states) · Updates link —
  under a §13.11 sidebar (40px rows, active in ink).
- **The sheet**: full identity (species/position/guild→branch→house cascade/
  faction/district/archetype/humor from the domain, localized), 8 attributes,
  6 values, 9 competences, profile and notes; edit in memory; export/import
  `numinia-sheet/v2` Markdown (tolerant parser: unknown ids dropped, numbers
  clamped, partial files amend instead of blanking). Round-trip pinned by
  unit tests.
- **The Codex**: species, guilds (branches + houses), factions, districts
  (with measures in Mono), archetypes, humors, competences — read-only,
  straight from `@numinia/domain`.
- a11y gate extended to character/codex/portals; ja/ko sheet field labels
  fall back to EN this pass (noted for translation QA, D9).

## Out of scope

Session-linked persistence (MISSION-002), seals/prism display (needs Session
Zero data), portals data (domain has the type, not yet the constants), 3D
dice, admin sections.
