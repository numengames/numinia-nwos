---
id: "MIS-127"
uid:
title: "Entropy reduction: fewer documents, one vocabulary, registers that die"
type: mission
status: in-progress
version: "0.5.0"
created: "2026-08-30T18:50:00Z"
updated: "2026-08-31T10:35:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [entropy, consolidation, debt, standards, reduction]
license: "CC-BY-4.0"
related: ["ADR-030", "P-010", "MIS-125", "MIS-121"]
---

# Entropy reduction: fewer documents, one vocabulary, registers that die

> **Summary:** The umbrella mission for the 2026-08-30 reduction line:
> folder by folder, merge what says the same thing, extinguish what is
> done, measure every cut in tokens.
> **Epistemic:** What was cut, where it went, and what each cut measured.
> **Pragmatic:** The running ledger for the reduction; each PR lands here.
> **Audience:** Agents · Oracles

## Mandate (Oracle, 2026-08-30)

Reduce the system's uncertainty: too many documents, overlapping
registers, divergent vocabularies. Work folder by folder, decisions one
at a time, missions kept short. Every removed document is measured in
tokens (cl100k_base). Baseline census at `eb2d8f4`: **328 md files,
570,202 tokens** (original figure, method not preserved).

**2026-08-30 · re-measurement note (ursa, on Oracle instruction to
verify, not assume):** a same-method re-count at `eb2d8f4` — every
tracked `.md` file except `.github/`, `git show <rev>:<path>` piped
through `tiktoken.get_encoding("cl100k_base")` — gives **575,958
tokens**, not 570,202 (1.0% over, 5,756 tokens). The census script that
produced the original figure is not in the repo and could not be found;
the gap is not explained (a frontmatter-exclusion hypothesis was tested
and rejected — it undercounts by 54K, the wrong direction). Flagged, not
silently corrected: the ledger below uses the **575,958 re-measurement**
as its baseline, consistently, so every delta in this table is
same-method start-to-finish. Anyone auditing against the original
570,202 will see a ~1% base offset that is not this mission's doing.

## Ledger

