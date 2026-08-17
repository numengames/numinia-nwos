---
id: "AUD-2026-08-17-cold-agent"
title: "Cold-Agent Audit — Six Discrepancies Verified Against the Tree"
type: report
status: done
version: "1.0.0"
created: "2026-08-17T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
author: "claude-fable"
owner: "oracle"
tags: [audit, missions, legibility, cold-agent]
license: "CC-BY-4.0"
---
# Cold-Agent Audit — 2026-08-17

> **Summary:** Verification of the six discrepancies reported by three cold external agents, against the actual working tree. All six resolved with exact citations.
> **Epistemic:** Which of the cold agents' observations are real defects, which are misattributed, and what the tree actually contains.
> **Pragmatic:** The verified defect list phase 1 (canonical mission format) must be designed against.
> **Audience:** Oracle · Agents

---

## Audited state

- **Branch:** `ld-001-presentation` @ `ab3cba7`, which is `main` (`0f5d8b6` = `origin/main`) **plus 7 commits**, all belonging to LD-001 (SPDX headers and `license:` frontmatter changes). Verified by `git diff --stat main..HEAD`: the delta touches `license:` lines and adds SPDX headers/one guard script; **no mission status, assignee, title, or path changes**. The audit therefore holds for both the working tree and, on every mission-state claim, for `main` as the cold agents saw it.
- **Method:** direct inspection plus a cross-surface comparison script (frontmatter of all 81 mission files × `missions-index.json` × `missions/queue/INDEX.md` tables). Line numbers cite the working tree.
- **Mode respected:** no file outside `reports/audits/` was created or modified; no fix applied.

## Verdict summary

| Finding | Verdict |
|---|---|
| F-1 Three competing surfaces | **CONFIRMED** (there are four, plus a fifth derived one) |
| F-2 State taxonomy disagreement | **CONFIRMED** (with one correction to the premise) |
| F-3 P-001 has two paths | **CONFIRMED** |
| F-4 Identifier collisions | **PARTIAL** (both collision classes confirmed; two premise details refuted) |
| F-5 Language debt operationally active | **CONFIRMED** |
| F-6 No selection rule / line order as de facto priority | **CONFIRMED** (the absence is verified) |

---

## F-1 — Three competing surfaces for mission state — CONFIRMED

There are **four** independent surfaces, none authoritative, plus a derived fifth:

1. **Directory + frontmatter** (`missions/{queue,active,review,done}/*.md`) — 81 files: queue 60, active 5, review 5, done 11. `missions/freeze/` does **not** exist although `README.md:57` and P-003 both promise it.
2. **`missions-index.json`** — 64 entries, field `generated: "2026-04-08T12:52:36Z"` (root of the file). **No generator exists in the tree**: `scripts/` contains only `add-context-cards.py`, `check-license-frontmatter.mjs`, `normalize-standards.py`; there is **no `.github/` directory at all**, hence no CI. Git history shows it is edited **by hand** (`git log --follow missions-index.json`: "chore: update missions-index — MIS-011,038 → in-review", "fix(missions): normalize mission IDs in index", …). The mission brief's own link section calls it "generated artifact, do not edit by hand" — the tree contradicts this: it is a hand-maintained file wearing a `generated` stamp. Consumed at build by `web/` (`CLAUDE.md:21`, `blueprints/BP-cao-architecture.md:123,192`).
3. **`missions/queue/INDEX.md`** — hand-maintained (author `nimrod`, footer "migrado desde pablofm.com/misiones — 2026-04-07"), 55 mission rows. Internally inconsistent with itself: frontmatter declares `total_missions: 54 · done: 4 · active: 2` (lines 11–14) while its own body lists **3** missions under "⚡ En curso" (lines 44–46). It has no section for `review/` at all, and knows nothing of MIS-057, MIS-058, MIS-062, MIS-063, MIS-064, MIS-065.
4. **`CHANGELOG.md`** — `[Unreleased]` is **empty** (line 15 is immediately followed by `## [0.5.0]` at line 17) while `missions/active/` holds 5 in-progress missions and the newest tree content (MIS-062…065, the LD-001 work) appears nowhere. Agent A's conclusion "no pending work" is exactly what this surface teaches. **Sub-claim F-1.4 CONFIRMED.**
5. *(Derived)* `web/dist/missions/*` — a built snapshot of surface 2 committed into the tree.

