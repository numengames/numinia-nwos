---
id: "MIS-125"
title: "The prefix register — four series carry identifiers no rule knows about"
type: mission
status: in-progress
version: "1.2.0"
created: "2026-08-30T11:50:00Z"
created_source: "git:b09311c"
created_confidence: exact
updated: "2026-08-31T13:11:21+02:00"
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

PR: https://github.com/numengames/numinia-nwos/pull/155 — merged
(squash, by María, `e8571cb`). A same-day commit
(`missions`/`D-008` cross-referencing) was pushed after the squash and
orphaned on the closed branch; rescued via cherry-pick into PR #156
(https://github.com/numengames/numinia-nwos/pull/156, merged). Stage A
closed end-to-end on `main` at `307c7bc`.

Two follow-up debts noted, not yet filed: `D-017` (cited by `D-024`, does
not exist in `debt/`); `.github/workflows/scorecard.yml` cites
`engineering-standards.md` by bare name in a comment, outside any guard's
reach — will break silently when Stage C renames that file.

## Stage B — rename tool (PR #157, PR #161, 2026-08-31)

**Pre-work (PR #157):** re-measured the register against `main` post-Stage-A
before writing any tool. Found a real contradiction in `D-008` v2.0.0:
`standards/` coverage claimed `0/8`, but only 7 files actually qualify —
`standards/STANDARDS.md` (`type: meta`, tombstone/redirector) was being
counted like a numbered standard instead of excluded like
`README.md`/`INDEX.md`. Oracle ruled: permanent apparatus, no `STD-NNN`
("vamos con la A"). `count-evidence.py` fixed, `D-008` corrected to v2.1.0
(`standards/` `0/8→0/7`). A concurrent session closed `debt/D-001` in
parallel during the same window (legitimate, documented in this file's
own ledger below) — `D-008`'s `debt/` count corrected `0/37→0/36` in the
same v2.1.0 pass. PR: https://github.com/numengames/numinia-nwos/pull/157
(merged).

**Tool (PR #161):** built `scripts/rename-series.mjs` per the plan's §B
algorithm — `--dir/--to/--from/--apply`, corpus-wide citation rewrite
(id + full path + basename, any file type), dry-run by default, no
auto-commit, runs `check-references.mjs` at the end of `--apply`.

Dry-run tested against 6 series (`infra` 0-file edge case, `guilds`,
`standards`, `protocols`, `debt`, `blueprints`) before any `--apply` —
**6 real bugs found and fixed, none hypothetical:**

1. Ambiguous basename collision (`guilds/*/charter.md`,
   `*/roster.md` — 4 identical basenames across sibling folders): a naive
   corpus-wide basename replace would have silently repointed one guild's
   citation to another. Fixed — bare-basename auto-rewrite only fires when
   the basename is unique across the whole corpus; ambiguous hits are
   listed for manual review, never auto-touched.
2. `standards/STANDARDS.md` tried to enter the plan under a live
   `standards/` series number, contradicting the ruling made minutes
   earlier in the same session.
   Fixed — excluded by name.
3. Slug bug: `engineering-standards.md` was mistaken for
   `PREFIX-name` and mangled, colliding with `STANDARDS.md`'s slug. Fixed —
   only strip a leading prefix when the file had a recognized *old series
   number*, never guessed off an unnumbered basename.
4. `registration: exempt` files entering unconditionally —
   `protocols/APPROVAL-REQUEST-template.md` surfaced with a live
   `protocols/` series number assigned,
   directly contradicting this session's own `D-024` v1.2.0 correction.
   Fixed — any `registration: exempt` file is excluded by default;
   `--include-exempt` is a per-run operator assertion, required after
   verifying `D-008`'s enumerated list actually covers the `--dir` in
   question.
5. Surfaced, not fixed by the tool: 2 more files carry the exact `P-010`
   §3.2 frozen-artifact filename shape (dated-title-versioned) but
   are **missing** the `registration_exemption: frozen-artifact` field
   (`protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md`,
   `standards/2026_04_14-Analogous_Terminology_Numina-v0.2.0.md`) — same
   conflict as item 6 below, now 5 files total. Detected by filename
   shape, not just the field, so a missing field can't silently bypass
   the guard.
6. CodeQL flagged 6 high-severity regex-injection findings on PR #161
   (`TO`/`FROM`/`SUBTYPE_FIELD` — unescaped CLI args interpolated into
   `new RegExp(...)`). Fixed with a `reEscape()` helper at all 6 sites;
   re-verified all 6 dry-run series produce identical plans afterward.

Also caught in the same window: `debt/D-002` was extinguished by another
session in PR #160, landing *after* this PR's own `D-008` v2.1.0 commit
— `D-008` corrected again to v2.2.0 (`debt/` `0/36→0/35`, total
renameable `275→274`), same pattern as the `D-001` correction, not an
error in the prior version.

PR: https://github.com/numengames/numinia-nwos/pull/157 (merged) and
https://github.com/numengames/numinia-nwos/pull/161 (merged, `534e25e`).

**Open blocker before Stage C can start — not resolved, awaiting Oracle
ruling (`clarify` sent 2026-08-31, unanswered as of this writing):**
`P-010` §3.2 defines `registration_exemption: frozen-artifact` files as
permanent dated snapshots that never evolve ("a photograph, not a living
document"). `D-008`'s own "24 exempt enter the scheme" ruling includes 5
such files (3 by explicit field, 2 more by filename shape only — see bug
5 above) and assigns them `STD-NNN`/`CAN-NNN`/`PRO-NNN` destinations,
directly contradicting `P-010` §3.2 on its face. `rename-series.mjs`
defaults to excluding all 5 (`--include-frozen-artifacts` required to
override), so the tool cannot mis-rename them either way — but Stage C
cannot proceed on `standards/`, `canon/`, or `protocols/` until the
Oracle picks a side: `P-010` wins (correct `D-008`, these 5 keep dated
names permanently) or `D-008` wins (amend `P-010` §3.2 to say
frozen-artifact no longer blocks series entry).
