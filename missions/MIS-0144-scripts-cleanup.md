---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-144"
uid: ""
title: "Retire dead migration scripts and superseded one-shot fixes from scripts/"
status: todo
priority: medium
effort: M
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: null
completed: null

# REGISTRO
type: mission
version: "1.0.0"
created: "2026-09-03T09:45:29Z"
created_source: "git:7f621ab"
created_confidence: exact
updated: "2026-09-03T09:45:29Z"
author: "ursa"
owner: "oracle"
tags: [scripts, entropy, cleanup, MIS-127, MIS-138]
license: "CC0-1.0"

related: ["MIS-127", "MIS-138", "DBT-010"]
paths: [scripts/]
---
# MIS-144 — Retire dead migration scripts and superseded one-shot fixes from scripts/

> **Summary:** `scripts/` at `7f621ab` carries 52 code files (`.py`/`.mjs`/`.sh`)
> plus data sidecars. A per-file reference audit (grep of each filename
> against the whole tree, excluding `node_modules` and `web/dist`) found 15
> completed migration scripts and 6 already-executed one-shot fixes whose
> only remaining references are historical citations inside already-closed
> missions/reports — never a live invocation. `MIS-138`'s own closure
> (`in-review`) already retired `count-evidence.py` and explicitly kept 6
> other "measurer" scripts as `MIS-127`'s ledger, not dead code — this
> mission does not touch those. It executes the migration-script cleanup in
> phases so each deletion is reviewed and reversible on its own.
> **Epistemic:** today "is this script still needed" cannot be answered
> without reading it end to end and grepping the tree by hand. After this
> mission, anything under `scripts/` is either wired in CI
> (`.github/workflows/ci.yml`), has a live caller (a grep hit outside its own
> already-closed migration mission), is claimed by a named open mission
> (`MIS-127`'s ledger scripts), or is deleted — recoverable from git history.
> **Audience:** Agents · Oracles

---

## Scope

Only `scripts/` (code files and the data sidecars a retired script alone
produced: `phase*.txt`). Does **not** touch:

- `.github/workflows/ci.yml` — no guard is un-wired or re-wired here.
- `scripts/measuring_root.py`, `scripts/resolve-citations.py`,
  `scripts/experiments/complexity-census.py`,
  `scripts/experiments/index-coverage.py`,
  `scripts/experiments/mis127-token-delta.py`,
  `scripts/experiments/public-surface-census.py` — per `MIS-138`'s own
  closure note (2026-09-03), these are **not** measurers superseded by
  `telemetry.mjs`; they are a formatter (imported live by
  `phase0-inventory.py`), a check, and `MIS-127`'s ledger. `MIS-127` is
  `in-progress`; retiring these is its call, not this mission's.
- `scripts/verify-orphan-guard.sh`'s hardcoded
  `cd /var/home/uruk/arkitecktonia-home/repos/numinia-nwos` — **verified
  correct**, that is this machine's actual repo path. No defect; earlier
  audit was run from a since-vanished working copy at a different path and
  wrongly flagged this. Correction noted here, not repeated as a task.

### Phases (executed independently, each its own PR)

**Phase A — 15 completed migration scripts, historical-citation-only**
One-shot migrations already merged and applied to the corpus that exists
today. Verified at `7f621ab`: every reference outside `scripts/` itself is
inside an already-closed mission, report, or debt entry citing the script as
*what was run*, never as something to run again.

`phase0-inventory.py` (5 refs), `phase2-mechanical.py` (3),
`phase3-area-to-territory.py` (1), `phase4-vocabulary.py` (1),
`phase4b-folder-territories.py` (1) + `.txt` sidecar,
`phase5-status-and-registration.py` (2), `phase6-orphan-fields.py` (1) +
`.txt` sidecar, `phase7-types-and-empties.py` (1) + `.txt` sidecar,
`phase8-final-sweep.py` (2) + `.txt` sidecar, `phase8b-headers.py` (1),
`backfill-dates.py` (2), `add-context-cards.py` (2),
`normalize-standards.py` (2), `repair-frontmatter-delimiter.py` (3),
`cancel_to_frozen.py` (5), `scripts/phase3-discarded-tails.txt`.

Note: `phase0-inventory.py` imports `measuring_root` (kept, see Scope) —
deleting `phase0-inventory.py` does not touch `measuring_root.py`, the import
direction is one-way.

**Phase B — 6 already-executed one-shot fixes, zero forward references**
`verify-third-party-attribution.py` (4 refs, all historical — B1 attribution
defect closed, its `.license` sidecars are already in the tree),
`fix-font-attribution.sh` (3), `fix-icon-attribution.sh` (1),
`scripts/experiments/reuse-migration-sim.sh` (1),
`reuse-multi-holder-lab.sh` (1), `reuse-precedence-lab.sh` (1) — three labs
that operate on disposable `/tmp` copies by their own header comment, never
on this repo.

**Out of scope, explicitly**

- `MIS-127`'s six ledger/formatter scripts (see Scope).
- `MIS-138`'s live instrument (`scripts/telemetry.mjs`, `scripts/lib/`,
  `telemetry/`).
- `scripts/rename-series.mjs` (+ `.test.mjs`), `translate-corpus.mjs`,
  `field-decisions.mjs`, `generate-design-kit.mjs`, `check-deletable.mjs`,
  `check-internal-links.mjs`, `check-prose-in-code.mjs`,
  `check-responsive.mjs` — active tools or unwired-by-decision guards
  (`PRO-013`), not dead code.
- `scripts/verify-orphan-guard.sh`, `scripts/verify-declaration-rule.sh` —
  no defect found on re-verification at this repo's actual path.
- Any change to `.github/workflows/ci.yml`.

---

## Acceptance criteria

> Every criterion must be FALSE at the base commit (`7f621ab`).

```
✗  find scripts -maxdepth 1 -name 'phase*.py' | wc -l    returns 0   (today: 9)
✗  find scripts -maxdepth 1 -name 'phase*.txt' | wc -l   returns 0   (today: 3)
✗  the 15 Phase A files exist in scripts/                            (today: yes)
✗  the 6 Phase B files exist in scripts/ or scripts/experiments/     (today: yes)
```

- [ ] Verifiable by someone who did not do the work
- [ ] With the command that verifies it, when there is one
- [ ] False at the base commit — say what it returns today
- [ ] Phrased as a final state, not as a delta

Per-phase gate: `node scripts/check-references.mjs` and
`node scripts/lint-naming.mjs` report no new violations after each phase's
commit — a deleted script's own citations (in already-closed
missions/reports) are historical record, not links to fix.

---

## Closure

*(Fill when the mission closes.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** · **by:**
