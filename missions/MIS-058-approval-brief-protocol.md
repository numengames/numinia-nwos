---
id: "MIS-058"
title: "Approval Brief Protocol: Structured communication for human-machine approvals"
type: mission
status: todo
version: "1.2.0"
assigned_to: "nimrod"
guild: "Sentinels"
priority: high
effort: S
created: "2026-04-07T14:00:00Z"
updated: "2026-08-25T20:05:59Z"
license: "CC-BY-4.0"
---
# MIS-058 — Approval Brief Protocol

> **Summary:** Implement a communication standard so digital agents request approval from biological agents in a clear, structured, and conscious way.
> **Epistemic:** What principles govern the human-machine approval relationship in the CAO.
> **Pragmatic:** Protocol active in all CAO agents.
> **Audience:** Agents · Oracles

---

## Story

As an Oracle, I want that when a digital agent asks me for approval, I understand exactly what it will do, why, and how much attention I should give it — so I can decide in an informed and conscious way without unnecessary friction.

## Acceptance criteria

- [x] P-008 documented in `protocols/P-008-approval-brief-v1.md`
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

→ [P-008-approval-brief-v1.md](../protocols/P-008-approval-brief-v1.md)

---

## Version history

- v1.0.0 (2026-04-07) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).

*Nimrod 🗡️ / Numen Games — 2026-04-07*

---

## Board triage — 2026-08-25

Returned from `in-progress` to `backlog` by the Oracle, in the triage of the 111
missions. **Nothing about the brief changed and the work is still wanted** —
what changed is the claim that it was underway.

- **Category:** D — stale. No commit has ever touched this mission outside a bulk maintenance commit. 6/8 criteria.
- **Signal, not proof:** this mission was assigned to an agent whose identity is
  in question (`D-026`, `D-027`). That is context; the evidence for this move is
  the absence of its own commit, not who it was assigned to.
- **Signed by:** Oracle, 2026-08-25.
