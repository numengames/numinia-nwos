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
- operations/governance.md, security-policy.md, credential-map.md
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
