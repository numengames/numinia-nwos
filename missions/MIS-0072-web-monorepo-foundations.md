---
id: "MIS-072"
uid: ""
title: "numinia-web foundations: monorepo, domain model, quality floor"
status: done
priority: "critical"
effort: "L"
guild: "Alchemists"
territory: "Platform"
type_execution: "digital"
assigned_to: null
completed: null

type: mission
version: "1.0.0"
created: "2026-08-17T18:59:03Z"
created_source: "git:b484b68"
created_confidence: exact
updated: "2026-08-17T18:59:03Z"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, foundations]
license: "CC0-1.0"
---

> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-000-report.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# MISSION-000 Completion Report — Monorepo Foundations

> **For humans.** Mission report: the foundations — monorepo, domain model, quality floor, and the decision-gate spike.
>
> **Epistemic value.** Resolves what the rebuild stands on and which hypotheses were validated with evidence.
> **Pragmatic value.** Its acceptance criteria remain the baseline contracts for the whole platform.
> **In the system.** Observes: the Oracle's MISSION-000 spec. Regulates: foundations. Coupled to: docs/status.md, features/.
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

> Status: ✅ Done (with explicit deferrals below) · Date: 2026-08-15
> Executed by: Claude (Digital Agent) · Approved plan: docs/mission-000-plan.md

## Learning Outcome (Epistemic Value — hypothesis validated)

**Hypothesis:** Astro + Turborepo + React islands can host Three.js/VRM rendering without configuration friction.

**Validated — DECISION GATE PASSED.** A real VRM avatar from `numinia-digital-goods-data` renders inside a `client:visible` React island on Astro 7; Playwright verifies hydration and non-empty framebuffer pixels (983 ms test). The only friction found was test-side, not architecture-side: `preserveDrawingBuffer` must be enabled to assert pixels, and `readPixels` must scan the full buffer (transparent corners read as zero). No Next.js fallback is needed.

Secondary learnings:

1. **The registry outruns the constitution.** "Astro 5" (April) is Astro 7 (August). Pinning doc-named majors creates instant debt — ADR-015 adopts "current stable" with the gate as safety net.
2. **Fail-closed is cheap when it is designed in.** The env validator crashes the build naming the variable before any server binds; proving it took one pure function and one Gherkin scenario — the legacy needed none of its 173 tests to notice it failed open.
3. **Acceptance tests against real artifacts are viable at zero infrastructure cost.** Cucumber steps assert the actual SSG output, the actual validator, and the actual lint gate; no re-implementations (anti-tautology rule held).

## Acceptance criteria — verified

| Scenario                          | Evidence                                                                                                                                                                                             |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clean clone reproducibility       | `npm ci` green; `npm audit --omit=dev --audit-level=high` → **0 vulnerabilities** (audit runs in CI, blocking)                                                                                       |
| Quality pipeline blocks bad code  | Gherkin scenario runs the real ESLint gate on a fixture with `any` + `console.log` → non-zero exit, file and line:col reported                                                                       |
| Environment validation fails fast | `astro build` without `GITHUB_REPO_OWNER` dies naming the variable; Gherkin covers crash + success paths                                                                                             |
| Domain framework-agnostic         | `@numinia/domain` runtime deps = `zod` only (ADR-009); no React/Astro/viem imports in src                                                                                                            |
| Domain fully covered              | **57 tests, 100% statements/branches/functions/lines**, per-file thresholds; every guild/faction/rank/species/district/competence/archetype/humor constant carries all five locales (dedicated test) |
| i18n routing                      | `/`, `/es/`, `/ja/`, `/ko/`, `/pt-br/` all built, each with its own `<html lang>` (Gherkin outline, 5 examples)                                                                                      |
| Spike — VRM in island             | Playwright: island hydrates via `client:visible`, `data-vrm-loaded="true"`, real pixels in framebuffer                                                                                               |
| Spike — SIWE in endpoint          | Real key end-to-end: nonce (httpOnly) → sign → verify **200** + session cookie; tampered signature **401**; missing nonce **401**; nothing persisted                                                 |
| Spike — data from GitHub          | Build-time fetch of the real catalog (9 assets) validated by the domain Zod schema; invalid entry kills the build naming the index                                                                   |

Pipeline: **16/16 turbo tasks green** across 4 workspaces; **8/8 Gherkin scenarios**, 31/31 steps.

## What was NOT done (Rule 8 — honest gaps)

1. **No deploy.** The "deploys an empty page to Vercel/Cloudflare" criterion is **deferred by Oracle order** (2026-08-15: "no vamos a desplegar nada"). Deploy + license decision (D11) happen together when the GitHub remote is created.
2. **Tailwind 4 not yet integrated.** Tokens shipped as plain CSS variables (`@numinia/ui/tokens.css`, all `/* PROVISIONAL */`); the constitution's Tailwind-consuming-tokens setup moves to Phase 1, where the first real UI needs it.
3. **Six type files deferred to Phase 1** (season, portal, equipment, linguistic, mission, character-sheet) — approved deviation; no Phase 0 scenario needed them.
4. **Playwright/Cucumber are not turbo tasks.** Acceptance runs via root `npm run test:acceptance` (wired into CI); the VRM e2e runs via `npx playwright test` in `apps/store`. Folding them into the turbo graph is Phase 1 housekeeping.
5. **JA/KO/PT-BR strings are machine-grade.** All populated, none natively reviewed (open-questions D9).
6. **SIWE spike is EOA-only.** Local signature recovery, no EIP-1271 contract wallets, no session signing/expiry policy — all deliberately left to the ADR-006 dedicated session. The spike proves the mechanism, not the product auth.
7. **CI has never run on GitHub** (no remote yet). The workflow is committed and mirrors the local pipeline exactly, but "CI green on `main`" is unverifiable until the push.
8. **`branch protection rules`** (TODO 0.6, biological task) pending remote creation.

## Autonomous decisions recorded

ADR-014 (22-permission reconstruction), ADR-015 (Astro 7). Both flagged for Oracle review.

## Commit trail

18 commits on `main`, one criterion per commit, `[track] type(scope)` format — from `7530405` (gitignore) to `0f46727` (spike, gate passed).
