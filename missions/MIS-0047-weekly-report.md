---
id: "MIS-047"
uid: ""
title: "Configure automatic weekly report"
status: done
priority: "high"
effort: "S"
guild: "Sentinels"
territory: "TBA"
assigned_to: "nimrod"
started: "2026-04-07T22:35:00Z"
completed: "2026-04-07T22:40:00Z"

type: mission
version: "1.0.0"
created: "2026-04-07T22:39:04Z"
created_source: "git:7829844"
created_confidence: inferred
updated: "2026-04-07T22:40:00Z"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [operations, reports, cron, automation, sentinels]
license: "CC0-1.0"
---
# MIS-047 — Configure automatic weekly report

> **Summary:** Set up a weekly automated report so Pablo has a structured view of what happened each week.
> **Epistemic:** Visibility without asking.
> **Pragmatic:** One less thing to remember. One more thing that just works.
> **Audience:** Agents · Oracles

---

**Area:** Operations · **Guild:** Sentinels · **Type:** 🤖 Digital · **Priority:** 🟠 High · **Effort:** S

---

## Story

As Pablo, I want to receive a weekly summary every Monday morning with what was accomplished, the mission status, key learnings, and priorities for the coming week — without having to ask for it.

---

## Acceptance criteria

- [x] Cron job configured (Mondays 09:00 Europe/Madrid)
- [x] Report saved as .md in workspace/reports/
- [x] Report delivered via Telegram
- [x] Covers: achievements, mission status, learnings, alerts, next priorities, cost estimate
- [x] Uses claude-haiku-3-5 (cost-efficient)

---

## Execution

**Cron job ID:** `15805c21-b4aa-411b-926b-8473c45e69cc`
**Schedule:** `0 9 * * 1` (Europe/Madrid) — every Monday 9:00am
**Model:** anthropic/claude-haiku-3-5
**Output:** `workspace/reports/semanal-YYYY-MM-DD.md` + Telegram delivery
**First run:** Monday 2026-04-13 09:00 Madrid
**Agent:** Nimrod
**Closed:** 2026-04-07

---

*Nimrod 🗡️ — 2026-04-07*
