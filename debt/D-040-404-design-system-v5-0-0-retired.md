---
id: "D-040"
uid:
title: "Design System v5.0.0 retired (was 404-001)"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-24T12:05:35Z"
created_source: "git:f0f3d16"
updated: "2026-08-30T19:40:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, 404, cross-repo]
license: "CC-BY-4.0"
related: ["ADR-026 (formerly ADR-031)", "C-005"]
---

# D-040 — Design System v5.0.0 retired

> **Summary:** Broken cross-repo consumers (was 404-001 in DEUDA-404.md; moved by ADR-026).
> **Epistemic:** What broke when the source was retired, and where repair happens.
> **Pragmatic:** Close when every consumer listed resolves; then extinguish (ADR-030).

*Was `404-001` in `DEUDA-404.md` (root); text verbatim from v1.1.0.*

**Decision:** the Design System has one single current version, **v5.1.0**.
v5.0.0 is retired from the repository.

**Retired:** `standards/2026_08_18-Sistema_de_Diseno-v5.0.0.md`
**Current:** `standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md` (declares `supersedes:`)
**Date:** 2026-08-24 · **Commit:** see PR "chore: retire Design System v5.0.0"

### What breaks

| # | Consumer | What happens | Severity |
|---|---|---|---|
| 1 | `numinia.org/corpus/standards/2026_08_18-sistema_de_diseno-v500.md` | **HTTP 404.** The route is generated from the repo (`web/src/pages/corpus/[...slug].astro`). Today it returns 200. | high |
| 2 | `numinia-web/design-source.json` | Dangling pin: `path`, `published`, and `sha256` (`a075e215…`) point to the retired file. | **critical** |
| 3 | `numinia-web/scripts/check-design-source.mjs` | Fails with *"Could not read the published master: HTTP 404"* → exit 1. Invoked via `npm run design:check`. | high |
| 4 | `numinia-web/apps/store/src/lib/__tests__/design-system-bridge.test.ts` | Reads `design-source.json`; the pin is incoherent even though the test doesn't download it. | medium |
| 5 | 6 nwos missions (MIS-078, 085, 091, 092, 093 and others) | Cite "v5.0.0" **in text**, not by link: they don't error, they remain as historical references to a non-existent document. | low |

> **CI notice:** `numinia-nwos`'s CI **detects none of these breakages** —
> they are cross-repo. A green PR here does not mean numinia.org and
> numinia-web are still sound. Manual verification is mandatory.

### Verification state (2026-08-24, before deletion)

The three digests matched — the pin was **sound** until this decision:

```
local nwos file ................... a075e2154aa648d44484d7df2bf8d573da044f7154c96464a1c1bd58680c107a
numinia-web/design-source.json pin  a075e2154aa648d44484d7df2bf8d573da044f7154c96464a1c1bd58680c107a
published on numinia.org (HTTP 200) a075e2154aa648d44484d7df2bf8d573da044f7154c96464a1c1bd58680c107a
```

v5.1.0 is already published and returns **HTTP 200** at
`numinia.org/corpus/standards/2026_08_18-sistema_de_diseno-v510.md`.

### Pending repair — exact order

1. **`numinia-web`** — update `design-source.json`:
   - `path` → `standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md`
   - `published` → `…/2026_08_18-sistema_de_diseno-v510.md`
   - `version` → `5.1.0`
   - `sha256` → recalculate against the published file
2. **`numinia-web`** — review the vendored kit (`packages/ui/src/sistema.css`,
   `apps/store/src/scripts/sistema.js`): v5.1.0 may have moved tokens.
   Their sha256 in the `vendored` block get re-pinned too.
3. **Verify:** `npm run design:check` → must output *"✓ In sync"*.
4. **`numinia-nwos`** — the 6 missions citing "v5.0.0" in text: decide
   whether to annotate as historical or update. Not blocking.
5. **Mark this entry RESOLVED** with date and commit.

**Owner:** Oracle · **Status:** ⬜ OPEN

---
