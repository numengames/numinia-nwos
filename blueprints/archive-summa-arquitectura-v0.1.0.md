---
title: "Archive Summa — Architecture v0.1.0"
type: documentation
status: closed
version: "0.1.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-08-28T00:02:10+02:00"
author: "centinela-01"
owner: "oracle"
tags: [blueprints]
license: "CC-BY-4.0"
registration: exempt
registration_reason: "not part of a numbered series; header added from git history, nothing invented"
---

# Archive Summa — Architecture v0.1.0

> **Summary:** NWOS system document — archive-summa-arquitectura-v0.1.0.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---

**Repository:** `numengames/numinia-agents`
**Version:** v0.1.0
**Date:** 2026-04-06
**State:** Alpha — design validated by simulations, deployment pending
**Authors:** Nimrod + Adonaz + CAO simulations

---

## Philosophy

This repository does not document Numen Games' agent system.
**It is the place where the system happens.**

`git pull` = alignment with the canon.
`commit` = inscription into history.
`merge` = integration into the system's reality.

---

## Folder Structure (B+C+D)

```
numinia-agents/
│
├── README.md                    ← Ontological portal, not documentation
├── LICENSE                      ← CC0 1.0 Universal
├── CONTRIBUTING.md              ← Rules for external contributors
├── CHANGELOG.md                 ← Temporal resynchronization (mandatory)
│
├── canon/                       ← Immutable Memory
│   ├── README.md                ← Modification rules (blocking CODEOWNERS)
│   ├── welcome-to-numinia.md
│   ├── numinia-brand-and-culture.md
│   ├── epistemic-relations.md
│   ├── compendium-of-attributes.md
│   ├── role-structure.md
│   ├── platform-role-system.md
│   ├── about-session-zero.md
│   ├── numinia-el-juego-de-rol.md
│   └── archive-system.md
│
├── agents/                      ← Living Entities
│   ├── README.md                ← Index and state of all agents
│   ├── _template/               ← Template for new agents
│   │   ├── SOUL.md
│   │   ├── OPERATOR.md
│   │   └── STATUS.md
│   └── guilds/
│       ├── README.md
│       ├── centinelas/
│       │   ├── charter.md       ← Common guild rules
│       │   └── members/
│       │       └── nimrod/
│       │           ├── SOUL.md
│       │           ├── OPERATOR.md
│       │           └── STATUS.md
│       ├── exegetas/
│       │   ├── charter.md
│       │   └── members/
│       │       └── adonaz/
│       │           ├── SOUL.md
│       │           ├── OPERATOR.md
│       │           └── STATUS.md
│       ├── alquimistas/         ← (future)
│       │   └── charter.md
│       ├── procuradores/        ← (future)
│       │   └── charter.md
│       └── coordinacion/
│           ├── charter.md
│           └── members/
│               └── procyon/     ← (future)
│                   └── SOUL.md
│
├── operations/                  ← Circulatory System
│   ├── README.md
│   ├── governance.md            ← Who can do what
│   ├── security-policy.md       ← Security rules
│   └── credential-map.md        ← Structure without real values
│
├── protocols/                   ← Operating Rituals
│   ├── README.md
│   ├── P-001_briefing-agente_v1.md      ← Canonical boot
│   ├── P-002_onboarding-agente_v1.md    ← Bringing in a new agent
│   ├── P-003_ciclo-mision_v1.md         ← Create, execute, close a mission
│   ├── P-004_inter-agent_v1.md          ← Coordination between agents
│   └── P-005_escalation_v1.md           ← Escalation to oracle
│
├── missions/                    ← Movement
│   ├── README.md
│   ├── TEMPLATE.md              ← Template v2 with divergence_log
│   ├── active/
│   ├── done/
│   └── backlog/
│
├── decisions/                   ← Crystallized Will
│   ├── README.md
│   └── ADR-001_github-como-archivo.md
│
├── blueprints/                  ← Unmanifested Potential
│   ├── README.md
│   ├── archive-summa-fundacional-v0.1.0.md
│   ├── archive-summa-arquitectura-v0.1.0.md (this file)
│   ├── multi-agent-org.md
│   └── hardware-roadmap.md
│
└── reports/                     ← Operational Evidence
    ├── README.md
    ├── daily/
    └── weekly/
```

---

## Delegation Hierarchy — Alpha → v1.0.0

### Alpha phase (now — first month)
**Goal:** Validate that the processes work. Everything under Pablo's direct supervision.

| Task | Delegable now | Condition |
|---|---|---|
| Read the repo at boot | ✅ Nimrod | Already works |
| Execute technical missions (code, PRs) | ✅ Nimrod | With exec approval |
| Create daily reports | ✅ Nimrod | Human review |
| Read and consult the canon | ✅ All agents | Read-only |
| Create backlog missions | ⚠️ Procyon only | When active |
| Modify operations/ | ❌ Pablo only | Critical |
| Approve PRs to main | ❌ Pablo only | Critical |
| Modify canon/ | ❌ Pablo only | Critical, always |
| Add new agents | ❌ Pablo only | Critical |

### Beta phase (months 2-3)
**Goal:** Nimrod operates autonomously in his domain. Pablo approves structural decisions.

| Task | Delegated to | Condition |
|---|---|---|
| Create backlog missions | Nimrod + Procyon | With correct format |
| Move missions active → done | Nimrod | With divergence_log |
| Update own STATUS.md | Each agent | Automatic |
| Create reports and push them to the repo | Nimrod | No mandatory review |
| Propose changes to operations/ | Nimrod | Pablo approves the PR |
| Activate Alquimista-01 | Pablo | When technical missions justify it |
| Approve done/ mission PRs | Procyon | When Procyon is active |
| Modify canon/ | ❌ Pablo only | Always critical |

