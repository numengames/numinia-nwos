---
id: "PRO-010"
uid: ""
title: "How to Archive — the NWOS archival protocol"
type: protocol
status: draft
version: "0.8.3"
created: "2026-08-18T10:51:09Z"
created_source: "git:9f25053"
created_confidence: exact
updated: "2026-09-02T17:04:00+02:00"
author: "claude-fable-5"
owner: "oracle"
tags: [protocols, archive, taxonomy, naming, iso-15489]
license: "CC0-1.0"
supersedes: "protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md  # deleted 2026-08-31, MIS-127"
review_next: "2027-02-18"
---
# P-010 — How to Archive (draft)

> **Summary:** How every document in the NWOS archive is named, where it
> lives, and how it ages. Succeeds `Read_Me_How_to_Archive` v0.2.0 (formerly
> Drive), adapting it to the system's git + web reality.
> **Epistemic:** The system's document taxonomy and lifecycle.
> **Pragmatic:** For any new file: what name, what folder, what
> frontmatter. For any archival doubt: this protocol decides.
> **Audience:** Agents · Oracle
> **Status:** DRAFT — pending Oracle signature (MIS-089 phase 0).

---

## 0. Lineage and contradiction rule

Descends from `Read me How to archive` v0.1.12 (2024, Drive) and v0.2.0
(2026-04-14, this repo). **In case of contradiction with those versions,
today's criterion prevails** (Oracle's order, 2026-08-18). What is
inherited and what is discarded, in §7.

## 1. Principles

1. **File Over App.** The document is the deliverable; the repo is the
   archive.
2. **One source, zero copies.** Link, never copy. A derived copy in
   another repo declares its master (FLAG-1 pattern from operations/legal).
3. **Git versions the content; the frontmatter versions the document.**
   Semantic version lives in the frontmatter's `version:` — never in an
   operational document's filename.
