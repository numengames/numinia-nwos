---
id: "MIS-014"
uid: ""
title: "Install Umami on numengames.com"
status: frozen
priority: "high"
effort: "XS"
guild: "Sentinels"
territory: "Infrastructure"
type_execution: "digital"
assigned_to: null
completed: null

type: mission
version: "1.1.1"
created: "2026-04-07T05:58:49Z"
created_source: "git:428349f"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
owner: "oracle"
license: "CC0-1.0"

freeze_reason: cancelled
---
# MIS-014 — Install Umami on numengames.com

> **Summary:** Analytics on numengames.com without handing data to Google, to make decisions based on real data.
> **Epistemic:** Baseline of numengames.com's real traffic before improvements.
> **Pragmatic:** Data to measure the impact of MIS-027 (website improvement).
> **Audience:** Agents · Oracles

## Story

As a marketing team, I want analytics on numengames.com without handing data to Google, to make decisions based on real data.

## Acceptance criteria

- [ ] Umami snippet added to numengames.com
- [ ] Website created in the Umami panel (analytics.pablofm.com)
- [ ] Data flowing correctly
- [ ] No cookie banner (Umami is cookieless)

## Epistemic value

Baseline of numengames.com's real traffic before improvements.

## Pragmatic value

Data to measure the impact of MIS-027 (website improvement).

## Closure (2026-08-17)

Closed as **cancelled — obsolete**, board triage ordered and approved by the Oracle (2026-08-17).

- **Reason:** Target site no longer exists.
- **Evidence:** numengames.com returns 404.
- **Rule:** file preserved per P-003/SIM-2.7 and GOVERNANCE G-05 — closed, never deleted.

## Version history

- v1.1.1 (2026-09-02) — Form: context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed. missions/ normalisation, lot 2.
