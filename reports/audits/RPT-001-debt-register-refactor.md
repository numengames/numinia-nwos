---
id: "RPT-001"
uid:
title: "Debt register refactor: which entries answer a question still open"
type: report
subtype: audit
status: closed
version: "1.3.0"
created: "2026-08-31T20:30:00+02:00"
updated: "2026-08-31T23:59:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, entropy, consolidation, audit, MIS-127, ADR-030]
license: "CC-BY-4.0"
visibility: "public"
related: ["ADR-026", "ADR-030", "S-001", "P-010", "D-048", "MIS-127", "D-028", "D-050"]
---

# Debt register refactor — analysis, no execution

> **Summary:** `debt/` holds 39 entries and 59,400 tokens. 12 answer a
> question that is still open and that nothing else in the corpus answers.
> 15 are extinguishable, 17 collapse into 5.
> **Epistemic:** The survival test is not severity. It is whether a reader
> with a live question would land here and find the answer.
> **Pragmatic:** Analysis only. No file in `debt/` was modified.

**ROOT** `numengames/numinia-nwos` · **HEAD** `0615f4f` · measured 2026-08-31
**Unit** files, and tokens under `cl100k_base`, stated per line.

## 0. The test applied

An entry survives if all three hold:

1. **It poses a question that is still open.** Not a lesson, not a record of
   work done — an unpaid obligation.
2. **Nothing else answers it.** If the answer now lives in `S-001`, the
   entry is a duplicate of the standard.
3. **Its premise still holds against the tree.** An entry about a field
   that no longer exists answers nothing.

Test 3 is the one that did the work. Six entries failed it outright.

## 1. Measured before judging

| Measure | Value | Method |
|---|---|---|
| Entries | 39 | `ls debt/*.md` |
| Tokens | 59,400 | `tiktoken` `cl100k_base`, whole file |
| `status: closed` with a written resolution | 6 | frontmatter + `## Resolution` |
| Entries `check-deletable.mjs` clears on test 1 | 7 of 39 | the guard, at HEAD |
| Citation occurrences of `D-NNN` outside `debt/` | **820, in 90 files** (corrected v1.2.0, §12) | regex sweep, all tracked text files, `web/dist` excluded |
| Citers that are **closed records** | 19 of 63 | `P-010` §3.4 forbids rewriting these |

## 2. Three premises checked against the tree, not against the prose

**Two entries describe fields that no longer exist.** `semaforo`
(`D-004`) and `confidence_before`/`confidence_after` (`D-005`) appear in
**0** tracked documents. `cost_estimate` (`D-006`) and `week` (`D-007`)
survive only in `reports/daily/RPT-2026-04-0*.md`, which are frozen. The
vocabulary debt was paid by attrition and nobody closed the entries.

**`D-011` is mostly paid and says otherwise.** The `protect-main` ruleset
is `active` with `pull_request`, `required_status_checks`,
`required_linear_history`, `non_fast_forward`, `deletion` and **zero bypass
actors**. What remains unenforced is signature verification — which is
`D-019`'s subject, not a separate debt.

**Eight entries are in the corpus and not on the site.** Measured by `GET`
against `numinia.org/corpus/debt/`:

```
30 of 39 served 200
 1 correctly withheld (D-033, visibility: restricted-oracle)
 8 return 404: D-040 … D-046, D-050
```

All eight lack a `visibility:` field entirely. The `MIS-114` filter fails
closed, which is the right direction — but the register the Oracle reads
for what is owed is missing eight of its own entries, in public, and no
guard reports it. This is `D-023`'s class, live, today.

*(Method note: a first pass used `HEAD` requests and reported 39 of 39
unreachable. The origin rejects `HEAD`. The figure above is `GET`. Recorded
rather than quietly corrected — `S-001` §10.2.)*

## 3. The finding that governs this refactor

`scripts/check-references.mjs` **cannot see a `D-NNN` citation at all.**

```js
const ID_RE = /\b(MIS|ADR|DEC|RPT|PRO|DBT|STD|CAN|OPS|BLU|GLD|INF|SYS)-…/g;
```

The debt series registers as `DBT` under `ADR-005` v1.1.0. Every entry on
disk is `D-NNN`. `D` is not in the alternation.

