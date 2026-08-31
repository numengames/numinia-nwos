---
id: "ADR-035"
uid: ""
title: "A folder is a genre: system/ and history/ open, and six blueprints move to the shelf their content belongs on"
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
> `history/` (superseded records, no series), moves six documents out, and
> records the renumbering under `ADR-004` rule 4.
> **Epistemic:** `ADR-032` (now in `ADR-030`) ruled on blueprints whose foundation is dead.
> This rules on the other failure — blueprints that were never blueprints.
> A dead plan is a lifecycle problem; a misfiled manual is a taxonomy one,
> and they need different instruments.
> **Pragmatic:** Before creating a document, ask what genre it is. If the
> answer is not in `S-005` §2, that is a missing shelf, not a reason to use
> the nearest one.

## Context

`S-005` §2 maps genre → folder → ID → web section. It has ten rows. The
corpus has more genres than that, and the overflow landed in
`blueprints/` because it was the only folder whose name did not obviously
reject a document.

Measured at `ca62d86`, the eight `BLU-*` files are:

| Document | Genre | Evidence it is not a blueprint |
|---|---|---|
| `RPT-2026-04-07-wardley` Wardley map | Report | A dated market analysis whose central claim is a countdown that started 2026-04-07 |
| `BLU-002` Business metrics | Blueprint | Framework designed, not built; blocked on Oracle input |
| `the Mission System v2 record` Mission system v2 | Superseded record | Its own opening banner declares it replaced by MIS-066 |
| `SYS-001` CAO architecture | Reference manual | Describes what is wired today, in the present tense |
| `SYS-003` Archive fondos | Reference manual | Describes the seven fondos that exist; also carries live page data |
| `SYS-002` Agent cycle | Reference manual | Describes how an agent operates today |
| `BLU-007` Dual nomenclature | Blueprint | Design in progress, MIS-055 open |
| `BLU-008` NWOS system | Product copy | 75% of its prose strings are byte-identical to `nwos-deploy`'s landing page |

The archive's own definition of the folder is in `SYS-003` itself —
*"unmanifested potential; the future lives here before becoming
present"*. Six of eight fail it.

This is not `ADR-032` (now in `ADR-030`)'s case. None of these six has a dead foundation;
they are alive and shelved wrong. Extinguishing them would destroy
content that is correct, merely misplaced.

## Decision (Oracle, 2026-08-31)

**1. `system/` opens, prefix `SYS-NNN`.** Genre: reference manuals of how
the system works *today*. Distinct from `standards/` (how documents must
be written), `protocols/` (steps to follow) and `blueprints/` (what does
not exist yet). Verified collision-free against the whole corpus before
assignment, per `ADR-005`'s own procedure. `ARC` was rejected: it already
names the eight architecture rules in `engineering-standards.md`.

**2. `history/` opens, no series.** Genre: superseded design records —
documents whose direction was abandoned but whose text is evidence of
what was tried. They keep the frozen-artefact filename of `S-005` §3.2
(`YYYY_MM_DD-Title-vX.Y.Z`) because that shape is already the
archive's visible mark for *"this is a photograph, not a living
document"*. Giving them a number would assert they are living documents,
which is precisely what the shelf denies.

**3. The moves.**

| From | To | Genre |
|---|---|---|
| `system/SYS-001-cao-architecture.md` | `system/SYS-001-cao-architecture.md` | reference |
| `system/SYS-002-agent-cycle.md` | `system/SYS-002-agent-cycle.md` | reference |
| `system/SYS-003-archive-fondos.md` | `system/SYS-003-archive-fondos.md` | reference |
| `history/2026_04_07-Mission_System_v2-v1.0.0.md` | `history/2026_04_07-Mission_System_v2-v1.0.0.md` | superseded |
| `reports/RPT-2026-04-07-wardley-map.md` | `reports/RPT-2026-04-07-wardley-map.md` | report |
| `blueprints/BLU-008 (deleted 2026-08-31)` | `numengames/nwos-deploy` | product copy |

`BLU-002` and `BLU-007` stay. They are what the folder is for.

**4. `ADR-004` rule 4 is exercised, not bypassed.** Renumbering requires
three conditions, met here and recorded:

1. *Measurable violation* — six documents carry a series prefix whose
   genre they do not belong to. `S-005` §2 asserts one genre per folder;
   the folder asserted otherwise about six of its eight documents.
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
redirected. Seven public addresses die here. Each gets a redirect to
where its content went. `check-url-lifecycle.mjs` is the proof.

**6. `blueprints/` remains an operational series** (`ADR-032` (now in `ADR-030`) §1). This
ADR amends `S-005` §2's table by adding two rows; it does not touch
`ADR-032` (now in `ADR-030`)'s extinction rule or its list of operational series.

## Alternatives discarded

- **Extinguish the six under `ADR-032` (now in `ADR-030`).** Rejected: their foundation is
  alive. `ADR-032` (now in `ADR-030`)'s criterion is a dead cited decision, and none of the
  six qualifies. Stretching a lifecycle rule to solve a taxonomy fault
  would have destroyed correct content and left the taxonomy just as
  wrong.

- **Put the manuals in `standards/`.** Rejected: a standard says how a
  document must be written and can be complied with or violated. A manual
  of how the CAO is wired cannot be violated — it can only be accurate or
  stale. Different genre, different lifecycle, different failure mode.

- **Put the manuals in `protocols/`.** Rejected: a protocol is a sequence
  of steps with an actor. `SYS-001` has no steps.

- **Rename nothing and just fix `blueprints/`'s description.** Rejected:
  it would define the folder by what happens to be in it, which is how
  the drawer formed in the first place.

- **`history/` as a numbered series `HIS-NNN`.** Rejected: numbering
  asserts membership in a living register. `S-005` §3.2 already has the
  right shape for a photograph, and it is already enforced by
  `lint-naming.mjs` (N-02/N-03).

## Consequences

- `blueprints/` holds two documents, both of which match the folder's own
  definition. Opening it now predicts what you will read.
- Two shelves exist that did not, and `S-005` §2 has two more rows —
  which means the next manual has somewhere to go and will not silently
  become a blueprint.
- `SYS-001` moves to `system/` carrying content known to be stale (it
  names a repository since renamed, an agent since renamed, and lists
  Ursa as pending activation while Ursa is active). The move does not
  fix it and does not hide it: an `accuracy_warning` field declares it,
  and it is opened as debt. Moving a wrong document to the right shelf
  makes the wrongness visible instead of excusable.
- `RPT-2026-04-07-wardley-map` keeps three internal contradictions it
  declares itself. Reshelving does not resolve them; the report shelf at
  least dates them.
- `history/` starts with one document. A shelf with one item is a shelf,
  not a mistake — the alternative was leaving a self-declared superseded
  design in the folder for things that do not exist yet.

## Version history

- v1.0.0 (2026-08-31) — Initial ruling. `MIS-129`.
