---
id: "D-008"
uid:
title: "Four series carry a registration scheme the corpus does not yet apply"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-24T19:40:00Z"
updated: "2026-08-24T19:40:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, identifiers, registration, archive]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "S-001 §4.1"
---
# D-008 — Four series carry a scheme the corpus does not yet apply

> **Summary:** `S-001` §4.1 assigns `S-` `A-` `O-` `D-` to four series. The
> existing files do not carry them.
> **Epistemic:** Measures the distance between a decided rule and the data.
> **Pragmatic:** Until this closes, a citation like "the governance standard"
> has no stable handle.

## The gap, measured

`scripts/count-evidence.py` against HEAD `7d17b5a`:

| Series | Scheme | Coverage |
|---|---|--:|
| `standards/` | `S-NNN` | **0/3** |
| `agents/` | `A-NNN` | **0/17** |
| `operations/` | `O-NNN` | **0/11** |
| `debt/` | `D-NNN` | 1/1 — new files comply |

`S-001-glossary.md` and `D-001-no-ci-guards.md` are the only documents born
under the rule.

## Why it is not `[PENDING]`

Because there is no such marker, and inventing one would hide exactly this. The
rule is `[MANUAL]`: in force, and enforced by nobody automatically. New
documents comply because a human remembers. The 31 existing ones do not comply
because nobody has renamed them.

## Closing condition

Marked RESOLVED when the four series reach 100 % coverage **or** when the Oracle
withdraws the scheme for a given series and `S-001` records the exception.

Order, cheapest first:

1. `standards/` — 3 files, no consumers outside the repo
2. `operations/` — 11 files; check `web/` does not glob them by name
3. `agents/` — 17 files, but they are folders (`agents/nimrod/SOUL.md`);
   renaming touches every agent path. Deferred until an ADR decides whether the
   registration goes on the folder or on the `SOUL.md`

Each rename runs `scripts/check-references.mjs` before merge. **Nothing is
renumbered** (`S-001` §5).

## State

| | |
|---|---|
| Severity | medium — affects citability, not correctness |
| Owner | Oracle |
| Opened | 2026-08-24, by `S-001` §4.1 |
| Closes when | 100 % coverage, or recorded exception |
