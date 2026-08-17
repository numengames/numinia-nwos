---
id: "readme-main"
title: "numinia-digital-agents"
type: documentation
version: "1.0.0"
created: "2026-04-07T00:00:00Z"
updated: "2026-04-07T22:30:00Z"
author: "nimrod"
license: "CC-BY-4.0"
---

# numinia-digital-agents

> The canonical archive of the Numen Games Digital Agent Operations system (NWOS).

This repository is the **single source of truth** for all digital agents, missions, protocols, and operational decisions of [Numen Games](https://numengames.com).

---

## What is the NWOS?

The **Narrative Work OS** (NWOS) is the operational system of Numen Games — a framework that turns work into a meaningful narrative. Digital agents are first-class participants: they hold roles, execute missions, follow protocols, and accumulate institutional memory.

```
Numen Games (OS) → Functional Model → Numinia (Narrative)
```

---

## Active Agents

| Agent | Guild | Branch | Role | Status |
|-------|-------|--------|------|--------|
| [Nimrod](agents/nimrod/) | Sentinels | Archangel | Guardian of the Gates | ✅ Active |
| [Adonaz](agents/adonaz/) | Exegetes | Chronicler | General Archivist | ✅ Active |
| [Ursa](agents/ursa/) | Alchemists | Engineer | Machine Whisperer | 📐 Designed |
| [Senet](agents/senet/) | Exegetes | Chronicler | Game Master | 📐 Designed |
| Procurador-01 | Procurators | Syndic | Business Lead | 📐 Designed |
| Procyon | — | — | World Model / Coordinator | 📅 2028 |

---

## Repository Structure

```
numinia-digital-agents/
├── agents/              # Agent files (SOUL, OPERATOR, STATUS, MEMORY)
│   ├── INDEX.md         # Agent registry
│   ├── nimrod/
│   ├── adonaz/
│   └── ...
├── missions/            # Mission system (P-003) — flat; status in frontmatter
├── protocols/           # Operational protocols (P-001 to P-009)
├── operations/          # Security policy, credential map
├── blueprints/          # System design documents
├── decisions/           # Architectural Decision Records (ADR)
└── canon/               # Seminal philosophical documents
```

---

## Protocols

| Protocol | Purpose |
|----------|---------|
| [P-001](protocols/P-001-agent-briefing.md) | Session startup — mandatory for every agent |
| [P-002](protocols/P-002-onboarding-agente-v1.md) | New agent onboarding |
| [P-003](protocols/P-003-ciclo-mision-v1.md) | Mission lifecycle (create → execute → close) |
| [P-004](protocols/P-004-inter-agent-v1.md) | Inter-agent communication |
| [P-005](protocols/P-005-escalation-v1.md) | Escalation to Oracle |
| [P-006](protocols/P-006-session-close-v1.md) | Session close — mandatory |
| [P-007](protocols/P-007-context-load-v1.md) | Context load self-monitoring |
| [P-008](protocols/P-008-approval-brief-v1.md) | Approval request format |
| [P-009](protocols/P-009-mission-briefing.md) | Mission briefing format |

---

## Mission System

Missions follow **P-003 v3.0.0** (MIS-066):

- **One flat folder:** `missions/MIS-NNN-english-slug.md` — the `status:`
  frontmatter field is the only state surface
- **IDs:** `MIS-NNN` (3 digits, sequential) · sub-missions `MIS-NNN.N`
- **States:** `draft` → `backlog` → `in-progress` → `in-review` → `done`
  (also `frozen`, `cancelled`)
- **Types:** `biological` 🧬 · `digital` 🤖 · `hybrid` 🔀
- **Effort:** XS · S · M · L · XL

Live mission board: [numinia.org/missions](https://numinia.org/missions) — built from `missions/` on every deploy.

---

## Language

This repository is written in **English** (per [DEC-006](decisions/DEC-006-english-as-repo-language.md)). Agent sessions with Pablo may be conducted in Spanish.

---

## Guiding principle

> *"I do not let through what must not pass. I do not hold back what must flow."*
> — Nimrod, Guardian of the Gates

---

*Numen Games — Narrative Work OS · licensed per path — see [LICENSE](LICENSE)*
