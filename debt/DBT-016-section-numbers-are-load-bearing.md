---
id: "DBT-016"
uid: ""
title: "Section numbers are load-bearing: 422 citations pin the corpus to its own layout"
type: documentation
status: active
version: "0.1.0"
created: "2026-09-06T14:05:00+02:00"
updated: "2026-09-06T14:05:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, refactor, citation, coupling]
license: "CC-BY-4.0"
severity: high
severity_reason: "every future reorganisation of the corpus pays this cost before it can start"
detected: "2026-09-06"
visibility: "restricted-oracle"
visibility_reason: "internal structural debt; publishes nothing a reader of numinia.org needs"
opened_by: "ursa"
related: ["MIS-0146"]
---

# DBT-016 — Section numbers are load-bearing

> **Summary:** 422 citations across 107 files point at numbered sections
> (`CAN-005 §1`, `STD-004 §6.1`), so renumbering or reordering any section of a
> cited document silently breaks them — and 123 of those citations live in
> executable code, not prose.
> **Epistemic:** The corpus cannot be reorganised without a migration. Any claim
> that a document is "just a file we can restructure" is false for at least
> twelve documents.
> **Pragmatic:** Closes when a citation resolves to a rule identifier rather than
> a position, or when a guard proves every `§` citation still lands.
> **Audience:** Agents

---

## 1. The defect

A citation of the form `STD-004 §6.1` names **a place**, not a rule. It stays
correct only while that place holds that content. Renumbering a section,
inserting one above it, or splitting a document invalidates every such citation
without producing any error — the text still reads plausibly, and points at the
wrong thing.

Counted on 2026-09-06 at `046e8eb`: **422 citations to a numbered section, across
107 files.** They are not evenly spread. Twelve documents absorb almost all of
them, and the top three take 360 of the 422:

| Document cited | Citations to its numbered sections |
|---|---|
| `STD-004` | 185 |
| `PRO-003` | 109 |
| `STD-001` | 66 |
| `PRO-010` | 17 |
| `CAN-005` | 12 |

**123 of the 422 are in `scripts/field-decisions.json`**, and a further 43 across
`lint-frontmatter.mjs`, `lint-naming.mjs`, `check-templates.mjs` and
`scripts/lib/rules.json`. These are not prose references a reader can repair by
noticing the text looks wrong: they are the strings the guards match on. A
renumbering that no human catches will be caught by a guard failing for a reason
that names the wrong rule.

Three more sit in files that are the repository's legal declaration:
`LICENSE`, `REUSE.toml` and `TRADEMARKS.md` all cite `C-005 §1`, `CAN-005 §2`
and `C-005 §7` respectively.

The template rule adopted in `MIS-0146` — *"cite the rule, never the place"* —
is the correct fix and is already written into `STD-TEMPLATE.md`. It governs new
text. It does nothing about the 422 already in the tree.

---

## 2. Evidence

```
$ P='(CAN|STD|PRO|ADR|MIS|GLD|DBT|OPS|RPT|CORE|H)-[0-9]+[a-z]* *§+ *[0-9.]+'

$ git grep -h -oE "$P" | wc -l
422

$ git grep -l -E "$P" | wc -l
107

$ git grep -h -oE "$P" -- scripts/field-decisions.json | wc -l
123
```

Measured at `046e8eb`, 2026-09-06. The pattern counts citations of the form
`<ID> §<number>`; it does not count bare `§4` references that name no document,
so 422 is a floor, not a ceiling.

---

## 3. Closure condition

> **Closes when:** either every `§`-shaped citation in the corpus has been
> replaced by a rule identifier, or a guard exists that resolves each one against
> the cited document's current headings and fails on the ones that no longer land.

Whichever comes first. The second is cheaper and is the honest interim: it does
not remove the coupling, it makes breaking it noisy.

---

## 4. Cost of leaving it open

The Oracle has stated the intent to reduce and restructure the corpus
substantially — to *"arrasar con el sistema que tenemos ahora para reducirlo"*.
This entry is the price of that operation, measured before it starts.

Three consequences follow from leaving it open:

**Every reorganisation becomes a migration.** Splitting `STD-004`, renumbering
`PRO-003`, or reordering `STD-001` is not a text edit; it is a text edit plus 360
citation repairs, most of them in code.

**The failures are silent.** A stale `§` citation reads correctly and points
somewhere wrong. There is no guard for it today. The corpus will drift into being
confidently mis-cited, and nothing will report it.

**It gets more expensive monotonically.** Each new document that cites a section
by number adds to the count. The template rule slows the growth; it does not stop
it, because the rule only reaches documents written from the template.

The interim mitigation — adopted for the canon-to-standards move planned after
`MIS-0146` — is that **a section that is emptied keeps its number and holds a
pointer**. The heading stays, the content moves, the 422 citations keep landing.
That is a containment measure, not a fix: it preserves the coupling deliberately
so that the migration can happen in one pass, later, on purpose.
