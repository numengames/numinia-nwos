---
id: "D-014"
uid:
title: "count-evidence.py measures apparatus as if it were record"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-24T21:05:00Z"
updated: "2026-08-24T21:05:00Z"
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

## State

| | |
|---|---|
| Severity | low — biases coverage downward, never upward |
| Owner | Oracle |
| Blocked by | deliberately deferred until `S-001` review closes |
| Opened | 2026-08-24, by `S-001` §10 |
| Closes when | apparatus is excluded by rule, with before/after figures published |
