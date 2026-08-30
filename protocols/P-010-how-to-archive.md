---
id: "P-010"
title: "How to Archive — the NWOS archival protocol"
type: protocol
status: draft
version: "0.3.0"
created: "2026-08-18T10:51:09Z"
created_source: "git:9f25053"
created_confidence: exact
updated: "2026-08-27T14:42:33Z"
author: "claude-fable-5"
owner: "oracle"
tags: [protocols, archive, taxonomy, naming, iso-15489]
license: "CC-BY-4.0"
supersedes: "protocols/2026_04_14-Read_Me_How_to_Archive-v0.2.0.md"
review_next: "2027-02-18"
---
# P-010 — How to Archive (v0.3.0, draft)

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
