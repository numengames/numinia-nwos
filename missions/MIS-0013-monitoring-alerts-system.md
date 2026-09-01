---
id: "MIS-013"
uid: ""
title: "Monitoring and alerts system"
status: frozen
priority: "high"
effort: "S"
guild: "Sentinels"
territory: "Infrastructure"
type_execution: "digital"
assigned_to: null
completed: null

type: mission
version: "1.1.1"
created: "2026-04-07T05:58:49Z"
created_source: "git:428349f"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
owner: "oracle"
license: "CC0-1.0"

freeze_reason: cancelled
---
# MIS-013 — Monitoring and alerts system

> **Summary:** Know immediately if a service goes down, to restore operation before it affects users.
> **Epistemic:** Reveals the real stability of the infrastructure in production.
> **Pragmatic:** Zero downtime without permanent human intervention.
> **Audience:** Agents · Oracles

## Story

As an operator, I want to know immediately if a service goes down, to restore operation before it affects users.

## Acceptance criteria

- [ ] Uptime monitoring for pablofm.com, numengames.com, Umami, Cal.com
- [ ] Telegram alert on outage
- [ ] Visible status dashboard
- [ ] Detection time < 2 minutes

## Epistemic value

Reveals the real stability of the infrastructure in production.

## Pragmatic value

Zero downtime without permanent human intervention.

## Closure (2026-08-17)

Closed as **cancelled — obsolete**, board triage ordered and approved by the Oracle (2026-08-17).

- **Reason:** As written it targets numengames.com, which no longer serves.
- **Evidence:** numengames.com returns 404; corporate site moved to numen.games.
- **Rule:** file preserved per P-003/SIM-2.7 and GOVERNANCE G-05 — closed, never deleted.

## Version history

- v1.1.1 (2026-09-02) — Form: context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed. missions/ normalisation, lot 2.
