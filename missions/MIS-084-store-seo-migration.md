---
id: "MIS-084"
title: "numinia.store → numinia.com: SEO migration and legacy shutdown"
type: mission
status: frozen
version: "1.0.0"
created: "2026-08-17T18:59:03Z"
created_source: "git:b484b68"
created_confidence: exact
updated: "2026-08-17T18:59:03Z"
author: "claude-fable-5"
owner: "oracle"
tags: [web, seo, infra]
license: "CC-BY-4.0"
mission_id: "MIS-084"
territory: "Platform"
guild: "Alchemists"
type_execution: "digital"
priority: "high"
effort: "S"
---

> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-030-store-seo-migration.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# 🪐 MISSION-030 — numinia.store → numinia.com: SEO migration & legacy shutdown

(Redirect the legacy domain, transfer its search equity, retire the Vercel deployment, and fix the SIWE domain mismatch.)

---

> **Agent type:** 🔀 Hybrid
>
> **Priority:** 🟠 High
>
> **Estimated effort:** S
>
> **Status:** 📋 Backlog
>
> **Assigned to:** unassigned (parked by Oracle order, 2026-08-16)
>
> **Guild / House:** Procurators / Heralds (the city's outward voice)

---

## 📝 Subtitle (Brief Context)

numinia.store (legacy v0.15.0 line, still live on Vercel) competes with numinia.com in search results; its equity must transfer via 301 before the domain is allowed to die.

## 📖 Story Statement / Description

As the Oracle, I want numinia.store to permanently redirect to numinia.com and the legacy deployment retired, so that the search authority accumulated by the old store transfers to the platform instead of splitting or vanishing.

## 🧠 Epistemic Value

- **Hypothesis:** numinia.store holds meaningful indexed pages/backlinks (CC0 avatar community era) whose equity a 301 + Search Console change-of-address will transfer to numinia.com within ~1 year.
- **Validation method:** Search Console data for numinia.store BEFORE the redirect (clicks, impressions, external links) — this measurement also decides whether the domain renewal is worth it at all. After: numinia.com impressions absorb the .store queries.
- **Learning outcome:** (fill on completion)

## ⚡ Pragmatic Value

- **Who benefits:** The platform (consolidated ranking, one canonical home), visitors (no stale legacy site), security posture (legacy Vercel with ~21 stale env vars finally dies — see key-rotation audit).
- **Measurable impact:** Zero live pages on numinia.store (all 301), no duplicate Numinia results in search, legacy Vercel project deleted.

## 🎯 Expected Outcome

Every numinia.store URL answers 301 to its numinia.com equivalent, Search Console records the change of address, the legacy Vercel project is gone, and production SIWE uses `numinia.com`.

## ✅ Acceptance Criteria

```gherkin
Feature: numinia.store SEO migration

  Scenario: Domain-wide permanent redirect
    Given the numinia.store zone (apex and www)
    When any URL under numinia.store is requested
    Then the response is a 301 (not 307) to the equivalent numinia.com URL
    And legacy paths without an equivalent land on the numinia.com homepage

  Scenario: Search engines are told
    Given both domains verified in Google Search Console
    When the 301s are live
    Then the "Change of Address" tool records numinia.store → numinia.com

  Scenario: The legacy deployment dies
    Given the redirect no longer depends on the Vercel app
    When the legacy Vercel project is deleted
    Then its ~21 stale environment variables die with it

  Scenario: SIWE domain matches the browser
    Given a citizen signs in with a wallet on numinia.com
    When the SIWE payload is generated
    Then its domain is "numinia.com" (apps/store/src/lib/auth/server.ts — currently hardcoded "numinia.store")
    And the wallet shows no domain-mismatch warning
```

- [ ] Renew numinia.store for one more year (GoDaddy) — Google recommends ≥1 year of live 301s
- [ ] Capture Search Console baseline for numinia.store (decides if equity is worth transferring)
- [ ] 301 apex + www, path-preserving where a mapping exists, homepage fallback otherwise
- [ ] Search Console change of address filed
- [ ] Legacy Vercel project deleted (coordinates with key-rotation audit)
- [ ] `AUTH_DOMAIN` fixed to `numinia.com` (or derived from `PUBLIC_SITE_URL`), unit-pinned
- [ ] Next renewal cycle: decision recorded — let the domain lapse or keep it

## ⚠️ Risks & Dependencies

| Risk / Dependency                                                                | Probability | Impact | Mitigation                                                                     |
| -------------------------------------------------------------------------------- | :---------: | :----: | ------------------------------------------------------------------------------ |
| Domain lapses before redirect ships (renewal decision pending)                    |     🟡      |   🔴   | Renew first, migrate second; a lapsed domain can be squatted with spam         |
| Legacy paths (`/en/...`) don't map 1:1 to platform routes                         |     🔴      |   🟡   | Homepage fallback is acceptable; map only the top indexed paths                |
| AUTH_DOMAIN fix behaves differently in prod (wallet warnings)                     |     🟢      |   🟠   | Unit-pin the constant; manual wallet sign-in check on numinia.com after deploy |
| Redirect host choice: Cloudflare (move nameservers) vs Vercel (`vercel.json`)     |     🟡      |   🟢   | Either works; decide at execution — Cloudflare Bulk Redirects needs no app     |

## 🤝 Agent Collaboration Protocol

| Phase     | 🧬 Biological agent                                             | 🤖 Digital agent                                    |
| --------- | --------------------------------------------------------------- | --------------------------------------------------- |
| Planning  | Renew domain; read Search Console baseline; pick redirect host  | Map legacy → platform paths from the old sitemap    |
| Execution | DNS/registrar changes; Search Console change of address          | Redirect config; AUTH_DOMAIN fix + unit test        |
| Review    | Verify wallet sign-in shows no warning; confirm Vercel deletion | Probe 301s (apex, www, deep paths) from external vantage |

## 📝 Notes / Context

- Facts verified 2026-08-16: numinia.store DNS lives at GoDaddy (ns17/ns18.domaincontrol.com) pointing to Vercel; `www.numinia.store/en` answers 200 with a live sitemap; `assets.numinia.store` no longer resolves and nothing in the current platform depends on it (binaries ship via `pub-*.r2.dev`).
- The status quo is the worst option: two live Numinia sites split search signals. Even if the domain is later dropped, the legacy Vercel must die.
- ISP caveat (memory): verify redirects from an external vantage — local curl on Pablo's network lies about Cloudflare-fronted hosts.
- Parked by Oracle order 2026-08-16 ("guarda esto como misión, de momento no lo hacemos"). Renewal deadline is the real clock on this mission.

## 🔗 Links & Resources

- [ ] docs/status.md NEXT #1 — key-rotation audit (shares the legacy-Vercel decommission)
- [ ] apps/store/src/lib/auth/server.ts:79 — hardcoded SIWE domain
- [ ] https://support.google.com/webmasters/answer/9370220 — Change of Address tool
