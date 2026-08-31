---
id: "PRO-003"
uid: ""
title: "Mission Protocol — briefing, cycle, coordination"
type: protocol
status: active
version: "4.0.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-08-31T18:00:00+02:00"
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
> **Pragmatic:** §1 before touching anything, §2–§3 while working, §4 when more
> than one agent is involved.
> **Audience:** Agents

---

## 1 · Briefing — before any execution

> **Mission first. Execution after.**
>
> No agent executes any work without first completing this briefing.
> This rule has no exceptions.

Established lesson (2026-04-07): an agent executed MIS-063 without registering it
as a mission first. The work was correct but the system record was created
retroactively. This section prevents that from happening again.

**When to apply:** a new mission is assigned (by Oracle or self-identified); a
mission arrives via chat, file, or verbal instruction; an existing mission is
reactivated after freeze.

### Step 1 — Register the mission

Before reading the briefing, the mission must exist in the repo.

```
IF missions/MIS-NNN-*.md does not exist:
  CREATE it following the frontmatter schema (S-004)
  SET status: backlog
  COMMIT to repo
  THEN proceed to Step 2

IF it exists with status: backlog:
  SET status: in-progress, set started timestamp
  COMMIT to repo
  THEN proceed to Step 2
```

**Never start Step 2 before Step 1 is committed.**

### Step 2 — Read the mission document

Read the full mission file. Identify:

| Field | What to extract |
|-------|----------------|
| `title` | What is this mission? |
| `priority` | How urgent? |
| `effort` | How much work? |
| `acceptance criteria` | What does done look like? |
| `blocked_by` | Any external dependencies? |
| `assigned_to` | Who executes? (must be me or unassigned) |

### Step 3 — Identify dependencies and blockers

- Does this mission depend on another mission? → Read that mission's status
- Does it require external input (API key, access, decision)? → Flag before starting
- Does it conflict with another active mission? → Escalate via PRO-005

If blocked: set `status: frozen`, document `freeze_reason`, notify Oracle via PRO-005.

### Step 4 — Confirm understanding (internal)

1. **What is the deliverable?** (Specific artifact — file, code, document, decision)
2. **What does done look like?** (All acceptance criteria checked)
3. **What is the first concrete action?** (Not "research" — an actual tool call or file write)

If any answer is unclear: **ask the Oracle before proceeding** (PRO-005 if score ≥ 5).

### Step 5 — Signal start (optional but recommended)

For missions of effort M or above, or when working with the Oracle in a live session:

```
"Starting MIS-NNN — [title]. Estimated: [effort]. First action: [specific action]."
```

For effort XS/S or background work: silent start is acceptable.

### Briefing checklist

```
□ Mission registered in repo
□ Status updated to in-progress
□ Acceptance criteria read and understood
□ Dependencies checked
□ Blockers identified (or confirmed none)
□ Deliverable clear
□ First action identified
□ Start signaled (if effort M+)
```

### Anti-patterns

| Anti-pattern | Consequence | Correct behavior |
|-------------|-------------|-----------------|
| Execute first, register later | System record is retroactive fiction | Always register before executing |
| Assume scope from title only | Misaligned deliverable | Read full mission file |
| Start without checking blockers | Wasted effort on blocked work | Check Step 3 |
| Skip for "quick" tasks | Quick tasks are 80% of where errors happen | All tasks follow §1 |

---

## 2 · States and identity

All missions live in the flat `missions/` folder (MIS-066). **The `status:`
frontmatter field is the only state surface** — there are no status directories
and no index file; the board at numinia.org/missions is built from the folder on
every deploy.

```
draft → backlog → in-progress → in-review → done | cancelled
                       ↑______________|  (Oracle requests changes)

frozen ←— from any non-terminal state (Oracle decision)
  ↓
backlog — when unfrozen
```

| State | Who sets it |
|-------|-------------|
| `draft` | Author (brief not yet approved) |
| `backlog` | Oracle |
| `in-progress` | Executor agent |
| `in-review` | Executor agent |
| `done` | Oracle |
| `frozen` | Oracle |
| `cancelled` | Oracle |

### Mission IDs

**Format:** `MIS-NNN` — 3 digits, zero-padded. Max 999.
**Sub-missions:** `MIS-NNN.N` — parent ID + dot + child index (1-9).

