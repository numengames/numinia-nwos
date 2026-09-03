---
id: "MIS-145"
uid: ""
title: "Series template library: every registered series gets a copy-from template in templates/"
status: in-progress
priority: medium
effort: M
guild: "Alchemists"
territory: "Archive"
type_execution: digital
assigned_to: "ursa"
completed: null

type: mission
version: "1.0.0"
created: "2026-09-03T10:22:10Z"
created_source: "git:7ca43b3"
created_confidence: exact
updated: "2026-09-03T10:22:10Z"
author: "ursa"
owner: "oracle"
tags: [templates, series, archive, standards]
license: "CC0-1.0"
---

# MIS-145 — Series template library: every registered series gets a copy-from template in templates/

> **Summary:** One copy-from template per registered series, consolidated in `templates/`,
> so a new document of any series starts from a canonical mould instead of archaeology.
> **Epistemic:** How many templates the archive needs, and what each series' contract requires.
> **Pragmatic:** Copy `templates/<PREFIX>-TEMPLATE` when creating any new series document;
> copy `agents/_template/` when creating a new agent.
> **Audience:** Agents · Oracles

---

## Background

The archive has 12 registered series (STD-001 §2; rules.json `series`), but only three have
templates, scattered:

- `templates/STD-TEMPLATE.md` — created by MIS-142, the only file in `templates/`.
- `templates/MIS-TEMPLATE`, `templates/MIS-TEMPLATE-CHANGES`, `templates/MIS-TEMPLATE-EXAMPLE` —
  the mission contract and its design record, living inside the series they scaffold.
- `agents/_template/` — the agent scaffold (AGENT.yaml, SOUL.md, OPERATOR.md, SOURCES.md,
  adapters/), living where it is copied from.

MIS-142 (decisions-to-standards) explicitly deferred this consolidation: its scope note names
"Migrating existing templates (`missions/TEMPLATE*.md`, `agents/_template/`) into `templates/`"
as out of scope. This mission closes that gap.

**Status note:** this mission opens at `todo` — the canonical status for "accepted, not
started" (STD-001 §7; `backlog` is the retired spelling, flagged by H-04, that the board
still renders in the same column, MIS-132). It flips to `in-progress` when execution starts.

## Scope

### Move into `templates/` (git mv — history follows)

- `templates/MIS-TEMPLATE` → `templates/MIS-TEMPLATE` — the canonical mission contract
  (the ten build-verified fields + Scope/Acceptance criteria/Closure). Take this one as the
  reference for consolidation: it is the most elaborated and the one the build verifies.
- `templates/MIS-TEMPLATE-CHANGES` → `templates/MIS-TEMPLATE-CHANGES` — the design record:
  the figures that rebuilt the v2 mission template. Epistemic value, kept with the template.
- `templates/MIS-TEMPLATE-EXAMPLE` → `templates/MIS-TEMPLATE-EXAMPLE` — a real filled mission.
  Pragmatic value, kept with the template.

### Create the missing series templates

Each carries its series' real frontmatter contract and required structure, derived from the
live corpus (headers of the actual documents), not invented:

| Series | File | Frontmatter contract | Document structure |
|---|---|---|---|
| Missions | `MIS-TEMPLATE` (moved) | 10 CORE fields the build verifies (content.config.ts) + REGISTRO block | Scope / Acceptance criteria / Closure; optional Story, Epistemic/Pragmatic value, Execution log |
| Standards | `STD-TEMPLATE.md` (exists) | STD-NNN, 5 required sections per STD-004 §10 | Purpose and scope / The norm (RFC 2119) / Conformance / What it does NOT do / Version history |
| Protocols | `PRO-TEMPLATE` | `type: protocol`, PRO-NNN | Purpose / Procedure steps / Verification / Escalation |
| Decisions | `ADR-TEMPLATE` | `type: adr`, ADR-NNN, append-only | Context / Decision / Consequences / Status |
| Debt | `DBT-TEMPLATE` | `type: documentation`, `absorbs:`, `related:`, `visibility:`, "Closes when" | The defect / Evidence / Closure condition |
| Reports | `RPT-TEMPLATE` | Two variants: RPT-NNN (`subtype: audit\|analysis\|proposal`) and RPT-YYYY-MM-DD (`subtype: daily`, `evidence_script`, `evidence_head`) | Numbered: audit/analysis/proposal body; Daily: session record |
| Operations | `OPS-TEMPLATE` | `type: documentation`, OPS-NNN | Record body, `extraction_note` when extracted from web |
| Canon | `CAN-TEMPLATE` | `type: seminal`, sealed threshold (Oracle signature + ADR) | What the system IS; governing principle |
| Blueprints | `BLU-TEMPLATE` | `type: blueprint`, `semaforo`, `related_missions`, territory | Future-state architecture plan |
| System | `SYS-TEMPLATE` | `type: documentation` + `subtype: reference`, `former_id` + note | Reference manual of how the system works today |
| Guilds | `GLD-TEMPLATE` | `type: charter` for charter and roster forms, GLD-NNN | Charter: identity + operational profile; Roster: active agents |

