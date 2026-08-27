---
id: "MIS-116"
title: "Translate the repo's remaining Spanish documents to English"
status: in-progress
priority: medium
effort: M
guild: Alchemists
area: archive
type_execution: digital
assigned_to: "ursa"
completed: null
type: mission
version: "1.0.0"
created: "2026-08-27"
updated: "2026-08-27"
author: "ursa"
owner: "oracle"
tags: [translation, i18n, decision-006, archive]
license: "CC-BY-4.0"
context: "2026-08-27"
requires_oracle_approval: true
---
# MIS-116 — Translate the repo's remaining Spanish documents to English

> **Summary:** a repo-wide language scan found 305 `.md` files, 52 of them
> still in Spanish or mixed, split across nine folders. This mission tracks
> that work as one checklist, executed in small per-folder PRs.
> **Epistemic:** DEC-006 declared English the repo's sole language in
> 2026-04-07 (closed by MIS-056); this scan shows the closure was partial —
> the gap survived undetected until this audit.
> **Pragmatic:** a cold agent reading any folder in this repo meets English,
> with no mental translation step before it can act.
> **Audience:** Agents · Oracles

---

## Origin

Found during an audit of `agents/` requested 2026-08-27. A repo-wide
stopword-heuristic scan (ES vs EN word counts per file) applied to all 305
`.md` files outside `.git`/`node_modules`/`dist` flagged 52 files as
Spanish or mixed. Two exclusions, both intentional and out of scope:

- `canon/archive-lore.md` — lore, reserved narrative under `C-005` §2, not
  documentation.
- The RPG manual — lives in `numinia-lore`, not in this repo.

**Note on the ID:** `MIS-116` already existed as a closed-without-merging
PR (#81, "record why MIS-097…099 were never minted") — unrelated content
that never landed in `main`. Reused here as the free slot on the Oracle's
instruction; no content from PR #81 carries over.

## Scope

Translate content to English, language only — no fact, date, metric, or
structural change to any file, in any folder below. Executed as **one PR
per checklist row** (or two adjacent small rows together), never all nine
at once, so each PR stays small and reviewable.

- [x] **`agents/`** — 5 files (`_template/OPERATOR.md`, `_template/STATUS.md`,
      `nimrod/STATUS.md`, `senet/MEMORY.md`, `ursa/MEMORY.md`) — merged this PR
- [ ] **root** — 3 files (`DEUDA-404.md`, `GAPS.md`, `LEGAL_DEBT.md`)
- [ ] **`protocols/`** — 1 file (`P-010-how-to-archive.md`)
- [ ] **`standards/`** — 2 files (incl. `2026_08_18-Sistema_de_Diseno-v5.1.0.md`)
- [ ] **`canon/`** — 3 files (`C-005-licensing.md`, `C-007-rank-specifications.md`, `INDEX.md`)
- [ ] **`reports/`** — 5 files
- [ ] **`operations/`** — 7 files (incl. the Spanish-language privacy policy)
- [ ] **`blueprints/`** — 13 files
- [ ] **`missions/`** — 12 files, range MIS-078…MIS-096 (already `done`;
      translating a closed mission is form, not substance — `S-001` §2.1.1
      allows it, and the commit must say so)

Row order is by ascending file count, smallest first; not a hard rule if a
smaller batch turns out more useful next.

### Out of scope

- `canon/archive-lore.md` and the RPG manual (see Origin)
- `guilds/*/roster.md`, the `AG-NNN` prefix — separate, already-tracked debt
- Correcting content, dates, or facts in any file translated here

## Acceptance criteria

> Falsifiable per row. The mission's own criterion is that every row is
> checked and its files pass the check below.

```
✗  for each file in a checked row:
     grep -icE "\b(el|la|los|las|que|para|con|una|del|más|estado|misión)\b" <file>  →  0
```

- [ ] Verifiable by someone who did not do the work
- [ ] Each row checked only after its PR has merged — not before
- [ ] `Closure` filled only when all nine rows are checked

## Execution plan

1. **PR #1 (this one)** carries both the mission brief and the first row
   already translated (`agents/`, 5 files) — done together on the Oracle's
   instruction rather than split into a docs-only PR followed by a second.
   `status` moves to `in-progress` in this same PR, per this repo's own
   rule (`TEMPLATE-CHANGES.md`, "status changes in the PR that starts the
   work").
2. **PR #2 onward:** one row (or two small adjacent rows) translated per
   PR, on its own branch off `main`, with a local HTML diff preview shown
   before every `git push`. Each PR's own commit message names the row(s)
   it closes.
3. **On merge of each PR:** the corresponding checklist row above is
   checked, in a small follow-up commit to this same file.
4. **When all nine rows are checked:** `status` moves to `done`, `Closure`
   is filled with the real PR list and any divergence from this plan.

## Closure

*(Empty. This mission has not moved past `backlog` — nothing has been
translated or merged yet.)*
