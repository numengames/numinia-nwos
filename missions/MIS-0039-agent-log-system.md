---
id: "MIS-039"
uid: ""
title: "Agent log system"
status: done
priority: "high"
effort: "S"
guild: "Sentinels"
territory: "CAO"
type_execution: "digital"
assigned_to: "nimrod"
started: "2026-04-08T05:59:00Z"
completed: "2026-08-25"

type: mission
version: "0.2.1"
created: "2026-04-08T06:02:27Z"
created_source: "git:a5b6a0d"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [cao, logs, observability, agents, sentinels]
license: "CC0-1.0"
---
# MIS-039 — Agent log system

> **Summary:** Design and implement a standard log format for agent actions, so every mission action is auditable.
> **Epistemic:** Without logs, we can't audit what agents did, when, and why.
> **Pragmatic:** Structured logs feed future dashboards, cost tracking, and compliance.
> **Audience:** Agents · Oracles

## Story

As operator, I want a structured log of every action executed by every agent, so I can audit the system at any time.

## Acceptance criteria

- [x] Log format standard defined in STANDARDS.md (§10)
- [x] Log structure covers: timestamp, agent, action, mission, result, cost_estimate
- [x] Example log entries documented
- [x] Location convention defined (workspace/logs/)
- [x] missions-index.json updated

*Nimrod 🗡️ — started 2026-04-08*

## Epistemic value

Without logs, there is no audit. Without an audit, there is no trust.

## Pragmatic value

Full traceability of what each agent did and how much it cost.

## Closure

*(Administrative close. The brief above is untouched — not one line of Scope
or of the criteria.)*

- **Category:** A — done in fact. The reality already satisfies the brief.
- **Evidence:** `STANDARDS.md` carries `## 10. Agent log system` with entry-format and storage subsections. 5/5 criteria ticked.
- **Signed by:** Oracle, 2026-08-25, as part of the board triage of the 111 missions.
  Classified read-only first; nothing was closed on impression.
- **Closed:** 2026-08-25 · **by:** ursa (administrative), on the Oracle's signature

## Version history

- v0.2.1 (2026-09-02) — Form: import-era `---` rules removed. missions/ normalisation, lot 2.
