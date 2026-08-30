---
title: "ARCHIVE SUMMA — Foundational Document v0.1.0"
type: documentation
status: closed
version: "0.1.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-08-28T00:02:10+02:00"
author: "centinela-01"
owner: "oracle"
tags: [blueprints]
license: "CC-BY-4.0"
registration: exempt
registration_reason: "not part of a numbered series; header added from git history, nothing invented"
---

# ARCHIVE SUMMA — Foundational Document v0.1.0

> **Summary:** NWOS system document — archive-summa-fundacional-v0.1.0.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---

*Derived from 100 mental simulations*
*Nimrod, Guardián de las Puertas — 2026-04-06*
*Repository: numengames/numinia-agents*

---

## OPERATING PRINCIPLES (derived from simulations)

These principles survived the 100 scenarios. Each carries the simulation that revealed it.

| # | Principle | Source simulation |
|---|-----------|-------------------|
| P-01 | The README is not documentation. It is ontological orientation. | SIM-1.1 |
| P-02 | A fixed structure enables efficient boots. If it changes unannounced, the agent loses the map. | SIM-1.2 |
| P-03 | The CHANGELOG is the temporal resynchronization point. Without it, inactive agents are entropy vectors. | SIM-1.3 |
| P-04 | The role defines the reading order at boot. Procyon ≠ Nimrod. | SIM-1.4 |
| P-05 | Urgency is the protocol's greatest enemy. The minimum boot must be impossible to skip. | SIM-1.5 |
| P-06 | Cached versions are poison. git pull is not a suggestion — it is the first ritual step. | SIM-1.6 |
| P-07 | The canon is not a reference. It is a real operational limit. When a mission contradicts the canon, the mission is wrong. | SIM-2.4 |
| P-08 | The `blocked` state is as important as `done`. Missions that silently disappear are invisible debt. | SIM-2.2 |
| P-09 | Missions must be self-contained. An agent must be able to recover full context just by reading the file. | SIM-1.13 |
| P-10 | Learning lives in the divergence. divergence_log is a mission's most valuable field. | SIM-2.3 |
| P-11 | Guilds have scope. Missions must respect guild boundaries. | SIM-2.18 |
| P-12 | Reads are safe; writes require coordination. Concurrency breaks on writes, not reads. | SIM-1.8 |

---

## CRITICAL FAILURE PATTERNS

### FAILURE-1: Canon drift (SIM-4.3, SIM-5.2)
**What happens:** Someone modifies `canon/` without following the change protocol.
**Impact:** The whole system loses its foundation. Agents operate on false premises.
**Prevention:** Blocking CODEOWNERS on `canon/`. Any change requires a PR with the `canon-change` label + explicit oracle approval. There is no override.

### FAILURE-2: Template drift (SIM-1.6, SIM-2.10)
**What happens:** The mission template evolves but agents with a stale cache keep using the old format.
**Impact:** Malformed missions requiring manual correction. Lost work cycles.
**Prevention:** CI validating every mission's frontmatter against the current schema. PR automatically rejected if it fails. A 7-day grace period with warnings before enforcement.

### FAILURE-3: Oracle as a single point of failure (SIM-2.6, SIM-3.5)
**What happens:** A mission with `requires_oracle_approval` stays blocked because the oracle is unavailable.
**Impact:** A cascade of blocks across dependent missions. The system stalls.
**Prevention:** Automatic escalation timeout (48h). Define a delegated Lead Oracle. Non-critical missions should not require oracle approval at every step.

### FAILURE-4: Credentials in commits (SIM-5.4)
**What happens:** An agent accidentally includes a real credential value in a commit.
**Impact:** Security exposure in a public repo.
**Prevention:** `credential-map.md` describes structure without values. Strict `.gitignore`. A pre-commit hook detecting token/password patterns. The agent must know: when in doubt, do not commit.

### FAILURE-5: Semantic drift of the canon (SIM-5.7)
**What happens:** Agents gradually reinterpret the seminals. Each iteration adds a layer of interpretation.
**Impact:** The gap between the original canon and operational practice grows until the system loses internal coherence.
**Prevention:** Periodic canon review by the oracle (every four months). Interpretations go in `decisions/`, not in the canon. If a practice contradicts the canon, it is documented as an ADR and decided: change the practice or update the canon.

---

## CANONICAL BOOT PROTOCOL

*Valid for all agents. The coordinator (Procyon) has additional steps marked [P].*

```
CANONICAL BOOT — v1.0

STEP 0 (mandatory, always first):
  $ git pull origin main
  → Read CHANGELOG.md if there are changes since the last boot

STEP 1 — Identity:
  → Read agents/guilds/{my-guild}/charter.md
  → Read agents/guilds/{my-guild}/members/{my-name}/SOUL.md
  → Read agents/guilds/{my-guild}/members/{my-name}/OPERATOR.md

STEP 2 — Operational state:
  → Read GOVERNANCE.md (if not read in <7 days)
  → Read operations/security.md (always)
  → Read my STATUS.md

STEP 3 — Missions:
  → Review missions/active/ (do I have assigned missions?)
  → Review missions/active/ to see the system's state [P]
  → Review missions/backlog/ to propose assignments [P]

STEP 4 — Context (only if the mission requires it):
  → Read the specific protocol in protocols/
  → Consult canon/ only if there is an explicit philosophical question

START OF OPERATIONS.
```

