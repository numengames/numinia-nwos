---
id: "D-041"
uid:
title: "The RPG manual stops living in canon/ (was 404-002)"
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
related: ["ADR-031", "C-005"]
---

# D-041 — The RPG manual stops living in canon/

> **Summary:** Broken cross-repo consumers (was 404-002 in DEUDA-404.md; moved by ADR-031).
> **Epistemic:** What broke when the source was retired, and where repair happens.
> **Pragmatic:** Close when every consumer listed resolves; then extinguish (ADR-030).

*Was `404-002` in `DEUDA-404.md` (root); text verbatim from v1.1.0.*

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
