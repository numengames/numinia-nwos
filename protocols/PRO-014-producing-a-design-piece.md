---
id: "PRO-014"
uid: ""
title: "Producing a design piece: the order of decisions and the checklist before delivering"
type: protocol
status: active
version: "1.0.0"
created: "2026-09-07T14:00:00+02:00"
updated: "2026-09-07T14:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [protocol, design, agents, checklist, tokens]
license: "CC0-1.0"
visibility: "public"
applies_to: "any agent producing a design piece"
mandatory: true
---

# PRO-014 — Producing a design piece

> **Summary:** The order in which design decisions are taken, the tokens that
> may be used, and the checklist that must pass before a piece is delivered.
> **Epistemic:** Nothing here is a new rule. Every constraint is stated in
> `STD-008`; this is the order of operations for applying them.
> **Pragmatic:** Followed literally by an agent producing a piece.
> **Audience:** Agents

---

## 0. Where this came from and what it is not

This was §19 of `STD-008`, the design system standard, under the heading
*Agent contract*. It is a procedure — a precedence list, a numbered algorithm,
a checklist — filed inside a standard, which is the layer that states **what**
must hold rather than **how** to do it.

**It defines nothing.** Every value, threshold and constraint it names lives in
`STD-008`, and a reference here that disagrees with the standard is wrong by
`CORE-01`..`05`: the standard is the rule, this document is the order in which
the rule is applied. Where this checklist is silent and the standard is not,
the standard still binds.

## 1. Precedence

1 The person's instruction → 2 Accessibility and HARD RULES → 3 Brand & Culture → 4 this document → 5 previous material → 6 own judgement. If 1 contradicts 2, flag it and propose the accessible alternative before executing.

## 2. The algorithm

```
1 Medio (`STD-008` §13) → 1b Registro (`STD-008` §2.8): Umbral | Velo | Low-poly | Píxel — el Velo solo en Nocturno → 2 Modo (emite=Nocturno | imprime=Diurno; el registro píxel no tiene Diurno) → 3 Nivel de lengua (`STD-008` §11)
→ 4 Tokens (§3) → 5 Retícula (`STD-008` §5) → 6 Escala tipo (`STD-008` §4.3) → 7 Iconos Phosphor (`STD-008` §7.1) → 7b ¿Gráficas? paleta de datos (`STD-008` §3.8)
→ 8 ¿Juego? rareza (`STD-008` §3.6) → 8b ¿3D? registro low-poly (`STD-008` §2.6) → 9 ¿Registro píxel? producción (`STD-008` §2.4, §3.7, §4.5, §5.1, §9.6, §10.4, §13.9)
→ 10 ¿Movimiento? solo del catálogo (`STD-008` §10.1) → 11 Copy en el nivel fijado → 12 Checklist (§4)
```

A value outside §3 MUST NOT be invented.

## 3. Canonical tokens (W3C DTCG)

The tokens are not written here. They live in
`web/public/diseno/kit/5.1.0/sistema.tokens.json`, published with a sha256
digest in `kit/manifest.json`, and any consumer reads them from there.

The generator `scripts/generate-design-kit.mjs` builds the kit from this
document and stamps it with the `version:` field above.

**A token is never quoted in prose.** A value copied into a sentence is a
value that will disagree with the file the moment either changes — which is
exactly what happened while this section held a copy: it said `v5.0.0` for a
document declaring `5.1.0`.

## 4. Pre-delivery checklist