### Cross-surface mismatches (status and assignee)

Every row is a real contradiction between at least two surfaces:

| ID | INDEX.md says | JSON says | Disk says (dir + frontmatter) |
|---|---|---|---|
| MIS-011 | 🔴 Backlog — Críticas | done | `done/MIS-011-technical-audit-numengames.md`, `status: done` |
| MIS-027 | 🔴 Backlog — Críticas | todo, `assignedTo: "null"` | **three files**: `queue/MIS-027-mejora-numengames-web.md` (backlog), `queue/MIS-027-numengames-web-improvement.md` (todo), `review/MIS-027-numengames-improvement.md` (in-review, `assigned_to: nimrod`) |
| MIS-038 | 🔴 Backlog — Críticas | in-review | **two files, same id**: `review/MIS-038-design-briefing-protocol.md` (in-review) **and** `done/MIS-038-design-briefing-protocol.md` (done) |
| MIS-039 | 🟠 Backlog — Alta | in-review, `assignedTo: nimrod` | `queue/MIS-039-sistema-logs-agentes.md` (backlog, unassigned) **and** `review/MIS-039-agent-log-system.md` (in-review) |
| MIS-042 | 🟠 Backlog — Alta | done | `done/MIS-042-readme-numinia-agents.md` |
| MIS-045 | 🟠 Backlog — Alta | in-review | `review/MIS-045-document-cao-architecture.md` |
| MIS-047 | 🟠 Backlog — Alta | done | `done/MIS-047-weekly-report.md` |
| MIS-062 | absent | **todo**, title "Update P-003 Mission Cycle Protocol to v2" | `active/MIS-062-mission-system-v2.md`, `status: in-progress`, title "Mission System v2 — States, Sub-missions, IDs, Kanban" — status **and** title disagree with JSON |
| MIS-058 | absent | in-progress ("Approval Brief Protocol") | `active/MIS-058.md` (in-progress) — but see F-4: `queue/MIS-00058` is a *different* mission on the same number |
| MIS-064, MIS-065 | absent | MIS-064 in-review; MIS-065 absent | `review/MIS-064-update-p001-agent-briefing.md`; `queue/MIS-065-…` (`status: draft` — a value no surface defines) |
| MIS-017, MIS-031, MIS-044 | Backlog | `assignedTo: procurador-01` | ES files unassigned (`assigned_to` absent/null) |
| MIS-048 | 🔴 Críticas | todo, `assignedTo: nimrod` | both files unassigned |
| MIS-057, MIS-063, MIS-00059 | absent from "✅ Completadas" (which lists only 4) | done (057/063/059 present) | `done/` holds 11 files |

Counts per surface: **81 files · 64 JSON entries · 55 INDEX rows · 0 CHANGELOG entries.** Note `queue/MIS-065-canon-at-build-narrative-out-of-code.md:103` already names the 64-vs-tree desync as a known defect.

---

## F-2 — State taxonomy disagreement — CONFIRMED (premise corrected)

**Correction to the premise:** `README.md` does not describe *states* as `queue/active/review/done/freeze`; those are the **directory names** in its structure diagram (`README.md:53–57`, which also promises the nonexistent `freeze/`). The README states the status vocabulary separately at `README.md:88`: `todo → in-progress → in-review → done` (also `freeze`, `cancelled`). `protocols/P-003-ciclo-mision-v1.md:25–46` defines the same canonical mapping (folder ↔ status).

**What the tree actually stores** (frontmatter `status:` values):

