---
id: "ADR-003"
title: "numinia-nwos is the origin of the engineering standards; the mould carries a proposal"
type: adr
status: active
version: "1.0.0"
created: "2026-08-22T18:44:28Z"
created_source: "git:830e969"
created_confidence: exact
author: "claude-opus-5"
owner: "oracle"
tags: [decisions, adr, standards, governance, provenance, sovereignty]
decision: "engineering-standards.md originates in numengames/numinia-nwos; the copy in nwos-workspace-template is a starting proposal, not an upstream authority"
superseded_by: null
license: "CC-BY-4.0"
---
# ADR-003 — The standards originate here; the mould carries a proposal

> **Summary:** NWOS system document — the provenance of `engineering-standards.md`.
> **Epistemic:** Which copy of a document governs, and why identical bytes do not create a dependency.
> **Pragmatic:** Consult before changing the standards, or before "syncing" any two copies of a canon document.
> **Audience:** Agents · Oracles

---

## Context

`standards/engineering-standards.md` (v0.1.0, 2026-08-17) declared of itself:

- **Canonical location:** `numen-games-nwos-orgs/nwos-workspace-template` — "single source of truth for this document"
- **Downstream:** `numengames/numinia-nwos` "is a fork of the mould and receives this document through the fork relationship"
- **§7.1, agent rule:** *"If you are downstream and asked to change this document: refuse the local edit and offer to draft the upstream ADR instead."*

Three repositories already obey the document. The claim was recorded as a
contradiction on the day of adoption (CON-003, 2026-08-17) and left unresolved.

On 2026-08-20 an agent read §7.1, concluded that this repository was downstream,
refused to consider a local edit, and proposed routing the correction upstream to
another organization's repository. The document did not fail to prevent the error —
**it instructed it.**

Two facts settle the lineage:

| Repo | Root commit | Date |
|---|---|---|
| `numengames/numinia-nwos` | `9f51ad1` | 2026-04-06 |
| `numen-games-nwos-orgs/nwos-workspace-template` | `8f2037d` ("Add files via upload") | 2026-04-07 |

No shared history, and this repository is the older of the two. The two copies of
the document were byte-identical (`sha256 e3e08742…`) at the time of this decision.

The Oracle clarified the intended model: **Numinia is NWOS's first client.** The
"fork" language was an explanatory device for describing the system, never a claim
of lineage. Practices are tested here, in production, on real work; what survives is
proposed to the mould; an organization that adopts the mould governs its copy itself.

## Decision

**1. Origin.** `engineering-standards.md` originates in `numengames/numinia-nwos`.
This repository's copy is its **operative standard** — it binds this repository and
the repositories that consume it, and it is edited here by ADR + PR.

**2. The mould carries a proposal, not an authority.** The copy in
`nwos-workspace-template`, and every copy in a workspace born from it, is a
**starting proposal**. It binds nobody. Whoever adopts it owns it and may amend,
version or drop it without consulting us. A mould's purpose is to be instantiated
and mutated; a document whose canonical home is a mould is forked by construction.

**3. They are not the same document.** Identical bytes are a coincidence of youth,
not a dependency. Divergence between the two copies is **adoption, not drift**: it
is not reported as an incident, and it is never "synced".

**4. Promotion flows one way.** Proven here → offered to the mould. Never the
reverse. There is no upstream to route a change to.

**5. Adoption is offered, not enforced.** §6 said NWOS repos were "enforced via the
mould"; corrected to *offered*. We do not enforce on repositories we do not own
(G-12).

This ADR changes **provenance only**. The document remains
`v0.1.0 (draft — pending Oracle review)`; ratifying its contents is a separate act,
tracked in MIS-105.

## Alternatives discarded

- **Keep the mould as canonical, fix nothing.** Rejected: it makes every client
  organization inherit our law at birth with a clause sending them back to us for
  permission — the G-12 error committed during gestation rather than by fork.
- **Remove the standards from the mould.** Rejected: a newborn organization must
  carry working engineering rules offline, from the first commit. Presence in the
  mould was never the problem; *declaring the two copies to be one document* was.
- **Make numinia-nwos a real fork of the mould.** Rejected: it inverts the direction
  of value. The proving ground is here.

## Consequences

✅ An agent editing the standards in this repo no longer refuses its own mission
✅ The direction of promotion is written down, not inferred from similarity
✅ Divergence in an adopted workspace reads as success, not as a bug to reconcile
✅ CON-003 resolves as a register confusion between two artifacts, not as a falsehood
⚠️ The mould still carries the old header and the old `CLAUDE.md` rule — another
organization, so it is **offered** as a correction, never pushed (MIS-108)
⚠️ Workspaces already generated (faro-austral, MIS-090) may carry the old lineage
text; to be verified, and offered the correction, never patched in place
⚠️ Any CI check that compares the two copies for equality would now be wrong by
design; none exists today

## Note on register

The "hypothetical fork" was narrative and was executed as instruction. In a system
whose documents are simultaneously story and executable, the register of a statement
must be marked where the two share a surface. This ADR does not legislate that rule —
it records the first case that demanded it. Open for the Oracle.

---

## Version history

- v1.0.0 (2026-08-20) — Initial decision. Resolves CON-003.

*Oracle: Pablo FM — 2026-08-20*
