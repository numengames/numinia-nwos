---
id: "MIS-125"
title: "The prefix register — four series carry identifiers no rule knows about"
type: mission
status: in-progress
version: "1.4.0"
created: "2026-08-30T11:50:00Z"
created_source: "git:b09311c"
created_confidence: exact
updated: "2026-08-31T18:10:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC-BY-4.0"
territory: "Archive"
guild: "Exegetes"
tags: [governance, identifiers, prefixes, adr-005]
priority: medium
effort: M
type_execution: digital
---

# MIS-125 — The prefix register

## Why this mission exists

The Oracle, 2026-08-30, on being shown three misplaced prefixes:

> *"I'd put all the prefixes there. We have a problem, because I've seen it in
> several places too, and they have to be put in and decided properly. It
> doesn't need doing in this first pass if we can avoid it."*

He was right, and the measurement is worse than the three files that prompted
it. **This mission exists because the Oracle saw a pattern where I had reported
an incident.**

## The measured problem

`ADR-005` registers a prefix per series. `lint-frontmatter.mjs` implements it:

```
missions: MIS   ·  decisions: ADR|DEC  ·  protocols: P   ·  debt: D
standards: S    ·  canon: C            ·  agents: AG     ·  reports: RPT|AUD
```

Eight series registered. **The corpus carries identifiers in at least twelve**,
verified at `b09311c`:

| Series | Registered | Actually carried |
|---|---|---|
| `missions/` | `MIS` | `MIS` ×126, **`ANNEX` ×1, `PROP` ×1** |
| `reports/` | `RPT`, `AUD` | `AUD` ×11, `RPT` ×10, **`PROP` ×1** |
| `blueprints/` | **— not registered —** | `BP` ×16, `AUDIT` ×2, `WARDLEY` ×1, `blueprints` ×1 |
| `operations/` | **— not registered —** | `O` ×8, `ops` ×2 |
| `guilds/` | **— not registered —** | `charter` ×4, `roster` ×4 |
| `infra/` | **— not registered —** | `INFRA` ×1 |
| `decisions/` | `ADR`, `DEC` | + `decisions` ×1 |
| `canon/` | `C` | `C` ×6, **`canon` ×4** |
| `protocols/` | `P` | `P` ×13, **`APR` ×1** |

**Four whole series carry identifiers that no rule has ever seen**:
`blueprints/`, `operations/`, `guilds/`, `infra/`. Between them, 39 documents.

The three misplaced files that started this — `ANNEX`, `PROP` ×2 — are the
visible tip. The register itself is the problem.

## What this mission decides

For every series that carries identifiers:

1. **Which prefix is canonical**, including the ones nobody has ruled on
   (`BP`? `blueprints`? neither?)
2. **Whether lowercase descriptive ids are legal at all** — `charter-alchemists`,
   `roster-sentinels`, `canon-index` are a second convention living alongside
   the numbered one
3. **What happens to a document whose prefix does not match its folder** —
   move it, retire it, or register the prefix
4. **Whether the register belongs in `ADR-005` as an amendment or in `STD-004`
   as a table** — `STD-004` is where the ring tables already live

## Acceptance criteria

- [x] Every series carrying identifiers appears in the register — twelve, not
      eight. **Done**: `ADR-005` v1.1.0 (Oracle, 2026-08-31) registers twelve,
      and `STD-001` §4.1 was corrected to match on the same day — it had been
      carrying the superseded eight.
- [ ] Every `id` in the corpus matches its series' registered prefix, or its
      exception is declared and dated
- [ ] The check is live in `lint-frontmatter.mjs` and fails in both directions
      (`P-013`)
- [ ] `H-01` prefix findings reach zero, and the count is measured against the
      filesystem, not the baseline file alone

## Dependencies

- **Not blocked.** Independent of the header burndown.
- **Overlaps `D-008` — verified, not assumed.** `D-008` is titled *"Four series
  carry a registration scheme the corpus does not yet apply"* and names the same
  four unregistered series this mission measured independently. **This mission
  is the execution of `D-008`, not a second opinion on it.** Read `D-008` first;
  if it already answers question 1, this mission inherits the answer rather than
  re-deciding it.

