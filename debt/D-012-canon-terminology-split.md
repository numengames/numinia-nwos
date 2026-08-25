---
id: "D-012"
uid:
title: "The canon contradicts itself on its own terminology"
type: documentation
status: resolved
version: "1.0.0"
created: "2026-08-24T20:50:00Z"
updated: "2026-08-24T20:50:00Z"
author: "ursa"
owner: "oracle"
guild: "Exegetes"
territory: "Archive"
tags: [debt, canon, terminology, coherence]
license: "CC-BY-4.0"
visibility: "public"
severity: high
opened_by: "AUD-2026-08-24-canon-edit"
---
# D-012 — The canon contradicts itself on its own terminology

> **Summary:** A partial edit to canon in May left two vocabularies live at
> once. The corpus follows the older one.
> **Epistemic:** An agent reading one canon document learns a term another canon
> document denies.
> **Pragmatic:** Until this closes, no document can cite "the canonical term"
> for the model without saying which canon file it read.

## The gap, measured

Commit `fee903b` (2026-05-06) replaced two definitions in
`canon/C-001-welcome-to-numinia.md`:

```diff
-  It is the operating system: the set of ideas...
+  It is the germinal motive: the set of ideas...
-2. **Functional Model**
+2. **Regulatory Model**
```

Four months later, across all tracked `.md`:

| Term | Documents | Status |
|---|--:|---|
| `operating system` | **28** | replaced in one line of one file |
| `Functional Model` | **21** | **withdrawn from canon** |
| `germinal motive` | 7 | the new term |
| `Regulatory Model` | 7 | the new term |

**The edited file itself uses both.** Line 38 says *germinal motive*; lines 25,
42 and 105 still say *operating system* — line 42 explains the *Regulatory
Model* in terms of the *operating system* it replaced.

**Four canon documents carry the withdrawn term:**

- `canon/C-002-brand-and-culture.md`
- `canon/C-004-role-structure.md`
- `canon/2026_04_15-Epistemic_Relations_Between_Numen_Games_and_Numina-v0.2.0.md`
- `canon/README.md`

And it has spread beyond canon: `agents/adonaz/MEMORY.md` and
`agents/nimrod/MEMORY.md` hold the retired term in agent memory; `MIS-085` cites
it in an active mission.

## Why this is high severity

Canon is the series the archive tells agents to read **before asserting
anything** about the model. Two agents reading two canon files reach
incompatible conclusions, and neither has any way to know.

This is also the clearest evidence for `D-011`: a `sealed` threshold with no
mechanism does not fail loudly. It fails quietly and propagates. The edit was
small, plausible and uncontested — and it left the founding document
incoherent for four months without anything noticing.

## Closing condition

Marked RESOLVED when:

1. The Oracle rules on the term — `germinal motive` / `Regulatory Model`, or
   `operating system` / `Functional Model`. **Either is defensible; the current
   state is not.** The ruling belongs in an ADR.
2. The ruling is propagated **completely**, in one operation: the 4 canon
   documents, then the 21 across the corpus, then the two `MEMORY.md` files.
3. A term count before and after is recorded in the PR, so "complete" is a
   number and not a claim.

## What would prevent a recurrence

A terminology guard. `S-001` §7 closes vocabularies for frontmatter; nothing
closes the vocabulary of the prose, which is where canon actually lives. A guard
that fails when a retired term reappears is cheap — but it needs a list of
retired terms, and that list is the output of step 1.

## RESOLVED 2026-08-25 — rediagnosed, not executed

**The diagnosis was wrong, and that is the finding.**

This entry said the canon contradicted itself: an unfinished substitution, one
line changed and three left behind. `MIS-109` phase D tested all **66 live uses**
of the four terms against `ADR-023`'s rule.

**65 of 66 are correct.** The retirement never happened because there was
nothing to retire: `operating system`, `germinal motive`, `Functional Model` and
`Regulatory Model` are **two pairs with distinct senses**, not one term replacing
another.

What actually happened, established by recovering the version deleted on
2026-04-15:

- **2026-04-15** — `Epistemic_Relations` v2 introduced the distinction, keeping
  `operating system` five times *while* introducing `Germinal Motive`. A
  substitution would have removed it.
- **2026-05-06** — the edit to `Welcome to Numinia` applied that correct
  distinction to a line whose sense was operative. **One edit misapplying a
  correct distinction**, not a corpus in contradiction.

### What was actually done

| | |
|---|---|
| Corrections in canon | **2** — `C-001` line 62 (phase B) and line 66 (phase D) |
| Documents needing change | **1** of the 21 this entry predicted |
| Ruling | `ADR-023` — four terms, two pairs, with a disambiguation rule |
| Propagated to | `agents/nimrod`, `agents/adonaz`, `canon/README.md`, each with a recorded correction (`S-001` §2.1.2) |

### Why this stays open in the register rather than being deleted

`debt/` is append-only. **An entry resolved with its trace is worth more than
one that never existed** — and this one is worth more than most, because it
records that a defect carried since May was misdiagnosed for four months and
that measuring it dissolved it.

The closing condition asked for *"one vocabulary, propagated, with counts
recorded"*. The answer is that **one vocabulary was the wrong goal**: there are
four terms, they are all live, and the corpus was already using them nearly
correctly.

## State

| | |
|---|---|
| Severity | ~~high~~ → **resolved** |
| Owner | Oracle |
| Blocked by | — |
| Opened | 2026-08-24, by `AUD-2026-08-24-canon-edit` |
| Closed | 2026-08-25, `MIS-109` phase D — `ADR-023` |
| Outcome | Rediagnosed: not a contradiction, a misapplied distinction |
