---
id: "D-014"
uid:
title: "count-evidence.py measures apparatus as if it were record"
type: documentation
status: closed
version: "2.0.0"
created: "2026-08-24T21:05:00Z"
updated: "2026-08-31T16:40:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, evidence, tooling, measurement]
license: "CC-BY-4.0"
visibility: "public"
severity: low
opened_by: "S-001 §10"
---
# D-014 — `count-evidence.py` measures apparatus as if it were record

> **Summary:** The registration counter includes `INDEX.md` and `README.md`,
> which are `meta` and correctly outside every scheme.
> **Epistemic:** The instrument that produces the archive's evidence has a
> known bias, and it is written down rather than silently patched.
> **Pragmatic:** Coverage percentages in `S-001` §4.1 read lower than reality
> for series that carry apparatus.

## The gap

`protocols/` reports **11/13**. The two "failures" are:

```
protocols/INDEX.md
protocols/README.md
```

Both are `type: meta`. `S-001` §3 says apparatus accompanies its series and is
outside the registration scheme — so `protocols/` is **effectively 11/11**.

The same bias affects any series holding an `INDEX`, `README` or `TEMPLATE`. It
does not affect `missions/` (105/105) because the counter already excludes those
three filenames there — inconsistently, by an early special case rather than by
rule.

## The fix

One rule instead of a special case: exclude documents whose `type` is `meta`,
or whose filename is `INDEX.md` / `README.md` / `TEMPLATE.md`, before computing
registration coverage. Report them separately as "apparatus: N".

## Why it is not fixed in this PR

Fixing it would change a number the Oracle is currently reviewing. **A silent
improvement to a measurement mid-review is exactly the habit these debt entries
exist to break** — the corrected figure would look like the archive improved
when only the ruler moved.

The correction lands after `S-001` is signed or rejected, and the PR that makes
it must show both numbers, before and after.

## Resolution (2026-08-31)

Closed by the Oracle's instruction of 2026-08-31, which lifted the deferral in
"Blocked by" — `S-001` review no longer gates this.

**The fix, as specified above:** apparatus is now excluded **by rule**, not by
an inherited list of filenames. The rule is `type: meta` **or** one of the
canonical apparatus filenames. The second half is not redundant: some apparatus
carries no `type: meta`, and a criterion resting only on the field would count
it as a registration failure — the same class of error as the frozen-artefact
detection ruled on earlier the same day (`P-010` §3.2).

Each series now reports its apparatus separately, in an `aparato` column.

### Before / after, as this entry required

Both figures come from `scripts/count-evidence.py`: **before** is the version at
`d204ed7`, **after** is the version in this commit, both run against the corpus
as it stands today. The schemes differ because `MIS-125` renamed the series in
between, so the honest comparison is **the denominator**, not the percentage:
what changed here is what the ruler measures, not what the archive contains.

| Series | Denominator before | Denominator after | Apparatus now excluded |
|---|---|---|---|
| `missions` | 131 | 131 | 1 |
| `protocols` | 15 | 13 | 1 |
| `decisions` | 20 | 20 | 1 |
| `reports/daily` | 10 | 10 | · |
| `reports/audits` | 12 | 12 | 2 |
| `blueprints` | 16 | 16 | 2 |
| `canon` | 10 | 8 | 2 |
| `standards` | 8 | 5 | 1 |
| `operations` | 10 | 10 | · |
| `debt` | 38 | 38 | · |
| `guilds` | — | 8 | · |
| `infra` | — | 0 | 1 |

**11 apparatus documents** left the denominators. The `protocols` case is the
one this entry opened with: it read **11/13** because `INDEX.md` and `README.md`
were counted as unregistered. They are `type: meta` and outside every scheme —
the series was effectively 11/11 then, and the counter now says so.

Two denominators shrank for a reason that is **not** D-014, and saying so
matters: `canon` 10 → 8 and `standards` 8 → 5 lost documents to the
frozen-artefact exclusion ruled the same day, not to the apparatus rule. The
`agents` row disappeared entirely under `ADR-005` v1.1.0. Attributing those to
this fix would be exactly the "improvement" this entry was written to prevent.

**What the correction does not do:** it makes coverage read *higher* by removing
documents that were never in scope. No document became registered. The 0.0%
figures in the after column are the real state of `MIS-125` Stage C — ten series
still to rename.

## State

| | |
|---|---|
| Severity | low — biased coverage downward, never upward |
| Owner | Oracle |
| Status | **closed 2026-08-31** — apparatus excluded by rule, both figures published above |
| Opened | 2026-08-24, by `S-001` §10 |
| Closed by | `MIS-125`, on the Oracle's instruction lifting the `S-001` deferral |
