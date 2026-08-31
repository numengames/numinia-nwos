---
id: "ADR-033"
uid:
title: "Deletion is decided by consumers, not by folder: the operational-series scheme is dissolved"
type: adr
status: active
version: "1.0.0"
created: "2026-08-31T16:00:00+02:00"
updated: "2026-08-31T16:00:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [lifecycle, deletion, urls, p-010, governance, entropy, d-028]
license: "CC-BY-4.0"
related: ["P-010", "ADR-030", "ADR-032", "D-028", "D-025", "MIS-127", "S-001"]
---

# Deletion is decided by consumers, not by folder

> **Summary:** P-010 §5 decided whether a document could be deleted by
> asking which folder it lived in. That is replaced by four tests about
> its consumers, and the `debt/`/`blueprints/` "operational series"
> category is dissolved. Two guards land with the rule; one of them pays
> `D-028`.
> **Epistemic:** A document is not preserved because of where it sits.
> It is preserved because someone is still reading it.
> **Pragmatic:** Run `check-deletable.mjs <path>`. If it passes and the
> URLs are redirected, delete it — no ADR needed.

## Context

The Oracle's finding, 2026-08-31: P-010 §5 was stopping work. Correct,
and the diagnosis holds up under measurement — but not for the reason a
first reading suggests, and the first remedy proposed (delete §5) would
have made the underlying problem worse rather than better. Both are
recorded here because the correction is the substance of this decision.

**What §5 actually said.** Deletion was permitted only for exact verified
duplicates, plus whatever series a prior ADR had declared "operational":
`debt/` (`ADR-030`), then `blueprints/` (`ADR-032`), with the explicit
clause that *"declaring another series operational requires an ADR."*

**Why that is the wrong shape.** It is a permission system indexed on
folders — O(n) ADRs for n folders. Every future reduction had to pass
through governance to ask a routing question. `MIS-127`'s decision queue
shows the cost accumulating in real time: freezing April missions and
retiring `reports/daily/` each needed their own ruling before anyone
could touch a file.

**What §5 was not.** It was not the thing that makes deletion dangerous.
Measured at `4879aec` against a real `npm run build`:

| Measure | Value |
|---|---|
| Tracked `.md` (excluding `web/`, `.github/`) | 323 files, 593,774 tokens (cl100k_base) |
| Closed records (`closed`/`done`/`superseded`/`frozen`) | **106 files, 189,459 tokens — 31.9% of the corpus** |
| Public URLs published by the site | 847 (536 excluding `/print/` intermediates) |
| Public URLs published by those 106 closed records | **287 — 34% of the site** |
| Redirect rules protecting them | 9, hand-written |
| Orphans with zero inbound citations | 15 files, 18,324 tokens — 3.1% |

The danger is the third row, and it survives the deletion of §5
untouched. `D-028` has recorded it since 2026-08-25: addresses derive
from filenames and `id`s, and nothing manages their lifecycle. Removing
the prohibition without paying that debt does not unblock the reduction —
it converts a documentary blockage into dead public addresses, discovered
later, by someone else. `D-028`'s own evidence is exactly that story:
`/corpus/canon/c-006-manual-juego-de-rol/` (890 KB) died in April and
nobody noticed.

**Demonstrated, not argued.** Deleting
`reports/audits/AUD-2026-08-26-complexity.md` and rebuilding:
`npm run build` **exits 0** while the site drops from 660 to 658 pages.
The build is structurally incapable of noticing. That is the gap this ADR
closes, and it is why the instruments land in the same change as the rule
rather than after it.

## Decision (Oracle, 2026-08-31)

1. **§5 is amended, not deleted.** Deletion is decided by consumers. The
   four tests are written in `P-010` §5:
   1. **Inbound citations** — zero, or every citer is itself a closed
      record.
   2. **Public URLs** — every address the document publishes is
      redirected in the same change.
   3. **Written resolution** — a living document records what it said and
      why it no longer holds (inherited verbatim from `ADR-030` §3).
   4. **Not sealed** — `threshold: sealed` still requires the Oracle's
      signature and an ADR.
2. **Passing 1–4, a deletion needs no ADR.** The guards are the
   authority. This is the clause that removes the friction the Oracle
   identified, without removing the check.
3. **The operational-series category is dissolved.** `debt/` and
   `blueprints/` cease to be privileged; they pass the same four tests as
   every other document, and usually pass easily — which is what
   `ADR-030` and `ADR-032` were really observing when they reached for a
   genre distinction. Those two ADRs stand as history; their extinction
   records remain valid. **`ADR-030` §2 and `ADR-032` §4 — the clauses
   requiring an ADR to declare a new operational series — are spent:
   there are no operational series left to declare.**
4. **Two instruments, in this change:**
   - `scripts/check-url-lifecycle.mjs` — a ratchet over
     `scripts/url-baseline.json` (536 public URLs at adoption). Fails
     when a published address stops being built without a redirect.
     Same pattern as `lint-naming.mjs`: strict on the delta, baseline on
     the stock. **This pays `D-028`.**
   - `scripts/check-deletable.mjs` — judges tests 1 and 4 mechanically,
     reports the evidence for 2, and explicitly refuses to answer 3.
5. **Test 3 stays human, deliberately.** Whether a resolution was
   *written* is a judgment about meaning. `P-010` §3.4 already ruled that
   the citation/mention distinction "lives in the sentence" and is not
   decidable by pattern; claiming a guard settles it would repeat exactly
   the error `D-039` recorded — a green ratchet certifying corruption.

## What the instruments cannot see (D-025)

Declared in `scripts/blind-spots.json` and printed on every run:

- **A redirect's target may not answer the question.** `check-url-lifecycle`
  verifies an address still resolves, not that the page it reaches is a
  successor. A 301 to a section index passes and still loses the content.
- **External consumers are invisible.** Neither guard sees inbound links
  from search engines, other sites, or `numinia-web`'s
  `design-source.json` pin — the same class of consumer that reverted the
  rename in `D-024`.
- **Test 1 counts substrings, so it cannot tell a citation from a
  mention** (`P-010` §3.4). It errs toward refusing, which is the safe
  direction.
- **`.md` only.** A reference from `.astro` or `.ts` is invisible to
  `check-deletable`. Verified during this ADR's own work:
  `MIS-119-listen-to-the-archive.md` reads as deletable, and is —
  its `.md` citers are all `status: done` — but four `web/src` files name
  it in comments. Comments, not dependencies, so the verdict held; the
  point is that the guard did not see them and said so.
- **Untracked files.** Both enumerate via `git ls-files` (`D-049`) and
  warn rather than passing silently.

## Consequences

- A reduction pass no longer needs a governance round-trip. It needs a
  green guard and a redirect.
- **`D-028` is not closed by this ADR — three of its four conditions are
  met.** `check-url-lifecycle.mjs` and its 536-URL baseline satisfy the
  guard requirement and the reconciliation measurement; `404.astro`
  landed earlier under `MIS-128`. The fourth (a stale `DEUDA-404` comment
  in `astro.config.mjs:22`) is untouched, and the entry's severity drops
  from medium to low: silent URL loss is now a CI failure, imprecise
  redirection is not. Claiming closure would overstate what was built.
- The `debt/` and `blueprints/` extinctions already performed under
  `ADR-030`/`ADR-032` remain correct — this ADR changes the reason they
  were permitted, not the outcome.
- **Nothing is deleted by this ADR.** The rule and the instruments land
  first, and are tested against a real deletion that is then reverted.
  The first application under the new rule is a separate change, judged
  by the guards this one installs.
