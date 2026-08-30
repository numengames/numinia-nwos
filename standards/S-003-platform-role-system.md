---
id: "S-003"
uid:
title: "Platform Role System"
type: documentation
subtype: standard
status: active
version: "1.0.0"
created: "2026-04-07T12:34:04Z"
created_source: "git:f765b99"
created_confidence: inferred
updated: "2026-08-25T00:00:00Z"
author: "Centinela-01"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [standards, ranks, permissions, digital-goods, ADR-023]
license: "LicenseRef-Numen-AllRightsReserved"
threshold: governed
series_change:
  from: "canon/Platform Role System.md"
  from_series: "canon"
  from_id: "S-006"
  date: "2026-08-25"
  decision: "Oracle ruling, 2026-08-25 — genre, not filing"
  reason: >
    A permissions matrix for an artifact, not world vocabulary. Its sections are
    "Matriz de permisos por rango", "Cómo se determina el rango" and "Reglas de
    promoción y degradación": 18 table rows, zero narrative markers. What a rank
    may do is machine-verifiable, which is the definition of a standard in
    S-001 §2. Its twin C-007 Rank Specifications NAMES the ranks and stayed in
    canon; this one REGULATES them.
  regime_change: >
    NONE. The file moves folder and KEEPS LicenseRef-Numen-AllRightsReserved,
    declared explicitly here and pinned by a per-file exception in REUSE.toml.
    Ruled by the Oracle 2026-08-25, reversing what this branch first did.

    The move would otherwise have released it under CC-BY-4.0 by folder
    inheritance — and CC-BY is irrevocable, the same mechanism as the CC0
    incident recorded in LEGAL_DEBT.md. This document is not platform
    mechanics: NOMAD, CITIZEN, PILGRIM, VERNACULAR, ARCHON and ORACLE are
    Numinia's own rank names, and promotion is tied to Session Zero, guilds
    and factions — all reserved canon. A document defining how one ascends
    through reserved rites cannot live under an open, irrevocable licence.
    "Maximum 4 Oracles, Oracles cannot be banned" is organisational
    governance, not technical convention.

    Genre and regime are two decisions. The Oracle signed the genre; the
    regime travelled hidden inside it and nobody approved it. See D-029.
---

# Rank and Permission System — Numinia Digital Goods

> **Summary:** NWOS system document — Platform Role System.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---


> Based on the EEM Institute's STSI framework
> and Numinia's seminal documents.
> v2 — April 2026

---

## Fundamental principle

**Ranks** grant permissions. They are **cumulative**: each rank inherits
all the permissions of the ranks below it.

```
  ORACLE ──── 4 max. Full administration.
     │
  ARCHON ──── Moderation + global content management.
     │
  VERNACULAR ─ Creation and management of own content.
     │
  PILGRIM ──── Has purchased a digital good on Numinia.
     │
  CITIZEN ──── Can edit their character sheet and has loot.
     │
  NOMAD ────── Login with wallet/social. Read only.
```

---

## Permission matrix by rank

```
Permission                               NOM  CIT  PIL  VER  ARC  ORA
──────────────────────────────────────── ───  ───  ───  ───  ───  ───

READ
  Browse public gallery                    x    x    x    x    x    x
  Download CC0 assets                      x    x    x    x    x    x
  Search and filter                        x    x    x    x    x    x
  View own character sheet (read only)     x    x    x    x    x    x
  View own favorites list                  x    x    x    x    x    x
  View NFT collections                     x    x    x    x    x    x

IDENTITY
  Edit own character sheet                 ·    x    x    x    x    x
  Access loot / inventory                  ·    x    x    x    x    x
  Take part in Session Zero                ·    x    x    x    x    x

COMMERCE
  Access purchased premium content         ·    ·    x    x    x    x
  Take part in burn ritual                 ·    ·    x    x    x    x
  Access seasonal adventures                ·    ·    x    x    x    x

CREATION (own content)
  Upload own assets                        ·    ·    ·    x    x    x
  Edit own assets' metadata                ·    ·    ·    x    x    x
  Delete own assets                        ·    ·    ·    x    x    x
  View own assets' statistics              ·    ·    ·    x    x    x
  Access the LAP (creator panel)           ·    ·    ·    x    x    x

ADMINISTRATION (global content)
  Create/edit/delete ANY asset             ·    ·    ·    ·    x    x
  Manage seasons                           ·    ·    ·    ·    x    x
  View global statistics                   ·    ·    ·    ·    x    x
  View audit log                           ·    ·    ·    ·    x    x
  Sync to R2 / IPFS / Arweave              ·    ·    ·    ·    x    x

MODERATION
  Ban / unban users                        ·    ·    ·    ·    x    x
  Appoint Vernaculars                      ·    ·    ·    ·    x    x
  Manage ranks below their own             ·    ·    ·    ·    x    x

SYSTEM (Oracle only — max 4)
  Appoint / remove Archons                 ·    ·    ·    ·    ·    x
  Edit the permission matrix               ·    ·    ·    ·    ·    x
  System configuration                     ·    ·    ·    ·    ·    x
  Cannot be banned                         ·    ·    ·    ·    ·    x
```

