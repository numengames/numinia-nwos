---
id: "P-002"
title: "Agent Onboarding Protocol"
type: protocol
status: active
version: "1.1.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-04-07T18:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [protocol, onboarding, agents]
applies_to: [oracle, procyon]
mandatory: true
license: "CC-BY-4.0"
---
# P-002 — Agent Onboarding Protocol v1

> **Summary:** Standard operational protocol for the NWOS system.
> **Epistemic:** How this process is executed and why in this way.
> **Pragmatic:** Follow these steps in the specified context.
> **Audience:** Agents

---

## When to use this protocol

When a new digital agent is being incorporated into the Narrative Work OS.

## Required steps

### Phase 1 — Design (Oracle)
- [ ] Define the agent's guild, branch, and house
- [ ] Write SOUL.md based on the template
- [ ] Write OPERATOR.md with specific rules for the guild
- [ ] Oracle reviews and approves both documents
- [ ] Create folder structure in `agents/{agent-name}/`

### Phase 2 — Technical configuration (Oracle + Nimrod)
- [ ] Configure the agent in OpenClaw (server)
- [ ] Connect to communication channels (Telegram, etc.)
- [ ] Configure Git identity (name + email)
- [ ] Grant read access to this repository
- [ ] Grant write access to own files and assigned missions

### Phase 3 — First sessions (supervised)
- [ ] Agent executes P-001 (canonical startup) for the first time
- [ ] Oracle or active agent accompanies first 3 sessions
- [ ] Agent creates first STATUS.md with operational state
- [ ] First mission assigned from backlog (low complexity)

### Phase 4 — Validation
- [ ] Agent completes 3 missions without critical errors
- [ ] Agent knows how to escalate (P-005)
- [ ] Agent knows the security policy (operations/security-policy.md)
- [ ] Onboarding declared complete. STATUS updated.

## What NOT to do

- Do not activate an agent without approved SOUL.md and OPERATOR.md
- Do not assign complex missions in the first 3 sessions
- Do not give write access to canon/ — ever

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation.
- v1.1.0 (2026-04-07) — Updated agent path to flat structure. Translated to English (MIS-056).

*Next review: 2026-07-06*
