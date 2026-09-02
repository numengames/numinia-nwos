---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-141"
uid: ""
title: "Highlight the sentence SpeechPlayer is currently reading"
status: todo
priority: medium
effort: S
guild: "Alchemists"
territory: "TBA"
type_execution: digital
assigned_to: null
completed: null

# REGISTRO
type: mission
version: "1.0.0"
created: "2026-09-02T12:19:34Z"
created_source: "git:e4b94e7"
created_confidence: exact
updated: "2026-09-02T12:19:34Z"
author: "ursa"
owner: "oracle"
tags: [web, alchemists, accessibility]
license: "CC0-1.0"

paths: [web/src/components/SpeechPlayer.astro]
depends_on: ["MIS-119"]
---
# MIS-141 — Highlight the sentence SpeechPlayer is currently reading

> **Summary:** while `SpeechPlayer` (MIS-119) speaks a document, visually
> mark the sentence being spoken right now, and keep it in view as playback
> advances — sighted readers can follow the voice with their eyes, and
> readers with attention or reading-tracking difficulties get a moving
> anchor instead of a wall of undifferentiated text.
> **Epistemic:** the position data this needs already exists in the player
> (`onboundary`'s `charIndex`, `queueIndex`, `chunks`) — this mission is
> about wiring an existing signal to the DOM, not inventing new tracking.
> **Pragmatic:** every document page that carries the Listen control gains
> a visible reading position, with no new dependency and no server change.
> **Audience:** Agents · Oracles

---

## Context

`SpeechPlayer.astro` (MIS-119) already listens for the engine's
`onboundary` event and records `lastBoundary` — the character offset the
voice has reached inside the current chunk (`web/src/components/
SpeechPlayer.astro:333-338`). That position is used today only to resume
correctly after pause or a rate change (`speakFrom`, `charOffset +
spokenInUtterance()`). It is never rendered: nothing in the DOM shows a
reader which sentence, or which chunk, is being spoken.

The player reads from a **clone** of the target element's DOM
(`readDocument`, line 109-115) built fresh on every `Play`/`start()` — not
the live nodes the page renders. Wiring highlighting requires mapping a
chunk index (and, ideally, a boundary offset inside it) back to a range in
the *live* `article` DOM, since that is what the reader is looking at.

## Scope

- `web/src/components/SpeechPlayer.astro` — client script only. Add:
  - a mechanism to locate, in the live DOM, the text range corresponding
    to `chunks[queueIndex]` (sentence- or chunk-granularity is acceptable;
    word-level via `lastBoundary` is a stretch goal, not required);
  - a visual marker (e.g. a `<mark>`-based wrap, or a CSS class toggled on
    the matching text node's wrapping element) applied to that range while
    `state === "speaking"`, moved forward as `speakFrom` advances, and
    removed on `stopAll`/natural end/teardown;
  - `scrollIntoView({ block: "nearest" })` (or equivalent) on the marked
    range when it changes, so long documents keep the active sentence in
    the viewport without a jarring jump.
- CSS for the highlight: visible against both the site's light and dark
  themes, and not solely color-coded (WCAG 1.4.1 — pair color with e.g. an
  underline or background so a reader who cannot perceive the color
  difference still sees the marker).

**Out of scope:** word-level highlighting is a nice-to-have, not a
requirement — `lastBoundary` support varies by engine (the component's own
comments note some engines never fire `onboundary`); a chunk/sentence-level
highlight that degrades gracefully when boundary events are absent is the
acceptance bar. Rewriting the chunking or queue state machine. Any change
to voice selection, rate handling, or persistence — MIS-119's existing
behavior there is out of scope and must not regress (see Acceptance
criteria).

## Acceptance criteria

Falsifiable at base commit `e4b94e7`:

```
✓  grep -n "mark\|sp-mark\|sp-active" web/src/components/SpeechPlayer.astro
   matches a highlight mechanism        (today: 0 matches — comment-only "mark")
✓  Manual QA: open a canon document with Listen, press Play — a visible
   marker appears on the sentence/chunk being spoken and advances as
   playback proceeds, in Firefox at minimum (today: no marker ever appears)
✓  Manual QA: press Stop, or let the document finish — the marker is
   removed                              (today: N/A, no marker exists)
✓  Manual QA: pause, then Resume — the marker reappears at the resumed
   position, not reset to the document start
✓  cd web && npm run build                              exit 0, page count unchanged
✗  word-level highlighting works in every engine         (not required — see Out of scope)
```

- [ ] Verifiable by someone who did not do the work
- [ ] False at the base commit — say what it returns today
- [ ] Phrased as a final state, not as a delta
- [ ] MIS-119's existing behavior (rate cycling, pause/resume position,
      cross-navigation progress persistence, no-engine fallback) verified
      unregressed — same manual QA steps MIS-119's closure used, rerun.
- [ ] Highlight style does not rely on color alone (WCAG 1.4.1)

## Closure

*(Fill when the mission closes. Not before, and not with intentions.
Add here — never edit `Scope` or the criteria to match what happened.)*

- **What was done:** the real state, not the planned one.
- **What diverged, and why:** the difference between the plan and what
  happened. **This is the paragraph that produces knowledge** — a mission
  that went exactly as planned teaches nothing that the plan did not
  already say.
- **Evidence:** command, figure, commit, or route that proves it.
- **Closed:** YYYY-MM-DD · **by:** agent-id
