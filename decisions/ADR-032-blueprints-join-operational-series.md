---
id: "ADR-032"
uid:
title: "Blueprints join the operational series: superseded plans are records of direction, not memory"
type: adr
status: active
version: "1.0.0"
created: "2026-08-31T00:20:00+02:00"
updated: "2026-08-31T00:20:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [blueprints, lifecycle, extinction, p-010, governance]
license: "CC-BY-4.0"
related: ["P-010", "ADR-030", "ADR-031", "DEC-001", "DEC-002", "DEC-003", "DEC-005", "MIS-127", "O-002"]
---

# Blueprints join the operational series

> **Summary:** `blueprints/` joins `debt/` as an operational series
> under P-010 §5. A blueprint is extinguished (deleted) when every
> decision it cites as its foundation is `superseded` with no living
> successor. First application: six blueprints from April, dead on
> that criterion.
> **Epistemic:** A plan whose premise (a decision) no longer exists
> does not describe a direction — it describes an intention that its
> own foundation declared expired. That is not memory to preserve, it
> is sediment.
> **Pragmatic:** When a blueprint's cited decisions are all
> superseded without a living successor, extinguish it in the same PR
> that records why, per the table below.

## Context

`blueprints/` reached 16 tracked plans and its own `INDEX.md` had not
been touched since 2026-04-07 — it lists three of the sixteen. Six of
the sixteen are pure April artifacts: they describe a target state
whose only textual foundation (a `Related decisions` citation to
DEC-001/002/003/005) is now `status: superseded` with `superseded_by:
null` — retired in #148, nothing replaced them in that domain. A
sixth, `BP-cao-overview`, is not tied to a dead decision but to a
dashboard snapshot from 2026-04-07 that is the losing side of an open
contradiction (O-002 CON-001) against the current `BP-cao.md` roster
and the live `/cao` page — keeping it does not preserve a second
source of truth, it preserves a stale one nobody consults to settle
anything.

P-010 §5 already carved one exception into its "supersede, do not
delete" rule: ADR-030 declared `debt/` operational because a closed
debt entry has no reader once its resolution is written elsewhere.
Blueprints share the same shape when their premise is dead: nobody
reads `BP-repo.md`'s open question about migrating to the numengames
org when the repo has been in that org, under a new name, for months.
Unlike debt, most blueprints are NOT operational — a blueprint tracking
a live, unresolved gap (`BP-financiero`, `BP-cao`) is exactly the kind
of memory P-010 §5 protects. Only the subset whose foundation is
verifiably dead qualifies.

## Decision (Oracle, 2026-08-30/31)

1. **`blueprints/` joins the operational series list in P-010 §5**,
   alongside `debt/`. A blueprint extinguishes (is deleted) when
   **either**: (a) every decision it cites under "Related decisions"
   is `superseded` with no living successor in that domain, or (b) it
   is the demonstrably stale side of a resolved contradiction recorded
   in `operations/O-002-contradictions.md`. Same written-resolution
   requirement as ADR-030 §3: no evidence of why it no longer holds,
   no extinction.
2. **First application, six blueprints:**
   - `BP-repo`, `BP-web`, `BP-misiones`, `BP-datos`,
     `BP-infraestructura` — criterion (a): every cited decision
     (DEC-001, DEC-002, DEC-003, DEC-005) is `superseded`,
     `superseded_by: null`.
   - `BP-cao-overview` — criterion (b): losing source of O-002 CON-001,
     resolved by this ADR (see below).
3. **`BP-financiero` does NOT extinguish here.** It depends on pending
   missions (MIS-021/031/034/048), not a dead decision — a separate,
   still-open point in MIS-127's decision queue. Its `## Dependencies`
   section cited `BP-misiones`, now deleted; that line is removed in
   this same PR since the file it pointed to no longer exists — the
   dependency itself (mission-count context) is not restored elsewhere
   because nothing currently needs it.
4. **P-010 §5 is amended in scope, not substance** — same clause as
   ADR-030 grants: it keeps protecting `canon/`, `standards/`,
   `decisions/` as memory series. Operational series today: `debt/`
   (ADR-030), `blueprints/` (this ADR). Declaring a third requires its
   own ADR.
5. **O-002 CON-001 resolved.** The CAO roster contradiction
   (`cao.astro` vs `BP-cao.md` vs `BP-cao-overview.md`) is settled by
   removing the losing, stale source: `BP-cao-overview.md` was a
   2026-04-07 photograph, superseded in fact by both the live `/cao`
   page and the more recent `BP-cao.md` (v0.2.0). Moved to O-002's
   Resolved section.

## Closure record — the six blueprints extinguished by this ADR

| File | Described | Cited foundation | Why it is dead |
|---|---|---|---|
| `BP-repo.md` | Repo consolidation target, open question "does numinia-digital-agents migrate to the numengames org definitively?" | ADR-001, DEC-002 | Already migrated: repo lives at `numengames/numinia-nwos` (renamed from `numinia-digital-agents`), confirmed live via `gh repo view` |
| `BP-web.md` | `pablofm.com` as the public portal target | DEC-005 (superseded, `superseded_by: null`) | DEC-005 retired in #148 as "fulfilled & expired — superseded by numinia.org"; the live site is numinia.org on Cloudflare Workers |
| `BP-misiones.md` | Mission board target state, "54 missions MIS-001 to 054" | ADR-001 | 152+ missions exist today; the described board is not the current one |
| `BP-datos.md` | Data layer target depending on the Arbitrum grant | DEC-003 (superseded, `superseded_by: null`) | DEC-003 retired in #148; zero implementation since April, nothing "arrived," the dependency itself is gone |
| `BP-infraestructura.md` | VPS + Caddy self-hosting target | DEC-001 (superseded, `superseded_by: null`) | DEC-001 retired in #148; live deployment verified as Cloudflare Workers (`web/wrangler.toml`), not the described VPS |
| `BP-cao-overview.md` | 2026-04-07 CAO dashboard snapshot, page-only content | — (O-002 CON-001, not a DEC) | Stale side of a resolved roster contradiction; superseded in fact by `BP-cao.md` v0.2.0 and the live `/cao` page |

Token measure at extinction (cl100k_base): the six files carried 3,698
tokens.

## Consequences

- `blueprints/` shows only plans whose foundation is verifiably alive
  or verifiably still open — not intentions whose own premise expired
  four months ago and nobody noticed.
- `O-002` loses one open contradiction (CON-001), gains one resolved
  entry with evidence, same pattern as CON-003.
- `BP-financiero.md` loses a dependency reference to a file that no
  longer exists; nothing else in the tree cited any of the six by
  name outside `blueprints/` itself, `debt/D-004` (measurement-field
  example, not a load-bearing reference), and this session's own
  working plan file.
- Anyone needing an extinguished blueprint's full text runs `git log
  --diff-filter=D --summary -- blueprints/` or starts from this table.
- `blueprints/INDEX.md` (last touched 2026-04-07, lists 3 of 16
  entries) is now further out of date than before — not fixed here,
  the extinction narrows the gap but does not close it. Flagged, not
  silently left implying the index is trustworthy.
