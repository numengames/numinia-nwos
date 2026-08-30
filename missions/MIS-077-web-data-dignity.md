---
id: "MIS-077"
title: "Data dignity: Numinia vs today's internet"
type: mission
status: todo
version: "1.0.0"
created: "2026-08-17T18:59:03Z"
created_source: "git:b484b68"
created_confidence: exact
updated: "2026-08-17T18:59:03Z"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, narrative]
license: "CC-BY-4.0"
mission_id: "MIS-077"
area: "Platform / numinia-web"
guild: "Alchemists"
type_execution: "digital"
priority: "medium"
effort: "M"
---
> Migrated 2026-08-17 from `numengames/numinia-web:missions/MISSION-005-data-dignity.md` (Oracle order:
> missions centralize in NWOS L3). Body preserved verbatim; internal relative
> links still point inside the numinia-web repo.

# MISSION-005 — Data dignity: Numinia vs today's internet

> **For humans.** Mission spec: teach, inside the product, the difference between digital rental (today's internet) and digital ownership (Numinia).
>
> **Epistemic value.** Resolves WHY Numinia's identity and asset model exists — not how it works, but what it replaces and what that trade means for a citizen.
> **Pragmatic value.** Every surface where a user hands over trust (login, download, forge, wallet upgrade) gets one honest contextual line; no surface lectures, none stays silent.
> **In the system.** Observes: seminal corpus, ADR-006 (progressive identity), Lanier's data-dignity frame. Regulates: narrative copy at trust moments. Coupled to: MISSION-002, docs/glossary.md, /city/ narrative.
>
> _Part of the Law. Index: [docs/LEY.md](../docs/LEY.md)_

> **Agent type:** 🔀 Hybrid (copy needs the Oracle's literary voice; wiring is digital)
> **Priority:** 🟡 Normal · **Effort:** M · **Status:** 📋 Backlog
> **Guild / House:** Exegetes (narrative) — Chroniclers for the copy, Scholars for the sources
> **Track:** `store` first (spike surfaces), `com`-grade once stable
> **Origin:** Pablo's directive, 2026-08-15, during the MISSION-002 login UX session.

## 📖 Story Statement

As a visitor deciding whether to create an identity in Numinia, I want the
platform to explain — in one honest line at the right moment, not a lecture —
how this is different from the internet I already know, so that my choice to
enter is informed, not extracted.

## 🧠 Framing (the seed already planted)

The first instance ships with MISSION-002's login spike (`/spike/auth`):

> **Digital ownership, not digital rental.** On today's internet, the data you
> generate is controlled by a third party. In Numinia the keys — and everything
> you earn with them — are yours.

This mission generalizes that seed into a narrative system:

- **Digital rental vs digital ownership** — platforms lend you an identity they
  can revoke; keys make identity yours.
- **Data sovereignty vs third-party custody** — who controls what your activity
  generates, and who profits from it.
- **Anchor source:** Jaron Lanier, "Jaron Lanier Fixes the Internet" (NYT
  Opinion, 2019) — data dignity: people should own, control, and be able to
  price the data they produce.
  <https://www.nytimes.com/interactive/2019/09/23/opinion/data-privacy-jaron-lanier.html>
- Numinia's stance maps cleanly: File Over App, CC0 gallery without
  registration, progressive auth (no wallet required to exist), no PII in
  analytics, assets on permanent storage the platform does not gatekeep.

## Deliverables (sketch — plan-before-code at execution time)

1. **Glossary first (ADR-012):** ratify the terms — data dignity, digital
   rental, digital ownership, sovereignty — in ES+EN before any copy ships.
2. **Trust-moment inventory:** map every surface where the user hands over
   trust (login, first download, wallet upgrade, forge, data export) and write
   ONE contextual line per moment. Tone: reassure and inform, never alarm,
   never lecture (rule inherited from MISSION-002 UX: no fear words).
3. **/city/ narrative page:** "Numinia vs the internet of today" — lore prose
   ES+EN (ADR-002), sourced from the seminal corpus + Lanier, with the
   trust-moment lines quoting it.
4. **Instrumentation:** `data-metric` on any interactive element these copy
   blocks introduce; no new PII, by construction.

## ✅ Acceptance Criteria (Gherkin, to be encoded in features/)

```gherkin
Scenario: A trust moment explains itself in one line
  Given a visitor reaches a surface where trust is handed over
  When the surface renders
  Then exactly one contextual dignity line is present
  And it mentions no payments, fees or threats

Scenario: The narrative page grounds the claim
  Given the /city/ data-dignity page
  When a citizen reads it in ES or EN
  Then the rental-vs-ownership contrast is explained with sources cited
```

## 🚫 Out of scope

Data-dignity payments/pricing (Lanier's MID concept as mechanism), any
tokenomics, consent-banner legal work (D12), translating the deep essay beyond
ES+EN (ADR-002).
