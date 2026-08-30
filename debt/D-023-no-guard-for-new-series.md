---
id: "D-023"
uid:
title: "Nothing checks that a new series reaches the published site"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-25T12:50:08Z"
created_source: "git:edf8021"
created_confidence: exact
updated: "2026-08-25T12:50:08Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, web, publishing, guards, coverage, D-001]
license: "CC-BY-4.0"
visibility: "public"
severity: high
opened_by: "Oracle, 2026-08-25"
evidence_script: "scripts/check-published-coverage.mjs"
evidence_head: "dc7ae43"
---
# D-023 — Nothing checks that a new series reaches the published site

> **Summary:** A folder can be added to the archive and never appear on
> numinia.org. Nothing fails, nothing warns, and the build stays green.
> **Epistemic:** The gap is not between the corpus and its measurements — it is
> between the corpus and **what the world can see of it**.
> **Pragmatic:** `debt/` was invisible until someone happened to count pages.

## The finding

The Oracle, on `debt/` being missing from `content.config.ts`:

> *"It is not an instrument measuring wrong, it is that nothing checks that a
> new series enters `content.config.ts`. The next one will fall the same way."*

Correct, and the history is worse than the case that prompted it.

## Measured

Every series, compared against the day it entered the publishing glob:

| Series | Folder created | Entered the glob | Invisible for |
|---|---|---|---|
| `canon/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `missions/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `decisions/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `protocols/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `operations/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `reports/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `blueprints/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `agents/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `guilds/` | 2026-04-07 | 2026-08-18 | **133 days** |
| `standards/` | 2026-04-14 | 2026-08-18 | 126 days |
| `debt/` | 2026-08-24 | 2026-08-25 | **1 day** |

**`debt/` is the best case in this table, not the worst.** It was caught in a
day because the page count was being watched during an active session; the nine
before it took four months, and were fixed in bulk by `MIS-087` rather than
noticed individually.

*(Correction to the framing that opened this entry: `debt/` was out of the glob
for one day, not twelve — the folder was created 2026-08-24. The twelve-day
figure was an estimate. The four-month figure that replaces it is measured, and
it is the one that matters.)*

## Why it recurs

Three reasons, and none is carelessness:

1. **The glob is an allow-list in a file nobody opens.**
   `web/src/content.config.ts` is web code; creating a series is archive work.
   The two never meet in the same task.
2. **Nothing fails.** A missing series does not break the build — there is
   simply less to build. `npm run build` goes green with the corpus half
   published.
3. **Page count is the only signal, and it is not watched.** It appeared as
   `515 → 559` and only meant something because the number was being tracked
   that day for another reason.

> A series that nobody publishes still exists, still gets committed, still gets
> cited. It simply cannot be read by anyone outside the repository — which for
> `debt/` means **the register of what is broken was the one thing the archive
> did not show.**

## What would close it

A guard, and this one is genuinely mechanical:

```js
// scripts/check-published-coverage.mjs
// Every top-level folder holding .md files either appears in the corpus glob,
// has its own collection, or is listed as a deliberate exclusion with a reason.
// Anything else fails the build.
```

Three categories, all already present in the repository:

- **In the glob** — `canon/`, `missions/`, `debt/`, …
- **Own collection** — `reports/audits/` (`audits`, page `/audits`),
  `canon/archive-lore.md` (`canonLore`)
- **Deliberately excluded, with a written reason** — `.github/` templates,
  `web/` itself

The guard's value is the third category: it forces an exclusion to be *stated*
rather than achieved by omission. Today the difference between "excluded on
purpose" and "forgotten" is invisible, and that is the whole defect.

**Cost:** one script and one line in `ci.yml` (`D-017` — the Oracle's hands).
Same shape as `check-references.mjs`, and it needs no baseline: the corpus
passes today.

## Closure

Marked RESOLVED when:

- [ ] `scripts/check-published-coverage.mjs` exists and fails on an unlisted
      series, verified in both directions
- [ ] It runs as a step in `ci.yml`, verified by reading the **step** and not
      the run's conclusion (`S-001` §10.3)
- [ ] The current exclusions carry a written reason in `content.config.ts`

| | |
|---|---|
| Severity | **high** — silent, and it hid the debt register itself |
| Owner | Oracle (`ci.yml` step); agent writes the guard |
| Blocked by | `D-017` for the CI step |
| Opened | 2026-08-25 |
| Closes when | the guard exists, runs, and exclusions are declared |
