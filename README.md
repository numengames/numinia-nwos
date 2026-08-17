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
├── missions/            # Mission system (P-003)
│   ├── queue/           # To Do
│   ├── active/          # In Progress
│   ├── review/          # In Review
│   ├── done/            # Completed (immutable)
│   └── freeze/          # Paused
├── missions-index.json  # Machine-readable mission index (consumed by pablofm.com)
├── protocols/           # Operational protocols (P-001 to P-008)
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
| [P-002](protocols/P-002-agent-onboarding.md) | New agent onboarding |
| [P-003](protocols/P-003-mission-cycle.md) | Mission lifecycle (create → execute → close) |
| [P-004](protocols/P-004-inter-agent-comms.md) | Inter-agent communication |
| [P-005](protocols/P-005-escalation.md) | Escalation to Oracle |
| [P-006](protocols/P-006-session-close.md) | Session close — mandatory |
| [P-007](protocols/P-007-context-load.md) | Context load self-monitoring |
| [P-008](protocols/P-008-approval-brief.md) | Approval request format |

---

## Mission System

Missions follow **P-003 v2.0.0**:

- **IDs:** `MIS-NNN` (3 digits) · sub-missions `MIS-NNN.N`
- **States:** `todo` → `in-progress` → `in-review` → `done` (also `freeze`, `cancelled`)
- **Types:** `biological` 🧬 · `digital` 🤖 · `hybrid` 🔀
- **Effort:** XS · S · M · L · XL

Live mission board: [pablofm.com/missions](https://pablofm.com/missions)

---

## Language

This repository is written in **English** (per [DEC-006](decisions/DEC-006-english-as-repo-language.md)). Agent sessions with Pablo may be conducted in Spanish.

---

## Guiding principle

> *"I do not let through what must not pass. I do not hold back what must flow."*
> — Nimrod, Guardian of the Gates

---

*Numen Games — Narrative Work OS · licensed per path — see [LICENSE](LICENSE)*
