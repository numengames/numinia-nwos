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
related: ["STD-001", "STD-005", "MIS-151", "MIS-152", "MIS-127", "MIS-125", "DBT-013"]
superseded_by: null
---

# ADR-037 · Accessibility gate has one normative home

> **Summary:** WCAG AA conformance for code artifacts is now `ARC-10` in
> `STD-005`, the single point a reader or a guard consults for "what does
> this repo require, and what actually checks it." Design-subject
> accessibility (contrast tokens, focus-ring color, tap targets) stays in
> the Design System §12 — different subject, correctly separate.

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

## Not done here

- The Design System document is not renamed.
- `PRO-010 §3.2.2` / `MIS-125` is not amended or reversed.
- The corpus toolbar's own tab-order coverage gap (only the platform home
  nav is tested, not `/corpus/**` documents with `SpeechPlayer`) is
  described in `ARC-10`'s check column but not closed — that is `MIS-152`
  and future audit work, not this ADR.
