---
id: "D-050"
title: "The reference guard cannot see citations to retired prefixes"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-31T17:30:00+02:00"
updated: "2026-08-31T17:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, guards, references, identifiers, prefixes, migration]
license: "CC-BY-4.0"
related: ["S-001", "ADR-005", "D-008", "D-025", "D-039", "MIS-125"]
severity: high
---

# D-050 — The reference guard cannot see citations to retired prefixes

## What is owed

`scripts/check-references.mjs` verifies that a cited identifier exists. It
recognises identifiers with this pattern:

```js
const ID_RE = /\b(MIS|ADR|DEC|RPT|PRO|DBT|STD|CAN|OPS|BLU|GLD|INF)-(\d{1,4}|\d{4}-\d{2}-\d{2})\b/g;
```

Twelve prefixes — **the twelve `ADR-005` v1.1.0 registers**. None of the
retired ones are there. A citation written under a superseded scheme is not
matched by `ID_RE` at all, so it is never checked, never reported, and never
baselined. It is not a broken reference the guard tolerates; it is a string the
guard does not recognise as a reference.

## Measurement (2026-08-31, at `main`)

Files whose own series the guard cannot verify by identifier:

| Prefix | Files | In `ID_RE`? |
|---|--:|---|
| `MIS` | 127 | yes |
| **`D`** | **38** | **no** |
| `ADR` | 14 | yes |
| **`P`** | **13** | **no** |
| `RPT` | 11 | yes |
| **`AUD`** | **11** | **no** |
| `GLD` | 8 | yes |
| **`O`** | **8** | **no** |
| **`C`** | **7** | **no** |
| `DEC` | 6 | yes |
| **`S`** | **3** | **no** |

**80 of 246 files (32 %)** carry a prefix the guard cannot match.

Sweeping the corpus for citations to identifiers that do not resolve, using the
retired prefixes:

- **131 citations to identifiers that do not exist**, across **19 distinct
  identifiers**, none of them visible to any guard.
- Worst: one extinguished entry cited by **26 files**, another by **13**.

Two subsets of those 131 are **legitimate** and must not be "fixed":

1. **Citations to extinguished debt.** `ADR-030` deletes a `debt/` entry from
   the tree on close and keeps its resolution in a table. A document citing
   `D-0NN` after extinction is citing history, correctly. Roughly 40 of the 131.
2. **Seminal numbering in `canon/`.** `S-002`, `S-006`, `S-008`, `S-010` are
   *seminal document* numbers in `canon/INDEX.md` — a different namespace that
   happens to collide with the retired `standards/` prefix. Not references to
   `standards/` at all.

Netting those out leaves **roughly 90 citations that are genuinely broken** and
that no guard can currently report. The figure is deliberately given as an
order of magnitude: separating the three classes needs the sweep this entry
asks for, and quoting a precise number before doing it would be the same
mistake this entry documents.

## Why it matters

It hid a contradiction in the most-cited document in the corpus. `S-001` §4.1
prescribed ten prefixes that `ADR-005` v1.1.0 had retired, and cited eight debt
entries that no longer exist. The glossary that governs naming was mandating
names the corpus had abandoned — for a day, while `MIS-125` renamed the corpus
*against* it. **Every guard was green throughout.** The Oracle found it by
reading, which is the failure mode `D-025` and `D-039` both describe.

It also gets worse as `MIS-125` proceeds, in a way that is easy to mistake for
damage. Renaming `debt/` to `DBT-NNN` moves 38 files from an invisible prefix
to a matched one — so citations that were silently unresolvable become
reportable **all at once**. The reference guard will appear to break. It will
not be breaking: it will be seeing, for the first time, what was already there.
Anyone reading that run without this entry will conclude the rename caused the
damage.

## Closes when

The guard can report a citation to a retired prefix — either by matching the
retired schemes and resolving them through a supersession map, or by an
explicit registry of retired prefixes it declares it does not follow — **and**
the corpus has been swept once, with the three classes above separated and the
genuinely broken citations either fixed or baselined with a reason.

## Not to be confused with

**`D-047`** — the resolver matching by basename, so a wrong folder reads green.
That is a *resolution* defect on references the guard does see. This one is a
*recognition* defect: the guard never sees the reference at all. `D-047` closed
by declaring the blindness; this cannot close the same way, because a
declaration does not help a reader who is not there when the run happens.

## State

| | |
|---|---|
| Severity | high — hid a contradiction between the glossary and the decision governing it, with all guards green |
| Owner | Oracle |
| Opened | 2026-08-31, by the Oracle's finding that `S-001` was out of date |
| Blocks | nothing outright; makes the `debt/` rename look like a regression when it is a revelation |
| Closes when | the guard reports retired-prefix citations, and the corpus has been swept once |

## Adjacent finding, not part of this entry

Six `debt/` entries carry `status: closed` and are **still in the tree**:
`D-014`, `D-024`, `D-025`, `D-047`, `D-048`, `D-049`. `ADR-030` rule 1 says an
operational entry is deleted on close, once its resolution is written in the
ADR, mission or report that closed it — and rule 3 says a closure without a
written resolution does **not** extinguish.

Five of the six were closed today by `MIS-125`, whose closure record is the
mission document; `D-024` predates it. Whether that satisfies rule 1, and
whether extinction happens per-entry or in a batch like the nine of
2026-08-30, is the Oracle's call — deleting six documents is not a decision an
agent takes because a rule appears to authorise it. Recorded here so it is not
lost; it wants its own instruction, not a line in this entry.
