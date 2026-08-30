---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-118"
title: "Replace the agent roster with the operative agent definitions"
status: done
priority: high
effort: M
guild: procurators
area: governance
type_execution: hybrid
assigned_to: "ursa"
completed: "2026-08-28"

# REGISTRO
type: mission
version: "1.1.0"
created: "2026-08-28T09:33:53Z"
created_source: "git:f86569b"
created_confidence: exact
updated: "2026-08-28T10:07:45Z"
author: "ursa"
owner: "oracle"
tags: [governance, procurators, agents]
license: "CC-BY-4.0"

requires_oracle_approval: true
depends_on: ["ADR-026"]
paths: [agents/, REUSE.toml, decisions/, debt/, AGENTS.md]
---
# MIS-118 — Replace the agent roster with the operative agent definitions

> **Summary:** empty `agents/` and refill it with definitions that tell each
> agent what it is for and when work should be routed to it — under the
> licence the directory really has.
> **Epistemic:** what an agent definition is *for* — routing and operating a
> worker, not describing a character — and what changing a regime costs when
> the grant already happened.
> **Pragmatic:** an operator reads one folder and knows which agent takes a
> given task, under what approval policy, from which sources.
> **Audience:** Agents · Oracles

---

## Scope

Everything under `agents/`, in two pull requests against `main @ 9f8627a`:

**PR 1 — the licence ruling (ADR-026).** `agents/**` leaves the reserved
annotation in `REUSE.toml` and is declared `CC0-1.0`; the 21 existing `.md`
files re-declare their frontmatter licence to match; `D-030` records the
case ruled without closing its question; `D-038` registers the amendment
owed to C-005 §1; `decisions/INDEX.md` lists the ADR. No roster change.

**PR 2 — the transplant.** Every existing agent folder is removed and
replaced by the definitions supplied by the Oracle (2026-08-28,
`Agents for Hermes.zip`, 7 agents). Per agent:

| File | What it is |
|---|---|
| `AGENT.yaml` | machine-readable card: status, role, routing, `previous_names[]` |
| `SOUL.md` | identity, function, limits, escalation (from the archive) |
| `OPERATOR.md` | platform-agnostic governance, derived from the approval policy |
| `SOURCES.md` | where this agent's authoritative knowledge lives — real repo paths |
| `adapters/hermes/profile.yaml` | Hermes routing description (from the archive) |
| `adapters/hermes/config.yaml` | Hermes approvals, checkpoints, memory, delegation (from the archive) |

Plus: `AGENTS.md` at the repository root (multi-platform agent context,
corrected to the tree that exists), `agents/INDEX.md` rewritten with the new
roster and the authorship-archaeology table, `_template/` updated to the new
structure, and the live inbound links repaired.

### Oracle decisions recorded at opening (2026-08-28)

1. Full replacement — the old folders go.
2. **Byblos is Adonaz renamed** — `previous_names: [adonaz]`; Adonaz has no
   commits, so no git-author mapping is affected.
3. **Nimrod retires with no successor.** His 57 commits stay signed
   `Centinela-01`; the archaeology table in `agents/INDEX.md` remains the
   reverse lookup (`D-027`).
4. `procurador-01` and the old Senet/Ursa personas retire with the roster.
5. Licence is **CC0-1.0** (ADR-026) — the Oracle's second confirmation, made
   knowing C-005 §4 declares the waiver irrevocable.
6. `agents/` stays ungated on numinia.org: the files were always public;
   the reserved annotation was the anomaly, not the exposure.
7. Doulos gets memory (`memory_enabled: true`) — he runs subagents.
8. `STATUS.md` retires; `status:` lives in `AGENT.yaml`. Runtime metrics do
   not return to the archive.
9. Model pins live in `adapters/hermes/config.yaml`, never in `SOUL.md`.
10. `domains/` from the architecture paper is **not** created — this repo
    already is the archive domain; `SOURCES.md` points at real paths
    (`canon/`, `standards/`, `protocols/`; RPG material is cross-repo in
    `numinia-lore`).
11. `Ursa/SOUL.md` arrives in Spanish and is translated before landing
    (DEC-006).

### Out of scope

- `guilds/**` content beyond the two roster links that would break.
- The C-005 §1 amendment itself — owed, tracked as `D-038`, requires formal
  consensus.
- Hermes runtime profiles under `~/.hermes/profiles/` — the archive records
  the agents; it does not configure the machine.
- Forensic documents citing old agent paths (`D-027`, `D-012`, `ADR-023`,
  audits, `CHANGELOG.md`, `S-001` examples): evidence is not repaired,
  it is history.

---

## Acceptance criteria

> Every criterion is FALSE at base commit `9f8627a`.

