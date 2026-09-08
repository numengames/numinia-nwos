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
1 Medio (`STD-008` §13) → 1b Registro (`CAN-008` §3.7): Umbral | Velo | Low-poly | Píxel — el Velo solo en Nocturno → 2 Modo (emite=Nocturno | imprime=Diurno; el registro píxel no tiene Diurno) → 3 Nivel de lengua (`CAN-008` §3.10)
→ 4 Tokens (§3) → 5 Retícula (`STD-008` §4) → 6 Escala tipo (`STD-008` §3.3) → 7 Iconos Phosphor (`STD-008` §6.1) → 7b ¿Gráficas? paleta de datos (`STD-008` §2.8)
→ 8 ¿Juego? rareza (`STD-008` §2.6) → 8b ¿3D? registro low-poly (`CAN-008` §3.5) → 9 ¿Registro píxel? producción (`CAN-008` §3.3; `STD-008` §2.7, §3.5, §4.1, §8.6, §9.4, §11)
→ 10 ¿Movimiento? solo del catálogo (`STD-008` §9.1) → 11 Copy en el nivel fijado → 12 Checklist (§4)
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

- [ ] **Register declared before the medium** (`CAN-008` §3.7): Umbral, Velo, low-poly or pixel; the boundary between registers, visible.
- [ ] Mode, language level and **40/40/20 dose** correct (mix test `CAN-008` §1.4: neither Blade Runner nor a gardening catalogue).
- [ ] Colors only from §3; max three per composition; Coral and Grana do not coexist; text variants over light.
- [ ] Spacing on the 4-scale; only self-hosted Geist Sans/Mono; one display level; tabular Mono figures.
- [ ] Phosphor icons by weight; never thin/duotone; label on first use; no mixing weights in a row; the scarab and the Moon never as icons.
- [ ] Fills with light text: `#017C8D` background and states that **darken** (hover turquesa-text, active `#015866`; destructive hover grana-text). Tertiary only over the base background. Data with the `STD-008` §2.8 palette and never with rarity.
- [ ] `STD-008` §8.8 controls: the active in ink; label always; modal with the canonical veil and trapped focus; table with `aria-sort`; bar only with a real percentage.
- [ ] Shape: `control` radius on controls, `marco` on cards and dialogs; straight edges only in pixel and printed tables. Messages per `STD-008` §8.7: cause + way out, never mute.
- [ ] Surface identified on the `CAN-008` §3.4 map; if Platform: Diurno by default, ink primary, compact density, wallets and amounts in Mono. If 3D: low-poly register `CAN-008` §3.5, flat palette color, no photographic textures.
- [ ] Era only through sanctioned devices: `1920 · 2020 · 2120` seal, single patina (`STD-008` §5.3), lexicon as spice; with them removed, the piece is still the System's.
- [ ] Correct brand register: monochrome signature on the corporate; color, glyphs and mosaic only in play (`CAN-008` §3.8), with a label on first use and ≥3:1 if the brand is the only identifier.
- [ ] Brand per `STD-008` §7: correct lockup, Arena/Noche, respect, calm zone over texture; no recoloring/rotating/shadowing/deforming; the scarab is the `STD-008` §7.4 path.
- [ ] Texture only on Nocturno backgrounds ≤6 %, `cover`, elevated surfaces flat, never in Diurno.
- [ ] If there is game: full rarity with progressive treatment and name; never in the corporate.
- [ ] Motion only from the `STD-008` §9.1 catalogue; one orchestrated moment; one sweep maximum; pulse only on obtaining; no parallax/glitch; `prefers-reduced-motion` respected; focus not animated.
- [ ] Buttons: one primary per view; destructive with confirmation and far from the primary; labels = verbs, no all-caps.
- [ ] AA contrasts; nothing by color alone; measure ≤90; lunar-phase sequences only where a real sequence exists; closing with the scarab on a major piece; file name `CAN-008` §3.10.
- [ ] If pixel register: Píxel-16 only, neutrals ≥60 %, Grana without dialogue, 12/24/48 grid, integer scaling with `pixelated`, Noche outline, Pixelify at multiples, the scarab sprite the canonical one, full register entry/exit, and never in level III.
- [ ] Pixel Art produced at ×1: legible silhouette, continuous clusters, regular diagonals, no *pillow shading*, top-left light, maximum 2–4 colors per material, dithering only between adjacent colors, no decorative loose pixels.
- [ ] Sprites: stable cells and anchors, 2–4 frames, 120/200/320 ms durations, no interpolation or subpixel; reduced motion shows the most informative pose.
- [ ] Export: indexed PNG, binary transparency, Píxel-16 palette verified, uniform sprite sheet, ×1 test + integer scale + minimum viewport.
- [ ] If Velo register: only alphas over canonicals (zero new hexes); grid ≤3 % and fog ≤8 %; atmosphere behind the content, never on cards or elevated surfaces; glass only with atmosphere behind and text ≥ secondary; no Velo in Diurno; one dominant matter per view (grid and relief do not coexist); animations 10–11 only here; the orchestrated moment is still one.
- [ ] If there is sky (`STD-008` §10.1): weights 60/25/10/4/1 with the `STD-008` §2.6 colors, no parallax or cursor reaction, stopped with reduced motion; the grain (`STD-008` §5.5) only on paper, ≤5 %, never with relief or grid.
- [ ] Icons from the `STD-008` §6.3 subset; mode switch showing the **destination** mode; the book's icons only inside the paper register.
- [ ] If living paper (§6.12): third voice only in the book (roman body, SC drop cap and titles, italic lore, no synthetic small caps); bar that yields but does not disappear; glossary with a source per definition; moon as bookmark (waxing phases); `abierto / tras el Umbral` states; .md/pdf/epub downloads visible; literary opening separated from the body; full colophon with the scarab; the invoice inherits none of this.
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

