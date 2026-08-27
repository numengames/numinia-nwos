---
id: "ADR-024"
uid:
title: "English is the base language of every summa document; C-005 §5 is amended"
type: adr
status: active
version: "1.0.0"
created: "2026-08-27T00:00:00Z"
created_source: "git:pending"
created_confidence: "exact"
updated: "2026-08-27T00:00:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [decisions, adr, canon, i18n, language, C-005, DEC-006, canon-change]
license: "CC-BY-4.0"
adr_id: "ADR-024"
supersedes: ""
related: ["DEC-006", "MIS-116", "C-005"]
---
# ADR-024 — English is the base language of every summa document

## Status

**Active.** Ruled by the Oracle, 2026-08-27, inside MIS-116.

## Context

Two norms in this repository contradict each other, and the contradiction
surfaced when MIS-116's language scan reached `canon/`:

- **DEC-006** (2026-04-07) declares English the sole official language of the
  canonical repo. Its scope table covers repo documents, frontmatter, and the
  seminal canon.
- **C-005 §5** (v1.3.0, 2026-08-16) orders the opposite for itself:
  *"Este canon es gobierno interno y permanece en `es-ES`"* — a MUST-level
  provision, echoed in its frontmatter (`idioma_canonico: es-ES`). C-005
  entered the canon four months after DEC-006 without recording the conflict.

C-005's rationale was audience separation: enforceable artifacts (`LICENSE`,
`LICENSES/`, `TRADEMARKS.md`, `NOTICE`, CLA, the §9 fragment) go in English
because they are what a third party is held to; the canon's own normative
reasoning was declared internal governance and kept in Spanish.

That separation no longer holds. Numinia builds in public (DEC-002) for
international adoption; NWOS's governance documents ARE part of what an
adopting organization reads. A canon a cold reader cannot parse is not
internal — it is opaque.

The canon's modification policy (`canon/INDEX.md`) requires exactly this
route: document the discrepancy as an ADR in `decisions/`, decide explicitly,
and carry the change with Oracle consensus and the `canon-change` label.

## Decision

**English is the base language of every summa document in this repository —
canon included.** C-005's language exception is revoked:

1. C-005 §5's provision *"Este canon es gobierno interno y permanece en
   es-ES"* is amended to require English for the canon itself, alongside the
   enforceable artifacts it already governed.
2. C-005's frontmatter `idioma_canonico` moves to `en`, with the history
   noted inline.
3. The translation of C-005's body is executed as a separate PR under
   MIS-116 (`canon/` row), after this ADR merges — amendment and translation
   are two acts, not one diff.

**Sole exception, recorded as debt:** the RPG manual
(*Numinia — Manual del juego de rol*, `numinia-lore`). It is lore under
reserved rights, its source of truth lives outside this repository, and its
129k words make translation a project of its own. It remains in Spanish as
**acknowledged debt**, not as policy — no other document inherits this
exception. `canon/archive-lore.md` remains out of scope as lore (C-005 §2:
reserved narrative), consistent with DEC-006's stylistic-phrases exception.

## Consequences

- DEC-006 now holds without carve-outs for governance documents: one
  language, one source of truth, web layer owns i18n.
- C-005 gains a version entry (1.4.0) recording the amendment; the canon's
  immutability policy is satisfied by this ADR + `canon-change` PR + Oracle
  sign-off.
- MIS-116's `canon/` row can include C-005 once this ADR merges.
- Future canon documents are born in English; `idioma_canonico: es-ES` is no
  longer a valid state for summa documents.

## Discarded alternatives

- **Keep the C-005 exception** — leaves a permanent Spanish island in the
  governance layer of a repo built for international adoption, and leaves
  DEC-006 permanently contradicted by a later, lower-authority provision.
- **Translate C-005 silently inside the MIS-116 row** — a normative amendment
  disguised as an i18n diff; violates the canon's own modification policy.

---

## Version history

- v1.0.0 (2026-08-27) — Initial decision. Oracle ruling inside MIS-116.
