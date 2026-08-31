---
id: "D-021"
uid:
title: "A new rule does not apply itself to whoever writes it"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-24T23:15:34Z"
created_source: "git:84e54a4"
created_confidence: exact
updated: "2026-08-24T23:15:34Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, dates, provenance, guards, self-application, D-012]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "Oracle, 2026-08-24 close of session"
evidence_script: "reports/audits/evidence/dates-vs-commits.py"
evidence_head: "b95536e"
---
# D-021 — A new rule does not apply itself to whoever writes it

> **Summary:** Ten documents written today declare a `created` date their own
> commit contradicts. They were written in the same session that added the rule
> against exactly this.
> **Epistemic:** The finding is not the ten dates. It is that **writing a rule
> confers no compliance with it**, not even on its author, in the hour it was
> written.
> **Pragmatic:** This is the argument for the guard, and it is stronger than any
> count of offending files.

## The finding

The Oracle, closing the session:

> *"You committed `D-012` while writing the rule that forbids it. That is worth
> more as a finding than the ten dates — a new rule does not apply itself to
> whoever writes it, and that is the argument for the guard."*

`D-012` records that 121 documents carry `created: …T00:00:00Z` — a midnight
nobody wrote at. `S-001` §6.2 requires `created_source` and
`created_confidence` so a date can be traced to git rather than asserted.

**The agent then wrote ten documents with hand-invented dates**, several of them
*inside* the entries defining the rule.

## The ten

Measured at `b95536e` against the creating commit of each file.

| Document | Declares | Its commit |
|---|---|---|
| `D-002` — "blocked_reason is orphaned" (closed 2026-08-31, extinguished; full text in git history) | `2026-08-25T00:30` | `2026-08-24 22:07` |
| `debt/D-003-human-approval-score-undefined.md` | `2026-08-25T00:32` | `2026-08-24 22:07` |
| `debt/D-004-semaforo-undefined.md` | `2026-08-25T00:34` | `2026-08-24 22:07` |
| `debt/D-005-confidence-scale-undefined.md` | `2026-08-25T00:36` | `2026-08-24 22:07` |
| `debt/D-006-cost-estimate-no-unit.md` | `2026-08-25T00:38` | `2026-08-24 22:07` |
| `debt/D-007-week-no-year.md` | `2026-08-25T00:40` | `2026-08-24 22:07` |
| `debt/D-019-signatures-not-third-party-verifiable.md` | `2026-08-25T00:05` | `2026-08-24 21:56` |
| `debt/D-020-software-key-for-sealed.md` | `2026-08-25T00:10` | `2026-08-24 21:56` |
| `decisions/ADR-005-prefix-ruling.md` | `2026-08-25T01:30` | `2026-08-24 22:27` |
| `protocols/P-012-ruling-with-a-condition.md` | `2026-08-25T02:00` | `2026-08-24 22:33` |

**Not a clock drift.** System time at the moment of measurement was
`lun 24 ago 2026 23:07 CEST`. The dates were written by hand, each one a
plausible-looking minute after the last, and the sequence is fiction: the six
`D-00N` files were created in a single commit at 22:07, not at two-minute
intervals across midnight.

`D-007` is among them, and `D-007` is the entry about `week` being ambiguous
without a year.

## Why the ten dates are the smaller half

Any of these would have caught it and none existed:

- A guard comparing `created` against the creating commit
- A pre-commit hook filling `created` from git rather than from the author
- A template that leaves `created` empty for a script to fill

The rule was written into `S-001` §6.2 and **enforced on nobody, starting with
its author, in the same hour**. `[MANUAL]` is not a weaker form of `[CI]`: it
means *nothing enforces this*, and the evidence is that its own author did not
comply while writing it.

> A rule that only its author knows about is a rule that only its author can
> break unnoticed. A rule the author breaks while writing it is not yet a rule
> at all — it is a preference with a section number.

## Two more findings from the same close-out

Registered here because they belong to the same pass over the same files.

### `INDEX.md` files declare the wrong `type` — and it is a pattern

`S-001` §3: an index is **apparatus**, `type: meta`.

```
agents/INDEX.md        meta       correct
blueprints/INDEX.md    meta       correct
decisions/INDEX.md     adr        WRONG — an index is not a decision
canon/INDEX.md         seminal    WRONG — an index is not a foundational text
reports/INDEX.md       (no frontmatter)
blueprints/README.md   (no frontmatter)
canon/README.md        (no frontmatter)
```

The Oracle spotted `decisions/INDEX.md` and asked whether it was a pattern
before fixing it alone. **It was**: two wrong, three unclassifiable.
`canon/INDEX.md` claiming `type: seminal` also means the index counts itself as
canon.

### `decisions/INDEX.md` contradicts its own frontmatter

`version: "1.4.0"` against a version history whose last entry is `v1.5.0`. The
document disagrees with itself about what version it is.

## Why none of this was fixed today

Oracle's ruling, three reasons:

1. **These are half of `D-012`, and `D-012` is `MIS-109`.** They travel with the
   frontmatter-less seminals, the filenames with spaces and the renumbering:
   same files, one pass.
2. **A new branch and a script over ten files, with no prior report and no
   signature.** That is the discipline the whole session was built on.
3. **Nothing on top of `main` until the merges were verified.** They now are —
   9 broken / 45 citations, 235/268 licences, 517 pages — but the order
   mattered.

## Closure

Marked RESOLVED when:

1. The ten dates are corrected from git, with `created_source` and
   `created_confidence` per `S-001` §6.2 — inside `MIS-109`
2. The two `type: meta` corrections land, and the three frontmatter-less
   indexes get one
3. `decisions/INDEX.md` agrees with its own history
4. **A guard exists** that compares `created` against the creating commit — the
   part that makes the other three not recur

Item 4 is the entry. The first three are cleanup.

| | |
|---|---|
| Severity | medium — no data lost; the archive's provenance is fiction in ten files |
| Owner | Oracle |
| Blocked by | `MIS-109` for items 1–3; `D-017` for item 4 |
| Opened | 2026-08-24, at the Oracle's instruction on closing the session |
| Closes when | the guard exists and the ten are corrected from git |
