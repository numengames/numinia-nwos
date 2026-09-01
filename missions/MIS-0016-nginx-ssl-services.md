---
id: "MIS-016"
uid: ""
title: "Caddy + SSL for all server services"
status: done
priority: "critical"
effort: "M"
guild: "Sentinels"
territory: "Infrastructure"
type_execution: "digital"
assigned_to: "nimrod"
started: "2026-04-04T00:00:00Z"
completed: "2026-04-05T00:00:00Z"

type: mission
version: "1.1.1"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [infrastructure, ssl, ops, sentinels]
license: "CC0-1.0"
---
# MIS-016 — Caddy + SSL for all server services

> **Summary:** All services accessible via HTTPS with their own subdomains, so nothing is accessible via IP:port.
> **Epistemic:** Reveals the real maturity of the current infrastructure.
> **Pragmatic:** Professional infrastructure. Links are shareable.
> **Audience:** Agents · Oracles

## Story

As operator, I want all services accessible via HTTPS with their own subdomains, so nothing is accessible via IP:port.

## Acceptance criteria

- [x] Reverse proxy with SSL for analytics.pablofm.com and cal.pablofm.com
- [x] Automatic SSL via Let's Encrypt
- [x] Ports 3001/3002 not publicly exposed
- [x] Automatic SSL renewal

## Epistemic value

Reveals the real maturity of the current infrastructure.

## Pragmatic value

Professional infrastructure. Links are shareable.

## Real execution

- **Technology used:** Caddy (modern reverse proxy with automatic SSL)
- **Why it diverged:** Caddy manages Let's Encrypt automatically without Certbot. Nginx required additional manual configuration.
- **Key learning:** For stacks without specific Nginx requirements, Caddy eliminates operational friction and is superior for minimal maintenance.
- **Closed:** 2026-04-05
- **Executing agent:** Nimrod (Centinela-01)

> *"Ideal blueprints show intention. Real blueprints show knowledge."*

## Version history

- v1.0.0 (2026-04-03) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.1.1 (2026-09-02) — Form: context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed. missions/ normalisation, lot 2.
