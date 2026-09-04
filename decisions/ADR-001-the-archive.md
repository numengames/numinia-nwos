---
id: "ADR-001"
uid:
title: "The archive: GitHub, Markdown, and who issues its standards"
type: adr
status: superseded
version: "2.1.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-09-03T06:27:46Z"
author: "pablo-fm"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [decisions, adr, infrastructure, github, markdown, standards, hosting]
absorbs: ["ADR-002", "ADR-003", "DEC-001"]
superseded_by: "STD-006"
license: "CC-BY-4.0"
related: ["ADR-004", "ADR-005", "CAN-001", "STD-001", "MIS-127"]
---

# The archive

> **Superseded (2026-09-03, MIS-142).** This record was never a decision. It
> stated what the archive *is* — a policy — and carried a version number and
> an `absorbs:` list, neither of which an architecture decision record may
> have: a decision is one choice, made once, and replaced rather than edited.
> Its substance now lives as a standard, where a rule can be checked and
> failed. Two of its four clauses did not survive intact, and the reasons are
> recorded below rather than dropped.
>
> **Summary:** Retired record. Where the corpus lives, what it is written in,
> and who decides its rules — grouped as one decision when it was four
> statements of policy.
> **Epistemic:** What the archive's rules were between 2026-04-06 and
> 2026-09-03, and which of them proved false.
> **Pragmatic:** Historical reference only. It governs nothing.

## What happened to each clause

**Support and Format** — restated as a standard, unchanged in substance.

**Authority — "this repository issues its own standards."** Removed as out of
genre. It is a rule about who may emit rules, which is authority, not
substance, and the governance standard already carried it in full: emitter
duties, sovereignty of derived repositories, and who may move a version. This
clause was duplication.

**Hosting — "self-hosted over SaaS."** Withdrawn as false. The clause claimed
the corpus and its published surface ran on infrastructure the project
controls, and named Cloudflare Workers as the evidence. Workers is a managed
service; it was the counter-example, not the proof. `DEC-001`, the record
this one absorbed, had already established exactly that on 2026-08-30 before
being retired — so the clause revived a rule the corpus had itself refuted,
citing the fact that refuted it. Replaced by a sovereignty constraint on the
whole system: no part of it may depend on a third party to be read or run.
That is a capability requirement, it names no vendor, and it cannot be
falsified by a change of provider.

## The record as it stood

**Support — GitHub.** The canonical repository of the Narrative Work OS.
Git gives authorship, history and reversibility for free; the platform gives
review, CI and public reading. Absorbed from ADR-002.

**Format — Markdown, plain text, one document per file.** Readable without
tooling, diffable line by line, renderable anywhere. No binary source of
truth. Absorbed from ADR-002.

**Authority — this repository issues its own standards.** `numinia-nwos` is
the emitter; other repositories consume. A rule that is not written here is
not a rule of the system. Absorbed from ADR-003.

**Hosting — self-hosted over SaaS, where it is the archive's substance.**
The corpus and its published surface run on infrastructure the project
controls (Cloudflare Workers). Absorbed from DEC-001, which had marked
itself `superseded` naming no successor: the ruling outlived the record.
SaaS remains fine for things that are not the archive.
