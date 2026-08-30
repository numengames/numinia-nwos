---
id: "MIS-112"
title: "Generate the home page from the README, so the site and the repo say the same thing"
status: backlog
priority: medium
effort: M
guild: "Alchemists"
area: web
type_execution: digital
assigned_to: null
completed: null

type: mission
version: "1.0.0"
created: "2026-08-25T19:34:05Z"
created_source: "git:31fcd63"
created_confidence: exact
updated: "2026-08-25T19:49:11Z"
author: "ursa"
owner: "oracle"
tags: [web, home, readme, single-source]
license: "CC-BY-4.0"
context: "2026-08-25"
paths: [web/src/pages/index.astro, README.md, web/src/content.config.ts]
---
# MIS-112 — Generate the home page from the README, so the site and the repo say the same thing

> **Summary:** the home page stops being hand-written prose and becomes a
> rendering of `README.md`.
> **Pragmatic:** one place to edit, and the front door stops drifting from the
> repository it describes.
> **Audience:** Agents · Oracles

---

## Scope

`web/src/pages/index.astro` (290 lines, **21 hand-written text elements**,
**zero references to `README.md`**) becomes a renderer over `README.md`
(150 lines, 9 sections).

The two are independent sources for the same claim today, and they have already
drifted:

```
README.md:16   "The reference instance of the Narrative Work OS —
                the system that was used to build itself."
home <h1>      "Narrative Work OS"
```

Not a contradiction yet — but nothing keeps them together, and `D-033` is a
registry of exactly this shape: two documents asserting the same thing with no
mechanism binding them.

**The README is the source.** It is what a visitor to the GitHub repo reads
first, it is under the licence guard, and it is where the project already
describes itself. The site becomes its projection.

Which README sections reach the home page, and in what order, is decided in
this mission — a README section list is not automatically a good landing page.

> **Scope and Acceptance criteria are written now and are not edited later.**
> What actually happens goes in `Closure`.

### Out of scope

**The README's text is not rewritten to suit the web.** If a section reads
badly on a page, that is recorded and fixed later, in the README, as its own
change. Editing prose and changing the mechanism in one commit makes both
unreviewable.

Section indexes — that is `MIS-111`.

---

## Acceptance criteria

*(Each states what it returns today at base commit `385c29d`, so it is false
before the work starts. Final states, not deltas.)*

- [ ] `web/src/pages/index.astro` contains **zero** hand-written `<h1>`/`<h2>`/`<p>`
      text elements carrying prose that also exists in `README.md`; the copy is
      read from the file at build time.
      **Today: 21 text elements, none derived.**
- [ ] `grep -c "README" web/src/pages/index.astro` returns **≥ 1**.
      **Today: 0** — the home page does not know the README exists.
- [ ] The home page's first heading is the README's own claim, not a separate
      one: the rendered `<h1>` text appears verbatim in `README.md`.
      **Today it does not** — `<h1>` is *"Narrative Work OS"*, which is not a
      heading or line of `README.md`.
- [ ] Editing one line of `README.md` changes the built home page: build,
      change the claim line, rebuild, and `web/dist/index.html` differs.
      **Today: it does not change** — the two are unconnected.
- [ ] `find web/dist -name index.html | wc -l` is **643 or more**, and
      `curl -s -o /dev/null -w '%{http_code}' /` is 200 in the built output.
      **Today: 643.**
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
