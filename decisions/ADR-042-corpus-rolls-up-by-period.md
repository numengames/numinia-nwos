---
id: "ADR-042"
uid: ""
title: "The corpus rolls up by period: STD-012 and PRO-017 ratified, and the lesson of the five-month archive recorded"
type: adr
status: active
version: "1.0.0"
created: "2026-09-08T22:00:00Z"
updated: "2026-09-08T22:00:00Z"
author: "ursa"
owner: "oracle"
license: "CC-BY-4.0"
guild: "Alchemists"
territory: "Archive"
tags: [decisions, adr, deflation, rollup, lifecycle, lesson]
deciders: ["oracle"]
consulted: ["ursa"]
outcome: accepted
decision: "Records roll up weekly, quarterly and annually; what survives is what changed a rule, opened a debt, or produced an address; git is the daily record."
amends: ["ADR-030", "CAN-001"]
related: ["STD-012", "PRO-017", "ADR-040", "RPT-017", "RPT-018"]
---

# ADR-042 — The corpus rolls up by period

> **Summary:** Ratifies `STD-012` (the rule) and `PRO-017` (the procedure),
> amends `ADR-030` to add the period roll-up as a lawful written resolution,
> and amends `CAN-001` with the principle: *a system that only adds is not
> contained.*
> **Epistemic:** The decision record of the most important lesson of
> April–September 2026: the archive grew faster than anyone could read it.
> **Pragmatic:** From next Monday, closed records leave the corpus every
> week without the Oracle's hand.
> **Audience:** Agents · Oracles

---

## 1. Context

Between 2026-04-07 and 2026-09-08 this repository accumulated 133 missions
and 528k tokens. Sixty-six were `done` and immutable; thirty-eight were
`frozen` and, by `PRO-003`, could never be deleted; the rest were stubs
from a plan that had been replaced in April. Every one was a page an agent
had to load, or skip, at the start of every session.

On 2026-09-08 the Oracle ordered the reset. In five pull requests (#286,
#289, #291, #293, #295) 115 missions were compressed into `RPT-017` and
deleted; `ADR-040` made `done` deletable, then `frozen`; `PRO-003` was
amended twice. The corpus fell to 18 missions and 324k tokens. It took the
Oracle's full attention for a day, and it happened once. The Oracle's
question afterwards was how to make it not happen once but always.

The Oracle's proposal: daily reports roll into weekly, weekly into
monthly, monthly into quarterly, quarterly into annual — "leaving only the
gold". Ursa's assessment on the record: the mechanism is right and already
proven (it is the `done → report → absorbs → redirect → delete` chain of
`ADR-040`, applied at levels); the daily level should not exist because
git already is the daily record; the monthly level adds a rewriting
without adding a decision boundary; the roll-up must always redirect to
the highest living level; and "gold" needs a written criterion or every
executor filters differently. The Oracle agreed on each point.

---

## 2. Decision

1. `STD-012` is ratified at 1.0.0: three levels (weekly, quarterly,
   annual); git is the daily; a line survives if it changed a rule, opened
   or closed a debt, or produced an address; identifiers resolve to the
   highest living level; phase reports index, they do not restate.
2. `PRO-017` is ratified at 1.0.0 and is mandatory: the weekly roll-up
   runs every Monday before the Dark Council, by any agent.
3. `ADR-030` is amended: a period report that carries a record's line is a
   written resolution under test 3. The four tests stand.
4. `CAN-001` is amended with one paragraph under *Numinia's Rituals*: the
   Dark Council opens with the roll-up, and the principle that a contained
   system is one that forgets on schedule.
5. `debt/` and `blueprints/` follow the same exit as `missions/`. A
   resolved debt gets its line and is deleted; a blueprint that becomes a
   mission or is abandoned gets its line and is deleted. `decisions/` do
   not roll up: their deflation is `MIS-142` (rules move into standards).

---

## 3. Alternatives considered

- **Five levels including daily and monthly** (the original proposal).
  Rejected: the daily duplicates git, the monthly duplicates the quarterly
  boundary. Each extra level is a rewriting, and the gold of a rewriting
  of a rewriting is what four different agents thought was gold.
- **Phase reports only** (what `RPT-017`/`RPT-018` do today). Rejected as
  the sole mechanism: a phase has no fixed length, so the report grows
  unbounded — `RPT-017` reached 10k tokens in one day. Kept as an index.
- **Keep closed records, hide them from the board.** Rejected: hidden
  files are still loaded, still cited, still drift. Containment is size.

---

## 4. Consequences

- The first weekly roll-up is due Monday 2026-09-14 for week 37; the two
  missions closed on 2026-09-08 (`MIS-121`, `MIS-151`) are its first lines.
- `DEF-002` has no guard: `period` is not read by any script. Recorded as
  debt here, not in a new `DBT-` file, per the spirit of this decision —
  it closes when a guard reads it, in the same PR.
- `PRO-003` needs no further amendment: a closed mission's exit is already
  lawful; this decision only fixes *when* and *where to*.
- `RPT-017` stays closed for growth; `RPT-018` becomes the alpha's index
  of weeks, not its narrative.

---

## 5. Status

`active` — the Oracle's instruction of 2026-09-08 ("sí, ejecútalo y
plásmalo … es un aprendizaje muy importante de los últimos meses") and the
PR that carries this decision are its approval.
