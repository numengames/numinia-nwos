---
id: "ADR-026"
uid:
title: "Agent definitions are operational documentation, and they are CC0"
type: adr
status: active
version: "1.0.0"
created: "2026-08-28T00:00:00Z"
created_source: "git:pending"
created_confidence: "exact"
updated: "2026-08-28T00:00:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [decisions, adr, licensing, agents, C-005, D-030, LD-001, canon-change]
license: "CC-BY-4.0"
adr_id: "ADR-026"
supersedes: ""
related: ["LD-001", "D-030", "D-038", "C-005", "MIS-118", "ADR-005"]
---
# ADR-026 — Agent definitions are operational documentation, and they are CC0

## Status

**Active.** Decided by the Oracle on 2026-08-28, in the opening of `MIS-118`.
The amendment this ruling owes to C-005 §1 is tracked as `D-038` and requires
formal consensus; until it lands, this ADR is the operative authority for
`agents/**` and C-005 is superseded on that path only.

> **Summary:** `agents/**` leaves the reserved regime and is declared
> `CC0-1.0`.
> **Epistemic:** why an agent definition is not lore, and why closing this
> particular tap never had legal effect.
> **Pragmatic:** the licence header to write in every agent file, and the
> single `REUSE.toml` line that governs them.
> **Audience:** Agents · Oracles

---

## Context

`REUSE.toml` groups `agents/**` with `canon/**` and `guilds/**` under
`LicenseRef-Numen-AllRightsReserved`. That grouping follows C-005 §1, whose
regime table reads:

| What | License | Why |
|---|---|---|
| World and name — lore, narrative, brand | **Reserved** | The irreplicable is not licensed |

An agent's identity was filed under "world and name". Three facts, measured
against `origin/main @ 9f8627a`, say that classification is wrong.

### 1. The tap was never closed

`LEGAL_DEBT.md` LD-001 records that the repository was published with a root
`LICENSE` of CC0-1.0 through commit `0157be9` (2026-08-16). `git ls-tree -d
0157be9` confirms `agents/` was in that tree. LD-001 names it explicitly:

> *"…and `agents/` (personas of adonaz, nimrod, procurador-01, senet, and the
> template)."*

Its resolution, signed by the Oracle on 2026-08-16, is equally explicit:

> *"What was published stays CC0 and no attempt is made to revoke it — C-005
> §4: the waiver is irrevocable."*

So `agents/**` **has already been offered under CC0 and cannot be withdrawn**.
The reserved annotation added afterwards governs only content created after
the cutoff — it never recovered what was granted. The archive has been
declaring a regime it does not have.

### 2. The genre changed

The definitions this decision accompanies are not the ones LD-001 describes.
The retired files opened in character — Senet's began *"I have designed
impossible worlds. The possible ones bore me to death."* That is lore.

What replaces them declares when work should be routed to an agent, which
commands it must escalate, and where its authoritative sources live. That is
operational documentation, and C-005 §1 already assigns documentation an open
regime.

The classification did not change because the Oracle preferred it. The object
being classified changed.

### 3. Nothing in `agents/` is irreplicable

C-005's reason for the reserved regime is *"the irreplicable is not
licensed"* — it protects what cannot be rebuilt: the world, the narrative,
the brand. An agent definition is a job description. Its value is in being
used, not in being withheld. Numinia, Numen Games and Khepri remain protected
by `TRADEMARKS.md`, which CC0 never touched (C-005 §7).

---

## Decision

**`agents/**` is `CC0-1.0`.**

`REUSE.toml` removes `agents/**` from the reserved annotation and declares it
under CC0. Every `.md` file under `agents/` carries `license: "CC0-1.0"` in
its frontmatter, which is what the licence guard
(`scripts/check-license-frontmatter.mjs`) verifies against REUSE.toml.

This is a correction, not a grant. The grant happened in 2026-08-16 and is
irrevocable; this decision makes the declaration match reality.

### Scope

- **In:** every file under `agents/`, including `_template/`.
- **Out:** `canon/**` and `guilds/**` keep the reserved regime. Whether the
  regime should derive from the path at all remains open as `D-030` — this
  decision resolves one case, not the question.
- **Out:** C-005 §1's regime table still reads as it did. Amending canon
  requires formal consensus (its own frontmatter: `estado: canon —
  immutable`). This ADR records the amendment owed; it does not perform it.

### Consequence for C-005

C-005 §1 files agent identity under "world and name". That line is now known
to be wrong in one direction and unenforceable in another: agent definitions
are documentation, and the CC0 already granted over them cannot be undone.
**C-005 must be amended to distinguish an agent's identity-as-character from
an agent's operational definition.** Until it is, this ADR is the operative
authority for `agents/**` and C-005 is superseded on that path only.

---

## Consequences

**Anyone may use, fork, modify and redistribute the agent definitions with no
attribution and no conditions.** This was already true for everything
published through `0157be9`; from this commit it is also true of what follows,
and it is now declared rather than merely factual.

The reverse is not true: CC0 grants nothing over the names Numinia, Numen
Games or Khepri (C-005 §7, `TRADEMARKS.md`).

`agents/**` is published on numinia.org by `web/src/content.config.ts` and is
not gated by the `visibility` filter, whose scope is `debt/` only
(`web/src/lib/corpus.ts`). The Oracle confirmed on 2026-08-28 that this is
the intended behaviour: these files were always public, and the reserved
annotation was the anomaly.

---

## Evidence

```
git ls-tree -d 0157be9                     agents/ present in the CC0 tree
LEGAL_DEBT.md LD-001                       names agents/ among what was granted
REUSE.toml:14                              agents/** in the reserved annotation
web/src/lib/corpus.ts:48                   GOVERNED = ["debt/"] — agents/ ungated
canon/C-005-licensing.md §1                the regime table this ADR amends
```

Measured by `ursa` against `origin/main @ 9f8627a`, 2026-08-28.

---

## Discarded alternatives

**CC-BY-4.0** — my own recommendation, rejected by the Oracle. Attribution is
worth nothing here: the definitions were already granted under CC0 through
`0157be9`, so BY would have declared a condition on files the public already
holds unconditionally. Two regimes for one history is a second LD-001.

**Keep reserved, open later in a dedicated mission** — rejected. Every day the
annotation stands, the archive tells readers a falsehood about published
files. The correction is four files; deferring it buys nothing.

**Amend C-005 §1 in this same PR** — rejected. Canon is
`estado: canon — immutable` and amending it inside a mission PR is the
`D-029` pattern: a decision travelling hidden inside another. The amendment
is owed and tracked (`D-038`), not smuggled.

## Version history

- v1.0.0 (2026-08-28) — Initial ruling. `agents/**` leaves the reserved
  annotation; `REUSE.toml` declares CC0-1.0; 21 files re-declare their
  frontmatter licence. C-005 amendment registered as `D-038`.
