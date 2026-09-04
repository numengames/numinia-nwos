---
id: "ADR-036"
uid: ""
title: "The canon is seven: CAN- prefix, two apparatus files retired, and the regime corrected to what was already granted"
type: adr
status: active
version: "1.0.0"
created: "2026-09-01T00:00:00+02:00"
updated: "2026-09-01T00:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [canon, taxonomy, series, prefixes, licensing, CC0, deletion, ADR-004, ADR-005, ADR-030, CAN-005]
license: "CC-BY-4.0"
related: ["MIS-127", "ADR-004", "ADR-005", "ADR-023", "ADR-026", "ADR-030", "ADR-035", "CAN-005", "PRO-010", "SYS-003", "DBT-001"]
threshold: sealed
supersedes_record_of: ["canon/INDEX.md", "canon/README.md"]
---

# ADR-036 · The canon is seven

**Status:** accepted · **Date:** 2026-09-01 · **Threshold:** `sealed`
(Oracle signature required — `S-001` §2.1)

**Mission:** `MIS-127` (entropy reduction), ledger entry 7 — measured at
**−4 files, −4,225 tokens** (`cl100k_base`, same method as the rest of that
line).

## Decision

### 1. The `C-` series becomes `CAN-`, and the folder holds seven documents

| # | File | Origin |
|---|---|---|
| 1 | `CAN-001-welcome-to-numinia.md` | renamed from `C-001` |
| 2 | `CAN-002-brand-and-culture.md` | renamed from `C-002` |
| 3 | `CAN-003-attributes-and-ranks.md` | renamed from `C-003`, **absorbed `C-007`** |
| 4 | `CAN-004-role-structure.md` | renamed from `C-004` |
| 5 | `CAN-005-licensing.md` | renamed from `C-005`, header migrated ES→EN |
| 6 | `CAN-006-epistemic-relations.md` | **de-frozen**, was «2026_04_15-Epistemic_Relations_…-v0.2.0» (retired name) |
| 7 | `CAN-007-pragmatic-numen-system.md` | **de-frozen**, was «2026_04_15-Pragmatic_Numen_System-v0.2.0» (retired name) |

### 2. The two dated documents were never frozen artifacts

`P-010` §3.2 classified them as photographs of a moment, exempt from
registration and keeping their dated filenames permanently. **The Oracle ruled
that classification wrong on 2026-09-01.** They are living canon: `Pragmatic
Numen System` §2.3 is the authority that resolved the
`Functional`/`Regulatory` question in `ADR-023` — a document the archive
treated as a snapshot was being cited as active law. They enter the series
like the rest of the folder, and `registration: exempt` becomes
`registration: registered` in both.

### 3. `CAN-006` and `CAN-007` reuse numbers previously held by other documents

`ADR-004` rule 4 states that numbers are never reused. `C-006` was *Session
Zero* and `C-007` was *Rank Specifications*; both left this folder in this
same change, and the two de-frozen documents take their numbers.

**This is a deliberate, Oracle-ordered exception, recorded rather than
hidden.** The reasoning: rule 4 protects the identifier as *a promise about
the past*, and that promise is what `uid` is supposed to carry — a stable
identity that survives renames. `uid` is declared but empty across the entire
corpus (`S-004` §6, `H-20`), so today the number is doing a job it was not
designed to do alone. **The rule is suspended for this folder until `uid` is
populated repo-wide**, at which point the number becomes a display label and
this exception becomes harmless. Until then, a reader who finds `C-006` in a
pre-2026-09-01 record must consult §6 of this ADR to resolve it.

Consequence, stated plainly: **citations to `C-006` and `C-007` in records
written before 2026-09-01 now resolve to the wrong documents.** They are
preserved unrewritten in closed records per `PRO-010` §3.4 — a filename in a
closed record is evidence, not a pointer — and the mapping table in §6 is the
only correct way to read them.

### 4. Two documents left the folder

**`C-006 Session Zero` → `numinia-lore`, `numinia-lore:seminal/About_Session_Zero.md`.**
Escape rooms, passwords, Treasure Rooms, eight seals, Prism Cells, the
Cyberdog avatar and the Sycamore District are game design, not governance
canon. «canon/INDEX.md» (retired) had already recorded the relation as `C-006
instantiates the role-playing game manual (numinia-lore)`: the document's
shelf was in the other repository all along. Precedent: `ADR-035` §3 declared
the same fault for `BLU-008` and left the file in place; here the destination
repository is available, so the file moved.

