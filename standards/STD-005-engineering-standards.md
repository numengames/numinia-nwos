---
title: "Engineering standards: the practices a repository follows and the machine that checks each one"
id: "STD-005"
uid: ""
type: documentation
subtype: standard
status: draft
version: "1.1.0"
created: "2026-08-17T21:55:38+02:00"
created_source: "git:e3123fc"
created_confidence: exact
updated: "2026-09-09T00:10:00+02:00"
author: "pablofm"
owner: "oracle"
territory: "Platform"
tags: [standards]
license: "CC0-1.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# Engineering standards

> **Summary:** How this organisation builds software: the practices each
> profile owns and the check that verifies each one.
> **Epistemic:** Which engineering practices are required here, and which of
> them a machine actually enforces.
> **Pragmatic:** You can set up a new repository, or review an existing one,
> without asking what the house rules are.
> **Audience:** Agents · Oracles

## 1. Purpose and scope

Every repository in the ecosystem answers one question: *which practices
apply here, and which machine verifies each one?* This standard is that
answer. It has three layers: **principles** (change by Oracle decision),
**practices** (change by ADR and pull request to this file, semver) and
**checks** (change by pull request, continuously).

**Golden rule:** every practice maps to an automated check or is tagged
`[MANUAL]`. A `[MANUAL]` tag is debt; improvement is moving practices from
`[MANUAL]` to `[AUTO]`.

**Where it binds.** `numengames/numinia-nwos` is the operative copy and is
edited here; it is downstream of nothing. NWOS workspaces born from
`nwos-workspace-template` receive it as a starting proposal and own it from
birth — updates are offered, never imposed. Personal repositories: SHOULD.
Existing repositories migrate in order: Scorecard first, then presence checks,
then the full pipeline. Measure, then tighten.

Licensing is governed by `STD-010` and cited here, not restated. Documents are
governed by `STD-004` and `STD-009`. How an agent applies this standard to a
task is `PRO-016`.

## 2. Principles

1. **A rule that does not fail a build is prose, not a rule.** CI is the
   authority; documentation is its explanation.
2. **Automatable checks are never audited by hand.** Human attention is for
   what machines cannot judge.
3. **Small batches over big deliveries.** Frequent integration, small pull
   requests, trunk kept green.
4. **Configuration lives in the environment, never in the code.** Secrets
   never touch the repository; publication is irreversible.
5. **Leave the repository better than you found it.** No touch adds debt
   silently.
6. **Incidents produce rules, not culprits.** Blameless postmortems; an
   incident may inject one practice via ADR.
7. **The platform is a product and its users are developers, biological and
   digital.** If the golden path is unclear to an agent, it is unclear.

## 3. Practices by profile

Each practice has an ID, a level (MUST / SHOULD) and a check: `[AUTO: tool]`
or `[MANUAL]`. A `[MANUAL]` row that names `DBT-020` is declared automatic
and executed by nobody.

### 3.1 Security (CSO)

| ID | Practice | Level | Check |
|---|---|---|---|
| SEC-001 | 2FA enforced at organisation level | MUST | `[AUTO: org settings + Scorecard]` |
| SEC-002 | Secret scanning and push protection on every repository | MUST | `[AUTO: GitHub settings]` |
| SEC-003 | Dependabot alerts and security updates on; merge only on green CI | MUST | `[AUTO: Dependabot + CI]` |
| SEC-004 | No secret files in git history; secrets in GitHub Environments scoped `pre`/`prod` | MUST | `[AUTO: push protection + gitleaks]` |
| SEC-005 | Cloud deploy auth via OIDC, no long-lived tokens | MUST | `[MANUAL]` → `[AUTO]` via Terraform policy |
| SEC-006 | Personal access tokens fine-grained, minimum scope, expiring, one per purpose | MUST | `[MANUAL]` |
| SEC-007 | Third-party Actions pinned by commit SHA | MUST | `[AUTO: Scorecard Pinned-Dependencies]` |
| SEC-008 | Workflow tokens read-only by default; write granted per job | MUST | `[AUTO: Scorecard Token-Permissions]` |
| SEC-009 | `SECURITY.md` with disclosure policy in every public repository | MUST | `[AUTO: Scorecard Security-Policy]` |
| SEC-010 | CODEOWNERS covering `LICENSE*`, `.github/workflows/`, auth packages | MUST | `[AUTO: presence check]` |
| SEC-011 | Organisation base permission read; admin per repository, per need | MUST | `[MANUAL]` |
| SEC-012 | Commits to `main` verified | SHOULD | `[AUTO: branch protection]` |

### 3.2 Architecture and quality (CTO)

