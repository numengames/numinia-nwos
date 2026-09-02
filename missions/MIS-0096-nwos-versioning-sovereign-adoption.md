---
id: "MIS-096"
uid: ""
title: "NWOS gets versioned and organizations adopt: sovereignty with offered updates"
status: todo
priority: "high"
effort: "L"
guild: "Procurators"
territory: "TBA"
type_execution: "digital"
assigned_to: null
completed: null

type: mission
version: "1.2.0"
created: "2026-08-18T14:59:25Z"
created_source: "git:e175657"
created_confidence: exact
updated: "2026-09-02T10:01:10+02:00"
author: "claude-fable-5"
owner: "oracle"
requested_by: "oracle"
tags: [nwos, governance, versioning, sovereignty, propagation]
license: "CC0-1.0"

requires_oracle_approval: true
depends_on: ["MIS-068"]
---
# MIS-096 — NWOS gets versioned and organizations adopt

> **Summary:** Today the original NWOS has no version and its propagation
> leans on the fork relationship: whoever generates their workspace
> «receives» the document and is expected to sync. That denies the derived
> repo's sovereignty (G-12, CON-006). This mission versions the original
> NWOS and defines the adoption model: we publish versions, the
> organization decides.
> **Epistemic:** What NWOS's unit of version is and what «being on v.X»
> means for a sovereign organization.
> **Pragmatic:** An organization can know which version it is on, what is
> new, and decide whether to upgrade — without anyone pushing anything.
> **Audience:** Oracle · Agents of every NWOS repo

**Type:** digital · **Priority:** high · **Effort:** L

## Story

As an organization that has created its NWOS repository, I want to know
which version of the original NWOS I am on and what the next one brings, so
I decide whether to update — without any law entering my repo by
inheritance.

## The error that originates it (verified 2026-08-18)

`standards/STD-005-engineering-standards.md` declares in its header and in §7.1
that numinia-nwos and «any workspace generated from the mould» are
*downstream forks* that **receive the document through the fork
relationship**, leaving the sync mechanism as an open decision. From that
it follows, without saying so, that what is written upstream binds
downstream. Two problems:

1. **Sovereignty** (G-12): an organization with its NWOS repo does not
   receive law by lineage. It is **offered** a version.
2. **Provenance** (CON-003, open): the document claims numinia-nwos is a
   fork of the mould when numinia-nwos **is the source**.

The correct doctrine was already written for another artifact — **G-11**,
the canon is pinned, not copied (Design System, MIS-094) — and had not
been applied to the standards themselves.

## Questions this mission must answer

1. **What is the versioned unit?** The whole mould
   (`nwos-workspace-template`), the standards document, or a declared
   «NWOS core» (protocols + standards + templates)?
   *Recommendation:* an explicit **NWOS core** with its manifest — it is
   what an organization adopts, and it avoids versioning loose prose.
2. **Where does the number live?** Semver in a core `nwos.json`, published
   with a digest (the design kit's pattern, MIS-094).
3. **How does an organization declare its version?** A pinning file in its
   repo (`nwos-source.json`, analogous to numinia-web's
   `design-source.json`) with version + digest + adoption date.
4. **What does the tool do when there is a new version?** It notifies and
   shows the diff/changelog. It **never** fails someone else's build for
   not being current (G-12); MIS-068's drift guard is reformulated: it
   detects and reports, it does not compel.
5. **And deliberate divergences?** An organization may stay behind or step
   aside: that is **declared**, not corrected. The format of that
   declaration, to be defined.

## Acceptance criteria

- [ ] «NWOS core» defined: which artifacts compose it, listed from the
      repo's reality, not from memory.
- [ ] Semver version + manifest with digest published at a stable URL.
- [ ] Pinning format (`nwos-source.json`) specified and applied in at
      least one real consumer repo as proof.
- [ ] Core changelog in adoption language: what changes, what binds
      (within that version) and what can be ignored.
- [ ] MIS-068 folded here (2026-09-02, frozen `cancelled`): its two surviving
      criteria are the next two. The premise «consumer repos never drift» is
      withdrawn (G-12): the guard **reports** drift, it never forbids it.
- [ ] Inventory: which artifacts propagate (CAN-005 §9 fragment, the four
      protocols, STD-005), from the tree, with the consumer copies located —
      the measurement MIS-060 §Full diagnosis made by hand on 2026-04-07.
- [ ] A reusable guard exists that any consumer repo can run in CI and that
      numinia-nwos runs on its own internal copies; it reports, it does not
      fail the consumer's build.
- [ ] Upstream ADR correcting §7.1 (authority by fork → adoption by
      version) and CON-003's provenance.
- [ ] `GOVERNANCE.md` G-12 referenced from the mould's CLAUDE.md.

## Epistemic value

It separates two things the system conflated: **where a document comes
from** (lineage) and **who rules a repo** (sovereignty). Lineage explains;
it does not bind.

## Pragmatic value

An organization can adopt NWOS without fear of its repo changing through
someone else's decisions, and we can publish improvements without
negotiating with each one.

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

- **Evidence:** Reformulation target of MIS-068 (G-12). 0/7. No NWOS core manifest, no nwos-source.json anywhere (grep: 0). 8 citations (5 files). Depends on MIS-068.
- **Recommendation:** Keep todo as the parent of the propagation question; absorb MIS-068's two open criteria (see MIS-068). This is the mission the sovereignty principle needs; it should be the one that survives.

## Version history

- v1.1.0 (2026-09-02) — inline attribute line removed (the frontmatter is the only source of guild/territory/priority/effort, STD-004); import-era `---` rules removed; §Status check added (evidence + recommendation; status unchanged). missions/ normalisation, lot 3.

- v1.2.0 (2026-09-02) — MIS-068 folded in: criterion 5 rewritten, two criteria added (inventory; reporting guard). Proposed in #199; the Oracle signs by merging.