---
id: "MIS-140"
uid:
title: "Publish-coverage guard: a series not in the corpus glob fails the build — close DBT-003"
status: in-progress
priority: medium
effort: M
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
started: "2026-09-02T14:38:38Z"
completed: null

type: mission
version: "1.0.0"
created: "2026-09-02T14:38:38Z"
updated: "2026-09-02T14:38:38Z"
author: "ursa"
owner: "oracle"
tags: [debt, dbt-003, publication, guards, ci, corpus]
license: "CC0-1.0"
---

# MIS-140 — Publish-coverage guard: a series not in the corpus glob fails the build

> **Summary:** `debt/` was invisible on numinia.org for a day because a new
> folder never entered the publishing glob, and nothing failed. DBT-003's
> closing condition is a guard that fails a PR when a series with published
> content is missing from the corpus mirror. This mission writes it and wires
> it into CI.
> **Epistemic:** a build cannot fail for content that was never asked to be
> published — the omission produces a valid site, not an error. The guard
> makes the omission itself the error.
> **Pragmatic:** one script in the pattern of `check-orphan-content.mjs`, one
> step in `ci.yml`, one real case (`infra/`) to settle either way.
> **Audience:** Agents · Oracles

---

## Context

DBT-003 (publication integrity) — closing condition:

> - [ ] `scripts/check-published-coverage.mjs` exists and fails on an unlisted
>       series, verified in both directions
> - [ ] It runs as a step in `ci.yml`, verified by reading the **step** and
>       not the run's conclusion (`STD-001` §10.3)
> - [ ] The current exclusions carry a written reason in `content.config.ts`

Condition 3 is **already met** (verified 2026-09-02): every exclusion in
`web/src/content.config.ts` carries a comment — `reports/evidence/**` (ADR-005
v1.2.0 rule 5), `decisions/DEC-*` + `ADR-*` (typed collection owns them),
`blueprints/BLU-*`, `missions/MIS-*`, `reports/RPT-*`, and the `debt/` history
(MIS-114). Conditions 1–2 are this mission.

**Measured, not assumed** — the series map at `origin/main` (top-level folders
containing tracked `.md`):

| Folder | In corpus glob? | Note |
|---|---|---|
| agents · canon · guilds · operations · protocols · standards · reports · decisions · blueprints · system · history · missions · debt | ✅ | thirteen series, all covered |
| `infra/` | ❌ | contains `infra/github/README.md` — published or not, the guard will force the decision |
| `web/` | ❌ | the viewer's own sources (`web/src`, `web/README.md`) — the Astro app, not corpus content; declared as a non-series |
| `.github/`, scripts, root docs | ❌ | apparatus, not corpus; declared as non-series |

`infra/` is the live case this guard exists to catch: a folder with a
committed document that the site neither publishes nor explicitly excludes.
The guard's job is to make that state impossible to reach silently again.

## Scope

- **New script** `scripts/check-published-coverage.mjs`, modeled on
  `check-orphan-content.mjs` (same header style, SPDX MIT, same exit-code
  discipline). It must:
  1. Enumerate top-level folders under `../` containing tracked `*.md`
     (`git ls-files`, like the other guards — the index, not the working
     tree, so the guard and CI agree).
  2. Compare against the patterns declared in the corpus collection of
     `web/src/content.config.ts`.
  3. Fail (exit 1) on a series that is neither covered by a positive glob
     pattern nor declared as a non-series with a reason.
  4. Declare the non-series explicitly (`.github/`, `scripts/`, `web/`, root
     apparatus) so the guard is not silently blind to them — same discipline
     the debt register requires of every guard: state what it does not look at.
  5. Support a `--write-baseline` / allow-list mechanism consistent with the
     repo's other ratchets, so a deliberate new exclusion lands with a reason,
     not with a quiet edit.
- **`ci.yml`**: a step running it, placed next to the other corpus guards
  (after `check-orphan-content.mjs`).
- **The `infra/` case**: settled in the same change — either added to the
  glob (if it should publish) or declared as a non-series with a written
  reason in `content.config.ts` (if it should not). The guard forces the
  decision; the mission records which one was taken and why.

**Out of scope:** changing what any series publishes; `visibility` filtering
in `web/src/lib/corpus.ts` (that is MIS-114's mechanism, already live); the
other three absorbed entries of DBT-003 (`D-023` coverage, `D-031` index
coverage, `D-032` orphan content — the orphan guard already exists and runs;
index coverage stays separate).

## Acceptance criteria

Falsifiable at the base commit (current `origin/main`):

```bash
# 1. The guard exists and is executable:
test -x scripts/check-published-coverage.mjs   # (or invoked via node)
node scripts/check-published-coverage.mjs      # exit 0 on the settled state

# 2. It fails in the direction that matters — verified BOTH ways (STD-001 §10.3):
#    a. Remove one series from the glob temporarily (e.g. `canon/**/*.md`) →
#       guard exits 1 naming the missing series
#    b. Restore → guard exits 0
#    (verified by the executor with a temporary edit, reverted; recorded in Closure)

# 3. It runs in CI as its own step:
grep -n "check-published-coverage" .github/workflows/ci.yml   # matches

# 4. The non-series list is declared and reasoned, not implicit:
grep -n "non-series\|not corpus\|apparatus" scripts/check-published-coverage.mjs
```

- [ ] The `infra/` case has a verdict (published or declared non-series with
      a reason) recorded in this mission's Closure.
- [ ] All existing guards still pass: `lint-frontmatter.mjs`,
      `lint-naming.mjs`, `check-references.mjs`, `check-license-frontmatter.mjs`.
- [ ] `npm run build` (web/) exits 0 — the guard must not break the build.
- [ ] No public URL changes — `check-url-lifecycle.mjs` unaffected.

## Closure

*(Fill when the mission closes.)*
