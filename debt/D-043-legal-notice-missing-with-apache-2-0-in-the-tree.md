---
id: "D-043"
uid:
title: "NOTICE missing with Apache-2.0 in the tree (legal debt, was LD-002)"
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
related: ["ADR-031", "C-005"]
---

# D-043 — NOTICE missing with Apache-2.0 in the tree

> **Summary:** Legal debt (was LD-002; dissolved into debt/ by ADR-031).
> **Epistemic:** What C-005 compliance still owes, and its exit threshold.
> **Pragmatic:** Close when the threshold below is met; then extinguish (ADR-030).

*Was `LD-002` in `LEGAL_DEBT.md` (root); text verbatim from v1.1.0.*

**What happened.** C-005 §5 requires a `NOTICE` in every public repository
"if it distributes any Apache-2.0 dependency." The tree contains **11
Apache-2.0 packages**, two of them direct (`class-variance-authority`,
`playwright-core`). `NOTICE` does not exist.

**Measured state** (AUD-2026-08-26 §C3, evidence in
`reports/audits/AUD-2026-08-26-licensing-c005/`). The test was run against
`dist/`'s **content**, as §3 mandates, not against tree names:

```
dist/: 737 html · 290 md · 35 png · 18 woff2 · 4 txt · 3 js · 3 css · 2 xml · 2 svg · 2 json
native binaries (.node/.so/.wasm): 0
.js files mentioning Apache-2.0 or its notice: 0 of 3
```

`playwright-core` is a build tool (`build:pdf`);
`class-variance-authority` is MIT-compatible in its usage and emits no
notice to the bundle. **Present, not distributed** (§3).

**Exit threshold.** `NOTICE` becomes mandatory the moment an artefact
served from `web/dist/` incorporates Apache-2.0 code — a condition
verifiable by inspecting the bundle's content, not the dependency tree.
Today the condition is not met.

**Guard.** None exists. §3 requires CI to evaluate the threshold on every
build; today nobody measures it. Recorded as part of D-001 (absent CI
guards).

---
