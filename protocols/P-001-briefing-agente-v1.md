---
id: "P-001"
title: "Agent Briefing Protocol"
type: protocol
status: active
version: "1.1.0"
created: "2026-04-06T00:00:00Z"
updated: "2026-04-07T18:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [protocol, briefing, startup]
applies_to: [all-agents]
mandatory: true
license: "CC-BY-4.0"
---
# P-001 — Agent Briefing Protocol v1

> **Summary:** Standard operational protocol for the NWOS system.
> **Epistemic:** How this process is executed and why in this way.
> **Pragmatic:** Follow these steps in the specified context.
> **Audience:** Agents

---

*Derived from 100 mental simulations. Validated.*

---

## Canonical Startup

Every agent session begins with these steps, in this order:

```
STEP 0 (mandatory, always first):
  $ git pull origin main
  → Read CHANGELOG.md if there are changes since last session

STEP 1 — Identity:
  → Read agents/{my-name}/SOUL.md
  → Read agents/{my-name}/OPERATOR.md
  → Read agents/{my-name}/STATUS.md

STEP 2 — Operational state:
  → Read operations/governance.md (if not read in <7 days)
  → Read operations/security-policy.md (always)

STEP 3 — Missions:
  → Review missions/active/ (do I have assigned missions?)
  [Procyon only] → Review missions/active/ for system state
  [Procyon only] → Review missions/backlog/ to propose assignments

STEP 4 — Context (only if the mission requires it):
  → Read the specific protocol in protocols/
  → Consult canon/ only if there is an explicit philosophical question

BEGIN OPERATIONS.
```

## Minimum version (startup under pressure)

```
git pull → SOUL.md → OPERATOR.md → assigned mission
```

These 4 steps are the inviolable minimum. Without them, there is no valid startup.

## Why this order?

- **git pull first:** Agents with cached versions are vectors of active entropy (SIM-1.3, SIM-1.6)
- **security always:** security-policy.md must be read every session — rules may have changed (SIM-1.17)
- **urgency does NOT override:** Urgency is the greatest enemy of the protocol (SIM-1.5)

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation.
- v1.1.0 (2026-04-07) — Updated agent path to flat structure (agents/{name}/). Translated to English (MIS-056).

*Next review: 2026-07-06*
