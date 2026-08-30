---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-121"
title: "Burn the header baseline down: 843 frozen violations to zero"
status: in-progress
priority: high
effort: XL
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
completed: null

# REGISTRO
type: mission
version: "1.1.0"
created: "2026-08-30T06:43:00Z"
updated: "2026-08-30T08:15:00Z"
author: "ursa"
owner: "oracle"
tags: [archive, frontmatter, s-004, migration, debt]
license: "CC-BY-4.0"

paths: [scripts/lint-frontmatter.mjs, scripts/frontmatter-baseline.json, standards/S-004-header-standard.md, debt/, missions/, web/src/content.config.ts]
---
# MIS-121 — Burn the header baseline down

> **Summary:** `S-004` is now enforced by a guard in CI, and the guard froze
> **843 existing violations** so it could ratchet instead of cliff. This
> mission spends that baseline down to zero.
> **Epistemic:** the baseline's size is the corpus's public entropy metric.
> Each number that leaves it is a defect that can no longer come back.
> **Pragmatic:** a corpus whose headers all conform can be queried, filtered
> and rendered by rule instead of by exception.
> **Read the sequencing before scheduling any of it.** Measuring the values
> rather than the counts showed that **798 of the 843 are blocked on a
> decision, not on effort**, and only **45 are mechanical**: `territory` has
> no working vocabulary to migrate into (blocker 4), `uid` cannot be emptied
> until `MIS-122` fixes the rule (blocker 1), `H-30` is 62 separate
> judgements wearing one number, and `H-04` is four unrelated lifecycles.
> The arithmetic is in *Sizing* below. This mission is mostly a decision
> queue with a script attached, and scheduling it as a cleanup sprint would
> fail in its first week.
> **Audience:** Agents · Oracles

---

## Base commit

**`bc76270`** — before any of this work started. Every criterion below is
false there. Two are true at the time of writing because their checks have
already been executed inside this mission; they are marked `[x]` with their
evidence, not silently dropped.

At `bc76270`: guard written but **not wired**, baseline **844**.

---

## Scope

The frontmatter of every tracked `.md` file that `scripts/lint-frontmatter.mjs`
inspects, and the standards, decisions and web schema that a header migration
forces to move with it.

**In scope:** the sixteen check classes `H-00`…`H-31`; the baseline file; the
debt entries that already register individual classes (`D-002`, `D-008`,
`D-009`, `D-010`, `D-012`); the Astro content schema where a field rename
would otherwise break the board.

**Out of scope:** changing what `S-004` *says* — the `H-09` rule that
punishes the conforming empty `uid` is a normative fix and lives in
`MIS-122`. Emptying the 34 written `uid` values is **in** scope (blocker 1).
Also out of scope: the *content* of any document. This mission moves keys
and values in frontmatter. It does not rewrite prose, retitle documents, or
change what a document says. Where a header value cannot be corrected without
a judgement about meaning, the mission stops and asks the Oracle.

> **Scope and Acceptance criteria are written now and are not edited
> afterwards.** What happens goes in `Closure`.

---

## Acceptance criteria

Each check is one class of violation, sized from the baseline at `843`.
Order is deliberate: mechanically safe first, contested last.

```
✓  node scripts/lint-frontmatter.mjs --report | grep -c '^H-'   returns 0
   (at bc76270: 844 · today: 843)

   There is no floor. Emptying the 34 written uid values is in scope
   (Oracle, 2026-08-30); the 64 conforming ones stop being findings when
   MIS-122 fixes the rule that miscounts them.
```

### Blockers already cleared

