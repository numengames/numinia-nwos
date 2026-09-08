---
id: "DBT-022"
uid: ""
title: "The glossary holds three definitions and thirty-nine sections of registration law"
type: documentation
status: active
version: "0.1.0"
created: "2026-09-08T11:30:00+02:00"
updated: "2026-09-08T11:30:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, standards, naming, glossary]
license: "CC-BY-4.0"
severity: medium
severity_reason: "the second largest standard in the series is named after a genre it does not belong to. A reader looking for the project's vocabulary opens 6219 words of registration law and does not find it"
detected: "2026-09-08"
visibility: "restricted-oracle"
visibility_reason: "internal governance debt"
opened_by: "ursa"
related: ["MIS-0146", "STD-001", "STD-004", "STD-009"]
---

# DBT-022 — A glossary with three definitions

> **Summary:** `STD-001` is filed and cited as the glossary. It carries three
> term definitions, one normative obligation, and thirty-nine sections of law
> about how documents are registered, named, versioned and filed.
> **Epistemic:** The document is correctly written and wrongly named.
> **Pragmatic:** Fixing it means renaming a document that 82 section citations
> point at, which is why this is recorded rather than done.
> **Audience:** Oracles

---

## 1. What was measured

Measured at `3cb6949`, body text only, frontmatter excluded.

| Property | Value |
|---|---|
| Words | 6,219 — second largest in `standards/` |
| Sections | 39 |
| Definitions in `**term** — meaning` form | 3 |
| Normative obligations (`MUST` / `SHALL`) | 1 |
| Section citations pointing at it from the corpus | 82 |

The content is registration law: which series holds what, how identifiers are
formed, when a version threshold is crossed, how dates are derived from git,
what a controlled vocabulary admits, how a rename propagates.

That law is sound. It is simply not a glossary, and nothing in the corpus
defines the project's vocabulary anywhere else either.

## 2. Why it was not fixed here

**82 section citations** resolve against this document's numbered headings.
`check-section-citations.mjs` verifies that each one still lands, and PR #232
already demonstrated the failure mode: a large cut left nine citations pointing
at sections that no longer existed, and it sat in `main` for days.

Renaming the file, renumbering its sections, or splitting it are all
citation-breaking acts. They need a migration, not an edit.

## 3. The exits

1. **Rename the file to what it is** — registration law — and let the glossary
   name fall to a new, short document that actually defines terms. Costs a
   rename plus a citation migration.
2. **Keep the name and add the missing definitions** — makes the mismatch
   smaller but leaves a 6,000-word document whose first duty is buried.
3. **Split** — registration law stays, definitions leave. Most correct, most
   expensive: the split renumbers everything.

No exit is chosen here. The measurement is the deliverable.

## 4. References

- `standards/STD-001-glossary.md` — the document measured
- `scripts/check-section-citations.mjs` — the guard that makes a rename expensive
- `DBT-016` — the citation-fragility debt this depends on
- `MIS-0146` — the mission that found it
