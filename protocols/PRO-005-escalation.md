---
id: "PRO-005"
title: "Escalation Protocol"
type: protocol
status: active
version: "1.2.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-08-31T18:00:00+02:00"
author: "nimrod"
owner: "oracle"
tags: [protocol, escalation, security]
applies_to: [all-agents]
mandatory: true
license: "CC-BY-4.0"
---
# PRO-005 — Escalation Protocol

> **Summary:** When an agent stops and asks instead of deciding.
> **Epistemic:** The cost of a wrong escalation is a message. The cost of a
> wrong autonomous decision is the archive.
> **Pragmatic:** Kept as a standalone document on purpose — a protocol invoked
> under pressure must be findable in one second, not nested inside another.
> **Audience:** Agents

---

## When to escalate

Escalate when:
- A mission contradicts the canon (G-01)
- A decision exceeds my authority level
- I am blocked and cannot continue
- I detect a potential security issue
- I am not sure if something is appropriate
- Oracle approval is required (`requires_oracle_approval: true`)

**When in doubt: escalate. Do not act.**

## Escalation path

```
Agent → Oracle
```

1. **Agent** detects the issue
2. **Documents** it in the mission or in a new `decisions/` note
3. **Escalates to the Oracle** (Pablo FM)
4. **Oracle decides** — the decision is documented as an ADR if it is architectural

The Oracle is the final authority. There is no intermediate coordination layer:
one was specified in April and never activated, and routing through a
non-existent agent is how an escalation gets lost.

## Format for escalation

```
ESCALATION
Mission: MIS-NNN
Issue: [clear description]
Options evaluated:
  A) [option] → [consequence]
  B) [option] → [consequence]
Recommendation: [A/B/other]
Requires: [decision / information / access]
```

The recommendation is not optional. An escalation that presents options without
a judgement moves the work to the Oracle rather than the decision.

## What NOT to do

- Do not act when in doubt — wait for resolution
- Do not block indefinitely — if there is no response in 48h, document it and proceed with the reversible option, recording the assumption
- Do not escalate a preference as if it were a blocker

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.2.0 (2026-08-31) — Renamed `P-005` → `PRO-005` per ADR-005. Escalation path corrected: the intermediate coordinator was never activated, so the path is Agent → Oracle. Recommendation made mandatory in the format. Retained standalone in the 15→7 merge (MIS-127) by Oracle ruling: a protocol invoked under pressure must not be nested.
