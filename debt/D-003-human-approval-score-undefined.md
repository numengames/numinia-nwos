---
id: "D-003"
uid:
title: "human_approval_score states a range but not what it measures"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T00:32:00Z"
updated: "2026-08-25T00:32:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, frontmatter, vocabulary, undefined]
license: "CC-BY-4.0"
severity: medium
opened_by: "S-001 §11"
evidence_script: "scripts/count-evidence.py"
evidence_head: "9b45016"
---
# D-003 — `human_approval_score` states a range but not what it measures

> **Summary:** 16 documents carry it. The template says `# 1-10`. Nothing says
> what the number is a score *of*.
> **Epistemic:** The clearest case of a field that looks rigorous and is not.
> **Pragmatic:** Two agents scoring the same mission would not agree, and
> neither could be shown wrong.

## OPEN QUESTION

What is being scored, and by whom?

Three readings are all consistent with the data:

1. **How much human approval this mission needs** — a gate. 9 means "do not
   proceed without the Oracle".
2. **How much the human approved of the result** — a grade, assigned after.
3. **How confident the agent is that a human would approve** — a prediction.

These are not variations of one idea. Reading 1 is filled *before* the work by
whoever writes the mission; reading 2 *after* by the Oracle; reading 3 *before*
by the agent, about itself. **The same number means opposite things.**

## Measured

16 documents. Observed values: `4`, `5`, `6`, `8`, `9`. The comment in
`missions/TEMPLATE.md` reads `# 1-10` and stops there.

Nothing in the corpus defines it — this was verified across every `.md` outside
`web/`. The range is the entire specification.

## CLOSURE

Marked RESOLVED when `S-001` §6 carries a definition stating: what is measured,
who fills it, when, and what a reader may conclude from a given value.

If the Oracle finds that no single reading fits the 16 existing uses, the honest
outcome is to **retire the field and replace it with whichever reading is
actually wanted** — a new name for a new meaning, rather than a definition
retrofitted onto inconsistent data.

| | |
|---|---|
| Severity | medium — 16 documents carry a number nobody can interpret |
| Owner | Oracle |
| Blocked by | nothing; it needs a decision, not work |
| Opened | 2026-08-24, by `S-001` §11 |
| Closes when | defined in `S-001` §6, or retired and replaced |
