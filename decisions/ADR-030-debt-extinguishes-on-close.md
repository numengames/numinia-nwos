---
id: "ADR-030"
uid:
title: "Operational series extinguish on close: debt entries are records of work, not memory"
type: adr
status: active
version: "1.0.0"
created: "2026-08-30T18:30:00Z"
updated: "2026-08-30T18:30:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, lifecycle, extinction, p-010, governance]
license: "CC-BY-4.0"
related: ["P-010", "S-001", "ADR-027", "D-003", "D-012", "D-016", "D-017"]
---

# Operational series extinguish on close

> **Summary:** Closed debt entries are deleted from the tree once their
> resolution is written in the document that closed them. Git keeps the
> full text. This amends the scope of P-010 §5, which stays intact for
> canon, standards and decisions.
> **Epistemic:** Which series are memory (never deleted) and which are
> operational (extinguished on close), and why the difference is safe.
> **Pragmatic:** When you close a debt entry, write the resolution in the
> closing document and delete the file in the same PR.

## Context

`debt/` reached 39 entries and 51,457 tokens. Four were `closed` and five
more were resolved in the repo without anyone updating their status. A
closed debt entry has no reader: its content is a record of work done,
already narrated in the ADR, mission or report that closed it. Keeping the
file inflates the register that the Oracle reads to know what is owed.

P-010 §5 rightly forbids deleting superseded **memory** — canon,
standards, decisions — because later documents cite them and their text is
the system's history. Debt is a different genre: it is a **worklist**. A
worklist that only grows is not a register, it is sediment.

## Decision (Oracle, 2026-08-30)

1. **Operational series extinguish on close.** A `debt/` entry is deleted
   from the tree when its resolution is written in the ADR, mission or
   report that closed it — what was owed, how it was resolved, when, and
   by which change. Git history preserves the full text of every
   extinguished entry; `git log --follow` and this ADR are the index.
2. **P-010 §5 is amended in scope, not in substance.** It continues to
   govern canon, standards, decisions and every memory series: superseded
   is never deleted there. Its rule simply does not apply to series this
   ADR declares operational. Today that is `debt/` alone; declaring
   another series operational requires an ADR.
3. **A closure without a written resolution does not extinguish.** If no
   document records how the entry was resolved, the entry stays in the
   tree — whatever its status field says.

## Closure record — the nine entries extinguished by this ADR

The first application. Each resolution verified against the repository
state at `main`, 2026-08-30, not against reports alone:

| Entry | Was | Resolution — evidence |
|---|---|---|
| D-003 | `human_approval_score` undefined | Defined as the approval gate in `standards/governance.md` («Human approval scale»); closed by PR #145. The entry's premise was partly false: STANDARDS.md §9 had defined it since April |
| D-009 | 45 missions with retired statuses | Migration executed under ADR-027; verified: `missions/` carries only `todo/in-progress/done/frozen` (58/4/50/13) |
| D-010 | `area` in 256 docs, `territory` in 2 | Migration executed (ADR-027/ADR-028): `territory` in 194 docs, `area` in 1 (this entry itself) |
| D-012 | Canon contradicts itself on terminology | Rewritten and resolved by ADR-023 (four terms, two pairs); closure recorded in MIS-109 |
| D-013 | Four audits, four naming conventions | `reports/audits/` verified uniform: every audit is `AUD-YYYY-MM-DD-slug.md`; closure recorded in RPT-2026-08-25 |
| D-015 | README described a repo that no longer existed | README rewritten (RPT-2026-08-24). Its stricter closing clause — a guard against drift — is real and moves to the open guard debt (D-001 family) instead of holding a resolved entry open |
| D-016 | `cancelled` status retired | Resolved with its own ruling: 12 missions migrated per S-001 §7 (ADR-027, RPT-2026-08-24) |
| D-017 | CI guards needed the Oracle's hands | Workflow scope granted; reference lint runs in CI (RPT-2026-08-25, MIS-121); the very guards that verified this PR exist because this closed |
| D-018 | Nothing checks cited authorities exist | `check-references.mjs` runs in CI (`.github/workflows/ci.yml:30`); ADR-005 resolved 40 of its 88 citations; the ratchet holds the rest |

Token measure at extinction (cl100k_base): the nine files carried 11,298
tokens; this table replaces them with ~600.

## Consequences

- `debt/` shows only what is owed. Reading it end to end answers "what is
  open" without filtering by status.
- The closing document becomes the single narrative of each resolution —
  no drift between a debt file saying one thing and the mission another.
- Anyone needing an extinguished entry's full text runs
  `git log --diff-filter=D --summary -- debt/` or starts from this table.
- The register stops being inflationary: entries are born, work, and die.
