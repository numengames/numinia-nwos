---
id: "DBT-021"
uid: ""
title: "Six standards are draft and bind anyway: only one guard reads the status field"
type: documentation
status: active
version: "0.2.1"
created: "2026-09-07T16:40:00+02:00"
updated: "2026-09-10T11:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "CAO"
tags: [debt, governance, guards, ratification]
license: "CC-BY-4.0"
severity: medium
severity_reason: "the status field reads as a switch and is one in a single case out of eleven. A reader who trusts it will believe a draft standard does not bind, and be wrong five times out of six"
detected: "2026-09-07"
visibility: "restricted-oracle"
visibility_reason: "internal governance debt"
opened_by: "ursa"
related: ["MIS-0146", "STD-005", "STD-007", "STD-009", "STD-010", "STD-011", "PRO-013"]
---

# DBT-021 — Draft binds exactly as hard as active

> **Summary:** Six of eleven standards carry `status: draft`. Their rules are
> enforced identically to the five that are `active`, because thirteen of the
> fourteen guards never read the field.
> **Epistemic:** Measured at `a845299` across all fourteen guard scripts.
> **Pragmatic:** Ratification is therefore ceremony in five cases out of six —
> it changes a word and nothing else.
> **Audience:** Oracles

---

## 1. What was measured

| Standard | Status | Enforced today? |
|---|---|---|
| `STD-001` glossary | active | yes |
| `STD-002` governance | active | yes |
| `STD-003` platform roles | active | yes |
| `STD-004` header contract | active | **yes — four guards** |
| `STD-006` archive substance | active | yes |
| `STD-005` engineering | **draft** | yes, by convention |
| `STD-007` plain writing | **draft** | **yes — blocks commits today** |
| `STD-008` design system | **draft** | yes |
| `STD-009` core rules | **draft** | **no — the one real switch** |
| `STD-010` licensing | **draft** | yes |
| `STD-011` external standards | **draft** | n/a, registers rather than binds |

**One guard out of fourteen reads `status`.** `check-core-rules` reads
`STD-009`'s header and enforces only when it says `active`; anything else
reports and exits clean. The comment in that script states the design plainly:
ratification is an edit to a header, not to the script.

The other thirteen enforce regardless. The plain-writing guard is the sharpest
case: it is `draft`, and it blocked two commits on the day this entry was
written.

## 2. Why this matters

A reader who sees `draft` concludes the document does not yet bind. That
conclusion is correct once and wrong five times.

This is the same failure pattern as `DBT-020`, inverted. There, a mark claimed
a machine was checking when none was. Here, a field implies a rule is dormant
when it is enforced.

## 3. What this entry does not propose

**Nothing is ratified as a consequence of opening this.** The guards currently
report rather than bite, by standing order, and turning `STD-009` to `active`
would make eleven rules bite across 257 documents. It happens to cost nothing
today — the guard reports zero breaches — but the decision is the Oracle's and
the moment is not now.

Two coherent exits exist, both for later:

1. **Make the field mean something** — every guard reads it, `draft` reports
   and `active` enforces. Uniform, and it makes ratification a real act.
2. **Admit it is a label** — record that enforcement does not depend on status,
   so no reader is misled.

## 3a. Decision (2026-09-10)

The Oracle chose exit 1. The rule is `ENG-067` in `STD-005` 2.1.0: a guard
fails the build only while the standard holding the plate it cites is
`active`; a draft's findings are reported and exit zero; build guards are the
declared exception. `STD-005` is itself `draft`, so writing the rule changed
no behaviour — which is the rule applied to itself. The shared reader is
`scripts/lib/regime.mjs` (2026-09-10, under `regime.test.mjs`);
`check-core-rules.mjs` is its first adopter. This entry closes when every
rule guard in `ci.yml` imports it and the count in §1 is zero.

## 4. References

- `scripts/check-core-rules.mjs` — the only guard that reads the field
- `STD-009` — the compendium waiting for ratification; zero breaches as of `a845299`
- `DBT-020` — the mirror case: automation claimed, never executed
