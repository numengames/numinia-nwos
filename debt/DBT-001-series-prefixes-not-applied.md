---
id: "DBT-001"
uid:
title: "Twelve series carry a registration scheme most of the corpus does not yet apply"
type: documentation
status: active
version: "4.0.0"
created: "2026-08-24T19:40:00Z"
updated: "2026-08-31T23:20:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, identifiers, registration, archive]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "STD-001 §4.1"
absorbs: ["D-008"]
---
# DBT-001 — Twelve series carry a registration scheme most of the corpus does not yet apply

> **Summary:** `ADR-005` v1.1.0 (`MIS-125`, 2026-08-31) registers 13 series
> under a collision-free prefix scheme. Twelve carry it; `agents/` is
> explicitly exempt (folder name, not a number — reversal recorded in
> `ADR-005` v1.1.0). Nearly none of the existing files carry their prefix
> yet.
> **Epistemic:** Measures the distance between a decided rule and the data.
> **Pragmatic:** Until this closes, a citation like "the governance standard"
> has no stable handle.

## The gap, measured

`scripts/count-evidence.py` against HEAD `caf2621` (2026-08-31, after
`ADR-005` v1.1.0 landed and after the frozen-artifact ruling below, but
before `MIS-125`'s Stage C renames):

| Series | Scheme | Coverage |
|---|---|--:|
| `missions/` | `MIS-NNNN` | **0/131** |
| `protocols/` | `PRO-NNN` | **0/13** |
| `decisions/` | `ADR/DEC-NNN` | 20/20 — already compliant, no action |
| `reports/daily/` | `RPT-NNN` (`subtype: daily`) | **0/10** |
| `reports/audits/` | `RPT-NNN` (`subtype: audit`) | **0/12** — currently `AUD-` |
| `blueprints/` | `BLU-NNN` | **0/16** |
| `canon/` | `CAN-NNN` | **0/8** |
| `standards/` | `STD-NNN` | **0/5** |
| `operations/` | `OPS-NNN` | **0/10** |
| `debt/` | `DBT-NNN` | **0/35** |
| `guilds/` | `GLD-NNN` | **0/8** |
| `infra/` | `INF-NNN` | **0/0 — no eligible files** (see note) |
| `agents/` | — (folder name, no number) | n/a — exempt by `ADR-005` v1.1.0, the one deliberate exemption that stays |

Total renameable: **248 files across 11 series** (`decisions/` excluded,
already compliant; `agents/` and `infra/` excluded, see notes; apparatus
excluded by name — `README.md`/`INDEX.md`/`TEMPLATE.md`/`STANDARDS.md`/
`APPROVAL-REQUEST-template.md`; the 5 frozen artefacts excluded by filename
shape, see the ruling below; `debt/D-001` and `debt/D-002` extinguished
2026-08-31, no longer counted).

**Arithmetic correction, v3.0.0.** Every version from v2.0.0 to v2.2.0
stated a total that its own table did not support. The rows above summed to
254 while the text claimed 274 — the 20-file `decisions/` row was being
added into a total the same sentence declares it excluded from. The figure
was then carried forward through two "corrections" (275→274) without either
one re-summing the column. Corrected here, and the total is now computed by
`count-evidence.py` rather than maintained by hand:

```
254  sum of the table rows as written in v2.2.0
-20  decisions/ — excluded by the sentence that stated the total
────
234  ... which was never the number printed either
```

The honest restatement: the eleven eligible series held **254** files at
v2.2.0's own measurement, of which `decisions/` (20) was never one of the
eleven. After this ruling removes 5 frozen artefacts and 1 apparatus file
(`APPROVAL-REQUEST-template.md`, which `D-024` v1.2.0 ruled exempt but no
counter ever excluded), the eligible total is **248**.

## The frozen-artifact ruling — `MIS-125`, 2026-08-31

**`P-010` §3.2 prevails. This debt's v2.0.0 ruling was wrong on these five
files and is reversed.**

v2.0.0 swept 24 `registration: exempt` documents into the scheme with "no
exception". Five of them are frozen artefacts — dated-filename snapshots —
and assigning them `STD-NNN`/`CAN-NNN`/`PRO-NNN` contradicted `P-010` §3.2
on its face. The full reasoning is written where the rule lives, in
`P-010` §3.2.2; the grounds in short, each measured against the repo:

| # | Ground | Evidence |
|---|---|---|
| 1 | A consumer outside this repo cannot be updated | `numinia-web/design-source.json` pins `2026_08_18-Sistema_de_Diseno-v5.1.0.md` by path + `sha256`; `STD-001` §5.0.1 makes that rename **not done**, not merely expensive |
| 2 | Renaming publishes a dead URL | `web/src/pages/corpus/[...slug].astro` derives addresses from filenames; `D-028` open |
| 3 | The zero-citation premise is false here | 59 incoming citations across 27 files. `MIS-125` authorised renames *because* the descriptive ids had **zero** |
| 4 | Two are `threshold: sealed` | `STD-001` §2.1 — `canon/` takes a signature + an ADR, not a bulk pass |

**The five:**

```
canon/2026_04_15-Epistemic_Relations_…-v0.2.0.md            5 citations
canon/2026_04_15-Pragmatic_Numen_System-v0.2.0.md           7
protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md       6
standards/2026_04_14-Analogous_Terminology_Numina-v0.2.0.md 5
standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md           36
```

They leave the denominator rather than sit in it as non-compliance: a
photograph measured against a living-series scheme is a **measurement
error, not debt**. This is the second half of `STD-001` §5.0's own principle —
a gap and a declared exception must not look alike, and that cuts both ways.

**Detection is by filename shape, not by the `registration_exemption`
field** — two of the five carry the shape without the field (`P-010`
§3.2.1). `count-evidence.py` was keyed on the field's absence and counted
those two as violations; fixed in the same commit as this ruling.

**Not affected:** the other 19 documents of the v2.0.0 exempt ruling. Living
documents with `registration: exempt` still enter the scheme, including
`operations/security-policy.md` and `credential-map.md`. This ruling is
narrow by construction.

**`standards/STANDARDS.md` note:** `type: meta`, `status: closed`,
`registration: exempt` (`registration_reason: "singular document, not a
numbered series"`) — a tombstone/redirector pointing to the living rules
(`superseded_by: "STD-001 · STD-004 · STD-002-governance.md · STD-005-engineering-standards.md"`),
the same functional class as `README.md`/`INDEX.md` (excluded from every
series by the same convention), not a numbered standard itself. Oracle
ruling, 2026-08-31: stays apparatus, permanently exempt, no `STD-NNN`.
`count-evidence.py` updated to exclude it by name alongside
`README.md`/`INDEX.md`/`TEMPLATE.md`.

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
corpus grew and, in `debt/`'s case, the 1 originally-compliant file (`D-001`,
closed and extinguished 2026-08-31 — see `MIS-127`) still used the 3-digit
`D-NNN` shape, which is
**not** what `ADR-005` v1.1.0 now specifies (`DBT-NNN`) — so it counts as
non-compliant under the current rule despite once having been the sole
example of compliance.

