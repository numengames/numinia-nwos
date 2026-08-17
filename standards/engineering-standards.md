<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# Engineering Standards

**Version:** 0.1.0 (draft — pending Oracle review)
**Status:** Proposal
**Date:** 2026-08-17
**Canonical location:** `numen-games-nwos-orgs/nwos-workspace-template` (the mould, upstream). Single source of truth for this document.
**Downstream:** `numengames/numinia-nwos` is a fork of the mould and receives this document through the fork relationship. The upstream sync mechanism is an open Oracle decision — not defined here.
**Change mechanism:** ADR + Pull Request against the canonical copy (upstream). See §5.

---

## 0. Purpose and scope

This document exists because repository disparity is documentary debt. Every repository in the ecosystem MUST be able to answer: *which practices apply here, and which machine verifies each one?*

It has three layers with three different speeds of change:

| Layer | Content | Changes via | Frequency |
|---|---|---|---|
| **1. Principles** | The manifesto. Why we work this way. | Oracle decision only | Rarely, if ever |
| **2. Practices** | What each profile demands. Versioned (semver). | ADR + PR to this document | When evidence justifies it |
| **3. Checks** | The machines that verify Layer 2. | PR (implementation detail) | Continuously |

**Golden rule:** every practice in Layer 2 maps to an automated check in Layer 3, or is explicitly tagged `[MANUAL]`. A `[MANUAL]` tag is debt. Continuous improvement means moving practices from `[MANUAL]` to `[AUTO]`.

**Relation to existing canon:** licensing practices are governed by Canon C-005 and are referenced here, not duplicated. Design output is governed by the Numen Design System. Where this document conflicts with a canon document, the canon wins.

---

## 1. Principles (Layer 1)

1. **A rule that does not fail a build is prose, not a rule.** CI is the authority; documentation is its explanation.
2. **Automatable checks are never audited by hand.** Human attention is reserved for what machines cannot judge.
3. **Small batches over big deliveries.** Frequent integration, small PRs, trunk kept green.
4. **Configuration lives in the environment, never in the code.** Secrets never touch the repository; publication is irreversible.
5. **Leave the repository better than you found it.** Every touch may reduce debt; no touch may add it silently.
6. **Incidents produce rules, not culprits.** Blameless postmortems; each incident may inject one practice via ADR.
7. **The platform is a product and its users are developers — biological and digital.** If the golden path is unclear to an agent, it is unclear.

---

## 2. Practices by profile (Layer 2)

Each practice has an ID, a requirement level (MUST / SHOULD), and a check tag: `[AUTO: <tool>]` or `[MANUAL]`.

### 2.1 CSO — Security and credentials

| ID | Practice | Level | Check |
|---|---|---|---|
| SEC-01 | 2FA enforced at organization level | MUST | `[AUTO: org settings + Scorecard]` |
| SEC-02 | Secret scanning + push protection enabled on every repo | MUST | `[AUTO: GitHub settings]` |
| SEC-03 | Dependabot alerts + security updates on; merge only on green CI | MUST | `[AUTO: Dependabot + CI]` |
| SEC-04 | No `.env` or secret files in git history; secrets live in GitHub Environments scoped per environment (`pre`/`prod`) | MUST | `[AUTO: push protection + gitleaks in CI]` |
| SEC-05 | Cloud deploy auth via OIDC (GitHub → Cloudflare), no long-lived tokens | MUST | `[MANUAL]` → target `[AUTO]` via Terraform policy |
| SEC-06 | Personal access tokens: fine-grained only, minimum scope, expiry set, one token per purpose | MUST | `[MANUAL]` |
| SEC-07 | Third-party GitHub Actions pinned by commit SHA, never by tag | MUST | `[AUTO: Scorecard Pinned-Dependencies]` |
| SEC-08 | Workflow tokens default to read-only (`permissions: read-all`; write granted per job) | MUST | `[AUTO: Scorecard Token-Permissions]` |
| SEC-09 | `SECURITY.md` with disclosure policy in every public repo | MUST | `[AUTO: Scorecard Security-Policy]` |
| SEC-10 | CODEOWNERS covering sensitive paths: `LICENSE*`, `.github/workflows/`, auth packages | MUST | `[AUTO: presence check in CI]` |
| SEC-11 | Organization base permission: read; admin granted per repo, per need | MUST | `[MANUAL]` |
| SEC-12 | Commits to `main` verified (signed or web-verified) | SHOULD | `[AUTO: branch protection]` |

### 2.2 CTO — Architecture and quality

