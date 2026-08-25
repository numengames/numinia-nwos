---
id: "D-005"
uid:
title: "confidence_before / confidence_after: a scale nobody wrote down"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T00:36:00Z"
updated: "2026-08-25T00:36:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, frontmatter, vocabulary, undefined, calibration]
license: "CC-BY-4.0"
visibility: "public"
severity: low
opened_by: "S-001 §11"
evidence_script: "scripts/count-evidence.py"
evidence_head: "9b45016"
---
# D-005 — `confidence_before` / `confidence_after`: a scale nobody wrote down

> **Summary:** A pair of fields in 2 documents, measuring confidence on an
> unstated scale, filled by an unstated party.
> **Epistemic:** The most interesting of the undefined fields, and the least
> used.
> **Pragmatic:** As it stands the pair records nothing that can be compared
> across documents.

## OPEN QUESTION

What scale, and whose confidence?

The pair is clearly designed to capture **calibration** — what someone believed
before doing the work versus after. That is a genuinely valuable thing to
record, and it is the only field in this group that would produce insight rather
than metadata.

But three things are unstated:

- **The scale.** 1–10? 0–1? Percent? A number without a scale is not comparable
  between two documents, which defeats the purpose.
- **Whose.** The agent's confidence, or the Oracle's? These diverge, and the
  divergence is exactly what would be worth measuring.
- **Confidence in what.** That the approach will work? That the estimate is
  right? That the result is correct?

## Measured

**2 documents.** The lowest usage of any field in this group.

That low number is itself the finding: either the pair was introduced and
abandoned, or it is genuinely useful and nobody knows how to fill it — which is
what happens to a field with no written scale.

## CLOSURE

Marked RESOLVED when either:

1. **Defined and adopted.** Scale, owner and object written into `S-001` §6, and
   the pair made part of the mission template so it is filled consistently. If
   calibration is worth tracking, 2 documents is not tracking it.
2. **Retired.** Two uses, no definition; removing it costs nothing.

**This one deserves a real decision rather than a default retirement.**
Recording what an agent believed before a mission and what it believed after is
the kind of evidence this archive is otherwise good at keeping, and no other
field captures it.

| | |
|---|---|
| Severity | low — 2 documents; low cost either way |
| Owner | Oracle |
| Blocked by | nothing |
| Opened | 2026-08-24, by `S-001` §11 |
| Closes when | defined and adopted, or retired |