4. **Folders by type; guild in metadata.** The primary structure is
   document type (Oracle's decision, 2026-08-18); the guild dimension is
   expressed in `guild:` in the frontmatter, not in folders.
5. **1:1 web mirror.** Each type folder has its section on numinia.org;
   `/corpus` is the global cross-cutting catalogue.
6. **Limited depth.** Maximum two levels under root (`reports/evidence/`,
   `agents/<name>/`). Inherited from v0.1.12 and still in force. One declared
   exception: a report's evidence annex (`reports/evidence/<RPT-id>/`) may
   nest one level more for captured artefacts (`robots/*.txt`), because those
   files are moved as an opaque block and never authored — `ADR-005` v1.2.0
   rule 5.

## 2. Taxonomy: type → folder → ID → web section

| Type | Folder | ID scheme | Web section |
|---|---|---|---|
| Canon | `canon/` | `C-XXX` | `/canon` (pending, MIS-089 F2) |
| Mission | `missions/` | `MIS-XXX` | `/missions` ✓ |
| Decision | `decisions/` | `DEC-XXX` / `ADR-XXX` | `/decisiones` ✓ |
| Blueprint | `blueprints/` | `BLU-XXX` | `/blueprints` ✓ |
| System manual | `system/` | `SYS-XXX` | `/corpus/system` ✓ |
| Superseded record | `history/` | none — frozen-artifact name (§3.2) | `/corpus/history` ✓ |
| Protocol | `protocols/` | `P-XXX` | `/protocolos` (pending) |
| Report | `reports/` (flat) | `RPT-NNN` · `RPT-YYYY-MM-DD` for `subtype: daily` only (`ADR-005` v1.2.0) | `/reports` ✓ (one head since 2026-09-01; `/audits`, `/reportes`, `/corpus/reports` redirect) |
| Agent | `agents/<name>/` | agent name | `/agentes` (pending) |
| Guild | `guilds/` | guild name | `/guilds` (pending) |
| Operation | `operations/` | by subfolder | `/operaciones` (pending) |
| Standard | `standards/` | by document | `/estandares` (pending) |
| Root governance | `/` (README, GOVERNANCE…) | conventional name | `/corpus` catalogue |
| Archive fund | by origin (`archive-*` / dated) | see §3.2 | `/archive` ✓ |

## 3. Names

### 3.1 Operational documents (living)

`<ID>-<slug-in-kebab-case>.md` — example: `MIS-0089-information-architecture.md`,
`P-010-how-to-archive.md`. No spaces, no special characters, no version or
date in the filename (git and the frontmatter already carry them).

**ID assignment with concurrent agents.** The next free ID is computed
against what is COMMITTED after a `git pull`, not the working tree. If two
agents collide, whoever committed first keeps the ID; the second
renumbers theirs and fixes their references. (Rule born from the double
collision MIS-090/MIS-091 on 2026-08-18, resolved by renumbering to
MIS-092/MIS-093.)

### 3.2 Archive funds (frozen artefacts)

Historical documents archived as an artefact — that do not evolve —
keep the inherited convention `YYYY_MM_DD-Title_With_Underscores-vX.Y.Z.md`.
It is the visible mark of "this is a photograph, not a living document."

**A frozen artefact does not enter a registration series** (`MIS-125` ruling,
2026-08-31, below). The dated filename *is* its identifier. Giving it a
series number would assert that a photograph is a living document, which is
the one thing this section exists to deny.

#### 3.2.1 The criterion is the filename shape, not the frontmatter field `[MANUAL]`

A document is a frozen artefact when its **filename** matches the dated
artefact shape of §3.2 above —
`YYYY_MM_DD-Title_With_Underscores-vX.Y.Z.md`. The frontmatter field
`registration_exemption: frozen-artifact` *records* that fact; it does not
constitute it.

This distinction is not pedantry — it is measured. Of the five frozen
artefacts in the corpus at `caf2621`, **three carry the field and two do
not**:

```
canon/2026_04_15-Epistemic_Relations_…-v0.2.0.md      field present
canon/CAN-007-pragmatic-numen-system.md      field present
standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md       field present
protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md  field ABSENT
standards/2026_04_14-Analogous_Terminology_Numina-v0.2.0.md  field ABSENT
```

The two without it are not oversights: both are `status: closed` and carry
`registration_reason: "not part of a numbered series"` — the same ruling in
older words, written before the `frozen-artifact` value existed
(`STD-001` §5.0, 2026-08-25). A guard keyed on the field would have counted
those two as violations and renamed them. **Any check implementing this
section matches the filename shape** — `scripts/telemetry.mjs` (`series.registration`,
`FROZEN_ARTIFACT_RE` in `scripts/lib/corpus.mjs`) and `scripts/rename-series.mjs` both do.

#### 3.2.2 Ruling — `MIS-125`, 2026-08-31: this section prevails over `D-008`

`D-008` v2.0.0's "the 24 exempt documents all enter the scheme, no
exception" swept in these five and assigned them `STD-NNN`/`CAN-NNN`/
`PRO-NNN`. That contradicted this section head-on. **This section wins, on
four grounds, all measured against the repo rather than argued:**

1. **The rename is structurally incomplete** — `STD-001` §5.0.1: *a rename
   whose consumers cannot all be updated is not done.*
   `2026_08_18-Sistema_de_Diseno-v5.1.0.md` is consumed by **`numinia-web`,
   a different repository**, via `design-source.json` (`path` + `sha256`,
   verified there by its own `scripts/check-design-source.mjs` on
   `npm run design:check`), and by the published kit at
   `web/public/diseno/kit/manifest.json`. That consumer is outside this
   repo's reach — exactly the profile that reverted the
   `STD-005-engineering-standards.md` rename in `D-024`.
   **Correction, 2026-08-31 (see §3.2.3):** that pin currently names
   `…-v5.0.0.md`, not `v5.1.0` — it is already stale, per `D-040`. This
   ground therefore rests on the *mechanism* (an out-of-repo pin keyed by
   path) rather than on a pin that a rename would break today. Ground 2 is
   the load-bearing one.
2. **Renaming publishes a broken URL.** `web/src/pages/corpus/[...slug].astro`
   derives every public address from `entry.id`, which the Astro loader
   derives from the filename when the frontmatter declares none. Verified
   against a real `npm run build`: **all five are published at a URL built
   from their filename**, e.g.
   `/corpus/standards/2026_08_18-sistema_de_diseno-v510`. Renaming
   publishes five dead addresses. These are not orphans either: the five
   carry **71 incoming citations across 24 files** (measured 2026-08-31).
   `D-028` is open precisely because nothing manages that lifecycle.
3. **`MIS-125`'s own licence to rename does not extend to them.** The
   mission's §"The prior constraint" permits renaming *because the 13
   descriptive ids have zero incoming citations* — "the rule is not never
   rename; it is never break a reference that exists." **None of these
   five is at zero.** The premise that authorised the renames is false for
   this set.
4. **Two of them are `threshold: sealed`** (`STD-001` §2.1 — both `canon/`
   documents; the other three declare no threshold). Changing a sealed
   document takes the Oracle's signature and an ADR. A bulk prefix pass is
   neither.

#### 3.2.3 Correction notice — 2026-08-31, same day as the ruling

Three factual defects in §3.2.2 as first published, found while
investigating a CI failure and corrected here rather than silently:

| Claimed | Actual | Effect on the ruling |
|---|---|---|
| `check-design-source.mjs` verifies the pin | that script lives in **`numinia-web`**, not this repo; there is no such file here | the guard exists, in the consuming repo — the citation implied it ran here |
| the pin secures `v5.1.0` | `numinia-web/design-source.json` names `…-v5.0.0.md` (`sha256: a075e215…`) | ground 1 weakened: the pin is already stale (`D-040`), so a rename would not break it *today* |
| 59 citations across 27 files | **71 citations across 24 files** | ground 3 unchanged in direction, stronger in magnitude |

The ruling stands. Ground 2 was upgraded from an inference about
`[...slug].astro` to a measurement against built output (5/5 published
under filename-derived URLs), and it alone is sufficient. Ground 1 is
retained for its mechanism, not its current pin.


**Consequences.** The five keep their dated names permanently. `D-008`
removes them from its denominator rather than carrying them as
non-compliance — a frozen artefact at `0/N` is a measurement error, not
debt. `D-024`'s closing checkbox that declared the `P-010`/dated-twin
relation "moot because `MIS-125` registers the twin as `PRO-NNN`" is
withdrawn: the relation is instead declared with `supersedes:`, which is
what that checkbox originally asked for.

**What this ruling does not do.** It does not create a general escape from
registration. It applies to the dated-filename shape and nothing else.
`registration: exempt` on a *living* document remains what `D-008` ruled it
was — an exemption to be removed, not honoured.

### 3.3 Mandatory minimum frontmatter

`id`, `title`, `type`, `status`, `version`, `created`, `updated`,
`license`, `tags`. Normalized optionals: `guild`, `owner`, `author`,
`supersedes`, `review_next`. (The CI guard today only requires `license`;
extending it to the full minimum is MIS-089 F3's job.)

### 3.4 Renaming: a citation may be rewritten, a mention may not

Ruled 2026-08-31 (`MIS-125` Stage C, closes `D-048`). A bulk rename tool
rewrites every occurrence of an old identifier. Not every occurrence means the
same thing, and the difference is not decidable by pattern:

| | What it is | On rename |
|---|---|---|
| **Citation** | a pointer to a document, meant to keep resolving | **rewrite** — that is the point |
| **Mention** | the identifier used *as data*: evidence, a fixed record, or an example | **leave alone** — rewriting it destroys the record |

A mention rewritten as a citation produced four corruptions in one eight-file
run: an SPDX SBOM whose `FileName` no longer matched its own `FileChecksum`, a
CC0 dedication naming files that were never dedicated under those names, a
`status: done` mission's account of what happened, and — twice — a sentence
citing an old id **as the counterexample being discussed**, which the rename
turned into nonsense.

**The rules, in force:**

1. **Dated evidence is never rewritten.** Anything matching the frozen-artefact
   shape of §3.2, plus SBOMs, audit reports, licence dedications and every
   file under `reports/evidence/` (`ADR-005` v1.2.0 rule 5 — the annexes are
   opaque blocks). These
   describe a moment; editing them makes them describe a moment that never
   happened.
2. **A closed record is never rewritten.** `status: done`, `closed`, or
   `superseded` documents are accounts of what was true then, not indexes of
   what is true now.
3. **Everything else is rewritten, and the diff is read.** Not the exit code —
   the diff. `scripts/rename-series.mjs` enforces 1 and 2 automatically and
   prints every refusal; it **cannot** detect case 4, an id used as its own
   counterexample, because that distinction lives in the sentence.

Rule 3 is the expensive one and it is not optional. A rename run whose diff was
not read is not verified, however green the guards are (`STD-001` §10.4).

## 4. Documentary semantic versioning

Inherited from v0.1.12, still in force, but in the frontmatter:

- **Major** — restructuring or non-backward-compatible content change.
- **Minor** — backward-compatible sections or improvements.
- **Patch** — corrections that don't change the meaning.

## 5. Lifecycle

`draft → active → superseded | frozen → archive fund`

**The rule, since `ADR-030 (formerly ADR-033)` (2026-08-31): a document may be deleted when
its consumers are zero or redirected.** Not when its folder has been
granted permission. What follows are the four tests, in the order a
deletion must pass them.

1. **Inbound citations.** Zero, or every citing document is itself a
   closed record (`closed`/`done`/`superseded`/`frozen`). A living
   document pointing at it is a reader; a closed one is history
   describing history.
2. **Public URLs.** Every address the document publishes is redirected in
   the same change. `numinia.org` derives most addresses from a filename
   or a frontmatter `id`, so deleting a document deletes a public
   address — that is `D-028`, open since 2026-08-25, and this test is
   what pays down most of it. Verified by
   `scripts/check-url-lifecycle.mjs` against a real build, never by
   inference.
3. **Written resolution.** A living document records what the deleted one
   said and why it no longer holds. Inherited verbatim from `ADR-030` §3:
   no evidence of resolution, no deletion. **This test is not
   machine-checkable** and is not claimed to be — `scripts/check-deletable.mjs`
   prints the prompt and leaves the judgment where §3.4 put it, in the
   sentence.
4. **Not sealed.** `threshold: sealed` (`STD-001` §2.1) requires the
   Oracle's signature and an ADR whatever the other three say.

Passing 1–4, **a deletion needs no ADR.** The guards are the authority.

### 5.1 What this replaced, and why

Until `ADR-030`, this section answered "may I delete this?" with the
document's **genre**: `debt/` could die (`ADR-030`), `blueprints/` could
die (`ADR-030 (formerly ADR-032)`), everything else could not, and admitting a third series
took its own ADR. That is a permission system indexed on folders. It cost
an ADR per folder, it never checked the thing that actually breaks — the
consumers — and it made every reduction pass through governance to ask
about routing.

Measured at `4879aec`, before the change: the corpus was 323 tracked `.md`
files and 593,774 tokens, of which **106 documents (31.9%) were closed
records** — `closed`, `done`, `superseded` or `frozen`. Those 106
published **287 of the site's 847 public URLs (34%)**. The old rule
protected all of it as memory while the real risk sat in the URL table,
unguarded. Deleting the prohibition alone would have published dead
addresses at scale; that is why `ADR-030` lands the instruments and the
rule in the same change.

The distinction between memory and worklist that `ADR-030` and `ADR-030`
drew was correct in its finding and wrong in its unit. A document is not
preserved because of the folder it sits in. It is preserved because
someone is still reading it.

- **Operational series are dissolved as a category.** `debt/` and
  `blueprints/` stop being privileged: they pass tests 1–4 like everything
  else, and typically pass easily, which is what `ADR-030`/`ADR-030` were
  really observing. Their extinction records stand as history.
- A **superseded** document that still has living citers is not deleted:
  it declares `supersedes`/successor and, once no longer consulted, moves
  to the fund under an artefact name (§3.2). Supersession remains the
  right move whenever test 1 fails.
- **Execution plans are scratch, not memory (`MIS-125`, 2026-08-31).** A
  plan in `.hermes/plans/` — repo-local, never `~/.hermes/` — that governs
  a mission's active execution lives only as long as that execution.
  Once the mission it governs closes: relevant content is summarised into
  that mission's own file (`missions/MIS-NNNN.md`), or, if it describes a
  measurable gap that survives closure, promoted to `debt/`. The plan file
  itself is deleted in the same commit that closes the mission — it never
  remains as evidence outside the versioned corpus. Rationale: a plan is
  working memory for one execution, not a record the corpus should carry
  forward; the mission and, where warranted, `debt/` are that record.
- Review cadence: `review_next` in frontmatter (inherited from v0.1.12's
  "NEXT REVIEW ON"); ISO 15489 inspections (MIS-067) audit it.

### 5.2 What the tests do not see

`D-025` applies to a protocol as much as to a guard. Test 1 counts a
substring match, so it cannot tell a **citation** from a **mention**
(§3.4) — it errs toward refusing, which is the safe direction, but a
document whose only citer names it as evidence will read as blocked. Test
1 also scans `.md` only: a reference from `.astro` or `.ts` is invisible
to it and is caught, if at all, by `npm run build`. Test 2 verifies that
an address still resolves, not that the page it now reaches answers the
question the old one did — a 301 to a section index satisfies the guard
and still loses the content. No test sees a consumer outside this
repository (`D-024`'s cross-repo pin is the standing example). Each guard
prints these on every run.

## 6. Compliance

- **ISO 15489** (records management) as the inspections' framework —
  MIS-067.
- The `/corpus` catalogue is the living inventory (succeeds v0.1.12's
  tree-in-Excel); zero silent exclusions.
- CI guard: today licence-frontmatter, frontmatter-yaml, references,
  delimiter, header lint, naming lint; plus, since `ADR-030`, the
  deletion pair — `check-url-lifecycle.mjs` (no public address dies
  unredirected, `D-028`) and `check-deletable.mjs` (§5 tests 1 and 4).
  Future candidates: minimum-frontmatter lint (MIS-089 F3).

## 7. What is inherited and what is discarded from v0.1.12 / v0.2.0

**Lives on:** documentary semver (§4) · filename character rules (§3) ·
limited depth (§1.6) · one-source-by-link (§1.2) · lifecycle and
disposition (§5) · review cadence (§5) · ISO framework (§6) · agent
onboarding (already embodied in P-002).

**Discarded (today's criterion prevails):** folders by guild → folders by
type + `guild:` in metadata · version and date in operational filenames →
frontmatter + git · tree exported to Excel for Adonaz → `/corpus`
catalogue generated at build · Drive encryption/MFA/roles → repo
visibility + Oracle signatures (C-005: what is public is a living license
offer) · monthly in-person training → protocols P-002/P-007 executable by
agents.

## Change history

- v0.8.3 (2026-09-02) — §3.2.1 names the live implementers of the filename-shape rule (`scripts/telemetry.mjs`; `count-evidence.py` retired, `MIS-138`). Rule unchanged.
- v0.8.2 (2026-09-02) — §3 example filename follows the missions/ rename (`MIS-0089-…`); the rule itself is unchanged.
- v0.8.1 (2026-09-02) — §2 web column for `reports/`: the "hardcoded today —
  MIS-065" debt is paid; `/reports` renders from the collection and is the
  only head (`web/reports-single-source`).
- v0.8.0 (2026-09-01) — `ADR-005` v1.2.0, `reports/` normalisation. §2: the
  two `reports/` rows (`RPT-YYYY-MM-DD` daily, `AUD-YYYY-MM-DD-<slug>` audit)
  collapse into one — `RPT-NNN`, date form for dailies only — matching the
  register instead of contradicting it. §1.6: examples updated for the flat
  folder; the evidence annex gains its declared depth exception. §3.4 rule 1
  names `reports/evidence/` explicitly, the gap through which `MIS-125` bug 6
  reached an SBOM.
- v0.7.0 (2026-08-31) — `ADR-030`, `MIS-127`. §5 is rewritten: deletion is
  decided by **consumers**, not by folder genre. The four tests (inbound
  citations, public URLs, written resolution, not sealed) replace the
  "operational series" permission scheme, which is dissolved as a
  category — `debt/` and `blueprints/` stop being privileged and pass the
  same tests as everything else. Passing them, a deletion no longer needs
  an ADR. Two instruments land with the rule: `check-url-lifecycle.mjs`
  (pays `D-028` — verified by deleting a real document against a real
  build, where `npm run build` stayed green while losing two pages) and
  `check-deletable.mjs`. New §5.1 records what was measured at `4879aec`:
  106 closed documents, 31.9% of the corpus, publishing 34% of the site's
  public URLs. New §5.2 declares what the tests cannot see (`D-025`).
  `D-028` goes to three of four conditions met, severity medium → low —
  not closed.
- v0.6.0 (2026-08-31) — `MIS-125`. §3.4: a citation may be rewritten, a
  mention may not; the rules that close `D-048`.
- v0.5.0 (2026-08-31) — `MIS-125`. §3.2 gains the ruling that settles its
  own conflict with `D-008` v2.0.0: a frozen artefact does not enter a
  registration series, and the criterion is the **filename shape**, not the
  `registration_exemption` field (§3.2.1 — measured: 2 of the 5 artefacts
  carry the shape without the field). Grounds in §3.2.2, each verified
  against the repo: a cross-repo consumer outside this repo's reach
  (`STD-001` §5.0.1), public URLs derived from filenames (`D-028`), 59
  incoming citations that falsify `MIS-125`'s own zero-citation premise for
  this set, and two `threshold: sealed` documents. The H1 also dropped a
  stale "(v0.3.0)" it had carried since v0.4.0 — form, not substance.
- v0.4.0 (2026-08-31) — `MIS-125`. §5 gains the execution-plan lifecycle
  rule: a `.hermes/plans/` file is scratch for one mission's active
  execution and is deleted in the same commit that closes the mission,
  its relevant content summarised into the mission or promoted to `debt/`.
- v0.3.0 and earlier — see git history; no changelog was kept before this
  entry.
