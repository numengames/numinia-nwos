---
id: "MIS-013"
title: "Monitoring and alerts system"
type: mission
status: frozen
freeze_reason: cancelled
version: "1.1.0"
created: "2026-04-04T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
owner: "oracle"
area: "Infrastructure"
guild: "Sentinels"
type_execution: "digital"
priority: "high"
effort: "S"
license: "CC-BY-4.0"
---
# MIS-013 — Monitoring and alerts system

> **Summary:** NWOS system mission with criteria, epistemic and pragmatic value.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---


**Area:** Infrastructure · **Guild:** Sentinels · **Type:** 🤖 Digital · **Priority:** 🟠 High · **Effort:** S

## Story

As an operator, I want to know immediately if a service goes down, to restore operation before it affects users.

## Acceptance criteria

- [ ] Uptime monitoring for pablofm.com, numengames.com, Umami, Cal.com
- [ ] Telegram alert on outage
- [ ] Visible status dashboard
- [ ] Detection time < 2 minutes

## Epistemic value

Reveals the real stability of the infrastructure in production.

## Pragmatic value

Zero downtime without permanent human intervention.

---

## Closure (2026-08-17)

Closed as **cancelled — obsolete**, board triage ordered and approved by the Oracle (2026-08-17).

- **Reason:** As written it targets numengames.com, which no longer serves.
- **Evidence:** numengames.com returns 404; corporate site moved to numen.games.
- **Rule:** file preserved per P-003/SIM-2.7 and GOVERNANCE G-05 — closed, never deleted.

