---
id: "MIS-085"
title: "Numinia Codex Reader + LAP (numinia.com/lap/)"
type: mission
status: todo
version: "0.2.0"
created: "2026-08-17T18:59:03Z"
created_source: "git:b484b68"
created_confidence: exact
updated: "2026-08-27T22:05:37Z"
author: "oracle"
owner: "oracle"
tags: [web, platform, codex, lap, character-sheet, design, lore]
license: "CC-BY-4.0"
mission_id: "MIS-085"
area: "Platform / numinia-web"
guild: "Alchemists"
type_execution: "hybrid"
priority: "critical"
effort: "XL"
---
> Oracle-signed brief v0.2.0 (2026-08-17), 15 final decisions (D1–D15).
> Execution lives in `numengames/numinia-web`; the manual payload lives in
> `numengames/numinia-lore`. The frozen visual reference
> `codex_numinia_mockup_v2_diurno.html` is kept in numinia-web at
> `docs/design/codex_numinia_mockup_v2_diurno.html`.
> Amendments by the Oracle after signing (2026-08-17, chat): the manual stays
> ONE canonical file in numinia-lore (File Over App) — build-time chapter
> splitting only, no physical monolith split; the LAP evolves inside
> `apps/store` (D7 escape clause exercised); the old 4,667-line manual copy
> retires once the pipeline reads v0.6.0.

# Mission — Numinia Codex Reader + LAP (`numinia.com/lap/`)

**Version:** 0.2.0 (CONSOLIDATED — Oracle-signed decisions, executable)
**Date:** 2026-08-17
**Track:** `numinia.com` — production grade. Excellence over speed. No shortcuts.
**Content source:** `github.com/numengames/numinia-lore` (Markdown, canonical, PUBLIC repo)
**Payload:** `Numinia_Manual_del_juego_de_rol_v0_6_0.md` — replaces ALL current codex content.
**Design mandate from the Oracle:** «Clavar este diseño es muy importante.» Layout quality is a first-class acceptance criterion, not polish.

---

## 0. Before anything else — MANDATORY

1. **Audit current state first.** Read the current branch state of every repo you touch before assuming anything. This brief was written on 2026-08-17; sessions evolve fast. List contradictions you find and STOP if any is structural.
2. Read `2026_08_15-Numen_Design_System-v4.2.0.md`: §19 (agent contract) + §19.3 (tokens) + §13.1 (starter kit — **copy, never rewrite from memory**). Then read §7 of THIS brief: the book plane is an Oracle-validated extension that consciously overrides specific Khepri rules.
3. Read licensing doctrine (Canon C-005, current version) before touching any file header.
4. Check `DECISIONS.md` / `LEGAL_DEBT.md` for entries newer than this brief.
5. Audit `packages/domain` before creating character-sheet types — sheet types may already exist among the 27 domain files. Adjust, don't duplicate.

---

## 1. What this is

**LAP = Lector Akásico Personal.** Not a "user area" — a world artifact: the citizen's personal reader of the Akashic Records. Everything under `/lap/` is a *reading*:

- `/lap/codex/` — the Codex: canonical web edition of the RPG manual (this mission).
- `/lap/character/` — the character sheet, live (this mission).
- *(future, vision only — design nothing for it, block nothing against it)*: a play area where an AI agent acts as DJ of Numinia. The stable block IDs (§5) and character-as-file (§6) are, incidentally, exactly the substrate such an agent would need to read game state. Leave it at that.

Peirce mapping: manual text + printable sheet = **Narrative Projection** (lore, reserved). Reader + sheet logic = **Operating System** (code). Domain types = **Functional Model**. Separate repos, separate licenses, zero mixing.

---

## 2. Decisions — all Oracle-signed 2026-08-17

