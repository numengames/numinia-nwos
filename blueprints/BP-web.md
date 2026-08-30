---
id: "BP-web"
title: "Webs"
type: blueprint
status: active
version: "v0.1.0"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: exact
updated: "2026-08-27T22:02:10Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, product, web, pablofm, numengames]
area: "Product"
semaforo: "verde"
license: "CC-BY-4.0"
---
# BP — Webs

> **Summary:** System blueprint: current state, target, gaps and dependencies.
> **Epistemic:** The real state vs. the target — where we are and where we are going.
> **Pragmatic:** Identify which missions close the documented gaps.
> **Audience:** Agents · Oracles

---


> *Blueprint of Numen Games' digital surfaces. The visible face of the system.*

**Traffic light:** 🟢 Operational

---

## Current state

- **pablofm.com:** 32+ PRs merged, Umami active, Cal.com integrated
  - /cao · /misiones · /reportes · /planos · /decisiones · /archive
  - DESIGN.md: complete design system for agents
  - Cucumber BDD: 10 test scenarios
- **numengames.com:** Astro 4.16, 5/10 in the technical audit (MIS-011)
- **pablofm.com/archive:** Three.js 3D · 7 subfondos · visible labels

## Target state

- pablofm.com: complete public portal of the CAO
- numengames.com: migrated to Astro 5, native i18n, Schema.org
- Both webs with Caddy + SSL ✅ (already solved)

## Related decisions

- Astro 5 over Next.js: SSG by default, minimal bundle, island components
- DEC-005: pablofm.com as the temporary CAO portal
- DESIGN.md as a system: any agent can generate coherent UI

## Delta (gap → mission)

| Gap | Mission |
|---|---|
| og-default.png does not exist | Create 1200×630px |
| numengames.com at 5/10 | MIS-027 + MIS-011 |
| No Umami on numengames | MIS-014 |

## Open questions

- Papyrus mode + dark/light toggle on pablofm.com?
- Does numengames.com migrate to Vercel or is it hosted on our own server?

## Dependencies

- BP-infraestructura

---

*Nimrod 🗡️ — 2026-04-05*
