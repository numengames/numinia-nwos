---
id: "ADR-031"
uid:
title: "One debt register: root registers dissolve into debt/"
type: adr
status: active
version: "1.0.0"
created: "2026-08-30T19:40:00Z"
updated: "2026-08-30T19:40:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, legal, consolidation, c-005, adr-030]
license: "CC-BY-4.0"
related: ["ADR-030", "C-005", "P-010", "MIS-127"]
---

# One debt register: root registers dissolve into debt/

> **Summary:** LEGAL_DEBT.md and DEUDA-404.md dissolve into `debt/` as
> ordinary D-NNN entries; GAPS.md moves to `reports/` frozen. C-005 §5 is
> amended by formal consensus to point at `debt/` with a `legal` tag.
> **Epistemic:** Why one register beats three, and what each old ID became.
> **Pragmatic:** Legal debt is filed as D-NNN tagged `legal`; nothing is
> logged in root registers any more.

## Context

Three debt registers lived in the repo root beside `debt/`: LEGAL_DEBT.md
(5 LD-NNN entries under C-005 §5), DEUDA-404.md (2 open 404-NNN entries),
and GAPS.md (April strategic analysis, not debt at all). antunj diagnosed
it: five genres of debt or two with five names. The Oracle ruled: two —
and one register.

## Decision (Oracle, 2026-08-30, formal consensus for the canon amendment)

1. **LD-NNN dissolves into D-NNN with tag `legal`.** LD-001..005 become
   D-042..D-046, text verbatim. The LD series retires; new legal debt is
   filed as ordinary `debt/` entries tagged `legal`, `related: C-005`.
2. **C-005 §5 amendment (canon, formal consensus).** Every clause that
   named `LEGAL_DEBT.md` now reads: legal debt is recorded as a `debt/`
   entry tagged `legal` with an exit threshold. The MUSTs themselves are
   untouched — only the register they point at changes. C-005 v1.2.1.
3. **404-001/404-002 become D-040/D-041** (open cross-repo breakage,
   text verbatim). DEUDA-404.md extinguishes (ADR-030: its resolved
   trace lives in this ADR and git).
4. **GAPS.md → `reports/RPT-2026-04-07-gaps-capability-map.md`,
   `status: frozen`.** It is April evidence — a strategic snapshot with
   17 open questions for the Oracles — not an operational register.
5. The root now holds no debt register at all.

## ID map

| Was | Now |
|---|---|
| LD-001 CC0 onto the lore | D-042 |
| LD-002 NOTICE missing (Apache-2.0) | D-043 |
| LD-003 LGPL-3.0 in the tree | D-044 |
| LD-004 instrument not pinned | D-045 |
| LD-005 cutoff commit mismatch | D-046 |
| 404-001 Design System v5.0.0 retired | D-040 |
| 404-002 RPG manual out of canon/ | D-041 |
| GAPS.md | RPT-2026-04-07-gaps-capability-map |

Tokens: the three root files carried 8,732; the seven entries + report
carry the same live text under one register; net root reduction −3 files.
