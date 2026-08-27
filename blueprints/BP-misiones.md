---
id: "BP-misiones"
title: "Mission System"
type: blueprint
status: active
version: "v0.1.0"
created: "2026-04-05T00:00:00Z"
updated: "2026-04-07T00:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, cao, missions, system]
area: "CAO"
semaforo: "amarillo"
license: "CC-BY-4.0"
---
# BP — Mission System

> **Summary:** System blueprint: current state, target, gaps and dependencies.
> **Epistemic:** The real state vs. the target — where we are and where we are going.
> **Pragmatic:** Identify which missions close the documented gaps.
> **Audience:** Agents · Oracles

---


> *In Numinia, missions are the pulse of work. This blueprint documents how they are created, assigned, executed and archived.*

**Traffic light:** 🟡 In progress

---

## Current state

- 54 missions (MIS-001 to MIS-054)
- Completed: MIS-016, MIS-037, MIS-051, MIS-053
- In progress: MIS-052, MIS-054
- Backlog: the rest
- Mission Template v0.2.0 + DoD v0.2.0
- Public board at pablofm.com/misiones
- numinia-digital-agents repo as source of truth ✅

## Target state

- Every mission = one .md in the numinia-digital-agents repo
- pablofm.com/misiones reads the GitHub API in real time
- State system updatable by agents via PR

## Related decisions

- One .md per mission: readable by humans and agents, versionable in git
- Types 🧬/🤖/🔀: they make cost and collaboration explicit before activating
- Epistemic + pragmatic value mandatory

## Delta (gap → mission)

| Gap | Mission |
|---|---|
| Web without GitHub API integration | Future — when the repo is the live source of truth |
| MIS-002 to 015 without detail pages | Complete the data progressively |

## Open questions

- Do missions have epics or sprints?
- Who can create missions besides Oracles?

## Dependencies

- BP-repo
- BP-cao

---

*Nimrod 🗡️ — 2026-04-05*
