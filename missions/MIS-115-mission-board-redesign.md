---
id: "MIS-115"
title: "Redesign the Mission Board so its order and cards say what is actionable"
status: backlog
priority: medium
effort: L
guild: alchemists
area: web
type_execution: digital
assigned_to: null
completed: null

type: mission
version: "1.0.0"
created: "2026-08-25"
updated: "2026-08-25"
author: "ursa"
owner: "oracle"
tags: [web, missions, design, design-system]
license: "CC-BY-4.0"
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
silently wrong for them. **Candidate for a vocabulary guard** — a check that a
frontmatter field only takes values from a declared set. Not opened as debt here
and not fixed in this mission; it needs a decision on the canonical form first
(English lowercase, matching `area` and `type_execution`, would be the
consistent choice).

**2 · The mock costs are public.** The header shows `Human est.` and
`Compute est.` totals, summed from per-mission figures that are **not real
estimates**. They are served on numinia.org today.

**Open question for the Oracle, and this mission does not answer it:** do the
cost figures stay, go, or get labelled as illustrative? All three are
defensible — showing what work costs is part of what this archive demonstrates,
and showing invented numbers unlabelled is exactly the class of claim `D-033`
registers. **The redesign should not quietly drop them, and should not quietly
dress them up either.**

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.
Add here — never edit `Scope` or the criteria to match what happened.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:**
