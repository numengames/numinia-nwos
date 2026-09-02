---
id: "MIS-058"
uid: ""
title: "Approval Brief Protocol: Structured communication for human-machine approvals"
status: done
priority: high
effort: S
guild: "Sentinels"
territory: "TBA"
assigned_to: null
completed: "2026-09-02"

type: mission
version: "1.4.0"
created: "2026-04-07T14:00:00Z"
created_source: "git:749f75c"
created_confidence: inferred
updated: "2026-09-02T10:01:10+02:00"
owner: "oracle"
license: "CC0-1.0"
---

# MIS-058 — Approval Brief Protocol

> **Summary:** Implement a communication standard so digital agents request approval from biological agents in a clear, structured, and conscious way.
> **Epistemic:** What principles govern the human-machine approval relationship in the CAO.
> **Pragmatic:** Protocol active in all CAO agents.
> **Audience:** Agents · Oracles

## Story

As an Oracle, I want that when a digital agent asks me for approval, I understand exactly what it will do, why, and how much attention I should give it — so I can decide in an informed and conscious way without unnecessary friction.

## Acceptance criteria

- [x] PRO-008 documented in `protocols/PRO-008-decision.md`
- [x] Scale 1–10 adopted from canon (APPROVAL-REQUEST-template.md)
- [x] `mission` field mandatory in each approval
- [x] Approval types: Execution + UX/UI Design
- [x] Responsibility principle explicit and non-negotiable
- [x] Agent OPERATOR.md updated: git pull as mandatory startup step
- [ ] Oracle QA: review of first 10 approvals under new format
- [ ] All active agents apply the same protocol (verify at Dark Council)

## Lesson learned (inscribed in the mission)

When implementing this mission, a local protocol (C1–C5) was first created without consulting the repo. The repo already had `APPROVAL-REQUEST-template.md` with a more complete system. Everything had to be rewritten to align with the canon.

**Derived operational rule:**
1. `git pull` at the start of each session
2. Check if the repo already has what is needed
3. If it exists: derive from it. If not: create and push to the repo.

## Related protocol

→ [PRO-008-decision.md](../protocols/PRO-008-decision.md)

## Closure

- **What was done:** PRO-008 written and adopted (`protocols/PRO-008-decision.md`, v2.0.0 after it absorbed the approval template): the 1–10 scale, the mandatory `mission` field, the two approval types and the responsibility principle are in it; OPERATOR.md's git-pull startup step landed. Six of eight criteria, ticked in this file at the time.
- **What diverged, and why:** the two open criteria — Oracle QA of the first ten approvals, verification at the Dark Council that every agent applies it — are observation rituals, not deliverables, and the population they named (nimrod, the Dark Council) was retired 2026-08-28. Closed without them: they are not done, and nothing above pretends they are.
- **Evidence:** `protocols/PRO-008-decision.md` header (`status: active`, v2.0.0); §Board triage 2026-08-25 (category D, 6/8); §Status check.
- **Closed:** 2026-09-02 · **by:** ursa

## Version history

- v1.0.0 (2026-04-07) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.3.0 (2026-09-02) — import-era `---` rules removed; retired identifiers repointed: P-008→PRO-008, P-008 path→PRO-008 path; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.
- v1.4.0 (2026-09-02) — status todo → done (PRO-008 is the standing protocol; the two open criteria were observation rituals for a retired agent population). Proposed in #199 on the 2026-09-02 status check; the Oracle signs by merging (PRO-003 §2).

*Nimrod 🗡️ / Numen Games — 2026-04-07*

## Board triage — 2026-08-25

Returned from `in-progress` to `backlog` by the Oracle, in the triage of the 111
missions. **Nothing about the brief changed and the work is still wanted** —
what changed is the claim that it was underway.

- **Category:** D — stale. No commit has ever touched this mission outside a bulk maintenance commit. 6/8 criteria.
- **Signal, not proof:** this mission was assigned to an agent whose identity is
  in question (`D-026`, `D-027`). That is context; the evidence for this move is
  the absence of its own commit, not who it was assigned to.
- **Signed by:** Oracle, 2026-08-25.

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** Triaged 2026-08-25 (D, stale), 6/8. P-008 → PRO-008 v2.0.0 absorbed the approval template. The two open criteria (Oracle QA of 10 approvals; all agents apply) are observational.
- **Recommendation:** Close as done — achieved: PRO-008 is the standing protocol every agent reads; the two open items are a QA ritual, not deliverables. Oracle signs.
