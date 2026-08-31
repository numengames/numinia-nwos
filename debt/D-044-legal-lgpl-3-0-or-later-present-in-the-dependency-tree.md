---
id: "D-044"
uid:
title: "LGPL-3.0-or-later present in the dependency tree (legal debt, was LD-003)"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-26T09:58:52Z"
created_source: "git:e4918fa"
updated: "2026-08-30T19:40:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, legal, c-005]
license: "CC-BY-4.0"
related: ["ADR-026 (formerly ADR-031)", "C-005"]
---

# D-044 — LGPL-3.0-or-later present in the dependency tree

> **Summary:** Legal debt (was LD-003; dissolved into debt/ by ADR-026).
> **Epistemic:** What C-005 compliance still owes, and its exit threshold.
> **Pragmatic:** Close when the threshold below is met; then extinguish (ADR-030).

*Was `LD-003` in `LEGAL_DEBT.md` (root); text verbatim from v1.1.0.*

**What happened.** `@img/sharp-libvips-linux-x64` declares
`LGPL-3.0-or-later`. C-005 §3 places `LGPL-3.0` at the "with isolation"
level, not "freely."

**Why it doesn't block.** `sharp` is an **optional** dependency of
`astro`, used at build time for image processing; `output: "static"`.
Test against the artefact's content (§3, "never comment strings"):

```
dist/ .js files containing "libvips" or "sharp": 0 of 3
dist/ .js files containing "GPL" or "LGPL":      0 of 3
native binaries in dist/:                        0
```

**Present is not distributed** (§3). The LGPL component does not reach the
served artefact.

**Exit threshold.** The exception lapses if `dist/` starts containing a
native binary or any module linking `libvips` — that is, if the project
adopts `output: "server"`, an SSR adapter, or runtime image processing.
Condition, not date.

**Guard.** None exists. §3 requires it and it must inspect the bundle's
**content** (metafile or module paths). Until it exists, this threshold is
a wish, not an exit — exactly what §5 warns against.

**Side note.** `zod-to-ts` appears with no `license` field in `astro`'s
declaration, but **is not installed** in the tree. A hygiene signal (§3),
with no effect: nothing depends on terms nobody has read, because nothing
depends on the package.

---
