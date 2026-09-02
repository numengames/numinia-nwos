---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
# If one is missing or changes type, `npm run build` fails. It is the only
# part of this document that anything checks; everything else is convention.
id: "MIS-000"
uid: ""
title: "One line, in the imperative: what this mission does"
status: todo
# ^ todo|in-progress|in-review|done|frozen  (STD-001 §7, ratified ADR-027)
#   Keep the comment on its own line: an inline `#` after the value ends up
#   INSIDE the value in some parsers — that is how D-009's corrupt document
#   was created, by copying this template.
priority: medium         # critical|high|medium|low
effort: S                # XS|S|M|L|XL
guild: "Alchemists"
territory: "Archive"
type_execution: digital  # biological|digital|hybrid
assigned_to: null        # agent-id, or null while unassigned
completed: null          # YYYY-MM-DD when status becomes done

# REGISTRO — not consumed by the build, but every document in this archive
# carries them (STD-001 §5).
type: mission
version: "1.0.0"
created: "YYYY-MM-DD"
created_source: "git:84a9f71"
created_confidence: inferred
updated: "YYYY-MM-DD"
author: "agent-id"
owner: "oracle"
tags: [area, guild]
license: "CC0-1.0"

# OPCIONALES — se ponen cuando aportan, se omiten sin culpa.
# depends_on: []                  # other MIS ids that must land first
# requires_oracle_approval: false # true when the mission leaves the system
# parent_mission: "MIS-000"       # when this is a phase of a larger mission
# blocked_reason: null            # why it is stopped, in one sentence
# context: "YYYY-MM-DD"           # when the premise was last checked
# paths: []                       # repo paths the executor should start from,
#                                 # e.g. [web/src/pages/, missions/]. Saves
#                                 # scanning the whole repo; a hint, not a fence.
---
# MIS-000 — Verb + object + result

> **Summary:** one sentence. What this mission changes.
> **Epistemic:** what you learn by reading this document.
> **Pragmatic:** what you can do with it.
> **Audience:** Agents · Oracles

<!-- Title: verb + object + result, e.g. "Retire the /print/ intermediates
     from the served site". Not "Print pages" — a noun is not a mission. -->

---

## Scope

What this mission touches, and where it stops. Concrete: files, folders,
series, routes. If a boundary matters, say it — *"only `numinia-nwos`"*,
*"the glob, not the documents"*.

> **Scope and Acceptance criteria are written when the mission OPENS and are
> not edited afterwards.** What happened goes in `Closure`. Correcting the
> brief so it matches the outcome deletes the difference between plan and
> reality — and that difference is the only thing a closed mission teaches.

<!-- Optional, in this same block when the boundary is contested:
## Out of scope
What someone would reasonably expect to be included and is not, and why. -->

---

## Acceptance criteria

> **Every criterion must be FALSE at the base commit.** One that already
> passes before the work starts graduates nothing — it is decoration. If a
> criterion cannot be shown false today, it is not a criterion.
>
> **State the final state, not a delta.** The corpus moves under your feet:
> a criterion that hard-codes a count expires between being written and being
> checked. Assert what must be true at the end, not how much must change.

```
✓  curl -s numinia.org/print/missions/mis-109/ returns 404   (today: 200)
✓  find web/dist/print -name index.html returns 0            (today: 247)
✗  278 /print/ pages are retired                             (a delta — it rots)
✗  the site is more coherent                                 (not falsifiable)
```

- [ ] Verifiable by someone who did not do the work
- [ ] With the command that verifies it, when there is one
- [ ] False at the base commit — say what it returns today
- [ ] Phrased as a final state, not as a delta

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.
Add here — never edit `Scope` or the criteria to match what happened.)*

- **What was done:** the real state, not the planned one.
- **What diverged, and why:** the difference between the plan and what
  happened. **This is the paragraph that produces knowledge** — a mission that
  went exactly as planned teaches nothing that the plan did not already say.
- **Evidence:** command, figure, commit, or route that proves it.
- **Closed:** YYYY-MM-DD · **by:** agent-id

<!--
OPTIONAL SECTIONS — add only when they earn their place.

## Story
As a {persona}, I want {goal}, so that {benefit}.
Useful for product missions and anything involving a real user. For a small
technical mission it forces inventing a fictional persona to say "take debt/
out of the glob" — omit it there.

## Epistemic value
ONLY when the mission claims it learns something. Then with a hypothesis and
how it is validated:
  Hypothesis: <what we believe>
  Validated by: <command, measurement, or observation that could refute it>
An "epistemic value" with no method is an intention, not knowledge.

## Pragmatic value
What practical capability this leaves behind, when it is not obvious from Scope.

## Execution log
Running notes during a long mission. Small missions do not need one.
-->