## The `registration: exempt` set — closed by Oracle ruling, 2026-08-31

50 files in the corpus carry `registration: exempt` in frontmatter (`STD-001`
§5.0 mechanism, opened by `D-024`, 2026-08-25). Most are apparatus that was
never going to carry a series prefix — `README.md`, `INDEX.md`,
`agents/*/SOUL.md`/`OPERATOR.md`/`SOURCES.md`, templates, and the entire
generated `web/dist/corpus/` tree (excluded, not source).

**24 are content documents inside a registered series**, exempted for a
stated reason rather than by apparatus convention. Oracle ruling,
2026-08-31: *all of them enter the new scheme, no exception* — this closes
`D-024` as a side effect, since two of its four blocked items were
`pending-genre-ruling` exemptions this ruling now resolves.

**Amended, v3.0.0 (same day):** "no exception" was too wide by five. The
frozen artefacts among these 24 do **not** enter the scheme — see the
ruling above. **19 enter, not 24.** The correction is to the *scope* of the
2026-08-31 ruling, not to its principle: a living document's exemption is
still removed, not honoured.

| Series | Files | Prior exemption reason | Resolution |
|---|--:|---|---|
| `guilds/` | 8 | `singular document, not a numbered series` | `GLD-NNN`, in scope, already counted above |
| `blueprints/` (archive-summa ×3) | 3 | none stated | `BLU-NNN`, in scope, already counted above |
| `canon/` (`archive-lore.md` only) | 1 | none stated | `CAN-NNN`, in scope. **The 2 legacy-dated are OUT** — frozen artefacts, see the ruling above |
| `standards/` (`STD-005-engineering-standards.md` + `STD-002-governance.md`) | 2 | no frontmatter (historically) | `STD-NNN`, in scope. **The 2 legacy-dated are OUT** — frozen artefacts, see the ruling above. `STD-005-engineering-standards.md` enters despite `D-024`'s reverted attempt: its consumers are all in-repo except a `scorecard.yml` comment — re-verify before Stage C reaches `standards/` |
| `protocols/` (1 legacy-dated) | 0 | frozen-artifact | **OUT** — frozen artefact, see the ruling above. `P-010` declares the relation with `supersedes:` instead |
| `operations/security-policy.md`, `credential-map.md` | 2 | `pending-genre-ruling` (`D-024`) | **Genre ruling made here: both register as `OPS-NNN` like the rest of the series.** `D-024`'s open checkbox for this closes. |
| `debt/D-024`, `D-028` | 2 | apparatus of a frozen exemption / none | `DBT-NNN`, in scope, already counted above |
| `reports/` (`RPT-2026-08-25.md`, `RPT-2026-04-07-...md`, `PROP-C005-...md`) | 3 | none stated | `RPT-NNN`, in scope, already counted above |

