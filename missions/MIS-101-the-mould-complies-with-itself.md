---
id: "MIS-101"
title: "The mould complies with itself: numinia-nwos meets its own checklist"
type: mission
status: todo
version: "1.0.0"
created: "2026-08-18T14:47:39Z"
updated: "2026-08-18T14:47:39Z"
author: "claude-opus-5"
owner: "oracle"
tags: [engineering-standards, ci, documentation, numinia-nwos]
license: "CC-BY-4.0"
mission_id: "MIS-101"
territory: "TBA"
guild: "Alchemists"
type_execution: "digital"
priority: "high"
effort: "M"
requested_by: "oracle"
assigned_to: null
requires_oracle_approval: false
human_approval_score: 5
parent_mission: null
sub_missions: []
depends_on: []
started: null
completed: null
---
# MIS-101 — The mould complies with itself

> **Summary:** The repository that publishes the engineering standards is the
> least compliant of the three. This mission closes that gap.
> **Epistemic:** How much of a standard survives contact with the repo that
> wrote it.
> **Pragmatic:** The reference stops being an exception, and the presence
> check can run everywhere without a footnote.
> **Audience:** Oracle · Alchemists

---

**Area:** Documentation
**Guild:** Alchemists
**Type:** digital
**Priority:** high
**Effort:** M

---

## Story

As an agent arriving at any repository in the ecosystem, I want the canonical
repository to be the best example of its own rules, so that "look at how
numinia-nwos does it" is advice and not a trap.

---

## Context (2026-08-18)

Audited today against §4 of `standards/STD-005-engineering-standards.md`:

| Required by §4 | `numinia-nwos` | `numengames-web` | `nwos-deploy` |
|---|---|---|---|
| `CLAUDE.md` | ✅ | ✅ | ✅ |
| `SECURITY.md` | ✅ | ✅ | ✅ |
| `CONTRIBUTING.md` | ✅ | ✅ | ✅ |
| `CODE_OF_CONDUCT.md` | ❌ | ✅ | ✅ |
| `TODO.md` (PM-05) | ❌ | ✅ | ✅ |
| `.editorconfig` (DEV-03) | ❌ | ✅ | ✅ |
| `.env.example` (DEV-01) | ❌ | ✅ | ✅ |
| `dependabot.yml` (SEC-03) | ❌ | ✅ | ✅ |
| CODEOWNERS, templates | ✅ | ✅ | ✅ |
| Pipeline ARC-01 | ❌ | ✅ | ✅ |

Its own `CLAUDE.md` states it: *"No tests or lint yet (MIS-070)."* CI runs the
licence-frontmatter guard and the web build — two good checks, but not the
pipeline every other repo is now required to run.

`.env.example` deserves its own note: the repo genuinely has no environment
variables. DEV-01 asks for an exhaustive example file, and "there are none" is
an answer that has to be written down, not assumed — otherwise the next
contributor cannot tell "no variables" from "nobody documented them".

---

## Scope

- The five missing files, written for this repo — not copied from the other
  two. A `CODE_OF_CONDUCT.md` in a governance repository is not the same
  document as in a marketing site.
- `TODO.md` collects the debt this repo already tracks in prose across
  `CLAUDE.md`, `GAPS.md` and mission bodies. It is a roadmap file (PM-05), not
  a second gap map: `GAPS.md` stays strategic.
- The ARC-01 pipeline for `web/`: `type-check → lint → test → build`, added to
  the existing `ci.yml` beside the licence guard, with third-party actions
  already pinned (they are) and read-only tokens (they are).
- Whatever `lint` and `type-check` uncover is part of this mission. On
  `numengames-web` that was 74 lint errors and 31 type errors — two of which
  were real product bugs. Expect a similar harvest.

**Out of scope:** the design of the checks themselves (MIS-070 owns the
baseline), anything under C-005, and the token layer of `web/` — that is
MIS-102, which moves this site off its hand-written palette.

---

## Acceptance criteria

```gherkin
Feature: the canonical repo passes its own checklist

  Scenario: The presence check runs green here too
    Given the §4 checklist of engineering-standards
    When it is evaluated against numinia-nwos
    Then every required file is present
    And the ones that do not apply say so in writing

  Scenario: The pipeline is the same one every repo runs
    Given a pull request against main
    When CI runs
    Then type-check, lint, test and build run in that order
    And the licence-frontmatter guard still runs beside them

  Scenario: A missing environment file is a statement, not a silence
    Given the repo needs no secrets to build or run
    When a contributor looks for .env.example
    Then they find it, and it says exactly that
```

- [ ] `CODE_OF_CONDUCT.md`, `TODO.md`, `.editorconfig`, `.env.example` and
      `.github/dependabot.yml` present and written for this repo
- [ ] `ci.yml` runs `type-check → lint → test → build` for `web/`
- [ ] Every error the new checks surface is fixed, or recorded in `TODO.md`
      with what would close it — never silenced
- [ ] `CLAUDE.md` no longer says "no tests or lint yet"
- [ ] The presence job of the shared workflow passes here unmodified

---

## Epistemic value

Whether the standard was written from this repo's practice or against it. The
five missing files answer that question by themselves.

## Pragmatic value

A new repository can be told "do what the canonical one does" without a list
of exceptions attached.

---

## Execution log

- 2026-08-18 — Opened from the standards review requested by the Oracle. The
  gap table above was produced by direct inspection, not from memory.

---

## Execution Reality

*(Fill when closing)*

> *"The ideal plans show the intention. The real plans show the knowledge."*
