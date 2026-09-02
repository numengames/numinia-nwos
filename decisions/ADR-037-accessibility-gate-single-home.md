---
id: "ADR-037"
uid: ""
title: "Accessibility gate has one normative home: ARC-10 in STD-005, not repeated in three places"
type: adr
status: active
version: "1.0.0"
created: "2026-09-02T12:50:00+02:00"
created_source: "git:e4b94e7"
created_confidence: exact
updated: "2026-09-02T12:50:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [accessibility, a11y, wcag, standards, std-005, arc-10, dispersion]
license: "CC-BY-4.0"
related: ["STD-001", "STD-005", "MIS-139", "MIS-127", "MIS-125", "DBT-013"]
superseded_by: null
---

# ADR-037 · Accessibility gate has one normative home

> **Summary:** WCAG AA conformance for code artifacts is now `ARC-10` in
> `STD-005`, the single point a reader or a guard consults for "what does
> this repo require, and what actually checks it." Design-subject
> accessibility (contrast tokens, focus-ring color, tap targets) stays in
> the Design System §12 — different subject, correctly separate.

## Context

The Oracle asked, following `numinia.org`'s SpeechPlayer investigation
(keyboard focus order question): *where is this documented, in what class
of document, and why does it feel scattered?*

Verified against the repo, three places asserted the same code-level rule
without citing each other:

1. `numinia-web/CLAUDE.md` — prose in the "Code standards" list: *"semantic
   HTML, WCAG AA"*. No `ARC-NN` identifier, no cross-reference.
2. `standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md` §1.2 — *"Equable →
   accessibility is equity, not compliance; AA is the floor"* — a design
   *value*, correctly scoped to that document's own subject (§12 has the
   full spec: contrast ratios, focus visibility, 44×44 touch targets).
3. `numinia-web/apps/store/e2e/a11y.spec.ts` — the actual CI gate (axe-core,
   WCAG 2.0/2.1 A+AA, 28 platform routes + a dedicated keyboard tab-order
   test on the home nav). Its own header comment cites *"the constitution's
   'Semantic HTML. WCAG AA'"* without naming which document or which rule
   ID — `git log -S` found no verbatim match for that exact phrase in either
   repo's current `CLAUDE.md`; the wording drifted since the gate was
   introduced (commit `00ddefd`, 2026-08-15).

None of the three pointed at the other two. A reader auditing "what is our
accessibility requirement" had no single place to land, and the CI gate —
the only one of the three a machine actually enforces — was the least
discoverable of them.

**What this ADR does NOT resolve, on the Oracle's explicit instruction:**
the Design System's dated-filename shape
(`2026_08_18-Sistema_de_Diseno-v5.1.0.md`) is itself judged wrong — a
`standards/` document that changes in substance (v5.0.0 → v5.1.0 already
happened) should not carry a frozen-artifact name. `PRO-010 §3.2.2`
(`MIS-125` ruling, 2026-08-31) currently forbids exactly this rename, on
grounds of 71 incoming citations and a published URL derived from the
filename. The Oracle's position: *the ruling helped real coherence, but a
citation count does not make a wrong name right* — treat this as an
exception to the normalisation process, not a reversal of `MIS-125`'s
general rule, and revisit in a dedicated pass. Filed as `DBT-013` so it is
not lost. **Not executed here.**

## Decision

1. **`ARC-10` is added to `STD-005 §2.2`** as the single practice ID for
   code-artifact accessibility: WCAG 2.2 AA on every public route, tab
   order matching visual order, visible focus ring. Check tag names the
   real gate (`numinia-web/apps/store/e2e/a11y.spec.ts`) and states its
   real, incomplete coverage rather than implying more than CI proves.
2. **The Design System keeps §12 and §1.2 as-is.** Its subject is design
   (tokens, contrast values, principle) — not code compliance. This is not
   the dispersion; it is two documents correctly discussing the same value
   from different subjects, per `STD-001 §3`'s `type`-vs-folder test.
3. **`a11y.spec.ts`'s header comment is corrected** to cite `ARC-10`
   explicitly instead of an unnamed, unverifiable "constitution" quote.
4. **`numinia-web/CLAUDE.md`'s code-standards line is corrected** to
   reference `ARC-10` instead of repeating the prose independently.
5. **The Design System rename question is deferred and registered as
   `DBT-013`**, not decided here.

## Consequences

- One ID (`ARC-10`) is now the citable anchor for "does this repo require
  WCAG AA, and what checks it." Both code-facing documents point at it
  instead of re-stating it.
- The CI gate's real, partial scope (`numinia-web` platform chrome, not
  `numinia-nwos`'s `/corpus/**` document routes) is now written where the
  rule lives, not buried in a code comment — closing the gap the Oracle's
  question surfaced two turns ago.
- `MIS-139` (SpeechPlayer highlight-sync, `mission/MIS-0139-...`) and any
  future tab-order audit of the corpus toolbar now have a rule ID to cite
  in their acceptance criteria instead of prose.
- `DBT-013` keeps the naming defect visible without forcing a rename this
  session, consistent with `STD-001 §2.0`: a named gap is preferable to a
  silent one or a rushed fix.

## Not done here

- The Design System document is not renamed.
- `PRO-010 §3.2.2` / `MIS-125` is not amended or reversed.
- The corpus toolbar's own tab-order coverage gap (only the platform home
  nav is tested, not `/corpus/**` documents with `SpeechPlayer`) is
  described in `ARC-10`'s check column but not closed — that is `MIS-139`
  and future audit work, not this ADR.
