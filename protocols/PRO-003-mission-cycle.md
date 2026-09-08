---
id: "PRO-003"
uid: ""
title: "Mission Protocol — briefing, cycle, coordination"
type: protocol
status: active
version: "4.6.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-09-08T18:10:00Z"
author: "nimrod"
owner: "oracle"
tags: [protocol, missions, cycle, briefing, coordination]
applies_to: [all-agents]
mandatory: true
license: "CC0-1.0"
---
# PRO-003 — Mission Protocol

> **Summary:** How a mission is received, understood, executed, coordinated and
> closed — the full lifecycle in one document.
> **Epistemic:** A mission not understood is a mission not executed. Briefing is
> not overhead, it is the first act of execution.
> **Pragmatic:** Briefing before touching anything, states and cycle while
> working, coordination when more than one agent is involved.
> **Audience:** Agents

---

## 1 · Briefing — before any execution

> **Mission first. Execution after.** No agent executes any work without
> completing this briefing. This rule has no exceptions, and it applies to
> quick tasks too — quick tasks are where most of the errors happen.

Apply it when a mission is assigned or self-identified, when one arrives by
chat, file or verbal instruction, and when a frozen mission is reactivated.

**Register it first.** If the mission file does not exist, create it with a
conformant header, `status: todo`, and commit it. If it exists as `todo`, set
`status: in-progress` with its `started` timestamp, and commit. **Nothing else
begins until that commit exists** — otherwise the record is written
retroactively, which is fiction.

**Read the whole file**, not the title: the deliverable, the priority, the
effort, the acceptance criteria, the dependencies, and who it is assigned to,
which must be the agent reading it or nobody.

**Check what blocks it.** A mission that depends on another needs that one's
status; one that needs an external key, access or decision flags it before
starting, not after; one that conflicts with an active mission is escalated. A
blocked mission is set `frozen` with its `freeze_reason` written down and the
Oracle notified.

**Answer three questions before the first action:** what exactly is the
deliverable, what does done look like, and what is the first concrete action —
a tool call or a file write, never "research". If any answer is unclear, ask
the Oracle before proceeding.

For missions of effort M or larger, or when working with the Oracle live,
announce the start with the mission, the estimate and the first action. Smaller
or background work may start silently.

---

## 2 · States and identity

All missions live in the flat `missions/` folder. **The `status` field is the
only state surface** — there are no status directories and no index file; the
public board is built from the folder on every deploy.

```
todo → in-progress → in-review → done → (ADR-030 four tests) → deleted
              ↑___________|  (Oracle requests changes)

frozen ←— from any non-terminal state (Oracle decision)
  ↓                ↘
todo — when unfrozen   (ADR-030 four tests, resolution recorded) → deleted
```

| State | Who sets it | Stamp |
|---|---|---|
| `todo` | Oracle — accepted, not started | — |
| `in-progress` | executor agent | `started` |
| `in-review` | executor agent | `in_review_at` |
| `done` | Oracle | `completed` |
| `frozen` | Oracle | `freeze_reason` |

Five values, and the vocabulary is closed. A brief the Oracle has not accepted
is not on the board, and a cancelled mission is `frozen` with
`freeze_reason: cancelled`. The file is the record until a living document
carries that record instead.

**A `done` mission may be deleted** — `ADR-030`'s four-test process
(no live citations, no unredirected public URL, a written resolution,
the folder's `open` threshold met), the same one every other document
type already answers to. `PRO-010` §5 governs the mechanics; `ADR-040`
closes the gap this protocol left open.

**A `frozen` mission may be deleted too** — same four tests. Test 3 is met
when a living document records the identifier, the title and the
`freeze_reason` (the decision *against*, or the trigger that would reopen
it), so the fact that the question was asked survives the card. `ADR-040`
v1.1.0, Oracle instruction 2026-09-08.

**Mission identifiers** are `MIS-NNNN`, four digits, zero-padded in the
filename; the `id` field keeps the number as it was registered. A sub-mission
is a mission: it takes the next free number and declares its parent. The dot
and letter forms are retired — neither was a registered identifier shape and
both were invisible to the reference guard.

**Before assigning any identifier**, list the folder and verify the next free
number against what is committed after a pull, not against the working tree. If
you cannot verify it, do not assign it.

---

## 3 · The cycle

**Creating** (Oracle): start from `templates/MIS-TEMPLATE`, fill every required
header field, verify the next identifier against the repository, set
`status: todo`, name the file `MIS-NNNN-<english-slug>.md`, and open a pull
request.

**Activating** (Oracle): `status: in-progress`, one `assigned_to` and only one,
and the `started` stamp.

**Executing** (agent): complete the briefing, read the mission whole, check it
does not contradict the canon and escalate if it does, execute, and record
progress in the mission file. A change of plan is written into the mission's
version history.

**Requesting review** (agent): verify every acceptance criterion, fill the real
execution section, set `status: in-review` with its stamp, file an approval
request scored to the mission, and notify the Oracle.

**Completing** (Oracle): review, then either `status: done` with its `completed`
stamp — after which the file is immutable — or back to `in-progress` with the
changes requested.

**Freezing** (Oracle): `status: frozen` with `freeze_reason` filled. The mission
stays visible on the board. Unfreezing sets it back to `todo` and clears the
reason.

### The rules that do not bend

Five of them carry a `CORE` identifier: they were rules of the corpus until
2026-09-08 and are now executed here, number kept (`IDN-014`).

| ID | Rule | Verified by |
| **CORE-36** | Work is registered before it is executed. | `[MANUAL]` — comparing a mission's date to work that may predate its branch |
| **CORE-37** | A mission states what would count as done before work starts. | `[MANUAL]` — the section is checkable, whether it states a test is not |
| **CORE-38** | A parent mission is not finished while any of its children is open. | `[MANUAL]` — parent and child are declared in prose, not in a field |
| **CORE-39** | A paused mission declares why it is paused. | `[MANUAL]` — the reason is prose |
| **CORE-41** | An agent reads the whole mission before acting, never the title alone. | `[MANUAL]` — no trace distinguishes a full read from a skim |


- A `done` mission is immutable once merged. An Oracle-authorised exception is
  recorded as one.
- A `done` mission may be deleted, never edited — `ADR-030`'s four tests,
  cited in the commit that removes it.
- Only the executor edits a mission in progress; collaboration is declared in
  the mission, and a mission has exactly one executor.
- A mission sitting in `todo` for 90 days without activity is stale and is
  frozen or deleted at the next review.
- When unsure whether something is sensitive, do not commit — escalate first.
- A `frozen` mission may be deleted once its reason is recorded in a living
  document — `ADR-030`'s four tests, cited in the commit that removes it.
- Never assign an identifier without verifying the repository first.
- A parent mission cannot be done while a sub-mission is neither done nor
  frozen-cancelled.

---

## 4 · Coordination between agents

**Reads are safe. Writes require coordination.** Concurrency breaks on writes.

Agents communicate through the repository: commits and pull requests first,
annotations in shared mission files second, the Oracle when it needs escalating.
There are no real-time channels between agents.

**One executor per active mission.** Collaboration is declared explicitly in the
header. Work that genuinely splits becomes sub-missions, one per agent, ordered
with `depends_on`.

An agent that needs something from another updates its own `STATUS.md` and
records the blocker in its mission. **Agents do not assign each other work — the
Oracle assigns.**

The repository is the source of truth in any conflict. Ambiguity is escalated,
not resolved unilaterally, and another agent's work is never overwritten without
explicit coordination.

**Identifier collision:** whoever committed first keeps the number; the second
renumbers and fixes their own references.

---
