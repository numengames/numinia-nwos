---
title: "Platform ranks"
id: "STD-003"
uid: ""
type: documentation
subtype: standard
status: active
version: "3.0.0"
created: "2026-04-07T12:34:04Z"
created_source: "git:f765b99"
created_confidence: inferred
updated: "2026-09-09T01:20:00+02:00"
author: "Centinela-01"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, ranks, permissions, digital-goods]
license: "CC0-1.0"
threshold: governed
series_change: "3.0.0 — the standard takes the ADR-043 shape: 1,047 -> 386 words of body. RNK-001..004 keep their text and their checks; three new plates name obligations the prose held without one: RNK-005 automatic moves, RNK-006 the manual ceiling, RNK-007 the platform updates this standard with the matrix. Major because §2 and §3, citable by number, no longer exist."
---
# Platform ranks

> **Summary:** Six ranks, lowest first: Nomad, Citizen, Pilgrim, Vernacular,
> Archon, Oracle. Each holds every permission of the ranks below it, and a
> member's rank is read from what they have done, never from what they claim.
> **Epistemic:** What each rank may do, what earns it, and the file the
> platform reads it from.
> **Pragmatic:** Implement or audit a permission check without asking who is
> allowed to do what.
> **Audience:** Agents · Oracles

**Binds:** the Numinia digital-goods platform — authentication, character
sheets, creator panel, administration.
**Does not bind:** access to this repository; what a rank means in the world
(`CAN-004`); payment, custody, identity verification (`operations/`).

## Rules

**RNK-001 — Ranks are cumulative.** A rank MUST grant every permission of the
ranks below it.

**RNK-002 — Rank is inferred, not declared.** The platform MUST derive a
member's rank from the signals in the table and MUST NOT accept a rank the
member asserts.

**RNK-003 — At most four Oracles.** `rank-overrides.json` MUST NOT list more
than four.

**RNK-004 — Nobody touches upward.** An Archon MUST NOT act on an Archon or an
Oracle. An Oracle MUST NOT be bannable at any layer — storage, API, interface.

**RNK-005 — Automatic moves go both ways.** Nomad ↔ Citizen and Citizen ↔
Pilgrim MUST follow the signal, in both directions, with no hand involved.

**RNK-006 — Manual moves have a ceiling.** An Archon MAY promote or demote up
to Vernacular. An Oracle MAY manage every rank except Oracle. Oracles change
only by editing the overrides file.

**RNK-007 — The matrix and this page move together.** A platform change that
alters the matrix MUST update this standard in the same change.

| Rank | Earned by | Read from | Adds |
|---|---|---|---|
| Nomad | login with wallet or social account | `wallet_session` / `session` cookie | public gallery, CC0 downloads, search, own sheet read-only, favourites, NFT collections |
| Citizen | completes Session Zero — guild and faction chosen | `data/characters/{address}.md` has both | edit own sheet; loot and inventory; Session Zero |
| Pilgrim | purchases any digital good | `data/seasons/*-progress.json` or `data/purchases/` | purchased premium content; burn ritual; seasonal adventures; purchase history |
| Vernacular | promoted by an Archon or Oracle | `data/system/rank-overrides.json` | upload, edit, delete own assets and see their statistics; creator panel; portfolio |
| Archon | promoted by an Oracle | `data/system/rank-overrides.json` | any asset; seasons; global statistics; audit log; sync to R2 / IPFS / Arweave; ban and unban; appoint Vernaculars |
| Oracle | listed in the overrides file | `data/system/rank-overrides.json` | appoint and remove Archons; edit the matrix; system configuration; cannot be banned |

## Check

| Plate | Verified by |
|---|---|
| RNK-001 … RNK-006 | `[MANUAL]` — the matrix lives in platform code, outside this repository; the platform's test suite is the check |
| RNK-007 | `[MANUAL]` — a platform pull request that changes the matrix without a diff here |

## Why

A rank the member declares is a permission the member grants themselves.
Reading rank from evidence — a cookie, a sheet, a purchase, a file only
Oracles edit — makes every permission traceable to an act. Cumulative ranks
keep the matrix one column, not six. The Oracle ceiling and the ban immunity
exist so that governance cannot be captured from inside the product. This was
the sixth canon until 2026-08-25; the Oracle ruled a permissions matrix is a
standard, and what a rank *is* stays in `CAN-004`.

> Nomad reads. Citizen edits their identity. Pilgrim buys. Vernacular creates.
> Archon moderates. Oracle governs.

## References

| ID | Title | Relation |
|---|---|---|
| `CAN-004` | Role structure | names the ranks this standard regulates |
| `ADR-036` | Canon consolidation | records the move from the canon to this standard |
