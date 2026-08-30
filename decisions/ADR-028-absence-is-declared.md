---
id: "ADR-028"
title: "Absence is declared, not omitted — and every closed vocabulary gets a check"
type: adr
status: active
version: "1.0.0"
created: "2026-08-30T09:30:00Z"
created_source: "declared"
created_confidence: exact
updated: "2026-08-30T09:30:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [decision, adr, vocabulary, frontmatter, absence, guard, s-001, s-004]
license: "CC-BY-4.0"
visibility: "public"
deciders: ["oracle"]
consulted: ["ursa"]
outcome: "S-001 §6.3 amended: three forms of absence, TBA countable. Closed vocabularies must be checked. Five standard/guard contradictions recorded."
related: ["S-001", "S-004", "MIS-121", "MIS-122", "D-009", "D-010", "D-025", "ADR-027"]
---
# ADR-028 — Absence is declared, not omitted

> **Summary:** `S-001` §6.3 says *"`null` is not a value: if a field does not
> apply, it is not written."* Sixty-one documents write `null` anyway and no
> check objects. This ADR replaces the prohibition with three declared forms
> of absence, one of them countable, and requires that a closed vocabulary
> without a check is not a vocabulary.
> **Epistemic:** a rule nothing enforces is not a rule, it is a preference
> with good grammar. Five such rules are recorded below.
> **Pragmatic:** unblocks the 142 `area → territory` findings without first
> deciding what the territories are.
> **Audience:** Oracles · Agents

---

## Context

`MIS-121` set out to spend a baseline of 843 header violations down to zero
and stalled after measuring them: **798 of the 843 are blocked on a decision,
not on effort.** The largest single block is `area → territory` (142
documents), and it is blocked on a vocabulary that does not describe what the
repository actually files.

The Oracle's instruction was to stop being blocked by definitions that are
not ready yet: *"there always has to be a null or a not-applicable among the
options, so it is not a blocking issue."* That is correct, and it is what
this ADR grants. It is also, as written today, forbidden by `S-001` §6.3.

### The state of the corpus, measured at `baf188b`

| Fact | Count |
|---|---|
| documents writing `null` in a field | **61** (`completed` ×37, `assigned_to` ×24) |
| of those flagged by the guard | **0** |
| closed vocabularies declared in `S-001` §7 | **5** |
| of those with a value check in the guard | **2** |

The practice already invented the absence marker this ADR is asked to
create. It did so without declaring it and without counting it, which is the
failure mode the Oracle explicitly wanted avoided.

---

## Decision

### 1. Three forms of absence, and they are not interchangeable

`S-001` §6.3 is amended. The sentence *"`null` is not a value: if a field
does not apply, it is not written"* is withdrawn and replaced by:

| Form | Means | Countable |
|---|---|---|
| **field omitted** | the field does not apply to this *kind* of document | by omission |
| **`null`** | the field applies to the kind, not to this document | yes |
| **`"TBA"`** | the field applies and its value is **not decided yet** | **yes, and counted every run** |

An empty value (`field:` with nothing after it) remains an error — `H-09`
stands. Absence is written, not left blank.

The distinction is not decorative. Codd separated *missing but applicable*
from *missing but inapplicable* in `RM/V2` (1990) precisely because SQL's
single `NULL` conflated them and made the conflation unrecoverable. `"TBA"`
is the applicable case: there **is** a territory, nobody has decided it.
`null` is the inapplicable one. Writing `null` where `"TBA"` belongs discards
the information that a decision is owed.

### 2. `"TBA"` is countable, and it expires

The guard reports, on every run, the number of `"TBA"` values per field. It
does **not** fail on them. A marker that cannot be counted is a permanent
hole with a better name.

**Every `"TBA"` names the mission that will resolve it**, in the mission's
scope or in a debt entry. A `"TBA"` with no owner is a violation from the day
it is written — this is the difference between deferring a decision and
forgetting one.

### 3. A closed vocabulary without a check is not a vocabulary

`S-001` §7 opens with *"a value not listed here is not valid. Adding one
requires an ADR."* Measured against the guard:

| Field | Declared in §7 | Value checked | Values in use outside the vocabulary |
|---|---|---|---|
| `type` | yes | **yes** (`H-03`) | 24 |
| `status` | yes | **yes** (`H-04`) | 118 |
| `guild` | yes | **no** | **14** — `Procuradores` ×8, lowercase ×6, two template placeholders |
| `territory` | yes | **no** | **15** of 67 |
| `type_execution` | yes | **no** | **5** — `híbrido` ×3, `técnico`, `technical` |
| `visibility` | **no** | no | vocabulary never declared; `public` ×39, `restricted-oracle` ×1 |

