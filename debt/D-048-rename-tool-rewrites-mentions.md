---
id: "D-048"
uid:
title: "The rename tool rewrites mentions as if they were citations"
type: documentation
status: closed
version: "2.0.0"
created: "2026-08-31T15:10:00+02:00"
created_source: "git:f229a4c"
created_confidence: exact
updated: "2026-08-31T16:45:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, tooling, rename, evidence, S-001, D-039, MIS-125]
license: "CC-BY-4.0"
visibility: "public"
severity: high
opened_by: "MIS-125 Stage C, guilds/ rename"
---
# D-048 — The rename tool rewrites mentions as if they were citations

> **Summary:** `rename-series.mjs --apply` substitutes the old id for the new
> one across every citing file as plain text. It cannot tell a live
> cross-reference from a historical record, a counter-example, or a quoted
> string, and rewrites all four identically.
> **Epistemic:** `S-001` §9.1 already draws this distinction — *cite* a
> document versus *mention a name as data*. The corpus states the rule; the
> tool does not implement it.
> **Pragmatic:** Every remaining series in `MIS-125` will hit this. The
> `guilds/` run was 8 files and produced 4 wrong rewrites.

## Measured, on an 8-file rename

`guilds/*/charter.md` and `*/roster.md` → `GLD-001`…`GLD-008`. The rename
itself was correct. Collateral, all caught by review of the staged diff and
reverted:

### 1. Dated forensic evidence — `reports/audits/AUD-2026-08-26-licensing-c005/`

`sbom.spdx` and `cc0-irrevocable.json` are the output of a licensing audit run
on 2026-08-26. The tool rewrote 8 filenames in the SBOM and 8 paths in the CC0
grant record.

The SBOM case is the worst of the four, because the rewrite was **partial**:

```
-FileName: ./guilds/alquimistas/charter.md
+FileName: ./guilds/alquimistas/GLD-001-charter.md
 SPDXID: SPDXRef-7ad40d4f9156864442cb7b863db5da1a
 FileChecksum: SHA1: f692d73cb909b20cd0f814a35d31aeacf4f9b5a1
```

`SPDXID` and `FileChecksum` were left alone. A supply-chain manifest whose
filenames and hashes disagree is not stale evidence — it is **wrong evidence
that still validates as well-formed**. `cc0-irrevocable.json` is worse in kind:
it records which files were placed under CC0 irrevocably, in August, under the
names they carried then.

### 2. A closed mission's narrative — `missions/MIS-118-…` (`status: done`)

> "The reference guard found a 6th live link (`guilds/procuradores/roster.md`)
> that the manual sweep missed."

Rewriting that to `GLD-008-roster.md` asserts that a guard run on 2026-08-28
found a file under a name that did not exist until 2026-08-31.

### 3. A counter-example inside a code comment — `scripts/phase5-…py`

```python
# `BP-cao` or `AUDIT-2026-04-07` are living conventions of their series and the
# guard accepts them; `canon-index` or `charter-alchemists` have no series.
```

became `` `canon-index` or `GLD-001` have no series`` — the comment now names
a well-formed series id as its example of something with no series. The
sentence says the opposite of what it says.

### 4. This mission's own problem statement — `missions/MIS-125-…`

> "**Whether lowercase descriptive ids are legal at all** —
> `charter-alchemists`, `roster-sentinels`, `canon-index` are a second
> convention living alongside the numbered one"

became "…are legal at all — `GLD-001`, `GLD-006`, `canon-index`…". The mission
that exists to replace descriptive ids had its own examples of descriptive ids
replaced, leaving a sentence that refutes itself. **The tool corrupted the
record of the problem it was built to solve.**

## Why the tool cannot currently tell

`--apply` does, for every file citing the id:

```js
content = content.split(p.oldId).join(p.newId);
```

An unanchored global string replace. It carries no notion of:

- **document status** — `closed`/`done` documents are records of a past state
  (`S-001` §2.1: *would a reader in a year be misled about what happened?*);
- **document kind** — `reports/audits/**` is dated evidence, not prose;
- **syntactic position** — inside a fenced block, a code comment, or a quoted
  YAML string, a name is data, not a link (`S-001` §9.1);
