---
id: "ADR-004"
uid: "01a0345f-3d21-7c48-9b17-2e5a8f4d0c93"
title: "Document identifiers are opaque, sequential and permanent"
type: adr
status: active
version: "1.0.0"
created: "2026-08-24T15:00:00Z"
author: "ursa"
owner: "oracle"
tags: [decisions, adr, identifiers, naming, archive, provenance]
adr_id: "ADR-004"
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

## Context

Every series in this repository already follows the same identifier shape:

| Series | Prefix | Count | Consistency |
|---|---|--:|---|
| `missions/` | `MIS-NNN` | 105 | 100 % |
| `protocols/` | `P-NNN` | 11 | 100 % |
| `decisions/` | `ADR-NNN` · `DEC-NNN` | 3 + 6 | 100 % of shape, **two prefixes** |
| `reports/daily/` | `RPT-YYYY-MM-DD` | 8 | 100 % |
| `canon/` | `C-NNN` | partial | not all documents carry one |

**No decision records this.** It is a convention of fact: obeyed without
exception for 105 missions, and written down nowhere. A convention nobody has
recorded is a convention anybody may change without knowing it was a decision.

The cost of that silence is measurable. A grep across the corpus finds
**1,619 textual references** to identifiers — `MIS-056` alone is cited 85
times, `C-005` 64 times, `P-003` 62 times. These are **plain-text mentions,
not markdown links**: no link checker sees them, no CI job validates them, and
a rename breaks them silently and invisibly.

> An identifier in this corpus is not a filename. It is the only stable handle
> that connects a document to the 1,619 places that talk about it.

A proposal to move to a date-namespaced format prompted this ADR. It is
rejected below, but the substantive question it raised — *what belongs in an
identifier* — deserves an answer that outlives the proposal.

## Decision

**1. Shape.** `<PREFIX>-<NNN>` for series documents, zero-padded to three
digits. The filename adds a slug in English kebab-case:
`MIS-085-web-codex-reader-lap.md`. The identifier is the prefix and number;
the slug is a human courtesy and may be corrected without consequence.

**2. Identifiers are opaque.** An identifier MUST NOT encode any attribute
that can change: status, guild, territory, owner, version, or date. Those are
frontmatter fields. This is the same principle that keeps missions in one flat
folder with their state in `status:` — an identifier that changes when a
property changes is not an identifier.

**3. Time-based prefixes are for events, not documents.** `RPT-YYYY-MM-DD` is
correct because a daily report *is* its date: the date is the report's
identity, not a mutable attribute of it. This is the sole exception, and it is
an exception by nature, not by convenience.

**4. Numbers are never reused and never renumbered.** The gap between
`MIS-096` and `MIS-100` stays open. A retired, cancelled or deleted document
does not free its number: the 1,619 references in the corpus, in agent memory
and in commit messages continue to mean what they meant.

**5. Allocation.** The next free number is computed over what is **committed**,
after `git pull` — never over the working tree. On collision, the first commit
keeps the number and the second renumbers, correcting its own references.
(Rule already recorded in P-010 §3.1, born from the MIS-090/091 collision.)

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

## Alternatives discarded

- **Date-namespaced identifiers (`2026-08-18-MIS-085`).** Rejected on two
  counts. It embeds a mutable-looking attribute in an opaque handle, violating
  rule 2; and migration would rewrite 1,619 plain-text references with no tool
  able to verify the result. The breakage would be silent — the worst kind
  this corpus produces.

- **Content-hash identifiers.** Rejected: the identifier would change with
  every edit, which is the opposite of an identifier. Content addressing
  answers "is this the same bytes", not "is this the same document".

- **UUID as the human identifier.** Rejected: unusable in conversation, in
  commit messages and in agent reasoning. `uid:` already covers the machine
  case (rule 8); a human needs a handle short enough to say out loud.

- **Renumbering to close the MIS-096→100 gap.** Rejected: the gap is
  historical evidence, not disorder. Closing it would invalidate every
  reference above 096 to save nothing.

- **Recording nothing, keeping the convention informal.** Rejected: this is
  the status quo, and it is why this ADR exists. A convention that is not
  written cannot be cited, defended, or deliberately changed.

## Consequences

✅ The format that 105 missions already follow becomes citable and defensible
✅ A future proposal to change identifiers must supersede a decision, not just
   overrule a habit
✅ The `ADR-`/`DEC-` ambiguity closes without touching a single existing file
✅ Cross-repository citation stops being ambiguous
⚠️ The 1,619 textual references remain unverified: **no CI job validates that
   a cited identifier exists.** This ADR makes the risk explicit; it does not
   fix it. A reference lint is the natural follow-up
⚠️ `canon/` does not consistently apply `C-NNN`; several documents carry no
   identifier at all. Out of scope here — it belongs to the archive
   restructuring
⚠️ 33 documents carry hand-authored `uid` values with the shape of UUIDv7 but
   not the provenance, two of which collided. Rule 8 declares them legacy
   rather than regenerating them: they are evidence of the system's evolution,
   and rewriting them would break exactly what rule 4 protects

## Note on why this is recorded now

This decision changes nothing about the repository. Every rule in it describes
what is already true.

That is the point. The most dangerous conventions are the ones everybody obeys
and nobody wrote down: they cannot be cited when questioned, and they are
changed by accident rather than by decision. Recording an existing practice is
cheaper than recovering from its unrecorded loss.

---

## Version history

- v1.0.0 (2026-08-24) — Initial decision. Records the identifier convention in
  use since 2026-04-06, and closes the `ADR-`/`DEC-` prefix ambiguity.

*Proposed by: Ursa · Oracle: pending*