| # | PR | What | Docs | Tokens (re-measured, cl100k_base, same method throughout) |
|---|---|---|---|---|
| 1 | [#145](https://github.com/numengames/numinia-nwos/pull/145) (merged) | Root norms into `standards/`: GOVERNANCE moved+absorbed §7F/§9; STANDARDS superseded to a map; D-003 ruling; ARC-06 commit types | −1 active norm, 0 files | **−2,401** |
| 2 | [#146](https://github.com/numengames/numinia-nwos/pull/146) (merged) | ADR-030 debt extinction; nine closed/de-facto-resolved entries extinguished; INDEX backfill ADR-027..030 | −7 files | **−8,903** |
| 3 | [#147](https://github.com/numengames/numinia-nwos/pull/147) (merged) | ADR-031: LD-NNN dissolved into D-042..046 (tag `legal`), 404→D-040/041, GAPS frozen to reports/, C-005 v1.3.0 amended | +6 files | **+2,422** (root register genre extinct; live text kept, restructured into more, smaller files — a document-count win with a token cost) |
| 4 | [#148](https://github.com/numengames/numinia-nwos/pull/148) (merged) | Five DEC entries (001,002,003,005,006) retired as superseded, one-line succession banners; decisions/ down to one living series (ADR) | 0 files | **+418** |
| — | [#149](https://github.com/numengames/numinia-nwos/pull/149) (merged) | *Not a reduction PR* — MIS-128 link hygiene fix, listed here only because it touched a mission `.md` (frontmatter timestamp fix) | +1 file | +1,330 (not part of this line; MIS-128's own scope) |
| — | [#150](https://github.com/numengames/numinia-nwos/pull/150) (merged) | *Not a reduction PR* — MIS-120 closure documentation | 0 files | +1,167 (MIS-120's own closure, not this line) |
| — | [#151](https://github.com/numengames/numinia-nwos/pull/151) (merged) | *Not a reduction PR* — MIS-128 closure documentation | 0 files | +788 (MIS-128's own closure, not this line) |
| — | [#152](https://github.com/numengames/numinia-nwos/pull/152) (merged) | *Not a reduction PR* — this mission's own ledger correction (re-measurement note + #148 backfill) | 0 files | not separately measured (self-referential, see note above) |
| 5 | #153 (pending) | ADR-032: `blueprints/` joins the operational series (extends ADR-030/P-010 §5); six April blueprints extinguished (BP-repo, BP-web, BP-misiones, BP-datos, BP-infraestructura — foundation decisions DEC-001/002/003/005 all superseded; BP-cao-overview — losing side of O-002 CON-001, now resolved); `BP-financiero` kept active per prior Oracle ruling, one dead cross-reference removed | −6 files, +1 file (ADR-032) = **−5 net** | **−1,561** (−3,698 removed + 2,015 new ADR + 128 net edits to P-010/O-002/BP-financiero) |
| — | [#155](https://github.com/numengames/numinia-nwos/pull/155) (open) | *Not a reduction PR* — MIS-125 Stage A: ADR-004/ADR-005 v1.1.0 (13-series register, `agents/` reversal formalized), P-010 v0.4.0, D-008 v2.0.0 (re-measured), D-024 closed (v1.2.0), `check-references.mjs` extended to the new register + bare-filename citations. Detail in `MIS-125` itself, not duplicated here. | 0 files (frontmatter/content edits only) | not measured — not a reduction PR |

**Reduction-line total (PRs #145–148, #153): −10,025 tokens, −6 files net**, against
the 575,958-token re-measured baseline. The four non-reduction closures
(#149–152, +3,285 tokens combined, #152 not separately measured) are unrelated mission
paperwork that happened to land in the same window — real, necessary, and outside this
ledger's mandate, not netted against it.

**Cumulative repo state before #153: 328 files, 570,779 tokens** (per #152's
measurement). **After #153 lands: 323 files, ≈569,218 tokens** — a projected
net −6,740 from the 575,958 re-measured baseline.

## Open decision queue (one at a time, Oracle signs each)

- Freeze April-era commercial missions (MIS-017..050 todo, ~40 docs).
- ~~Freeze April blueprints nothing invokes (20 active, ~160K chars).~~
  **Partially resolved by ADR-032/#153**: 6 of 16 tracked blueprints
  extinguished (foundation decisions dead, or losing side of a resolved
  contradiction) — `BP-repo`, `BP-web`, `BP-misiones`, `BP-datos`,
  `BP-infraestructura`, `BP-cao-overview`. `BP-financiero` confirmed
  staying active (depends on pending missions, not a dead decision —
  still folds into the point below). The remaining 9 blueprints
  (`BP-cao`, `BP-cao-architecture`, `BP-archive-fondos`,
  `BP-business-metrics`, `BP-mission-system-v2`,
  `BP-numengames-improvement-roadmap`, `BP-nwos-system`,
  `BP-agent-experience`, `BP-dual-nomenclature`) were not evaluated
  against the extinction criterion — out of scope for #153, still an
  open question if the Oracle wants them reviewed. `blueprints/INDEX.md`
  (last touched 2026-04-07, lists 3 of 16) remains stale — not fixed.
- Single status vocabulary across every series (S-001).
- **MIS-125 prefix register execution — started 2026-08-31.** Staged
  A (normative docs) → B (rename tool, dry-run) → C (per-series renames,
  one commit each, `check-references.mjs` gated) → D (`scripts/` cleanup).
  Two premise corrections made before touching files (uncommitted CI guard,
  stale base branch) — logged in `MIS-125` itself, not duplicated here.
- protocols/ ↔ standards/ merge assessment.
- **New, opened by #153:** freeze the April commercial missions that
  `BP-financiero` depends on (MIS-021/031/034/048) — same mandate as
  the first bullet, now with a named blocking dependency.

## Debt extinguished by this mission (ADR-030)

**D-001 — "The glossary declares rules that no machine verifies" — closed
2026-08-31.** Remeasured against `main` against its original 2026-08-24
table (2/11 rules `[CI]`) and found the table itself had gone stale, not
just the repo: `guild`/`territory`/`type_execution` were already covered
by H-33/H-34/H-36 (added 2026-08-30, unrelated work) with nobody updating
D-001 to say so. What this closure actually did:

1. Wired `check-frontmatter-yaml.mjs` into `ci.yml` — existed since `D-039`,
   ran nowhere, no argument for the gap.
2. Built `scripts/lint-naming.mjs` (N-01…N-05: root-level filenames must
   be all-uppercase, no
   version/date in a living filename, frozen-artifact shape, series scheme
   per `ADR-005` v1.1.0, kebab-case slug). 266 pre-existing violations
   frozen in `scripts/naming-baseline.json`, same ratchet pattern as
   `lint-frontmatter.mjs` — shrinks as Stage C lands renames, never grows.
3. Added H-37/H-38 (`priority`/`effort` closed vocabularies) to
   `lint-frontmatter.mjs` — zero new violations on adoption, every live
   value already conformed, only the instrument was missing.
4. Confirmed `lint-type-vs-folder.mjs` was never a fourth script: it was
   already merged into `lint-frontmatter.mjs` as H-17 before D-001's table
   was written. Its row now states the real scope — strict on 8/11 types,
   argued `[MANUAL]` on `documentation`/`meta` per `S-001` line 448 — instead
   of implying total coverage.

**Eleven of eleven rules in `S-001`'s table now carry `[CI]` or an argued
`[MANUAL]`.** Verified live: `node scripts/lint-frontmatter.mjs` and
`node scripts/lint-naming.mjs` both report `no new violations — the ratchet
holds` against `main` at closing time.

**Not resolved by this closure** (declared per D-025, not silently
carried): `lint-naming.mjs` checks slug shape, not slug language — a
Spanish slug in valid kebab-case still passes. Neither guard verifies a
timestamp is *true*, only well-formed. The 266-entry naming baseline and
44-entry frontmatter baseline are real debt this closure does not pay —
closing D-001 means the archive can no longer lie about verifying itself,
not that every document already conforms. Paying the baselines down is
Stage C's job.

Full text of the closed entry is in git history: run
`git log --follow -- 'debt/D-001*'` to recover it.

**D-002 — "`blocked_reason` is orphaned: the status it explained no longer
exists" — closed 2026-08-31.** The entry's own OPEN QUESTION (does a
blocked mission need a field distinct from `frozen`/`freeze_reason`, or is
`blocked_reason` a duplicate?) was already answered by usage, not by a new
ruling: of 8 carriers measured 2026-08-25, 7 were `null` and the one
substantive value (`MIS-052`, "PC in transit — pending physical arrival")
sat on a mission that was never `frozen` — `status: todo`, waiting on an
external event, not deliberately paused. That is not what `freeze_reason`
is for either; it moved to body prose instead, during the mechanical
header-burndown phase (`scripts/phase2-mechanical.py`, 2026-08-30, value
preserved in `scripts/phase8-retired-values.txt` so it wasn't lost in
silence). Verified 2026-08-31: **zero live `blocked_reason` occurrences**
in any frontmatter, corpus-wide (`git grep`) — the migration this entry
called for had already happened, only the debt entry and two `S-001`
citations hadn't caught up. Closure per option 1 of the entry's own text
("retire it"): `H-31` (added 2026-08-30, unrelated work) already guards
the field against regression, corpus-wide, in CI — so this closure adds no
new guard, only stops the archive from citing an open question that
usage had already settled. `S-001` §6 and §7 updated to state the
retirement instead of pointing at an active entry; `debt/D-021`'s
citation of the file (a historical audit table, not a live reference)
updated to describe the closure rather than link a deleted path.

Full text of the closed entry is in git history: run
`git log --follow -- 'debt/D-002*'` to recover it.

## Done when

The Oracle declares the reduction line closed. Each PR in the ledger
records its own token delta; this mission is the sum.
