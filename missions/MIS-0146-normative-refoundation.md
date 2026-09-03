---
id: "MIS-146"
uid: ""
title: "Normative refoundation: the corpus states its rules once, in one place, and each one can pass or fail"
status: in-progress
priority: high
effort: XL
guild: "Exegetes"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
completed: null

type: mission
version: "1.0.0"
created: "2026-09-03T17:46:00Z"
created_source: "git:eb91cbb"
created_confidence: exact
updated: "2026-09-03T17:46:00Z"
author: "ursa"
owner: "oracle"
tags: [standards, governance, contradictions, compression, refoundation]
license: "CC0-1.0"
---

# Normative refoundation

## Background

The Oracle's brief, in his words: *"hay que hacer unas reglas bien definidas
que no se contradigan unas a otras, y luego hay tantísimo texto que no se
entiende nada"*. And on method: *"no hay que demolerlo — es un edificio del
que hemos aprendido y tenemos que extraer el aprendizaje y hacerlo en otro
edificio que es coherente"*.

**This mission is opened after the work started, and says so.** Five pull
requests reached `main` before it existed: #224, #226, #227, #228 and #229.
The plan they followed lived in an agent's working directory, outside this
repository — which by `STD-006` means it did not exist for the corpus at all.
Two days were spent auditing other documents' incoherence while working
outside the cycle `PRO-003` requires. The record starts here rather than
being backdated into five tidy fictions.

### What the first phase actually produced

| | Start | At `eb91cbb` |
|---|---|---|
| Documents | 33 | 32 |
| Words | 98,403 | 99,422 |

**One document removed. A thousand words added. About 4% of the target.**

The phase repaired the old building instead of starting the new one:
relicensing, marking a draft as a draft, fixing dead links, adding a prose
guard, ending the filename-as-state hack. Every repair added text to what it
repaired.

It was not wasted — it produced permission to delete, which did not exist
before. `superseded` and `withdrawn` are in production (#224), a guard
measures prose and its baseline already falls, 187 → 180 (#226), `standards/`
is homogeneous for the first time, nine documents all `STD-NNN` (#229), and
three corpus lies fell: a draft claiming ratification, five dead links, and a
licence reserved over a renunciation already published.

But permission to delete is not deletion, and the counter says so.

### The measurement that reframes the target

At `eb91cbb`, across `canon/`, `standards/`, `protocols/` and `decisions/`:

```
166  normative verbs (MUST, MUST NOT, SHOULD, SHOULD NOT, MAY)
99,422  words
─────
599  words per rule
```

A well-written standard runs 20–50. `STD-005` sits at 51; `STD-008` at 424.

The four heaviest documents carry the imbalance:

| Document | Words | Normative verbs |
|---|---|---|
| `STD-008` design system | 23,345 | 55 |
| `STD-001` glossary | 12,905 | 0 |
| `CAN-002` brand and culture | 7,869 | 0 |
| `CAN-004` role structure | 6,846 | 0 |

**50,965 words — 51% of the layer — holding 55 verbs between the four.**
Three of them bind nothing at all.

They are not fat. They are reference material: a production manual, a
dictionary, a brand book, a taxonomy. The Oracle already ruled this for the
design system — *"es normal que sea así de largo"* — and the same reading
applies to the other three. A document that binds nothing is not a failed
standard; it is a different kind of document.

## Scope

### The target, corrected

The original figure — 6,000 words, 7 documents, 30 minutes — was measured
against a total that includes reference material which must not be
compressed. Counting them together makes the goal unreachable by
construction, which is a defect in the target, not in the corpus.

The target applies to the **normative layer**: roughly 48,000 words that
exist to bind. Reference material is named, kept, and excluded from the
counter — not deleted, not shortened, not moved to make the number look
better.

**Reference material at `eb91cbb`** (the four above, ~51,000 words). This
list is the mission's own ruling and may be amended by the Oracle at any
point; each entry needs a reason in this file, not a preference.

### The cut

**If a sentence cannot become a check that passes or fails, it is not a rule
— it is a record.** Records are welcome; they are not standards.

The verb count is an indicator, not the criterion. A document with zero
`MUST` may still hold a real obligation in plain prose, and a document full
of `MAY` may bind nothing. Each document is read before it is classified.

### The work

1. **Write `STD-010`** — the core rules, one line each, each one checkable.
   Extracted from the normative layer, not invented.
2. **Resolve contradictions as they surface**, one per pull request, stating
   which rule wins and why. Two are already resolved and in production
   (`closed`, and filename-as-state).
3. **Supersede, never delete.** When a new rule covers an old document, that
   document takes `status: superseded` with its heir named in frontmatter,
   and stays readable. The Oracle's instruction: *"me parece bien solapar, no
   borrar"*.
4. **Report the counter after every pull request**, including when it moves
   the wrong way. The first phase moved it 4% and that was reported without
   decoration; the same applies for the rest.

### Guards

Every pull request lands with the full suite green: nine guards, telemetry
`--check`, the telemetry test, and the build. Telemetry is regenerated after
the commit, never hand-edited. Baselines are never whitewashed when the
breakage is caused by our own text.

## Out of scope

- **Deleting reference material.** Length is not the defect.
- **Backdating missions** for the five pull requests already merged. `git log`
  is the record; this file is the reasoning.
- **`nwos-workspace-template`** — another repository (`MIS-0106`).
- **The `CAN-005` vs `REUSE.toml` licence contradiction** — `CC-BY-4.0`
  against `CC0-1.0` across 7 directories and 195 documents. Real, open, and
  its own mission: it is a canon-layer ruling, not a compression task.

## Acceptance criteria

1. `STD-010` exists, every line of it convertible into a pass/fail check.
2. Every superseded document carries `status: superseded` and a named heir,
   and remains readable.
3. No contradiction is closed without a written ruling saying which side won.
4. The normative layer reaches the target, or this file records why the
   target was wrong — with numbers, as the first phase did.
5. Words per rule falls from 599 toward the 20–50 range for documents that
   bind.
6. Every pull request in this mission left `main` with the suite green.

## Closure

Closed when the normative layer states its rules once, without
contradictions, and a reader can check any of them against the tree.

Blocking on the Oracle: whether the four reference documents leave the
counter as this file proposes. The mission proceeds on that assumption and
records it as such.
