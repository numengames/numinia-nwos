---
id: "MIS-062"
uid: "018ef820-0062-7000-8000-000000000062"
title: "Mission System v2 — States, Sub-missions, IDs, Kanban"
type: mission
status: in-progress
version: "1.0.0"
created: "2026-04-07T19:43:00Z"
updated: "2026-04-07T19:43:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [missions, kanban, system-design, architecture, product]
license: "CC-BY-4.0"
area: "CAO / Product"
guild: "Sentinels"
priority: "high"
effort: "XL"
assigned_to: "nimrod"
requested_by: "oracle"
started: "2026-04-07T19:43:00Z"
in_review_at: null
completed: null
human_approval_score: 8
sub_missions:
  - id: "MIS-062.1"
    title: "Migrate existing missions to new format + folder structure"
    status: "todo"
    effort: "S"
  - id: "MIS-062.2"
    title: "Recover lost missions from pablofm-web into repo"
    status: "in-progress"
    effort: "M"
  - id: "MIS-062.3"
    title: "Build Kanban page at pablofm.com/missions"
    status: "todo"
    effort: "M"
  - id: "MIS-062.4"
    title: "Update STANDARDS.md — mission system v2"
    status: "todo"
    effort: "S"
  - id: "MIS-062.5"
    title: "Update P-003 Mission Cycle Protocol to v2"
    status: "todo"
    effort: "S"
---
# MIS-062 — Mission System v2

> **Summary:** Implement the redesigned NWOS mission system — new states, sub-missions, simplified IDs, and Kanban board.
> **Epistemic:** What changes when a mission system has a proper state machine with human review checkpoints.
> **Pragmatic:** A live Kanban at pablofm.com/missions backed by the canonical repo.
> **Audience:** Agents · Oracles

---

**Area:** CAO / Product · **Guild:** Sentinels · **Priority:** 🟠 High · **Effort:** XL

---

## Origin

Born from MIS-057 (Deep QA) + Pablo FM direction on 2026-04-07.

Design blueprint: [BP-mission-system-v2](../../blueprints/BP-mission-system-v2.md)

Key decisions:
- URL: `/missions`
- Language: English only
- ID format: MIS-NNN (3 digits, not 5)
- State: update frontmatter only (no file rename)
- Mission data: extracted from pablofm-web, migrated to repo

---

## Story

As an Oracle, I want a Kanban board at pablofm.com/missions showing all real missions with their actual state, so the system is legible and auditable by anyone at a glance.

---

## Sub-missions

| ID | Title | Effort | Status |
|----|-------|--------|--------|
| MIS-062.1 | Migrate existing missions to new format + folder structure | S | todo |
| MIS-062.2 | Recover lost missions from pablofm-web into repo | M | in-progress |
| MIS-062.3 | Build Kanban page at pablofm.com/missions | M | todo |
| MIS-062.4 | Update STANDARDS.md — mission system v2 | S | todo |
| MIS-062.5 | Update P-003 Mission Cycle Protocol to v2 | S | todo |

---

## Acceptance criteria

- [ ] All existing repo missions migrated to v2 frontmatter (new states, uid)
- [ ] New folder structure: queue/ active/ review/ done/ freeze/
- [ ] All 13 "lost" missions from pablofm-web created as .md in repo
- [ ] pablofm.com/missions live with Kanban view
- [ ] STANDARDS.md §2 updated: MIS-NNN format (3 digits)
- [ ] STANDARDS.md — mission states documented
- [ ] P-003 updated to v2 cycle
- [ ] Oracle validation before merge

---

## Epistemic value

A Kanban board backed by a real repo is the difference between a system that exists and a system that is visible. Visibility is the first step to management.

## Pragmatic value

- Makes the mission system legible to outsiders in seconds
- Closes the human-in-the-loop gap (In Review state)
- Enables parallel work on complex missions (sub-missions)
- Frozen missions are visible instead of lost

---

## Version history

- v1.0.0 (2026-04-07) — Initial creation. (MIS-057 → MIS-062)

---

*Nimrod 🗡️ — 2026-04-07*