- **rhetorical position** — an id given as an *example of a bad id* must not be
  replaced with a good one.

The first three are mechanical. The fourth is not decidable by a script, which
is the real finding: **this tool cannot be made fully safe, only safer.**

## What is wrong versus what is right

`blueprints/BLU-005-archive-fondos.md` was rewritten and the rewrite was **kept**:

```yaml
- { nombre: "Charter — Centinelas", file: "guilds/centinelas/GLD-004-charter.md" }
```

A live manifest the web build reads. A stale path there is a real defect. The
tool is not wrong to rewrite — it is wrong to rewrite *indiscriminately*.

## Resolution options, not yet ruled

1. **Refuse and report.** Skip `reports/audits/**`, any `status: closed|done`
   document, and fenced/comment regions; list every skipped occurrence for
   human decision. Conservative, and would have caught all 4.
2. **Stage and review.** Keep rewriting everything, but emit a per-file
   classification (live citation / historical record / code / fenced) with the
   diff, requiring explicit confirmation. Slower, catches the fourth class
   because a human reads it.
3. **Anchor the substitution.** Replace only in link-like contexts. Reduces
   false positives but silently misses live citations in prose, which is the
   common form in this corpus.

Option 1 plus the review discipline of option 2 is the honest answer. Neither
solves case 4 — an id used as a counter-example is only detectable by reading
the sentence.

## Interim rule, in force now

**Every `--apply` run in `MIS-125` Stage C must have its full staged diff read
before commit, not just its guard exit codes.** All guards were green with all
four corruptions staged: `check-references` cannot see that a rewritten SPDX
hash no longer matches, and `lint-frontmatter` does not read comments. This is
`D-039` exactly — *green means no instrument we own disagreed.*

The `guilds/` run was 8 files. `standards/` is 5, `canon/` 8, `protocols/` 12,
`debt/` 47. The rate of wrong rewrites will not fall on its own.

## State

## Resolution (2026-08-31)

**Both** conditions met, which is why this one closes despite being the high-
severity entry.

### 1. The tool refuses

`scripts/rename-series.mjs` now refuses to rewrite dated evidence (SBOMs, audit
reports, licence dedications, frozen-artefact filenames) and closed records
(`status: done` / `closed` / `superseded`), and prints every refusal:

```
⛔ N occurrence(s) REFUSED — evidence or closed records, deliberately NOT
   rewritten (D-048)
```

Tested against a throwaway copy of the corpus before being trusted: **60
refusals**, `reports/` untouched, no `status: closed` mission modified. The
missions it did rewrite were all `status: active` — correct behaviour, verified
by reading them, not by the exit code.

### 2. The interim rule is now permanent policy

`P-010` §3.4 — *a citation may be rewritten, a mention may not* — with the
citation/mention distinction as a table, the two automatic refusals as rules 1
and 2, and **rule 3: everything else is rewritten and the diff is read.**

### The case that is NOT fixed, and cannot be

Case 4 from the body above: an identifier used **as its own counterexample**.
The `guilds/` run turned

> whether lowercase descriptive ids are legal at all — `charter-alchemists`,
> `roster-sentinels`

into `— GLD-001, GLD-006`, which destroys the sentence's meaning while leaving
it grammatical and green. No pattern distinguishes that from a citation; the
difference lives in the surrounding prose. **This is why rule 3 exists and why
it is not optional.**

So this entry closes with its mechanism in place and its expensive obligation
intact: every remaining Stage C rename requires reading the full staged diff.
Ten series, including `debt/` at 38 files and `missions/` at 131. That cost is
now written into the protocol rather than living in one agent's habits — which
was the point.

| | |
|---|---|
| Severity | high — silently corrupted dated evidence and closed records, with all guards green |
| Owner | Oracle |
| Status | **closed 2026-08-31** — refusals in the tool, policy in `P-010` §3.4 |
| Opened | 2026-08-31, by `MIS-125` Stage C |
| Closed by | `MIS-125`, on the Oracle's instruction (option D) |
| Not closed | case 4 (id as counterexample) is undetectable by tool; `P-010` §3.4 rule 3 covers it by procedure |