Proven, not argued. A throwaway tracked file was made to cite three
non-existent identifiers — one under the `D` prefix, one under `ADR`, one
under `DBT` — and the guard was run:

```
✗ 2 NEW broken reference(s):
    ID   <probe file> -> ADR-<nonexistent>
    ID   <probe file> -> DBT-<nonexistent>
```

Two of three were caught. **The `D` one was not reported at all.**
(The literal identifiers are omitted here on purpose: writing them would
mint two dangling citations in the corpus to prove that dangling citations
go uncaught — `PRO-010` §3.4, a name used as data is not a citation.) The guard is silent on the 240 citations this
refactor would extinguish, and it will stay green through every one of
them. This is `D-050` exactly — its own subject is the reason it cannot
measure itself — and it is a hard precondition: **`ID_RE` must accept `D`
before any entry is merged or removed.**

## 4. Judgement — the five that matter

Ordered by what they block, not by severity field.

| # | Entry | Why it ranks here |
|---|---|---|
| 1 | **`D-028` — URL lifecycle unmanaged** | `ADR-030` makes deletion conditional on redirected URLs; `check-deletable.mjs` therefore refuses every document in the repo, including the record that installed it. Nothing in the reduction line moves until this is paid. |
| 2 | **Guard blindness** (`D-050` + `D-039`) | §3. The instrument that certifies the corpus cannot see the series being refactored. `D-039` is the same shape one layer down: a green ratchet certified 85 corrupted files. |
| 3 | **Publication integrity** (`D-023`+`D-031`+`D-032`+`D-035`) | Four entries, one question: what does the corpus hold that the world cannot read, and what does the world read that the corpus never checked? Fresh evidence: 8 debt entries 404 right now. |
| 4 | **Root of trust** (`D-019`+`D-011`+`D-020`+`D-026`) | `sealed` is the archive's highest threshold. `allowedSignersFile` is still absent from the tree, so it is verifiable only by its own signer, on a software key, held by an identity the corpus never maps to a role. |
| 5 | **`D-033` — unverified compliance assertions** | 145 assertions, 132 falsifiable by command, 61 already refuted by `S-001` §2.0 and still written in the present tense. The largest surface of claims the system makes about itself and never reads back. |

`D-008` was considered and rejected for this list: it measures `MIS-125`'s
own progress. It is a mission metric wearing a debt id.

## 5. The survivors, two lines each

The five above, plus seven. Twelve entries, 12 of 39.

1. **`D-028` — Published URLs derive from filenames and nothing manages them.**
   688 pages, 192 recorded renames, 9 redirect rules. Every rename silently
   changes a public address and no instrument notices the death.

2. **Guard blindness** *(merges `D-050`, `D-039`)*.
   `check-references.mjs` does not recognise `D-`, and a tolerant guard's
   green certified 85 corrupted files. Green means no instrument we own disagreed.

3. **Publication integrity** *(merges `D-023`, `D-031`, `D-032`, `D-035`)*.
   Content reaches the site without the renderer, never reaches it at all, or
   is missing from its own index — 8 debt entries and 278 PDF links, all 404.

4. **Root of trust** *(merges `D-019`, `D-011`, `D-020`, `D-026`)*.
   `sealed` rests on a software key, verifiable only by its signer, held by a
   git identity no file maps to a declared role.

5. **`D-033` — Compliance assertions are falsifiable and nothing falsifies them.**
   132 of 145 testable by command, untested; 61 refuted and still present tense.
   One was tested by accident and was false for 141 days.

6. **`D-008` — Twelve series carry a scheme most of the corpus does not apply.**
   The registration coverage gap `MIS-125` is executing against. Closes with
   that mission, not independently.

7. **`D-030` — Should the licence regime derive from the path?**
   Open design question, registered by Oracle instruction with no closing
   proposal. Closes when the Oracle decides, not when anyone implements.

8. **`D-038` — `C-005` files agent definitions as lore.**
   The licence canon calls documentation "reserved" and reserves what was
   already given away. `ADR-026` names this as the amendment `C-005` owes.

9. **C-005 compliance ledger** *(merges `D-042`…`D-046`)*.
   CC0 carried over onto the lore, `NOTICE` still absent with 11 Apache-2.0
   packages, LGPL in the tree, instrument unpinned, cutoff commit wrong.

