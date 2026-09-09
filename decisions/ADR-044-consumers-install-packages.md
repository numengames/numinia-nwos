---
id: "ADR-044"
uid: ""
title: "Consumers install packages, never copy"
type: adr
status: active
version: "1.0.0"
created: "2026-09-09T10:30:00+02:00"
updated: "2026-09-09T10:30:00+02:00"
author: "ursa"
owner: "oracle"
deciders: ["oracle"]
guild: "Alchemists"
territory: "Archive"
tags: [design, packages, reconstruction, nwos, standards]
amends: ["STD-008", "CAN-008", "PRO-014"]
related: ["ADR-043", "MIS-146", "DBT-020"]
license: "CC-BY-4.0"
---

# ADR-044 — Consumers install packages, never copy

> **Summary:** What another repository needs to rebuild part of this system
> is a versioned package under `packages/`, installed, never copied. The
> design kit is the first: source in `packages/design-kit/`, published
> output at `/diseno/kit/`.
> **Epistemic:** Numinia is the first instance of NWOS; what it learns moves
> to the generic system in `nwos-deploy`. A copy cannot move; a package can.
> **Pragmatic:** One `npm install` replaces two hand-maintained copies that
> were already two versions behind.
> **Audience:** Agents · Oracles

---

## 1. Context

`STD-008` held 9,934 words of body: rules, catalogues, recipes, creative
direction and 283 words of CSS and JavaScript inside fenced blocks. The kit
generator extracted those blocks by marker and published them to
`web/public/diseno/kit/`.

Two other repositories consume that kit and neither reads it. `nwos-deploy`
carries the tokens hand-copied into `src/styles/global.css`, labelled
v5.0.0 and citing a section number (`§19.3`) that no longer exists; its
agent-instruction fragment is a "verbatim" copy of a file renamed three
weeks ago. The master is at 6.0.0. Inside this repository the same
drift had already happened once — the tokens JSON was inlined in the
standard and declared v5.0.0 under a 5.1.0 document — and was fixed by
making the published file the source. The fix stopped at the repository
boundary.

`nwos-deploy` is the generic parent: templates, packages and norms for any
organisation building an NWOS. Numinia is the particular instance and its
first user. The direction of dependency is parent → instance; what the
instance learns is carried up. A stylesheet inside a Markdown standard
cannot be carried anywhere.

---

## 2. Decision

**Anything a consumer outside this repository needs in order to rebuild a
part of this system is published as a versioned package under
`packages/`, and the consumer installs it. Copies are a breach.** Binds
from this decision; the first package is the design kit.

The design system lives in five houses, each with one job:

| House | Holds | Consumed by |
|---|---|---|
| `CAN-008` | direction: registers, the mix, brand play, voice | people |
| `STD-008` *Design tokens* | the rules that answer yes or no (`DSN-`) | reviewers, CI |
| *Design values*, a register to be created when `STD-008` is cut | the closed lists: palette, scale, animations, assets | the generator, which verifies register = tokens |
| `blueprints/` | recipes, one per medium | the workspace template |
| `packages/design-kit/` | `sistema.css`, `sistema.js`, `sistema.tokens.json`, `sistema.prompt.txt`, versioned by `package.json` (MIT) | every site, by install |

`web/public/diseno/kit/` stays where it is, as the published output of the
package with a sha256 manifest; its URLs are a contract with external
consumers and do not move. `generate-design-kit.mjs --check` fails when the
output differs from the package.

`CAN-008` §4 ("every value is in `STD-008`") is amended: every value is in
the kit, and the closed lists are in the register. `STD-008`'s section
citations from canon are repointed to plates, to the register or to a
blueprint when `STD-008` is cut.

---

## 3. Alternatives considered

| Alternative | Why not |
|---|---|
| Keep the kit in the standard, add a "do not copy" rule | The rule existed (`DS-01`) and two consumers copied anyway. A rule against copying, with no way to install, is a rule against building. |
| A `design/` folder, not a package | Fileover-up for a reader, but still a copy for a consumer; `nwos-deploy` cannot `npm install` a folder in another repository. |
| Source in `scripts/` | Apparatus. A stylesheet is not a script and nobody looking for the design looks there. |
| Source in `web/` | Output, and a contract: REUSE annotates it as generated and the URL ratchet guards it. A source that lives in its own output is edited in place. |
| Publish from `nwos-deploy` instead | It is the right final home. Today the values are decided here, and the instance is the one that learns; the package moves up when the generic system takes it. Publishing from here now, with a package name, makes that move a `repository` field change. |

---

## 4. Consequences

- `packages/` exists, MIT under REUSE. `@numengames/design-kit` 6.0.0 is the
  source; the published kit is byte-identical to it except for the
  generated stamp line.
- `nwos-deploy` and `numinia-web` replace their copies with the package. That
  is a change in each repository, reviewed there.
- The same rule applies to whatever else the generic system rebuilds from
  here — `templates/`, the guards in `scripts/` — when it is taken. It is
  stated now so that the design kit is the first case, not an exception.
- `STD-008` becomes *Design tokens*, the register is created, and three
  blueprints take the recipes, in the cuts ADR-043 already schedules.
- `DBT-020` (declared automatic, executed by nobody): `DS-01` now has an
  executor, `generate-design-kit.mjs --check`.
