---
id: "AUD-2026-04-07"
title: "System audit — 16 web vs repo divergences"
type: report
subtype: audit
status: published
version: "1.0.0"
created: "2026-04-07T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
author: "nimrod"
tags: [audit, transparency, divergences, web, repo]
license: "CC-BY-4.0"
extraction_note: "Extracted verbatim from web/src/pages/auditoria.astro (MIS-071 phase 1 — audits/auditoria merge). Supersedes and extends blueprints/AUDIT-2026-04-07-web-vs-repo.md. Content was preserved in its original Spanish at extraction; translated to English under MIS-116 (ADR-024) — language only, facts untouched."
---

# System audit

> **Summary:** Divergences between **pablofm.com** and the **numinia-nwos** repository. We are not ashamed of the gaps — we study them and resolve them.
> **Audience:** Radical transparency — public (Numen Games · NWOS · Transparency).

**Audit:** 2026-04-07 · Alquimista-01 + Exégeta-01 + Nimrod

| Metric | Value |
|--------|-------|
| Coherence score | **8.8/10** |
| Critical | 5 |
| Important | 6 |
| Minor | 5 |

---

## ⚠ Root cause

### The source of truth is split

The repo is the declared source of truth of the NWOS. The web reads from hardcoded TypeScript files. As long as there is no GitHub API → web pipeline, divergence is inevitable and growing.

**Solution:** MIS-00040 (KPI Dashboard with GitHub API). Estimate: 1-2 sprints. Impact: resolves A-001, A-002, A-003, A-005 and prevents all future ones.

**Urgency:** critical

---

## 🔴 Critical — 5

*They affect truthfulness or continuity.*

### A-001 — CAO dashboard frozen at 2026-04-05

- **State:** open
- **Divergence:** The /cao dashboard data is hardcoded: 47 missions, ~$50, 10 PRs. Current reality is 57 missions, ~$100, ~40 PRs. There is no automatic update mechanism.
- **Impact:** Any outsider looking at /cao receives false information about the state of the system.
- **Fix:** Connect /cao to the repo's GitHub API to read data in real time. MIS-00040 (KPI Dashboard).

### A-002 — 3 missions missing on the web (MIS-00055, 056, 057)

- **State:** open
- **Divergence:** The repo has 57 missions. The web shows 54. MIS-00055 (Dual Nomenclature), MIS-00056 (i18n), MIS-00057 (deep QA) are not on the web.
- **Impact:** The most recent work is not publicly visible.
- **Fix:** Update misiones.ts with the 3 new missions. Short term: 1 PR.

### A-003 — RPT-2026-04-07 unpublished · RPT-2026-04-04 missing

- **State:** open
- **Divergence:** The April 7 report exists in the repo but not on the web. The April 4 report has a hole — it does not even appear in the listing.
- **Impact:** The public operations history has gaps.
- **Fix:** Publish RPT-2026-04-07 and verify/create RPT-2026-04-04.

### A-004 — The agent is named Nimrod, the web says Centinela-01

- **State:** open
- **Divergence:** On 2026-04-06 the agent was renamed Nimrod. The /cao still shows 'Centinela-01' as the official name.
- **Impact:** Identity incoherence — the agent has two names depending on where you look.
- **Fix:** Update the label in cao.astro. 5 minutes.

### A-005 — Web↔repo pipeline does not exist — everything is manual

- **State:** root of the problem
- **Divergence:** The web reads from hardcoded .ts files (misiones.ts, planos.ts, etc.), not from the repo in real time. Every time the repo grows, the web becomes stale automatically.
- **Impact:** Guaranteed structural divergence. The system cannot be coherent with manual synchronization.
- **Fix:** Implement the GitHub API as a real-time data source. MIS-00040. Estimate: 1 sprint.

---

## 🟡 Important — 6

*They affect completeness.*

### A-006 — ADR-001 and ADR-002 do not appear in /decisiones

- **State:** open
- **Divergence:** The repo has 7 decisions (ADR-001, ADR-002, DEC-00001 to DEC-00005). The web only shows the 5 DECs. The technical architecture decisions (GitHub as Archive Summa, Markdown as universal format) are not visible.
- **Fix:** Add ADR-001 and ADR-002 to the /decisiones page.

### A-007 — WARDLEY-MAP.md with no page in /planos

- **State:** open
- **Divergence:** The repo has 8 blueprints, including WARDLEY-MAP.md. The web /planos shows 7 blueprints. The Wardley lives at /wardley as a separate page, not integrated as the 8th blueprint.
- **Fix:** Add the Wardley Map to /planos or add a cross-reference.

### A-008 — Procyon on the web with no file in the repo

- **State:** open
- **Divergence:** The web /cao lists Procyon as '5th agent / CAO Coordinator'. The repo's agents/ has nimrod, adonaz, alquimista-01, exegeta-01, procurador-01 — Procyon does not exist as a file. It is credited with generating 54 missions.
- **Fix:** Create agents/procyon/ with a basic SOUL.md documenting its future role (2028).

