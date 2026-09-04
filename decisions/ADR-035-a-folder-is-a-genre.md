---
id: "ADR-035"
uid: ""
title: "A folder is a genre: system/ and history/ open, and five blueprints move to the shelf their content belongs on"
type: adr
status: active
version: "1.0.0"
created: "2026-08-31T22:15:00+02:00"
updated: "2026-08-31T22:15:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [taxonomy, blueprints, series, prefixes, ADR-004, ADR-005, S-005]
license: "CC-BY-4.0"
related: ["ADR-004", "ADR-005", "ADR-030", "PRO-010", "MIS-129"]
---

# A folder is a genre

> **Summary:** `blueprints/` held eight documents of four genres. Two are
> blueprints. This ADR opens `system/` (reference manuals, prefix `SYS`) and
> `history/` (superseded records, no series), moves five documents out, and
> records the renumbering under `ADR-004` rule 4.
> **Epistemic:** `ADR-032` (now in `ADR-030`) ruled on blueprints whose foundation is dead.
> This rules on the other failure — blueprints that were never blueprints.
> A dead plan is a lifecycle problem; a misfiled manual is a taxonomy one,
> and they need different instruments.
> **Pragmatic:** Before creating a document, ask what genre it is. If the
> answer is not in `STD-001` §2, that is a missing shelf, not a reason to use
> the nearest one.

## Decision (Oracle, 2026-08-31)

**1. `system/` opens, prefix `SYS-NNN`.** Genre: reference manuals of how
the system works *today*. Distinct from `standards/` (how documents must
be written), `protocols/` (steps to follow) and `blueprints/` (what does
not exist yet). Verified collision-free against the whole corpus before
assignment, per `ADR-005`'s own procedure. `ARC` was rejected: it already
names the eight architecture rules in `STD-005-engineering-standards.md`.

**2. `history/` opens, no series.** Genre: superseded design records —
documents whose direction was abandoned but whose text is evidence of
what was tried. They keep the frozen-artefact filename of `S-005` §3.2
(`YYYY_MM_DD-Title-vX.Y.Z`) because that shape is already the
archive's visible mark for *"this is a photograph, not a living
document"*. Giving them a number would assert they are living documents,
which is precisely what the shelf denies.

**3. The moves.**

| From — in `blueprints/` at `ca62d86` | To | Genre |
|---|---|---|
| `BLU-004` cao-architecture | `system/SYS-001-cao-architecture.md` | reference |
| `BLU-006` agent-experience | `system/SYS-002-agent-cycle.md` | reference |
| `BLU-005` archive-fondos | `system/SYS-003-archive-fondos.md` | reference |
| `BLU-003` mission-system | `history/2026_04_07-Mission_System_v2-v1.0.0.md` | superseded |
| `BLU-001` wardley-map | `reports/RPT-003-wardley-map.md` | report |

`BLU-002` and `BLU-007` stay. They are what the folder is for.

`BLU-008` also stays, and its genre is the one exception this ADR declares
without acting on. It is product landing copy, 75% byte-identical to the
`nwos.numen.games` home; by this ADR's own test it does not belong in
`blueprints/`. It is not moved because its destination is another
repository, and a move whose destination is out of scope is not a move —
it is a deletion with a story attached. The shelf is wrong and stays
wrong, declared here rather than fixed quietly. `MIS-129` records it as
the debt it is.

**4. `ADR-004` rule 4 is exercised, not bypassed.** Renumbering requires
three conditions, met here and recorded:

1. *Measurable violation* — six documents carry a series prefix whose
   genre they do not belong to, and five are renumbered here. `S-005` §2
   asserts one genre per folder; the folder asserted otherwise about six
   of its eight documents.
2. *Consumers enumerated first* — every citation, both `/archive` pages
   that read `SYS-003`'s frontmatter, seven public URLs, the Astro
   collection glob, and the URL baseline. All listed in `MIS-129` before
   the move.
3. *Verified after* — `check-references.mjs`, `lint-frontmatter.mjs`,
   `lint-naming.mjs`, a real build, and `check-url-lifecycle.mjs` clean
   in the same PR.

Each moved document carries `former_id` and `former_id_note` in
frontmatter. The old identifier is not freed and is not reused
(`ADR-004` rule 4, final clause).

**5. Every retired address is redirected, not dropped.** `ADR-033` (now in `ADR-030`) rules
that a document may be deleted when its consumers are zero or
redirected. Twelve public addresses die here — five documents across the
English and Spanish route aliases, plus the two `mission-system-v2`
aliases `MIS-127` had already redirected once. Each gets a redirect to
where its content went, chained so no crawler takes two hops.
`check-url-lifecycle.mjs` is the proof.

**6. `blueprints/` remains an operational series** (`ADR-032` (now in `ADR-030`) §1). This
ADR amends `S-005` §2's table by adding two rows; it does not touch
`ADR-032` (now in `ADR-030`)'s extinction rule or its list of operational series.
