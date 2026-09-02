---
id: "MIS-004"
uid: ""
title: "Define monetization model v1"
status: todo
priority: "critical"
effort: "S"
guild: "Procurators"
territory: "Product"
assigned_to: null
started: null
completed: null

type: mission
version: "1.1.0"
created: "2026-04-07T19:43:00Z"
created_source: "git:749f75c"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [product, pricing, monetization, procurators]
license: "CC0-1.0"
---
# MIS-004 — Define monetization model v1

> **Summary:** A clear monetization model for Numinia v1, so we can talk money with clients from day one.
> **Epistemic:** Whether the market validates prices in real conversations.
> **Pragmatic:** We can charge. Without a model, there is no revenue.
> **Audience:** Agents · Oracles

## Story

As a founder, I want a clear monetization model for Numinia v1, so I can talk about money with clients from the first day.

## Acceptance criteria

- [ ] Maximum 2 pricing models defined
- [ ] Tentative price with justification (benchmarks)
- [ ] Document PRICING.md in the repository

## Epistemic value

We learn whether the market validates prices in real conversations.

## Pragmatic value

We can charge. Without a model, there is no revenue.

*Nimrod 🗡️ — recovered from pablofm-web (MIS-062.2) — 2026-04-07*

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** 2026-04 import, no commit of its own. PRICING.md never existed. MIS-021 (pricing packages, also todo) covers the same ground with more specific criteria.
- **Recommendation:** Freeze as cancelled — superseded by MIS-021 (one mission for pricing, not two). The 'talk money from day one' intent survives in MIS-021's criteria.

## Version history

- v1.1.0 (2026-09-02) — inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.
