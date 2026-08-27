---
id: "DEUDA-404"
title: "DEUDA-404.md — Consumers broken by source retirements"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-24T10:00:00Z"
updated: "2026-08-24T10:00:00Z"
author: "claude-opus"
owner: "oracle"
license: "CC-BY-4.0"
---

# DEUDA-404 — consumers broken by source retirements

Register of **known and accepted** breakages caused by coherence decisions in
the archive. The Oracle's rule (2026-08-24):

> *"From here we delete the source. The `.md` files must be coherent. It
> doesn't matter if we break something along the way — we own it and
> document the 404s for when we get to whatever is consuming them."*

This file is the "after" of that sentence: what broke, who consumes it, and
what needs to happen to repair it. **An entry is not deleted once fixed: it
is marked RESOLVED**, so the trace remains.

---

## 404-001 · Design System v5.0.0 retired

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

## 404-002 · The RPG manual stops living in `canon/`

**Decision (Oracle, 2026-08-25).** The two files disputing being "the
manual" are retired and **not replaced by a copy**: `canon/INDEX.md` points
to `numinia-lore`, which owns it.

Literal quote from the correction that set the design:

> *"We just deleted a 131-line stub for posing as canon. Creating a new
> file in canon/, with a manual name and a C-00N, manufactures the same
> object with better intentions. A pointer is not a foundational document."*

### What was retired

| File | Size | What it was |
|---|---|---|
| `canon/Numinia-El-juego-de-rol-manual-completo.md` | 131 lines | **Stub.** Never contained the manual |
| `canon/Numinia. El juego de rol (manual completo).txt` | 4,667 lines | Real manual, v0.1.0 (S-008) |

**Source of truth now:** `numengames/numinia-lore` →
`seminal/Numinia_Manual_del_juego_de_rol_v0_6_0.md` (v0.6.0, 21,459 lines).

### Verification state prior to deletion

- Retired `.txt`: `sha256 2f9e58dea73a4629c9c370dc8ab46c440a133fd4e12e267421c548b6a591a0ea`
  — **byte-identical** to `numinia-lore/seminal-legacy/…txt`. Nothing is lost.
- **Is the v0.6.0 `.txt` the same document as lore's `.md`?** Yes:
  **98.82%** of the word sequence matches (`difflib` over continuous
  stream, 128,504 of 130,041 words). The 1,469 tokens only lore has are
  **footnotes and figure references from the PDF** that the plain-text
  export discards. **Lore's copy is the richer one.**
- `numinia-lore` is **public** (`visibility: public`, verified without
  credentials) and `seminal/**` declares `LicenseRef-Numen-AllRightsReserved`
  in its `REUSE.toml` — express reservation, decision signed by the Oracle
  2026-08-17 (MIS-085 D1). The pointer resolves for anyone and the regime
  is preserved.

### Why a pointer and not a copy — with the figures that decided it

An earlier version of this change (discarded without pushing, `72bff4c`)
put the converted manual in `canon/`. The build published it and measured
the damage:

| Generated page | Weight |
|---|---:|
| `/corpus/canon/c-006-manual-juego-de-rol/` | **890.4 KB** |
| `/corpus/standards/…sistema_de_diseno-v510/` (largest until then) | 336.4 KB |

`web/src/content.config.ts` globs `canon/**/*.md` without a negation:
besides the page, Astro was publishing the **raw 848 KB `.md`** —
reserved-rights content served in the open. And it was a **new
regression**, not inherited: the `.txt` was never published (the glob is
`*.md`) and the stub weighed 131 lines.

### Consumers repaired on this branch

| Document | State |
|---|---|
| `agents/senet/MEMORY.md:63` | ✅ **direct to lore** (own commit, the first) |
| `agents/senet/STATUS.md:43` | ✅ **direct to lore** (same) |
| `canon/INDEX.md:57` | ✅ S-008 row redirected to the new section |
| `canon/README.md:20` | ✅ repointed |
| `blueprints/BP-archive-fondos.md:31` | ✅ repointed + corrected description |
| `decisions/ADR-005:154` | ✅ marked resolved |
| `missions/MIS-089:68` | ✅ D1 corrected with the evidence |

Senet goes **direct**, not through the index: an agent's mandatory-reading
table resolves in one hop or it isn't operational reading.

### Breakages outside write scope — OPEN

| Repo | File | Severity |
|---|---|---|
| `numinia-web` | `DECISIONS.md:111` | 🟠 medium |
| `numinia-web` | `docs/onboarding-report.md:23` | 🟠 medium |
| `numinia-lore` | `seminal-legacy/README.md:20` | 🟢 low |

### Pending repair — exact order

1. **`numinia-web`** — repoint `DECISIONS.md:111` and
   `docs/onboarding-report.md:23` to
   `numinia-lore/seminal/Numinia_Manual_del_juego_de_rol_v0_6_0.md`.
2. **`numinia-lore`** — decide what happens with the three copies living
   there: `seminal/…v0_6_0.md` (live), `seminal/Numinia__El_juego_de_rol__manual_completo_.md`,
   and `seminal-legacy/….txt` (both v0.1.0). None declares `derived_from`.
3. **Mark this entry RESOLVED** with date and commit.

**Owner:** Oracle · **Status:** ⬜ OPEN

---

## How this register is used

- A source retirement is **not complete** until its entry here is
  RESOLVED. Deleting the file is half the work.
- If an entry has stayed open across more than one iteration, it is real
  debt: it rises to Phase 2 of the unification plan (*ambiguity with a
  consequence outside the repo*).
- The entropy index **does not see these breakages**: E4 only measures
  markdown links inside the corpus, and all of this is cross-repo
  references by path, URL, or digest. This file is the manual complement
  to that blindness.
