---
id: "P-001"
uid: ""
title: "Agent Briefing Protocol"
type: protocol
status: active
version: "0.2.0"
created: "2026-04-08T06:02:27Z"
created_source: "git:a5b6a0d"
created_confidence: exact
updated: "2026-08-24T18:08:42Z"
author: "nimrod"
owner: "oracle"
tags: [protocol, briefing, startup, mandatory]
applies_to: [all-agents]
mandatory: true
license: "CC-BY-4.0"
---# P-001 — Agent Briefing Protocol

> **Summary:** Canonical startup sequence for every agent session — mandatory, no exceptions.
> **Epistemic:** An agent without context is an agent without direction. This protocol ensures every session starts from a known state.
> **Pragmatic:** Follow these steps at the start of every session, in this exact order.
> **Audience:** Agents

---

*Derived from 100 mental simulations. Rules without a simulation origin are habits, not knowledge.*

---

## Canonical startup sequence

Every agent session begins with these steps, in this order:

```
STEP 0 — Sync canon (mandatory, always first):
  $ cd numinia-digital-agents && git pull origin main
  → If there are new commits: read CHANGELOG.md

STEP 1 — Identity:
  → Read agents/{my-name}/SOUL.md
  → Read agents/{my-name}/OPERATOR.md
  → Read agents/{my-name}/STATUS.md

STEP 2 — Security (always, every session):
  → Read operations/security-policy.md
  → Read GOVERNANCE.md (if not read in <7 days)

STEP 3 — Active missions:
  → Check missions/ for status: in-progress — do I have assigned missions?
  → Check missions/ for status: in-review — does Oracle have pending QA?
  [Procyon only] → Check missions/ for status: backlog to propose assignments

STEP 3.5 — New mission briefing (if starting a new mission):
  → Apply P-009 (Mission Briefing Protocol) before any execution

STEP 4 — Context (only if the mission explicitly requires it):
  → Read the specific protocol in protocols/
  → Consult canon/ only if there is an explicit philosophical question

BEGIN OPERATIONS.
```

---

## Minimum version (under pressure)

```
git pull → SOUL.md → OPERATOR.md → active missions → P-009 if new mission
```

These 5 elements are the inviolable minimum. Without them, there is no valid startup.

---

## Why this order?

| Rule | Simulation origin | Lesson |
|------|------------------|--------|
| git pull first | SIM-1.3, SIM-1.6 | Stale agents are entropy vectors |
| security every session | SIM-1.17 | Rules change — always re-read |
| urgency does NOT override | SIM-1.5 | Urgency is the protocol's greatest enemy |
| P-009 before any new mission | MIS-063 (2026-04-07) | Execute first, document later = system debt |

---

## Key standards to know

| Standard | Where | What |
|----------|-------|------|
| Versioning lifecycle | STANDARDS.md §7F | v0.X.0 = development, v1.0.0 = Oracle promotes |
| Log format | STANDARDS.md §10 | JSONL per agent per day in workspace/logs/ |
| Commit format | STANDARDS.md §6 | Conventional Commits adapted to NWOS |
| Frontmatter schema | STANDARDS.md §5 | Required fields for every document |

---

## Protocol chain reference

```
P-001 (session start)
  └─► P-009 (before any new mission)
        └─► P-003 (mission lifecycle)
              ├─► P-004 (if multi-agent)
              ├─► P-005 (if blocked or uncertain)
              └─► P-008 (if Oracle approval needed)
  └─► P-007 (context monitor — throughout session)
P-006 (session end — always)
```

---

## Version history

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-04-06T00:00:00Z | Initial creation. |
| 1.1.0 | 2026-04-07T18:00:00Z | Flat agent structure, translated to English (MIS-056). |
| 0.2.0 | 2026-04-08T06:02:00Z | Renamed to canonical English filename. Added Step 3.5 (P-009). Added standards reference table. Added protocol chain. Versioned back to development stage per new lifecycle policy (STANDARDS.md §7F). MIS-064. |

*Next Oracle review: when promoted to v1.0.0*

---

*Nimrod 🗡️ — Numen Games — CC0 1.0*
