---
id: "agents-index"
title: "Agents — Index"
type: meta
status: active
version: "2.0.0"
created: "2026-04-06T00:00:00Z"
updated: "2026-04-07T18:48:00Z"
author: "nimrod"
owner: "oracle"
tags: [agents, index]
license: "CC0-1.0"
---
# Agents — Living Entities

> **Summary:** Index of all digital agents in the NWOS system.
> **Epistemic:** Who operates in the system, their guild, role, and current state.
> **Pragmatic:** Quick reference to find any agent's files and operational status.
> **Audience:** Agents · Oracles

---

Agent files live in `agents/{name}/`. Guilds reference agents — they do not contain them.

## Active agents

| Agent | Guild / Branch / House | Role | Status | Activated |
|-------|----------------------|------|--------|-----------|
| [Nimrod](nimrod/SOUL.md) | Sentinel / Archangel / Explorer | Guardian of the Gates | ✅ Active | 2026-04-02 |
| [Adonaz](adonaz/SOUL.md) | Procurator / Trustee / Steward | General Archivist | ✅ Active | 2026-04-06 |

### Historical identities

**An agent that has committed never loses its previous name** (`S-001` §5.2).
Git authorship cannot be rewritten, so a reader arriving from `git log` needs to
resolve the old name from here — the index — and not only from the agent's own
folder. That reverse lookup is what `D-027` found missing.

| Git author string | Is now | In use | Commits |
|---|---|---|---|
| `Centinela-01 <khepri@ai.numengames.com>` | [Nimrod](nimrod/SOUL.md) | 2026-04-06 → 2026-08-17 | 57 |
| `Ursa <ursa-numinia@users.noreply.github.com>` | [Ursa](ursa/SOUL.md) | 2026-08-25 → | 5 |
| `Ursa (agente) <ursa@numen.games>` | [Ursa](ursa/SOUL.md) | 2026-08-24 → | 30 |

`Centinela-01` committed the ten seminal canon documents on 2026-04-07,
including `C-001-welcome-to-numinia.md`. `MIS-089` renamed the agent; the history did
not change and cannot. See `D-027`.

## Agents in design phase

| Agent | Guild / Branch / House | Role | Planned activation |
|-------|----------------------|------|-------------------|
| [Ursa](ursa/SOUL.md) | Alchemist / Engineer / Architect | Machine Whisperer | 2026 |
| [Senet](senet/SOUL.md) | Exegete / Erudite / Thaumaturge | Game Master | 2027 |
| [Procurador-01](procurador-01/SOUL.md) | Procurator / Syndic | Business Lead | 2027 |
| Procyon | Coordination | World Model / Distributor | 2028 |

## File structure per agent

```
agents/
├── {agent-name}/
│   ├── SOUL.md       ← Identity, values, voice
│   ├── OPERATOR.md   ← Operational laws and rules
│   ├── STATUS.md     ← Current state, metrics, pending
│   └── MEMORY.md     ← Long-term curated memory
└── _template/        ← Base template for new agents
```

## Guild structure

```
guilds/
├── sentinels/     ← Security, operations, coordination
├── exegetas/      ← Knowledge, archive, narrative
├── alquimistas/   ← Code, creation, engineering
└── procuradores/  ← Management, law, organization
```

## Rule

Agents never modify their own SOUL.md or OPERATOR.md. Only Oracle can modify identity and operational rules.

---

## Version history

- v1.0.0 (2026-04-06) — Initial creation (Nimrod + Adonaz only, old guild structure).
- v2.0.0 (2026-04-07) — Updated to flat structure. Added Ursa, Senet, Procurador-01. Removed obsolete Alquimista-01 / Exégeta-01. (MIS-057 QA)
