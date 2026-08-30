---
id: "DEC-004"
title: "Hybrid CAO architecture"
type: adr
status: active
version: "1.1.0"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: exact
updated: "2026-04-07T18:00:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [decisions, cao, agents, architecture]
territory: "CAO"
superseded_by: null
license: "CC-BY-4.0"
---
# DEC-004 — Hybrid CAO architecture

> **Summary:** Architectural or strategic decision with context and alternatives.
> **Epistemic:** What was decided, why, and what alternatives were discarded.
> **Pragmatic:** Consult before making decisions in the same domain.
> **Audience:** Agents · Oracles

---

## Context

The CAO needed to define how to operate digital agents. Persistent sessions or on-demand subagents?

## Decision

**Hybrid architecture: ephemeral subagents for missions now, persistent sessions when the system matures.**

## Why

- Subagents work today without additional configuration (proven with MIS-001)
- Persistent sessions require more infrastructure
- Minimum viable complexity — no premature over-engineering
- The .md missions system works equally with both models

## Discarded alternatives

- **Persistent sessions from the start** — risk of breaking config, fixed cost without usage
- **A single generalist agent** — does not scale, loses specialization

## Pros / Cons

**Pros:** Works today · Cost proportional to usage · No config risk
**Cons:** No memory between missions (mitigated with briefing protocol)

---

## Version history

- v1.0.0 (2026-04-05) — Initial decision.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).

*Oracle: Pablo FM — 2026-04-05*
