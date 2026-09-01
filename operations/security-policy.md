---
id: "ops-security"
uid: ""
registration: exempt
registration_exemption: "pending-genre-ruling"
registration_reason: >
  Declares type: protocol and is not one — it states what an artifact must
  satisfy, which is the definition of a standard. Registering it as O-NNN
  would file it under a genre nobody chose. Awaiting ADR. See D-024.
title: "Security Policy"
type: protocol
status: active
version: "1.1.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-04-07T18:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [operations, security]
license: "CC-BY-4.0"
---
# Security Policy

> **Summary:** Standard operational security protocol for the NWOS system.
> **Epistemic:** How this process is executed and why in this way.
> **Pragmatic:** Follow these steps in the specified context.
> **Audience:** Agents

---

## What NEVER goes in this repository

| Category | Examples | Where it goes instead |
|----------|---------|----------------------|
| Credentials | Passwords, API keys, tokens | Server config (SSH only) |
| Server IPs | VPS addresses, internal IPs | Private documentation |
| Personal data | Private emails, phone numbers | Not documented |
| Private conversations | Chat logs, session transcripts | Local workspace |

## Rule

When in doubt about whether something is sensitive: **don't commit it**. Ask first.

This rule comes from SIM-5.4 (simulation 54 of 100): an agent accidentally committed a credential to a public repo. Impact: security exposure. Prevention: the doubt = don't commit rule.

## Pre-commit checklist (mental)

Before any commit, verify:
- [ ] No real passwords or tokens
- [ ] No real IPs or server addresses
- [ ] No real personal data of third parties
- [ ] No internal configuration files

## Credential management

See `operations/credential-map.md` for the structure of credentials without real values.

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
