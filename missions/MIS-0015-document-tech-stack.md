---
id: "MIS-015"
uid: ""
title: "Document Numinia's tech stack"
status: frozen
priority: "high"
effort: "S"
guild: "Alchemists"
territory: "Infrastructure"
type_execution: "biological"
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
# MIS-015 — Document Numinia's tech stack

> **Summary:** Understand the full Numinia stack, to contribute without asking the basics.
> **Epistemic:** Makes implicit technical decisions explicit.
> **Pragmatic:** Technical onboarding in < 30 minutes.
> **Audience:** Agents · Oracles

## Story

As a new agent or technical contributor, I want to understand the full Numinia stack, to contribute without asking the basics.

## Acceptance criteria

- [ ] STACK.md with: frontend, backend, DB, infra, agent tooling
- [ ] Updated architecture diagram
- [ ] Stack decisions linked to DEC-xxx
- [ ] Published in the repo

## Epistemic value

Makes implicit technical decisions explicit.

## Pragmatic value

Technical onboarding in < 30 minutes.

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** 2026-04 import, no commit. STACK.md never existed. MIS-045 (Document CAO architecture, done) and SYS-001 (CAO architecture, system/) now describe the stack of this system; numinia.com's stack lives in numinia-web.
- **Recommendation:** Freeze as cancelled — achieved by reality for the NWOS side (SYS-001/002/003); out of scope for the product side.

## Version history

- v1.2.0 (2026-09-02) — context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.

- v1.3.0 (2026-09-02) — status todo → frozen (achieved by reality on the NWOS side (`system/SYS-001..003`, MIS-129); the product side is out of this archive's scope). Proposed in #199 on the 2026-09-02 status check; the Oracle signs by merging (PRO-003 §2).