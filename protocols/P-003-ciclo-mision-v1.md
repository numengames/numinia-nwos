---
id: "P-003"
title: "Mission Cycle Protocol"
type: protocol
status: active
version: "2.0.0"
created: "2026-04-06T00:00:00Z"
updated: "2026-04-07T19:50:00Z"
author: "nimrod"
owner: "oracle"
tags: [protocol, missions, cycle]
applies_to: [all-agents]
mandatory: true
license: "CC-BY-4.0"
---
# P-003 — Mission Cycle Protocol v1

> **Summary:** Standard operational protocol for the NWOS system.
> **Epistemic:** How this process is executed and why in this way.
> **Pragmatic:** Follow these steps in the specified context.
> **Audience:** Agents

---

## Mission states (v2)

```
queue/ (todo)
  ↓
active/ (in-progress)
  ↓
review/ (in-review) ←————————— (Oracle requests changes)
  ↓
done/ (done | cancelled) — immutable

freeze/ (freeze) ←— from any state (Oracle decision)
  ↓
queue/ (todo) — when unfrozen
```

| State | Folder | Who sets it |
|-------|--------|-------------|
| `todo` | `queue/` | Oracle / Procyon |
| `in-progress` | `active/` | Executor agent |
| `in-review` | `review/` | Executor agent |
| `done` | `done/` | Oracle |
| `freeze` | `freeze/` | Oracle |
| `cancelled` | `done/` | Oracle |

## Mission IDs

**Format:** `MIS-NNN` — 3 digits, zero-padded. Max 999.

**Sub-missions:** `MIS-NNN.N` — parent ID + dot + child index (1-9).

**Before assigning any ID:** list `missions/active/`, `missions/queue/`, and `missions/review/` to verify the next available number. If you cannot verify: do not assign.

## Creating a mission (Oracle or Procyon)

1. Use TEMPLATE.md — PRs rejected without correct format
2. Fill all required frontmatter fields including `uid` (UUID v7)
3. **Before assigning an ID: verify the repo first**
4. Set `status: todo`
5. Create in `missions/queue/{mission-id}-{slug}.md`
6. Commit and open PR to main

## Activating a mission (Oracle or Procyon)

1. Move file from `queue/` to `active/`
2. Set `status: in-progress`
3. Set `assigned_to: {agent-id}` — only ONE executor
4. Set `started: {YYYY-MM-DDTHH:MM:SSZ}`
5. Commit and merge

## Executing a mission (Executor agent)

1. Read the mission completely
2. Verify there are no contradictions with canon/ (if there are, escalate via P-005)
3. Execute
4. Document progress in the mission file
5. If the plan changes, document in the mission’s version history

## Requesting review (Executor agent)

1. Verify ALL acceptance criteria are met
2. Fill Real execution section
3. Set `status: in-review`, set `in_review_at`
4. Move file from `active/` to `review/`
5. File P-008 Approval Request (score appropriate to mission)
6. Commit and notify Oracle

## Completing a mission (Oracle)

1. Oracle reviews the mission in `review/`
2. If approved: set `status: done`, set `completed`
3. Move file from `review/` to `done/`
4. Merge — `done/` is immutable from this point
5. If changes requested: move back to `active/`, set `status: in-progress`

## Freezing a mission (Oracle)

1. Move file to `freeze/`
2. Set `status: freeze`
3. Fill `freeze_reason` in frontmatter
4. Mission stays visible in Kanban’s Freeze column
5. To unfreeze: move back to `queue/`, set `status: todo`, clear `freeze_reason`

## Critical rules

- `done/` files are immutable once merged — never edit
- Only the executor edits a mission in progress (SIM-2.13)
- A cancelled mission goes to `done/` with `status: cancelled` — NEVER deleted (SIM-2.7)
- **Never assign a mission ID without verifying the repo first**
- A parent mission cannot be Done if any sub-mission is not Done or Cancelled

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation.
- v1.1.0 (2026-04-07) — Added ID verification rule. Translated to English (MIS-056).
- v2.0.0 (2026-04-07) — Full rewrite for Mission System v2: new states, folders, IDs, sub-missions, review cycle. (MIS-062)

*Next review: 2026-07-06*
