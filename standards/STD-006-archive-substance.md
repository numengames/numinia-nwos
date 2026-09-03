---
id: "STD-006"
uid:
title: "The archive is plain text, versioned, and sovereign"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-03T06:27:46Z"
updated: "2026-09-03T06:27:46Z"
author: "ursa"
owner: "oracle"
license: "CC0-1.0"
tags: [archive, substrate, format, sovereignty, self-hosting]
supersedes: ["ADR-001"]
---

# STD-006 — The archive is plain text, versioned, and sovereign

> **Summary:** The corpus is plain text in a distributed version-control
> repository, one document per file, and no part of the system may depend on
> a third party to be read or run.
> **Epistemic:** What the archive is made of, and the constraint that keeps
> it readable when its hosting disappears.
> **Pragmatic:** Decide whether a proposed format, tool or dependency may
> enter the system.
> **Audience:** Agents · Oracles

---

## 1. Purpose and scope

This standard governs the **substance of the archive**: the substrate the
corpus is stored on, the format its documents are written in, and the
sovereignty constraint that binds the system as a whole.

It binds:

- every document of the corpus — every `.md` file under a series folder;
- every component of the system that stores, serves, builds or reads the
  corpus;
- any proposed dependency, format or service before it is adopted.

It does not bind the *content* of any document, only its form and the
conditions under which it must remain available.

This standard replaces `ADR-001`, which grouped these three clauses with a
fourth — who may issue the rules of this system. That fourth clause is
authority, not substance, and is governed where authority is governed; it
does not appear here. `ADR-001` also asserted that the published surface ran
on infrastructure the project controls, which was false at the time it was
written. §2.3 states the constraint the archive actually holds.

---

## 2. The norm

### 2.1 Substrate

The corpus **MUST** live in a distributed version-control repository. Git
today.

Distributed is the operative word: every clone **MUST** be a complete copy of
the corpus and its history. No document may exist only on a server, in a
database, or behind an API.

The consequence is the point of the rule: **losing the hosting platform
costs hosting, not the corpus.** A repository whose full content cannot be
reconstructed from any single clone has already failed this standard,
whatever it is hosted on.

Platform features — review, continuous integration, issue tracking, public
rendering — **MAY** be used freely. They are convenience built on top of the
substrate. Nothing that is only reachable through them may be the sole copy
of anything the corpus needs.

### 2.2 Format

Every document of the corpus **MUST** be plain text, Markdown, one document
per file.

- **Readable without tooling.** A document opened in any text editor must be
  usable. Rendering may improve it; nothing may be required to understand it.
- **Diffable line by line.** The unit of change is the line. A format whose
  smallest reviewable unit is the whole file is not reviewable.
- **No binary source of truth.** Binary artifacts **MAY** be stored — images,
  fonts, exported datasets — but **MUST NOT** be the authoritative copy of
  anything the corpus asserts. Anything that requires a proprietary editor to
  be authored or read stays outside the corpus.
- **One document per file.** A file is the unit of identity, citation and
  deletion. Two documents in one file cannot be cited or retired separately.

Structured metadata belongs in the document's frontmatter, which is plain
text and diffable like the rest.

### 2.3 Sovereignty

**Data sovereignty is a property of the whole system, not of any one
component.**

The system **MUST** be capable of running entirely on infrastructure its
operator controls. Every part — the corpus, the tooling that validates it,
the surface that publishes it — must have a path to being run without any
external service. That path must be real: exercisable with the artifacts in
the repository, not merely conceivable.

This constrains dependencies, not vendors. A managed or third-party service
**MAY** be used — for hosting, build, analytics, delivery or anything else —
provided:

1. removing it degrades convenience, never availability of the corpus;
2. nothing it holds is unavailable elsewhere in the repository;
3. it can be replaced by a self-operated equivalent without rewriting the
   corpus.

A dependency that fails any of the three is not a tool, it is a landlord.

**What this rule is not:** it is not a prohibition on managed services, and
it is not a claim that the system is currently self-hosted. It is a
capability requirement — the system must *be able* to be, at any moment, on
its operator's own infrastructure. Which services are in use today, and why,
is a matter of record elsewhere; it does not change what this standard
requires.

---

## 3. Conformance

| Check | Rule | Verified by |
|---|---|---|
| `A-01` | Every corpus document is a `.md` file under a series folder | `node scripts/lint-naming.mjs` |
| `A-02` | Frontmatter is well-formed plain-text YAML with correct delimiters | `node scripts/check-frontmatter-yaml.mjs`, `node scripts/check-frontmatter-delimiter.mjs` |
| `A-03` | No document's content exists only outside the corpus tree | `node scripts/check-prose-in-code.mjs` (partial: covers prose living in components) |
| `A-04` | One document per file | `[MANUAL]` |
| `A-05` | No binary artifact is the authoritative copy of a corpus assertion | `[MANUAL]` |
| `A-06` | The corpus is fully reconstructible from a single clone | `[MANUAL]` |
| `A-07` | Every external dependency satisfies the three conditions of §2.3 | `[MANUAL]` |

`A-04` is `[MANUAL]` because a file containing two documents is
syntactically indistinguishable from one containing a document with two
sections. The distinction is whether either half could be cited or retired
alone — a judgment about meaning.

`A-05` is `[MANUAL]` because authority is not a file property. The same
image is an illustration in one document and the sole record of a decision
in another; only a reader can tell which.

`A-06` is `[MANUAL]` because verifying it means clone, disconnect, and read.
The criterion to apply: take a fresh clone with no network, and ask whether
any document is missing, truncated, or unreadable. If the answer requires
fetching anything, this standard is failed.

`A-07` is `[MANUAL]` and is a **gate**, applied before a dependency is
adopted, not audited afterwards. The criterion is the three numbered
conditions of §2.3, answered in writing in the document that proposes the
dependency. A dependency adopted without that answer is unassessed, not
compliant.

---

## 4. What this standard does NOT do

- **It does not say who may issue the rules of this system.** That is
  authority — who emits, who versions, who signs — and it is governed in the
  governance standard.
- **It does not name any vendor, platform or service.** Which services are in
  use, and the reasoning behind each, is technology record, not a property of
  the archive. Naming one here would make this standard false the day it
  changed — which is exactly how its predecessor became false.
- **It does not govern document identifiers, filenames or headers.** Those
  are separate standards.
- **It does not migrate anything.** No existing document is reformatted,
  moved or re-licensed by this standard's adoption.
- **It does not forbid managed services.** §2.3 constrains what a dependency
  may be allowed to hold, not who operates it.

---

## 5. Version history

- v0.1.0 (2026-09-03) — Initial draft. Replaces `ADR-001`: substrate and
  format restated, the authority clause removed as out of genre, and the
  hosting clause replaced by the sovereignty constraint as a whole-system
  capability requirement (MIS-142).
