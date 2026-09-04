---
id: "PRO-010"
uid: ""
title: "How to Archive — the NWOS archival protocol"
type: protocol
status: draft
version: "0.9.0"
created: "2026-08-18T10:51:09Z"
created_source: "git:9f25053"
created_confidence: exact
updated: "2026-09-03T23:10:00Z"
author: "claude-fable-5"
owner: "oracle"
tags: [protocols, archive, taxonomy, naming, iso-15489]
license: "CC0-1.0"
supersedes: "protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md  # deleted 2026-08-31, MIS-127"
review_next: "2027-02-18"
---
# PRO-010 — How to Archive (draft)

> **Summary:** How every document in the NWOS archive is named, where it
> lives, and how it ages.
> **Epistemic:** The system's document taxonomy and lifecycle.
> **Pragmatic:** For any new file: what name, what folder, what
> frontmatter. For any archival doubt: this protocol decides.
> **Audience:** Agents · Oracle
> **Status:** DRAFT — pending Oracle signature (MIS-089 phase 0).

---

## 1. Principles

1. **File over app.** The document is the deliverable; the repo is the archive.
2. **One source, zero copies.** Link, never copy. A derived copy in another
   repo declares its master.
3. **Git versions the content; the frontmatter versions the document.** The
   semantic version lives in `version:`, never in a living document's filename.
4. **Folders by type; guild in metadata.** Structure follows document type;
   the guild dimension is expressed in `guild:`, not in folders.
5. **One-to-one web mirror.** Each type folder has its section on numinia.org;
   `/corpus` is the global catalogue.
6. **Two levels under root, at most.** One declared exception: a report's
   evidence annex may nest one level more for captured artefacts, because
   those files move as an opaque block and are never authored.

## 2. Taxonomy: type, folder, identifier, web section

| Type | Folder | Identifier | Web section |
|---|---|---|---|
| Canon | `canon/` | `CAN-NNN` | `/canon` |
| Mission | `missions/` | `MIS-NNNN` | `/missions` |
| Decision | `decisions/` | `ADR-NNN` | `/decisiones` |
| Blueprint | `blueprints/` | `BLU-NNN` | `/blueprints` |
| System manual | `system/` | `SYS-NNN` | `/corpus/system` |
| Superseded record | `history/` | legacy dated name | `/corpus/history` |
| Protocol | `protocols/` | `PRO-NNN` | `/protocolos` |
| Report | `reports/` | `RPT-NNN`; dated form for dailies only | `/reports` |
| Agent | `agents/<name>/` | agent name | `/agentes` |
| Guild | `guilds/` | guild name | `/guilds` |
| Operation | `operations/` | by subfolder | `/operaciones` |
| Standard | `standards/` | `STD-NNN` | `/estandares` |
| Root governance | `/` | conventional name | `/corpus` |
| Archive fund | by origin | legacy dated name | `/archive` |

## 3. Names

### 3.1 Living documents

`<ID>-<slug-in-kebab-case>.md`. No spaces, no special characters, no version
and no date in the filename — git and the frontmatter already carry both.

**Concurrent agents.** The next free identifier is computed against what is
committed after a `git pull`, not against the working tree. If two agents
collide, whoever committed first keeps the identifier; the second renumbers
and fixes their own references.

### 3.2 Legacy dated names

Some documents carry the inherited shape
`YYYY_MM_DD-Title_With_Underscores-vX.Y.Z.md`. The naming guard still
recognises it, and documents that carry it keep it permanently, because
their public addresses are derived from the filename and renaming them
publishes dead addresses.

**A filename is not a state.** A document's lifecycle state is whatever its
`status` field says, read against the lifecycle of its series. The dated
shape implies nothing about registration, about state, or about whether a
document may be edited. No check may infer a state from a filename.

Reversed on 2026-09-03 by Oracle ruling; the argument is in the decision
record, and the change is in git.

### 3.3 Minimum frontmatter

`id`, `title`, `type`, `status`, `version`, `created`, `updated`, `license`,
`tags`. Normalised optionals: `guild`, `owner`, `author`, `supersedes`,
`review_next`. The header standard governs the fields themselves and the
guard that checks them.

### 3.4 Renaming: a citation may be rewritten, a mention may not

A bulk rename tool rewrites every occurrence of an old identifier. Not every
occurrence means the same thing, and the difference is not decidable by
pattern:

| | What it is | On rename |
|---|---|---|
| **Citation** | a pointer meant to keep resolving | **rewrite** |
| **Mention** | the identifier used as data: evidence, a fixed record, an example | **leave alone** |

1. **Dated evidence is never rewritten.** The legacy dated shape, SBOMs,
   audit reports, licence dedications, and everything under
   `reports/evidence/`. These describe a moment; editing them makes them
   describe a moment that never happened.
2. **A closed record is never rewritten.** `done`, `closed` and `superseded`
   documents are accounts of what was true then, not indexes of what is true
   now.
3. **Everything else is rewritten, and the diff is read.** Not the exit code
   — the diff. `scripts/rename-series.mjs` enforces rules 1 and 2 and prints
   every refusal. It cannot detect an identifier used as its own
   counterexample, because that distinction lives in the sentence.

A rename run whose diff was not read is not verified, however green the
guards are.

## 4. Documentary semantic versioning

- **Major** — restructuring, or a change that is not backward compatible.
- **Minor** — backward-compatible sections or improvements.
- **Patch** — corrections that do not change the meaning.

## 5. Lifecycle

`draft → active → superseded → archive fund`

**A document may be deleted when its consumers are zero or redirected**, not
when its folder has been granted permission. Four tests, in the order a
deletion must pass them:

1. **Inbound citations.** Zero, or every citing document is itself a closed
   record. A living document pointing at it is a reader; a closed one is
   history describing history.
2. **Public addresses.** Every address the document publishes is redirected
   in the same change. Verified by `scripts/check-url-lifecycle.mjs` against
   a real build, never by inference.
3. **Written resolution.** A living document records what the deleted one
   said and why it no longer holds. No evidence of resolution, no deletion.
   This test is not machine-checkable and is not claimed to be.
4. **Not sealed.** A sealed document requires the Oracle's signature and a
   decision record whatever the other three say.

Passing all four, **a deletion needs no decision record.** The guards are the
authority.

A superseded document that still has living citers is not deleted: it names
its successor and, once no longer consulted, moves to the fund. Supersession
is the right move whenever the first test fails.

**Execution plans are scratch, not memory.** A plan under `.hermes/plans/`
lives only as long as the execution it governs. When that mission closes, its
relevant content is summarised into the mission file, or promoted to `debt/`
if it describes a measurable gap that survives closure. The plan file is
deleted in the same commit that closes the mission.

### 5.1 What the tests do not see

The first test counts a substring match, so it cannot tell a citation from a
mention — it errs toward refusing, which is the safe direction, but a
document whose only citer names it as evidence reads as blocked. It scans
Markdown only: a reference from application source is invisible to it and is
caught, if at all, by the build. The second test verifies that an address
still resolves, not that the page it reaches answers the question the old one
did. No test sees a consumer outside this repository. Each guard prints these
limits on every run.

## 6. Compliance

ISO 15489 is the framework for archival inspections. The `/corpus` catalogue
is the living inventory, with zero silent exclusions. The guards that enforce
this protocol, and whether each one runs in the pipeline, are listed in the
guard register — that register is read from the workflow file, never
remembered.
