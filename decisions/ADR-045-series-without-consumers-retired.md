---
id: "ADR-045"
uid: ""
title: "A series with no consumer is retired: guilds/ and infra/ close"
type: adr
status: draft
version: "0.1.0"
created: "2026-09-09T14:30:00+02:00"
updated: "2026-09-09T14:30:00+02:00"
author: "ursa"
owner: "oracle"
deciders: ["oracle"]
guild: "Alchemists"
territory: "Archive"
tags: [decisions, adr, series, guilds, infra, entropy]
license: "CC-BY-4.0"
related: ["ADR-005", "ADR-036", "ADR-041", "CAN-004", "STD-001", "MIS-0135"]
---

<!--
SPDX-FileCopyrightText: 2026 Numen Games S.L.
SPDX-License-Identifier: CC-BY-4.0
-->

# ADR-045 — A series with no consumer is retired: guilds/ and infra/ close

> **Summary:** The `GLD` and `INF` series are withdrawn from the register.
> `guilds/` is deleted; its one live fact — which guild an agent belongs to —
> moves to `agents/<id>/AGENT.yaml`. `infra/` is deleted; its one file moves
> to `.github/rulesets/`.
> **Epistemic:** A series earns its row by having a reader. Neither of these
> had one, and one of them contradicted the canon it claimed to serve.
> **Pragmatic:** Two rows fewer in `STD-001`, two moulds fewer, eight
> addresses redirected, one field added to the agent card.
> **Audience:** Agents · Oracles

---

## 1. Context

Measured at `f242434`, 2026-09-09.

**`guilds/`** held 8 files, 375 lines: four charters, four rosters. Consumers
that *read* them: none. `web/src/lib/corpus.ts` excludes the folder from
browsing by design; `lint-frontmatter.mjs` validates the `guild:` field of
49 documents against a list typed into the script, not against the charters;
no `AGENT.yaml` carries a guild. The folder was cited only by registers —
`STD-001`, `rules.json`, `REUSE.toml`, `SYS-003`, the content glob — and by
the seven agents' `SOURCES.md` as "where to look", which nobody had.

The charters also disagreed with `CAN-004`, the canon text that defines the
guild hierarchy, on the one thing they added. Each charter listed two
branches; `CAN-004` lists six per guild, with different names. The Exegetes
roster assigned Senet to *Scholars* (not in canon) and Calliope to *Erudites*
(in canon) in the same table. The root `LICENSE` already stated that
reserved lore "lives in the numinia-lore repository", and `ADR-036` left the
`guilds/**` reservation as the last unresolved regime.

**`infra/`** held one file and its README: the exported GitHub ruleset that
protects `main` (`MIS-0100`). The `INF-NNN` series was opened for it in
`STD-001` with a mould and a `rules.json` line, and registered zero documents
in fifteen days. `MIS-0135` row 7 left the closure of `DBT-001` "pending the
`infra/` ruling". Deployment infrastructure has its own repository,
`nwos-deploy`; nothing more was going to arrive here.

---

## 2. Decision

**A series stays in the register only while something reads it. `GLD` and
`INF` are withdrawn.** From this decision:

- `guilds/` is deleted. The guild an agent belongs to is a field of its
  card: `guild:` in `agents/<id>/AGENT.yaml`, one of the four names in
  `CAN-004`. Branches are not recorded until a consumer needs them.
  Agents that were in no roster carry `guild: null` until the Oracle assigns
  one.
- `infra/` is deleted. `infra/github/ruleset-protect-main.json` becomes
  `.github/rulesets/protect-main.json`, beside CODEOWNERS and the workflows,
  which are the same kind of thing. The re-export command travels with it.
- `STD-001` loses the `guilds/` and `infra/` rows and the `charter` genre;
  `rules.json` loses both series and the `charter` type; the two moulds go.
- The eight `/corpus/guilds/...` addresses redirect to
  `/corpus/canon/can-004-role-structure`, the document that holds what the
  charters claimed to hold.

Binds every register that lists series, from merge.

---

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Repair the charters to match `CAN-004` and keep the folder | Repairs a document nobody reads. The branch tables would be a second copy of `CAN-004` §Guilds, and the second copy is what drifted. |
| Move `guilds/` to `numinia-lore` | The charters contain no lore; they contain a mission line, two branch names and a roster. The lore is in `CAN-001` and `CAN-004`, already CC0. |
| Keep `infra/` and wait for Terraform | `REUSE.toml` and the README both say "when Terraform exists". Fifteen days, zero files; a folder held open for a future is a row in every register meanwhile. If an applier arrives, it arrives with its own decision. |
| Record `guild` in `SOUL.md` prose | `AGENT.yaml` exists so that tooling reads a card, not prose (`ADR-026`). A field a router can filter on belongs there. |

---

## 4. Consequences

- **Obliges:** an agent's guild is set in its `AGENT.yaml`, nowhere else.
  A series proposed in future states who will read it before it gets a row.
- **Costs:** five agents carry `guild: null` until the Oracle rules; the
  `guild:` vocabulary in `lint-frontmatter.mjs` stays a typed list, now with
  no document to point at other than `CAN-004`. Four `SOURCES.md` files
  lose a line they never used. `MIS-0100`, done, keeps its old path as a
  historical citation.
- **Reversal:** a consumer that needs a per-guild document — a router that
  reads charters, a page that renders them — and cannot be served by
  `CAN-004` plus the agent cards.

---

## 5. Status

`draft` — proposed by Ursa. Becomes `active` when the Oracle merges the
pull request that executes it; the execution and the decision are one
change, so the record cannot describe a state the tree does not have.