## 6. The blueprints, one per medium

Moved out of the design system standard's recipe section on 2026-09-08. A blueprint is a procedure and
this is where procedures live. **Second numbers are preserved** — what was
§13.7 is §6.7 — so a citation needs only its section number changed.

What did not move: the `STD-008` §13 starter kit stays in the standard, because
`scripts/generate-design-kit.mjs` reads those blocks to build the published kit.
The standard is the source of that artifact, not a recipe for it.

The obligations these blueprints assume also stay in `STD-008`: the kit is
mandatory for every HTML piece, and no medium invents a palette, a scale or a
curve the standard does not define.

### 6.2 Web

Nocturno, 12 col ≤1280 px, hero = the thesis with relief at the back and headline typing (the orchestrated moment); level II on home, I/III on inner pages; LCP < 2.5 s, < 1 MB initial; fonts and icons self-hosted.

**Hero skeleton** (annotated; the piece's only orchestrated moment):

```html
<section class="hero"><!-- background: var(--fondo) url(assets/textura-relieve-nocturno-768.webp) center/cover -->
  <div class="marca"><!-- isotipo del escarabajo 44px + wordmark 20px, ambos en var(--arena) --></div>
  <h1 data-tecleo>La tesis en una frase, con <span style="color:var(--ambar)">una palabra</span> en Ámbar.</h1>
  <p class="sub"><!-- cuerpo.l, texto-2, máx 56ch, nivel II --></p>
  <a class="btn btn-primario" href="#"><!-- verbo exacto; ÚNICO primario de la vista --></a>
  <div class="binaria" aria-hidden="true">0100110001100101…xxxx</div><!-- la frase del canon en 8 bits: `STD-008` §5.1 · binaria() del kit -->
</section>
```

Following sections: `eyebrow` → `h2` → prose/cards with `.reveal`; at most one signal `barrido` per view.

**The menu** (web and public platform): one-line top bar — wordmark on the left; **≤5 entries** in Mono `type.etiqueta` uppercase; utilities on the right (language, mode, GitHub/X) as Phosphor `regular` 20 px icons; active entry with a 2 px Ámbar underline; on mobile, a full-screen panel with the same entries and nothing else. The menu is skin, not architecture: which entries exist is each product's decision.

### 6.3 Presentation

1920×1080, Nocturno, 120 px margins; one idea per slide; max 4 cards; binary separators; closing = contact + steps + scarab. **Legacy guard:** the deck's display is **Geist 500** — the serif of earlier presentations (including the Presentación Numinia v0.6.0) is out-of-system legacy and MUST NOT be imitated when generating new slides.

**Slide blueprints** (12-col grid; measures in canvas px):

```
PORTADA                                CONTENIDO + IMAGEN (el patrón de la casa)
┌──────────────────────────────┐      ┌───────────────────────────────────────┐
│         (retícula 6%)        │      │ EYEBROW MONO ÁMBAR        ┌──────────┐│
│                              │      │ Título display.m          │ imagen   ││
│        [wordmark]            │      │                           │ velo .72 ││
│   Subtítulo cuerpo.l ámbar   │      │ Cuerpo cuerpo.m/l         │ [icono   ││
│   Presentado por … texto-2   │      │ máx 58ch, texto-2         │  light   ││
│                              │      │                           │  ≥48px]  ││
└──────────────────────────────┘      └───────────────────────────┴──────────┘

TARJETAS (máx. 4)                      CIERRE
┌──────────────────────────────┐      ┌───────────────────────────────────────┐
│ EYEBROW · Título display.m   │      │ EYEBROW pregunta · Título CTA         │
│ Entradilla                   │      │ [personas: foto b/n + cargo + mono]   │
│ ┌─────┐ ┌─────┐ ┌─────┐      │      │                                       │
│ │icono│ │icono│ │icono│      │      │   Frase de marca con better en Ámbar  │
│ │ h3  │ │ h3  │ │ h3  │      │      │            [escarabajo]               │
│ └─────┘ └─────┘ └─────┘      │      └───────────────────────────────────────┘
└──────────────────────────────┘
```

The image **always** carries the veil `rgba(20,17,15,.72)` as a minimum; the top-right ghost icon is Phosphor `light` in `texto-3` and MAY be omitted.

### 6.4 Document and invoice

Diurno, A4, level III, no texture; tabular Mono figures; footer `AAAA_MM · Confidencial`; the proposal closes with scope, total without VAT and three numbered steps. **Compact rhythm** [learned by producing]: on A4 the section rhythm is `s500` and the interior `s300–s400` — `s700` is screen rhythm and overflows the paper. An invoice MUST fit on one page; canonical template at `plantillas/2026_08_03-Plantilla_Factura-v1.0.0.html`, with the total as the only display figure in toasted Ámbar and `page-break-inside: avoid` on rows and footer.

**Invoice block order** (the skeleton the template implements):

```
[wordmark 22px, tinta]……………………[«Factura» 19pt · nº en mono ámbar-texto]
[EMISOR | CLIENTE]           ← dos columnas, borde superior 1px tinta
[fecha · vencimiento · referencia]   ← banda en superficie FDF6EE
[tabla: CONCEPTO (con detalle en 9pt) | CANT | PRECIO | IMPORTE]
[base imponible / IVA / TOTAL]       ← derecha, 72mm; TOTAL única cifra display
[forma de pago | IBAN]               ← banda en superficie
[legal 8pt terciario]
[escarabajo 26px]…………………………[id de documento en mono 8pt]
```

### 6.5 Physical event

Credential in Diurno legible at 1.5 m; badges with name+symbol+color; signage legible at 10 m without depending on color; reusable supports, low-consumption inks.

### 6.6 Product and interface

Nocturno by default, level I, Turquesa for the interactive, Phosphor by weight (`STD-008` §6.1), rarity (`STD-008` §2.6) where objects and rewards exist.

### 6.7 3D and metaverse

Canonical normal map as PBR material (Three.js); Ámbar as warm key light, Turquesa as cold fill; objects carry their rarity in material + label, never emissive alone.

### 6.8 Email

Body in level I or III, plain text or minimal HTML; no decorative images. **Signature:** name in Sans 600 · role in tertiary · contact in Mono, each datum on its line; no logo as an attached image (the wordmark only if the email client supports it inline); a single link in color, the rest in ink.

### 6.9 Production pipeline of a pixel scene [EXTENSION — validate]

*The blueprint in one line:* Nocturno, level II; Píxel-16 index with neutral dominance ≥60 %; sprites on 24/12/48 grids with Noche outline; Pixelify at multiples; dialogue typed and colored by speaker; integer scaling with `pixelated`; the register is entered and left completely.

1. **Declare function and level.** Write what the person must understand, discover or do; confirm that level II is justified.
2. **Choose the grid.** Assign `12×12`, `24×24` and `48×48` modules before drawing. Inventory assets and states.
3. **Mass thumbnail.** Compose background, play plane, foreground and focus with neutrals only. Verify the 40/40/20 dose by squinting.
4. **Silhouettes.** Resolve characters and interactive objects in one color. Test direction, pose and hierarchy at ×1.
5. **Values and light.** Add shadow, body and light from top-left; lock cast shadows before the details.
6. **Assign ramps.** Choose ramps from `STD-008` §2.7.1, keep neutrals ≥60 % and reserve accents for function or story.
7. **Build clusters.** Clean isolated pixels, regularize diagonals, apply selective outline and use dithering only where `STD-008` §2.7.2 allows it.
8. **Add interface and text.** Integrate `STD-008` §8.6 components, AA contrast, visible focus and a reduced-motion alternative.
9. **Animate from key poses.** Select 2–4 frames and a `STD-008` §9.4 cadence. Test the cycle at ×1 without smoothing.
10. **Export and validate.** Export the master as indexed PNG; sprite sheets with uniform cells; check palette, transparency, integer scale, weight, names and absence of colors outside Píxel-16.

### 6.10 Minimum deliverables [EXTENSION — validate]

| Deliverable | Must contain |
|---|---|
| **Editable master** | indexed mode, ordered Píxel-16 palette, named layers or groups, labelled frames |
| **Individual PNG** | native dimensions, binary transparency, no smoothing or rescaling |
| **Sprite sheet** | uniform cells, same origin, documented sequence, no accidental margin between frames |
| **Asset sheet** | function, grid, states, ramp, duration, anchor point, alt text if applicable |
| **QA capture** | ×1 view and integer scale, real background, focus state and reduced-motion variant |

**Exit criterion:** the asset is approved first at ×1. Magnification only demonstrates; it never rescues.

### 6.11 Platform (web product) [CANON — direction decision]

*The blueprint in one line:* Diurno by default with Nocturno toggle, level I, tool density, sidebar + content, data per `STD-008` §2.8 and figures in tabular Mono.

**The direction decision — the Platform's primary is ink:** Noche over light, Arena over dark (16.1:1). The platform is a sober tool: the main action dresses in ink, and color stays for what informs — links and focus in turquesa-text, states with the semantic tints (`STD-008` §2.2), data with the `STD-008` §2.8 palette. The `#017C8D` fill (`STD-008` §8.1) remains the primary of the product-game and the web; here it would be brand noise over work. The living product already practiced it: it is canonized.

**Skeleton:**

```
┌ sidebar 240px ────────┬─ contenido ────────────────────────────┐
│ [wordmark 20px tinta] │  Título de vista (titulo.m)            │
│ GRUPO (etiqueta)      │  pestañas: activa subrayado 2px Ámbar  │
│ ○ Ítem  (fila 40px)   │  tarjetas en superficie + sombra `STD-008` §4    │
│ ● Activo = píldora    │  tablas: cabecera etiqueta Ámbar,      │
│   tinta/papel         │  cifras Mono tabular, filas 40px       │
│ …                     │  [primario tinta]  [fantasma]          │
│ [usuario · wallet]    │                                        │
└───────────────────────┴────────────────────────────────────────┘
```

Rules: sidebar in `superficie`; items in secondary text with Phosphor `regular` 18 px icon; **active = ink pill with paper text** (`control` radius, the same piece in both modes); groups with `type.etiqueta`; density: rows 36–40 px, padding `s300/s400` (the platform is compact, marketing breathes); amounts and wallet addresses ALWAYS in Mono (truncated `0x42e6…cA26` with the full title); state empties with `light` icon 48 px + one level I sentence; rarity (`STD-008` §2.6) only in inventory and loot, never in billing. Migration of the living product: white → paper `#F9EBDC`/`#FDF6EE`, black → Noche `#14110F`; the structure is not touched.

**The platform table (resolved, with sorting).** Header in `type.etiqueta` Ámbar (toasted in Diurno); sortable column = a button with a `bold` 12 px caret that appears on hover and stays fixed on the active column (label to primary text); `aria-sort` on the active `th`; figures in tabular Mono aligned right; 40 px rows, hover = one surface step (`CAN-008` §3.9-04); selection by checkbox in the first column; state in a `STD-008` §8.2 pill; empty and error per `STD-008` §8.7. Demonstrated sorting live in the guide.

### 6.12 The living paper — the codex's blueprint [EXTENSION — validate against the LAP]

*The blueprint in one line:* Diurno by default (it is paper) with Nocturno toggle as real night reading; the third voice narrates the body (`STD-008` §3.6); the reading frame belongs to the Velo; the book can always be taken away.

All long-reading paper (codex, book, digital editorial) uses these pieces, **verified in production** at `numinia.com/lap/codex`:

```
PORTADA                                CAPÍTULO
┌──────────────────────────────┐      ┌───────────────────────────────────────┐
│  [quien] presenta            │      │ ← título del capítulo →   ○ luna      │
│  TÍTULO display (serif)      │      │ eyebrow de sección                    │
│  subtítulo nivel II          │      │ Apertura literaria en cursiva (II)    │
│  autores · edición · versión │      │ Cuerpo en la tercera voz (II/III),    │
│  «↓ abre el códex»           │      │ enlaces de glosario en línea          │
└──────────────────────────────┘      └───────────────────────────────────────┘

ÍNDICE                                 CIERRE DE LIBRO
┌──────────────────────────────┐      ┌───────────────────────────────────────┐
│ I   Capítulo …    abierto    │      │ «El libro viaja libre»                │
│ II  Capítulo …    tras el    │      │ [.md] [pdf] [epub]  ← siempre visible │
│                    Umbral    │      │ Agradecimientos                       │
│ ✦   Anexos        abierto    │      │ Colofón: «Compuesto en [voz] con el   │
│                              │      │ Sistema · La fuente de verdad vive    │
│                              │      │ en Git» · [escarabajo]                │
└──────────────────────────────┘      └───────────────────────────────────────┘
```

**Rules of the living paper:**

- **Frame and page are distinct registers.** The page (the paper) is Umbral-Diurno with the third voice; the **reading frame** (the LAP's bar, bookmark, A·A·A controls, switch) MAY live in Velo when the mode is Nocturno. The boundary is visible.
- **The moon is the bookmark** (`STD-008` §9.1-06, waxing phases): reading progress is told in moon, from new to full — finishing is a full moon. The reading position is persisted.
- **A · A · A:** the reading size belongs to the reader, not the designer — three steps over the type scale (`STD-008` §3.3), without breaking the grid.
- **The access state is named in the world:** chapters `abierto` / `tras el Umbral` — the session boundary uses the canonical lexicon (`CAN-008` §3.10), never "login required".
- **"The book travels free" is a principle, not a feature:** the downloads (.md first — File Over App made interface —, Diurno pdf for printing, epub) are always one step away.
- **The literary opening** in italics is the only level II inside a II/III body and does not blend with it.
- **The colophon always signs:** typographic voice + System + "La fuente de verdad vive en Git" + scarab. The invoice's footer and the book's colophon are the same idea on two papers.
- **The book has its own switch**, independent from the rest of the platform: someone can read at night without turning off the whole city. The book's Nocturno is dark paper (`#14110F` / `#1E1A17`) with the grain at half intensity, not the product Nocturno.
- **The book's inks** [5.1.0 · H1]: the system's tertiary text (`#6E6259`/`#8A7D72`) sits at 3.7:1 over the codex's paper — below AA. Inside the paper register, the tertiary is `#75695E` (Diurno) and `#97897D` (Nocturno) — token `papel.tinta-terciaria`, verified in production. Outside the paper, the system's inks stay intact.
- **The editions are blueprint, not courtesy** [5.1.0 · H4]: the **pdf** is produced by printing the site's CSS (`@media print`, A4 — the full codex prints like a real book, ~413 pages); the **printable sheet** ships without the action bar or controls (paper carries no buttons); the **epub** keeps the glossary links. No edition is generated with a separate typesetter: the source is one, the CSS is the same.
- **The editorial pieces** (drop cap, reading box, plate, numbered table, margin note, fillet, seal, glossary, downloads, colophon, rating gears, Narrator) are specified in `STD-008` §8.9; the book's icons, in `STD-008` §6.5; the grain, in `STD-008` §5.5.
- **The invoice inherits none of it** (`STD-008` §5.4): administrative paper remains pure Geist, one page, total in toasted Ámbar; neither third voice nor Velo frame.

---
