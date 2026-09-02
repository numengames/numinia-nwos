---
id: "MIS-083"
uid: ""
title: "The Oracle's zone: admin surface behind real sessions"
status: done
priority: "high"
effort: "M"
guild: "Alchemists"
territory: "Platform"
type_execution: "digital"
assigned_to: null
completed: null

type: mission
version: "1.0.0"
created: "2026-08-17T18:59:03Z"
created_source: "git:b484b68"
created_confidence: exact
updated: "2026-08-17T18:59:03Z"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, lap, admin]
license: "CC0-1.0"
---

> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-011-oracle-zone.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# MISSION-011 — The Oracle's zone, and the room the platform needed

> **For humans.** The management zone opens for Oracles, the L.A.P. fills the screen, and the citizenship card speaks one iconography.
>
> **Epistemic value.** Resolves how rank is granted (configured, never claimed) and what an Oracle can actually see today.
> **Pragmatic value.** The admin surface the legacy had returns, gated by real session verification instead of by hiding a link.
> **In the system.** Observes: ADR-014 permissions, ADR-006 sessions, Khepri §13.11. Regulates: /lap/admin/**, the shell width, /api/admin/*. Coupled to: MISSION-010, the key-rotation audit (the allowlist is configuration, not code).
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

> **Status:** ✅ Done (2026-08-15) · **Track:** store · **Size:** medium

## What shipped

- **Rank from configuration**: `ADMIN_WALLET_ADDRESSES` (server-side env)
  decides who is an Oracle at session issue — case-insensitive, multiple
  wallets, absent list means nobody. The Oracle's own wallet is configured
  locally. Pinned by unit tests.
- **`/api/admin/overview`**: the only endpoint that answers with management
  data, and only after verifying OUR signed session and checking
  `hasPermission(rank, 'manage-users')` from the domain ladder. Anonymous
  callers get 403 with nothing in the body — a gate, not a hidden link.
- **`/lap/admin/assets/`** ×5 locales: the archive as a §13.11 table —
  search, format filters, sortable columns with `aria-sort`, 40px rows, Mono
  ids and dates, storage layers per asset (R2 · GitHub · IPFS · Arweave, lit
  when the binary is really there). Read-only, and it says so.
- **The management zone in the sidebar** appears only when the session
  carries the rank (signage; the lock lives server-side).
- **Modern platform width**: the L.A.P. fills the viewport via a `wide`
  layout mode instead of the reading column. Implemented in BaseLayout, not
  with a `50vw` negative-margin trick — Firefox counts the scrollbar in `vw`
  and the gate caught the overflow on phones.
- **One iconography**: the citizenship card drops the pixel sprite for
  Phosphor, like the rest of the product.

## Honest gaps (what an Oracle still cannot do)

Banning users, promoting ranks and editing assets all need a **write path**
that does not exist yet: today the data repo is read-only from here, and
there is no user store — the only identities the platform knows are the
session it just issued and the configured Oracle wallets. The write-path ADR
is already queued in `docs/open-questions.md`; until it lands, the admin
surface reads and says so plainly instead of pretending.
