---
id: "MIS-068"
uid: ""
title: "NWOS propagation: consumer repos never drift from the source of truth"
status: frozen
priority: "medium"
effort: "M"
guild: "Sentinels"
territory: "CAO"
type_execution: "digital"
assigned_to: null
started: null
completed: null
freeze_reason: "folded into MIS-096 on 2026-09-02: its two surviving criteria (inventory of propagating artefacts; reporting guard) moved there; this file stays as the diagnosis record"

type: mission
version: "1.2.0"
created: "2026-08-17T13:59:23Z"
created_source: "git:069b83a"
created_confidence: exact
updated: "2026-09-02T10:01:10+02:00"
author: "claude-fable-5"
owner: "oracle"
requested_by: "oracle"
tags: [nwos, propagation, drift, guard, c-005, tooling]
license: "CC0-1.0"

requires_oracle_approval: true
depends_on: []
divergence_log: null
---
# MIS-068 — NWOS propagation: consumer repos never drift from the source of truth

> **Summary:** `numengames/numinia-nwos` is THE source of truth; every
> numengames repo that uses NWOS drinks from it by copying (the CAN-005 §9
> fragment, protocols, standards). Copies drift. This mission designs
> and ships the mechanism that detects — and where possible prevents —
> that drift.
> **Epistemic:** Whether propagation-by-copy can be made safe with
> guards, or whether the canon needs versioned exports.
> **Pragmatic:** Adding a third consumer repo stops being a silent risk.
> **Audience:** Agents · Oracles

**Guild:** Sentinels
**Type:** digital
**Priority:** medium
**Effort:** M

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

- [ ] Inventory: which artifacts propagate (CAN-005 §9 fragment,
      protocols, STANDARDS sections, templates?) and to which
      numengames repos, listed from reality — not from memory.
- [ ] Decision (Oracle signs): propagation model per artifact — literal
      copy + drift guard, versioned export (canon publishes a
      checksummed snapshot), or direct read at build.
- [ ] A reusable guard exists that any consumer repo can run in CI:
      given artifact + canonical source, fail on divergence with a
      diff. Shipped as `scripts/` here (MIT, per CAN-005 the border
      regime).
- [ ] numinia-nwos itself runs it for its own internal copies (CLAUDE.md
      fragment vs canon §9 — today verified only by hand).
- [ ] Documented in STANDARDS.md: how a new consumer repo subscribes.

## Context update (2026-08-18)

Two things happened on the same day, in opposite directions.

- **The doctrine shipped.** MIS-094 answered this mission's second criterion
  for one artifact class: the design system is emitted to a versioned path
  with a `manifest.json` carrying a sha256 per file, and `numinia-web` pins it
  instead of copying. *The canon is not copied — it is pinned.* Whether that
  model generalises to prose standards is **MIS-105**.
- **Two new copies were created.** MIS-091 wrote the §19.5 fragment verbatim
  into `docs/design-system-fragment.md` in `numengames-web` and `nwos-deploy`
  — deliberately, so an agent would find the contract in the repo it works in.
  Errata E1 of 5.1.0 changed that exact fragment (twelve animations → thirteen)
  the same day. **Both copies are stale as of today, and nothing tells them
  so.** This is the cleanest possible demonstration of this mission's premise,
  produced by accident: a copy made with good reasons, wrong within hours.
- The inventory criterion should therefore include: the §19.5 fragment (two
  copies), the CAN-005 §9 block in `CLAUDE.md` (three copies), and the design
  tokens hand-written in three repos (**MIS-102**).

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

## Execution log

- 2026-08-18 — **First case executed: the Design System** (commissioned by
  the consumer numinia-web after its ADR-022). Model chosen for this
  artifact: *versioned export* — the master lives in `standards/`, the kit
  is generated by script (`scripts/generate-design-kit.mjs`) to
  `numinia.org/diseno/kit/<version>/` with a `manifest.json` (sha256 per
  file + the master's digest); the consumer pins version+digest in
  `design-source.json` and its `design:check` verifies drift. The
  emitter's doctrine written into `GOVERNANCE.md` (rule G-11).
- Pending to close the mission: the complete inventory of propagating
  artifacts (C-005 §9, protocols, STANDARDS, templates) with their model
  signed by the Oracle, and the generic reusable guard in `scripts/`.

**Premise correction (2026-08-18, Oracle — CON-006 / G-12).** This
mission's title and Story assume that «consumer repos must never drift».
Under the sovereignty principle that is false for an organization with its
own NWOS repo: it **may** stay behind or step aside. What the guard must
guarantee is not the absence of drift, but **conscious drift**: detect,
report and leave a record — never break someone else's build for not being
current. The full reformulation goes in MIS-096.

## Board triage — 2026-08-25

Returned from `in-progress` to `backlog` by the Oracle, in the triage of the 111
missions. **Nothing about the brief changed and the work is still wanted** —
what changed is the claim that it was underway.

- **Category:** D — stale. Last own commit 2026-08-18, unassigned.
- **Signal, not proof:** this mission was assigned to an agent whose identity is
  in question (`D-026`, `D-027`). That is context; the evidence for this move is
  the absence of its own commit, not who it was assigned to.
- **Signed by:** Oracle, 2026-08-25.

## Status check — 2026-09-02

*Read against `8907a56` during the missions/ normalisation (lot 3). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** Premise corrected by the Oracle 2026-08-18 (CON-006/G-12: sovereignty means conscious drift, not no drift) with the reformulation delegated to MIS-096. First case (Design System kit + manifest + design:check) executed 2026-08-18. Triaged D on 2026-08-25. 17 citations (11 files) — a hub.
- **Recommendation:** Keep todo but re-title to what G-12 left of it ('propagation guard reports drift; it never breaks a consumer build') and make MIS-096 its parent — or fold the remaining two criteria (inventory of propagating artefacts; generic guard) into MIS-096 and close this one as superseded. I recommend the fold: two live briefs for one guard is how the drift happens.

## Version history

- v1.1.0 (2026-09-02) — inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; retired identifiers repointed: C-005→CAN-005; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 3.

- v1.2.0 (2026-09-02) — status todo → frozen (folded into MIS-096 — two live briefs for one guard is how the drift happens). Proposed in #199 on the 2026-09-02 status check; the Oracle signs by merging (PRO-003 §2).