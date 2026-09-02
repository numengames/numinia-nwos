---
id: "DBT-013"
uid:
title: "Design System filename is dated (frozen-artifact shape) but the document is not frozen"
type: documentation
status: active
version: "1.0.0"
created: "2026-09-02T12:55:00+02:00"
created_source: "git:e4b94e7"
created_confidence: exact
updated: "2026-09-02T12:55:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, naming, design-system, std-001, pro-010, mis-125]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "Oracle, 2026-09-02, via Ursa"
related: ["ADR-037", "PRO-010", "MIS-125", "STD-001"]
---

# DBT-013 — Design System filename is dated but the document is not frozen

## What happened

`standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md` carries the dated
frozen-artifact filename shape described in `PRO-010 §3.2` (a date, an
underscored title, and a semver suffix) — the convention `STD-001 §2.1.1`
describes as *"a photograph: it is not edited because a new version is a
new file."*

But the document is not a photograph. It already superseded its prior
version once (`supersedes:` field), it declares a six-month revision
cadence in its own frontmatter (`revision: every six months`), and its
content is a living specification — tokens, component recipes,
accessibility rules — not a record of something that happened on
2026-08-18. The date in the filename asserts a stability the document's
own lifecycle contradicts.

## Why it is not fixed here

`PRO-010 §3.2.2` (`MIS-125` ruling, 2026-08-31) explicitly forbids
renaming this file into a `STD-NNN` series slot, on four measured grounds:
71 incoming citations across 24 files, a public URL derived from the
filename (`/corpus/standards/2026_08_18-sistema_de_diseno-v510`), the
`MIS-125` renaming license only covering zero-citation documents, and (for
two of the five files in that ruling's scope, not this one) `sealed`
threshold.

**The Oracle's position, stated directly (2026-09-02):** the ruling
produced real coherence and should not be reversed wholesale — but a
citation count does not make a wrong name right. This is registered as an
**exception to the normalisation process**, to be resolved in its own
dedicated pass, not folded into the current accessibility-documentation
work (`ADR-037`) or executed reactively.

## What is owed

A decision — not yet made — on one of:

1. Rename to a `STD-NNN` slot, accepting the cost: 71 citations rewritten,
   redirects for the published URL, `PRO-010 §3.2.2` amended or explicitly
   overridden for this one document with its own recorded reasoning.
2. Keep the dated filename but add a frontmatter field that makes the
   contradiction explicit and machine-checkable (e.g. an explicit
   `frozen: false` alongside the dated name), so the naming convention and
   the document's real lifecycle stop disagreeing silently.
3. Some other resolution the Oracle's own pass surfaces.

Not decided which. Not this session's call.

## Closes when

The Oracle runs the dedicated pass and either amends `PRO-010`, renames the
file with citations repaired, or records why the current shape is judged
acceptable after all.

## State

| | |
|---|---|
| Severity | medium — cosmetic/naming, not a correctness or security defect |
| Owner | Oracle |
| Opened | 2026-09-02, during the accessibility-documentation pass (`ADR-037`) |
| Blocks | nothing — `ARC-10`/`STD-005` work proceeded independently |
| Closes when | Oracle's dedicated naming pass resolves it |
