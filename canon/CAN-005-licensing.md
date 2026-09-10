---
id: "CAN-005"
uid: ""
title: "Opening is an act"
type: seminal
status: draft
version: "3.0.1"
created: "2026-08-16T19:58:17+02:00"
created_source: "git:2efd546"
created_confidence: exact
updated: "2026-09-10T12:30:00+02:00"
author: "oracle"
owner: "oracle"
guild: "Procurators"
territory: "Archive"
tags: [canon, seminal, licensing, legal, REUSE]
license: "CC0-1.0"
registration: registered
former_id: "C-005"
threshold: governed
---

# CAN-005 — Opening is an act

> **Summary:** Every piece is born in the most closed regime that makes
> sense and is opened only by a deliberate act; what is opened cannot be
> closed again; the name is never opened.
> **Epistemic:** Numen gives away the catalog, shares the edge, protects the
> core with copyleft and keeps the world and the name. Four kinds of value,
> four regimes, one direction of travel.
> **Pragmatic:** Before licensing, publishing or reusing anything, this is
> the why. What must be done — files, headers, gates, checks — is `STD-010`.
> **Audience:** Agents · Oracles

*Binds:* every Numen Games repository, including Numinia's and NWOS's.
*Does not bind:* the client workspaces our tools generate; the inventory of
the inherited (`LIC-006`).

> This is not legal advice. It is the internal norm.

## 2. The governing principle

**Every piece is born in the most closed regime that makes sense and is
opened by deliberate acts, never by default.**

Four regimes, one per kind of value:

| What | Regime | Why |
|---|---|---|
| Catalog — assets, data, metadata, design tokens | `CC0-1.0` | Given away: it is the acquisition channel, not the product |
| Edge — domain, UI, viewer, SDK, scripts, infrastructure | `MIT` | Shared: its value grows with adoption |
| Core — identity, progression, billing | `AGPL-3.0-only` + CLA | Free for those who share; paid for those who close |
| World and name — lore, narrative, brand | Reserved | The irreplicable is not licensed |

**Silence does not declare.** A file with no licence is all rights reserved
by law, yet indistinguishable from an oversight. So the reserved is declared
exactly like the open — a `LICENSE` that says no right is granted, and
`LicenseRef-Numen-AllRightsReserved` in `REUSE.toml`. Where protecting
matters most is where one can least rely on the reader inferring correctly.

**Opening is irreversible.** A version published under MIT is MIT forever
and anyone may fork it from there; a CC0 waiver cannot be taken back. Room
to manoeuvre shrinks in one direction only:

| Position | Regime | Room |
|---|---|---|
| 1 | Reserved, unpublished | Total |
| 2 | Copyleft with CLA | Total: may open further or license in parallel |
| 3 | Copyleft without CLA | Partial: each contributor's permission |
| 4 | Permissive, published | None in practice |
| 5 | CC0, published | None: the waiver is irrevocable |

**Birth licence is not publication.** A repository carries its `LICENSE`
from the first commit; while private, it grants permission to no one. Making
the work publicly available under a licence offer *is* the grant — no
`npm publish`, no Arweave needed. That is why turning a repository public,
and writing to a permanent store, are acts signed by an Oracle and not
operations (`PUB-`, `STD-014`).

**The name is never opened.** `CC0` does not surrender trademark. Outside
every free licence remain **Numinia**, **Numen Games** and **Khepri** as
identifiers of origin, the logo, the isotype and the signature wordmarks.
Citing, linking, writing about the project, declaring that a product uses
Numinia assets: yes. Using them as one's own brand, suggesting sponsorship,
presenting a fork as official: no. *The system can be copied; one cannot
claim to be Numen.*

## 3. The exception this canon records

The `canon/` corpus itself is `CC0-1.0`. The seven canon documents were
published on 2026-04-07 (`f765b99`) under the repository's root `CC0-1.0`
`LICENSE`, four months before the reservation regime existed. That grant is
irrevocable, so the reservation applied to `canon/**` on 2026-08-16 never
took effect on them. `REUSE.toml` declares what is true, not what was
intended (`ADR-036`). The principle above still governs everything born
after the cut — including the lore in `numinia-lore`, which was never under
the open root licence.

## 4. What this canon does NOT define

- **Which licence each piece gets, and how it is declared** — the ordering
  questions, branch tables, the generator and AI-provenance rules, SPDX
  headers, `REUSE.toml`, per-format metadata, CLA/DCO: `STD-010` (`LIC-`).
- **What we may depend on** — allow / isolate / never, the floor rule,
  *present is not distributed*: `STD-010`.
- **The publication gates and their checks** — `STD-014` (`PUB-`), run by
  `PRO-018`.
- **The inherited** — what was licensed before 2026-08-16 and how it is
  reconciled: `LIC-006` and the debt entries tagged `legal`.
- **The reasoning and the alternatives** — the Legal Book v0.6.1, archived
  in git; this canon states the outcome.
