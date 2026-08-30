---
id: "P-009"
uid: ""
title: "Mission Briefing Protocol"
type: protocol
status: active
version: "0.1.0"
created: "2026-04-08T05:48:00Z"
updated: "2026-04-08T05:48:00Z"
author: "nimrod"
owner: "oracle"
tags: [protocol, briefing, missions, agents, p003]
license: "CC-BY-4.0"
mission: "MIS-038"
---# P-009 — Mission Briefing Protocol

> **Summary:** Standard protocol for how a digital agent receives, reads, and confirms understanding of a mission before executing any work.
> **Epistemic:** A mission not understood is a mission not executed. Briefing is not overhead — it is the first act of execution.
> **Pragmatic:** Follow this protocol at the start of every new mission. It takes 2-5 minutes and prevents hours of rework.
> **Audience:** Agents · Oracles

---

## Core rule

> **Mission first. Execution after.**
>
> No agent executes any work without first completing this briefing protocol.
> This rule has no exceptions.

Established lesson (2026-04-07): Nimrod executed MIS-063 without registering it as a mission first. The work was correct but the system record was created retroactively. This protocol prevents that from happening again.

---

## When to apply

Apply P-009 when:
- A new mission is assigned (by Oracle, by Procyon, or self-identified)
- A mission arrives via chat, file, or verbal instruction
- An existing mission is reactivated after freeze

---

## Protocol steps

### Step 1 — Register the mission (P-003 dependency)

Before reading the briefing, the mission must exist in the repo.

```
IF missions/MIS-NNN-*.md does not exist:
  CREATE it following STANDARDS.md frontmatter schema
  SET status: backlog
  COMMIT to repo
  THEN proceed to Step 2

IF it already exists in queue/:
  MOVE to active/ (update status: in-progress, set started timestamp)
  COMMIT to repo
  THEN proceed to Step 2
```

**Never start Step 2 before Step 1 is committed.**

### Step 2 — Read the mission document

Read the full mission file. Identify:

| Field | What to extract |
|-------|----------------|
| `title` | What is this mission? |
| `priority` | How urgent? |
| `effort` | How much work? |
| `acceptance criteria` | What does done look like? |
| `blocked_by` | Any external dependencies? |
| `assigned_to` | Who executes? (must be me or unassigned) |

### Step 3 — Identify dependencies and blockers

Check:
- Does this mission depend on another mission? → Read that mission's status
- Does it require external input (API key, access, decision)? → Flag before starting
- Does it conflict with another active mission? → Escalate via P-005 if needed

If blocked: set `status: freeze`, document `freeze_reason`, notify Oracle via P-005.

### Step 4 — Confirm understanding (internal)

Before executing, answer these three questions internally:

1. **What is the deliverable?** (Specific artifact — file, code, document, decision)
2. **What does done look like?** (All acceptance criteria checked)
3. **What is the first concrete action?** (Not "research" — an actual tool call or file write)

If any answer is unclear: **ask Pablo before proceeding** (P-005 if score ≥ 5).

### Step 5 — Signal start (optional but recommended)

For missions of effort M or above, or when working with Pablo in a live session:

```
"Starting MIS-NNN — [title]. Estimated: [effort]. First action: [specific action]."
```

For effort XS/S or background work: silent start is acceptable.

### Step 6 — Execute

Follow P-003 for the full mission lifecycle. Document progress in the mission file if multi-session.

---

## Briefing checklist (quick reference)

```
□ Mission registered in repo (queue/ or active/)
□ Status updated to in-progress
□ Acceptance criteria read and understood
□ Dependencies checked
□ Blockers identified (or confirmed none)
□ Deliverable clear
□ First action identified
□ Start signaled (if effort M+)
```

---

## Anti-patterns

| Anti-pattern | Consequence | Correct behavior |
|-------------|-------------|-----------------|
| Execute first, register later | System record is retroactive fiction | Always register before executing |
| Assume scope from title only | Misaligned deliverable | Read full mission file |
| Start without checking blockers | Wasted effort on blocked work | Check Step 3 |
| Skip for "quick" tasks | Quick tasks are 80% of where errors happen | All tasks follow P-009 |

---

## BDD Scenarios

```gherkin
Feature: Mission Briefing Protocol

  Scenario: Agent receives a new mission and follows P-009
    Given a new mission "MIS-070" arrives via Oracle instruction
    When the agent applies P-009
    Then the mission file exists in missions/ with status: in-progress before any work begins
    And the agent can state the deliverable clearly
    And the agent can state what "done" looks like

  Scenario: Agent is blocked by missing dependency
    Given mission "MIS-048" requires a GITHUB_TOKEN not yet configured
    When the agent applies P-009 Step 3
    Then the agent sets status to "freeze"
    And documents freeze_reason in the mission file
    And notifies Oracle via P-005

  Scenario: Agent skips P-009 and executes directly
    Given a task arrives without a registered mission
    When the agent executes without creating a mission file
    Then the work is flagged as undocumented
    And must be retroactively registered before session close (P-006)
    And the agent notes the protocol violation in the session memory
```

---

## Relationship to other protocols

| Protocol | Relationship |
|----------|-------------|
| **P-003** | P-009 is a pre-condition of P-003. A mission cannot enter `in-progress` without P-009. |
| **P-005** | Use P-005 when P-009 Step 3 reveals a blocker requiring Oracle decision. |
| **P-006** | Session close must verify all active missions went through P-009. |
| **P-008** | If mission requires Oracle approval (score ≥ 5), use P-008 format before starting. |

---

## Version history

| Version | Date | Change |
|---------|------|--------|
| 0.1.0 | 2026-04-08T05:48:00Z | Initial creation — MIS-038. Born from lesson learned in MIS-063 (2026-04-07). |

---

*Nimrod 🗡️ — Numen Games — CC0 1.0*
