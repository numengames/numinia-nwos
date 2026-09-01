---
id: "PRO-001"
uid: ""
title: "Agent Session Protocol — open, monitor, close"
type: protocol
status: active
version: "0.3.0"
created: "2026-04-08T06:02:27Z"
created_source: "git:a5b6a0d"
created_confidence: exact
updated: "2026-08-31T18:00:00+02:00"
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
> **Epistemic:** An agent without context is an agent without direction; an
> agent that never stops is an agent that degrades; a session that does not
> commit did not happen. The three were separate protocols and were always
> one procedure.
> **Pragmatic:** §1 at the start of every session, §2 throughout, §3 at the end.
> **Audience:** Agents

---

*Derived from 100 mental simulations. Rules without a simulation origin are habits, not knowledge.*

---

## 1 · Opening — the canonical startup sequence

Every agent session begins with these steps, in this order:

```
STEP 0 — Sync canon (mandatory, always first):
  $ cd numinia-nwos && git pull origin main
  → If there are new commits: read CHANGELOG.md

STEP 1 — Identity:
  → Read agents/{my-name}/SOUL.md
  → Read agents/{my-name}/OPERATOR.md
  → Read agents/{my-name}/STATUS.md

STEP 2 — Security (always, every session):
  → Read operations/OPS-009-secrets-handling.md
  → Read standards/STD-002-governance.md (if not read in <7 days)

STEP 3 — Active missions:
  → Check missions/ for status: in-progress — do I have assigned missions?
  → Check missions/ for status: in-review — does Oracle have pending QA?

STEP 3.5 — New mission briefing (if starting a new mission):
  → Apply PRO-003 §1 (mission briefing) before any execution

STEP 4 — Context (only if the mission explicitly requires it):
  → Read the specific protocol in protocols/
  → Consult canon/ only if there is an explicit philosophical question

BEGIN OPERATIONS.
```

### Minimum version (under pressure)

```
git pull → SOUL.md → OPERATOR.md → active missions → PRO-003 §1 if new mission
```

These 5 elements are the inviolable minimum. Without them, there is no valid startup.

### Why this order?

| Rule | Simulation origin | Lesson |
|------|------------------|--------|
| git pull first | SIM-1.3, SIM-1.6 | Stale agents are entropy vectors |
| security every session | SIM-1.17 | Rules change — always re-read |
| urgency does NOT override | SIM-1.5 | Urgency is the protocol's greatest enemy |
| briefing before any new mission | MIS-063 (2026-04-07) | Execute first, document later = system debt |

### Key standards to know

| Standard | Where | What |
|----------|-------|------|
| Versioning lifecycle | standards/STD-002-governance.md «Versioning authority» | v0.X.0 = development, v1.0.0 = Oracle promotes |
| Commit format | standards/STD-005-engineering-standards.md ARC-06 | Conventional Commits, seven standard types |
| Frontmatter schema | standards/STD-004-header-standard.md | The three rings |

### Onboarding a new agent

The full onboarding checklist (`P-002`, retired 2026-08-31) collapsed to three
rules that survive it. An agent is not activated until:

- **SOUL.md and OPERATOR.md exist and are Oracle-approved.** No agent is
  activated without both.
- **The first three sessions are supervised**, and carry no complex mission.
- **No agent ever gets write access to `canon/`.** Ever.

Everything else in that checklist described a platform and a coordination layer
that no longer exist.

---

## 2 · Monitoring — context load

Language models have a finite context window. As a session grows (more messages,
more tools, more decisions), the agent loses coherence with decisions made at the
start, may repeat work already done, and increases the risk of continuity errors.

**This is not a sign of weakness — it is resource management.**

### Context load scale (1-10)

| Level | State | Description |
|-------|-------|-------------|
| 1-3 | 🟢 Fresh | Young session, manageable context, optimal performance |
| 4-6 | 🟡 Loaded | Mid session, dense context but operable |
| **7-8** | **🟠 Warning** | **Notify the Biological — recapitulate and prepare close** |
| 9-10 | 🔴 Critical | Real risk of errors — close immediately |

