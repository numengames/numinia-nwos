---
id: "MIS-063"
uid: ""
title: "NWOS Phase 2 — Iteration 1: Deploy Form at /velo"
type: mission
status: done
version: "1.0.0"
created: "2026-04-07T22:55:00Z"
updated: "2026-04-07T23:00:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [nwos, pablofm-web, github-api, astro, react, product]
license: "CC-BY-4.0"
area: "Product"
guild: "Alchemists"
mission_id: "MIS-063"
priority: "critical"
effort: "M"
type_execution: "digital"
assigned_to: "nimrod"
requested_by: "oracle"
started: "2026-04-07T22:55:00Z"
completed: "2026-04-07T22:59:00Z"
---
# MIS-063 — NWOS Phase 2: Iteration 1 — Deploy Form at /velo

> **Summary:** First iteration of the NWOS Phase 2 go-online pipeline. CEO visits /velo, fills a form, clicks Deploy — a personalized GitHub repo is created in the org.
> **Epistemic:** Hybrid rendering in Astro allows static pages + server-side API routes in the same site. Islands architecture ships zero JS until needed.
> **Pragmatic:** The NWOS product pipeline now has a live entry point. One click creates a client workspace.
> **Audience:** Agents · Oracles

---

**Area:** Product · **Guild:** Alchemists · **Type:** 🤖 Digital · **Priority:** 🔴 Critical · **Effort:** M

---

## Story

As Pablo, I want a CEO to visit pablofm.com/velo, fill in their company name and email, click "Deploy Workspace", and have a personalized GitHub repo created automatically in the numen-games-nwos-orgs organization — so the NWOS product pipeline has a live entry point.

---

## Acceptance criteria

- [x] `octokit` and `@astrojs/vercel` installed
- [x] `astro.config.mjs` configured with `output: "hybrid"` and Vercel adapter
- [x] `/api/registro` endpoint created (SSR, `prerender = false`)
- [x] `DeployForm.tsx` React island with loading/success/error states
- [x] `/velo` page updated: star field hero preserved + deploy form section added
- [x] Follows DESIGN.md design system throughout
- [x] No other pages touched
- [x] Pushed to production (pablofm.com via Vercel)

---

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

---

*Nimrod 🗡️ — 2026-04-07*
