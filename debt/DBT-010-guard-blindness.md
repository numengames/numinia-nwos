---
id: "DBT-010"
uid:
title: "Guard blindness: the instruments cannot measure their own blind spots"
type: documentation
status: active
version: "2.0.0"
created: "2026-08-30T14:07:58Z"
created_source: "git:d4c2975"
created_confidence: exact
updated: "2026-08-31T23:20:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, guards, ci, blind-spots, frontmatter, D-025, D-001]
license: "CC-BY-4.0"
visibility: "public"
severity: high
opened_by: "Ursa, 2026-08-30"
absorbs: ["D-039", "D-050"]
---

# DBT-010 — Guard blindness: the instruments cannot measure their own blind spots

## What happened

PR #134 (`d4c2975`, phase 2 of the header burndown) rewrote 85 documents. Its
migration script read frontmatter with this regex:

```
r'^---\s*\n(.*?)\n---(\n|$)'
```

Group 2 **consumed** the newline that closes the fence. The write format did
not put it back:

```
"---\n%s\n---%s" % (frontmatter, rest)
```

Two distinct corruptions followed, depending on what came after the fence:

| | files |
|---|---|
| fence glued to the body — `---# BP — CAO` | 79 |
| blank line after the fence silently deleted | 6 |

Eighty-five, exactly the documents the phase touched.

## Why nothing caught it

**All five guards stayed green.** The ratchet reported `446 findings (446
baselined) — no new violations`, and the PR merged on that evidence.

- `lint-frontmatter.mjs` splits frontmatter with a **tolerant** regex, so it
  read all 85 headers correctly and found nothing to report.
- Astro's parser is equally tolerant: the site built 679 pages, the `H1`
  rendered correctly, and the `---` never leaked into the page as text.
- The license guard reads the same tolerant way.

Every instrument the corpus owns agreed the files were fine. **The damage was
invisible precisely because our tools are more forgiving than the standard.**

A YAML parser that requires `---` on its own line — the behaviour the spec
describes — reads **no frontmatter at all** in the 79 glued files. The day
anyone points a standard tool at this corpus, 79 documents lose their headers
at once, and the blast radius is every downstream consumer, not this repo.

## The general shape

This is D-025 (*"no guard declares what it is blind to"*) with a sharper
edge. D-025 says a guard should declare its blind spots. D-039 says something
worse: **a guard's tolerance is itself a blind spot, and a tolerant reader
cannot detect damage that only a stricter reader would see.**

Green does not mean correct. It means *no instrument we own disagreed*.

The gap between those two statements is where this bug lived for one merge.

## What was done

- `scripts/repair-frontmatter-delimiter.py` restores the original separator
  byte for byte, read from the pre-damage git object rather than assumed.
  Verified: 307 document bodies identical to their pre-phase-2 state, 0
  differing.
- `scripts/check-frontmatter-delimiter.mjs` is a new guard that asserts the
  fence closes on its own line — the property a strict parser needs and the
  tolerant ones never checked. No baseline: the corpus is at zero today, so
  any reappearance is a regression, not inherited debt.
- The phase 2 script itself was fixed, so re-running it is safe.

## What remains open

1. **The new guard is not in CI.** It runs locally only. Wiring it into the
   workflow is the Oracle's territory (D-017). Until then this protection is
   a script someone has to remember to run.
2. **No guard reads the corpus with a strict parser.** The delimiter check
   closes the specific hole; it does not close the class. A second reader that
   parses every header the way an outside tool would — and disagrees loudly
   when our tolerant reader accepts something it rejects — is the real fix.
3. **The census is unproven for older commits.** The repair verified against
   `d4c2975~1`. Whether earlier migrations left similar tolerant-only damage
   has not been measured.

## Owner

Oracle. Item 1 requires workflow access the agent does not have.

---

## Absorbed: `D-050` — The reference guard cannot see citations to retired prefixes

> Merged into `DBT-010` on 2026-08-31 under `ADR-030`. The identifier `D-050`
> keeps resolving to this document via `absorbs:`; its evidence is preserved
> verbatim below, only its heading levels are demoted.

### What is owed

`scripts/check-references.mjs` verifies that a cited identifier exists. It
recognises identifiers with this pattern:

```js
const ID_RE = /\b(MIS|ADR|DEC|RPT|PRO|DBT|STD|CAN|OPS|BLU|GLD|INF)-(\d{1,4}|\d{4}-\d{2}-\d{2})\b/g;
```

Twelve prefixes — **the twelve `ADR-005` v1.1.0 registers**. None of the
retired ones are there. A citation written under a superseded scheme is not
matched by `ID_RE` at all, so it is never checked, never reported, and never
baselined. It is not a broken reference the guard tolerates; it is a string the
guard does not recognise as a reference.

