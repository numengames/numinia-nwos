---
id: "D-010"
uid:
title: "area survives in 256 documents; territory exists in 2"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-24T19:44:00Z"
updated: "2026-08-24T19:44:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, vocabulary, frontmatter, territory]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "S-001 §7"
---
# D-010 — `area` survives in 256 documents; `territory` exists in 2

> **Summary:** `S-001` replaces `area` with `territory` and closes its
> vocabulary. The corpus has not migrated.
> **Epistemic:** The most-used field in the archive has no controlled
> vocabulary.
> **Pragmatic:** Until this closes, "how much work is in CAO" has no reliable
> answer.

## The gap, measured

`scripts/count-evidence.py` against HEAD `7d17b5a`:

| Field | Documents | Distinct values |
|---|--:|--:|
| `area` | **256** | **33** |
| `territory` | 2 | 1 |

Among the 33: `CAO`, `CAO / Product`, `Platform`, `Platform / numinia-web`,
`Product`, `Infrastructure`…

## The compound values are the finding

The slash is not sloppiness: it is **the field doing two jobs**. `CAO / Product`
declares a functional domain *and* a technical surface, because there is only
one field to put both in.

The migration is therefore not a rename. It requires deciding, per compound
value, whether the surface is worth its own field (`surface:`) or is redundant
with `guild` and the mission's own text.

## Why `territory` and not `area`

In archival science *area* already denotes something else: the description area
of ISAD-G. Reusing it inside an archive that cites ISO 15489 (`P-010` §6)
guarantees ambiguity the day someone applies the standard properly.
`territory` does not collide with any archival term.

## Closing condition

Marked RESOLVED when `area` is at 0 documents, `territory` carries only the 8
values of `S-001` §7, and the decision about `surface:` is recorded — either as
a field in `S-001` or as an explicit rejection.

## State

| | |
|---|---|
| Severity | medium — affects aggregation and reporting |
| Owner | Oracle |
| Blocked by | decision about `surface:`; `S-001` unsigned |
| Opened | 2026-08-24, by `S-001` §7 |
| Closes when | `area` at 0, `territory` within vocabulary, `surface:` decided |
