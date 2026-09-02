---
id: "MIS-024"
uid: ""
title: "Post-call follow-up system"
status: frozen
priority: "medium"
effort: "XS"
guild: "Sentinels"
territory: "Sales"
type_execution: "digital"
assigned_to: null
completed: null
freeze_reason: cancelled

type: mission
version: "1.3.0"
created: "2026-04-07T05:58:49Z"
created_source: "git:428349f"
created_confidence: inferred
updated: "2026-09-02T10:01:10+02:00"
owner: "oracle"
license: "CC0-1.0"
---
# MIS-024 — Post-call follow-up system

> **Summary:** Automatic follow-up system after each call, so no opportunity is lost for lack of follow-up.
> **Epistemic:** Measures post-call conversion rate with and without systematic follow-up.
> **Pragmatic:** Removes the dependency on human memory for follow-up.
> **Audience:** Agents · Oracles

## Story

As a salesperson, I want an automatic follow-up system after each call, so no opportunity is lost for lack of follow-up.

## Acceptance criteria

- [ ] Automated post-call email template
- [ ] Trigger: 24h after a Cal.com meeting
- [ ] Follow-up at 7 days if there is no reply
- [ ] Log in CRM with the opportunity's status

## Epistemic value

Measures post-call conversion rate with and without systematic follow-up.

## Pragmatic value

Removes the dependency on human memory for follow-up.

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** 2026-04 import, no commit. Depends on Cal.com meetings (MIS-007, dead target) and a CRM that does not exist.
- **Recommendation:** Freeze as cancelled — its two dependencies are dead or absent.

## Version history

- v1.2.0 (2026-09-02) — context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.

- v1.3.0 (2026-09-02) — status todo → frozen (its two dependencies are dead or absent). Proposed in #199 on the 2026-09-02 status check; the Oracle signs by merging (PRO-003 §2).