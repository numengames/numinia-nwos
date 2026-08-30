---
id: "ADR-001"
title: "GitHub as Archive Summa"
type: adr
status: active
version: "1.0.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-08-17T07:28:32Z"
author: "pablo-fm"
owner: "oracle"
tags: [decisions, adr, infrastructure, github]
adr_id: "ADR-001"
decision: "Use GitHub as the canonical repository for the Narrative Work OS"
context: "The system needs a persistent, auditable, accessible source of truth for all agents and oracles"
superseded_by: null
license: "CC-BY-4.0"
---
# ADR-001 — GitHub as Archive Summa

> **Summary:** NWOS system document — GitHub as Archive Summa.
> **Epistemic:** What was decided, why, and what alternatives were discarded.
> **Pragmatic:** Consult before making decisions in the same domain.
> **Audience:** Agents · Oracles

---


## Context

The Narrative Work OS needs a single source of truth that:
1. Persists across agent sessions (agents start fresh each time)
2. Is auditable (history of every change)
3. Is accessible to humans and AIs
4. Supports collaboration between multiple agents and oracles
5. Can be public (we build in the open)

## Options evaluated

**A) Notion** — Good for humans, bad for AI agents. No stable API, closed format.

**B) Confluence** — Enterprise, expensive, not open by default.

**C) Git repository (GitHub)** — Universal, auditable, open, markdown-native, supports CI/CD, free for public repos.

**D) Local filesystem only** — No persistence, no collaboration, no auditability.

## Decision

**Option C — GitHub.** Specifically: `github.com/numengames/numinia-digital-agents`

## Consequences

✅ Full history of every change  
✅ Multiple agents can collaborate via PRs  
✅ CI/CD for validation  
✅ Public by default — we build in the open  
✅ Markdown-native — agents and humans read the same format  
⚠️ Requires internet access for agents to sync  
⚠️ Sensitive information must NEVER be committed (see operations/security-policy.md)

## Verification

This repository is the proof that the decision works. The decision validates itself.

---

---

## Version history

- v1.0.0 (2026-04-06) — Initial decision.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).

*Oracle: Pablo FM — 2026-04-06*
