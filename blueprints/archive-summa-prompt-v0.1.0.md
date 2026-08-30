---
title: "Prompt — Archive Summa for analysis with other AIs"
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

# Prompt — Archive Summa for analysis with other AIs

> **Summary:** NWOS system document — archive-summa-prompt-v0.1.0.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---

**Version:** v0.1.0 · 2026-04-06
**Use:** Paste into any AI to obtain analysis, critiques or improvements

---

## FULL PROMPT

```
I am designing the GitHub repository that will be the canonical source of truth for the digital-agent system of Numen Games — a company building Numinia, an organizational operating system with narrative lore, guild-based roles and AI digital agents.

COMPANY CONTEXT:
- Numen Games operates a hybrid system: 4 human Oracles + AI digital agents
- The agents execute "missions" (tasks with verifiable acceptance criteria)
- The system has 4 guilds: Centinelas, Exegetas, Alquimistas, Procuradores
- There is a supreme coordinator (Procyon, future) coordinating all the agents
- Currently in Alpha phase — processes validated but under full human supervision

REPO PHILOSOPHY:
"This repository does not document the system. It is the place where the system happens."
- git pull = alignment with the canon
- commit = inscription into history
- merge = integration into the system's reality

CURRENT DESIGNED STRUCTURE (v0.1.0):

numinia-agents/
├── README.md               ← Ontological portal (not documentation)
├── LICENSE (CC0)
├── CONTRIBUTING.md
├── CHANGELOG.md            ← Temporal resynchronization for agents
├── canon/                  ← Immutable Memory (9 documents, blocking CODEOWNERS)
├── agents/
│   └── guilds/
│       ├── centinelas/charter.md + members/nimrod/{SOUL,OPERATOR,STATUS}.md
│       ├── exegetas/charter.md + members/adonaz/{SOUL,OPERATOR,STATUS}.md
│       ├── alquimistas/charter.md (future)
│       └── coordinacion/charter.md + members/procyon/ (future)
├── operations/             ← governance.md, security.md, credential-map.md
├── protocols/              ← briefing, onboarding, mission-cycle, inter-agent, escalation
├── missions/               ← active/, done/, backlog/ + TEMPLATE.md
├── decisions/              ← ADRs (append-only)
├── blueprints/             ← designs and architectures
└── reports/                ← daily/, weekly/

YAML FRONTMATTER in every .md:
- id, title, type, status, version, created, updated, author, owner, tags, license
- Missions add: mission_id, executor, phase, divergence_log, requires_oracle_approval

GOVERNANCE:
- canon/ → immutable, oracle only with the canon-change label
- agents/*/SOUL.md → oracle only (agents do not rewrite themselves)
- missions/active/ → oracle/procyon creates, only the executor edits
- missions/done/ → immutable once closed
- decisions/ → append-only, never delete

DELEGATION HIERARCHY:
- Alpha: everything under oracle supervision
- Beta: agents operate their domain, oracle approves structural changes
- v1.0.0: autonomous system, oracle intervenes on the strategic
- canon/ → oracle, always, no exception

REQUIRED TECHNICAL PERMISSIONS:
- Fine-grained GitHub PAT: contents:read (git pull) + contents:write + pull_requests:write (PRs)
- CODEOWNERS in canon/ pointing at a nonexistent owner (physical block)
- Branch protection on main: require PR + 1 oracle approval
- GitHub Actions: validate YAML frontmatter on PRs, detect credentials in commits

PHASES:
- Alpha → Beta: 10 completed missions, 0 security incidents, 20 successful canonical boots
- Beta → v1.0.0: 30 autonomous missions, Procyon active, full cycle <48h without oracle

SIMULATION FINDINGS (100 scenarios):
The 5 most frequent failures found:
1. Urgency breaks protocols → minimum boot of 4 inviolable steps
2. Oracle as a single point of failure → 48h timeout + delegated Lead Oracle
3. Missing divergence_log → mandatory field in the mission template
4. CHANGELOG not updated → inactive agents become active entropy
5. canon protected only by norm (not by technique) → blocking CODEOWNERS mandatory

QUESTIONS FOR YOU:
1. What critical failures do you see in this architecture that the simulations did not capture?
2. Is the canon/operations/protocols separation correct, or is there problematic overlap?
3. How does this structure scale at 50+ agents and 500+ missions?
4. What inter-agent coordination mechanism do you propose for when two agents need the same resource?
5. Is there any pattern from similar repositories (AI knowledge bases, org wikis, multi-agent systems) we can learn from?
6. What is missing from the YAML frontmatter that we will need when we scale?
7. Is the CC0 license right for a system like this, or does CC BY-SA 4.0 better protect Numen Games' identity?

ADDITIONAL CONTEXT:
- The agents are LLMs (currently Anthropic's Claude Sonnet/Haiku)
- The system runs on OpenClaw (agent framework) over Telegram as the channel
- The server is an Ubuntu VPS with Caddy; we will soon migrate to an on-premises PC with an RTX 4080
- Current budget: ~$3-5/day in tokens. Goal: reduce it with local models (Ollama)
- We build in public — the repo will be public from day one

Provide your structured analysis with: critiques, what is right, what you would change and why.
```

---

## Usage instructions

1. **Paste the full prompt** into the AI you want to consult
2. If the AI asks for more context, you can also attach `archive-summa-fundacional-v0.1.0.md`
3. Interesting answers are documented as ADRs or modify this document in v0.2.0
4. The goal is to arrive at the build meeting with the design validated by multiple perspectives

---

*Nimrod 🗡️ · Numen Games · 2026-04-06*
