---
id: "MIS-012"
uid: ""
title: "Set up CI/CD pipeline for numengames.com"
status: frozen
priority: "high"
effort: "M"
guild: "Sentinels"
territory: "Infrastructure"
type_execution: "digital"
assigned_to: null
completed: null

type: mission
version: "1.1.0"
created: "2026-04-07T05:58:49Z"
created_source: "git:428349f"
created_confidence: inferred
updated: "2026-08-26T13:03:10Z"
owner: "oracle"
license: "CC0-1.0"

freeze_reason: cancelled
---
# MIS-012 — Set up CI/CD pipeline for numengames.com

> **Summary:** NWOS system mission with criteria, epistemic and pragmatic value.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---


**Area:** Infrastructure · **Guild:** Sentinels · **Type:** 🤖 Digital · **Priority:** 🟠 High · **Effort:** M

## Story

As an agent, I want to deploy numengames.com via PR without manual intervention, to reduce deployment friction.

## Acceptance criteria

- [ ] GitHub Actions configured for numengames.com
- [ ] Automatic deploy on merge to main
- [ ] Build tests required before merge
- [ ] Deploy notification on Telegram

## Epistemic value

Measures the maturity of the technical team's workflow.

## Pragmatic value

Agents can ship improvements without depending on Pablo for the deploy.

---

## Closure (2026-08-17)

Closed as **cancelled — obsolete**, board triage ordered and approved by the Oracle (2026-08-17).

- **Reason:** Target site no longer exists; deploy pipelines are now per-repo Workers Builds.
- **Evidence:** numengames.com returns 404; numinia-nwos deploys via Workers Builds + wrangler.
- **Rule:** file preserved per P-003/SIM-2.7 and GOVERNANCE G-05 — closed, never deleted.

