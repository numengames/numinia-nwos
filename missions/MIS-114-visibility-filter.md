---
id: "MIS-114"
title: "Filter the build by visibility, so debt/ can return to the glob without publishing D-033"
status: backlog
priority: high
effort: M
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
tags: [web, visibility, debt, governance, D-033]
license: "CC-BY-4.0"
context: "2026-08-25"
paths: [web/src/content.config.ts, web/src/pages/corpus/, debt/]
---
# MIS-114 — Filter the build by visibility, so debt/ can return to the glob without publishing D-033

> **Summary:** `visibility` becomes a rule the build applies, instead of a field
> we write and nothing reads.
> **Pragmatic:** `debt/` returns to the corpus and `D-028`, `D-032`, `D-034`
> publish, while `D-033` does not.
> **Audience:** Agents · Oracles

---

## Scope

The corpus glob in `web/src/content.config.ts` gains a `visibility` filter, and
`debt/**/*.md` returns to it.

The situation this resolves, recorded in that file's own comment: `debt/` was
missing from the glob for 134 days by accident, was added on 2026-08-25, and
was **withheld again the same day on purpose** — because `D-033` enumerates 132
controls the system claims to satisfy and does not verify, which is finished
reconnaissance for anyone who reads it, and `F-48` is open.

Withholding the whole folder is a blunt instrument: it hides 34 entries to hide
one.

### The measurement that shapes the work

```
35  entries in debt/
30  declare NO visibility field at all
 2  internal
 2  restricted-oracle
 1  pending-oracle
```

**The default is the mission.** 30 of 35 entries say nothing, so a filter that
publishes only what is explicitly marked public would publish nothing, and one
that publishes anything unmarked would publish `D-033` the day someone forgets
the field.

The rule must **fail closed**: absent `visibility` means not published. That
makes the 30 silent entries invisible until each is marked — deliberate, and
the cost is stated up front rather than discovered later.

`visibility` appears **only in `debt/`** today (zero occurrences elsewhere), so
this defines the field's semantics for the whole archive. The vocabulary
(`internal`, `restricted-oracle`, `pending-oracle`, and whatever means "public")
is settled in this mission, and `pending-oracle` — one entry — must resolve to
something rather than staying a fourth state forever.

> **Scope and Acceptance criteria are written now and are not edited later.**
> What actually happens goes in `Closure`.

### Out of scope

**No `visibility` value is changed to make a document publish.** If an entry
should be public it is marked in its own change, with a reason, not silently
during the wiring.

`D-033` stays unpublished. That is the constraint this mission is built around,
not a decision it revisits.

---

## Acceptance criteria

*(Each states what it returns today at base commit `385c29d`, so it is false
before the work starts. Final states, not deltas.)*

- [ ] `debt/**/*.md` is in the corpus glob in `web/src/content.config.ts`.
      **Today: absent** — withheld wholesale.
- [ ] `web/dist/corpus/debt/d-033-unverified-compliance-assertions/index.html`
      **does not exist** after a build with `debt/` in the glob.
      **Today it does not exist either — for the wrong reason:** the whole
      folder is withheld. This criterion is only meaningful together with the
      one above, and the pair is what must hold.
- [ ] At least one debt entry **is** published:
      `web/dist/corpus/debt/d-028-url-lifecycle-unmanaged/index.html` exists.
      **Today: it does not.**
- [ ] The filter fails closed: a `.md` in the glob with no `visibility` field
      produces no page. Verifiable by counting — published debt pages equal the
      number of entries explicitly marked publishable, never more.
      **Today: unverifiable, because nothing reads the field.**
- [ ] The build **reads** the field: `visibility` appears in
      `web/src/content.config.ts` as schema or filter code, not only in prose.
      **Today the only occurrence is a comment** —
      `128: // 2026-08-25: now withheld ON PURPOSE, pending a visibility filter` —
      which is the defect stated in its own file: the field is written in 5
      documents and read by none.
      ```bash
      grep -n "visibility" web/src/content.config.ts | grep -v '^\s*[0-9]*:\s*//'
      ```
      **Today: no output.**
- [ ] `find web/dist -name index.html | wc -l` is **greater than 643**, and no
      pre-existing route 404s. **Today: 643.**
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
