---
id: "BP-numengames-improvement-roadmap"
uid: ""
title: "numen.games — Improvement Roadmap"
type: blueprint
status: active
version: "0.1.0"
created: "2026-04-08T06:00:00Z"
updated: "2026-04-08T06:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [numengames, web, seo, improvement, roadmap, content]
area: "Content"
license: "CC-BY-4.0"
mission: "MIS-027"
input: "blueprints/AUDIT-numengames-2026-04-08.md"
---# BP — numen.games Improvement Roadmap

> **Summary:** Concrete improvement plan for numen.games based on the MIS-011 technical audit (score 4.5/10).
> **Epistemic:** The audit identified one root cause (non-crawlable SPA) that blocks all other improvements. This plan sequences fixes by impact.
> **Pragmatic:** A prioritized roadmap Oracle and agents can execute. Estimated effort per phase.
> **Audience:** Oracles · Agents (Ursa when active)

---

**Input:** [AUDIT-numengames-2026-04-08](AUDIT-numengames-2026-04-08.md) · Score 4.5/10
**Target score:** 8.5/10 after Phase 3

---

## Architecture decision — Rebuild vs patch

**Recommendation: Rebuild with Astro**

| Option | Pros | Cons |
|--------|------|------|
| **Patch current SPA** | No migration | SSR requires Next.js or Nuxt refactor anyway. Still complex. |
| **Rebuild with Astro** ✅ | Same stack as pablofm.com (team knows it). Static by default. SSR opt-in. Fast. SEO-ready. | Migration effort (~1 sprint). |

**Rationale:** The current site is a 62-byte HTML shell. There is no content to preserve. A rebuild with Astro takes ~1-2 weeks and results in a maintainable, SEO-ready, fully crawlable site. Patching the SPA would take similar effort for worse results.

**Decision:** Rebuild with Astro 5 + Tailwind + shadcn/ui (same stack as pablofm.com).
This decision should be confirmed by Oracle before Phase 1 begins.

---

## Phase 0 — Quick wins (no rebuild needed) · 1-2 days

These can be done immediately, before any architecture decision.

| Fix | Addresses | Effort | Owner |
|-----|-----------|--------|-------|
| Add Cal.com booking link to current site | C-005 (no contact) | XS | Nimrod |
| Add visible email/contact in current HTML | C-005 | XS | Nimrod |
| Decision: canonical domain (numen.games vs numengames.com) | I-002 | XS | Oracle |

**Expected score lift:** 4.5 → 5.5/10

---

## Phase 1 — Rebuild with Astro · 1-2 weeks

**Goal:** Replace the SPA with a crawlable, SSR-ready Astro site.

### Pages to build (priority order)

| Page | URL | Content | SEO priority |
|------|-----|---------|-------------|
| Home | `/` | Hero + value prop + CTA | 🔴 Critical |
| Services | `/services` | What Numen Games does + 3D worlds | 🔴 Critical |
| Pricing | `/pricing` | Plans or "contact for pricing" | 🔴 Critical |
| Portfolio | `/portfolio` | 3-5 real client projects | 🟠 High |
| Team | `/team` | 5 Oracles + brief bios | 🟠 High |
| Manifesto | `/manifesto` | Existing content (already readable) | 🟡 Medium |
| Contact | `/contact` | Cal.com embed + email | 🔴 Critical |

### Technical requirements

```
- Astro 5 + output: "hybrid" (static pages, contact form SSR)
- Tailwind CSS + shadcn/ui
- i18n: /en/ and /es/ routes (existing content in EN)
- SSR meta tags per page (Open Graph, Twitter Card)
- sitemap.xml auto-generated
- robots.txt
- Vercel deploy (same pipeline as pablofm.com)
- Analytics: Umami (same instance as pablofm.com)
```

### Content needed from Oracle

| Content | For | Status |
|---------|-----|--------|
| 3-5 portfolio case studies (client name, brief, result) | /portfolio | ❌ Needed |
| Team bios + photos for 5 Oracles | /team | ❌ Needed |
| Pricing model or "contact us" decision | /pricing | ❌ Decision needed |
| Service descriptions (3D worlds, gamification, NWOS) | /services | ⚠️ Partially exists |

**Expected score lift:** 5.5 → 7.5/10

---

## Phase 2 — Content & SEO · Ongoing

**Goal:** Make numen.games discoverable and compelling.

| Action | Effort | Cadence |
|--------|--------|---------|
| Submit sitemap to Google Search Console | XS | Once |
| Publish 4 articles/quarter (blog or insights) | M | Quarterly |
| LinkedIn company page active | S | Weekly |
| X/Twitter activation (MIS-026) | S | Weekly |
| Google Analytics or Umami setup | XS | Once |
| PageSpeed audit + Core Web Vitals check | XS | Quarterly |

**Expected score lift:** 7.5 → 8.5/10

---

## Phase 3 — NWOS integration · Future

**Goal:** numen.games becomes the entry point for NWOS product.

| Action | Dependency |
|--------|-----------|
| Add `/velo`-equivalent page on numen.games | MIS-063 (pablofm.com/velo) done ✅ |
| NWOS product page with demo form | NWOS Phase 2 complete |
| Client workspace showcase | NWOS Phase 3 |
| Numinia universe exploration | numinia.store integration |

---

## Effort summary

| Phase | Effort | Blocking | Owner |
|-------|--------|----------|-------|
| Phase 0 — Quick wins | 1-2 days | Nothing | Nimrod |
| Phase 1 — Rebuild | 1-2 weeks | Oracle content + decision | Ursa (when active) / Nimrod |
| Phase 2 — Content | Ongoing | Phase 1 | Oracle + Nimrod |
| Phase 3 — NWOS integration | TBD | NWOS Phase 2-3 | All agents |

---

## Open questions for Oracle

1. **Rebuild confirmed?** Astro rebuild vs patching current SPA
2. **Canonical domain:** numen.games or numengames.com?
3. **Portfolio content:** Which 3-5 projects can be showcased?
4. **Pricing model:** Show prices, tiers, or "contact us"?
5. **Team photos:** Available for the 5 Oracles?

---

## Version history

| Version | Date | Change |
|---------|------|--------|
| 0.1.0 | 2026-04-08T06:00:00Z | Initial creation — MIS-027. Based on MIS-011 audit. |

---

*Nimrod 🗡️ — Numen Games — CC0 1.0*
