---
id: "ADR-027"
uid:
title: "The header apparatus is ratified: STD-001, STD-004, and declared absence"
type: adr
status: active
version: "2.0.0"
created: "2026-08-30T14:00:00+02:00"
updated: "2026-08-31T18:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [frontmatter, standards, s-001, s-004, absence, ratification]
absorbs: ["ADR-028", "ADR-029"]
superseded_by: null
license: "CC-BY-4.0"
related: ["STD-001", "STD-004", "ADR-004", "D-021", "MIS-127"]
---

# The header apparatus is ratified

> **Summary:** Three acts of one ratification: the frontmatter standard,
> the rule that absence is written down, and the signature rule for what
> machines enforce.

## Decision

**STD-001 is ratified.** The glossary and frontmatter standard is normative.
Fields, types and thresholds are defined there, not restated here.

**Absence is declared, never implied.** A field that does not apply is
written with an explicit empty value, not omitted. An omitted field is
indistinguishable from an oversight; a declared empty one is a statement.
Absorbed from ADR-028.

**Sign what machines enforce.** A rule a guard enforces must exist as a
signed document. A guard without a ratified rule behind it is an
undocumented policy that happens to run. Absorbed from ADR-029.

## Why

Each answers "what does the header mean and who guarantees it". Ratified
across 48 hours as one apparatus.

## Consequences

- `type: meta` for indexes and apparatus (`STD-001` §3). `decisions/INDEX.md`
  declared `type: adr` and `canon/INDEX.md` `type: seminal` — both wrong,
  tracked as **D-021**.
- New guards require a signed rule first; the reverse order is the defect
  D-029 records.
- `scripts/lint-frontmatter.mjs` enforces shape, not truth.

## History

- v2.0.0 (2026-08-31) — MIS-127: absorbs ADR-028 (absence is declared) and
  ADR-029 (sign what machines enforce). One ratification, three acts.
- v1.0.0 (2026-08-30) — STD-001 ratified.