| # | Decision |
|---|----------|
| D1 | `numinia-lore` PUBLIC. License applied properly: text under the reserved-lore identifier C-005 prescribes (verify exact `LicenseRef-…`), SPDX header per file, REUSE 3.3, `reuse lint` in CI. The legal page states the content license to readers. |
| D2 | Gate = SIWE-only, **soft**. With D6 (free downloads) the Umbral is an identity funnel, not a wall — the Oracle consciously accepts the gate is bypassable. Implement behind a pluggable `AuthProvider`; ship with SIWE. No Web2, no user database. |
| D3 | Bookmark: localStorage. Schema `{version, chapterSlug, blockId, updatedAt}`. Wallet-scoped variant must be additive later, not breaking. |
| D4+D16 | Book plane [EXTENSIÓN — Oracle-validated, see §7]. Serif body (Alegreya), Diurno by default, paper texture allowed, engraving ornament. |
| D5 | Illustrations: same reserved-lore license as the text. Placeholder slots now; final art later. |
| D6 | Downloads free, no login: `.md` (per chapter + whole book) · **PDF** (Diurno print) · **EPUB** (Kindle-compatible via Send to Kindle). |
| D7 | `apps/lap` in the monorepo (Astro SSG, Cloudflare Worker, zone route `numinia.com/lap/*`). Codex and character sheet are sections of it. If audit reveals a better placement, propose before executing. |
| D8 | Unversioned URLs: `/lap/codex/[chapter-slug]`. Version in front-matter + colophon; Git history is the archive. |
| D9 | Spanish only. i18n-ready routing from day 1. |
| D10 | Legal page = provisional note. `© 2026 Numen Games S.L. · Autoría: Christian Märtens (80 %) · Pablo Fernández-Maquieira Martínez (20 %) · Texto e ilustraciones: todos los derechos reservados`. Marked provisional in a code comment; the Oracle will revise. |
| D11 | **The character is a file.** No server storage, no DB. Edit in browser → autosave localStorage → export/import `.md`/`.json`. Optional wallet "sealing" is a future additive layer. |
| D12 | Body serif: **Alegreya** (+ Alegreya SC for small caps), SIL OFL, self-hosted in `/assets/fonts/` like Geist and Pixelify. Chrome/labels stay Geist + Geist Mono. |
| D13 | Diurno/Nocturno toggle **belongs to the manual itself**, independent of the rest of the LAP interface. Default: Diurno. Persist choice in localStorage. |
| D14 | Numinia logo: search the org repos for the official vector FIRST. If absent, vectorize the wordmark from `Hoja_de_PJ_v0_6_0.jpg` and submit as [EXTENSIÓN — validar] for Oracle signature before shipping it. |
| D15 | Character sheet is FREE (no gate). Wallet sealing optional, later. |

Open non-blocking: Alicia's surname in the acknowledgments (Oracle will supply; do not publish print/EPUB editions without asking once).

---

## 3. Design thesis — read this twice

**The matter of heavy paper, the ergonomics of an e-reader.** Halfway between a Kindle and a high-grammage RPG tome.

From the RPG book, the **matter**: Arena paper with subtle grain, ink that reads as printed, engraved corner frames, plates, a literary serif with true small caps. From the e-reader, the **ergonomics**: chrome that gets out of the way while reading (hide on scroll down, return on scroll up), instant position memory, perfect measure and rhythm, one-tap bookmark, adjustable text size (S/M/L).

**Forbidden:** 2010-iBooks page-curl animations, fake spines, fake page edges, 3D-perspective tricks. The page doesn't pretend to be an object; it *feels* like paper through texture, typography and rhythm.

**Quality test (real acceptance criterion):** a screenshot of any page must look like a photograph of a well-printed book.

**The Rosetta stone is `Hoja_de_PJ_v0_6_0.jpg`.** The character sheet already IS the visual direction: Arena parchment, Noche ink, Ámbar structure, engraved corners, gears as rating dots. It maps exactly to the 40/40/20 dose: solar = the paper and native Diurno; steam = ornament, serif, gears; cyber = the Numinia wordmark letterforms, Mono labels, the typing animation.

**Palette (Diurno):** paper `#F9EBDC`/`#FDF6EE`, ink `#14110F`, structure/emphasis Ámbar tostado `#7A5100` with Ámbar `#EFA517` for solar moments, interactive Turquesa profunda `#016E7D`, tertiary Ceniza. Nocturno mode: the v1 mockup palette. Max 3 brand colors per composition; Coral/Grana never coexist.