| Surface | Vocabulary found |
|---|---|
| `queue/` files | `backlog` ×47 · `todo` ×12 · `draft` ×1 (MIS-065) |
| `active/` files | `en-curso` ×3 **and** `in-progress` ×3 — the same three files (MIS-052, 054, 055) each carry **two `status:` keys in one frontmatter block** (`en-curso` first, `"in-progress"` later); which one a parser sees is parser-dependent. MIS-058/062 carry a single `in-progress` |
| `review/` files | `in-review` ×5 |
| `done/` files | `done` ×11 |
| `missions-index.json` | `backlog` ×33 · `todo` ×13 · `done` ×10 · `in-progress` ×4 · `in-review` ×4 |
| `GOVERNANCE.md` | funds table names `missions/active/`, `missions/done/`, **`missions/backlog/`** (line 38) — a directory that does not exist; `queue/`, `review/`, `freeze/` unnamed |

**`todo` vs `backlog`:** they are **two generations of the same backlog**, not two statuses. The Spanish-era originals (internal ids `MIS-00NNN`, see F-4) carry `status: backlog`; their English re-writes (ids `MIS-NNN`) carry `status: todo`. Where a mission has both files, both live in `queue/` side by side. `backlog` appears in **no** documented taxonomy (README, P-003) — only in GOVERNANCE's fund path and rule G-08 ("missions in backlog", line 57). Agent C's report was accurate: both vocabularies are simultaneously true inside `missions/queue/`.

---

## F-3 — P-001 has two paths — CONFIRMED

**Both files exist on disk:**

- `protocols/P-001-agent-briefing.md` — English, `id: "P-001"`, `version: "0.2.0"`, `status: active`
- `protocols/P-001-briefing-agente-v1.md` — same `id: "P-001"`, `version: "1.1.0"`, `status: active`

Neither carries `superseded` status; both claim to be the active P-001, and the *English* one has the *lower* version number. `missions/review/MIS-064-update-p001-agent-briefing.md` ("Update P-001 — Agent Briefing Protocol v2", in-review) is the visible origin of the English file.

**All referrers found** (repo-wide grep for `P-001`):

| Referrer | Points to |
|---|---|
| `README.md:72` | `protocols/P-001-agent-briefing.md` (English path) |
| `CONTRIBUTING.md:39` | `protocols/P-001-briefing-agente-v1.md` (Spanish path) — in the sentence "Read … before starting any work session" |
| `README.md:59`, `protocols/P-006-session-close-v1.md:146`, `protocols/P-002-onboarding-agente-v1.md:46`, `protocols/APPROVAL-REQUEST-template.md:146,157,179` | by ID only, no path |

So the two entry documents for a cold agent (README, CONTRIBUTING) each hand the mandatory startup protocol to a **different file**, and no marker in either file resolves the tie.

---

## F-4 — Identifier collisions — PARTIAL

### Premise details refuted

- **`GOVERNANCE.md` cites no ADR/DEC numbers at all.** The ADR+DEC citations live in `decisions/INDEX.md:31–38` and `CHANGELOG.md:50,91`. The observation was real but misattributed.
- **`ADR-006` appears nowhere in the tree** (repo-wide grep: zero hits). **`MISSION-005` / a "data dignity" brief appears nowhere in the tree** either — the `MISSION-` prefix does not exist in this repository. Both artifacts circulate outside the repo; within the tree they are unverifiable.

### Prefix series — confirmed as two coexisting series under one label

`decisions/` inventory (filename → internal `id:`; all match):

| File | id |
|---|---|
| `ADR-001-github-como-archivo.md` | ADR-001 |
| `ADR-002-formato-markdown.md` | ADR-002 |
| `DEC-001-self-hosting-sobre-saas.md` … `DEC-005-pablofm-portal-publico-cao.md` | DEC-001…DEC-005 |
| `DEC-006-english-official-repo-language.md` | DEC-006 |

