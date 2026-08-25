---
id: "MIS-109"
uid:
title: "Make canon filable: frontmatter, registration and the term divergence"
type: mission
status: done
version: "1.0.0"
created: "2026-08-24T23:10:00Z"
updated: "2026-08-24T23:10:00Z"
author: "ursa"
owner: "oracle"
requested_by: "oracle"
guild: "Exegetes"
territory: "Archive"
priority: "high"
effort: "L"
type_execution: "hybrid"
tags: [canon, frontmatter, registration, terminology, blocker]
license: "CC-BY-4.0"
blocks: "archive restructure phases 1-4"
---
# MIS-109 — Make canon filable

> **Summary:** Nine of fourteen canon documents carry no frontmatter, so they
> cannot be filed by any rule. One of them contradicts itself. This mission
> fixes both, and it runs **before** the restructure, not inside it.
> **Epistemic:** The most-cited series in the corpus is the least classifiable.
> **Pragmatic:** Phases 1–4 of the restructure cannot touch `canon/` until this
> closes.

## Why this is a blocker, not a phase

`AUD-2026-08-24-phase0` §4.2 measured it: `canon/` reads **8.3 % registration
coverage**, and the reason is not wrong identifiers. It is that **there is
nothing to check them against**.

```
2026_04_15-Epistemic_Relations_…-v0.2.0.md    15,619 chars   no frontmatter
2026_04_15-Pragmatic_Numen_System-v0.2.0.md   11,364         no frontmatter
C-006-session-zero.md                         24,132         no frontmatter
Compendium of Attributes and Ranks…           9,042          no frontmatter
C-002-brand-and-culture.md                  53,728         no frontmatter
Platform Role System.md                       8,176          no frontmatter
C-007-rank-specifications.md                        1,282          no frontmatter
C-004-role-structure.md       33,218         no frontmatter
C-001-welcome-to-numinia.md                         30,433         no frontmatter
```

**186,794 characters of foundational text with no `type`, no `id`, no
`license`.** Seven of them also carry spaces in the filename, which makes them
uncitable in plain text without ambiguity — and plain text is how this corpus
cites, 1,617 times.

A restructure that files 246 documents while leaving the founding series
unclassifiable is not a restructure. It is filing the easy half.

## And one of them contradicts itself

`D-012`: `C-001-welcome-to-numinia.md` says *germinal motive* on line 38 and
*operating system* on lines 25, 42 and 105. Line 41 announces the *Regulatory
Model*; line 42 explains it in terms of the term line 38 replaced. Twenty-one
documents corpus-wide still carry `Functional Model`, withdrawn from canon on
2026-05-06 — four of them canon itself.

**The terminology ruling and the frontmatter work belong in the same mission.**
Adding frontmatter to a document whose body contradicts itself just records the
contradiction with better metadata.

## Scope

**In:**
1. Frontmatter for the nine documents, conforming to `S-001` §6.1
2. `C-NNN` registration for `canon/` (`S-001` §4.3, option: register)
3. Filenames without spaces, per `S-001` §9
4. The `D-012` terminology ruling, propagated completely
5. Retire `seminal_id` (Oracle's ruling on the `S-` collision — `S-` belongs to
   `standards/`; the RPG manual's `S-008-md` is the only holder and canon takes
   `C-NNN` regardless)

**Out:** everything the restructure covers. This mission does not move a single
document out of `canon/`.

## The hard part is not the frontmatter

**`type` and `status` are content judgements on foundational text.** Is
`C-007-rank-specifications.md` (1,282 chars, an operational table) the same genre as
`C-002-brand-and-culture.md` (53,728 chars)? `S-001` §2 says `canon/` holds
what the system **is** — and a rank table is arguably `standards/`.

The agent can propose. **The Oracle decides**, because getting it wrong files
the founding documents of the world under the wrong genre, permanently.

`type_execution: hybrid` for exactly that reason.

## Dates are corrected with three fields, never one

**Inherited from `D-021`, and it is an acceptance criterion, not advice.**

`D-012` records 121 documents carrying `created: …T00:00:00Z` — a midnight
nobody wrote at. The tempting fix is to backfill `created` from git and move on.

> **If `created` is filled without declaring which commit it came from, we have
> swapped an invented date for a better-disguised one.**

The reason this is not pedantry is what `D-021` measured. Ten documents written
on 2026-08-24 declared dates their own commits contradicted, and **the sequence
was coherent fiction**: each a plausible minute after the last, crossing
midnight, when the six `D-00N` files had come out of a single commit at 22:07.

**A future reader does not catch that. They take it as read.** A wrong date that
looks arbitrary invites suspicion; a wrong date that looks like a timeline does
not. That is why the provenance field matters more than the value.

So every date this mission touches carries three fields:

```yaml
created: "2026-04-07T13:46:22Z"
created_source: "git:a3f91c2"        # the commit the date came from
created_confidence: "exact"          # or "inferred"
```

`created_confidence: inferred` is mandatory wherever the history crosses
`MIS-066`, which renamed files in bulk: `git log --follow` may resolve to the
rename rather than the original creation. **An inferred date declared as
inferred is evidence. An inferred date declared as exact is a lie with a
citation.**

`D-021` is the worked example — the first document in the archive whose date was
taken from its commit rather than typed. Its frontmatter is the template.

### Acceptance

- [ ] Zero documents in `canon/` with `created` lacking `created_source`
- [ ] Every date that crosses `MIS-066` carries `created_confidence: inferred`
- [ ] `reports/audits/evidence/dates-vs-commits.py` reports zero discrepancies
      across `canon/`

## Acceptance criteria

- [ ] 14/14 canon documents carry frontmatter valid under `S-001` §6.1
- [ ] `canon/` registration coverage at 100 %, measured with
      `count-evidence.py`
- [ ] Zero filenames with spaces in `canon/`
- [ ] One terminology in force; `count-evidence.py` reports zero occurrences of
      the retired term outside `CHANGELOG` and `web/public/archive` (frozen)
- [ ] `check-references.mjs` green — every rename verified, no plain-text
      citation orphaned
- [ ] `D-012` marked RESOLVED with before/after term counts
- [ ] `seminal_id` retired, with the decision recorded in an ADR

## Order

1. **Oracle rules the term** (`D-012` step 1) — nothing else can start
2. Propose `type`/`status` per document → Oracle signs
3. Frontmatter, in one commit per document so a wrong genre is one revert
4. Renames + reference sweep, verified by the lint
5. Term propagation, with counts
6. Close `D-012`, report coverage

## Preconditions

- `S-001` signed (this mission files against its §6.1 and §9)
- `check-references.mjs` in CI — **seven renames with 1,617 plain-text
  citations in the corpus is exactly the operation that needs the net**
