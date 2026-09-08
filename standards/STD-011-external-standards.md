---
id: "STD-011"
uid: ""
title: "What the system obeys that it did not write: external standards, their source, and the distance to them"
type: documentation
subtype: standard
status: draft
version: "0.1.0"
created: "2026-09-07T15:00:00+02:00"
updated: "2026-09-07T15:00:00+02:00"
author: "ursa"
owner: "oracle"
territory: "CAO"
license: "CC0-1.0"
tags: [standards, adoption, provenance, external]
threshold: sealed
series_change: "New. Twenty-eight external standards were named across the corpus without a source, nine in more than one document, and fourteen not at all. This register names each one once, with its primary source, and points at the document that carries the obligation."
---

# STD-011 · External standards

## 1. Purpose and scope

**A standard is adopted in one document. It is used in as many as need it.**

Adopting means declaring that the system obeys an external norm and where its
text lives. That happens here, once. Using means a rule that applies it —
`STD-004` requiring a valid SPDX identifier in the `license` field is use, not
duplication, and it stays where it is.

**This register holds no foreign normative text.** Pointers, not copies —
the rule `agents/_template/SOURCES.md` already states for agents, applied to
standards. A standard's text belongs to whoever wrote it and changes without
asking us. Copying it here would create a second version that ages in silence.

Naming a standard here is not a commitment to comply with it. The `distance`
column says how far the tree actually is, and `3` is a legitimate value.

## 2. How to read this register

**Distance** — measured against the tree, not against prose:

| | meaning |
|---|---|
| **0** | implemented and verified — a guard, a workflow or a test enforces it |
| **1** | defined without a tool — the rule is written, nothing checks it |
| **2** | named only — appears in prose, nothing executes |
| **3** | not considered yet — no rule in the corpus |

**Territory** uses the closed vocabulary of `STD-001` (`territory`, guard rule H-36): `CAO · Product · Platform · Infrastructure · Content · Sales ·
Funding · Archive`.

**Applied in** names the document that carries the obligation, or `—` when
nothing in the corpus applies it yet.

## 3. Archive

| Standard | Source | Distance | Applied in |
|---|---|---|---|
| SPDX | <https://spdx.dev/> | 0 | `STD-010` · `STD-004` H-08 |
| REUSE 3.3 | <https://reuse.software/spec-3.3/> | 1 | `STD-010` · `REUSE.toml` — compliant, verified by hand |
| ISO 8601 | <https://www.iso.org/iso-8601-date-and-time-format.html> | 0 | `STD-004` H-06, H-07 |
| Keep a Changelog | <https://keepachangelog.com/> | 2 | `CHANGELOG.md` (practised, unnamed) |
| ISO 15489 · records management | <https://www.iso.org/standard/62542.html> | 3 | — overlaps `STD-004` / `PRO-010`, unreconciled |
| W3C PROV-O | <https://www.w3.org/TR/prov-o/> | 3 | — `STD-004` ring 2 may be a conceptual subset |

> **REUSE is distance 1, not 0.** The tree is compliant — `reuse lint` returns
> 593 of 593 files covered — but it runs in no workflow: the fifteen steps of
> `ci.yml` do not include it. Compliance verified by hand today is not
> compliance enforced. Running it for the first time found three real defects
> that had been in `main` for weeks.

> **PROV-O.** Ring 2 of `STD-004` (`author` · `owner` · `created_source` ·
> `created_confidence`) models provenance the W3C standardised in 2013.
> Verify conceptual compatibility; adopting RDF literally is not proposed.

## 4. CAO

| Standard | Source | Distance | Applied in |
|---|---|---|---|
| RFC 2119 | <https://www.rfc-editor.org/rfc/rfc2119> | 0 | `STD-004` · used corpus-wide |
| Semantic Versioning 2.0.0 | <https://semver.org/> | 1 | `STD-002` «Versioning authority» · `STD-009` CORE-21 |
| Blameless postmortem | <https://sre.google/sre-book/postmortem-culture/> | 2 | `STD-005` (practised, unnamed) |
| NIST AI RMF | <https://www.nist.gov/itl/ai-risk-management-framework> | 3 | — |
| ISO/IEC 42001 · AI management | <https://www.iso.org/standard/42001> | 3 | — `STD-005` AGT-06 asks by hand for part of what it formalises |
| ISO 22301 · continuity | <https://www.iso.org/standard/75106.html> | 3 | — overlaps `PRO-001`, unreconciled |
| ISO 9001 · quality | <https://www.iso.org/iso-9001-quality-management.html> | 3 | — **no anchor in any operating document** |

