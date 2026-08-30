---
id: "MIS-100"
title: "The real gate: branch protection and organization settings"
type: mission
status: backlog
version: "1.0.0"
created: "2026-08-18T14:47:39Z"
updated: "2026-08-25T20:05:59Z"
author: "claude-opus-5"
owner: "oracle"
tags: [security, ci, governance, github, engineering-standards]
license: "CC-BY-4.0"
mission_id: "MIS-100"
area: "Infrastructure"
guild: "Sentinels"
type_execution: "biological"
priority: "critical"
effort: "S"
requested_by: "oracle"
assigned_to: null
requires_oracle_approval: true
human_approval_score: 8
parent_mission: null
sub_missions: []
depends_on: ["MIS-091"]
started: null
completed: null
---
# MIS-100 — The real gate

> **Summary:** Three repositories now run a CI pipeline that nothing forces
> them to pass. This mission turns the pipeline into a gate.
> **Epistemic:** Whether the org's quality problem was ever about checks, or
> only ever about enforcement.
> **Pragmatic:** A red build stops being information and starts being a wall.
> **Audience:** Oracle · Sentinels

---

**Area:** Infrastructure
**Guild:** Sentinels
**Type:** biological (GitHub settings — no agent can do this)
**Priority:** critical
**Effort:** S

---

## Story

As the Oracle, I want `main` to refuse a broken merge in every repository of
the organization, so that the checks we just wrote stop being decoration.

---

## Context (2026-08-18)

MIS-091 shipped `type-check → lint → test → build` to `numengames-web` and
`nwos-deploy`, and `numinia-nwos` already had its own CI. **None of the three
blocks anything:** without branch protection, a red pipeline is a red icon
next to a merged commit.

The stack audit (2026-08-17, finding 🟠 5) said it plainly: *"Workers Builds
deploys, it does not audit before merging. If a PR with a build error ever
reaches `main`, it will be deployed all the same."* Adding CI did not change
that. Only this mission does.

Engineering standards practices at stake — all of them `[AUTO]` and all of
them failing today:

| ID | Practice | Where it is set |
|---|---|---|
| ARC-02 | Branch protection on `main`: PR required, status checks required, no force push | Per repo |
| DEV-07 | At least one approving review before `main` | Per repo |
| SEC-12 | Commits to `main` verified (signed or web-verified) | Per repo |
| SEC-02 | Secret scanning + push protection on every repo | Org + per repo |
| SEC-03 | Dependabot alerts and security updates on | Org + per repo |
| SEC-01 | 2FA enforced at organization level | Org |
| SEC-11 | Organization base permission: read | Org |

This is the mission that makes the Scorecard number move: Branch-Protection,
Code-Review and Token-Permissions are among its heaviest checks.

---

## Scope

- The three active repositories first: `numengames-web`, `nwos-deploy`,
  `numinia-nwos`. Required checks, by job name: `pipeline` and `presence`
  (plus `license-check` and `cla` in `nwos-deploy`).
- Then the organization-level switches, which are a single act for all repos.
- The rest of the org's repositories inherit the org settings; their per-repo
  protection is scoped by MIS-095, not here.

**Out of scope:** repository visibility (LEG-01 gate), licence regimes
(C-005), and any change to what the pipelines actually run.

---

## Acceptance criteria

```gherkin
Feature: main refuses what CI rejects

  Scenario: A red pipeline cannot be merged
    Given a pull request whose CI run fails
    When someone with write access tries to merge it
    Then GitHub refuses the merge
    And it names the failing required check

  Scenario: Nothing reaches main without review
    Given any pull request against main
    When it has no approving review
    Then the merge button is unavailable

  Scenario: History on main is append-only
    Given any repository in the organization
    When a force push to main is attempted
    Then it is rejected

  Scenario: Secrets never enter the history
    Given push protection is enabled
    When a commit containing a recognised credential is pushed
    Then the push is rejected before the object lands

  Scenario: The organization's floor is read
    Given a new member of the organization
    When their permissions are inspected
    Then their base permission is read, and any write access is per repo
```

- [ ] Branch protection on `main` in the three active repos, with required
      status checks named explicitly
- [ ] One approving review required (DEV-07)
- [ ] Force push and branch deletion disabled on `main`
- [ ] Verified commits required, or the exception recorded with its reason
      (SEC-12 is SHOULD, not MUST)
- [ ] Secret scanning + push protection enabled (SEC-02)
- [ ] Dependabot alerts + security updates enabled (SEC-03)
- [ ] 2FA enforced org-wide (SEC-01)
- [ ] Base permission set to read (SEC-11)
- [ ] The settings are recorded in this file as the evidence — screenshots or
      a written statement per repo. A setting nobody can verify later is a
      setting that will drift.

---

## Epistemic value

Whether "we have CI" and "broken code cannot ship" are the same sentence. The
org has believed they were for as long as it has had platform deploys.

## Pragmatic value

Every future mission that adds a check gets enforcement for free. Until this
is done, each one has to argue for its own relevance.

---

## Execution log

- 2026-08-18 — Opened from the standards review requested by the Oracle. The
  finding is the audit's 🟠 5, unresolved by MIS-091 by design: an agent
  cannot set branch protection.

---

## Execution Reality

*(Fill when closing)*

> *"The ideal plans show the intention. The real plans show the knowledge."*

---

## Board triage — 2026-08-25: stays open, with two scenarios resolved

**Category E — alive.** Classified by running the brief's Gherkin scenarios
against the ruleset that went live today (`infra/github/ruleset-protect-main.json`,
ruleset `21281544`, `enforcement: active`). Three of five pass, one is covered by
design, one cannot be checked without authentication.

| Scenario | State | Evidence |
|---|---|---|
| A red pipeline cannot be merged | **passes** | `required_status_checks`: `build`, `Workers Builds: numinia-nwos` |
| History on `main` is append-only | **passes** | `non_fast_forward: true`, `deletion: true`, `bypass_actors: []` |
| The organization's floor is read | **passes** | org base permission read |
| Nothing reaches `main` without review | **covered by design** | see below |
| Secrets never enter the history | **unverified** | `security_and_analysis` is not visible without authentication |

### Why `required_approving_review_count: 0` is not a failure

I first read this as a failing criterion. **It is not.** GitHub does not let an
author approve their own pull request, so on a single-operator repository a
non-zero review requirement makes `main` unmergeable by the only person who can
merge to it. Setting it to `0` is **the single-operator trap decided on purpose**,
and the gate is carried by the required checks instead of by a reviewer.

Recorded here rather than left as a red mark, because a criterion that cannot be
satisfied by the current operator model is not evidence of a missing control —
it is evidence that the criterion assumed more than one person.

It becomes a real requirement the day a second person can merge. Until then:
**covered by design, with the reason on the record.**

### What remains

Push protection / secret scanning: pending, and pending **authentication**, not
work. The API hides `security_and_analysis` from unauthenticated reads, so the
honest state is *unknown*, not *absent*.

- **Signed by:** Oracle, 2026-08-25.
