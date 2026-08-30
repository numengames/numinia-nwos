---
id: "MIS-016"
title: "Caddy + SSL for all server services"
type: mission
status: done
version: "1.1.0"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: inferred
updated: "2026-04-07T18:00:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [infrastructure, ssl, ops, sentinels]
license: "CC-BY-4.0"
mission_id: "MIS-016"
assigned_to: "nimrod"
requested_by: "oracle"
territory: "Infrastructure"
guild: "Sentinels"
type_execution: "digital"
priority: "critical"
effort: "M"
started: "2026-04-04T00:00:00Z"
completed: "2026-04-05T00:00:00Z"
---
# MIS-016 — Caddy + SSL for all server services

> **Summary:** NWOS system mission.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---

**Area:** Infrastructure · **Guild:** Sentinels · **Type:** 🤖 Digital
**Priority:** 🔴 Critical · **Effort:** M

---

## Story

As operator, I want all services accessible via HTTPS with their own subdomains, so nothing is accessible via IP:port.

---

## Acceptance criteria

- [x] Reverse proxy with SSL for analytics.pablofm.com and cal.pablofm.com
- [x] Automatic SSL via Let's Encrypt
- [x] Ports 3001/3002 not publicly exposed
- [x] Automatic SSL renewal

---

## Epistemic value

Reveals the real maturity of the current infrastructure.

## Pragmatic value

Professional infrastructure. Links are shareable.

---

## Real execution

- **Technology used:** Caddy (modern reverse proxy with automatic SSL)
- **Why it diverged:** Caddy manages Let's Encrypt automatically without Certbot. Nginx required additional manual configuration.
- **Key learning:** For stacks without specific Nginx requirements, Caddy eliminates operational friction and is superior for minimal maintenance.
- **Closed:** 2026-04-05
- **Executing agent:** Nimrod (Centinela-01)

> *"Ideal blueprints show intention. Real blueprints show knowledge."*

---

## Version history

- v1.0.0 (2026-04-03) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
