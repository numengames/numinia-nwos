---
id: "ADR-004"
uid: ""
title: "Document identifiers are opaque, sequential and permanent"
type: adr
status: active
version: "1.1.1"
created: "2026-08-24T15:00:00Z"
updated: "2026-09-02T01:30:00+02:00"
author: "ursa"
owner: "oracle"
tags: [decisions, adr, identifiers, naming, archive, provenance]
decision: "Identifiers follow <PREFIX>-<NNN>; they carry no mutable attribute, are never reused, and are never renumbered"
superseded_by: null
license: "CC-BY-4.0"
---
# ADR-004 — Identifiers are opaque, sequential and permanent

> **Summary:** NWOS system document — what a document identifier may and may not contain.
> **Epistemic:** Why `MIS-085` is a good identifier and `2026-08-18-MIS-085-done` would not be.
> **Pragmatic:** Consult before creating a series, proposing an ID format, or renaming anything that carries one.
> **Audience:** Agents · Oracles

---

## Decision

**1. Shape.** `<PREFIX>-<NNN>` for series documents, zero-padded to three
digits. The filename adds a slug in English kebab-case:
`MIS-0085-web-codex-reader-lap.md`. The identifier is the prefix and number;
the slug is a human courtesy and may be corrected without consequence.
`missions/` pads the **filename** to four digits (`ADR-005` v1.1.0); the
`id:` field keeps the registered number — `MIS-085` in the example — so that
no citation, URL or relation entry changed when the shelf moved
(2026-09-02, the `MIS-0129` precedent applied to all 134).

**2. Identifiers are opaque.** An identifier MUST NOT encode any attribute
that can change: status, guild, territory, owner, version, or date. Those are
frontmatter fields. This is the same principle that keeps missions in one flat
folder with their state in `status:` — an identifier that changes when a
property changes is not an identifier.

**3. Time-based prefixes are for events, not documents.** `RPT-YYYY-MM-DD` is
correct because a daily report *is* its date: the date is the report's
identity, not a mutable attribute of it. This is the sole exception, and it is
an exception by nature, not by convenience.

**4. Numbers are never reused. They are not renumbered, except to repair a
broken registry, and only under three mandatory conditions:**

1. **Measurable collision or violation** — not aesthetic preference. A
   number identifying two live documents, or a series applying a scheme
   inconsistently, qualifies. A cleaner-looking number does not.
2. **Consumers enumerated first.** Every citation, cross-reference and
   relation graph entry the identifier touches is listed before the rename.
   If one cannot be updated in the same change, the renumbering is
   deferred and the document is marked `registration: exempt` with a
   reason instead of proceeding partially.
3. **Verified after the fact.** `scripts/check-references.mjs` run clean,
   plus a dated note in the renamed document's own version history — never
   a silent edit.

The gap between `MIS-096` and `MIS-100` stays open regardless: a retired,
cancelled or deleted document does not free its number.

> **Precedent, recorded retroactively (v1.1.0).** `MIS-109` (2026-08-25)
> renumbered canon's seminal series `S-002`…`S-010` → `C-NNN` — in fact an
> exercise of this exception, before this ADR ever stated it. Measured
> against the three conditions above: (1) collision — `STD-001` identified
> two live documents at once (this glossary and canon's own `Welcome to
> Numinia`); (2) consumers enumerated — 40 citations plus the relation
> graph in `canon/INDEX.md`, all updated in the same operation (`ADR-005`,
> `STD-001` v2.5.0); (3) verified — `scripts/resolve-citations.py` at the
> time, `check-references.mjs` did not exist yet. This ADR was never
> amended to say so until now, which let it contradict the repo it
> governs. It no longer does.

**5. Allocation.** The next free number is computed over what is **committed**,
after `git pull` — never over the working tree. On collision, the first commit
keeps the number and the second renumbers, correcting its own references.
(Rule already recorded in `PRO-010` §3.1, born from the MIS-090/091 collision.)

**6. One prefix per genre.** `ADR-` and `DEC-` currently name the same genre —
a recorded decision — with no declared boundary. **`ADR-` is canonical.**
Existing `DEC-NNN` documents keep their identifiers permanently (rule 4); no
new `DEC-` is created.

**7. Cross-repository citation.** `ADR-006` exists in this repository and in
`numengames/numinia-web` with different meanings. When citing across
repository boundaries, qualify: `nwos:ADR-006`, `web:ADR-006`. Within a
repository, the bare identifier remains correct.

**8. Identity beyond the identifier.** `uid:` (UUIDv7, STANDARDS §2) is the
identity that survives a rename, a move between folders and a migration
between repositories. The human identifier and the machine identifier serve
different purposes and neither replaces the other. Documents carrying a
hand-authored legacy `uid` declare `uid_legacy: true`; generated and authored
identifiers are never silently mixed.
