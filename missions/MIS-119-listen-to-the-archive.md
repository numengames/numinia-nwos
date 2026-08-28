---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-119"
title: "Listen to the archive: speak any document aloud from its page"
status: in-progress
priority: high
effort: S
guild: alchemists
area: web
type_execution: digital
assigned_to: "ursa"
completed: null

# REGISTRO
type: mission
version: "1.0.0"
created: "2026-08-28"
updated: "2026-08-28"
author: "ursa"
owner: "oracle"
tags: [web, alchemists, accessibility]
license: "CC-BY-4.0"

paths: [web/src/components/SpeechPlayer.astro, web/src/components/DocToolbar.astro]
---
# MIS-119 — Listen to the archive: speak any document aloud from its page

> **Summary:** every rendered document page gets a **Listen** control beside
> the .md/.pdf downloads: play, pause/resume, stop, 1×/1.5×/2×, and an
> estimated duration that recalculates with the rate.
> **Epistemic:** what a sovereign, zero-infrastructure text-to-speech looks
> like — the browser's own voices, nothing leaving the reader's machine —
> and what that choice honestly costs.
> **Pragmatic:** any document in the archive can be listened to, on any
> page that carries the toolbar, with no server, no build step, no vendor.
> **Audience:** Agents · Oracles

---

## Scope

One new component, `web/src/components/SpeechPlayer.astro`, mounted inside
`DocToolbar.astro` — the Copy / .md / .pdf toolbar already present on the
six document detail pages (`corpus/[...slug]`, `missions/[id]`,
`audits/[id]`, `decisiones/[id]`, `legal/[slug]`, `planos/[id]`). One
component edit reaches all six; the pages themselves are not touched except
to pass the document language when the frontmatter declares one.

The voice is the **Web Speech API** — the browser's built-in synthesis
(Oracle decision, kanban `t_5ffb685b` + confirmation 2026-08-28: *"la idea
es que fuera el audio de los navegadores"*). Zero infrastructure, zero
cost, sovereign: the text never leaves the reader's machine.

### Out of scope

- **Pre-generated audio (v2).** Lazy Piper generation with shared cache
  needs a generator endpoint and writable storage — that is the Oráculos
  tunnel work, its own mission when the time comes.
- **The `/print/` pages** — they exist to be printed to PDF, not read in
  the browser.
- **Word-level highlighting** — `boundary` events are unreliable across
  engines; recorded as a v2 candidate, not attempted here.
- **A language selector for the site** — separate request, its own card
  (`t_3d86492b`), queued after this mission.

### The honest limitation, stated at opening

Voice quality is the reader's OS. macOS and Android ship good voices;
a bare Linux desktop may offer robotic ones, and es-ES coverage varies.
That is the price of sovereignty in v1, it is documented here rather than
discovered later, and v2 (pre-generated, consistent voice for canon)
exists to pay it down.

---

## Acceptance criteria

> Every criterion is FALSE at base commit `ba4b688`.

```
✓  grep -rl "SpeechPlayer" web/src/components/DocToolbar.astro returns a
   match — the control ships on every toolbar page      (today: 0 matches)

✓  pressing Listen speaks the article text; Pause, Resume and Stop work
   and return the control to a resumable/idle state     (today: impossible)

✓  a rate control offers 1× / 1.5× / 2× and the shown estimate
   recalculates when it changes                         (today: n/a)

✓  before playing, the control shows an estimate derived from the visible
   word count at 180 wpm adjusted by rate               (today: n/a)

✓  the Listen button carries aria-pressed and an aria-label; every control
   is reachable and operable by keyboard                (today: n/a)

✓  a browser without speechSynthesis gets a disabled control whose title
   says why — never a broken button                     (today: n/a)

✓  cd web && npm run build exits 0 with the same page count as base
                                                        (today: n/a)
```

---

## Design bindings (Sistema de Diseño v5.1.0)

- Controls follow the toolbar's existing vocabulary: mono uppercase
  `0.65rem`, `border-border`, teal accent on hover — the same classes
  `DocToolbar` already uses. No foreign CSS, no vendored widget
  (the §9.8 rule `SiteSearch` established in MIS-117).
- Active state dresses in ink: speaking = `aria-pressed="true"` + accent
  border. State transitions are states, not §10 catalogue pieces.
- `prefers-reduced-motion`: nothing animates in this control anyway — the
  only dynamic surface is label text, which is motion-free by construction.

## Engineering notes (the one hard part)

Browser engines misbehave on long utterances — Chrome is documented to cut
synthesis after roughly 15 seconds of a single utterance. The component
therefore **chunks** the article text on sentence boundaries (~280 chars per
utterance), queues the chunks, and keeps a `resume()` keepalive against the
engine's spurious pause state. Rate changes apply from the next chunk.
`speechSynthesis.cancel()` fires on page unload so the voice does not
outlive the page. Voices load asynchronously (`voiceschanged`); the pick is
lazy, matches the document language when possible, and falls back to the
engine default rather than failing.

The document language comes from frontmatter (`idioma_canonico` / `lang`)
when declared, else the site default (`en`) — a Spanish document read by an
English voice is unusable, and the corpus still carries Spanish documents
mid-migration (ADR-024).

---

## Closure

*(Fill when the mission closes.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** · **by:**