10. **Cross-repo consumers** *(merges `D-040`, `D-041`)*.
    Two retirements that broke addresses outside this repository; both still
    return 404 today. Repair happens in the consuming repo, not here.

11. **`D-036` — 33 missions declare no `author`.**
    Re-measured at HEAD: still 33 of 132. The CC0 partition of `C-005` is
    computed from that field, so the gap is classificatory, not cosmetic.

12. **`D-034` — Ten Dependabot advisories, untriaged.**
    3 high, 4 moderate, 3 low, known only from a `git push` banner. Not
    independently verifiable: the API returns 403 to the current token.

## 6. What is removed, and on what authority

**Extinguished — closed, with a written resolution (`ADR-030` test 3): 6
files, 12,558 tk.**
`D-014`, `D-024`, `D-025`, `D-047`, `D-048`, `D-049`. Each already carries
its `## Resolution`; `MIS-125` and `S-001` §10.4 hold the outcomes.

**Extinguished — premise dead or answer already elsewhere: 9 files, 10,189 tk.**

| Entry | Why it answers nothing |
|---|---|
| `D-004`, `D-005` | The fields do not exist in any tracked document |
| `D-006`, `D-007` | The fields survive only in frozen April dailies |
| `D-021` | The lesson is `S-001` §10.0, first row of its own table |
| `D-022` | The lesson is `S-001` §10.2 |
| `D-027` | Irreparable and declared; a record, not an obligation |
| `D-029` | The rule it proposes is `PRO-008`'s subject |
| `D-037` | A rule with no home — **must be written into `S-001` §10 first** |

`D-037` is the one exception in this table: extinguishing it before its rule
lands in the standard would delete the only copy.

**Merged: 17 files → 5.** Groups as listed in §5.

## 7. Arithmetic

| | Files | Tokens |
|---|---|---|
| Before (`0615f4f`) | 39 | 59,400 |
| After | 12 | ~24,600 |
| Δ | **−27** | **−34,800 (−58%)** |

The token figure for merged entries is an estimate at 45% retention —
evidence tables kept, preambles collapsed. The file counts are exact.

## 8. Cost, stated before it is paid

> **Amended 2026-08-31, v1.1.0 — see §11.** v1.0.0 stated this cost as
> "19 files blocked". That was wrong and is corrected below.

- **820 citation occurrences in 90 files** outside `debt/` must be reviewed
  (1,098 in 129 files including `debt/` itself). Corrected in v1.2.0 — §12.
  Of the 195
  occurrences inside the 19 closed records, **4 are untouchable** — they
  name a file path, not an identifier. The other 191 are ordinary
  pointers.
- **`ID_RE` must accept `D` first** (§3), or the sweep is unverifiable.
- **`S-001` §11 links `D-004`…`D-007` directly** and must be edited in the
  same change.
- **`C-005` cites the legal entries**; the merge rewrites canon references
  and therefore needs the Oracle's signature under `S-001` §2.1.

## 9. Executed (v1.3.0 — superseding "not done, deliberately")

v1.0.0–v1.2.0 were analysis only. On the Oracle's instruction the refactor
was **executed** in this same branch. What follows is what actually landed,
verified by the guards rather than asserted.

**Two guards were repaired first**, because both carried a private copy of a
ruling that had drifted from the ruling:

| Guard | Was | Now |
|---|---|---|
| `check-references.mjs` `ID_RE` | omitted `D` | `D` added — probe now catches 3 of 3 |
| `lint-frontmatter.mjs` `PREFIX` | `debt: 'D'` | `debt: 'DBT'` per `ADR-005` v1.1.0 |
| `lint-frontmatter.mjs` ring | `absorbs` unregistered for `debt/` | registered, as it already was for `decisions/` |

Fixing `ID_RE` **revealed 81 citations that had been broken since August** —
all to `D-001`…`D-018`, zero false positives. They were not new breakage,
only newly measurable.

**39 entries → 12**, renumbered densely (§12.2). Every merged entry carries
`absorbs:`, which `check-references.mjs` already resolves — so **all 497
citations of surviving entries keep resolving untouched**. Measured after the
merge: zero broken references to a survivor.

