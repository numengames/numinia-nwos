---
id: "MIS-093"
uid: ""
title: "The icons speak Phosphor and the typography falls in line with the system"
status: done
priority: "medium"
effort: "S"
guild: "Alchemists"
territory: "TBA"
type_execution: "digital"
assigned_to: "numinia-nwos"
started: "2026-08-18"
completed: "2026-08-18"

type: mission
version: "1.0.0"
created: "2026-08-18T13:20:30Z"
created_source: "git:9091f7f"
created_confidence: inferred
updated: "2026-08-27T22:05:37Z"
author: "claude-fable-5"
owner: "oracle"
requested_by: "oracle"
tags: [web, viewer, design-system, icons, typography]
license: "CC0-1.0"

depends_on: ["MIS-092"]
---
# MIS-093 — The icons speak Phosphor and the typography falls in line

> **Summary:** numinia.org replaces its loose SVGs with the house's
> Phosphor subset (§7.3, self-hosted, currentColor) and adopts the
> canonical typographic fallbacks and focus ring. Includes a subset
> expansion proposal (4 glyphs) for the Oracle's signature.
> **Epistemic:** Which iconographic vocabulary the viewer actually uses.
> **Pragmatic:** A single icon origin, one component, zero hand-drawn
> glyphs.
> **Audience:** Oracle · numinia-nwos agent

---

**Area:** Viewer / numinia.org · **Guild:** Alchemists · **Type:** digital
**Priority:** medium · **Effort:** S

---

## Story

As an Oracle, I want every icon and every type stack in the viewer to come
from the Design System v5.0.0, so that no interface piece speaks its own
dialect.

## Subset expansion proposal (§7.3 — awaiting signature)

The canonical subset (26 glyphs) does not cover four concepts the viewer
needs; they enter as §7.3 proposes — with their concept declared:

| Glyph | Declared concept | Where |
|---|---|---|
| `copy` | copy the canonical .md to the clipboard | DocToolbar |
| `file-pdf` | download the PDF artifact (MIS-088) | DocToolbar |
| `list` | mobile navigation menu | Navigation |
| `x` | close / clear search (≠ `x-logo`, which is the social network) | missions search |

If the Oracle rejects them, each use falls back to the subset glyph he
designates.

**Update (2026-08-18, same day):** the Oracle authorized expanding the
subset freely from phosphoricons.com to eradicate the viewer's emojis
(«busca lo que necesites para usarlos en los tableros o donde consideres»).
The 4-glyph proposal is subsumed: the viewer's current vocabulary is the
content of `web/src/icons/` (Phosphor regular, MIT, self-hosted), each
glyph entering through a concrete use — §7.3's discipline (expanding is a
decision, not an oversight) is met by this order and by the component's
guard (broken build if the name does not exist).

## Execution log

- 2026-08-18 — 30 self-hosted SVGs in `web/src/icons/` (the 26 canonicals
  copied from `numinia-web:packages/ui/src/icons/` + the 4 proposed,
  downloaded from `phosphor-icons/core`, MIT; annotated in REUSE).
- 2026-08-18 — `Icon.astro` component (inline, currentColor, size by prop;
  build error if the name is not in the subset — expanding is a decision,
  not an oversight).
- 2026-08-18 — 17 uses migrated: return arrow → `caret-left` (12 pages),
  menu chevron → `caret-down`, hamburger → `list`, search →
  `magnifying-glass` + `x`, DocToolbar → `copy` + `download-simple` +
  `file-pdf`. The diagram SVGs (archive, wardley) are not icons and are
  not touched.
- 2026-08-18 — Typography: stacks with the canonical §4.1 fallbacks
  (Inter/Aptos/Segoe UI/Arial · Consolas/Courier New); the kit's focus
  ring (`2px #018EA1, offset 2`). The full §4.3 scale waits for the
  convergence with the `sistema.*` kit when it is regenerated.

## Execution Reality

- **Technology/approach used:** self-hosted subset + Astro component with
  a raw glob — the same pattern as numinia-web, no npm dependency.
- **Why it diverged:** it did not; the only decision was not to invent
  icons: the 4 concepts without a canonical glyph enter as a formal
  proposal instead of sneaking in.
- **Key learning:** a site's real iconographic vocabulary fits in a table —
  auditing it first avoids importing entire catalogs.
- **Closing date:** 2026-08-18
- **Executing agent:** claude-fable-5 (numinia-nwos)

**Addendum (2026-08-18, evening) — the emoji sweep.** Oracle order executed
in three parallel batches: ~140 emojis replaced across 15 pages (missions
board and detail, home, agente, archive, wardley, ventas, continuidad,
simulaciones, idioma, reportes, openclaw-test) with subset glyphs,
canonical status dots or plain text; inside the diagram SVGs, plain text
(components do not go inside svg). Glyphs added in this pass: check, robot,
lightning, git-branch, clipboard-text, desktop, push-pin, game-controller,
mask-happy, brain, prohibit, scroll, books, map-pin, calendar-blank,
file-text, coins, bank, palette, confetti, crane-tower, circle, warning,
eye, lock-key, arrows-clockwise, chart-line, target, flask, dna, sparkle,
buildings, note-pencil, ruler, shield-check, crosshair, snowflake,
hourglass, upload-simple. Emojis remain only on the 5 diario-*.astro pages,
sentenced to removal by MIS-089-D4 — what is going to die is not migrated.
Also: a performance pass (the Velo's fog+grid fused into a single fixed
layer).

**Addendum 2 (2026-08-18) — the performance regression and its fix.** The
Oracle reported the web slower; measured: the board weighed **293 KB, of
which 141 KB were duplicated SVG paths** (280 inline icons, the same glyph
repeated on every card). Fixed with an **external sprite** (`/icons.svg`, a
static endpoint defining each glyph once as a `<symbol>`; `Icon.astro`
emits `<use href="/icons.svg#i-name">`): board **293 → 181 KB** (−38%), a
35 KB sprite cached `immutable` for the whole site, and `currentColor`
still inherits (verified in Chromium on the built site). Also: the Velo's
fixed layers and the noise move to their own composited layer
(`translateZ(0)` + `contain: strict`) and the sky drops to **30 fps** and
stops when the tab is hidden. Lesson: inline per instance is comfortable
until there are 280 instances — the sprite is the right pattern for a
69-glyph subset.
