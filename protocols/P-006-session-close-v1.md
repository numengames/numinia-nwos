---
id: "P-006"
uid: ""
title: "Session Close Protocol"
type: protocol
status: active
version: "1.1.0"
created: "2026-04-07T12:56:00Z"
updated: "2026-04-07T18:00:00Z"
author: "alquimista-01"
owner: "oracle"
tags: [protocol, session, commit, memory, close]
applies_to: [all-agents]
mandatory: true
human_approval_score: 7
license: "CC-BY-4.0"
---# P-006 — Session Close Protocol v1

> **Summary:** Standard operational protocol for the NWOS system.
> **Epistemic:** How this process is executed and why in this way.
> **Pragmatic:** Follow these steps in the specified context.
> **Audience:** Agents

---

*What is not written did not happen.*

---

## When to execute this protocol

- At the end of any work session
- When the session is about to be interrupted (timeout, error, context change)
- Before handing off an active mission to another agent
- Before ending the workday

---

## The 5 closing steps

### STEP 1 — State inventory

Before committing, answer these questions:

```
Are there active missions in progress?
  → Update divergence_log in the mission .md
  → If complete: execute mission close (P-003)

Were decisions made during the session that are not documented?
  → Create a note in decisions/ or in the corresponding mission

Does STATUS.md reflect the current state?
  → Update metrics, active missions, pending items
```

### STEP 2 — Memory persistence

```
Did I learn something I need to remember in the next session?
  → Write in MEMORY.md if it is long-term knowledge
  → Write in STATUS.md (session_notes section) if it is session context

Is there context not in any file?
  → NEVER leave this as a "mental note" — write it or it is lost forever
```

### STEP 3 — Git commit (mandatory format)

```bash
# Add all changes
git add -A

# Commit with standard format
git commit -m "session(nimrod): summary of what was done in ≤72 chars

- change 1
- change 2
- change 3

session_end: YYYY-MM-DDTHH:MM:SSZ"

# Push
git push origin main
```

**Session commit format:**
- Mandatory prefix: `session({agent-name}):`
- Body: list of main changes
- Last line of footer: `session_end: {ISO 8601 UTC timestamp}`

**Real example:**
```bash
git commit -m "session(nimrod): deep QA + agent architecture + STANDARDS.md

- STANDARDS.md v1.0.0 created with 8 sections
- P-006 (session close) created
- Agent architecture migrated to flat (agents/nimrod/)
- canon/INDEX.md updated to 10 seminal documents
- Bug sentinels/centinelas resolved

session_end: 2026-04-07T13:30:00Z"
```

### STEP 4 — Minimum verification

```
[ ] STATUS.md reflects the current state of all active missions
[ ] No uncommitted work that should persist
[ ] In-progress missions have divergence_log up to date
[ ] Next steps documented in active missions
[ ] git push completed and confirmed
```

### STEP 5 — Closing declaration

```
SESSION CLOSED
Agent: {name}
Timestamp: {YYYY-MM-DDTHH:MM:SSZ}
Active missions at close: {list or "none"}
Recommended next step: {one line}
```

---

## Minimum version (emergency close)

When the session is about to be interrupted without time for a full close:

```bash
git add -A && git commit -m "session({agent}): emergency close — {timestamp}" && git push origin main
```

**Without this minimum, there is no valid close.**

---

## Why this protocol matters

Without P-006, every session starts from scratch with only what is in git.

The agent lifecycle is:
```
BOOT (P-001) → load identity from repo
    ↓
EXECUTE (P-003) → execute missions
    ↓
COMMIT (P-006) → persist knowledge to repo  ← this protocol
    ↓
(next session) → BOOT loads what P-006 left
```

**COMMIT is the most critical moment of the cycle.** Knowledge that is not committed disappears when the session ends. There is no gradual amnesia — there is total loss.

---

## Epistemic value

Every session close is an act of converting ephemeral experience into institutional memory. The agent that closes well leaves the next agent smarter than itself.

## Pragmatic value

- Zero knowledge loss between sessions
- Full continuity if infrastructure fails
- Complete audit of what agent did what and when
- The Archive Summa is a faithful reflection of the system at all times

---

## Version history

- v1.0.0 (2026-04-07) — Initial creation (Alquimista-01 proposal + Nimrod validation).
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).

*Next review: 2026-07-07*