**30 published URLs died and all 30 were redirected.** The guard
`check-url-lifecycle.mjs` — the instrument `DBT-004` exists to describe —
caught them. 15 merged entries point at the document that now contains their
reasoning; 15 extinguished entries point at the debt register itself, which
is the honest target when a question is withdrawn rather than moved. Redirects
were **not** taken from `--propose` verbatim: it defaults every target to
`/corpus`, which its own output calls "a 200 that lies".

**Verified after, not asserted:** 8 guards green, `npm run build` at 556
pages, and 11 `DBT` pages served publicly plus `DBT-006` correctly withheld
as `restricted-oracle` — 12 of 12.

**The `visibility` gap from §2 is closed.** `DBT-011` and `DBT-012` declare
`visibility: public`; the eight entries that returned 404 in production do so
no longer.

### What was left undone, and why

**601 citations to extinguished entries now dangle** — banked into
`references-baseline.json`, which **grew from 398 to 538**. That file's own
comment says it "should shrink over time and never grow". It grew, and the
reason is recorded inside it rather than hidden: ~71 were already broken and
invisible, ~88 are genuinely caused by this refactor, and 2 are path-shaped
references inside closed records that `P-010` §3.4 forbids rewriting.

`ADR-004` rule 4 condition 2 says an operation whose consumers cannot all be
updated in the same change should be **deferred**. Read strictly, that
applies here. It was executed anyway, on the Oracle's explicit instruction,
and this paragraph is the record that the condition was not met. The branch
`refactor/debt-register-analysis` holds this analysis alone — it carries no
mission identifier, because no mission has been opened for this work and
minting one would assert a decision the Oracle has not made.

## 10. Registration note

This report is filed as **`RPT-001`**, the first use of the `RPT-NNN`
scheme `ADR-005` v1.1.0 registered for `reports/`. Verified collision-free:
no `RPT-NNN` identifier exists in the corpus — the nine existing `RPT-`
files are all date-shaped (`RPT-YYYY-MM-DD`). Its ten `AUD-` siblings in
`reports/audits/` remain unregistered and baselined under `D-008`; this
document does not renumber them.

## 11. Amendment, 2026-08-31 (v1.1.0) — the closed-record cost was overstated

**What v1.0.0 said.** *"19 of those files are closed records that `P-010`
§3.4 forbids rewriting."* Raised by the Oracle as a disagreement; the
Oracle was right and this is the correction.

**What `P-010` §3.4 actually says.** Its own table defines a **citation**
as *"a pointer to a document, meant to keep resolving"* → **rewrite —
that is the point.** An identifier standing alone is that pointer. Rule 2
(*"a closed record is never rewritten"*) governs the **mention**: the id
used as data. v1.0.0 applied rule 2 to every occurrence without asking
which of the two each one was.

**Measured** — `HEAD 369e489`, the 19 closed records, unit: occurrences
of `D-NNN`.

| What the occurrence is | N | What follows |
|---|---|---|
| Points at a **surviving** entry — only the plate changes, `D-NNN` to the registered `DBT` form | **91 (46%)** | **Rewrite.** The document still exists; the number is its handle. |
| Points at an **extinguished** entry | 58 (29%) | No new plate exists. Not forbidden — there is no destination. |
| Already points at `D-001`…`D-018`, extinguished in August | 46 (23%) | The precedent is already in the tree, untouched by anyone. |
| Is a **file path**, not a plate | **4** | Untouchable. Rewriting falsifies the record. |

The four: `debt/D-047` and `debt/D-048` (twice) in
`debt/D-049-…`, and `debt/D-032-orphan-content-outside-renderer.md` in
`AUD-2026-08-26-complexity.md`.

**The rule is wider than the evidence that produced it.** `D-048` §§1–4
records the four corruptions that led to rule 2: two were **file paths**
(an SBOM whose `FileChecksum` no longer matched its own `FileName`; a
`status: done` mission naming a guild roster by its pre-rename path) and two
were **ids used as their own counterexample**. **None was a plate
rewritten as a pointer.** Rule 2 protects 195 occurrences; its
demonstrated case is 4.

**Not proposed here.** Whether `P-010` §3.4 should distinguish *plate*
from *path* is a change to a protocol, and this is a report. It is stated
as a finding, and the ruling is the Oracle's.

