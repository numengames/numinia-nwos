---
id: "DBT-003"
uid:
title: "Publication integrity: what the corpus holds and the site does not serve"
type: documentation
status: active
version: "2.0.1"
created: "2026-08-25T12:50:08Z"
created_source: "git:edf8021"
created_confidence: exact
updated: "2026-09-01T23:50:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, web, publishing, guards, coverage, D-001]
license: "CC-BY-4.0"
visibility: "public"
severity: high
opened_by: "Oracle, 2026-08-25"
evidence_script: "scripts/check-published-coverage.mjs"
evidence_head: "dc7ae43"
absorbs: ["D-023", "D-031", "D-032", "D-035"]
---
# DBT-003 — Publication integrity: what the corpus holds and the site does not serve

> **Summary:** A folder can be added to the archive and never appear on
> numinia.org. Nothing fails, nothing warns, and the build stays green.
> **Epistemic:** The gap is not between the corpus and its measurements — it is
> between the corpus and **what the world can see of it**.
> **Pragmatic:** `debt/` was invisible until someone happened to count pages.

## The finding

The Oracle, on `debt/` being missing from `content.config.ts`:

> *"It is not an instrument measuring wrong, it is that nothing checks that a
> new series enters `content.config.ts`. The next one will fall the same way."*

Correct, and the history is worse than the case that prompted it.

## Measured

Every series, compared against the day it entered the publishing glob:

