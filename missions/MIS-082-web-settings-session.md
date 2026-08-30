---
id: "MIS-082"
title: "Settings and the door: L.A.P. session surface"
type: mission
status: done
version: "1.0.0"
created: "2026-08-17T18:59:03Z"
created_source: "git:b484b68"
created_confidence: exact
updated: "2026-08-17T18:59:03Z"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, lap, auth]
license: "CC-BY-4.0"
mission_id: "MIS-082"
area: "Platform / numinia-web"
guild: "Alchemists"
type_execution: "digital"
priority: "high"
effort: "M"
---

> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-010-settings-session.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# MISSION-010 — Settings and the door

> **For humans.** The L.A.P. gains Settings and the login — the identity spike promoted into the product as a contextual moment, never a wall.
>
> **Epistemic value.** Resolves what the platform can honestly offer before identity is complete: preferences that are real, a session that is optional, and permissions read from the domain.
> **Pragmatic value.** MISSION-002 Steps 1–3 land on a real surface; D14's gate is closed by the Oracle's order to build the login.
> **In the system.** Observes: ADR-006, D16 (L.A.P. open to Nomads), D17 (localStorage for chrome only), @numinia/domain ranks/permissions. Regulates: /lap/settings/, /lap/session/. Coupled to: MISSION-002, MISSION-008.
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

> **Status:** ✅ Done (2026-08-15) · **Track:** store · **Size:** medium

## D14 — the gate, closed

The Oracle ordered the login built; that is the sign-off Step 0 was waiting
for. Recorded outcome: thirdweb covers what ADR-006 needs (Google, email OTP
and external wallets verified in browser; passkey environment-limited on this
workstation), and the trust layering held — the vendor only proves the
address, the session is our HMAC token.

## What shipped

- **`/lap/settings/`** ×5 locales: session card (state, rank, truncated
  address, sign in / sign out), appearance (Diurno/Nocturno segmented control,
  motion note), language, **panel sections** (§9.8 switches that actually hide
  rail entries, persisted per D17), what your rank grants (the 6 ranks and
  their permission groups straight from the domain, with the Nomad grant list
  in Mono), your data (what we do NOT keep), and about (version, design
  system, data repo).
- **`/lap/session/`** ×5 locales: the login island in the L.A.P., with the
  guided per-method flow from the spike. Copy inside the vendor guide is EN
  pending translation QA (D9).
- **Auth hardened**: config is read lazily — a missing secret now answers
  401 (session) / 503 (login) instead of throwing at module scope and logging
  a stack per request. Verified with no secrets present: clean fail-closed.
- **Budget gate taught the identity class**: the wallet vendor (~430KB) is
  reachable from a public page now, so chunks reachable ONLY from identity
  surfaces (/spike/, /lap/session/) get their own budget; Layer 0/1 keeps the
  strict 200KB.
- **`[hidden]` guard** in platform.css: a component's `display` silently beat
  the attribute, showing a sign-out button to visitors with no session.

## Honest notes

- The a11y gate excludes the vendor widget on the session page: one
  ConnectEmbed button ships without an accessible name (`button-name`,
  critical). It is third-party DOM we cannot patch — excluded with a comment,
  to report upstream, while the rest of the page stays gated.
- Settings does not yet edit anything that lives on a server, because nothing
  of yours lives on one. Rank stays Nomad until Session Zero (Phase 3).