| ID | Practice | Level | Check |
|---|---|---|---|
| ARC-001 | Identical CI pipeline everywhere: `type-check → lint → test → build`; exceptions live in rule severity, never in steps | MUST | `[AUTO: shared workflow]` |
| ARC-002 | Branch protection on `main`: pull request and status checks required, no force push | MUST | `[AUTO: Scorecard Branch-Protection]` |
| ARC-003 | Licence per the `STD-010` trichotomy; REUSE 3.3 compliance | MUST | `[MANUAL]` — `DBT-020` |
| ARC-004 | Executable README: clone to green tests in under five minutes; CI and coverage badges | MUST | `[MANUAL]` → `[AUTO]` via smoke script |
| ARC-005 | ADRs in `docs/decisions/`, one decision per file | MUST | `[MANUAL]` |
| ARC-006 | Conventional commits, semver tags, GitHub Releases with notes | MUST | `[MANUAL]` — no commitlint: `DBT-020` |
| ARC-007 | Infrastructure declarative only: Terraform and containers | MUST | `[MANUAL]` → `[AUTO]` via drift detection |
| ARC-008 | Shared base config (tsconfig, eslint, prettier) imported from one package, never copied | MUST | `[AUTO: lint rule / knip]` |
| ARC-009 | Dependencies reviewed before adoption: maintained, compatibly licensed, Scorecard consulted | SHOULD | `[MANUAL]` |
| ARC-010 | WCAG 2.2 AA on every public route; tab order matches visual order; focus ring visible | MUST | `[AUTO: axe-core + Playwright, in numinia-web]` — distance in `STD-011` |

**ARC-006 convention.** Seven types and nothing bespoke: `feat`, `fix`,
`docs`, `chore`, `refactor`, `test`, `ci`. The scope is the domain, lowercase,
usually the folder: `docs(debt): register a new entry`. Retired types (`session`,
`qa`, `standards`, `canon`, `debt`, `audit`) stay valid in old history only.

### 3.3 Traceability (PM)

| ID | Practice | Level | Check |
|---|---|---|---|
| TRC-001 | Repository "About" complete: description, website, topics | MUST | `[AUTO: API check]` |
| TRC-002 | Issue templates and a pull request template with a Definition of Done | MUST | `[AUTO: presence check]` |
| TRC-003 | Labels standardised across repositories | SHOULD | `[AUTO: label-sync]` |
| TRC-004 | `CHANGELOG.md` or releases generated from conventional commits | MUST | `[AUTO: release workflow]` |
| TRC-005 | Roadmap or TODO as a file in the repository (`STD-006`) | MUST | `[AUTO: presence check]` |

### 3.4 Ergonomics (developers)

| ID | Practice | Level | Check |
|---|---|---|---|
| DEV-001 | `.env.example` exhaustive and in sync with the env schema | MUST | `[AUTO: schema-vs-example test]` |
| DEV-002 | `dev`, `build`, `test`, `lint` mean the same in every repository | MUST | `[AUTO: template check]` |
| DEV-003 | `.editorconfig` and shared editor settings committed | SHOULD | `[AUTO: presence check]` |
| DEV-004 | Pre-commit hooks under five seconds; CI stays the authority | MUST | `[MANUAL]` — no husky: `DBT-020` |
| DEV-005 | Comments in English explaining *why*; TSDoc on every exported API | MUST | `[MANUAL]` |
| DEV-006 | Small pull requests with what, why and how to verify | SHOULD | `[MANUAL]` |
| DEV-007 | At least one approval before `main` | MUST | `[AUTO: branch protection]` |

### 3.5 Operations (SRE)

| ID | Practice | Level | Check |
|---|---|---|---|
| SRE-01 | Documented, rehearsed rollback for every deployable | MUST | `[MANUAL]` → `[AUTO]` via rehearsal job |
| SRE-02 | Health-check endpoint on every deployed service | MUST | `[AUTO: post-deploy probe]` |
| SRE-03 | Structured JSON logs; no `console.log` in production | MUST | `[AUTO: eslint no-console]` |
| SRE-04 | Runbook per service: deploy, rollback, common failures | MUST | `[MANUAL]` |
| SRE-05 | Deploy reproducible from a clean clone | MUST | `[AUTO: CI deploys from scratch]` |
| SRE-06 | Blameless postmortem per production incident | MUST | `[MANUAL]` |

### 3.6 Community (OSS maintainer)

| ID | Practice | Level | Check |
|---|---|---|---|
| OSS-01 | `CONTRIBUTING.md` a stranger can follow | MUST (public) | `[AUTO: Scorecard Contributing]` |
| OSS-02 | Code of conduct present | MUST (public) | `[AUTO: presence check]` |
| OSS-03 | DCO or CLA per the licence regime (`STD-010`) | MUST | `[MANUAL]` — no bot: `DBT-020` |
| OSS-04 | Issue triage cadence declared | SHOULD | `[MANUAL]` |
| OSS-05 | Social preview image set | SHOULD | `[MANUAL]` |