| Series | Folder created | Entered the glob | Invisible for |
|---|---|---|---|
| `canon/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `missions/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `decisions/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `protocols/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `operations/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `reports/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `blueprints/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `agents/` | 2026-04-06 | 2026-08-18 | **134 days** |
| `guilds/` | 2026-04-07 | 2026-08-18 | **133 days** |
| `standards/` | 2026-04-14 | 2026-08-18 | 126 days |
| `debt/` | 2026-08-24 | 2026-08-25 | **1 day** |

**`debt/` is the best case in this table, not the worst.** It was caught in a
day because the page count was being watched during an active session; the nine
before it took four months, and were fixed in bulk by `MIS-087` rather than
noticed individually.

*(Correction to the framing that opened this entry: `debt/` was out of the glob
for one day, not twelve — the folder was created 2026-08-24. The twelve-day
figure was an estimate. The four-month figure that replaces it is measured, and
it is the one that matters.)*

## Why it recurs

Three reasons, and none is carelessness:

1. **The glob is an allow-list in a file nobody opens.**
   `web/src/content.config.ts` is web code; creating a series is archive work.
   The two never meet in the same task.
2. **Nothing fails.** A missing series does not break the build — there is
   simply less to build. `npm run build` goes green with the corpus half
   published.
3. **Page count is the only signal, and it is not watched.** It appeared as
   `515 → 559` and only meant something because the number was being tracked
   that day for another reason.

> A series that nobody publishes still exists, still gets committed, still gets
> cited. It simply cannot be read by anyone outside the repository — which for
> `debt/` means **the register of what is broken was the one thing the archive
> did not show.**

## What would close it

A guard, and this one is genuinely mechanical:

```js
// scripts/check-published-coverage.mjs
// Every top-level folder holding .md files either appears in the corpus glob,
// has its own collection, or is listed as a deliberate exclusion with a reason.
// Anything else fails the build.
```

Three categories, all already present in the repository:

- **In the glob** — `canon/`, `missions/`, `debt/`, …
- **Own collection** — `reports/audits/` (`audits`, page `/audits`)
- **Deliberately excluded, with a written reason** — `.github/` templates,
  `web/` itself

The guard's value is the third category: it forces an exclusion to be *stated*
rather than achieved by omission. Today the difference between "excluded on
purpose" and "forgotten" is invisible, and that is the whole defect.

**Cost:** one script and one line in `ci.yml` (`D-017` — the Oracle's hands).
Same shape as `check-references.mjs`, and it needs no baseline: the corpus
passes today.

## Closure

Marked RESOLVED when:

- [ ] `scripts/check-published-coverage.mjs` exists and fails on an unlisted
      series, verified in both directions
- [ ] It runs as a step in `ci.yml`, verified by reading the **step** and not
      the run's conclusion (`STD-001` §10.3)
- [ ] The current exclusions carry a written reason in `content.config.ts`

| | |
|---|---|
| Severity | **high** — silent, and it hid the debt register itself |
| Owner | Oracle (`ci.yml` step); agent writes the guard |
| Blocked by | `D-017` for the CI step |
| Opened | 2026-08-25 |
| Closes when | the guard exists, runs, and exclusions are declared |

---

## Absorbed: `D-031` — Nothing verifies that an index reflects its own series

> Merged into `DBT-003` on 2026-08-31 under `ADR-030`. The identifier `D-031`
> keeps resolving to this document via `absorbs:`; its evidence is preserved
> verbatim below, only its heading levels are demoted.

> **Summary:** An index is apparatus — regenerable from the documents it lists
> (`STD-001` §3). Nothing checks that it was. **32 documents are missing from
> their series index**, and `blueprints/INDEX.md` lists 3 of 22.
> **Epistemic:** A document absent from its index is invisible to every reader
> who trusts the index — which is what an index is for.
> **Pragmatic:** `ADR-023` was signed on the authority of a document the canon's
> own index had not acknowledged for four months.

### The finding

The Oracle, on `MIS-109` phase C reporting three canon documents the index never
listed:

> *"The finding at the end is bigger than you say. I signed `ADR-023` relying on
> §2.3 of a document the canon's index had not recognised for four months. The
> ADR stands — the document exists and says what it says — but it is the third
> time today with the same shape: something that looks complete and is not.*
>
> *Debt of its own: nothing verifies that the apparatus reflects its records.
> An index is regenerable by definition (`STD-001` §3) and still went four months
> without three documents. The guard is obvious and cheap — every file in a
> series appears in its INDEX — and goes with the others in `D-001`.*
>
> *And check the same in the other series before closing `MIS-109`: if
> `canon/INDEX.md` was three short, the others can be too."*

They are.

### Measured

`scripts/experiments/index-coverage.py` (at `reports/audits/evidence/index-coverage.py` when run), `HEAD 60e2379`:

| Series | Files | **Missing** | Index |
|---|---:|---:|---|
| `canon/` | 10 | **0** | fixed in `MIS-109` phase C |
| `agents/` | 20 | **0** | — |
| `decisions/` | 12 | **1** | `ADR-023`, merged today |
| `blueprints/` | 22 | **19** | lists 3 of 22 |
| `reports/` | 18 | **12** | every audit, every daily report |
| **Total** | | **32** | |

And six series have **no index at all**: `missions/`, `protocols/`,
`standards/`, `operations/`, `guilds/`, `debt/`.

#### `blueprints/INDEX.md` is the worst case, and it indicts itself

It lists `BP-cao`, `BLU-002` and `the Mission System v2 record`. Nineteen
others exist, including `SYS-003-archive-fondos.md`, which the site reads at build
time to render `/archive`.

Its own instructions say:

> *"3. **Add to this INDEX**"*

The procedure was written, published, and not followed — by the same agents who
wrote it. That makes this a `D-021` case at the level of apparatus: **a rule
that does not apply itself to whoever writes it.**

#### `reports/` is missing every report

Twelve absences including `RPT-2026-08-24` and `RPT-2026-08-25` — the session
reports written yesterday and today, each added to the corpus without touching
the index.

### Why it stays invisible

Same shape as `D-023` and `D-028`, and by now the pattern is the point:

| | Failure | Signal |
|---|---|---|
| `D-023` | A series never reaches the site | none — the build goes green with less to build |
| `D-028` | A page moves and its URL dies | none — the build goes green with a different URL |
| **`D-031`** | **A document is absent from its index** | **none — the index is valid markdown either way** |

An index cannot fail for what it omits. Nothing distinguishes *"this series has
three documents"* from *"this series has twenty-two and the index knows three"*.

### The guard, and it is genuinely cheap

```
scripts/check-index-coverage.mjs
  For each series folder holding an INDEX.md:
    every .md in the folder is mentioned by filename, stem, or id
    — or is listed in an `index_exempt:` block with a reason.
