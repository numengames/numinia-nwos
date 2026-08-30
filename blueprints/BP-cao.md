---
id: "BP-cao"
uid: ""
title: "CAO — Centralized Autonomous Organization"
type: blueprint
status: active
version: "0.2.0"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: exact
updated: "2026-04-07T19:03:00Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, cao, agents, architecture]
territory: "CAO"
semaforo: "amarillo"
license: "CC-BY-4.0"
---
# BP — CAO (Centralized Autonomous Organization)

> **Summary:** System blueprint: current state, objective, gaps, and dependencies.
> **Epistemic:** The real state vs. the objective — where we are and where we are going.
> **Pragmatic:** Identify which missions open the documented gaps.
> **Audience:** Agents · Oracles

---

> *The central blueprint of the CAO. Defines how digital agents coordinate Numinia's work while Oracles rest.*

**Status:** 🟡 In progress

---

## Current state

- Nimrod (Centinela-01): active, claude-sonnet-4.6
- Ursa (Machine Whisperer): designed, pending activation 2026
- Senet (Game Master): designed, pending activation 2027
- Procurador-01 (Business Lead): designed, pending activation 2027
- Adonaz (General Archivist): active, claude-haiku-3-5
- Procyon: designed for 2028
- Ephemeral sub-agents as provisional coordination mechanism
- MIS-054 active: multi-Oracle access via Telegram (@Wolfstein_Wagen active)

## Target state

- 5 agents with persistent sessions in OpenClaw
- numinia-digital-agents repo as canonical source of truth ✅
- Briefing Protocol v1.0 active (MIS-038)
- Auditable logs per mission (MIS-039)
- Procyon coordinating the intelligence layer (2028)
- Real cost metrics via Anthropic API (MIS-048)

## Related decisions

- DEC-004: Hybrid architecture — ephemeral sub-agents now, persistent when mature
- DEC-006: English as official repo language ✅
- Model by task: Haiku for routines (<$0.01), Sonnet for complex reasoning
- Human confirmation for external actions: Law 1 always active

## Delta (gap → mission)

| Gap | Mission |
|-----|---------|
| No Briefing Protocol | MIS-038 |
| No automatic logs | MIS-039 |
| No measurable KPIs | MIS-040 → **BP-business-metrics** |
| Partial multi-Oracle access | MIS-054 |
| No real cost data | MIS-048 |
| No web system visualization | MIS-061 |

## Open questions

- Can Procyon activate agents without Oracle OK?
- Can citizens propose missions to agents?
- Monthly cost ceiling of the CAO?
- NWOS license price point? (needed for BP-business-metrics v1.0.0)

## Dependencies

- [BP-business-metrics](BP-business-metrics.md) — KPI framework (draft)

---

## Version history

- v0.1.0 (2026-04-05) — Initial creation (Spanish).
- v0.2.0 (2026-04-07) — Translated to English. Updated agents list (Ursa, Senet, Adonaz). Added BP-business-metrics reference. uid added. (MIS-056 + MIS-057)

---

*Nimrod 🗡️ — 2026-04-07*
