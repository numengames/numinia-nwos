---
id: "D-038"
uid:
title: "C-005 files agent definitions as lore, and the tap it closed was already open"
type: documentation
status: open
version: "1.0.0"
created: "2026-08-28T09:33:53Z"
created_source: "git:f86569b"
created_confidence: exact
updated: "2026-08-28T09:33:53Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, licensing, C-005, ADR-026, LD-001, D-030]
license: "CC-BY-4.0"
visibility: "public"
severity: high
opened_by: "Oracle, 2026-08-28"
supersedes_pending: "canon/C-005-licensing.md §1"
---
# D-038 — C-005 files agent definitions as lore

> **Summary:** the licence canon classifies an agent's definition as
> reserved lore. It is documentation, and the reservation it declares was
> never legally available.
> **Epistemic:** how a canon can be both wrong about a category and
> unenforceable about a grant.
> **Pragmatic:** what must change in C-005, and why the archive should not
> wait for that change to stop declaring a regime it does not have.
> **Audience:** Agents · Oracles

---

## The defect

C-005 §1's regime table reads:

| What | License | Why |
|---|---|---|
| World and name — lore, narrative, brand | **Reserved** | The irreplicable is not licensed |

`REUSE.toml` applied that row to `agents/**` alongside `canon/**` and
`guilds/**`. Two independent problems follow.

**1 · The category is wrong.** An agent's operational definition — when to
route work to it, which commands it escalates, where its authoritative
sources live — is documentation. C-005 §1 already assigns documentation an
open regime (`CC-BY-4.0` for docs and specs). The reserved row protects *the
irreplicable*: the world, the narrative, the brand. A job description is not
irreplicable, and withholding it costs the archive adoption while protecting
nothing.

**2 · The reservation was unavailable.** `LEGAL_DEBT.md` LD-001 records that
the repository was published under a root CC0-1.0 `LICENSE` through commit
`0157be9`, and names `agents/` among what was granted. Its Oracle-signed
resolution states the waiver is irrevocable (C-005 §4). So the reserved
annotation added afterwards did not recover the grant — it declared a regime
the repository did not have, on a directory the public could already fork
without conditions.

The archive was therefore telling readers `LicenseRef-Numen-AllRightsReserved`
about files that were, in fact, CC0.

---

## What has been done, and what has not

`ADR-026` (2026-08-28) rules the `agents/**` case: the directory leaves the
reserved annotation and is declared `CC0-1.0`. `REUSE.toml` and the
frontmatter of 21 files now agree, and the licence guard passes.

**C-005 itself is unchanged.** Its frontmatter declares
`estado: canon — immutable; modifying it requires formal consensus (NWOS)`,
and amending canon inside a mission PR would be exactly the pattern `D-029`
records as harmful — a decision travelling hidden inside another. So the
canon still files agent identity under lore while the repository no longer
does.

That gap is this entry. Until C-005 is amended, `ADR-026` is the operative
authority for `agents/**` and the canon is superseded on that path only.

---

## What C-005 must distinguish

The amendment is not "agents are open". It is that two different objects have
been sharing one row:

| Object | Example | Regime |
|---|---|---|
| Agent as **character** — voice, personality, place in the fiction | *"I have designed impossible worlds. The possible ones bore me to death."* | plausibly reserved, with `guilds/` |
| Agent as **operational definition** — routing, authority, escalation, sources | *"Route work to Byblos when documents must be classified…"* | documentation |

The retired roster mixed both in a single `SOUL.md`. The replacement roster
(`MIS-118`) carries only the second. A canon that cannot tell them apart will
mis-file whichever arrives next.

---

## Exit threshold

**A signed amendment to `C-005` §1** that distinguishes agent identity from
agent operational definition and assigns each a regime, plus a version bump
recorded in the canon's own frontmatter.

Not a date. The condition is the amendment existing, verifiable by:

```
grep -A8 'Four regimes' canon/C-005-licensing.md   # the table names both objects
grep 'version:' canon/C-005-licensing.md            # > 1.4.0
```

| | |
|---|---|
| Severity | high — the canon contradicts the repository on a published path |
| Owner | Oracle |
| Blocked by | nothing — it is a decision, not work |
| Opened | 2026-08-28 |
| Closes when | C-005 §1 distinguishes the two objects and is versioned |

## References

`ADR-026` (the ruling this entry records as owed to canon) ·
`LEGAL_DEBT.md` LD-001 (the irrevocable grant) ·
`D-030` (whether regimes should derive from paths at all — still open) ·
`D-029` (a decision travelling hidden inside another) ·
`MIS-118` (the mission that surfaced this) · `REUSE.toml`