Verified before moving: `numinia-lore` already held `numinia-lore:seminal/About_Session_Zero.md`
with **the same 3,880 words**, but degraded — CRLF endings, no frontmatter,
and all 26 markdown headings flattened away. The move was therefore an
upgrade, not a duplication: the structured edition replaced the flat one, and
the file kept `numinia-lore`'s reserved regime (`seminal/**`), which is
correct — it was never published under this repository's open root license.

**`C-007 Rank Specifications` → merged into `CAN-003` §Rank specifications.**
Fifty lines, of which roughly twenty were content. `CAN-003` §Rank already
enumerated all six ranks; `C-007` only added the Archon's social dimension,
and the index already declared `C-003 extended_by C-007`. It was a fragment
that should never have been a document. **The content was preserved verbatim**,
including the design note and the Christian Märtens attribution.

### 5. The regime is corrected to `CC0-1.0`, and three apparatus files are retired

`REUSE.toml` now annotates `canon/**` as `CC0-1.0`, declaring what was
granted in April rather than what was intended in August. `guilds/**` keeps
the reservation. `CAN-005` §1 records the exception in the canon itself and
its version log carries it as `1.5.0`.

Retired under `ADR-030`:

- **«canon/archive-lore.md» (retired)** — its seven lore lines moved into
  `system/SYS-003-archive-fondos.md`'s own `fondos[].lore` field. The file
  existed *only* because of `CAN-005` §5 (*one file, one regime*): reserved
  lore could not sit in a `CC0` document. With `canon/` now `CC0`, the reason
  is gone. `web/src/content.config.ts` loses the `canonLore` collection and
  `web/src/pages/archive/[fondo].astro` reads one source instead of two.
- **«canon/INDEX.md» (retired)** — its enumeration is regenerable, but its *record* was
  not: §6 of this ADR inherits it.
- **«canon/README.md» (retired)** — apparatus, and factually wrong since 2026-04-15.

No tombstones. `canon/` is `sealed`, and «canon/INDEX.md» (retired) itself ruled that
«adding a file to signal that another one left is what that threshold exists
to discourage».

## 6. Inherited record (from the retired «canon/INDEX.md» (retired))

**This section exists because the information below survives in no other
file.** It is the reason `INDEX.md` could be deleted.

### 6.1 Historical identifier map

Records written before 2026-08-25 cite `S-` numbers; records written between
2026-08-25 and 2026-09-01 cite `C-` numbers. Both resolve here.

| Original | Then | Now | Note |
|---|---|---|---|
| `S-001` | `C-001` | `CAN-001` | Welcome to Numinia |
| `S-002` | `C-002` | `CAN-002` | Brand & Culture |
| `S-003` | — | `CAN-006` | Epistemic Relations. Held `S-003` until the 2026-08-25 collision with `standards/STD-003` |
| `S-004` | `C-003` | `CAN-003` | Compendium of Attributes and Ranks |
| `S-005` | `C-004` | `CAN-004` | Role Structure |
| `S-006` | — | `standards/STD-003-platform-role-system.md` | Left canon 2026-08-25 (`ADR-023`). Keeps reserved regime |
| `S-007` | `C-006` | `numinia-lore:seminal/About_Session_Zero.md` | Left canon 2026-09-01 (this ADR) |
| `S-008` | — | `numinia-lore:seminal/Numinia_Manual_del_juego_de_rol_v0_6_0.md` | Never lived here; pointer only |
| `S-009` | `C-007` | merged into `CAN-003` | Rank Specifications, absorbed by this ADR |
| `S-010` | — | *retired* | Archive System; was «canon/README.md» (retired), deleted by this ADR |
| — | `C-005` | `CAN-005` | Licensing Canon, created 2026-08-16 |
| — | — | `CAN-007` | Pragmatic Numen System. **Unlisted in the index for four months** |

### 6.2 Knowledge graph

