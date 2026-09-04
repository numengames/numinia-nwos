---
id: "ADR-023"
uid:
title: "The canon's vocabulary: four terms, two pairs, written in English"
type: adr
status: active
version: "2.0.0"
created: "2026-08-25T10:00:00+02:00"
updated: "2026-08-31T18:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [canon, vocabulary, language, english, terminology]
absorbs: ["ADR-024"]
superseded_by: null
license: "CC-BY-4.0"
related: ["ADR-001", "STD-001", "CAN-001", "MIS-127"]
---

# The canon's vocabulary

> **Summary:** Which four terms the canon is built from, and which language
> it is written in. Both answer "how is the canon worded".

## Decision

**Four terms, two pairs.** The canon names its objects with four terms
organised as two oppositions. Each pair is a distinction the system must be
able to make; a fifth term would name something the system does not decide.
Definitions live in `STD-001` — the glossary is the normative surface, not
this record.

**English is the canon language.** New and rewritten documents are written
in English. Absorbed from ADR-024.

Existing Spanish documents are **not** invalid: the corpus is mid-migration.
A document declares `lang:` when it departs from the default; consumers
honour that declaration (`web/src/pages/corpus/[...slug].astro`).

## Why

Four terms because the pairs are the distinctions; English because the
agents, the tooling and the intended readership operate in it, and a corpus
in two languages resolves every ambiguity twice.
