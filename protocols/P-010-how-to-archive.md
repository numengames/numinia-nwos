---
id: "P-010"
title: "How to Archive — the NWOS archival protocol"
type: protocol
status: draft
version: "0.5.0"
created: "2026-08-18T10:51:09Z"
created_source: "git:9f25053"
created_confidence: exact
updated: "2026-08-31T14:20:00+02:00"
author: "claude-fable-5"
owner: "oracle"
tags: [protocols, archive, taxonomy, naming, iso-15489]
license: "CC-BY-4.0"
supersedes: "protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md"
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
6. **Limited depth.** Maximum two levels under root (`reports/daily/`,
   `operations/legal/`). Inherited from v0.1.12 and still in force.

## 2. Taxonomy: type → folder → ID → web section

| Type | Folder | ID scheme | Web section |
|---|---|---|---|
| Canon | `canon/` | `C-XXX` | `/canon` (pending, MIS-089 F2) |
| Mission | `missions/` | `MIS-XXX` | `/missions` ✓ |
| Decision | `decisions/` | `DEC-XXX` / `ADR-XXX` | `/decisiones` ✓ |
| Blueprint | `blueprints/` | `BP-<slug>` | `/planos` ✓ |
| Protocol | `protocols/` | `P-XXX` | `/protocolos` (pending) |
| Daily report | `reports/daily/` | `RPT-YYYY-MM-DD` | `/reportes` (hardcoded today — MIS-065) |
| Audit | `reports/audits/` | `AUD-YYYY-MM-DD-<slug>` | `/audits` ✓ |
| Agent | `agents/<name>/` | agent name | `/agentes` (pending) |
| Guild | `guilds/` | guild name | `/guilds` (pending) |
| Operation | `operations/` | by subfolder | `/operaciones` (pending) |
| Standard | `standards/` | by document | `/estandares` (pending) |
| Root governance | `/` (README, GOVERNANCE…) | conventional name | `/corpus` catalogue |
| Archive fund | by origin (`archive-*` / dated) | see §3.2 | `/archive` ✓ |

## 3. Names

### 3.1 Operational documents (living)

`<ID>-<slug-in-kebab-case>.md` — example: `MIS-089-information-architecture.md`,
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
canon/2026_04_15-Pragmatic_Numen_System-v0.2.0.md      field present
standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md       field present
protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md  field ABSENT
standards/2026_04_14-Analogous_Terminology_Numina-v0.2.0.md  field ABSENT
```

The two without it are not oversights: both are `status: closed` and carry
`registration_reason: "not part of a numbered series"` — the same ruling in
older words, written before the `frozen-artifact` value existed
(`S-001` §5.0, 2026-08-25). A guard keyed on the field would have counted
those two as violations and renamed them. **Any check implementing this
section matches the filename shape** — `scripts/count-evidence.py` and
`scripts/rename-series.mjs` both do.

#### 3.2.2 Ruling — `MIS-125`, 2026-08-31: this section prevails over `D-008`

`D-008` v2.0.0's "the 24 exempt documents all enter the scheme, no
exception" swept in these five and assigned them `STD-NNN`/`CAN-NNN`/
`PRO-NNN`. That contradicted this section head-on. **This section wins, on
four grounds, all measured against the repo rather than argued:**

1. **The rename is structurally incomplete** — `S-001` §5.0.1: *a rename
   whose consumers cannot all be updated is not done.*
   `2026_08_18-Sistema_de_Diseno-v5.1.0.md` is pinned by **`numinia-web`,
   a different repository** (`design-source.json`, `path` + `sha256`,
   verified by `check-design-source.mjs` on `npm run design:check`) and by
   the published kit at `web/public/diseno/kit/manifest.json`. That
   consumer is outside this repo's reach — exactly the profile that
   reverted the `engineering-standards.md` rename in `D-024`, and exactly
   the failure `D-040` is still open about.
2. **Renaming publishes a broken URL.** `web/src/pages/corpus/[...slug].astro`
   derives every public address from the filename. These are not orphans:
   the five carry **59 incoming citations across 27 files** (measured, not
   assumed). `D-028` is open precisely because nothing manages that
   lifecycle.
3. **`MIS-125`'s own licence to rename does not extend to them.** The
   mission's §"The prior constraint" permits renaming *because the 13
   descriptive ids have zero incoming citations* — "the rule is not never
   rename; it is never break a reference that exists." **None of these
   five is at zero.** The premise that authorised the renames is false for
   this set.
4. **Two of them are `threshold: sealed`** (`S-001` §2.1 — `canon/`).
   Changing a sealed document takes the Oracle's signature and an ADR. A
   bulk prefix pass is neither.

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

## 4. Documentary semantic versioning

Inherited from v0.1.12, still in force, but in the frontmatter:

- **Major** — restructuring or non-backward-compatible content change.
- **Minor** — backward-compatible sections or improvements.
- **Patch** — corrections that don't change the meaning.

## 5. Lifecycle

`draft → active → superseded | frozen → archive fund`

- A **superseded** document is not deleted: it declares
  `supersedes`/successor and, once no longer consulted, moves to the fund
  under an artefact name (§3.2).
- **Deletion** only for exact verified duplicates (clean diff), logged in
  the mission that orders it.
- **Operational series are the exception (ADR-030, 2026-08-30; extended
  by ADR-032, 2026-08-31):** series declared operational — today
  `debt/` and `blueprints/` — extinguish on close: the
  entry is deleted once its resolution is written in the ADR, mission or
  report that closed it. Git keeps the text. This rule stays intact for
  canon, standards, decisions and every memory series.
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

## 6. Compliance

- **ISO 15489** (records management) as the inspections' framework —
  MIS-067.
- The `/corpus` catalogue is the living inventory (succeeds v0.1.12's
  tree-in-Excel); zero silent exclusions.
- CI guard: today license-frontmatter; future candidates: name lint and
  minimum-frontmatter lint (MIS-089 F3).

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

- v0.5.0 (2026-08-31) — `MIS-125`. §3.2 gains the ruling that settles its
  own conflict with `D-008` v2.0.0: a frozen artefact does not enter a
  registration series, and the criterion is the **filename shape**, not the
  `registration_exemption` field (§3.2.1 — measured: 2 of the 5 artefacts
  carry the shape without the field). Grounds in §3.2.2, each verified
  against the repo: a cross-repo consumer outside this repo's reach
  (`S-001` §5.0.1), public URLs derived from filenames (`D-028`), 59
  incoming citations that falsify `MIS-125`'s own zero-citation premise for
  this set, and two `threshold: sealed` documents. The H1 also dropped a
  stale "(v0.3.0)" it had carried since v0.4.0 — form, not substance.
- v0.4.0 (2026-08-31) — `MIS-125`. §5 gains the execution-plan lifecycle
  rule: a `.hermes/plans/` file is scratch for one mission's active
  execution and is deleted in the same commit that closes the mission,
  its relevant content summarised into the mission or promoted to `debt/`.
- v0.3.0 and earlier — see git history; no changelog was kept before this
  entry.