---

## How rank is determined

Rank is **inferred** automatically from the user's actions:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  No session ─────────────────────────────► (no access)      │
│                                                             │
│  Login with wallet or social account ────► NOMAD            │
│                                                             │
│  + Completes Session Zero (guild/faction) ► CITIZEN         │
│                                                             │
│  + Purchases a digital good on Numinia ──► PILGRIM          │
│                                                             │
│  + Manual promotion by Archon/Oracle ────► VERNACULAR       │
│                                                             │
│  + Manual promotion by Oracle ───────────► ARCHON           │
│                                                             │
│  + Defined in rank-overrides.json ───────► ORACLE (max 4)   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Promotion and demotion rules

```
  Who promotes             To what rank       Who demotes
  ─────────────────────── ────────────────── ──────────────────
  System (automatic)       Nomad → Citizen    System (automatic)
  System (automatic)       Citizen → Pilgrim  System (automatic)
  Archon or Oracle          → Vernacular      Archon or Oracle
  Oracle                    → Archon          Oracle
  rank-overrides.json       → Oracle (max 4)  Manual edit only
```

**Restrictions:**
- An Archon can only manage ranks **below** their own
  (can promote/demote up to Vernacular, cannot touch Archons or Oracles)
- An Oracle can manage **all** ranks except other Oracles
- Oracles are only managed by editing `rank-overrides.json`
- Maximum 4 simultaneous Oracles
- Oracles **cannot be banned** (3-layer protection: storage, API, UI)

---

## Character sheet by rank

```
  NOMAD      → Pre-filled sheet, READ ONLY
               (generated on login, basic wallet/social data)

  CITIZEN    → EDITABLE sheet
               (completes Session Zero → chooses guild + faction)
               Accesses loot / inventory

  PILGRIM    → Editable sheet + purchase history
               Premium loot unlocked

  VERNACULAR+ → Editable sheet + portfolio of uploaded assets
```

---

## Technical detection of each rank

| Rank | Detection signal | Storage |
|---|---|---|
| Nomad | `wallet_session` or `session` cookie present | Session cookie |
| Citizen | Completed Session Zero | `data/characters/{address}.md` has guild/faction |
| Pilgrim | Purchased a digital good | `data/seasons/*-progress.json` or future `data/purchases/` |
| Vernacular | Manual promotion | `data/system/rank-overrides.json` |
| Archon | Manual promotion | `data/system/rank-overrides.json` |
| Oracle | Bootstrap / manual edit | `data/system/rank-overrides.json` (max 4 entries) |

---

## Differences from v1 (what changes)

| Aspect | v1 (current) | v2 (this document) |
|---|---|---|
| Nomad + wallet | Was citizen | Now nomad (read only) |
| Nomad permissions | Could edit sheet and favorites | Read only + favorites |
| Citizen trigger | Wallet connected | Session Zero completed |
| Pilgrim trigger | Season Pass | Any digital good purchase |
| Vernacular | 'creator' role on GitHub | Manual promotion by Archon+ |
| Archon appoints | Could not | Can appoint Vernaculars |
| Archon scope | All admin permissions | Only ranks below |
| Oracle max | No limit | Maximum 4 |

---

## Summary in one sentence

> **Nomad reads. Citizen edits their identity. Pilgrim buys.**
> **Vernacular creates. Archon moderates. Oracle governs.**

---

*Document based on the EEM Institute's STSI framework,
Numinia's seminal documents,
and the Numinia system's role structure.*

*Numinia Digital Goods — April 2026*
