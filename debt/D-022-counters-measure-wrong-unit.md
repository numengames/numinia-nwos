---
id: "D-022"
uid:
title: "Counters measure lines where they should measure entries"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T12:14:14Z"
created_source: "git:9ca385d"
created_confidence: "exact"
updated: "2026-08-25T12:14:14Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, instruments, measurement, counting, D-014, D-021]
license: "CC-BY-4.0"
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

1. **A measuring function states its unit in its name or its output.**
   `count_entries()` and `count_lines()` are different functions; a script that
   prints `18` should print `18 entries`.
2. **Any figure appearing in a document carries the command that produced it.**
   Already required by `S-001` §10 for glossary figures; instances 2, 3 and 5
   are all figures quoted in prose without their command.
3. **A figure quoted from another document is re-measured, never copied.**
   Instances 2, 3 and 5 were copies of a previously published number. `S-001`
   §10.1 requires the `ROOT`/`HEAD` header; it does not yet require that a
   quoted figure be re-derived.

Item 3 is the cheap one and closes half the cases.

## Closure

Marked RESOLVED when:

- [ ] Every measuring script in `scripts/` states the unit alongside the count
- [ ] `S-001` §10 carries the rule that a figure quoted from another document is
      re-measured, not copied
- [ ] A pass over the corpus checks published figures against their scripts, and
      records the discrepancies rather than silently correcting them

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
