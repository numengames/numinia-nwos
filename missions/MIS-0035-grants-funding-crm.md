---
id: "MIS-035"
uid: ""
title: "Grants and funding CRM"
status: todo
priority: "medium"
effort: "S"
guild: "Procurators"
territory: "Funding"
type_execution: "digital"
assigned_to: null
completed: null

type: mission
version: "1.2.0"
created: "2026-04-07T05:58:49Z"
created_source: "git:428349f"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
owner: "oracle"
license: "CC0-1.0"
---
# MIS-035 — Grants and funding CRM

> **Summary:** Centralized tracker of all grants and funding sources, so no opportunity is lost to oversight.
> **Epistemic:** Full visibility of the funding pipeline.
> **Pragmatic:** Zero deadlines missed for lack of follow-up.
> **Audience:** Agents · Oracles

## Story

As the funding team, I want a centralized tracker of all grants and funding sources, so no opportunity is lost to oversight.

## Acceptance criteria

- [ ] GRANTS.md file with all identified opportunities
- [ ] Fields: name, status, deadline, amount, contact, notes
- [ ] Updated weekly
- [ ] Deadline alerts configured

## Epistemic value

Full visibility of the funding pipeline.

## Pragmatic value

Zero deadlines missed for lack of follow-up.

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** 2026-04 import, no commit. GRANTS.md never existed. Overlaps MIS-032 (research) and MIS-031.
- **Recommendation:** Keep todo as the umbrella for MIS-031/032 if funding is live; otherwise freeze the three together.

## Version history

- v1.2.0 (2026-09-02) — context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.
