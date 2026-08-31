---
id: "ADR-005"
uid:
title: "Registration prefixes: the 13-series register (superseded amendment, MIS-125)"
type: adr
status: active
version: "1.1.0"
created: "2026-08-25T01:30:00Z"
updated: "2026-08-31T09:40:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [decisions, adr, identifiers, prefixes, registration, canon]
license: "CC-BY-4.0"
related: ["ADR-004", "S-001", "MIS-109", "D-008"]
evidence_script: "scripts/resolve-citations.py"
evidence_head: "9b45016"
---
# ADR-005 — Registration prefixes: the 13-series register

## Status

**Active.** Ruled by the Oracle, 2026-08-24. Amended by the Oracle,
2026-08-31 (`MIS-125`) — see **v1.1.0 amendment** below; the original
2026-08-24 ruling on `S-`/`AG-`/`O-`/`D-` stays in force and is preserved
under **Original ruling (v1.0.0, 2026-08-24)**.

## v1.1.0 amendment — the 13-series register (Oracle, 2026-08-31)

`MIS-125` measured the corpus against this ADR and found it registered 8
series while the corpus carries identifiers in at least 12 (13, counting
`reports/` as one after the merge below). Four whole series had never been
registered at all: `blueprints/`, `operations/`, `guilds/`, `infra/`.

**The full register, as of this amendment:**

```
missions   MIS-NNNN (4 digits — see note below)
decisions  ADR-NNN (canonical) · DEC-NNN (legacy, frozen, rule 6 below)
protocols  PRO-NNN
debt       DBT-NNN
standards  STD-NNN
canon      CAN-NNN
operations OPS-NNN
agents     — (no prefix, identified by folder name — see reversal below)
reports    RPT-NNN, subtype: daily | audit (merger — see below)
blueprints BLU-NNN
guilds     GLD-NNN
infra      INF-NNN
```

The eight new three-letter prefixes (`PRO DBT STD CAN OPS BLU GLD INF`) were
verified against the full corpus at rename time — zero collisions.

**`missions/` moves to 4-digit padding (`MIS-NNNN`), not urgency-driven.**
Measured mission rate: 128 missions in 145 days (2026-04-07 → 2026-08-30,
≈0.88/day). At that rate 3-digit `MIS-NNN` (cap 999) has roughly 2.7 years
of headroom — not the "a few months" the original premise assumed. The
4-digit move happens anyway, for cheap margin, not measured urgency.

**`reports/` merges `RPT`/`AUD` into one prefix.** Both series named the
same folder-level ambiguity `ADR-004` had already fixed for `ADR`/`DEC` —
one prefix per genre, no formal decision separating two. `RPT` was chosen:
already in use, zero new-letter cost. `daily/` and `audits/` are
distinguished by `subtype: daily` / `subtype: audit` in frontmatter, not by
prefix.

