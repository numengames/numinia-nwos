---
id: "MIS-013"
title: "Monitoring and alerts system"
type: mission
status: backlog
version: "1.1.0"
created: "2026-04-04T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
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
