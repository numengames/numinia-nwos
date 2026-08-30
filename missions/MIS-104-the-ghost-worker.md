---
id: "MIS-104"
title: "The ghost Worker: what actually serves nwos-web.pablofm.workers.dev"
type: mission
status: todo
version: "1.0.0"
created: "2026-08-18T14:47:39Z"
updated: "2026-08-18T14:47:39Z"
author: "claude-opus-5"
owner: "oracle"
tags: [infrastructure, cloudflare, risk, audit]
license: "CC-BY-4.0"
mission_id: "MIS-104"
territory: "Infrastructure"
guild: "Sentinels"
type_execution: "biological"
priority: "high"
effort: "S"
requested_by: "oracle"
assigned_to: null
requires_oracle_approval: true
human_approval_score: 8
parent_mission: null
sub_missions: []
depends_on: []
started: null
completed: null
---
# MIS-104 — The ghost Worker

> **Summary:** A Cloudflare Worker may be the only host of a live product
> surface, and no one — including the team's own code comments — can say which
> repository deploys it.
> **Epistemic:** Whether the deployed reality matches the documented one.
> **Pragmatic:** Either the Worker is retired, or it is adopted and documented.
> Both are better than not knowing.
> **Audience:** Oracle · Sentinels

---

**Area:** Infrastructure
**Guild:** Sentinels
**Type:** biological (requires Cloudflare and GitHub admin access)
**Priority:** high
**Effort:** S

---

## Story

As the Oracle, I want to know what deploys `nwos-web.pablofm.workers.dev`,
so that no production surface of Numen Games is an orphan.

---

## Context (2026-08-18)

Finding 🔴 3 of the stack audit, still open. The evidence is a comment the
team left in its own configuration:

> *"deliberately not reusing the existing `numinia-web` worker
> (nwos-web.pablofm.workers.dev), which may still be the only host of the NWOS
> product (/velo, /api/registro)"*

Three facts, all verified, none of them reassuring:

1. The repository `numengames/numinia-web` **does not exist** — 404, and it is
   absent from the org listing.
2. A repository `numengames/nwos-web` **does exist**, active, and has never
   been audited.
3. A Worker named `nwos-web` serves `nwos-web.pablofm.workers.dev`, and the
   team's own note suspects it may host `/velo` and `/api/registro`.

Meanwhile `nwos-deploy` now serves `/velo` and `/api/registro` at
`nwos.numen.games` with its own Worker. So either the ghost is dead weight, or
there are **two live deployments of the same product surface**, one of them
undocumented, on a personal `workers.dev` subdomain, possibly holding its own
copy of `GITHUB_TOKEN` and `ANTHROPIC_API_KEY`.

That last possibility is the reason this mission is not merely tidy-up: a
forgotten Worker with live credentials is an attack surface nobody is
watching, and SEC-06 (one token per purpose, minimum scope, expiry set) cannot
be honoured for secrets nobody has enumerated.

---

## Scope

- Identify, from the Cloudflare dashboard, the Worker's deployment source: a
  connected repository, a manual `wrangler deploy`, or an orphan.
- Determine what it serves and whether anything or anyone still reaches it.
- Enumerate its secrets and bindings.
- Decide (Oracle): adopt and document it, or retire it — and if retired, rotate
  every credential it held (SEC-06), never simply delete the Worker.
- Audit `numengames/nwos-web` while there: what it is, what it deploys, and
  whether it is the source.
- Whatever is decided, `numinia-nwos` records it so the next audit does not
  rediscover the same question.

**Out of scope:** any change to `nwos.numen.games`, which is documented and
working.

---

## Acceptance criteria

```gherkin
Feature: no orphan production surface

  Scenario: The source is identified
    Given the Worker nwos-web.pablofm.workers.dev
    When its deployment configuration is inspected in Cloudflare
    Then its source is named — a repository, a manual deploy, or an orphan

  Scenario: The decision is executed, not just taken
    Given the Oracle decides to retire the Worker
    When it is removed
    Then every secret it held has been rotated first
    And the removal is recorded with its date

  Scenario: The answer outlives the session
    Given the question is settled
    When a future audit asks it again
    Then the answer is in this repository, not in someone's memory
```

- [ ] Deployment source of the Worker identified
- [ ] Secrets and bindings enumerated
- [ ] `numengames/nwos-web` audited: purpose, stack, deployment target
- [ ] Decision recorded (adopt / retire) with its reason
- [ ] If retired: credentials rotated **before** deletion, and both recorded
- [ ] The `wrangler.toml` comment that raised the question updated to point at
      the answer

---

## Epistemic value

How far the deployed reality has drifted from the documented one — measured on
the piece most likely to have drifted furthest.

## Pragmatic value

Either one less unknown surface holding live credentials, or one more
documented one. The current state is the only unacceptable option.

---

## Execution log

- 2026-08-18 — Opened from the standards review requested by the Oracle;
  finding 🔴 3 of the 2026-08-17 stack audit, verified still open.

---

## Execution Reality

*(Fill when closing)*

> *"The ideal plans show the intention. The real plans show the knowledge."*
