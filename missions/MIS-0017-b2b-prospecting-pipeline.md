---
id: "MIS-017"
uid: ""
title: "B2B Prospecting Pipeline (50 leads)"
status: frozen
priority: "critical"
effort: "M"
guild: "Procurators"
territory: "Sales"
assigned_to: null
started: null
completed: null
freeze_reason: "no owner and no live Sales channel; unfreeze when the Oracle names one"

type: mission
version: "1.2.0"
created: "2026-04-07T19:43:00Z"
created_source: "git:749f75c"
created_confidence: inferred
updated: "2026-09-02T10:01:10+02:00"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [sales, b2b, pipeline, prospecting, procurators]
license: "CC0-1.0"
---
# MIS-017 — B2B Prospecting Pipeline (50 leads)

> **Summary:** A list of 50 qualified prospects with direct contacts, to start sales conversations this week.
> **Epistemic:** Maps the real buyer space before optimizing the pitch.
> **Pragmatic:** Without a pipeline there are no sales.
> **Audience:** Agents · Oracles

## Story

As Pablo, I want a list of 50 qualified prospects with direct contacts, so I can start sales conversations this week.

## Acceptance criteria

- [ ] 50 prospects in CRM: name, company, email, LinkedIn, pain point
- [ ] Segmented by vertical: indie studios, publishers, gaming DAOs
- [ ] At least 10 with a direct LinkedIn connection
- [ ] First contact template approved

## Epistemic value

Maps the real buyer space before optimizing the pitch.

## Pragmatic value

Without a pipeline there are no sales.

*Nimrod 🗡️ — recovered from pablofm-web (MIS-062.2) — 2026-04-07*

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** 2026-04 import, no commit. Assigned to 'procurador-01', an agent id that no longer exists (agents/ holds antunj, byblos, doulos, lexa, procyon, senet, ursa). Sales pipeline, 'this week' framing from April.
- **Recommendation:** Unassign (assigned_to: null — the agent is gone) and keep todo only if Sales is a live territory for the Oracle; otherwise freeze. Not a decision an agent takes.

## Version history

- v1.1.0 (2026-09-02) — inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.

- v1.2.0 (2026-09-02) — status todo → frozen (no owner and no live Sales channel — unfreeze when the Oracle names one). Proposed in #199 on the 2026-09-02 status check; the Oracle signs by merging (PRO-003 §2).