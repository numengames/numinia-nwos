---
id: "BLU-004"
uid: ""
title: "CAO Architecture — Complete System Reference"
type: blueprint
status: active
version: "0.1.0"
created: "2026-04-08T05:58:00Z"
updated: "2026-04-08T05:58:00Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, cao, architecture, agents, protocols, tools, system]
territory: "CAO"
license: "CC-BY-4.0"
mission: "MIS-045"
---
# BP — CAO Architecture

> **Summary:** Complete architectural reference of the Numen Games CAO — agents, repos, protocols, tools, and data flows.
> **Epistemic:** How the CAO works as a system: what each component does, how they connect, and where the boundaries are.
> **Pragmatic:** Use this document to onboard new agents, audit the system, or plan architecture changes.
> **Audience:** Agents · Oracles · External collaborators

---

## What is the CAO?

The **CAO (Centralized Autonomous Organization)** is the operational nervous system of Numen Games. It is the layer where digital agents execute work, maintain memory, follow protocols, and coordinate with biological agents (Oracles).

The CAO operates on a simple principle:
> **The repo is the source of truth. The chat is the interface. The agent is the executor.**

---

## System diagram

```
┌─────────────────────────────────────────────────────────┐
│                    ORACLES (biological)                  │
│              Pablo FM · Christian Märtens               │
│              + 3 more Oracles (max 4 active)            │
└─────────────┬───────────────────────┬───────────────────┘
              │ Telegram              │ Telegram / repo
              ▼                       ▼
┌─────────────────────┐   ┌─────────────────────────────┐
│   OpenClaw Gateway  │   │  numinia-digital-agents repo │
│   (main session)    │   │  (GitHub — canon source)     │
│                     │   │                             │
│  Nimrod (primary)   │◄──┤  agents/    protocols/      │
│  claude-sonnet-4-6  │   │  missions/  blueprints/     │
│                     │   │  decisions/ canon/          │
└─────────┬───────────┘   └─────────────────────────────┘
          │ spawns
          ▼
┌─────────────────────────────────────────────────────────┐
│              Sub-agents (ephemeral, isolated)           │
│  Adonaz · Ursa · Senet · Procurador-01 · ad-hoc        │
│  claude-haiku-3-5 (routine) / claude-sonnet-4-6 (complex)│
└─────────────────────────────────────────────────────────┘
          │ produces
          ▼
┌─────────────────────────────────────────────────────────┐
│                  OUTPUTS                                │
│  pablofm.com  ·  numen.games  ·  numinia.store         │
│  GitHub repos  ·  Telegram reports  ·  Cron jobs       │
└─────────────────────────────────────────────────────────┘
```

---

## Agents

### Active agents

| Agent | Guild / Branch | Model | Role | Session |
|-------|---------------|-------|------|---------|
| **Nimrod** | Sentinels / Archangel | claude-sonnet-4-6 | Guardian of the Gates — primary operations | Persistent (main) |
| **Adonaz** | Exegetes / Chronicler | claude-haiku-3-5 | General Archivist — QA, documentation review | Ephemeral sub-agent |

### Designed agents (pending activation)

| Agent | Guild / Branch | Target year | Role |
|-------|---------------|------------|------|
| **Ursa** | Alchemists / Engineer | 2026 | Machine Whisperer — infrastructure, code |
| **Senet** | Exegetes / Chronicler | 2027 | Game Master — Numinia RPG sessions |
| **Procurador-01** | Procurators / Syndic | 2027 | Business Lead — sales, BD, grants |
| **Procyon** | Coordination | 2028 | World Model / Distributor — coordinates all agents |

### Agent file structure

Each agent lives in `agents/{name}/` with:
```
agents/nimrod/
├── SOUL.md       ← Identity, values, voice, operational style
├── OPERATOR.md   ← Laws, protocols, escalation rules
├── STATUS.md     ← Current state, metrics, recent activity
└── MEMORY.md     ← Long-term curated memory
```

---

## Repositories

| Repo | Owner | Purpose | Tech |
|------|-------|---------|------|
| `numinia-digital-agents` | numengames org | Canon archive — agents, missions, protocols | Markdown + JSON |
| `pablofm-web` | PabloFMM | Pablo's public web + CAO dashboard | Astro 5 + React + Vercel |
| `numinia-digital-goods` | PabloFMM | Asset store + Numinia LAP | Next.js 16 + Vercel |
| `numinia-digital-goods-data` | PabloFMM | Asset data (JSON + binaries) | JSON + GitHub raw |
| `nwos-template` | numen-games-nwos-orgs | NWOS workspace template for clients | Markdown |

### Repo structure of the canon (`numinia-digital-agents`)

```
numinia-digital-agents/
├── agents/              ← Agent files (SOUL, OPERATOR, STATUS, MEMORY)
├── missions/
│   └── MIS-NNN-*.md     ← flat; status: frontmatter is the only state
│                          surface (MIS-066), board built from the folder
├── protocols/           ← P-001 through P-009+
├── blueprints/          ← System design documents
├── decisions/           ← ADRs and strategic decisions
├── canon/               ← Immutable seminal documents (10 docs)
├── operations/          ← Security policy, credential map
├── STANDARDS.md         ← All technical conventions
├── GOVERNANCE.md        ← Roles and permissions
├── CHANGELOG.md         ← Version history of the system
└── README.md            ← Entry point
```

---

## Protocols

