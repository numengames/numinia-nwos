# Governance — Archive Summa

> **Summary:** NWOS system document — GOVERNANCE.
> **Epistemic:** What you learn by reading this document.
> **Pragmatic:** What you can do with this document.
> **Audience:** Agents · Oracles

---


Rules derived from 100 mental simulations. Each rule includes the simulation that revealed it.

---

## Roles

| Role | Description |
|------|-------------|
| `oracle` | Pablo FM. Maximum authority. Approves structural changes. |
| `custodian` | Adonaz and equivalents. Document management, INDEX, CHANGELOG. |
| `active-agent` | Nimrod and other operational agents. Write access to own files and assigned missions. |
| `design-agent` | Agents in design phase (Alquimista, Procyon, etc.). Read only. |
| `system` | CI/CD, automation bots. Restricted write to reports/ only. |

---

## Permissions by fund

| Fund | Create | Modify | Archive/Delete | PR Approval |
|-------|--------|--------|----------------|-------------|
| `canon/` | oracle | **Nobody** | **Nobody** | N/A — immutable |
| `agents/{own}/` | oracle | active-agent (own) + oracle | oracle | oracle |
| `agents/{other}/` | oracle | oracle | oracle | oracle |
| `operations/` | oracle + custodian | oracle + custodian | oracle | oracle |
| `protocols/` | oracle + custodian | New version = new file | Mark status: superseded | oracle |
| `missions/` — status: backlog/draft | oracle + custodian | oracle | oracle | oracle |
| `missions/` — status: in-progress/in-review | active-agent + oracle | Only executor | Oracle sets status: done | oracle |
| `missions/` — status: done | Automatic on close | **Nobody** (Oracle-recorded overrides only, cf. MIS-066) | oracle | N/A |
| `decisions/` | oracle + custodian | Only add superseded_by | **Never delete** | oracle |
| `blueprints/` | oracle + agents | oracle + agents | oracle | oracle |
| `reports/daily/` | active-agent + system | Same day only | custodian (90d retention) | Auto-merge |
| `reports/weekly/` | custodian + system | Current week only | custodian (1y retention) | oracle |

---

## Key rules (with simulation origin)

| Rule | Origin | Description |
|------|--------|-------------|
| G-01 | SIM-2.4 | When a mission contradicts canon, the mission is wrong. Escalate via P-005. |
| G-02 | SIM-2.5 | One active mission has exactly one executor. Collaborative missions must be declared. |
| G-03 | SIM-2.13 | Only the executor edits an active mission. Others can read, not write. |
| G-04 | SIM-4.1 | Agents never modify their own SOUL.md or OPERATOR.md. |
| G-05 | SIM-4.5 | No agent deletes documents from done/ or decisions/. |
| G-06 | SIM-3.4 | Escalation path: agent → procyon → oracle. No skipping. |
| G-07 | SIM-5.4 | When in doubt about sensitivity, don't commit. Escalate first. |
| G-08 | SIM-2.8 | Missions in backlog >90 days without activity are marked stale. |
| G-09 | SIM-4.3 | Any change to canon/ requires label canon-change + explicit oracle approval. |
| G-10 | SIM-2.6 | Oracles have 48h to approve missions with requires_oracle_approval. |

---

*Rules derived from simulations. Version 1.0.0 — 2026-04-06*
*Nimrod 🗡️ — Numen Games*
