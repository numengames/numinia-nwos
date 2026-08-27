---
id: "MIS-116"
title: "Translate the repo's remaining Spanish documents to English"
status: done
priority: medium
effort: M
guild: Alchemists
area: archive
type_execution: digital
assigned_to: "ursa"
completed: "2026-08-27"
type: mission
version: "1.0.0"
created: "2026-08-27"
updated: "2026-08-27"
author: "ursa"
owner: "oracle"
tags: [translation, i18n, decision-006, archive]
license: "CC-BY-4.0"
context: "2026-08-27"
requires_oracle_approval: true
---
# MIS-116 — Translate the repo's remaining Spanish documents to English

> **Summary:** a repo-wide language scan found 305 `.md` files, 52 of them
> still in Spanish or mixed, split across nine folders. This mission tracks
> that work as one checklist, executed in small per-folder PRs.
> **Epistemic:** DEC-006 declared English the repo's sole language in
> 2026-04-07 (closed by MIS-056); this scan shows the closure was partial —
> the gap survived undetected until this audit.
> **Pragmatic:** a cold agent reading any folder in this repo meets English,
> with no mental translation step before it can act.
> **Audience:** Agents · Oracles

---

## Origin

Found during an audit of `agents/` requested 2026-08-27. A repo-wide
stopword-heuristic scan (ES vs EN word counts per file) applied to all 305
`.md` files outside `.git`/`node_modules`/`dist` flagged 52 files as
Spanish or mixed. Two exclusions, both intentional and out of scope:

- `canon/archive-lore.md` — lore, reserved narrative under `C-005` §2, not
  documentation.
- The RPG manual — lives in `numinia-lore`, not in this repo.

