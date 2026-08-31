---
id: "ADR-001"
uid:
title: "The archive: GitHub, Markdown, and who issues its standards"
type: adr
status: active
version: "2.0.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-08-31T18:00:00+02:00"
author: "pablo-fm"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [decisions, adr, infrastructure, github, markdown, standards, hosting]
absorbs: ["ADR-002", "ADR-003", "DEC-001"]
superseded_by: null
license: "CC-BY-4.0"
related: ["ADR-004", "ADR-005", "C-001", "S-001", "MIS-127"]
---

# The archive

> **Summary:** Where the corpus lives, what it is written in, and who
> decides its rules. Three questions about one object.

## Decision

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

## Why

An archive that cannot be read without its authoring tool is a hostage. An
archive whose rules live elsewhere has no rules.

## Consequences

- Losing GitHub costs hosting, not the corpus — every clone is complete.
- Anything requiring a proprietary editor stays out of the corpus.
- Downstream repos cite `nwos:` identifiers; the reverse is qualified
  (`web:ADR-012`, ADR-004 §7).

## History

- v2.0.0 (2026-08-31) — MIS-127: absorbs ADR-002 (Markdown), ADR-003
  (standards emitter) and DEC-001 (self-hosting). One decision about one
  object.
- v1.0.0 (2026-04-06) — GitHub as Archive Summa.
