---
id: "MIS-127"
uid:
title: "Entropy reduction: fewer documents, one vocabulary, registers that die"
type: mission
status: in-progress
version: "0.5.0"
created: "2026-08-30T18:50:00Z"
updated: "2026-08-31T00:20:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [entropy, consolidation, debt, standards, reduction]
license: "CC-BY-4.0"
related: ["ADR-030", "P-010", "MIS-125", "MIS-121"]
---

# Entropy reduction: fewer documents, one vocabulary, registers that die

> **Summary:** The umbrella mission for the 2026-08-30 reduction line:
> folder by folder, merge what says the same thing, extinguish what is
> done, measure every cut in tokens.
> **Epistemic:** What was cut, where it went, and what each cut measured.
> **Pragmatic:** The running ledger for the reduction; each PR lands here.
> **Audience:** Agents · Oracles

## Mandate (Oracle, 2026-08-30)

Reduce the system's uncertainty: too many documents, overlapping
registers, divergent vocabularies. Work folder by folder, decisions one
at a time, missions kept short. Every removed document is measured in
tokens (cl100k_base). Baseline census at `eb2d8f4`: **328 md files,
570,202 tokens** (original figure, method not preserved).

**2026-08-30 · re-measurement note (ursa, on Oracle instruction to
verify, not assume):** a same-method re-count at `eb2d8f4` — every
tracked `.md` file except `.github/`, `git show <rev>:<path>` piped
through `tiktoken.get_encoding("cl100k_base")` — gives **575,958
tokens**, not 570,202 (1.0% over, 5,756 tokens). The census script that
produced the original figure is not in the repo and could not be found;
the gap is not explained (a frontmatter-exclusion hypothesis was tested
and rejected — it undercounts by 54K, the wrong direction). Flagged, not
silently corrected: the ledger below uses the **575,958 re-measurement**
as its baseline, consistently, so every delta in this table is
same-method start-to-finish. Anyone auditing against the original
570,202 will see a ~1% base offset that is not this mission's doing.

## Ledger

| # | PR | What | Docs | Tokens (re-measured, cl100k_base, same method throughout) |
|---|---|---|---|---|
| 1 | [#145](https://github.com/numengames/numinia-nwos/pull/145) (merged) | Root norms into `standards/`: GOVERNANCE moved+absorbed §7F/§9; STANDARDS superseded to a map; D-003 ruling; ARC-06 commit types | −1 active norm, 0 files | **−2,401** |
| 2 | [#146](https://github.com/numengames/numinia-nwos/pull/146) (merged) | ADR-030 debt extinction; nine closed/de-facto-resolved entries extinguished; INDEX backfill ADR-027..030 | −7 files | **−8,903** |
| 3 | [#147](https://github.com/numengames/numinia-nwos/pull/147) (merged) | ADR-031: LD-NNN dissolved into D-042..046 (tag `legal`), 404→D-040/041, GAPS frozen to reports/, C-005 v1.3.0 amended | +6 files | **+2,422** (root register genre extinct; live text kept, restructured into more, smaller files — a document-count win with a token cost) |
| 4 | [#148](https://github.com/numengames/numinia-nwos/pull/148) (merged) | Five DEC entries (001,002,003,005,006) retired as superseded, one-line succession banners; decisions/ down to one living series (ADR) | 0 files | **+418** |
| — | [#149](https://github.com/numengames/numinia-nwos/pull/149) (merged) | *Not a reduction PR* — MIS-128 link hygiene fix, listed here only because it touched a mission `.md` (frontmatter timestamp fix) | +1 file | +1,330 (not part of this line; MIS-128's own scope) |
| — | [#150](https://github.com/numengames/numinia-nwos/pull/150) (merged) | *Not a reduction PR* — MIS-120 closure documentation | 0 files | +1,167 (MIS-120's own closure, not this line) |
| — | [#151](https://github.com/numengames/numinia-nwos/pull/151) (merged) | *Not a reduction PR* — MIS-128 closure documentation | 0 files | +788 (MIS-128's own closure, not this line) |
| — | [#152](https://github.com/numengames/numinia-nwos/pull/152) (merged) | *Not a reduction PR* — this mission's own ledger correction (re-measurement note + #148 backfill) | 0 files | not separately measured (self-referential, see note above) |
| 5 | #153 (pending) | ADR-032: `blueprints/` joins the operational series (extends ADR-030/P-010 §5); six April blueprints extinguished (BP-repo, BP-web, BP-misiones, BP-datos, BP-infraestructura — foundation decisions DEC-001/002/003/005 all superseded; BP-cao-overview — losing side of O-002 CON-001, now resolved); `BP-financiero` kept active per prior Oracle ruling, one dead cross-reference removed | −6 files, +1 file (ADR-032) = **−5 net** | **−1,561** (−3,698 removed + 2,015 new ADR + 128 net edits to P-010/O-002/BP-financiero) |

**Reduction-line total (PRs #145–148, #153): −10,025 tokens, −6 files net**, against
the 575,958-token re-measured baseline. The four non-reduction closures
(#149–152, +3,285 tokens combined, #152 not separately measured) are unrelated mission
paperwork that happened to land in the same window — real, necessary, and outside this
ledger's mandate, not netted against it.

**Cumulative repo state before #153: 328 files, 570,779 tokens** (per #152's
measurement). **After #153 lands: 323 files, ≈569,218 tokens** — a projected
net −6,740 from the 575,958 re-measured baseline.

## Open decision queue (one at a time, Oracle signs each)

- Freeze April-era commercial missions (MIS-017..050 todo, ~40 docs).
- ~~Freeze April blueprints nothing invokes (20 active, ~160K chars).~~
  **Partially resolved by ADR-032/#153**: 6 of 16 tracked blueprints
  extinguished (foundation decisions dead, or losing side of a resolved
  contradiction) — `BP-repo`, `BP-web`, `BP-misiones`, `BP-datos`,
  `BP-infraestructura`, `BP-cao-overview`. `BP-financiero` confirmed
  staying active (depends on pending missions, not a dead decision —
  still folds into the point below). The remaining 9 blueprints
  (`BP-cao`, `BP-cao-architecture`, `BP-archive-fondos`,
  `BP-business-metrics`, `BP-mission-system-v2`,
  `BP-numengames-improvement-roadmap`, `BP-nwos-system`,
  `BP-agent-experience`, `BP-dual-nomenclature`) were not evaluated
  against the extinction criterion — out of scope for #153, still an
  open question if the Oracle wants them reviewed. `blueprints/INDEX.md`
  (last touched 2026-04-07, lists 3 of 16) remains stale — not fixed.
- Single status vocabulary across every series (S-001).
- MIS-125 prefix register execution.
- protocols/ ↔ standards/ merge assessment.
- **New, opened by #153:** freeze the April commercial missions that
  `BP-financiero` depends on (MIS-021/031/034/048) — same mandate as
  the first bullet, now with a named blocking dependency.

## Done when

The Oracle declares the reduction line closed. Each PR in the ledger
records its own token delta; this mission is the sum.
