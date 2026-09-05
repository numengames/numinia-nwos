---
id: "DBT-015"
uid: ""
title: "The CORE-45 guard demands an heir from withdrawn documents, which by definition have none"
type: documentation
status: active
version: "1.0.0"
created: "2026-09-05T10:45:00+02:00"
created_source: "git:94ba0f8"
created_confidence: exact
updated: "2026-09-05T10:45:00+02:00"
author: "ursa"
owner: "oracle"
tags: [guards, standards, core-rules, lifecycle]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "Ursa, 2026-09-05"
guild: "Exegetes"
territory: "Archive"
---

# The `CORE-45` guard demands an heir from withdrawn documents, which by definition have none

## Summary

`scripts/check-core-rules.mjs` treats `withdrawn` as if it were `superseded`
and reports a breach when no `superseded_by` is present. A withdrawn document
has no heir — that is what distinguishes it from a superseded one. The guard
condemns the correct use of the field.

## The defect

`scripts/check-core-rules.mjs`:

```js
if (['superseded', 'retired', 'withdrawn'].includes(f.status) && !f.superseded_by)
  record('CORE-45', `status ${f.status} with no heir`, r);
```

`CORE-45` reads: *"A superseded document names its heir."* It says nothing
about `withdrawn`. The rule is about supersession; the guard applies it to
three statuses.

The distinction the corpus draws:

- **`superseded`** — an heir exists and is named. The obligation moved.
- **`withdrawn`** — the rule is gone and nothing replaced it. There is no heir
  to name, and inventing one to satisfy a guard would be a false statement in
  frontmatter.

## Why it is inert today

Two reasons, both temporary:

1. `check-core-rules.mjs` is not wired into `.github/workflows/ci.yml`.
2. `STD-009` is `draft`, and the guard reads that status: while it is anything
   other than `active` it reports and exits 0.

Either of those changing makes this bite. Ratifying `STD-009` — which
`MIS-146` plans to do by batch — flips the second one.

## Why it is not fixed here

The guard belongs to the guard-redesign work, not to this record. Changing it
while `MIS-146` is rewriting the rules it enforces would put two hands on the
same file. The fix is one line: drop `withdrawn` from that array, or split the
check so `withdrawn` asserts the absence of an heir instead of its presence.

The second form is better — it turns a silent allowance into a positive
check — but it is a design decision for the guard redesign, not a patch.

## A second defect in the same neighbourhood

`CORE-23` requires the first number to rise when a document reverses an
obligation. `STD-002` reserves the `v1.X.0 → v2.0.0` move to the Oracle.

An agent that reverses an obligation is therefore required by one rule to do
something another rule forbids it to do alone. Neither document declares the
escalation. This is not a contradiction to be resolved by an agent: it needs a
sentence saying that a reversal escalates to the Oracle by definition, and
that sentence is the Oracle's to authorise.

Recorded here, not decided.

## References

- [`STD-009` — Core rules](../standards/STD-009-core-rules.md) `CORE-23`, `CORE-45`
- [`STD-002` — Governance](../standards/STD-002-governance.md)
- [`MIS-146` — Normative refoundation](../missions/MIS-0146-normative-refoundation.md)
- `scripts/check-core-rules.mjs`
