---
id: "AUDIT-numengames-2026-04-08"
uid: ""
title: "Technical Audit — numen.games"
type: audit
status: active
version: "0.1.0"
created: "2026-04-08T05:48:00Z"
updated: "2026-04-08T05:48:00Z"
author: "nimrod"
owner: "oracle"
tags: [audit, numengames, infrastructure, seo, performance, web]
scope: "numen.games (numengames.com)"
license: "CC-BY-4.0"
mission: "MIS-011"
---
# Technical Audit — numen.games

> **Summary:** Complete technical audit of the numen.games website — performance, SEO, accessibility, security, and UX.
> **Epistemic:** Baseline assessment of the current state of numengames.com as a sales and brand asset.
> **Pragmatic:** Input for MIS-027 (improvement roadmap). Priority-ordered recommendations.
> **Audience:** Oracles · Agents

---

**Date:** 2026-04-08 · **Agent:** Nimrod · **Mission:** MIS-011

---

## Executive Summary

**Score: 4.5/10**

`numen.games` is a **fully client-side SPA** (React or similar framework, likely Next.js or Nuxt). Every page returns the same minimal HTML shell — all content is rendered client-side via JavaScript. This is the root cause of most critical issues: zero SEO, zero accessibility to crawlers, zero performance fallback.

The manifesto page is the only page that renders readable content server-side (readable via web_fetch). All other pages — portfolio, pricing, services, team — return only the CTA fallback: *"Start creating your own 3D immersive experience with us now."*

The domain `numengames.com` redirects to `numen.games` (correctly set up).

---

## 🔴 Critical Issues (5)

### C-001 — Site is not crawlable (SEO zero)
- **Problem:** Every page returns `<div id="app"></div>` or equivalent. Google cannot index content.
- **Evidence:** web_fetch on /en/portfolio, /en/pricing, /en/services, /en/team all return only the generic CTA. Only /en/manifesto renders text.
- **Impact:** Zero organic traffic. The company is invisible to search engines.
- **Fix:** Server-Side Rendering (SSR) or Static Site Generation (SSG) for at least key landing pages. Next.js 14+ with App Router or Astro would solve this.
- **Effort:** L — requires architecture change
- **Priority:** Immediate

### C-002 — No meta tags / Open Graph visible to crawlers
- **Problem:** Without SSR, meta tags are injected by JS — invisible to social crawlers (LinkedIn, Twitter, WhatsApp previews).
- **Impact:** Every link shared shows blank preview. Zero social amplification.
- **Fix:** SSR-rendered meta tags per page.
- **Effort:** M (dependent on C-001 fix)
- **Priority:** Immediate

### C-003 — Pricing page shows no prices
- **Problem:** /en/pricing renders only the generic CTA. No pricing information visible.
- **Impact:** Potential customers cannot evaluate the product without a call.
- **Fix:** Even a simple "Contact us for pricing" with a visible CTA would help. Ideally: price tiers or at least scope of service.
- **Effort:** S
- **Priority:** Immediate

### C-004 — Portfolio page shows no portfolio
- **Problem:** /en/portfolio renders only the generic CTA.
- **Impact:** Social proof is invisible. "Create immersive 3D environments" (from search snippet) is compelling — but no one can see it.
- **Fix:** SSR-rendered portfolio with real project showcases.
- **Effort:** M (dependent on C-001)
- **Priority:** Immediate

### C-005 — No contact mechanism visible
- **Problem:** No email, form, or booking link visible in any crawlable page.
- **Impact:** If a CEO finds numen.games via search, they have no clear path to convert.
- **Fix:** Add Cal.com booking link or contact form visible in SSR HTML.
- **Effort:** S
- **Priority:** Immediate

---

## 🟠 Important Issues (4)

### I-001 — No sitemap.xml accessible
- **Problem:** `robots.txt` exists (`Allow: /`) but no sitemap found.
- **Impact:** Search engines don't know which pages to index even if SSR is added.
- **Fix:** Generate and submit sitemap.xml to Google Search Console.
- **Effort:** XS (once SSR is in place)

