---
id: "ADR-030"
uid:
title: "Lifecycle: debt extinguishes on close, and deletion is decided by consumers"
type: adr
status: active
version: "3.0.0"
created: "2026-08-30T16:00:00+02:00"
updated: "2026-08-31T18:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [lifecycle, deletion, debt, urls, p-010, governance, entropy, d-028]
absorbs: ["ADR-032", "ADR-033"]
amends: ["STD-001"]
superseded_by: null
license: "CC-BY-4.0"
related: ["P-010", "D-028", "D-025", "STD-001", "MIS-127"]
---

# Lifecycle: closing debt and deleting documents

> **Summary:** When a debt entry stops being live, and when a document may
> be removed. Two ends of one lifecycle, corrected three times in six days.

## Decision

**Debt extinguishes on close.** A `D-NNN` entry closes when its closure
condition is met; it is not deleted. The register keeps the record — the
system's knowledge of what was once wrong is the point.

**Deletion is decided by consumers, not by folder.** A document may be
deleted when four tests pass. Absorbed from ADR-033, which dissolved the
"operational series" category ADR-032 created.

1. **No live citations.** No document points at it. Text-only mentions
   count — `scripts/check-references.mjs`.
2. **No public URL dies unredirected.** `scripts/check-url-lifecycle.mjs`
   against `scripts/url-baseline.json`.
3. **A written resolution exists.** The only test no machine performs.
4. **The folder's threshold is met** (`STD-001` §2.1). `decisions/` is
   `governed`: an ADR, or a PR the Oracle approves.

Passing 1–4, deletion needs no ADR of its own. **Merging does**, because it
extinguishes identifiers.

**Merging is permitted in `decisions/`, and this amends STD-001.** STD-001
§`decisions/` reads *"append-only: a decision is superseded, never deleted…
the superseded one stays reachable"*. That clause assumed superseding — a
new record replacing an old one — and had no case for **absorption**, where
the reasoning is carried forward rather than replaced.

Absorption is permitted when reachability is preserved by all three:

- the absorbed reasoning survives in the absorbing record;
- every citation is rewritten in the same change (test 1);
- every public URL redirects to the absorbing record (test 2).

Reachability is the clause's purpose; the file is only one way to serve it.
A reader following `ADR-002` must land on the text that now contains it —
not on a stub, and not on a 404.

## Why

The folder was never the right unit. `debt/` holds entries safe to delete
and entries that are the only record of a defect; `decisions/` holds both
live rules and superseded ones. The consumer knows; the directory does not.
