---
id: "MIS-131"
uid: ""
title: "Measure whether earlier migrations left frontmatter damage invisible to the tolerant parsers"
status: todo
priority: medium
effort: XS
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
completed: null

type: mission
version: "1.1.0"
created: "2026-09-01T17:34:00Z"
created_source: "git:f8fa6e1"
created_confidence: exact
updated: "2026-09-02T01:55:26+02:00"
author: "ursa"
owner: "oracle"
tags: [debt, guards, frontmatter, DBT-010, MIS-125, history, archive]
license: "CC0-1.0"

context: "2026-09-01"
paths: [scripts/check-frontmatter-delimiter.mjs, debt/DBT-010-guard-blindness.md]
---

# MIS-131 — Measure whether earlier migrations left frontmatter damage invisible to the tolerant parsers

> **Summary:** `DBT-010` registers that the delimiter repair was verified only
> against `d4c2975~1` — whether *earlier* migrations left similar tolerant-only
> damage is explicitly **"has not been measured"**. This mission runs the
> delimiter check across the full `main` history and records the verdict in the
> debt entry, turning a declared unknown into a measured one.
> **Epistemic:** answers a yes/no the corpus itself declares open.
> **Pragmatic:** if zero — the debt's last open uncertainty closes with evidence;
> if nonzero — the archive learns exactly which commits carry damage before any
> standard parser meets them.
> **Audience:** Agents · Oracles

## Context

`DBT-010` (guard blindness) documents how PR #134 (`d4c2975`, phase 2 of the
header burndown) glued the frontmatter fence to the body in 79 files, invisible
to every tolerant parser the repo owns. The repair script and the
`check-frontmatter-delimiter.mjs` guard now hold the current tree at zero
(268/268 .md files parse). But the debt entry's open item 3 reads:

> *"The census is unproven for older commits. The repair verified against
> `d4c2975~1`. Whether earlier migrations left similar tolerant-only damage has
> not been measured."*

This mission is that measurement. It is deliberately scoped to **measuring and
recording**, not repairing: the debt's value here is the verdict.

## Scope

- `numinia-nwos` only. Read-only: no file is modified by the census itself.
- Walk the full `main` history (364 commits at base) and, for every commit,
  apply the same delimiter check `check-frontmatter-delimiter.mjs` applies to
  the working tree — every tracked `.md` outside `web/`, opening `---` must
  close on its own line.
- Record the outcome as an update to `debt/DBT-010-guard-blindness.md` open
  item 3: either "measured: zero damaged versions in N commits" or the exact
  set of (commit, file) pairs found.
- A one-off census script may be left under `scripts/` (e.g.
  `scripts/census-frontmatter-history.mjs`) so the measurement is reproducible.

**Out of scope:** fixing any damage found (report it to the Oracle instead —
repair of historical content is a separate decision); wiring the census into CI
(that is Oracle territory, as `DBT-010` records — the CI step is the Oracle's
hands, not an agent's); the current-tree
guard, which already passes; any change to documents outside the census itself.

## Acceptance criteria

Falsifiable at base commit `4595773` (today: open item 3 says "has not been
measured"):

```bash
# 1. The full history has been walked and the verdict is recorded in DBT-010:
grep -A2 "older commits" debt/DBT-010-guard-blindness.md
#    → shows "measured" with either zero or the exact (commit, file) list

# 2. The result is reproducible by a third party:
node scripts/census-frontmatter-history.mjs
#    → same verdict, exit 0, and prints the commit range it covered

# 3. The current tree is still clean (census must not have damaged anything):
node scripts/check-frontmatter-delimiter.mjs   # → OK, every fence closes on its own line
```

- [ ] No merge to `main` is required for this verdict — but if damage IS found,
      the debt entry must name the commits, not just a count.

## Closure

*(Fill when the mission closes.)*

## Status check — 2026-09-02

*Read against `203267c` during the missions/ normalisation (lot 4). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** Registered planned (#189); the Oracle instructed to leave it until the refactor is done. Read-only census over main history. Assigned ursa.
- **Recommendation:** Keep todo; execute after this normalisation merges (that is the instruction). Should be the next mission Ursa runs — small, read-only, closes DBT-010 item 3.

## Version history

- v1.1.0 (2026-09-02) — import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 4.