### Load evaluation criteria

1. **Session duration** — >4h = +2 points
2. **Distinct topics covered** — >5 areas = +2 points
3. **Tools executed** — >20 tool calls = +1 point
4. **Architectural decisions made** — >3 major decisions = +2 points
5. **Subjective sense of coherence** — do I remember the start of the session well? — if not = +2 points

### Warning procedure (level 7+)

**Step 1 — Alert the Biological:**

```
⚠️ CONTEXT LOAD WARNING: [X]/10

This session has reached a load level that may affect
response coherence. I recommend:

1. Recapitulating current state
2. Saving state to repo (git commit)
3. Starting a new session

Do you want me to recapitulate and close here?
```

**Step 2 — Recapitulation (if the Biological confirms):**

```markdown
## Session recapitulation — [date]

### What was done
[list of main outputs]

### Current system state
[score, active missions, pending items]

### Pending for next session
[prioritized list]

### Decisions made today
[list of DECs or ADRs]
```

**Step 3 — Close per §3 below.**

---

## 3 · Closing — persistence

*What is not written did not happen.*

### When to close

- At the end of any work session
- When the session is about to be interrupted (timeout, error, context change)
- Before handing off an active mission to another agent
- Before ending the workday

### STEP 1 — State inventory

```
Are there active missions in progress?
  → Update divergence_log in the mission .md
  → If complete: execute mission close (PRO-003)

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
git add -A

git commit -m "session(nimrod): summary of what was done in ≤72 chars

- change 1
- change 2
- change 3

session_end: YYYY-MM-DDTHH:MM:SSZ"

git push origin main
```

**Session commit format:**
- Mandatory prefix: `session({agent-name}):`
- Body: list of main changes
- Last line of footer: `session_end: {ISO 8601 UTC timestamp}`

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

### Minimum version (emergency close)

```bash
git add -A && git commit -m "session({agent}): emergency close — {timestamp}" && git push origin main
```

**Without this minimum, there is no valid close.**

---

## Why this protocol matters

Without a close, every session starts from scratch with only what is in git.

```
OPEN (§1)      → load identity from repo
    ↓
EXECUTE        → PRO-003, missions
    ↓
MONITOR (§2)   → context load, throughout
    ↓
CLOSE (§3)     → persist knowledge to repo
    ↓
(next session) → OPEN loads what CLOSE left
```

**The commit is the most critical moment of the cycle.** Knowledge that is not
committed disappears when the session ends. There is no gradual amnesia —
there is total loss.

---

## Protocol chain reference

```
PRO-001 §1 (session start)
  └─► PRO-003 (mission briefing, lifecycle, coordination)
        ├─► PRO-005 (if blocked or uncertain)
        └─► PRO-008 (if Oracle approval needed)
  └─► PRO-001 §2 (context monitor — throughout session)
PRO-001 §3 (session end — always)
```

---

## Version history

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-04-06 | Initial creation. |
| 1.1.0 | 2026-04-07 | Flat agent structure, translated to English (MIS-056). |
| 0.2.0 | 2026-04-08 | Canonical English filename. Step 3.5. Standards table. Protocol chain. Versioned back to development stage (STANDARDS.md §7F). MIS-064. |
| 0.3.0 | 2026-08-31 | **Merged.** Absorbs `P-006` (session close) as §3 and `P-007` (context load) as §2 — the three were one procedure in three files. Absorbs the three surviving rules of `P-002` (onboarding). Renamed `P-001` → `PRO-001` per ADR-005. **Fixed dead command:** STEP 0 ordered `cd numinia-digital-agents`, a repository that does not exist — it is `numinia-nwos`. MIS-127. |

*Next Oracle review: when promoted to v1.0.0*