```

The detection already exists and ran to produce the table above. Five series
have an index today; the guard's cost is one script and one `ci.yml` line
(`D-017`).

**It cannot pass on day one**, so it needs the same treatment as the reference
lint: a baseline of the 32 known absences, which then only shrinks.

**And the exemption matters** — `reports/audits/evidence/` holds recovered
evidence that is deliberately not indexed. That must be declarable, not
achieved by omission (`STD-001` §5.0).

### What this does not claim

`ADR-023` is not in doubt. `Pragmatic_Numen_System-v0.2.0.md` exists, has been
in `canon/` since 2026-04-15, and its §2.3 says what the ADR quotes. **The
defect is that the index did not list it, not that the document was invalid.**

Recorded because the opposite reading — *"a decision was made on a document that
was not really there"* — would be false and worse than the actual problem.

### Closure

Marked RESOLVED when:

- [ ] `check-index-coverage.mjs` exists, with a baseline of the 32 current
      absences and an `index_exempt` mechanism
- [ ] It runs as a step in `ci.yml`, verified by reading the step (`STD-001` §10.3)
- [ ] The 32 absences are worked down, or declared exempt with a reason
- [ ] A decision on the six series with no index: they get one, or it is written
      down that they do not need one

The fourth matters more than it looks. `missions/` has 107 documents and no
index — which may be correct, since the site generates that listing, but nobody
has said so.

| | |
|---|---|
| Severity | **high** — 32 documents invisible to any reader trusting an index |
| Owner | Oracle |
| Blocked by | nothing; `D-017` for the CI step |
| Opened | 2026-08-25, at the Oracle's instruction during `MIS-109` |
| Closes when | indexes are verified against their series, or exemptions declared |

---

## Absorbed: `D-032` — Content is served from public/ without passing through the renderer, unmeasured by anything

> Merged into `DBT-003` on 2026-08-31 under `ADR-030`. The identifier `D-032`
> keeps resolving to this document via `absorbs:`; its evidence is preserved
> verbatim below, only its heading levels are demoted.

> **Summary:** Astro copies `web/public/**` into `dist/` verbatim. **5 documents**
> reach numinia.org that way, carrying no frontmatter, no declared licence, and
> no identifier. Three of them are **divergent second copies** of documents that
> also exist in the corpus.
> **Epistemic:** Every corpus measurement in this repository globs `*.md` under
> the corpus folders. This content is published, public, and invisible to all of
> them simultaneously — it is not counted, not licence-checked, not link-checked.
> **Pragmatic:** `node scripts/check-orphan-content.mjs` at `HEAD = 392ffc6`.

### Measured

`ROOT = numengames/numinia-nwos · main` · `HEAD = 392ffc6` · 2026-08-25

```
59  files in web/public/
59  of those present in web/dist/
 5  non-asset — orphan CONTENT
```

| Route served | Bytes | Class |
|---|---:|---|
| `/diseno/index.html` | 492,627 | orphan, declares **v5.0.0** |
| `/archive/archive-summa-arquitectura-v0.1.0.md` | 11,008 | **RESOLVED 2026-08-25** |
| `/archive/archive-summa-fundacional-v0.1.0.md` | 10,840 | **RESOLVED 2026-08-25** |
| `/archive/archive-summa-prompt-v0.1.0.md` | 5,722 | **RESOLVED 2026-08-25** |
| `/diseno/plantillas/2026_08_03-Plantilla_Factura-v1.0.0.html` | 12,615 | orphan |

**Three of the five are closed.** `SYS-003-archive-fondos.md`'s three download links
were repointed at `/corpus/blueprints/archive-summa-*-v010.md` and the `public/`
copies retired, in that order and in separate commits. The guard's allow-list
drops from 5 entries to 2. **Two remain open**: `/diseno/index.html` and the
invoice template.

Assets (fonts, images, css, js, icons) are excluded on purpose: they carry no
prose and make no claims.

### The second copies are the worse half

The three `archive-summa` files also exist in `blueprints/` and **differ from
the corpus copies beyond frontmatter**:

```bash
for f in arquitectura fundacional prompt; do
  diff "blueprints/archive-summa-$f-v0.1.0.md" \
       "web/public/archive/archive-summa-$f-v0.1.0.md" | grep -c '^[<>]'
done
# arquitectura 14 · fundacional 12 · prompt 8   (differing lines)
```

Stripping the corpus frontmatter still leaves 5 differing lines in `prompt`, so
the divergence is in the body, not the metadata.

#### Correction — 2026-08-25, after reading the diffs

Two claims made above and in `2ba3fea` are **wrong**, and the diffs say so:

**1 · The corpus copies have no YAML frontmatter either.** All three
`blueprints/archive-summa-*` files begin with an `#` heading. The
licence-frontmatter guard counts them among its **26 undeclared** files, and
both copies of all three appear in that set. So the corpus side is authoritative
by *reachability* — it is inside the glob, the reference lint sees it, it has a
published `/corpus/...` route — **not** because it carries metadata the other
lacks. The distinction matters: adopting it does not, by itself, fix licensing.

**2 · The divergence is not editorial.** In all three files it is the same
mechanical pair:

- the corpus copy gained the standard `> **Resumen:/Epistémico:/Pragmático:/
  Audiencia:**` summary block and lost its `#` title line;
- inside a fenced YAML *example* block, `created`/`updated`/`started` changed
  from `"2026-04-06T00:00:00Z"` to `"2026-04-06"`.

The second is inside a code sample showing what frontmatter should look like —
it is illustrative text, not live metadata.

**There is no unique work in the `public/` copies.** Nothing was written there
that does not exist in `blueprints/`; the differences run the other way — the
corpus copy is strictly ahead. The earlier framing, *"borrar una divergencia sin
leerla es perder la única razón por la que alguien la escribió"*, was the right
caution and the reading discharges it: **nothing is lost by retiring the
`public/` copies**, and that conclusion is now evidence-backed rather than
assumed.

Retirement is still not done here — the Oracle rules on it — but the blocking
question ("is there work only in the copy?") is answered: **no**.

**Two documents, one address each, and no rule saying which is true.** The
corpus copy is published at `/corpus/blueprints/archive-summa-*-v010`; the
`public/` copy at `/archive/archive-summa-*-v0.1.0.md`. A reader has no way to
know the other exists, and neither cites the other.

### Why nothing sees it

Same shape as `D-023` and `D-028` — a failure that produces no error:

| | `D-023` | `D-028` | `D-032` |
|---|---|---|---|
| Failure | a series never reaches the site | a page moves, its old URL dies | content reaches the site without the renderer |
| Signal | none — build green, less built | none — build green, other URL | none — build green, file copied as instructed |
| Blind instrument | the glob | the redirect table | **every `*.md` measurement at once** |

The specific blindness is worth stating: `check-license-frontmatter.mjs` reports
`256/282 .md files declare a licence`. That denominator is `git ls-files '*.md'`
under the corpus folders. **`web/public/**` is not in it**, so a document served
publicly with no licence at all does not lower the figure. `C-005 §5` — one
file, one regime — is unenforced here, which is `D-030`'s question applied to
files the licence guard never sees.

### How this was found, and what it says about the method

Not by design. The phase-0 desync table classified `web/` as *"outside the glob
— correct, it is code"* and moved on. **All five of these were inside that
dismissal.** They surfaced only when a guard enumerated `public/` directly.

The prior estimate was **1** orphan, derived from an aggregate subtraction
(`pages − redirects − astro_declared`). The enumeration found **5**. The
subtraction was not merely imprecise, it was structurally incapable: it counts
`index.html`, so it can only see orphans that occupy a route, and four of these
are served under their own filename. Recorded per `STD-001` §10.0.1: a guard that
validates what is present cannot detect what is missing, and **an aggregate
identity cannot name anything**.

### Known instance carried over from the correction record

`web/src/pages/agente.astro` holds the VPS address retired from the corpus in
`c51701e`. It was deliberately left in place so that this class of guard would
be the thing that finds it. **It is not in `public/`**, so the current guard does
**not** catch it — `src/pages/*.astro` is a third category: hand-written pages
that Astro *does* render but that carry no frontmatter and no licence either.
Ten such routes were enumerated in phase 0 (`/gaps`, `/soluciones`, `/agente`,
`/archive`, `/ventas`, `/simulaciones`, `/idioma`, `/continuidad`, `/wardley`,
`/cao`), holding 1,668–16,679 characters of prose each.

**This entry covers `public/`. The `.astro` category is adjacent and larger, and
is deliberately not folded in here** — it needs its own decision, because those
pages are the site's own furniture and moving them into the corpus is a design
change, not a cleanup.

### What would close it

**1 · The guard runs in CI.** `scripts/check-orphan-content.mjs` exists and is
verified (`scripts/verify-orphan-guard.sh` breaks it on purpose and asserts it
names the probe). It is **not wired** — `D-017`: the Oracle pastes the step. The
YAML, its insertion point and its failure modes are prepared.

**2 · The five are resolved, each explicitly.** Three outcomes are legitimate
and the point is that they must be *chosen*, not defaulted:
   - move into the corpus, gaining frontmatter, id and licence;
   - keep in `public/` and register in the guard's allow-list with the reason;
   - delete, if the corpus copy supersedes it.

**3 · The three divergent copies get a ruling on which is authoritative.**
Diffing them is mechanical; deciding is not.

**4 · The licence-guard denominator is stated.** `256/282` should say what
universe it measures, so a reader cannot mistake it for "everything published".

### Closure

Marked RESOLVED when:

- [ ] The guard fails a PR that adds unregistered content to `public/`
- [ ] Each of the 5 has a recorded decision (moved, allow-listed, or deleted)
- [ ] The `archive-summa` divergence has an authoritative side
- [ ] `check-license-frontmatter.mjs` declares its denominator

| | |
|---|---|
| Severity | medium — public, unlicensed, unmeasured; no data lost |
| Owner | Oracle |
| Blocked by | `D-017` for the CI step |
| Opened | 2026-08-25, from the phase-0 measurement |
| Closes when | nothing reaches the site without either the renderer or a declared exception |

---

## Absorbed: `D-035` — build:pdf does not run in automated builds: 278 dead PDF links and 278 print intermediates served

> Merged into `DBT-003` on 2026-08-31 under `ADR-030`. The identifier `D-035`
> keeps resolving to this document via `absorbs:`; its evidence is preserved
> verbatim below, only its heading levels are demoted.

> **Summary:** **278 pages** link a PDF that returns **404** in production, and
> the **278** `/print/*` intermediates that `build:pdf` was meant to delete are
> served with **200**.
> **Epistemic:** `npm run build` does not chain `build:pdf`. The automated build
> therefore produces every consequence of the PDF pipeline except the PDFs.
> **Pragmatic:** measured at `ROOT = numengames/numinia-nwos · main`,
> `HEAD = f7a65f5`, 2026-08-25.

### Measured

```bash
# pages linking a PDF, excluding the print intermediates themselves
grep -rlE 'href="/pdf/' web/dist --include=index.html \
  | grep -v '^web/dist/print/' | wc -l          # -> 278 pages

find web/dist/print -name index.html | wc -l    # -> 278 pages
test -d web/dist/pdf && echo yes || echo no     # -> no
```

#### The figure drifts with the corpus, and that is the point

Re-measured at `c2ee691` later the same day: **247**, not 278.

Nothing was fixed in between — the count moved because documents were retired
and others added. **Every published document generates one `/print/`
intermediate**, so this number tracks the size of the corpus, not the size of
the defect.

The original figures are left standing with the HEAD they were taken at rather
than overwritten: a measurement without its commit is not a measurement
(`STD-001` §10.2). What should be re-run rather than trusted is the command.

**The defect is that the count is not zero.** Any specific value is a snapshot,
and an acceptance criterion that hard-codes one has a shelf life — see the
worked example in `missions/TEMPLATE-EXAMPLE.md`, whose `Closure` is exactly
this mistake.

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

### The cause

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

### A control that satisfies what it declares and misses what matters

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
it was protecting is untrue. `STD-001` §10.0 in its purest form: no error, and
a correct-looking artefact.

### The documentary discrepancy

`CLAUDE.md:19` declares:

> *"Deploy flow is build → build:pdf → `npx wrangler deploy`; CI runs build only."*

**Half of that line is now wrong, and the half that is wrong is not the half
this entry is about.**

**The deploy is no longer manual.** The Workers Builds Git connection had
silently dropped — *"This project is disconnected from your Git account"* — and
for eight days production served a build from 2026-08-17 while `main` moved on.
Reconnected 2026-08-25 and verified from outside, with no panel interaction:
`numinia.org` serves `c2ee691`, the HEAD of `main`, and the page footer prints
the commit it was built from. **merge → build → deploy → checkable in the
footer.** That claim was true when written and is not true now.

**The `build:pdf` half stands.** The panel runs `npm ci && npm run build`, and
`build` does not chain `build:pdf`. **The document and the reality disagree, and
the reality is the record** (`STD-001` §2.1.1).

`CLAUDE.md` is an agent-instruction file and outside this agent's write
permission; the corrected text is proposed in the PR body for the Oracle to
apply, with its own §2.1.2 record. **It is not corrected in silence, and it is
not corrected by me.**

Recorded, and with a note on provenance: this same flow was written into an
inventory delivered on 2026-08-25 citing `CLAUDE.md` as the source — **an
unverified compliance assertion, written one day after opening `D-033` about
exactly that**. The inventory reported what the document said, not what the
panel does. The correction belongs here rather than in a footnote.

### Three ways out, with their cost. None recommended.

| Option | What it costs |
|---|---|
| **Chain `build:pdf` into `build`** | Chromium in every Workers build and every CI run. Build minutes and a heavy dependency on a pipeline that currently installs neither. |
| **Generate the PDFs separately** | Another process with another trigger — and another thing that can stop running without anyone noticing, which is the failure this entry documents. |
| **Retire the links** | Zero PDFs, zero broken links. Honest and reversible when the PDFs exist. Loses the feature `MIS-088` built. |

**The decision depends on whether the PDFs matter**, and that is the Oracle's
call, not a technical one. This entry does not choose.

### Closure

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

---

## Renumbering note, 2026-08-31

This document was `D-023`, and absorbs `D-031`, `D-032`, `D-035`. The `D-` series
was closed and renumbered densely to `DBT-NNN` under `ADR-004` rule 4 and
`ADR-005` v1.1.0 — see `RPT-001` §12. No `D-` number is reused.
