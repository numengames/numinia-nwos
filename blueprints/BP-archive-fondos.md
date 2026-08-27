---
id: "BP-archive-fondos"
title: "The Archive's Fondos"
type: blueprint
status: active
version: "1.0.0"
created: "2026-08-17T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
author: "claude-fable-5"
owner: "oracle"
tags: [blueprint, archive, fondos, taxonomy]
area: "CAO / Archive"
license: "CC-BY-4.0"
extraction_note: "Extracted from web/src/pages/archive/[fondo].astro and archive/index.astro (MIS-065 phase C — File over App). Document paths corrected to the post-MIS-066 flat layout (agents flat, missions flat, P-001 English); 'Archive System' has no matching file in canon/ today — kept as declared, flagged for MIS-071. The per-fondo lore lines live separately in canon/archive-lore.md (reserved regime — one file, one regime). Translated to English under MIS-116 (ADR-024) — language only."
fondos:
  - id: canon
    titulo: "Canon"
    subtitulo: "Immutable Memory"
    icono: "📜"
    color: green
    descripcion: "The 9 foundational documents of Numinia. Immutable by policy and by technique. They are the ground everything else is built upon."
    governance: "Only Oracle can modify. Blocking CODEOWNERS. No exceptions."
    documentos:
      - { nombre: "Welcome to Numinia", desc: "Gateway into the world. Historical context and purpose of the system.", file: "canon/C-001-welcome-to-numinia.md" }
      - { nombre: "Numinia Brand & Culture", desc: "Visual, verbal and cultural identity of Numinia v0.1.2.", file: "canon/C-002-brand-and-culture.md" }
      - { nombre: "Epistemic Relations", desc: "The OS→Model→Narrative triad. Peirce + Jung applied to organizations.", file: "canon/2026_04_15-Epistemic_Relations_Between_Numen_Games_and_Numina-v0.2.0.md" }
      - { nombre: "Compendium of Attributes", desc: "Attribute system, ranks and the agent's character sheet.", file: "canon/C-003-attributes-and-ranks.md" }
      - { nombre: "Role Structure", desc: "Role theory: Basic Level (guilds) + Prototype (factions).", file: "canon/C-004-role-structure.md" }
      - { nombre: "Platform Role System", desc: "Ranks and permissions of the Digital Goods v2 platform.", file: "standards/S-003-platform-role-system.md" }
      - { nombre: "About Session Zero", desc: "4 introductory escape rooms, seals, Prism Cells.", file: "canon/C-006-session-zero.md" }
      - { nombre: "Numinia — The Role-Playing Game", desc: "Complete RPG manual in Spanish, v0.6.0. Lives in numinia-lore, not in this repo.", file: "numinia-lore:seminal/Numinia_Manual_del_juego_de_rol_v0_6_0.md" }
      - { nombre: "Archive System", desc: "Numinia's documentary archive system. How knowledge is organized.", file: "archive-system.md" }
  - id: agents
    titulo: "Agents"
    subtitulo: "Living Entities"
    icono: "🤖"
    color: teal
    descripcion: "The digital agents operating in the system. Organized by guild. Each with an identity (SOUL), rules (OPERATOR) and operational state (STATUS)."
    governance: "SOUL and OPERATOR are modified only by Oracle. STATUS is updated by the agent itself."
    documentos:
      - { nombre: "Nimrod — SOUL.md", desc: "Guardián de las Puertas. Centinela-01. Identity, voice, values, limits.", file: "agents/nimrod/SOUL.md" }
      - { nombre: "Nimrod — OPERATOR.md", desc: "Nimrod's 4 operational laws. What he can and cannot do.", file: "agents/nimrod/OPERATOR.md" }
      - { nombre: "Adonaz — SOUL.md", desc: "Archivista General. Exégeta. The custodian of Numinia's knowledge.", file: "agents/adonaz/SOUL.md" }
      - { nombre: "Charter — Centinelas", desc: "Common rules of the Centinelas guild. Security, watch, gates.", file: "guilds/centinelas/charter.md" }
      - { nombre: "Charter — Exégetas", desc: "Common rules of the Exégetas guild. Knowledge, archive, narrative.", file: "guilds/exegetas/charter.md" }
  - id: missions
    titulo: "Missions"
    subtitulo: "Movement"
    icono: "⚡"
    color: yellow
    descripcion: "Tasks with verifiable acceptance criteria. A mission is the system's minimum unit of work. When completed, it remains with its Real Execution documented."
    governance: "Only the executor edits their active mission. A done mission is immutable."
    documentos:
      - { nombre: "Mission Template v2", desc: "Standard template with divergence_log, executor, blocked_reason.", file: "missions/TEMPLATE.md" }
      - { nombre: "MIS-037 — Archive Summa", desc: "The mission that created this repository. Completed.", file: "missions/MIS-037-create-archive-summa-repo.md" }
      - { nombre: "MIS-051 — Gmail/Drive/Calendar", desc: "Google Workspace integration with the gog CLI. Completed.", file: "missions/MIS-051-gmail-calendar-drive-gog.md" }
      - { nombre: "MIS-054 — Multi-Oracle access", desc: "Oracle onboarding to Telegram with Nimrod. In progress.", file: "missions/MIS-054-multi-oracle-telegram-access.md" }
  - id: protocols
    titulo: "Protocols"
    subtitulo: "Operating Rituals"
    icono: "📋"
    color: blue
    descripcion: "The exact procedures for starting sessions, executing missions, coordinating between agents and escalating decisions. Never edited — versioned."
    governance: "New version = new file. Never edit in place. Oracle approves."
    documentos:
      - { nombre: "P-001 Agent Briefing", desc: "The canonical boot. The inviolable steps for starting any session.", file: "protocols/P-001-agent-briefing.md" }
      - { nombre: "P-002 Agent Onboarding v1", desc: "How to bring a new agent into the system without losing coherence.", file: "protocols/P-002-onboarding-agente-v1.md" }
      - { nombre: "P-003 Mission Cycle", desc: "Create, execute, document and close a mission correctly (v3: flat folder, state in frontmatter).", file: "protocols/P-003-ciclo-mision-v1.md" }
      - { nombre: "P-004 Inter-Agent v1", desc: "Coordination between agents without ambiguity or write conflicts.", file: "protocols/P-004-inter-agent-v1.md" }
      - { nombre: "P-005 Escalation v1", desc: "When and how to escalate to the coordinator or the Oracle.", file: "protocols/P-005-escalation-v1.md" }
  - id: decisions
    titulo: "Decisions"
    subtitulo: "Crystallized Will"
    icono: "🗿"
    color: purple
    descripcion: "The architectural decisions that are not revisited, only superseded. Every ADR exists because someone had to choose and did so explicitly. They are the permanent record of the why."
    governance: "Append-only. Never delete. Only 'superseded by ADR-XXX' may be added."
    documentos:
      - { nombre: "ADR-001 — GitHub as Archive", desc: "Why GitHub and not Notion, Confluence or another system?", file: "decisions/ADR-001-github-como-archivo.md" }
      - { nombre: "ADR-002 — Universal Markdown", desc: "Why .md and not PDF, Word or other formats?", file: "decisions/ADR-002-formato-markdown.md" }
  - id: blueprints
    titulo: "Blueprints"
    subtitulo: "Unmanifested Potential"
    icono: "🔮"
    color: indigo
    descripcion: "The designs and architectures being thought out. The Archive Summa itself began as a blueprint. The future lives here before becoming present."
    governance: "Oracle and agents may create. Oracle approves the merge."
    documentos:
      - { nombre: "Archive Summa — Architecture v0.1.0", desc: "Complete structure, governance, permissions and delegation hierarchy.", file: "blueprints/archive-summa-arquitectura-v0.1.0.md", descargable: true, downloadPath: "/corpus/blueprints/archive-summa-arquitectura-v010.md" }
      - { nombre: "Archive Summa — Foundational v0.1.0", desc: "100 simulations, 12 operating principles, canonical boot protocol.", file: "blueprints/archive-summa-fundacional-v0.1.0.md", descargable: true, downloadPath: "/corpus/blueprints/archive-summa-fundacional-v010.md" }
      - { nombre: "Prompt for AIs v0.1.0", desc: "Complete prompt for studying the Archive Summa with any external AI.", file: "blueprints/archive-summa-prompt-v0.1.0.md", descargable: true, downloadPath: "/corpus/blueprints/archive-summa-prompt-v010.md" }
  - id: operations
    titulo: "Operations"
    subtitulo: "Circulatory System"
    icono: "⚙️"
    color: orange
    descripcion: "The rules of who can do what, the credential maps and the security policies. It is the circulatory system keeping everything cohesive."
    governance: "Oracle modifies. Agents may propose via PR."
    documentos:
      - { nombre: "Governance", desc: "Complete table: who can create, modify, archive each document type.", file: "GOVERNANCE.md" }
      - { nombre: "Security Policy", desc: "The system's security rules. What never goes in the repo.", file: "operations/security-policy.md" }
      - { nombre: "Credential Map", desc: "Credential structure without real values. A map of where what lives.", file: "operations/credential-map.md" }
