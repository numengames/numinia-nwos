---
id: "MIS-067"
uid: ""
title: "Inspections System — document type, directory and first ISO 15489 inspection"
status: todo
priority: "high"
effort: "M"
guild: "Sentinels"
territory: "CAO"
type_execution: "digital"
assigned_to: null
completed: null

type: mission
version: "1.2.0"
created: "2026-04-07T13:42:00Z"
created_source: "git:749f75c"
created_confidence: inferred
updated: "2026-09-02T01:51:14+02:00"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [cao, inspections, iso, standards, archive]
license: "CC0-1.0"

human_approval_score: 5
---
# MIS-067 — Inspections System

> **Summary:** Standard inspection document type, so I can periodically evaluate the conformance of the Archive Summa and operations against external standards (ISO and our own).
> **Epistemic:** Inspections turn compliance into knowledge. They are not bureaucracy — they are the mechanism by which the system learns whether it is doing well what it says it does.
> **Pragmatic:** When Numen Games has clients, inspections are the proof that the NWOS operates to standards. There is no need to invent the criteria — they already exist. --- *Nimrod 🗡️ — 2026-04-07T13:42:00Z*
> **Audience:** Agents · Oracles

**Human approval required:** 5/10

## Origin

Audits measure divergences between sources of truth.  
Inspections measure conformance with external standards.  
They are distinct document types — they need their own system.

Identified during audit AUDIT-2026-04-07.

## Story

As the NWOS system, I want a standard inspection document type, so I can periodically evaluate the conformance of the Archive Summa and operations against external standards (ISO and our own).

## Difference between document types

| Type | What it measures | Frequency | Output |
|------|----------|-----------|-----------|
| Audit | Divergences between sources of truth | Periodic / on demand | AUDIT-YYYY-MM-DD.md |
| Inspection | Conformance with an external standard | Quarterly / per event | INSP-YYYY-MM-DD-{standard}.md |
| QA | Quality of a specific output | Per mission | Section in the mission |

## Acceptance criteria

- [ ] `inspections/` directory created in the repo
- [ ] `INSP-template.md` with standard structure
- [ ] `inspection` type added to STANDARDS.md §8 (document types)
- [ ] Cadence defined: quarterly? per event? → decision in Dark Council
- [ ] First real inspection: ISO 15489 of the Archive Summa

## Reference ISOs (Adonaz knows them)

| ISO | Scope | Application in NWOS |
|-----|--------|-------------------|
| ISO 15489 | Records Management | Archive Summa — records management |
| ISO 27001 | Information Security | Operations — information security |
| ISO 9001 | Quality Management | Processes — continuous improvement |
| ISO 22301 | Business Continuity | System continuity — PRO-001 (formerly P-006), backups |

## Epistemic value

Inspections turn compliance into knowledge. They are not bureaucracy — they are the mechanism by which the system learns whether it is doing well what it says it does.

## Pragmatic value

When Numen Games has clients, inspections are the proof that the NWOS operates to standards. There is no need to invent the criteria — they already exist.

*Nimrod 🗡️ — 2026-04-07T13:42:00Z*

## Status check — 2026-09-02

*Read against `8907a56` during the missions/ normalisation (lot 3). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** 2026-04 import; 0/5; 'inspections/' never created; STANDARDS.md §8 retired (STD-001 is the glossary now); 'Adonaz knows them' — Adonaz was renamed Byblos (agents/INDEX.md) and is a definition, not an operator. Assigned nimrod (retired). Cited by 7 (4 files).
- **Recommendation:** Freeze as cancelled — the document type it proposed (inspection) has been served by reports/ subtype audit (RPT-007…RPT-016, ADR-005 v1.2.0): thirteen audits exist, none needed an inspections/ shelf. If ISO 15489 alignment is wanted, it is a new report brief, not this mission.

## Version history

- v1.2.0 (2026-09-02) — context card completed from the brief's own Story/Epistemic/Pragmatic text; inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; retired identifiers repointed: P-006→PRO-001 (formerly P-006); §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 3.
