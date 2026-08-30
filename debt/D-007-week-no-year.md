---
id: "D-007"
uid:
title: "week: W14, of which year"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-25T00:40:00Z"
updated: "2026-08-25T00:40:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, frontmatter, vocabulary, undefined, dates]
license: "CC-BY-4.0"
visibility: "public"
severity: low
opened_by: "S-001 §11"
evidence_script: "scripts/count-evidence.py"
evidence_head: "9b45016"
---
# D-007 — `week`: `W14`, of which year

> **Summary:** 7 documents carry a week number with no year and no stated
> convention.
> **Epistemic:** An identifier that stops being unique after twelve months.
> **Pragmatic:** `W14` will mean two different weeks the moment the archive is
> a year old — and the archive is four months old.

## OPEN QUESTION

Which week-numbering convention, and why is the year absent?

Two problems, and the second is the serious one:

- **The convention.** ISO 8601 weeks start on Monday and week 1 is the one
  containing the first Thursday. US convention differs. `W14` does not say
  which, and in some years they disagree by a week.
- **The year.** `W14` is not an identifier. `2026-W14` is. Without the year the
  field cannot be sorted, compared or resolved once a second year exists.

`ADR-004` is directly relevant here: **an identifier encodes nothing that can
change and is never ambiguous.** A bare week number is ambiguous by
construction, which makes this the one field in this group that conflicts with
a signed rule rather than merely lacking a definition.

## Measured

7 documents. Observed values are of the form `W14`, `W15` — no year in any of
them.

## CLOSURE

Marked RESOLVED when either:

1. **Qualified.** Values become `2026-W14`, ISO 8601 stated in `S-001` §6, and
   the 7 existing values are backfilled with the correct year — derivable from
   `created` or from git, and the source recorded per `S-001` §6.2.
2. **Retired.** If the week is derivable from `created`, the field is apparatus
   and should be computed. This is the likely answer: a document created on
   2026-04-02 is in `2026-W14` whether or not it says so.

Option 2 is preferred by the same rule that governs the rest of the archive:
**if it can be regenerated from what is already there, it is not stored.**

| | |
|---|---|
| Severity | low — 7 documents; ambiguity is latent, not yet biting |
| Owner | Oracle |
| Blocked by | nothing |
| Opened | 2026-08-24, by `S-001` §11 |
| Closes when | qualified with the year, or retired as derivable |
