---
id: "MIS-107"
uid: ""
title: "numen.games speaks Spanish: nine components ignore the locale they receive"
status: todo
priority: "high"
effort: "M"
guild: "Alchemists"
territory: "Content"
type_execution: "hybrid"
assigned_to: null
started: null
completed: null

type: mission
version: "1.0.0"
created: "2026-08-18T14:47:39Z"
created_source: "git:b91848e"
created_confidence: exact
updated: "2026-08-18T14:47:39Z"
author: "claude-opus-5"
owner: "oracle"
requested_by: "oracle"
tags: [web, i18n, content, numengames-web]
license: "CC0-1.0"

requires_oracle_approval: false
human_approval_score: 4
parent_mission: null
sub_missions: []
depends_on: ["MIS-091"]
---
# MIS-107 — numen.games speaks Spanish

> **Summary:** The Spanish route of numen.games serves English copy below the
> fold: nine components receive `locale` and ignore it.
> **Epistemic:** How long a bilingual site can be half-translated without
> anyone noticing — and what kind of check would have noticed.
> **Pragmatic:** `/es/` becomes a Spanish page instead of a Spanish header on
> an English body.
> **Audience:** Oracle · Alchemists

---

**Area:** Content
**Guild:** Alchemists
**Type:** hybrid (code by agent, copy by a person)
**Priority:** high
**Effort:** M

---

## Story

As a Spanish-speaking visitor to numen.games, I want the page I asked for in
Spanish to be in Spanish, so that the site does not switch language halfway
down.

---

## Context (2026-08-18)

Found by the type-checker during MIS-091, not by looking at the site. Nine
components are handed `locale={currentLocale}` and never read it — Svelte
silently drops props a component does not declare, so the value has been
arriving and evaporating:

- `WhyNumenMobile`
- `WorkProcessMobile`, `WorkProcessDesktop`
- `TestimonialsMobile`, `TestimonialsDesktop`
- `Origins`, `Partners`, `ProfilePictureCarousel`, `HeroDesktop` (team)

Their copy is hardcoded English inside the component. `WhyNumenDesktop` is the
exception that shows the intended pattern: it declares the prop and holds a
`translations` object.

MIS-091 made each of the nine declare the prop with a `TODO(MIS-091)` comment
at the exact line, so the gap is visible in the code. The copy itself is the
remaining work — and it is content work, not a refactor.

Note this is also an accessibility and SEO defect, not only a content one: the
page declares `lang="es"` while serving English text, which misleads screen
readers and search engines alike.

---

## Scope

- Move the hardcoded copy of the nine components into `src/i18n/translations`,
  following the shape `WhyNumenDesktop` already uses and the structure of
  `src/i18n/index.ts`.
- Spanish copy written by a person, per §11 of the design system: declared
  language level, cultivated, plain and clear — a translation that reads as
  Spanish, not as translated English.
- A check that fails when a component receives `locale` without declaring it,
  so the class of bug cannot return silently. The type-checker already catches
  it now that the props are declared; the guard makes it explicit.
- Review both routes end to end afterwards: `/` and `/es/`, desktop and
  mobile, since half the affected components are the mobile variants.

**Out of scope:** new languages (§3 of STANDARDS lists future ones), and the
sixteen inert layout strings MIS-091 removed — that is a design decision
tracked in the repo's `TODO.md`.

---

## Acceptance criteria

```gherkin
Feature: the Spanish route is Spanish

  Scenario: The whole page speaks one language
    Given a visitor opens /es/
    When they read from the header to the footer
    Then every section is in Spanish

  Scenario: The declared language matches the served content
    Given the page declares lang="es"
    When its text is inspected
    Then it is Spanish

  Scenario: A dropped locale cannot come back
    Given a component that receives locale without declaring it
    When type-check runs
    Then the build fails

  Scenario: Mobile is not forgotten
    Given the mobile variants of the affected sections
    When they render on /es/
    Then they are translated too
```

- [ ] The nine components read their copy from `src/i18n/translations`
- [ ] Spanish copy written and reviewed by a person, at the declared language
      level
- [ ] `TODO(MIS-091)` comments removed as each component is closed
- [ ] Both routes reviewed, desktop and mobile
- [ ] Guard in place so the bug cannot return unnoticed

---

## Epistemic value

The site has been half-translated in production and nobody reported it. That
says something about how the site is actually reviewed — and it is worth
knowing before the next bilingual surface ships.

## Pragmatic value

The Spanish market gets a Spanish page. Search engines get a page whose
declared language is true.

---

## Execution log

- 2026-08-18 — Opened from the standards review requested by the Oracle. The
  finding comes from MIS-091: the type-checker surfaced it, no visual review
  ever had.

---

## Execution Reality

*(Fill when closing)*

> *"The ideal plans show the intention. The real plans show the knowledge."*
