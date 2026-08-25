---
id: "AUD-2026-08-24-phase0"
uid:
title: "Phase 0 — Archive restructure inventory"
type: report
subtype: audit
status: published
version: "1.2.0"
created: "2026-08-24T22:45:00Z"
updated: "2026-08-24T23:30:00Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [inventory, restructure, phase0, filing, read-only]
license: "CC-BY-4.0"
evidence_script: "scripts/phase0-inventory.py"
evidence_head: "64d7735"
---
# Phase 0 — Archive restructure inventory

> **Summary:** Every tracked document measured against `S-001`, with its
> proposed operation and its inbound reference count.
> **Epistemic:** Establishes what the restructure would actually touch, before
> anything moves.
> **Pragmatic:** The Oracle signs the target structure from this report. Phase 1
> does not exist until then.
> **Status:** READ-ONLY. No file was moved, renamed or deleted.

Reproduce with `python3 scripts/phase0-inventory.py --at 64d7735` (`--json` for
raw data). **The `--at` matters:** this report is itself a corpus document, so
publishing it adds three files to what it measures. Without pinning the commit,
its own figures stop matching the moment it lands. A reproducible figure needs
to say what it is reproducible against.

---

## 0. The three preconditions are false. This mission cannot start.

The brief says: *"If any is false, stop and report which. Do not proceed on a
workaround."* All three are false.

| # | Precondition | State | Who can close it |
|--:|---|---|---|
| 1 | `S-001` signed | **`status: draft`, v2.2.0 on `main`** | Oracle |
| 2 | `check-references.mjs` in `ci.yml`, green on `main` | **Not in `main` at all** — still in its open PR; `ci.yml` runs licence + install + build | Oracle (agent has no `workflow` scope) |
| 3 | Signed tag on `main` | **One tag, unsigned**: `mis-066-pre-unification` → `error: no signature found`. Zero signed commits on `main` | Oracle |

A detail that matters for #1: `main` carries **v2.2.0**. Version **2.3.0** — which
adds the step to §3 that this very mission depends on (*verify the `type` before
using the map to move anything*) — sits unmerged in
`fix/governance-consolidation`. **Executing against v2.2.0 would repeat the
mistake the Oracle stopped two hours ago.**

**Phase 0 is read-only and needs none of them**, so it is delivered. Phases 1–4
do not begin until all three are true.

---

## 1. The headline: the corpus is in better shape than expected

246 tracked documents, excluding `web/`.

| Operation | Count |
|---|--:|
| stay | 158 |
| stay — no `type`, cannot classify | 41 |
| stay — `type` not strict (`documentation`/`meta`, S-001 §3) | 19 |
| stay — apparatus (`INDEX`, `README`, `TEMPLATE`) | 14 |
| **register** (D-008 + D-013) | **21** |
| **change series** | **2** |

**Two documents in the wrong folder, out of 246.** The archive is filed
correctly. What it lacks is registration — and, in 41 cases, any `type` at all.

---

## 2. Conflicts: `type` vs folder

Only two, and they are the two the Oracle already stopped once:

| Refs | Path | Conflict |
|--:|---|---|
| 5 | `operations/security-policy.md` | `type: protocol` → expects `protocols/` |
| 4 | `operations/credential-map.md` | `type: protocol` → expects `protocols/` |

**Per S-001 §3 (v2.3.0), the `type` must be verified before the map is used.**
And on inspection the `type` looks wrong on both:

- `credential-map.md` is a table of which account is configured where. **Nobody
  executes it.** It is an inventory.
- `security-policy.md` states a rule an artifact must satisfy (*what never
  enters the repository*), which is the definition of a standard, not a
  procedure.

Neither is an ordered sequence executed by an actor. **This is a genre question,
not a filing question, and §3 says it needs an ADR — not a move and not a
frontmatter edit inside a refactor.** Reported, not resolved.

> The third document of this group, `operations/governance.md`, was deleted by
> the Oracle on 2026-08-24 after it was found to duplicate `GOVERNANCE.md` and
> to assert two claims the repository disproves. Had the earlier refactor gone
> ahead, it would have been filed as `P-012` — a live protocol number for a
> document that was about to be deleted.

---

## 3. Registration backlog — 21 documents

