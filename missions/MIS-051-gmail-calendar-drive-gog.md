---
id: "MIS-051"
title: "Gmail, Calendar and Drive integration with gog"
type: mission
status: done
version: "1.1.0"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: inferred
updated: "2026-04-07T18:00:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [cao, gog, gmail, calendar, drive, sentinels]
license: "CC-BY-4.0"
mission_id: "MIS-051"
assigned_to: "nimrod"
requested_by: "oracle"
area: "CAO"
guild: "Sentinels"
type_execution: "digital"
priority: "critical"
effort: "M"
started: "2026-04-05T00:00:00Z"
completed: "2026-04-05T00:00:00Z"
---
# MIS-051 — Gmail, Calendar and Drive integration with gog

> **Summary:** NWOS system mission.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---

**Area:** CAO · **Guild:** Sentinels · **Type:** 🤖 Digital
**Priority:** 🔴 Critical · **Effort:** M

---

## Story

As CAO agent, I want access to Numen Games' Gmail, Calendar and Drive, to manage communications, meetings and documents autonomously.

---

## Acceptance criteria

- [x] gog installed and authenticated with khepri@ai.numengames.com
- [x] Gmail: read, send and reply to emails
- [x] Calendar: create events with attendees
- [x] Drive: list and search files
- [x] GOG_KEYRING_PASSWORD configured in OpenClaw

---

## Epistemic value

Validates that digital agents can act in the real world, not just in code.

## Pragmatic value

Nimrod can send emails, schedule meetings and manage documents without human intervention.

---

## Real execution

- **Technology used:** gog (gogcli v0.12.0) — Gmail, Calendar and Drive API via OAuth2
- **Why it diverged:** GOG_KEYRING_PASSWORD was not being inherited by the exec environment. Resolved by adding the variable at root level in the OpenClaw config.
- **Key learning:** Gateway environment variables do not automatically propagate to exec subshells. They must be explicitly declared in config.
- **Closed:** 2026-04-05
- **Executing agent:** Nimrod (Centinela-01)

> *"Ideal blueprints show intention. Real blueprints show knowledge."*

---

## Version history

- v1.0.0 (2026-04-05) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
