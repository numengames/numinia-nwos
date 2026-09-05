---
id: "PRO-001"
uid: ""
title: "Agent Session Protocol — open, monitor, close"
type: protocol
status: active
version: "0.5.0"
created: "2026-04-08T06:02:27Z"
created_source: "git:a5b6a0d"
created_confidence: exact
updated: "2026-09-04T22:05:00+02:00"
author: "nimrod"
owner: "oracle"
tags: [protocol, briefing, startup, session, close, context, mandatory]
applies_to: [all-agents]
mandatory: true
license: "CC0-1.0"
---
# PRO-001 — Agent Session Protocol

> **Summary:** The whole life of an agent session — how it opens, how it is
> monitored, how it closes. Mandatory, no exceptions.
> **Epistemic:** An agent without context has no direction; an agent that never
> stops degrades; a session that does not commit did not happen.
> **Pragmatic:** Opening at the start of every session, monitoring throughout,
> closing at the end.
> **Audience:** Agents

---

## 1 · Opening

Every session begins with these steps, in this order:

```
STEP 0 — Sync (mandatory, always first):
  $ cd numinia-nwos && git pull origin main
  → If there are new commits: read CHANGELOG.md

STEP 1 — Identity:
  → agents/{my-name}/SOUL.md, OPERATOR.md, STATUS.md

STEP 2 — Security (every session):
  → operations/OPS-009-secrets-handling.md
  → standards/STD-002-governance.md (if not read in <7 days)

STEP 3 — Active missions:
  → missions/ with status in-progress — do I have one assigned?
  → missions/ with status in-review — does the Oracle have pending review?

STEP 3.5 — If starting a new mission:
  → Apply the mission protocol's briefing before any execution

STEP 4 — Context (only if the mission requires it):
  → The specific protocol in protocols/ — the mission names it
  → If the mission writes or moves a document: the table in §1.1 below
  → canon/ only for an explicit philosophical question

BEGIN OPERATIONS.
```

### 1.1 Writing a document: what to read, and only that

Ten questions stand between an agent and a conforming document. Each one
has exactly one answer, in one section. Read the row, not the document —
opening all five in full costs roughly ten times as much and answers the
same ten questions.

| The question | Document | Section |
|---|---|---|
| Which folder does it go in? | `STD-001` | §2.2 What each series holds |
| Which identifier does it take? | `STD-001` | §4.1 Prefix per series |
| What is the file called? | `PRO-010` | §3 Names |
| Which frontmatter fields are required? | `STD-004` | §1 The three rings |
| Which `type` value? | `STD-004` | §4 The `type` vocabulary |
| Which `status`, and what may follow it? | `STD-004` | §5 Status lifecycles |
| Does it need a context card? | `STD-004` | §9 The context card |
| Which licence? | `CAN-005` | §2 Which license each piece gets |
| How is it versioned? | `PRO-010` | §4 Documentary semantic versioning |
| How is the commit written? | `STD-005` | ARC-06 commit convention |

Sections are named as well as numbered on purpose: a number moves, a
title survives the move.

**Two of these five are not ratified.** `PRO-010` and `STD-005` are
`draft`. They are the only written answer to their questions, and they
are cited as binding across the corpus, so an agent follows them — but
an agent should know it is following a document that does not yet claim
authority, rather than discover it later.

**When a row is silent, ask.** A question this table does not answer is
not an invitation to invent an answer; it is a gap, and gaps are
escalated, not filled.

**Minimum under pressure:** pull, SOUL, OPERATOR, active missions, briefing if
new mission. These five are the inviolable minimum; without them there is no
valid startup. Urgency does not override the sequence — urgency is the
protocol's greatest enemy.

### Onboarding a new agent

An agent is not activated until three conditions hold:

- **SOUL.md and OPERATOR.md exist and are Oracle-approved.** Both, always.
- **The first three sessions are supervised**, and carry no complex mission.
- **No agent ever gets write access to `canon/`.** Ever.

---

## 2 · Monitoring — context load

A model's context window is finite. As a session grows, the agent loses
coherence with its own early decisions, repeats work, and starts making
continuity errors. Reporting that is resource management, not weakness.

| Level | State | What it means |
|---|---|---|
| 1–3 | fresh | optimal |
| 4–6 | loaded | dense but operable |
| **7–8** | **warning** | **tell the operator, recapitulate, prepare to close** |
| 9–10 | critical | real risk of error — close now |

Score it by adding: over four hours, +2. More than five distinct topics, +2.
Over twenty tool calls, +1. More than three architectural decisions, +2. Cannot
clearly remember the start of the session, +2.

**At 7 or above the agent MUST tell the operator** rather than continue
silently, offer to recapitulate what was done, the current state and what is
pending, and close per the section below if the operator agrees.

---

## 3 · Closing

*What is not written did not happen.*

Close at the end of any session, when a session is about to be interrupted,
before handing an active mission to another agent, and before ending the day.

**Inventory.** Missions in progress get their `divergence_log` updated; a
finished one is closed per the mission protocol. Decisions taken during the
session and not yet written go to `decisions/` or to the mission. `STATUS.md`
is brought up to date.

**Persistence.** Long-term knowledge goes to `MEMORY.md`, session context to
`STATUS.md`. Context that lives in no file is lost forever — a mental note is
not persistence.

**Commit.** The work is committed. The commit follows the engineering
standard's conventional-commit format, like every other commit in this
repository; there is no session-specific prefix. Branch protection forbids
pushing to the trunk directly, so the work reaches `main` through a pull
request, which is also what puts a second reader in front of it.

**Verify before declaring the session closed:** `STATUS.md` matches reality,
nothing that should persist is uncommitted, in-progress missions carry an
up-to-date divergence log, next steps are written down, and the branch is
pushed.

**Declare it**, naming the agent, the timestamp, the missions still active and
the recommended next step.

Without commit and push there is no valid close. Knowledge that is not
committed disappears when the session ends: there is no gradual amnesia, there
is total loss.

---

## Protocol chain

```
PRO-001 opening
  └─► the mission protocol (briefing, lifecycle, coordination)
        ├─► the escalation protocol (if blocked or uncertain)
        └─► the decision protocol (if Oracle approval is needed)
  └─► PRO-001 monitoring — throughout the session
PRO-001 closing — always
```

---
