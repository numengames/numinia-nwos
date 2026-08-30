---
id: "MIS-113"
title: "Generate the README's index from the sections, instead of maintaining it by hand"
status: todo
priority: medium
effort: M
guild: "Alchemists"
territory: "TBA"
type_execution: digital
assigned_to: null
completed: null

type: mission
version: "1.0.0"
created: "2026-08-25T19:34:05Z"
created_source: "git:31fcd63"
created_confidence: exact
updated: "2026-08-25T19:49:11Z"
author: "ursa"
owner: "oracle"
tags: [web, readme, index, generated]
license: "CC-BY-4.0"
context: "2026-08-25"
depends_on: ["MIS-111"]
paths: [README.md, scripts/, web/src/content.config.ts]
---
# MIS-113 — Generate the README's index from the sections, instead of maintaining it by hand

> **Summary:** the README's *"Where things live"* section stops being a
> hand-kept list and becomes generated from the sections themselves.
> **Pragmatic:** the repo's front door stops going stale when a folder changes.
> **Audience:** Agents · Oracles

---

## Scope

`README.md` §*"Where things live"* — today a hand-maintained description of the
repository layout — becomes **generated**: one entry per corpus section, with
its document count, produced by a script rather than typed.

The counts it would carry today:

```
canon 12 · standards 5 · decisions 13 · protocols 14
blueprints 24 · missions 111 · debt 35
```

The same numbers a section index shows, from the same source, so the README and
the site cannot disagree about what the archive contains.

> **This document is deliberately incomplete: it has a Scope and no acceptance
> criteria.**
>
> `depends_on: [MIS-111]`. What the index should contain, how a section is
> named, and what counts as "a document in a section" are questions `MIS-111`
> has to answer first — it builds the section indexes, and it will discover the
> real shape of the problem: whether `debt/` is inside or outside, what happens
> to documents that belong to no section, and whether the count is of files or
> of published pages.
>
> **Writing criteria now would mean inventing those answers.** A criterion must
> be falsifiable at the base commit, and half of these cannot even be stated
> until the section work exists. The criteria are written when `MIS-111`
> closes, in this document, before this mission opens.
>
> `status: draft` and not `backlog` for exactly that reason: it is not ready to
> be picked up.

### Out of scope

The README's prose. Only the index section is generated; everything else stays
hand-written, and `MIS-112` is what makes the home page render it.

The `[MANUAL]`/`[CI]` question — whether the generator runs in CI or is a
command someone runs — is decided when the criteria are written, because it
depends on whether a stale index should fail a build.

---

## Acceptance criteria

*(Deliberately empty. Written when `MIS-111` closes and its findings are known.
See the note in Scope: criteria invented before the dependency resolves are not
falsifiable, they are guesses.)*

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.
Add here — never edit `Scope` or the criteria to match what happened.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:**