## The prior constraint

`STD-001`: *"never renumber — an identifier is a promise about the past."*

That promise is real but narrower than it sounds. Measured: the 13 descriptive
ids (`charter-*`, `roster-*`, `*-index`) have **zero incoming citations in the
entire corpus** — each appears only inside its own file. The promise protects
identifiers someone uses. Nobody uses these.

**Before renaming anything here, measure its incoming citations.** The rule is
not "never rename"; it is "never break a reference that exists".

## Execution — 2026-08-31 (Ursa)

Design closed in a prior chat session (plan at
`.hermes/plans/2026-08-31_090215-MIS-125-prefix-standardization.md`,
repo-local, scratch — deleted at mission close per `P-010`). Execution
started this session, staged A → B → C → D per that plan.

**Base commit:** `26fea478d33018002e699cb59cdb4d7e0aa67d6d` (`origin/main`,
merge of ADR-030 (formerly ADR-032) / #153).

**Two blockers found before touching anything, both ruled by the Oracle
before proceeding (not decided unilaterally):**

1. **The plan's own premise was stale.** It states the
   `check-frontmatter-yaml.mjs` CI guard was "already wired, see the commit
   for this plan" and lists that as the one repo change already applied.
   Measured: the change existed only as an uncommitted working-tree diff on
   `.github/workflows/ci.yml` — no commit contained it, on any branch, local
   or remote. **Still not committed at time of writing** — see blocker 3.
2. **Wrong base branch.** The working tree was on
   `refactor/adr-032-blueprints-extinction` — already merged to `origin/main`
   (PR #153) and named for deletion in this same plan (§E). Resolved:
   checked out `main`, fast-forwarded to `origin/main`, carried the pending
   `ci.yml` diff across, then deleted the stale branch.
3. **This mission's own workflow error, caught by the Oracle, not by me.**
   The two commits above (CI guard + this section) were first made directly
   on local `main`, no branch, no PR — against this repo's fixed convention
   (branch + PR, always). Reverted: `main` reset back to `origin/main`, work
   moved to branch `mis-125/mark-in-progress`. **Note, checked after the
   fact:** `origin/main` is GitHub-protected (`protected: true`, confirmed
   via API); a push straight to it would very likely have been rejected
   regardless. The exact rules (required reviews, required checks, bypass
   list) could not be read — the configured PAT lacks admin scope on the
   repo (`GET .../branches/main/protection` → 403). Oracle asked to confirm
   or tighten the ruleset from Settings → Branches directly.
   Separately, the CI-guard commit hit a real, unrelated blocker: the same
   PAT lacks the `workflow` scope, so GitHub rejects any push touching
   `.github/workflows/*.yml` on any branch. **The CI guard commit is parked,
   not landed** — needs either a token scope fix or a human push. This
   mission-status update carries no `ci.yml` change and is unblocked.

Both premise corrections (1, 2) confirmed with the Oracle via clarifying
questions before any file was touched; the workflow correction (3) was the
Oracle's own catch, applied immediately. Progress against Stages A–D is
tracked in `missions/MIS-127-entropy-reduction.md` (ledger, per PR) as each
stage lands; this section records only the execution start and the premise
corrections.

## Stage A — normative docs (PR #155, 2026-08-31)

Two Oracle rulings closed before writing anything, both via `clarify`, not
decided unilaterally:

1. **`agents/` prefix.** The plan's premise — `agents/` stays without a
   prefix — silently reversed `ADR-005`'s own ratified Decision 2
   (`agents/` takes `AG-NNN`). Flagged, not written over. Oracle ruled:
   formalize the reversal as an explicit `ADR-005` v1.1.0 amendment
   (not just extend the new table), plus a reasoned `D-008` closure —
   rather than silently reinstating or silently dropping it. Folder count
   corrected 8→7 (plan was stale; verified via `git ls-files`/`find`).
2. **`registration: exempt` scope.** 50 files carry the exemption; 24 are
   content documents inside a registered series, not apparatus. Oracle
   ruled: all 24 enter the new scheme, no exception — this closed `D-024`
   as a side effect (including its `pending-genre-ruling` blocker for
   `operations/security-policy.md` + `credential-map.md`, both `OPS-NNN`).
   One document, `APPROVAL-REQUEST-template.md`, was first marked `[x]`
   in error (it is apparatus of `P-008`, not orphaned) — caught and
   corrected same session, `D-024` → v1.2.0.

**Documents changed:** `ADR-004` v1.1.0, `ADR-005` v1.1.0, `P-010` v0.4.0,
`D-008` v2.0.0 (rewritten, measured against the new register via
`git ls-files`, not the plan's stale census), `D-024` v1.2.0 (closed).

**A verification gap found and closed before it could reach Stage C:**
`check-references.mjs` was blind to the 13-series register (hardcoded 5
old prefixes, ignored the `C-/BP-/D-/S-` prefixes this mission retires)
and to a third citation kind — bare filenames in prose, the only way
`registration: exempt` documents are ever cited. Left unfixed, every
Stage-C "exit 0" would have been a false green light. Extended, measured
(331 pre-existing hits, unrelated historical debt, frozen in baseline),
verified with a positive test (renaming `credential-map.md` correctly
triggers 12 new failures).

**CI catch, fixed same day:** `debt/D-024`'s `status: resolved` is not a
valid value in `STD-004`'s `documentation` lifecycle (`draft → active →
closed`) — build failed on `H-04`. Corrected to `status: closed`;
`(RESOLVED)` stays in the title as a human-readable note.

PR: https://github.com/numengames/numinia-nwos/pull/155 — merged
(squash, by María, `e8571cb`). A same-day commit
(`missions`/`D-008` cross-referencing) was pushed after the squash and
orphaned on the closed branch; rescued via cherry-pick into PR #156
(https://github.com/numengames/numinia-nwos/pull/156, merged). Stage A
closed end-to-end on `main` at `307c7bc`.

Two follow-up debts noted, not yet filed: `D-017` (cited by `D-024`, does
not exist in `debt/`); `.github/workflows/scorecard.yml` cites
`STD-005-engineering-standards.md` by bare name in a comment, outside any guard's
reach — will break silently when Stage C renames that file.

## Stage B — rename tool (PR #157, PR #161, 2026-08-31)

**Pre-work (PR #157):** re-measured the register against `main` post-Stage-A
before writing any tool. Found a real contradiction in `D-008` v2.0.0:
`standards/` coverage claimed `0/8`, but only 7 files actually qualify —
`standards/STANDARDS.md` (`type: meta`, tombstone/redirector) was being
counted like a numbered standard instead of excluded like
`README.md`/`INDEX.md`. Oracle ruled: permanent apparatus, no `STD-NNN`
("vamos con la A"). `count-evidence.py` fixed, `D-008` corrected to v2.1.0
(`standards/` `0/8→0/7`). A concurrent session closed `debt/D-001` in
parallel during the same window (legitimate, documented in this file's
own ledger below) — `D-008`'s `debt/` count corrected `0/37→0/36` in the
same v2.1.0 pass. PR: https://github.com/numengames/numinia-nwos/pull/157
(merged).

**Tool (PR #161):** built `scripts/rename-series.mjs` per the plan's §B
algorithm — `--dir/--to/--from/--apply`, corpus-wide citation rewrite
(id + full path + basename, any file type), dry-run by default, no
auto-commit, runs `check-references.mjs` at the end of `--apply`.

Dry-run tested against 6 series (`infra` 0-file edge case, `guilds`,
`standards`, `protocols`, `debt`, `blueprints`) before any `--apply` —
**6 real bugs found and fixed, none hypothetical:**

1. Ambiguous basename collision (`guilds/*/charter.md`,
   `*/roster.md` — 4 identical basenames across sibling folders): a naive
   corpus-wide basename replace would have silently repointed one guild's
   citation to another. Fixed — bare-basename auto-rewrite only fires when
   the basename is unique across the whole corpus; ambiguous hits are
   listed for manual review, never auto-touched.
2. `standards/STANDARDS.md` tried to enter the plan under a live
   `standards/` series number, contradicting the ruling made minutes
   earlier in the same session.
   Fixed — excluded by name.
3. Slug bug: `STD-005-engineering-standards.md` was mistaken for
   `PREFIX-name` and mangled, colliding with `STANDARDS.md`'s slug. Fixed —
   only strip a leading prefix when the file had a recognized *old series
   number*, never guessed off an unnumbered basename.
4. `registration: exempt` files entering unconditionally —
   `protocols/APPROVAL-REQUEST-template.md` surfaced with a live
   `protocols/` series number assigned,
   directly contradicting this session's own `D-024` v1.2.0 correction.
   Fixed — any `registration: exempt` file is excluded by default;
   `--include-exempt` is a per-run operator assertion, required after
   verifying `D-008`'s enumerated list actually covers the `--dir` in
   question.
5. Surfaced, not fixed by the tool: 2 more files carry the exact `P-010`
   §3.2 frozen-artifact filename shape (dated-title-versioned) but
   are **missing** the `registration_exemption: frozen-artifact` field
   (`protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md`,
   `standards/2026_04_14-Analogous_Terminology_Numina-v0.2.0.md`) — same
   conflict as item 6 below, now 5 files total. Detected by filename
   shape, not just the field, so a missing field can't silently bypass
   the guard.
6. CodeQL flagged 6 high-severity regex-injection findings on PR #161
   (`TO`/`FROM`/`SUBTYPE_FIELD` — unescaped CLI args interpolated into
   `new RegExp(...)`). Fixed with a `reEscape()` helper at all 6 sites;
   re-verified all 6 dry-run series produce identical plans afterward.

Also caught in the same window: `debt/D-002` was extinguished by another
session in PR #160, landing *after* this PR's own `D-008` v2.1.0 commit
— `D-008` corrected again to v2.2.0 (`debt/` `0/36→0/35`, total
renameable `275→274`), same pattern as the `D-001` correction, not an
error in the prior version.

PR: https://github.com/numengames/numinia-nwos/pull/157 (merged) and
https://github.com/numengames/numinia-nwos/pull/161 (merged, `534e25e`).

**Blocker resolved — ruling made 2026-08-31, in `P-010` §3.2.2:**
`P-010` §3.2 defines `registration_exemption: frozen-artifact` files as
permanent dated snapshots that never evolve ("a photograph, not a living
document"). `D-008`'s own "24 exempt enter the scheme" ruling included 5
such files (3 by explicit field, 2 more by filename shape only — see bug
5 above) and assigned them `STD-NNN`/`CAN-NNN`/`PRO-NNN` destinations,
directly contradicting `P-010` §3.2 on its face.

**Ruled: `P-010` §3.2 prevails. `D-008` is corrected; the 5 keep their
dated names permanently.** Four grounds, each measured against the repo at
`caf2621` rather than argued from principle:

1. **Public URLs derive from filenames — measured against a real build.**
   `web/src/pages/corpus/[...slug].astro` routes on `entry.id`, which the
   Astro loader derives from the filename when the frontmatter declares
   none. `npm run build` publishes **all five** at filename-derived
   addresses, e.g. `/corpus/standards/2026_08_18-sistema_de_diseno-v510`.
   Renaming publishes five dead URLs. `D-028` exists because nothing
   manages that lifecycle. **This ground alone is sufficient.**
2. **This mission's own licence to rename does not cover them.** §"The
   prior constraint" above authorises renaming *because the 13 descriptive
   ids have zero incoming citations* — "never break a reference that
   exists". Measured: the five carry **71 incoming citations across 24
   files** (41 to the Design System alone). The premise is false for this
   set; applying the conclusion anyway would be the exact error this
   mission was opened to correct.
3. **An out-of-repo consumer keys on the path.**
   `numinia-web/design-source.json` pins the Design System by `path` +
   `sha256`, verified by that repo's own `scripts/check-design-source.mjs`.
   `STD-001` §5.0.1 makes such a rename **structurally incomplete**.
   *Qualified 2026-08-31:* that pin currently names `…-v5.0.0.md`, so it is
   already stale (`D-040`) and a rename would not break it today. The
   ground rests on the mechanism, not on this pin.
4. **Two are `threshold: sealed`** (`STD-001` §2.1 — both `canon/` documents;
   the other three declare no threshold) — changing them takes an Oracle
   signature and an ADR, which a bulk prefix pass is not.

**Correction, 2026-08-31 (same day, see `P-010` §3.2.3):** as first
published this list said "59 citations across 27 files" (actual: **71
across 24**), and cited `check-design-source.mjs` as if it ran in this
repo (it lives in `numinia-web`). Ground order changed accordingly: the
URL ground is now first because it is the one verified against built
output. The ruling is unchanged.

**Documents changed:** `P-010` v0.5.0 (§3.2.1 + §3.2.2 — the rule now says
what it means and how to detect it), `D-008` v3.0.0 (ruling reversed,
denominators corrected), `D-024` v1.3.0 (two v1.1.0 claims withdrawn),
`scripts/count-evidence.py`, `scripts/rename-series.mjs` (header + operator
message; the detection logic was already correct).

**Two defects found while ruling, neither part of the question asked:**

- **`D-008`'s headline total had been wrong since v2.0.0.** The series
  table summed to **254**, while the text claimed **274** — it was adding
  the 20-file `decisions/` row that the same sentence declares excluded.
  Two later "corrections" (275→274, 274→…) adjusted the wrong number
  without ever re-summing the column. The total is now computed by
  `count-evidence.py` instead of maintained by hand: **248** after this
  ruling. Nobody caught this in three revisions because the number looked
  plausible and no one added the column.
- **`count-evidence.py` and `P-010` disagreed about what a frozen artefact
  is.** The script keyed on the `registration_exemption` field; the
  protocol describes a filename convention. The two files carrying the
  shape without the field were counted as non-compliance — the counter was
  manufacturing the very debt this ruling removes. Both now key on the
  filename shape, and `P-010` §3.2.1 states which is normative.
- Also excluded from the denominator: `APPROVAL-REQUEST-template.md`,
  ruled apparatus by `D-024` v1.2.0 on 2026-08-31, which no counter had
  ever excluded.

**Stage C is unblocked** for all eleven series. `standards/`, `canon/` and
`protocols/` proceed with the 5 artefacts excluded by the tool's default.

## Stage C — series renames (2026-08-31, in progress)

Order per `D-008`'s risk ranking, lowest first. One commit per series, all
guards green before the next.

### `guilds/` → `GLD-NNN` (8 files, done)

```
guilds/alquimistas/charter.md    -> guilds/alquimistas/GLD-001-charter.md
guilds/exegetas/charter.md       -> guilds/exegetas/GLD-002-charter.md
guilds/procuradores/charter.md   -> guilds/procuradores/GLD-003-charter.md
guilds/centinelas/charter.md     -> guilds/centinelas/GLD-004-charter.md
guilds/alquimistas/roster.md     -> guilds/alquimistas/GLD-005-roster.md
guilds/centinelas/roster.md      -> guilds/centinelas/GLD-006-roster.md
guilds/exegetas/roster.md        -> guilds/exegetas/GLD-007-roster.md
guilds/procuradores/roster.md    -> guilds/procuradores/GLD-008-roster.md
```

Guards: `check-references` 0 · `lint-frontmatter` 0 · `check-frontmatter-yaml`
0 · `check-frontmatter-delimiter` 0 · `lint-naming` 0. `naming-baseline`
264 → 257 (8 healed, 1 added: `D-047` inherits `debt/`'s own pending
`D-NNN`→`DBT-NNN` violation, shared with its 46 siblings).

**Bug 6 — the tool rewrote four files it should not have touched.**
`--apply` replaces the old id with the new one across every citing file by
plain string substitution. That is right for a live cross-reference and wrong
for four other things, all of which it hit on this 8-file run:

| File | What it did | Why it is wrong |
|---|---|---|
| `reports/audits/AUD-2026-08-26-licensing-c005/sbom.spdx`, `cc0-irrevocable.json` | rewrote 8 filenames in a dated SPDX SBOM and a CC0 grant record | dated forensic evidence, and the `FileChecksum: SHA1` lines were left untouched — a manifest whose names and hashes disagree is worse than a stale one |
| `missions/MIS-118-agent-roster-replacement.md` | `status: done` mission | retrospective narrative: it records what a guard run found on 2026-08-28, under the names of that date |
| `missions/MIS-125-prefix-register.md` | rewrote `charter-alchemists`, `roster-sentinels` → `GLD-001`, `GLD-006` | those ids appear in §"What this mission decides" **as examples of lowercase descriptive ids**. The sentence became "whether lowercase descriptive ids are legal at all — `GLD-001`, `GLD-006`" — self-refuting |
| `scripts/phase5-status-and-registration.py` | rewrote an id inside a code comment | the id was a **counter-example** — "`charter-alchemists` has no series" became "`GLD-001` has no series", inverting the comment's meaning |

All four reverted; the rename stands. The distinction the tool cannot make is
**citation vs. mention** — `STD-001` §9.1's own rule, which the corpus states and
the tool does not implement. Filed as `D-048`.

`system/SYS-003-archive-fondos.md` was rewritten and **kept**: it is a live
manifest of paths the web build reads, so a stale path there is a real defect.

**Bug 7 — a rename left every file self-contradictory.** All 8 carried
`registration: exempt` with `registration_reason: "singular document, not a
numbered series"`. After the rename they *are* a numbered series, but the
exemption survived: `count-evidence.py` reported `guilds 8/8 100.0%` over 8
files each declaring itself outside the scheme. `STD-001` §5.0 requires an
exemption to state something true. Retired from all 8 (v1.1.0 → v1.2.0), and
`rename-series.mjs` now retires a falsified exemption as part of the rename.

**Bug 8 — `check-references.mjs` resolves by basename, so a wrong folder path
reads as green.** Renaming `guilds/` produced 4 "new" broken references in
files the rename never touched — all citing `agents/guilds/…`, a directory
deleted in `b7a2e39`. They were already broken at `caf2621` and the guard
reported them clean, because *some* file named `charter.md` existed. The
rename removed the accident that hid them. Baselined, not rewritten (two
`status: closed` blueprints and a `P-008` template describing the architecture
that deletion removed). `D-039` again, one layer down. Filed as `D-047`.

### Interlude — debt reduction before the next series (PR #164, 2026-08-31)

Stage C stopped after one series on the Oracle's instruction. The reason was
arithmetic: `guilds/` cost three new debt entries (`D-047`, `D-048`, `D-049`)
to rename eight files, and `debt/` had gone 35 → 38 in a mission whose purpose
was to reduce it. *"Vamos a ser muy operativos y vamos a cerrar cosas."*

**Five entries closed. Active debt 37 → 33.**

| Entry | Sev | Closed on which of its own conditions | What is **not** done |
|---|---|---|---|
| `D-025` | med | all three | — |
| `D-047` | med | "the blind spot is declared and accepted" | the resolver still matches by basename |
| `D-049` | med | "guards warn about untracked files" | `--write-baseline` still writes (by decision) |
| `D-048` | **high** | both | case 4 is undetectable by tool |
| `D-014` | low | rule + before/after figures published | — |

**`D-047` and `D-049` were never separate defects.** Both are instances of
`D-025` — *"no guard declares what it is blind to"*, opened 2026-08-25. Closing
the parent closed the children. This is worth stating plainly because it
explains why the debt felt like it was multiplying: three entries were being
tracked where one gap existed.

The mechanism is `STD-001` §10.4: eight guards print what they did **not** check,
on success as well as failure, from `scripts/blind-spots.json` via
`scripts/lib/blindness.mjs`. Verified by `scripts/test/blindness.test.mjs`,
which builds a file that *should* trip each guard and asserts it stays green —
the blindness is proven, not claimed. The suite was itself checked for
falsifiability: removing one declaration turns it red.

**The guards are exactly as blind as they were before.** Nothing was fixed.
What changed is that a green run no longer implies more than it proved.

`D-048` closed on both conditions: the tool refuses dated evidence and closed
records (60 refusals in a throwaway-clone test), and the interim rule is now
permanent policy in **`P-010` §3.4 — a citation may be rewritten, a mention may
not**. Rule 3 of that section (read the full staged diff) remains mandatory for
the ten series still unrenamed.

### Two corrections by the Oracle, same session

**1. `STD-001` §4.1 was out of date — ten of eleven rows.** It prescribed
`MIS-NNN`, `P-NNN`, `S-NNN`, `D-NNN`, `C-NNN`, `O-NNN`, `BP-slug`,
`RPT-YYYY-MM-DD`, `AUD-YYYY-MM-DD` and `AG-NNN`, all superseded by `ADR-005`
v1.1.0 — the amendment this mission itself obtained — and `guilds/` and
`infra/` were missing entirely. **For a day this mission was renaming the corpus
against its own glossary**, which 104 files cite. Rewritten from `ADR-005`
v1.1.0 with coverage measured by `count-evidence.py`, not copied. `STD-001` →
v5.0.0.

**2. A dead debt entry was cited as live authority.** `D-017` was extinguished
2026-08-30 by `ADR-030`, and was cited here to justify not wiring a CI step —
while its own resolution record reads *"workflow scope granted"*. The correct
authority is **`P-013`**, whose step 3 (pasting the YAML) is the Oracle's and
cannot be delegated. The conclusion was right; the ground under it was not.

Both were found by reading, not by any guard — which is `D-050`.

### `D-050` — why none of it was caught (new, high)

`check-references.mjs` matches only the **twelve current prefixes**. A citation
written under a retired scheme is not a reference the guard tolerates; it is a
string the guard never recognises as a reference at all.

- **80 of 246 files (32 %)** carry a prefix no guard can match
- **~90 genuinely broken citations are invisible**, after netting out the two
  legitimate classes: citations to extinguished debt (`ADR-030`) and `canon/`'s
  seminal numbering, which collides with the retired `standards/` prefix

**Warning for the remaining series.** Renaming `debt/` to `DBT-NNN` moves 38
files from the unmatched set into the matched one, so those citations become
reportable **all at once**. The reference guard will appear to break. It will
not be breaking — it will be seeing, for the first time, what was already
there. Anyone reading that run without `D-050` will blame the rename.

### Stage C — what remains

Ten series, `248` renameable files. `standards/` is next per `D-008`'s risk
order, and is **held** on two counts, both the Oracle's to release:

1. **The slug defect** (Stage B bug 3, still open): the dry run keeps the dead
   prefix *inside* the new slug: the glossary would keep its old prefix as
   slug text, so the new basename would carry the prefix twice — the new one
   in front, the retired one embedded — instead of just the new prefix plus
   `-glossary`. Cleaning it changes the basename that **104 files** cite. Not
   a technical decision.

   *Written in prose rather than as identifiers on purpose: the target names
   do not exist yet, and spelling them out would make this mission cite files
   that are not there — a mention, not a citation (`P-010` §3.4). `D-050`
   is the reason that distinction now matters.*
2. **`ADR-030` housekeeping**: six entries carry `status: closed` and are still
   in the tree (`D-014`, `D-024`, `D-025`, `D-047`, `D-048`, `D-049`). Rule 1
   says an operational entry is deleted on close; rule 3 says a closure without
   a written resolution does not extinguish. Whether today's closures satisfy
   rule 1, and whether extinction is per-entry or batched, wants an
   instruction. Deleting six documents is not something an agent does because a
   rule appears to permit it.

`P-013` handoff is open: steps 1, 2 and 4 are done (the suite is tested in both
directions, the YAML block is in PR #164's body, and the merged run is green).
Step 3 — pasting it into `.github/workflows/ci.yml` — is the Oracle's.
