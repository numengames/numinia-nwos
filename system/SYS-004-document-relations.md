---
id: "SYS-004"
uid: ""
title: "Document Relations — how the archive's genres work together"
type: documentation
subtype: reference
status: draft
version: "0.1.0"
created: "2026-09-03T21:11:55Z"
created_source: "git:f8733e3"
created_confidence: exact
updated: "2026-09-03T21:11:55Z"
author: "ursa"
owner: "oracle"
tags: [system, archive, taxonomy, relations, document-types]
territory: "Archive"
license: "CC0-1.0"
related: ["STD-001", "ADR-035", "PRO-003", "ADR-030"]
---

# SYS-004 — Document Relations

> **Summary:** The archive's document types form a working system: canon gives
> the foundation, standards define compliance, protocols define execution,
> missions record work, decisions record choice, reports record observation,
> blueprints describe potential, and debt preserves known incompleteness.
> **Epistemic:** Explains how the genres differ and how one document type leads
> to, constrains, or records another.
> **Pragmatic:** Use this map when deciding what to read, what to create, and
> where to file a document.
> **Audience:** Agents · Oracles · Contributors

---

## 1. Purpose and scope

The archive contains different document genres because different questions need
 different kinds of records. A document's folder is its filing decision; its
`type` is its declared genre. They are independent declarations and must agree.
When they do not, the filing is corrected by moving the document, not by changing
its declared genre to fit its current location.

This document explains relations among the document types already defined by the
archive. It does not replace the glossary, define new controlled values, or decide
whether a particular document's declared type is correct.

The central distinction is this:

```text
What is it?       → canon / system / documentation
What must comply? → standards
What do I do?     → protocols
What was chosen?  → decisions
What will be done?→ blueprints / missions
What happened?    → reports / closed missions
What is missing?  → debt
What sustains it? → operations
Who acts?         → agents
How do they group?→ guilds
```

---

## 2. The archive as a relation system

The folders are not a linear document-production pipeline. They are a network of
records with different evidentiary functions. The same work may therefore be
related to several genres without becoming any of them.

```text
                         ┌──────────────┐
                         │    CANON     │
                         │ foundation   │
                         └──────┬───────┘
                                │ constrains meaning
                                ▼
                    ┌──────────────────────┐
                    │      STANDARDS       │
                    │ what artifacts must  │
                    │ comply with          │
                    └──────────┬───────────┘
                               │ is executed through
                               ▼
                    ┌──────────────────────┐
                    │      PROTOCOLS       │
                    │ what actors execute  │
                    └──────────┬───────────┘
                               │ produces and governs
                               ▼
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
       ┌──────────────┐                  ┌──────────────┐
       │   MISSIONS   │                  │  DECISIONS   │
       │ work + proof │                  │ choice + why │
       └──────┬───────┘                  └──────┬───────┘
              │                                 │
              │ produces evidence               │ authorises or redirects
              ▼                                 ▼
       ┌──────────────┐                  ┌──────────────┐
       │   REPORTS    │                  │  BLUEPRINTS  │
       │ observation  │                  │ future design│
       └──────┬───────┘                  └──────┬───────┘
              │                                 │
              └──────────────┬──────────────────┘
                             ▼
                         ┌────────┐
                         │  DEBT  │
                         │ known  │
                         │ gaps   │
                         └────────┘
```

The arrows describe common relations, not automatic transformations. A mission
does not automatically create a report; a blueprint does not automatically become
a mission; and a decision does not automatically become a standard. Each relation
must be stated or evidenced where it matters.

---

## 3. The genres and their primary questions

| Genre / series | Primary question | What it contributes | What it is not |
|---|---|---|---|
| `canon/` · `seminal` | What is foundational? | Shared meaning, identity, and principles | Operating policy or a current procedure |
| `system/` · `documentation` | How does the system work today? | Reference description of present structure and behaviour | A norm, a procedure, or a future design |
| `standards/` · normative `documentation` | What must an artifact comply with? | Rules and conformance criteria | An explanation of current wiring or a step sequence |
| `protocols/` · `protocol` | What does an actor execute? | Ordered, repeatable action | A rule that an artifact satisfies |
| `agents/` | Who acts, with what authority? | Identity, capability, limits, and operating role | A generic user account or runtime state |
| `guilds/` · `charter` | How do actors group? | Shared guild rules and membership structure | The definition of an individual agent |
| `missions/` · `mission` | What work is promised or done? | Scope, acceptance criteria, execution, and evidence | A general policy or an observation of the whole system |
| `decisions/` · `adr` | Why was a choice made? | Reasoning, alternatives, and chosen direction | A task list or a restatement of a standard |
| `blueprints/` · `blueprint` | What could exist? | A design for something not yet executed | A report of what already happened |
| `reports/` · `report` | What was observed? | Dated evidence and interpretation | A plan or merely a list of closed missions |
| `operations/` · `legal` and related records | What sustains the business? | Legal, security, commercial, and operational records | The archive's foundational canon |
| `debt/` | What do we know is missing or wrong? | Explicit uncertainty, gaps, and unresolved defects | A substitute for fixing the underlying record |
| `history/` | What was tried and superseded? | Reachable evidence of abandoned direction | A live design or a numbered active series |

`meta` documents are apparatus: indexes and templates that help find or create
records. They accompany the series they serve. They are not a separate genre of
substantive record.

---

## 4. The principal relations

### 4.1 Foundation

`canon/` establishes the foundational language and principles from which the rest
of the archive takes meaning. Other documents may interpret or operationalise canon,
but they must not silently redefine it.

A canon document may therefore be related to:

- a `standard` that turns a principle into an artifact requirement;
- a `protocol` that turns a principle into an actor's sequence;
- a `decision` that records an explicit choice within the permitted space;
- a `system` manual that describes how the principle is embodied today.

