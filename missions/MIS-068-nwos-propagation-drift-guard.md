---
id: "MIS-068"
title: "NWOS propagation: consumer repos never drift from the source of truth"
type: mission
status: backlog
version: "1.0.0"
created: "2026-08-17"
updated: "2026-08-17"
author: "claude-fable-5"
owner: "oracle"
tags: [nwos, propagation, drift, guard, c-005, tooling]
license: "CC-BY-4.0"
mission_id: "MIS-068"
area: "CAO / Tooling"
guild: "Sentinels"
type_execution: "digital"
priority: "medium"
effort: "M"
assigned_to: null
requested_by: "oracle"
requires_oracle_approval: true
blocked_reason: null
depends_on: []
started: null
completed: null
divergence_log: null
---
# MIS-068 — NWOS propagation: consumer repos never drift from the source of truth

> **Summary:** `numengames/numinia-nwos` is THE source of truth; every
> numengames repo that uses NWOS drinks from it by copying (the C-005 §9
> fragment, protocols, standards). Copies drift. This mission designs
> and ships the mechanism that detects — and where possible prevents —
> that drift.
> **Epistemic:** Whether propagation-by-copy can be made safe with
> guards, or whether the canon needs versioned exports.
> **Pragmatic:** Adding a third consumer repo stops being a silent risk.
> **Audience:** Agents · Oracles

---

**Area:** CAO / Tooling
**Guild:** Sentinels
**Type:** digital
**Priority:** medium
**Effort:** M

---

## Context

Oracle ruling 2026-08-17: interim answer is the cheap one — literal
copy plus a guard that compares the copy against the canon and fails
the build on divergence (same pattern as `check-license-frontmatter.mjs`).
This mission designs the better system. Out of scope by the same
ruling: the workspace generator and everything under
`github.com/numen-games-nwos-orgs` — those repos do not consume
numinia-nwos at all.

The disease is documented: five competing mission-state surfaces
(AUD-2026-08-17 F-1, cured by MIS-066) and CC0 footers surviving a
licensing regime change (LD-001) were both copies nobody rebuilt from
source.

## Story

As the Oracle, I want every NWOS consumer repo to either read from the
source or prove its copy is current, so that adding consumers never
multiplies silently-stale surfaces.

## Acceptance criteria

- [ ] Inventory: which artifacts propagate (C-005 §9 fragment,
      protocols, STANDARDS sections, templates?) and to which
      numengames repos, listed from reality — not from memory.
- [ ] Decision (Oracle signs): propagation model per artifact — literal
      copy + drift guard, versioned export (canon publishes a
      checksummed snapshot), or direct read at build.
- [ ] A reusable guard exists that any consumer repo can run in CI:
      given artifact + canonical source, fail on divergence with a
      diff. Shipped as `scripts/` here (MIT, per C-005 the border
      regime).
- [ ] numinia-nwos itself runs it for its own internal copies (CLAUDE.md
      fragment vs canon §9 — today verified only by hand).
- [ ] Documented in STANDARDS.md: how a new consumer repo subscribes.

## Epistemic value

Whether "the copy is the disease" generalizes: MIS-066 fixed drift by
deleting copies; consumer repos cannot delete theirs, so the guard is
the next-best cure. This mission measures if it is enough.

## Pragmatic value

The third consumer repo onboards with a checklist and a CI job instead
of a prayer.

## Execution log

*(Fill when executing)*

## Execution Reality

*(Fill when closing the mission)*

- **Technology/approach used:**
- **Why it diverged:**
- **Key learning:**
- **Closing date:**
- **Executing agent:**
