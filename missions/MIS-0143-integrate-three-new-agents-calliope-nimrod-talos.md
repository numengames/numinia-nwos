---
# CORE
id: "MIS-0143"
uid: ""
title: "Integrate three new agents: Calliope, Nimrod, Talos"
status: in-progress
started: "2026-09-04T12:25:36Z"
priority: high
effort: M
assigned_to: ursa
guild: "Sentinels"
territory: "Archive"
type_execution: digital
completed: null

# REGISTRO
type: mission
version: "1.0.0"
created: "2026-09-04T12:00:00Z"
created_source: "git:c80f2b0"
created_confidence: exact
updated: "2026-09-04T12:00:00Z"
author: "ursa"
owner: "oracle"
tags: [agents, calliope, nimrod, talos, integration, guilds]
license: "CC0-1.0"

# OPCIONALES
requires_oracle_approval: true
paths: [agents/, agents/calliope/, agents/nimrod/, agents/talos/, agents/INDEX.md, guilds/]
---

# MIS-0143 — Integrate three new agents: Calliope, Nimrod, Talos

> **Summary:** Onboards Calliope, Nimrod, and Talos into the NWOS archive with canonical identity files, Hermes adapters, and guild roster registration.
> **Epistemic:** How a new agent enters the system — which files are canonical, which are adapters, and where it appears in routing and guild rosters.
> **Pragmatic:** Three new operative agents available for routing after execution.
> **Audience:** Agents · Oracles

---

## Scope

This mission creates the canonical agent structure for three new agents:

1. **Calliope** — copywriter, specialist in copywriting and editorial content. Exegetes guild, Erudites branch.
2. **Nimrod** (new, unrelated to the retired Centinela-01/Nimrod) — guide and caretaker of all archive files. Sentinels guild, Archangels branch.
3. **Talos** — security specialist for repo protocols and processes (CI/CD, safety, care systems). Sentinels guild, Seraphim branch.

For each agent this mission creates the canonical four documents (`AGENT.yaml`, `SOUL.md`, `OPERATOR.md`, `SOURCES.md`) and the Hermes adapter (`adapters/hermes/config.yaml`, `adapters/hermes/profile.yaml`), following the `agents/_template/` structure and `AGENTS.md` conventions.

The six documents for each agent are supplied by the Oracle and integrated after structural review. The identity content is not rewritten by the executor.

This mission also registers all three agents in `agents/INDEX.md` and updates the corresponding guild rosters (`guilds/exegetes/GLD-007-roster.md`, `guilds/centinelas/GLD-006-roster.md`).

> **Scope and Acceptance criteria are written when the mission OPENS and are not edited afterwards.**

---

## Acceptance criteria

```
✓  agents/calliope/AGENT.yaml exists with status: designed and role: copywriter
✓  agents/nimrod/AGENT.yaml exists with status: designed and role: repository-guide
✓  agents/talos/AGENT.yaml exists with status: designed and role: repository-assurance
✓  agents/calliope/SOUL.md exists with agent: calliope frontmatter
✓  agents/nimrod/SOUL.md exists with agent: nimrod frontmatter
✓  agents/talos/SOUL.md exists with agent: talos frontmatter
✓  agents/calliope/adapters/hermes/config.yaml exists
✓  agents/nimrod/adapters/hermes/config.yaml exists
✓  agents/talos/adapters/hermes/config.yaml exists
✓  agents/INDEX.md lists Calliope, Nimrod, and Talos in the roster table
✓  guilds/exegetes/GLD-007-roster.md lists Calliope
✓  guilds/centinelas/GLD-006-roster.md lists Nimrod and Talos
✓  agents/calliope/SOUL.md contains the Oracle-supplied identity prose
```

- [ ] Verifiable by someone who did not do the work
- [ ] With the command that verifies it, when there is one
- [ ] False at the base commit — say what it returns today
- [ ] Phrased as a final state, not as a delta

---

## Execution log

- 2026-09-04 — The published mission contained three branch assignments inconsistent with the Oracle-confirmed design; execution uses Erudites/Archangels/Seraphim for Calliope/Nimrod/Talos respectively.
- 2026-09-04 — The published brief described placeholder SOUL files; execution integrates the six Oracle-supplied documents for each agent.
- 2026-09-04 — Nimrod SOURCES.md was corrected from the retired `missions/TEMPLATE` path to `templates/MIS-TEMPLATE` after the main branch template migration.

## Closure

*(Fill when the mission closes. Not before, and not with intentions.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:** agent-id

<!--
OPTIONAL SECTIONS — add only when they earn their place.

## Epistemic value
Hypothesis: <what we believe>
Validated by: <command, measurement, or observation that could refute it>

## Pragmatic value
What practical capability this leaves behind, when it is not obvious from Scope.

## Execution log
Running notes during a long mission.
-->