| Document | Relation | Target |
|---|---|---|
| `CAN-003` Compendium | `absorbed` | `C-007` Rank Specifications *(2026-09-01)* |
| `CAN-006` Epistemic Relations | `grounds` | `CAN-004` Role Structure |
| `CAN-006` Epistemic Relations | `grounds` | `CAN-002` Brand & Culture |
| `CAN-004` Role Structure | `implements` | `standards/STD-003` Platform Role System |
| `CAN-001` Welcome | `summarizes` | `CAN-002`, `CAN-004`, `standards/STD-003` |
| `numinia-lore` RPG manual | `is_narrative_of` | `CAN-006` Epistemic Relations |
| `numinia-lore` About Session Zero | `instantiates` | the RPG manual *(`numinia-lore`)* |

### 6.3 Canon that does not live in this repository

The v0.6.0 role-playing game manual (`numengames/numinia-lore` →
`numinia-lore:seminal/Numinia_Manual_del_juego_de_rol_v0_6_0.md`, 129,087 words, reserved
regime) is **pointed at, never copied**. A copy in `canon/` would be globbed
by `web/src/content.config.ts` and publish an 890 KB page — 2.6× the heaviest
on numinia.org — and would create two variants of one document aging apart,
which is exactly what produced the stub retired on 2026-08-25. It receives no
`CAN-` number: a pointer is not a foundational document, and minting an ID for
it manufactures the object we just retired.

Verified 2026-08-25: `numinia-lore` is public and its `seminal/**` carries an
express reservation of rights (Oracle-signed 2026-08-17, `MIS-085` D1).

**Source anomaly, recorded without correcting:** the manual's «Fragmentos»
numbering has gaps and a duplicate — ch. 2 jumps 5→7, ch. 3 jumps 5→8, ch. 4
has two «Fragmento 6». It comes that way from the original; correcting it is
an editorial decision for the Oracle.

## Consequences

**Positive.** Eight `N-04` naming violations close. `canon/` drops from twelve
files to seven and the repository from 383 documents to 379 — a net −4, with
one ADR created and five files retired or moved. `REUSE.toml` stops asserting
a regime the repository does not have. The last legacy-Spanish frontmatter in
the corpus (`CAN-005`) migrates, closing `S-004` §6's pending item
`t_d4936cc8`. A four-month-old factual error in «canon/README.md» (retired) disappears
with the file.

**Negative, and load-bearing.**

⚠️ **Number reuse (§3).** `C-006` and `C-007` now point at different documents
than they did before 2026-09-01. Suspension of `ADR-004` rule 4, lifted when
`uid` is populated. §6.1 is the resolution table.

⚠️ **`ADR-004` rule 8 contradicts `S-004` §6.** Rule 8 requires `uid` to
carry a UUIDv7 and cites `STANDARDS §2` as its basis; `STANDARDS.md` marks
that section *superseded — was wrong*, and `lint-frontmatter.mjs` `H-20`
**fails any file whose `uid` is non-empty**. An active ADR founds itself on a
retired section. Not resolved here — recorded so the next reader does not
rediscover it. It is what makes §3's suspension necessary rather than
merely convenient.

⚠️ **Reserved lore moved into a `CC0` file.** «archive-lore.md» (retired)'s seven lines
were reserved-regime when written; they now sit in `SYS-003` (`CC0-1.0`).
Consistent with §5 — the lore was published under the open root license in
August like everything else in `canon/` — but it is a regime change to a text
that was authored expecting reservation, and it is stated rather than assumed.

⚠️ **Citations in closed records are now wrong and stay wrong.** Five
closed missions, audits and reports cite the retired filenames. `PRO-010`
§3.4 forbids rewriting them; they are banked in
`scripts/references-baseline.json` with this ADR as the reason.

## Compliance with `ADR-030` (deletion tests)

| File | Test 1 no live citations | Test 2 content preserved | Test 3 URL redirected | Test 4 recorded |
|---|---|---|---|---|
| «archive-lore.md» (retired) | ✅ living citations repaired | ✅ lore → `SYS-003` | ✅ redirect added | ✅ §5 |
| `INDEX.md` | ✅ repaired | ✅ record → §6 | ✅ redirect added | ✅ §5 |
| `README.md` | ✅ repaired | ✅ nothing unique to preserve | ✅ redirect added | ✅ §5 |
| `C-006` | ✅ repaired | ✅ moved, upgraded | ✅ redirect added | ✅ §4 |
| `C-007` | ✅ repaired | ✅ verbatim → `CAN-003` | ✅ redirect added | ✅ §4 |
