---
id: "MIS-061"
title: "El Sistema — NWOS Web Visualization at pablofm.com/sistema"
type: mission
status: frozen
freeze_reason: cancelled
version: "1.0.0"
created: "2026-04-07T18:00:00Z"
updated: "2026-08-17T00:00:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [web, nwos, visualization, ux, i18n, sistema, pablofm]
license: "CC-BY-4.0"
territory: "Product"
guild: "Alchemists"
type_execution: "digital"
priority: "high"
effort: "XL"
---
# MIS-061 — El Sistema — NWOS Web Visualization

> **Summary:** Build pablofm.com/sistema — a 10/10 UX/UI web interface that makes the NWOS repo navigable, beautiful, and understandable for humans. The web layer is the presentation face of the repo; the repo is the source of truth.
> **Epistemic:** What makes a system visualization truly excellent, and how NWOS concepts translate to web UX.
> **Pragmatic:** A deployed, live web at pablofm.com/sistema that syncs from the repo and serves as the primary human interface for NWOS discovery and adoption.
> **Audience:** Agents · Oracles · External teams considering NWOS adoption

---

**Area:** Product · **Guild:** Alquimistas · **Type:** 🔧 Technical · **Priority:** 🟠 High · **Effort:** XL · **Human Approval:** 8/10

---

## Origin

Decision taken 2026-04-07. The repo is the source of truth for NWOS — but repos are not human-friendly. The web is the interface that makes the system legible, beautiful, and adoptable.

This is not documentation. This is **the product face of NWOS**.

**Architecture decision:**
- Repo → source of truth (English, MIS-056)
- pablofm.com/sistema → presentation layer (with i18n)
- Translations live in the web layer, not in the repo

---

## Vision

El Sistema is the place where humans:
- Discover what NWOS is and how it works
- Navigate the living system (agents, missions, decisions, protocols)
- Learn from examples and patterns
- Consider adopting NWOS for their own organization

It must be **10/10 UX and UI** — the kind of interface that makes people say "I want this for my team."

---

## Core Features

### 1. Universal Search
Instant full-text search across all repo content: agents, missions, decisions, protocols, seminal documents. Think Algolia-level speed and relevance. The user types a concept and finds every place it appears in the system.

### 2. Knowledge Graph (3D)
Interactive Three.js visualization of how everything connects: agents → missions → decisions → protocols → seminal documents. Nodes are typed and colored. Edges show relationships. Click a node → see its detail. Filter by type, status, guild.

### 3. Live Mission Board
Kanban view of the real mission state: backlog / active / done. Auto-synced from the repo. Shows effort, priority, assignee, progress. Makes the system feel alive.

### 4. Agent Profiles
Rich cards for each agent: name, guild, branch, house, character, capabilities, active missions, metrics (PRs, missions completed, cost). Visual and scannable.

### 5. Reading Modes (Personas)
Three entry points for different readers:
- **I'm new** → guided tour of NWOS concepts
- **I'm an Oracle** → operational dashboard
- **I want to adopt NWOS** → adoption guide and onboarding path

### 6. Document Browser
Navigate all repo documents by type: protocols, decisions, missions, seminal documents. Each document rendered with proper formatting, metadata visible, relationships shown.

### 7. i18n Toggle
EN/ES from day one. Web layer owns translations — repo stays English. Language preference persists. Auto-detect from browser.

### 8. Live Sync with Repo
Content always current — no manual deploy needed when the repo updates. Options: GitHub webhooks, cron pull, or build pipeline trigger.

### 9. System Metrics Dashboard
Live KPIs of the NWOS instance:
- Active missions / completed / backlog
- Active agents
- Documents in the system
- Estimated velocity and cost

### 10. Adoption Path
For external organizations: "How would this work for my team?" → guided walkthrough of NWOS principles with examples from the live system.

---

## UX Principles

- **Zero learning curve** — first visit should be self-explanatory
- **Speed** — every interaction under 100ms perceived
- **Visual identity** — consistent with Numinia brand (dark, teal, elegant)
- **Mobile-first** — fully usable on phone
- **Accessible** — WCAG AA minimum
- **Delightful details** — micro-animations, hover states, transitions that feel intentional

---

## Technical Approach (proposed)

- **Framework:** Astro (already used in pablofm.com) with React islands for interactive components
- **3D Graph:** Three.js (already proven in pablofm.com/archive)
- **Search:** Fuse.js (local) or Algolia (if scale requires)
- **Data source:** GitHub API or local repo clone (auto-synced)
- **i18n:** Astro i18n with EN as default
- **Deployment:** Vercel (same as pablofm.com)
- **URL:** pablofm.com/sistema

---

## Acceptance Criteria

- [ ] pablofm.com/sistema live and accessible
- [ ] Universal search working across all repo content
- [ ] Knowledge graph showing agents, missions, decisions, protocols
- [ ] Live mission board (backlog / active / done)
- [ ] Agent profile pages (all active agents)
- [ ] Reading modes for 3 personas
- [ ] i18n EN/ES working
- [ ] Auto-sync with repo (max 15 min delay)
- [ ] System metrics dashboard
- [ ] Mobile-responsive
- [ ] Pablo UX/UI approval: 10/10
- [ ] Performance: Lighthouse score ≥ 90

---

## Phases

### Phase 1 — Foundation (MVP)
- Route /sistema with landing and navigation
- Document browser (all repo files, rendered)
- Basic search (Fuse.js)
- Agent profiles
- Mission board

### Phase 2 — Intelligence
- Knowledge graph (Three.js)
- Reading modes / personas
- i18n EN/ES

### Phase 3 — Live system
- Auto-sync with repo
- System metrics dashboard
- Adoption path for external orgs

---

## Epistemic Value

A system that can only be read in a GitHub repo is a system for developers. A system with a beautiful web interface is a system for everyone. This is the difference between a tool and a product.

## Pragmatic Value

- Primary channel for NWOS adoption by external organizations
- Reduces onboarding friction from "read 50 markdown files" to "explore an interface"
- Demonstrates NWOS in action — the system documents itself
- Part of the NWOS value proposition: the system is legible, navigable, alive

---

## Human Approval Required: 8/10

Significant product build. UX/UI decisions require Pablo review before development starts. Phase 1 requires explicit go-ahead.

---

*Nimrod 🗡️ — 2026-04-07*

---

## Closure (2026-08-17)

Closed as **cancelled — obsolete**, board triage ordered and approved by the Oracle (2026-08-17).

- **Reason:** The NWOS web visualization exists — it is numinia.org itself; pablofm.com/sistema is superseded.
- **Evidence:** numinia.org live, board built from the canonical repo (MIS-066).
- **Rule:** file preserved per P-003/SIM-2.7 and GOVERNANCE G-05 — closed, never deleted.

