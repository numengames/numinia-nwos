---
title: "Six platform ranks, cumulative, inferred from what a member has done"
id: "STD-003"
uid: ""
type: documentation
subtype: standard
status: active
version: "2.1.0"
created: "2026-04-07T12:34:04Z"
created_source: "git:f765b99"
created_confidence: inferred
updated: "2026-09-09T00:10:00+02:00"
author: "Centinela-01"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, ranks, permissions, digital-goods]
license: "CC0-1.0"
threshold: governed
---

# STD-003 — Six platform ranks, cumulative, inferred from what a member has done

> **Summary:** The Numinia platform has six ranks. Each inherits the
> permissions of the ranks below it, and a member's rank is inferred from
> what they have done, never declared.
> **Epistemic:** What each rank may do, what earns it, and where the platform
> reads it from.
> **Pragmatic:** Implement or audit a permission check without asking who is
> allowed to do what.
> **Audience:** Agents · Oracles

---

## 1. Purpose and scope

This standard binds the Numinia digital-goods platform: its authentication,
its character sheets, its creator panel and its administration. It defines
the ranks, the permission each rank grants, the signal that grants the rank
and the file the platform reads it from.

It was a canon document (the sixth) until 2026-08-25, when the Oracle ruled it a standard:
a permissions matrix is machine-verifiable, and what a rank *is* stays in
`CAN-004`. It is `CC0-1.0` by a second Oracle ruling of 2026-09-03; the
earlier reservation was unenforceable, the file having been published under
the repository's CC0 waiver since its first commit.

---

## 2. The norm

**Ranks are cumulative.** Six ranks, lowest first: Nomad, Citizen, Pilgrim,
Vernacular, Archon, Oracle. A rank MUST grant every permission of the ranks
below it.

**Rank is inferred, not declared.** The platform MUST derive a member's rank
from the signals below and MUST NOT accept a rank the member asserts.

| Rank | Earned by | Read from |
|---|---|---|
| Nomad | login with wallet or social account | `wallet_session` / `session` cookie |
| Citizen | completes Session Zero (guild and faction chosen) | `data/characters/{address}.md` has guild and faction |
| Pilgrim | purchases any digital good | `data/seasons/*-progress.json` or `data/purchases/` |
| Vernacular | manual promotion by an Archon or Oracle | `data/system/rank-overrides.json` |
| Archon | manual promotion by an Oracle | `data/system/rank-overrides.json` |
| Oracle | listed in the overrides file; at most four | `data/system/rank-overrides.json` |

**What each rank adds.**

| Rank | Adds |
|---|---|
| Nomad | browse the public gallery, download CC0 assets, search, view own sheet (read only), favourites, NFT collections |
| Citizen | edit own character sheet; loot and inventory; take part in Session Zero |
| Pilgrim | purchased premium content; burn ritual; seasonal adventures; purchase history on the sheet |
| Vernacular | upload, edit, delete own assets and see their statistics; the creator panel (LAP); portfolio on the sheet |
| Archon | create, edit or delete any asset; seasons; global statistics; audit log; sync to R2 / IPFS / Arweave; ban and unban; appoint Vernaculars; manage every rank below their own |
| Oracle | appoint and remove Archons; edit the permission matrix; system configuration; cannot be banned |

**Promotion and demotion.** Nomad → Citizen and Citizen → Pilgrim move
automatically, both ways, with the signal. An Archon MAY promote or demote up
to Vernacular and MUST NOT touch an Archon or an Oracle. An Oracle MAY manage
every rank except Oracle. Oracles change only by editing the overrides file,
and there MUST NOT be more than four at once. An Oracle MUST NOT be bannable
at any layer — storage, API or interface.

> Nomad reads. Citizen edits their identity. Pilgrim buys. Vernacular
> creates. Archon moderates. Oracle governs.

---

## 3. Conformance

| Check | Rule | Verified by |
|---|---|---|
| `RNK-001` | Every permission granted to rank N is granted to every rank above N | `[MANUAL]` — the matrix lives in platform code, outside this repository |
| `RNK-002` | A member's rank is computed from the signals in the rank table, never from a claimed value | `[MANUAL]` — same; the platform's tests are the check |
| `RNK-003` | `rank-overrides.json` holds at most four Oracles | `[MANUAL]` — the file lives on the platform |
| `RNK-004` | An Archon cannot act on an Archon or an Oracle; nobody can ban an Oracle | `[MANUAL]` — enforced at storage, API and UI on the platform |

No guard in this repository reaches the platform. The platform's own test
suite is where these checks execute; a platform change that alters the matrix
MUST update this standard in the same change.

---

## 4. What this standard does NOT do

It does not describe the product. Which surfaces exist, what they show, and
what a member does with them belong to the design system and to the missions
that build them.

It does not govern access to this repository. Repository permissions are a
governance matter, not a platform rank; a citizen in the platform holds no
rights over the corpus.

It does not name the ranks or say what they mean in the world: that is
`CAN-004`. It does not define payment, wallet custody or identity
verification; those are operational and legal questions in `operations/`.

---

## 5. References

| ID | Title | Relation |
|---|---|---|
| `CAN-004` | Role structure | names the ranks this standard regulates |
| `ADR-036` | Canon consolidation | records the move from the canon to this standard |
