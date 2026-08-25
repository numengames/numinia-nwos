---
id: "D-004"
uid:
title: "semaforo: three colours, in Spanish, with no trigger and no owner"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-25T00:34:00Z"
updated: "2026-08-25T00:34:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, frontmatter, vocabulary, undefined, language]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "S-001 §11"
evidence_script: "scripts/count-evidence.py"
evidence_head: "9b45016"
---
# D-004 — `semaforo`: three colours, no trigger, no owner

> **Summary:** 7 blueprints carry a traffic light. Nothing says what turns it
> amber, or who is allowed to.
> **Epistemic:** A status signal with no rule behind it is a mood.
> **Pragmatic:** Read as a health indicator by anyone scanning `blueprints/`,
> and it may be months stale.

## OPEN QUESTION

What makes each colour true, and who sets it?

A traffic light is only useful if its transitions are mechanical. Two things
are missing and they are different:

- **The trigger.** What condition makes a blueprint amber rather than green? If
  the answer is "whoever writes it decides", it carries no information a reader
  can act on.
- **The refresh.** A colour set once and never revisited is worse than no
  colour: it asserts current health using stale evidence.

**And the field is in Spanish** in an English repository (`DEC-006`). If it
survives the ruling it should be `status_signal` or similar; if the concept is
worth keeping, the word is not the part worth keeping.

## Measured

7 documents, all in `blueprints/`: `BP-cao.md`, `BP-datos.md`,
`BP-financiero.md` among them. **No mission uses it** — which suggests it was
introduced for one series and never generalised, or never removed.

## CLOSURE

Marked RESOLVED when the Oracle rules one of:

1. **Define it** — the condition for each colour, who sets it, and how often it
   must be revisited — and rename it to English per `DEC-006`.
2. **Retire it.** If the colour is derivable from `status` and `updated`, it is
   apparatus: computed, not stored. `S-001` §3 already says apparatus is
   generated rather than maintained by hand.

Option 2 is worth weighing seriously: a blueprint that is `active` and updated
last week is green by construction.

| | |
|---|---|
| Severity | medium — 7 documents, read as health, unverifiable |
| Owner | Oracle |
| Blocked by | nothing |
| Opened | 2026-08-24, by `S-001` §11 |
| Closes when | defined and renamed, or retired as derivable |
