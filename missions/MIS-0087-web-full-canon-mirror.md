---
id: "MIS-087"
uid: ""
title: "The complete mirror: every canon .md navigable on numinia.org"
status: done
priority: "medium"
effort: "L"
guild: "Exegetes"
territory: "TBA"
type_execution: "digital"
assigned_to: "numinia-nwos"
completed: "2026-08-18"

type: mission
version: "1.1.0"
created: "2026-08-18T09:11:14Z"
created_source: "git:90269f6"
created_confidence: exact
updated: "2026-08-27T22:05:37Z"
author: "claude-fable-5"
owner: "oracle"
requested_by: "oracle"
tags: [web, viewer, canon, mirror]
license: "CC0-1.0"

depends_on: []
---
# MIS-087 — The complete mirror: every canon .md navigable on numinia.org

> **Summary:** Every .md document in the repo (outside `web/`) gains its
> rendered page on numinia.org, so biological agents decide by reading the
> canon on the web, without opening GitHub.
> **Epistemic:** Which parts of the canon were invisible and why.
> **Pragmatic:** Better-informed decisions: the entire corpus navigable,
> with visible frontmatter and download of the canonical .md.
> **Audience:** numinia-nwos agent · Oracle · Biological agents

---

**Area:** Viewer / numinia.org
**Guild:** Exegetes
**Type:** digital
**Priority:** medium
**Effort:** L

---

## Story

As a biological agent of the system, I want to navigate ALL the repo's .md
documents on numinia.org with their frontmatter visible, to make informed
decisions without depending on GitHub or the filesystem.

---

## Verified premises (2026-08-18)

- .md inventory outside `web/`: agents/ 21 · blueprints/ 24 · canon/ 14 ·
  decisions/ 9 · guilds/ 8 · missions/ 87 · operations/ 10 · protocols/ 11 ·
  reports/ 13 · standards/ 2 · root 10 (~209 total).
- The viewer today mirrors only: missions, reports/audits, decisions,
  blueprints and the archive lore (`content.config.ts`, MIS-066 pattern:
  glob loader at build, the folder is the source).
- Invisible today: agents/, canon/ (except lore), guilds/, operations/,
  protocols/, standards/, non-audit reports/ and the root .md files.
- The repo is PUBLIC — mirroring exposes nothing new, but the mirror must
  respect the per-file regime: reserved content is shown "display only"
  (canonLore precedent, C-005 §5); each .md's license is in its frontmatter
  and in REUSE.toml.
- The detail pattern is already solved: rendered page + raw .md endpoint +
  DocToolbar (copy/download), as in audits and missions.

## Design decisions to make (not resolved here)

- Route structure: one generic `/canon/[dir]/[id]` collection or one route
  per directory? Frontmatter schemas vary per folder — the loader needs a
  lax schema (`passthrough` with common minimums).
- Index: a page listing the full corpus grouped by directory, with
  state/version, linked from the navigation.
- Exclusions: none silent. If something is excluded (e.g. TEMPLATE.md), the
  exclusion list is explicit on the index page.

---

## Acceptance criteria

- [ ] Every .md in the repo outside `web/` has a rendered page on
      numinia.org with its key frontmatter visible (id, title, state,
      version, license) and a raw `.md` endpoint with DocToolbar.
- [ ] Full-corpus index page, grouped by directory, linked from the site's
      navigation.
- [ ] Explicit, listed exclusions; zero silent exclusions.
- [ ] The per-file regime is respected: reserved files are shown
      display-only without asserting an open license (C-005 §5).
- [ ] License guard and build green; deploy verified live.

---

## Epistemic value

The corpus stops having dark zones: we will know which documents exist, in
what state, and who owns them, from any browser.

## Pragmatic value

Biological agents decide with the canon in front of them; digital ones link
canonical URLs instead of filesystem paths.

---

## Execution log

- 2026-08-18 — `corpus` collection in `content.config.ts`: multi-pattern
  glob with negations for single ownership per file (the MIS-*/DEC-*/ADR-*/
  BP-*/audits stay in their typed collections; deliberate exception:
  `canon/archive-lore.md` — data in canonLore, page in corpus).
- 2026-08-18 — `/corpus/[...slug]` (detail page with frontmatter chips and
  DocToolbar) + `/corpus/[...slug].md` (raw endpoint) + `/corpus` (index:
  211 documents grouped by directory, explicit exclusions at the foot).
  "Corpus" entry in the navigation (Sistema).
- 2026-08-18 — Deployed and verified live.

---

## Execution Reality

- **Technology/approach used:** the planned approach (glob loader + generic
  pages, MIS-066 pattern) served without architecture changes.
- **Why it diverged:** two real-world surprises: (1) the corpus's
  frontmatter is wild — `agents/_template/STATUS.md` declares `status:` as
  an object, so the typed schema was replaced by full `passthrough` with
  type-guards in the pages; (2) the glob loader maps `INDEX.md` to the
  directory's id ("agents/INDEX.md" → "agents"), which grouped section
  indexes as root files — the group now derives from `filePath`.
- **Key learning:** a total mirror cannot assume schema: validate the
  minimum, guard types when rendering, and derive the structure from the
  filesystem (filePath), not from sluggified ids.
- **Closing date:** 2026-08-18
- **Executing agent:** claude-fable-5 (numinia-nwos)

> *"The ideal plans show the intention. The real plans show the knowledge."*
