---
id: "MIS-069"
title: "Plan B: GitHub-independent continuity for the NWOS source of truth"
type: mission
status: backlog
version: "1.0.0"
created: "2026-08-17T14:13:30Z"
created_source: "git:db13bca"
created_confidence: exact
updated: "2026-08-17T14:13:30Z"
author: "claude-fable-5"
owner: "oracle"
tags: [continuity, sovereignty, radicle, mirrors, infrastructure, file-over-app]
license: "CC-BY-4.0"
mission_id: "MIS-069"
area: "Infrastructure"
guild: "Sentinels"
type_execution: "digital"
priority: "medium"
effort: "M"
assigned_to: null
requested_by: "oracle"
requires_oracle_approval: true
blocked_reason: null
depends_on: []
started: null
completed: null
divergence_log: null
---
# MIS-069 — Plan B: GitHub-independent continuity for the NWOS source of truth

> **Summary:** numinia-nwos — THE source of truth — lives solely on
> GitHub, and GitHub is a single point of failure for hosting, webhooks
> and therefore deploys (proven 2026-08-17: a GitHub incident degraded
> webhooks and left the deploy pipeline blind). This mission builds the
> independence layer: a mirror that always exists, and an evaluation of
> Radicle as the sovereign forge.
> **Epistemic:** Whether a P2P forge can carry the NWOS repo without
> giving up the workflows that matter.
> **Pragmatic:** A GitHub outage stops being an operational outage.
> **Audience:** Agents · Oracles

---

**Area:** Infrastructure
**Guild:** Sentinels
**Type:** digital
**Priority:** medium
**Effort:** M

---

## Context

Requested by the Oracle on 2026-08-17, mid-GitHub-incident (webhooks,
API, Actions and PRs degraded; our deploy canary for that day was
inconclusive because of it). Every clone of numinia-nwos is already a
full backup — git itself is distributed — but everything *around* the
repo is centralized on GitHub: the canonical remote, PR workflow, and
the webhook that triggers Workers Builds.

**Radicle, first look (radicle.dev, v1.10.1, released 2026-08-12 —
actively maintained):** open-source, peer-to-peer code collaboration
stack built on Git. No central entity; repositories replicate across
peers; always-on availability comes from running a *seed node*. Issues
and patches are "collaborative objects" stored **in the repository
itself** — which is File Over App applied to the forge layer, a
striking philosophical fit for NWOS: the collaboration memory would
live in the same replicated object as the canon. Natural seed host
already exists in-fleet: the on-premises PC (MIS-052, in progress).

## Story

As the Oracle, I want the source of truth to survive and stay
operable through any GitHub outage or policy change, so that the
NWOS's continuity depends on us, not on a vendor.

## Acceptance criteria

- [ ] **Layer 1 — mirror now (cheap, vendor-agnostic):** a second
      remote receives `git push --mirror` (candidates: self-hosted
      bare repo on the MIS-052 box, Codeberg, or a Radicle seed);
      mirroring is automated (post-push hook or scheduled), not
      manual; documented in operations/.
- [ ] **Layer 2 — Radicle evaluation:** `rad` installed, numinia-nwos
      published to the network (`rad init` on the existing checkout),
      a seed node running (MIS-052 box candidate), and a written
      verdict: can it replace or only complement GitHub for our
      workflow (PR-equivalent patches, multi-Oracle access, agent
      access)?
- [ ] **C-005 gate before adoption:** Radicle's own licensing resolved
      from its source (never from memory) and checked against the
      consume lists; publishing the repo to the Radicle network is a
      *distribution surface* — verify it grants nothing beyond what
      the current public GitHub repo already grants.
- [ ] **Deploy independence assessed:** Workers Builds only listens to
      GitHub — document the fallback deploy path from the mirror
      (local `wrangler deploy` is already authenticated; state the
      runbook).
- [ ] GOVERNANCE/operations note: which remote is canonical, and what
      "GitHub is down" changes operationally (answer target: nothing
      urgent).

## Epistemic value

Whether sovereignty at the forge layer is practical today, or a
philosophical nicety — measured on our own repo, not on a demo.

## Pragmatic value

The 2026-08-17 scenario (incident mid-mission) becomes a non-event:
work continues against the mirror, deploys run from the runbook.

## Execution log

*(Fill when executing)*

## Execution Reality

*(Fill when closing the mission)*

- **Technology/approach used:**
- **Why it diverged:**
- **Key learning:**
- **Closing date:**
- **Executing agent:**
