---
id: "canon-index"
title: "Canon — Index"
type: seminal
status: active
version: "1.2.2"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-08-27T18:31:54Z"
author: "pablo-fm"
owner: "oracle"
tags: [canon, index, seminal]
license: "CC-BY-4.0"
changelog:
  - version: "1.2.2"
    date: "2026-08-27T00:00:00Z"
    change: "Translated to English (MIS-116, ADR-024). C-005 listed as v1.4.0, language EN."
  - version: "1.2.1"
    date: "2026-08-16T00:00:00Z"
    change: "C-005 updated to v1.1.0 — repo is not a legal unit (apps/AGPL + packages/MIT via REUSE.toml), header exception for pinned files, CLA per repo."
  - version: "1.2.0"
    date: "2026-08-16T00:00:00Z"
    change: "Added C-005 Canon de Licencias — first operational canon (C-series) alongside the 10 seminales."
  - version: "1.1.0"
    date: "2026-04-07T12:59:00Z"
    change: "Added S-009 Rank Specifications (QA audit). Reclassified S-010 as meta-document. Total: 10 seminales."
  - version: "1.0.0"
    date: "2026-04-06T00:00:00Z"
    change: "Initial canon with 9 documents."
---
# Canon — Immutable Memory

> **Summary:** Foundational document of the Numinia universe.
> **Epistemic:** Foundational knowledge of the Numinia universe.
> **Pragmatic:** Canonical source of truth — consult before creating lore.
> **Audience:** Agents · Oracles · External readers

---


The foundational documents of Numinia. They are immutable by policy and by technical enforcement (CODEOWNERS). They are the ground everything else is built upon.

## Modification policy

**Nobody** may modify these documents once published. If a contradiction with operational reality is found:
1. Document the discrepancy in `decisions/` as an ADR
2. Decide explicitly: change the practice or update the canon
3. Updating the canon requires Oracle consensus + the `canon-change` label

## The seminal documents — C series

> **Renumbered on 2026-08-25 (`MIS-109` phase C).** The seminal series used
> `S-NNN`, which `ADR-005` assigned to `standards/`: `S-001` and `S-003` each
> meant two living documents. The seminals are now `C-NNN`. **The old number
> is kept in the table**: it is what documents prior to that date cite, and an
> identifier is a promise about the past (`ADR-004`).

| # | ID | Was | Document | File | Language | Value |
|---|----|-----|----------|------|----------|-------|
| 1 | **C-001** | `S-001` | Welcome to Numinia | `C-001-welcome-to-numinia.md` | EN | 9/10 |
| 2 | **C-002** | `S-002` | Numinia Brand & Culture | `C-002-brand-and-culture.md` | EN | 9/10 |
| 3 | **C-003** | `S-004` | Compendium of Attributes | `C-003-attributes-and-ranks.md` | EN | 9/10 |
| 4 | **C-004** | `S-005` | Role Structure | `C-004-role-structure.md` | EN | 10/10 |
| 5 | **C-005** | — | Licensing Canon | `C-005-licensing.md` | EN | — |
| 6 | **C-006** | `S-007` | About Session Zero | `C-006-session-zero.md` | EN | 8/10 |
| 7 | **C-007** | `S-009` | Rank Specifications | `C-007-rank-specifications.md` | EN | 7/10 |

**Seven seminal documents.** They started as ten: one changed series, one
lives in another repository and one was apparatus. All three are below,
because a reader who remembers ten has the right to know where they went.

### Dated documents, not numbered

Frozen artifacts (`P-010` §3.2): a dated name is a photograph, and
registration numbers living series. **They carry no `C-NNN`.**

| Was | Document | File |
|-----|----------|------|
| `S-003` | Epistemic Relations | `2026_04_15-Epistemic_Relations_Between_Numen_Games_and_Numina-v0.2.0.md` |
| — | Pragmatic Numen System | `2026_04_15-Pragmatic_Numen_System-v0.2.0.md` |

`Epistemic Relations` is the source of the *Germinal Motive /
Regulatory Model* distinction (`ADR-023`), and **this index's link pointed for
months at `Epistemic relations between Numen Games and Numinia.md`**, a name
retired when the document was re-uploaded dated 2026-04-15. Corrected in
that phase.

### The three no longer in the series

| Was | Document | Where it is | Why |
|-----|----------|-------------|-----|
| `S-006` | Platform Role System | **`standards/S-003-platform-role-system.md`** | Genre: a permissions matrix regulates an artifact, it does not name the world. `ADR-023`. Keeps its reserved regime (`D-030`) |
| `S-008` | Numinia — The Role-Playing Game | **`numinia-lore`**, outside this repository | The manual lives in the lore repository. Kept here as an external pointer: whoever fails to find it would conclude it does not exist, and it does |
| `S-010` | Archive System | `canon/README.md` | **Apparatus, not seminal**: it is regenerable from the others. An index that lists itself as foundational confuses instrument with record |

### Documents in `canon/` this index did not list

Found while verifying the count of ten, `MIS-109` phase C:

| Document | In the canon since |
|----------|--------------------|
| `2026_04_15-Pragmatic_Numen_System-v0.2.0.md` | 2026-04-15 — **four months unlisted** |
| `archive-lore.md` | 2026-08-17 |
| `C-005-licensing.md` | 2026-08-16 |

