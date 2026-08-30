---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-122"
title: "The uid rule contradicts its standard: fix H-09 before anyone obeys it"
status: todo
priority: high
effort: S
guild: "Alchemists"
territory: "Standards"
type_execution: digital
assigned_to: null
completed: null

# REGISTRO
type: mission
version: "1.0.0"
created: "2026-08-30T07:05:00Z"
updated: "2026-08-30T07:20:00Z"
author: "ursa"
owner: "oracle"
tags: [standards, frontmatter, uid, s-001, guard]
license: "CC-BY-4.0"

paths: [scripts/lint-frontmatter.mjs, standards/S-001-glossary.md, standards/S-004-header-standard.md]
---
# MIS-122 — Fix the `uid` rule before anyone obeys it

> **Summary:** `S-001` §6.2 requires `uid` declared and left empty. The guard
> flags exactly that form as a violation and advises the opposite. 64
> documents are being counted as debt for obeying the standard.
> **Epistemic:** a guard that punishes conformity does not measure the
> corpus, it measures itself. Every number it produces about `uid` is wrong
> in a direction nobody can see from the count alone.
> **Pragmatic:** `MIS-121` cannot empty a single `uid` until this is fixed —
> doing so converts an `H-20` into a new `H-09` and the ratchet rejects it.
> **Audience:** Agents · Oracles

> **Update 2026-08-30 — this mission now has a signed precedent.** While
> writing `ADR-029` (which ratifies `S-004`), the guard rejected the ADR
> itself: `H-09` for writing `uid:` and `supersedes:` empty. **The document
> that ratifies the header standard could not be committed while obeying the
> glossary.** Both fields were removed rather than baselined, and the
> incident is recorded inside `ADR-029` as evidence.
>
> This is no longer a theoretical contradiction reported by a census. It has
> now blocked real work, in `main`, twice: once in the experiment on
> `blueprints/AUDIT-numengames-2026-04-08.md`, once on a signed decision.
>
> `ADR-028` and `ADR-029` do **not** fix it — neither touches a check. This
> mission is still the fix.

---

## Base commit

**`baf188b`** — where `node scripts/lint-frontmatter.mjs --report` returns
**64** `H-09` findings on `uid` and **34** `H-20`, and where emptying any
written `uid` fails the ratchet.

---

## Scope

The rule, not the corpus. This mission changes **one guard rule and the
numbers that describe it**. It does not edit a single document's `uid`.

**In scope:** the `H-09` exemption for `uid`; the disagreement between
`S-001` §6.2 (32), the guard (34) and the filesystem (100 files carrying the
field); the guard's inability to see the repository root.

**Out of scope:** emptying the 34 written values — that is `MIS-121`, and it
runs **after** this. Also out of scope: building the UID system. Not one
identifier is generated here.

> **Scope and Acceptance criteria are written now and are not edited
> afterwards.** What happens goes in `Closure`.

---

## The contradiction, stated exactly

`S-001` §6.2, *Reserved: `uid`*:

> **The field is declared and left empty.** Oracle decision, non-negotiable.

`scripts/lint-frontmatter.mjs`, `H-09`:

> `empty value written for "uid" — omit the field instead`

One says declare it empty. The other says a declared-empty field is a
defect. **64 documents are penalised for compliance.**

Reproduced and reverted at `baf188b`:

```bash
# blueprints/AUDIT-numengames-2026-04-08.md, uid emptied per S-001 §6.2
node scripts/lint-frontmatter.mjs
# NEW violations (not in baseline) — the ratchet fails:
#   H-09 … :: empty value written for "uid" — omit the field instead
```

The corpus is not what is broken here.

---

## Acceptance criteria

- [ ] **`H-09` exempts `uid`.** The rule keeps firing for every other field —
      an empty value is still not the same as an absent one — and stops
      firing for the one field the standard requires empty. Verified by
      emptying a written `uid` and watching the ratchet hold, the same
      experiment that fails today.
- [ ] **The 64 disappear from the baseline without a single document being
      edited.** That is the proof they were never the corpus's defect. The
      count drops to **779** and no `.md` file changes in the same commit.
- [ ] **One number survives.** `S-001` §6.2 records **32** `uid` present, the
      guard finds **34**, the filesystem has **100** files carrying the
      field. Three figures for one fact. Whichever is correct is measured at
      a named commit with the command written beside it, and the other two
      are corrected or explained.
- [ ] **The guard declares its blind spot.** `README.md` and `STANDARDS.md`
      carry `uid` at the repository root and the guard never reaches them —
      which is why 100 files have the field and 98 are flagged. `D-025`
      requires a guard to declare what it cannot see. Either widen the scope
      or write the limitation into the header; do not leave it undeclared.
- [ ] **`MIS-121` is unblocked.** Its `H-20` check — emptying the 34
      hand-authored values, 2 of them colliding — can start the moment this
      closes, and not before.

```bash
node scripts/lint-frontmatter.mjs --report | grep -c '^H-09.*uid'
# baf188b: 64 · target: 0, with zero .md files modified
```

---

## Why this is separate from MIS-121

Ruled 2026-08-30: **no document should carry a `uid` value; where one exists
it is debt, not data — and removing those values is part of `MIS-121`.**

What is *not* part of it is this. `MIS-121` is arithmetic on a settled
standard: it moves keys between conforming forms and verifies the count went
down. Here the standard and its guard contradict each other, and the fix is
normative — a rule changes meaning. Letting that ride inside a burn-down
would disguise a rule change as a cleanup, and the baseline would drop by 64
with nobody able to say which of those were fixed and which were merely
stopped being counted.

The ordering is mechanical, not editorial. Until `H-09` is fixed, emptying a
`uid` **fails CI**.

---

## Note on this mission's own status

Filed `status: todo`, which `S-001` §9 declares and the guard accepts.
**It will therefore appear in no column of the board** —
`MissionsView.astro` renders `in-progress`, `in-review`, `backlog`, `done`,
and maps `draft → backlog`. Nothing maps `todo`.

A new mission today is **conforming or visible, not both**: filing it
`backlog` would add a 51st `H-04` violation to a baseline that only goes
down. This is `D-009` seen from the other end, and it is recorded here
because writing this file discovered it.

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:**