- [ ] **Register declared before the medium** (`STD-008` §2.8): Umbral, Velo, low-poly or pixel; the boundary between registers, visible.
- [ ] Mode, language level and **40/40/20 dose** correct (mix test `STD-008` §2.1: neither Blade Runner nor a gardening catalogue).
- [ ] Colors only from §3; max three per composition; Coral and Grana do not coexist; text variants over light.
- [ ] Spacing on the 4-scale; only self-hosted Geist Sans/Mono; one display level; tabular Mono figures.
- [ ] Phosphor icons by weight; never thin/duotone; label on first use; no mixing weights in a row; the scarab and the Moon never as icons.
- [ ] Fills with light text: `#017C8D` background and states that **darken** (hover turquesa-text, active `#015866`; destructive hover grana-text). Tertiary only over the base background. Data with the `STD-008` §3.8 palette and never with rarity.
- [ ] `STD-008` §9.8 controls: the active in ink; label always; modal with the canonical veil and trapped focus; table with `aria-sort`; bar only with a real percentage.
- [ ] Shape: `control` radius on controls, `marco` on cards and dialogs; straight edges only in pixel and printed tables. Messages per `STD-008` §9.7: cause + way out, never mute.
- [ ] Surface identified on the `STD-008` §2.5 map; if Platform: Diurno by default, ink primary, compact density, wallets and amounts in Mono. If 3D: low-poly register `STD-008` §2.6, flat palette color, no photographic textures.
- [ ] Era only through sanctioned devices: `1920 · 2020 · 2120` seal, single patina (`STD-008` §6.3), lexicon as spice; with them removed, the piece is still the System's.
- [ ] Correct brand register: monochrome signature on the corporate; color, glyphs and mosaic only in play (`STD-008` §8.5), with a label on first use and ≥3:1 if the brand is the only identifier.
- [ ] Brand per `STD-008` §8: correct lockup, Arena/Noche, respect, calm zone over texture; no recoloring/rotating/shadowing/deforming; the scarab is the `STD-008` §8.4 path.
- [ ] Texture only on Nocturno backgrounds ≤6 %, `cover`, elevated surfaces flat, never in Diurno.
- [ ] If there is game: full rarity with progressive treatment and name; never in the corporate.
- [ ] Motion only from the `STD-008` §10.1 catalogue; one orchestrated moment; one sweep maximum; pulse only on obtaining; no parallax/glitch; `prefers-reduced-motion` respected; focus not animated.
- [ ] Buttons: one primary per view; destructive with confirmation and far from the primary; labels = verbs, no all-caps.
- [ ] AA contrasts; nothing by color alone; measure ≤90; lunar-phase sequences only where a real sequence exists; closing with the scarab on a major piece; file name `STD-008` §11.
- [ ] If pixel register: Píxel-16 only, neutrals ≥60 %, Grana without dialogue, 12/24/48 grid, integer scaling with `pixelated`, Noche outline, Pixelify at multiples, the scarab sprite the canonical one, full register entry/exit, and never in level III.
- [ ] Pixel Art produced at ×1: legible silhouette, continuous clusters, regular diagonals, no *pillow shading*, top-left light, maximum 2–4 colors per material, dithering only between adjacent colors, no decorative loose pixels.
- [ ] Sprites: stable cells and anchors, 2–4 frames, 120/200/320 ms durations, no interpolation or subpixel; reduced motion shows the most informative pose.
- [ ] Export: indexed PNG, binary transparency, Píxel-16 palette verified, uniform sprite sheet, ×1 test + integer scale + minimum viewport.
- [ ] If Velo register: only alphas over canonicals (zero new hexes); grid ≤3 % and fog ≤8 %; atmosphere behind the content, never on cards or elevated surfaces; glass only with atmosphere behind and text ≥ secondary; no Velo in Diurno; one dominant matter per view (grid and relief do not coexist); animations 10–11 only here; the orchestrated moment is still one.
- [ ] If there is sky (`STD-008` §2.7.1): weights 60/25/10/4/1 with the `STD-008` §3.6 colors, no parallax or cursor reaction, stopped with reduced motion; the grain (`STD-008` §6.5) only on paper, ≤5 %, never with relief or grid.
- [ ] Icons from the `STD-008` §7.3 subset; mode switch showing the **destination** mode; the book's icons only inside the paper register.
- [ ] If living paper (`STD-008` §13.12): third voice only in the book (roman body, SC drop cap and titles, italic lore, no synthetic small caps); bar that yields but does not disappear; glossary with a source per definition; moon as bookmark (waxing phases); `abierto / tras el Umbral` states; .md/pdf/epub downloads visible; literary opening separated from the body; full colophon with the scarab; the invoice inherits none of this.
- [ ] One element has been removed before delivering.

## 5. Reusable instruction fragment

The fragment is published as `web/public/diseno/kit/5.1.0/sistema.prompt.txt`,
stamped with the version above and hashed in `kit/manifest.json`. Paste that
file; do not retype it from here.

It is a summary, and it says so: where it disagrees with the numbered
sections, **the sections win**. It carried `v5.0.0` under a `5.1.0` document
for exactly as long as it lived in this file as prose — a summary of a
document, kept inside that same document, has no mechanism to notice when
the document moves.
