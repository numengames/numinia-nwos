---
id: "MIS-002"
uid: ""
title: "User map: who pays and why"
status: frozen
priority: "critical"
effort: "S"
guild: "Exegetes"
territory: "Product"
assigned_to: null
started: null
completed: null
freeze_reason: cancelled

type: mission
version: "1.2.0"
created: "2026-04-07T19:43:00Z"
created_source: "git:749f75c"
created_confidence: inferred
updated: "2026-09-02T10:01:10+02:00"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [product, users, icp, strategy, exegetes]
license: "CC0-1.0"
---
# MIS-002 — User map: who pays and why

> **Summary:** Identify the 3 most likely user profiles who would pay for Numinia today.
> **Epistemic:** Whether the ICP is B2B, B2C, or a mix.
> **Pragmatic:** Design decisions anchored in real people.
> **Audience:** Agents · Oracles

## Story

As a team, I want to identify the 3 most likely user profiles who would pay for Numinia today, so we design the product toward real demand.

## Acceptance criteria

- [ ] 3 user profiles with: description, main pain point, willingness to pay, access channel
- [ ] At least 2 profiles validated with a real conversation
- [ ] Profiles linked from MVP.md

## Epistemic value

We learn whether the ICP is B2B, B2C, or a mix.

## Pragmatic value

Design decisions anchored in real people.

*Nimrod 🗡️ — recovered from pablofm-web (MIS-062.2) — 2026-04-07*

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** 2026-04 import, no commit of its own, 3 citations (2 files). Its sibling MIS-001 (the MVP one-pager it links to via MVP.md) was cancelled 2026-08-17 as moot: the product is live. MVP.md never existed in this repository.
- **Recommendation:** Freeze as cancelled — obsolete, same ruling as MIS-001/003/005: an ICP study 'before designing the product' has no object once numinia.com is in production. If the market question is still wanted, it is a new mission with today's product as premise.

## Version history

- v1.1.0 (2026-09-02) — inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.

- v1.2.0 (2026-09-02) — status todo → frozen (obsolete — an ICP study "before designing the product" has no object once numinia.com is in production; same ruling as MIS-001/003/005). Proposed in #199 on the 2026-09-02 status check; the Oracle signs by merging (PRO-003 §2).