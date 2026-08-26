---
id: "AUD-2026-08-26-complexity"
uid:
title: "Complexity census: how many guards exist, which run, and what an ordinary operation costs"
type: report
subtype: audit
status: published
version: "1.0.0"
created: "2026-08-26T16:30:00Z"
created_source: "git:3277a9a"
created_confidence: "exact"
updated: "2026-08-26T16:30:00Z"
author: "ursa"
owner: "oracle"
guild: "Procuradores"
territory: "Infrastructure"
tags: [audit, complexity, guards, ci, measurement, C-005, D-025, D-032]
license: "CC-BY-4.0"
evidence_head: "3277a9a"
scope: "numinia-nwos @ 3277a9a · public surface: numinia.org"
---
# Complexity census

> **Measurement only.** Nothing is proposed for removal, per instruction.
> **Why now:** C-005 v2.0.0 adds three guards — the `CLAUDE.md` fragment check,
> the `precedence = "override"` ban, and CI evaluation of debt thresholds. Once
> in canon they are norm, and removing them later requires changing canon again.

---

## 1. Executive summary

1. **The repository has 21 scripts and runs 2 of them in CI.** 19 are invoked by
   nothing automated.
2. **A guard that everyone believes runs, does not.** `check-orphan-content.mjs`
   is absent from `ci.yml`. `D-032` states in writing that it *"runs in CI"*.
   That sentence is false.
3. **No guard has ever failed in a way git can show.** Each CI guard has exactly
   one revision — they were added and never fixed. Whether they ever went red in
   a PR is **not answerable from this repository**: CI run history lives in
   GitHub Actions, not in git.
4. **The median landed PR touches 4 files**; 30% touch three or fewer. The
   distribution is long-tailed: one PR touched 83.
5. **Adding three guards would take CI from 2 to 5 — a 150% increase in
   enforcement surface** on a base where one third of existing guards is already
   disconnected without anyone noticing.

---

## 2. Inventory

| | Count |
|---|---|
| Workflow files | **2** (`ci.yml`, `scorecard.yml`) |
| Scripts under `scripts/` | **21** |
| …invoked by CI | **2** |
| …invoked by `package.json` | **2** (one overlaps) |
| …invoked by nothing automated | **19** |

**What CI runs**, from `ci.yml` verbatim:

```
- licence-frontmatter guard (C-005 §5) : node scripts/check-license-frontmatter.mjs
- reference lint (ADR-004)             : node scripts/check-references.mjs
- install                              : npm ci
- build                                : npm run build
```

Two guards, then build. That is the entire enforcement pipeline.

**The 19 manual-only scripts** fall into three honest categories, and mixing them
would overstate the problem:

| Category | Count | Examples |
|---|---|---|
| One-shot migrations, already spent | ~8 | `cancel_to_frozen.py`, `normalize-standards.py`, `phase0-inventory.py` |
| Audit instruments, invoked deliberately | ~7 | `provenance-census.py`, `protocol-anchor.py`, the three `reuse-*-lab.sh` |
| **Guards that could run and do not** | **1** | **`check-orphan-content.mjs`** |
| Generators | ~3 | `generate-design-kit.mjs`, `render-glossary.py` |

**Only the third category is a defect.** An audit script that runs when an
auditor runs it is working as intended; a guard that nobody runs is not a guard.

---

## 3. The finding: a guard believed to run, and does not

`scripts/check-orphan-content.mjs` is **not in `ci.yml`**. It has three revisions
— more than either CI guard — so it was maintained, not abandoned.

`debt/D-032-orphan-content-outside-renderer.md` line 174 states:

> *"**1 · The guard runs in CI.** `scripts/check-orphan-content.mjs` exists and is…"*

**That is false at `3277a9a`.** The only thing that invokes it is
`scripts/verify-orphan-guard.sh`, itself manual-only — a verifier for a guard
that does not run, invoked by nobody.

