---
id: "ADR-023"
uid:
title: "Four terms, two pairs: germinal motive / operating system, regulatory / functional model"
type: adr
status: active
version: "2.0.0"
created: "2026-08-25T13:23:15Z"
created_source: "git:d9ca672"
created_confidence: exact
updated: "2026-08-25T13:23:15Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [decisions, adr, canon, terminology, D-012, disambiguation]
license: "CC-BY-4.0"
related: ["D-012", "MIS-109", "AUD-2026-08-24-canon-edit"]
evidence_script: "reports/audits/evidence/canon-2026-04-15/"
evidence_head: "8770939"
---
# ADR-023 — Four terms, two pairs

> **Numbering note.** `ADR-006`…`ADR-022` are reserved for `numinia-web`
> (`check-references.mjs` treats that range as cross-repo). This repository's
> sequence continues at `ADR-023`.

## Status

**Active.** Ruled by the Oracle, 2026-08-25.

## Context

`D-012` recorded that the canon contradicts itself: 21 documents carried
`Functional Model` and `operating system` while `canon/C-001-welcome-to-numinia.md`
had been edited on 2026-05-06 to say `Regulatory Model` and `germinal motive`.
The diagnosis was **a substitution left unfinished** — one line changed, three
left behind.

**That diagnosis was wrong, and the correction changes what has to be fixed.**

### What the recovered version shows

On 2026-04-15 a canonical document was deleted and replaced sixty-three seconds
later, with no ADR and no pull request. The deleted version was recovered on
2026-08-25 and is filed at
`reports/audits/evidence/canon-2026-04-15/`.

Comparing the two:

| | v1 (deleted 04-15) | v2 (live) |
|---|---:|---:|
| `operating system` | 7 | **5** |
| `Functional Model` | **8** | 0 |
| `Germinal Motive` | 0 | **8** |
| `Regulatory Model` | 0 | **7** |

**v2 keeps `operating system` five times while introducing `Germinal Motive`.**
A substitution would have removed it. v2 was not renaming a concept — it was
**splitting one phrase into two concepts**, and using each in its own place:

> *"Numen Games is a brand, a project aimed at creating a gamified **operating
> system** permeated by narrative"* — v2, line 3

That is `operating system` in the sense of something one operates *within*,
sitting in a document that elsewhere uses `Germinal Motive` for the origin.

### And the definitions diverge, not just the names

| v1 | v2 |
|---|---|
| *"the purposes require a **structural model upon which to be sustained**"* | *"the structure that addresses these needs… **an invariant of a hypothetical nature** that resists all transformation"* |

`Functional` describes **what a thing does**. `Regulatory` describes **what
validates it**. The invariance argument does not exist in v1 at all: it is new
thinking, not a rename.

### So what actually failed

Not the canon, and not the 2026-04-15 rewrite. **The 2026-05-06 edit to
`C-001-welcome-to-numinia.md`**, which took a correct distinction and applied it to a
line where the sense was operative:

```
line 38  It is the germinal motive: the set of ideas… that give rise to the model
line 42  It is the organizational structure that responds to the needs of the
         operating system: a network of roles, spaces, tools…
```

Line 42 explains the Regulatory Model in terms of the `operating system` that
line 38 had just replaced — **because line 38's sense was origin and line 42's
is operation.** The edit propagated a distinction it did not realise it was
propagating.

## Decision

**All four terms are kept. They are two pairs, not two synonyms.**

### `germinal motive`

**Numen Games as the origin of the model.** The seed idea from which everything
is built. In the Peircean analogy, the Object.

> *"It is the germinal motive: the set of ideas, principles, and organizational
> needs that give rise to the model."* — `C-001-welcome-to-numinia.md` §38 ✓

### `operating system`

**The system in operation** — that within which there are positions, roles and
purposes.

> *"What defines a mission is not its size, but its purpose within the Numen
> Games operating system."* — `C-001-welcome-to-numinia.md` §105 ✓

**An origin has no inside; an operating system does.** That is the whole test.

### `Regulatory Model`

**The invariant against which things are measured.** A hypothetical structure
that resists transformation and therefore serves as a reference.

> *"an invariant of a hypothetical nature… it presents a hypothetical body that
> resists all transformation"* — `Epistemic_Relations` v0.2.0 ✓

### `Functional Model`

**The operative structure that executes.** The arrangement that makes purposes
happen.

> *"the purposes require a structural model upon which to be sustained"* — v1,
> recovered ✓

## The disambiguation rule

Four questions, in this order:

| Ask | Answer |
|---|---|
| Is there something **inside** it? | `operating system` |
| Is it the **origin**? | `germinal motive` |
| Does it describe **what it does**? | `Functional Model` |
| Does it describe **what validates it**? | `Regulatory Model` |

The first question resolves most cases on its own, and it is the one the May
edit did not ask.

## The triad, and the label that did not belong to it

**Ruled by the Oracle, 2026-08-25.** `Epistemic_Relations` line 19 governs:

```
operating system = the co-implication of the three
  ├── germinal motive (Numen Games)      the origin
  ├── Functional Model                   the structure that executes
  └── Narrative Projection (Numinia)     the projection
```

### The two triads were never incompatible

Two agents carry this in `MEMORY.md`:

```
Operating System (Numen Games) → Functional Model → Narrative Projection (Numinia)
```

It reads as a rival scheme where `operating system` is the *first level* rather
than the whole. The Oracle's reading dissolves it:

> *"One slot, two names. Line 19 says one of those names belongs to the whole.
> Take it out of the slot and what is left is the same triad."*

**The memories had the sequence right and the first level's label wrong.** That
makes propagation a correction, not a rewrite — and it matters, because a
rewrite would have meant the agents were operating on a different model, while a
mislabel means they were operating on this one under a wrong name.

