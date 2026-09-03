---
id: "STANDARDS"
uid: ""
title: "Standards — Narrative Work OS (superseded)"
type: meta
status: superseded
version: "2.0.0"
created: "2026-04-07T12:56:00Z"
updated: "2026-08-30T17:51:00Z"
author: "nimrod"
owner: "oracle"
tags: [standards, conventions, meta, nwos]
license: "CC0-1.0"
registration: exempt
registration_reason: "singular document, not a numbered series"
superseded_by: "STD-001 · STD-004 · STD-002-governance.md · STD-005-engineering-standards.md"
---

# STANDARDS — Narrative Work OS (superseded)

> **Summary:** The April 2026 constitution of the system. Superseded 2026-08-30: every rule that survived lives in a current standard; every rule that died is named below with its cause of death.
> **Epistemic:** Where each convention this file used to govern now lives.
> **Pragmatic:** Do not obey this file. Follow the pointer to the living rule.
> **Audience:** Agents · Oracles

**Oracle decision, 2026-08-30** (standards consolidation, this PR): this file
stopped being the source of truth section by section between April and August
without ever saying so. Three of its rules actively contradicted ratified
standards. It is now a map, not a norm. The full v1.4.0 text is in git history
(`git show main~1:STANDARDS.md` at the consolidation commit, or any commit
before 2026-08-30).

## Where each section went

| Section (v1.4.0) | Fate | Living rule |
|---|---|---|
| §1 Timestamps | superseded | `S-001` §8 — ISO 8601, backfill rules |
| §2A Display IDs / prefixes | **superseded — was wrong** | `ADR-005` + MIS-125. This file still said `S- = Seminal`; ADR-005 renumbered S-002…S-010 → C-NNN |
| §2B uid / UUID v7 | **superseded — was wrong** | `S-001` §6.2 — uid is declared and left EMPTY, Oracle decision. Nobody fills it by hand |
| §3 Languages | superseded | `ADR-023 (formerly ADR-024)` / `DEC-006` — English is the repo language |
| §4A Agent file structure | superseded | `S-001` §3 (agents fund) |
| §4B Mission states | **superseded — was wrong** | `S-001` §7 — `draft`/`backlog`/`cancelled` were withdrawn (D-009, D-016). This file kept teaching them |
| §4C Decisions layout | superseded | `S-001` §3 (decisions fund) |
| §5 Frontmatter schema | superseded | `S-004` — the three rings. This file's `status` vocabulary (`active\|draft\|archived\|deprecated`) never matched any series |
| §6 Commit convention | superseded | `STD-005-engineering-standards.md` ARC-06 — seven types, defined there. Oracle ruling 2026-08-30: minimal standard set; `debt`/`audit` are scopes, not types |
| §7A BDD/Gherkin · 7C Wardley · 7D DORA · 7G Active Inference · 7H OODA · 7I BML | retired | Aspirational frameworks from April; nothing in the corpus invokes them as norm. The ADR practice (§7B) is real and lives in `STD-005-engineering-standards.md` ARC-05 |
| §7F Versioning lifecycle | **moved** | `STD-002-governance.md` «Versioning authority» — the Oracle's promotion rule, unchanged |
| §8 Context card | **moved** | `S-004` §9 — Summary/Epistemic/Pragmatic card, used by 228 documents |
| §9 Human approval scale | **moved** | `STD-002-governance.md` «Human approval scale» — Oracle ruling 2026-08-30 defines it as the gate reading; resolves D-003 |
| §10 Agent log system | retired | Dead letter: MIS-039 closed but `logs/` never existed in this repo and no consumer ever read the format |

## Change history

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 – 1.4.0 | 2026-04-07/08 | See git history — full text preserved |
| 2.0.0 | 2026-08-30 | Superseded. Moved from repo root to `standards/`. Body replaced by the supersession map above (Oracle-approved consolidation PR) |