**`agents/` reversal — `AG-NNN` (v1.0.0 below) is withdrawn, not applied.**
The original 2026-08-24 ruling assigned `agents/` the prefix `AG-NNN` at
zero cost, since no agent identifier had ever been issued. That ruling was
never executed — `D-008` still measures `agents/` at 0/17 registered, and
`S-001` §4.1 records the assignment without a single folder ever having
carried it. **Reversed by Oracle instruction, 2026-08-31: `agents/` stays
outside the register, identified by folder name** (`agents/lexa/`) — with
only 7 agents today (measured `ls agents/*/`, excluding `_template/`; the
plan that opened this mission said 8 — uncorroborated, corrected here), the
name is more informative than a number would be. This is a genuine reversal
of an active decision, recorded as one rather than silently overwritten:
`D-008`'s `agents/` row closes by **withdrawn scheme**, not by coverage,
per its own closing condition (*"the Oracle withdraws the scheme for a
given series and `S-001` records the exception"*). `S-001` §4.1 and
`STANDARDS.md`'s mapping to it need the same correction, and `D-008`'s own
`17` figure is stale too (also unverified against current `agents/`) —
tracked as follow-up, not done in this amendment.

## Original ruling (v1.0.0, 2026-08-24)

## Context

`S-001` §4.1 introduced four new prefixes — `S-` for `standards/`, `A-` for
`agents/`, `O-` for `operations/`, `D-` for `debt/`. Two collisions were then
found by measurement, and an alternative scheme was proposed.

### Collision 1 — `S-` is already the seminal numbering, and `S-001` is taken twice

`canon/INDEX.md` registers `S-001`…`S-010` against real documents. **Nine of the
ten resolve to a file that exists.** The index also carries a relationship graph
built on those numbers:

```
| S-001 Welcome | `summarizes` | S-002, S-005, S-006 |
| S-008 RPG Manual | `is_narrative_of` | S-… |
```

and `STANDARDS.md` documents `S-` as *Seminal* in its own prefix table.

**So `S-001` currently identifies two live documents**: this archive's glossary,
and `Welcome to Numinia`.

> A registration scheme that assigns the same number to two live documents is
> not a scheme.

Measured with `scripts/resolve-citations.py` at `9b45016`: **40 of the 88
unresolved citations in the corpus are `S-002`…`S-010`.**

### Collision 2 — `A-` is already used for audit findings

Found while verifying that the other three prefixes were clean, after the Oracle
had stated they were:

```
blueprints/AUDIT-2026-04-07-web-vs-repo.md:43   ### A-001 — CAO dashboard frozen
reports/audits/AUD-2026-04-07-system-audit.md  …resolves A-001, A-002, A-003…
```

`A-001`…`A-016` are numbered findings inside two audits, **and they are cited
from a different document than the one that defines them** — which is what makes
this a collision rather than local numbering.

`O-` and `D-` were verified clean. `D-` is in live use across this session's
twenty debt entries.

### The rejected alternative

A scheme of `STD-` / `AGT-` / `OPS-` / `DEBT-` was proposed, which would have
removed the `S-` collision without renumbering canon.

## Decision

**1. `S-` stays with `standards/`.** The seminal numbering retires to `C-NNN`
inside `MIS-109`, at the measured cost of 40 citations plus the relation graph
in `canon/INDEX.md`.

**2. `agents/` takes `AG-NNN`, not `A-NNN`.**

**3. `O-` and `D-` are unchanged.**

**4. `STD-` / `AGT-` / `OPS-` / `DEBT-` are rejected.**

## Rationale

### Why not the four-prefix rename

The proposal bundled four prefixes when **only one collided**. `O-` and `D-` have
no conflict, and `D-` is already in live use — renaming it would touch **121
citations across 18 identifiers**, to avoid a collision that costs 40.

> 121 citations to avoid 40 is the wrong trade.

`ADR-004` also applies directly: identifiers are never renumbered. Renaming a
prefix in live use is renumbering by another name, and it would be doing it to
buy symmetry.

### Why `AG-` and not `A-`, when the same argument seems to point the other way

It looks inconsistent with the paragraph above, and it is not. The difference is
**cost**, not principle:

- `D-` renaming costs 121 citations, because 18 identifiers are issued and cited.
- **`A-` renaming costs zero.** `agents/` is at 0/5 registration — *not one
  identifier has been issued.*

The Oracle's reasoning, recorded because it generalises:

> *"Preventing today that someone has to work out from context whether `A-003`
> is an agent or an audit finding is cheaper than fixing it a year from now."*

An ambiguity that costs nothing to avoid before the first identifier is issued
costs a rename of the whole series afterwards. **The right moment to pick a
prefix is before it is used, and that moment is now.**

Note also that `A-NNN` findings are *section* identifiers inside a document —
the same class as `SEC-10` in `engineering-standards.md`, which
`resolve-citations.py` resolves to its container. They are not documents, and
they are not going away: the audits that define them are frozen records.
Coexistence would be possible. It would also be permanently ambiguous to a
reader, and readers are the point.

### Why canon renumbers rather than standards

Both would work. Canon renumbering was chosen because:

- **`C-NNN` is already the declared scheme for `canon/`** (`S-001` §4.1, and
  `C-005-licensing.md` already carries it). The seminal `S-` numbering is the
  anomaly, not the target.
- `MIS-109` is already opening every canon file for frontmatter, filenames and
  the `D-012` terminology divergence. **Renumbering is a fifth operation on
  files already being read**, not a new pass.
- Renaming `S-001-glossary.md` would mean touching the README and
  `GOVERNANCE.md`, which cite it by filename.

## Consequences

### Immediate

- `S-001` §4.1 changes `A-NNN` to `AG-NNN`. Cost: one table row. No file is
  renamed, because none was registered.
- `AG-` is verified clean: zero occurrences in the corpus.

### Deferred to `MIS-109`

- `canon/` renumbers `S-002`…`S-010` → `C-NNN`, and rewrites the relation graph
  in `canon/INDEX.md`.
- ~~`seminal_id` is retired from `canon/Numinia-El-juego-de-rol-manual-completo.md`.~~
  **Resolved 2026-08-25**: the file was retired entirely. The manual is not a
  document in this repository any more — `canon/INDEX.md` points at
  `numinia-lore`, so there is no `seminal_id` left to retire.
- `STANDARDS.md`'s prefix table drops `S-` = *Seminal*.
- 40 citations are updated, verified with `scripts/resolve-citations.py`.

### Not a consequence

**`S-001` is not signed by this ADR.** Until canon renumbers, a signed `S-001`
would declare `S-NNN = standards` while canon declares `S-NNN = seminal`. The
signature is an acceptance criterion of `MIS-109`.

## Both collisions are recorded, at the Oracle's instruction

Because a decision that hides what it cost is worth less than one that shows it:

1. **`S-001` was occupied twice** — by the glossary and by `Welcome to Numinia`.
2. **`A-` was already in use** for audit findings, and was believed clean when
   the ruling was first given. It was found by verification, not by review.

The second is the more useful record. The instruction *"stop and tell me if
`A-`, `O-` or `D-` collide with something I do not know about"* is what produced
it — a ruling issued with an explicit condition for being wrong.

## References

- `ADR-004` — identifiers are opaque, sequential and permanent
- `S-001` §4.1 (prefixes) · §4.3 (canon registration plan)
- `MIS-109` — make canon filable
- `D-008` — series prefixes not applied to the existing corpus
- `D-018` — unresolved authority citations; 40 of its 88 are this
- `scripts/resolve-citations.py` — the measurement behind every figure here
- `MIS-125` — the 13-series register, v1.1.0 amendment above

## Version history

- v1.1.0 (2026-08-31) — `MIS-125`. Register expanded from 8 series to 13:
  four previously-unregistered series added (`blueprints`, `operations`,
  `guilds`, `infra`) with new collision-free 3-letter prefixes; `reports/`
  merges `RPT`/`AUD` into one prefix with a `subtype` field; `missions/`
  moves to 4-digit padding; `agents/` reverses the v1.0.0 `AG-NNN` ruling
  and stays unregistered, by folder name.
- v1.0.0 (2026-08-25) — Initial ruling: `S-` stays with `standards/`,
  `agents/` takes `AG-NNN` (later reversed, see v1.1.0), `O-`/`D-`
  unchanged.
