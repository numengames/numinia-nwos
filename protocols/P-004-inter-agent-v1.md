---
id: "P-004"
title: "Inter-Agent Communication Protocol"
type: protocol
status: active
version: "1.1.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-04-07T18:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [protocol, inter-agent, coordination]
applies_to: [all-agents]
mandatory: true
license: "CC-BY-4.0"
---
# P-004 — Inter-Agent Communication Protocol v1

> **Summary:** Standard operational protocol for the NWOS system.
> **Epistemic:** How this process is executed and why in this way.
> **Pragmatic:** Follow these steps in the specified context.
> **Audience:** Agents

---

## Fundamental principle

Reads are safe. Writes require coordination. Concurrency breaks on writes, not reads (SIM-1.8).

## How agents communicate

In the Narrative Work OS, agents communicate through the repository. There are no real-time channels between agents.

**Primary channel:** Git commits and PRs
**Secondary channel:** Annotations in shared mission files
**Escalation channel:** Oracle (via Telegram or verified channel)

## Coordinating on a mission

When two agents need to work on related things:

1. **Only one executor per active mission** — if collaboration is needed, declare it explicitly in the frontmatter: `executor: nimrod, adonaz`
2. **Divide into sub-missions** — each agent has its own mission
3. **Use dependencies** — `depends_on: [MIS-XXX]` to establish order

## When another agent needs something from me

1. Update my STATUS.md with current state
2. Document blockers in my active missions
3. Procyon (future) coordinates — agents don't directly assign each other tasks

## Conflict resolution

If two agents have inconsistent information:
1. The repository (git pull) is the source of truth — always
2. If there's ambiguity: don't act, escalate (P-005)
3. Never overwrite another agent's work without explicit coordination

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).

*Next review: 2026-07-06*
