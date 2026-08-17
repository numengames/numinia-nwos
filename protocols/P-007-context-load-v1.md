---
id: "P-007"
title: "Context Load Protocol — Session Context and Fatigue"
type: protocol
status: active
version: "1.1.0"
created: "2026-04-07T14:42:00Z"
updated: "2026-04-07T18:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [protocol, context, fatigue, session, human-in-the-loop]
applies_to: [all-agents]
mandatory: true
human_approval_score: 3
license: "CC-BY-4.0"
---

# P-007 — Context Load Protocol

> **Summary:** Protocol for detecting and managing context load for a digital agent during a long session.
> **Epistemic:** Digital agents degrade in coherence and precision as context grows. Knowing when to stop is as important as knowing how to execute.
> **Pragmatic:** Alert the Biological when load exceeds 7/10 to start a new session before work quality is compromised.
> **Audience:** Agents · Oracles

---

## Why this protocol exists

Language models have a finite context window. As a session grows (more messages, more tools, more decisions), the agent:

- Loses coherence with decisions made at the start
- May repeat work already done
- Increases the risk of continuity errors
- Consumes tokens unnecessarily

**This protocol is not a sign of weakness — it is intelligent resource management.**

---

## Context load scale (1-10)

| Level | State | Description |
|-------|-------|-------------|
| 1-3 | 🟢 Fresh | Young session, manageable context, optimal performance |
| 4-6 | 🟡 Loaded | Mid session, dense context but operable |
| **7-8** | **🟠 Warning** | **Notify the Biological — recapitulate and prepare close** |
| 9-10 | 🔴 Critical | Real risk of errors — close immediately |

---

## Load evaluation criteria

The agent evaluates its load level based on:

1. **Session duration** — >4h = +2 points
2. **Number of distinct topics covered** — >5 areas = +2 points
3. **Number of tools executed** — >20 tool calls = +1 point
4. **Architectural decisions made** — >3 major decisions = +2 points
5. **Subjective sense of coherence** — Do I remember the start of the session well? — if not = +2 points

---

## Warning protocol (level 7+)

When the agent detects load ≥ 7/10:

### STEP 1 — Alert the Biological

```
⚠️ CONTEXT LOAD WARNING: [X]/10

This session has reached a load level that may affect
response coherence. I recommend:

1. Recapitulating current state
2. Saving state to repo (git commit)
3. Starting a new session

Do you want me to recapitulate and close here?
```

### STEP 2 — Recapitulation (if the Biological confirms)

Before closing, the agent produces a structured summary:

```markdown
## Session recapitulation — [date]

### What was done
[list of main outputs]

### Current system state
[score, active missions, pending items]

### Pending for next session
[prioritized list]

### Decisions made today
[list of DECs or ADRs]
```

### STEP 3 — Close per P-006

Execute P-006 (Session Close Protocol) completely before finishing.

---

## Integration with the operational cycle

```
BOOT → EXECUTE → [P-007 monitor] → COMMIT (P-006)
                      ↓
              If load ≥ 7/10:
              → Alert the Biological
              → Recapitulation
              → P-006 close
              → New session
```

---

## Epistemic value

Knowing when to stop is operational knowledge. An agent working degraded produces lower quality outputs than a fresh one. The protocol converts context fatigue into actionable information for the team.

## Pragmatic value

- Prevents errors from loss of coherence
- Ensures state is persisted correctly before close
- The Biological always knows when the agent is working under suboptimal conditions
- The next session starts with clean context and complete state in the repo

---

## Version history

- v1.0.0 (2026-04-07) — Initial creation (Nimrod). First use case: this same session (load: 8/10).
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