graph:
  nodes:
    - { id: canon, label: "canon/", subtitle: "Immutable Memory", color: "0x00ff88", x: 0, y: 2, z: 0 }
    - { id: agents, label: "agents/", subtitle: "Living Entities", color: "0x00d9c4", x: 2, y: 0.5, z: 1 }
    - { id: missions, label: "missions/", subtitle: "Movement", color: "0xffcc00", x: -2, y: 0.5, z: 1 }
    - { id: protocols, label: "protocols/", subtitle: "Operating Rituals", color: "0x4488ff", x: 0, y: 0.5, z: -2.5 }
    - { id: decisions, label: "decisions/", subtitle: "Crystallized Will", color: "0xaa44ff", x: 2, y: -1, z: -1 }
    - { id: blueprints, label: "blueprints/", subtitle: "Potential", color: "0x8844cc", x: -2, y: -1, z: -1 }
    - { id: operations, label: "operations/", subtitle: "Circulatory System", color: "0xff8800", x: 0, y: -2, z: 0.5 }
  edges:
    - [canon, agents]
    - [canon, missions]
    - [protocols, agents]
    - [protocols, missions]
    - [operations, agents]
    - [operations, missions]
    - [missions, decisions]
    - [missions, blueprints]
    - [agents, missions]
---
# BP — The Archive's Fondos

