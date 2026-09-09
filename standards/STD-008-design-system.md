---
id: "STD-008"
uid:
title: "Design system: the values a piece is built with, in four registers"
type: documentation
subtype: standard
status: draft
version: "6.1.0"
created: "2026-08-18T13:41:01Z"
updated: "2026-09-09T10:30:00+02:00"
author: "oracle"
owner: "oracle"
territory: "Product"
registration: registered
related: ["CAN-008", "PRO-014", "STD-010", "STD-011", "ADR-044"]
license: "CC0-1.0"
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC0-1.0
-->

# Design system

> **Summary:** The values a piece is built with — palette, type, space,
> matter, icons, assets, components, motion — and the kit that ships them.
> **Epistemic:** What the visual identity decided in `CAN-008` looks like in
> numbers. Where this document and the canon differ, the canon holds.
> **Pragmatic:** Load the kit, use only what is here, and run `PRO-014` before
> delivering. Nothing needs to be invented.
> **Audience:** Agents · Designers · Oracles

---

## 1. Purpose and scope

The values a builder types: palette, type, space, textures, icons, assets,
components, motion, the four registers' working numbers, and the starter kit
that ships them. Everything here derives from `CAN-008`, which decides the
direction; this document does not decide, it specifies. Normative words:
MUST, MUST NOT, SHOULD, MAY (RFC 2119). A value not written here or in the
published token file does not exist (`PRO-014`).

Provenance marks on headings are gone with this version: what was `[CANON]`
now lives in `CAN-008`; what was `[DERIVED]` or `[EXTENSION]` is simply this
standard, and a rule that is still being validated says so in its own text.

## 2. Color


### 2.1 Canonical palette
| Hex | Name | Thread | Role |
|---|---|---|---|
| `#A6DAD5` | **Verdemar** | Solar | Confirmation, calm, surface tints |
| `#018EA1` | **Turquesa** | Cyber | Interaction: links, focus, accents (the action fill is its shadow `#017C8D`, §8.1) |
| `#EFA517` | **Ámbar** | Solar | Emphasis, value, achievement; the scarab's sun |
| `#F9EBDC` | **Arena** | Solar | Main neutral |
| `#F35059` | **Coral** | Cyber | Warning, real time; flash, never ambience |
| `#D33440` | **Grana** | — | Critical, gravity |

### 2.2 Neutrals
**Nocturno** (screen, default): background `#14110F` Noche · surface `#1E1A17` Basalto · elevated `#292420` dark Bronce · lines `#241F1B` / `#3A332D` · text `#F9EBDC` (16.1:1) / `#C4B5A6` (9.6:1) / `#8A7D72` Ceniza (4.7:1).
**Diurno** (print, long document): paper `#F9EBDC` · surface `#FDF6EE` · line `#E2D3C2` · ink `#14110F` (15.8:1) / `#4A423B` (8.6:1) / `#6E6259` (5.1:1).

**Tertiary rule [learned by auditing]:** the contrasts in this table are against the **base background**. The Nocturno tertiary drops to 4.3:1 over surface and 3.8:1 over elevated: **inside surfaces, the minimum is the secondary**; the tertiary lives only over the base background.

**Diurno semantic tints** [DERIVED — canonical formula: 12 % of the accent over paper]: confirmation `#EFE9DB` · warning `#F8D8CC` · critical `#F4D5C9` · interactive `#DBE0D5` — all with ink ≥13.6:1 on top. For status bands in documents and light product. They replace the old tint `#E4F2F0`, retired as an orphan and as the Diurno's only cold-clinical note.

### 2.3 Text variants over light
The canonicals are *mood* colors; over Arena, as text, the variant is used: Turquesa→`#016E7D` (5.1:1) · Grana→`#B02330` (5.8:1) · Ámbar→`#7A5100` (6.0:1) · **Verdemar→`#1F6B5F` (5.4:1)** — success can finally be written over light. **Coral has no variant and that is a decision, not an oversight:** a coral-text would be a perceptual twin of grana-text and would break the warning/critical separation. The warning over light is composed by rule: a Coral fill chip with Noche ink, or icon + text in ink.

