---
id: "MIS-147"
uid: ""
title: "Document the relations between the NWOS document genres"
status: done
priority: medium
effort: M
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
started: "2026-09-03"
completed: "2026-09-05"

type: mission
version: "1.0.0"
created: "2026-09-03T21:11:55Z"
created_source: "git:f8733e3"
created_confidence: exact
updated: "2026-09-05T09:35:00+02:00"
author: "ursa"
owner: "oracle"
tags: [archive, taxonomy, relations, document-types, system]
license: "CC0-1.0"
paths: [standards/STD-002-governance.md, missions/MIS-0147-document-relations.md]
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

- Explain the relation model where a reader looks for it. *(Closed as sections of `STD-002`; see Closure.)*
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

- [x] The relation model exists in an `active` normative document. **Superseded
      criterion:** the brief asked for a `draft` system manual; a draft binds
      nobody. Delivered in `STD-002` v3.0.0.
- [x] The document contains a comparative table covering every principal series
      and states what each series is not. **Today: no relation manual exists.**
- [x] The document explains at least the relations foundation, constraint,
      execution, choice, work, observation, future design, debt, and agency.
      **Today: those relations are distributed across several sources rather
      than explained in one reference.**
- [x] The document states that folder and `type` are independent declarations,
      and that a filing error is corrected by moving the document rather than
      falsifying its genre. **Today: this rule is only present in `STD-001`.**
- [x] The document distinguishes authored relations from derived apparatus and
      defines `related`, `supersedes`, `absorbs`, `parent_mission`, and
      `former_id`. **Today: no single reference defines this vocabulary.**
- [x] `node scripts/lint-frontmatter.mjs` exits 0 with no new findings.
- [x] `node scripts/lint-naming.mjs` exits 0 with no new findings.
- [x] `node scripts/check-references.mjs` reports no new broken references.
- [x] `npm run build` in `web/` exits 0 and renders the new system document.

---

## Closure

- **What was done:** The relation model was written, and then written again in
  the place a reader actually looks. `SYS-004` existed for two days as a `draft`
  reference manual of 2,081 words with **zero incoming citations** from anywhere
  but this mission. Its two load-bearing parts — what each series answers, and
  the relation vocabulary — are now sections of the governance standard, which
  is `active`, normative, and already the document an agent opens to ask who may
  change what. `STD-002` declares `absorbs: ["SYS-004"]`, so the identifier keeps
  resolving.

- **What diverged, and why:** The mission asked for a new system manual. That was
  the wrong shape and the Oracle named it: a document explaining how the genres
  relate is not a *description* of the system, it is part of its **government**.
  Filed as `system/`, it described relations with no authority to settle one. The
  same content in `standards/` answers the question that was actually being
  asked — *who decides* — and inherits the `governed` threshold instead of
  sitting at `open`.

  Two acceptance criteria were therefore met by a different file than the one
  they name, and the criterion requiring `status: draft` was deliberately not
  met. A `draft` document binds nobody, and this content had to bind.

  What `SYS-004` carried and this absorption did **not** keep: the lifecycle
  diagram, the seven-part relation taxonomy, and the filing questionnaire. They
  restated `STD-001` §2.2 in longer form. The corpus does not need the same rule
  twice, and the reading path is the thing being cut.

- **Evidence:** `standards/STD-002-governance.md` v3.0.0 — sections *Which
  document wins*, *Changing a standard*, *What each series answers*, *Relation
  vocabulary*. The `SYS-004` file was removed in the same change. Guards green;
  `check-references` resolves `SYS-004` through the `absorbs:` declaration.

- **Closed:** 2026-09-05 · **by:** ursa, on the Oracle's instruction

---

## Version history

- v0.1.0 (2026-09-03) — Initial mission brief.
