---
id: "MIS-063"
uid: ""
title: "NWOS Phase 2 — Iteration 1: Deploy Form at /velo"
status: done
priority: "critical"
effort: "M"
guild: "Alchemists"
territory: "Product"
type_execution: "digital"
assigned_to: "nimrod"
started: "2026-04-07T22:55:00Z"
completed: "2026-04-07T22:59:00Z"

type: mission
version: "1.0.1"
created: "2026-04-07T22:55:00Z"
created_source: "git:749f75c"
created_confidence: inferred
updated: "2026-09-02T01:48:11+02:00"
author: "pablo-fm"
owner: "oracle"
requested_by: "oracle"
tags: [nwos, pablofm-web, github-api, astro, react, product]
license: "CC0-1.0"
---
# MIS-063 — NWOS Phase 2: Iteration 1 — Deploy Form at /velo

> **Summary:** First iteration of the NWOS Phase 2 go-online pipeline. CEO visits /velo, fills a form, clicks Deploy — a personalized GitHub repo is created in the org.
> **Epistemic:** Hybrid rendering in Astro allows static pages + server-side API routes in the same site. Islands architecture ships zero JS until needed.
> **Pragmatic:** The NWOS product pipeline now has a live entry point. One click creates a client workspace.
> **Audience:** Agents · Oracles

## Story

As Pablo, I want a CEO to visit pablofm.com/velo, fill in their company name and email, click "Deploy Workspace", and have a personalized GitHub repo created automatically in the numen-games-nwos-orgs organization — so the NWOS product pipeline has a live entry point.

## Acceptance criteria

- [x] `octokit` and `@astrojs/vercel` installed
- [x] `astro.config.mjs` configured with `output: "hybrid"` and Vercel adapter
- [x] `/api/registro` endpoint created (SSR, `prerender = false`)
- [x] `DeployForm.tsx` React island with loading/success/error states
- [x] `/velo` page updated: star field hero preserved + deploy form section added
- [x] Follows DESIGN.md design system throughout
- [x] No other pages touched
- [x] Pushed to production (pablofm.com via Vercel)

## Execution

**Delivered:**
- `astro.config.mjs` — hybrid mode + Vercel adapter
- `src/pages/api/registro.ts` — SSR endpoint, creates GitHub repo from template, personalizes placeholders
- `src/components/DeployForm.tsx` — React island, `client:visible`
- `src/pages/velo.astro` — updated with form section below star field

**PR/commit:** `9c0e9e3` — `feat(nwos): Iteration 1 — NWOS deploy form at /velo`

**Pending (requires Pablo):**
- Add env vars in Vercel: `GITHUB_TOKEN`, `GITHUB_ORG`, `GITHUB_TEMPLATE_REPO`

**Agent:** Nimrod
**Closed:** 2026-04-07

**Reference:** `nwos-phase2-guide.md` (provided by Pablo via Telegram)

*Nimrod 🗡️ — 2026-04-07*

## Version history

- v1.0.1 (2026-09-02) — Form: inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed. missions/ normalisation, lot 2.