Those derived documents do not become canon merely because they cite canon.

### 4.2 Constraint and execution

A `standard` describes a condition an artifact must satisfy. A `protocol` describes
steps an actor executes. The boundary is the mechanism, not the subject matter:
standards are complied with; protocols are executed.

A protocol may require an actor to produce or update a mission, decision, report,
or debt record. A standard may be used as the acceptance basis for a mission or as
the conformance basis for a report. Neither relation changes the genre of the
source document.

### 4.3 Choice and work

A `decision` records why a direction was chosen and what alternatives were
rejected. A `blueprint` describes a possible design. A `mission` turns an authorised
piece of work into a bounded, verifiable unit.

The common relation is:

```text
decision → authorises or selects → blueprint
blueprint → is realised through → mission
mission → may expose a new choice → decision
```

This is not mandatory sequencing. A mission can implement an already-known rule
without a blueprint, and a blueprint can remain unexecuted. If a decision changes
the archive's governing rule, the decision remains the reason; the resulting
standard or protocol is the operative rule.

### 4.4 Work and observation

A `mission` records work at the level of a promised outcome and its execution. A
`report` records an observation at a point in time, often across several missions
or across the system as a whole.

A report may cite missions as evidence, but a report is not just a list of closed
missions. It has its own observation, date, author, and claim. A completed mission
may be evidence for a report without being absorbed into it.

```text
mission → produces execution evidence → report
report → observes the system or a body of work → decisions / debt
```

Closed missions and published reports preserve substance. Corrections to their
form may be made with an explicit record; a changed substantive claim requires a
new or superseding record.

### 4.5 Present system and future design

A `system` manual describes how the system works today. A `blueprint` describes
something designed but not yet executed. The distinction is temporal and
ontological, not stylistic:

- if the subject exists and the document explains its current operation, it is a
  system manual;
- if the subject does not yet exist and the document proposes its design, it is a
  blueprint;
- if the document records what was tried and replaced, it belongs in history.

A design that becomes real does not silently remain a blueprint: its current
operation may be documented by a new system manual, while the blueprint remains
as the record of the design that preceded execution.

### 4.6 Gaps and correction

`debt/` makes incompleteness explicit. It can be related to any genre:

```text
debt → identifies a gap in → any series
mission → closes → debt
report → discovers or measures → debt
 decision → resolves ownership or direction → debt
```

Debt is not a second report and not a replacement for the missing canonical
record. When resolved, the entry remains reachable and is marked resolved rather
than deleted.

### 4.7 Identity and agency

`agents/` identifies the actors that can execute protocols, undertake missions,
make proposals, and author records within their authority. `guilds/` describes how
actors are grouped and what shared rules apply to the group.

An agent's runtime memory or platform state is not automatically an archive record.
A claim becomes part of institutional memory only when it is deliberately recorded
in the appropriate canonical document.

---

## 5. Lifecycle of a documentary claim

A claim can move through the archive without the file itself changing genre:

```text
principle / need
      ↓
proposal or design       → blueprint
      ↓ explicit choice
reason and alternatives  → decision
      ↓ bounded execution
promised work            → mission
      ↓ observed outcome
measured account         → report
      ↓ unresolved gap
known incompleteness     → debt
      ↓ rule or structure changes
standard / protocol / system manual
```

This is a reasoning model, not a requirement that every claim pass through every
box. The required action is to preserve the relation that actually occurred. If a
mission was created directly from a decision, cite both. If a report finds a gap,
open or update the relevant debt record. If a system manual is stale, record that
fact rather than presenting it as current.

---

## 6. Relation vocabulary

Use relation fields or explicit prose when the relation is material to retrieval,
audit, or future change. The archive already uses relations such as:

| Relation | Meaning |
|---|---|
| `related` | The records are relevant to one another, without a stronger direction |
| `ratified_by` | A governing authority promoted or confirmed the record |
| `supersedes` / `superseded_by` | A later record replaces an earlier one while preserving reachability |
| `absorbs` | A later record carries the earlier reasoning into itself under the archive's absorption rules |
| `parent_mission` | A mission is a bounded child of a larger mission |
| `former_id` | The record retains the identifier it carried before a governed move or renumbering |

Do not use `related` as a substitute for a stronger relation when the direction is
known. Do not infer a relation merely because two documents are in the same folder,
share an author, or mention the same subject.

---

## 7. Filing decision

Before creating or moving a document, answer these questions in order:

1. **What is the document asserting?** Foundation, present description, rule,
   procedure, identity, work, choice, design, observation, business record, or gap?
2. **What is its temporal position?** Present, proposed, completed, observed, or
   superseded?
3. **Who or what is its subject?** An artifact, an actor, a decision, a unit of
   work, or the system as a whole?
4. **Which series has that genre?** If none exists, this is a taxonomy gap, not a
   reason to use the nearest shelf.
5. **Which stronger relations must be preserved?** Record them before moving or
   renaming the document, and keep old identifiers and public addresses reachable.

If `type:` and the content disagree, first establish the correct genre. Only then
apply the genre-to-series map. A filing operation must not launder a mistaken type
into an apparently valid one.

---

## 8. Boundaries and known limits

This document does not:

- create new controlled vocabulary values;
- replace `STD-001`, which remains the source for series, fields, and valid values;
- replace a protocol for executing work;
- decide whether a particular claim is true;
- make relation fields machine-enforced where the archive currently marks them
  manual;
- make the four change thresholds (`sealed`, `governed`, `closed`, `open`) stronger
  than the mechanisms that currently enforce them.

The archive's relation graph is partly explicit and partly interpretive. A future
machine-readable relation index may improve retrieval, but it must preserve the
 distinction between derived enumeration and authored judgement.

---
