---
title: "Governance — who may change what, and at what cost"
id: "STD-002"
uid: ""
type: documentation
status: superseded
superseded_by: "STD-009"
version: "5.0.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-09-08T18:30:00+02:00"
author: "nimrod"
owner: "oracle"
territory: "CAO"
tags: [governance, roles, permissions, thresholds, versioning, precedence, relations]
absorbs: ["SYS-004"]
license: "CC0-1.0"
---

# Governance — who may change what, and at what cost

> **Summary:** Superseded by `STD-009` on 2026-09-08. Every rule this document
> held now lives in the core rules standard or in the protocol that executes
> it. This file stays only while a living document cites it (`ADR-041`).
> **Epistemic:** A governance document that pointed elsewhere for every rule
> was a table of contents, not a standard.
> **Pragmatic:** Read `STD-009`. If you came here for a specific thing, the
> map below says where it went.
> **Audience:** Agents · Oracles

---

## Where each part went

| Was here | Is now |
|---|---|
| Which document wins | `STD-009`, *Precedence* (`PRE-001`..`05`) |
| Changing a standard, roles, versioning authority | `STD-009`, *Authority* and *Versions* |
| What a document can be (states) | `STD-009`, *Authority · States* |
| Permissions by series, what each series answers | `STD-001`, *The series*; `PRE-003` |
| G-01 canon wins · G-06 escalation · G-10 48 h | `PRO-005` |
| G-02, G-03 one executor · G-07 doubt · G-08 stale | `PRO-003`, *The rules that do not bend* |
| G-04 `SOUL.md` / `OPERATOR.md` | `AUT-067` |
| G-05 nobody deletes | reversed by `ADR-041` |
| G-09 canon change needs the Oracle | `AUT-006` |
| G-11, G-12 pin, never copy; sovereignty | `STD-005`, *Adoption* |
| Canon emission — not yet in force | `MIS-102` (it was a target, not a rule) |
| Relation vocabulary | `STD-004`, *Ring 2* |
| Human approval scale | `PRO-008`, *The score scale* |

## References

| ID | Title | Relation |
|---|---|---|
| `STD-009` | The rules of the corpus, and which one wins | superseded_by |
| `ADR-041` | Git is the archive | why this file is deleted, not kept |
