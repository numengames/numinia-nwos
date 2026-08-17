---
id: "MIS-070"
title: "Testing and best practices across the numengames org"
type: mission
status: backlog
version: "1.0.0"
created: "2026-08-17"
updated: "2026-08-17"
author: "claude-fable-5"
owner: "oracle"
tags: [testing, ci, best-practices, org, licensing]
license: "CC-BY-4.0"
mission_id: "MIS-070"
area: "Infrastructure"
guild: "Sentinels"
type_execution: "digital"
priority: "high"
effort: "L"
assigned_to: null
requested_by: "oracle"
requires_oracle_approval: true
blocked_reason: null
depends_on: []
started: null
completed: null
divergence_log: null
---
# MIS-070 — Testing and best practices across the numengames org

> **Summary:** No repo in the org has a single test gate before merge
> (AUD-2026-08-17-stack, finding 5) and this repo's only check is the
> license guard. Establish a per-repo testing baseline, review the
> remaining org repos against it, and maintain one plan for all.
> **Epistemic:** What a minimum viable quality gate looks like for an
> org that deliberately chose platform deploys over CI YAML.
> **Pragmatic:** A broken PR can no longer reach main unnoticed; every
> repo knows its own bar.
> **Audience:** Agents · Oracles

---

**Area:** Infrastructure · **Guild:** Sentinels · **Priority:** high · **Effort:** L

## Context

Ordered by the Oracle 2026-08-17. Inputs: the stack audit
(AUD-2026-08-17-stack — zero CI in 4 repos, Workers Builds deploys
*after* merge, only numengames-web has any test) and today's operational
evidence (a GitHub incident left the deploy pipeline blind with no
signal; a strict YAML parser caught duplicate keys that nothing else
had). Known repos in scope: **numinia-nwos** (this one),
**numengames-web**, **nwos-deploy**, **nwos-web** (never audited), plus
whatever the org listing reveals. `numen-games-nwos-orgs` stays out of
scope (Oracle ruling: not this agent's remit).

## Story

As the Oracle, I want every repo in the org to run a known set of
checks before its changes ship, so that quality stops depending on
whoever happens to be paying attention.

## Acceptance criteria

- [ ] **Baseline defined** (this repo first, as reference): build passes
      networkless; license-frontmatter guard; REUSE coverage complete;
      mission frontmatter lint (canonical status vocabulary, no
      duplicate ids, no duplicate YAML keys); redirect routes exist;
      raw .md endpoints match the corpus. Shipped as scripts/ checks a
      human or agent can run with one command.
- [ ] **Pre-merge gate decision (Oracle signs):** Workers Builds only
      builds after merge. Either adopt a minimal check-only CI (e.g.
      GitHub Actions that runs the baseline, no deploy logic) or
      explicitly accept post-merge-only with the risk recorded. The
      stack audit's finding 5 closes one way or the other, not by
      default.
- [ ] **Org review executed** (blocked until GitHub recovers): clone
      numengames-web, nwos-deploy, nwos-web; verify the two 🔴 stack
      audit findings — nwos-deploy has no LICENSE (declare a regime)
      and hardcodes claude-sonnet-4-20250514 (deprecated, announced
      retirement already past; replace with claude-sonnet-5 and verify
      /api/registro works) — and produce a per-repo gap table against
      the baseline.
- [ ] **One plan for all:** a maintained document (this repo, per
      MIS-068's propagation model) listing each repo, its checks, its
      gaps, and its owner. Not a snapshot — the stack audit showed
      snapshots rot.
- [ ] Also resolve: which repo feeds the nwos-web.pablofm.workers.dev
      Worker (stack audit 🔴 finding 3 — needs Oracle's dashboard
      access).

## Epistemic value

Whether "platform deploys, no CI YAML" can coexist with "broken merges
never ship" — or whether the org's first YAML file is overdue.

## Pragmatic value

The next duplicate-YAML-key class of bug gets caught by a script, not
by a stricter parser stumbling over it months later.

## Execution log

*(Fill when executing)*

## Execution Reality

*(Fill when closing)*

- **Technology/approach used:**
- **Why it diverged:**
- **Key learning:**
- **Closing date:**
- **Executing agent:**
