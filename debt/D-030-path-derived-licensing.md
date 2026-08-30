---
id: "D-030"
uid:
title: "Should the licence regime derive from the path? — open question"
type: documentation
status: open
version: "1.1.0"
created: "2026-08-25T14:38:34Z"
created_source: "git:1cd313d"
created_confidence: exact
updated: "2026-08-28T00:00:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, licensing, open-question, REUSE, D-029, C-005]
license: "CC-BY-4.0"
visibility: "public"
severity: medium
opened_by: "Oracle, 2026-08-25"
question_status: "open — no proposal by instruction"
evidence_script: "reports/audits/evidence/regime-crossings.py"
evidence_head: "0a912c0"
---
# D-030 — Should the licence regime derive from the path?

> **This entry proposes nothing.** It is an open design question, registered at
> the Oracle's instruction with the evidence and the mechanism, and no closing
> condition beyond the Oracle deciding.

## Status

**Open question, not a defect.** The Oracle, 2026-08-25:

> *"The licence regime derived from the path stays open as a design question,
> not resolved. I do not have a firm criterion yet for how it should work in
> NWOS, and I would rather not declare a provisional one that later has to be
> withdrawn. Register it as an open question in `debt/`, with no closing
> proposal. Let the evidence of today's case and the mechanism stand, and
> nothing more. The closing condition is that I decide, not that somebody
> implements it."*

Nothing in this entry is a recommendation. The sections below record what
happened and how the mechanism works, so that whoever decides has the case in
front of them.

## What is already decided and does not change

`standards/S-003-platform-role-system.md` **keeps its birth regime**,
`LicenseRef-Numen-AllRightsReserved`, declared explicitly in its frontmatter and
pinned by a per-file annotation in `REUSE.toml`. That ruling stands regardless
of how this question is eventually answered.

## The mechanism

`REUSE.toml` assigns licences **by path**. The last matching rule wins:

```toml
path = ["canon/**", "guilds/**", "agents/**"]
SPDX-License-Identifier = "LicenseRef-Numen-AllRightsReserved"

path = ["decisions/**", …, "standards/**", "debt/**", …]
SPDX-License-Identifier = "CC-BY-4.0"
```

**Consequence:** moving a file between folders changes its licence, and the
change appears nowhere in the diff. `git mv` shows a path change; the regime is
derived elsewhere, at build time, by a tool reading a different file.

Per-file exceptions exist and are already used in both directions:

| Path | Regime | Direction |
|---|---|---|
| `standards/*Sistema_de_Diseno*.md` | `CC0-1.0` | more open than its folder |
| `operations/legal/**` | reserved | more closed than its folder |
| `operations/strategy/**` | reserved | more closed than its folder |
| `standards/S-003-platform-role-system.md` | reserved | more closed than its folder |

So the current model is **inheritance by folder with per-file overrides**. Four
overrides exist today against seven folder rules.

## Today's case

`canon/Platform Role System.md` was ruled a standard on genre grounds
(`ADR-023`) and moved to `standards/`. By inheritance that would have released
it under `CC-BY-4.0`.

The document is Numinia's rank system: `NOMAD`, `CITIZEN`, `PILGRIM`,
`VERNACULAR`, `ARCHON`, `ORACLE`, with promotion tied to Session Zero, guilds
and factions — all reserved canon. It also fixes *"maximum 4 Oracles"* and
*"Oracles cannot be banned"*.

**CC-BY is irrevocable.** `LEGAL_DEBT.md` records the precedent: everything
published under the root CC0 through commit `0157be9` *"was offered
irrevocably and has not been revoked"*.

The Oracle stopped the merge and ruled:

> *"I prefer a badly filed document to a well filed and badly licensed one."*

## Measured: this had not happened before

`reports/audits/evidence/regime-crossings.py` resolves every path against
`REUSE.toml` — last matching rule wins, as REUSE does — and compares source and
destination for every rename in the repository's history.

```
12 rules read from REUSE.toml
 1 rename crossed a regime in the entire history
   → canon/Platform Role System.md → standards/S-003-…   (reverted)
```

The resolver was checked against the six known regimes before the zero was
trusted, including both pre-existing per-file exceptions (`S-001` §10.1).

## What is being watched while this stays open

At the Oracle's instruction:

> *"Keep watching. When a folder change alters a regime, tell me. That there is
> no decision does not mean nobody looks."*

`regime-crossings.py` is run on any branch that moves files between folders, and
a crossing is reported before the pull request rather than after. It is
`[MANUAL]`: nothing runs it automatically, and wiring it into CI would be
implementing an answer to a question that is open.

## One case ruled, the question still open (2026-08-28)

The Oracle ruled the `agents/**` case on 2026-08-28: agent definitions leave
the reserved regime and are declared `CC0-1.0` (`ADR-026`). The path stopped
determining the regime for that one directory.

**This does not close this entry.** The ruling turned on the *genre of the
content* — an agent's operational definition is documentation, not lore — and
on the fact that CC0 had already been granted over `agents/` through commit
`0157be9` and is irrevocable (`LEGAL_DEBT.md` LD-001). Neither reason
establishes whether a regime should derive from a path in general. It is one
case decided on its own merits, recorded here so that whoever eventually
rules on the mechanism knows a precedent exists and what it did *not* settle.

The closing condition is unchanged: the Oracle rules on the mechanism.

## Closing condition

**The Oracle decides.** Not that somebody implements something.

| | |
|---|---|
| Severity | medium — no current defect; a mechanism nobody has ruled on |
| Owner | Oracle |
| Blocked by | nothing — it is a decision, not work |
| Opened | 2026-08-25 |
| Closes when | the Oracle rules how the licence regime should work in NWOS |

## References

`D-029` (a decision travelling hidden inside another) · `ADR-023` ·
`LEGAL_DEBT.md` · `C-005` (licence canon) · `REUSE.toml` ·
`reports/audits/evidence/regime-crossings.py`