### `Regulatory Model` is not a fourth element, and not a synonym

The question left open: validating is not one of the three positions, so is
`Regulatory` outside the triad or another name for `Functional`?

**Neither. `Regulatory` and `Functional` are two descriptions of the same slot**,
and the corpus says so twice.

**First, in the definitions of the middle level:**

| v1 (deleted) | v2 (live) |
|---|---|
| *"the purposes require a **structural model** upon which to be sustained"* | *"the **structure** that addresses these needs… an invariant of a hypothetical nature"* |

Same slot, same job — *the structure that answers the origin's needs*. v2 adds
the invariance argument; it does not move the level.

**Second, and decisively — `Pragmatic_Numen_System` §2.3**, uploaded fifteen
minutes after `Epistemic_Relations`:

> *"Function and structure are **distinguishable planes, but not separable**.
> There is no function without structure; no structure without function. But
> they are not the same: function defines the elements, structure defines their
> relationships."*

That is the answer in the canon's own words. **`Functional` and `Regulatory` are
two planes of one level, not two levels** — what the elements do, and what
governs how they relate. Inseparable, and not equivalent.

So:

- **In the triad, the middle slot is one position.** Name it `Functional Model`
  when the sequence is what matters (origin → executes → projects), which is
  what the agents' memories do correctly.
- **`Regulatory Model` names the same slot under its validating aspect** — the
  invariant against which the structure is measured. Use it when the argument is
  about what governs, not about what runs.
- **Neither replaces the other**, and `canon/C-001-welcome-to-numinia.md` line 41
  labelling the level `Regulatory Model` is correct, as is line 45 projecting
  `the functional model`. **They are the same level seen from its two planes.**

What `Welcome` lacks is not a correction but a sentence: nothing tells the
reader that levels 2's two names are two aspects. `MIS-109` adds it.

### If you must pick one, the source prefers `Regulatory`

**Measured in phase D, 2026-08-25.** `Epistemic_Relations` — the document that
introduced the distinction — states the scheme as:

```
GERMINAL MOTIVE → REGULATORY MODEL → NARRATIVE PROJECTION
```

and uses `Regulatory Model` **seven times**. `Functional Model` appears **zero
times in it.**

That does not narrow the ruling: both names remain valid, because they name two
planes of one level and `Pragmatic Numen System` §2.3 is explicit that the
planes are inseparable and not equivalent. `Functional Model` stays correct
wherever the argument is about what runs — `MIS-085`'s *"Domain types =
Functional Model"* is a good use, and `C-002`'s *"Structured Functional Model,
Organizational Operating System, Gamified Narrative Projection"* states the
whole triad correctly.

**But when a writer has no reason to prefer one, the canonical scheme is the
tiebreaker: write `Regulatory Model`.** The source names the middle slot that
way throughout, and the corpus should not drift away from the document it
derives from.

### How this propagates to agents — the part that was missing

An ADR that changes the model and does not touch `MEMORY.md` **leaves the agents
executing the previous one.** This is the first decision in this repository to
require a memory correction, and there was no mechanism for it.

`S-001` §2.1.2 now defines the `live` threshold: a memory is state, not record;
it is corrected when it contradicts canon, and **the correction is recorded
inside the memory itself**, naming who corrected it and against which decision.

Required by this ADR:

| File | Correction |
|---|---|
| `agents/nimrod/MEMORY.md:41` | First level relabelled: `Operating System (Numen Games)` → `germinal motive (Numen Games)`. Sequence unchanged |
| `agents/adonaz/MEMORY.md:40` | Same |
| `canon/README.md:23` | Same relabel in the summary table |

Each carries a `corrections:` entry citing `ADR-023`. **A corrected agent must
be able to see that it was corrected** — a memory silently rewritten produces an
actor that changed its mind without knowing it did.

Not corrected: `MIS-085:61` (`Domain types = Functional Model`) and
`canon/C-002-brand-and-culture.md:1215` are **correct** under this ruling —
both use `Functional Model` for the middle slot.

## Consequences

### `D-012` is rewritten, not closed

It is no longer *"the canon contradicts itself"*. It is **"one edit misapplied a
correct distinction"** — harder to diagnose, easier to fix. The 21 documents are
not all wrong: each has to be read against the rule, and most will be correct
already.

### The Peircean trichotomy is restated with the terms separated

`C-001-welcome-to-numinia.md` §36–44 lays out three levels mapped onto Peirce's
Object / Ground / Representamen. With `germinal motive` and `operating system`
now distinct, that passage needs rewriting — and it is canon, so it is `sealed`:
this ADR authorises the rewrite, `MIS-109` executes it.

### v1 stays as evidence

`reports/audits/evidence/canon-2026-04-15/` is **not canon**: no frontmatter, no
registration, not to be cited as authority. It exists so the archive can show
that the invariance concept is new rather than inherited — which is the evidence
this ADR rests on.

## What this ADR does not decide

- **The 2026-04-15 deletion.** Christian had authority — the Oracle confirmed
  the two accounts are one person, listed as Oracle in
  `canon/C-002-brand-and-culture.md`. What was missing was **trace**, not
  permission. Registered as `D-026`.
- **Whether `Welcome`'s three-level scheme should name the two planes.** This
  ADR establishes that level 2 has two aspects; adding a sentence to the canon
  saying so is `MIS-109`'s work, under `sealed`.

## References

- `D-012` — the terminology split, now rediagnosed
- `AUD-2026-08-24-canon-edit.md` — the audit of the May edit
- `reports/audits/evidence/canon-2026-04-15/` — v1, recovered
- `MIS-109` — executes the corrections in canon
- `ADR-004` — identifier convention (and why this is `ADR-023`)
