---
id: "MIS-060"
title: "Agent Synchronization with the Canonical Repo"
type: mission
status: todo
version: "1.2.0"
created: "2026-04-07T17:45:51Z"
created_source: "git:01f7878"
created_confidence: inferred
updated: "2026-04-07T18:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [cao, sync, agents, architecture, workspace]
license: "CC-BY-4.0"
mission_id: "MIS-060"
assigned_to: "nimrod"
requested_by: "oracle"
area: "CAO"
guild: "Sentinels"
type_execution: "technical"
priority: "high"
effort: "M"
phase: "backlog"
---
# MIS-060 — Agent Synchronization with the Canonical Repo

**Area:** CAO · **Guild:** Sentinels · **Priority:** 🟠 High · **Effort:** M

---

## Origin

Session of 2026-04-07. Pablo detected that Christian's agent was operating with an outdated map of the organization. Concrete symptom: mission ID collision.

- **In Nimrod's memory:** MIS-055 = "Approval Brief Protocol"
- **In the repo:** MIS-055 = "Dual Nomenclature System"

---

## Full diagnosis

### Real root cause (confirmed 16:11 UTC)

The git pull **was configured** in Christian's AGENTS.md. The file sync process was working.

The failure was in the **layer above**: the agent assigned a mission ID from memory without actively verifying the repo. `git pull` syncs files — it does not validate or reconcile the agent's local memory.

**Two sync layers, two distinct problems:**

| Layer | Tool | State during the incident |
|-------|------|--------------------------|
| File sync | `git pull` at startup | ✅ Working |
| Memory sync (ID validation) | Explicit verification | ❌ Did not happen |

### The deeper architectural gap

During the analysis, a more relevant scale problem emerged:

> **AGENTS.md is a local, static file.** OpenClaw injects it at startup. But if the organization evolves in the repo, that file does not update itself. Each agent starts with the AGENTS.md from the day it was installed.

Real use case: an organization with 5 employees onboards NWOS. Each one opens their OpenClaw instance. The organization evolves for 3 months. All agents' AGENTS.md files are still the ones from installation day.

**There is no native mechanism that propagates changes from the canonical repo to agents' local workspaces.**

---

## Solutions analyzed

### Option A — Cron on each server
```bash
# Nightly: git pull + update AGENTS.md
git pull numinia-digital-agents
cp numinia-digital-agents/agents/nimrod/AGENTS.md AGENTS.md
```
**Pro:** Simple to implement.
**Con:** Manual, not verifiable, does not scale. With 3+ agents, it's one script per server that no one knows if it's running.

### Option B — GitHub Action as deployment
Each push to the canonical repo triggers an Action that SSHes into all registered servers and updates AGENTS.md.

**Pro:** Automatic, auditable, scalable. Rollback possible. Staged deployments possible.
**Con:** Requires maintaining a server registry. More infrastructure. Target for when 3+ agents are in production.

### Option C — Symlink (immediate solution)
```bash
ln -sf /home/node/.openclaw/workspace/numinia-digital-agents/agents/nimrod/AGENTS.md \
       /home/node/.openclaw/workspace/AGENTS.md
```
AGENTS.md stops being a local file — it points directly to the one in the repo. The `git pull` at startup already updates it with no additional steps.

**Pro:** Zero overhead, zero scripts, works from the first moment. Elegant for 1-2 agents.

**Why it does NOT scale beyond 2-3 agents:**

1. **Manual operation per server.** Each new OpenClaw instance requires SSH + creating the symlink manually.
2. **No verification.** No way to know if all symlinks point to the right place without SSHing to each server individually.
3. **Fragility under repo restructuring.** If the repo moves paths, all symlinks across all instances break simultaneously.
4. **No audit trail.** No record of when each agent received which version of AGENTS.md.
5. **Multi-tenant impossible.** When different organizations have their own NWOS instances, symlink management is unmanageable.
6. **No staged rollouts.** A bad AGENTS.md pushed to the repo breaks ALL agents simultaneously.

**Conclusion:** Option C is the solution for now (Nimrod + Christian). Option B is the target when the organization grows.

---

## Implementation plan — Two phases

### PHASE 1 — Now (Option C + ID validation rule)

**1a. Symlink on Nimrod's server**
```bash
cd /home/node/.openclaw/workspace
ln -sf numinia-digital-agents/agents/nimrod/AGENTS.md AGENTS.md
```

**1b. Amendment to P-003 (Mission Cycle)**
Add rule: "Before assigning any mission ID, list `missions/active/` and `missions/backlog/` in the repo. If you cannot verify: do not assign ID."

**1c. AGENTS.md of all active agents**
Add explicit rule: "Never assign a mission ID without verifying the repo first."

### PHASE 2 — When 3+ agents exist (Option B revised: Pull, not Push)

**⚠️ Critical security decision (2026-04-07):**
The original Option B (GitHub Action with SSH) was discarded by the infrastructure team.

**The problem:** GitHub Actions SSHes from public GitHub IPs → the server has port 22 closed to the public via Tailscale hardening. Opening public SSH undoes the hardening. Risk: 8/10.

**The conceptual distinction:**
- **Push (discarded):** GitHub → server. Requires open public SSH.
- **Pull (adopted):** Server → GitHub. Only needs outbound HTTPS. Already allowed. Zero new risk.

**Correct implementation — Cron job on the server:**
```bash
# In server crontab: every 15 minutes, silent git pull
*/15 * * * * cd /home/node/.openclaw/workspace/numinia-digital-agents && git pull origin main >> /home/node/.openclaw/logs/git-pull.log 2>&1
```

---

## Deliverables

- [x] E1 — Christian's workspace audit completed
- [ ] E2 — P-003 amendment: ID verification rule before assigning
- [ ] E3 — AGENTS.md of active agents updated with validation rule
- [ ] E4 — Symlink + Cron job on server
- [ ] E5 — ADR: Workspace sync architecture (cron pull vs GitHub Actions push)

---

## Acceptance criteria

- [x] E1 completed — Christian workspace audit
- [ ] P-003 has the ID verification rule before assigning
- [ ] Nimrod's AGENTS.md has the validation rule
- [ ] Christian has the same rule in his workspace
- [ ] Symlink active and verified on server
- [ ] Cron job active (crontab -l shows it, log confirms execution)
- [ ] DEC created documenting the architecture decision
- [ ] Mission ID collisions cannot recur

---

## Epistemic value

This mission demonstrates that the reliability of a multi-agent system depends not just on agents reading the same documents — but on the documents they read being the *same version at the same time*. Synchronization is a distribution problem, not a discipline problem.

## Pragmatic value

Eliminates the possibility of ID collisions. Establishes the architectural foundation for scaling the system to new instances in a reproducible and auditable way.

---

## Key lessons

> *"git pull syncs files. It does not sync your memory."*

> *"The solution cannot depend on the agent remembering to do something. It must be structural."*

> *"A rule in AGENTS.md is worth more than ten protocols in the repo — because AGENTS.md always arrives, protocols only arrive if the agent looks for them."*

> *"Push requires opening doors. Pull only needs a path that already exists. Always prefer pull in hardened architectures."*

---

## Version history

- v1.0.0 (2026-04-07) — Initial creation.
- v1.1.0 (2026-04-07) — Extended with full architecture analysis.
- v1.2.0 (2026-04-07) — Translated to English (MIS-056).

*Nimrod 🗡️ — 2026-04-07*
