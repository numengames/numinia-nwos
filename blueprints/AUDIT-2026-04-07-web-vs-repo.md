---
id: "AUDIT-2026-04-07"
title: "Audit — Web vs Repo Divergences"
type: report
subtype: audit
status: active
version: "1.0.0"
created: "2026-04-07T13:35:00Z"
updated: "2026-04-07T13:35:00Z"
author: "nimrod"
contributors: ["alquimista-01", "exegeta-01"]
owner: "oracle"
tags: [audit, coherence, web, repo, divergences]
scope: "pablofm.com vs numinia-digital-agents"
score: 8.8
score_prev: 9.5
license: "CC-BY-4.0"
---
# Audit — Web vs Repo Divergences

> **Summary:** Coherence audit between the system's sources of truth.
> **Epistemic:** Divergences between the web and the repo — what is not synchronized.
> **Pragmatic:** Prioritize fixes by severity (critical/important/minor).
> **Audience:** Oracles · External readers

---

**2026-04-07 · Alquimista-01 + Exégeta-01 + Nimrod**

---

## Executive summary

**Coherence score: 8.8/10** (corrected from 9.5/10 — false positive on missions)

16 divergences identified: 5 critical, 6 important, 5 minor.

**Root cause:** No web↔repo synchronization pipeline exists. The web reads from hardcoded `.ts` files, not from the repo in real time. Every divergence is a consequence of this.

---

## 🔴 CRITICAL (5)

### A-001 — CAO dashboard frozen at 2026-04-05
- **Web:** 47 missions, ~$50, 10 PRs
- **Reality:** 57 missions, ~$100, ~40 PRs
- **Fix:** GitHub API → /cao in real time. MIS-00040.

### A-002 — 3 missions missing on the web (MIS-00055, 056, 057)
- **Web:** 54 missions
- **Repo:** 57 missions
- **Fix:** Update misiones.ts.

### A-003 — RPT-2026-04-07 unpublished · RPT-2026-04-04 missing
- **Fix:** Publish RPT-2026-04-07. Verify/create RPT-2026-04-04.

### A-004 — Nimrod ≠ Centinela-01
- **Web /cao:** "Centinela-01"
- **Repo:** agent renamed to "nimrod" since 2026-04-06
- **Fix:** Update the label in cao.astro.

### A-005 — Web↔repo pipeline does not exist (root of everything)
- **Fix:** MIS-00040 (GitHub API as real-time data source). 1 sprint.

---

## 🟡 IMPORTANT (6)

### A-006 — ADR-001 and ADR-002 invisible in /decisiones
- Repo: 7 decisions. Web: 5 decisions (ADR-001 and ADR-002 missing).
- **Fix:** Add ADR-001 and ADR-002 to the /decisiones page.

### A-007 — WARDLEY-MAP.md with no page in /planos
- The repo has 8 blueprints. The web /planos shows 7.
- **Fix:** Integrate the Wardley into /planos or add a cross-reference.

### A-008 — Procyon on the web without a file in agents/
- The web /cao lists Procyon as the 5th agent. agents/procyon/ does not exist.
- **Fix:** Create agents/procyon/ with a basic SOUL.md (2028 role).

### A-009 — Adonaz in the repo but absent from /cao
- agents/adonaz/ complete. Does not appear on the dashboard.
- **Fix:** Add Adonaz to the /cao dashboard.

### A-010 — Archive: the 8th fondo "Governance" is missing
- STANDARDS.md, GOVERNANCE.md, CONTRIBUTING.md fit none of the current 7 fondos.
- **Fix:** Create the "Governance & Standards" fondo. Update /archive from 7 to 8 fondos.

### A-011 — /continuidad score: 8.8/10, not 9.5/10
- The "54 missions" reside in misiones.ts, not in the repo. False positive.
- **Fix:** Update the checklist and score in /continuidad.

---

## 🟢 MINOR (5)

### A-012 — STANDARDS.md, P-006, guilds/roster with no web representation
### A-013 — /simulaciones, /ventas, /gaps, /soluciones with no file in the repo
- They should be: BP-simulaciones.md, BP-gaps-y-soluciones.md in blueprints/
### A-014 — 3 critical gaps from /gaps with no mission in the repo
- "Absence of external proof of value", "Phantom buyer", "Foundational bubble"
- **Fix:** Create MIS-00058, MIS-00059, MIS-00060.
### A-015 — ES/EN policy not explicit in STANDARDS.md
- **Fix:** Add section §9 "Directory and prefix naming".
### A-016 — 5 pending items from Diagram C with no mission in the repo
- **Fix:** Create missions for Vector DB, Event Bus, Mission State Machine.

---

## Methodological note

Each audit is an independent document in the repo. It is not modified — it is superseded by a new audit that references the previous one. The audit history is the system's coherence trajectory.

**Next recommended audit:** After resolving A-001 to A-005 (1-2 weeks).

---

## Audit history

| ID | Date | Score | Divergences | Reference |
|----|------|-------|-------------|-----------|
| AUDIT-2026-04-07 | 2026-04-07 | 8.8/10 | 16 (5+6+5) | This document |

---

*Alquimista-01 + Exégeta-01 + Nimrod 🗡️ — 2026-04-07T13:35:00Z*
