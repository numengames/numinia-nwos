---
id: "MIS-051"
uid: ""
title: "Gmail, Calendar and Drive integration with gog"
status: done
priority: "critical"
effort: "M"
guild: "Sentinels"
territory: "CAO"
type_execution: "digital"
assigned_to: "nimrod"
started: "2026-04-05T00:00:00Z"
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
tags: [cao, gog, gmail, calendar, drive, sentinels]
license: "CC0-1.0"
---
# MIS-051 — Gmail, Calendar and Drive integration with gog

> **Summary:** Access to Numen Games' Gmail, Calendar and Drive, to manage communications, meetings and documents autonomously.
> **Epistemic:** Validates that digital agents can act in the real world, not just in code.
> **Pragmatic:** Nimrod can send emails, schedule meetings and manage documents without human intervention.
> **Audience:** Agents · Oracles

## Story

As CAO agent, I want access to Numen Games' Gmail, Calendar and Drive, to manage communications, meetings and documents autonomously.

## Acceptance criteria

- [x] gog installed and authenticated with khepri@ai.numengames.com
- [x] Gmail: read, send and reply to emails
- [x] Calendar: create events with attendees
- [x] Drive: list and search files
- [x] GOG_KEYRING_PASSWORD configured in OpenClaw

## Epistemic value

Validates that digital agents can act in the real world, not just in code.

## Pragmatic value

Nimrod can send emails, schedule meetings and manage documents without human intervention.

## Real execution

- **Technology used:** gog (gogcli v0.12.0) — Gmail, Calendar and Drive API via OAuth2
- **Why it diverged:** GOG_KEYRING_PASSWORD was not being inherited by the exec environment. Resolved by adding the variable at root level in the OpenClaw config.
- **Key learning:** Gateway environment variables do not automatically propagate to exec subshells. They must be explicitly declared in config.
- **Closed:** 2026-04-05
- **Executing agent:** Nimrod (Centinela-01)

> *"Ideal blueprints show intention. Real blueprints show knowledge."*

## Version history

- v1.0.0 (2026-04-05) — Initial creation.
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).
- v1.1.1 (2026-09-02) — Form: context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed. missions/ normalisation, lot 2.
