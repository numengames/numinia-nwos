---
id: "ADR-043"
uid: ""
title: "One page per document: a rule-shaped title, a three-part card, plated rules, and a body budget per series"
type: adr
status: active
version: "1.1.0"
created: "2026-09-08T22:30:00+02:00"
updated: "2026-09-09T00:15:00+02:00"
author: "ursa"
owner: "oracle"
deciders: ["oracle"]
guild: "Alchemists"
territory: "Archive"
tags: [standards, form, readability, plates, budget, deletion]
amends: ["STD-004", "STD-007", "STD-009"]
related: ["ADR-041", "MIS-146", "DBT-016"]
license: "CC-BY-4.0"
---

# ADR-043 — One page per document

> **Summary:** Every document in every series takes one shape: a title that
> states the rule in at most five words, a three-part card, a one-line scope,
> rules first and each one plated, then the check, then the reason. Size
> limits are SHOULD and measured; form is MUST. Rules are cited by plate,
> never by section. A document is deleted when nothing living depends on it
> normatively.
>
> **Epistemic:** Why the standards series went unread — 32,611 words in
> twelve files, reasons before rules, pointers instead of text — and the
> eight decisions that reverse it.
>
> **Pragmatic:** What the shape guard reports from today, and in which
> order the existing standards are cut to it.

## 1. Context

On 2026-09-08 the standards series held 38,855 words across eleven files;
the same evening, after the design system's direction moved to canon, it
held 32,611 across twelve. The largest, the design system, still held
10,330; the glossary 6,656; the core rules 2,884 in a table of 66 rules. Four hundred and twenty-two citations
in 107 files pointed at numbered sections (DBT-016), so no file could be
shortened without breaking something that cited it, and none was short
enough to be read whole. Agents searched the series; nobody read it.

Three properties of the text explained this. The apparatus came before the
content: a card of four paragraphs, then purpose, then scope, then the
norm. The reason came before the rule. And rules were referred to by
position — `STD-001 §5` — so every cut moved a target.

## 2. Decision

1. **Title states the rule, in at most five words.** *One document, one
   identifier* — not *Naming*.
2. **The card is three short paragraphs:** Summary, Epistemic, Pragmatic,
   each two to three lines. Then one line of scope: *Binds* / *Does not
   bind*.
3. **Rules first, each plated.** A plate is three letters and three digits
   (`GIT-006`), unique across the corpus, fixed for life, never reused. A
   plate names a rule, not a place. Missions keep four digits; no other
   exception.
4. **Cite plates, never sections.** Section numbers do not appear in
   citations. Document identifiers appear only in a References table of at
   most five rows, each a normative dependency.
5. **Size is SHOULD; form is MUST.** A body over budget with one written
   sentence of reason is valid. A document without plates, or with reasons
   before rules, is not. The guard measures and reports; it does not block.
6. **The body budget is per series** and lives in the Series register:
   500 words for standards, protocols, decisions and missions; 300 for
   debt and guilds; 1,000 for reports and blueprints; 1,500 for canon,
   which may exceed it with reason. Registers — `subtype: register` — are
   tables and exempt.
7. **Number is uniqueness, order is the index.** A document's number is
   assigned once and says nothing about reading order; the series index
   does. Renumbering the current series is deferred, not decided.
8. **Deletion by normative dependency.** A document is deleted when no
   living document depends on it normatively. Historical mentions in
   decisions and closed records are kept as written and do not block; the
   guard resolves a retired identifier against git history. This amends
   the rule that no document is deleted while anything cites it.

## 3. Consequences

- `STD-007` becomes *One page per document* and is the first file in the
  new shape; it applies to every series, not to standards alone.
- The 85 existing plates (`CORE-NN`, `H-NN`, `PW-NN`, `A-NN`, `RK-NN`) do
  not meet rule 3. They were renamed in one pull request, before any
  standard is cut, by `scripts/rename-plates.mjs`, which holds the
  equivalence table: 134 plates, 499 occurrences, 61 files. The number is
  kept and the prefix follows the subject: `CORE-01..05` → `PRE-`,
  `06..10, 63, 65, 67` → `AUT-`, `11..15` → `IDN-`, `16..20` → `HDR-040..044`
  (the header checks already hold `HDR-016..020`), `21..24, 64` → `VER-`,
  `25..30, 45..49` → `GIT-`, `50..53` → `CIT-`, `54..56` → `KEY-`, `57` →
  `EVI-`, `58..60` → `LIC-`; `H-NN` → `HDR-0NN`; `A-NN` → `TXT-`; `RK-` →
  `RNK-`; `PM-` → `TRC-`; `SEC-`, `ARC-`, `DEV-`, `DEF-` keep their letters
  and gain a digit. Retired plates (`CORE-31..44`, `CORE-66`) stay as
  written where history mentions them (decision 8).
- The twelve standards are cut to the shape in order of incoming citations,
  fewest first, one pull request each. The target layout is fifteen norms
  and six registers; it is a plan, not a rule, and the index records it.
- `check-document-shape.mjs` runs on every pull request in report mode.
  It becomes blocking for form — never for size — when the last standard
  is cut.
- `STD-004 §9–10` and `STD-009 §9` describe the old shape and are
  superseded in part by this decision; they are removed when those files
  are cut.
- The design system's direction — matter, motion, voice — leaves the
  series for canon when the Oracle leads it. Only what answers yes or no
  stays, as *Design tokens*.

## 4. Alternatives

- **A word cap as MUST.** Rejected: a rule that is violated on day one by
  every file it binds teaches people to ignore the guard.
- **Keep numbered sections, add a citation guard.** That guard exists
  (`check-section-citations.mjs`) and proved the point: it makes the
  breakage visible without making the text readable.
- **Renumber now.** Rejected: 58 files cite `STD-001`; renumbering before
  the citations move to plates is the same refactor twice.
- **A separate `REG-` series for registers.** Rejected: one more prefix for
  a distinction the header already carries.

## 5. Status

Active from the Oracle's instruction of 2026-09-08. Executed by `MIS-146`
in phases; this decision is the record of the shape, not of the work.
