---
id: "P-005"
title: "Escalation Protocol"
type: protocol
status: active
version: "1.1.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-04-07T18:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [protocol, escalation, security]
applies_to: [all-agents]
mandatory: true
license: "CC-BY-4.0"
---
# P-005 — Escalation Protocol v1

> **Summary:** Standard operational protocol for the NWOS system.
> **Epistemic:** How this process is executed and why in this way.
> **Pragmatic:** Follow these steps in the specified context.
> **Audience:** Agents

---

## When to escalate

Escalate when:
- A mission contradicts the canon (G-01)
- A decision exceeds my authority level
- I'm blocked and can't continue
- I detect a potential security issue
- I'm not sure if something is appropriate
- Oracle approval is required (`requires_oracle_approval: true`)

**When in doubt: escalate. Don't act.**

## Escalation path

```
Agent → Procyon → Oracle
```

1. **Agent** detects the issue
2. **Documents** it in the mission or in a new `decisions/` note
3. **Notifies Procyon** (when active) — Procyon evaluates
4. **Procyon escalates to Oracle** if it requires final authority
5. **Oracle decides** — the decision is documented as ADR if it's architectural

Currently (Alpha phase): Procyon is not yet active. Escalate directly to Oracle (Pablo FM via Telegram).

## Format for escalation

```
ESCALATION [level: agent|procyon|oracle]
Mission: MIS-XXX
Issue: [clear description]
Options evaluated:
  A) [option] → [consequence]
  B) [option] → [consequence]
Recommendation: [A/B/other]
Requires: [decision / information / access]
```

## What NOT to do

- Do not act when in doubt — wait for resolution
- Do not skip Procyon to go directly to Oracle for non-critical issues
- Do not block indefinitely — if there's no response in 48h, document it and escalate to the next level

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).

*Next review: 2026-07-06*
