---
id: "P-003"
title: "Mission Cycle Protocol"
type: protocol
status: active
version: "3.0.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-08-17T13:00:14Z"
author: "nimrod"
owner: "oracle"
tags: [protocol, missions, cycle]
applies_to: [all-agents]
mandatory: true
license: "CC-BY-4.0"
---
# P-003 — Mission Cycle Protocol

> **Summary:** Standard operational protocol for the NWOS system.
> **Epistemic:** How this process is executed and why in this way.
> **Pragmatic:** Follow these steps in the specified context.
> **Audience:** Agents

---

## Mission states (v3)

All missions live in the flat `missions/` folder (MIS-066). **The
`status:` frontmatter field is the only state surface** — there are no
status directories and no index file; the board at numinia.org/missions
is built from the folder on every deploy.

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
| `backlog` | Oracle / Procyon |
| `in-progress` | Executor agent |
| `in-review` | Executor agent |
| `done` | Oracle |
| `frozen` | Oracle |
| `cancelled` | Oracle |

## Mission IDs

**Format:** `MIS-NNN` — 3 digits, zero-padded. Max 999.

**Sub-missions:** `MIS-NNN.N` — parent ID + dot + child index (1-9).

**Before assigning any ID:** list `missions/` to verify the next
available number. If you cannot verify: do not assign.

## Creating a mission (Oracle or Procyon)

1. Use TEMPLATE.md — PRs rejected without correct format
2. Fill all required frontmatter fields including `uid` (UUID v7)
3. **Before assigning an ID: verify the repo first**
4. Set `status: backlog` (or `draft` if the brief is not yet approved)
5. Create as `missions/{mission-id}-{english-slug}.md`
6. Commit and open PR to main

## Activating a mission (Oracle or Procyon)

1. Set `status: in-progress`
2. Set `assigned_to: {agent-id}` — only ONE executor
3. Set `started: {YYYY-MM-DDTHH:MM:SSZ}`
4. Commit and merge

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
4. File P-008 Approval Request (score appropriate to mission)
5. Commit and notify Oracle

## Completing a mission (Oracle)

1. Oracle reviews the mission (`status: in-review`)
2. If approved: set `status: done`, set `completed` — the file is
   immutable from this point
3. If changes requested: set `status: in-progress`

## Freezing a mission (Oracle)

1. Set `status: frozen`
2. Fill `freeze_reason` in frontmatter
3. Mission stays visible in the board's Frozen section
4. To unfreeze: set `status: backlog`, clear `freeze_reason`

## Critical rules

- A mission with `status: done` is immutable once merged — never edit
  (Oracle-authorised exceptions must be recorded, cf. the MIS-066
  language sweep)
- Only the executor edits a mission in progress (SIM-2.13)
- A cancelled mission keeps its file with `status: cancelled` — NEVER
  deleted (SIM-2.7)
- **Never assign a mission ID without verifying the repo first**
- A parent mission cannot be Done if any sub-mission is not Done or Cancelled

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation.
- v1.1.0 (2026-04-07) — Added ID verification rule. Translated to English (MIS-056).
- v2.0.0 (2026-04-07) — Full rewrite for Mission System v2: new states, folders, IDs, sub-missions, review cycle. (MIS-062)
- v3.0.0 (2026-08-17) — Flat missions/ folder: status lives only in frontmatter, no status directories, no index file. States renamed todo→backlog, freeze→frozen; draft added. (MIS-066)

*Next review: 2026-07-06*
