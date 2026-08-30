---
id: "MIS-091"
title: "The System dresses the house: numen.games and nwos.numen.games adopt the standards"
type: mission
status: done
version: "1.3.0"
created: "2026-08-18T13:20:30Z"
created_source: "git:9091f7f"
created_confidence: exact
updated: "2026-08-27T22:05:37Z"
started: "2026-08-18"
completed: "2026-08-25"
author: "claude-opus-5"
owner: "oracle"
tags: [web, design-system, engineering-standards, numen-games, nwos]
license: "CC-BY-4.0"
mission_id: "MIS-091"
area: "Corporate web / NWOS deploy"
guild: "Alchemists"
type_execution: "digital"
priority: "high"
effort: "XL"
requested_by: "oracle"
assigned_to: "numengames-web + nwos-deploy"
requires_oracle_approval: true
depends_on: ["MIS-090"]
---
# MIS-091 — The System dresses the house

> **Summary:** What MIS-090 did with numinia.org extends to the company's two
> public surfaces: the corporate web `numen.games` and the product subdomain
> `nwos.numen.games`. The three `standards/` documents — Design System v5.0.0,
> engineering-standards and the analogous terminology — are applied to repos
> and to pixels.
> **Epistemic:** How much of the house's visible identity was system and how
> much was template inheritance (Astroship, shadcn, default Tailwind).
> **Pragmatic:** The three public surfaces (numinia.org, numen.games,
> nwos.numen.games) speak a single visual vocabulary and a single CI pipeline.
> **Audience:** Oracle · Agents of `numengames-web` and `nwos-deploy`

---

**Area:** Corporate web / NWOS deploy
**Guild:** Alchemists
**Type:** digital
**Priority:** high
**Effort:** XL

---

## Story

As an Oracle, I want `numen.games` and `nwos.numen.games` to comply with the
house standards — the Design System v5.0.0 visually and the
engineering-standards structurally — so that the first surface a client sees
is not the first drift they see.

---

## Context (2026-08-18)

Real-state audit before touching anything (AGT-01, §7.2.1):

### `numengames-web` → https://numen.games (public, GPL-3.0)

| Axis | State |
|---|---|
| Design | **Major drift.** Legacy palette: gold `#FFD961`/`#D9B86A` (44 occurrences), panther `#212123`, `#171717` (20). 137 hex occurrences in `src/`, ~42 distinct values; only 6 are §19.3 canonical |
| Typography | Geist already self-hosted (static + variable), but **Inter** is imported as well (`@fontsource-variable/inter`) in both layouts and the mono is **IBM Plex Mono** |
| Icons | Local SVGs in `public/icons` (`astro-icon`); some are Phosphor by name, no declared subset |
| Engineering | CI only `test → build`; no `lint` or `type-check`; no `CLAUDE.md`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, CODEOWNERS, issue/PR templates, `.editorconfig`, TODO; `package.json` still named `astroship`, no `license` field; GitHub actions by tag, not by SHA; no `permissions` in the workflows; no Scorecard or Dependabot; repo homepage points at `numengames.com` |
| Legal | GPL-3.0 `LICENSE` without `REUSE.toml`, without `LICENSES/`, without SPDX headers. **C-005 territory = irreversible level** |

### `nwos-deploy` → https://nwos.numen.games (public, AGPL-3.0-only)

| Axis | State |
|---|---|
| Design | **Contained** drift: the whole palette lives centralized in `src/styles/global.css` as RGB triplets. Teal accent `#2DD4BF`, its own flavors (terracotta, ochre, copper, bronze, sage, med-blue) and Tailwind semantics — the same ones MIS-090 already migrated on numinia.org |
| Typography | Geist + Geist Mono already canonical |
| Engineering | Already has `CLAUDE.md`, `CONTRIBUTING.md`, CLA + gate in CI, `REUSE.toml`, `LICENSES/`, `TRADEMARKS.md`, `LEGAL_DEBT.md`, `license-check` on every build. Missing: `type-check → lint` pipeline, `SECURITY.md`, `CODE_OF_CONDUCT.md`, CODEOWNERS, templates, `.editorconfig`, TODO, Scorecard, SHA pinning, `permissions` |
| Docs | Its own `DESIGN.md`, predating v5.0.0 — same case as the `DESIGN.md` MIS-090 marked superseded |