**Before assigning any ID:** list `missions/` to verify the next available
number, against what is COMMITTED after a `git pull`, not the working tree.
If you cannot verify: do not assign.

---

## 3 · The cycle

### Creating a mission (Oracle)

1. Use TEMPLATE.md — PRs rejected without correct format
2. Fill all required frontmatter fields including `uid` (UUID v7)
3. **Before assigning an ID: verify the repo first**
4. Set `status: backlog` (or `draft` if the brief is not yet approved)
5. Create as `missions/{mission-id}-{english-slug}.md`
6. Commit and open PR to main

### Activating a mission (Oracle)

1. Set `status: in-progress`
2. Set `assigned_to: {agent-id}` — only ONE executor
3. Set `started: {YYYY-MM-DDTHH:MM:SSZ}`
4. Commit and merge

### Executing a mission (Executor agent)

1. Complete §1 briefing
2. Read the mission completely
3. Verify there are no contradictions with canon/ (if there are, escalate via PRO-005)
4. Execute
5. Document progress in the mission file
6. If the plan changes, document in the mission's version history

### Requesting review (Executor agent)

1. Verify ALL acceptance criteria are met
2. Fill Real execution section
3. Set `status: in-review`, set `in_review_at`
4. File a PRO-008 approval request (score appropriate to mission)
5. Commit and notify Oracle

### Completing a mission (Oracle)

1. Oracle reviews the mission (`status: in-review`)
2. If approved: set `status: done`, set `completed` — the file is immutable from this point
3. If changes requested: set `status: in-progress`

### Freezing a mission (Oracle)

1. Set `status: frozen`
2. Fill `freeze_reason` in frontmatter
3. Mission stays visible in the board's Frozen section
4. To unfreeze: set `status: backlog`, clear `freeze_reason`

### Critical rules

- A mission with `status: done` is immutable once merged — never edit
  (Oracle-authorised exceptions must be recorded, cf. the MIS-066 language sweep)
- Only the executor edits a mission in progress (SIM-2.13)
- A cancelled mission keeps its file with `status: cancelled` — NEVER deleted (SIM-2.7)
- **Never assign a mission ID without verifying the repo first**
- A parent mission cannot be Done if any sub-mission is not Done or Cancelled

---

## 4 · Coordination between agents

**Reads are safe. Writes require coordination.** Concurrency breaks on writes,
not reads (SIM-1.8).

Agents communicate through the repository. There are no real-time channels
between agents.

- **Primary channel:** git commits and PRs
- **Secondary channel:** annotations in shared mission files
- **Escalation channel:** Oracle (PRO-005)

### When two agents work on related things

1. **Only one executor per active mission.** If collaboration is needed, declare
   it explicitly in the frontmatter: `executor: nimrod, adonaz`
2. **Divide into sub-missions** — each agent has its own mission
3. **Use dependencies** — `depends_on: [MIS-NNN]` to establish order

### When another agent needs something from me

1. Update my STATUS.md with current state
2. Document blockers in my active missions
3. Agents do not directly assign each other tasks — the Oracle assigns

### Conflict resolution

1. The repository (`git pull`) is the source of truth — always
2. If there is ambiguity: do not act, escalate (PRO-005)
3. Never overwrite another agent's work without explicit coordination

### ID collision

If two agents claim the same ID, whoever committed first keeps it; the second
renumbers theirs and fixes their references. (Rule born from the double
collision MIS-090/MIS-091 on 2026-08-18, resolved by renumbering to
MIS-092/MIS-093.)

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation.
- v1.1.0 (2026-04-07) — Added ID verification rule. Translated to English (MIS-056).
- v2.0.0 (2026-04-07) — Full rewrite for Mission System v2: new states, folders, IDs, sub-missions, review cycle. (MIS-062)
- v3.0.0 (2026-08-17) — Flat missions/ folder: status lives only in frontmatter, no status directories, no index file. States renamed todo→backlog, freeze→frozen; draft added. (MIS-066)
- v4.0.0 (2026-08-31) — **Merged.** Absorbs `P-009` (mission briefing) as §1 — it declared itself a dependency of this protocol — and `P-004` (inter-agent communication) as §4. Renamed `P-003` → `PRO-003` per ADR-005. References to a coordination agent that was never activated removed; the Oracle assigns. `P-009`'s queue/active folder instructions dropped: those folders no longer exist since v3.0.0. MIS-127.
