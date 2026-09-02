---
id: "MIS-062"
uid: ""
title: "Mission System v2 — States, Sub-missions, IDs, Kanban"
status: done
priority: "high"
effort: "XL"
guild: "Sentinels"
territory: "CAO"
assigned_to: null
started: "2026-04-07T19:43:00Z"
completed: "2026-09-02"

type: mission
version: "1.2.0"
created: "2026-04-07T19:43:00Z"
created_source: "git:749f75c"
created_confidence: inferred
updated: "2026-09-02T10:01:10+02:00"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [missions, kanban, system-design, architecture, product]
license: "CC0-1.0"

updated_note: "2026-08-17 — unassigned by Oracle (nimrod not active); execution of sub-missions absorbed by MIS-066"
in_review_at: null
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

> **2026-08-17 — Oracle note:** unassigned (nimrod not active). Execution
> of all five sub-missions is absorbed by [MIS-066](MIS-0066-unify-mission-system.md)
> phases 1–6; the Kanban survives at numinia.org/missions, not
> pablofm.com. This file remains open as the design record of the v2
> state machine.

> **Summary:** Implement the redesigned NWOS mission system — new states, sub-missions, simplified IDs, and Kanban board.
> **Epistemic:** What changes when a mission system has a proper state machine with human review checkpoints.
> **Pragmatic:** A live Kanban at pablofm.com/missions backed by the canonical repo.
> **Audience:** Agents · Oracles

## Origin

Born from MIS-057 (Deep QA) + Pablo FM direction on 2026-04-07.

Design blueprint: [the Mission System v2 record](../history/2026_04_07-Mission_System_v2-v1.0.0.md)

Key decisions:
- URL: `/missions`
- Language: English only
- ID format: MIS-NNN (3 digits, not 5)
- State: update frontmatter only (no file rename)
- Mission data: extracted from pablofm-web, migrated to repo

## Story

As an Oracle, I want a Kanban board at pablofm.com/missions showing all real missions with their actual state, so the system is legible and auditable by anyone at a glance.

## Sub-missions

| ID | Title | Effort | Status |
|----|-------|--------|--------|
| MIS-062.1 | Migrate existing missions to new format + folder structure | S | todo |
| MIS-062.2 | Recover lost missions from pablofm-web into repo | M | in-progress |
| MIS-062.3 | Build Kanban page at pablofm.com/missions | M | todo |
| MIS-062.4 | Update STANDARDS.md — mission system v2 | S | todo |
| MIS-062.5 | Update PRO-003 Mission Cycle Protocol to v2 | S | todo |

## Acceptance criteria

- [ ] All existing repo missions migrated to v2 frontmatter (new states, uid)
- [ ] New folder structure: queue/ active/ review/ done/ freeze/
- [ ] All 13 "lost" missions from pablofm-web created as .md in repo
- [ ] pablofm.com/missions live with Kanban view
- [ ] STANDARDS.md §2 updated: MIS-NNN format (3 digits)
- [ ] STANDARDS.md — mission states documented
- [ ] PRO-003 updated to v2 cycle
- [ ] Oracle validation before merge

## Epistemic value

A Kanban board backed by a real repo is the difference between a system that exists and a system that is visible. Visibility is the first step to management.

## Pragmatic value

- Makes the mission system legible to outsiders in seconds
- Closes the human-in-the-loop gap (In Review state)
- Enables parallel work on complex missions (sub-missions)
- Frozen missions are visible instead of lost

## Closure

- **What was done:** the v2 state machine designed here shipped through MIS-066 (done 2026-08-17): states in frontmatter, the `uid` field, the recovered missions in `missions/`, the Kanban at numinia.org/missions, PRO-003 v3.0.0.
- **What diverged, and why:** MIS-066 rejected the v2 folder structure (`queue/ active/ review/ done/ freeze/`) for a flat `missions/` with `status:` as the only state surface (PRO-003 v3.0.0: "no status directories"); the board lives at numinia.org, not pablofm.com; the 3-digit filename became 4-digit (ADR-005 v1.1.0, #198). The five sub-missions never became files — the `sub_missions:` block stays as the record of that design (MIS-135 row 10).
- **Evidence:** PRO-003 §2 ("flat `missions/` folder (MIS-066)"); MIS-066 `status: done`; the 2026-08-25 audit table in §Board triage (3/4, the fourth replaced by numinia.org/missions).
- **Closed:** 2026-09-02 · **by:** ursa

## Version history

- v1.0.0 (2026-04-07) — Initial creation. (MIS-057 → MIS-062)
- v1.1.0 (2026-09-02) — inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; retired identifiers repointed: P-003→PRO-003; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 2.
- v1.2.0 (2026-09-02) — status todo → done (achieved through MIS-066 (done 2026-08-17); the file stays as the v2 design record). Proposed in #199 on the 2026-09-02 status check; the Oracle signs by merging (PRO-003 §2).

*Nimrod 🗡️ — 2026-04-07*

## Board triage — 2026-08-25: scope cut, signed

**Category B — superseded, but not entirely.** Most of this mission was absorbed
or contradicted by later work. What survives is one line of it, and this section
records which, so nobody re-reads the brief above as if it were still the plan.

The brief is untouched. This is the disposition, not a rewrite.

| Criterion in the brief above | Verified state, 2026-08-25 | Disposition |
|---|---|---|
| Folder structure `queue/ active/ review/ done/ freeze/` | Those folders do not exist | **Contradicted.** `MIS-066` flattened `missions/` to a single folder on purpose. Not pending — decided against. |
| `pablofm.com/missions` live with Kanban view | 5 references to a legacy domain | **Dead context.** The board lives at `numinia.org/missions`. |
| `STANDARDS.md` §2 updated, MIS-NNN format | 3 mentions of `MIS-NNN` in `STANDARDS.md` | **Done.** |
| `STANDARDS.md` — mission states documented | present | **Done.** |
| `P-003` updated to v2 cycle | present | **Done.** |
| All missions migrated to v2 frontmatter (**uid**) | **182 documents in the corpus have no `uid:`** | **SURVIVES.** This is the whole of what is left. |

```bash
grep -rL "^uid:" --include="*.md" canon standards decisions protocols \
  blueprints missions debt operations agents reports | wc -l    # -> 182
```

### The surviving line, and how it will be executed

The `uid` migration is re-executed **on current `main`**, with falsifiable
criteria — the obvious one being that the command above returns **0**.

**A first attempt exists and was not lost.** Branch `chore/uid-all-documents`
(`5c5a32f`, 2026-08-24) carries the migration across 211 files. It was never
pushed and never had a PR; its merge base is `7d17b5a`, **75 commits behind
`main`**. Rescuing it would mean resolving that gap by hand, on a branch whose
squash would conflict `add/add` against everything merged since.

Oracle's ruling: **redo, do not rescue.** The branch stays as it is, undeleted,
as the record of the first attempt. **No work was lost — an expensive rescue was
avoided**, and the same result is cheaper to reproduce than to reconcile.

Returned to `backlog` because what survives has not been started on this base.
- **Signed by:** Oracle, 2026-08-25.

## Status check — 2026-09-02

*Read against `aebcf54` during the missions/ normalisation (lot 2). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** Its five sub-missions were absorbed by MIS-066 (done, 2026-08-17) per its own note; its 2026-08-25 audit table marks 3 of 4 criteria done and the fourth (pablofm.com/missions) as dead context replaced by numinia.org/missions. 46 citations (17 files) — a design record.
- **Recommendation:** Close as done — achieved through MIS-066; the file stays as the v2 design record (already declared so in its own note). Oracle signs.
