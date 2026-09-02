---
id: "MIS-065"
uid: ""
title: "Canon at build time — narrative out of the code regime"
status: done
priority: "medium"
effort: "L"
guild: "Sentinels"
territory: "TBA"
assigned_to: null
started: null
completed: "2026-09-02"

type: mission
version: "1.2.0"
created: "2026-08-17T07:06:13Z"
created_source: "git:1d8ac2b"
created_confidence: inferred
updated: "2026-09-02T10:01:10+02:00"
author: "claude-fable-5"
owner: "oracle"
requested_by: "oracle"
tags: [web, licensing, file-over-app, c-005]
license: "CC0-1.0"

executor: null
requires_oracle_approval: true
depends_on: []
divergence_log: null
---
# MIS-065 — Canon at build time — narrative out of the code regime

> **Resumen:** One refactor closes two debts: the viewer stops hydrating
> mission data client-side against the GitHub API, and the culture-branch
> narrative stops shipping under the `web/**` MIT annotation.
> **Epistemic:** How File over App and CAN-005 §5 (one file, one regime)
> converge on the same architecture.
> **Pragmatic:** Routes read canon from the repo at build; narrative
> content carries its own regime; the board works without JS and is
> visible to crawlers.
> **Audience:** Agents · Oracles

**Guild:** Sentinels
**Type:** digital
**Priority:** medium
**Effort:** L

## Context

Accepted by Oráculo on 2026-08-17, from the LD-001 presentation-layer
audit. Two previously separate pending items are one mission:

1. **Bake mission data at build** (recorded as a pending design decision
   in `CLAUDE.md`): `/missions` board and detail hydrate in the visitor's
   browser against the GitHub API (unauthenticated, 60 req/h/IP,
   invisible to crawlers, breaks without JS). Canon and viewer share this
   repo, so deploy-on-push makes build-time data exactly as fresh. The
   machinery half-exists: `web/src/data/missions.ts` already does
   filesystem-first loading and is imported by nothing.

2. **Narrative under MIT** (LD-001 audit report, accepted): the blanket
   `web/** → MIT` annotation in `REUSE.toml` covers ~950 lines of
   culture-branch content hardcoded in code files:
   - `web/src/data/misiones.ts` (255 lines) — mirrors `missions/`
     (CC-BY-4.0 at root)
   - `web/src/data/decisiones.ts` (141) — mirrors `decisions/` (CC-BY-4.0)
   - `web/src/data/planos.ts` (296) — mirrors `blueprints/` (CC-BY-4.0)
   - `web/src/pages/archive/[fondo].astro` (257) — `lore:` fields are
     pure narrative of the **reserved** regime, today granted MIT.

   Exposure is bounded — everything above was published CC0 through
   commit `0157be9` (LD-001 grandfather) — but the regime must be right
   going forward. CAN-005 §5: when two regimes share a file, the content
   moves out; SPDX snippets are the patch, not the solution.

## Story

As the Oráculo, I want the viewer to read canon from the repo at build
time and the narrative to live in its own files with its own regime, so
that the site never asserts a licence the artifacts closed and the data
is exactly as fresh as the deploy.

## Acceptance criteria

- [ ] ~~`/missions` (board and detail) is generated at build from
      `missions/` in this repo; no client-side GitHub API hydration
      remains for content that exists in the checkout.~~
      **Moved to MIS-066 (2026-08-17)**, which owns everything
      mission-shaped; this mission keeps the non-mission routes below.
- [ ] `/misiones`, `/decisiones`, `/planos` read their content from
      root `missions/`, `decisions/`, `blueprints/` (or from extracted
      content files) instead of the hardcoded TS modules; the TS modules
      are deleted or reduced to typed loaders with no embedded prose.
- [ ] The `lore:`, `descripcion:` and `governance:` narrative in
      `archive/[fondo].astro` moves to its own content file annotated
      `LicenseRef-Numen-AllRightsReserved` (or CC-BY-4.0 where it is
      descriptive documentation — classify per CAN-005 §2, Oráculo signs
      the split).
- [ ] `REUSE.toml` annotations updated so no culture-branch content is
      matched by `web/** → MIT`; coverage check still reports zero
      unannotated files.
