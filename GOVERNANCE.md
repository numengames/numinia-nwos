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
| `canon/` | oracle | oracle | oracle | oracle — `sealed`, see below |
| `agents/{own}/` | oracle | active-agent (own) + oracle | oracle | oracle |
| `agents/{other}/` | oracle | oracle | oracle | oracle |
| `operations/` | oracle + custodian | oracle + custodian | oracle | oracle |
| `protocols/` | oracle + custodian | New version = new file | Mark status: superseded | oracle |
| `missions/` — status: backlog/draft | oracle + custodian | oracle | oracle | oracle |
| `missions/` — status: in-progress/in-review | active-agent + oracle | Only executor | Oracle sets status: done | oracle |
| `missions/` — status: done | Automatic on close | Substance: nobody. Form: with the commit saying so | oracle | N/A |
| `decisions/` | oracle + custodian | Only add superseded_by | **Never delete** | oracle |
| `blueprints/` | oracle + agents | oracle + agents | oracle | oracle |
| `reports/daily/` | active-agent + system | Same day only | custodian (90d retention) | Auto-merge |
| `reports/weekly/` | custodian + system | Current week only | custodian (1y retention) | oracle |

### Change thresholds

The table above says **who**. `S-001` §2.1 says **how much agreement**, and the
two must be read together:

| Threshold | What it takes | Applies to |
|---|---|---|
| `sealed` | Oracle's signature + an ADR recording the reason; the previous version stays reachable | `canon/` |
| `governed` | An ADR, or a PR the Oracle approves | `standards/` · `protocols/` · `decisions/` |
| `closed` | Substance is not reopened; form may be corrected and the commit must say so | `missions/` done · `reports/` |
| `open` | Normal PR | everything else |

**Nothing here is immutable, and this document no longer claims otherwise.**
An earlier version stated that `canon/` could be modified by "Nobody" and that
CODEOWNERS enforced it technically. Both were false: 14 of 14 canon documents
carry more than one commit, and `.github/CODEOWNERS` says in its own header
that enforcement *"needs branch protection… tracked in MIS-070"*, which does
not exist yet.

The distance between what this table declares and what the repository can
enforce is registered as [`debt/D-011`](debt/D-011-thresholds-unenforced.md).
Until it closes, every row above is a convention held by people, not a
mechanism.

---

## This is the governance document

There were two. `operations/governance.md` (1,136 chars) covered the same
ground as this file (6,413) and carried both false claims above. It was
deleted by the Oracle on 2026-08-24; references now point here.

`S-001` is the vocabulary — what each series holds and what every field means.
This document is the authority — who may change what, and at what cost. They do
not overlap and neither restates the other.

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

## Canon emission — the canon is not copied: it is pinned

*(2026-08-18, MIS-068 first case. Consumer-side counterpart: numinia-web
ADR-022. Rule G-11.)*

The repository that governs a law writes it, versions it, generates its
derived artifacts and publishes them. Consumers keep no copy: they pin a
version and a digest, verify drift in CI, and report upstream instead of
patching. A local copy is a fork waiting to happen.

**Emitter duties (this repo, per governed artifact):**

| Duty | Meaning |
|------|---------|
| Publish | Stable public URL for the master and every derived artifact |
| Version | Semver in the artifact; versioned filenames/paths — a new version never overwrites the old URL |
| Sign | `manifest.json` with sha256 per file, next to the artifacts |
| Generate | Derived artifacts (kits, fragments) come from the master by script, never by hand |
| Notify | Every new version is announced to known consumers with its digest |
| History | Append-only changelog inside the master; retired numbers are never reused |

**Applied cases:** Design System — master in `standards/`, kit generated by
`scripts/generate-design-kit.mjs` to `numinia.org/diseno/kit/<version>/`
with `kit/manifest.json`; consumer pin in `numinia-web:design-source.json`
guarded by their `design:check`.

## Sovereignty of derived NWOS repositories

*(2026-08-18, Oracle. Rule G-12. Registered contradiction: CON-006.)*

**Once an organization has created its own NWOS repository, it is
sovereign.** We publish; they adopt. Nothing we write becomes law inside
their repo by inheritance, fork relationship, or template lineage.

What that forbids and what it requires:

| Not this | This |
|---|---|
| «It is a fork of the mould, so it receives our document» | The mould is **versioned**; the organization **pins a version** |
| A practice written upstream is MUST downstream | A new version is **published and announced**; adopting it is the organization's decision |
| «Consumer repos must never drift» | Drift is legitimate — what is illegitimate is drifting **silently** while claiming to be current |
| Sync imposed | Update **offered**, with a changelog of what changes and why |

The emitter's duties (G-11) hold unchanged — publish, version, sign,
generate, notify. What G-12 adds is the limit of the emitter's authority:
its duty ends at notification. A sovereign organization may stay on an old
version forever, and that is not debt on their side — it is a fact our
tooling must be able to read.

**Watch for this error class:** any artifact that assumes authority over a
repository it does not own — a MUST aimed downstream, a mandatory sync, a
guard that fails someone else's build for not being current. When you
find one, register it as a contradiction before acting on it.

| Rule | Origin | Description |
|------|--------|-------------|
| G-11 | ADR-022 (numinia-web) + MIS-068 | Canon propagates by pin + digest, never by copy. The emitter publishes, versions, signs, generates and notifies; the consumer pins, verifies and reports upstream. |
| G-12 | Oracle 2026-08-18 (CON-006) | A derived NWOS repository is sovereign. The original is versioned and its updates are offered, never imposed; the emitter's authority ends at notification. |

---

*Rules derived from simulations. Version 1.1.0 — 2026-08-18*
*Nimrod 🗡️ — Numen Games*
