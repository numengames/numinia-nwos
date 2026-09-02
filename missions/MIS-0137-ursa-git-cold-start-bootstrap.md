---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-137"
uid: ""
title: "Reproducible Git cold-start bootstrap for Ursa on Hermes"
status: draft
# ^ draft — brief not yet approved (PRO-003 §2). Note: lint-frontmatter
#   accepts only todo|in-progress|in-review|done|frozen for missions; the
#   draft state is PRO-003's, set by the author, and will be recorded as a
#   known baseline deviation until the Oracle rules.
priority: high
effort: L
guild: "Sentinels"
territory: "CAO"
type_execution: digital
assigned_to: null
completed: null

# REGISTRO — not consumed by the build, but every document in this archive
# carries them (STD-001 §5).
type: mission
version: "1.0.0"
created: "2026-09-02T09:40:00Z"
created_source: "git:68bd5f1"
created_confidence: exact
updated: "2026-09-02T09:40:00Z"
author: "ursa"
owner: "oracle"
tags: [ursa, bootstrap, context, hermes, onboarding, continuity, cold-start]
license: "CC0-1.0"

# OPCIONALES
depends_on: ["MIS-135"]
requires_oracle_approval: true
paths:
  - AGENTS.md
  - README.md
  - protocols/PRO-001-agent-session.md
  - protocols/PRO-003-mission-cycle.md
  - agents/ursa/
  - agents/INDEX.md
  - missions/MIS-0041-agent-onboarding-protocol.md
  - missions/MIS-0059-context-load-protocol.md
  - missions/MIS-0060-agent-canon-repo-sync.md
  - missions/MIS-0068-nwos-propagation-drift-guard.md
  - missions/MIS-0096-nwos-versioning-sovereign-adoption.md
  - missions/MIS-0118-agent-roster-replacement.md
  - missions/MIS-0135-normalisation-residue-register.md
context: "2026-09-02"
---
# MIS-137 — Reproducible Git cold-start bootstrap for Ursa on Hermes

> **Summary:** today a fresh Ursa session needs a manual five-intervention
> bootstrap (sync repos → analyse gaps → adopt identity → re-evaluate →
> pick a mission). This mission designs, ships and verifies a mechanism that
> lets one operator instruction — *"clone
> `https://github.com/numengames/numinia-nwos.git`"* — bootstrap Ursa's full
> operational context from the repository alone, and proves it with a
> cold-start test.
> **Epistemic:** whether a platform-neutral canonical repo can be the sole
> carrier of an agent's operational context, without platform-specific
> configuration absorbing the canon.
> **Pragmatic:** one human intervention instead of five; a session that
> survives conversation loss by rebuilding state from Git.
> **Audience:** Agents · Oracles

---

## Story

As the Oracle, I want to start a fresh Ursa session with a single
instruction — clone the repository — so that context bootstrap no longer
costs repeated prompts, redundant tokens, and manual re-adoption of
identity after every lost conversation.

---

## Scope

Design and ship the cold-start bootstrap for **Ursa on Hermes**, starting
from the current repository state (`68bd5f1`):

- the mechanism by which a fresh session discovers its entry point after
  cloning `numinia-nwos` (entry-point discovery);
- how Ursa's identity, authority, sources and Hermes adaptation are
  adopted **without** the operator typing "adopt `agents/ursa`";
- what loads immediately vs. progressively, so context stays lean;
- the structural connection between: repo context, Ursa identity,
  authority, sources, Hermes adapter, PRO-001, PRO-003, security, current
  state, active missions, branch/worktree isolation, mission selection and
  planning;
- the cold-start acceptance test (defined below) and the bootstrap
  measurement protocol (interventions, tokens, files loaded, wrong
  inferences, reconstruction after session restart, pass/fail);
- detection of current bootstrap inconsistencies (see Context), each
  verified from the tree and referenced to MIS-135 where already
  registered.

**Where it stops:**

- **Only `numinia-nwos` and Ursa's Hermes runtime instance.** Not other
  agents, not other repositories, not `numinia-lore`.
- **No canonical content changes in this mission's draft.** The mission may
  PROPOSE changes to `AGENTS.md`, `agents/ursa/*`, protocols or adapters;
  applying governance-sensitive changes requires the Oracle's review
  (AGENTS.md, Canonical Changes; OPERATOR.md).
- The repository remains platform-independent: the solution must not turn
  canonical context into Ursa-specific Hermes configuration.