`Pragmatic Numen System` is the document whose §2.3 resolved the
`Functional`/`Regulatory` question in `ADR-023`: a document the canon's index
did not recognize was used as authority.

## Operational canon (C series)

Internal norms with canon rank: immutable except by formal consensus, but
operational in nature, not seminal. Authority: Brand & Culture > C-001…C-004
(NWOS workspace canon) > operational C series > any repository.

| # | ID | Document | File | Language | Version |
|---|----|----------|------|----------|---------|
| 1 | C-005 | Licensing Canon | `C-005-licensing.md` | EN | 1.4.0 |

## Canon that does not live in this repository

Documents with canon rank whose **source of truth is in another repository**.
They are not copied here: they are pointed at. A copy would be a second variant
aging on its own — which is exactly what produced the stub retired on 2026-08-25.

| Document | Source of truth | `derived_from` | Regime | Version |
|---|---|---|---|---|
| Numinia — The role-playing game manual | `numengames/numinia-lore` → `seminal/Numinia_Manual_del_juego_de_rol_v0_6_0.md` | — (it **is** the original; this repo does not derive, it points) | `LicenseRef-Numen-AllRightsReserved` (C-005 §2) | 0.6.0 |

**Replaces** `Numinia. El juego de rol (manual completo).txt` (S-008, v0.1.0,
4,667 lines) and `Numinia-El-juego-de-rol-manual-completo.md` (131 lines, a
stub that never contained the manual), both retired on 2026-08-25.

**Why a pointer and not a file.** The v0.6.0 manual is 129,087 words. In
`canon/` it would be globbed by `web/src/content.config.ts` (pattern
`canon/**/*.md`) and numinia.org would publish an 890 KB page — 2.6× the
heaviest on the site — plus the raw `.md` in the open. And there would be two
copies of the same document in two repos with no declaration of which rules:
the exact condition that produced the stub.

**Why no new ID.** A pointer is not a foundational document. Giving it a
`C-00N` and its own file manufactures the same object we just retired, with
better intentions. The index entry suffices and consumes no identifier.

**Verified 2026-08-25:** `numinia-lore` is public (`visibility: public`,
checked without credentials) and `seminal/**` declares an express reservation
of rights in its `REUSE.toml` — a decision signed by the Oracle on 2026-08-17
(MIS-085 D1). The pointer resolves for any reader and the content keeps its
regime.

**Source-document anomaly, recorded without correcting:** the manual's
«Fragmentos» numbering has gaps and one duplicate — ch. 2 jumps from 5 to 7;
ch. 3 jumps from 5 to 8; ch. 4 has two «Fragmento 6» (*Sistema de
Enfrentamientos* and *Estados del PJ*). It comes that way from the original;
correcting it is an editorial decision for the Oracle, not for the archive.

## Notes on S-009

`Rank Specifications` was prepared on 2026-04-06 with Christian Märtens. It defines the **social dimension of the Archon**: that technical depth alone does not confer the rank — leadership capacity and contribution to the community are also required. It complements S-004 (Compendium) by adding the *why* behind the rank distinctions.

It was detected in the QA audit of 2026-04-07 as an existing document with no canonical ID assigned.

## Notes on S-010

S-010 is a meta-document: it describes the canon folder itself. It is included for completeness and navigability, but it is not a content seminal in the same sense as S-001–S-009.

## Relations between documents (Knowledge Graph)

| Document | Relation | Target document |
|----------|----------|-----------------|
| **C-003** Compendium | `extended_by` | **C-007** Rank Specifications |
| Epistemic Relations *(dated)* | `grounds` | **C-004** Role Structure |
| Epistemic Relations *(dated)* | `grounds` | **C-002** Brand & Culture |
| **C-004** Role Structure | `implements` | `standards/S-003` Platform Role System |
| **C-006** Session Zero | `instantiates` | The role-playing game manual *(`numinia-lore`)* |
| **C-001** Welcome | `summarizes` | **C-002**, **C-004**, `standards/S-003` |
| The role-playing game manual *(`numinia-lore`)* | `is_narrative_of` | Epistemic Relations *(dated)* |

> **The `S-003` collision is resolved.** Until 2026-08-25 that number meant
> two living documents: *Epistemic Relations* in the canon and *Platform Role
> System* in `standards/`. The renumbering to `C-NNN` closed it — the
> seminals no longer use `S-`, which `ADR-005` reserved for `standards/`.
> `Epistemic Relations` takes no number: it is a dated artifact.

## Documents that left the canon

| Was | Left | Now | Why |
|---|---|---|---|
| `S-006` Platform Role System | 2026-08-25 | `standards/S-003-platform-role-system.md` | Genre, not filing: a permissions matrix for an artifact is a standard, not world vocabulary. Oracle ruling, `ADR-023` |

**A series change with a file move is recorded here, in the index of origin —
not with a tombstone in the folder.** `canon/` is `sealed`, and adding a file to
signal that another one left is what that threshold exists to discourage. `git
mv` keeps the history; the index is where a reader looks.

`S-006` is not reissued. An identifier is a promise about the past (`ADR-004`).

---

*The canon is not questioned in daily work. It is consulted.*
*If daily work reveals the canon is wrong, document the discrepancy and decide explicitly.*