### Precedence applied

`standards/engineering-standards.md` §7.1: both repos are **downstream**. This
agent does not edit the `standards/` documents; it executes them. §7.3:
everything legal (LICENSE, SPDX, REUSE, visibility) is **irreversible level** —
it is reported to the Oracle, not touched.

---

## Scope

### Layer 1 — Engineering (engineering-standards.md §2)

In **both** repos, up to parity with the §4 checklist:

- `CLAUDE.md` with the audit-first instruction (AGT-01), AI stance (AGT-06),
  adoption by reference of the engineering-standards (§6) and a pointer to the
  Design System reproducing the §19.5 fragment (§0.3).
- `SECURITY.md` (SEC-09), `CONTRIBUTING.md` + `CODE_OF_CONDUCT.md` (OSS-01/02,
  public repos), `CODEOWNERS` covering `LICENSE*` and `.github/workflows/`
  (SEC-10), issue and PR templates with a Definition of Done (PM-02),
  `.editorconfig` (DEV-03), `TODO.md` as the roadmap-in-a-file (PM-05).
- Identical CI `type-check → lint → test → build` (ARC-01), read-only
  `permissions` by default (SEC-08), third-party actions **pinned by SHA**
  (SEC-07), weekly OpenSSF Scorecard (§3.1), Dependabot (SEC-03).
- Homogeneous npm scripts `dev`/`build`/`test`/`lint` (DEV-02); `no-console`
  as a build-breaking rule (SRE-03).
- Exhaustive, synchronized `.env.example` (DEV-01).

### Layer 2 — Design System v5.0.0

- **Register declared before medium** (§2.8): both surfaces are
  **Umbral** (corporate web and product web); the Velo stays with the archive
  (numinia.org), not these.
- §19.3 token layer first — it carries 80% of the site:
  Noche/Basalto/Elevada backgrounds, Arena/secondary/tertiary text,
  interactive `#017C8D` with darkening states, Verdemar links,
  Ámbar for emphasis, Coral/Grana never coexisting.
- Hex sweep with a closed drift→canonical mapping over `src/`, with the
  verification grep green (the method that closed MIS-090).
- Typography: only Geist and Geist Mono, self-hosted — Inter is removed and
  IBM Plex Mono is removed.
- Space scale of 4, two radii (control 6px, frame 8px), `ciclo` curve.
- `prefers-reduced-motion` respected; the §10.1 motion catalog as the ceiling.
- `nwos-deploy`'s `DESIGN.md` goes superseded, pointing at the master.

### Out of scope (and why)

- **Every C-005 decision**: LICENSE, SPDX headers, `REUSE.toml`, visibility.
  Irreversible level (§7.3) → reported to the Oracle as debt.
- Composition redesign: the §13.2–§13.10 blueprints are not rewritten; the
  existing page architecture is respected and the vocabulary is changed.
  A composition redesign would be another mission.
- Full migration of the `public/icons` set to Phosphor: the §7.3 subset is
  declared and the rest reported as debt.

---

## Acceptance criteria

```gherkin
Feature: The house standards, applied to the two public surfaces

  Scenario: Not one color outside the system
    Given the numengames-web repository after the migration
    When the distinct hexes present in src/ and tailwind.config.cjs are listed
    Then all belong to the canonical tokens of §19.3
    And the verification grep is documented in the execution log

  Scenario: A single typographic voice
    Given either of the two sites
    When the font cascade is inspected
    Then only Geist and Geist Mono are served, self-hosted
    And neither Inter nor IBM Plex Mono is downloaded or declared

  Scenario: The pipeline is the same in both houses
    Given the workflows of numengames-web and nwos-deploy
    When CI runs on a pull request
    Then type-check, lint, test and build run in that order
    And the workflow tokens are read-only by default
    And every third-party action is pinned by SHA

  Scenario: The repository checklist is filled
    Given either of the two repos
    When the §4 checklist of engineering-standards is checked
    Then CLAUDE.md, SECURITY.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md,
         CODEOWNERS, issue and PR templates, .editorconfig and TODO.md exist
    And CLAUDE.md reproduces the Design System's §19.5 fragment

  Scenario: The irreversible is not touched
    Given that both repos have pending legal decisions (C-005)
    When the agent finds LICENSE, SPDX or visibility in its path
    Then it does not modify them
    And it reports them to the Oracle in the closing report
```

