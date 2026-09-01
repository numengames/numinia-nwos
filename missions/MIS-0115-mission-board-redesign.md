---
id: "MIS-115"
uid: ""
title: "Redesign the Mission Board so its order and cards say what is actionable"
status: in-progress
priority: medium
effort: L
guild: "Alchemists"
territory: "TBA"
type_execution: digital
assigned_to: "ursa"
started: "2026-08-25"
completed: null

type: mission
version: "1.0.0"
created: "2026-08-25T19:49:11Z"
created_source: "git:25b3922"
created_confidence: exact
updated: "2026-08-26T06:53:13Z"
author: "ursa"
owner: "oracle"
tags: [web, missions, design, design-system]
license: "CC0-1.0"

context: "2026-08-25"
paths: [web/src/pages/missions.astro, web/src/pages/missions/, web/public/diseno/]
---
# MIS-115 — Redesign the Mission Board so its order and cards say what is actionable

> **Summary:** `/missions` and `/missions/mis-*` reordered around operability,
> with dates on cards and a real visual hierarchy.
> **Pragmatic:** a reader can tell what is being worked on now, and how recently,
> without opening anything.
> **Audience:** Agents · Oracles

---

> **Split into three missions — 2026-08-25, by the Oracle. Recorded, not
> edited in silence.**
>
> This brief has three fronts inside it — group order, card, header — **and
> they are three PRs, not one.** Each mergeable and deployable on its own:
>
> | | Front | Why in this order |
> |---|---|---|
> | **115a** → `MIS-132` | **Group and sort order** | Verifiable in `dist/`, zero visual judgement. Lands first because it can be proved without anyone looking at it. |
> | **115b** → `MIS-133` | **Card hierarchy and legibility** | The visual judgement, reviewed by the Oracle by looking at it. Needs 115a's dates on the card to be worth judging. |
> | **115c** | **Header counts what is actionable** | Smallest and most independent; last because nothing depends on it. |
>
> **The test for every brief from here on:** *if the criteria cannot be run
> against the base commit in a minute, the mission is two missions.*
>
> `MIS-114` demonstrated it. The mechanism without the marking was the right
> unit of work — it shipped a filter that published nothing, provably correct
> and provably scoped — and the marking of 35 documents was its own branch.
> Had they been one mission, the 112-page mistake would have been found while
> 35 files were already modified.
>
> **This document stays as the parent.** Each of the three carries its own
> criteria and its own `Closure`; this one is closed when the three are.

---

## Scope

`web/src/pages/missions.astro` (the board) and `web/src/pages/missions/[id].astro`
(the detail page, with `mis-109` as the reference case).

**This is a Monitor surface** — the reader is watching state change across 111
missions. Density and glanceability beat decoration; there is no hero and no
feature grid here.

### 1 · Group order by operability

```
In Progress  →  In Review  →  Backlog  →  Done  →  Frozen
```

Today the array reads `backlog, in-progress, in-review, done`, so the first
thing a reader meets is the pile nobody is touching.

Within each group: **most recent first**, by `updated` — and `Done` by
`completed`, because for a closed mission the useful date is when it closed.

> **Scope extended — 2026-08-25, by the Oracle, after looking at the live
> board.** Recorded here rather than edited in silence: the paragraph above
> stands as it was signed, and what follows amends it.
>
> **The ordering is not uniform across groups, and the line above said it
> wrong.** "Most recent first" is right for `In Progress`, `In Review` and
> `Done` (by `completed`). **`Backlog` sorts by priority** —
> `critical → high → medium → low`, with the tie broken by ID, the same
> declared arbitrary tiebreak the selection draft uses.
>
> The reason is what each group answers. A backlog sorted by date says which
> mission was *written* most recently, which tells a reader nothing about what
> to pick up. Sorted by priority it becomes the queue it claims to be.
>
> Two more, from the same review:
>
> **The type is too small.** The card-hierarchy criterion gains an explicit
> test: **the title must be readable without effort at normal screen distance.**
> Today everything weighs the same and everything is small. This is a visual
> judgement, reviewed by looking at it, and **the Oracle is the reviewer** — it
> is not restated as a font-size assertion, for the reason already written under
> Acceptance criteria.
>
> **Delivered missions, chronological by date of completion.** Already in the
> brief; the Oracle confirms it as the thing most missing when looking at `Done`
> today, so it is not an incidental detail of the sort but a stated requirement.

Today the sort is `a.id.localeCompare(b.id)`, which is **creation order wearing
a numeric disguise**: MIS-011 outranks MIS-110 forever, regardless of what
happened yesterday.

### 2 · The date, visible on the card

`missions.astro` contains **zero** references to `updated`, `completed` or
`created`. Without a visible date the ordering is a claim the reader cannot
check — and an ordering nobody can check is decoration.

### 3 · Card hierarchy

The card paints eight fields — `id`, `title`, `status`, `priority`, `effort`,
`guild`, `assigned_to`, `type_execution` — as one dense line where the title
carries no more weight than the cost. Scale, weight and spacing do the
hierarchy; not more colour and not more boxes.

### 4 · The header counts what is actionable

```
Critical shown today   27   (every mission ever marked critical)
Critical actionable    13   (excluding done, cancelled, frozen)
```

A counter that includes closed work answers a question nobody asked. Same
review for the other five header boxes.

### 5 · The detail page

`/missions/mis-109` gets the same pass: the closed mission's `Closure` is the
part worth reading, and today it is styled like every other paragraph.

