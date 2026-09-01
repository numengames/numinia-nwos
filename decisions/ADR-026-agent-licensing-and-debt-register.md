---
id: "ADR-026"
uid:
title: "Licensing of agents and the single debt register"
type: adr
status: active
version: "2.0.0"
created: "2026-08-30T12:00:00+02:00"
updated: "2026-08-31T18:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [licensing, cc0, agents, debt, c-005, governance]
absorbs: ["ADR-031"]
superseded_by: null
license: "CC-BY-4.0"
related: ["C-005", "D-038", "ADR-030", "STD-001", "MIS-127"]
---

# Agent licensing and the debt register

> **Summary:** Agent definitions are CC0. Debt is recorded in one register.
> Both are amendments owed to `C-005`.

## Decision

**`agents/**` definitions are CC0.** SOUL, OPERATOR and SOURCES files carry
`license: "CC0-1.0"`. An agent definition is a description of behaviour: the
system gains nothing by restricting its reuse and loses adoption by trying.

**One debt register: `debt/`.** Every known defect is a `D-NNN` document in
`debt/`. No parallel registers — not a standalone legal-debt file, not a
section inside a
mission, not a list in a report. Absorbed from ADR-031.

## Why

Both narrow `C-005`, which assigned licences by directory and assumed debt
could live wherever it was found. A defect recorded in two places is
resolved in neither; a defect recorded in none is D-033.

## Consequences

- `C-005` owes a formal amendment for both clauses — tracked as **D-038**.
  Until it lands, this ADR is the operative rule and `C-005` is stale.
- `scripts/check-license-frontmatter.mjs` enforces the CC0 field; it does
  **not** verify the claim is legally correct.
- Two agent-facing documents (`CLAUDE.md`, `agents/lexa/SOURCES.md`) still
  point at the retired standalone legal-debt file; both are baselined.

## History

- v2.0.0 (2026-08-31) — MIS-127: absorbs ADR-031 (one debt register). Both
  are the same pending amendment to C-005.
- v1.0.0 (2026-08-30) — agent definitions are CC0.
