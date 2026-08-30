---
id: "MIS-102"
title: "The last three consumers stop copying: pin the emitted kit at 5.1.0"
type: mission
status: todo
version: "1.0.0"
created: "2026-08-18T14:47:39Z"
updated: "2026-08-18T14:47:39Z"
author: "claude-opus-5"
owner: "oracle"
tags: [design-system, tokens, emission, drift, engineering-standards]
license: "CC-BY-4.0"
mission_id: "MIS-102"
area: "Product"
guild: "Alchemists"
type_execution: "digital"
priority: "high"
effort: "L"
requested_by: "oracle"
assigned_to: null
requires_oracle_approval: false
human_approval_score: 6
parent_mission: null
sub_missions: []
depends_on: ["MIS-094", "MIS-091", "MIS-068"]
started: null
completed: null
---
# MIS-102 — The last three consumers stop copying

> **Summary:** MIS-094 built the emitter: the kit ships as
> `kit/5.1.0/sistema.*` with a sha256 manifest, and `numinia-web` pins it
> instead of copying it. Three consumers still hold hand-written copies of the
> same values — and one of them already carries a stale §19.5 fragment.
> **Epistemic:** Whether the emission doctrine holds when the consumer is not
> the one who asked for it.
> **Pragmatic:** A canonical value changes once and reaches four surfaces with
> a verifiable digest.
> **Audience:** Oracle · Alchemists

---

**Area:** Product
**Guild:** Alchemists
**Type:** digital
**Priority:** high
**Effort:** L

---

## Story

As an agent maintaining any Numen Games surface, I want to pin the system
rather than retype it, so that the next errata reaches me instead of waiting
to be noticed.

---

## Context (2026-08-18)

MIS-094 established the doctrine and the machinery on the same day: **the
canon is not copied — it is pinned.** The kit is now emitted from the master
document to a versioned path with a checksum per file:

```
web/public/diseno/kit/manifest.json   → version 5.1.0, sha256 of the master
web/public/diseno/kit/5.1.0/sistema.{css,js,tokens.json}
```

`numinia-web` deleted its copy (its ADR-022) and pins this repo as the source.
It is, so far, the only one.

The other consumers, all of them from the same day, all of them hand-written:

| Surface | Repo | How it holds the values | Version applied |
|---|---|---|---|
| numinia.org | `numinia-nwos/web` | `global.css`, by hand (MIS-092) | 5.0.0 |
| numen.games | `numengames-web` | `tailwind.config.cjs`, by hand (MIS-091) | 5.0.0 |
| nwos.numen.games | `nwos-deploy` | `global.css` RGB triplets, by hand (MIS-091) | 5.0.0 |

And the drift has already started. MIS-091 copied the §19.5 fragment verbatim
into `docs/design-system-fragment.md` in two repositories — **as a file, on
purpose, so an agent would find it**. Errata E1 of 5.1.0 changed exactly that
fragment: the catalogue went from twelve animations to **thirteen**, naming
*trazo* and *cielo*. Both copies are wrong as of today, and nothing tells them
so. That is not an argument against the copies; it is the argument for the
manifest.

A third errata is still live, found while re-pinning: **the 5.1.0 master's own
§19.5 fragment names v5.0.0 in its first line.** The consumers' copies preserve
it verbatim and declare it in their header, because a verbatim copy that
corrects its source in silence stops being one. It needs a patch bump upstream
— and it is one more argument for pinning a digest rather than trusting prose.

Errata E2 is worth recording as a near miss: the 5.0.0 fragment said `marco
10px` while its own §19.3 tokens said `8px` — a fossil from 4.0.0. MIS-091 took
the value from the tokens, so both sites are correct by construction. Had the
agent worked from the fragment instead, two production sites would carry the
wrong radius today. **Pinning tokens beats reading prose.**

---

## Scope

- **Pin, do not copy.** Each of the three consumers declares the version it
  targets and verifies the digest of what it consumes against
  `kit/manifest.json`. The mechanism is MIS-068's to choose — this mission is
  its first multi-consumer application.
- **Replace the hand-written palettes** with the emitted tokens:
  `sistema.tokens.json` for values, `sistema.css` where the surface can take
  it, and a Tailwind preset derived from the tokens where it cannot.
- **Replace the copied fragment.** `docs/design-system-fragment.md` in
  `numengames-web` and `nwos-deploy` either becomes a pinned artifact with its
  digest, or a pointer to the versioned URL. A verbatim copy with no guard is
  the thing this mission exists to remove.
- **Re-pin from 5.0.0 to 5.1.0** and apply the delta that touches an Umbral
  surface. Most of 5.1.0 is the book register (the book inks, the gears,
  the Narrator, the editions) and does not reach these three; E1 does, and the
  retirement of animation 12 must be checked against each site's motion.
- **Keep the colour guard** each repo already has, promoted from a grep in a
  mission log to a CI check (`[MANUAL]` → `[AUTO]`).

**Out of scope:** merging the codebases; the emitter itself (MIS-094, done).

---

## Acceptance criteria

```gherkin
Feature: four surfaces, one source, verifiable

  Scenario: A consumer declares what it consumes
    Given any of the three consumer repositories
    When its configuration is read
    Then it names the design system version it pins
    And the digest it expects

  Scenario: A stale pin is loud
    Given the emitter publishes a new version
    When a consumer's CI runs
    Then it reports that its pin is behind
    And it does not fail silently

  Scenario: A tampered artifact never ships
    Given a consumed kit file whose sha256 does not match the manifest
    When the build runs
    Then it fails

  Scenario: The fragment cannot rot again
    Given the §19.5 fragment inside a consumer repo
    When errata change it upstream
    Then the consumer's check reports the divergence

  Scenario: No hand-written palette survives
    Given a consumer repository
    When its source is searched for canonical hex values
    Then they appear only in generated artifacts
```

- [ ] The three consumers pin a version and verify its digest
- [ ] Hand-written palettes deleted in favour of the emitted tokens
- [ ] The two copied §19.5 fragments pinned or replaced by a pointer
- [ ] All three re-pinned to 5.1.0, with the E1 delta applied and animation 12
      verified absent
- [ ] Colour guard running in CI in each consumer
- [ ] `numinia-nwos/web` included — the emitter's own site is a consumer too,
      and today it hand-writes like the rest

---

## Epistemic value

MIS-094 proved the doctrine works when the consumer commissions it. This
mission tests the harder case: consumers who did not ask, already shipped, and
have their own deadlines. If pinning survives that, it is a practice; if not,
it was a favour between two repositories.

## Pragmatic value

Errata E1 becomes a version bump instead of an archaeology exercise. And the
mould's default theme (§2.8.2) gets a real precedent: four surfaces consuming
one emission.

---

## Execution log

- 2026-08-18 — Opened from the standards review requested by the Oracle. Note
  the sequence: the mission was first drafted as "build the shared kit", and
  rewritten the same hour after finding MIS-094 had already built and shipped
  it. The gap moved from production to adoption while the draft was open.

---

## Execution Reality

*(Fill when closing)*

> *"The ideal plans show the intention. The real plans show the knowledge."*
