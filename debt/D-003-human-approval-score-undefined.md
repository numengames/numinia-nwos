---
id: "D-003"
uid:
title: "human_approval_score states a range but not what it measures"
type: documentation
status: closed
version: "2.0.0"
created: "2026-08-25T00:32:00Z"
updated: "2026-08-30T17:51:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, frontmatter, vocabulary, undefined]
license: "CC-BY-4.0"
visibility: "public"
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
| **Closed** | **2026-08-30** — Oracle adopted reading 1 (the gate). Definition lives in `standards/governance.md` «Human approval scale» |

## RESOLUTION — 2026-08-30

**This entry's own premise was partly false.** The line above — *"Nothing in
the corpus defines it"* — was wrong when written: `STANDARDS.md` §9 (root,
April 2026) defined the scale as an approval **gate** with categories and
response times. The verification missed the repo root.

The Oracle, 2026-08-30 (standards consolidation): **reading 1 is adopted** —
the field states how much human approval an action needs *before* it happens,
per the 1-10 scale now in `standards/governance.md` («Human approval scale»,
absorbed from STANDARDS §9). Filled by whoever writes the mission, read as a
gate, never as a grade or a prediction.

Deviation from the closure clause, declared: the definition lands in
`governance.md`, not `S-001` §6 — it is authority (who must approve), not
vocabulary. The clause's substance — what is measured, who fills it, when,
what a reader may conclude — is satisfied.
