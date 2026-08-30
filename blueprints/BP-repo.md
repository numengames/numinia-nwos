---
id: "BP-repo"
title: "Repositories"
type: blueprint
status: active
version: "0.1.0"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: exact
updated: "2026-08-27T22:02:10Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, ops, repos, github]
territory: "TBA"
semaforo: "amarillo"
license: "CC-BY-4.0"
---
# BP — Repositories

> **Summary:** System blueprint: current state, target, gaps and dependencies.
> **Epistemic:** The real state vs. the target — where we are and where we are going.
> **Pragmatic:** Identify which missions close the documented gaps.
> **Audience:** Agents · Oracles

---


> *Numinia's code archive. Everything that is built is stored here.*

**Traffic light:** 🟡 In progress

---

## Current state

- **PabloFMM/pablofm-web:** active, 32+ PRs, CI via Vercel
- **numengames/numengames-web:** Astro 4, needs improvements
- **numengames/numinia-oncyber:** Oncyber components
- **numengames/alchemists-tower:** virtual-worlds platform
- **numengames/numinia-digital-agents:** ✅ active, canonical source of truth

## Target state

- numinia-digital-agents: public CC0 repo with all agents, missions, blueprints, decisions and seminals
- READMEs with the OS→Model→Narrative triad in every repo
- CC0 license explicitly declared
- pablofm.com/misiones connected to the GitHub API (live)

## Related decisions

- ADR-001: GitHub as Archive Summa
- Naming convention: numengames-* (company/OS) vs numinia-* (city/platform)
- DEC-002: CC0 + build in public
- Branch protection + mandatory PR: never push directly to main

## Delta (gap → mission)

| Gap | Mission |
|---|---|
| PAT without workflow scope | Enable in GitHub Settings |
| READMEs without the triad | MIS-046 |
| Web without live GitHub API | Future sprint |

## Open questions

- Does numinia-digital-agents migrate to the numengames org definitively?

## Dependencies

- BP-cao

---

*Nimrod 🗡️ — 2026-04-05*
