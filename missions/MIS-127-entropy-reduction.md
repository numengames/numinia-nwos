---
id: "MIS-127"
uid:
title: "Entropy reduction: fewer documents, one vocabulary, registers that die"
type: mission
status: in-progress
version: "0.4.0"
created: "2026-08-30T18:50:00Z"
updated: "2026-08-30T23:55:00+02:00"
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

**Reduction-line total (PRs #145–148 only): −8,464 tokens, −1 file**, against
the 575,958-token re-measured baseline. The three non-reduction closures
(#149–151, +3,285 tokens combined) are unrelated mission paperwork that
happened to land in the same window — real, necessary, and outside this
ledger's mandate, not netted against it.

**Cumulative repo state at `07b4e34` (current `main`): 328 files (net 0
vs. baseline — #146's −7 and #147's +6 nearly offset, #149's +1 fills
the last gap), 570,779 tokens — a net −5,179 from the 575,958
re-measured baseline, or would show as +5,577 against the original
uncorrected 570,202 figure. The discrepancy between "the reduction line
cut 8,464 tokens" and "the repo is only 5,179 lighter" is entirely the
+3,285 of mission-closure documentation from #149–151, which this ledger
does not claim credit for and should not be blamed for either.**

## Open decision queue (one at a time, Oracle signs each)

- Freeze April-era commercial missions (MIS-017..050 todo, ~40 docs).
- Freeze April blueprints nothing invokes (20 active, ~160K chars).
- Single status vocabulary across every series (S-001).
- MIS-125 prefix register execution.
- protocols/ ↔ standards/ merge assessment.

## Done when

The Oracle declares the reduction line closed. Each PR in the ledger
records its own token delta; this mission is the sum.