| Series | Missing | Coverage |
|---|--:|--:|
| `operations/` | 10 | 0/10 · **0 %** |
| `reports/audits/` | 4 | 1/5 · 20 % |
| `blueprints/` | 3 | 16/22 · 72.7 % |
| `canon/` | 2 | 1/12 · **8.3 %** |
| `protocols/` | 1 | 11/13 · 84.6 % |
| `standards/` | 1 | 1/4 · 25 % |

Fully compliant: `missions/` 105/105 · `decisions/` 9/9 · `debt/` 9/9 ·
`reports/daily/` 8/8.

### `agents/` is not 0/17 — it is 0/5

The brief states it: *"`A-NNN` registers the agent FOLDER, not the four files
inside."* My first run counted all 17 files and reported 17 violations. There
are **five agent folders**, and `SOUL.md` is `SOUL.md` in every one of them by
design.

Corrected in the script, with the reason in a comment. **The instrument was
wrong, not the corpus** — the third time this session, which is itself worth
recording.

---

## 4. Two findings the inventory did not predict

### 4.1 `S-` is already taken, and it means something else

`canon/Numinia-El-juego-de-rol-manual-completo.md` declares:

```yaml
id: "S-008-md"
seminal_id: "S-008"
type: seminal
```

**`S-` was the seminal prefix before `S-001` claimed it for `standards/`.** The
RPG manual is `S-008`. `S-001` §4.1 assigns `S-NNN` to standards, and this
document — in `canon/`, `type: seminal` — already holds a number in that space.

Phase 3 would assign `S-002`, `S-003`… to `standards/` while `S-008` sits in
`canon/` meaning something entirely different. **The collision is not
hypothetical; it is already in the repository.**

Options, for the Oracle:

1. **Keep `S-` for standards, retire `seminal_id`.** The manual is the only
   holder; canon gets `C-NNN` anyway per §4.3.
2. **Give standards a different prefix** (`STD-`, `N-`). Costs renaming
   `S-001-glossary.md`, which is cited from the README and from `GOVERNANCE`.
3. **Namespace them**: `S-` standards, `SEM-` seminal.

This document proposes **option 1** — the seminal numbering was never applied
consistently (one document of fourteen) and `canon/` needs `C-NNN` regardless.
But it is a naming decision and it is the Oracle's.

### 4.2 Nine of fourteen canon documents have no frontmatter

`canon/` is the most-cited series in the corpus. It also contains the largest
concentration of documents that cannot be classified at all:

```
2026_04_15-Epistemic_Relations_…-v0.2.0.md    no frontmatter
2026_04_15-Pragmatic_Numen_System-v0.2.0.md   no frontmatter
About Session Zero.md                          no frontmatter
Compendium of Attributes and Ranks…md          no frontmatter
Numinia Brand and Culture.md                   no frontmatter
Platform Role System.md                        no frontmatter
Rank Specifications.md                         no frontmatter
Role structure in the Numinia system.md        no frontmatter
Welcome to Numinia.md                          no frontmatter
```

**A document without a `type` cannot be filed by rule** — the map has no input.
This is why `canon/` reads 8.3 % coverage: not because the identifiers are
wrong, but because there is nothing to check them against.

41 documents corpus-wide have no `type`, and canon holds 10 of them.

---

## 5. `guilds/` — under review, untouched

| Refs | `type` | Path |
|--:|---|---|
| — | see report output | 8 files across 4 guild folders |

`S-001` has this series under review with half its contents declared redundant:
charters are norm (candidates for `standards/`), rosters are apparatus
(regenerable from the `guild:` field, which works — 124 documents, 4 canonical
values plus 7 deviations).

**Proposed, not executed.** It needs an ADR.

---

## 6. `operations/` — the drawer, measured

| Refs | `type` | Path |
|--:|---|---|
| 5 | `protocol` | `security-policy.md` ← conflict, §2 |
| 4 | `protocol` | `credential-map.md` ← conflict, §2 |
| 2 | `documentation` | `O-002-contradictions.md` |
| 1 | `documentation` | `O-001-continuity.md` |
| 1 | `documentation` | `strategy/sales.md` |
| 1 | `legal` | `legal/politica-de-privacidad-numengames.md` |
| 0 | `documentation` | `O-008-session-state.md` |
| 0 | `documentation` | `O-005-simulations.md` |
| 0 | `documentation` | `O-006-solutions.md` |
| 0 | `legal` | `legal/terms-and-conditions-numengames.md` |

