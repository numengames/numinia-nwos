---
title: "Governance — who may change what, and at what cost"
id: "STD-002"
uid: ""
type: documentation
status: active
version: "2.2.0"
created: "2026-04-06T18:48:56Z"
created_source: "git:84a9f71"
created_confidence: exact
updated: "2026-09-04T00:45:00+02:00"
author: "nimrod"
owner: "oracle"
tags: [governance, roles, permissions, thresholds, versioning]
license: "CC0-1.0"
---

# Governance — who may change what, and at what cost

> **Summary:** Who may change what in this repository, at what cost, and who
> must approve it.
> **Epistemic:** Roles, permissions per series, change thresholds, versioning
> authority, approval scale.
> **Pragmatic:** Before creating, modifying or deleting any document, find your
> row here.
> **Audience:** Agents · Oracles

---

## Roles

| Role | Who | What it may do |
|---|---|---|
| `oracle` | Pablo FM | maximum authority; approves structural change |
| `custodian` | Adonaz and equivalents | document management, index, changelog |
| `active-agent` | operational agents | writes its own files and its assigned missions |
| `design-agent` | agents in design phase | read only |
| `system` | automation | restricted write, reports only |

---

## Permissions by series

| Series | Create | Modify | Archive or delete | Approval |
|---|---|---|---|---|
| `canon/` | oracle | oracle | oracle | oracle — `sealed` |
| `agents/{own}/` | oracle | active-agent (own) + oracle | oracle | oracle |
| `agents/{other}/` | oracle | oracle | oracle | oracle |
| `operations/` | oracle + custodian | oracle + custodian | oracle | oracle |
| `protocols/` | oracle + custodian | new version = new file | mark `superseded` | oracle |
| `missions/` — `todo` | oracle + custodian | oracle | oracle | oracle |
| `missions/` — `in-progress` · `in-review` | active-agent + oracle | only the executor | Oracle sets `done` | oracle |
| `missions/` — `done` | automatic on close | substance: nobody; form: with the commit saying so | oracle | — |
| `decisions/` | oracle + custodian | only add `superseded_by` | **never delete** | oracle |
| `blueprints/` | oracle + agents | oracle + agents | oracle | oracle |
| `reports/` — `subtype: daily` | active-agent + system | same day only | consumer tests | auto-merge |
| `reports/` — `audit` · `analysis` · `proposal` | author + oracle | closed on publication, form only | consumer tests | oracle |

### Change thresholds

The table above says **who**. The glossary says **how much agreement**, and the
two are read together.

| Threshold | What it takes | Applies to |
|---|---|---|
| `sealed` | the Oracle's signature and a recorded decision; the previous version stays reachable | `canon/` |
| `governed` | a decision record, or a pull request the Oracle approves | `standards/` · `protocols/` · `decisions/` |
| `closed` | substance is not reopened; form may be corrected and the commit must say so | `missions/` done · `reports/` |
| `open` | normal pull request | everything else |

**Nothing here is immutable, and this document does not claim otherwise.**

**What is mechanically enforced, and what is not.** The `protect-main` ruleset
is active on the default branch — pull requests, required status checks, linear
history, no force-push, no deletion, **zero bypass actors**, verified against
the ruleset API on 2026-09-03. What the permission table **cannot** enforce is
*who approves*: the rows name authorities the platform does not distinguish.
Those rows are a convention held by people. The branch is not.

---

## The rules