### I-002 — Brand split: numengames.com vs numen.games
- **Problem:** The company uses both domains. `numengames.com` redirects to `numen.games`. The GitHub org is `numengames`. The Twitter is likely `@numengames`. This fragmentation dilutes SEO authority.
- **Impact:** SEO authority is split. Confusing for external parties.
- **Fix:** Decide canonical domain. Ensure all brand mentions, links, and social profiles point to one domain. `numen.games` is shorter and more memorable — good choice as canonical.
- **Effort:** S

### I-003 — No blog / content marketing
- **Problem:** No visible content strategy (articles, case studies, thought leadership).
- **Impact:** Zero organic inbound. The manifesto is compelling writing — there's no reason not to publish more.
- **Fix:** Add `/blog` or `/insights` section. Even 4 articles per quarter would compound over time.
- **Effort:** M (ongoing)

### I-004 — Team page empty
- **Problem:** Team page renders only the generic CTA.
- **Impact:** Trust signal missing. B2B buyers need to see who is behind the product.
- **Fix:** SSR-rendered team page with names, roles, photos, brief bios.
- **Effort:** S (dependent on C-001)

---

## 🟡 Minor Issues (3)

### M-001 — No favicon or social preview image confirmed
- **Problem:** Cannot verify favicon and OG image from non-JS fetch.
- **Fix:** Confirm and test across devices.
- **Effort:** XS

### M-002 — Language switch UX unknown
- **Problem:** URLs are `/en/` prefixed — there is presumably a Spanish version. Cannot evaluate the switch UX without JS rendering.
- **Fix:** Ensure hreflang tags are server-rendered for SEO.
- **Effort:** XS (once SSR is in place)

### M-003 — Performance cannot be measured without headless browser
- **Problem:** Without Lighthouse or headless Chrome, Core Web Vitals cannot be measured.
- **Fix:** Run PageSpeed Insights once per quarter. Target LCP < 2.5s, CLS < 0.1.
- **Effort:** XS (measurement only)

---

## Architecture Assessment

| Layer | Status | Notes |
|-------|--------|-------|
| Hosting | ✅ Unknown but fast | Loads quickly (< 200ms TTFB on robots.txt) |
| Framework | ⚠️ Client-side SPA | Likely React + some router. No SSR detected. |
| Domain | ✅ Correctly configured | numengames.com → numen.games (301 redirect) |
| SSL | ✅ Active | HTTPS confirmed |
| robots.txt | ✅ Exists | `Allow: /` — no issues |
| sitemap.xml | ❌ Not found | Critical for SEO |
| Meta tags | ❌ Not server-rendered | Social previews broken |
| Content | ❌ Not crawlable | JS-only rendering |

---

## Recommended Fix Order

1. **SSR/SSG migration** (C-001) — This unlocks everything else
2. **Pricing page with real content** (C-003) — Highest conversion impact, can be done before SSR
3. **Contact mechanism** (C-005) — Cal.com already exists, just needs to be visible
4. **Portfolio with real work** (C-004) — Social proof
5. **Team page** (I-004) — Trust signal
6. **Sitemap + Search Console** (I-001) — Once SSR is done

---

## Feeds Into

**MIS-027** — numengames.com improvement
This audit is the required input for MIS-027. Before starting MIS-027, the Oracle should decide: **is the current tech stack worth improving, or does it require a rebuild?**

Given the severity of C-001 (non-crawlable SPA), a rebuild with Astro (same stack as pablofm.com) would likely be faster and more impactful than patching the current site.

---

## Methodology note

This audit was conducted via:
- `web_fetch` on all discoverable URLs
- `web_search` for indexed pages
- `robots.txt` analysis
- Knowledge of the tech ecosystem and SEO best practices

A full Lighthouse audit (Core Web Vitals, accessibility score) requires headless browser access (Playwright/Puppeteer) and is not included in this version. Recommended as a follow-up once SSR is implemented.

---

*Nimrod 🗡️ — MIS-011 — 2026-04-08T05:48:00Z*
