---
id: "DEC-001"
title: "Self-hosting over SaaS for infrastructure"
type: adr
status: active
version: "1.1.0"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: exact
updated: "2026-04-07T18:00:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [decisions, infrastructure, self-hosting, philosophy]
territory: "Infrastructure"
superseded_by: null
license: "CC-BY-4.0"
---
# DEC-001 — Self-hosting over SaaS for infrastructure

> **Summary:** Architectural or strategic decision with context and alternatives.
> **Epistemic:** What was decided, why, and what alternatives were discarded.
> **Pragmatic:** Consult before making decisions in the same domain.
> **Audience:** Agents · Oracles

---

## Context

Numen Games needed analytics and a contact system for pablofm.com. The options were SaaS services or self-hosted solutions.

## Decision

**Self-hosting.** Umami for analytics, Cal.com for bookings, both on the own server.

## Why

- Pablo's ZK philosophy: data should not leave where it doesn't need to leave
- Cost 0 vs. paid SaaS at scale
- Consistent with Numinia values: digital sovereignty

## Discarded alternatives

- **Google Analytics** — cedes data to Google, requires cookie banner
- **Formspree** — no control, endpoint can disappear
- **Calendly** — paid beyond a certain usage

## Pros / Cons

**Pros:** Full data control · Real privacy · Operational cost 0
**Cons:** Own maintenance required · Requires operational infrastructure

---

## Version history

- v1.0.0 (2026-04-03) — Initial decision.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).

*Oracle: Pablo FM — 2026-04-03*
