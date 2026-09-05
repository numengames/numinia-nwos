---
id: "ADR-038"
uid: ""
title: "The genre map is government, not description: STD-002 absorbs SYS-004 and answers which document wins"
type: adr
status: active
version: "1.0.0"
created: "2026-09-05T09:45:00+02:00"
updated: "2026-09-05T09:45:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [governance, taxonomy, precedence, relations, absorbs, ADR-035]
license: "CC-BY-4.0"
related: ["ADR-035", "ADR-030", "ADR-004", "STD-002", "STD-004", "MIS-147"]
---

# The genre map is government, not description

> **Summary:** `SYS-004` was written as a system manual describing how the
> document genres relate. It described relations it had no authority to settle.
> `STD-002` absorbs it, gains the four precedence rules and the procedure for
> changing a standard, and registers `absorbs` for the `standards/` series.
> **Epistemic:** `ADR-035` ruled that a folder is a genre. This rules on the
> consequence nobody drew: if the shelf declares the genre, then a document
> about *which shelf outranks which* is not shelvable as description. It is a
> rule about rules, and rules live in `standards/`.
> **Pragmatic:** Before filing a document, ask whether it settles anything. If
> it does, it is not a manual.

## Decision (Oracle, 2026-09-05)

**1. `STD-002` absorbs `SYS-004`.** The absorbing document declares
`absorbs: ["SYS-004"]`, so the identifier keeps resolving under `ADR-004`
rule 4, which never frees an old identifier. The file is removed rather than
moved to `history/`: it lived two days, was never `active`, and had no incoming
citation outside its own mission. `history/` holds records that were *load-
bearing and got replaced*; this was neither.

**2. Two sections survive the absorption, three do not.** Kept: the genre map
(what question each series answers) and the relation vocabulary. Dropped: the
lifecycle diagram, the seven-part relation taxonomy, and the filing
questionnaire — all three restated `STD-001` §2.2 at greater length. A rule
stated twice is a rule that will diverge.

**3. `STD-002` answers which document wins.** Four rules, in order: git history
outranks documents; the tree outranks prose; between documents, the higher
change threshold wins; at equal threshold, the later ruling wins and must name
what it overrides. A document does not become authoritative by claiming to be.

*Rationale for ordering by change threshold, not importance:* importance is
arguable and unrecorded. The threshold is already declared per series in
`STD-001` §2.2, so a reader can settle a conflict without asking anyone.

**4. `standards/` may declare `absorbs`.** Registered in `STD-004` §6 per
`H-30`, which requires a registry line plus this record. The field was
previously registered for `decisions/` and `debt/` only — the case of a manual
merging into the standard that governs it had not arisen.

**5. The permission table covers every series that exists.** It previously
omitted `standards/`, `system/`, `debt/`, `guilds/`, `history/` and
`templates/` — including, notably, the series the document itself belongs to.
A governance table that cannot say who edits a standard is not answering its
own title.

## Consequences

- A reader asking *who decides* opens one `active` document, not a `draft`
  manual plus a glossary plus a core-rules file.
- `MIS-147` closes with two acceptance criteria met by a different file than
  they name, and one criterion (`status: draft`) deliberately unmet. Recorded
  in the mission's Closure section.
- `STD-009` §2 still states a precedence ladder in `draft`. It is not
  contradicted by this record — `STD-009` orders the same series the same way —
  but the binding statement is now in `STD-002`. When `STD-009` is ratified,
  its §2 should point here rather than restate it.

## References

| ID | Name | Why cited |
|---|---|---|
| `ADR-035` | A folder is a genre | Established that the shelf declares the genre; this record draws the consequence for documents that govern rather than describe. |
| `ADR-004` | Identifier convention | Rule 4 never frees an identifier, which is why `absorbs` is required rather than optional. |
| `STD-002` | Governance | The absorbing document. |
| `STD-004` | Header standard | `H-30` requires the registry line and this record. |

---

*Numinia NWOS · decision record · CC-BY-4.0*
