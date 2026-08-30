---
id: "DEC-002"
title: "Build in public with CC0 license"
type: adr
status: superseded
version: "1.2.0"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: exact
updated: "2026-08-30T20:30:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [decisions, strategy, culture, open-source, cc0]
territory: "TBA"
superseded_by: null
license: "CC-BY-4.0"
---
# DEC-002 — Build in public with CC0 license

> **Superseded (2026-08-30) by [`C-005`](../canon/C-005-licensing.md):** the licensing trichotomy (packages MIT, apps AGPL-3.0, assets CC0, docs CC-BY-4.0) replaced the blanket “all CC0, code MIT”. Build-in-public survives; the license map is C-005's.

> **Summary:** Architectural or strategic decision with context and alternatives.
> **Epistemic:** What was decided, why, and what alternatives were discarded.
> **Pragmatic:** Consult before making decisions in the same domain.
> **Audience:** Agents · Oracles

---

## Context

Numen Games needed to define the openness level of its work — code, documentation, framework.

## Decision

**The entire Numinia framework and documentation is CC0. Code is MIT. We build in the open.**

## Why

- The model is replicable — that is a feature, not a risk
- Radical transparency builds community and credibility
- Consistent with the 'remix culture' declared in the seminal documents
- Reduces adoption friction for new organizations

## Discarded alternatives

- **Proprietary** — contradicts the philosophy and limits adoption
- **Creative Commons BY** — adds unnecessary attribution friction

## Pros / Cons

**Pros:** Community · Credibility · Free adoption
**Cons:** Anyone can replicate the model without paying

---

## Version history

- v1.0.0 (2026-04-02) — Initial decision.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).

*Oracle: Pablo FM — 2026-04-02*