**Motion (catalog only, `prefers-reduced-motion` always):** corner frames **draw themselves** on chapter open — THE one orchestrated moment per view. Typing (tecleo) reserved for DJ asides and support notes. Lunar loading for any async state. Gears rotate a quarter-turn when set. Reading progress = lunar phase, growth-only (§10.1-06). Nothing else.

---

## 4. Layout — closed component inventory

No prose may exist outside an assigned component. The agent MUST NOT invent a new component without proposing it first.

1. **Portadilla de capítulo** — full view: chapter number (Mono etiqueta, Ámbar tostado), serif title, epigraph, optional viñeta slot, self-drawing corner frames.
2. **Cuadro de lectura** (read-aloud) — bordered, Ámbar rule, serif italic. Machine-detectable in MD (convention in `numinia-lore/CONTRIBUTING.md`).
3. **Aparte del DJ** — dashed border, sans, typing animation on first viewport entry.
4. **Tabla numerada** — «Tabla 4.2» caption, cross-reference anchors, etiqueta headers, Mono tabular figures, `<caption>`, horizontal scroll on mobile.
5. **Lámina / Viñeta / Glifo** — illustration slots (full-bleed / inline ~40% wrapped / margin ornament). Placeholder = sketch frame + caption + art-direction note from front-matter.
6. **Stat block** — bestiary component, one consistent shape (extract fields from Cap. 6).
7. **Nota al margen** — footnotes become margin notes in the margin column (≥1200px); collapse inline at anchor point on mobile.
8. **Término de glosario** — dt/dd; every occurrence in body text may link to it.
9. **Ficha imprimible** — the manual-annex sheet (see §6-A).
10. **El Umbral** — end-of-chapter-1 gate: veiled next chapter, seal, one primary action.
11. **Colofón** — binaria separator, Khepri seal (closes, never opens), legal note, version.
12. **Cromo del Códex** — top bar (TOC, bookmark, downloads, size S/M/L, mode toggle, Umbral CTA) + running footer (chapter · section · lunar progress). Both auto-hide on read.

**Page architecture:** reading column ≤68–72ch centered; real margin column at ≥1200px (glyphs, margin notes, short asides); everything collapses inline on mobile. Print: Diurno, running headers, page numbers, compact paper rhythm (Khepri invoice lesson: `s500/s300–s400`, not screen rhythm).

---

## 5. Content pipeline (`numinia-lore`)

- Split the monolith: `00-introduccion.md` … `07-construyendo-la-aventura.md`, `90-el-espejo-roto.md`, `95-hoja-de-personaje.md` (NEW, see §6-A), `98-glosario.md` (NEW), `99-agradecimientos.md` (NEW), `_portada.md`, `_legal.md`.
- Front-matter (Zod at build): `title, slug, chapter_number, access: public|gated, version, illustrations: [{slot: lamina|vineta|glifo, position, caption, art_direction}]`.
- **Verbatim rule:** cleanup of conversion artifacts (broken italics across line breaks, `<sup>` markers, dash inconsistency) WITHOUT altering one word. Produce a diff report proving text-content identity.
- **Stable block IDs**: heading slugs + paragraph anchors. Bookmarks, citations and any future audio/DJ-agent sync depend on them.
- **Glossary**: extract terms (Velo, Umbral, Prisma, Akasha, Holberins, Khepris, Piezas del Conflicto, Semillas del Conocimiento, PX, Desequilibrio, Posición, …), alphabetized, definitions **sourced from manual text only — never invent lore**; flag unsourceable terms.
- **Acknowledgments** (canonical, Oracle-provided): Paul Viejo · Daniel Alonso · Alicia [surname pending] · María García · Daniel Garrido · Carlo Udina · Clio Beruete — «Y a nuestras familias, por aguantarnos.»
- **Exports**: same canonical MD → site (Astro) · PDF (print stylesheet, Diurno) · **EPUB** (Pandoc; cover, embedded Alegreya per OFL, reserved-rights metadata, per-chapter nav). EPUB build in CI.

---

## 6. The character sheet — two artifacts, one source of truth