> **Scope and Acceptance criteria are written now and are not edited later.**
> What actually happens goes in `Closure`.

### Hard constraint — this applies the design system, it does not invent one

Everything stays inside **Sistema de Diseño v5.0.0**: canonical palette and
Phosphor icons, already migrated in `MIS-092`/`MIS-093`. No new colour, no new
icon set, no new type family. Existing tokens are read from
`web/public/diseno/` before anything is drawn.

If the redesign genuinely needs something the system does not have, that is a
finding for the design system, raised separately — not improvised here.

### Deliverable before code

A **mockup or a precise written description** of the card and the board, agreed
before implementation. This mission does not begin in `missions.astro`.

### Out of scope

No mission document is edited. No frontmatter is normalised. No status renamed.

---

## Acceptance criteria

*(Base commit `31fcd63`. Falsifiable where the thing is measurable; where it is
visual judgement it is written as judgement — see below.)*

**Verifiable in `dist/`:**

- [ ] Group order in the rendered page is In Progress, In Review, Backlog, Done,
      Frozen. **Today: Backlog, In Progress, In Review, Done.**
- [ ] The first card of each group carries the most recent date in that group,
      by `updated` (`completed` for Done). **Today: unverifiable, because no
      card shows a date and the sort is by id.**
- [ ] **`Backlog` is the exception and sorts by priority**, not by date:
      reading the rendered group top to bottom, no `critical` card appears after
      a `high`, none `high` after a `medium`, none `medium` after a `low`.
      **Today: unverifiable — the group is sorted by id.**
      *(Added 2026-08-25 with the Oracle's scope extension.)*
- [ ] Every mission card shows a date: the count of cards carrying a date equals
      the count of cards. **Today: 0 of 111.**
      ```bash
      grep -c 'data-date=' web/dist/missions/index.html
      ```
- [ ] The header's `Critical` box reads **13**, the count of critical missions
      whose status is not done/cancelled/frozen. **Today: 27.**
- [ ] `find web/dist -name index.html | wc -l` is unchanged and no route 404s.
- [ ] `node scripts/check-references.mjs` reports no new broken references
      against baseline 17. **Today: 13+4, baseline 17.**

**Judgement, stated as judgement — not disguised as a metric:**

- [ ] The card has a clear primary element and the title is it. **Whether the
      hierarchy works is a design decision, reviewed by looking at it.** A
      passing font-size assertion would not tell us the card reads well; it
      would tell us a number changed.
- [ ] The `Closure` section of a closed mission reads as the conclusion of the
      document rather than as another paragraph. Same nature: judged, not
      measured.

---

## Two findings, recorded not fixed here

**1 · Guild vocabulary is inconsistent in the frontmatter.** Six spellings for
four guilds:

```
Sentinels 36 · Alchemists 31 · Exegetes 21 · Procurators 17
alchemists 5 · Alquimistas 1
```

Six of 111 missions (5%) carry a variant, so any grouping or filter by guild is
silently wrong for them.

**Oracle decision, 2026-08-25: canonical form is English capitalised** —
`Sentinels`, `Alchemists`, `Exegetes`, `Procurators`. Corrected in this
mission's first commit as a bounded exception to the rule against touching
existing missions: only the `guild` field, only the affected files.

**It was seven, not six.** The count of six came from the 111 missions that
existed when the finding was written; `MIS-115` itself carries `alchemists`,
because it was written from the same template. Result: **6 spellings → 4**,
across 112 missions.

And the origin is worth recording rather than hiding: five of the seven are
mine, written today, and they inherit the lowercase from
`missions/TEMPLATE.md:10`, which reads
`guild: alchemists  # alchemists|sentinels|exegetes|procurators`. **The
template teaches the wrong form.** It is not corrected here — the template is
frozen under the 5-mission stability count, and editing it resets the counter.
It is the first item for the next template revision.

**The vocabulary guard stays a candidate, not written today:** a check that a
frontmatter field only takes values from a declared set. It would have caught
all seven, and it would have caught the template as its source.

**2 · The mock costs are public.** The header shows `Human est.` and
`Compute est.` totals, summed from per-mission figures that are **not real
estimates**. They are served on numinia.org today.

**Oracle decision, 2026-08-25: retired from the header.** A sum of invented
numbers served in production is a false claim wearing the shape of a datum, and
a legend asterisk does not fix it — **a header is read without its legend**,
and the total is the most authoritative-looking thing on the page. They return
when `MIS-048` produces real estimates.

Done in this mission's first commit rather than deferred, because leaving it
until the redesign lands would mean serving the false total for however long
that takes. Per-mission figures on the cards are untouched: what was retired is
the **aggregate**, which is the part that reads as a measurement of the whole
archive.

---

## Closure

*(Partial — this mission is not finished. The header retirement landed on
2026-08-25; the redesign itself has not started.)*

- **What was done so far:** `Human est.` and `Compute est.` removed from the
  header (`missions.astro`), with the reason written in the code rather than in
  a commit message nobody re-reads. Stat grid narrowed from six columns to four
  so the row has no holes.

- **What diverged, and why:** the mock costs were logged here as an *open
  question for the Oracle*, expecting an answer during the redesign. The answer
  came immediately and the retirement was carried out ahead of the rest of the
  mission. **A finding that is filed as a question and answered as an
  instruction does not wait for its mission's turn** — the false total was
  being served while the document discussed it.

- **Evidence:** to be completed when the redesign closes.

- **Closed:** not yet.
