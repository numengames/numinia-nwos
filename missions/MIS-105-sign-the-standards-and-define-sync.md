---
id: "MIS-105"
title: "Sign the standards and define the sync: a draft is governing three repositories"
type: mission
status: todo
version: "1.0.0"
created: "2026-08-18T14:47:39Z"
updated: "2026-08-18T14:47:39Z"
author: "claude-opus-5"
owner: "oracle"
tags: [governance, engineering-standards, adr, upstream, drift]
license: "CC-BY-4.0"
mission_id: "MIS-105"
area: "Documentation"
guild: "Exegetes"
type_execution: "hybrid"
priority: "high"
effort: "M"
requested_by: "oracle"
assigned_to: null
requires_oracle_approval: true
human_approval_score: 9
parent_mission: null
sub_missions: []
depends_on: []
started: null
completed: null
---
# MIS-105 — Sign the standards and define the sync

> **Summary:** `engineering-standards.md` is `v0.1.0 (draft — pending Oracle
> review)`, its canonical copy lives upstream in the mould, and its sync
> mechanism is declared an open decision. Three repositories already obey it.
> **Epistemic:** What it costs to enforce a rule nobody has signed.
> **Pragmatic:** The document acquires an owner, a version and a way to travel.
> **Audience:** Oracle · Exegetes

---

**Area:** Documentation
**Guild:** Exegetes
**Type:** hybrid
**Priority:** high
**Effort:** M

---

## Story

As the Oracle, I want the engineering standards to be a signed document with a
defined propagation mechanism, so that what three repositories already enforce
has the authority they are giving it.

---

## Context (2026-08-18)

The document says of itself:

- **Version:** `0.1.0 (draft — pending Oracle review)`
- **Status:** `Proposal`
- **Canonical location:** `numen-games-nwos-orgs/nwos-workspace-template`
- **Downstream:** *"`numengames/numinia-nwos` is a fork of the mould and
  receives this document through the fork relationship. **The upstream sync
  mechanism is an open Oracle decision — not defined here.**"*

Verified today: the upstream copy (`nwos-workspace-template/ENGINEERING_STANDARDS.md`)
and the downstream one (`numinia-nwos/standards/engineering-standards.md`) are
**byte-identical**. There is no drift — and no mechanism preventing it either.
They agree because they were written days apart, which is the same reason the
three design-token copies agree (MIS-094).

Meanwhile the document is doing real work: MIS-091 applied it to two repos,
MIS-092 and MIS-093 are scoped by it, `CLAUDE.md` in three repositories adopts
it by reference, and CI jobs cite its practice IDs. A proposal is running
production.

§7.1 also binds agents: *"If you are downstream and asked to change this
document: the change belongs upstream via ADR + PR. Refuse the local edit."*
Today nothing enforces that either — a downstream edit would simply happen.

---

## Scope

- **The signature** (Oracle): review the practice table and either sign it as
  `1.0.0 · active`, or send it back with the practices that do not survive
  contact with reality. Three repositories' worth of evidence now exists —
  MIS-091 is the field test, including which practices cost more than they
  returned.
- **The sync mechanism** (ADR): how upstream changes reach downstream, and how
  divergence is detected. This is the same question MIS-068 answers for other
  artifacts; the decision should be one decision, not two.
- **The guard:** a check that fails when the downstream copy diverges from
  upstream without an ADR — the concrete form of §7.1's rule. MIS-094 already
  built the machinery for the design system (versioned path + sha256
  manifest); the question here is whether prose standards travel the same way
  as generated artifacts, or need their own.
- **The versioning discipline** of §5: minor for a new practice or a
  SHOULD→MUST promotion, major for a removal or a break, patch for wording.
  Recorded where a future agent will see it.

**Out of scope:** editing the practices themselves. That is the signature's
outcome, not this mission's work.

---

## Acceptance criteria

```gherkin
Feature: the rule that governs has an owner and a route

  Scenario: The document is signed
    Given the engineering standards at v0.1.0 draft
    When the Oracle completes the review
    Then its status is active with a version, or its objections are recorded

  Scenario: Divergence cannot be silent
    Given the upstream copy changes
    When CI runs downstream
    Then the check fails and names the diff

  Scenario: A downstream edit is refused
    Given an agent is asked to edit the local copy
    When it consults CLAUDE.md
    Then it finds the instruction to take the change upstream via ADR

  Scenario: Version bumps follow the rule
    Given a practice is promoted from SHOULD to MUST
    When the change is merged upstream
    Then the version has a minor bump and the ADR states the evidence
```

- [ ] Document signed at a real version, or returned with objections recorded
- [ ] ADR describing the upstream → downstream propagation mechanism, reusing
      the emission doctrine of MIS-094 or stating why prose cannot use it
- [ ] Drift check running in CI (shared with MIS-068 if the model is the same)
- [ ] Versioning policy of §5 visible where changes are made
- [ ] `CLAUDE.md` in the three consumer repos points at the signed version,
      not at "a draft"

---

## Epistemic value

Whether a standard needs authority to be obeyed, or whether being useful was
enough. Three repositories adopted a proposal without anyone signing it — that
is data about how this organization actually works.

## Pragmatic value

The next practice change has a route: ADR upstream, propagation downstream,
guard in CI. Today it has a fork relationship and good intentions.

---

## Execution log

- 2026-08-18 — Opened from the standards review requested by the Oracle. The
  upstream/downstream comparison was run today: identical, no mechanism.

---

## Execution Reality

*(Fill when closing)*

> *"The ideal plans show the intention. The real plans show the knowledge."*