**A. As document** (`numinia-lore/95-hoja-de-personaje.md`): structured MD transcription of `Hoja_de_PJ_v0_6_0.jpg`. Sections: Jugador · Datos identificativos (Nombre, Especie, Posición / Gremio, Rama, Casa / Facción, Distrito / Umbral, Desequilibrio, Aliento del Velo, Estado, Puntos de Prestigio) · Características físicas (Fuerza, Movimiento, Tamaño, Constitución) y psíquicas (Inteligencia, Sabiduría, Percepción, Carisma) · Competencias (**dynamic list — the printed JPG shows one character's enabled competences, NOT a fixed universal list**) · Aptitudes Especiales ×2 · Reliquias y Objetos · Tesoros. Downloadable and printable from the Codex. Reserved license.

**B. As logic** (`/lap/character/`, free access): interactive sheet.
- Gears as rating control, scale **0–5**, quarter-turn on set, full keyboard/AA accessible (gears are presentation; underneath it's a radio group).
- Rules from the manual annex + Cap. 3 (agent extracts exact point-buy): Prestigio blank until first Semillas del Conocimiento; Desequilibrio derived from Posición; enabled competences = ONLY those of the character's Gremio+Facción+Especie, others disabled; enabled-but-unpointed registered at 0; two Aptitudes Especiales with points; Reliquias/Armas carry parameters.
- **Sovereignty (D11) + its copy (Oracle-required):** character lives in localStorage + export/import `.md`/`.json`. Communicate it explicitly, Nivel II register, on first visit and beside export/import: e.g. «Tu personaje es tuyo: vive en este dispositivo y en los ficheros que te lleves. Nadie en Numinia guarda copia.» Empty/loading/error states designed; data loss warnings before destructive actions (Grana button + confirmation, per Khepri).
- Domain types: audit `packages/domain` first; adjust existing character-sheet types to the v0.6.0 sheet (Oracle: «que Claude Code lo ajuste»).

---

## 7. Khepri extension — Oracle-validated, register in the design system changelog

The Oracle has signed the **book plane** [EXTENSIÓN → CANON pending changelog entry]. It consciously overrides, for this plane only:

1. Body serif **Alegreya** (Khepri is otherwise Geist-only). Chrome stays Geist/Mono.
2. **Diurno by default** for the Codex (second surface after Plataforma; solarpunk: light dominates).
3. **Paper texture allowed in Diurno** — subtle, background only (base Khepri forbids texture in Diurno; this is a bounded exception with no precedent value for other surfaces).
4. Engraved ornament (corner frames, filetes) reinterpreted in Khepri geometry: single-stroke, palette-only, may self-draw.
5. Gears as rating iconography for the character sheet.

The design system «no está escrito en piedra» (Oracle, 2026-08-17) — but the change must be WRITTEN: add the changelog row to Khepri when this ships. The agent prepares the changelog text; the Oracle commits it.

---

## 8. Code standards & quality

TS strict, zero `any`, zero `console.log`, components ≤200 lines, Zod on env + external data, loading/error/empty everywhere, semantic HTML, WCAG AA, measure ≤90ch hard rule.

License per trichotomy, file by file: shows → edge → MIT; decides (gate, sheet rules engine) → core → AGPL. One file, one regime. REUSE-compliant both repos.

**Tests first.** Vitest: pipeline (verbatim diff, front-matter, glossary integrity, access flags), sheet rules engine (competence enabling matrix, Prestigio gating, point-buy bounds). Playwright: nav, bookmark persistence across sessions, mode toggle persistence, text-size control, gate behavior, sheet create→export→import roundtrip, mobile viewports, `prefers-reduced-motion`, print stylesheet smoke.

CI: type-check → lint → reuse lint → test → build (site + PDF + EPUB).

---

## 9. Execution phases

**A — Content pipeline** (numinia-lore PR + diff report + glossary + sheet MD + SPDX/REUSE).
**B — Codex reader, Diurno** (routes, components §4, fonts, texture, mode toggle, bookmark, downloads .md, print stylesheet).
**C — Exports** (PDF + EPUB in CI).
**D — Character sheet** (`/lap/character/`, domain audit + rules engine + UI + sovereignty copy).
**E — Umbral** (SIWE soft gate via AuthProvider).
**F — Art integration** (replace placeholders when the Oracle delivers final art).

Each phase: report findings from the §0 audit, what was built, open questions, self-score 1–10 with caveats. Surface anything irreversible (publishing, licensing, repo visibility, logo canonization) BEFORE doing it — Oracle acts.

---

## 10. Acceptance criteria (Gherkin, key scenarios)

```gherkin
Feature: The book feels printed
  Scenario: Screenshot test
    Given any rendered public chapter in Diurno
    When a full-viewport screenshot is taken at desktop and mobile widths
    Then typography, rhythm, ornament and texture read as a well-printed book page
    # Reviewed by the Oracle — subjective by design; layout is a first-class criterion

Feature: Content pipeline
  Scenario: Splitting preserves the text verbatim
    Given the v0.6.0 monolith and the split files
    When markup and whitespace are normalized on both
    Then concatenated text content is identical

Feature: Reading
  Scenario: Bookmark survives a session
    Given I set the bookmark at a specific block
    When I close the browser and return
    Then the codex offers to return me to that exact block

  Scenario: Manual mode is independent
    Given I switch the manual to Nocturno
    When I navigate the rest of the LAP and come back
    Then the manual is still Nocturno and the LAP chrome was never affected

  Scenario: The book travels
    Given the downloads control
    When I download .md, PDF and EPUB
    Then all three contain the full public content, the EPUB passes epubcheck,
      and embedded fonts and rights metadata are correct

Feature: Character sovereignty
  Scenario: Create, export, wipe, import
    Given I build a character and export it
    When I clear the browser and import the file
    Then the sheet is byte-identical in content and all rule validations still pass

  Scenario: Competence enabling
    Given a character with Gremio, Facción and Especie chosen
    When the sheet renders
    Then only their competences are enabled, enabled ones show 0 minimum,
      and disabled ones cannot receive points by any interaction

Feature: The Umbral is a funnel, not a wall
  Scenario: Soft gate
    Given I am not authenticated
    Then chapters 2+ are veiled in the reader, the download of the full book remains free,
      and crossing with SIWE reveals in-reader access
```



---

# Appendix — Kickoff (agent instructions)

# Kickoff — Codex Reader + LAP

You are the implementation agent for the Numinia Codex Reader and the LAP (Lector Akásico Personal) at `numinia.com/lap/`. You are receiving two documents; treat them with this precedence:

1. **`2026_08_17-Mission_Codex_LAP-v0_2_0.md`** — the mission brief. Normative. All decisions in its §2 table are Oracle-signed and final for this mission: do not reopen them, do not "improve" them. Anything not covered by the brief follows the Khepri Design System v4.2.0 agent contract (§19), then the repo's CLAUDE.md.
2. **`codex_numinia_mockup_v2_diurno.html`** — the visual reference, Oracle-approved (8/10, frozen). It is a rendered target, not production code: rebuild it properly (Astro, components ≤200 lines, tests first, self-hosted fonts, tokens from Khepri §19.3), but the look, rhythm, components and interactions it demonstrates are the spec. When prose and mockup disagree on a visual matter, the mockup wins; on anything else, the brief wins.

## Your first actions, in order

1. Run the §0 audit of the brief: current branch state of every repo involved, existing domain types, existing viewer code, licensing files. Report findings BEFORE writing code.
2. Produce an execution plan mapped to the brief's phases A–F, with what you will build, what you will reuse, and every question you have. Number your questions.
3. Wait for the Oracle's answers to blocking questions. Non-blocking questions: state your working assumption and proceed.

## Standing rules

- Ask when in doubt; never assume. Surface anything irreversible (publishing, repo visibility, licensing, logo canonization, Khepri changelog) BEFORE acting — those are Oracle acts.
- The manual text is sacred: cleanup is markup-only, verbatim content, proven by diff report.
- Tests before implementation. Gherkin criteria in the brief are your acceptance targets, including the screenshot test — layout quality is a first-class criterion.
- All code, comments and commits in English. Report per phase with a 1–10 self-score and caveats.

Begin with the audit.


---

# Execution log — 2026-08-18 (agent report)

**Phases A–E SHIPPED and live on numinia.com** (v0.41.0 reader · v0.42.0
editions · v0.43.0 sheet rules; every push deployed itself on green CI).

- **A**: manual v0.6.0 split at build, byte-exact, Zod manifest; lore
  `codex/` docs (glosario 79 sourced terms, hoja transcription, legal D10,
  agradecimientos).
- **B**: the book plane per the frozen mockup — Alegreya (D12), Diurno
  default with the manual's own Nocturno (D13), bookmark (D3), chrome that
  steps aside, self-drawing marcos, glosario, Umbral veiling the READER
  only (D2+D6), .md downloads, print stylesheet, legacy reader retired.
  WCAG gate forced an AA floor on the tertiary ink (both papers, both modes).
- **C**: free PDF + EPUB (D6) baked by the site's own render engine — no
  pandoc, epubcheck 5.1.0 clean and gated in CI; cover from the portada;
  live-verified on /descargas/. **The brief's one mandatory question was
  asked**: the Oracle chose to publish with «Alicia» a secas; canon updated
  in numinia-lore (151b852).
- **D**: creation rules as domain facts (competence triads, 16-pt buy,
  position mechanics + full 4-axis affinity matrix — double-extracted,
  0 mismatches), rules engine, gears 0–5 (§7.5), D11 this-device autosave +
  sovereignty copy, sheet format v3. The Procurators tree renamed per the
  manual (Legados / Mercuriales / Intendentes; glossary v1.1.0, ADR-007).
  **14 manual gaps/contradictions await rulings:
  numinia-web/docs/reference/sheet-rules-findings.md** (self-score 8/10
  there, per §9).
- **E**: substantively shipped — chapter pages are SSR and any SIWE
  session unveils gated chapters (AuthProvider = the platform's existing
  session system).

**Remaining (Oracle acts):** F final art · ~~sign the Khepri changelog row~~
**resolved 2026-08-18: the book plane is canon** — the Design System
v5.0.0 absorbs it whole (living paper §13.12, grain §6.5, third voice §4.6,
components §9.9, icons §7.5, reading veil §2.7.2, animations 12–14) and
the 4.3.0 draft is superseded; what remains pending signature is only the
explicit consecration of §4.6 and of the rename's scope (§16.15) · rule
on the 14 findings · supply Alicia's surname (editions regenerate from the
canonical MD).

**Gaps detected while absorbing v5.0.0 (2026-08-18)** — production has
things the document does not record, and vice versa: (1) the book's AA
tertiary inks (`#75695E` Diurno / `#97897D` Nocturno, phase B's WCAG
finding) are not in §19.3 — an agent rebuilding the book from the document
reintroduces the 3.7:1; (2) the sheet's 0–5 gears appear neither in §7.5
nor in §9.9; (3) the Narrator exists as an icon, with no spec for the
piece; (4) there is no blueprint for the print variant or the PDF/EPUB
editions; (5) animation 12 «paso de página», which the document claims is
verifiable against the LAP, **does not exist in the code** — production
only has the stroke (13).

**Addendum 2026-08-18 (night watch):** v0.44–0.45 shipped. The Narrator
(Web Speech, block highlight + pace; also reads the glossary), glossary
term links (site + EPUB), the truly-fixed compact chrome (a stacking rule
had silently beaten `position:fixed` since the plane shipped), footer
chapter jumps, end-of-page bookmark fix, **the printable Sheet (§4.9)** —
annex page ×5 locales + .md + print + inside both editions — and REUSE
3.3 compliance armed as CI in BOTH repos (numinia-web and numinia-lore,
closing D1's last clause). Root-caused and fixed a three-red CI streak:
hermetic fixture slugs, debugged inside the CI image via podman.

---

## Board triage — 2026-08-25

Returned from `in-progress` to `backlog` by the Oracle, in the triage of the 111
missions. **Nothing about the brief changed and the work is still wanted** —
what changed is the claim that it was underway.

- **Category:** D — stale. Last activity 2026-08-18, and the brief declares no acceptance criteria.
- **Signal, not proof:** this mission was assigned to an agent whose identity is
  in question (`D-026`, `D-027`). That is context; the evidence for this move is
  the absence of its own commit, not who it was assigned to.
- **Signed by:** Oracle, 2026-08-25.
