# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This is the Numinia NWOS workspace: canon, lore, guilds, missions, protocols and operations live in the root directories (`canon/`, `missions/`, `guilds/`, `protocols/`, `operations/`, …). The public viewer for that canon is an Astro app in `web/`, extracted from `numinia-nwos-viewer`.

## Commands (run inside `web/`)

- `npm run dev` — dev server at http://localhost:4321
- `npm run build` — production build to `web/dist/`

No tests, lint, or CI. Node ≥ 22.12 required.

## Stack & architecture (`web/`)

Astro 5, `output: "static"`, no adapter — fully static, deployed to Cloudflare Workers as static assets (`web/wrangler.toml`, worker `numinia-nwos`, domain `numinia.org`). React 19 islands only where a `client:` directive is used. Tailwind 3 with tokens as CSS vars in `web/src/styles/global.css`, shadcn/ui in `web/src/components/ui/`. Path alias `@/*` → `web/src/*`. Dark-only design system documented in `web/DESIGN.md` (its layout/spacing rules apply; accent is teal `#2DD4BF`, fonts are Geist/Geist Mono).

- **Routes**: `web/src/pages/`, mostly static `.astro` pages in Spanish (`misiones`, `decisiones`, `planos`, `reportes`, `archive`, etc.). Dynamic routes (`[id].astro`) map over hardcoded TS modules in `web/src/data/` with `getStaticPaths()`; `archive/[fondo].astro` keeps its data inline in the page.
- **Mission data**: `/missions` detail routes are generated at build from this repo's own `missions-index.json` (GitHub API against `numengames/numinia-nwos` as fallback outside the checkout). The board and detail content hydrate client-side in the visitor's browser against the GitHub API. `web/src/data/missions.ts` is currently imported by nothing — it loads mission markdown filesystem-first from this repo's `missions/`, API fallback; the folder (`missions/queue|active|review|done|freeze`) determines status. Separate from and not synced with `misiones.ts` (hardcoded Spanish data feeding `/misiones`). Baking the client-side data in at build is a pending design decision.

## Environment variables

None. The viewer needs no secrets to build or run.

## Licensing — from Numinia canon C-005 (source of truth; do not edit here)

**Emit:** `packages/*` — library/SDK/types/tokens/script/CI/infra → `MIT` ·
`apps/*` — deployable app that *decides* (identity, progression, billing) →
`AGPL-3.0-only` · code on a third-party strong-copyleft engine, **separate repo** →
the engine's · assets/data/metadata/design tokens → `CC0-1.0` · docs/ADRs/specs →
`CC-BY-4.0` · lore/brand/unpublished → none, all rights reserved.

A monorepo may mix these: declare per directory in `REUSE.toml`. Dependencies MUST
flow apps → packages, never the reverse. **One file, one regime:** never write an
`AND` expression mixing an open license with reserved — that is an unsatisfiable
permission. Split the content out into its own file instead.

**Generators:** a generator never propagates its own license to what it generates. The
template is ours (usually MIT); the generated work belongs to whoever commissioned it,
and the template MUST emit a reserved-rights `LICENSE` in the client's name — never its
own, never none. Reserved means a `LICENSE` that says so; silence does not declare.

Every code file starts with:
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT   (or the applicable ID)

**Consume:** MIT · ISC · BSD · Apache-2.0 · 0BSD · CC0-1.0 · CC-BY-4.0 freely.
MPL-2.0 · EPL-2.0 · LGPL-3.0 with isolation. **Third-party** GPL/AGPL only in a
separate repo with a signed decision. NEVER: BUSL, SSPL, Elastic, Commons Clause,
proprietary, CC-NC, CC-ND. Resolve every dependency's SPDX from the registry BEFORE
adding it — never from memory.

**Present is not distributed.** A forbidden transitive dependency that tree-shaking
keeps out of the artifact does NOT block work, but MUST be logged in `LEGAL_DEBT.md`
with an **exit threshold** (a condition, not a date, evaluated by CI on every build)
and guarded by a check that inspects the artifact's **contents** — bundler metafile or
module paths, never comment strings, which minifiers strip. Hard limit: **if that
licence imposes additional restrictions and the artifact is AGPL, no exception is
possible** — the result is unsatisfiable, not merely undesirable. A missing `license`
field is a hygiene signal, not a breach on its own: it blocks while the terms are
unknown and clears once you read the package's LICENSE and document them.

**Floor rule:** the strongest copyleft in the distributed tree sets the minimum
outbound license — one GPL import excludes MIT output. devDependencies and build tools
don't count; whatever ships in the client bundle does.

**Contributions:** any repo containing AGPL code requires a CLA (per repo, not per
path); MIT-only repos and docs use DCO (`git commit -s`); asset PRs need an explicit
CC0 declaration.

**Header exception:** never edit pinned third-party kits, vendored code, generated
artifacts or metadata-less binaries to insert an SPDX header — declare them in
`REUSE.toml` or an adjacent `.license` file.

**Repo skeleton on creation:** `LICENSE` · `LICENSES/` · `REUSE.toml` ·
`TRADEMARKS.md` · `NOTICE` if Apache-2.0 ships · `license` field in every
package.json. CI runs `license-check`: error on `.com`, warning on `.store`.

**Stop and ask — never proceed alone:**
- **Turning any repository public** — that IS the grant, before any `npm publish`.
  Gated and signed off, like Arweave. Verify the sensitive directories against a real
  listing, never a hand-written list.
- Publishing anything CC0 to Arweave (irreversible; gated; requires sign-off)
- Ownership of a piece is unclear or undocumented
- Files containing people, voices, or personal data — CC0 waives our rights, never
  someone else's
- Any license outside the lists above

**CI severity defaults to error.** Warning is the listed exception, for surfaces that
neither deploy to production nor publish. Severity follows exposure, not directory or
domain names; if exposure can't be determined, error.

Full canon: `C-005 · Canon de Licencias`. This block is authoritative for day-to-day
work; when it is silent, ask rather than infer.
