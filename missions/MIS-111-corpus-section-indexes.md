---
id: "MIS-111"
title: "Give each corpus section a real index, ordered from least to most uncertain"
status: backlog
priority: high
effort: L
guild: "Alchemists"
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
tags: [web, corpus, sections, navigation]
license: "CC-BY-4.0"
context: "2026-08-25"
paths: [web/src/pages/corpus/, web/src/content.config.ts, web/src/data/navigation.ts]
---
# MIS-111 — Give each corpus section a real index, ordered from least to most uncertain

> **Summary:** the six published sections get a page that lists their documents.
> Today those pages exist and list nothing.
> **Pragmatic:** a reader can see what a section contains without knowing a
> filename in advance.
> **Audience:** Agents · Oracles

---

## Scope

Six sections, in this order — **least to most uncertain**, which is also the
order in which a stranger should read them:

| # | Section | Documents | What it holds |
|---|---|---:|---|
| 1 | **Canon** | 12 | what is settled |
| 2 | **Standards** | 5 | how it is written |
| 3 | **Decisions** | 13 | what was chosen, and why |
| 4 | **Protocols** | 14 | how things are done |
| 5 | **Blueprints** | 24 | what is being built |
| 6 | **Debt** | 35 | what is known to be wrong |

> **Correction — 2026-08-25, made in the MIS-114 branch (S-001 §2.1.2).**
>
> Row 6 read **`Missions | 111 | what is being done now`**. That number was
> wrong in a way this mission could not have delivered: **the 111 `MIS-*`
> documents are not in the corpus collection.** `content.config.ts` excludes
> them with `!missions/MIS-*.md`; they have their own typed collection and
> their index is the board at `/missions`, which `MIS-115` redesigns.
>
> What remains under `missions/` in the corpus is **5 system documents**
> (`TEMPLATE`, `TEMPLATE-CHANGES`, `TEMPLATE-EXAMPLE`, `PROPOSAL-closure-guard`,
> `ANNEX-mission-selection-draft`). A section built from this table would have
> promised 111 and listed 5.
>
> Corrected here, in a brief that is otherwise untouched, because leaving it
> would be **a plausible artefact**: a figure that looks measured, sitting in a
> signed table, that nobody would re-check. `Debt` takes row 6 — no longer the
> conditional seventh, because this branch is what unblocked it.
>
> `Missions` is not a corpus section. The reasoning is recorded in
> `web/src/lib/corpus.ts` beside the four other folders that are not sections
> either, so the next reader does not re-litigate it.

**Debt is the seventh and is conditional.** It is out of the corpus glob today
(PR #52) because `D-033` must not publish. It joins this set **only after
`MIS-114`** gives the build a `visibility` filter — not before, and not by
un-globbing the folder wholesale.

The order is the mission's substance, not decoration: a section index that
lists Missions first tells a reader the archive is a task board. Listing Canon
first says it is an archive with work attached.

Nav: the six sections become the way into the corpus. What that does to the
five current top-level entries is decided **within this mission**, with the
design in hand.

> **Scope and Acceptance criteria are written now and are not edited later.**
> What actually happens goes in `Closure`.

### Out of scope

**No document is edited, moved or renamed.** This mission builds indexes over
what exists.

Deleting the ten orphan `.astro` pages retired from the nav by `MIS-110`
(`D-032`) — still a separate decision.

### Known pending, to be decided here

`MIS-110` left `NavChild` and the `children` branch of the `NavItem` union with
no user. **This mission rebuilds the nav anyway**, so the type contract is
settled here, with the design in front of us, rather than as loose tidying.

---

## Acceptance criteria

*(Each states what it returns today at base commit `385c29d`, so it is false
before the work starts. Final states, not deltas.)*

- [ ] `/corpus/canon/` lists its **12** documents: the count of
      `href="/corpus/canon/…"` links on that page is 12.
      **Today: 0.** The page exists and its title says *"Canon — Index"*, but it
      links to none of its children.
      ```bash
      grep -o 'href="/corpus/canon/[^"]*"' web/dist/corpus/canon/index.html | wc -l
      ```
- [ ] The same holds for the other five: standards **5**, decisions **13**,
      protocols **14**, blueprints **24**, missions **111**.
      **Today: 0 for all six.**
- [ ] `web/dist/corpus/protocols/index.html` exists.
      **Today: it does not** — five sections have a catch-all page and protocols
      has none, which is the asymmetry that proves these were never indexes.
- [ ] Every section index is reachable from the nav in at most one click:
      each of the six paths appears in the rendered `<nav>` of the home page.
      **Today: 0 of 6 appear** (`/corpus` does, the sections do not).
- [ ] `find web/dist -name index.html | wc -l` is **greater than 643** and no
      pre-existing route 404s: every path in the pre-change sitemap still
      resolves. **Today: 643.** Adding indexes must not remove pages.
- [ ] `node scripts/check-references.mjs` reports no new broken references
      against baseline 17. **Today: 13+4, baseline 17.**

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.
Add here — never edit `Scope` or the criteria to match what happened.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:**
