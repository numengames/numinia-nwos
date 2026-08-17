---
id: "MIS-012"
title: "Set up CI/CD pipeline for numengames.com"
type: mission
status: backlog
version: "1.1.0"
created: "2026-04-04T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
area: "Infrastructure"
guild: "Sentinels"
type_execution: "digital"
priority: "high"
effort: "M"
license: "CC-BY-4.0"
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
