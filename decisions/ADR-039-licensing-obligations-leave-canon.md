---
id: "ADR-039"
uid: ""
title: "Canon states why, a standard states what: the licensing obligations leave CAN-005"
type: adr
status: active
version: "1.0.0"
created: "2026-09-07T10:40:00+02:00"
updated: "2026-09-07T10:40:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
license: "CC-BY-4.0"
tags: [canon, standards, licensing, axis]
threshold: sealed
related: ["CAN-005", "STD-010", "MIS-0146", "DBT-016", "ADR-036"]
---

# ADR-039 — Canon states why, a standard states what

## Status

Accepted, 2026-09-07. Authorised by the Oracle in session; this record exists
because `CAN-005` carries `threshold: sealed`, which requires an ADR naming the
reason before the canon may change.

## Context

The corpus is organised on an axis the Oracle stated on 2026-09-06: **canon says
why, a standard says what, a protocol says how.**

Measured against the tree the same day, the axis holds everywhere except in two
places. `CAN-004` has one section carrying six obligations. `CAN-005` carries
**40** — more than the other six canons put together, which hold eleven between
them. Of nine sections, six were obligation tables, mechanics of declaration, or
a copy-paste artifact.

`CAN-005` was not a canon with some rules in it. It was a standard with a canon's
first section.

The consequence is not aesthetic. A reader looking for *what must I do about
licences* had to read 3,156 words of a `sealed` document to find it, and a reader
looking for *why do we license this way* had to skip six sections of tables. Both
questions had one answer file, and neither was served well.

## Decision

**The obligations move to a new standard, `STD-010`. The canon keeps the
reasoning.**

Sections 2, 3, 5, 6, 8 and 9 of `CAN-005` are emptied to pointers. The two
publication gates in section 4 move with them. What stays is: the four regimes
and why each exists, that silence does not declare, the irrevocable `CC0-1.0`
grant over `canon/`, that opening is an act and closing is impossible, and the
trademark boundary.

**A new registration, not a rename.** `STD-010` is a new document at `0.1.0` and
`draft`. `CAN-005` goes to `2.0.0` — major, per `CORE-23`, because obligations
were withdrawn from it even though they survive elsewhere.

**Section numbers stay.** Every emptied heading keeps its number and holds a
pointer. Twenty-seven citations across the corpus name these sections by number,
including `REUSE.toml`, `TRADEMARKS.md`,
`LICENSES/LicenseRef-Numen-AllRightsReserved.txt` and
`scripts/check-license-frontmatter.mjs`. Renumbering would break every one of them
without producing an error. The coupling is registered as `DBT-016`; this decision
does not resolve it, it declines to make it worse.

**The `CLAUDE.md` fragment moves with the obligations.** It summarises what must
be done, it has a propagation guard behind it (`MIS-0068`), and it must be
maintained beside the rules it compresses.

## Consequences

**Two things become true that were not.** The question *what must I do about
licences* has one home. The question *why* has a different one, and it is 1,232
words instead of 3,156.

**One thing gets worse before it gets better.** The corpus grows: the amendment
note, the pointers and the conformance table are new text. `MIS-0146` already
records that word count is the wrong measure for this operation — what moves is
contradictions, not words.

**A gap is now visible that was hidden.** `STD-010` §7 states, which `CAN-005`
never did, that **five of the seven licensing obligations have no guard**, and
that the AGPL-import lint rule §2 describes **does not exist**. Moving the rules
into a standard forced writing a conformance table, and the table is mostly
`[MANUAL]`. That is not a regression; it is the first honest statement of where
licensing enforcement actually stands.

**`STD-010` opens at `draft` and binds nobody yet.** It is not ratified. Until it
is, the operative text is the `CLAUDE.md` fragment, as it already was.

**The `[UNIVERSAL]`/`[NUMEN]` marks did not survive the move.** They record scope
for future promotion to a higher organisation's canon — a property of canon. They
were dropped from the standard rather than carried over meaninglessly.

## Alternatives considered

**Fold licensing into `STD-005`, the engineering standard.** It already mentions
licences 16 times. Rejected: licensing is not engineering, and burying 40
obligations inside a document about something else reproduces the defect being
fixed, one level down.

**Use the `[UNIVERSAL]`/`[NUMEN]` marks as the cut.** Rejected, and worth
recording because it is a plausible mistake: those marks split *generic* from
*business-specific*, which would send the SPDX mechanics down to the standard and
keep the four regimes in canon. That is a defensible cut for a different purpose,
and it is not the canon/standard cut.

**Leave it and note the debt.** Rejected: the Oracle instructed the move, and the
axis is unenforceable if its clearest violation is documented rather than fixed.
