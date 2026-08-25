---
# NÚCLEO — los diez campos que el build verifica (web/src/content.config.ts).
# Si falta uno o cambia de tipo, `npm run build` falla. Es la única parte de
# este documento que algo comprueba; todo lo demás es convención.
id: "MIS-000"
title: "One line, in the imperative: what this mission does"
status: backlog          # draft|backlog|in-progress|in-review|done|frozen|cancelled
priority: medium         # critical|high|medium|low
effort: S                # XS|S|M|L|XL
guild: alchemists        # alchemists|sentinels|exegetes|procurators
area: archive            # archive|web|infrastructure|governance|product
type_execution: digital  # biological|digital|hybrid
assigned_to: null        # agent-id, or null while unassigned
completed: null          # YYYY-MM-DD when status becomes done

# REGISTRO — not consumed by the build, but every document in this archive
# carries them (S-001 §5).
type: mission
version: "1.0.0"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
author: "agent-id"
owner: "oracle"
tags: [area, guild]
license: "CC-BY-4.0"

# OPCIONALES — se ponen cuando aportan, se omiten sin culpa.
# depends_on: []                  # other MIS ids that must land first
# requires_oracle_approval: false # true when the mission leaves the system
# parent_mission: "MIS-000"       # when this is a phase of a larger mission
# blocked_reason: null            # why it is stopped, in one sentence
# context: "YYYY-MM-DD"           # when the premise was last checked
---
# MIS-000 — Title

> **Summary:** one sentence. What this mission changes.
> **Epistemic:** what you learn by reading this document.
> **Pragmatic:** what you can do with it.
> **Audience:** Agents · Oracles

---

## Scope

What this mission touches, and where it stops. Concrete: files, folders,
series, routes. If a boundary matters, say it — *"only `numinia-nwos`"*,
*"the glob, not the documents"*.

<!-- Optional, in this same block when the boundary is contested:
## Out of scope
What someone would reasonably expect to be included and is not, and why. -->

---

## Acceptance criteria

- [ ] Verifiable by someone who did not do the work
- [ ] With the command that verifies it, when there is one
- [ ] Never "X is improved" — say what returns what

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.)*

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
