---
id: "MIS-147"
uid: ""
title: "Document the relations between the NWOS document genres"
status: in-progress
priority: medium
effort: M
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
started: "2026-09-03"
completed: null

type: mission
version: "0.1.0"
created: "2026-09-03T21:11:55Z"
created_source: "git:f8733e3"
created_confidence: exact
updated: "2026-09-03T21:11:55Z"
author: "ursa"
owner: "oracle"
tags: [archive, taxonomy, relations, document-types, system]
license: "CC0-1.0"
paths: [system/SYS-004-document-relations.md, missions/MIS-0147-document-relations.md]
---

# MIS-147 — Document the relations between the NWOS document genres

> **Summary:** Create and publish the reference manual that explains how the
> archive's document genres differ and work together.
> **Epistemic:** Makes the archive's documentary relation model explicit without
> confusing filing location, declared genre, lifecycle, or evidence.
> **Pragmatic:** Gives agents and contributors a repeatable basis for choosing
> where to read, create, or file a document.
> **Audience:** Agents · Oracles · Contributors

---

## Scope

- Create `system/SYS-004-document-relations.md` as a reference manual.
- Explain the purpose and boundaries of the principal NWOS document series.
- Describe the relations among canon, system manuals, standards, protocols,
  agents, guilds, missions, decisions, blueprints, reports, operations, debt,
  and history.
- Include the distinction between a folder as filing decision and `type` as
  declared genre.
- Include practical filing guidance and the archive's existing relation
  vocabulary.
- Keep the document explanatory: it does not amend `STD-001`, create a new
  controlled value, or replace any protocol or governance rule.

## Out of scope

- Adding machine-enforced relation fields or a relation index.
- Reclassifying existing documents or moving files between series.
- Changing the public site's information architecture beyond the normal corpus
  rendering of the new system document.
- Replacing `STD-001`, `ADR-035`, or any other authoritative source.

---

## Acceptance criteria

- [ ] `system/SYS-004-document-relations.md` exists with valid frontmatter,
      `id: "SYS-004"`, `type: documentation`, `subtype: reference`, and
      `status: draft`. **Today: the file is absent from the base commit.**
- [ ] The document contains a comparative table covering every principal series
      and states what each series is not. **Today: no relation manual exists.**
- [ ] The document explains at least the relations foundation, constraint,
      execution, choice, work, observation, future design, debt, and agency.
      **Today: those relations are distributed across several sources rather
      than explained in one reference.**
- [ ] The document states that folder and `type` are independent declarations,
      and that a filing error is corrected by moving the document rather than
      falsifying its genre. **Today: this rule is only present in `STD-001`.**
- [ ] The document distinguishes authored relations from derived apparatus and
      defines `related`, `supersedes`, `absorbs`, `parent_mission`, and
      `former_id`. **Today: no single reference defines this vocabulary.**
- [ ] `node scripts/lint-frontmatter.mjs` exits 0 with no new findings.
- [ ] `node scripts/lint-naming.mjs` exits 0 with no new findings.
- [ ] `node scripts/check-references.mjs` reports no new broken references.
- [ ] `npm run build` in `web/` exits 0 and renders the new system document.

---

## Closure

*(Fill when the mission closes. Not before.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** · **by:**

---

## Version history

- v0.1.0 (2026-09-03) — Initial mission brief.
