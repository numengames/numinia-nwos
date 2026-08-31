---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-122"
title: "The uid rule contradicts its standard: fix H-09 before anyone obeys it"
status: done
priority: high
effort: S
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: null
completed: "2026-08-30T10:36:00Z"

# REGISTRO
type: mission
version: "2.0.0"
created: "2026-08-30T05:05:00Z"
updated: "2026-08-30T10:36:00Z"
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

> **RESOLVED 2026-08-30.** `H-09` now skips `uid`; `H-20`'s message was
> rewritten to advise what `S-001` §6.2 actually says (*empty the field, keep
> it declared*) instead of the opposite. Baseline **843 → 779**.
>
> Verified in four directions rather than two: a non-`uid` empty field is
> still rejected; an empty `uid` is not; a hand-authored `uid` added to a
> clean file still fails the ratchet; an empty `uid` added to a clean file
> does not. Test file restored byte-identical in every case.
>
> **A claim in this mission was wrong and is corrected here.** It stated the
> guard never scans the repository root. It does — `git ls-files '*.md'`
> returns 326 files including the 12 at root. The real census: **99 documents
> carry `uid`, 65 empty (conformant), 34 with a value**. The "100 vs 98"
> figure came from a different script (`count-evidence.py`), which also
> reports **66 collisions where there are 2** — it counts the empty ones as
> colliding with each other. That is `t_c057d896`, and it is unfixed.

> **Update 2026-08-30 — this mission now has a signed precedent.** While
> writing `ADR-027 (formerly ADR-029)` (which ratifies `S-004`), the guard rejected the ADR
> itself: `H-09` for writing `uid:` and `supersedes:` empty. **The document
> that ratifies the header standard could not be committed while obeying the
> glossary.** Both fields were removed rather than baselined, and the
> incident is recorded inside `ADR-027` as evidence.
>
> This is no longer a theoretical contradiction reported by a census. It has
> now blocked real work, in `main`, twice: once in the experiment on
> `blueprints/AUDIT-numengames-2026-04-08.md`, once on a signed decision.
>
> `ADR-027 (formerly ADR-028)` and `ADR-027` do **not** fix it — neither touches a check. This
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

- [x] **`H-09` exempts `uid`.** The rule keeps firing for every other field —
      an empty value is still not the same as an absent one — and stops
      firing for the one field the standard requires empty. Verified by
      emptying a written `uid` and watching the ratchet hold, the same
      experiment that fails today.

      **Done, `ec4c968` (PR #129).** `H-09` reports **10** findings, **0** of
      them `uid`; the other ten are other fields, so the rule still bites.
      Tested in all four directions per `P-013`: a non-`uid` empty field is
      still rejected; an empty `uid` is not; adding a valued `uid` to a clean
      file makes the ratchet fail; adding an empty one does not.
- [x] **The 64 disappear from the baseline without a single document being
      edited.** That is the proof they were never the corpus's defect. The
      count drops to **779** and no `.md` file changes in the same commit.

      **Done, `ec4c968`.** Baseline **843 → 779**. The commit touches exactly
      two `.md` files — `MIS-121` and this mission — and both are the record
      of the work, not documents being corrected to satisfy the rule. Not one
      of the 64 was edited.
- [x] **One number survives.** `S-001` §6.2 records **32** `uid` present, the
      guard finds **34**, the filesystem has **100** files carrying the
      field. Three figures for one fact. Whichever is correct is measured at
      a named commit with the command written beside it, and the other two
      are corrected or explained.

      **Measured at `7fae24f` — and the answer is that all three were about
      different things.** 326 tracked `.md` files; **99** declare the field,
      not 100 (the hundredth was a miscount, not a file). Of those, **34**
      carry a hand-authored value and **65** are declared-and-empty as
      `S-001` §6.2 requires. The guard's 34 is **exact**: every flagged file
      has a value and every valued file is flagged — 0 false positives, 0
      misses. §6.2's "32" predates two additions and is the figure to
      correct. Reproduced by `/tmp/uid_real.py`; see the note below on how
      this was nearly miscounted a second time.
- [x] **The guard declares its blind spot.** `README.md` and `STANDARDS.md`
      carry `uid` at the repository root and the guard never reaches them —
      which is why 100 files have the field and 98 are flagged. `D-025`
      requires a guard to declare what it cannot see. Either widen the scope
      or write the limitation into the header; do not leave it undeclared.

      **There is no blind spot. This criterion rested on a false premise of
      mine and is closed by disproving it.** The guard walks `git ls-files`,
      which includes the repository root; all 12 root `.md` files are in
      scope. `README.md` does carry a `uid` and **is** flagged — it appears
      in `--report`. `STANDARDS.md` carries none. Nothing is undeclared
      because nothing is unseen, so `D-025` does not apply here.
- [x] **`MIS-121` is unblocked.** Its `H-20` check — emptying the 34
      hand-authored values, 2 of them colliding — can start the moment this
      closes, and not before.

      **Unblocked.** Emptying a `uid` no longer converts an `H-20` into a new
      `H-09`, which was the exact deadlock. The 34 remain in the baseline as
      declared work, and the 2 colliding values are
      `018ef820-0062-…` and `018ef820-0001-…`, each appearing twice.

```bash
# Verified at 7fae24f, 2026-08-30
node scripts/lint-frontmatter.mjs --report | grep -c '^H-09.*uid'
# baf188b: 64 · now: 0, with zero .md files modified

node scripts/lint-frontmatter.mjs --report | grep -c '^H-20'
# 34 — exactly the 34 files carrying a hand-authored value
```

### A counting trap worth writing down

The census above was nearly wrong a second time, in a new way. The obvious
regex for reading the field —

```python
re.search(r'^uid:\s*(.*)$', frontmatter, re.M)   # WRONG
```

— reports **99 files with a value and 0 empty**, which is the exact opposite
of the truth. `\s*` matches across the newline, so an empty `uid:` silently
captures the *next* line: `README.md` came back with `uid: title: "numinia-nwos"`.
The fix is to keep the match on one line:

```python
re.compile(r'^uid:[ \t]*([^\n]*)$', re.M)        # RIGHT
```

This is the same class of defect as `count-evidence.py`'s 66 phantom
collisions: **a measuring instrument that is wrong reads as a corpus that is
wrong**, and it argues for editing 65 documents that were already correct.
Both were caught by cross-checking one instrument against another — the
guard's 34 against the filesystem's — rather than by trusting either alone.

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
