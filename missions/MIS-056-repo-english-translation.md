---
id: "MIS-056"
title: "Repo Translation to English — NWOS Canon in English Only"
type: mission
status: done
version: "2.1.0"
created: "2026-04-07T18:07:56Z"
created_source: "git:ce4aad1"
created_confidence: inferred
updated: "2026-08-17T15:02:30Z"
author: "pablo-fm"
owner: "oracle"
tags: [documentation, i18n, english, nwos, repo]
license: "CC-BY-4.0"
area: "Documentation"
guild: "Exegetes"
type_execution: "híbrido"
priority: "high"
effort: "L"
completed: "2026-08-17"
---
# MIS-056 — Repo Translation to English

> **Summary:** Translate the entire numinia-digital-agents repo to English. English becomes the sole language of the canonical repo going forward.
> **Epistemic:** Why and how the repo transitions to English-only.
> **Pragmatic:** Full translation scope, criteria, and execution plan.
> **Audience:** Agents · Oracles

---

**Area:** Documentation · **Guild:** Exegetas · **Type:** 🔀 Hybrid · **Priority:** 🟠 High · **Effort:** L

---

## Origin

Decision taken 2026-04-07. The repo is the technical source of truth and must be fully accessible to any English-speaking team, contributor, or organization that wants to adopt NWOS.

**Key architectural decision:**
- **Repo** = source of truth in English only (no bilingual duplication)
- **Web (pablofm.com/sistema, MIS-061)** = presentation layer with i18n — translations live there, not in the repo

This eliminates repo bloat from duplicate files and keeps the canon clean.

---

## Story

As an organization building in public and targeting international adoption, we want the entire NWOS repo to be in English, so that any team in the world can read, understand, and adopt the system without language barriers.

---

## Scope

### What gets translated
- All `.md` files in the repo (content + frontmatter titles/descriptions)
- File and folder names currently in Spanish (e.g. `misiones/` → already `missions/`, verify all)
- SOUL.md files of each agent — translate fully, preserving voice and character
- OPERATOR.md files of each agent
- STATUS.md files of each agent
- All protocols (P-001 through P-008+)
- All mission files (backlog, active, done)
- All decisions
- README.md (likely already in EN — verify)
- Seminal documents in `canon/` (read-only source — translate without modifying originals)

### What does NOT change
- Spanish phrases that are intentional stylistic/character choices in SOUL.md (e.g. Nimrod's "No dejo pasar lo que no debe pasar") — flag for Pablo decision
- Agent names and proper nouns (Numinia, Nimrod, Procyon, etc.)
- Code, scripts, commands

### Language standard from now on
- All new documents in the repo: English
- All new missions: English
- All new protocols: English
- Agents communicate internally in the language their Oracle prefers — but repo artifacts are English

---

## Acceptance Criteria

- [x] All `.md` files in `agents/` translated to English
- [x] All `.md` files in `missions/` translated to English (backlog + active + done)
- [x] All `.md` files in `protocols/` translated to English
- [x] All `.md` files in `decisions/` translated to English
- [x] All `.md` files in `operations/` translated to English
- [x] README.md verified and updated in English
- [x] STANDARDS.md, GOVERNANCE.md, CONTRIBUTING.md, CHANGELOG.md translated
- [x] `blueprints/` translated to English (folder is empty — no files)
- [x] `reports/` translated to English (RPT-2026-04-04 through 07-tarde → v1.1.0)
- [x] Spanish stylistic phrases in SOUL.md files: preserved as character artifacts (DEC-006)
- [x] DEC-006 created: "English as the official language of the NWOS repo"

---

## Execution Plan

### Phase 1 — High priority (agents + protocols)
1. Translate `agents/nimrod/` — all files
2. Translate `agents/adonaz/` — all files
3. Translate `agents/ursa/` — all files
4. Translate `protocols/` — P-001 through P-008+
5. Translate `operations/` — security policy, credential map

### Phase 2 — Missions
6. Translate active missions (6 files)
7. Translate backlog missions (priority order: MIS-001 → MIS-060)
8. Translate done missions

### Phase 3 — Canon and decisions
9. Translate `decisions/`
10. Verify `canon/` — seminal documents (may already have EN versions)
11. Final audit: any Spanish-language file remaining?

---

## Epistemic Value

The language of documentation defines who can contribute to a system. English-only repo removes the barrier for international teams, investors, and contributors to engage with NWOS directly.

## Pragmatic Value

- International adoption without friction
- Investors, partners, and clients can read the system directly
- Consistent with CC0 — building in the open means building for everyone
- Web layer (MIS-061) handles multilingual presentation — repo stays clean

---

*Nimrod 🗡️ — 2026-04-07 — v2.0.0 (replaces bilingual ES+EN scope)*

---

## Closure (2026-08-17)

Closed as **done — achieved by reality**, board triage ordered and approved by the Oracle (2026-08-17).

- **Reason:** The translation was executed in April and never closed; MIS-066 completed the corpus (all missions English, flat folder).
- **Evidence:** 26 files carry 'Translated to English (MIS-056)' in their version history; DEC-006; MIS-066 PR #5.
- **Rule:** file preserved per P-003/SIM-2.7 and GOVERNANCE G-05 — closed, never deleted.

