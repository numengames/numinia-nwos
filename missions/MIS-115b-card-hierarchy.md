---
id: "MIS-115b"
title: "Give the mission card a three-level hierarchy, on the design system's scale"
status: done
priority: medium
effort: S
guild: "Alchemists"
area: web
type_execution: digital
assigned_to: "ursa"
completed: "2026-08-25"
type: mission
version: "1.0.0"
created: "2026-08-25"
updated: "2026-08-25"
license: "CC-BY-4.0"
paths: [web/src/pages/missions.astro]
parent_mission: "MIS-115"
---

# MIS-115b — A three-level card, on the system's scale

> **Summary:** the title is the only large thing on the card, and no text sits
> below the smallest size the design system defines.
> **Pragmatic:** you can read a board of 101 cards without leaning in.
> **Audience:** Agents · Oracles

Second of the three `MIS-115` was split into. **The visual judgement is the
Oracle's, made by looking at it** — this document records the measurable half
and the proposal that was signed before any code was written.

---

## Scope

The card in `web/src/pages/missions.astro`: type sizes, weights, what is shown
and in what order. Nothing else — the sort is `MIS-115a`, already merged; the
header is `MIS-115c`.

### The measurement that made "too small" a fact

The Oracle's review said the type was too small. Measured against
**Design System v5.1.0 §4.3**, that is not an impression — it is a violation:

```
the card used      0.5rem (8px) ×4    0.55rem (9px) ×2    0.6rem (10px) ×2
the scale's floor  0.75rem (12px)  ·  `etiqueta`
```

**Three sizes the system does not define**, all below its smallest. The title
sat at `text-sm` (14px) — one step above the labels, and outweighed by nothing.
Everything weighed the same because nothing was allowed to be large.

### The three levels, all existing tokens

| Level | What | Token §4.3 | Size | Weight |
|---|---|---|---|---|
| 1 · large | the title | `cuerpo.l` | 1.44rem / 23px | 600 |
| 2 · medium | id, date | `cuerpo.s` | 0.875rem / 14px | mono |
| 3 · small | priority, effort, guild, assignee | `etiqueta` | 0.75rem / 12px | mono, uppercase, tracking .1em |

**No new token was needed**, so there is no finding to raise against the design
system. The card was below the system, not beyond it.

### Signed adjustments to the proposal

- **The mock costs leave the card.** Same invented figures the Oracle retired
  from the header; on the card they carried the same weight as the guild.
- **Colour never carries the datum alone.** The left border marks priority
  *and* the priority is written in level 3. WCAG AA is a project standard, and
  a greyscale print loses colour entirely.
- **N = 78** for truncation.

### Motion: the catalogue had the answer

The Oracle's directive — *the board conveys calm* — allowed transitions only if
the design system defines movement, and made "no animation" preferable to
improvised animation.

**It defines it:** §10 is a closed catalogue of fourteen, and **§10.1-04
"Elevación"** is the entry for exactly this case — `120 ms`, hover of surfaces,
**without displacement**. Nothing was invented and nothing new was proposed.

Worth recording: the card previously carried `transition-all duration-150`.
**150 ms is not in the catalogue** — a duration nobody chose, on a property list
(`all`) nobody bounded. Replaced with the catalogue's 120 ms on `colors` only.
`prefers-reduced-motion` was already handled globally (§892).

> **Scope and Acceptance criteria are written now and are not edited later.**

---

## Acceptance criteria

*(Each states what it returns TODAY, at base `9769676`.)*

- [ ] No text in the card is smaller than `0.75rem`. **Today: 8 uses below it —
      four at 0.5rem, two at 0.55rem, two at 0.6rem.**
- [ ] The card uses exactly **three** distinct type sizes. **Today: four
      (0.5, 0.55, 0.6, 0.875).**
- [ ] Every card states its priority in text, not only in colour: the count of
      cards whose priority string is rendered equals the count of cards.
      **Today: 0 of 101 — priority is a coloured dot with a `title` attribute.**
