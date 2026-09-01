---
id: "MIS-007"
uid: ""
title: "Integrate Cal.com into Numinia onboarding"
status: todo
priority: "high"
effort: "S"
guild: "Sentinels"
territory: "Product"
type_execution: "hybrid"
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
# MIS-007 — Integrate Cal.com into Numinia onboarding

> **Summary:** Book an onboarding session directly from the website, so I can get started without friction.
> **Epistemic:** Measures how many genuinely interested people convert into a session.
> **Pragmatic:** Eliminates the back-and-forth email to schedule.
> **Audience:** Agents · Oracles

## Story

As a prospect, I want to book an onboarding session directly from the website, so I can get started without friction.

## Acceptance criteria

- [ ] Cal.com configured with a "Numinia Session" meeting type
- [ ] Integrated into numengames.com/numinia
- [ ] Automatic confirmation by email
- [ ] Reminder 24h in advance

## Epistemic value

Measures how many genuinely interested people convert into a session.

## Pragmatic value

Eliminates the back-and-forth email to schedule.

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** 2026-04 import, no commit of its own. Target 'numengames.com/numinia' — numengames.com returns 404 (the reason MIS-005/012/013/014 were cancelled 2026-08-17). Cal.com itself still runs (cal.pablofm.com, MIS-016).
- **Recommendation:** Freeze as cancelled — obsolete target. If booking from numinia.com is wanted, re-brief against numinia.com/… — the mechanism (Cal.com) is a one-line change, the page does not exist.

## Version history

- v1.2.0 (2026-09-02) — context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.
