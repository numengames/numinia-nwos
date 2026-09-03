---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-147"
uid: ""
title: "Verify or correct the 132 falsifiable compliance assertions and close DBT-006"
status: todo
# ^ todo — the board's state for a mission awaiting assignment (STD-001 §7).
priority: high
effort: L
guild: "Sentinels"
territory: "Archive"
type_execution: digital
assigned_to: null
completed: null

# REGISTRO — not consumed by the build, but every document in this archive
# carries them (STD-001 §5).
type: mission
version: "1.0.0"
created: "2026-09-03T11:38:00Z"
created_source: "git:3ada698"
created_confidence: exact
updated: "2026-09-03T11:38:00Z"
author: "ursa"
owner: "oracle"
tags: [debt, compliance, verification, guards, STD-001, DBT-006, corpus]
license: "CC0-1.0"

# OPCIONALES
depends_on: []
requires_oracle_approval: true
paths:
  - debt/DBT-006-unverified-compliance-assertions.md
  - standards/STD-001-glossary.md
  - standards/STD-002-governance.md
  - protocols/
  - operations/
  - reports/
  - scripts/barrido-cumplimiento.py
context: "2026-09-03"
---
# MIS-147 — Verify or correct the 132 falsifiable compliance assertions and close DBT-006

> **Summary:** `debt/DBT-006` measured **145 compliance assertions** across
> 282 documents: 12 verified, **132 falsifiable by command and never
> falsified**, 1 an assertion of trust. Of the 132, **61 are not pending at
> all — they are refuted by `STD-001` §2.0 and still written in the present
> tense** (immutable/append-only across 40+ documents). DBT-006 deliberately
> separated them and stated that correcting them *"is a mission of its own
> with its own review"*. This is that mission.
> **Epistemic:** whether the corpus can be made to say only what it can
> back — by verifying the 71 genuinely-pending assertions and correcting or
> removing the 61 refuted ones — and whether a repeatable sweep can keep it
> that way.
> **Pragmatic:** the archive stops asserting immutability it does not
> enforce; every surviving compliance claim has a verdict and a date.
> **Audience:** Agents · Oracles

---

## Origin

`debt/DBT-006-unverified-compliance-assertions.md` (active, severity high,
visibility restricted-oracle). Its closing condition is the contract this
mission executes:

- the 132 falsifiable assertions are each resolved: verified (by command),
  corrected (text no longer claims what is false), or removed;
- the 61 refuted assertions (29 `immutable`, 32 `append-only` — STD-001 §2.0
  established the archive "claimed an immutability it never had and never
  enforced", 9 of 33 `done` missions were edited after closing) stop being
  written in the present tense across the 40+ documents §2.0 never reached;
- the 71 genuinely-pending assertions (read-only, must not, shall not,
  not-in-this-repo, no exceptions, enforced-via, requires-Oracle-approval)
  each get a verdict;
- the sweep that produced the counts is re-run and its output recorded, so
  the measurement is reproducible and dated.

The counts were measured at `392ffc6` (2026-08-25). The first act of
execution is to **re-measure from the current tree** — the corpus has moved
since (missions/ normalisation, PRO-001/PRO-003 merges, reports/ renumber).
The old numbers are the starting map, not the contract.

## Scope

Bring the corpus's compliance assertions into agreement with what is
actually enforced, in `numinia-nwos` only:

- **Re-measure:** run the compliance sweep (the evidence script recorded in
  DBT-006, or an equivalent re-implementation in `scripts/`) against
  `main`, and record the current counts — which documents, which
  assertions, classified as verified / falsifiable / trust.
- **The 61 refuted (immutable / append-only):** correct or remove each
  assertion so the document no longer claims, in the present tense, a
  property STD-001 §2.0 established the archive does not have. Where a
  document quotes a retired rule, rephrase to past tense or to the current
  standard, whichever is truthful. One commit per document or per coherent
  cluster, each citing this mission.
- **The 71 pending:** for each, determine the verifying command and run it;
  verdict is `verified` (evidence recorded), `not-applicable` (written
  reason), or `cannot-verify` (written reason — moved to a dated register,
  not left as a silent present-tense claim).
- **Record:** a dated triage record (in the mission's annex or `reports/`)
  listing every assertion with its verdict, command, and evidence head.
- **DBT-006:** update with the outcome; status change to closed/done is the
  Oracle's call, not the executor's.

**Where it stops:**

- **No new enforcement machinery.** Building a guard that *automatically*
  fails future unverified assertions is a separate decision (CI-side
  automation is Oracle territory, per the governance model established under
  `D-017` and its successors) — this mission verifies and corrects the
  corpus; it may propose the guard design but must not wire it.
- **No `canon/**` changes without formal consensus** (AGENTS.md, Canonical
  Changes). If an assertion lives in canon, the mission flags it to the
  Oracle and does not edit it.
- No other repositories (`numinia-web`, `numengames-web`, `nwos-deploy`).
- The 12 already-verified assertions are not re-litigated without cause.

## Out of scope

What someone would reasonably expect to be included and is not:

- **Fixing the underlying enforcement gaps** the assertions describe (e.g.
  actually enforcing immutability). This mission makes the corpus *tell the
  truth about what is enforced*; changing what is enforced is a governance
  decision for the Oracle.
- **Automated CI gating of assertion verification** (CI-side automation is
  Oracle territory, see `D-017` in the debt register).
- **Other repos' compliance claims.**

---

## Acceptance criteria

> Every criterion must be FALSE at the base commit (`3ada698`). Assert the
> final state, not a delta. Verifiable by someone who did not do the work.

- [ ] A dated triage record (mission annex or `reports/`) enumerates the
      current falsifiable assertions from a **re-run of the sweep**, each
      with a verdict: `verified` (command + evidence head), `corrected`
      (diff/commit), `removed` (diff/commit), `not-applicable` / 
      `cannot-verify` (written reason).
      (today: no such record exists; the only measurement is DBT-006's,
      dated 2026-08-25, with zero verdicts)
- [ ] No document in the corpus claims `immutable` or `append-only` in the
      present tense about the archive's own records, except where the claim
      is itself quoting/retiring the old rule in a way STD-001 §2.0 allows.
      (today: 61 such assertions across 40+ documents)
- [ ] Each commit that corrects or removes an assertion cites this mission
      and changes only what the assertion requires (no opportunistic edits).
      (today: no such commits exist)
- [ ] The sweep is re-runnable from `scripts/` (or its re-implementation is
      committed there) and its output for this run is recorded.
      (today: the evidence script lives under `salida/…`, outside the
      guarded tree, and is not re-runnable from `scripts/`)
- [ ] `DBT-006` records the outcome and a closure recommendation; its
      status change is the Oracle's decision.
      (today: DBT-006 is active with zero progress)
- [ ] Every surviving unverified present-tense compliance assertion is
      accounted for in the triage record — none is left silently.
      (today: 132 are left silently)

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.
Add here — never edit `Scope` or the criteria to match what happened.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:**

---

## Execution log

*(one line per significant step: date · step · evidence)*

- 2026-09-03 — Draft registered (MIS-147) by Ursa, at the Oracle's
  request, converting `DBT-006` into a mission. Branch
  `missions/mis-147-compliance-assertions-verification` from `main`
  `3ada698`. Status `todo`; not assigned, not executed. MIS-147 verified
  free against the remote (`MIS-146` is the Dependabot triage mission, also
  in flight).
