---
id: "PRO-016"
uid: ""
title: "Applying the engineering standard to a task: audit, classify, name the practice, run the checks"
type: protocol
status: draft
version: "1.0.0"
created: "2026-09-08T21:30:00Z"
updated: "2026-09-08T21:30:00Z"
author: "ursa"
owner: "oracle"
tags: [protocol, engineering, agents]
license: "CC0-1.0"
applies_to: [all-agents]
mandatory: true
territory: "Platform"
related: ["STD-005", "PRO-001", "PRO-013"]
---
# PRO-016 — Applying the engineering standard to a task

> **Summary:** The order a coding agent follows on any task in a repository
> that carries `STD-005`, and the line between what it does alone and what
> waits for the Oracle.
> **Epistemic:** The standard says what holds; this protocol says how a task
> honours it without weakening a check to pass.
> **Pragmatic:** Six steps before pushing, two tiers of permission, one
> report shape.
> **Audience:** Agents · Oracle

## 1. Purpose and trigger

Runs on every task in a repository that contains or cites `STD-005`. It was the
agent application protocol inside `STD-005` until 2026-09-08; a procedure
does not belong inside a standard. Nothing in it changed in the move.

## 2. Preconditions

- The repository has a `CLAUDE.md` (practice `AGT-001`). If it is missing,
  report that first: it is itself a violation.
- `PRO-001` has been followed to open the session.

## 3. Procedure

1. **Audit the branch first.** Never assume the tree matches the standard,
   the README or the brief. Read what is there.
2. **Load `CLAUDE.md`.** It declares which Scorecard checks are in scope, the
   repository's AI stance (`AGT-006`) and any local overrides.
3. **Classify the task: cosmetic or irreversible.** Cosmetic — formatting,
   lint fixes, typos, added tests — proceeds. Irreversible — visibility,
   licences, secrets, deleting history, publishing, force operations — stops
   and surfaces the decision to the Oracle. In doubt, it is irreversible.
4. **Name the practices the task touches**, by ID, in commits and in the pull
   request (`fix: enforce read-only workflow tokens (SEC-008)`).
5. **Run the checks locally before pushing.** CI is the authority; the local
   run is faster feedback.
6. **Never weaken a check to make a task pass.** Lowering a threshold,
   skipping a test, adding a lint-ignore or unpinning an action is a change
   to the standard and needs an ADR; it is never a side effect of a feature.

**Autonomous (cosmetic tier):** fix `[AUTO]` violations when the fix is
mechanical — pin an action by SHA, add a missing `SECURITY.md` from the
template, sync labels, complete `.env.example`; add or improve tests,
comments and TSDoc; open pull requests that move `[MANUAL]` to `[AUTO]`, as
proposals.

**Never without the Oracle (irreversible tier):** change repository
visibility (`LEG-001`); change any `LICENSE`, SPDX header or REUSE structure;
rotate, create or delete credentials; change the principles of `STD-005`;
disable, weaken or bypass any check; force-push, rewrite history or delete
branches or tags on `main`.

**Which copy binds.** `numengames/numinia-nwos` carries the operative
standard. `nwos-workspace-template` and every workspace born from it carry a
starting proposal that binds nobody and is owned by whoever adopts it. Neither
is downstream of the other: a change here is a local ADR and pull request,
never routed upstream; a version difference between copies is expected and is
not reported as drift.

## 4. Verification

The closing report names: practices touched (IDs); checks run and their
result; `[MANUAL]` debt observed in passing — reported, not fixed unprompted —
and any decision escalated. Observed-but-untouched debt goes to the
repository's TODO file (`TRC-005`), not into the task.

## 5. Escalation

Step 3 is the escalation: anything irreversible waits for the Oracle through
`PRO-005`. A check that would have to be weakened to pass is escalated the
same way, with the ADR drafted.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-005` | Engineering standards | the practices this protocol applies |
| `PRO-001` | Agent session | opens and closes the session this runs inside |
| `PRO-005` | Escalation | how the irreversible tier reaches the Oracle |
| `PRO-013` | Handing a guard to CI | when the task is a guard |