```
✓  REUSE.toml declares agents/** as CC0-1.0
   (today: LicenseRef-Numen-AllRightsReserved, REUSE.toml:14)

✓  node scripts/check-license-frontmatter.mjs exits 0 with agents/ under CC0
   (today: exits 0 only because frontmatter still says reserved)

✓  decisions/ADR-026-*.md exists and decisions/INDEX.md lists it
   (today: neither)

✓  git ls-tree -r --name-only HEAD agents/ shows, per agent folder:
   AGENT.yaml, SOUL.md, OPERATOR.md, SOURCES.md,
   adapters/hermes/profile.yaml, adapters/hermes/config.yaml
   (today: SOUL/OPERATOR/STATUS/MEMORY, no yaml, no adapters/)

✓  agents/{antunj,byblos,doulos,lexa,procyon,senet,ursa}/ exist;
   agents/{nimrod,adonaz,procurador-01}/ do not
   (today: the reverse)

✓  AGENTS.md exists at the repository root and names only directories that
   exist                                            (today: no AGENTS.md)

✓  agents/INDEX.md maps Centinela-01 → Nimrod (retired 2026-08-28) and
   git log --format=%an | grep -c Centinela-01 still returns 57
   (today: the table maps to a live folder)

✓  no file under agents/ contains Spanish prose
   (today: n/a — at PR 2 open, Ursa/SOUL.md arrives in Spanish)

✓  guilds/*/roster.md and blueprints/BP-archive-fondos.md contain no link
   into agents/ that fails to resolve             (today: they resolve, but
                                                   against folders PR 2 deletes)

✓  cd web && npm run build exits 0                 (must stay true)
```

- [x] Verifiable by someone who did not do the work
- [x] With the command that verifies it
- [x] False at the base commit
- [x] Phrased as a final state

---

## Measured findings at opening

Against `origin/main @ 9f8627a`:

1. **The grant already happened.** `git ls-tree -d 0157be9` shows `agents/`
   inside the tree published under the root CC0 `LICENSE`; `LEGAL_DEBT.md`
   LD-001 names it and declares the waiver irrevocable. The reserved
   annotation never had legal effect on those files.
2. **Adonaz has zero commits** (`git log --format=%an` shows none), so
   renaming him to Byblos breaks no provenance. Nimrod has 57 as
   `Centinela-01` — the archaeology table is what keeps them resolvable.
3. **34 inbound links** point into `agents/` from 54 documents; only 5 are
   live navigation (2 guild rosters, `BP-archive-fondos.md`, `INDEX.md`);
   the rest are forensic citations and stay untouched.
4. **The licence guard reads only `*.md`** (`git ls-files "*.md"`), so the
   six `.yaml` files per agent are covered by `REUSE.toml` alone and need no
   frontmatter.
5. **The web build ingests `agents/**/*.md`** with a lax schema
   (`z.object({}).passthrough()`) and no visibility gate
   (`GOVERNED = ["debt/"]`): whatever lands is published. Confirmed intended.
6. **The archive's `Ursa/SOUL.md` is Spanish** (143 lines); every other zip
   file is English.

---

## Closure

- **What was done:** two PRs as briefed. #101 (`f86569b`): ADR-026, REUSE.toml
  regime change, 21 frontmatter re-declarations, D-038 opened, D-030 noted.
  #102 (`eba0b00`): retirement commit `bfa88d0` (Nimrod, Adonaz,
  procurador-01, old personas, all STATUS/MEMORY files) + roster commit
  `2d5a8db` (7 agents with AGENT.yaml/SOUL/OPERATOR/SOURCES/adapters,
  AGENTS.md at root, INDEX v3.0.0, _template rebuilt, 6 live links repaired).
- **What diverged, and why:** (1) The licence was decided as a PR of its own —
  the brief assumed one PR; LD-001 showed the CC0 grant had already happened
  irrevocably in August, which turned "grant CC0" into "stop declaring a
  regime we do not have," worth its own review. (2) The reference guard found
  a 6th live link (guilds/procuradores/roster.md) that the manual sweep
  missed — the sweep undercounted by one. (3) ADR number moved 025→026:
  025 was already reserved for the world-lexicon glossary on the kanban.
  (4) Guild re-assignment of the new roster was explicitly deferred by the
  Oracle; the three touched rosters carry the note.
- **Evidence:** PRs #101/#102 merged; CI build pass on both;
  `node scripts/check-license-frontmatter.mjs` → 291/316 OK;
  `node scripts/check-references.mjs` → no new broken;
  `git log --format=%an | grep -c Centinela-01` → 57, resolvable via
  agents/INDEX.md archaeology.
- **Closed:** 2026-08-28 · **by:** ursa