### 3.7 Digital agents

| ID | Practice | Level | Check |
|---|---|---|---|
| AGT-01 | `CLAUDE.md` at the root; first instruction: audit the branch before assuming anything | MUST | `[AUTO: presence + content check]` |
| AGT-02 | Deterministic naming and paths, so an agent never invents structure | MUST | `[MANUAL]` |
| AGT-03 | Everything normative also machine-readable: SPDX, DTCG, JSON Schema | MUST | `[MANUAL]` |
| AGT-04 | CI is the agent's feedback loop (Principle 1) | MUST | — |
| AGT-05 | Mission briefs in the standard format; a mission that produces software carries Gherkin acceptance criteria (`STD-011`) | MUST | `[MANUAL]` |
| AGT-06 | AI stance per repository in `CLAUDE.md`: autonomous versus Oracle sign-off | MUST | `[MANUAL]` |

### 3.8 Legal — by reference

Governed by `STD-010`. One operational rule here:

| ID | Practice | Level | Check |
|---|---|---|---|
| LEG-01 | Making a repository public is a gated Oracle act: licence correct, REUSE green, no secrets in history, `SECURITY.md` present | MUST | `[MANUAL]` — gate by design |

## 4. Checks

Every repository generated from the mould ships with: **OpenSSF Scorecard**
weekly and on push to `main` (target ≥ 7 on public repositories; it measures
process hygiene, not code quality; each `CLAUDE.md` declares which checks are
in scope); the **shared CI workflow** with coverage thresholds as failures and
a REUSE step; one **presence job** for `CLAUDE.md`, `SECURITY.md`,
`CONTRIBUTING.md`, CODEOWNERS, templates, `.env.example` and About fields; and
**local hooks** that are courtesy, skippable, never the authority.

Rules about the guards themselves (moved from `STD-009`; identifiers kept):

| ID | Rule | Verified by |
|---|---|---|
| **CORE-31** | A rule that does not break the build does not exist for an agent. | `[MANUAL]` — this table is the check |
| **CORE-32** | A guard is wired into the pipeline in the same change that writes it. | `[MANUAL]` — no guard register exists; `DBT-017` holds the nearest gap |
| **CORE-33** | The guard register is read from the workflow file, never remembered. | `[MANUAL]` — pending the guard register |
| **CORE-34** | A baseline records damage that predates its rule and never absorbs damage the current change caused. | `[MANUAL]` |
| **CORE-35** | A green pipeline is not a clean tree; a change declares what it left behind. | `[MANUAL]` |
| **CORE-66** | A guard that fails on a behaviour no axis document states is itself the defect: correct the guard or write the rule, never the tree. | `[MANUAL]` |

## 5. Conformance

| Check | Rule | Verified by |
|---|---|---|
| `EN-01` | Every practice carries an ID and an `[AUTO]`/`[MANUAL]` marker | `[MANUAL]` — a reader confirms every row |
| `EN-02` | Every `[AUTO]` practice names the job or script that runs it | `[MANUAL]` — no guard cross-checks the tables against `.github/workflows/` |
| `EN-03` | The guard rules are honoured by every script in `scripts/` | `[MANUAL]` — a guard register would make this mechanical; none is planned |

Nothing in this standard fails a build in this repository today. It is
enforced by reading, and by the checks it describes running elsewhere.

## 6. What this standard does NOT do

It does not govern documents: naming, versioning, headers and filing are
`STD-004` and `STD-009`. It does not license anything: `STD-010`. It does not
adopt external frameworks: naming Scorecard or REUSE here claims nothing about
distance — that ledger is `STD-011`. It does not say how an agent applies it
to a task: `PRO-016`. It does not enforce itself, and it has been unratified
since 2026-08-17 while five documents cite it as binding (`DBT-021`).

## 7. References

| ID | Title | Relation |
|---|---|---|
| `STD-009` | Core rules | the corpus law this standard sits under; `CORE-31`–`CORE-35`, `CORE-66` came from it |
| `STD-010` | Licensing | the regimes and gates this standard cites |
| `STD-011` | External standards | distance to Scorecard, OpenSSF and the rest |
| `STD-004` | The header in three rings | the document law this standard leaves alone |
| `PRO-016` | Applying the engineering standard | the procedure that lived in this file |
| `DBT-020` | Declared automatic, executed by nobody | the `[MANUAL]` rows that claim otherwise |
| `DBT-021` | Draft binds as hard as active | the ratification this standard still lacks |
