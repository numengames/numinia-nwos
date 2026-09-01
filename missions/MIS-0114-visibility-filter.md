---
id: "MIS-114"
uid: ""
title: "Filter the build by visibility, so debt/ can return to the glob without publishing D-033"
status: done
priority: high
effort: M
guild: "Alchemists"
territory: "TBA"
type_execution: digital
assigned_to: "ursa"
completed: "2026-08-25"

type: mission
version: "1.0.0"
created: "2026-08-25T19:34:05Z"
created_source: "git:31fcd63"
created_confidence: exact
updated: "2026-08-25T20:50:28Z"
author: "ursa"
owner: "oracle"
tags: [web, visibility, debt, governance, D-033]
license: "CC0-1.0"

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

*(Written at closing. Nothing above this line was edited.)*

- **What was done:** `debt/**/*.md` is back in the corpus glob, and what may be
  published is now decided per document by `visibility`, in
  `web/src/lib/corpus.ts`. All four consumers of the collection go through
  `getPublicCorpus()`; `grep -c 'getCollection("corpus")' web/src/pages/` returns
  **0**. The rule fails closed: only `visibility: "public"` publishes.

  Verified by breaking it on purpose, in both directions:

  ```
  base                          debt/ pages published: 0    D-033: not built
  D-001 temporarily "public"    debt/ pages published: 1    D-001 built, D-033 still not
  reverted                      debt/ pages published: 0    git diff debt/ empty
  ```

  A filter that has only ever been seen to hide is not verified. This one was
  seen to let one through, and then seen to stop again.

- **What diverged, and why — the brief asked for something impossible.**

  The Summary says *"`D-028`, `D-032`, `D-034` publish, while `D-033` does
  not"*. Measured at the base commit:

  ```
  D-028  pending-oracle       D-032  internal
  D-034  restricted-oracle    D-033  restricted-oracle
  ```

  **`D-033` and `D-034` carry the same value.** No filter reading `visibility`
  can publish one and withhold the other, and Out of scope forbids changing a
  value to make a document publish. The three requested documents publish only
  by marking them — which is the next change, not this one.

  So this mission delivered the **mechanism**, and `debt/` publishes **nothing**
  today. That is the fail-closed cost, stated in the brief and now real: 30 of
  35 entries declare no field, and the five that do declare values that are not
  `public`.

  The second divergence is the one that mattered more: **the brief's rule had no
  scope.** *"Absent `visibility` means not published"*, applied to the corpus
  collection, would have removed **112 pages** in one commit — `visibility`
  appears in exactly zero documents outside `debt/`. Scoped to `debt/` before a
  line of the filter was written, on the Oracle's signature. Measured first, not
  discovered after.

- **The answer to "what counts as a section" — the input `MIS-113` depends on.**

  **A section is a top-level corpus folder holding documents a reader is meant
  to browse.** Six qualify: `canon`, `standards`, `decisions`, `protocols`,
  `blueprints`, `debt` — in that order, least to most uncertain.

  The test is the one-sentence blurb: if you cannot say what a folder contains
  in one sentence, it is not a section. `agents/` (per-agent state files),
  `operations/`, `guilds/` and `reports/` fail it — infrastructure, live
  records, definitions cited from canon, and dated dailies that `/reportes`
  already serves.

  **`missions/` is not a section, and this is the finding.** The 111 `MIS-*`
  documents are excluded from the collection by `!missions/MIS-*.md`; their
  index is the board. What remains is 5 system documents about how missions are
  written. `MIS-111`'s table claimed `Missions | 111`, and a section built from
  it would have promised 111 and listed 5 — corrected in this branch with its
  own record, as the exception to leaving briefs untouched.

  **A document belongs to the section its path starts with.** One folder, one
  section, no document in two places.

- **Advances MIS-071:** the corpus regains 35 documents of `debt/` as governed
  content rather than withheld content — the folder is no longer excluded
  wholesale from the file-over-app surface. Published today: 0, by design.

- **Evidence:** base `5abd27f`. Pages 660 → 660, unchanged: nothing was lost by
  putting `debt/` back. Guards: licence 271/294, references baseline 17 no new,
  orphan-content exit 0.

### Verified in production

Merged as `ba3673c` (PR #62). The footer moved `5abd27f → ba3673c` on its own,
no panel touched, and the deployed SHA equals `main`.

```
fail closed        /corpus/debt/d-033-…/   404
                   /corpus/debt/d-028-…/   404
                   /corpus/debt/d-001-…/   404

the rest intact    /corpus/canon/c-001-welcome-to-numinia/     200
                   /corpus/standards/s-001-glossary/           200
                   /corpus/protocols/p-010-how-to-archive/     200
                   /corpus/                                    200
```

**The second block is the one that matters.** A 404 on `debt/` proves nothing on
its own — it is indistinguishable from the state before this mission, when the
folder was simply out of the glob. What proves the filter is scoped correctly is
that **the other 112 corpus pages still answer 200**: had the rule kept the
brief's unscoped form, this deploy would have removed them.

### The pair that proves it discriminates — measured in production, `e84ee19`

Once every entry was marked, the mechanism was checked against the live site
rather than against `dist/`:

```
34  entries marked public   → 200
 1  entry restricted        → 404
 0  discrepancies
```

```
/corpus/debt/d-034-dependabot-advisories-untriaged/    200
/corpus/debt/d-033-unverified-compliance-assertions/   404
```

**Those two are the proof.** Before the marking they carried the *same*
`restricted-oracle` value, which is why the brief's request to publish one and
withhold the other was impossible as written. Today one serves and the other
does not, and the only thing that differs between them is a field a human set on
purpose, with a reason recorded in the document.

A filter that only hides is a folder exclusion with extra steps. This one lets
through what is marked, stops what is not, and the boundary is written down.

- **Closed:** 2026-08-25 · **by:** ursa