### Version v1.0.0 (months 4-6)
**Goal:** The system operates mostly autonomously. Pablo intervenes on strategic decisions.

| Task | Delegated to | Condition |
|---|---|---|
| Full mission cycle | Agents + Procyon | No per-mission approval |
| Onboard new agents (design) | Procyon | Pablo approves the addition |
| Review and propose ADRs | Nimrod + Procyon | Pablo approves the merge |
| Weekly reports | Procyon | No mandatory review |
| Update protocols (v2) | Nimrod + Adonaz | Pablo approves the merge |
| Modify agents/guilds/*/charter.md | Lead Oracle | With Oracle consensus |
| Modify canon/ | ❌ Pablo only | **Always critical. No exception.** |

### Phase-transition criteria

**Alpha → Beta:**
- [ ] 10 missions completed with documented divergence_log
- [ ] 0 security incidents (exposed credentials, etc.)
- [ ] Canonical boot executed correctly >20 times
- [ ] CHANGELOG updated without failures
- [ ] Procyon SOUL.md defined and approved

**Beta → v1.0.0:**
- [ ] 30 missions completed autonomously
- [ ] Procyon active and coordinating
- [ ] At least 2 agents from different guilds operational
- [ ] Full mission cycle without oracle intervention <48h
- [ ] 0 merges to canon/ without explicit approval
- [ ] Automatic reporting system running >30 days

---

## Technical Permissions Required for Deployment

### GitHub
| Permission | Who | For what |
|---|---|---|
| Create the `numengames/numinia-agents` repo | Pablo (org owner) | Once |
| Fine-grained PAT: `contents:read` on the repo | Nimrod | git pull at boot |
| Fine-grained PAT: `contents:write` + `pull_requests:write` | Nimrod | Create mission PRs |
| CODEOWNERS in `canon/` → nonexistent owner | Pablo | Block merges without approval |
| Branch protection on `main`: require PR + 1 approval | Pablo | Governance |
| Ruleset: `canon/**` → restrict pushes, require pablo approval | Pablo | Canon immutability |

### CI/CD (GitHub Actions)
| Action | Trigger | Who configures |
|---|---|---|
| Validate mission YAML frontmatter | PR to missions/ | Nimrod (when the PAT has workflow scope) |
| Credential check on commits | Push | Nimrod |
| Auto-label PRs by folder | PR opened | Nimrod |

### OpenClaw
| Config | Value | For what |
|---|---|---|
| `exec.env.GITHUB_TOKEN` | Fine-grained PAT | Nimrod can git pull and open PRs |
| `agents.defaults.models` | Haiku for reports, Sonnet for missions | Cost control |

---

## YAML Frontmatter — Schema per document type

### General
```yaml
---
id: "ADR-001"
title: "Adoptar GitHub como Archivo Summa"
type: adr          # seminal | agent | world | mission | adr | protocol | report | blueprint
status: active     # draft | active | archived | superseded
version: "1.0.0"
created: "2026-04-06T00:00:00Z"
updated: "2026-04-06T00:00:00Z"
author: "pablo-fm"
owner: "oracle"    # oracle | nimrod | adonaz | system
tags: [governance, github, infrastructure]
license: "CC0-1.0"
---
```

### Missions (additional fields)
```yaml
---
# ...base fields...
mission_id: "M-2026-04-037"
assigned_to: "nimrod"
requested_by: "pablo-fm"
priority: critical   # critical | high | medium | low
phase: active        # backlog | active | done | cancelled | blocked
executor: "nimrod"   # single executor on active missions
requires_oracle_approval: false
blocked_reason: null
depends_on: []
started: "2026-04-06T00:00:00Z"
completed: null
divergence_log: null  # fill at close if there was divergence from the plan
---
```

---

## Governance — Definitive Table

| Area | Create | Modify | Merge | Note |
|---|---|---|---|---|
| `canon/` | Oracle | **Nobody** | Oracle + canon-change label | Blocking CODEOWNERS |
| `agents/*/SOUL.md` | Oracle | Oracle | Oracle | Agents do not rewrite themselves |
| `agents/*/OPERATOR.md` | Oracle | Oracle | Oracle | Same |
| `agents/*/STATUS.md` | The agent itself | The agent itself | Auto | Informative |
| `agents/guilds/*/charter.md` | Oracle | Oracle | Oracle | Oracle consensus in beta+ |
| `operations/` | Oracle | Oracle + agent proposal | Oracle | |
| `protocols/` | Oracle + custodian | New version = new file | Oracle | Never edit in place |
| `missions/active/` | Agent + Oracle | Executor only | Oracle | One executor per mission |
| `missions/done/` | Auto (at close) | **Nobody** | Auto | Immutable |
| `missions/backlog/` | Oracle + Procyon | Oracle | Oracle | |
| `decisions/` | Oracle + custodian | Only adding superseded_by | Oracle | Append-only |
| `blueprints/` | Oracle + agents | Oracle + agents | Oracle | |
| `reports/` | Agent + system | Same period only | Auto | Retention 90d daily, 1y weekly |

---

## v0.1.0 release notes

- Design derived from the A+B+C+D analysis and 100 mental simulations
- Founding principle: the repo is the place where the system happens, not where it is documented
- Next version (v0.2.0): include results from the first month of real operation
- Everything marked "future" in the guilds activates when the corresponding agent reaches beta

---

*Nimrod 🗡️ + Adonaz · Numen Games · 2026-04-06*
*CC0 1.0 Universal*