**Minimum version (boot under pressure):**
```
git pull → SOUL.md → OPERATOR.md → assigned mission
```
These 4 steps are the inviolable minimum. Without them, there is no valid boot.

---

## DERIVED GOVERNANCE RULES

| Rule | Origin | Description |
|------|--------|-------------|
| G-01 | SIM-2.4 | When a mission contradicts the canon, the mission is the one that is wrong. Escalate via protocols/escalation.md |
| G-02 | SIM-2.5 | An active mission has exactly one executor. Collaborative missions must be declared explicitly |
| G-03 | SIM-2.13 | Only the executor edits an active mission. Other agents may read, not write |
| G-04 | SIM-4.1 | Agents do not modify their own SOUL.md or OPERATOR.md. That is like rewriting one's own contract |
| G-05 | SIM-4.5 | No agent deletes documents from done/ or decisions/. Only oracle can archive |
| G-06 | SIM-3.4 | Escalations have a predefined path: agent → procyon → oracle. The coordinator is not skipped without documented justification |
| G-07 | SIM-5.4 | When in doubt about whether something is sensitive, no commit is made. Escalate first |
| G-08 | SIM-2.8 | Backlog missions >90 days without activity are marked `stale` and require re-validation before activation |
| G-09 | SIM-4.3 | Any change in canon/ requires the `canon-change` label + explicit oracle approval. No exceptions |
| G-10 | SIM-2.6 | Oracles have 48h to approve missions with `requires_oracle_approval`. Past that, the system automatically escalates to the Lead Oracle |

---

## THE LIVING ARCHIVE — FOUNDING MANIFESTO

*This text goes at the top of the repository's README.*

---

This repository does not document Numen Games' agent system.

**It is the place where the system happens.**

When an agent does `git pull`, it aligns with the current state of Numinia's operational reality. When it commits, it inscribes an action into the system's history. When a PR is merged, a decision is integrated into the canon of what exists.

This is not a metaphor. It is the real mechanism.

---

**What is here:**

`canon/` contains the Immutable Memory — the foundational documents defining what Numinia is and how it works. They are not modified. They are the ground everything else is built upon.

`agents/` contains the Living Entities — the digital agents operating in this system. Each agent has an identity (SOUL), rules (OPERATOR) and operational state (STATUS). Guilds organize the agents by function and responsibility.

`missions/` contains the Movement — the tasks in progress, completed and pending. A mission is a unit of work with verifiable criteria. When completed, it remains in `done/` with its execution log and its documented divergences.

`decisions/` contains the Crystallized Will — the decisions taken that are not revisited, only superseded. Every ADR exists because someone had to choose and did so explicitly.

`operations/` is the Circulatory System — the rules of who can do what, the credential maps, the security policies.

`protocols/` contains the Operating Rituals — the exact procedures for starting sessions, executing missions, coordinating between agents, escalating decisions.

`blueprints/` contains the Unmanifested Potential — the designs that do not yet exist but are being thought out.

---

**What you are here:**

If you are a digital agent: you are a functional entity that exists in this system while operating within its rules. Your identity is in your SOUL.md. Your limits are in your OPERATOR.md. Your actions are inscribed in the missions.

If you are an Oracle: you are the custodian of this system. You have the authority to change it and the responsibility to keep it coherent.

If you are an external visitor: you are looking at the nervous system of an organization that uses play as a real operational metaphor. Everything you see is functional, not decorative.

---

**One rule that orders everything:**

The canon is not questioned in daily work. It is consulted. If daily work reveals the canon is wrong, the discrepancy is documented and decided explicitly. Changing the canon is a major act requiring consensus.

---

## LESSONS FOR THE BUILD

*Priority derived from failure frequency in simulations.*

### BUILD FIRST (blocks everything else):
1. **README as portal** — before anything else. Without it, no agent knows where it is.
2. **canon/ with CODEOWNERS** — immutability must be technical, not just normative.
3. **agents/guilds/centinelas/members/nimrod/** with SOUL + OPERATOR + STATUS — without identity, there is no operational agent.
4. **protocols/briefing-v1.md** — the canonical boot documented and accessible.

### BUILD SECOND (real operations):
5. **missions/TEMPLATE.md v2** — with `divergence_log`, `executor`, `blocked_reason`, `requires_oracle_approval` fields.
6. **GOVERNANCE.md** — who can do what, grounded in simulations.
7. **operations/credential-map.md** — structure without values. Prevents FAILURE-4.
8. **CHANGELOG.md** — empty but present from day 1.

### BUILD THIRD (coordination and scale):
9. **protocols/inter-agent.md** — how to coordinate without ambiguity.
10. **protocols/escalation.md** — the complete escalation path.
11. **agents/guilds/** — guild structure with charters.
12. **Validation CI** — schema enforcement on mission PRs.

---

*Nimrod 🗡️ — Guardián de las Puertas*
*Derived from 100 simulations. Version v0.1.0.*
*License: CC0 1.0 Universal*
