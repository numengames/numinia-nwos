---
# Copy this file to guilds/<guild-slug>/GLD-NNN-charter.md and fill it in.
# The filename shape is enforced: GLD-NNN-slug.md, three digits, kebab-case.
# The guild's folder is its Spanish slug (alquimistas, centinelas, exegetas,
# procuradores) — the folder names predate the English rename and are stable.
# For the OTHER shape of this series, the roster, see the note at the end.
id: "GLD-NNN"
uid: ""
title: "Guild Charter — Guild Name"
type: charter
# default lifecycle: draft -> active -> closed
status: active
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
tags: [guild, charter]
license: "LicenseRef-Numen-AllRightsReserved"

# OPTIONAL — use when they apply, omit without guilt.
# territory: "Archive"              # the guild's primary territory, if it has one
# related: ["CAN-NNN"]
---

# Guild Charter — Guild Name

> **Summary:** One sentence. WHAT this guild is answerable for.
> **Epistemic:** Who this guild is, its laws, and its operational context.
> **Pragmatic:** Full briefing for activating or coordinating with this guild.
> **Audience:** Agents · Oracles

<!-- Title: "Guild Charter — <English guild name>". The four guilds are
     Sentinels, Alchemists, Exegetes, Procurators — the vocabulary the
     `guild:` field takes across the whole corpus. -->

---

## 1. Mission

What this guild exists to do, in one paragraph. The answer to "why would a
task be routed here rather than anywhere else".

---

## 2. Domain

What falls to this guild and what does not. Name the objects — series,
systems, decisions, artefacts — not the adjectives.

A domain stated as a quality ("quality", "rigour") routes nothing: every
guild claims it.

---

## 3. Laws

The standing rules its members operate under, beyond the standards that bind
everyone. Numbered, each one refusable.

1. The rule, in the imperative.

A guild with no laws is a label on a folder.

---

## 4. Branches

The internal divisions, if there are any, and what distinguishes them. Omit
the section rather than inventing structure a four-agent guild does not have.

---

## 5. Members

The named agents and their standing in this guild.

| Agent | Role | Since |
|---|---|---|
| `agent-id` | what they hold in this guild | YYYY-MM-DD |

The authoritative live list is the guild's roster document; this section
states the shape, and the roster keeps the count.

<!--
NOTES ON USING THIS TEMPLATE — delete this block.

THE ROSTER IS THE OTHER SHAPE OF THIS SERIES. Each guild has two documents:
  - GLD-NNN-charter.md  this file: identity, domain, laws
  - GLD-NNN-roster.md   the live list of active agents and nothing else
The roster carries the same frontmatter with `title: "Roster — Guild Name"`,
a one-table body, and no §1-§4. It changes whenever the guild does; the
charter changes when the guild's purpose does. Keeping them in one file makes
every roster edit look like a constitutional amendment.

LICENCE: guilds/ is LicenseRef-Numen-AllRightsReserved, unlike most of the
archive. The guild charters are internal organisational doctrine, not public
canon. Do not copy a CC0 header in from another series.

Sections 1, 2, 3 and 5 are required; §4 only when branches exist.
-->
