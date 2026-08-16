# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This is the Numinia NWOS workspace: canon, lore, guilds, missions, protocols and operations live in the root directories (`canon/`, `missions/`, `guilds/`, `protocols/`, `operations/`, …). The public viewer for that canon is an Astro app in `web/`, extracted from `numinia-nwos-viewer`.

## Commands (run inside `web/`)

- `npm run dev` — dev server at http://localhost:4321
- `npm run build` — production build to `web/dist/`

No tests, lint, or CI. Node ≥ 22.12 required.

## Stack & architecture (`web/`)

Astro 5, `output: "static"` with the Vercel adapter. React 19 islands only where a `client:` directive is used. Tailwind 3 with tokens as CSS vars in `web/src/styles/global.css`, shadcn/ui in `web/src/components/ui/`. Path alias `@/*` → `web/src/*`. Dark-only design system documented in `web/DESIGN.md` (its layout/spacing rules apply; accent is teal `#2DD4BF`, fonts are Geist/Geist Mono).

- **Routes**: `web/src/pages/`, mostly static `.astro` pages in Spanish (`misiones`, `decisiones`, `planos`, `reportes`, `archive`, etc.). Dynamic routes (`[id].astro`) map over hardcoded TS modules in `web/src/data/` with `getStaticPaths()`; `archive/[fondo].astro` keeps its data inline in the page.
- **`web/src/data/missions.ts` runs at build time with top-level await**: loads mission markdown from `numengames/numinia-digital-agents` — first from a sibling checkout, then the unauthenticated GitHub API. The folder (`missions/queue|active|review|done|freeze`) determines status. Separate from and not synced with `misiones.ts` (hardcoded Spanish data feeding `/misiones`). The viewer reads canon via the GitHub API even though canon is now local to this repo — migrating that is a separate mission.

## Environment variables

None. The viewer needs no secrets to build or run.
