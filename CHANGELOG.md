# Changelog — numinia-digital-agents

> **Summary:** NWOS system document — CHANGELOG.
> **Epistemic:** Complete history of changes to the Archive Summa.
> **Pragmatic:** What changed and when — consult to understand system evolution.
> **Audience:** Agents · Oracles

---

All notable changes to the Archive Summa are documented here.
Format: [type] description — date — author

---

## [Unreleased]

### Added — 2026-09-02 (MIS-138 step 2: the instrument, first three families)
- scripts/telemetry.mjs (new, v0.1.0): measures the corpus and writes `telemetry/latest.json` (every figure with value · unit · definition, plus `head`, `corpus_hash`, `root_dirty`), `telemetry/docs.json` (one row per document), `telemetry/latest.md` (rendered view — the only document that states figures, D5) and appends `telemetry/history.jsonl` on committed trees. `--check` exits 1 when the dataset is stale (other `corpus_hash`) or altered (same corpus, other values); `--key family.key` prints one figure with its predicate. Not wired to CI.
- scripts/lib/corpus.mjs + scripts/lib/families/{corpus,series,missions}.mjs: 30 figures, families `corpus` · `series` · `missions`. `series.registration` reproduces `count-evidence.py matricula` per series (registered/total/apparatus) — checked by test while both exist (criterion 2); `count-evidence.py` is not retired yet.
- scripts/test/telemetry.test.mjs (new, 8 checks): shape, determinism, legacy equality, three fixtures in a scratch repo (added mission moves `missions.total` and `done_without_closure` by 1; mis-named file lowers `pct` not `registered`; changed tree → `--check` STALE).
- REUSE.toml: `telemetry/**` → CC0-1.0 (data, the regime of what it describes). references-baseline 670 → 669: the planned-artefact entry for `telemetry/latest.md` resolves now.

