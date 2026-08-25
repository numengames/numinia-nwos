---
id: "ADR-023"
uid:
title: "Four terms, two pairs: germinal motive / operating system, regulatory / functional model"
type: adr
status: active
version: "1.0.0"
created: "2026-08-25T13:23:15Z"
created_source: "git:d9ca672"
created_confidence: "exact"
updated: "2026-08-25T13:23:15Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [decisions, adr, canon, terminology, D-012, disambiguation]
license: "CC-BY-4.0"
adr_id: "ADR-023"
supersedes: ""
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
`Functional Model` and `operating system` while `canon/Welcome to Numinia.md`
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
`Welcome to Numinia.md`**, which took a correct distinction and applied it to a
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
> needs that give rise to the model."* — `Welcome to Numinia.md` §38 ✓

### `operating system`

**The system in operation** — that within which there are positions, roles and
purposes.

> *"What defines a mission is not its size, but its purpose within the Numen
> Games operating system."* — `Welcome to Numinia.md` §105 ✓

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

## Consequences

### `D-012` is rewritten, not closed

It is no longer *"the canon contradicts itself"*. It is **"one edit misapplied a
correct distinction"** — harder to diagnose, easier to fix. The 21 documents are
not all wrong: each has to be read against the rule, and most will be correct
already.

### The Peircean trichotomy is restated with the terms separated

`Welcome to Numinia.md` §36–44 lays out three levels mapped onto Peirce's
Object / Ground / Representamen. With `germinal motive` and `operating system`
now distinct, that passage needs rewriting — and it is canon, so it is `sealed`:
this ADR authorises the rewrite, `MIS-109` executes it.

### v1 stays as evidence

`reports/audits/evidence/canon-2026-04-15/` is **not canon**: no frontmatter, no
registration, not to be cited as authority. It exists so the archive can show
that the invariance concept is new rather than inherited — which is the evidence
this ADR rests on.

## What this ADR does not decide

- **Whether `Functional Model` is still needed.** It is preserved with a defined
  sense, but nothing currently requires it. If a pass over the corpus finds no
  correct use, retiring it is a separate decision.
- **The 2026-04-15 deletion.** Christian had authority — the Oracle confirmed
  the two accounts are one person, listed as Oracle in
  `canon/Numinia Brand and Culture.md`. What was missing was **trace**, not
  permission. Registered separately.

## References

- `D-012` — the terminology split, now rediagnosed
- `AUD-2026-08-24-canon-edit.md` — the audit of the May edit
- `reports/audits/evidence/canon-2026-04-15/` — v1, recovered
- `MIS-109` — executes the corrections in canon
- `ADR-004` — identifier convention (and why this is `ADR-023`)
