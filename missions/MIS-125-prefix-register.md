---
id: "MIS-125"
title: "The prefix register — four series carry identifiers no rule knows about"
type: mission
status: in-progress
version: "1.1.0"
created: "2026-08-30T11:50:00Z"
created_source: "git:b09311c"
created_confidence: exact
updated: "2026-08-31T10:35:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC-BY-4.0"
territory: "Archive"
guild: "Exegetes"
tags: [governance, identifiers, prefixes, adr-005]
priority: medium
effort: M
type_execution: digital
---

# MIS-125 — The prefix register

## Why this mission exists

The Oracle, 2026-08-30, on being shown three misplaced prefixes:

> *"I'd put all the prefixes there. We have a problem, because I've seen it in
> several places too, and they have to be put in and decided properly. It
> doesn't need doing in this first pass if we can avoid it."*

He was right, and the measurement is worse than the three files that prompted
it. **This mission exists because the Oracle saw a pattern where I had reported
an incident.**

## The measured problem

`ADR-005` registers a prefix per series. `lint-frontmatter.mjs` implements it:

```
missions: MIS   ·  decisions: ADR|DEC  ·  protocols: P   ·  debt: D
standards: S    ·  canon: C            ·  agents: AG     ·  reports: RPT|AUD
```

Eight series registered. **The corpus carries identifiers in at least twelve**,
verified at `b09311c`:

| Series | Registered | Actually carried |
|---|---|---|
| `missions/` | `MIS` | `MIS` ×126, **`ANNEX` ×1, `PROP` ×1** |
| `reports/` | `RPT`, `AUD` | `AUD` ×11, `RPT` ×10, **`PROP` ×1** |
| `blueprints/` | **— not registered —** | `BP` ×16, `AUDIT` ×2, `WARDLEY` ×1, `blueprints` ×1 |
| `operations/` | **— not registered —** | `O` ×8, `ops` ×2 |
| `guilds/` | **— not registered —** | `charter` ×4, `roster` ×4 |
| `infra/` | **— not registered —** | `INFRA` ×1 |
| `decisions/` | `ADR`, `DEC` | + `decisions` ×1 |
| `canon/` | `C` | `C` ×6, **`canon` ×4** |
| `protocols/` | `P` | `P` ×13, **`APR` ×1** |

**Four whole series carry identifiers that no rule has ever seen**:
`blueprints/`, `operations/`, `guilds/`, `infra/`. Between them, 39 documents.

The three misplaced files that started this — `ANNEX`, `PROP` ×2 — are the
visible tip. The register itself is the problem.

## What this mission decides

For every series that carries identifiers:

1. **Which prefix is canonical**, including the ones nobody has ruled on
   (`BP`? `blueprints`? neither?)
2. **Whether lowercase descriptive ids are legal at all** — `charter-alchemists`,
   `roster-sentinels`, `canon-index` are a second convention living alongside
   the numbered one
3. **What happens to a document whose prefix does not match its folder** —
   move it, retire it, or register the prefix
4. **Whether the register belongs in `ADR-005` as an amendment or in `S-004`
   as a table** — `S-004` is where the ring tables already live

## Acceptance criteria

- [ ] Every series carrying identifiers appears in the register — twelve, not
      eight
- [ ] Every `id` in the corpus matches its series' registered prefix, or its
      exception is declared and dated
- [ ] The check is live in `lint-frontmatter.mjs` and fails in both directions
      (`P-013`)
- [ ] `H-01` prefix findings reach zero, and the count is measured against the
      filesystem, not the baseline file alone

## Dependencies

- **Not blocked.** Independent of the header burndown.
- **Overlaps `D-008` — verified, not assumed.** `D-008` is titled *"Four series
  carry a registration scheme the corpus does not yet apply"* and names the same
  four unregistered series this mission measured independently. **This mission
  is the execution of `D-008`, not a second opinion on it.** Read `D-008` first;
  if it already answers question 1, this mission inherits the answer rather than
  re-deciding it.

## The prior constraint

`S-001`: *"never renumber — an identifier is a promise about the past."*

That promise is real but narrower than it sounds. Measured: the 13 descriptive
ids (`charter-*`, `roster-*`, `*-index`) have **zero incoming citations in the
entire corpus** — each appears only inside its own file. The promise protects
identifiers someone uses. Nobody uses these.

**Before renaming anything here, measure its incoming citations.** The rule is
not "never rename"; it is "never break a reference that exists".

## Execution — 2026-08-31 (Ursa)

Design closed in a prior chat session (plan at
`.hermes/plans/2026-08-31_090215-MIS-125-prefix-standardization.md`,
repo-local, scratch — deleted at mission close per `P-010`). Execution
started this session, staged A → B → C → D per that plan.