Ten documents, five genres. `legal/` and `strategy/` are coherent
sub-series. The four `documentation` files at the top level are the drawer
proper — and three of them have **zero inbound references**.

`O-002-contradictions.md` was previously identified as belonging in `debt/`. That is a
series change and belongs in phase 2, not here.

**Proposed, not moved.**

---

## 7. Folders that would be emptied

**None.** No folder loses all its contents under this plan, so **phase 4 has
nothing to delete**. If the Oracle approves moving `operations/`'s four loose
`documentation` files elsewhere, that changes — and it would still leave
`legal/` and `strategy/` in place.

---

## 8. The order, as the Oracle ruled it

The first draft of this report listed the signing steps in the wrong sequence.
The Oracle corrected it:

> *"Sign the tag **before** signing S-001, not after. Signing S-001 is the first
> structural change; you want the restore point to be prior to it, not
> subsequent."*

Correct, and it is not a detail. A tag placed after `S-001` is signed cannot
restore the state before the archive had a signed vocabulary — which is the
exact state a failed restructure would need to return to.

| # | Step | Who |
|--:|---|---|
| 1 | **Signed tag on `main`** — the restore point, before anything structural | Oracle |
| 2 | Merge `fix/governance-consolidation` → `S-001` v2.3.0 | Oracle |
| 3 | **Sign `S-001`**: `status: draft` → `active` | Oracle |
| 4 | Rule on the `S-` collision → ADR | Oracle |
| 5 | **`MIS-109` — make canon filable** (its own mission, before the phases) | agent + Oracle |
| 6 | Merge `ci/reference-lint`, then **add the step to `ci.yml`** | Oracle — see `D-017` |
| 7 | Phases 1–4 | agent, one PR per phase |

### Rulings recorded

**The `S-` collision → option 1.** `seminal_id` was applied to one document of
fourteen, `canon/` takes `C-NNN` regardless, and renaming `S-001-glossary.md`
would mean touching the README and `GOVERNANCE.md`. **`S-` stays with
`standards/`; `seminal_id` is retired.** Executed as part of `MIS-109`.

**`security-policy` and `credential-map` → not moved.** The Oracle confirms the
reading: a credential map is an inventory nobody executes; a security policy
declares what an artifact must satisfy, which is the definition of a standard.
**Both have the wrong `type`, and that is a genre decision, not a file move.**
It needs an ADR, and it is not part of the restructure.

**Canon → its own mission, before the phases.** `MIS-109`. Nine seminal
documents without `type`, `id` or `license`; seven with spaces in the filename;
and `D-012` on top, since one of them contradicts itself. Frontmatter,
registration and the terminology ruling travel together — adding frontmatter to
a self-contradicting document just records the contradiction with better
metadata.

**The `workflow` scope is a permanent constraint → `D-017`.** The agent cannot
touch `.github/workflows/` and will not, by protocol. That makes every future
guard — four are pending — depend on a manual step by the Oracle. What is
missing is not the permission, it is the **handoff procedure**, so each mission
stops rediscovering the wall and improvising around it.

---

## 9. Decisions this report still cannot make

- **`canon/` genre assignments** (`MIS-109`) — is `Rank Specifications.md`
  canon, or is it `standards/`? The agent proposes; the Oracle signs, because
  getting it wrong files the founding documents under the wrong genre
  permanently.
- **`guilds/`** (§5) — ADR pending
- **`operations/`'s four loose `documentation` files** (§6) — three have zero
  inbound references

---

## Reproduce

```bash
python3 scripts/phase0-inventory.py --at 64d7735   # this report's figures
python3 scripts/phase0-inventory.py                # the corpus as it is now
python3 scripts/phase0-inventory.py --json         # raw, one record per document
python3 scripts/count-evidence.py                  # corpus-wide evidence
```

> **A flaw found in this instrument, after publication.** The first version had
> no `--at`: it always measured the working tree. The moment this report was
> committed, running it returned 249 documents instead of the 246 it states —
> because the report, `MIS-109` and `D-017` are corpus documents and the script
> counted them.
>
> The figures were never wrong; they were unpinnable. `D-014` records the same
> class of defect in `count-evidence.py`, where apparatus is counted as record.
> **Twice in one day the instrument was the thing that needed fixing**, which is
> the argument for `evidence_script` and `evidence_head` being mandatory rather
> than a courtesy.