This is `D-025` (*no guard declares what it is blind to*) in a sharper form: the
guard does not declare that it never executes, and a debt entry asserts the
opposite in writing.

**I ran all three by hand at `main`:**

```
check-license-frontmatter.mjs   exit=0   278/302 .md declare a licence
check-references.mjs            exit=0   no new broken references
check-orphan-content.mjs        exit=0   2 orphans, all tracked
```

All three pass. The orphan guard would not have blocked anything — but nothing
would have stopped it going red unnoticed either.

---

## 4. Has any guard ever failed?

**Not answerable from this repository, and saying otherwise would be inventing
data.** CI run history lives in GitHub Actions. What git can answer:

| Guard | In CI | Revisions | First landed |
|---|---|---|---|
| `check-license-frontmatter.mjs` | **yes** | 1 | 2026-08-17 |
| `check-references.mjs` | **yes** | 1 | 2026-08-25 |
| `check-orphan-content.mjs` | **no** | 3 | 2026-08-25 |

**One revision each** for the two CI guards: added once, never corrected. Two
readings fit — they were right first time, or they never went red hard enough to
need fixing — and git cannot distinguish them. The Oracle can, from the Actions
tab; I cannot, and I am not going to guess.

**What is measurable: enforcement carries state outside the guards.**
`scripts/references-baseline.json` freezes **17 known-broken references** the
lint is told to ignore, with its own instruction:

> *"The lint fails only on NEW breakage. This list should shrink over time and
> never grow."*

Of those 17 entries, **12 are the same broken link** (`../docs/LEY.md`) in the
missions migrated from `numinia-web`, and 5 are everything else. So the reference
guard is green while carrying a list of 17 exceptions, and nothing measures
whether that list is shrinking as its own comment requires.

---

## 5. What an ordinary operation costs

Measured from `main`'s first-parent commits — each is one landed PR.

> **Method note:** the first attempt measured this from `git log --merges` and
> returned 0 files for 15 of 16 PRs, because squash-merged PRs are not merge
> commits. Recorded because the same mistake will look plausible next time.

| Statistic | Files |
|---|---|
| Median | **4** |
| Minimum | 1 |
| Maximum | 83 |
| PRs touching ≤3 files | 9 of 30 (**30%**) |

The 83-file outlier is PR #69 — 79 `.license` files for third-party attribution,
which the pending migration would reduce to 2.

**The median of 4 is the relevant number for the canon decision:** a typical
operation is small, so per-PR enforcement cost is what matters, not per-file.

---

## 6. What C-005 v2.0.0 would add

| Guard | What it checks | Exists today |
|---|---|---|
| `CLAUDE.md` fragment coherence vs canon §9 | that the copied block matches the canon | **no** |
| `precedence = "override"` ban (§5.2) | that no `REUSE.toml` carries the flag | **no** |
| Debt thresholds evaluated per build (§5) | that `LEGAL_DEBT.md` exit conditions are measured | **no** |

**2 running guards → 5.** A 150% increase in enforcement surface.

Two measured facts the Oracle should weigh, stated without a recommendation:

- **One third of the guards that exist is already disconnected**, and a debt entry
  documents the opposite. Adding three more to a system whose current state is
  mis-documented increases the number of things that can be believed-but-false.
- **All three new guards are cheap to run** — a grep over `REUSE.toml`, a diff of
  a markdown block, and a parse of `LEGAL_DEBT.md`. The cost is not compute; it
  is that each becomes **norm** on entering canon, and norm is what cannot be
  removed without changing canon.

---

## 7. What was not measured

- **CI run history** — lives in GitHub Actions, not in git. This is the single
  biggest gap in this census and the reason question 3 has no answer.
- **`scorecard.yml`** — a supply-chain scanner, not a repo guard; excluded from
  the pipeline count as it enforces nothing about this corpus.
- **Guards in the other three repositories.** Scope is `numinia-nwos`.
- **Whether the 19 manual scripts still work.** Only the three CI-adjacent ones
  were executed.
