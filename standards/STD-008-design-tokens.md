---
id: "STD-008"
uid: ""
title: "Design tokens"
type: documentation
subtype: standard
status: active
version: "7.0.0"
created: "2026-08-18T13:41:01Z"
updated: "2026-09-09T11:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "Product"
registration: registered
related: ["CAN-008", "STD-023", "PRO-014", "STD-010", "ADR-044"]
license: "CC0-1.0"
series_change: "7.0.0 — the standard takes the ADR-043 shape and splits four ways under ADR-044: 9,934 -> 470 words of body here, as twelve plated rules DSN-001..012 (the old DS-01..04 conformance checks are DSN-009..012, same checks); every closed list is the register STD-023; every recipe is a blueprint (BLU-009 web, BLU-010 pixel, BLU-011 book and Velo); the kit source is packages/design-kit. Major: sections §2-§17 were cited by CAN-008 and PRO-014 and no longer exist; those citations are repointed in the same change. Direction prose that CAN-008 §3 already holds is not carried."
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Design tokens

> **Summary:** Sixteen colours and no new hexes; three self-hosted
> typefaces; a 4 px spacing scale; two radii; one icon family; fourteen
> animations; AA contrast everywhere and nothing conveyed by colour alone.
> The values are the register `STD-023` and the kit; this standard says
> which of them are rules.
> **Epistemic:** Which parts of the design system answer yes or no — and
> are therefore checkable — as opposed to direction, which is judged.
> **Pragmatic:** What an audit of any Numen Games surface can fail on.
> **Audience:** Agents · Oracles

**Binds:** every public surface of Numen Games and Numinia — web, product,
document, deck, codex, pixel scene — and every consumer of the kit.
**Does not bind:** creative direction, matter, motion philosophy and voice
(`CAN-008`), nor how a piece is produced (`PRO-014`).

---

## Rules

**DSN-001 — Palette is closed.** The sixteen colours of `STD-023`, their
text variants and the rarity scale; ramps and data palettes order them. A
new hex value is a breach, not a variation.

**DSN-002 — Type is self-hosted.** Geist, Geist Mono, Pixelify Sans and
Alegreya as variable woff2 from `/assets/fonts/` with their licence; no
third-party font request in production. Fake bold, fake italic and
synthetic small caps are forbidden.

**DSN-003 — Space and shape on the scale.** Every gap is a value of the 4 px
scale; every radius is `control` (6 px) or `frame` (8 px), and the pixel
register has none. Focus is the system outline, always visible, never
animated.

**DSN-004 — One icon family.** Phosphor, from the house subset, one weight
per row; `thin` and `duotone` never. The scarab and the Moon are marks, not
icons.

**DSN-005 — Contrast AA.** Text meets WCAG 2.2 AA (4.5:1; 3:1 large and
components) in both modes; a texture, veil or patina MUST NOT drop the
effective contrast below it. Touch targets 44×44.

**DSN-006 — Never colour alone.** Every state and category carries a second
channel — name, symbol, position, border or focus. Rarity included.

**DSN-007 — Integer pixels.** Text and pixel-register assets sit on integer
coordinates; no half-pixel transforms, no interpolation, no forced line
breaks with spaces.

**DSN-008 — Text before motion.** The full text is in the DOM before any
animation; `prefers-reduced-motion` stops every decorative cycle and
completes every functional state instantly.

**DSN-009 — The kit is installed, never copied.** The published kit is
generated from `packages/design-kit/`; a hand-edited token, stylesheet or
kit copy is a breach.

**DSN-010 — A value exists or it does not.** A value used in a piece is in
the token file or in `STD-023`; one that is in neither does not exist.

**DSN-011 — Public routes pass AA.** Every public route passes the
accessibility gate in both modes before it ships.

**DSN-012 — Motion is catalogued.** Every animation is one of the fourteen
in `STD-023`; parallax, glitch, ambient loops outside the sanctioned two,
animated focus and autoplay with sound are forbidden.

## Check

| Rule | Verified by |
|---|---|
| DSN-009 | `scripts/generate-design-kit.mjs --check` — byte-identical |
| DSN-005, DSN-011 | axe + Playwright on every public route, both modes (`ARC-010`) |
| DSN-001, DSN-003, DSN-010 | `PRO-014` step 3 — value lookup against the token file |
| DSN-002, DSN-004, DSN-006, DSN-007, DSN-008, DSN-012 | `PRO-014` checklist — visual review |

## Why

A design system is mostly direction, and direction cannot fail a check.
These twelve are the exceptions: each is a number, a file or a DOM
property that either holds or does not. Keeping them apart from the
direction lets the direction change freely while the checks stay stable —
and lets another organisation install the kit and keep the checks without
inheriting the taste.

## References

| ID | Name | Why cited |
|---|---|---|
| `CAN-008` | Visual identity | the direction this standard does not encode |
| `STD-023` | Design values | every closed list the rules point at |
| `PRO-014` | Producing a design piece | the manual checks and their order |
| `ADR-044` | Consumers install packages | why the kit is a package |
