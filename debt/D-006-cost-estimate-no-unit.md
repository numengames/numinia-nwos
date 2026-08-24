---
id: "D-006"
uid:
title: "cost_estimate: a number without a unit"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T00:38:00Z"
updated: "2026-08-25T00:38:00Z"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Archive"
tags: [debt, frontmatter, vocabulary, undefined, cost]
license: "CC-BY-4.0"
severity: low
opened_by: "S-001 §11"
evidence_script: "scripts/count-evidence.py"
evidence_head: "9b45016"
---
# D-006 — `cost_estimate`: a number without a unit

> **Summary:** 2 documents estimate a cost. Nothing says cost of what, in what.
> **Epistemic:** A quantity without a unit is not a measurement.
> **Pragmatic:** Cannot be summed, compared or budgeted against.

## OPEN QUESTION

Cost in what unit, and cost of what?

For an organisation running on humans and digital agents, at least three
different things are called cost:

- **Money** — euros spent on services, infrastructure, licences.
- **Compute** — tokens, GPU hours, API calls.
- **Human time** — the scarcest of the three, and the one `effort` (XS…XL)
  already gestures at.

The three do not convert into each other, and a mission that is cheap in one may
be expensive in another. **A single unnamed field cannot hold all three.**

## Measured

**2 documents.** As with `D-005`, the low count suggests a field introduced
without a definition and quietly abandoned.

Note that `effort` (XS · S · M · L · XL) already covers human time and is used
consistently. If `cost_estimate` was meant to capture that, it is a duplicate;
if it was meant to capture money or compute, it needs a unit and a name that
says so — `cost_eur`, `cost_tokens`.

## CLOSURE

Marked RESOLVED when the Oracle rules one of:

1. **Split and name the unit.** `cost_eur` and/or `cost_tokens`, defined in
   `S-001` §6, with `effort` retained for human time.
2. **Retire it.** Two uses, no unit, and `effort` already carries the dimension
   most missions care about.

| | |
|---|---|
| Severity | low — 2 documents, overlaps an existing field |
| Owner | Oracle |
| Blocked by | nothing |
| Opened | 2026-08-24, by `S-001` §11 |
| Closes when | split with units, or retired in favour of `effort` |
