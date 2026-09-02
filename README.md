---
id: "readme-main"
uid:
title: "numinia-nwos"
type: documentation
status: active
version: "2.0.1"
created: "2026-04-07T22:30:00Z"
updated: "2026-09-02T01:30:00+02:00"
author: "ursa"
owner: "oracle"
license: "CC-BY-4.0"
registration: exempt
registration_reason: "singular document, not a numbered series"
---
# numinia-nwos

> The reference instance of the Narrative Work OS — the system that was used
> to build itself.

This is not documentation *about* a system. It is the system: the archive an
organisation of humans and digital agents actually runs on. Missions are
executed from here, decisions are recorded here, and the agents read these
files to know who they are.

If that sounds like a claim, check it against [`debt/`](debt/) — the register
of everything this archive knows it is missing.

---

## Start here

**Agents** open with [`PRO-001`](protocols/PRO-001-agent-session.md), then read
[`CLAUDE.md`](CLAUDE.md). One path, no menu.

**Humans** read [`STD-001`](standards/STD-001-glossary.md) — what each folder holds
and what every field means — then whichever series they came for.

---

## Where things live

Each folder answers one question. [`STD-001`](standards/STD-001-glossary.md) is the
full definition; this is only the map.

| Series | Answers |
|---|---|
| [`canon/`](canon/) | What the system **is** — foundational documents |
| [`standards/`](standards/) | What an artifact must **comply with** |
| [`protocols/`](protocols/) | What an actor **executes**, step by step |
| [`agents/`](agents/) | **Who** acts — one folder per digital agent |
| [`guilds/`](guilds/) | How actors **group** |
| [`missions/`](missions/) | The **work**: promised, done, and with what evidence |
| [`decisions/`](decisions/) | **Why** something was chosen |
| [`blueprints/`](blueprints/) | What **could** be — designs not yet executed |
| [`reports/`](reports/) | What was **observed**, on a date, by someone |
| [`operations/`](operations/) | What **sustains** the business — legal, security |
| [`debt/`](debt/) | What we know is **missing** |
| [`web/`](web/) | **This folder serves [numinia.org](https://numinia.org)** |

That last row is the one people miss. The public site is built from this
repository on every deploy — the mission board, the decision log and the corpus
reader all read these files directly. There is no separate content system.

---

## Its place among the repositories

| Repository | Relation |
|---|---|
| `nwos-workspace-template` | The upstream mould this instance was cast from |
| **`numinia-nwos`** | **This one — the reference instance** |
| `numinia-web` · `numengames-web` | Artifact repos: products built by the work recorded here |
| `numinia-ops` | Operational data, private by design |

**What is public here is structural and methodological**: the archive's shape,
its vocabulary, its decisions and its procedures. **What is not public is
operational**: credentials, client data, contracts — anything with a real
person or a real invoice on the other side of it.

A reader who does not know that split concludes the repository is incomplete.
It is not incomplete — it is scoped.

---

## The mission system

Missions live in one flat folder. **State is a frontmatter field, never a
path** — `missions/MIS-NNNN-english-slug.md`, and `status:` is the only surface
that says where a mission stands. Signalling state by moving files between
folders was tried and deliberately undone.

The live board is [numinia.org/missions](https://numinia.org/missions), built
from `missions/` on every deploy. States and lifecycle are defined in
[`STD-001`](standards/STD-001-glossary.md) §7 and
[`PRO-003`](protocols/PRO-003-mission-cycle.md).

---

## Agents

Every agent is a folder under [`agents/`](agents/) holding `SOUL.md` (identity),
`OPERATOR.md` (rules), `STATUS.md` (state) and `MEMORY.md`; the roster is
[`agents/INDEX.md`](agents/INDEX.md).

Digital agents here are not tooling. They hold roles, belong to guilds, execute
missions and accumulate memory across sessions — which is why their identity
documents are archived under the same rules as everything else.

---

## Licensing

Regimes differ by folder, and the difference is deliberate: code, prose and lore
are not offered on the same terms. Every file declares its own SPDX identifier,
resolved through [`REUSE.toml`](REUSE.toml) following REUSE 3.3.

See [`LICENSE`](LICENSE) and [`CAN-005`](canon/CAN-005-licensing.md) — do not infer
a licence from a neighbouring file.

---

## What is verified, and what is not

One rule in this repository is enforced by a machine: every document's declared
licence must match `REUSE.toml`, checked by
[`scripts/check-license-frontmatter.mjs`](scripts/check-license-frontmatter.mjs)
on every push through [`.github/workflows/ci.yml`](.github/workflows/ci.yml).
The site build runs in the same pipeline, so a structural change that breaks
[numinia.org](https://numinia.org) fails before it merges.

**Naming, vocabularies, and identifiers now have guards; the states a
mission may hold do not.** `lint-frontmatter.mjs` and `lint-naming.mjs` run
on every push (closed `debt/D-001`, 2026-08-31). [`debt/DBT-002`](debt/DBT-002-root-of-trust-unestablished.md) tracks what remains:
the archive describes four levels of change control, and git enforces one.

Stating this is not modesty. An archive that claims more verification than it
performs is the failure mode this repository exists to avoid.

---

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`standards/STD-002-governance.md`](standards/STD-002-governance.md).
Work enters through pull requests; the Oracle signs what changes the shape of
the archive. The repository is written in English
([`ADR-023`](decisions/ADR-023-canon-vocabulary.md)).

---

*Numen Games — Narrative Work OS · licensed per path, see [LICENSE](LICENSE)*
