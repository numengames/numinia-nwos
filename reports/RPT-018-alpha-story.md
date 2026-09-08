---
id: "RPT-018"
uid: ""
title: "The Alpha story: what missions/ ships while it is the alpha board"
type: report
subtype: analysis
status: active
version: "0.1.0"
created: "2026-09-08T20:30:00Z"
created_source: "git:4a60735"
created_confidence: exact
updated: "2026-09-08T20:30:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
tags: [alpha, narrative, missions, compression]
license: "CC-BY-4.0"
visibility: "public"
scope: "Every mission closed while `missions/` is the alpha board, recorded here at closure and deleted from `missions/` under ADR-040. The MVP's story is `RPT-017`; this one starts where it stops."
related: ["RPT-017", "ADR-030", "ADR-040", "PRO-003", "MIS-127"]
absorbs: []
---

# The Alpha story: what `missions/` ships while it is the alpha board

> **Summary:** `RPT-017` closed the MVP: 115 missions compressed into one
> narrative and deleted. From `4a60735` (2026-09-08) `missions/` holds only
> the 18 cards that ship the numinia-nwos alpha. Each one that closes is
> recorded **here**, in a dated line, and deleted the same day — the
> anti-inflation mechanism `ADR-040` made lawful, applied at the cadence
> of one report per phase.
> **Epistemic:** what was done, in the words the closure used, with the
> commit that proves it. No card survives its closure; this line does.
> **Pragmatic:** `absorbs:` in this header is where the deleted
> identifiers resolve, and where `/missions/mis-NNN` redirects.

## How this report grows

One line per closed mission, appended at closure. The line carries the
identifier, the title, what was done in one sentence, and the commit or
PR that proves it. Nothing above a line is rewritten when a new one
lands. When the Oracle declares the alpha shipped, this report is
versioned as its record and the next phase opens its own report.

## Board at the start

18 missions at `4a60735`: `in-progress` 121, 127, 135, 142, 146, 151;
`todo` 096, 100, 101, 112, 113, 123, 124, 131, 134, 149, 150, 153.

## Closed

_(none yet — the first closures of the alpha board are recorded in the
PR that creates this report; see the version history.)_

---

## Version history

- v0.1.0 (2026-09-08) — created as the destination for alpha-board
  closures, so `RPT-017` stops growing.