### A-009 — Adonaz exists in the repo but not in /cao

- **State:** open
- **Divergence:** agents/adonaz/ has complete SOUL.md, OPERATOR.md and STATUS.md. However, the /cao dashboard does not show it as an active agent.
- **Fix:** Add Adonaz to the /cao dashboard.

### A-010 — Archive: the 8th fondo 'Governance' is missing

- **State:** open
- **Divergence:** STANDARDS.md, GOVERNANCE.md, CONTRIBUTING.md, APPROVAL-REQUEST-template.md and the future CHANGELOG.md are governance documents that fit none of the current 7 fondos. The Archive should have an 8th fondo.
- **Fix:** Create the 'Governance & Standards' fondo and update /archive from 7 to 8 fondos.

### A-011 — /continuidad score: 8.8/10, not 9.5/10

- **State:** acknowledged
- **Divergence:** The checklist marks '✅ 54 missions with full detail' — but the missions reside in the frontend's misiones.ts, not in the repo. It is a false positive. The .md missions exist in the repo but the web does not read them.
- **Fix:** Update the score and the checklist to reflect reality. This document.

---

## 🟢 Minor — 5

*Technical debt and documentation gaps.*

| ID | Title | Description | Fix |
|----|-------|-------------|-----|
| A-012 | STANDARDS.md, P-006 and guilds/roster with no web representation | Fundamental system documents created today that have no page on pablofm.com. | Create /standards or integrate into /nwos. Editorial decision pending. |
| A-013 | /simulaciones, /ventas, /gaps, /soluciones with no file in the repo | High-quality strategic analyses that exist on the web but are not in the Archive Summa. The knowledge is trapped in the frontend. | Create BP-simulaciones.md, BP-gaps-y-soluciones.md in blueprints/. The concrete solutions → missions in the backlog. |
| A-014 | 3 critical gaps from /gaps with no mission in the repo | 'Absence of external proof of value', 'The phantom buyer problem', 'Foundational bubble' — the 3 gaps with 10/10 urgency have no corresponding mission. | Create MIS-00058, MIS-00059, MIS-00060 in missions/backlog/. |
| A-015 | ES/EN policy not explicit in STANDARDS.md | STANDARDS.md §3 says 'ES for internal operations, EN for public docs' but does not cover the prefix IDs (MIS-, DEC-, BP- are EN even when the titles are ES). Ambiguity that will generate inconsistencies. | Add section §9 'Directory and prefix naming policy' to STANDARDS.md. |
| A-016 | 5 pending items from Diagram C with no mission in the repo | The /agente page lists 6 pending components (Vector DB, Event Bus, Mission State Machine, Knowledge Graph, Observability). None has a corresponding mission. | Create missions for at least the 3 most critical (Vector DB, Event Bus, Mission State Machine). |

---

## Coherence score — updated

**9.5/10** (previous score, overestimated) → **8.8/10** (real score, 2026-04-07)

The previous 9.5/10 score counted the missions as if they were in the repo. In reality, they reside in the frontend's `misiones.ts`. The individual .md files exist in the repo — but the web does not read them. The continuity claim was a false positive.

- ✅ Nimrod with SOUL + OPERATOR + STATUS + MEMORY in the repo
- ✅ 10 seminals in canon/ with knowledge graph
- ✅ 7 decisions in the repo (ADR-001/002 + DEC-00001/005)
- ✅ 6 days of historical reports
- ✅ 5 agents with SOUL.md in the repo
- ✅ STANDARDS.md v1.0.0 — ISO 8601, UUID v7, frameworks
- ❌ 54 missions in misiones.ts (web) → the repo does not serve them yet
- ❌ Daily memory persisted to git at close
- ❌ GitHub API → web pipeline (real-time source of truth)

---

## Next steps to reach 10/10

| Severity | Action | Priority |
|----------|--------|----------|
| 🔴 | Update the CAO dashboard (Nimrod, 57 missions, $100, 40 PRs) | This week |
| 🔴 | Publish RPT-2026-04-07 on the web | This week |
| 🔴 | Add MIS-00055, 056, 057 to misiones.ts | This week |
| 🟡 | Add ADR-001 and ADR-002 to /decisiones | This week |
| 🟡 | Create agents/procyon/ with a basic SOUL.md | This week |
| 🔴 | GitHub API as real-time data source (MIS-00040) | Next sprint |
| 🟢 | BP-simulaciones.md and BP-gaps-y-soluciones.md in the repo | Next sprint |
| 🟡 | Validate /idioma nomenclature → DEC-006 | Dark Council |

---

## Links from the original page

- Missions → `/missions`
- Continuidad → `/continuidad`
- Repository → https://github.com/numengames/numinia-nwos

---

*Metadata of the original page (`auditoria.astro`), translated: HTML title «System audit — NWOS · Numen Games» · description «Divergences between pablofm.com and the numinia-nwos repository. Radical transparency: we are not ashamed of the gaps, we study them and we resolve them.» · canonical route `/auditoria`.*