| ID | Name | When to use |
|----|------|------------|
| **P-001** | Agent Briefing | Every session start — mandatory |
| **P-002** | Agent Onboarding | New agent joining the CAO |
| **P-003** | Mission Cycle | Create, execute, review, close missions |
| **P-004** | Inter-Agent Communication | Coordination between agents (repo is the channel) |
| **P-005** | Escalation | When blocked, uncertain, or decision exceeds authority |
| **P-006** | Session Close | Every session end — mandatory |
| **P-007** | Context Load | Self-monitor context (warn at ≥7/10) |
| **P-008** | Approval Brief | Compact format for Oracle approval requests |
| **P-009** | Mission Briefing | Before starting any mission — mission first, execution after |

### Protocol dependency chain

```
P-001 (start)
  └─► P-009 (briefing before mission)
        └─► P-003 (mission lifecycle)
              ├─► P-004 (if multi-agent)
              ├─► P-005 (if blocked)
              └─► P-008 (if approval needed)
  └─► P-007 (context monitor, throughout)
P-006 (end — always)
```

---

## Tools & integrations

| Tool | Purpose | Access |
|------|---------|--------|
| **OpenClaw** | Agent runtime — sessions, cron, messaging | Gateway |
| **Telegram** | Primary Oracle ↔ Agent interface | Bot (Nimrod) |
| **GitHub API** | Repo operations via Octokit | PAT (temp) → GitHub App (MIS-iteration-4) |
| **Anthropic API** | LLM inference (claude-sonnet + haiku) | API key in OpenClaw |
| **Vercel** | Web deployments (pablofm.com, numinia.store) | Connected to GitHub |
| **Cloudflare R2** | Asset CDN for numinia.store | API key in Vercel env |
| **Umami** | Analytics for pablofm.com | Self-hosted VPS port 3001 |
| **Cal.com** | Booking / contact for pablofm.com | Self-hosted VPS port 3002 |
| **Arweave + IPFS** | Permanent asset storage | Configured in numinia-digital-goods |
| **Stripe** | Payments for Season Pass (numinia.store) | API key in Vercel env |
| **Thirdweb** | Web3 auth + NFT minting (numinia.store) | API key in Vercel env |

---

## Data flows

### Mission lifecycle flow
```
Oracle (Telegram) → Nimrod reads P-009 → Mission registered in repo
→ status: in-progress → Agent executes
→ status: in-review → Oracle does QA
→ Oracle approves → status: done (file immutable)
→ push to main → numinia.org/missions rebuilds from missions/
```

### Daily report flow
```
Cron (06:00 Madrid) → Isolated sub-agent wakes
→ Reads MEMORY.md + recent memory files
→ Generates report .md in workspace/reports/
→ Delivers via Telegram to Pablo
```

### Weekly report flow
```
Cron (09:00 Monday Madrid) → Isolated sub-agent wakes
→ Reads last 7 days memory
→ Generates weekly .md report
→ Delivers via Telegram to Pablo
```

### NWOS client workspace flow (Phase 2)
```
CEO visits pablofm.com/velo → Fills DeployForm
→ POST /api/registro → Octokit creates repo from nwos-template
→ Files personalized with company name + email
→ (Iteration 2) Agent triggered to populate documentation
→ (Iteration 3) Static site generated from repo
→ CEO gets URL to browse their workspace
```

---

## Security model

| Principle | Implementation |
|-----------|---------------|
| **Law 0** | No harm — hardcoded in every OPERATOR.md |
| **Law 1** | No external action without Oracle OK |
| **Law 2** | Oracle instructions are law (unless Law 0) |
| **Law 3** | Only Oracle modifies config, logs, memory |
| **Credentials** | Never in chat, never in repo — SSH only |
| **Exec approvals** | All shell commands require explicit approval |
| **Canon immutability** | `canon/` folder is write-protected by policy |
| **Agent identity separation** | Each agent has own SOUL + OPERATOR — cannot modify own laws |

---

## Metrics & observability

### Current (v0.1.0)
- Mission count by status (frontmatter of missions/, rendered at numinia.org/missions)
- Daily + weekly reports (cron)
- Manual cost tracking (until MIS-048)

### Target
- Real API cost per agent per mission (MIS-048)
- DORA metrics for web repos (MIS-049)
- CAO dashboard KPIs (MIS-040)
- Agent log system (MIS-039)

---

## Open architecture questions

| Question | Owner | Priority |
|----------|-------|---------|
| Can Procyon activate agents without Oracle approval? | Oracle | High |
| Monthly cost ceiling for the CAO? | Oracle | High |
| When does Adonaz get a persistent session? | Oracle | Medium |
| NWOS license price point? | Oracle | High (blocks BLU-002) |
| Can citizens propose missions directly to agents? | Oracle | Low |

---

## Related documents

- [BP-cao.md](BP-cao.md) — CAO status and objectives
- [BLU-002-business-metrics.md](BLU-002-business-metrics.md) — KPI framework
- [governance.md](../standards/governance.md) — Roles and permissions
- [STANDARDS.md](../standards/STANDARDS.md) — Technical conventions (superseded 2026-08-30; see its map)
- [agents/INDEX.md](../agents/INDEX.md) — Agent registry

---

## Version history

| Version | Date | Change |
|---------|------|--------|
| 0.1.0 | 2026-04-08T05:58:00Z | Initial creation — MIS-045. Complete system reference. |

---

*Nimrod 🗡️ — Numen Games — CC0 1.0*
