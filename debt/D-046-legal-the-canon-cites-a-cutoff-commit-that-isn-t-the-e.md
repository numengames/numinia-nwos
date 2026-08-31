---
id: "D-046"
uid:
title: "The canon cites a cutoff commit that isn't the effective one (legal debt, was LD-005)"
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

# D-046 — The canon cites a cutoff commit that isn't the effective one

> **Summary:** Legal debt (was LD-005; dissolved into debt/ by ADR-026).
> **Epistemic:** What C-005 compliance still owes, and its exit threshold.
> **Pragmatic:** Close when the threshold below is met; then extinguish (ADR-030).

*Was `LD-005` in `LEGAL_DEBT.md` (root); text verbatim from v1.1.0.*

**What happened.** `REUSE.toml` and LD-001 place the closing of the CC0
tap at commit `0157be9`. The commit that **actually replaces** the root
CC0-1.0 `LICENSE` is `2efd546`, six minutes later:

```
0157be9  2026-08-16 19:52:03 +0200  Apply C-005 v1.3.0 mechanically: REUSE skeleton, trademark notice
2efd546  2026-08-16 19:58:17 +0200  Close the CC0 tap forward: per-regime licensing per C-005, Oráculo-signed
```

**Measured effect.** The real CC0 window runs from `9f51ad1`
(2026-04-06 19:14:26) to `2efd546` (2026-08-16 19:58:17): **82 commits, 282
files present at closing**. Citing `0157be9` leaves out six minutes of
history in which the root `LICENSE` was still CC0.

**Severity: low.** No intermediate commit adds content — the difference is
one of documentary precision, not scope of the grant. But LD-001 bounds
the temporal scope of an irrevocable waiver, and that bounding must cite
the effective commit.

**Exit threshold.** Closes when the cutoff reference in `REUSE.toml` and in
LD-001 cites `2efd546`, or when it is documented why `0157be9` is the
correct reference despite the evidence. The correction touches canon and
`REUSE.toml`: it is the Oracle's decision, not agent hygiene.
