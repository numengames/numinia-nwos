---
id: "MIS-135"
uid: ""
title: "Register of incoherences found outside missions/ during the missions/ normalisation — continue the refactor where this one stopped"
status: todo
priority: high
effort: M
guild: "Sentinels"
territory: "Archive"
type_execution: hybrid
assigned_to: null
completed: null

type: mission
version: "1.0.0"
created: "2026-09-02T02:10:00+02:00"
created_source: declared
created_confidence: exact
updated: "2026-09-02T02:10:00+02:00"
author: "ursa"
owner: "oracle"
requested_by: "oracle"
tags: [archive, normalisation, guards, standards, protocols, debt]
license: "CC0-1.0"

depends_on: ["MIS-127"]
parent_mission: "MIS-127"
paths: [protocols/, standards/, scripts/, web/src/, CLAUDE.md, debt/]
context: "2026-09-02"
---
# MIS-135 — Register of incoherences found outside missions/ during the missions/ normalisation

> **Summary:** what the four lots of the missions/ normalisation (PR #198) saw at other levels of the system and, by instruction, did not touch — each item with where it was measured, so the next refactor starts from evidence instead of a re-audit.
> **Epistemic:** which contradictions between norms, guards and corpus survive after `reports/`, `operations/`, `canon/`, `decisions/` and `missions/` were normalised, and why each survived (out of scope, Oracle-owned, or another repository).
> **Pragmatic:** a numbered list the Oracle can rule on line by line; each line is one PR or one ruling.
> **Audience:** Oracle · Sentinels · Ursa

## Origin

The Oracle's instruction of 2026-09-01: *"si ves incoherencia en otros niveles las apuntamos en una nueva misión para continuar con el refactor y la normalización del sistema — estamos buscando estabilizarlo y reducir la sorpresa."* The missions/ work is `MIS-127`'s row 10 (ledger). This mission is its residue.

Everything below was measured against `7f51235` (main, 2026-09-01) and the four commits of PR #198. Nothing here was changed by that PR unless the line says so.

## Register

Severity: **A** — a norm and a guard, or two norms, contradict each other; **B** — a norm says something false about the corpus; **C** — housekeeping.

| # | Sev | Where | What | Evidence | Proposed disposition |
|---|---|---|---|---|---|
| 1 | A | `protocols/PRO-003-mission-cycle.md` §2 | The state diagram and the "who sets it" table still carry `draft`, `backlog` and `cancelled` — three values `STD-001` §7 withdrew on 2026-08-30 (`todo · in-progress · in-review · done · frozen`). `lint-frontmatter` enforces STD-001; the protocol every agent reads prescribes the retired set. | `sed -n 128,153p protocols/PRO-003-mission-cycle.md` vs `STD-001` §7 table; `MissionsView.astro` L76 maps `backlog/draft → todo` at render time to hide it | PRO-003 v4.2.0: replace the diagram and table with STD-001's five states + `freeze_reason`. One edit, Exegetes. |
| 2 | A | `web/src/views/MissionsView.astro` L146–147 | The board still computes a `cancelled` column (`missions.filter(m => m.status === "cancelled")`) for a status that no longer exists in the corpus (0 files). Dead code that documents a retired state as live. | `grep -n cancelled web/src/views/MissionsView.astro`; `grep -rl '^status: cancelled' missions/` → 0 | Delete the column and its sort; `frozen` with `freeze_reason: cancelled` is the record. |
| 3 | A | `protocols/PRO-010-how-to-archive.md` | `status: draft`, v0.8.2, since 2026-08-24 — the protocol that governs how every series is named, renamed and closed, cited by ADR-005, STD-001, MIS-089, MIS-125, MIS-127 and this normalisation as authority, has never been signed. `MIS-089` F0 ("P-010 signed") was the gate the whole IA plan waited on; the plan executed, the gate did not. | `grep -m1 '^status' protocols/PRO-010-how-to-archive.md` | Oracle signs → `status: active`, v1.0.0. No text change needed. |
| 4 | B | `CLAUDE.md` L21 | *"No tests or lint yet (MIS-070)."* The repo runs two test suites (`rename-series.test.mjs` 26 cases, `lint-naming.test.mjs` 9) and a 10-step CI of guards. The entry-point document for every cold agent states the opposite of the tree. | `.github/workflows/ci.yml` (10 `run:` steps); `ls scripts/*.test.mjs` | Rewrite the sentence; it is `MIS-101`'s fourth criterion, executable now. |
| 5 | B | `standards/STD-004-header-standard.md` §7 ring table | `assigned_to` is defined as *"agent-id, or null"*; the corpus carried a repository name (`numinia-nwos` ×3, `nwos-workspace-template`, `numengames-web + nwos-deploy`, `numinia-web`) and a model name (`claude-fable-5` ×2) as assignees. Fixed on the live missions in PR #198 (→ null); the `done` ones keep theirs as record. No guard checks the value. | `grep -h '^assigned_to' missions/MIS-*.md \| sort \| uniq -c` | Add an `H-` check: `assigned_to` ∈ `agents/<id>/` or null (the identity file D-026/STD-004 H-10 deferred to). Sentinels. |
| 6 | B | `standards/STD-001-glossary.md` §4.1 row `reports/` | Says 10/25 · 40 %. `count-evidence.py` reports 24/24 · 100 % since #194. Stale by one day; the table is the one `MIS-125` said "is not copied from an earlier version". | `python3 scripts/count-evidence.py` | Re-measure the whole table in one patch (every row but missions/ and reports/ is also from 2026-08-31). |
| 7 | B | `debt/DBT-001-series-prefixes-not-applied.md` L40, L222 | *"missions/ MIS-NNNN 0/131"* and *"131 files … last"*. 134/134 as of #198. The entry's premise is closed for 10 of 11 series; `infra/` has 0 files. | `count-evidence.py` | Close DBT-001 under ADR-030 (operational debt extinguishes on close) or reduce it to the one open series. |
| 8 | A | `scripts/lint-frontmatter.mjs` L179 `PREFIX` vs `scripts/lint-naming.mjs` L57 `SERIES` | Two registers of the same 13 prefixes in two guards, hand-maintained separately (lint-naming's own comment: *"NOT the stale 8-series map in lint-frontmatter.mjs's PREFIX constant"*). Every series change edits both; `MIS-125` bug class. | both files | One exported `series.mjs` read by both guards, `count-evidence.py` and `check-references.mjs` (`ID_RE`). |
| 9 | B | `scripts/check-references.mjs` L201 `ID_RE` | Accepts `MIS-\d{1,4}`: a 4-digit `MIS-0129` citation would resolve to nothing (ids are 3-digit) and be reported — correct — but the same regex accepts `D-\d{1,4}`, `P-` is gone, and `AUD` is gone; the alternation is edited by hand per series (see 8). Three citations to `MIS-0135` in PR #198 were caught by it — the guard works; the register it reads should be shared. | `sed -n 201p scripts/check-references.mjs` | Same as 8. |
| 10 | B | `standards/STD-004-header-standard.md` §7, `missions/` row | Still lists `sub_missions`, `divergence_log`, `executor`, `mission_mode`, `phase` as registered fields. Corpus: `sub_missions` 10 files (all the retired `MIS-NNN.N` dot form, MIS-062 the only one with content); `divergence_log` 6 files, all `null`; `executor` 1, empty (TEMPLATE-CHANGES measured this on 2026-08-25 and recommended retiring them). PR #198 retired only `mission_id`. | `missions/TEMPLATE-CHANGES.md` §table; `grep -c '^divergence_log' missions/*.md` | Retire the four (`sub_missions` after MIS-062 closes — its block is a record), STD-004 v1.5.0, lint-frontmatter RING3. |
| 11 | C | `missions/TEMPLATE.md` L38 | The OPCIONALES comment block still offers `blocked_reason: null` as a field to fill — retired 2026-08-31 (its debt entry closed in #160; `H-31` fails the field corpus-wide). The template teaches what the guard forbids. | `grep -n blocked_reason missions/TEMPLATE.md` | Drop the line; TEMPLATE-CHANGES v1.2.0 records why. |
| 12 | B | `web/src/views/ContinuityView.astro` L60, L78 | Prose says *"Lee missions/active/, blueprints/, decisions/"* and *"54 misiones con historia"*. `missions/active/` has not existed since MIS-066 (2026-08-17); there are 134 missions; `blueprints/` holds 3 files. A page that teaches continuity from a layout three refactors old. | `grep -n 'missions/' web/src/views/ContinuityView.astro` | Rewrite the two strings from the tree (or derive the counts at build, MIS-066 pattern). Alchemists. |
| 13 | B | `README.md` §"The mission system" | *"State is a frontmatter field, never a path"* — true; but the paragraph's example set and the "Where things live" index are hand-written (MIS-112/113 open). Not a contradiction; a maintenance debt the two missions already own. | — | No action here; MIS-112/113. |
| 14 | A | `scripts/check-internal-links.mjs` | Exits 1 on `main` (identical output on main and on #198) and is **not** in `ci.yml`. A guard that always fails and is never run is D-039's vacuous green inverted: permanent red nobody reads. | `node scripts/check-internal-links.mjs; echo $?` on `7f51235` | Fix or delete; if kept, into CI (PRO-013 handoff). Sentinels. |
| 15 | B | `REUSE.toml` `web/**` → MIT | `MIS-065`'s unverified criterion: *"no culture-branch content is matched by web/** → MIT"*. `ContinuityView.astro`, `HomeView.astro` and the `archive/[fondo].astro` lore strings are prose inside MIT-licensed components. Never audited. | `grep -c lore: web/src/pages/archive/\[fondo\].astro` | A REUSE audit of `web/src/views/*.astro` prose; C-005 §2 classification signed by the Oracle. Belongs to DBT-005 (path-derived licensing). |
| 16 | C | `scripts/phase8-final-sweep.py` L137–141, L186 | One-shot script from 2026-08-30 hard-codes six `missions/MIS-NNN-*.md` paths that no longer exist after #198. A record (PRO-010 §3.4), left as is; listed so nobody runs it. | `grep -n 'missions/MIS-' scripts/phase8-final-sweep.py` | Move `scripts/phase*.py` to `scripts/experiments/` (the shelf #194 created for exactly this) or delete under ADR-030. |
| 17 | B | `standards/STD-001-glossary.md` L1390 | *"Missions with MIS-NNN 105/105"* in a 2026-08 census table — a second, older count that now contradicts §4.1's row two screens up. | `grep -n 'MIS-NNN' standards/STD-001-glossary.md` | Mark the census table as dated (it is) or delete it; §4.1 is the live figure. |
| 18 | C | `agents/INDEX.md` | Lists Nimrod, Adonaz→Byblos, `procurador-01` as retired 2026-08-28. 8 todo missions were still assigned to them until #198. No guard relates `assigned_to` to the roster (see 5). | `grep -n retired agents/INDEX.md` | Covered by 5. |
| 19 | A | `web/astro.config.mjs` L143 `"/misiones/[id]": "/missions/[id]"` | Parameterised redirect: `check-url-lifecycle` declares it *"matched literally … neither verified nor expanded"* (its own blind-spot list). The 130 `/misiones/mis-NNN` URLs in `url-baseline.json` are therefore covered by an unverified rule; #198 had to add explicit rules for `mis-115a/b`. | `scripts/check-url-lifecycle.mjs` blind spots; `grep -c '/misiones/mis-' scripts/url-baseline.json` | Either expand `[id]` rules in the guard or drop the Spanish alias with 130 explicit redirects. DBT-004. |
| 20 | B | `missions/` — 30 of 52 `done` missions | No filled `## Closure` (What was done / diverged / evidence / closed-by). `MIS-134` (ex-PROPOSAL) is the guard for this; the 30 are its baseline. Not touched in #198: substance of closed records (PRO-010 §3.4 rule 2). | `.hermes` census in PR #198 description | Execute MIS-134 as a ratchet (fail on new `done` without Closure; baseline the 30). |

## What this mission is not

- It does not re-open any `done` mission. Where a closed record contradicts today's tree (MIS-066's 90 old basenames, RPT-004's `queue/`…`done/` paths) the contradiction is the record doing its job; `check-references` baselines it by class.
- It does not decide status. The 55 `Status check` sections written by PR #198 into live missions are recommendations; the Oracle's rulings on them are `MIS-127`'s decision queue, not this register.
- It does not touch other repositories (numinia-web, numengames-web, nwos-workspace-template). Missions parked here for those repos (MIS-074, 077, 085, 102, 106, 107, 108) are flagged in their own Status check.

## Acceptance criteria

- [ ] Every row above has a disposition signed by the Oracle (execute · defer · reject), recorded in the row.
- [ ] Rows marked *execute* are each closed by one PR that cites this mission and the row number.
- [ ] Rows 1, 3 and 8 (the three A-severity norm/guard contradictions) are closed before any further series-level refactor opens.
- [ ] `MIS-127`'s ledger carries this mission as a row.

## Execution log

*(one line per row closed: date · row · PR)*

## Closure

*(Fill when the mission closes. Not before, and not with intentions.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:**

## Version history

- v1.0.0 (2026-09-02) — Opened at the end of the missions/ normalisation (PR #198, lots 1–4), by the Oracle's instruction of 2026-09-01. Twenty rows, measured against `7f51235` + `#198`.
