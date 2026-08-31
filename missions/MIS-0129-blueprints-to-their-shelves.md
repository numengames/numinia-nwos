---
id: "MIS-129"
title: "Send each blueprint to the shelf its content belongs on, and open the two shelves that were missing"
status: in-progress
priority: high
effort: M
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
completed: null

type: mission
version: "1.0.0"
created: "2026-08-31T22:10:00+02:00"
updated: "2026-08-31T22:10:00+02:00"
author: "ursa"
owner: "oracle"
tags: [archive, taxonomy, blueprints, url-lifecycle, ADR-005, S-005]
license: "CC-BY-4.0"
context: "2026-08-31"
paths: [blueprints/, system/, history/, reports/, web/src/pages/archive/, web/astro.config.mjs, scripts/]
---
# MIS-129 — Send each blueprint to the shelf its content belongs on

> **Summary:** `blueprints/` holds eight documents of four different genres.
> Six of them are not blueprints. This mission moves each to a shelf that
> matches what it is, opens the two shelves the taxonomy was missing
> (`system/`, `history/`), and keeps every public address alive.
> **Epistemic:** A folder whose name does not predict its contents is not a
> taxonomy, it is a drawer. The measurement is in the audit below: the
> repository's own definition of a blueprint (`SYS-003`, *"unmanifested
> potential"*) excludes six of the eight files sitting in `blueprints/`.
> **Pragmatic:** After this mission, opening `blueprints/` tells you what
> you are about to read.
> **Audience:** Agents · Oracles

---

## Context — the audit that opened this

Read against the archive's own definition, the eight documents in
`blueprints/` at `ca62d86` are four different genres:

| Document | What it actually is | Genre |
|---|---|---|
| `RPT-2026-04-07-wardley` Wardley map | A dated strategic analysis with a running clock | Report |
| `BLU-002` Business metrics | A framework designed, not built, blocked on Oracle input | **Blueprint** |
| `the Mission System v2 record` Mission system v2 | A design its own banner declares superseded by MIS-066 | Superseded record |
| `SYS-001` CAO architecture | Reference manual of how the system is wired today | System manual |
| `SYS-003` The Archive's fondos | Reference manual of the seven fondos, plus live page data | System manual |
| `SYS-002` The agent cycle | Reference manual of how an agent operates | System manual |
| `BLU-007` Dual nomenclature | A design in progress, mission MIS-055 open | **Blueprint** |
| `BLU-008` NWOS system description | Product landing copy, 75% identical to `nwos-deploy`'s home | Product copy |

Two of eight are blueprints. `S-005` §2 maps a genre to a folder, and
two of these genres — the system manual and the superseded record — have
no folder in that map. They ended up in `blueprints/` because it was the
only shelf that did not obviously reject them.

`ADR-032` (now in `ADR-030`) already ruled on the neighbouring case: a blueprint whose
foundation is dead is extinguished. That rule does not reach these six.
None of them is dead — they are alive and shelved wrong, which is a
taxonomy fault, not a lifecycle one.

---

## Scope

- Two new top-level folders: `system/` (prefix `SYS`) and `history/`
  (no series — frozen records keep the dated-artefact name, `S-005` §3.2).
- The eight `BLU-*` documents in `blueprints/`, and only those.
- Every consumer of the moved files: the Astro collections, the two
  `/archive` pages that read `SYS-003`'s frontmatter, the redirect table,
  and the URL baseline.
- The registers that must know the new series exist: `ADR-005` (prefix
  register), `S-005` §2 (taxonomy table), and a new ADR recording the
  ruling itself.

### Out of scope

- Rewriting the copy of any document. This mission moves and re-shelves;
  it does not edit prose. `SYS-001`'s stale content (it names a repo that
  was renamed, an agent that no longer exists under that name, and lists
  Ursa as pending activation) is real and is recorded as debt here, not
  fixed here.
- The duplicated product copy between `numinia-nwos` and `nwos-deploy`.
  `BLU-008` stays where it is; deciding which of the three copies
  is the master is a separate, still-open question.
- `blueprints/INDEX.md`, already flagged as stale by `ADR-032` (now in `ADR-030`).

---

## Acceptance criteria

Every criterion below is false at `ca62d86`.