- [ ] The `missions-index.json` desync (index declares 64, `missions/`
      holds 81 `.md`) is resolved or explicitly re-scoped: if routes
      read the directory, the index either regenerates at build or
      retires.
- [ ] Historical records preserved: MIS-037 acceptance criteria keep the
      old repo name; DEC-002 CC0 mentions stay as history (per LD-001
      closure decisions).
- [ ] `npm run build` passes; rendered pages byte-compare acceptably
      against pre-refactor output except for intended changes.

## Epistemic value

Whether File over App discipline (content in files, code as loader) can
be driven by a licensing constraint and land as a better architecture —
the licensing canon acting as forcing function for the viewer design.

## Pragmatic value

Board and details work without JS, are crawlable, and never rate-limit.
The licence regime of every piece of prose matches CAN-005 with no
snippet exceptions. One refactor, two debts closed.

## Execution log

- 2026-08-17 — executed as MIS-071 phase 3 (`/decisiones`, `/planos` from root); see MIS-071 §Execution log.
- 2026-08-25 — returned to `todo` by the board triage (category D: no commit of its own — they were MIS-071's).
- 2026-09-02 — closed on the status check; the REUSE criterion goes to MIS-135 row 15.

## Execution Reality

- **What was done:** `/decisiones` and `/planos` read from root `decisions/` and `blueprints/` since 2026-08-17 (MIS-071 phase 3); `/misiones`, `/decisiones`, `/planos` are redirects onto collection-built pages; the hardcoded TS modules and `missions-index.json` are gone.
- **What diverged, and why:** criterion 1 (the board at build) moved to MIS-066 on 2026-08-17. The 2026-08-25 triage sent this file back to `todo` because no commit carried its id — the work was in MIS-071's commits, so the record said "not started" about a thing that had shipped. The REUSE criterion ("no culture-branch content matched by `web/** → MIT`") was never verified by anyone: not done, registered as MIS-135 row 15.
- **Evidence:** `web/astro.config.mjs` redirects `/misiones/[id]`, `/decisiones/[id]`, `/planos/[id]`; `web/src/data/missions-index.json` absent from the tree; MIS-071 §Execution log, 2026-08-17.
- **Closed:** 2026-09-02 · **by:** ursa

## Board triage — 2026-08-25

Returned from `in-review` to `backlog` by the Oracle, in the triage of the 111
missions. **Nothing about the brief changed and the work is still wanted** —
what changed is the claim that it was underway.

- **Category:** D — stale. Last activity 2026-08-17, unassigned.
- **Signal, not proof:** this mission was assigned to an agent whose identity is
  in question (`D-026`, `D-027`). That is context; the evidence for this move is
  the absence of its own commit, not who it was assigned to.
- **Signed by:** Oracle, 2026-08-25.

## Status check — 2026-09-02

*Read against `8907a56` during the missions/ normalisation (lot 3). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** Phases 1–2 of its parent MIS-071 report it executed on 2026-08-17 ('Phase 3 was executed as MIS-065 … closed in-review'), then the 2026-08-25 triage returned it to todo (category D, stale, unassigned). Its first criterion moved to MIS-066 (done); /misiones, /decisiones, /planos are now 28 redirects onto collection-built pages; missions-index.json no longer exists; REUSE.toml has been re-cut three times since (ADR-026/035/036). Execution Reality block still blank.
- **Recommendation:** Close as done — achieved by MIS-066/071 and the REUSE rulings that followed; fill Execution Reality from MIS-071's log (which already names what happened) and cite it. The one criterion nobody verified — 'no culture-branch content under web/** → MIT' — is a REUSE audit item, not a reason to keep a mission open; note it in MIS-135.

## Version history

- v1.1.0 (2026-09-02) — inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; retired identifiers repointed: C-005→CAN-005; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 3.

- v1.2.0 (2026-09-02) — status todo → done (executed 2026-08-17 as MIS-071 phase 3; criterion 1 moved to MIS-066; the unverified REUSE criterion is MIS-135 row 15). Proposed in #199 on the 2026-09-02 status check; the Oracle signs by merging (PRO-003 §2).