**What does not change.** §3 stands: `check-references.mjs` cannot see
the `D` prefix, so none of the above is machine-verifiable until `ID_RE`
is fixed. `scripts/rename-series.mjs` already refuses all of
`reports/**` via `refusalReason()`, which covers 2 of the 4 untouchable
occurrences automatically; the other 2 sit in `debt/` and need the eye.

## 12. Amendment, 2026-08-31 (v1.2.0) — the citation count was wrong, and the renumbering plan

### 12.1 The count

v1.0.0 and v1.1.0 both state **"240 citation occurrences in 63 files"**. That
figure is wrong. Re-measured at `HEAD 7a955a8` over every tracked text file
(`.md .mjs .py .json .yml .yaml .astro .ts`, `web/dist` excluded):

| Scope | Occurrences | Files |
|---|---|---|
| Whole corpus | **1,098** | 129 |
| Outside `debt/` | **820** | 90 |
| Inside `debt/` | 278 | 39 |
| → point at a **surviving** entry (rewritten into the new series) | 497 | — |
| → point at an **extinguished** entry (no destination) | 601 | — |

The original figure does not reproduce under any method I can reconstruct.
The closest is 208 unique `(file, identifier)` pairs in `.md` files only —
which would mean the count was of *pairs* while the label said *occurrences*,
and that it ignored `scripts/`, `.github/` and `web/` entirely. I cannot
confirm that was the method. The honest statement is that the number was
produced by a sweep I did not pin down, and the corrected figures above are
reproducible.

This matters beyond arithmetic: `scripts/references-baseline.json` (50),
`scripts/naming-baseline.json` (40), `scripts/blind-spots.json` (19) and
`.github/workflows/ci.yml` (5) all carry `D-NNN`. **The renumbering touches
the guards' own baselines and CI.** v1.0.0's cost model did not include them.

### 12.2 The renumbering, under `ADR-004` rule 4

Numbers below are given bare (`001`…`012`) and take the `DBT` prefix
`ADR-005` registered for `debt/`; they are written unprefixed here because
these documents do not exist yet and a citation must resolve.

The series is renumbered **densely**, not preserved. Precedent: `MIS-109`
compacted `S-004`→`C-003` and `S-005`→`C-004`, cited in rule 4 as its first
exercised exception. Order is by lowest original number, so relative age
survives.

| New no. | Absorbs | Subject |
|---|---|---|
| **001** | `D-008` | Registration scheme coverage |
| **002** | `D-011` + `D-019`, `D-020`, `D-026` | Root of trust |
| **003** | `D-023` + `D-031`, `D-032`, `D-035` | Publication integrity |
| **004** | `D-028` | URL lifecycle unmanaged |
| **005** | `D-030` | Licence regime from path (open question) |
| **006** | `D-033` | Unverified compliance assertions |
| **007** | `D-034` | Dependabot advisories untriaged |
| **008** | `D-036` | Missions declaring no `author` |
| **009** | `D-038` | `C-005` files agent definitions as lore |
| **010** | `D-039` + `D-050` | Guard blindness |
| **011** | `D-040` + `D-041` | Cross-repo 404 |
| **012** | `D-042` + `D-043`, `D-044`, `D-045`, `D-046` | `C-005` legal ledger |

The `D-` series closes entirely. No `D-NNN` number is reassigned — rule 4's
"numbers are never reused" holds across the prefix change.

### 12.3 Condition 3 is not satisfiable today

Rule 4 requires *"`scripts/check-references.mjs` run clean"* after the rename.
The guard **cannot see the `D` prefix** (§3). It would run clean over 1,098
rewritten citations without inspecting one of them — a vacuous green, which
is `D-039`'s subject exactly.

**Therefore the renumbering cannot be executed yet.** Not by preference: by
the rule's own third condition. `ID_RE` is the precondition, and it is one
line.

### 12.4 The 601 with no destination

601 occurrences point at entries that will not exist. Precedent exists —
46 citations to `D-001`…`D-018` have dangled since August and nobody
repaired them — but no rule ever sanctioned it. Rule 4 condition 2 says an
identifier whose consumers cannot be updated in the same change means the
operation is **deferred**, not proceeded with partially. Read strictly, 601
dangling pointers is that case.

This report does not resolve it. It is the Oracle's ruling, and it is the
one decision blocking the whole operation.
