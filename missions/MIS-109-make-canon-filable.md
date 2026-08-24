---
id: "MIS-109"
uid:
title: "Make canon filable: frontmatter, registration and the term divergence"
type: mission
status: todo
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
About Session Zero.md                         24,132         no frontmatter
Compendium of Attributes and Ranks…           9,042          no frontmatter
Numinia Brand and Culture.md                  53,728         no frontmatter
Platform Role System.md                       8,176          no frontmatter
Rank Specifications.md                        1,282          no frontmatter
Role structure in the Numinia system.md       33,218         no frontmatter
Welcome to Numinia.md                         30,433         no frontmatter
```

**186,794 characters of foundational text with no `type`, no `id`, no
`license`.** Seven of them also carry spaces in the filename, which makes them
uncitable in plain text without ambiguity — and plain text is how this corpus
cites, 1,617 times.

A restructure that files 246 documents while leaving the founding series
unclassifiable is not a restructure. It is filing the easy half.

## And one of them contradicts itself

`D-012`: `Welcome to Numinia.md` says *germinal motive* on line 38 and
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
`Rank Specifications.md` (1,282 chars, an operational table) the same genre as
`Numinia Brand and Culture.md` (53,728 chars)? `S-001` §2 says `canon/` holds
what the system **is** — and a rank table is arguably `standards/`.

The agent can propose. **The Oracle decides**, because getting it wrong files
the founding documents of the world under the wrong genre, permanently.

`type_execution: hybrid` for exactly that reason.

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
