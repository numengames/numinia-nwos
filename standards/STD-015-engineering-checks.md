---
id: "STD-015"
uid: ""
title: "Engineering checks"
type: documentation
subtype: register
status: draft
version: "1.1.0"
created: "2026-08-17T21:55:38+02:00"
updated: "2026-09-09T12:30:00+02:00"
author: "pablofm"
owner: "oracle"
territory: "Platform"
tags: [standards, engineering, ci, register, practices]
license: "CC0-1.0"
series_change: "1.0.0 — new register, split from STD-005 under ADR-043: the eight practice tables of the old §3 as one table. 52 rows unchanged; plates padded to three digits (SRE-01 -> SRE-001, OSS-, AGT-, LEG- likewise). The EN-01..03 conformance rows are gone: no guard ran them and no document cited them."
---

# Engineering checks

> **Summary:** The 52 practices `STD-005` requires, by profile, each with its
> level and the machine that checks it. `[MANUAL]` is debt; a `[MANUAL]` row
> naming `DBT-020` is declared automatic and executed by nobody.

| Profile | Plate | Practice | Level | Check |
|---|---|---|---|---|
| Security | SEC-001 | 2FA enforced at organisation level | MUST | `[AUTO: org settings + Scorecard]` |
| Security | SEC-002 | Secret scanning and push protection on every repository | MUST | `[AUTO: GitHub settings]` |
| Security | SEC-003 | Dependabot alerts and security updates on; merge only on green CI | MUST | `[AUTO: Dependabot + CI]` |
| Security | SEC-004 | No secret files in git history; secrets in GitHub Environments scoped `pre`/`prod` | MUST | `[AUTO: push protection + gitleaks]` |
| Security | SEC-005 | Cloud deploy auth via OIDC, no long-lived tokens | MUST | `[MANUAL]` → `[AUTO]` via Terraform policy |
| Security | SEC-006 | Personal access tokens fine-grained, minimum scope, expiring, one per purpose | MUST | `[MANUAL]` |
| Security | SEC-007 | Third-party Actions pinned by commit SHA | MUST | `[AUTO: Scorecard Pinned-Dependencies]` |
| Security | SEC-008 | Workflow tokens read-only by default; write granted per job | MUST | `[AUTO: Scorecard Token-Permissions]` |
| Security | SEC-009 | `SECURITY.md` with disclosure policy in every public repository | MUST | `[AUTO: Scorecard Security-Policy]` |
| Security | SEC-010 | CODEOWNERS covering `LICENSE*`, `.github/workflows/`, auth packages | MUST | `[AUTO: presence check]` |
| Security | SEC-011 | Organisation base permission read; admin per repository, per need | MUST | `[MANUAL]` |
| Security | SEC-012 | Commits to `main` verified | SHOULD | `[AUTO: branch protection]` |
| Architecture | ARC-001 | Identical CI pipeline everywhere: `type-check → lint → test → build`; exceptions live in rule severity, never in steps | MUST | `[AUTO: shared workflow]` |
| Architecture | ARC-002 | Branch protection on `main`: pull request and status checks required, no force push | MUST | `[AUTO: Scorecard Branch-Protection]` |
| Architecture | ARC-003 | Licence per the `STD-010` trichotomy; REUSE 3.3 compliance | MUST | `[MANUAL]` — `DBT-020` |
| Architecture | ARC-004 | Executable README: clone to green tests in under five minutes; CI and coverage badges | MUST | `[MANUAL]` → `[AUTO]` via smoke script |
| Architecture | ARC-005 | ADRs in `docs/decisions/`, one decision per file | MUST | `[MANUAL]` |
| Architecture | ARC-006 | Conventional commits, semver tags, GitHub Releases with notes | MUST | `[MANUAL]` — no commitlint: `DBT-020` |
| Architecture | ARC-007 | Infrastructure declarative only: Terraform and containers | MUST | `[MANUAL]` → `[AUTO]` via drift detection |
| Architecture | ARC-008 | Shared base config (tsconfig, eslint, prettier) imported from one package, never copied | MUST | `[AUTO: lint rule / knip]` |
| Architecture | ARC-009 | Dependencies reviewed before adoption: maintained, compatibly licensed, Scorecard consulted | SHOULD | `[MANUAL]` |
| Architecture | ARC-010 | WCAG 2.2 AA on every public route; tab order matches visual order; focus ring visible | MUST | `[AUTO: axe-core + Playwright, in numinia-web]` — distance in `STD-011` |
| Traceability | TRC-001 | Repository "About" complete: description, website, topics | MUST | `[AUTO: API check]` |
| Traceability | TRC-002 | Issue templates and a pull request template with a Definition of Done | MUST | `[AUTO: presence check]` |
| Traceability | TRC-003 | Labels standardised across repositories | SHOULD | `[AUTO: label-sync]` |
| Traceability | TRC-004 | `CHANGELOG.md` or releases generated from conventional commits | MUST | `[AUTO: release workflow]` |
| Traceability | TRC-005 | Roadmap or TODO as a file in the repository (`STD-006`) | MUST | `[AUTO: presence check]` |
| Traceability | TRC-006 | A guard is verified by its step in the job, never by the run's colour: a green run and a workflow missing the guard are indistinguishable from the conclusion | MUST | `[MANUAL]` |
| Traceability | TRC-007 | Every guard declares what it does not look at, on success as on failure (`scripts/blind-spots.json`); a guard that validates what is present cannot detect what is missing | MUST | `[AUTO: blindness.test.mjs]` |
| Ergonomics | DEV-001 | `.env.example` exhaustive and in sync with the env schema | MUST | `[AUTO: schema-vs-example test]` |
| Ergonomics | DEV-002 | `dev`, `build`, `test`, `lint` mean the same in every repository | MUST | `[AUTO: template check]` |
| Ergonomics | DEV-003 | `.editorconfig` and shared editor settings committed | SHOULD | `[AUTO: presence check]` |
| Ergonomics | DEV-004 | Pre-commit hooks under five seconds; CI stays the authority | MUST | `[MANUAL]` — no husky: `DBT-020` |
| Ergonomics | DEV-005 | Comments in English explaining *why*; TSDoc on every exported API | MUST | `[MANUAL]` |
| Ergonomics | DEV-006 | Small pull requests with what, why and how to verify | SHOULD | `[MANUAL]` |
| Ergonomics | DEV-007 | At least one approval before `main` | MUST | `[AUTO: branch protection]` |
| Operations | SRE-001 | Documented, rehearsed rollback for every deployable | MUST | `[MANUAL]` → `[AUTO]` via rehearsal job |
| Operations | SRE-002 | Health-check endpoint on every deployed service | MUST | `[AUTO: post-deploy probe]` |
| Operations | SRE-003 | Structured JSON logs; no `console.log` in production | MUST | `[AUTO: eslint no-console]` |
| Operations | SRE-004 | Runbook per service: deploy, rollback, common failures | MUST | `[MANUAL]` |
| Operations | SRE-005 | Deploy reproducible from a clean clone | MUST | `[AUTO: CI deploys from scratch]` |
| Operations | SRE-006 | Blameless postmortem per production incident | MUST | `[MANUAL]` |
| Community | OSS-001 | `CONTRIBUTING.md` a stranger can follow | MUST (public) | `[AUTO: Scorecard Contributing]` |
| Community | OSS-002 | Code of conduct present | MUST (public) | `[AUTO: presence check]` |
| Community | OSS-003 | DCO or CLA per the licence regime (`STD-010`) | MUST | `[MANUAL]` — no bot: `DBT-020` |
| Community | OSS-004 | Issue triage cadence declared | SHOULD | `[MANUAL]` |
| Community | OSS-005 | Social preview image set | SHOULD | `[MANUAL]` |
| Agents | AGT-001 | `CLAUDE.md` at the root; first instruction: audit the branch before assuming anything | MUST | `[AUTO: presence + content check]` |
| Agents | AGT-002 | Deterministic naming and paths, so an agent never invents structure | MUST | `[MANUAL]` |
| Agents | AGT-003 | Everything normative also machine-readable: SPDX, DTCG, JSON Schema | MUST | `[MANUAL]` |
| Agents | AGT-004 | CI is the agent's feedback loop (Principle 1) | MUST | — |
| Agents | AGT-005 | Mission briefs in the standard format; a mission that produces software carries Gherkin acceptance criteria (`STD-011`) | MUST | `[MANUAL]` |
| Agents | AGT-006 | AI stance per repository in `CLAUDE.md`: autonomous versus Oracle sign-off | MUST | `[MANUAL]` |
| Legal | LEG-001 | Making a repository public is a gated Oracle act: licence correct, REUSE green, no secrets in history, `SECURITY.md` present | MUST | `[MANUAL]` — gate by design |

**ARC-006 convention.** Seven types, nothing bespoke: `feat`, `fix`, `docs`,
`chore`, `refactor`, `test`, `ci`. Scope is the domain, lowercase, usually the
folder. Retired types (`session`, `qa`, `standards`, `canon`, `debt`, `audit`)
stay valid in old history only.

**What a repository born from the mould ships with.** OpenSSF Scorecard weekly
and on push to `main` (target ≥ 7 on public repositories; each `CLAUDE.md`
declares which checks are in scope); the shared CI workflow with coverage
thresholds as failures and a REUSE step; one presence job for `CLAUDE.md`,
`SECURITY.md`, `CONTRIBUTING.md`, CODEOWNERS, templates, `.env.example` and
About fields; local hooks that are courtesy, skippable, never the authority.