These documents were already folder-members of the 11 eligible series above
— this section does not add new files to the total, it removes the exemption
that would otherwise have skipped them (for the 19; the 5 frozen artefacts
keep theirs, and leave the denominator entirely). The only genuinely new decision
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
when the Oracle withdraws the scheme for a given series and `ADR-005`/`STD-001`
record the exception (as already done for `agents/`).

Order — `MIS-125` Stage C, cheapest/lowest-risk first, one commit per series,
`scripts/check-references.mjs` clean after each:

1. `guilds/` — 8 files, self-contained, low external citation
2. `standards/` — 5 files (2 frozen artefacts and `STANDARDS.md` excluded)
3. `canon/` — 8 files (2 frozen artefacts excluded)
4. `operations/` — 10 files
5. `blueprints/` — 16 files
6. `reports/daily/` — 10 files
7. `reports/audits/` — 12 files (prefix change `AUD-` → `RPT-`, add `subtype: audit`)
8. `protocols/` — 13 files (1 frozen artefact + `APPROVAL-REQUEST-template.md` excluded)
9. `debt/` — 35 files (including this document, renamed last within its own series; was 37, `D-001` and `D-002` extinguished 2026-08-31, see `MIS-127`)
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
| Opened | 2026-08-24, by `STD-001` §4.1 |
| Re-measured | 2026-08-31, by `MIS-125`, against `ADR-005` v1.1.0's 13-series register |
| Closes when | 100 % coverage of the 11 eligible series (248 files), or recorded exception |

## Version history

- v3.0.0 (2026-08-31) — `MIS-125`. **Two reversals of this document's own
  prior rulings, both against it.** (1) *Frozen artefacts.* v2.0.0's "all
  24 exempt documents enter the scheme, no exception" contradicted
  `P-010` §3.2 on five dated-filename artefacts. `P-010` wins — see the
  ruling section above; the five leave the denominator, and 19 of the 24
  enter, not 24. Major bump: this reverses a ruling, it does not refine
  one. (2) *Arithmetic.* The "total renameable" figure had been wrong
  since v2.0.0 — the table summed to 254 while the text said 274, adding
  the `decisions/` row the same sentence excluded, and two subsequent
  "corrections" adjusted the wrong number without re-summing. The total is
  now produced by `count-evidence.py`, not maintained by hand: **248**.
  Also excluded `APPROVAL-REQUEST-template.md`, which `D-024` v1.2.0 ruled
  apparatus but no counter had ever excluded.
- v2.2.0 (2026-08-31) — `MIS-125`, same day. `debt/D-002` extinguished
  after v2.1.0 was written (`docs(debt): close D-002`, `#160`, landed
  after this document's PR #157 merged) — same pattern as `D-001`:
  ground moved under a just-closed measurement, not an error in the
  prior version. `debt/` corrected 0/36 → 0/35. Total renameable:
  275 → 274.
- v2.1.0 (2026-08-31) — `MIS-125`, same day. Two corrections after the
  v2.0.0 measurement: (1) `standards/STANDARDS.md` was being counted in
  the `standards/` denominator despite being the same apparatus class as
  `README.md`/`INDEX.md` (a tombstone pointing to living rules, not a
  numbered standard) — Oracle ruling: stays permanently exempt, no
  `STD-NNN`; `count-evidence.py` now excludes it by name; `standards/`
  corrected 0/8 → 0/7. (2) `debt/D-001` was extinguished the same day
  (`MIS-127`) — `debt/` corrected 0/37 → 0/36. Total renameable:
  277 → 275.
- v2.0.0 (2026-08-31) — `MIS-125`. Full re-measurement against `ADR-005`
  v1.1.0's 13-series register (was 4 series). `agents/` dropped —
  exempted, not measured. `infra/` added with a "no eligible files" note.
  Title and body rewritten; the v1.0.0 figures were three months stale by
  the time this mission started and measured a scheme that had itself
  been superseded.
- v1.0.0 (2026-08-24) — Initial debt. Measured `standards/` `agents/`
  `operations/` `debt/` against `ADR-005` v1.0.0.

---

## Renumbering note, 2026-08-31

This document was `D-008`. The `D-` series
was closed and renumbered densely to `DBT-NNN` under `ADR-004` rule 4 and
`ADR-005` v1.1.0 — see `RPT-001` §12. No `D-` number is reused.