| ID | Practice | Level | Check |
|---|---|---|---|
| ARC-01 | Identical CI pipeline in every repo: `type-check → lint → test → build`. Exceptions live in rule severity, never in pipeline steps | MUST | `[AUTO: shared workflow]` |
| ARC-02 | Branch protection on `main`: PR required, status checks required, no force push | MUST | `[AUTO: Scorecard Branch-Protection]` |
| ARC-03 | License per Canon C-005 trichotomy; REUSE 3.3 compliance | MUST | `[AUTO: reuse lint in CI]` |
| ARC-04 | Executable README: clone → green tests in under 5 minutes; CI and coverage badges | MUST | `[MANUAL]` → target `[AUTO]` via smoke script |
| ARC-05 | ADRs in `docs/decisions/`, agreed format, one decision per file | MUST | `[MANUAL]` |
| ARC-06 | Conventional commits enforced; semver tags; GitHub Releases with notes | MUST | `[AUTO: commitlint + release workflow]` |
| ARC-07 | Infrastructure declarative only: Terraform + containers. Nothing hand-configured in dashboards | MUST | `[MANUAL]` → target `[AUTO]` via drift detection |
| ARC-08 | Shared base config (tsconfig / eslint / prettier) imported from one package, never copied | MUST | `[AUTO: lint rule / knip]` |
| ARC-09 | Dependencies reviewed before adoption: maintained, licensed compatibly, Scorecard score consulted | SHOULD | `[MANUAL]` |

### 2.3 PM — Traceability and state

| ID | Practice | Level | Check |
|---|---|---|---|
| PM-01 | Repo "About" complete: description, website, topics | MUST | `[AUTO: API check in CI]` |
| PM-02 | Issue templates + PR template with Definition of Done checklist | MUST | `[AUTO: presence check]` |
| PM-03 | Standardized labels across all repos (same set, same colors) | SHOULD | `[AUTO: label-sync action]` |
| PM-04 | `CHANGELOG.md` or releases generated from conventional commits | MUST | `[AUTO: release workflow]` |
| PM-05 | Roadmap/TODO as a file in the repo — File Over App applies to management | MUST | `[AUTO: presence check]` |

### 2.4 Dev team — Ergonomics

| ID | Practice | Level | Check |
|---|---|---|---|
| DEV-01 | `.env.example` exhaustive and in sync with the Zod env schema | MUST | `[AUTO: schema-vs-example test]` |
| DEV-02 | Identical npm scripts across repos: `dev`, `build`, `test`, `lint` mean the same everywhere | MUST | `[AUTO: template check]` |
| DEV-03 | `.editorconfig` + shared editor settings committed | SHOULD | `[AUTO: presence check]` |
| DEV-04 | Pre-commit hooks fast (<5s): lint-staged + commitlint. CI is the authority; the hook is courtesy | MUST | `[AUTO: husky config in template]` |
| DEV-05 | Comments in English, explaining *why*; TSDoc on every exported public API | MUST | `[MANUAL]` (review) |
| DEV-06 | Small PRs with context: what, why, how to verify | SHOULD | `[MANUAL]` (review) |
| DEV-07 | Code review before `main`: at least one approval | MUST | `[AUTO: branch protection]` |

### 2.5 SRE / Platform

| ID | Practice | Level | Check |
|---|---|---|---|
| SRE-01 | Documented rollback path for every deployable; tested at least once | MUST | `[MANUAL]` → target `[AUTO]` via rehearsal job |
| SRE-02 | Health check endpoint on every deployed service | MUST | `[AUTO: post-deploy probe]` |
| SRE-03 | Structured logs (JSON), no `console.log` in production code | MUST | `[AUTO: eslint no-console]` |
| SRE-04 | Runbook per service: deploy, rollback, common failures | MUST | `[MANUAL]` |
| SRE-05 | Deploy reproducible from a clean clone: no snowflake state | MUST | `[AUTO: CI deploys from scratch]` |
| SRE-06 | Blameless postmortem for every production incident; outcome may inject one rule via ADR | MUST | `[MANUAL]` |

### 2.6 OSS Maintainer / Community

| ID | Practice | Level | Check |
|---|---|---|---|
| OSS-01 | `CONTRIBUTING.md` that a stranger can follow | MUST (public repos) | `[AUTO: Scorecard Contributing]` |
| OSS-02 | Code of Conduct present | MUST (public repos) | `[AUTO: presence check]` |
| OSS-03 | DCO or CLA per repo license regime (Canon C-005: DCO for MIT-only, CLA for AGPL dual-licensed) | MUST | `[AUTO: DCO/CLA bot]` |
| OSS-04 | Issue triage cadence defined (even if the answer is "weekly, by the Oracle") | SHOULD | `[MANUAL]` |
| OSS-05 | Social preview image set | SHOULD | `[MANUAL]` |