### Measurement (2026-08-31, at `main`)

Files whose own series the guard cannot verify by identifier:

| Prefix | Files | In `ID_RE`? |
|---|--:|---|
| `MIS` | 127 | yes |
| **`D`** | **38** | **no** |
| `ADR` | 14 | yes |
| **`P`** | **13** | **no** |
| `RPT` | 11 | yes |
| **`AUD`** | **11** | **no** |
| `GLD` | 8 | yes |
| **`O`** | **8** | **no** |
| **`C`** | **7** | **no** |
| `DEC` | 6 | yes |
| **`S`** | **3** | **no** |

**80 of 246 files (32 %)** carry a prefix the guard cannot match.

Sweeping the corpus for citations to identifiers that do not resolve, using the
retired prefixes:

- **131 citations to identifiers that do not exist**, across **19 distinct
  identifiers**, none of them visible to any guard.
- Worst: one extinguished entry cited by **26 files**, another by **13**.

Two subsets of those 131 are **legitimate** and must not be "fixed":

1. **Citations to extinguished debt.** `ADR-030` deletes a `debt/` entry from
   the tree on close and keeps its resolution in a table. A document citing
   `D-0NN` after extinction is citing history, correctly. Roughly 40 of the 131.
2. **Seminal numbering in `canon/`.** `S-002`, `S-006`, `S-008`, `S-010` are
   *seminal document* numbers in `canon/INDEX.md` — a different namespace that
   happens to collide with the retired `standards/` prefix. Not references to
   `standards/` at all.

Netting those out leaves **roughly 90 citations that are genuinely broken** and
that no guard can currently report. The figure is deliberately given as an
order of magnitude: separating the three classes needs the sweep this entry
asks for, and quoting a precise number before doing it would be the same
mistake this entry documents.

### Why it matters

It hid a contradiction in the most-cited document in the corpus. `STD-001` §4.1
prescribed ten prefixes that `ADR-005` v1.1.0 had retired, and cited eight debt
entries that no longer exist. The glossary that governs naming was mandating
names the corpus had abandoned — for a day, while `MIS-125` renamed the corpus
*against* it. **Every guard was green throughout.** The Oracle found it by
reading, which is the failure mode `D-025` and `D-039` both describe.

It also gets worse as `MIS-125` proceeds, in a way that is easy to mistake for
damage. Renaming `debt/` to `DBT-NNN` moves 38 files from an invisible prefix
to a matched one — so citations that were silently unresolvable become
reportable **all at once**. The reference guard will appear to break. It will
not be breaking: it will be seeing, for the first time, what was already there.
Anyone reading that run without this entry will conclude the rename caused the
damage.

### Closes when

The guard can report a citation to a retired prefix — either by matching the
retired schemes and resolving them through a supersession map, or by an
explicit registry of retired prefixes it declares it does not follow — **and**
the corpus has been swept once, with the three classes above separated and the
genuinely broken citations either fixed or baselined with a reason.

### Not to be confused with

**`D-047`** — the resolver matching by basename, so a wrong folder reads green.
That is a *resolution* defect on references the guard does see. This one is a
*recognition* defect: the guard never sees the reference at all. `D-047` closed
by declaring the blindness; this cannot close the same way, because a
declaration does not help a reader who is not there when the run happens.

### State

| | |
|---|---|
| Severity | high — hid a contradiction between the glossary and the decision governing it, with all guards green |
| Owner | Oracle |
| Opened | 2026-08-31, by the Oracle's finding that `STD-001` was out of date |
| Blocks | nothing outright; makes the `debt/` rename look like a regression when it is a revelation |
| Closes when | the guard reports retired-prefix citations, and the corpus has been swept once |

### Adjacent finding, not part of this entry

Six `debt/` entries carry `status: closed` and are **still in the tree**:
`D-014`, `D-024`, `D-025`, `D-047`, `D-048`, `D-049`. `ADR-030` rule 1 says an
operational entry is deleted on close, once its resolution is written in the
ADR, mission or report that closed it — and rule 3 says a closure without a
written resolution does **not** extinguish.

Five of the six were closed today by `MIS-125`, whose closure record is the
mission document; `D-024` predates it. Whether that satisfies rule 1, and
whether extinction happens per-entry or in a batch like the nine of
2026-08-30, is the Oracle's call — deleting six documents is not a decision an
agent takes because a rule appears to authorise it. Recorded here so it is not
lost; it wants its own instruction, not a line in this entry.

---

## Renumbering note, 2026-08-31

This document was `D-039`, and absorbs `D-050`. The `D-` series
was closed and renumbered densely to `DBT-NNN` under `ADR-004` rule 4 and
`ADR-005` v1.1.0 — see `RPT-001` §12. No `D-` number is reused.