> **Summary:** The Archive's taxonomy: the seven documentary fondos,
> what each contains, who governs it, and how they relate to each
> other. The data in this frontmatter feeds the viewer's `/archive`
> pages — the archive is the source, the web the lens.
> **Epistemic:** How the system's memory is organized.
> **Pragmatic:** Canonical reference for the fondos and their relations.
> **Audience:** Agents · Oracles

---

## The seven fondos

| Fondo | Subtitle | Governance |
|---|---|---|
| `canon/` | Immutable Memory | Oracle only. Blocking CODEOWNERS. |
| `agents/` | Living Entities | SOUL/OPERATOR: Oracle. STATUS: the agent. |
| `missions/` | Movement | Only the executor edits their active mission. |
| `protocols/` | Operating Rituals | New version = new file. |
| `decisions/` | Crystallized Will | Append-only. Never delete. |
| `blueprints/` | Unmanifested Potential | Oracle approves the merge. |
| `operations/` | Circulatory System | Oracle modifies; agents propose. |

## Relations

```
            canon
           /     \
      agents ←→ missions ── decisions
        |      /   |
   protocols  /    blueprints
        |    /
    operations
```

The canon feeds agents and missions; the protocols ritualize both; the
operations sustain them; missions crystallize into decisions and are
born from blueprints. The exact positions and edges of the viewer's 3D
diagram live in the frontmatter (`graph:`).

## History

- v1.0.0 (2026-08-17) — Extraction from the viewer's components
  (MIS-065 phase C), with document paths corrected to the post-MIS-066
  flat layout. Each fondo's lore lives in `canon/archive-lore.md`
  (reserved regime).