- [x] **The guard runs in CI.** Without it a migration cannot be verified and
      regressions re-enter silently.
      *Evidence:* `D-017` closed; `ci.yml` step `header lint`; run
      [`33276755484`](https://github.com/numengames/numinia-nwos/actions/runs/33276755484)
      green on `main` at `baf188b`. False at `bc76270`, where `ci.yml` had
      four steps and none of them this one.
- [x] **The baseline is honest.** It was reporting `1 baselined finding(s)
      healed` on every run — a stale number is not a metric.
      *Evidence:* `844 → 843`, banked in `#125` and this branch. The count
      only ever goes down.

### Ruled 2026-08-30 — these go first, and in this order

- [ ] **A · The template family stops emitting defects — 9.**
      `TEMPLATE.md`, `TEMPLATE-EXAMPLE.md`, `TEMPLATE-CHANGES.md`. First
      because every mission copied from them inherits what they carry: fixing
      them last means draining a baseline that refills from its own source.
      `area → territory` ×2, placeholder dates given a real ISO time ×6,
      `type: standard` in `missions/` ×1. Smallest check in the mission and
      the one with the largest half-life.
- [ ] **B · `debt/` adopts the declared lifecycle — 37.**
      `open → active` ×35, `resolved → closed` ×2, against the
      `[draft active closed]` cycle `S-004` already gives
      `type: documentation`. Two entries need reading, not renaming: one
      carries the literal `status: cancelled  →  status: frozen`, another a
      trailing comment that corrupts the value (`D-016` territory).
      Publishing is **not** affected: `corpus.ts` gates `debt/` on
      `visibility`, never on `status`, and 37 of 38 entries declare
      `visibility: "public"`.

### Mechanical classes — measured, and most of them are not mechanical

**Correction, 2026-08-30.** An earlier draft of this mission called these
five classes "mechanical, a script can do them". That was written from
finding *counts*, not from finding *values*. Measuring the values killed the
claim: **only one of the five is a rename.** The rest are decisions wearing a
rename's clothes, and the numbers below say how many decisions each is.

- [ ] **`H-31` retired fields — 158, of which `area → territory` is 142 and
      only 66 are a rename.** The other keys (`blocked_reason` ×7, five
      Spanish-era keys ×9) are deletions and genuinely mechanical.
      **`area` is not.** Measured across 142 documents, 35 distinct values:

      | | |
      |---|---|
      | map 1:1 onto `S-001` §7 `territory` | **66** |
      | compound — `Platform / numinia-web`, `CAO / Product`, one with `{a\|b\|c}` | **43** |
      | orphan — `web` ×12, `Documentation` ×9, `Operations` ×5, `Ops`, `Business`, `Strategy` | **33** |

      `S-001` §7 already diagnosed the compounds: *"the slash reveals the
      field doing two jobs: functional domain plus technical surface."*
      **76 of the 142 need a judgement, not a rename** — and this is exactly
      what `D-010` says it is blocked on. This check is therefore three
      pieces of work: 66 renames, 33 vocabulary decisions, 43 field splits.
      Do not schedule it as one.

      **A worse finding, and it is not this mission's to fix.**
      `S-001` §7 declares `territory` as `CAO · Product · Platform ·
      Infrastructure · Content · Sales · Funding · Archive`. The 67
      documents that already carry `territory` use `Archive` ×48, `Canon` ×8,
      `Infrastructure` ×4, `Legal` ×3, `Governance` ×2, `Standards` ×2.
      **`Canon`, `Legal`, `Governance` and `Standards` are not in the
      declared vocabulary; `CAO`, `Product`, `Platform`, `Content`, `Sales`
      and `Funding` are used by nobody.** The field the migration targets is
      itself undeclared, and the guard never checks the value — `H-31` only
      checks the key. Migrating `area` into `territory` today pours 142
      documents into a vocabulary that does not exist as written. **The
      vocabulary must be settled before this check starts.**

      **Coupled to the web:** `content.config.ts` declares `area` in three
      collections; the rename lands with the schema or the build drops the
      field.

- [ ] **`H-09` empty values — 74.** 64 are `uid` and clear with `MIS-122`'s
      rule fix, not with an edit. This check owns the remaining **10**.
- [ ] **`H-30` unregistered fields — 111 across 62 distinct field names.**
      Not a class: a queue of 62 decisions. Only `visibility_reason` ×11,
      `threshold` ×9, `adr_id` ×8 and `semaforo` ×7 appear more than four
      times; **44 of the 62 appear exactly once.** A one-off field is a
      judgement about whether the document needed it — `register` or `remove`
      is a call per field, and roughly a dozen are Spanish-era leftovers
      (`iconografia`, `presupuesto_lectura`, `edicion_razonada`) that belong
      with `C-005`, not here. **Sequence this last, or split it out.**
- [ ] **`H-04` status vocabularies — 118, in four independent groups.**
      50 `backlog` + 5 `draft` in missions (`D-009`), 35 `open` + 2
      `resolved` in `debt/` (check **B**), 19 `published` in reports, and a
      tail: `designed` ×3, `provisional`, `done`, plus **2 documents missing
      `status` entirely** (`canon/C-005-licensing.md`,
      `standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md`) that the same check
      code reports. Each group is a different lifecycle question. Only
      `debt/` is settled (ruled 2026-08-30).
      **Coupled to the web:** `MissionsView.astro` keys its columns off
      `backlog` and maps `draft → backlog` explicitly; renaming the value
      without moving that map empties a column on the live board.
- [ ] **`H-03` types outside the closed vocabulary — 24.** `decision` ×6,
      `technical` ×4, `roster` ×4, `standard` ×3, `proposal` ×2, `audit` ×2,
      `template` ×1, plus the same 2 documents that are missing `type`
      outright. `roster` ×4 is what `guilds/` calls itself; whether the
      closed vocabulary is wrong or the documents are is a decision, not a
      substitution.
- [ ] **`H-05` `v`-prefixed SemVer — 7, `H-17` type/folder mismatch — 4,
      `H-13` `git:pending` — 3, `H-18` unregistered subtype — 1.**
      *These* are mechanical. 15 findings, no judgement.
- [ ] **`H-20` non-empty `uid` — 34.** The hand-authored pseudo-UUIDv7
      values, 2 of them colliding. `uid: "018ef820-…"` → `uid:`. `S-001` §6.2
      already states the disposal: *"the 32 legacy values are removed, not
      preserved: they were never identifiers."*
      **Ordering constraint (`MIS-122` first), measured not assumed:**
      emptying one of them today produces `H-09 :: empty value written for
      "uid" — omit the field instead`, a **new** violation the ratchet
      rejects. Verified on `blueprints/AUDIT-numengames-2026-04-08.md`, then
      reverted. So this check **cannot start until `MIS-122` fixes the `H-09`
      rule** — not a preference, a mechanical block. Trading 34 `H-20` for 34
      `H-09` would also leave the count unchanged.

### Judgement classes — no script decides these

- [ ] **`H-06`/`H-07` invented dates — 252.** `created` with a midnight
      nobody wrote at (182) and `updated` with no time at all (70). `S-001`
      §8 governs: backfill from git, report the commit each date comes from,
      mark inferred ones, **never invent a date to fill the field**.

      **Measured, and the news is better than expected — with a catch.**
      All 182 `H-06` files have a first-commit timestamp in git; none is
      unrecoverable. But those 182 files resolve to only **42 distinct
      timestamps**, the largest bucket being 49 files sharing
      `2026-08-17T14:12:00Z`. That is the signature of bulk imports, not of
      182 authoring events. The git date is **honest about the commit and
      silent about the writing** — it says when the file entered the
      repository, which for a migrated corpus is not when it was created.

      So the backfill is derivable but not automatic: each date must be
      marked as inferred-from-commit, and `S-001` §8's requirement to
      *"report the commit each date comes from"* is what keeps it honest.
      A bulk rewrite that silently stamps 49 documents with one identical
      timestamp would replace an obvious lie with a plausible one — which is
      `D-021`'s exact failure mode, and worse than the defect.
- [ ] **`H-00` no frontmatter — 12** and **`H-01` missing `id` — 41.**
      **Measured: 25 of the 41 are in `agents/`**, including `_template/`
      files, plus `guilds/` ×8 and README/INDEX apparatus. Giving apparatus a
      registered identifier is a filing decision (`S-001` §5.0 already
      exempts some), and **`check-references.mjs` reads frontmatter `id`** —
      minting ids creates references that must then resolve.
- [ ] **`H-02` missing `title` — 2**, **`H-08` missing `license` — 2.**

Every criterion above is falsifiable by:

```bash
node scripts/lint-frontmatter.mjs --report | grep -c '^H-NN '
```

---

## Sizing — 798 decisions, 45 substitutions

Every number below was read from `lint-frontmatter.mjs --report` at
`baf188b` by grouping *values*, not counts. The two columns sum to 843.

| Class | Blocked on a decision | Mechanical | What the decision is |
|---|---:|---:|---|
| `H-06`/`H-07` dates | **252** | — | git gives a date for all 182 `H-06` files, but they collapse to **42 distinct timestamps** (49 share one). Commit date ≠ authoring date; the convention for marking inferred dates is the decision |
| `H-04` status | **118** | — | four unrelated lifecycles (missions, debt, reports, tail) |
| `H-30` unregistered | **111** | — | 62 distinct fields, 44 appearing once — register or remove, per field |
| `H-31` `area` | **142** | — | 66 renames blocked on the vocabulary, 43 compounds, 33 orphans |
| `H-09` `uid` | **64** | — | clears with `MIS-122`'s rule fix, no edit |
| `H-01` ids | **41** | — | which apparatus gets a registered identifier |
| `H-20` `uid` | **34** | — | ordered behind `MIS-122` |
| `H-03` types | **24** | — | is the closed vocabulary wrong, or the 24 documents? |
| `H-00` no frontmatter | **12** | — | same filing question as `H-01` |
| `H-31` other retired keys | — | **16** | `blocked_reason` ×7 + 5 Spanish-era keys ×9 — deletions |
| `H-09` non-`uid` | — | **10** | drop the empty key |
| `H-05` `v`-prefix | — | **7** | strip one character |
| `H-17` type/folder | — | **4** | |
| `H-13` `git:pending` | — | **3** | |
| `H-02`, `H-08`, `H-18` | — | **5** | |
| **Total** | **798** | **45** | |

**The ratio is the finding.** 95% of this baseline is not cleanup work. The
earlier estimate — *"~350 of 843 automatable, 2–3 h with an idempotent
script"* — was produced by reading finding counts and assuming a class with
one code shares one fix. It was wrong by an order of magnitude, and it is
recorded here rather than corrected silently because the schedule built on
it would have failed in week one.

**What this means for order:** checks **A** (9) and **B** (37) are the only
substantial work that is both unblocked and decided. After them the mission
runs out of things it can do without the Oracle. Blocker 4 (`territory`)
gates the single largest class.

---

## Coupling map — what breaks if a header moves alone

Measured at `baf188b`, not assumed. **Two of the sixteen classes touch code
outside `missions/`; the other fourteen are text-only.**

| Consumer | Reads | Breaks on |
|---|---|---|
| `web/src/content.config.ts` | `area` in 3 collections (`missions`, `blueprints`, `decisions`) | **`H-31`** — rename `area → territory` without the schema and the build drops the field |
| `web/src/views/MissionsView.astro` | `status`, maps `draft → backlog`, four columns | **`H-04`** — rename `backlog` and a live column empties |
| `web/src/lib/corpus.ts` | `visibility` in `debt/` only | nothing here — it never reads `status` |
| `scripts/count-evidence.py` | `area`, `status`, `uid`, `created` | reports the old names; it measures, so it degrades quietly rather than failing |
| `scripts/check-references.mjs` | frontmatter `id` | **`H-01`** — inventing ids creates references that must then resolve |
| `scripts/check-license-frontmatter.mjs` | `license` vs `REUSE.toml` | **`H-08`** — 2 findings, already at the edge of this guard |
| `scripts/lint-frontmatter.mjs` | everything | itself; the baseline is the ledger |

**300 files carry at least one finding**, out of 322 tracked `.md`. By
folder: `missions/` 124, `debt/` 38, `reports/` 25, `agents/` 25,
`blueprints/` 24, `decisions/` 15, `protocols/` 13, `canon/` 12,
`operations/` 10, `guilds/` 8, `standards/` 5, `infra/` 1.

This is not a corner of the repository. It is the repository's filing system,
and that is the argument for doing it by class rather than by folder: a class
is one rule applied 158 times and verified once.

---

## Blockers, and how they were ruled

Small, specific, each one stopping a class of work. **Three were ruled on
2026-08-30; the fourth was found while measuring them and is unruled.** The
rulings are recorded here rather than in a chat log, because a mission that
hides its decisions makes the next reader guess.

> **Update 2026-08-30 — two of these blockers were decided the same day.**
> `ADR-028` (*absence is declared, not omitted*) rules that a field may carry
> `"TBA"` when the value applies but is not yet decided, and that no closed
> vocabulary ships without a check. `ADR-029` ratifies `S-004`
> (`draft` → `active`, `1.0.0`) and admits `type: agent`, which the guard was
> already enforcing without a decision.
>
> Consequence for this mission: **the 142 `area` → `territory` findings are
> unblocked without settling the `territory` vocabulary** — 66 map 1:1 and
> take their value, the other 76 take `"TBA"` and name the mission that
> resolves them. The `territory` vocabulary itself stays unruled (`D-010`).
>
> Neither ADR changes any check. `MIS-123` is the mission that implements
> them; until it lands, `"TBA"` is legal prose that no instrument counts.

1. **`uid` — the values are debt, the rule is broken. Ruled 2026-08-30.**
   **No document should carry a `uid` value. Where one exists it is debt, not
   data; the field is declared and left empty. Emptying the 34 written values
   belongs to THIS mission.** The ruling restates `S-001` §6.2 verbatim —
   *"the field is declared and left empty, Oracle decision, non-negotiable"* —
   so nothing new is being decided; what is new is that the guard does not
   agree with it.

   **The guard punishes the conforming form.** `H-09` fires on `uid:` written
   empty and says *"omit the field instead"*, which is the opposite of what
   the standard requires. **64 of those findings are documents doing exactly
   what `S-001` §6.2 mandates.** The remaining 34 (`H-20`) are the real
   defect: hand-authored pseudo-UUIDv7 values, 2 of them colliding.

   **Measured, not assumed — and it sets the order.** Emptying a written
   `uid` today converts an `H-20` into a **new** `H-09` the ratchet rejects.
   Verified on `blueprints/AUDIT-numengames-2026-04-08.md` and reverted. The
   work is therefore blocked mechanically, not by preference:

   | | |
   |---|---|
   | `MIS-122` | fixes the `H-09` rule so the empty form conforms. **Must go first.** 64 findings vanish with the rule, not with any edit. |
   | This mission | empties the 34 values. Cannot start before that. |

   The split is not about who owns `uid` — it is that changing a rule and
   obeying a rule are different acts, and one must precede the other.

   Two numbers that disagree, for `MIS-122` to settle: `S-001` §6.2 records
   **32** present, the guard finds **34**, and 100 tracked files carry the
   field.

   **Blind spot found while measuring:** the guard flags 98 of those 100.
   `README.md` and `STANDARDS.md` sit at the repository root and it never
   reaches them — worth registering against `D-025`, which requires a guard
   to declare what it cannot see.
2. **The debt series runs an undeclared status vocabulary.** 35 `open` +
   2 `resolved` against `type: documentation`, whose lifecycle is
   `[draft active closed]`. Adjacent to `D-008` and `D-012`.
   **Ruled: fix the entries, not the standard — `debt/` adopts the declared
   lifecycle.** `open → active`, `resolved → closed`. The vocabulary the
   series was already using informally becomes the one the standard names.
   No new lifecycle is minted. Check **B** below.
3. **The template family still emits violations.** Three files —
   `TEMPLATE.md`, `TEMPLATE-EXAMPLE.md`, `TEMPLATE-CHANGES.md` — produce
   **9 findings** between them, and every mission copied from them inherits
   the defects: `area:` retired (×2), placeholder dates that are not ISO
   times (×6), `type: standard` in `missions/` (×1).
   **Ruled: fix the templates first.** Otherwise the baseline refills from
   the template while it is being drained. Check **A** below — it goes
   before everything else for exactly that reason.

4. **`territory` has no working vocabulary — found 2026-08-30, unruled.**
   `S-001` §7 declares eight values: `CAO · Product · Platform ·
   Infrastructure · Content · Sales · Funding · Archive`. The 67 documents
   already carrying `territory` use `Archive` ×48, `Canon` ×8,
   `Infrastructure` ×4, `Legal` ×3, `Governance` ×2, `Standards` ×2.

   **Four values in use are undeclared. Six declared values are used by
   nobody.** The overlap between the declared vocabulary and the practised
   one is two entries out of eight. Nothing catches this: `H-31` checks that
   the *key* `area` is retired, and no check reads the *value* of
   `territory` at all. §7 says *"a value not listed here is not valid.
   Adding one requires an ADR"* — so 19 documents are invalid by a rule
   nothing enforces.

   `area` is worse: 142 documents, 35 distinct values, of which 66 map to a
   declared `territory`, 43 are compound (`Platform / numinia-web`) and 33
   are orphans (`web` ×12, `Documentation` ×9, `Operations` ×5).

   **The consequence for scheduling is hard.** `H-31` is the largest single
   class (158) and the one that looked most mechanical, and it is blocked:
   migrating `area` into `territory` today pours 142 documents into a
   vocabulary that does not describe what the repository actually files. The
   destination has to be settled — by ADR, per §7 — before the migration is
   worth running. **This is the real content of `D-010`,** which says it is
   blocked on a decision and does not name it.

   *Needs an Oracle ruling: does the declared vocabulary change to match
   practice, does practice change to match the declaration, or does the
   compound case become two fields as §7 suggests?* Not answered here.

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:**