### 2.7 Digital Agents

| ID | Practice | Level | Check |
|---|---|---|---|
| AGT-01 | `CLAUDE.md` at repo root; first instruction: audit current branch state before assuming anything | MUST | `[AUTO: presence + content check]` |
| AGT-02 | Deterministic conventions: predictable naming and paths so agents never hallucinate structure | MUST | `[MANUAL]` (design review) |
| AGT-03 | Everything normative exists in machine-readable form alongside prose: SPDX, DTCG, JSON Schema, Gherkin | MUST | `[AUTO: respective linters]` |
| AGT-04 | CI is the agent's feedback loop: a rule that doesn't break the build does not exist for an agent | MUST | (restatement of Principle 1) |
| AGT-05 | Mission briefs in Numinia Standard format with Gherkin acceptance criteria | MUST | `[MANUAL]` |
| AGT-06 | Clear AI stance per repo: what agents may do autonomously vs. what requires Oracle sign-off (cosmetic vs. irreversible) | MUST | `[MANUAL]` — documented in `CLAUDE.md` |

### 2.8 Legal / Compliance — by reference

Governed entirely by **Canon C-005** (licensing trichotomy, REUSE 3.3, SPDX, dual-licensing, `LEGAL_DEBT.md`, visibility gate). This document adds only one operational rule:

| ID | Practice | Level | Check |
|---|---|---|---|
| LEG-01 | Making a repo public is a gated Oracle act. Checklist: license correct per C-005, REUSE green, no secrets in history, `SECURITY.md` present | MUST | `[MANUAL]` — gate, by design |

---

## 3. Checks (Layer 3)

The machines. Every repo generated from the mould ships with:

### 3.1 OpenSSF Scorecard
- Scorecard GitHub Action running weekly + on push to `main`, publishing results and badge.
- Covers automatically: branch protection, pinned dependencies, token permissions, security policy, CI tests, code review, dangerous workflow patterns.
- **Interpretation rule:** Scorecard measures process hygiene, not code quality. It is a thermometer, not a guarantee. Score target: ≥7 for public repos.
- **Visibility rule:** some checks lose meaning on private repos. Each repo's `CLAUDE.md` declares which checks are in scope.

### 3.2 CI pipeline (shared workflow)
- `type-check → lint → test → build`, called as a reusable workflow from one source of truth.
- Coverage thresholds enforced in test config as failure, not report.
- REUSE lint step on every repo with a license regime.

### 3.3 Presence checks
- One lightweight CI job verifies: `CLAUDE.md`, `SECURITY.md`, `CONTRIBUTING.md` (public), CODEOWNERS, templates, `.env.example`, About fields (via API).
- This job is the automated answer to "are all the fields filled in?"

### 3.4 Local layer
- Husky: pre-commit (lint-staged), commit-msg (commitlint). Skippable by design (`--no-verify`); CI remains the authority.

---

## 4. GitHub repository checklist ("fill everything in")

Every repo, at creation (the mould pre-fills what it can):

- [ ] Description (one sentence, plain language)
- [ ] Website URL
- [ ] Topics (≥3)
- [ ] README with badges (CI, Scorecard, coverage where applicable)
- [ ] LICENSE per C-005 + REUSE structure
- [ ] `SECURITY.md`
- [ ] `CONTRIBUTING.md` (public repos)
- [ ] `CODE_OF_CONDUCT.md` (public repos)
- [ ] CODEOWNERS
- [ ] Issue + PR templates
- [ ] Labels synced from the standard set
- [ ] Branch protection on `main`
- [ ] Secret scanning + push protection ON
- [ ] Dependabot ON
- [ ] Social preview image
- [ ] Visibility justified (private by default; public only through LEG-01 gate)

---

## 5. Evolution mechanism

This document is a system with sensors, not a PDF that ages.