**Base commit:** `26fea478d33018002e699cb59cdb4d7e0aa67d6d` (`origin/main`,
merge of ADR-032 / #153).

**Two blockers found before touching anything, both ruled by the Oracle
before proceeding (not decided unilaterally):**

1. **The plan's own premise was stale.** It states the
   `check-frontmatter-yaml.mjs` CI guard was "already wired, see the commit
   for this plan" and lists that as the one repo change already applied.
   Measured: the change existed only as an uncommitted working-tree diff on
   `.github/workflows/ci.yml` — no commit contained it, on any branch, local
   or remote. **Still not committed at time of writing** — see blocker 3.
2. **Wrong base branch.** The working tree was on
   `refactor/adr-032-blueprints-extinction` — already merged to `origin/main`
   (PR #153) and named for deletion in this same plan (§E). Resolved:
   checked out `main`, fast-forwarded to `origin/main`, carried the pending
   `ci.yml` diff across, then deleted the stale branch.
3. **This mission's own workflow error, caught by the Oracle, not by me.**
   The two commits above (CI guard + this section) were first made directly
   on local `main`, no branch, no PR — against this repo's fixed convention
   (branch + PR, always). Reverted: `main` reset back to `origin/main`, work
   moved to branch `mis-125/mark-in-progress`. **Note, checked after the
   fact:** `origin/main` is GitHub-protected (`protected: true`, confirmed
   via API); a push straight to it would very likely have been rejected
   regardless. The exact rules (required reviews, required checks, bypass
   list) could not be read — the configured PAT lacks admin scope on the
   repo (`GET .../branches/main/protection` → 403). Oracle asked to confirm
   or tighten the ruleset from Settings → Branches directly.
   Separately, the CI-guard commit hit a real, unrelated blocker: the same
   PAT lacks the `workflow` scope, so GitHub rejects any push touching
   `.github/workflows/*.yml` on any branch. **The CI guard commit is parked,
   not landed** — needs either a token scope fix or a human push. This
   mission-status update carries no `ci.yml` change and is unblocked.

Both premise corrections (1, 2) confirmed with the Oracle via clarifying
questions before any file was touched; the workflow correction (3) was the
Oracle's own catch, applied immediately. Progress against Stages A–D is
tracked in `missions/MIS-127-entropy-reduction.md` (ledger, per PR) as each
stage lands; this section records only the execution start and the premise
corrections.

## Stage A — normative docs (PR #155, 2026-08-31)

Two Oracle rulings closed before writing anything, both via `clarify`, not
decided unilaterally:

1. **`agents/` prefix.** The plan's premise — `agents/` stays without a
   prefix — silently reversed `ADR-005`'s own ratified Decision 2
   (`agents/` takes `AG-NNN`). Flagged, not written over. Oracle ruled:
   formalize the reversal as an explicit `ADR-005` v1.1.0 amendment
   (not just extend the new table), plus a reasoned `D-008` closure —
   rather than silently reinstating or silently dropping it. Folder count
   corrected 8→7 (plan was stale; verified via `git ls-files`/`find`).
2. **`registration: exempt` scope.** 50 files carry the exemption; 24 are
   content documents inside a registered series, not apparatus. Oracle
   ruled: all 24 enter the new scheme, no exception — this closed `D-024`
   as a side effect (including its `pending-genre-ruling` blocker for
   `operations/security-policy.md` + `credential-map.md`, both `OPS-NNN`).
   One document, `APPROVAL-REQUEST-template.md`, was first marked `[x]`
   in error (it is apparatus of `P-008`, not orphaned) — caught and
   corrected same session, `D-024` → v1.2.0.

**Documents changed:** `ADR-004` v1.1.0, `ADR-005` v1.1.0, `P-010` v0.4.0,
`D-008` v2.0.0 (rewritten, measured against the new register via
`git ls-files`, not the plan's stale census), `D-024` v1.2.0 (closed).

**A verification gap found and closed before it could reach Stage C:**
`check-references.mjs` was blind to the 13-series register (hardcoded 5
old prefixes, ignored the `C-/BP-/D-/S-` prefixes this mission retires)
and to a third citation kind — bare filenames in prose, the only way
`registration: exempt` documents are ever cited. Left unfixed, every
Stage-C "exit 0" would have been a false green light. Extended, measured
(331 pre-existing hits, unrelated historical debt, frozen in baseline),
verified with a positive test (renaming `credential-map.md` correctly
triggers 12 new failures).

**CI catch, fixed same day:** `debt/D-024`'s `status: resolved` is not a
valid value in `S-004`'s `documentation` lifecycle (`draft → active →
closed`) — build failed on `H-04`. Corrected to `status: closed`;
`(RESOLVED)` stays in the title as a human-readable note.

PR: https://github.com/numengames/numinia-nwos/pull/155 (open, reviewers
assigned, CI green as of `91bb1ca`).

Two follow-up debts noted, not yet filed: `D-017` (cited by `D-024`, does
not exist in `debt/`); `.github/workflows/scorecard.yml` cites
`engineering-standards.md` by bare name in a comment, outside any guard's
reach — will break silently when Stage C renames that file.
