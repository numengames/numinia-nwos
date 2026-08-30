---
id: "MIS-124"
title: "Close the territory vocabulary — the field every TBA is waiting on"
type: mission
status: todo
version: "1.0.0"
created: "2026-08-30T11:45:00Z"
created_source: "git:b09311c"
created_confidence: exact
updated: "2026-08-30T11:45:00Z"
author: "ursa"
owner: "oracle"
license: "CC-BY-4.0"
territory: "Archive"
guild: "Exegetes"
tags: [governance, frontmatter, vocabulary, territory]
priority: high
effort: M
type_execution: digital
---

# MIS-124 — Close the `territory` vocabulary

## Why this mission exists

`ADR-028` ruled how `area` becomes `territory`: the documents that map to a
declared territory take their value, **and the ones that do not take `TBA`**.

`TBA` is not a shrug. `ADR-028` L95-97 is explicit: **a `TBA` without a mission
that will resolve it is a parking space, and parking spaces are forbidden.**

This is that mission. Every `TBA` written into `territory` by phase 3 of the
header burndown names this document as its owner.

## The measured problem

The declared vocabulary (`S-001` L964) has eight values:

> `CAO` · `Product` · `Platform` · `Infrastructure` · `Content` · `Sales` ·
> `Funding` · `Archive`

**Of those eight, the corpus uses two.**

Meanwhile four values in daily use are not declared at all: `Canon` ×8,
`Standards` ×3, `Legal` ×3, `Governance` ×2.

Verified at `b09311c`. Of the 142 documents still carrying `area`:

| | count |
|---|---|
| map cleanly to a declared territory | **66** |
| compound (`Platform / numinia-web` ×15) | 42 |
| orphan (`web` ×12, `Documentation`) | 34 |
| **→ will take `TBA`** | **76** |

`ADR-028` predicted 66 / 76. The measurement agrees exactly.

## The judgement on the table

**Ursa's position, for the Oracle to accept or overrule: usage wins.**

A vocabulary that got two of its eight values right is not describing this
organisation. `Canon`, `Standards`, `Legal` and `Governance` have been in
service for months and describe real divisions of the work.

The counter-argument, stated fairly: a vocabulary that absorbs whatever it
finds stops being a vocabulary. If `territory` is meant to be a *deliberate*
map of the organisation rather than a description of its filing habits, then
the 16 documents migrate and the eight declared values stand.

**This mission does not decide. The Oracle decides. This mission carries the
measurement to the decision, and the migration after it.**

## Acceptance criteria

- [ ] Every value carried by `territory` is either declared in `S-001` §7 or
      migrated to one that is — measured, not asserted
- [ ] Zero `TBA` remain in `territory` — each one resolved to a real value
- [ ] `S-001` §7 amended with the decided vocabulary, dated and versioned
- [ ] The `territory` value check is live in `lint-frontmatter.mjs` and fails
      in both directions (`P-013`)
- [ ] `field-decisions.mjs` reports `territory` as `ruled` from the standard,
      not from a hand-wired `VOCAB` block

## Dependencies

- **Blocked by:** phase 3 of the header burndown (the rename must land first —
  there is no point closing a vocabulary for a field 142 documents do not yet
  carry)
- **Blocks:** nothing. Every `TBA` is countable and owned in the meantime.

## The trap this mission must avoid

Turning the check on before the vocabulary is decided would mark **16 documents
that are correct** — they carry values that describe reality better than the
declared list does. A guard that fails correct documents teaches people to
ignore guards.

**Decide first, enforce second.**
