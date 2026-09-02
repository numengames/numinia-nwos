---
id: "MIS-095"
uid: ""
title: "Every web publishes its Updates: the evolution, readable by humans"
status: todo
priority: "medium"
effort: "M"
guild: "Procurators"
territory: "TBA"
type_execution: "digital"
assigned_to: null
completed: null

type: mission
version: "1.1.0"
created: "2026-08-18T14:46:58Z"
created_source: "git:64704cf"
created_confidence: exact
updated: "2026-09-02T01:51:14+02:00"
author: "claude-fable-5"
owner: "oracle"
requested_by: "oracle"
tags: [standards, web, updates, changelog, practice]
license: "CC0-1.0"

requires_oracle_approval: true
depends_on: []
---
# MIS-095 — Every web publishes its Updates

> **Summary:** `numinia.com/updates` exists, works, and nobody asked for it
> in writing: no system document requires a public evolution page. This
> mission turns that de facto practice into a signed practice — proposed
> upstream to `engineering-standards` — and deploys it to the webs that do
> not have it yet.
> **Epistemic:** What separates an internal CHANGELOG from a public Updates
> page, and why both are needed.
> **Pragmatic:** Anyone — Oracle, client, new agent — sees where each web is
> heading without opening git.
> **Audience:** Oracle · Each web's agents

**Type:** digital · **Priority:** medium · **Effort:** M

## Story

As an Oracle, I want every web to publish its version history in human
language, so I can review how each thing evolves without reading commits or
asking an agent.

## Verified premises (2026-08-18)

**No document specifies it.** The closest, and none covers it:

| Source | What it covers | Why it is not enough |
|---|---|---|
| `standards/STD-005-engineering-standards.md` **ARC-06** | conventional commits, semver tags, GitHub Releases with notes | Internal GitHub artifact; it is not a product page and does not speak the reader's language |
| **PM-04** | `CHANGELOG.md` or releases generated from commits | A repo file, written for code readers |
| **PM-05** | roadmap/TODO as a file in the repo | Looks forward, not back |
| **MIS-010** (done) | public Numinia roadmap on numengames.com | Promises, not deliveries |
| This repo's `CHANGELOG.md` | the archive's real history | No semver versions and no web surface |

**The reference implementation already exists** — `numinia.com/updates`
(built by the numinia-web agent): a descending version timeline (today
v0.47.0 … v0.39.x), each version with the **real date of the sealing
commit** (no invented times), **mission/ADR chips** that the version closes,
and typed `NEW` / `FIX` / `UPD` entries written in prose for humans; above,
an **Incoming** section fed from the roadmap. Data as a first-class module
(`lib/updates.ts`), old history parsed from a ported changelog.

## What this mission proposes

### 1. The practice

> **Design correction (Oracle, 2026-08-18 — CON-006, rule G-12).** The first
> draft of this mission proposed writing PM-06 upstream «para que aplique a
> todas las webs». That is exactly the error to watch for: **an organization
> with its own NWOS repository is sovereign** — it does not receive law by
> fork relationship. The correct way: the practice is published in a
> **version** of the standard and each organization **decides to adopt it**.
> Within Numen Games, the Oracle signs the adoption, repo by repo.

The local file remains an immutable copy (CLAUDE.md §standards): the
practice's wording goes upstream via ADR + PR **as a proposal for the
mould's next version**, not as a descending mandate. Proposed text:

> **PM-06 · Public Updates page** — Every product with a web surface
> publishes `/updates`: a descending version timeline, each entry with its
> semver version, the **real sealing date** (from the commit, never
> invented), the **mission/ADR ids** it closes and typed entries
> (`NEW`/`FIX`/`UPD`) **in user language, not commit language**. The page
> derives from the repo's CHANGELOG/releases (PM-04) — it is not maintained
> by hand in parallel. Level: **SHOULD** for internal surfaces, **MUST** for
> public product **of the organization adopting this version of the
> standard** (G-12: adoption is sovereign). Check: `[AUTO: presence check
> de /updates en el build]` + `[MANUAL: revisión de que las entradas están
> en prosa]`.

### 2. The parcel-by-parcel deployment

| Web | State | Who |
|---|---|---|
| numinia.com | ✅ reference implementation | numinia-web (done) |
| **numinia.org** | ❌ does not exist | numinia-nwos (this mission, phase 2) |
| numengames.com | ❌ to verify | separate mission, its agent |
| pablofm.com | ❌ to verify | separate mission, its agent |

### 3. Decisions needing the Oracle's signature

1. **numinia.org versioning.** This repo has no semver releases: its
   `CHANGELOG.md` groups by date and mission. Options: (a) start sealing
   semver versions of the viewer (`web/package.json` is at 0.0.1),
   (b) publish `/updates` grouped by date/mission without semver.
   *Recommendation: (a)* — per-version sealing is what makes the page
   comparable across webs, and there is already material (MIS-086→095 in
   one day).
2. **Language.** numinia.com publishes in 5 locales; numinia.org is mixed
   es/en. Recommendation: follow each web's language, without hand-
   translating what will not be maintained.
3. **PM-06's level** (SHOULD vs MUST) per surface — the proposal already
   distinguishes it; confirm.

## Acceptance criteria

- [ ] ADR drafted and PR opened upstream with PM-06 **as a proposal for the
      mould's next version** (or a signed rejection); no external repo is
      bound by the merge (G-12).
- [ ] `numinia.org/updates` live, derived from the repo's CHANGELOG, with
      version, real date, mission chips and prose entries.
- [ ] This repo's `CHANGELOG.md` aligned with the schema (sealed versions,
      not just `[Unreleased]`).
- [ ] Missions opened for the remaining webs (numengames.com, pablofm.com)
      in their parcels, pointing at this practice.
- [ ] The practice referenced in the local `STANDARDS.md` as adopted.

## Epistemic value

It distinguishes two artifacts that get confused: the CHANGELOG (for code
readers) and the Updates (for product users). The same truth, two tongues.

## Pragmatic value

One place per web to see what was delivered and when — without opening git,
without asking, and comparable across products.

## Execution log

*(Fill when completing the mission)*

## Execution Reality

*(Fill when closing the mission — the real plans vs the ideal plans)*

- **Technology/approach used:** (vs what was planned)
- **Why it diverged:** (what challenge modified the path)
- **Key learning:** (the knowledge that lives in that gap)
- **Closing date:** YYYY-MM-DD
- **Executing agent:** (name / agent-id)

> *"The ideal plans show the intention. The real plans show the knowledge."*

## Status check — 2026-09-02

*Read against `8907a56` during the missions/ normalisation (lot 3). Recorded, not decided: `done` and `frozen` are the Oracle's (PRO-003 §2).*

- **Evidence:** numinia.org/updates does not exist (0 pages, 0 URLs in baseline); CHANGELOG.md exists and is maintained; the ADR upstream (PM-06) not drafted. Design correction by the Oracle 2026-08-18 (G-12: proposal, not mandate). 5 citations.
- **Recommendation:** Keep todo; well-defined and cheap on this repo (a /updates page from CHANGELOG.md is the MIS-066 pattern). The 'missions for the other webs' criterion is out of this repo's hands — drop it or mark it Oracle-owned.

## Version history

- v1.1.0 (2026-09-02) — inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 3.
