---
id: "MIS-00048"
title: "Cost tracking system per agent"
type: mission
status: backlog
version: "1.1.0"
created: "2026-04-04T00:00:00Z"
updated: "2026-04-07T18:00:00Z"
area: "Operations"
guild: "Sentinels"
tipo: "digital"
priority: "critical"
effort: "M"
license: "CC-BY-4.0"
---
# MIS-048 — Cost tracking system per agent

> **Summary:** NWOS system mission.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---

**Area:** Operations · **Guild:** Sentinels · **Type:** 🤖 Digital · **Priority:** 🔴 Critical · **Effort:** M

## Story

As Pablo, I want to know exactly how much each agent spends per day and per mission, to optimize costs and justify the investment.

## Acceptance criteria

- [ ] Anthropic API connected for real usage data
- [ ] Cost per mission recorded in logs
- [ ] Daily cost visible in 8am report
- [ ] /cao dashboard updated with real cost

## Epistemic value

Without real cost data, you cannot optimize.

## Pragmatic value

Difference between controlled spending and opaque spending.

## Notes

Blocked by: Anthropic API key with usage permissions (configured via SSH, never via chat).

---

## Version history

- v1.0.0 (2026-04-04) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
