---
id: "MIS-103"
title: "The other seventeen: inventory and adoption across the organization"
type: mission
status: todo
version: "1.0.0"
created: "2026-08-18T14:47:39Z"
updated: "2026-08-18T14:47:39Z"
author: "claude-opus-5"
owner: "oracle"
tags: [engineering-standards, audit, governance, github]
license: "CC-BY-4.0"
mission_id: "MIS-103"
area: "Operations"
guild: "Sentinels"
type_execution: "hybrid"
priority: "medium"
effort: "L"
requested_by: "oracle"
assigned_to: null
requires_oracle_approval: false
human_approval_score: 4
parent_mission: null
sub_missions: []
depends_on: ["MIS-070"]
started: null
completed: null
---
# MIS-103 — The other seventeen

> **Summary:** The organization has around twenty-one repositories. Four have
> ever been audited. This mission produces the real table: repository by
> practice, with an owner per row.
> **Epistemic:** How much of the ecosystem we have been reasoning about from
> memory.
> **Pragmatic:** Every later standards mission gets a denominator.
> **Audience:** Oracle · Sentinels

---

**Area:** Operations
**Guild:** Sentinels
**Type:** hybrid
**Priority:** medium
**Effort:** L

---

## Story

As the Oracle, I want to know which repositories exist, what each one is for
and where each stands against the standards, so that "the org complies" stops
being a claim about four repositories out of twenty-one.

---

## Context (2026-08-18)

The stack audit of 2026-08-17 examined five requested repositories: four
existed, one did not — and that missing one, `numinia-web`, turned out to
exist after all: it commissioned Design System 5.1.0 the next day (MIS-094,
its ADR-022). An audit that misses a live consumer of the canon is exactly the
reason this mission exists. In passing it recorded that the `numengames`
organization lists **21 repositories**. Seventeen of them have never been
looked at against any standard.

§6 of the engineering standards already assigns a regime per family, so the
question is not what to demand — it is what is there:

| Family | Regime per §6 |
|---|---|
| `numen-games-nwos-orgs` (workspaces from the mould) | Enforced at birth |
| `numengames` (Numinia repos) | Adopt by reference — `CLAUDE.md` links the document, shared CI and presence checks added per repo |
| `PabloFMM` (personal) | SHOULD, not MUST |

MIS-070 asks for a per-repo gap table but scopes it to three repositories. This
mission is its completion, not its duplicate: MIS-070 owns *what the checks
are*; this one owns *who has to pass them*.

The audit's own honesty section applies here too: it verified what it cloned
and nothing else. This mission inherits that rule — a repository that is not
inspected is listed as not inspected.

---

## Scope

- **Enumerate** every repository in `numengames` and `numen-games-nwos-orgs`
  from the API, not from memory: name, visibility, description, topics,
  language, last push, archived or not.
- **Classify** each one: active product · library · experiment · dead ·
  candidate for archiving. A repository nobody has pushed to in a year and
  that nothing depends on is a decision waiting to be taken, and archiving it
  is a legitimate outcome of this mission.
- **Score** the active ones against the §4 checklist and the practice IDs,
  producing one row per repository.
- **Assign an owner** per row. A gap with no name attached is a gap that
  survives every review.
- **Publish** the table as a maintained file in this repo (MIS-070's "one plan
  for all"), regenerable — the audit already proved snapshots rot.

**Out of scope:** fixing the gaps found. Each significant one becomes its own
mission; this one finds them.

---

## Acceptance criteria

```gherkin
Feature: the ecosystem is known, not assumed

  Scenario: Every repository is accounted for
    Given the two organizations
    When their repositories are listed from the API
    Then each one appears in the table with its classification
    And repositories that were not inspected are marked as not inspected

  Scenario: Each active repository has a gap row
    Given an active repository
    When it is scored against the §4 checklist
    Then the row names which practices it fails
    And it names one person as owner

  Scenario: The table does not rot
    Given the inventory file
    When it is regenerated a month later
    Then the differences are visible, because the generator is committed
```

- [ ] Full listing of both organizations, from the API
- [ ] Classification per repository, with archiving candidates flagged
- [ ] Gap table (repo × practice) for every active repository
- [ ] One owner per row
- [ ] The file lives in this repo and is regenerable by a committed script
- [ ] Anything that needs its own work becomes a mission, listed here

---

## Epistemic value

The distance between the ecosystem we describe in documents and the one that
exists in the account. Four repositories have been standing in for twenty-one.

## Pragmatic value

The first time anyone can answer "does the org comply?" with a number instead
of an anecdote.

---

## Execution log

- 2026-08-18 — Opened from the standards review requested by the Oracle,
  after finding that all reasoning so far rests on the four repositories of
  the 2026-08-17 audit.

---

## Execution Reality

*(Fill when closing)*

> *"The ideal plans show the intention. The real plans show the knowledge."*
