---
id: "D-008"
uid:
title: "Twelve series carry a registration scheme most of the corpus does not yet apply"
type: documentation
status: active
version: "2.0.0"
created: "2026-08-24T19:40:00Z"
updated: "2026-08-31T09:40:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, identifiers, registration, archive]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "S-001 §4.1"
---
# D-008 — Twelve series carry a scheme most of the corpus does not yet apply

> **Summary:** `ADR-005` v1.1.0 (`MIS-125`, 2026-08-31) registers 13 series
> under a collision-free prefix scheme. Twelve carry it; `agents/` is
> explicitly exempt (folder name, not a number — reversal recorded in
> `ADR-005` v1.1.0). Nearly none of the existing files carry their prefix
> yet.
> **Epistemic:** Measures the distance between a decided rule and the data.
> **Pragmatic:** Until this closes, a citation like "the governance standard"
> has no stable handle.

## The gap, measured

`scripts/count-evidence.py` against HEAD `a26f66c` (2026-08-31, after
`ADR-005` v1.1.0 landed but before `MIS-125`'s Stage C renames):

| Series | Scheme | Coverage |
|---|---|--:|
| `missions/` | `MIS-NNNN` | **0/131** |
| `protocols/` | `PRO-NNN` | **0/15** |
| `decisions/` | `ADR/DEC-NNN` | 20/20 — already compliant, no action |
| `reports/daily/` | `RPT-NNN` (`subtype: daily`) | **0/10** |
| `reports/audits/` | `RPT-NNN` (`subtype: audit`) | **0/12** — currently `AUD-` |
| `blueprints/` | `BLU-NNN` | **0/16** |
| `canon/` | `CAN-NNN` | **0/10** |
| `standards/` | `STD-NNN` | **0/8** |
| `operations/` | `OPS-NNN` | **0/10** |
| `debt/` | `DBT-NNN` | **0/37** |
| `guilds/` | `GLD-NNN` | **0/8** |
| `infra/` | `INF-NNN` | **0/0 — no eligible files** (see note) |
| `agents/` | — (folder name, no number) | n/a — exempt by `ADR-005` v1.1.0, the one deliberate exemption that stays |

Total renameable: **277 files across 11 series** (`decisions/` excluded,
already compliant; `agents/` and `infra/` excluded, see notes).

**`infra/` note:** the register lists it, but the folder holds one
`README.md` (apparatus, excluded from every series by convention across this
protocol) and one `ruleset-protect-main.json` (not a `.md` document — no
series scheme applies to it). Zero files are eligible for renaming today.
The `INF-NNN` prefix is reserved, unused until a document is actually
written there.

**Counts vs. the version this debt superseded (v1.0.0, 2026-08-24):** that
version measured 4 series (`standards/` 0/3, `agents/` 0/17, `operations/`
0/11, `debt/` 1/1) against a scheme `ADR-005` v1.0.0 has since been amended.
Every one of those four figures is now stale — `agents/` no longer carries
a scheme at all (exempt), and the other three counts changed because the
corpus grew and, in `debt/`'s case, the 1 originally-compliant file
(`D-001-no-ci-guards.md`) still used the 3-digit `D-NNN` shape, which is
**not** what `ADR-005` v1.1.0 now specifies (`DBT-NNN`) — so it counts as
non-compliant under the current rule despite once having been the sole
example of compliance.

## The `registration: exempt` set — closed by Oracle ruling, 2026-08-31

50 files in the corpus carry `registration: exempt` in frontmatter (`S-001`
§5.0 mechanism, opened by `D-024`, 2026-08-25). Most are apparatus that was
never going to carry a series prefix — `README.md`, `INDEX.md`,
`agents/*/SOUL.md`/`OPERATOR.md`/`SOURCES.md`, templates, and the entire
generated `web/dist/corpus/` tree (excluded, not source).

**24 are content documents inside a registered series**, exempted for a
stated reason rather than by apparatus convention. Oracle ruling,
2026-08-31: *all of them enter the new scheme, no exception* — this closes
`D-024` as a side effect, since two of its four blocked items were
`pending-genre-ruling` exemptions this ruling now resolves.

| Series | Files | Prior exemption reason | Resolution |
|---|--:|---|---|
| `guilds/` | 8 | `singular document, not a numbered series` | `GLD-NNN`, in scope, already counted above |
| `blueprints/` (archive-summa ×3) | 3 | none stated | `BLU-NNN`, in scope, already counted above |
| `canon/` (2 legacy-dated, `archive-lore.md`) | 2–3 | frozen-artifact / none | `CAN-NNN`, in scope, already counted above |
| `standards/` (2 legacy-dated + `engineering-standards.md` + `governance.md`) | 4 | frozen-artifact / no frontmatter (historically) | `STD-NNN`, in scope, already counted above |
| `protocols/` (1 legacy-dated) | 1 | frozen-artifact | `PRO-NNN`, in scope, already counted above |
| `operations/security-policy.md`, `credential-map.md` | 2 | `pending-genre-ruling` (`D-024`) | **Genre ruling made here: both register as `OPS-NNN` like the rest of the series.** `D-024`'s open checkbox for this closes. |
| `debt/D-024`, `D-028` | 2 | apparatus of a frozen exemption / none | `DBT-NNN`, in scope, already counted above |
| `reports/` (`RPT-2026-08-25.md`, `RPT-2026-04-07-...md`, `PROP-C005-...md`) | 3 | none stated | `RPT-NNN`, in scope, already counted above |

These 24 were already folder-members of the 11 eligible series above — this
section does not add new files to the 277 total, it removes the exemption
that would otherwise have skipped them. The only genuinely new decision
here is `operations/security-policy.md` + `credential-map.md`: `D-024` had
those two blocked pending an ADR on their genre. **This ruling is that
decision** — both are `type: protocol`/`type: protocol` today and both
register as `OPS-NNN` regardless of genre debate, since `operations/` files
by folder, not by `type:`. `D-024` closes.

## Why it is not `[PENDING]`

Because there is no such marker, and inventing one would hide exactly this. The
rule is `[MANUAL]`: in force, and enforced by nobody automatically. New
documents will comply once `MIS-125` finishes; the 277 existing ones do not
because nobody has renamed them yet.

## Closing condition

Marked RESOLVED when the eleven eligible series reach 100 % coverage **or**
when the Oracle withdraws the scheme for a given series and `ADR-005`/`S-001`
record the exception (as already done for `agents/`).

Order — `MIS-125` Stage C, cheapest/lowest-risk first, one commit per series,
`scripts/check-references.mjs` clean after each:

1. `guilds/` — 8 files, self-contained, low external citation
2. `standards/` — 8 files
3. `canon/` — 10 files
4. `operations/` — 10 files
5. `blueprints/` — 16 files
6. `reports/daily/` — 10 files
7. `reports/audits/` — 12 files (prefix change `AUD-` → `RPT-`, add `subtype: audit`)
8. `protocols/` — 15 files
9. `debt/` — 37 files (including this document, renamed last within its own series)
10. `missions/` — 131 files, highest volume and citation density, last
11. `infra/` — 0 eligible files today; no action, prefix reserved

`agents/` is not in this list — exempt, see `ADR-005` v1.1.0.
`decisions/` is not in this list — already 100 %, no action needed.

Each rename runs `scripts/check-references.mjs` before merge. **Nothing is
renumbered**, only re-prefixed (`ADR-004` §rule 4).

## State

| | |
|---|---|
| Severity | medium — affects citability, not correctness |
| Owner | Oracle |
| Opened | 2026-08-24, by `S-001` §4.1 |
| Re-measured | 2026-08-31, by `MIS-125`, against `ADR-005` v1.1.0's 13-series register |
| Closes when | 100 % coverage of the 11 eligible series, or recorded exception |

## Version history

- v2.0.0 (2026-08-31) — `MIS-125`. Full re-measurement against `ADR-005`
  v1.1.0's 13-series register (was 4 series). `agents/` dropped —
  exempted, not measured. `infra/` added with a "no eligible files" note.
  Title and body rewritten; the v1.0.0 figures were three months stale by
  the time this mission started and measured a scheme that had itself
  been superseded.
- v1.0.0 (2026-08-24) — Initial debt. Measured `standards/` `agents/`
  `operations/` `debt/` against `ADR-005` v1.0.0.
