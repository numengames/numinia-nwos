---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-123"
title: "Make ADR-028 real: value checks, a TBA counter, and the vocabulary the guard never read"
status: todo
priority: high
effort: M
guild: "Alchemists"
territory: "Standards"
type_execution: digital
assigned_to: null
completed: null

# REGISTRO
type: mission
version: "1.0.0"
created: "2026-08-30T11:00:00Z"
updated: "2026-08-30T11:00:00Z"
author: "ursa"
owner: "oracle"
tags: [standards, frontmatter, guard, vocabulary, adr-028, tba]
license: "CC-BY-4.0"

paths: [scripts/lint-frontmatter.mjs, standards/S-001-glossary.md, standards/S-004-header-standard.md]
depends_on: [ADR-028, ADR-029]
blocked_by: null
---

# MIS-123 — Make ADR-028 real

**Base:** `main` @ `fd4d045` · **Decisions:** `ADR-028`, `ADR-029`

## Why this mission exists

`ADR-028` was signed on 2026-08-30. It declares three forms of absence and
rules that a closed vocabulary without a check is not a vocabulary.

**Nothing in it changes what any machine does.** An ADR is a record, not a
mechanism. Until the checks below exist, the repository has a signed decision
that verifies nothing — which is precisely the failure `D-001` has been
describing since 2026-08-24.

This mission is the difference between deciding and enforcing.

## What is broken today

`S-001` §7 declares five vocabularies **closed**. The guard verifies two.

| Field | Declared closed | Value check | Invalid values in the corpus |
|---|---|---|---|
| `type` | yes | **yes** (H-03) | — |
| `status` | yes | **yes** (H-04) | — |
| `guild` | yes | **no** | **14** |
| `territory` | yes | **no** | **15** |
| `type_execution` | yes | **no** | **5** |
| `visibility` | **never declared** | no | vocabulary does not exist |

Thirty-four documents carry values `S-001` §7 calls invalid and **no
instrument has ever said so**. `guild` holds `Procuradores` ×8 — Spanish,
from before `ADR-024` renamed the guilds.

`visibility` is the worst of the six: `web/src/lib/corpus.ts` decides **what
reaches the public site** by reading it, and its vocabulary was never written
down anywhere.

The shape of the failure, in database terms: the repository has `NOT NULL`
and no `CHECK` constraint.

## Deliverables

1. **Value checks for `guild`, `territory`, `type_execution`** in
   `lint-frontmatter.mjs`, reading the vocabularies from `S-001` §7.
2. **`visibility` declared** in `S-001` §7 with the values `corpus.ts`
   actually honours, then checked like the rest.
3. **A `TBA` counter**: every run reports `TBA` per field. It **must not
   fail** on `TBA` — it must display it. Debt that is visible is still debt,
   but debt that is invisible is a surprise.
4. **`TBA` requires an owner**: a document writing `TBA` names the mission
   that will resolve it. A `TBA` with no owner is a violation the day it is
   written.
5. **Blindness declared** per `D-025`: the guard states in its own output
   what it does not look at — starting with the repository root, which it
   has never scanned (100 files carry `uid`, the guard sees 98).

## Declared cost — the number goes up before it goes down

Turning on the three value checks surfaces **~34 violations that exist today
and are invisible**. They bank into the baseline on the first run.

**843 → ~877, then down.** Anyone reading the counter without this paragraph
will think the repository got worse on the day it started telling the truth.

## Acceptance

- [ ] `guild`, `territory`, `type_execution` rejected on invalid values, both
      directions tested per `P-013` §1
- [ ] `visibility` vocabulary declared in `S-001` §7 and checked
- [ ] `TBA` counted per field in the summary line, never fatal
- [ ] A `TBA` without a named resolving mission is a violation
- [ ] The guard prints what it is blind to
- [ ] Baseline re-banked with the new findings, and the jump explained in the
      commit message

## What this mission does not do

It does not decide the `territory` vocabulary. That is `D-010`, and `TBA`
exists precisely so the migration is not blocked on settling it. Four values
in use are undeclared; six declared values are unused.

## Evidence

Measured on `main` @ `fd4d045`, 2026-08-30. Counts of invalid values per
field come from comparing each document's frontmatter against the lists in
`S-001` §7; the `null` census (`completed` ×37, `assigned_to` ×24 = 61
documents, zero baseline entries) is what `ADR-028` legalises.

## A mission can be conformant or visible, not both

`S-001` §9 declares `todo` a valid mission status, so this mission carries it.
**`web/src/views/MissionsView.astro` never renders it:** `COLUMN_ORDER` is
`["in-progress", "in-review", "backlog", "done"]`, and only `draft` is mapped
into a column (line 71, into `backlog`).

`MIS-121`, `MIS-122` and this mission are therefore **absent from the mission
board on numinia.org** while being perfectly valid documents. The alternative
— writing `backlog` — is a retired status and adds an `H-04` finding.

This is `D-009` seen from the other side: the board was built around the
vocabulary the standard retired, so conformance and visibility now point in
opposite directions. Fixing it is one line in `COLUMN_ORDER` plus a decision
about where `todo` sits relative to `backlog`; that decision belongs to
`D-009`, not here. Recorded so the next reader does not conclude the missions
were never published.
