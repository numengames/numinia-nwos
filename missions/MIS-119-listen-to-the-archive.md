---
# CORE — the ten fields the build verifies (web/src/content.config.ts).
id: "MIS-119"
title: "Listen to the archive: speak any document aloud from its page"
status: done
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
created: "2026-08-28T10:22:50Z"
created_source: "git:1fae837"
created_confidence: exact
updated: "2026-08-28T12:38:31Z"
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

## QA log (Oracle, 2026-08-28)

Five defects found by the Oracle using the deployed player, each fixed in
its own PR against this mission. Defects 1-3 were logged in #108's branch
but the squash merge landed before the doc commit — recorded here now,
which is itself a lesson: **the mission doc travels in the same commit as
the fix, not after it.**

| # | Defect (as experienced) | Root cause | Fix | PR |
|---|---|---|---|---|
| 1 | Toolbar wrapped badly on mobile; changing rate mid-play killed playback after one chunk | `cancel()` fires the cancelled utterance's end/error events, which raced the new queue | Generation counter (`gen`) stales out superseded callbacks; mobile wrap CSS | [#105](https://github.com/numengames/numinia-nwos/pull/105) |
| 2 | Pause, navigate to another page, come back: position lost, restarts from the top | Page teardown called `stopAll()`, zeroing `queueIndex`; nothing persisted it | Position + rate persist in `sessionStorage` (route+selector key, chunk-count fingerprint); teardown saves, only Stop / natural end clear | [#107](https://github.com/numengames/numinia-nwos/pull/107) |
| 3 | Pause then Play in the same tab restarted from the top (or went silent) | Pause leaned on `speechSynthesis.pause()`/`resume()`, unreliable across engines (Chrome drops paused queues ~15s; Android ignores mid-utterance pause; Linux speech-dispatcher ends the utterance on pause) | Pause owns the position: `cancel()` the engine, keep `queueIndex`; engine pause never used | [#108](https://github.com/numengames/numinia-nwos/pull/108) |
| 4 | After #108 deployed, the player was entirely dead on live — every button inert, so "pause still doesn't work" | **Regression from the MIS-120c i18n sweep (#110):** the client script called `T(key, fallback)` for its UI strings, the sweep serialized translations as `data-t-*` attributes, but `T` itself was never defined — first click threw `ReferenceError: T is not defined` | `T` reads `root.dataset` with the English fallback; a missing attribute degrades to English instead of killing the player | #111 |
| 5 | Resume restarted the sentence/paragraph, not the word — early in the first chunk it was indistinguishable from restarting the document | Position was tracked at chunk granularity (~280 chars); pausing early in a chunk lost up to a chunk of progress | Utterance `boundary` events track the last word spoken; pause freezes chunk + char offset, resume re-speaks from that word. Engines without boundary events keep chunk-start behavior | [#111](https://github.com/numengames/numinia-nwos/pull/111) |
| 6 | Changing speed mid-play restarted the text — a rate change must keep reading, only faster or slower | The rate handler preserved the chunk but relied on `boundary` events for the word offset; on engines that never fire them (Chrome/Edge network voices) the offset was 0, so playback fell back to the chunk start — early in the document, the top | Elapsed-time fallback: when no boundary was heard, spoken text is estimated from time × speaking pace (conservative, ~85%), so rate change, pause, and teardown all keep an approximate word position on every engine | #112 |

The pattern across all six: defects 1-3, 5 and 6 came from **trusting the
engine's own state** (event ordering, queue survival, pause flag, position,
boundary reporting); the component now treats the engine as a
fire-and-forget speaker and keeps all state — including a time-based
position estimate for engines that report nothing — on its side. Defect 4 came from **a cross-mission edit shipping
without exercising the code path it touched** — the sweep changed the
player's script and no click was ever made on the result.

The pause/stop contract, as the Oracle specified it: **❚❚ Pause** holds the
position — the next ▶ resumes from the word where it stopped. **■ Stop**
discards it — the next ▶ starts from the top. **Rate** changes speed in
place — the reading continues where it was, never restarting. Position
survives leaving the page (session-scoped); it does not survive the
browser session.

---

## Closure

- **What was done:** The "Listen" control on every corpus page: Web Speech
  API, no network, no React island — the text never leaves the machine.
  Hardened through six rounds of Oracle QA on the deployed site (see QA
  log above): the player owns its position at word granularity, survives
  navigation, and honors the contract — pause holds, stop discards, rate
  changes in place.
- **What diverged, and why:** The component's core assumption inverted
  during QA. v1 trusted the engine (its pause, its queue, its events);
  every defect traced to that trust. The shipped design treats the engine
  as a fire-and-forget speaker — all state, including a time-based
  position estimate for engines that report nothing, lives in the
  component. Defect 4 was not this mission's code at all: the MIS-120c
  sweep shipped an undefined `T()` into the player's script and killed it
  on live.
- **Evidence:** PRs [#105](https://github.com/numengames/numinia-nwos/pull/105),
  [#107](https://github.com/numengames/numinia-nwos/pull/107),
  [#108](https://github.com/numengames/numinia-nwos/pull/108),
  [#111](https://github.com/numengames/numinia-nwos/pull/111),
  [#112](https://github.com/numengames/numinia-nwos/pull/112), all merged;
  CDP-driven verification of the built page under both engine profiles
  (with and without boundary events); Oracle's ear on numinia.org
  confirmed pause, stop, and rate 2026-08-28. Future work (forward/rewind
  controls; reload returns to the top) is on the kanban, not in scope.
- **Closed:** 2026-08-28 · **by:** the Oracle (manual QA on live), fixes by Ursa
