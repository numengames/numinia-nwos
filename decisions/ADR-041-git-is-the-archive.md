---
id: "ADR-041"
uid: ""
title: "Git is the archive: a retired document is deleted, and no series is append-only"
type: adr
status: active
version: "1.0.0"
created: "2026-09-08T17:30:00Z"
updated: "2026-09-08T17:30:00Z"
author: "ursa"
owner: "oracle"
deciders: ["oracle"]
guild: "Alchemists"
territory: "Archive"
tags: [lifecycle, deletion, retention, entropy, alpha-reset, history]
amends: ["STD-001", "STD-002", "STD-009", "PRO-003", "PRO-010"]
related: ["ADR-030", "ADR-040", "MIS-127", "MIS-146"]
license: "CC-BY-4.0"
---

# ADR-041 — Git is the archive

> **Summary:** Every retention rule that kept text alive after it stopped
> deciding anything is withdrawn. A retired document is deleted when it passes
> the four tests of `PRO-010`; git is the only history; no series is
> append-only; no document keeps a log of its own amendments.
> **Epistemic:** The corpus was inflationary by construction — every cut was a
> move, and no move reduces.
> **Pragmatic:** Delete. Cite the commit, not a copy.
> **Audience:** Agents · Oracles

---

## 1. Context

The refoundation (`MIS-146`) measured its own effect three times and it was
positive every time: licensing moved 1,924 words out of canon and the corpus
grew by 3,681; precedence batch 1 grew the pair by 204; batch 2 by 174. Each
cut was a *movement* — into `history/`, into an amendment note, into a decision
record — because five rules in six documents forbade the only operation that
reduces:

- `STD-002` — *"nothing in `history/` is ever deleted, by anyone, at any
  state"*, stated twice; and G-05, *"nobody deletes a done mission or a
  decision"*, which `ADR-040` contradicted on 2026-09-08 without touching it.
- `STD-001` — `decisions/` and `debt/` *append-only, never deleted*;
  `reports/` corrected only by a new report.
- `PRO-010` — lifecycle ending in an *archive fund*.
- `PRO-003` — a cancelled mission *never deleted*.
- `STD-009` — `CORE-40`, a restatement of `AUT-008`.
- Two standards carrying *Amendment* sections (647 words of log) that the
  standards template itself forbids.

`history/` held seven files, 108 KB, every one of them also in `git log`.

## 2. Decision

**A retired document is deleted.** The exit is the same for every series:
the four tests of `PRO-010` — no living citer, every public address
redirected, a written resolution in a living document, not sealed. Passing
them, a deletion needs no decision record.

**Git is the only history.** `history/` is removed. No folder, series or
document is append-only. A superseded record stays only while a living
document cites it; then it goes.

**Correction happens in place.** A published report or a closed mission is
corrected where it stands, with a dated note and a version bump — not by a
successor document. Dated evidence under `reports/evidence/` is the one
exception: it describes a moment and is not edited.

**A standard carries no log of itself.** `PRE-004` — a later ruling names
what it overrides — is satisfied by the commit message and, when the change
is a major, by the decision record. Amendment sections inside a normative
document are removed and not written again.

**A broken reference inside a closed record is a photograph (`CIT-053`).**
`check-references.mjs` no longer walks `done`, `closed`, `superseded`,
`withdrawn` or `frozen` documents as citers. They remain indexed, so a living
document citing them still resolves.

Binding from merge. Amends `STD-001`, `STD-002`, `STD-009`, `PRO-003`,
`PRO-010`, `templates/ADR-TEMPLATE.md` and `AGENTS.md` in the same change.

## 3. Consequences

- The counter can go down. Every phase of the alpha reset is measured in
  words of corpus and must reduce them.
- Recovering a deleted text is `git log --follow -- <path>` on the last commit
  that held it. That is one command, and it does not age.
- A closed mission with a dead link is no longer a defect and no longer a
  baseline entry. The baseline is for living documents.
- Canon pointers to `history/` (`CAN-001`, `CAN-002`, `CAN-004`) are
  rewritten to cite this record. Canon is sealed; this decision is the record
  `AUT-006` requires.

## 4. Alternatives

- **Keep `history/` with a deletion exit.** Rejected: a second archive next
  to git is a copy, and `GIT-049` forbids copies.
- **Supersede, never delete** (the instruction under which `MIS-146` ran).
  Rejected by measurement: it produced growth in every batch.

## 5. Status

`active`. Ruled by the Oracle on 2026-09-08 with the alpha reset.
