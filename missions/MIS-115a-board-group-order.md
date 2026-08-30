---
id: "MIS-115a"
title: "Order the Mission Board by operability, and show the date it sorts by"
status: done
priority: medium
effort: S
guild: "Alchemists"
territory: "TBA"
type_execution: digital
assigned_to: "ursa"
completed: "2026-08-25"
type: mission
version: "1.0.0"
created: "2026-08-26T05:29:38Z"
created_source: "git:9769676"
created_confidence: exact
updated: "2026-08-26T05:29:38Z"
license: "CC-BY-4.0"
paths: [web/src/pages/missions.astro]
parent_mission: "MIS-115"
---

# MIS-115a — Order the Mission Board by operability

> **Summary:** the board's groups run in the order a reader needs them, each
> group sorts by something that means what it says, and every card shows the
> date it was sorted by.
> **Pragmatic:** you can tell what is moving without opening anything, and you
> can check the order is real.
> **Audience:** Agents · Oracles

**First of the three MIS-115 was split into** (Oracle, 2026-08-25). This one
carries **zero visual judgement**: every criterion below runs against `dist/`.
That is why it lands first — it can be proved without anyone looking at it.

---

## Scope

`web/src/pages/missions.astro`, and only the ordering and the date on the card.

Card hierarchy is `MIS-115b`. The header counters are `MIS-115c`. Neither is
touched here.

### What was wrong

Groups ran `backlog → in-progress → in-review → done`: the first thing a reader
saw was the pile nobody is touching.

Every group sorted by `a.id.localeCompare(b.id)` — **creation order wearing a
numeric disguise**, in which MIS-011 outranks MIS-110 forever regardless of what
happened to either.

And no card showed a date, so **the order was unverifiable by a reader**. An
order nobody can check is decoration.

### The rule

| Group | Sorts by |
|---|---|
| In Progress | `updated`, most recent first |
| In Review | `updated`, most recent first |
| **Backlog** | **priority** `critical → high → medium → low` |
| Done | `completed`, most recent first |
| Frozen · Cancelled | `updated`, most recent first |

Ties break on ID — arbitrary, and declared, the same tiebreak the selection
draft uses.

**Backlog is the exception because of what the group answers.** Sorted by date
it says which mission was *written* most recently, which tells a reader nothing
about what to pick up. Sorted by priority it is the queue it claims to be.

> **Scope and Acceptance criteria are written now and are not edited later.**

---

## Acceptance criteria

*(Each states what it returns TODAY, at base `6ff1ff9`.)*

- [ ] Column order in the rendered board is `In Progress, In Review, Backlog,
      Done`. **Today: `Backlog, In Progress, In Review, Done`.**
- [ ] Every card carries a `<time datetime="YYYY-MM-DD">`: the count of cards
      with a date equals the count of cards. **Today: 0 of 100.**
- [ ] Reading `Backlog` top to bottom, priority never increases: no `critical`
      after a `high`, none `high` after a `medium`. **Today: sorted by id, so
      the sequence is arbitrary with respect to priority.**
- [ ] The first card of `In Progress` and of `Done` carries the most recent date
      in its group. **Today: unverifiable — no dates rendered.**

---

## Closure

*(Written at closing. Nothing above this line was edited.)*

- **What was done:** group order, per-group sort, and a date on every card.
  Verified against `dist/`:

  ```
  column order      In Progress, In Review, Backlog, Done      OK
  cards with date   100 of 100                                 OK
  Backlog           56 cards, priority never increases         OK
  first card        In Progress 2026-08-17 = max               OK
                    Done        2026-08-25 = max               OK
  ```

- **What diverged, and why:**

  **`In Review` renders empty**, so it has no dates to check. That is not a
  defect — the board triage moved all six of its missions elsewhere, and the
  column is correct at zero. Recorded because a check that reports "no data" and
  a check that reports "wrong data" must not look the same in a log.

  **One card of 100 had no date after the first pass.** `frozen` and `cancelled`
  render in their own block, not through the columns, so the change missed them
  — MIS-001, frozen. Fixed rather than excused: *every card* has to mean every
  card, or the count is not a criterion.

  **My verifier was wrong before the page was.** It swept the whole document for
  the column labels and found them in the stat boxes and the filter buttons too,
  reporting `In Progress, Done, In Review, Backlog` — an order the board never
  had. Scoped to `#kanban-board` and it read correctly. Two of today's four
  false alarms were instrument, not artefact.

- **Evidence:** base `6ff1ff9`. Pages 730 → 730, no route added or removed.
  Guards: licence 271/294, references baseline 17 no new, orphan exit 0.
  Production verification pending merge.

- **Closed:** 2026-08-25 · **by:** ursa
