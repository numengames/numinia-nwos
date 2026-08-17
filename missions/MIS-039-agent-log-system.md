---
id: "MIS-039"
uid: "018ef820-0039-7000-8000-000000000039"
title: "Agent log system"
type: mission
status: in-review
version: "0.1.0"
created: "2026-04-07T00:00:00Z"
updated: "2026-04-08T05:59:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [cao, logs, observability, agents, sentinels]
license: "CC-BY-4.0"
area: "CAO"
guild: "Sentinels"
mission_id: "MIS-039"
priority: "high"
effort: "S"
type_execution: "digital"
assigned_to: "nimrod"
requested_by: "oracle"
started: "2026-04-08T05:59:00Z"
completed: null
---
# MIS-039 — Agent log system

> **Summary:** Design and implement a standard log format for agent actions, so every mission action is auditable.
> **Epistemic:** Without logs, we can't audit what agents did, when, and why.
> **Pragmatic:** Structured logs feed future dashboards, cost tracking, and compliance.
> **Audience:** Agents · Oracles

---

## Historia

Como operador, quiero un log estructurado de cada acción ejecutada por cada agente, para auditar el sistema en cualquier momento.

---

## Acceptance criteria

- [x] Log format standard defined in STANDARDS.md (§10)
- [x] Log structure covers: timestamp, agent, action, mission, result, cost_estimate
- [x] Example log entries documented
- [x] Location convention defined (workspace/logs/)
- [x] missions-index.json updated

---

*Nimrod 🗡️ — started 2026-04-08*

---

## Valor epistémico

Sin logs, no hay auditoría. Sin auditoría, no hay confianza.

## Valor pragmático

Trazabilidad completa de qué hizo cada agente y cuánto costó.
