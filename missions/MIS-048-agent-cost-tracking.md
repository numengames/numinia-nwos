---
id: "MIS-048"
uid: "018ef820-0048-7000-8000-000000000048"
title: "Agent cost tracking system"
type: mission
status: backlog
version: "1.0.0"
created: "2026-04-07T19:43:00Z"
updated: "2026-04-07T19:43:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [operations, metrics, costs, api, sentinels]
license: "CC-BY-4.0"
area: "Operations"
guild: "Sentinels"
priority: "critical"
effort: "M"
assigned_to: "nimrod"
requested_by: "oracle"
started: null
completed: null
blocked_by: "Anthropic API key with usage permissions required from Pablo"
---
# MIS-048 — Agent cost tracking system

> **Summary:** Know exactly how much each agent spends per day and per mission, to optimize costs and justify the investment.
> **Epistemic:** Without real cost data, optimization is impossible.
> **Pragmatic:** Difference between controlled spending and opaque spending.
> **Audience:** Agents · Oracles

---

**Area:** Operations · **Guild:** Sentinels · **Type:** 🤖 Digital · **Priority:** 🔴 Critical · **Effort:** M

---

## Story

As Pablo, I want to know exactly how much each agent spends per day and per mission, so I can optimize costs and justify the investment.

---

## Acceptance criteria

- [ ] Anthropic API connected for real usage data
- [ ] Cost per mission recorded in logs
- [ ] Daily cost visible in 8am report
- [ ] /cao dashboard updated with real cost

---

## Blocked by

Anthropic API key with usage permissions — configure via SSH, never via chat.

---

## Epistemic value

Without real cost data, optimization is impossible.

## Pragmatic value

Difference between controlled spending and opaque spending.

---

*Nimrod 🗡️ — recovered from pablofm-web (MIS-062.2) — 2026-04-07*

---

## Notes

Blocked by: Anthropic API key with usage permissions (configured via SSH, never via chat).

---

## Version history

- v1.0.0 (2026-04-04) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