### 2.4 Semantics and rules
Interactive→Turquesa · Success→Verdemar · Emphasis/achievement→Ámbar · Warning/real time→Coral · Error→Grana. **Links** [written decision, previously an accident]: in Nocturno, Verdemar (12.2:1 — Turquesa sits at the limit as running text); in Diurno, turquesa-text `#016E7D`. **Interaction rule over fills with light text: interacting darkens, never lightens** — lightening destroys the contrast exactly when the user is looking. Maximum **three** colors per composition counting the neutral (the data layers §2.5–3.6 don't count: they are encoding). **Coral and Grana do not coexist.** Ámbar is the sun, not the sky: it emphasizes, it does not cover. Nothing means by color alone. Text 4.5:1; large and components 3:1.

### 2.5 Project categorical palettes
First the six canonicals; then luminosity variants; never foreign hues. Every category carries **name + symbol + color**, all three always. **The only hue exception in the whole system:** the rare blue and the epic purple of the rarity scale (§2.6) — they exist precisely to be read as game categories and not as corporate voice, they live only where rarity lives, and no project can invoke them as precedent.

### 2.6 Rarity scale
Categorical layer for game and product (objects, rewards, Navigation Charts, digital assets). An MMO convention any player recognizes without a manual, tuned to this palette and verified:

| Rarity | Nocturno | vs Noche | Text in Diurno | vs Arena | Coherence |
|---|---|---|---|---|---|
| **Poor** | `#F9EBDC` | 16.1 | `#6E6259` | 5.1 | = Arena: the poor is the paper |
| **Common** | `#8A7D72` | 4.7 | `#5A4F45` | 6.8 | = Ceniza, the existing neutral |
| **Uncommon** | `#8FC46B` | 9.2 | `#356C19` | 5.4 | Warm green, Verdemar's sibling |
| **Rare** | `#5D9BD6` | 6.4 | `#2E6BB0` | 4.7 | Tempered blue, distinct from the interactive Turquesa |
| **Epic** | `#A98BE0` | 6.7 | `#6B44B8` | 5.7 | Purple softened to the warm world |
| **Legendary** | `#EFA517` | 9.0 | `#7A5100` | 6.0 | **= Ámbar**: the legendary and the achievement are the same sun |

**Why color never goes alone, with first and last name:** under protanopia and deuteranopia, epic and rare collapse — the purple loses its red and lands one step from the blue (verified by simulation). The progressive border and the written name are not courtesy: they are the channel that keeps working when color fails.

Rules: full scale and in order, no invented steps. **Progressive treatment beyond color**: poor/common border `linea.tenue`; uncommon/rare border of its color at 40 %; epic full border; legendary full border + halo `0 0 12px rgba(239,165,23,.25)` — **the system's only glow**. Name written in `type.etiqueta` the first time per view. It lives in product and game; NEVER in corporate communication: a price is not epic and a deadline is not legendary.

### 2.7 Píxel-16 palette · the pixel register's index
Sixteen colors, **zero new hexes**: seven neutrals, the six brand colors and three already-defined shadows, plus the rarity green. Every sprite and every pixel scene MUST limit itself to this index.

| Nº | Hex | Name | Origin | Role in pixel |
|---|---|---|---|---|
| 01 | `#14110F` | Noche | nocturno.fondo-base | Background, sprite outline |
| 02 | `#1E1A17` | Basalto | nocturno.superficie | Deep shadow |
| 03 | `#292420` | Dark Bronce | nocturno.elevada | Shadow |
| 04 | `#3A332D` | Bronce | nocturno.linea-fuerte | Mid shadow, metal |
| 05 | `#8A7D72` | Ceniza | nocturno.terciario | Working grey |
| 06 | `#C4B5A6` | Veiled Arena | nocturno.secundario | Mid light |
| 07 | `#F9EBDC` | Arena | brand | Light, highlight, base sprite |
| 08 | `#A6DAD5` | Verdemar | brand | Solar accent |
| 09 | `#018EA1` | Turquesa | brand | Cyber accent |
| 10 | `#016E7D` | Deep Turquesa | text-over-light | Shadow of 09 |
| 11 | `#EFA517` | Ámbar | brand | Gold, achievement, sun |
| 12 | `#7A5100` | Toasted Ámbar | text-over-light | Shadow of 11 |
| 13 | `#F35059` | Coral | brand | Living signal |
| 14 | `#D33440` | Grana | brand | Deep red — **fill only** |
| 15 | `#B02330` | Deep Grana | text-over-light | Shadow of 14 |
| 16 | `#8FC46B` | Verde | rareza.poco-comun | Nature, the solarpunk garden |

**Dominance:** ≥ 60 % of the surface in neutrals 01–07. **Dialogue subset** (pixel text over Noche, ≥ 4.5:1 verified): Arena 16.1 · Verdemar 12.2 · Veiled Arena 9.4 · Verde 9.2 · Ámbar 9.0 · Coral 5.5 · Turquesa 4.8 · Ceniza 4.7. **Grana stays out of dialogue** (3.9:1): fill yes, text never.

#### 2.7.1 Functional ramps
The palette is single, but work happens through **shared ramps**. A ramp adds no colors: it orders the existing ones so that different materials appear to belong to the same world.

| Ramp | Available colors | Main use |
|---|---|---|
| **Mechanical neutral** | Noche · Basalto · dark Bronce · Bronce · Ceniza · veiled Arena · Arena | structure, stone, metal, clothing, general volume |
| **Solar** | Toasted Ámbar · Ámbar · Arena | sun, reward, lit brass, point of value |
| **Cold signal** | Deep Turquesa · Turquesa · Verdemar | interaction, energy, glass, technology in the service of life |
| **Warm signal** | Deep Grana · Grana · Coral | damage, alarm and real time; Coral and Grana still do not coexist in one composition |
| **Garden** | Verde · Verdemar · Arena | vegetation and living matter |

Each material SHOULD resolve with **2–4 colors** from one or two ramps. Sharing a shadow or a light between materials coheres the scene and preserves the limited character of 90s graphics.

#### 2.7.2 Clusters, dithering and transitions
- Volume is built first with flat areas. Dithering does NOT substitute for a badly chosen ramp.
- Only the checkerboard of **two adjacent colors from the same ramp** is allowed, as §11 already fixes. It is used for material transition, fog or a wide surface; never to "create" a new brand color.
- The outer outline, typography, eyes, inventory icons and objects that must be found fast are NOT dithered.
- The checkerboard keeps a stable pattern. Changing the pattern without reason produces noise and flicker when animating.
- Visible color bands are valid and preferable to a smoothed gradient. No *blur*, antialias or intermediate transparency is applied to hide them.

#### 2.7.3 Palette cycling
Index rotation or substitution — the classic resource for water, light and signals — MAY be used as an optimization, but **it does not create a tenth animation**. It only implements an already-authorized animation: signal sweep (§9.1-03), progress phase (§9.1-06) or legendary pulse (§9.1-05). It keeps geometry and contrast, respects `prefers-reduced-motion` and does not alter reading-text color.

### 2.8 Data palette
Intelligence reports are product: charts have canonical color. Like the ramps, this palette **adds no hexes: it orders the existing ones**.

| Series | Categorical order | Verification over Noche (graphic object ≥3:1) |
|---|---|---|
| 1–6 | **Turquesa → Ámbar → Verdemar → Grana → Verde → Ceniza** | 4.8 · 9.0 · 12.2 · 3.9 · 9.2 · 4.7 ✓ |

**Sequential** (magnitude): Noche → Deep Turquesa → Turquesa → Verdemar → Arena. **Divergent** (two poles): Grana ↔ Ceniza ↔ Turquesa. Rules: maximum **6 series** per chart (more series = another chart); every series with a direct label or legend, never color alone; in Diurno, series use their text variants where they exist and lines thicken to 2 px; rarity (§2.6) never colors data — a datum is not epic.

---

## 3. Typography


### 3.1 The family
**Geist** and **Geist Mono** — Vercel's typeface ([vercel.com/font](https://vercel.com/font)) — across the whole organization. Simplicity, minimalism, speed; Swiss heritage (so declares the Brand & Culture). SIL OFL 1.1; full Latin coverage. Fallbacks: `'Inter','Aptos','Segoe UI',Arial,sans-serif` / `'Consolas','Courier New',monospace`.

**Distribution.** MUST be self-hosted in production: variable woff2 (`Geist-Variable.woff2` 56 KB, `GeistMono-Variable.woff2` 58 KB, in `/assets/fonts/` with their license), `font-display: swap`. Origin: npm package `geist`. CDN only for prototypes.

### 3.2 The sans / mono contrast
**Sans for what is stated, Mono for what is measured.** Headlines, body and interface in Sans; figures, coordinates, labels, code and technical lore in Mono. The monospace *is* the machine: it resolves the steampunk without themed typefaces.

### 3.3 Scale
Scale 1.200, base 16 px; pt for the 1920×1080 canvas: `display.xl` 4.300rem/50pt · `display.l` 3.583/42 · `display.m` 2.986/34 · `titulo.l` 2.488/28 · `titulo.m` 2.074/24 · `titulo.s` 1.728/20 · `cuerpo.l` 1.440/17 · `cuerpo.m` 1/14 · `cuerpo.s` 0.875/12 · `etiqueta` 0.750/11 (Mono 500, small caps, tracking `+0.10em`) · `dato.xl` 2.986 Mono 500 · `dato.m` 1 Mono 400. Display weights 500, titles 600; display tracking `-0.03/-0.02em`.

### 3.4 Composition

Line height 1.1 display / 1.55 body / 1.35 data. Measure 60–75 characters, max 90. Sentence case except labels. Emphasis with weight 600 or Ámbar; italics only for quotes and lore. Figures always tabular Mono. One display level per piece. Widows forbidden in headlines.

### 3.5 Pixel typography
In the pixel register, the display and dialogue voice is **Pixelify Sans** (Stefie Justprince, SIL OFL 1.1, Google Fonts) — proportional and with a friendly lowercase, the closest freely-licensed thing to the spirit of SCUMM dialogues. The original fonts of Monkey Island, DOTT and La Abadía are **proprietary**: they are cited as heritage, neither used nor imitated pixel by pixel.

Rules: self-hosted (`PixelifySans-Variable.woff2`, 22 KB, with its OFL in `/assets/fonts/`); sizes in **exact multiples** of its grid (22, 33, 44 px…), no subpixel; only for dialogue, scene headlines and HUD — **long body remains Geist** even inside the register; dialogue text carries a 1 px Noche outline over active scenes and colors by speaker (§2.7); never in level III nor in printed Diurno.

#### 3.5.1 Text composition in scene
- Pixelify Sans renders without fake bold, fake italic, smoothed outline or CSS transforms. Weight is chosen in the font; it is not simulated.
- Dialogue is presented over a solid `nocturno.fondo-superficie` or `fondo-elevada` surface, with a Noche border when the scene remains visible. If it overlays the image directly, the canonical veil is applied before the text.
- The speaker's name uses Pixelify and the approved color; short body MAY use Pixelify. Explanations, help, accessibility and long text switch to Geist to preserve legibility.
- Lines MUST NOT be forced with spaces. Breaks are decided by unit of meaning and tested at the interface's minimum width.
- The block cursor accompanies the typing and retires when finished. It is not left blinking next to already-finished text.
- Text is composed on integer coordinates. Scale, `line-height`, translation and box MUST NOT produce half-pixel positions.

### 3.6 The third voice — the serif that narrates
Sans states, Mono measures, **the serif narrates**. The codex in production already uses it — living colophon: *"Compuesto en Alegreya con el Sistema"*. **Alegreya** (Juan Pablo del Peral, Huerta Tipográfica, SIL OFL 1.1) enters **whole**, because the codex already uses all three cuts — audited in the production repository:

| Cut | File | Role in the book |
|---|---|---|
| Variable roman | `Alegreya-Variable.woff2` | Long-reading body |
| Variable italic | `Alegreya-Italic-Variable.woff2` | Literary opening, quotes, epigraphs, glossary terms |
| **Small caps** (400/500) | `AlegreyaSC-{Regular,Medium}.woff2` | **Drop cap**, chapter titles, section small caps |

The **small caps is the piece that was missing from the record**: it is not a simulated typographic effect (synthetic `font-variant` is forbidden, like Pixelify's fake bold in §3.5), it is a proper cut with its own drawn shapes. A voice **exclusive to the book** (Book · codex surface, `PRO-014` section 6.12); self-hosted with its OFL in `/assets/fonts/`, pending entry into the kit in the v5 rebuild. **Never** in interface, deck (the legacy guard `PRO-014` section 6.3 stays intact), corporate document or invoice. Until the Oracle's signature, its use stays confined to the already-published LAP.

---

## 4. Space, grid, shape

**Spacing** base 4 px: `4·8·12·16·24·32·48·64·96·128` (`space.100–1000`); every gap MUST be from the scale.
**Grids**: web ≤1280 / 12 col / margin 64 / gutter 24; tablet 8/40/24; mobile 4/20/16; slide 1920×1080 / 12 / 120 / 32; A4 12 / 20 mm / 5 mm. Baseline 8 (4 mm printed). Rhythm: sections `s900` web · `s800` deck; blocks `s700`; headline→body `s400`; card `s500`.
**Shape [CANON — direction decision, 4.0.0]**: two radii and nothing more — **control `6px`** (buttons, fields, chips, toggles) and **frame `8px`** (cards, panels, dialogs, canvases, status bands). Warm without fashion: the frame rounds a little; the content inside inherits no radius of its own. Circle only in markers, avatars and stickers; the pill is a capsule. **The pixel register keeps its straight edges** (the pixel does not curve) and printed tables too. Borders 1 px.
**Elevation**: in Nocturno no shadows — surface step + hairline (`base→superficie→elevada`); sole exception the legendary halo. In Diurno a single shadow `0 1px 2px rgba(20,17,15,.08), 0 8px 24px rgba(20,17,15,.06)`.
**Focus**: `outline: 2px solid #018EA1; offset 2px`, always visible, never animated. Non-negotiable.

### 4.1 Internal grid of the pixel register
The web grid organizes the page; the pixel grid organizes the content inside the scene. They do not mix.

- Position, scale, crop and origin of every sprite use integer numbers. `translate`, camera zoom and displacement that generate subpixels are forbidden.
- When the viewport does not admit an integer scale, the scene reduces to the lower multiple and fills the remaining space with Noche. It does not stretch to fill.
- Filtering is `nearest-neighbor`; on web, `image-rendering: pixelated`. Smoothing and mipmaps are disabled wherever the engine could alter the pixel at game scale.
- All frames of an animation share cell, origin and occupancy box. The pose change happens inside the cell, not by accidentally moving the canvas.
- The HUD and the dialogue box MAY belong to the pixel register; navigation, forms, extended help and product controls follow the System's vector system. The boundary between both registers MUST be visible.
- Testing happens in three views: ×1 for decision, one integer presentation scale and the minimum supported viewport. If it fails at ×1, it is not fixed by enlarging.

---

## 5. Matter · textures
Two textures, the machine's two states: the signal (what flows) and the circuit (where it flows).

### 5.1 The signal — the binary

`0100110001100101…` degrading to `xxxxxx…`, Geist Mono `cuerpo.s`, color `linea.fuerte`, tracking `.15em`. It is real text, not an image. Use: section separator.

**The binary speaks [CANON — direction decision].** The signal is not noise: **it encodes a canon phrase in 8-bit ASCII per character**, followed by the `x` sediment. Whoever decodes the separator finds the promise — the house's easter egg, very much of the Akashic Records: everything leaves a trace. Current phrase:

> **«Leave things better than we found them.»** — 39 characters, 312 bits.

```
010011000110010101100001011101100110010100100000011101000110100001101001011011100110011101110011001000000110001001100101011101000111010001100101011100100010000001110100011010000110000101101110001000000111011101100101001000000110011001101111011101010110111001100100001000000111010001101000011001010110110100101110
```

Rules: the string is **copied** from here or from the `binaria.bits` token (or generated with the §13 kit) — no new noise is invented; the `x` sediment goes **after** the message completes (the signal finishes speaking and then sediments); the separator remains decorative (`aria-hidden`), the message is for whoever reads the code; visual cropping by width does not matter — the DOM always carries the whole phrase. Future easter-egg phrases are added here with their version.

### 5.2 The circuit — relief

Derived from the **canonical normal map** (`textura-circuito-normal.png`, 4096², greeble panel: the Second Industrial Revolution meeting the digital, literally). Delivered derivatives:

| Asset | Format | Weight | Use | Distribution |
|---|---|---|---|---|
| `textura-circuito-normal.png` | PNG 4096² | 9.5 MB | 3D material (PBR normal channel, Three.js — Numinia's stack) | **materials** |
| `textura-relieve-nocturno-768.webp` | WebP 768² | 14 KB | **CSS**: Nocturno backgrounds, baked at 5.5 % | kit |
| `textura-relieve-nocturno.png` | PNG 1536² | 683 KB | High quality: covers, screen print, OG | kit |
| `textura-relieve-alpha.webp` | WebP 1536² RGBA | 695 KB | Arena lines over transparency, for baking derivatives | **materials** |

**Two packages, one reason:** the **kit** carries what a web repository needs in production (~1.5 MB); the **materials** (4096² normal and baking alpha, ~10 MB) travel separately, to the 3D and design repository — heavy material does not move into every web.

```css
.hero { background: var(--fondo-base) url("textura-relieve-nocturno-768.webp") center/cover; }
```

**Where yes:** Nocturno hero background, deck covers, OG images, wide separator bands, 3D materials.
**Where no:** in Diurno (paper is paper); on cards, modals and every elevated surface (they stay flat); behind long reading; above **6 %** visibility; as button or icon fill; in direct `repeat` (**it does not tile** — verified; use `cover` or mirror).
The texture MUST NOT drop the text's effective contrast below AA; the delivered bake keeps ≥15:1 against Arena.

### 5.3 The era patina
Seed of the photography and illustration direction: every image is treated toward **one** of the three decades, without leaving the warm world or the veil (§5.2). Three patinas:

| Patina | Decade | Treatment | Allowed accent |
|---|---|---|---|
| **Bronce** | 1920 | Warm duotone Noche→Bronce/veiled Arena; visible fine grain; soft antique-silver contrast | Ámbar (one light source) |
| **Señal** | 2020 | Full Noche veil; hard contrast; a single cold punctual flash (screen, sign, light) | Turquesa or Coral (one, never both) |
| **Jardín** | 2120 | Warm natural morning light; vivid greens; air and breath; the veil MAY lighten to `.60` if no text sits on top | Verdemar and Verde |

Rules: one patina per piece; the patina does not change the palette — it interprets it; portraits of people always in Bronce or Jardín (the Señal dehumanizes); with text on top, the veil returns to `.72` whatever the patina. Pending validation with six real photographs — then it will ascend to a full direction.

### 5.4 The atmosphere — the Velo as matter
§5 had two textures: the signal (what flows) and the circuit (where it flows). 5.0.0 names the third: **the atmosphere** — the Velo's grid and fog (§10), the medium where the discovered orders itself. The three share the Nocturno background — and the grain (§5.5) takes the Diurno —: **the signal separates, the circuit gives body, the atmosphere gives depth, the grain gives paper.** Coexistence: hard rules in §10 (one dominates per view; fog over relief at half alpha; grid and relief do not coexist). In Diurno none of the three exists: paper is paper.

### 5.5 The grammage — the paper's grain
The codex in production demonstrates the fourth matter, and it is the Diurno's: **the grain**. Generated fractal noise (`feTurbulence` `fractalNoise`, `baseFrequency 0.85`, `numOctaves 3`, tinted to `rgba(74,64,51,.045)` by color matrix), fixed on the background, in an embedded 240² SVG — no download, no image.

**Why it does not contradict §5.2.** That rule — "no texture in Diurno" — forbids the **circuit relief** over paper: the machine is not printed. The grain is not a texture *applied* to the paper: it **is** the paper. Rules: maximum **5 %** intensity; background layer only, `position: fixed`, `pointer-events: none`; never on elevated surfaces nor under data tables; in Nocturno the same grain **drops to half** (night paper is the same paper with less light); it does not combine with relief or the Velo's grid — paper has neither circuit nor Akasha.

With this, the matters are four and each has its world: **the signal separates, the circuit gives body, the atmosphere gives depth, the grain gives paper.**

---

## 6. Iconography · Phosphor
Single system: **[Phosphor Icons](https://phosphoricons.com)** — Helena Zhang and Tobias Fried, MIT, ~1,500 glyphs × 6 weights, 256 grid, available as SVG, web font, React, Vue and Figma. It fits because its geometric stroke with rounded terminals is the same construction as the wordmarks, and because six weights allow a **rule** instead of an aesthetic choice per icon.

### 6.1 Weights

`regular` **by default** (16–40 px) · `fill` active or reached state · `bold` at < 16 px · `light` illustrative at ≥ 48 px · **`thin` forbidden** (it disappears over Noche) · **`duotone` forbidden** (it breaks the flat discipline).

### 6.2 Use

**Yes:** action, object and navigation, with a text label on first use per piece; one concept = one icon across the whole system; they inherit `currentColor` and only take accent when the adjacent text takes it.
**No:** as decorative bullets; mixing weights in the same interface row; recoloring them outside the system; using them without meaning.
A custom icon only if Phosphor does not cover the concept; it is drawn on its grid and proposed here as an extension. **The scarab and the Moon are not icons: they are marks** — the sequence marker's phases are built as a proper geometric glyph, not with Phosphor's `moon`.

### 6.3 Implementation

**The house subset [CANON — audited in production, 5.0.0].** Of Phosphor's ~1,500 glyphs, the organization uses **twenty-six**, self-hosted in `packages/ui/src/icons/` and served as inline SVG with `currentColor`. This is the vocabulary, not a sample of someone else's catalogue: `archive · bell · book-open · caret-down · caret-left · chart-bar · download-simple · flame · flame-light · gear · github-logo · globe-hemisphere-west · globe-hemisphere-west-light · house · magnifying-glass · moon · moon-stars · music-notes · package · sign-out · sun · sword · sword-light · user · users · x-logo`. Expanding it is a decision, not an oversight: a new icon enters the subset with its concept declared.

### 6.4 The mode switch
The `moon-stars` / `sun` pair is one piece, not two loose icons. **Hard rule: the icon shows the mode a tap leads to, not the mode you are in** — the moon with stars invites the Nocturno, the sun invites the Diurno. Only one visible at a time, in `regular` 20 px, among the bar's utilities (`PRO-014` section 6.2). Behavior canonized from production: while nobody chooses, the page **follows the operating system** and changes with it at nightfall; an explicit choice ends the following and is remembered; the preference is applied **before painting** so the page does not flash. The state is written on the document as `data-modo`, and its **absence means Nocturno** — light mode is always declared explicitly.

### 6.5 The book's icons
The paper register has its own set, **of stroke and not of mass**: grid `16`, `stroke 1.5`, round terminals, no fill. Pieces in production: index, bookmark, narrator, pause, sun, moon, umbral (chevron) and the **fillet** — the hexagonal glyph with three nodes that separates the book's sections. They neither compete with Phosphor nor replace it: they live inside the register, just as the pixel has its own iconography inside its own (§8.6). Outside the book, Phosphor rules.

In production, **self-hosted subset** (inline SVG or sprite), as the guide's own `index.html` does. For prototypes: `@phosphor-icons/web` on npm/unpkg. Source of the official SVGs: `github.com/phosphor-icons/core` (`assets/{weight}/{name}[-{weight}].svg`).

---

## 7. Brand and assets
### 7.1 Inventory (all normalized to `fill="currentColor"`, in `/assets/`)

| File | What it is | viewBox | Canonical use |
|---|---|---|---|
| `Khepri_Logo.svg` | Brandmark: the scarab | 75.44×75.53 | Closing, favicon, avatar, seal |
| `Khepri_NG_Logo.svg` | Brandmark + NG | 75.44×75.53 | Compact with attribution |
| `NG_Logo.svg` | Monogram | 113.37×50.29 | < 120 px wide |
| `Numen_Games_Horizontal_Word.svg` | Horizontal wordmark | 382.79×28.09 | **Main signature** |
| `Numen_Games_Vertical_Word.svg` | Stacked wordmark | 180.74×73.25 | Square/vertical formats |
| `Numen_Word.svg` | «numen» | 180.74×28.09 | When «games» is evident |
| `Numinia_Word.svg` | The world | 194.25×28.01 | **Only** Numinia pieces |
| `pixel/khepri-sprite-24.png` | Canonical scarab sprite | 24×24 px | Pixel register; the brand's only pixel translation |
| `pixel/moneda-12.png` | Ámbar coin (corrected to the Solar ramp) | 12×12 px | The register's example object; tokens, rewards |
| `pixel/moneda-giro-12x4.png` | The coin's turn sheet | 48×12 px · 4 frames | Canonical reference cycle: 200 ms · steps(4) · stable volume |
| `pixel/cartografo-24.png` | The Cartographer | 24×24 px | Reference character of the `PRO-014` section 6.9 pipeline; status [EXTENSION — validate] |
| `pixel/guia/` | Didactic how-yes / how-no pairs | 16×16 px ×1 and ×8 | Production-guide material; not game assets |
| `fonts/PixelifySans-Variable.woff2` | Pixel typeface | variable 400–700 | Dialogue and display of the pixel register |
| `marca/glifo-space.svg` | *Space* glyph (the wordmark's n) | 31×29 | Brand play CAN-008 §3.8: the space, the territory |
| `marca/glifo-people.svg` | *People* glyph (n + dot) | 31×39 | Brand play CAN-008 §3.8: the person |
| `marca/glifo-connect.svg` | *Connect* glyph (the final ɑ) | 29×29 | Brand play CAN-008 §3.8: the connection |

Selection: horizontal by default → vertical in square → NG under 120 px → brandmark for closing/avatar. `Numinia_Word` never signs corporate communication.

### 7.2 How yes

Arena over Nocturno, Noche over Diurno — **the signature has no color version**; color over the brand exists, but lives in another register: the brand play (CAN-008 §3.8). Respect area = the height of the «n» on all four sides. Minimums: wordmark 24 px / 12 mm; brandmark-favicon 16 px. Over image: veil `rgba(20,17,15,.72)` minimum. Over the circuit texture: only inside a **calm zone** (flat area equal to twice the respect area).

### 7.3 How no

DO NOT recolor to accents (the brand does not compete with the signal) · DO NOT rotate or tilt · NO shadows, gradients or reliefs · DO NOT deform proportions · DO NOT enclose in foreign shapes · NOT over an active background without veil · NO `Numinia_Word` signing the corporate · **DO NOT redraw the scarab**: the canonical path (below) is the only valid one — it replaces any previous reconstruction. Single closed exception: the canonical pixel sprite of CAN-008 §3.3, which is not redrawn either — the delivered one is used.

### 7.4 Canonical brandmark (embedded reference)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.44 75.53" fill="currentColor">
<path d="M75.44,48.41v-6.01c0-7.43-2.44-12.51-6.61-15.5,3.83-2.74,6.21-7.23,6.58-13.69h0V0h-15.86v7.92h8.44v5.29h-.01c-.58,7.07-4.65,10.37-11.02,10.37h0s-.79,0-.79,0c-.91-11.22-8.07-16.29-18.43-16.29s-17.51,5.07-18.43,16.29h-.8c-6.37,0-10.44-3.3-11.02-10.37h-.01v-5.29h8.44V0H.03v13.22h0c.37,6.46,2.75,10.96,6.58,13.69-4.17,2.99-6.61,8.06-6.61,15.5v6.01h7.43v-6.01c0-8.32,4.21-12.17,11.1-12.17h0s.66,0,.66,0v13.83c0,2.48.28,4.7.79,6.67h-1.51C7.91,50.73.68,56.02,0,67.71h0v7.81h23.14v-7.8H7.45c.58-7.07,4.65-10.37,11.02-10.37h4.91c3.26,3.74,8.24,5.51,14.34,5.51s11.09-1.77,14.34-5.51h4.91c6.37,0,10.44,3.3,11.02,10.37h-15.7v7.8h23.14v-7.81h0c-.68-11.7-7.9-16.98-18.46-16.98h-1.51c.52-1.97.79-4.19.79-6.67v-13.83h.66c6.89,0,11.1,3.85,11.1,12.17v6.01h7.43ZM37.72,13.91c6.21,0,10.22,3.13,10.97,9.83-4.62.66-8.39,2.55-10.94,5.81-2.56-3.28-6.35-5.16-10.99-5.82.74-6.69,4.76-9.82,10.97-9.82ZM26.62,44.07v-13.54c4.67,1.22,7.41,5.02,7.41,11.73v13.55c-4.67-1.22-7.41-5.02-7.41-11.73ZM48.82,44.07c0,6.68-2.72,10.48-7.35,11.72v-13.53c0-6.68,2.72-10.48,7.35-11.71v10.73h0v2.79Z"/>
<path d="M46.18,7.36c-.57-4.16-4.14-7.36-8.46-7.36s-7.89,3.2-8.46,7.36c2.55-.77,5.39-1.15,8.46-1.15s5.91.38,8.46,1.15Z"/>
</svg>
```

## 8. Components
All demonstrated live in `index.html`.

### 8.1 Buttons

| Type | Style | When |
|---|---|---|
| **Primary** | Action fill `#017C8D`, white text | The main action. **One per view**. On Platform, the primary is ink (`PRO-014` section 6.11) |
| **Ghost** | Transparent, `linea.fuerte` border; hover border+text Verdemar | Secondary action |
| **Quiet** | Verdemar text only, underline on hover | Tertiary action |
| **Destructive** | Grana fill, white text | Irreversible. **Confirmation mandatory. Never next to the primary** |

Specification: `control` radius (6 px), padding `10×24`, height M 40 px / S 32 px, weight 500. **Action fill `#017C8D`** (white on top 4.9:1 — the canonical Turquesa `#018EA1` gave 3.9 and stays for icons, links and accents). States [corrected in 3.6.0 — interaction **darkens**]: hover `#016E7D` (=turquesa-text, 5.95), active `#015866` (8.1), disabled `superficie` + secondary text + `not-allowed`, loading with **waiting dots** (§9) and locked width. The destructive dragged the same bug: its hover is now `#B02330` (=grana-text, 6.7), never `#E04450`. Optional icon on the left, 16 px, `gap s200`, same color. The label is a **verb that says exactly what happens** and keeps its name across the whole flow. Never all-caps.

### 8.2 Status pills

Mono `cuerpo.s`, `control` radius, 8 px dot in `currentColor`, border of the color at 40 %. Semantic mapping §2.4. Always with text: the dot never goes alone.

### 8.3 Input field

`base` background, `linea.fuerte` border, `control` radius, padding `10×16`; label above in `type.etiqueta`; placeholder in tertiary (never as a label substitute); focus = the system's Turquesa outline; error = Grana border + a message that explains what happened and how to continue.

### 8.4 Card

`superficie` background, `linea.tenue` border, `marco` radius (8 px), padding `s500`, **no texture** (and no shadow in Nocturno; in Diurno, the §4 shadow); hover MAY climb one surface step (§9, elevation). Headline `titulo.s`, body `cuerpo.s` in secondary.

### 8.5 Datum / KPI

Figure in tabular Mono `dato.xl`, label in `type.etiqueta` tertiary below. The figure's color follows the semantics (§2.4). `base` background with border: the datum is a probe, not a card.

### 8.6 Pixel-register components
These components live **inside a pixel scene or experience**. They do not replace the corporate components of §8.1–9.5.

| Component | Construction | Usage rule |
|---|---|---|
| **Dialogue box** | Basalto or dark Bronce surface, 1 px Noche border, Pixelify text, speaker in an approved color | one voice per block; full reading available before or after the typing |
| **Portrait** | `24×24` grid or `48×48` module, clear silhouette, same light direction as the scene | accompanies a conversation; does not replace the speaker's name |
| **Inventory slot** | `12×12` object, straight `linea-fuerte` frame, name visible on focus or selection | selected state = Turquesa border + label; not just a color change |
| **Brief HUD** | `12×12` icon, flat background; numbers in **Geist Mono if the datum persists** (counters, time, resources) and in **Pixelify if diegetic** (floating damage, loot, the world's voice) | only state needed during the action; nothing ornamental; the two voices do not mix in the same indicator |
| **Achievement / badge** | `12×12` or `24×24` grid, rarity written and treated per §2.6 | the legendary halo remains the only glow |

The system's focus (`2 px` Turquesa, offset `2 px`) remains vectorial and visible even around a pixel component. Accessibility takes precedence over historical fidelity.

### 8.7 Messages to the user
How the interface speaks when something happens. Universal template: **what happened + what to do**, in level I, without drama and without empty apology. The mute error ("Something went wrong", with no cause or way out) is FORBIDDEN.

| Piece | When | Anatomy | Hard rules |
|---|---|---|---|
| **Notice (toast)** | result of an action or a system event | elevated surface, `marco` radius, 2 px left border in the semantic color (§2.4), one sentence (optional title), silent close | bottom right (if the progress moon occupies the corner, stack above); auto-close 6 s, paused on hover; max 3 stacked; enters with reveal 02; `aria-live="polite"` — `assertive` only critical |
| **Tooltip** | clarify a control; never contain the essential | one `cuerpo.s` line, `control` radius; **speaks in the opposite mode**: Arena/Noche in Nocturno, Noche/Arena in Diurno | 400 ms delay (0 when chaining); also on keyboard focus; on touch it does not exist — the visible label rules |
| **Tip** | dismissible contextual help | `marco` card with `light` icon + CONSEJO eyebrow + one sentence | dismissed does not return; maximum one per view; never blocks |
| **Load error** | a resource does not arrive | empty state: `light` icon 48 px + what happened + **one** action (Retry, ghost) | does not blame the user; no typing — the error is not theatre; if the cause is known, it is said |
| **Field validation** | invalid datum | message under the field: what happened and how to fix it (§8.3) | never color alone; on submit, focus goes to the first field with an error |
| **Destructive confirmation** | before the irreversible | minimal `marco` dialog: verb in the title, consequence in one sentence, [Cancel ghost] [Destructive verb] | the destructive never pre-focused; Esc cancels; the verb repeats, not "Accept" |

### 8.8 Form controls and product pieces
The carpentry that was missing, unified by a single rule: **the active dresses in ink** — checked box, switched-on toggle, chosen option, current page and active row use the same ink pill/fill (Noche over light, Arena over dark) as the Platform's sidebar. Symmetric between modes, 16:1, zero decisions per control. State transitions (≤ `120 ms`) are states, not pieces of the §9 catalogue.

| Control | Specification | Hard rules |
|---|---|---|
| **Checkbox** | 18×18, `control` radius, `linea.fuerte` border; checked = ink fill + paper check; indeterminate = dash | label on the right, always clickable; error per §8.3 |
| **Option (radio)** | 18 circle, 8 inner dot in ink | group with a visible legend; never a single option |
| **Switch** | 36×20 capsule, 14 disc; off = surface + secondary disc; on = ink + paper disc | always with a label; the state also reads by position; for immediate actions (does not replace the checkbox in submitted forms) |
| **Select** | closed = §8.3 field + `caret-down` regular 16; open = `elevada` panel, `marco` radius, §4 shadow in Diurno; options in 40 px rows; **chosen = ink/paper pill** | full keyboard (arrows, Enter, Esc, typing jumps); max 7 visible + scroll; the native MAY in simple forms and SHOULD on mobile |
| **Modal dialog** | **canonical veil `rgba(20,17,15,.72)`** — the same piece that protects the brand over image; `elevada` panel, `marco` radius, 480 px (confirmation) / 640 (content); enters with reveal 02 | focus trapped and first focus on the safe control; Esc closes; the background does not scroll; destructive confirmation follows §8.7 |
| **Pagination** | Mono; `‹ 1 2 … 9 ›`; **current = ink/paper pill**; touch 44 | always states the total («3 de 9» in `etiqueta`); «Load more» MAY in continuous flows |
| **Progress bar** | 4 px, capsule; track `linea.fuerte`, **ink fill**; ALWAYS with a Mono figure beside it | **only with a real known percentage** — the indeterminate is forbidden: that is what the moon (§9.1-06) and the dots (07) exist for. Expressive variant [EXTENSION — validate]: the binary filling up — bits replacing sediment |

**Progress selection rule:** discrete sequence or reading? moon. Short unmeasured wait? dots. Real percentage? bar. Three shapes, zero ambiguity.

**Velo nuance (5.0.0):** on Velo-register surfaces, the modal MAY enter by **crystallization** (§9.1-11) instead of reveal 02; the background veil is still the canonical `velo.imagen` and the focus rules do not change. In the Umbral, the modal does not change.

---

### 8.9 The book's components
The codex's editorial carpentry. They live **inside the paper register** (`PRO-014` section 6.12) and do not replace the components of §8.1–9.5.

| Component | Construction | Usage rule |
|---|---|---|
| **Book bar** | 54 px, paper background at 88 % + `blur(10px)`, bottom hairline; while reading it **yields to 40 px** and hides labels and the A·A·A control | **It never disappears**: bookmark, index and narrator stay one tap away; the main action keeps its name — it is never reduced to a cryptic arrow |
| **Drop cap** | chapter's first letter in small caps at `4.4em`, floated, structure color | One per chapter and only in the first paragraph; removed in printable sheets |
| **Reading box** | deep paper, 1 px border + 3 px solar edge on the left, radius `0 10px 10px 0`, `LECTURA` label riding the top border | Long quote, table rule or author's aside; in italics, secondary text |
| **Plate** | `marco` frame, gap with diagonal hatching when the illustration does not yet exist, caption with description + technical sheet in Mono | The gap **is shown**, not disguised: a book under construction says so |
| **Numbered table** | `caption` in Mono small caps («Tabla I · …»), header in structure, first column in italics, rows with hairline | The book's table is not the product's (`PRO-014` section 6.11): here reading rules, not density |
| **Margin note** | 200–220 px side column from `1200 px`; below that, it drops to the paragraph's foot | **Never duplicated**: either margin or foot. Reference in Mono, superscript in interactive color |
| **Fillet** | hexagonal glyph centered between two 96 px gradients | Separator of the book's sections; replaces the binary inside the paper |
| **Umbral seal** | 100 px disc, structure border, halo `0 0 12px rgba(239,165,23,.25)` and inner radial gradient | The **only** use of the legendary halo outside rarity: it marks the session boundary, not an object |
| **Glossary** | `dt` in italic small caps over structure + `dd` with the definition and its source; the term reached from a chapter is marked with a solar edge | **Definitions come only from the manual's text and each cites its source**: a glossary that invents stops being a glossary |
| **Term in the body** | dotted underline in structure, `text-underline-offset 3px`; on hover it turns solid and interactive | It says "this is defined" without stealing the prose's color; not used for normal links |
| **Download card** | frame, format in Mono small caps over structure + one sentence of why | The three always together (.md, pdf, epub): the book travels free or does not travel |
| **Colophon** | **bar** binary (the word in bits, each bit a 5×12 bar; the one in structure), circular seal, authorship, license and signature | Closes the book; the bar binary is the printed variant of §5.1 — the message is still real text in the markup |
| **Rating gears** [5.1.0 · H2] | row of Phosphor `gear` 0–5, `regular` 18 px; the reached ones in `fill`; on setting the value, the set ones turn **a quarter turn** (120 ms, elevation 04) | Sheet rating (MIS-085); only where the user rates — never to display data they did not set; with `prefers-reduced-motion`, no turn |
| **The Narrator** [5.1.0 · H3] | play/pause in the book bar (proper icon of the §6.5 set); reads aloud via Web Speech, **highlights the block being read** (solar edge, like the reached glossary term), pace control next to the A·A·A | Scope: codex body, glossary and sheet — never interface; if Web Speech is unavailable, the control is not shown (no dead buttons); the highlight follows the audio, not the scroll |

## 9. Motion and animation

The philosophy is `CAN-008` §3.9. These are the catalogue and the limits.

### 9.1 The catalogue — fourteen animations, and no more

| # | Animation | Specification | Where yes | Where no |
|---|---|---|---|---|
| **01** | **Typing** — the flagship [CANON]: text letter by letter with a block cursor, heritage of graphic adventures and 90s terminals | `22 ms/character`, linear; block cursor in Ámbar | Hero headlines, lore revelations (level II), product loads | Long body, functional interface, level III, print |
| 02 | Reveal on approach | `320 ms` · ciclo; opacity + 8 px rise, on entering the viewport, once | Content upon being discovered | Controls; re-firing on scroll |
| 03 | Signal sweep | `8 s` linear infinite; Turquesa band traversing the binary | **Maximum one per view** — the ambient cyber dose | Several at once; over reading text |
| 04 | Elevation | `120 ms` · ciclo; climbs one surface step, **no displacement** | Surface hover | Any position movement |
| 05 | Legendary pulse | `2.4 s` ease-in-out **× 2**; the halo breathes | Only the moment of obtaining; afterwards, static halo | Ambient loop; other elements |
| 06 | Lunar phase | **Loading [cadence corrected in 5.0.0]**: full cycle of the **eight phases** — quarters included — at `1,400 ms`/phase with fade ≤ `240 ms` (one turn ≈ 11.2 s). At 900 ms the quarters could not be read: **a phase that gives no time to be recognized is not a phase**. The shape is computed — fixed limb + elliptical terminator —, not swapped drawings: that way the moon truly grows. **Real progress and reading**: only waxing phases, from new to full — finishing is a full moon | Long loads, real sequence progress, reading progress of a long document (this very guide demonstrates it) | Waits < 2 s; full cycle on progress (waning while advancing confuses) |
| 07 | Waiting dots | `900 ms` · steps(3); `Cargando···` | Loading buttons | Running text |
| 08 | Block cursor | `1 s` · steps(2) | Accompanying the typing or an active field | Loose, decorative |
| 09 | Orchestrated moment | Headline typing + reveals staggered at `80 ms` | The piece's entrance — one per piece | Repeated; on every section |
| **10** | **Surfacing** — knowledge comes out of the fog [5.0.0] | `560 ms` · ciclo; opacity 0→1 + `blur(8px)→0` + 8 px rise; on entering the viewport, once | Velo register: archive, Summa, sheets upon opening, revelations | Functional interface; long lists (reveal 02 suffices); Diurno; corporate Umbral |
| **11** | **Crystallization** — the glass materializes [5.0.0] | `320 ms` · ciclo; `backdrop-blur 0→12px` + border 0→50 % + opacity | Velo panels and modals (§8.8) | Outside the Velo; over backgrounds without atmosphere |
| **12** | **Page turn** — **RETIRED in 5.1.0 (H5)** | 5.0.0 registered it "to be verified against the LAP"; verification came back empty: the codex does not animate the page turn — the only living thing in that view is the Trazo (13). The number is not reused (append-only catalogue); if someday the paper turns pages with animation, it will enter as a new piece with its own specs | — | — |
| **13** | **Trazo** — the corners draw themselves [5.0.0 · in production] | `1.6 s` · ease · `stroke-dashoffset: 340 → 0`; four engraving frames staggered at `120 ms` | Book cover and chapter opening (`PRO-014` section 6.12) — it **is** that view's orchestrated moment | Interface; re-firing on scroll; alongside another orchestrated moment |
| **14** | **Sky** — the Velo's background breathes [5.0.0 · in production] | Drift of `±0.06 px`/frame with reappearance on the opposite side + alpha oscillating between `.05` and `.85` at its own rhythm (`.002–.006`) | Background of the Velo register (§10.1) — **the only sanctioned exception** to the ambient-loop veto | Over long reading; with parallax; reacting to cursor or scroll |

The first three 5.0.0 pieces (10–12) are **transitions, not loops** and **invent no durations**: they reuse `duration.largo` (560) and `duration.medio` (320). The **trazo** (13) arrives measured from production with its own `1.6 s` — it is the catalogue's only new duration, and it is justified because drawing four corners faster turns them into a blink. The **sky** (14) is the only sanctioned exception to §9.2's ambient-loop veto: it is authorized because it is the **register's background**, not a view's ornament — and that is why it reacts to nothing. The codex's **reading moon** is not a new animation: it is the lunar phase (06) demonstrated in production. 10–12 belong to the Velo register and the living paper; the 01–09 catalogue serves Umbral and Velo alike. The orchestrated moment remains **one per piece**. With `prefers-reduced-motion`, surfacing and crystallization appear instantly: opacity is kept, blur and displacement are removed.

### 9.2 Always forbidden

*5.0.0 amendment: the Velo's sky (§9.1-14) is the only sanctioned exception to the ambient-loop veto; any other remains forbidden.*

Parallax. **Glitch** (tempting with cyber at 20 %: it breaks the solar calm and accessibility). Ambient loops outside the sweep. Animating reading-text color. Animating focus. Autoplay with sound.

### 9.3 Typing implementation reference

The full text MUST be in the DOM before animating (SEO and accessibility): `aria-label` is set with the complete content, text nodes are emptied preserving the markup, they are written at `22 ms` with the `▌` cursor following the writing, and on finish cursor and `aria-label` are removed. Without JS or with reduced motion: the text simply is.

### 9.4 Sprite animation
A sprite's internal animation is pixel-register content, not a tenth interface animation. It is limited to narrative or game actions and does NOT authorize movement of layout, buttons or surfaces.

- **Two frames:** alternation of gesture, spark, indicator or minimal movement. The extremes must be distinct and legible.
- **Four frames:** walk cycle or simple action. Recommended order for locomotion: contact · step · opposite contact · opposite step.
- **Cadence:** use existing durations: `120 ms` per frame for fast actions, `200 ms` for locomotion and gestures, `320 ms` for deliberate reveals. No duration is invented per sprite.
- **Key pose first:** the poses with the most reading are drawn before the in-betweens. If a cycle is not understood from its key poses, adding frames does not fix it.
- **No interpolation:** there is no *tweening*, motion blur, smoothed rotation or subpixel displacement. Movement happens in whole jumps and the poses carry the sensation of weight.
- **Stable volume:** head, torso and main mass keep their size. The contour only changes when the action demands it; involuntary trembling invalidates the cycle.
- **Loops with cause:** walking while the character walks, machine while it operates, signal while it communicates. A still character does not need to breathe eternally; stillness is also a decision.
- **Reduced motion:** the most informative pose is shown, functional states complete instantly and decorative cycles stop.

The palette cycling of §2.7.3 and sprite cycles cannot compete in the same focal zone: a single orchestrated moment per piece remains the rule.

---

## 10. The Velo · working values

The register is decided in `CAN-008` §3.6. These are its numbers.

### 10.1 The sky · rarity made cosmos
The star background of `numinia.org` is not decoration: **the sky's distribution is the rarity scale** (§2.6). Sixty of every hundred stars are common and one is legendary — whoever looks at the sky reads the same grammar they read in loot, without anyone explaining it. It is the **only sanctioned appearance of rarity outside the game**, and it is authorized because the sky *is* world: it does not color data, prices or deadlines (§2.6 stays intact there).

| Tier | Weight | Radius | Canonical color |
|---|---:|---|---|
| Common | 60 | 0.3–1.2 px | Arena `#F9EBDC` |
| Uncommon | 25 | 0.5–1.5 px | Verde `#8FC46B` |
| Rare | 10 | 0.6–1.8 px | Tempered blue `#5D9BD6` |
| Epic | 4 | 0.8–2.5 px | Purple `#A98BE0` |
| Legendary | 1 | 1.0–3.0 px | Ámbar `#EFA517` |

Behavior (canonized exactly as it stands in production): **175 stars**; drift of `±0.06 px` per frame with reappearance on the opposite side; **alpha breathing** between `.05` and `.85`, each star at its own rhythm (`.002–.006` per frame); reseeding on resize. Hard rules: Nocturno only; **no parallax and no reaction to cursor or scroll** — it is background, not interaction; never under long reading text; with `prefers-reduced-motion` the sky stops and the stars stay fixed at mid alpha.

**Drift detected `[FIX]`:** numinia.org today draws the sky with hexes foreign to the system (`#22C55E`, `#3B82F6`, `#A855F7`, `#F97316` — Tailwind defaults). The rule is written with the canonicals of §2.6; the recoloring goes to the web repository roadmap.

### 10.2 The reading veil · seen, not read
The codex's session boundary, already in production: the closed chapter **is shown** blurred (`blur(2.2px)`) and dissolving downward with a linear mask of `0→90 %`. It is not a wall that hides — it is a veil that promises; the funnel is soft by decision (D2 of the LAP). Rules: veiled text stays **inert** (`user-select:none`, `pointer-events:none`, out of the focus order); the Umbral's seal and its call float **sharp above**; content the person already had open is never veiled.

**Its animations** live in §9.1 (10–14). The 01–09 catalogue remains available to Umbral and Velo alike; 10–12 are exclusive to the Velo and the living paper (`PRO-014` section 6.12).

## 11. The pixel register · working grammar

The register is decided in `CAN-008` §3.3. This is how a pixel piece is built.

### 11.1 Visual grammar · legibility before detail
The 90s reference is not reproduced as a nostalgic filter: its discipline is adopted. The artist works with few pixels, few colors and visible decisions. Every pixel MUST belong to a shape, a light, a material or an action; noise that does not communicate is removed.

- **Silhouette first.** Characters, interactive objects and emblems MUST be recognizable as a single-color mass at native scale. If two elements serve different functions, their silhouettes MUST NOT depend on the palette to be told apart. The test is done over Noche and Basalto **and, if the figure is dark, over Ceniza** [learned by producing]: a Noche silhouette disappears over its own color.
- **Reading by masses.** Every main figure is organized into shadow, body and light before adding detail. Accents come last. Detail that breaks the reading at real size is removed even if it looks attractive magnified.
- **Cluster, not confetti.** Pixels group into continuous clusters. An isolated pixel may only exist as a specular highlight, star, functional particle or an indispensable facial feature; never as indiscriminate texture.
- **Deliberate steps.** Diagonals and curves keep a regular pixel rhythm. Accidental jaggies, double outlines and arbitrary thickness changes are corrected at ×1 scale.
- **Selective outline.** Noche (`#14110F`) separates the silhouette from the active background; inside the figure, divisions are resolved with shadows from the ramp itself. A uniform black outline around everything flattens the volume and SHOULD NOT be used except in very small sprites.
- **Single light.** The main source comes from top-left, as the register already fixes. Every plane, cast shadow, metallic highlight and material change MUST obey it. There is no *pillow shading* — centered light wrapping the shape — and no reflections without a source.
- **Character through proportion.** Head, torso, tools and gesture are exaggerated only to improve reading; not to imitate a specific franchise. The narrative economy of the graphic adventure is inherited, not its proprietary designs.

### 11.2 Working scales and consistency
| Family | Canonical grid | Decided first | Checked at ×1 |
|---|---:|---|---|
| **Object / badge** | `12×12 px` | silhouette, orientation, interaction point | that the object is not mistaken for another in the same inventory |
| **Character / emblem** | `24×24 px` | pose, balance axis, dominant tool or feature | that action and direction read without animation |
| **Scene module** | `48×48 px` | depth, entry/exit, focus and light mass | that the focus stays visible without zoom |

- Drawing and correcting happen at **×1**; ×2, ×3, ×4, ×6 and ×8 serve inspection and presentation, not pixel decisions.
- An asset's scale is fixed at the start. It MUST NOT be drawn large to be reduced later, nor rotated with interpolation. A new scale demands a redraw on its grid.
- All anchor points — feet, object center, tool origin and dialogue box — use integer coordinates and hold across frames.
- The *hitbox* and touch zone belong to interaction, not the visual outline: it MAY be larger than the sprite to meet the `44×44 px` accessibility minimum without enlarging the drawing.

### 11.3 Depth and scene composition
Depth is built with **overlap, scale, contrast and detail density**; not with blur. The background uses more neutrals, less internal contrast and larger clusters. The foreground MAY have darker edges and greater detail, but MUST NOT cover necessary actions.

1. **Background:** establishes place and climate; avoids accents except one narrative signal.
2. **Play plane:** concentrates characters, interactive objects and routes. It is the zone with the greatest silhouette clarity.
3. **Foreground:** frames or gives depth; never competes with the objective.
4. **Focus:** a single dominant point per scene. Ámbar signals value or discovery; Turquesa, interaction; Coral, real time.

An interactive object MUST be locatable through at least two channels: silhouette + position, name + symbol, or contrast + focus response. Never color alone.

### 11.4 Visual matrix · how yes / how no
| How yes | How no |
|---|---|
| Draw the silhouette and test it over Noche and Basalto | Add texture before resolving the shape |
| Share colors between materials to cohere the scene | Create a new ramp for every object |
| Reserve loose pixels for highlights or functional particles | Sprinkle noise so it "looks retro" |
| Exaggerate gesture, tool or direction to read at ×1 | Trust details only visible magnified |
| Keep the same origin and volume across frames | Let the character tremble through outline changes |
| Use nostalgia as production grammar | Copy proprietary compositions, characters or interfaces |

## 12. Accessibility · *Equable*

**WCAG 2.2 AA** (EN 301 549, EU legal obligation). Contrast 4.5:1 / 3:1. Focus always visible. Keyboard in logical order. Nothing by color alone — rarity included. Touch 44×44. Text alternative on informative images. `prefers-reduced-motion` respected (§9). At events: signage legible at 10 m without depending on color; instructions also in level I.

---

## 13. Starter kit

Base of every website and HTML document. It is **installed, never copied**:
the source is the package `packages/design-kit/` (`@numengames/design-kit`,
MIT) and the published copy is `/diseno/kit/` with a sha256 manifest, by
the decision that consumers install packages. Rewriting it from memory produces token drift. Paths are
relative to the site root.

## 14. License · *Legal by Design*
**CC0 1.0 Universal** for the whole system. **Exception:** the logo, the scarab brandmark, «Numen Games» and «Numinia» are identifiers of origin and stay out. You can copy the system; you cannot say you are Numen. What is released uses open formats and free licenses (OFL, MIT); the license texts **accompany the fonts** in `assets/fonts/` inside the kit. Public Domain Day is the moment to release the accumulated.

---

## 15. Conformance

| Check | Rule | Verified by |
|---|---|---|
| `DS-01` | The published kit is generated from `packages/design-kit/`, never edited in place | `[AUTO: scripts/generate-design-kit.mjs --check]` — byte-identical |
| `DS-02` | A value used in a piece exists in the published token file | `[MANUAL]` — `PRO-014` step 3 |
| `DS-03` | Every public route meets WCAG 2.2 AA (§12) | `[AUTO: axe-core + Playwright, in numinia-web]` — `ARC-010` |
| `DS-04` | Motion is one of the catalogued animations (§9.1) | `[MANUAL]` — `PRO-014` checklist |

## 16. What this standard does NOT do

It does not decide direction: registers, the mix, the brand play, the motion
philosophy and the voice are `CAN-008`, and a value here that contradicts it
is a defect here. It does not say how a piece is produced or checked:
`PRO-014`. It does not license the assets: `STD-010`. It does not carry a
roadmap: what is missing is a mission or a debt entry, not a section.

## 17. References

| Resource | Authorship | License | Link · distribution | Use in the system |
|---|---|---|---|---|
| **Geist · Geist Mono** | Vercel | SIL OFL 1.1 | [vercel.com/font](https://vercel.com/font) · npm `geist` · self-hosted in `/assets/fonts/` | Sole typography (§3) |
| **Phosphor Icons** | Helena Zhang · Tobias Fried | MIT | [phosphoricons.com](https://phosphoricons.com) · [github.com/phosphor-icons/core](https://github.com/phosphor-icons/core) · npm `@phosphor-icons/web` | Sole iconography (§6) |
| **Pixelify Sans** | Stefie Justprince | SIL OFL 1.1 | [Google Fonts](https://fonts.google.com/specimen/Pixelify+Sans) · self-hosted in `/assets/fonts/` | Pixel-register typography (§3.5) |
| **Alegreya · Alegreya SC** | Juan Pablo del Peral · Huerta Tipográfica | SIL OFL 1.1 | [Google Fonts](https://fonts.google.com/specimen/Alegreya) · variable roman + italic and small caps 400/500, self-hosted (v5 rebuild) | Third voice — book and codex (§3.6) [EXTENSION] |
| **W3C Design Tokens (DTCG)** | W3C Community Group | Open specification | [design-tokens.github.io/community-group/format](https://design-tokens.github.io/community-group/format/) | Token format (`PRO-014` §2) |
| **WCAG 2.2** | W3C | Norm (EN 301 549) | [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/) | Accessibility floor (§12) |
| **Octalysis** | Yu-kai Chou | Behavioral framework | [yukaichou.com](https://yukaichou.com/gamification-examples/octalysis-complete-gamification-framework/) | Behavioral design of proposals |
| **8 Bit & '8 Bitish' Graphics — Outside the Box** | Mark Ferrari · GDC 2016 | Professional reference | [gdcvault.com/play/1023586](https://www.gdcvault.com/play/1023586/8-Bit-8-Bitish-Graphics) | Clusters, limited palette and palette cycling; production reference, not visual canon |
| **ScummVM · Understanding the graphics settings** | ScummVM project | GPL / documentation | [docs.scummvm.org](https://docs.scummvm.org/en/latest/advanced_topics/understand_graphics.html) | Adventure graphics scaling, nearest-neighbor and pixel preservation |
| **SDL · Integer scale** | Simple DirectMedia Layer | zlib | [wiki.libsdl.org](https://wiki.libsdl.org/SDL2/SDL_RenderSetIntegerScale) | Technical reference for integer scaling |
| **Aseprite · Indexed color and sprite sheets** | Igara Studio | Official documentation | [aseprite.org/docs](https://www.aseprite.org/docs/color-mode/) | Indexed workflow, closed palette and sprite-sheet export |
| **Plutchik's wheel · Jung's archetypes** | — | Theoretical foundation | — | Emotion and personality of the Brand & Culture |
| **Brand & Culture Numinia v0.1.2** | Numen Games | Internal | `2026_03_20-Numinia_Brand_and_Culture-v0.1.2.pdf` | Source of the identity |

---
