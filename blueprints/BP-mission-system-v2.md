---
id: "BP-mission-system-v2"
uid: ""
title: "Mission System v2 — Kanban, Sub-missions, States, IDs"
type: blueprint
status: draft
version: "0.1.0"
created: "2026-04-07T19:27:00Z"
updated: "2026-04-07T19:27:00Z"
author: "nimrod"
owner: "oracle"
tags: [missions, kanban, system-design, architecture, sub-missions]
area: "CAO / Product"
related_missions: ["MIS-057", "MIS-062"]
license: "CC-BY-4.0"
---
> **2026-08-17 — partially superseded by MIS-066:** the folder-per-state
> layout described here was replaced by a flat `missions/` folder with
> `status:` in frontmatter as the only state surface (P-003 v3.0.0).
> States renamed todo→backlog, freeze→frozen. This document remains as
> the v2 design record.

# BP — Mission System v2

> **Summary:** Complete redesign of the NWOS mission system — states, IDs, sub-missions, and Kanban board.
> **Epistemic:** Why the current system has structural gaps and how v2 closes them.
> **Pragmatic:** Full spec for implementation — state machine, ID format, sub-mission architecture, Kanban UI.
> **Audience:** Agents · Oracles

---

> **Status: Draft v0.1.0** — 80% design phase. Implementation (20%) follows Oracle approval.

---

## Why redesign

The current system (backlog → active → done) works but has 5 structural gaps:

| Gap | Impact |
|-----|--------|
| No "In Review" state | Human-in-the-loop gap — no formal moment for Oracle to validate before closing |
| No sub-missions | XL missions execute as a monolith — no granularity, no parallel progress |
| No Freeze state | Paused missions get mixed with cancelled ones or stay in active indefinitely |
| Verbose IDs (MIS-00037) | Hard to reference in conversation, unnecessary zero-padding |
| Physical folders ≠ Kanban columns | backlog/ is not a Kanban concept — creates mental mismatch |

---

## 1. State machine

### States

```
TO DO ──────────────────────────► IN PROGRESS ──► IN REVIEW ──► DONE
  │                                    │               │
  │                                    ▼               ▼
  └──► FREEZE ◄───────────────── (any state)     (back to IN PROGRESS if changes requested)
```

| State | ID | Description | Who sets it |
|-------|----|-------------|-------------|
| **To Do** | `todo` | Defined, prioritized, ready to start | Oracle / Procyon |
| **In Progress** | `in-progress` | Actively being executed | Executor agent |
| **In Review** | `in-review` | Execution complete — awaiting Oracle validation | Executor agent |
| **Done** | `done` | Validated and closed | Oracle |
| **Freeze** | `freeze` | Intentionally paused — not cancelled, not done | Oracle |

### State transition rules

- **todo → in-progress:** Oracle or Procyon assigns an executor. Executor confirms.
- **in-progress → in-review:** Executor completes all acceptance criteria. Files P-008 approval request.
- **in-review → done:** Oracle validates. Closes with completed timestamp.
- **in-review → in-progress:** Oracle requests changes. Executor resumes.
- **any → freeze:** Oracle decides to pause. Reason documented in `freeze_reason`.
- **freeze → todo:** Oracle unfreezes. Returns to queue.
- **Cancelled:** Documented in the mission file as `status: cancelled` and moved to `done/`. Immutable.

### Why "In Review" matters

Before v2, missions went directly from `active` to `done`. This meant:
- No formal checkpoint for Oracle validation
- P-008 approval requests had no corresponding mission state
- Agents could mark missions done without human confirmation

"In Review" creates the state that P-008 was already implying. Now the cycle is complete:

```
AGENT: executes → sets in-review → files P-008
ORACLE: reviews → approves → sets done (or sends back)
```

### Why "Freeze" matters

