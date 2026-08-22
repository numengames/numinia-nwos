---
id: "MIS-108"
title: "Offer the mould its own provenance: the template still calls itself the source"
type: mission
status: draft
version: "1.0.0"
created: "2026-08-20T00:00:00Z"
updated: "2026-08-20T00:00:00Z"
author: "claude-opus-5"
owner: "oracle"
tags: [governance, engineering-standards, provenance, sovereignty, nwos-workspace-template]
license: "CC-BY-4.0"
mission_id: "MIS-108"
area: "Governance"
guild: "Exegetes"
type_execution: "digital"
priority: "high"
effort: "S"
requested_by: "oracle"
assigned_to: "nwos-workspace-template"
requires_oracle_approval: true
human_approval_score: 8
parent_mission: null
sub_missions: []
depends_on: ["ADR-003"]
started: null
completed: null
---
# MIS-108 — Offer the mould its own provenance

> **Summary:** ADR-003 corrected where the engineering standards come from. The
> mould still carries the old text, and its `CLAUDE.md` still orders agents to
> route changes to an upstream that does not exist.
> **Epistemic:** What it takes to correct a document in a repository you do not
> govern.
> **Pragmatic:** The mould stops claiming an authority it never had — by
> invitation, not by push.
> **Audience:** Oracle · Exegetes

---

**Area:** Governance
**Guild:** Exegetes
**Type:** digital
**Priority:** high
**Effort:** S

---

## Story

As an organization about to be born from the mould, I want the document I inherit
to tell me the truth about who governs it, so that my first act as a sovereign
repository is not asking permission from someone who never had authority over me.

---

## Context (2026-08-20)

ADR-003 established: the engineering standards **originate in
`numengames/numinia-nwos`**; the copy in the mould is a *starting proposal* that
whoever adopts it owns. Neither copy is downstream of the other.

`numinia-nwos` has been corrected. `numen-games-nwos-orgs/nwos-workspace-template`
has not, and it carries the same text in two places:

| Where | What it still says |
|---|---|
| `ENGINEERING_STANDARDS.md` header | "Canonical location: nwos-workspace-template… Single source of truth" |
| `ENGINEERING_STANDARDS.md` §7.1 | numinia-nwos "is a fork of the mould"; downstream agents must "refuse the local edit" |
| `ENGINEERING_STANDARDS.md` §6 | NWOS repos "enforced via the mould" |
| `CLAUDE.md` (l. 33-34) | "changes belong upstream (its §7.1): do not edit the local copy" |

Both copies were byte-identical (`sha256 e3e08742…`) before this correction. After
it they diverge — **by design**. That divergence is the mission's outcome, not its
problem.

**This is another organization.** Per the parcel rule and G-12, nothing here is
pushed. What travels is a pull request the mould's own agent may accept, amend or
decline, and declining is a legitimate outcome that closes this mission.

---

## Scope

- A PR against `nwos-workspace-template` rewriting the four locations above, from
  the mould's point of view — not a copy-paste of ours. Its header should read as
  *"a starting proposal, emitted by numinia-nwos, yours once adopted"*, not as
  *"a copy of numinia-nwos's standard"*.
- Its `CLAUDE.md` rule inverted: an agent in an adopted workspace edits its own
  copy freely; there is nobody to ask.
- A line stating that version differences from `numinia-nwos` are expected and are
  never to be synced.
- Verify whether **faro-austral** (MIS-090) and any other generated workspace
  shipped with the old lineage text. If so, list them here — each is offered the
  correction, never patched in place.

**Out of scope:** ratifying the *contents* of the standards (MIS-105 owns the
signature), the version number, and any change to the mould beyond these four
locations.

---

## Acceptance criteria

```gherkin
Feature: the mould tells the truth about who governs it

  Scenario: A newborn workspace reads its own header
    Given a repository generated from the mould
    When an agent reads ENGINEERING_STANDARDS.md
    Then it learns the document is a proposal it now owns
    And it finds no instruction to route changes to an upstream

  Scenario: The correction is offered, not imposed
    Given the mould belongs to another organization
    When the correction travels
    Then it travels as a pull request
    And a decline closes this mission as legitimately as a merge

  Scenario: Divergence stops reading as damage
    Given the two copies now differ
    When any agent compares them
    Then it reports adoption, not drift
```

- [ ] PR opened against `numen-games-nwos-orgs/nwos-workspace-template`
- [ ] Header, §6, §7.1 and `CLAUDE.md` corrected in that PR
- [ ] Generated workspaces audited for the old text; findings listed here
- [ ] Nothing pushed, forced, or merged without the mould's agent
- [ ] Outcome recorded either way — merged, amended or declined

---

## Epistemic value

Tests whether the sovereignty rule survives the case where **we** are the ones who
were wrong. G-12 is easy when the derived repo wants what we have; this is the
version where we need something from it.

## Pragmatic value

Closes the last surface where the ecosystem still tells a new organization that its
law lives in someone else's repository.