**Three of the five declared vocabularies are unenforced, and a sixth field
is enforced by nobody because it was never declared.** Thirty-four documents
hold values that `S-001` §7 calls invalid, and nothing has ever said so.

Therefore: **a field whose vocabulary is declared closed must have a value
check in `lint-frontmatter.mjs`.** A vocabulary the guard cannot read is a
comment. Adding a value keeps requiring an ADR; adding a *vocabulary* now
requires a check in the same change.

`"TBA"` is a legal value of every closed vocabulary, by construction.

### 4. The 61 existing `null` values are legalised, not migrated

`completed: null` on an unfinished mission and `assigned_to: null` on an
unassigned one are correct under §1 as amended. They stay. No sweep.

---

## Consequences

**Unblocked immediately:**

- `area → territory` — the 142 documents migrate now. The 66 that map onto a
  declared territory take that value; the 76 that do not (43 compound, 33
  orphan) take `"TBA"`, owned by the mission that will define the vocabulary.
  **Nothing is lost that was not already lost** — and the 66 clean values are
  preserved rather than flattened.
- Every future field can ship before its vocabulary is settled, which is what
  makes the governance iterable rather than brittle.

**Newly required, and this ADR is not satisfied without it:**

- Value checks for `guild`, `territory`, `type_execution`, and a declared
  vocabulary for `visibility`.
- A `"TBA"` counter in the guard's summary line.
- `S-004` §2 inherits the amendment by citation — it references `S-001` §6.3
  rather than restating it, so no edit is needed there beyond the finding
  count.

**Cost, stated plainly:** turning on three value checks will surface roughly
**34 new violations** that exist today and are invisible. They go to baseline
on the first run, as `lint-frontmatter` did. The number goes up before it
goes down, and that is the correct direction: an invisible defect counted is
better than an invisible defect.

---

## Contradictions recorded, not fixed here

Found while measuring this decision. Each is a rule that contradicts another
rule or contradicts its own enforcement. **None is resolved by this ADR**;
they are written down so the next iteration does not rediscover them.

1. **`uid`: the standard requires what the guard punishes.** `S-001` §6.2
   requires `uid` declared and left empty; `H-09` flags exactly that form and
   advises omitting the field. **64 documents are counted as debt for
   obeying the standard.** Owned by `MIS-122`, which must close before
   `MIS-121` can empty the 34 hand-written values.

2. **`type: agent` is enforced without the ADR that admits it.** `S-004` §4
   proposes admitting `agent` and says it *"needs its ADR per S-001 §7"*.
   The guard's `TYPES` already contains it; `S-001` §7 still lists ten values
   without it. **No such ADR exists.** The guard is enforcing a vocabulary
   entry that no decision ever ratified — the inverse of the failure this ADR
   is about, and the same crack.

3. **The three unenforced vocabularies** of §3 above, now required to have
   checks but not yet written.

4. **`visibility` is load-bearing and undeclared.** `web/src/lib/corpus.ts`
   gates publication of `debt/` on it. A field that decides what the public
   site shows has no vocabulary in `S-001` and no check anywhere.

5. **The decision series has an unexplained gap.** `decisions/` runs
   `…024, 026, 027` — the number between them was never minted, or was
   minted and dropped, and nothing records which. Per `ADR-005` identifiers
   are never renumbered and gaps are recorded, not filled: this ADR takes
   `028` and leaves the hole. `MIS-116` did exactly this work for the three
   missing mission numbers; `decisions/` has no equivalent.

   *This item also exposes a sixth crack.* Naming a non-existent identifier
   in prose is indistinguishable, to `check-references.mjs`, from citing a
   document that should exist and does not. **This ADR could not name the
   gap it was documenting without failing the reference guard** — so the gap
   is described here in words instead. A corpus that cannot write "this ID
   was never used" is a corpus that cannot record its own history.

---

## Authority

Signed by the Oracle (Pablo FM). Written by `ursa`. Per `S-001` §2.1,
`standards/` carries the `governed` threshold: an ADR, or a PR the Oracle
approves. This is the ADR.

This is a first-iteration governance decision and is expected to be revised.
`ADR-005` protects the identifier; nothing protects the content from being
superseded by a better decision, and it should be.
