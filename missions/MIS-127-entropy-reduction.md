---
id: "MIS-127"
uid:
title: "Entropy reduction: fewer documents, one vocabulary, registers that die"
type: mission
status: in-progress
version: "0.2.0"
created: "2026-08-30T18:50:00Z"
updated: "2026-08-30T18:50:00Z"
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
570,202 tokens**.

## Ledger

| # | PR | What | Docs | Tokens |
|---|---|---|---|---|
| 1 | [#145](https://github.com/numengames/numinia-nwos/pull/145) (merged) | Root norms into `standards/`: GOVERNANCE moved+absorbed §7F/§9; STANDARDS superseded to a map; D-003 ruling; ARC-06 commit types | −1 active norm | **−2,401** |
| 2 | [#146](https://github.com/numengames/numinia-nwos/pull/146) | ADR-030 debt extinction; nine closed/de-facto-resolved entries extinguished; INDEX backfill ADR-027..030 | −9 | **≈ −10,700** net |
| 3 | pending | Root registers into `debt/`: DEUDA-404 + GAPS live gaps become D-NNN entries; LEGAL_DEBT move awaits its C-005 §5 amendment ADR | −3 | est. −6,000 |

## Open decision queue (one at a time, Oracle signs each)

- C-005 §5 amendment ADR for the LEGAL_DEBT move (drafted, unsigned).
- Freeze April-era commercial missions (MIS-017..050 todo, ~40 docs).
- Freeze April blueprints nothing invokes (20 active, ~160K chars).
- Single status vocabulary across every series (S-001).
- MIS-125 prefix register execution.
- protocols/ ↔ standards/ merge assessment.

## Done when

The Oracle declares the reduction line closed. Each PR in the ledger
records its own token delta; this mission is the sum.
