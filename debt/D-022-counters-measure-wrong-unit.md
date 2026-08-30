---
id: "D-022"
uid:
title: "Counters measure lines where they should measure entries"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T12:14:14Z"
created_source: "git:9ca385d"
created_confidence: exact
updated: "2026-08-25T12:14:14Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, instruments, measurement, counting, D-014, D-021]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "Oracle, 2026-08-25 — sixth occurrence"
evidence_script: "scripts/check-references.mjs"
evidence_head: "1f09485"
---
# D-022 — Counters measure lines where they should measure entries

> **Summary:** Six times in two sessions a figure was reported by counting the
> wrong unit — lines instead of entries, files instead of folders, rows instead
> of documents.
> **Epistemic:** Not six mistakes. One mistake with six instances, and it has a
> shape: **the instrument counts what is easy to count rather than what was
> asked.**
> **Pragmatic:** Every one was caught by a human reading the number and finding
> it implausible. None was caught by another instrument.

## The finding

The Oracle, on being told the reference baseline held 15 entries and not the 19
previously reported:

> *"Note the 19 → 15 correction: it is the sixth time the instrument has counted
> wrong. It is starting to be a pattern of its own — counters measuring lines
> where they should measure entries. It deserves a line in `D-014` or an entry
> of its own."*

It gets its own entry, because `D-014` is about **what** is counted (apparatus
counted as record) and this is about **how**: the unit of counting itself is
wrong.

## The six

| # | Reported | Actual | The wrong unit |
|--:|---|---|---|
| 1 | `agents/` 0/17 unregistered | **0/5** | counted the four files inside each agent folder; `AG-NNN` registers the **folder** |
| 2 | `T00:00:00Z` in 48 documents | **121**, later **130** | a stale figure quoted from prose instead of re-measured |
| 3 | references 1,619 | **1,617** | quoted from memory, never re-run |
| 4 | citations 49 broken / 280 | **17 / 88** | counted table rows, sub-missions and section headings as documents |
| 5 | `area` 256 vs `territory` 2 | **128 vs 26** | read off a document instead of measured |
| 6 | baseline **19 entries** | **15** | counted **lines of JSON**, not array elements |

Numbers 1, 4 and 6 are the same error exactly: **a container was counted instead
of its contents, or contents instead of their container.**

## Why it recurs

Because counting the wrong unit **produces a plausible number**. There is no
crash, no empty output, no zero to raise suspicion — just a figure of roughly the
right magnitude that a reader accepts.

> `D-021` found dates that were wrong but *looked like a timeline*. This is the
> same defect in the numeric register: **figures that are wrong but look like
> measurements.**

And it is invisible to the corpus: every one of the six was caught by a human
reading the figure and finding it implausible. **No instrument caught another
instrument.**

## What would actually fix it

Not care. Care has failed six times.

**The Oracle corrected this section on the day it was written**, and the
correction is the entry's real content:

> *"The problem is not counting wrong, it is that no output declares WHAT it
> counts. `0/17` and `0/5` are not two figures of the same fact: they are
> different units with no label. If it said `0/5 agent folders`, the error is
> visible by itself. That is a guard, unlike 're-measure instead of copying',
> which still depends on somebody remembering."*

The original closing condition — *re-measure rather than copy* — was a rule of
diligence, and diligence is what already failed. **Naming the unit is
mechanical: it makes the error self-evident at the point of reading**, with no
second person and no second check.

Test it against the three container/content errors:

| Without unit | With unit |
|---|---|
| `0/17 unregistered` — plausible | `0/17 agent folders` — **false on sight**, there are five |
| `49 broken / 280` — plausible | `49 broken documents` — **false on sight**, those are table rows |
| `19 entries` — plausible | `19 lines of JSON` — **not the question asked** |

So, in order of what actually closes cases:

1. **Every figure declares its unit** (`S-001` §10.2, implemented as
   `cifra(n, unidad)` in `scripts/measuring_root.py`, which raises rather than
   format a bare number). Closes instances 1, 4 and 6.
2. **Any figure in a document carries the command that produced it.** Already
   required by `S-001` §10; instances 2, 3 and 5 are figures quoted in prose
   without one.
3. A figure quoted from another document is re-measured, never copied. Kept as
   good practice, **not as a closing condition** — it cannot be enforced.

## Closure

Marked RESOLVED when:

- [x] **`S-001` §10.2 carries the unit rule**, and `cifra(n, unidad)` exists in
      `scripts/measuring_root.py` — it raises `ValueError` rather than format a
      number without one *(2026-08-25)*
- [ ] Every measuring script in `scripts/` routes its counts through `cifra()`
- [ ] A pass over the corpus checks published figures against their scripts, and
      **records** the discrepancies rather than silently correcting them

The third is the one that matters. Silently fixing the numbers would make the
archive look as though it had always been right — the exact failure `D-014` was
kept open to avoid.

| | |
|---|---|
| Severity | medium — no data lost; six published figures were false |
| Owner | Oracle |
| Blocked by | nothing; items 1–2 are agent work, item 3 needs a pass |
| Opened | 2026-08-25, at the Oracle's instruction on the sixth occurrence |
| Closes when | units are named and quoted figures are re-derived |
