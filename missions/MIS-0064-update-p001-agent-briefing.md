---
id: "MIS-064"
uid: ""
title: "Update P-001 — Agent Briefing Protocol v2"
status: done
priority: "critical"
effort: "S"
guild: "Sentinels"
territory: "CAO"
type_execution: "digital"
assigned_to: "nimrod"
started: "2026-04-08T06:02:00Z"
completed: "2026-08-25"

type: mission
version: "0.1.1"
created: "2026-04-08T06:02:00Z"
created_source: "git:749f75c"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [protocols, p001, briefing, startup, sentinels]
license: "CC0-1.0"
---
# MIS-064 — Update P-001 — Agent Briefing Protocol v2

> **Summary:** Update P-001 to v2.0.0 — rename file to canonical English naming, add P-009 reference, add new standards (versioning lifecycle, log system).
> **Epistemic:** P-001 is the protocol every agent reads first. It must reflect the current state of the system.
> **Pragmatic:** After this update, any agent starting a session has the complete and current picture.
> **Audience:** Agents · Oracles

## Acceptance criteria

- [x] New file `P-001-agent-briefing.md` created (canonical English name)
- [x] Old file `P-001-briefing-agente-v1.md` deleted
- [x] P-009 added to startup sequence (Step 3.5)
- [x] STANDARDS.md §7F (versioning) and §10 (logs) referenced
- [x] Version bumped to v0.2.0 (development stage — Oracle promotes to v1.0.0)
- [x] missions-index.json updated

*Nimrod 🗡️ — started 2026-04-08*

## Closure

*(Administrative close. The brief above is untouched — not one line of Scope
or of the criteria.)*

- **Category:** A — done in fact. The reality already satisfies the brief.
- **Evidence:** `protocols/P-001-agent-briefing.md` declares `version: 0.2.0`. 6/6 criteria ticked.
- **Signed by:** Oracle, 2026-08-25, as part of the board triage of the 111 missions.
  Classified read-only first; nothing was closed on impression.
- **Closed:** 2026-08-25 · **by:** ursa (administrative), on the Oracle's signature

## Version history

- v0.1.1 (2026-09-02) — Form: import-era `---` rules removed. missions/ normalisation, lot 2.
