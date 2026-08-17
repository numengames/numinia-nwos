---
id: "MIS-067"
title: "Inspections System — document type, directory and first ISO 15489 inspection"
type: mission
status: backlog
version: "1.1.0"
created: "2026-04-07T13:42:00Z"
updated: "2026-08-17T00:00:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [cao, inspections, iso, standards, archive]
license: "CC-BY-4.0"
mission_id: "MIS-067"
assigned_to: "nimrod"
requested_by: "oracle"
area: "CAO"
guild: "Sentinels"
type_execution: "digital"
priority: "high"
effort: "M"
human_approval_score: 5
---
# MIS-067 — Inspections System

> **Summary:** NWOS system mission with criteria, epistemic and pragmatic value.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---


**Area:** CAO · **Guild:** Sentinels · **Type:** 🤖 Digital · **Priority:** 🟠 High · **Effort:** M  
**Human approval required:** 5/10

---

## Origin

Audits measure divergences between sources of truth.  
Inspections measure conformance with external standards.  
They are distinct document types — they need their own system.

Identified during audit AUDIT-2026-04-07.

---

## Story

As the NWOS system, I want a standard inspection document type, so I can periodically evaluate the conformance of the Archive Summa and operations against external standards (ISO and our own).

---

## Difference between document types

| Type | What it measures | Frequency | Output |
|------|----------|-----------|-----------|
| Audit | Divergences between sources of truth | Periodic / on demand | AUDIT-YYYY-MM-DD.md |
| Inspection | Conformance with an external standard | Quarterly / per event | INSP-YYYY-MM-DD-{standard}.md |
| QA | Quality of a specific output | Per mission | Section in the mission |

---

## Acceptance criteria

- [ ] `inspections/` directory created in the repo
- [ ] `INSP-template.md` with standard structure
- [ ] `inspection` type added to STANDARDS.md §8 (document types)
- [ ] Cadence defined: quarterly? per event? → decision in Dark Council
- [ ] First real inspection: ISO 15489 of the Archive Summa

---

## Reference ISOs (Adonaz knows them)

| ISO | Scope | Application in NWOS |
|-----|--------|-------------------|
| ISO 15489 | Records Management | Archive Summa — records management |
| ISO 27001 | Information Security | Operations — information security |
| ISO 9001 | Quality Management | Processes — continuous improvement |
| ISO 22301 | Business Continuity | System continuity — P-006, backups |

---

## Epistemic value

Inspections turn compliance into knowledge. They are not bureaucracy — they are the mechanism by which the system learns whether it is doing well what it says it does.

## Pragmatic value

When Numen Games has clients, inspections are the proof that the NWOS operates to standards. There is no need to invent the criteria — they already exist.

---

*Nimrod 🗡️ — 2026-04-07T13:42:00Z*
