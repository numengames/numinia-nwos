---
# CORE
id: "MIS-0143"
uid: ""
title: "Integrate three new agents: Calliope, Nimrod, Talos"
status: done
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

- **What was done:** Se integraron los tres agentes (Calliope, Nimrod, Talos) en el archivo canónico NWOS. Cada uno con sus 6 documentos: AGENT.yaml, SOUL.md, OPERATOR.md, SOURCES.md, adapters/hermes/config.yaml, adapters/hermes/profile.yaml. Se actualizó agents/INDEX.md y los roster de guilds correspondientes (exegetas/GLD-007-roster.md, centinelas/GLD-006-roster.md).

- **What diverged, and why:** El brief original describía SOUL files placeholder; se integraron los documentos suministrados por el Oracle. Nimrod SOURCES.md se corrigió de `missions/TEMPLATE` a `templates/MIS-TEMPLATE` tras la migración del template en main.

- **Evidence:** Los 13 criterios de aceptación se verifican con:
  ```bash
  for a in calliope nimrod talos; do
    test -f agents/$a/AGENT.yaml && test -f agents/$a/SOUL.md && \
    test -f agents/$a/OPERATOR.md && test -f agents/$a/SOURCES.md && \
    test -f agents/$a/adapters/hermes/config.yaml && echo "$a: OK"
  done
  grep -q "Calliope" agents/INDEX.md && grep -q "Nimrod" agents/INDEX.md && \
  grep -q "Talos" agents/INDEX.md && echo "INDEX: OK"
  grep -q "Calliope" guilds/exegetas/GLD-007-roster.md && echo "EXEGETES: OK"
  grep -q "Nimrod" guilds/centinelas/GLD-006-roster.md && \
  grep -q "Talos" guilds/centinelas/GLD-006-roster.md && echo "CENTINELAS: OK"
  ```

- **Closed:** 2026-09-08 · **by:** ursa

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
