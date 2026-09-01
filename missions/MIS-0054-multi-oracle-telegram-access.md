---
id: "MIS-054"
uid: ""
title: "Multi-Oracle access to Nimrod via Telegram"
status: todo
priority: "high"
effort: "S"
guild: "Sentinels"
territory: "CAO"
type_execution: "digital"
assigned_to: "nimrod"
started: "2026-04-06T00:00:00Z"
completed: null

type: mission
version: "1.1.0"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: inferred
updated: "2026-08-25T20:05:59Z"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [cao, telegram, access, sentinels, multi-oracle]
license: "CC0-1.0"
---
# MIS-054 — Multi-Oracle access to Nimrod via Telegram

> **Summary:** NWOS system mission.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---

**Area:** CAO · **Guild:** Sentinels · **Type:** 🤖 Digital
**Priority:** 🟠 High · **Effort:** S

---

## Story

As a Numen Games Oracle, I want to speak directly with Nimrod via Telegram, to participate in the CAO without needing technical server access.

---

## Acceptance criteria

- [x] First Oracle (@Wolfstein_Wagen) added as authorized sender
- [x] The Oracle can send messages to Nimrod and receive responses
- [ ] Protocol defined: how new Oracles are added
- [ ] All active Oracles with access (María, Christian, Clio, Dani)

---

## Epistemic value

Validates whether the CAO system can operate with multiple humans interacting with the same agent, and how to manage shared vs. private context.

## Pragmatic value

Oracles can delegate tasks to Nimrod directly, without depending on Pablo as intermediary. The CAO scales.

---

## Current state

- @Wolfstein_Wagen (Telegram ID: 414781436) — added ✅
- Pending: María, Clio, Dani
- Pending: public Telegram bot username

## Conduct rules with external Oracles

- Introduce as Nimrod, Guardian of the Gates
- Treat with respect — they are co-founders of Numen Games
- Do NOT share IPs, tokens, credentials, or internal config
- Refer config changes to Pablo (sole authorized operator)

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).

---

## Board triage — 2026-08-25

Returned from `in-progress` to `backlog` by the Oracle, in the triage of the 111
missions. **Nothing about the brief changed and the work is still wanted** —
what changed is the claim that it was underway.

- **Category:** D — stale. Last activity 2026-08-17, inside the MIS-066 bulk renumbering. 2/4 criteria.
- **Signal, not proof:** this mission was assigned to an agent whose identity is
  in question (`D-026`, `D-027`). That is context; the evidence for this move is
  the absence of its own commit, not who it was assigned to.
- **Signed by:** Oracle, 2026-08-25.