- [ ] The date stays visible without interaction: `<time>` count equals card
      count. **Today: 101 of 101 (`MIS-115a`); this must not regress.**
- [ ] Every card's transition uses the catalogue duration and no other.
      **Today: `duration-150`, which the catalogue does not contain.**

---

## Closure

*(Written at closing. Nothing above this line was edited.)*

- **What was done:** three levels, all on existing tokens; costs removed;
  priority written and colour-reinforced; catalogue motion.

  ```
  sizes in card        0.75 / 0.875 / 1.44rem    exactly 3, none below floor   OK
  priority in text     101 of 101                                              OK
  date visible         101 of 101                                              OK
  transition           100 of 100 cards at 120ms, no other duration            OK
  mock costs           humanCostEur, computeCostEur absent from the card       OK
  ```

- **What diverged, and why:**

  **The frozen block is a second card design.** `frozen` and `cancelled` render
  outside the columns, and the first pass left them on the old sizes — 1 of 101
  cards without its priority written. Applying the hierarchy only to the columns
  would have left **two card designs on one page**, which is worse than the
  problem being fixed. Same three levels applied there.

  That is the second time this block has been missed in two missions: `MIS-115a`
  left it without a date for the same reason. **A card that renders outside the
  loop is invisible to a change that edits the loop** — worth remembering before
  `MIS-115c` touches the same page.

- **The instrument was wrong twice, and both times it read as a page defect:**

  `grep -c 'duration-[120ms]'` returned **1**, suggesting a single card carried
  the transition. `grep -c` counts *lines*, and built HTML is one line — the
  attribute was on all 100. And an earlier version of the checker looked for the
  duration *inside* the card's markup, when it lives in the `<a>` tag's own
  `class`, before the marker it was searching from.

  Neither was a defect in the page. Recorded because a checker that reports
  "1 of 100" and a page that renders 1 of 100 look identical in a log, and only
  one of them is worth fixing.

- **Advances MIS-071:** none. This mission moves no prose into `.md` and closes
  no orphan.

- **Evidence:** base `9769676`. Pages 733 → 733, no route added or removed.
  Guards: licence 272/295, references baseline 17 no new, orphan exit 0.

### Oracle's judgement in production, and the adjustment

> **"Improved, but not there. Minor adjustments pending, noted."**

One iteration, then on to `MIS-115c` regardless. Three things came out of it:

**1 · The title dominated.** Stepped down one rung *within the scale*:
`cuerpo.l` 1.44rem/23px → **`cuerpo.m` 1rem/16px**. The next token down, not an
invented value.

It is still read first, and now without shouting: it is **the only Sans on the
card**, the only weight 600, and the only text at full foreground colour, while
levels 2 and 3 are mono and dimmed. **Hierarchy does not need size alone to do
the work** — that was the mistake in the first pass, treating "first read" as a
synonym for "largest".

Sizes are now `1 / 0.875 / 0.75rem` — still exactly three, still none below the
floor, all five criteria unchanged.

**2 · Typography, reported before touching anything.** §4.1 sets **Geist and
Geist Mono** for the whole organisation, and §4.2 splits them: *Sans for what is
asserted, Mono for what is measured.*

```
system     §4.1 Geist (sans) · Geist Mono
the card   title inherits --font-sans = "Geist Variable"   → Sans
           id, date, labels: font-mono = "Geist Mono"      → Mono
```

**They coincide, so nothing was touched.** The title asserts and is Sans; the
id, the date and the labels measure and are Mono. If the Oracle's doubt survives
this, it is a doubt about §4.2 itself — a design conversation, not a card
change, and improvising it here would set an organisation-wide rule from one
component.

**3 · The board was lying about itself.** `MIS-115` was being executed across
three PRs with `status: backlog`. Corrected to `in-progress` with `started`, and
the rule it exposed is now item 3 of the unfreezing list in `TEMPLATE-CHANGES`:
**a mission's `status` moves in the PR that starts its work.** A board derived
from documents is exactly as honest as the documents.

- **Closed:** 2026-08-25 · **by:** ursa