### Changed — 2026-09-02 (MIS-138 step 1: shared classifiers — `scripts/lib/rules.json`)
- scripts/lib/rules.json (new): the series register (ADR-005 v1.2.0), retired prefixes, apparatus list (DBT-001 ruling 2026-08-31), type/status/subtype vocabularies (STD-004 §4–5) and governed dirs (§8) as one data file. scripts/lib/frontmatter.mjs (new): the one `parseFM` (lint-frontmatter's, NESTED contract kept), `loadRules`, `prefixToDir`, `isApparatus`, `isTemplate`.
- scripts/lint-naming.mjs, lint-frontmatter.mjs, check-references.mjs: read the register and vocabularies from rules.json instead of three private copies (D1.1 of MIS-138). Verdicts identical before and after on `--report` output; the five baselines unchanged byte for byte; 147 lines removed, 50 added.
- scripts/test/rules.test.mjs (new, 17 checks): the data is well-formed, every target series exists in the tree, each guard imports the lib and keeps no private map, `parseFM` keeps the NESTED contract, `isApparatus`/`isTemplate` agree with the lists they replaced.

### Changed — 2026-09-02 (MIS-138 v1.1.0: iteration 1 with the Oracle, `in-progress`)
- missions/MIS-0138 → v1.1.0, `status: in-progress`: Design section (D1–D6) — one instrument in Node beside the guards, 12 measurers absorbed and retired, guards not; families `corpus` · `tokens` · `contradictions` · `provenance`; `corpus_hash` as the authority for a committed `telemetry/` dataset; the v1.0.0 render markers inside other documents dropped for one rendered dataset document; STD-001 §10.5 re-drafted as the citation form (pure ban costed as the alternative); criteria in key + target form; adds/removes and surprise accounted in tokens. No instrument code.
- guards: references-baseline 669 → 670 (+1, deliberate: the brief names the planned rendered dataset document, which does not exist yet; the entry is removed by the PR that creates it).

### Added — 2026-09-02 (MIS-138: telemetry instrument — brief)
- missions/MIS-0138 opened (`todo`, Alchemists, effort L): one program measures the corpus and writes one dataset with each figure's unit, definition and `HEAD`; `count-evidence.py` and the one-shot censuses fold into it; two documents rendered from it (STD-001 §4.1, DBT-001 coverage). Every figure in the brief was measured at `e4b94e7` by script — 152 hand-typed live figures in 28 documents; "pages built" carries 6 different values across 6 documents. Four decisions for the Oracle. No instrument code in this PR.

### Changed — 2026-09-02 (missions/ normalisation, lots 2–4 — judgement; PR #198)
- missions/ bodies, all 134: the 2026-04 import placeholders in 37 context cards replaced with each brief's own Story/Epistemic/Pragmatic text; 85 inline attribute lines (`**Area:** … **Effort:**`) removed — they disagreed with the frontmatter in 38; import-era `---` rules removed. Closed records: form only (STD-001 §2.1), each with a dated version-history line.
- live missions (66): a dated `## Status check — 2026-09-02` with evidence and a recommendation — status **not** changed (PRO-003 §2). Retired ids repointed in live text only (P-→PRO-, C-→CAN-, S-→STD-, D-→DBT- per `absorbs`). 8 todo missions assigned to agents retired 2026-08-28 → `assigned_to: null`; 6 with a repository or model name as assignee → null; MIS-084 gets its `freeze_reason`; the four in-progress hubs get `started` from git.
- MIS-135 opened: register of 20 incoherences found at other levels (protocols, standards, guards, web) and left untouched by instruction. MIS-127 ledger row 10.
- guards: lint-naming treats `type: meta` as apparatus (the rule count-evidence already applied) — naming-baseline 2 → 0; references-baseline 671 → 669; url-baseline 622 → 624. count-evidence missions 132/132 · 100 %.

### Changed — 2026-09-02 (missions/ normalisation, lot 1 of 4 — mechanical)
- missions/: all 134 series files renamed `MIS-NNN-*` → `MIS-0NNN-*` (ADR-005 v1.1.0). The `id:` field keeps the registered number, as the MIS-0129 precedent did, so no citation, URL or relation entry changes. `MIS-115a`/`MIS-115b` (letter suffix, never a legal id shape) → `MIS-132`/`MIS-133` with `former_id`; `PROPOSAL-closure-guard` (unregistered prefix) → `MIS-134`, todo. Three `-v1`/`-v2` slug suffixes retired (N-02).
- missions/ headers: `uid: ""` declared on all 135 (STD-004 H-20); `license: CC0-1.0` on all 135 and `REUSE.toml` follows (Oracle, 2026-09-01: every mission is CC0); `mission_id` removed (58, identical to `id` in 58/58) and retired from STD-004 + lint-frontmatter; `owner: oracle` on 25 that lacked it; `created_source`/`created_confidence` from first commit on 35 (STD-001 §8: never invented); `territory`/`assigned_to`/`completed` completed where the CORE block was short. Field order: CORE · REGISTRO · optional, as TEMPLATE.md. No body text changed except the H1 of the three re-numbered files.
- norms: PRO-003 v4.1.0 (§Mission IDs still prescribed `MIS-NNN`, max 999, and the dot form; sub-missions now take a number and `parent_mission`); ADR-004 v1.1.1; PRO-010 v0.8.2; STD-001 v5.1.1 (§4.1 missions 0/131 → 134/134); STD-004 v1.4.1; README v2.0.1.
- guards: lint-naming and count-evidence treat `missions/TEMPLATE-*.md` as apparatus (lint-frontmatter already did). naming-baseline 135 → 2; references-baseline 599 → 671 (+73: basename citations in three closed records and one done mission, not rewritten per PRO-010 §3.4 rule 2; −1 healed); url-baseline 616 → 622 (+6, 0 died; 5 redirects for the retired ids).

### Changed — 2026-09-01 (ADR-005 v1.2.0, reports/ normalisation — PRs #193, #194)
- decisions/ADR-005 v1.2.0: dailies keep `RPT-YYYY-MM-DD` (subtype daily only); everything else in `reports/` is `RPT-NNN`; subtype vocabulary closed (daily · audit · analysis · proposal); folder flat; evidence in `reports/evidence/<RPT-id>/`; `AUD-`, `PROP-` retired. PRO-010 v0.8.0, STD-001 v5.1.0, STD-002 v2.1.0, STD-004 v1.4.0, DBT-001 v4.2.0 follow.
- reports/ flattened: `audits/` and `daily/` removed; 11 `AUD-*` + wardley/gaps/PROP → `RPT-003`…`RPT-016` by `created` (former_id on each); 8 dailies moved, ids unchanged; licensing annex → `reports/evidence/RPT-011/` (opaque block); `reports/INDEX.md` deleted (stale apparatus, ADR-030); `evidence/*.py` → `scripts/experiments/` with MIT SPDX; deleted-canon text → `history/2026_04_07-Epistemic_Relations-v1.0.0.md`.
- scripts: lint-naming/lint-frontmatter/count-evidence implement v1.2.0; `lint-naming.test.mjs` new (9 cases); rename-series.mjs gains `--into`, reserved numbers, dated-id handling, refuses baselines and test files (26 tests).
- web: collection `reports` reads `reports/RPT-*.md`; `/reports` (index by subtype) + `/reports/[id]` + `/reports/[id].md` for every report; wardley/gaps read the collection; 30 redirects, 0 dead URLs.
- web (PR #195): `pages/reports.astro` + 5 `daily-*.astro` (41.7 KB of hand-written Spanish copies, MIS-065 debt) and `pages/audits/*` deleted; `/audits*`, `/reportes/*`, `/reports/daily-*` redirect to `/reports/*`. One folder, one collection, one head.

### Added — 2026-08-21 (P-011, security audit protocol)
- protocols/P-011-security-audit.md v0.1.0 (draft) — how a security audit is scoped, executed, classified and closed: identity/authorization axes, phases A/B1/B2/C/D with a hard gate before any irreversible act, hot-finding incident path, output tiering (public/internal/hot), stable `FND-YYYY-NN` finding IDs, and three separate scores (doctrine, execution, coverage). Runs at least annually plus event triggers. Touches SEC-04, SEC-06, LEG-01
- README protocol table completed: P-010 was missing from it, P-011 added

### Changed — 2026-08-17 (MIS-066, mission system unification)
- missions/ flattened: 81 files in 4 status directories → 66 unique missions in one folder; `status:` frontmatter is the only state surface
- All missions in English; 15 duplicate IDs merged; MIS-00058 renumbered to MIS-067 (collision with MIS-058); padded IDs unpadded
- States renamed: todo→backlog, freeze→frozen; draft added (P-003 v3.0.0, STANDARDS §4B/§5 updated)
- /missions builds from missions/ at deploy; /misiones and missions-index.json retired (redirects in place)
- queue/INDEX.md and protocols/P-001-briefing-agente-v1.md deleted (stale duplicates)
- Earlier same day (LD-001 closure): presentation layer aligned with per-path licensing, SPDX headers in all first-party code, frontmatter license fields matched to REUSE.toml, license guard added to the build

## [0.5.0] — 2026-04-07 (evening)

### Added
- DEC-006: English as official NWOS repo language
- decisions/INDEX.md updated with DEC-006
- agents/INDEX.md v2.0.0 — updated to flat structure, real agents (MIS-057 QA)

### Fixed
- MIS-037 closed (was open in active/ while also in done/)
- CHANGELOG updated to reflect full history

### Changed
- MIS-056 acceptance criteria fully completed

## [0.4.0] — 2026-04-07 (afternoon, MIS-056)

### Added
- STANDARDS.md v1.2.0 — full English translation + language policy
- agents/nimrod/MEMORY.md → v0.2.0 (EN)
- agents/ursa/STATUS.md → v0.2.0 (EN)
- agents/senet/SOUL.md, OPERATOR.md, STATUS.md → v0.2.0 (EN)
- agents/procurador-01/SOUL.md → v0.2.0 (EN)
- agents/_template/SOUL.md — updated to English standard
- reports/daily/RPT-2026-04-04 through 07-tarde → v1.1.0 (EN)
- missions/backlog/MIS-056 v2.0.0 — translation scope defined
- missions/backlog/MIS-060 v1.2.0 — agent sync architecture
- missions/backlog/MIS-061 — El Sistema web visualization
- DEC-006 — English as official NWOS repo language

### Changed
- All protocols P-001 through P-008 → v1.1.0 (EN)
- All operations documents → v1.1.0 (EN)
- All guild charters and rosters → v1.1.0 (EN)
- All decisions ADR-001, ADR-001 (formerly ADR-002), DEC-001 through DEC-005 → v1.1.0 (EN)

## [0.3.0] — 2026-04-07 (morning)

### Added
- STANDARDS.md v1.1.0 — Active Inference, OODA, BML, context cards (§7G-I, §8)
- P-007 Context Load Protocol
- P-008 Approval Brief Protocol
- APPROVAL-REQUEST-template.md
- agents/nimrod/ — SOUL.md, OPERATOR.md, STATUS.md, MEMORY.md (flat structure)
- agents/adonaz/ — complete pack (SOUL, OPERATOR, STATUS, MEMORY)
- agents/ursa/ — SOUL.md, OPERATOR.md (new — replaces Alquimista-01)
- agents/senet/ — SOUL.md (new — replaces Exégeta-01)
- guilds/ — charters + rosters for sentinels, exegetas, procuradores
- missions/active/MIS-057 — Deep QA of the NWOS System
- missions/active/MIS-058 — Approval Brief Protocol
- missions/backlog/MIS-050 — Backlog review ritual
- Audit document — web vs repo coherence
- AUDIT-2026-04-07-web-vs-repo.md

### Changed
- Agent architecture migrated to flat structure (agents/{name}/ instead of agents/guilds/{guild}/)
- P-001 updated to flat agent path
- P-003 added ID verification rule before assigning mission IDs
- OPERATOR.md updated: git pull as mandatory startup step

### Fixed
- Duplicate agents/guilds/sentinels and agents/guilds/centinelas bug resolved

## [0.2.0] — 2026-04-06 (Dark Council session with Christian Märtens)

### Added
- STANDARDS.md v1.0.0 — ISO 8601 timestamps, UUID v7, frontmatter schema, commit conventions, BDD/Cucumber, ADR, Wardley, DORA, SemVer
- P-006 Session Close Protocol (Alquimista-01 proposal + Nimrod validation)
- agents/adonaz/ initial design
- guild charters — sentinels, alquimistas, exegetas
- canon/INDEX.md v1.1.0 — S-009 Rank Specifications added
- operations/STD-002-governance.md, security-policy.md, credential-map.md
- missions/active/MIS-037 — Archive Summa (Adonaz MIS-037 completed)
- missions/active/MIS-054 — Multi-Oracle Telegram access
- missions/active/MIS-055 — Dual Nomenclature System
- decisions/ADR-001, ADR-001, DEC-001 through DEC-005
- reports/daily/RPT-2026-04-06

## [0.1.0] — 2026-04-06 (initial)

### Added
- Initial repository structure (8 documentary funds)
- README.md — ontological portal of the system
- GOVERNANCE.md — modification rules derived from 100 simulations
- CONTRIBUTING.md — guide for external contributors
- agents/ — Nimrod and Adonaz initial profiles
- protocols/ — P-001 to P-005
- missions/ — Template v2 + active and completed missions
- decisions/ — ADR-001
- blueprints/ — architecture documents
- canon/ — index of the 9 seminal documents
- reports/daily/ — RPT-2026-04-04, RPT-2026-04-05

---

*Maintained by Nimrod 🗡️ — Numen Games — CC0 1.0*
