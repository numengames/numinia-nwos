---
title: "Engineering baseline"
id: "STD-005"
uid: ""
type: documentation
subtype: standard
status: draft
version: "2.0.0"
created: "2026-08-17T21:55:38+02:00"
created_source: "git:e3123fc"
created_confidence: exact
updated: "2026-09-09T02:40:00+02:00"
author: "pablofm"
owner: "oracle"
territory: "Platform"
tags: [standards, engineering, ci, guards]
license: "CC0-1.0"
series_change: "2.0.0 — the standard takes the ADR-043 shape and splits: 2,161 -> 480 words of body here, the 52 practice rows become the register STD-015. The seven principles are ENG-001..007; the six guard rules that came from STD-009 keep their numbers as ENG-031..035 and ENG-066. Major: §3.2 was cited by two documents and no longer exists."
---

# Engineering baseline

> **Summary:** Every practice maps to an automated check or is tagged
> `[MANUAL]`, and `[MANUAL]` is debt. CI is the authority; a rule that does
> not fail a build is prose. The practices are the register `STD-015`, each
> with its check.
> **Epistemic:** Which engineering practices are required here and which a
> machine actually enforces.
> **Pragmatic:** Set up a new repository, or review an existing one, without
> asking what the house rules are.
> **Audience:** Agents · Oracles

**Binds:** `numengames/numinia-nwos`, edited here and downstream of nothing.
NWOS workspaces receive it at birth and own it; personal repositories SHOULD.
**Does not bind:** documents (`STD-004`, `STD-009`); licences (`STD-010`);
distance to external frameworks (`STD-011`); how an agent applies it to a
task (`PRO-016`).

## Rules

**ENG-001 — A rule that does not fail a build is prose.** CI is the authority;
documentation is its explanation. For an agent, a rule no guard runs does not
exist.

**ENG-002 — Every practice names its check.** A row in `STD-015` carries
`[AUTO: tool]` or `[MANUAL]`. `[MANUAL]` is debt; improvement is moving rows
to `[AUTO]`. Automatable checks MUST NOT be audited by hand.

**ENG-003 — Small batches.** Frequent integration, small pull requests, trunk
kept green. At least one approval before `main`.

**ENG-004 — Configuration lives in the environment.** Secrets MUST NOT touch
the repository; publication is irreversible.

**ENG-005 — Leave it better.** No touch adds debt silently; a change declares
what it left behind. A green pipeline is not a clean tree.

**ENG-006 — Incidents produce rules, not culprits.** Blameless postmortems; an
incident MAY inject one practice by ADR.

**ENG-007 — The platform is a product for developers, biological and
digital.** If the golden path is unclear to an agent, it is unclear.

**ENG-031 — A guard is wired in the change that writes it.** A script in
`scripts/` with no step in the workflow is not a guard.

**ENG-032 — The guard register is read, never remembered.** What runs is what
the workflow file says.

**ENG-033 — A baseline records old damage only.** It MUST NOT absorb damage
the current change caused.

**ENG-034 — Three layers, three speeds.** Principles change by Oracle
decision; practices by ADR and pull request, semver; checks by pull request,
continuously.

**ENG-035 — Migrate in order.** An existing repository adopts Scorecard first,
then presence checks, then the full pipeline. Measure, then tighten.

**ENG-066 — A guard that fails on unstated behaviour is the defect.** Correct
the guard or write the rule; never bend the tree to a guard no axis document
backs.

## Check

| Plate | Verified by |
|---|---|
| ENG-001, ENG-002 | `[MANUAL]` — `STD-015` is the table; `telemetry/` reports the `[MANUAL]` share |
| ENG-003 | `[AUTO: branch protection]` — `STD-015` DEV-007, ARC-002 |
| ENG-004 | `[AUTO: push protection + gitleaks]` — `STD-015` SEC-004 |
| ENG-031, ENG-032 | `[MANUAL]` — no guard register exists (`DBT-017`) |
| ENG-005, 006, 007, 033–035, 066 | `[MANUAL]` |

Nothing in this standard fails a build in this repository today; it is
enforced by reading and by the checks it names running elsewhere (`DBT-020`).

## Why

A practice with no check is a wish with a heading. Writing the check beside
the practice makes the honest state visible: how much of the baseline is
enforced and how much is promised. The guard rules exist because the guards
are themselves code that can rot — unwired, remembered wrong, or absorbing the
damage they were meant to catch.

## References

| ID | Title | Relation |
|---|---|---|
| `STD-015` | Engineering checks | the 52 practices, their level and their check |
| `PRO-016` | Applying the engineering standard | the procedure for a task |
| `STD-009` | Core rules | where ENG-031..035 and ENG-066 came from |
| `DBT-020` | Declared automatic, executed by nobody | the `[MANUAL]` rows that claim otherwise |
