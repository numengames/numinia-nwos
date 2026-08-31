---
id: "DBT-012"
uid:
title: "C-005 legal compliance ledger: five unmet obligations"
type: documentation
status: active
version: "2.0.0"
created: "2026-08-16T17:58:17Z"
created_source: "git:e1a7ac8"
updated: "2026-08-31T23:20:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, legal, c-005]
license: "CC-BY-4.0"
visibility: "public"
related: ["ADR-026 (formerly ADR-031)", "C-005"]
absorbs: ["D-042", "D-043", "D-044", "D-045", "D-046"]
---

# DBT-012 — C-005 legal compliance ledger: five unmet obligations

> **Summary:** Legal debt (was LD-001; dissolved into debt/ by ADR-026).
> **Epistemic:** What C-005 compliance still owes, and its exit threshold.
> **Pragmatic:** Close when the threshold below is met; then extinguish (ADR-030).

*Was `LD-001` in `LEGAL_DEBT.md` (root); text verbatim from v1.1.0.*

**What happened.** The repository was published with a root `LICENSE`
CC0-1.0 inherited from the catalogue's regime (see DEC-002, build in
public CC0), with no partition by regime. CC0 over the lore was not a
deliberate act: it was carried over. While the repo was public under that
LICENSE, all its content was offered under CC0 — including what C-005 §2
classifies as reserved.

**What was published under CC0.** The entire history up to and including
commit `0157be9`. In particular, from what is today the reserved regime:
`canon/` (Numinia's TTRPG manual, Welcome to Numinia, Brand and Culture,
Compendium of Attributes and Ranks, Rank Specifications, Role structure,
Platform Role System, About Session Zero, epistemic and pragmatic papers),
`guilds/` (alchemists, sentinels, exegetes, procurators), and `agents/`
(personas of adonaz, nimrod, procurador-01, senet, and the template). Also
the documentation and missions, today CC-BY-4.0.

**Resolution (signed by Oracle, 2026-08-16).** What was published stays
CC0 and no attempt is made to revoke it — C-005 §4: the waiver is
irrevocable. The tap is closed going forward: the root `LICENSE` stops
being CC0, `REUSE.toml` declares paths by regime, and reserved content is
expressed with `LicenseRef-Numen-AllRightsReserved`. Versions after the
cutoff are no longer offered under CC0.

**Exit threshold.** None exists: the waiver over what was published is
irrevocable by construction. The entry remains to bound the temporal scope
of the grant (up to `0157be9`) and as input for the visibility-change gate
(§4) of future repositories: the check of sensitive directories against a
real listing exists because this incident happened.

**Operational consequence.** Any third party can use, fork, or
redistribute the content of those versions under CC0, lore included. The
brand: no — CC0 never granted Numinia, Numen Games, or Khepri (§7,
`TRADEMARKS.md`).

---

---

## Absorbed: `D-043` — NOTICE missing with Apache-2.0 in the tree (legal debt, was LD-002)

> Merged into `DBT-012` on 2026-08-31 under `ADR-030`. The identifier `D-043`
> keeps resolving to this document via `absorbs:`; its evidence is preserved
> verbatim below, only its heading levels are demoted.

> **Summary:** Legal debt (was LD-002; dissolved into debt/ by ADR-026).
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

---

## Absorbed: `D-044` — LGPL-3.0-or-later present in the dependency tree (legal debt, was LD-003)

> Merged into `DBT-012` on 2026-08-31 under `ADR-030`. The identifier `D-044`
> keeps resolving to this document via `absorbs:`; its evidence is preserved
> verbatim below, only its heading levels are demoted.

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

---

## Absorbed: `D-045` — The verification instrument is not pinned (legal debt, was LD-004)

> Merged into `DBT-012` on 2026-08-31 under `ADR-030`. The identifier `D-045`
> keeps resolving to this document via `absorbs:`; its evidence is preserved
> verbatim below, only its heading levels are demoted.

> **Summary:** Legal debt (was LD-004; dissolved into debt/ by ADR-026).
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

---

## Absorbed: `D-046` — The canon cites a cutoff commit that isn't the effective one (legal debt, was LD-005)

> Merged into `DBT-012` on 2026-08-31 under `ADR-030`. The identifier `D-046`
> keeps resolving to this document via `absorbs:`; its evidence is preserved
> verbatim below, only its heading levels are demoted.

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

---

## Renumbering note, 2026-08-31

This document was `D-042`, and absorbs `D-043`, `D-044`, `D-045`, `D-046`. The `D-` series
was closed and renumbered densely to `DBT-NNN` under `ADR-004` rule 4 and
`ADR-005` v1.1.0 — see `RPT-001` §12. No `D-` number is reused.