1. **Amendment:** any practice change enters via ADR + PR to this file. The ADR states the evidence. Version bumps per semver: new practice = minor, changed level (SHOULD→MUST) = minor, removed/breaking = major, wording = patch.
2. **Telemetry:** weekly Scorecard runs across all repos are the perception channel. A dropping score is an incident; incidents produce rules (Principle 6).
3. **Radar review:** monthly slot in the Dark Council: new practices classified adopt / trial / hold. Trial practices enter as SHOULD; evidence promotes them to MUST.
4. **Debt burn-down:** each review, pick at least one `[MANUAL]` practice and evaluate moving it to `[AUTO]`.
5. **Sunset:** a practice nobody has needed in two quarters and no check enforces is a candidate for removal — by ADR, like everything else.

---

## 6. Adoption

- **NWOS repos (`numen-games-nwos-orgs`):** enforced via the mould. Generated workspaces inherit Layer 3 checks at birth.
- **Numinia repos (`numengames`):** adopt by reference — `CLAUDE.md` links to this document; the shared CI workflow and presence checks are added per repo. *(Scope pending Oracle confirmation.)*
- **Personal repos (`PabloFMM`):** SHOULD, not MUST.

Existing repos migrate incrementally: Scorecard first (measurement before enforcement), then presence checks, then full pipeline. Measure, then tighten.

---

## 7. Agent application protocol

This document is meant to be **executed**, not just read. Any coding agent (Claude Code or similar) operating in a repo that contains or references this document MUST follow this protocol.

### 7.1 Provenance — know which copy you are reading

The canonical copy lives upstream in `numen-games-nwos-orgs/nwos-workspace-template`. `numengames/numinia-nwos` and any workspace generated from the mould are **downstream forks**: they receive this document through the fork relationship, and how upstream changes are pulled in is an open Oracle decision — do not invent a sync mechanism.

Agent rules:
- If you are **downstream** and asked to change this document: the change belongs upstream via ADR + PR. Refuse the local edit and offer to draft the upstream ADR instead. A local edit creates divergence that every future upstream sync will pay for.
- If you are **upstream** (the mould) and the document changes: bump the version per §5.1 and note in the PR description that downstream forks will need to sync.
- If a downstream copy's version lags upstream, flag it in your report (§7.4). Do not attempt the sync yourself unless the mission explicitly asks for it.

### 7.2 Execution order for any task

1. **Audit current branch state first.** Never assume the repo matches this document, the README, or any brief. Read what is actually there.
2. **Load the repo's `CLAUDE.md`.** It declares which Scorecard checks are in scope, the repo's AI stance (AGT-06), and any repo-specific overrides. If `CLAUDE.md` is missing, that is itself a violation of AGT-01 — report it before proceeding.
3. **Classify the task: cosmetic or irreversible.** Cosmetic (formatting, lint fixes, doc typos, test additions) → proceed. Irreversible (visibility changes, license changes, secret handling, deleting history, publishing, force operations) → STOP and surface the decision for Oracle sign-off. When in doubt, it is irreversible.
4. **Identify which practices (by ID) the task touches.** Reference them explicitly in commits and PR descriptions (e.g., `fix: enforce read-only workflow tokens (SEC-08)`).
5. **Run the checks locally before pushing.** CI is the authority, but a failing local run is faster feedback (Principle 1, AGT-04).
6. **Never weaken a check to make a task pass.** Lowering a threshold, skipping a test, adding a lint-ignore, or unpinning an action is a Layer 2/3 change and requires an ADR — it is never a side effect of a feature task.

### 7.3 What agents may do autonomously vs. never

**Autonomously (cosmetic tier):**
- Fix violations of `[AUTO]` practices when the fix is mechanical (pin an action by SHA, add a missing `SECURITY.md` from template, sync labels, complete `.env.example`).
- Add or improve tests, comments (English, *why*), and TSDoc.
- Open PRs that reduce `[MANUAL]` → `[AUTO]` debt, as proposals.

**Never without Oracle sign-off (irreversible tier):**
- Change repo visibility (LEG-01 gate).
- Change any LICENSE, SPDX header, or REUSE structure (Canon C-005 territory).
- Rotate, create, or delete credentials, tokens, or secrets.
- Edit this document in a mirror, or change Layer 1 principles anywhere.
- Disable, weaken, or bypass any check (branch protection, coverage threshold, Scorecard, push protection).
- Force-push, rewrite history, or delete branches/tags on `main`.

### 7.4 Reporting format

After completing a task, the agent reports: practices touched (IDs), checks run and their result, any `[MANUAL]` debt observed in passing (do not fix unprompted — report it), and any decision escalated to the Oracle. Observed-but-untouched debt goes to the repo's TODO file (PM-05), not into scope creep.

---

*A rule that does not fail a build is prose. This document intends to be as little prose as possible.*
