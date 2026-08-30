---
id: "ADR-029"
title: "Sign what the machines already enforce: S-004 active, type agent admitted"
type: adr
status: active
version: "1.0.0"
created: "2026-08-30T10:30:00Z"
created_source: "declared"
created_confidence: exact
updated: "2026-08-30T10:30:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, ratification, governance, frontmatter]
license: "CC-BY-4.0"
related: ["S-001", "S-004", "ADR-028", "D-001"]
---

# ADR-029 — Sign what the machines already enforce

**Status:** active · **Decided:** 2026-08-30 · **Oracle:** Pablo FM

## Context

`S-004` was written on 2026-08-28 and left at `status: draft`, `version 0.2.0`.
Two days later `lint-frontmatter.mjs` — seventeen checks derived from that
draft — was wired into `ci.yml` and began blocking merges on every pull
request.

For two days the repository has been **enforcing by machine a standard nobody
signed**. A draft binds no one; the guard binds everyone. The apparatus
acquired more authority than the Oracle, quietly, as a side effect of wiring
D-017.

The same inversion appears one level down. `S-004` §4 proposes admitting
`type: agent` and says, in its own words, that it *"needs its ADR per S-001
§7"*. That ADR was never written — and the guard enforces `agent` anyway, on
all 24 documents of the `agents/` series.

Neither inversion is a drafting slip. Both are the same failure mode:
**a check shipped before the decision that authorises it.** It is the mirror
image of `D-001`, where rules were declared and nothing enforced them.

## Decision

**1. `S-004` is ratified: `draft` → `active`, version `1.0.0`.**

The standard is signed as it stands. Its seventeen checks have been running
against every PR since run `33276755484` and have already proved themselves
in the hardest possible way: they rejected `ADR-028` from its own author
(`H-13`, plus two broken references) and forced a correction instead of a
baseline entry.

**2. `type: agent` is admitted**, strict, mapped to the `agents/` series.

`S-001` §3's canonical map has no row for `agents/` — the series that answers
*who acts* had no admitted genre. That is a gap in the standard, not drift in
the corpus. The value is admitted because it is right, and the record states
plainly that the guard enforced it first.

**3. `S-001` §6.3 is amended per `ADR-028`** — three declared forms of
absence, replacing *"null is not a value"*. `S-004` §2 inherits the change by
citation and is updated to match.

## Consequences

- `S-004` becomes citable as binding. Anything that referenced "the draft"
  now references a signed standard at `1.0.0`.
- The `type` vocabulary is 11 values, not 10: the ten of `S-001` §7 plus
  `agent`. **The other seven intruders remain drift** and are still scheduled
  for migration by `S-004` §4 — this ADR admits one value, not eight.
- `null` and `"TBA"` become writable. Sixty-one documents that already write
  `null` stop being silent violations without a single edit.
- **Nothing in this ADR changes what any machine checks.** The value checks
  for `guild`, `territory` and `type_execution`, and the `"TBA"` counter, are
  still unimplemented. `ADR-028` and this ADR are both paper until that work
  lands.

## What this does not decide

- The `territory` vocabulary itself. Four values in use are undeclared, six
  declared values are unused; `"TBA"` exists precisely so that migration is
  not blocked on settling it.
- The seven remaining `type` intruders (`decision` ×6, `technical` ×4,
  `roster` ×4, `standard` ×3, `audit` ×2, `proposal` ×2, `template` ×1).
- Whether a guard may ever ship ahead of its standard again. This ADR cleans
  up two instances; it does not write the rule that prevents a third.

## Evidence

Measured on `main` @ `fd4d045`, 2026-08-30:

| Claim | Value |
|---|---|
| `S-004` status before this ADR | `draft`, `version 0.2.0` |
| Guards wired in `ci.yml` | 4 |
| Checks derived from `S-004` | 17 |
| Documents carrying `type: agent` | 24 |
| Distinct `type` values in the corpus | 18 |
| Documents already writing `null` | 61 |

### The guard rejected this ADR too

On first run `H-09` refused this file for writing `uid:` and `supersedes:`
empty — the same rule `ADR-028` amends, still enforced by the code, because
the code has not been changed yet. **The document that ratifies the standard
had to obey the version of the standard it supersedes in order to be
committed.**

Both fields were removed rather than baselined. This is not a footnote: it is
the sharpest available proof that a signed decision changes nothing until the
checks move. `S-001` §6.2 still requires `uid` declared-and-empty, and
`lint-frontmatter.mjs` still punishes exactly that — `MIS-122` is the mission
that fixes it, and until it lands, obeying the glossary breaks CI.
