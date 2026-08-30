---
id: "MIS-074"
title: "Progressive identity (Web2→Web3) for numinia.com"
type: mission
status: todo
version: "1.0.0"
created: "2026-08-17T18:59:03Z"
created_source: "git:b484b68"
created_confidence: exact
updated: "2026-08-25T20:05:59Z"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, auth, siwe]
license: "CC-BY-4.0"
mission_id: "MIS-074"
area: "Platform / numinia-web"
guild: "Alchemists"
type_execution: "digital"
priority: "critical"
effort: "L"
---

> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-002.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# 🪐 MISSION-002 — Progressive Identity (Phase 2 core)

> **For humans.** Mission spec: progressive identity (Web2→Web3) with the thirdweb evaluation gate at Step 0.
>
> **Epistemic value.** Resolves how identity will be built and which vendor questions gate it (D13, D14).
> **Pragmatic value.** No identity code beyond the vendor-independent core until Step 0 passes with the Oracle.
> **In the system.** Observes: ADR-006. Regulates: auth work. Coupled to: packages/auth, docs/decisions/ADR-006-progressive-auth-final.md.
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

> **Agent type:** 🔀 Hybrid (evaluation gate needs Oracle sign-off)
> **Priority:** 🔴 Critical · **Effort:** L · **Status:** ✅ Steps 0–3 done (2026-08-15). Gate D14 closed by Oracle order to build the login; surface shipped in MISSION-010. Remaining: Session Zero ranks (Phase 3).
> **Guild / House:** Sentinels (protection) + Procurators (law)
> **Track:** `com`-grade `packages/auth`; `store` for the login surface. **No deploy.**
> **Governing decision:** docs/decisions/ADR-006-progressive-auth-final.md

## 📖 Story Statement

As a visitor, I want to become a Nomad with the identity I already have
(social, email, passkey, or wallet), so that entering Numinia never requires
understanding Web3 first.

## 🧠 Epistemic Value

- **Hypothesis (the Oracle's clause):** everything ADR-006 needs can be done
  with thirdweb (In-App Wallets, Connect, JWT auth with verifiable signatures,
  RPC for future EIP-1271) under our fail-closed and no-PII constraints.
- **Validation method:** Step 0 evaluation spike with a written checklist —
  every capability demonstrated locally or the gate fails.
- **Learning outcome (Step 0, 2026-08-15 — mission still open):**
  - The hypothesis held: In-App Wallets (Google ✅, email OTP ✅), external wallets
    (MetaMask ✅), and SIWE payload verification all work under fail-closed +
    no-PII constraints. Passkey is environment-limited on Linux desktop (no
    platform authenticator), not a vendor failure — retest on phone/deploy.
  - Trust layering works as designed: thirdweb only proves address ownership;
    the session token is ours (`@numinia/auth` HMAC, rank nomad). No adminAccount
    or vendor JWT was ever needed.
  - **Logout must disconnect the wallet, not just drop the cookie**: in-app
    wallets sign silently, so a still-connected wallet re-authenticates
    instantly. This rule must survive into the production login island.
  - ConnectEmbed is a closed surface: method-selection UX required heuristic
    listening (capture-phase + `getLastAuthProvider`). For production, prefer
    own buttons over `useConnect` for full control.
  - Stateless HMAC sessions have no server-side revocation (accepted for the
    spike; revisit at Step 2 if TTL > 1h is ever wanted).

## ✅ Acceptance Criteria (Gherkin, to be encoded in features/)

```gherkin
Scenario: Evaluation gate — the vendor covers everything (STEP 0, blocking)
  Given the ADR-006 capability checklist
  When each item is exercised against thirdweb locally
  Then every item passes, or the mission halts and reports to the Oracle

Scenario: Fail closed on missing configuration
  Given the auth verification config is absent
  When any protected endpoint is called with any token
  Then the response is 401 and no unverified decode occurs

Scenario: Forged tokens never authenticate
  Given a syntactically valid JWT with an invalid signature
  When it is presented to the session endpoint
  Then the response is 401

Scenario: A social login yields a Nomad with an address
  Given a user authenticates via the embedded-wallet flow
  When the session is created
  Then their rank is nomad and their sheet has a wallet address
  And no address ever appears in analytics events

Scenario: Anonymous browsing is untouched
  Given no session
  When visiting the archive and downloading an asset
  Then everything works exactly as before

Scenario: The Web3 boundary is one constant
  Given the boundary rank is configured as pilgrim (provisional, D13)
  When a session below the boundary attempts an exchange action
  Then it is refused with a clear upgrade path
```

> **Re-scoped by D16 (2026-08-15):** the L.A.P. is open to Nomads — part of its
> content is visible with no session. Login is asked only where it earns its
> place: gated content or data persistence. Steps 1–3 therefore build a
> contextual login moment, not an entrance wall, and run AFTER the design
> system work by Oracle order.

## Plan sketch (plan-before-code applies at execution time)

0. **Evaluation spike + checklist → GATE** (halt on failure; report).
1. `packages/auth` (com): verified-session primitives, boundary constant,
   fail-closed config loading; 100% coverage + mutation.
2. Store: login island (client:load), session endpoint, logout; `data-metric`
   on every control (`wallet_connect_start/success` events go live).
3. Rank inference (nomad-only for now) + character-sheet stub wiring.
4. Report with what was NOT done (Session Zero recording lands with Phase 3).

## 🚫 Out of scope

Session Zero verification, purchases, EIP-1271, on-chain state, deploy.

---

## Board triage — 2026-08-25

Returned from `in-progress` to `backlog` by the Oracle, in the triage of the 111
missions. **Nothing about the brief changed and the work is still wanted** —
what changed is the claim that it was underway.

- **Category:** D — stale. No commit outside a bulk maintenance commit, and the brief declares no acceptance criteria.
- **Signal, not proof:** this mission was assigned to an agent whose identity is
  in question (`D-026`, `D-027`). That is context; the evidence for this move is
  the absence of its own commit, not who it was assigned to.
- **Signed by:** Oracle, 2026-08-25.
