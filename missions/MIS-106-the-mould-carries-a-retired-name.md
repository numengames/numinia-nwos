---
id: "MIS-106"
title: "The mould carries a retired name: the template still calls the system Khepri"
type: mission
status: todo
version: "1.0.0"
created: "2026-08-18T14:47:39Z"
updated: "2026-08-18T14:47:39Z"
author: "claude-opus-5"
owner: "oracle"
tags: [design-system, mould, upstream, drift, naming]
license: "CC-BY-4.0"
mission_id: "MIS-106"
territory: "TBA"
guild: "Exegetes"
type_execution: "digital"
priority: "medium"
effort: "S"
requested_by: "oracle"
assigned_to: null
requires_oracle_approval: true
human_approval_score: 5
parent_mission: null
sub_missions: []
depends_on: ["MIS-105", "MIS-094"]
started: null
completed: null
---
# MIS-106 — The mould carries a retired name

> **Summary:** Design System v5.0.0 retired the codename "Khepri" and 5.1.0
> finished the job downstream — the kit now ships as `sistema.*`. The mould's
> own `DESIGN_SYSTEM_TEMPLATE.md` never got the message: it still names Khepri
> as its reference implementation, in five places.
> **Epistemic:** How a retirement propagates — or fails to — through a fork.
> **Pragmatic:** A client organization generated from the mould stops
> inheriting a name that no longer exists.
> **Audience:** Oracle · Exegetes

---

**Area:** Documentation
**Guild:** Exegetes
**Type:** digital
**Priority:** medium
**Effort:** S

---

## Story

As an organization generating its workspace from the mould, I want the design
system template to name things as they are called today, so that my first
inherited document does not teach me a retired vocabulary.

---

## Context (2026-08-18)

§0.4 of Design System v5.0.0 retires the codename, and states the reason:
*"this manual is also the seed of the default flavour for other organizations
(§2.8.2), and a seed does not travel with a proper name."* It ships an
equivalence table and one explicit rule: **no rule changes because of the
renaming.**

What the retirement has not reached:

| Surface | State today | Verdict |
|---|---|---|
| `nwos-workspace-template/DESIGN_SYSTEM_TEMPLATE.md` | Names Khepri as reference implementation in **5 places**, from the frontmatter (`reference_implementation:`) to the closing section | **Drift** |
| `numinia-nwos/web/public/diseno/kit/` | `5.1.0/sistema.{css,js,tokens.json}` + `manifest.json` | **Fixed** by MIS-094 |
| §0.4 equivalence table | Keeps `khepri.*` only in the "Before" column | **Correct** |
| Asset filenames in the tokens (`Khepri_Logo.svg`, `pixel/khepri-sprite-24.png`) | Unchanged | **Correct** — §0.4 preserves them so repositories do not break |
| `nwos-workspace-template/TRADEMARKS.md` | Reserves "Khepri" as a mark alongside Numinia and Numen Games | **Open question** |

Only the first row is work. The last one is a question for the Oracle, and it
is the same one §0.4 left open: if the system no longer carries the name, does
the beetle keep it as a level-II character — and does C-005 §7 keep reserving
it as a mark? A retired codename that is still a reserved trademark is a
coherent position, but it has to be a decided one.

This is also the mould's second known divergence in three days, which makes it
evidence for MIS-105: the fork relationship propagates nothing on its own.
MIS-094 pushed a version, an errata set and a regenerated kit through the
downstream chain in a single day; the mould, upstream of all of it, did not
move.

---

## Scope

- Update `DESIGN_SYSTEM_TEMPLATE.md` upstream, all five occurrences: the
  reference implementation is *the Numen Games Design System*, not a codename.
  It stays illustrative and never normative — only the name changes, per §0.4's
  own rule. While there, check the template against 5.1.0: it was written
  against an older reading of the system.
- Put the trademark question to the Oracle: does C-005 §7 keep reserving
  "Khepri" now that no system carries the name?
- Sweep both repositories for the codename in prose and mark each occurrence:
  **retire** (system name), **keep** (brand mark, asset filename), or
  **append-only history** (§18 version log, never rewritten).
- Record the result so the next agent that meets the word knows which case it
  is in.

**Out of scope:** renaming asset files and the beetle sprite — §0.4 forbids it
for now, and `[ORACLE — pending]` still hangs over whether the beetle keeps its
mythological name as a level-II character.

---

## Acceptance criteria

```gherkin
Feature: the seed travels without a proper name

  Scenario: The template names the system by what it is
    Given nwos-workspace-template/DESIGN_SYSTEM_TEMPLATE.md
    When its reference implementation is read
    Then it names the Numen Games Design System, not a codename

  Scenario: What the template teaches is what the system is called
    Given an organization generating its workspace from the mould
    When it reads its inherited design system template
    Then no retired codename appears in it

  Scenario: What must not be renamed, is not
    Given the sweep over both repositories
    When an occurrence is a brand mark, an asset filename or version history
    Then it is left untouched and recorded as such
```

- [ ] `DESIGN_SYSTEM_TEMPLATE.md` updated upstream in all five places, via the
      route MIS-105 defines (ADR + PR, not a downstream edit)
- [ ] The template re-read against 5.1.0, not against the version it was
      written for
- [ ] Occurrence sweep completed and classified: retire / keep / history
- [ ] The trademark question answered, or recorded as open with its owner
- [ ] The `[ORACLE — pending]` question on the beetle's name recorded as still
      open, or answered

---

## Epistemic value

A renaming is the cheapest possible change to propagate — no behaviour, no
API, one word. If this one did not travel through the fork, nothing will.

## Pragmatic value

The mould stops teaching a dead name to every organization it generates.

---

## Execution log

- 2026-08-18 — Opened from the standards review requested by the Oracle, after
  comparing the mould against Design System v5.0.0 §0.4.

---

## Execution Reality

*(Fill when closing)*

> *"The ideal plans show the intention. The real plans show the knowledge."*
