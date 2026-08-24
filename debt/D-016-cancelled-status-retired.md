---
id: "D-016"
uid:
title: "cancelled was a mission status the vocabulary no longer admits"
type: documentation
status: resolved
version: "1.0.0"
created: "2026-08-24T19:00:00Z"
updated: "2026-08-25T00:42:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, frontmatter, vocabulary, missions, resolved]
license: "CC-BY-4.0"
severity: medium
opened_by: "S-001 v1, Oracle feedback"
resolved_by: "Oracle blocker 1, executed 2026-08-24"
evidence_script: "scripts/cancel_to_frozen.py"
evidence_head: "9b45016"
---
# D-016 — `cancelled` was a mission status the vocabulary no longer admits

> **Status: RESOLVED.** Recorded because `debt/` is append-only: an entry that
> was resolved with its trace is worth more than one that never existed.
> **Epistemic:** Shows what a closed vocabulary gap looks like from open to
> shut.
> **Pragmatic:** Nothing to do. Kept so the migration is findable.

## The gap, as it stood

`S-001` §7 fixed the mission vocabulary at five states:

```
todo → in-progress → in-review → done / frozen
```

`cancelled` was withdrawn. **12 missions carried it**, and they had nowhere to
go: they were not `done` — nothing was delivered — and they were not `todo`.

Left alone, the archive would have declared a five-state machine while twelve
documents sat outside it.

## OPEN QUESTION, as it was posed

Do cancelled missions become `frozen`, or are they deleted?

Deletion was arguable: a mission that was never executed produced nothing, and
`S-001` §2 says `missions/` holds *the work promised, done, and with what
evidence*. A cancelled mission is a promise withdrawn.

## CLOSURE — the Oracle's ruling

> *"`cancelled`: the 12 missions become `frozen` with `freeze_reason:
> cancelled`. **This is not debt, it is a decision. Execute it.**"*

The reasoning, recorded because it generalises: **a withdrawn promise is still
evidence.** Deleting the twelve would erase the fact that they were proposed,
considered and dropped — which is precisely the kind of thing an archive
exists to remember. `frozen` keeps the record; `freeze_reason` keeps the why.

## What was executed

`scripts/cancel_to_frozen.py`, idempotent, verified in both directions:

```
status: cancelled  →  status: frozen
                      freeze_reason: cancelled
```

**12 missions converted.** Verified with `count-evidence.py`: `cancelled` is
absent from the corpus, `frozen` reads 13 — the 12 plus one that was already
frozen for its own reasons.

The script stays in the repository. Re-running it converts nothing and says so,
which is what makes the migration checkable rather than merely reported.

## Why this is filed rather than dropped

The Oracle's instruction: *"a resolved entry with its trace is worth more than
one that never existed — `debt/` is append-only."*

A `debt/` register that only ever shows open items measures anxiety. One that
shows items closing measures work. This is the first entry to close, and the
shape it closes in — question posed, ruling recorded, script that did it, figure
that proves it — is the shape the others should aim for.

| | |
|---|---|
| Severity | medium — 12 documents outside the declared vocabulary |
| Owner | Oracle |
| Opened | 2026-08-24, by `S-001` v1 review |
| **Resolved** | **2026-08-24, same session, by Oracle ruling** |
| Evidence | `scripts/cancel_to_frozen.py` · `count-evidence.py` at `9b45016` |
