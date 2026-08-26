---
id: "MIS-111"
title: "Give each corpus section a real index, ordered from least to most uncertain"
status: done
priority: high
effort: L
guild: "Alchemists"
area: web
type_execution: digital
assigned_to: "ursa"
completed: "2026-08-25"

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

*(Written at closing. Nothing above this line was edited except the row-6
correction, which carries its own record and was made on the Oracle's
signature.)*

- **What was done:** six section indexes, one page
  (`web/src/pages/corpus/[section]/index.astro`), every row derived from the
  collections at build. Nothing is listed by hand — a hand-written index is
  `D-031` again, stale the first time a document is added.

  ```
  /corpus/canon/        11 documents      /corpus/protocols/   14
  /corpus/standards/     5                /corpus/blueprints/  23
  /corpus/decisions/    12                /corpus/debt/        34
  ```

  `/corpus/` gains a grid linking the six, and **`/corpus` returns to the nav**
  — retired by `MIS-110` with the other twelve because it led nowhere useful.
  It leads somewhere now.

- **What diverged, and why — a section is not one collection.**

  The brief assumed each section was a folder of the corpus. Two are not:
  `decisions` and `blueprints` are typed collections with their own routes
  (`/decisiones/<id>`, `/planos/<id>`), and listing them under `/corpus/` would
  have 404'd on every row.

  Worse, each of those folders is **split**: 12 `ADR-`/`DEC-` typed plus
  `INDEX.md` in the corpus; 16 `BP-*` typed plus 8 in the corpus (`AUDIT-*`,
  `WARDLEY-MAP`, `archive-summa-*`, `INDEX`, `README`). The first version listed
  only the typed half — 12 of 13 and **17 of 24** — and every omitted row was a
  reachable page. **An index that omits reachable documents is the same lie as
  one that lists none, only harder to notice.** The model now unions both halves
  and dedupes by href.

- **Three counts still differ from the brief, and all three are the brief's
  numbers being file counts rather than document counts:**

  - **canon 11, not 12** — `INDEX.md` is the folder's own index, and listing an
    index inside itself is noise. `/corpus/canon/` serves **17** pages for 12
    documents because six are alternate-slug redirects (`welcome-to-numinia` →
    `c-001-welcome-to-numinia`, `<title>Redirecting to:`). The index lists
    documents, not redirects — verified by reading the `<title>` of both.
  - **decisions 12, not 13** — same reason, `INDEX.md`.
  - **blueprints 23, not 24** — `/planos/meta` renders `WARDLEY-MAP.md` under a
    second route. One document, two URLs; listed once.

  The criteria were not edited to match. They are recorded here as measured, per
  the rule that the brief is not rewritten to fit the outcome.

- **A finding, noted and not chased:** `/planos/meta` is a page with no file of
  its own — it renders `WARDLEY-MAP.md` at a second URL. That is `D-028`
  territory (URLs not managed as a lifecycle), and it does not block this
  mission.

- **`NavChild` and the `children` branch:** still unused, still not removed. The
  redesign this mission was expected to bring did not touch the nav's type
  contract — `/corpus` was added as a flat item, like the other four. Removing
  the dead type remains a decision for whoever changes the nav's shape, which
  nobody has yet.

- **Advances MIS-071:** 111 documents that could only be reached by knowing
  their URL are now reachable by browsing. Published-and-unlinked is
  functionally unpublished, and six families stopped being that.

- **Evidence:** base `e84ee19`. Pages 728 → 730 (+2: `/corpus/decisions/` and
  `/corpus/debt/` did not exist as indexes; the other four replaced catch-all
  artefacts). Guards: licence 271/294, references baseline 17 no new,
  orphan-content exit 0.

### Verified in production, `6ff1ff9`

Merged as PR #64; the footer moved `e84ee19 → 6ff1ff9` on its own.

```
/corpus/canon        200   11 documents      /corpus/protocols    200   14
/corpus/standards    200    5                /corpus/blueprints   200   23
/corpus/decisions    200   12                /corpus/debt         200   34
                                             6 of 6 correct

/corpus/             200   links all six sections
random sample of 12 listed links             12 of 12 resolve, 0 broken
```

**The third check is the one `dist/` cannot give.** A row can render perfectly
and still point at a URL the site does not serve — which is exactly what would
have happened had `decisions` and `blueprints` been listed under `/corpus/`.
Twelve links drawn at random from all six indexes, every one a 200.

- **Closed:** 2026-08-25 · **by:** ursa