They are **two independent numbering series of distinct documents** (ADR-001 ≠ DEC-001), yet `decisions/INDEX.md:22` introduces all of them as "Architectural Decision Records (ADR)", and its "How to create an ADR" section (line 42) instructs "Assign the next sequential number" without saying **in which series** — the collision-generating instruction itself.

### Number collisions — confirmed, two classes

**Class 1 — same number, two artifacts, distinguished only by zero-padding.** The Spanish-era corpus uses 5-digit internal ids (`MIS-00NNN`) behind 3-digit filenames; the English re-writes use 3-digit ids. 56 files have `id:` ≠ their filename number format. 15 numbers own more than one file:

- Same mission, two generations (ES `backlog` + EN `todo`, both in `queue/`): **001, 002, 003, 004, 005, 017, 018, 019, 031, 044, 048** — e.g. `MIS-005-landing-page-numinia.md` (`id: MIS-00005`) vs `MIS-005-numinia-landing-page.md` (`id: MIS-005`).
- Same mission, three files in three states: **027** (queue×2 + review).
- Same id in two lifecycle dirs at once: **038** (`review/` in-review **and** `done/` done, identical filename).
- Same mission, split surfaces: **039** (queue ES backlog + review EN in-review).
- **Genuine collision — two different missions on number 58:** `active/MIS-058.md` (`id: MIS-058`, "Approval Brief Protocol") vs `queue/MIS-00058-sistema-inspecciones.md` (`id: MIS-00058`, "Sistema de Inspecciones — ISO 15489"). Any consumer that normalizes zero-padding (as the JSON's "normalize mission IDs" commit did) conflates them: the JSON's `MIS-058 = in-progress` silently claims the inspecciones mission too.
- Contrast: number 59 is the *same* mission under two paddings (`done/MIS-00059-protocolo-carga-contexto.md` ↔ JSON `MIS-059`), proving normalization is sometimes correct and sometimes wrong — undecidable without reading both files.

Additionally, 20 files carry **both** `id:` and a second `mission_id:` key (e.g. `active/MIS-055…`: `id: "MIS-00055"` + `mission_id: "MIS-055"`), a third identity surface inside a single frontmatter.

### MIS-055 does not address this

`active/MIS-055-sistema-nomenclatura-dual.md` — despite the name "Dual Nomenclature System" — is about **per-organization narrative/gamification dials** (two 1–10 dials controlling vocabulary and game-mechanics intensity; origin Dark Council 2026-04-06). It contains nothing about identifier prefixes, padding, or collisions. The mission whose scope actually covers ids is `active/MIS-062-mission-system-v2.md` ("Mission System v2 — States, Sub-missions, IDs, Kanban").

---

## F-5 — Language debt is operationally active — CONFIRMED

`DEC-006` (English as repo language) stands; the tree carries, uncounted anywhere:

**Spanish titles** (frontmatter `title:`): **24** total — `queue/` 24/60, `active/` 0/5, `review/` 0/5, `done/` 0/11. Queue list: MIS-00058, 00001, 00002, 00004 (its EN twin 004 exists), 00006, 00008, 00010, 00013, 00015, 00017, 00021, 00024, 00025, 00026, 00030, 00031, 00032, 00034, 00035, 00036, 00039, 00040 — plus `MIS-004-monetization-model-v1.md` and `MIS-061` flagged by heuristic (mixed-language titles).

**Spanish filenames**: **45** total — `queue/` 38/60 · `active/` 2/5 (`MIS-054-acceso-multi-oraculo-telegram.md`, `MIS-055-sistema-nomenclatura-dual.md`) · `review/` 0/5 · `done/` 5/11 (`MIS-00059-protocolo-carga-contexto.md`, `MIS-016-nginx-ssl-servicios.md`, `MIS-037-crear-repositorio-archive-summa.md`, `MIS-053-khepri-email-operativo.md`, `MIS-057-qa-profundo-sistema.md`).

**Spanish frontmatter**: the field `tipo:` (with values like `"híbrido"`) appears in **55** files (queue 47, active 3, done 5); `status: en-curso` in 3 active files; `missions/queue/INDEX.md` is entirely Spanish (title "Backlog de Misiones — Índice Maestro", all section headers and area/guild columns).

Agent B's exclusion of the backlog and Agent C's Spanish quotes from `active/` are both consistent with what the tree contains. Two of the three currently in-progress flagship missions have Spanish filenames while their titles are English — the mixed signal is present at every level. **No translation was performed by this audit.**

---

## F-6 — No selection rule exists — CONFIRMED (absence verified)

Searched, in full text: `GOVERNANCE.md` (roles, funds table, rules G-01…G-10 — G-02/G-03 govern *execution exclusivity*, G-08 staleness, none govern *selection*), `CONTRIBUTING.md`, `protocols/P-003-ciclo-mision-v1.md` (defines states, transitions, and the ID-verification rule at lines 62 and 113 — nothing about choosing among eligible missions), `protocols/P-001-agent-briefing.md`, `protocols/P-001-briefing-agente-v1.md`, `protocols/P-009-mission-briefing.md` (mentions `priority` only as a template field, line 73). Grep terms covered both languages (select/elegir/prioridad/orden/tiebreak/desempate/next mission/siguiente misión).

**No document states how an agent selects the next mission from among eligible ones.** The only ranking signals anywhere are the INDEX.md section bands (Críticas/Alta/Media) and the JSON `priority` field — neither carries an ordering rule *within* a band, and the two disagree about which band several missions are in (see F-1 table). Agent C's fallback to file-line order was the only deterministic reading available. If such a rule existed, its natural home per the tree's own structure would be P-003 (the mission cycle protocol, which owns every other lifecycle rule) — stated here as an answer to the brief's question, not as a proposal.

---

## Unsolicited findings

1. **README's protocol table is broken for 7 of 8 links.** `README.md:72–79` links `P-002-agent-onboarding.md`, `P-003-mission-cycle.md`, `P-004-inter-agent-comms.md`, `P-005-escalation.md`, `P-006-session-close.md`, `P-007-context-load.md`, `P-008-approval-brief.md` — none exist; the real files are the Spanish-named `P-002-onboarding-agente-v1.md` … `P-008-approval-brief-v1.md`. Only the P-001 link resolves. `P-009-mission-briefing.md` exists but is absent from the table (README says "P-001 to P-008", line 59).
2. **`missions/freeze/` does not exist** though README (line 57), P-003 (state table) and the web loader (`CLAUDE.md:21`) all treat it as real.
3. **`missions-index.json` data quality:** `assignedTo` uses three different empty values — `""` (33), the *string* `"null"` (8), and real names (nimrod 20, procurador-01 3).
4. **The INDEX.md self-count is wrong on its own terms:** frontmatter `active: 2` vs 3 listed rows; `done: 4` vs 11 files in `done/`; `total_missions: 54` vs 55 rows vs 81 files vs 64 JSON entries.
5. **`status: draft` (MIS-065) and `status: active` (index documents) are further undocumented status values** beyond the F-2 set.
6. **CHANGELOG.md:41–42 references `missions/backlog/MIS-056` and `missions/backlog/MIS-060`** — paths that do not exist (both files live in `missions/queue/`), confirming GOVERNANCE is not the only document still speaking the pre-rename directory language.
7. **`GOVERNANCE.md:23` grants the `system` role "restricted write to reports/ only" for CI/CD** — but no CI exists (no `.github/`), so nothing exercises the only automation the governance anticipates.

## Learning outcome

The repository's surfaces disagree because every migration (Spanish→English, pablofm.com→repo, v1→v2 mission system) **added a surface instead of replacing one**, and nothing mechanical (no CI, no generator in-tree) forces any two surfaces to agree. The cold agents did not misread the repository; they each read a different, internally coherent layer of it. Phase 1 should design one authoritative surface and derive the rest — but that decision is the Oracle's.

---

*Audit executed read-only. The tree is byte-identical to its pre-audit state except for this file.*