| Rule | Description |
|---|---|
| G-01 | When a mission contradicts the canon, the mission is wrong. Escalate. |
| G-02 | One active mission has exactly one executor. Collaboration is declared. |
| G-03 | Only the executor edits an active mission. Others read. |
| G-04 | Agents never modify their own `SOUL.md` or `OPERATOR.md`. |
| G-05 | No agent deletes documents from `missions/` done or `decisions/`. |
| G-06 | Escalation runs agent → Oracle, per the escalation protocol. |
| G-07 | When in doubt about sensitivity, do not commit. Escalate first. |
| G-08 | A mission sitting in `todo` more than 90 days without activity is stale. |
| G-09 | Any change to `canon/` requires the canon-change label and explicit Oracle approval. |
| G-10 | The Oracle has 48 hours to answer a mission that requires approval. |
| G-11 | Canon propagates by pin and digest, never by copy. The emitter publishes, versions, signs, generates and notifies; the consumer pins, verifies and reports upstream. |
| G-12 | A derived NWOS repository is sovereign. Updates are offered, never imposed; the emitter's authority ends at notification. |

### Canon emission — the canon is not copied, it is pinned

The repository that governs a law writes it, versions it, generates its derived
artifacts and publishes them. Consumers keep no copy: they pin a version and a
digest, verify drift in their own pipeline, and report upstream instead of
patching. **A local copy is a fork waiting to happen.**

Per governed artifact, the emitter **publishes** at a stable public address for
the master and every derived artifact; **versions** it in the artifact itself
and in the path, so a new version never overwrites an old address; **signs** it
with a manifest carrying a digest per file; **generates** derived artifacts from
the master by script, never by hand; **notifies** known consumers of every new
version with its digest; and keeps an **append-only** history inside the master,
never reusing a retired number.

### Sovereignty of derived repositories

**Once an organization has created its own NWOS repository, it is sovereign.**
We publish; they adopt. Nothing written here becomes law inside their repository
by inheritance, fork relationship or template lineage.

| Not this | This |
|---|---|
| "it is a fork of the mould, so it receives our document" | the mould is **versioned**; the organization **pins a version** |
| a practice written upstream is mandatory downstream | a new version is **published and announced**; adopting it is their decision |
| "consumer repositories must never drift" | drift is legitimate; drifting **silently while claiming to be current** is not |
| sync imposed | update **offered**, with a changelog of what changes and why |

The emitter's duties hold unchanged. What sovereignty adds is the limit of the
emitter's authority: **its duty ends at notification.** A sovereign organization
may stay on an old version forever, and that is not debt on their side — it is a
fact our tooling must be able to read.

**Watch for this error class:** any artifact that assumes authority over a
repository it does not own — a requirement aimed downstream, a mandatory sync, a
guard that fails someone else's build for not being current. Register it as a
contradiction before acting on it.

---

## Versioning authority

Every artifact follows a two-stage lifecycle. Semantic versioning itself is
defined in the glossary; this table says **who may move a version**.

| Transition | Who authorizes |
|---|---|
| new artifact → v0.1.0 | digital agent — every artifact starts at v0.1.0, no exceptions |
| v0.1.0 → v0.2.0, development iteration | digital agent |
| **v0.X.0 → v1.0.0, stable promotion** | **Oracle only** — signals production-ready |
| v1.0.0 → v1.1.0, stable iteration | digital agent |
| **v1.X.0 → v2.0.0, major breaking** | **Oracle only** |

---

## Human approval scale

This is the definition of `human_approval_score`: a **gate**, scored before
acting — how much human approval an action needs.

| Score | Category | Description | Response time |
|---|---|---|---|
| 1–2 | routine | no risk, instantly reversible | none required |
| 3–4 | operational | limited impact, reversible | 24h |
| 5–6 | tactical | moderate impact, partially reversible | 24h |
| 7–8 | strategic | affects multiple systems or agents | 12h |
| 9 | systemic | modifies canon, operator, security | immediate |
| 10 | foundational | irreversible, reputation, real money | immediate, and a meeting |

---

## References

| ID | Name | Why cited |
|---|---|---|
| `STD-001` | The glossary | Defines the change thresholds this document's permission table is read against, and semantic versioning. |
| `PRO-005` | The escalation protocol | Carries the escalation path that rule G-06 names. |
| `PRO-008` | The decision protocol | Carries the request format the approval scale is scored in. |

---
