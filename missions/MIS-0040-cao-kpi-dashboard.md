---
id: "MIS-040"
uid: ""
title: "CAO dashboard: KPI definition"
status: frozen
priority: "high"
effort: "M"
guild: "Sentinels"
territory: "CAO"
type_execution: "hybrid"
assigned_to: null
completed: null
freeze_reason: "targets the retired pablofm.com dashboard; re-brief against numinia.org/missions (which already shows mission KPIs) to unfreeze"

type: mission
version: "1.3.0"
created: "2026-04-07T05:58:49Z"
created_source: "git:428349f"
created_confidence: inferred
updated: "2026-09-02T10:01:10+02:00"
owner: "oracle"
license: "CC0-1.0"
---
# MIS-040 — CAO dashboard: KPI definition

> **Summary:** Dashboard with the CAO's real KPIs, in order to evaluate the performance of the agent system.
> **Epistemic:** Without KPIs, the agent system operates without objective feedback.
> **Pragmatic:** Quantitative justification of the CAO's ROI.
> **Audience:** Agents · Oracles

## Story

As Pablo, I want a dashboard with the CAO's real KPIs, in order to evaluate the performance of the agent system.

## Acceptance criteria

- [ ] KPIs defined: missions/week, cost/mission, time/mission, PR velocity
- [ ] Dashboard updated automatically (or semi-automatically)
- [ ] Visible at pablofm.com/cao
- [ ] Week-over-week comparison

## Epistemic value

Without KPIs, the agent system operates without objective feedback.

## Pragmatic value

Quantitative justification of the CAO's ROI.

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** 2026-04 import, no commit. Target 'pablofm.com/cao' — legacy domain (MIS-062's own triage table calls pablofm.com 'dead context'). MIS-048 (cost tracking) is its data source and is blocked.
- **Recommendation:** Re-brief against numinia.org (the board already shows mission KPIs) or freeze; as written it targets a retired site.

## Version history

- v1.2.0 (2026-09-02) — context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.

- v1.3.0 (2026-09-02) — status todo → frozen (as written it targets a retired site). Proposed in #199 on the 2026-09-02 status check; the Oracle signs by merging (PRO-003 §2).