---
id: "D-042"
uid:
title: "CC0 carried over onto the lore (legal debt, was LD-001)"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-16T17:58:17Z"
created_source: "git:e1a7ac8"
updated: "2026-08-30T19:40:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, legal, c-005]
license: "CC-BY-4.0"
related: ["ADR-031", "C-005"]
---

# D-042 — CC0 carried over onto the lore

> **Summary:** Legal debt (was LD-001; dissolved into debt/ by ADR-031).
> **Epistemic:** What C-005 compliance still owes, and its exit threshold.
> **Pragmatic:** Close when the threshold below is met; then extinguish (ADR-030).

*Was `LD-001` in `LEGAL_DEBT.md` (root); text verbatim from v1.1.0.*

**What happened.** The repository was published with a root `LICENSE`
CC0-1.0 inherited from the catalogue's regime (see DEC-002, build in
public CC0), with no partition by regime. CC0 over the lore was not a
deliberate act: it was carried over. While the repo was public under that
LICENSE, all its content was offered under CC0 — including what C-005 §2
classifies as reserved.

**What was published under CC0.** The entire history up to and including
commit `0157be9`. In particular, from what is today the reserved regime:
`canon/` (Numinia's TTRPG manual, Welcome to Numinia, Brand and Culture,
Compendium of Attributes and Ranks, Rank Specifications, Role structure,
Platform Role System, About Session Zero, epistemic and pragmatic papers),
`guilds/` (alchemists, sentinels, exegetes, procurators), and `agents/`
(personas of adonaz, nimrod, procurador-01, senet, and the template). Also
the documentation and missions, today CC-BY-4.0.

**Resolution (signed by Oracle, 2026-08-16).** What was published stays
CC0 and no attempt is made to revoke it — C-005 §4: the waiver is
irrevocable. The tap is closed going forward: the root `LICENSE` stops
being CC0, `REUSE.toml` declares paths by regime, and reserved content is
expressed with `LicenseRef-Numen-AllRightsReserved`. Versions after the
cutoff are no longer offered under CC0.

**Exit threshold.** None exists: the waiver over what was published is
irrevocable by construction. The entry remains to bound the temporal scope
of the grant (up to `0157be9`) and as input for the visibility-change gate
(§4) of future repositories: the check of sensitive directories against a
real listing exists because this incident happened.

**Operational consequence.** Any third party can use, fork, or
redistribute the content of those versions under CC0, lore included. The
brand: no — CC0 never granted Numinia, Numen Games, or Khepri (§7,
`TRADEMARKS.md`).

---