`templates/` is already apparatus in `scripts/lib/rules.json` (`pathPatterns` and
`templatePatterns` both include `^templates/`) and its licence regime is CC0-1.0
(REUSE.toml, MIS-142) — no guard or licence change needed.

### `agents/_template/` stays in `agents/`

Decision (Oracle-confirmed 2026-09-03): the agent scaffold does NOT move. Reasons:
it is a directory scaffold (5+ files, not one document); `agents/` is outside the filename
scheme by ADR-005 v1.1.0 ("identified by folder name, not filename"); the guards already
recognise `^agents/_template/` as apparatus where it is; moving it would change the web
corpus surface (`agents/**/*.md` is in the glob) with no benefit. `templates/README` points
to it as the copy source for new agents.

### `templates/README.md` (new)

The index of the library: what each template is for, the series → template map, and the
pointer to `agents/_template/` for new agents.

### STD-001 §2 gains the series → template map

A subsection in `standards/STD-001-glossary.md` §2 (the series section) listing, per
registered series, which `templates/` file to copy from. Governed change (STD-001 threshold:
governed — Oracle-approved PR).

### Repair citations broken by the moves (form-only edits on closed records, STD-001 §2.1)

- `protocols/PRO-003-mission-cycle.md` — "Use templates/MIS-TEMPLATE" → point at `templates/MIS-TEMPLATE`.
- `AGENTS.md` and `CONTRIBUTING.md` — same repoint.
- Missions citing `missions/TEMPLATE*.md` by path: MIS-0111, MIS-0115, MIS-0133, MIS-0135
  (and any other the reference guard flags). Form-only: never rewrite what a closed record
  claims.

### Telemetry dataset

The corpus changes (three files leave `missions/`): regenerate and commit `telemetry/`
(`node scripts/telemetry.mjs --fetch-tokenizer` first, then `node scripts/telemetry.mjs`,
per the MIS-138 recipe) or `telemetry --check` fails CI.

## Out of scope

- `infra/` — 0 eligible files, prefix reserved (DBT-001). No template until it has content.
- Any content change to the moved templates beyond consolidation notes.
- Moving `agents/_template/` (explicitly kept in place, see Scope).
- Changes to the `templates/` licence regime (already CC0-1.0).
- Retiring the old `missions/TEMPLATE*` apparatus entries from rules.json — `^templates/`
  already covers the moved files; the old `^missions/TEMPLATE-` patterns simply stop matching.
  No guard edit needed.

## Acceptance criteria

> Every criterion must be FALSE at the base commit (today's state in parentheses).

```
✓  ls templates/ shows MIS-TEMPLATE, MIS-TEMPLATE-CHANGES, MIS-TEMPLATE-EXAMPLE,
   README, and one <PREFIX>-TEMPLATE per series: PRO ADR DBT RPT OPS CAN BLU SYS GLD
   (today: only STD-TEMPLATE.md)
✓  ls missions/TEMPLATE* returns nothing                              (today: 3 files)
✓  agents/_template/AGENT.yaml still exists                            (today: exists)
✓  templates/README exists                                             (today: absent)
✓  grep -c 'templates/MIS-TEMPLATE' protocols/PRO-003-mission-cycle.md > 0
                                                                       (today: 0)
✓  grep -c 'templates/' standards/STD-001-glossary.md > 0             (today: 0)
✓  node scripts/check-references.mjs reports no NEW broken reference   (today: passes)
✓  node scripts/telemetry.mjs --check exits 0                          (today: would fail after the moves)
✗  every series is covered                                             (a delta — it rots)
```

## Closure

*(Fill at close.)*
