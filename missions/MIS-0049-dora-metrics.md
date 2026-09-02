---
id: "MIS-049"
uid: ""
title: "DORA Metrics for numengames-web"
status: frozen
priority: "medium"
effort: "M"
guild: "Sentinels"
territory: "TBA"
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
# MIS-049 — DORA Metrics for numengames-web

> **Summary:** Measure the 4 DORA metrics of the development flow, to know if we are a high-performance team.
> **Epistemic:** DORA metrics are the industry standard for measuring engineering efficiency.
> **Pragmatic:** Identify bottlenecks in the development flow before they scale.
> **Audience:** Agents · Oracles

## Story

As a technical team, I want to measure the 4 DORA metrics of the development flow, to know if we are a high-performance team.

## Acceptance criteria

- [ ] 4 metrics configured: deployment frequency, lead time, change failure rate, MTTR
- [ ] Dashboard visible in GitHub or external tool
- [ ] Baseline established in first month
- [ ] Reviewed at monthly Dark Council

## Epistemic value

DORA metrics are the industry standard for measuring engineering efficiency.

## Pragmatic value

Identify bottlenecks in the development flow before they scale.

## Version history

- v1.0.0 (2026-04-04) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.1.1 (2026-09-02) — Form: context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed. missions/ normalisation, lot 2.

## Closure (2026-08-17)

Closed as **cancelled — obsolete**, board triage ordered and approved by the Oracle (2026-08-17).

- **Reason:** Targets numengames-web, whose repo/worker is slated for strip+rename (nwos-site) and whose domain is gone.
- **Evidence:** numengames.com returns 404; estado-merge-viewer plan.
- **Rule:** file preserved per P-003/SIM-2.7 and GOVERNANCE G-05 — closed, never deleted.

