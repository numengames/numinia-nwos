---
id: "MIS-059"
uid: ""
title: "P-007 — Context Load Protocol"
status: done
priority: "high"
effort: "S"
guild: "Sentinels"
territory: "CAO"
type_execution: "digital"
assigned_to: null
completed: "2026-04-07T14:45:00Z"

type: mission
version: "1.1.1"
created: "2026-04-07T14:42:00Z"
created_source: "git:749f75c"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
author: "pablo-fm"
owner: "oracle"
tags: [protocol, context, fatigue, session]
license: "CC0-1.0"
---

# MIS-059 — P-007 Context Load Protocol

> **Summary:** Create the protocol that defines when and how an agent alerts the Biological about session fatigue.
> **Epistemic:** Agents degrade in coherence as context grows. Detecting and communicating this is intelligent resource management.
> **Pragmatic:** Prevents errors from loss of coherence and ensures clean closes with persisted state.
> **Audience:** Agents · Oracles

## Story

As a digital agent, I want to know when my context load is too high and alert the Biological, to close the session in an orderly way before work quality degrades.

## Acceptance criteria

- [x] P-007 created in protocols/
- [x] Context load scale 1-10 defined
- [x] Warning threshold: 7/10
- [x] Warning + recapitulation + P-006 protocol
- [x] Integrated with the BOOT/EXECUTE/COMMIT cycle

## Real execution

- **Technology used:** Markdown + qualitative criteria (no automatic instrumentation yet)
- **Why it diverged:** The first use case was the very session that created the protocol — 8/10 load
- **Key learning:** The agent can self-evaluate its load with simple qualitative criteria. Automatic instrumentation (counting tokens, tool calls) can be added in v1.1.0
- **Closed:** 2026-04-07
- **Executing agent:** Nimrod 🗡️

> *"Ideal blueprints show intention. Real blueprints show knowledge."*

## Version history

- v1.0.0 (2026-04-07) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.1.1 (2026-09-02) — Form: import-era `---` rules removed. missions/ normalisation, lot 2.