> **SemVer is adapted, not adopted as published.** `STD-002` versions
> documents, where there is no API to break. The rule the system applies —
> digital agents `patch`, archons `minor`, Oracles `major` — is authority-based,
> not compatibility-based. Unverified whether the two diverge in practice.

## 5. Platform

| Standard | Source | Distance | Applied in |
|---|---|---|---|
| OpenSSF Scorecard | <https://scorecard.dev/> | 0 | `.github/workflows/scorecard.yml`, weekly |
| Trunk-Based Development | <https://trunkbaseddevelopment.com/> | 2 | practised: one live PR at a time onto `main`, unnamed |
| The Twelve-Factor App · III | <https://12factor.net/config> | 2 | practised: config in the environment, unnamed |
| Conventional Commits | <https://www.conventionalcommits.org/> | 1 | `STD-005` ARC-06 — **declared `[AUTO: commitlint]`, no commitlint in the tree** |
| DCO | <https://developercertificate.org/> | 1 | `STD-010` — **declared `[AUTO]`, no bot; 0 of the last 30 commits signed** |
| SLSA | <https://slsa.dev/> | 3 | — cheap extension of Scorecard, same parent project |
| NIST SSDF · SP 800-218 | <https://csrc.nist.gov/pubs/sp/800/218/final> | 3 | — `STD-005`'s security section is a self-authored checklist with no external frame |
| OWASP ASVS | <https://owasp.org/www-project-application-security-verification-standard/> | 3 | — |
| DORA metrics | <https://dora.dev/research/2024/dora-report/> | 3 | **retired** by `STANDARDS.md`, 2026-08-30 |
| Gherkin / BDD | <https://cucumber.io/docs/gherkin/> | 0 | `numinia-web`: ten `.feature` files, `@cucumber/cucumber`, `test:acceptance` in CI |

> **Gherkin applies to software, not to documents.** It runs on every pull
> request in `numinia-web` and has since before the superseded constitution
> declared it retired — that retirement was written without looking outside
> this repository, and is corrected there.
>
> A mission that produces software carries scenarios. A governance document
> does not: it has no scenarios to write. `STD-005` AGT-05 now says so, and
> AGT-03 no longer demands Gherkin for everything normative.

## 6. Product

| Standard | Source | Distance | Applied in |
|---|---|---|---|
| WCAG 2.2 AA | <https://www.w3.org/TR/WCAG22/> | 0 | `numinia-web`: `apps/store/e2e/a11y.spec.ts`, axe + Playwright, 31 routes, both themes |
| W3C DTCG · design tokens | <https://www.designtokens.org/tr/drafts/format/> | 1 | `STD-008` — **the spec is a DRAFT; conformance to a moving target** |
| C2PA | <https://c2pa.org/> | 3 | — relevant only if `/web` serves AI media at public volume |

> **WCAG is distance 0 and cited wrong.** `STD-005` ARC-10 says «coverage
> incomplete, `DBT-013`» and points at a path that does not exist in this
> repository. `DBT-013` has been `closed` since 2026-09-04; the gate lives in
> the sibling repository and measures both themes.

## 7. Funding

| Standard | Source | Distance | Applied in |
|---|---|---|---|
| GDPR · Regulation (EU) 2016/679 | <https://eur-lex.europa.eu/eli/reg/2016/679/oj> | 1 | `OPS-003` — FLAG-2, FLAG-3, FLAG-4, FLAG-6 open, «awaiting a lawyer» |
| OpenChain · ISO/IEC 5230 | <https://openchainproject.org/license-compliance> | 3 | — formalises what `STD-010` already executes by hand |

## 8. What this register does not cover

`Content`, `Sales` and `Infrastructure` hold no external standard. Either the
vocabulary does not fit the material or those three territories have no
external norm; this register does not decide which.

## 9. References

- `STD-001` — what each series holds; `territory` vocabulary
- `STD-004` — the header contract, where SPDX and ISO 8601 are enforced
- `STD-010` — the licensing standard, where the licence sources are already cited
- `STANDARDS.md` — the superseded constitution; records the retirement of DORA and Gherkin
- `DBT-020` — the automations this register found declared without a tool
