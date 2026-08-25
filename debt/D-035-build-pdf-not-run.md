---
id: "D-035"
uid:
title: "build:pdf does not run in automated builds: 278 dead PDF links and 278 print intermediates served"
type: technical
status: open
version: "1.0.0"
created: "2026-08-25T19:30:00Z"
created_source: "git:f7a65f5"
created_confidence: "exact"
updated: "2026-08-25T19:30:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Infrastructure"
tags: [debt, web, pdf, build, deploy, D-028, D-032, D-033]
license: "CC-BY-4.0"
visibility: "internal"
visibility_reason: >
  Nothing sensitive: broken links and unstyled print intermediates already
  public. Internal because it describes build behaviour, not because it is
  withheld. Recorded explicitly although debt/ is currently outside the corpus
  glob (temporary, pending a visibility-aware filter) — the field is written so
  it is right when the glob is restored.
severity: medium
severity_reason: >
  Medium, not high: no data is lost, nothing is exploitable, and the sitemap
  filter keeps the intermediates unindexed. Not low either: 278 links are
  visibly broken to any reader, and the corpus documents a flow the build does
  not run — the visible surface is large and the discrepancy is documentary.
opened_by: "Oracle, 2026-08-25, on the Workers Builds reconnection"
evidence_script: "grep -rlE 'href=\"/pdf/' web/dist --include=index.html | grep -v '^web/dist/print/' | wc -l"
evidence_head: "f7a65f5"
---
# D-035 — The build never generates the PDFs it links to

> **Summary:** **278 pages** link a PDF that returns **404** in production, and
> the **278** `/print/*` intermediates that `build:pdf` was meant to delete are
> served with **200**.
> **Epistemic:** `npm run build` does not chain `build:pdf`. The automated build
> therefore produces every consequence of the PDF pipeline except the PDFs.
> **Pragmatic:** measured at `ROOT = numengames/numinia-nwos · main`,
> `HEAD = f7a65f5`, 2026-08-25.

## Measured

```bash
# pages linking a PDF, excluding the print intermediates themselves
grep -rlE 'href="/pdf/' web/dist --include=index.html \
  | grep -v '^web/dist/print/' | wc -l          # -> 278 pages

find web/dist/print -name index.html | wc -l    # -> 278 pages
test -d web/dist/pdf && echo yes || echo no     # -> no
```

Verified live, not only in `dist/`:

```
https://numinia.org/pdf/corpus/canon/c-005-licensing.pdf        404
https://numinia.org/pdf/corpus/standards/s-001-glossary.pdf     404
https://numinia.org/print/corpus/canon/c-005-licensing/         200
https://numinia.org/print/missions/mis-109/                     200
```

The links are real and emitted by the page templates:

```
href="/pdf/corpus/canon/c-005-licensing.pdf"
```

## The cause

`web/package.json`:

```
build      node ../scripts/check-license-frontmatter.mjs && astro build
build:pdf  node scripts/generate-pdfs.mjs
```

`build` does not chain `build:pdf`. The Workers Builds project runs
`npm ci && npm run build`, so `generate-pdfs.mjs` never executes. It is that
script which prints `/print/*` to `dist/pdf/*.pdf` **and then removes
`dist/print/`** — so a build without it leaves both halves wrong at once: no
PDFs, and the intermediates still there.

## A control that satisfies what it declares and misses what matters

`web/astro.config.mjs:34-37`:

```js
// /print/* pages are PDF-generation intermediates (MIS-088): rendered at
// build, printed to /pdf/*.pdf by scripts/generate-pdfs.mjs, then removed
// from dist — they must never reach the sitemap.
integrations: [..., sitemap({ filter: (page) => !page.includes("/print/") })],
```

**The filter works.** `curl https://numinia.org/sitemap-0.xml | grep -c "/print/"`
returns `0`: the intermediates are not indexed.

But the comment states a guarantee about the **sitemap**, and the property that
matters is that the intermediates **stop existing** — which it delegates to
`generate-pdfs.mjs`, a step nothing runs. The control is green while the thing
it was protecting is untrue. `S-001` §10.0 in its purest form: no error, and
a correct-looking artefact.

## The documentary discrepancy

`CLAUDE.md:19` declares:

> *"Deploy flow is build → build:pdf → `npx wrangler deploy`; CI runs build only."*

The Workers Builds panel runs `npm ci && npm run build`, and `build` does not
chain `build:pdf`. **The document and the reality disagree, and the reality is
the record** (`S-001` §2.1.1).

Recorded, not silently corrected. And with a note on provenance: this same flow
was written into an inventory delivered on 2026-08-25 citing `CLAUDE.md` as the
source — **an unverified compliance assertion, written one day after opening
`D-033` about exactly that**. The inventory reported what the document said, not
what the panel does. The correction belongs here rather than in a footnote.

## Three ways out, with their cost. None recommended.

| Option | What it costs |
|---|---|
| **Chain `build:pdf` into `build`** | Chromium in every Workers build and every CI run. Build minutes and a heavy dependency on a pipeline that currently installs neither. |
| **Generate the PDFs separately** | Another process with another trigger — and another thing that can stop running without anyone noticing, which is the failure this entry documents. |
| **Retire the links** | Zero PDFs, zero broken links. Honest and reversible when the PDFs exist. Loses the feature `MIS-088` built. |

**The decision depends on whether the PDFs matter**, and that is the Oracle's
call, not a technical one. This entry does not choose.

## Closure

Marked RESOLVED when:

- [ ] No published page links a PDF that does not exist
- [ ] `/print/*` either stops being served or is documented as intentionally public
- [ ] `CLAUDE.md`'s deploy flow matches what the panel runs
- [ ] Whichever option is chosen is recorded with its reason

| | |
|---|---|
| Severity | medium — see `severity_reason` |
| Owner | Oracle |
| Blocked by | nothing; the fix is a decision, not an obstacle |
| Opened | 2026-08-25, after reconnecting Workers Builds |
| Closes when | the site does not advertise documents it does not have |