- [x] Zero hexes outside §19.3 in `numengames-web/src` — 23 distinct hexes
      remaining, all canonical; the remaining rgb() are 7 triplets, all
      canonical (grep in the log)
- [x] Zero palette drift in `nwos-deploy/src/styles/global.css` — and in all
      of `src`: not one hex or rgb() outside §19.3
- [x] Only Geist and Geist Mono on both sites (Inter and IBM Plex removed)
- [x] `type-check → lint → test → build` pipeline green locally in both
      repos, and in both with **zero type errors** (the ratchet holding
      `numengames-web`'s 31 was removed when they were fixed)
- [x] §4 checklist complete in both repos except what is gated (branch
      protection, organization settings, C-005 in numengames-web)
- [x] `permissions: read-all` and SHA-pinned actions in the five workflows
      of the two repos
- [x] `nwos-deploy`'s `DESIGN.md` superseded, pointing at the master
- [x] Observed debt reported in each repo's `TODO.md`, not fixed on own
      initiative (§7.4)

---

## Epistemic value

Knowing whether the Design System v5.0.0 can be *executed* on an inherited
web (Astroship, a commercial template, three years of patches) or only on a
web born with it. MIS-090 proved it on home ground; this proves it on
borrowed ground.

## Pragmatic value

The house's three public surfaces stop needing translation between them. A
component written for one serves in the other; a CI rule that fails in one
fails in all three. The marginal cost of the fourth surface — the default
flavor of an external organization (§2.8.2) — drops to copying the kit.

---

## Execution log

- 2026-08-18 — Mission opened by direct Oracle order ("aplica los standards a
  toda la web numen.games y al subdominio nwos.numen.games"). The prior-state
  audit is recorded in the context above.

### numengames-web · branch `feat/standards-v5` · 2 commits

- **Token layer.** `tailwind.config.cjs` becomes §19.3: brand,
  text-on-light, interactive with darkening states, link, Nocturno, Diurno
  and the §3.8 data palette. The old names (`primary.coralRed`,
  `primary.panther`, `basics.white`…) survive as aliases pointing at the
  canonical for their ROLE, to avoid rewriting ~200 classes at once.
- **Closed drift→canonical sweep:** 298 color substitutions in `src/` (44 of
  the gold `#D9B86A`, 20 of `#171717`, 84 of `rgb(217,184,106)`, 44 of
  `rgb(255,255,255)`…) + 103 classes from Tailwind's default palette
  (`text-white`, `text-slate-*`, `bg-black`, `text-red-*`). **Verification:**
  23 distinct hexes and 7 rgb() triplets in `src/`, all from §19.3.
- **Role correction (§9.1).** Action fills stop being amber: the navbar CTA,
  hero CTAs, `Button.astro`'s primary/outline variants, the VRM card and the
  chat widget move to Turquesa `#017C8D`. Three cases of Arena on Ámbar
  (1.9:1) are resolved with ink — accessibility rules over palette (§19.1).
- **Typography.** Out with Inter (dependency and two layouts) and out with
  IBM Plex Mono; Geist goes from nine static cuts to one variable, and
  self-hosted Geist Mono comes in.
- **Cookie banner** themed through its own variables (without touching
  third-party CSS): canonical surfaces, Turquesa fill, Geist, two radii.
- **Engineering.** CI `type-check → lint → test → build` + presence job;
  weekly Scorecard; Dependabot; `permissions: read-all`; actions by SHA.
  New: `CLAUDE.md`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
  CODEOWNERS, templates, `.editorconfig`, `TODO.md`, an executable README
  with badges. The package stops being called `astroship`.
- **Lint debt paid, not silenced:** 74 ESLint errors to zero — 23 `{#each}`
  with keys, dead components and imports removed, `console.*` replaced by a
  visible error state in the chat (§9.7), YAML frontmatter with tabs fixed,
  and the content `any`s typed once at their boundary
  (`src/types/content.ts`) instead of fifteen scattered times.

### numengames-web · second pass (Oracle order: «aplica el sistema de diseño a numen.games, las buenas prácticas etc»)

- **The vocabulary stops being inherited.** 227 classes renamed to the §19.3
  names and the alias block deleted from the config: the palette a developer
  can write is exactly §19.3, nothing else compiles to a color.
- **Surfaces (§6):** every shadow in the repo was a glow — 20 `shadow-[…]`
  utilities and a dozen `box-shadow` blocks of up to 70px. Ten shadows
  remain, and all ten are the canonical legendary halo.
- **Motion (§10.1):** the ambient pulses of four components are removed
  (6s infinite, including the one that names `PulseAnimatedBtn`) and two dead
  template animations. The two marquees are kept as a **declared deviation**
  (they are content, not decoration) and with `prefers-reduced-motion` they
  stop in place instead of jumping to the last frame.
- **Iconography (§7):** the icons are genuine Phosphor, but they came with a
  pure-white fill — a value that does not exist in §19.3. The 21 in use move
  to Arena, and the two served by `astro-icon`, to `currentColor`. Seven icon
  chips on Ámbar (1.9:1) move to Turquesa fill.
- **Type-check 31 → 0.** The 31 errors the ratchet was holding were **two
  real bugs**:
  1. `class` never reached `Container` (it only read `className`). Sixteen
     call sites had been passing classes into the void for years. The
     component now accepts both props; the sixteen dead strings **are
     removed** instead of switched on, because switching them on is a
     redesign: four painted text `text-nocturno-base` on a dark background
     and `manifesto.astro` carried `md:px-80`. The strings are listed in
     `TODO.md` and in the history.
  2. `locale` never reached nine components: **the `/es/` route renders
     English copy** below the fold. Each component now declares the prop
     with a `TODO(MIS-091)` at the exact point of the gap.
  The ratchet and its script are deleted: `pnpm type-check` is `astro check`
  plain again, with zero errors, as a real gate.
- Figures in tabular Mono, nocturnal links in Verdemar, and out with the `px`
  prop `Container` never had.

### Publication (2026-08-18)

- **`nwos-deploy`: closed.** The branch merged to `main` (`528e7db`), another
  session bumped its pointer to **5.1.0** (`b016e62`) and restored
  `.env.example` synchronized with `src/lib/env.ts` (`093ab65`). It is on
  `origin/main`.
- **`numengames-web`: branch published** (`origin/feat/standards-v5`, four
  commits). PR pending manual opening: `gh` is not authenticated on that
  machine. PR body drafted and delivered to the Oracle.
- **Re-pinned to 5.1.0 before publishing.** For an Umbral surface the delta
  is documentary: E1 rewrote the §19.5 fragment (twelve → **thirteen**
  animations, with stroke and sky, and the 12th removed) and E2 corrected the
  prose's `frame 10px` to the 8px its own tokens already said. MIS-091 took
  its values from §19.3 and not from the prose, so the radius was already
  correct — the near-miss is recorded in MIS-102 as an argument for pinning
  tokens instead of reading prose.
- **Erratum detected in the 5.1.0 master:** the first line of its own §19.5
  fragment still says `v5.0.0`. The consumers' copies keep it verbatim and
  declare it in their header — a verbatim copy that silently corrects stops
  being a copy. An upstream *patch* is due.

### nwos-deploy · branch `feat/standards-v5` · 1 commit

- **Token layer** migrated in `src/styles/global.css`: the teal accent
  `#2DD4BF` and the house flavors (terracotta, ochre, copper, bronze, sage,
  med-blue) become canonical keeping their names as aliases. `interactivo`
  comes in.
- **The Velo's sky (§2.7.1)** stops being white: 175 stars, weights
  60/25/10/4/1, colors from the §3.6 rarity scale, and with
  `prefers-reduced-motion` it **stops** instead of disappearing.
- **The noise overlay is removed** (it painted over everything at z-index
  9999; §6 asks for flat elevated surfaces and the grain belongs to the
  paper).
- **Real SRE-03:** `src/lib/log.ts` is the only place with `console`, and it
  emits JSON per event. The nine `console.error` with string concatenation on
  the deploy path are now structured events with stable keys.
- **Type-check at zero:** 20 `any`s out (GitHub content typed, request body
  typed, deploy result typed) and the fontsource imports declared. 26 tests
  green.
- CI, Scorecard, Dependabot, SECURITY/CoC/CODEOWNERS/templates/.editorconfig/
  TODO as in the other house; `license-check.yml` keeps its own (C-005 guard
  and CLA gate) and stops duplicating the tests. `DESIGN.md` superseded.

---

## Execution Reality

- **Technology/approach used:** the same two-layer method that closed MIS-090
  — first the tokens, then a closed hex/rgb→canonical mapping verified with
  grep — but here there was a third layer MIS-090 did not have: **Tailwind's
  default palette classes**. `text-white`, `text-slate-500`, `bg-black` are
  not hexes, so they show up in no color grep, and yet they are pure drift.
  They were 103 occurrences.
- **Why it diverged (1):** the plan said «token layer and sweep». Reality
  added a ROLE correction that was not mechanical: the site used the gold as
  the action fill, and §9.1 reserves fills for Turquesa. Translating color to
  color would have produced a site with amber buttons and light text — that
  is, 1.9:1 contrast. **Accessibility broke the automatic mapping and forced
  a button-by-button review.**
- **Why it diverged (2):** putting `lint` in CI is not adding a step: it is
  discovering 74 real errors (each with its own decision) and 51 type
  errors. The lint ones were paid off. The type ones were not: **27 of the
  31 remaining are a single bug** — pages passing `class="…"` to Svelte
  components that only read `className`, so those classes never apply.
  Fixing it changes the rendered layout; deleting it discards the author's
  intent. It is a product decision, not a mechanical correction, so it is
  reported and frozen with a **ratchet**: `pnpm type-check` fails if the
  number rises, and fails equally if it drops without updating the baseline.
  The rule is not prose even while the bug remains.
- **Why it diverged (3):** on the second pass, the 31 type errors the first
  had frozen turned out to be **two product bugs**, not cosmetic debt:
  `class` never reaching `Container` (sixteen call sites) and `locale` never
  reaching nine components — that is, **the Spanish site is untranslated
  below the fold**. Neither is visible by looking at the web; both were
  found by the type-check.
- **Key learning:** a design standard is applied with a script; an
  engineering standard is applied by discovering what the repository had
  spent years not looking at. The migration's cost was not in the 298 colors
  — those were minutes — but in the 125 defects that the repo's first-ever
  `lint` and `type-check` put on the table. **Turning on the light is the
  expensive part; painting is the cheap part.** And the second pass's
  corollary: **a type error nobody fixes ends up a bug nobody sees** — the
  ratchet served to not lose them, but where they had to end up was at zero.
- **Closing date:** pending (branch open, see residue)
- **Executing agent:** claude-opus-5

### Residue and decisions for the Oracle

1. **Nothing is published.** The two `feat/standards-v5` branches are local:
   no `push`, no PR, no deploy. That is the Oracle's act.
2. **C-005 in `numengames-web`** remains unapplied (GPL-3.0 LICENSE without
   `REUSE.toml`, without `LICENSES/`, without SPDX headers, without
   `TRADEMARKS.md`). Irreversible level: untouched.
3. **The sixteen removed layout strings** (the `class` vs `className` bug)
   await a decision: re-apply them section by section with visual review, or
   declare them dead. They are listed in the repo's `TODO.md`.
6. **The Spanish site is untranslated below the fold** (nine components with
   fixed English copy). It is a content task, not a code task.
4. **nwos-deploy's `DESIGN.md`** keeps its inherited title (*pablofm.com*);
   its consolidation awaits the Oracle's conservation list, like
   numinia.org's in MIS-090.
5. **Organization settings and branch protection** (SEC-01/02/11, ARC-02) are
   not reachable from the repo.

> *"The ideal plans show the intention. The real plans show the knowledge."*

---

## Closure

*(Administrative close. The brief above is untouched — not one line of Scope
or of the criteria.)*

- **Category:** A — done in fact. The reality already satisfies the brief.
- **Evidence:** numen.games → 200 and nwos.numen.games → 200. 8/8 criteria ticked.
- **Signed by:** Oracle, 2026-08-25, as part of the board triage of the 111 missions.
  Classified read-only first; nothing was closed on impression.
- **Closed:** 2026-08-25 · **by:** ursa (administrative), on the Oracle's signature