- Out of scope: server-side sync/cron machinery (MIS-060), consumer-repo
  propagation guards (MIS-068), NWOS versioning/sovereignty (MIS-096),
  GitHub-independent continuity (MIS-069), and non-Ursa agents.

## Out of scope

What someone would reasonably expect to be included and is not:

- **Hermes platform internals** — changing Hermes itself (its context-file
  discovery, `SOUL.md` loading, `$HERMES_HOME` resolution) is not this
  mission. The mission may only use documented Hermes mechanisms (`.hermes.md`,
  `AGENTS.md`, `SOUL.md`, profile config, `hermes` CLI) and must compare
  alternatives before choosing one.
- **Automated installation/sync daemons** — a cron/symlink layer (MIS-060
  Phase 2) is deliberately excluded; this mission is about *discovery and
  reconstruction from a clone*, not continuous propagation.

---

## Acceptance criteria

> Every criterion must be FALSE at the base commit (`68bd5f1`). Assert the
> final state, not a delta. Verifiable by someone who did not do the work.

### Fundamental — the cold-start test

The mission must define and run a "cold start" test, approximately:

- Ursa starts a clean session with **no prior conversational context** of
  Numinia.
- The operator provides **only** the repository to clone.
- The agent clones the repository.
- With no further human instruction, the agent:
  1. identifies the repository as the source of truth;
  2. reconstructs the operational context it needs;
  3. correctly identifies/adopts Ursa for this instance;
  4. knows its permissions and limits;
  5. knows the session-opening protocol;
  6. checks the real Git state before assuming anything;
  7. detects active or pending missions;
  8. avoids trampling other agents' work;
  9. if no mission is assigned, consults the board, finds an appropriate
     candidate and produces a plan;
  10. **STOPS** before executing that mission and requests the operator's
      authorization.

- [ ] Cold-start test passes end-to-end from a single operator instruction,
      stopping before execution to request authorization.
      (today: bootstrap requires ≥5 human interventions; no such test exists)
- [ ] The test is reproducible by someone who did not do the work, with the
      exact command(s) to run it recorded in the mission's Closure or an
      attached runbook.
      (today: no runbook exists)
- [ ] A new session **after closing and reopening** (no conversation reuse)
      reconstructs operational state from the repository alone, without the
      operator re-explaining identity, protocols or board.
      (today: reconstruction depends on the lost conversation)

### Measurement protocol

- [ ] The mission records, for the cold-start run: number of human
      interventions (target: **1**); tokens/context consumed during
      bootstrap; number of files loaded; wrong inferences or questions the
      agent had to ask; pass/fail of each cold-start step.
      (today: none of these are measured anywhere)

### Mechanism

- [ ] The chosen mechanism is the smallest maintainable one that meets the
      test; alternatives compared in the mission document with the decision
      and its rationale (candidates to compare, not to assume: `.hermes.md`,
      hierarchical `AGENTS.md`, declarative bootstrap file, profile config,
      script, or none of the above).
      (today: no mechanism exists; decision is open)
- [ ] The repository remains platform-neutral: canonical identity is not
      converted into Ursa-specific Hermes configuration; what lives in
      `AGENTS.md` vs `agents/ursa/` vs the Hermes adapter is justified
      explicitly.
      (today: platform-neutral by accident, not by design)
- [ ] Context economy: what loads immediately vs. progressively is defined,
      with the criterion that keeps the bootstrap lean (no full-corpus load).
      (today: undefined — everything is manual and duplicated)

### Inconsistency detection (verified, not assumed)

- [ ] The drift between what PRO-001 §1 expects (`agents/{my-name}/STATUS.md`
      at STEP 1) and the files that actually exist under `agents/ursa/` is
      verified from the tree and recorded (STATUS.md/MEMORY.md were retired
      by MIS-118; README.md still lists them).
      (today: PRO-001 §1 references a file that does not exist)
- [ ] Any other bootstrap-blocking inconsistency found during execution is
      recorded with evidence and routed to the owning mission or to MIS-135,
      not silently fixed.
      (today: only MIS-135 rows 1/4 partially cover this class)

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

- 2026-09-02 — Draft registered (MIS-137) by Ursa, at the Oracle's request.
  Base commit `68bd5f1`; branch `missions/mis-137-...`. Status `draft` per
  PRO-003 §2 — the brief awaits Oracle approval before moving to `backlog`.
  Known deviation: lint-frontmatter does not accept `draft` for missions
  (STD-001 §7 set); recorded here rather than silently normalised.