**Note on the ID:** `MIS-116` already existed as a closed-without-merging
PR (#81, "record why MIS‑097…099 were never minted") — unrelated content
that never landed in `main`. Reused here as the free slot on the Oracle's
instruction; no content from PR #81 carries over.

## Scope

Translate content to English, language only — no fact, date, metric, or
structural change to any file, in any folder below. Executed as **one PR
per checklist row** (or two adjacent small rows together), never all nine
at once, so each PR stays small and reviewable.

- [x] **`agents/`** — 5 files (`_template/OPERATOR.md`, `_template/STATUS.md`,
      `nimrod/STATUS.md`, `senet/MEMORY.md`, `ursa/MEMORY.md`) — merged
      in [PR #82](https://github.com/numengames/numinia-nwos/pull/82)
- [x] **root** — 3 files (`DEUDA-404.md`, `GAPS.md`, `LEGAL_DEBT.md`) —
      merged in [PR #83](https://github.com/numengames/numinia-nwos/pull/83)
- [x] **`protocols/`** — 1 file (`P-010-how-to-archive.md`) — merged in
      [PR #85](https://github.com/numengames/numinia-nwos/pull/85)
- [x] **`standards/`** — split into two sub-PRs (small file first):
      - [x] `S-003-platform-role-system.md` — merged in
            [PR #86](https://github.com/numengames/numinia-nwos/pull/86)
      - [x] `2026_08_18-Sistema_de_Diseno-v5.1.0.md` — merged in
            [PR #87](https://github.com/numengames/numinia-nwos/pull/87), largest
            file in the repo (1521 lines, ~5,440 ES words). Code blocks
            (CSS/JS/JSON/SVG/binary) kept byte-identical: the kit
            generator (`scripts/generate-design-kit.mjs`) extracts them
            verbatim; only `manifest.json`'s master sha256 changes.
            Deliberate exceptions kept in Spanish: token names and CSS
            variables (`verdemar`, `nocturno.fondo-base`, `velo.rejilla`
            — they are identifiers, §0.4 renames nothing), the world's
            lexicon (§11 capsule: El Ágora, El Velo, el Umbral — canon
            rule: never translated), literal filenames, UI literals the
            kit ships (`Cargando···`, `LECTURA`, `abierto / tras el
            Umbral`, `LEEME.md`), the living colophon quote, and level
            I/II register examples that demonstrate Spanish-language
            copy. Frontmatter `idioma_canonico` updated to `en` with the
            history noted inline.
- [x] **`canon/`** — 3 files (`C-005-licensing.md`, `C-007-rank-specifications.md`, `INDEX.md`)
      — merged in [PR #90](https://github.com/numengames/numinia-nwos/pull/90).
      Required a prior canon-change: `ADR-024` ([PR #89](https://github.com/numengames/numinia-nwos/pull/89))
      revoked C-005 §5's es-ES exception — amendment first, translation second.
      Sole language exception system-wide, recorded as debt in the ADR: the RPG
      manual (`numinia-lore`).
- [x] **`reports/`** — 5 files (`INDEX.md`, `RPT-2026-04-02`, `RPT-2026-04-03`,
      `AUD-2026-04-07-system-audit`, `AUD-2026-08-17-stack`) — merged in
      [PR #92](https://github.com/numengames/numinia-nwos/pull/92). Kept in
      Spanish: verbatim quotes of Spanish sources, forensic evidence
      (`audits/evidence/`), proper names, literal filenames.
- [x] **`operations/`** — 7 files (incl. the privacy policy) — merged in
      [PR #94](https://github.com/numengames/numinia-nwos/pull/94). O-003
      privacy policy: English declared the MASTER by Oracle decision,
      FLAG-5 resolved (v2.0.0). Pending cross-repo: numinia.com
      (`apps/store`) still carries Spanish copies pinned to
      `privacy@1.1.0` (CON-004).
- [x] **`blueprints/`** — 13 files per the brief; the row's own scan found
      **15** with Spanish content — merged in
      [PR #96](https://github.com/numengames/numinia-nwos/pull/96). Incl. the
      archive-summa trio (dated filenames untouched, P-010 §3.2) and an
      incidental fix to BP-nwos-system's colophon.
- [x] **`missions/`** — 12 files per the brief (range MIS-078…MIS-096); the
      row's own scan found **15** (MIS-068/076/084 carried Spanish sections,
      plus TEMPLATE.md's core comment) — merged in
      [PR #97](https://github.com/numengames/numinia-nwos/pull/97). Done
      missions translated as form, not substance (`S-001` §2.1.1), stated in
      the commit.

Row order is by ascending file count, smallest first; not a hard rule if a
smaller batch turns out more useful next.

### Out of scope

- `canon/archive-lore.md` and the RPG manual (see Origin)
- `guilds/*/roster.md`, the `AG-NNN` prefix — separate, already-tracked debt
- Correcting content, dates, or facts in any file translated here

## Acceptance criteria

> Falsifiable per row. The mission's own criterion is that every row is
> checked and its files pass the check below.

```
✗  for each file in a checked row:
     grep -icE "\b(el|la|los|las|que|para|con|una|del|más|estado|misión)\b" <file>  →  0
```

- [x] Verifiable by someone who did not do the work
- [x] Each row checked only after its PR has merged — not before
- [x] `Closure` filled only when all nine rows are checked

## Execution plan

1. **PR #1 (this one)** carries both the mission brief and the first row
   already translated (`agents/`, 5 files) — done together on the Oracle's
   instruction rather than split into a docs-only PR followed by a second.
   `status` moves to `in-progress` in this same PR, per this repo's own
   rule (`TEMPLATE-CHANGES.md`, "status changes in the PR that starts the
   work").
2. **PR #2 onward:** one row (or two small adjacent rows) translated per
   PR, on its own branch off `main`, with a local HTML diff preview shown
   before every `git push`. Each PR's own commit message names the row(s)
   it closes.
3. **On merge of each PR:** the corresponding checklist row above is
   checked, in a small follow-up commit to this same file.
4. **When all nine rows are checked:** `status` moves to `done`, `Closure`
   is filled with the real PR list and any divergence from this plan.

## Closure

All nine rows translated and merged. Real PR list, in order:

| PR | Content |
|---|---|
| [#82](https://github.com/numengames/numinia-nwos/pull/82) | Brief + `agents/` row (5 files) |
| [#83](https://github.com/numengames/numinia-nwos/pull/83) | root row (3 files) |
| [#85](https://github.com/numengames/numinia-nwos/pull/85) | `protocols/` row (P-010) |
| [#86](https://github.com/numengames/numinia-nwos/pull/86) | `standards/` — S-003 |
| [#87](https://github.com/numengames/numinia-nwos/pull/87) | `standards/` — Design System v5.1.0 (largest file) |
| [#89](https://github.com/numengames/numinia-nwos/pull/89) | **ADR-024** — canon-change prerequisite, not in the plan |
| [#90](https://github.com/numengames/numinia-nwos/pull/90) | `canon/` row (3 files) |
| [#92](https://github.com/numengames/numinia-nwos/pull/92) | `reports/` row (5 files) |
| [#94](https://github.com/numengames/numinia-nwos/pull/94) | `operations/` row (7 files, O-003 EN master) |
| [#96](https://github.com/numengames/numinia-nwos/pull/96) | `blueprints/` row (15 files) |
| [#97](https://github.com/numengames/numinia-nwos/pull/97) | `missions/` row (15 files) |
| #88, #91, #93, #95, this one | bookkeeping: row check-offs |

**Divergences from the plan:**

1. **The canon-change nobody planned.** C-005 §5 *prescribed* its own
   language (es-ES) — translating it without amending it first would have
   made the file contradict itself. Resolved as two acts on the Oracle's
   signed decision (option B): ADR-024 amends §5 (#89), then the
   translation lands (#90). English is now the base language of every
   summa document; the sole exception, recorded as debt in the ADR, is
   the RPG manual (`numinia-lore`).
2. **O-003 privacy policy: EN became the MASTER** (v2.0.0, FLAG-5
   resolved) by explicit Oracle decision — the plan had no position on
   legal artifacts. Cross-repo debt noted: numinia.com (`apps/store`)
   still pins `privacy@1.1.0` in Spanish (CON-004).
3. **The scan undercounted.** The brief said 52 files; per-row scans found
   more (blueprints 13→15, missions 12→15) — Spanish sections hid inside
   files whose overall signal read as English. All treated in their rows.
4. **The final sweep found what the original scan missed** (below
   2-hit threshold): the ES capsules of C-001…C-004/C-006, stray
   colophons, quoted Oracle orders. Handed to the follow-up sweep
   mission rather than reopening rows here.
5. Delivery mechanics: two delegation attempts to local-model subagents
   failed (OOM; app restart) — all translation was done directly.
   `worker-build` (a post-merge check required pre-merge) blocked #96/#97
   until the Oracle removed it from the `protect-main` ruleset, leaving
   `build` (the CI that actually runs on PRs) as the sole required check.

Structure verified programmatically per row (heading + table-row counts
identical); license guard and web build (637 pages) green on every PR.