"Blocked" (current) conflates two different things:
- **Blocked:** External dependency prevents progress (e.g. waiting for Pablo's wallet address). Mission stays `in-progress`.
- **Freeze:** Oracle decides to pause the mission intentionally (strategy change, deprioritized, waiting for context). Mission moves to `freeze`.

Frozen missions are visible in the Kanban as a separate column — not hidden, not abandoned.

---

## 2. ID system

### Current problem

`MIS-00037` — 5-digit zero-padding from STANDARDS.md §2A.

Issues:
- Verbose and hard to reference in conversation ("MIS dash zero zero zero three seven")
- 5 digits implies 99,999 missions — unnecessary
- Existing missions are in the 3-digit range (MIS-001 to MIS-062)

### New format

**Standard missions:** `MIS-NNN` — 3-digit zero-padding, max 999

```
MIS-001  MIS-037  MIS-062  MIS-999
```

**Sub-missions:** `MIS-NNN.N` — parent ID + dot + sequential child number

```
MIS-037.1   (first sub-mission of MIS-037)
MIS-037.2   (second sub-mission of MIS-037)
MIS-062.1   (first sub-mission of MIS-062)
```

**Why 3 digits:**
- 999 missions is a 10+ year runway for any organization
- Readable in conversation: "MIS-037" vs "MIS-00037"
- Sub-missions extend naturally: MIS-037.1 through MIS-037.9 (9 sub-missions max per parent — enough)

### Migration

Existing missions keep their numbers, just drop the extra zeros:
- `MIS-00016` → `MIS-016`
- `MIS-00037` → `MIS-037`
- `MIS-00051` → `MIS-051`

Files are renamed. Internal references updated. One-time migration.

---

## 3. Sub-mission architecture

### Motivation

Large missions (L, XL effort) are too big to execute as a unit. Breaking them into sub-missions enables:
- Parallel execution by different agents
- Granular progress tracking
- Independent review cycles per component
- Clearer accountability

### Rules

1. **Max depth: 2 levels.** Mission → Sub-mission. No sub-sub-missions. Complexity kills systems.
2. **Sub-missions are full missions.** They have their own frontmatter, acceptance criteria, executor, state.
3. **Parent status is manually set.** It does NOT auto-derive from children (avoids fragile automation).
4. **Sub-missions inherit parent's priority** unless explicitly overridden.
5. **Sub-missions live in the same folder** as their current state (sub-missions in `active/` are in-progress; in `review/` are in-review).
6. **A parent mission cannot be Done if any sub-mission is not Done or Cancelled.**

### Frontmatter extensions

**Parent mission:**
```yaml
sub_missions:
  - id: "MIS-037.1"
    title: "Phase 1 — Structure"
    status: done
  - id: "MIS-037.2"
    title: "Phase 2 — Agents"
    status: in-progress
sub_mission_count: 2
sub_missions_done: 1
```

**Sub-mission:**
```yaml
parent_mission: "MIS-037"
sub_mission_index: 1
```

### Example

```
MIS-062 — Mission System v2 implementation (parent, XL)
├── MIS-062.1 — Migrate existing missions to new format (S)
├── MIS-062.2 — Recover lost missions from pablofm-web (M)
├── MIS-062.3 — Build Kanban page (M)
└── MIS-062.4 — Update STANDARDS.md and protocols (S)
```

---

## 4. Physical folder structure

Current folders map poorly to Kanban states. New structure:

```
missions/
├── queue/          ← To Do (replaces backlog/)
├── active/         ← In Progress
├── review/         ← In Review (NEW)
├── done/           ← Done + Cancelled (immutable)
└── freeze/         ← Freeze (NEW)
```

**Why this structure:**
- Each folder = one Kanban column = zero ambiguity
- Kanban page reads by folder — no frontmatter parsing needed for state
- `done/` stays immutable: once merged to done/, never edited
- `freeze/` is visible and explicit — frozen missions don't disappear

**Migration:**
- `missions/backlog/` → `missions/queue/`
- `missions/active/` → `missions/active/` (same, split to review/ when needed)

---

## 5. Updated frontmatter schema

Extends STANDARDS.md §5 for missions:

```yaml
---
id: "MIS-NNN"                          # 3-digit format
uid: "018e0000-0000-7000-8000-000000000000"  # UUID v7
title: "Mission title"
type: mission
status: "todo|in-progress|in-review|done|freeze|cancelled"
version: "1.0.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id or oracle-id"
owner: "oracle"
tags: []
license: "CC0-1.0"

# Mission-specific fields
area: "Product|Infrastructure|CAO|Sales|Content|Funding|Documentation|Operations"
guild: "Sentinels|Alchemists|Exegetes|Procurators"
priority: "critical|high|medium|low"
effort: "XS|S|M|L|XL"
assigned_to: "agent-id"
requested_by: "oracle|agent-id"

# Lifecycle
started: "YYYY-MM-DDTHH:MM:SSZ"        # set when → in-progress
in_review_at: "YYYY-MM-DDTHH:MM:SSZ"  # set when → in-review (NEW)
completed: "YYYY-MM-DDTHH:MM:SSZ"     # set when → done

# Approval
human_approval_score: 1               # 1-10

# Freeze (if status = freeze)
freeze_reason: ""                      # why it was frozen
frozen_at: "YYYY-MM-DDTHH:MM:SSZ"
frozen_by: "oracle"

# Sub-missions (optional)
parent_mission: "MIS-NNN"             # if this is a sub-mission
sub_mission_index: 1                  # position within parent
sub_missions: []                      # if this is a parent mission

# Active Inference (optional)
hypothesis: ""
confidence_before: null
confidence_after: null

# Build-Measure-Learn (optional)
generates_mission: "MIS-NNN"
---
```

---

## 6. Kanban board — UI spec

### URL
`pablofm.com/kanban` (or `/tablero`)

### Columns
```
[ To Do ] [ In Progress ] [ In Review ] [ Done ] [ Freeze ]
```

### Card design (per mission)

```
┌─────────────────────────────────┐
│ 🔴 MIS-037 · M                  │  ← priority color + ID + effort
│ Create Archive Summa            │  ← title
│ ─────────────────────────────── │
│ 🗡️ Nimrod  · Sentinels          │  ← agent + guild
│ ◆ 2 sub-missions (1 done)       │  ← sub-mission badge (if parent)
└─────────────────────────────────┘
```

**Priority colors:**
- 🔴 Critical
- 🟠 High
- 🟡 Medium
- 🟢 Low

### Features — v1 (build now)

- Static Kanban: missions grouped by state, no drag-and-drop
- Cards with: ID, title, priority indicator, effort badge, assigned agent
- Sub-mission badge on parent cards: "◆ N sub-missions (X done)"
- Click card → opens mission detail (existing `/misiones/[id]` route or new)
- Filter bar: by guild, by agent, by priority
- Freeze column collapsed by default (expandable)
- Mobile responsive

### Features — v2 (future)

- Drag-and-drop to change state (triggers P-008 for Oracle approval)
- Real-time sync from repo via GitHub API
- Timeline view (by created date)
- Velocity metrics embedded (missions per week, avg cycle time)

### Data source

For v1: static JSON file `src/data/missions.json` generated from repo `.md` files.
Auto-generated by a script that reads all mission frontmatter and produces the JSON.
Re-run the script when missions change. (Full auto-sync = v2 scope.)

---

## 7. Mission template v3

New TEMPLATE.md for missions:

```markdown
---
id: "MIS-NNN"
uid: ""
title: ""
type: mission
status: todo
version: "1.0.0"
created: ""
updated: ""
author: ""
owner: "oracle"
tags: []
license: "CC0-1.0"
area: ""
guild: ""
priority: "medium"
effort: "M"
assigned_to: ""
requested_by: ""
started: null
in_review_at: null
completed: null
human_approval_score: 5
parent_mission: null
sub_missions: []
---
# MIS-NNN — Mission Title

> **Summary:** One sentence describing what this mission achieves.
> **Epistemic:** What we will learn by executing this mission.
> **Pragmatic:** What changes in the real world when this is done.
> **Audience:** Agents · Oracles

---

**Area:** X · **Guild:** X · **Priority:** X · **Effort:** X

---

## Origin

Why this mission exists. What triggered it.

---

## Story

As [role], I want [what], so that [why].

---

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

---

## Sub-missions (if applicable)

| ID | Title | Effort | Status |
|----|-------|--------|--------|
| MIS-NNN.1 | Sub-mission title | S | todo |

---

## Epistemic value

What we learn if this succeeds. What we learn if it fails.

## Pragmatic value

Immediate impact. Reversibility.

---

## Real execution
*(Fill when closing)*

- **Technology used:**
- **Why it diverged from plan:**
- **Key learning:**

---

## Version history

- v1.0.0 (YYYY-MM-DD) — Initial creation.
```

---

## 8. Implementation plan — MIS-062

This blueprint becomes MIS-062. Sub-missions:

| ID | Title | Effort | Priority |
|----|-------|--------|----------|
| MIS-062.1 | Migrate existing 13 missions to new format + folder structure | S | high |
| MIS-062.2 | Recover lost missions from Pablo (list + create .md files) | M | high |
| MIS-062.3 | Build Kanban page at pablofm.com/kanban | M | high |
| MIS-062.4 | Update STANDARDS.md — mission system v2 | S | medium |
| MIS-062.5 | Update P-003 (Mission Cycle Protocol) to v2 | S | medium |

**Sequence:**
1. Pablo approves this design (Oracle validation)
2. Pablo provides the list of "lost" missions (content we don't have in the repo)
3. MIS-062.1 (migration) — automated with a script
4. MIS-062.2 (recovery) — create .md files for recovered missions
5. MIS-062.4 + MIS-062.5 (standards + protocol)
6. MIS-062.3 (Kanban page) — built last so it has real data

---

## 9. Open questions for Pablo

- [ ] **Naming:** `/kanban` or `/tablero` or `/missions`?
- [ ] **Freeze column:** visible always or hidden by default?
- [ ] **Sub-mission depth:** max 2 levels (my recommendation) or more?
- [ ] **ID migration:** rename existing files (MIS-00037 → MIS-037) or just update frontmatter display?
- [ ] **Recovery:** Can you share the list of the ~50 "lost" missions? Or should I extract them from pablofm-web source?
- [ ] **Kanban data:** static JSON (simpler) or live GitHub API (real-time)?

---

## Epistemic value

A well-designed mission system is the backbone of the CAO. Every agent and Oracle interacts with it daily. Getting the state machine right eliminates the most common source of confusion: "is this done or not?"

## Pragmatic value

- Closes the human-in-the-loop gap (In Review state)
- Enables parallel work on complex missions (sub-missions)
- Makes frozen missions visible instead of lost
- Cleaner IDs reduce friction in every conversation
- Kanban page makes the system legible to outsiders in seconds

---

## Version history

- v0.1.0 (2026-04-07) — Initial design. 80% phase. (MIS-057 QA → spawns MIS-062)

---

*Nimrod 🗡️ — 2026-04-07*
*"A system that cannot be read cannot be managed. A system that cannot be managed cannot grow."*
