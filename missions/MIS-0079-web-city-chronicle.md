---
id: "MIS-079"
uid: ""
title: "The City chronicle: /city/ as one scrolling narrative"
status: done
priority: "medium"
effort: "S"
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
tags: [web, platform, narrative]
license: "CC0-1.0"
---

> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-007-city-chronicle.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# MISSION-007 — The City chronicle

> **For humans.** Small mission: /city/ becomes one scrolling chronicle in four chapters, carrying the numinia.com canon in Khepri dress.
>
> **Epistemic value.** Resolves how the city tells itself: one narrative in sequence, not scattered subpages.
> **Pragmatic value.** The exact content that lives at numinia.com today already lives here — the merge (docs/merge-numinia-com.md) swaps hosts, not stories.
> **In the system.** Observes: numinia.com canon (city-landing.ts), Khepri §13.2/§10. Regulates: /city/**. Coupled to: MISSION-006, docs/merge-numinia-com.md, D16/D18.
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

> **Status:** ✅ Done (2026-08-15) · **Track:** store · **Size:** small (the new mission format)

## What shipped

- `/city/` (×5 locales): hero with typed tagline → chapters I _La Semilla_,
  II _La Ciudad_ (Ágora + districts with seals, ranks), _Identidad_ (species /
  guilds / factions), III _La Vida_ (roles Venn, groups, learning pairs,
  cycle, rituals), IV _El Juego_ — sticky chapter anchors, binaria thresholds
  between chapters, **waxing-moon reading progress** (§10.1-06, own geometric
  glyph, full moon at the end).
- Content verbatim from numinia.com (`city-landing.ts`, ES canon + EN;
  ja/ko/pt-br read EN behind the language notice). Art + seals (21 webp)
  brought into `public/images/`.
- Old subpages (inhabitants / districts / the-game) are static redirect stubs
  to their chapter anchors — host-agnostic (survive the Cloudflare merge),
  noindex, out of the sitemap. Gherkin updated to pin the new truth.

## Out of scope

The numinia.com swap itself (see docs/merge-numinia-com.md), new copy, art
pátina treatment (§6.3 — awaiting direction validation).
