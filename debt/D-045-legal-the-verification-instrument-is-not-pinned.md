---
id: "D-045"
uid:
title: "The verification instrument is not pinned (legal debt, was LD-004)"
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

# D-045 — The verification instrument is not pinned

> **Summary:** Legal debt (was LD-004; dissolved into debt/ by ADR-031).
> **Epistemic:** What C-005 compliance still owes, and its exit threshold.
> **Pragmatic:** Close when the threshold below is met; then extinguish (ADR-030).

*Was `LD-004` in `LEGAL_DEBT.md` (root); text verbatim from v1.1.0.*

**What happened.** The AUD-2026-08-26 audit was carried out with
`reuse 6.2.0`, installed *ad hoc* in the agent's environment. The
repository does not pin that version anywhere: not in `package.json`, not
in CI, not in a requirements file.

**Why it matters.** The report's figures — 510 files, 2 invalid
expressions, `OFL-1.1` going from 0 to 7 occurrences — are only comparable
across iterations if the instrument is the same. A different version may
resolve annotation precedence or expression parsing differently, and then
a change in figures cannot distinguish between "the repository changed"
and "the tool changed."

**Exit threshold.** Closes when `reuse` is pinned to a concrete version
runnable by CI, so the SBOM is reproducible by a third party without
depending on the auditor's local environment.

**Scope.** Affects the comparability of future audits, not the validity of
today's: the literal SBOM is archived at
`reports/audits/AUD-2026-08-26-licensing-c005/sbom.spdx` with the declared
version.

---
