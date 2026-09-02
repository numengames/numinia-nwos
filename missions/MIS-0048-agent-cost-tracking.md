---
id: "MIS-048"
uid: ""
title: "Agent cost tracking system"
status: todo
priority: "critical"
effort: "M"
guild: "Sentinels"
territory: "TBA"
assigned_to: null
started: null
completed: null

type: mission
version: "1.1.0"
created: "2026-04-07T19:43:00Z"
created_source: "git:749f75c"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [operations, metrics, costs, api, sentinels]
license: "CC0-1.0"

blocked_by: "Anthropic API key with usage permissions required from Pablo"
---
# MIS-048 — Agent cost tracking system

> **Summary:** Know exactly how much each agent spends per day and per mission, to optimize costs and justify the investment.
> **Epistemic:** Without real cost data, optimization is impossible.
> **Pragmatic:** Difference between controlled spending and opaque spending.
> **Audience:** Agents · Oracles

## Story

As Pablo, I want to know exactly how much each agent spends per day and per mission, so I can optimize costs and justify the investment.

## Acceptance criteria

- [ ] Anthropic API connected for real usage data
- [ ] Cost per mission recorded in logs
- [ ] Daily cost visible in 8am report
- [ ] /cao dashboard updated with real cost

## Blocked by

Anthropic API key with usage permissions — configure via SSH, never via chat.

## Epistemic value

Without real cost data, optimization is impossible.

## Pragmatic value

Difference between controlled spending and opaque spending.

*Nimrod 🗡️ — recovered from pablofm-web (MIS-062.2) — 2026-04-07*

## Notes

Blocked by: Anthropic API key with usage permissions (configured via SSH, never via chat).

## Version history

- v1.0.0 (2026-04-04) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.1.0 (2026-09-02) — inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** 2026-04 import, no commit. Assigned nimrod (retired). Blocked on an Anthropic usage API key from the Oracle. Cited by 11 (6 files) — the most-cited todo of the lot.
- **Recommendation:** Unassign; keep todo, blocked_by stays. The Oracle either provides the key or freezes it; cost tracking is still wanted by MIS-040/MIS-127.
