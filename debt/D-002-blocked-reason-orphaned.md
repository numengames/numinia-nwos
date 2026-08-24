---
id: "D-002"
uid:
title: "blocked_reason is orphaned: the status it explained no longer exists"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T00:30:00Z"
updated: "2026-08-25T00:30:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, frontmatter, vocabulary, missions]
license: "CC-BY-4.0"
severity: low
opened_by: "S-001 §7"
evidence_script: "scripts/count-evidence.py"
evidence_head: "9b45016"
---
# D-002 — `blocked_reason` is orphaned

> **Summary:** `S-001` §7 withdrew `blocked` from the mission vocabulary. The
> field that explained it survives in 8 documents.
> **Epistemic:** A field whose reason for existing was removed.
> **Pragmatic:** Nothing reads it, and nothing tells an author not to write it.

## OPEN QUESTION

Does a mission that cannot proceed need a field of its own, or does
`status: frozen` + `freeze_reason` already cover it?

The two are the same shape: a mission that is not moving, and a sentence saying
why. If `frozen` covers it, `blocked_reason` is a duplicate under another name.
If it does not — if "waiting on something external" is genuinely different from
"deliberately parked" — then the vocabulary needs both and `S-001` §7 removed
one too many.

## Measured

8 documents carry `blocked_reason`. Of those values, one is substantive
(`"PC in transit — pending physical arrival"`) and the rest are `null`.

**One real use in the whole corpus.** That is the strongest argument that
`frozen` + `freeze_reason` is enough — and the reason this is `low` severity
rather than a vocabulary crisis.

## CLOSURE

Marked RESOLVED when the Oracle rules one of:

1. **Retire it.** The single real value migrates to `freeze_reason`, the field
   is removed from the 8 documents, and `S-001` §6 records that "blocked" is
   expressed as `frozen` with a reason.
2. **Keep it**, with a written definition distinguishing it from
   `freeze_reason`, and restore a status it attaches to — because a field
   explaining a status that does not exist is what this entry is about.

| | |
|---|---|
| Severity | low — 8 documents, 1 real value |
| Owner | Oracle |
| Blocked by | nothing |
| Opened | 2026-08-24, by `S-001` §7 |
| Closes when | retired or defined against `freeze_reason` |