```
✓  ls blueprints/BLU-*.md            → 2 files    (today: 8)
✓  ls system/SYS-*.md                → 3 files    (today: no such folder)
✓  ls history/*.md                   → 1 file     (today: no such folder)
✓  node scripts/lint-frontmatter.mjs → exit 0     (today: passes, must keep passing)
✓  node scripts/lint-naming.mjs      → exit 0     (today: passes, must keep passing)
✓  npm run build (web/)              → exit 0     (today: passes; SYS-003's removal
                                                   from the blueprints collection
                                                   would throw without the repoint)
✓  node scripts/check-url-lifecycle.mjs → exit 0  (today: passes; 7 addresses die
                                                   in this mission and must be
                                                   redirected, not dropped)
✓  node scripts/check-references.mjs → exit 0
```

- [ ] `system/` and `history/` exist, are registered in `ADR-005`, and are
      mapped in `S-005` §2
- [ ] No public address that resolved at `ca62d86` returns 404 after this
      mission — each is redirected to where its content went
- [ ] `BLU-008` stays in `blueprints/` and its two public addresses stay
      alive — out of scope, declared as debt below rather than moved
- [ ] The `git mv` history of every moved file is preserved (moves, not
      delete-and-create)

---

## Written resolution — where each moved document went

`check-deletable.mjs` test 3 is not machine-checkable: it asks for a living
document that records the outcome. This is that record.

| Was | Is now | Why |
|---|---|---|
| `BLU-001` wardley-map | `reports/RPT-2026-04-07-wardley-map.md` | Dated strategic analysis. Keeps CC0 by REUSE override. |
| `BLU-003` mission-system | `history/2026_04_07-Mission_System_v2-v1.0.0.md` | Self-declared superseded by MIS-066. |
| `BLU-004` cao-architecture | `system/SYS-001-cao-architecture.md` | Reference manual. Content known stale — see debt below. |
| `BLU-005` archive-fondos | `system/SYS-003-archive-fondos.md` | Reference manual + live data for `/archive`. |
| `BLU-006` agent-experience | `system/SYS-002-agent-cycle.md` | Reference manual. |

The left column names identifiers, not paths: each file lived under
`blueprints/` at `ca62d86` and none of those paths exists now. The
identifiers still resolve — `former_id` in each moved file is what makes
that true, and `check-references.mjs` follows it.

Every retired public address 301s in `web/astro.config.mjs`. No identifier
was freed for reuse (`ADR-004` rule 4): each moved document carries
`former_id` and `former_id_note`.

`BLU-002` and `BLU-007` stay in `blueprints/`. They are designs that do not
exist yet, with open missions, which is what the folder is for.

`BLU-008` also stays, and it should not. It is product landing copy and by
this mission's own test it is mis-shelved. It is not moved because its
destination is `numengames/nwos-deploy`, which the Oracle ruled out of
scope; a move with no destination inside this repository is a deletion,
and deleting a live document to satisfy a taxonomy is the wrong trade.
The fault is left standing and named — see the debt below.

## Debt opened by this mission

- **`SYS-001` is stale and now says so.** It names `numinia-canon` as the
  central repository (renamed), presents Adonaz as an active agent (now
  Byblos), and lists Ursa as *"pending activation in 2026"* while Ursa is
  active and executing this mission. The move did not edit it — this
  mission moves files, it does not rewrite prose. An `accuracy_warning`
  field declares it in frontmatter.
- **`RPT-2026-04-07-wardley-map` preserves three internal contradictions**
  it declares itself: two coordinate sets, two component groupings, and a
  commoditisation window given as both 12-18 and 18-24 months. Reshelving
  dates them; it does not resolve them.
- **`BLU-008` is mis-shelved and stays mis-shelved.** It is product
  landing copy sitting in the folder for things that do not exist yet.
  Its shelf is `numengames/nwos-deploy`, which the Oracle ruled out of
  scope for this mission, so the fault is recorded rather than fixed.
  Closing it needs a decision this mission does not own: whether that
  repository receives corpus documents at all.
- **Three copies of the product description exist and have diverged.**
  `BLU-008` here, `web/src/views/HomeView.astro` here, and
  `src/pages/index.astro` in `nwos-deploy`. Measured: 32/48 prose strings
  byte-identical between `BLU-008` and this repo's home view, 27/36
  against the other repo's landing page. The `area` -> `territory` rename
  (`D-010`) reached only one of the three — `nwos.numen.games` still
  serves the retired field name today. Which copy is the master is
  **undecided** and is not this mission's to decide.
- **`SYS-002` no longer matches the page it was extracted from.** Its
  `extraction_note` cited `web/src/pages/agente.astro`, deleted in
  `61353f6`. Its successor is in Spanish; the document is in English
  (`MIS-116`, `ADR-023` (formerly `ADR-024`)). Zero prose strings are
  shared. The note now records this instead of asserting an extraction
  that is no longer true.

## Closure

*(Filled when the mission closes.)*
