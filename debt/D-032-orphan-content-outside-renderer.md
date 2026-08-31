---
id: "D-032"
uid:
title: "Content is served from public/ without passing through the renderer, unmeasured by anything"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-25T17:40:00Z"
created_source: "git:2ba3fea"
created_confidence: exact
updated: "2026-08-25T17:40:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, web, orphan-content, licensing, frontmatter, D-023, D-028, D-030]
license: "CC-BY-4.0"
visibility: "public"
visibility_reason: >
  The VPS address it refers to was retired the same day (`aef34ae`); this
  entry names the retirement, never the string. Its
  `visibility_expires_when` condition is met.
visibility_was: >
  restricted-oracle, 2026-08-25 to 2026-08-25. Not because orphan content is
  sensitive — it is not — but because one of the five cases still held the VPS
  address when this entry was written.
severity: medium
opened_by: "Ursa, 2026-08-25, during the phase-0 web/corpus desync measurement"
evidence_script: "node scripts/check-orphan-content.mjs"
evidence_head: "392ffc6"
---
# D-032 — Content served without the renderer, and outside every measurement

> **Summary:** Astro copies `web/public/**` into `dist/` verbatim. **5 documents**
> reach numinia.org that way, carrying no frontmatter, no declared licence, and
> no identifier. Three of them are **divergent second copies** of documents that
> also exist in the corpus.
> **Epistemic:** Every corpus measurement in this repository globs `*.md` under
> the corpus folders. This content is published, public, and invisible to all of
> them simultaneously — it is not counted, not licence-checked, not link-checked.
> **Pragmatic:** `node scripts/check-orphan-content.mjs` at `HEAD = 392ffc6`.

## Measured

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

## The second copies are the worse half

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

### Correction — 2026-08-25, after reading the diffs

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

## Why nothing sees it

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

## How this was found, and what it says about the method

Not by design. The phase-0 desync table classified `web/` as *"outside the glob
— correct, it is code"* and moved on. **All five of these were inside that
dismissal.** They surfaced only when a guard enumerated `public/` directly.

The prior estimate was **1** orphan, derived from an aggregate subtraction
(`pages − redirects − astro_declared`). The enumeration found **5**. The
subtraction was not merely imprecise, it was structurally incapable: it counts
`index.html`, so it can only see orphans that occupy a route, and four of these
are served under their own filename. Recorded per `S-001` §10.0.1: a guard that
validates what is present cannot detect what is missing, and **an aggregate
identity cannot name anything**.

## Known instance carried over from the correction record

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

## What would close it

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

## Closure

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
