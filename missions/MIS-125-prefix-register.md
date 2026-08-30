---
id: "MIS-125"
title: "The prefix register — four series carry identifiers no rule knows about"
type: mission
status: todo
version: "1.0.0"
created: "2026-08-30T11:50:00Z"
created_source: "git:b09311c"
created_confidence: exact
updated: "2026-08-30T11:50:00Z"
author: "ursa"
owner: "oracle"
license: "CC-BY-4.0"
territory: "Archive"
guild: "Exegetes"
tags: [governance, identifiers, prefixes, adr-005]
priority: medium
effort: M
type_execution: digital
---

# MIS-125 — The prefix register

## Why this mission exists

The Oracle, 2026-08-30, on being shown three misplaced prefixes:

> *"I'd put all the prefixes there. We have a problem, because I've seen it in
> several places too, and they have to be put in and decided properly. It
> doesn't need doing in this first pass if we can avoid it."*

He was right, and the measurement is worse than the three files that prompted
it. **This mission exists because the Oracle saw a pattern where I had reported
an incident.**

## The measured problem

`ADR-005` registers a prefix per series. `lint-frontmatter.mjs` implements it:

```
missions: MIS   ·  decisions: ADR|DEC  ·  protocols: P   ·  debt: D
standards: S    ·  canon: C            ·  agents: AG     ·  reports: RPT|AUD
```

Eight series registered. **The corpus carries identifiers in at least twelve**,
verified at `b09311c`:

| Series | Registered | Actually carried |
|---|---|---|
| `missions/` | `MIS` | `MIS` ×126, **`ANNEX` ×1, `PROP` ×1** |
| `reports/` | `RPT`, `AUD` | `AUD` ×11, `RPT` ×10, **`PROP` ×1** |
| `blueprints/` | **— not registered —** | `BP` ×16, `AUDIT` ×2, `WARDLEY` ×1, `blueprints` ×1 |
| `operations/` | **— not registered —** | `O` ×8, `ops` ×2 |
| `guilds/` | **— not registered —** | `charter` ×4, `roster` ×4 |
| `infra/` | **— not registered —** | `INFRA` ×1 |
| `decisions/` | `ADR`, `DEC` | + `decisions` ×1 |
| `canon/` | `C` | `C` ×6, **`canon` ×4** |
| `protocols/` | `P` | `P` ×13, **`APR` ×1** |

**Four whole series carry identifiers that no rule has ever seen**:
`blueprints/`, `operations/`, `guilds/`, `infra/`. Between them, 39 documents.

The three misplaced files that started this — `ANNEX`, `PROP` ×2 — are the
visible tip. The register itself is the problem.

## What this mission decides

For every series that carries identifiers:

1. **Which prefix is canonical**, including the ones nobody has ruled on
   (`BP`? `blueprints`? neither?)
2. **Whether lowercase descriptive ids are legal at all** — `charter-alchemists`,
   `roster-sentinels`, `canon-index` are a second convention living alongside
   the numbered one
3. **What happens to a document whose prefix does not match its folder** —
   move it, retire it, or register the prefix
4. **Whether the register belongs in `ADR-005` as an amendment or in `S-004`
   as a table** — `S-004` is where the ring tables already live

## Acceptance criteria

- [ ] Every series carrying identifiers appears in the register — twelve, not
      eight
- [ ] Every `id` in the corpus matches its series' registered prefix, or its
      exception is declared and dated
- [ ] The check is live in `lint-frontmatter.mjs` and fails in both directions
      (`P-013`)
- [ ] `H-01` prefix findings reach zero, and the count is measured against the
      filesystem, not the baseline file alone

## Dependencies

- **Not blocked.** Independent of the header burndown.
- **Overlaps `D-008` — verified, not assumed.** `D-008` is titled *"Four series
  carry a registration scheme the corpus does not yet apply"* and names the same
  four unregistered series this mission measured independently. **This mission
  is the execution of `D-008`, not a second opinion on it.** Read `D-008` first;
  if it already answers question 1, this mission inherits the answer rather than
  re-deciding it.

## The prior constraint

`S-001`: *"never renumber — an identifier is a promise about the past."*

That promise is real but narrower than it sounds. Measured: the 13 descriptive
ids (`charter-*`, `roster-*`, `*-index`) have **zero incoming citations in the
entire corpus** — each appears only inside its own file. The promise protects
identifiers someone uses. Nobody uses these.

**Before renaming anything here, measure its incoming citations.** The rule is
not "never rename"; it is "never break a reference that exists".
