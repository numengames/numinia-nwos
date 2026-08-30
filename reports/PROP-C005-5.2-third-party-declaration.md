---
id: "PROP-C005-5.2"
uid:
title: "C-005 v2.0.0 §5.2 — Third-party declaration: proposed text and the measurements behind it"
type: report
subtype: proposal
status: draft
version: "1.0.0"
created: "2026-08-26T13:05:00Z"
created_source: "git:e4918fa"
created_confidence: exact
updated: "2026-08-26T13:05:00Z"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Legal"
tags: [proposal, licensing, C-005, REUSE, third-party, measurement]
license: "CC-BY-4.0"
evidence_script: "scripts/verify-third-party-attribution.py · /tmp/reuse-lab · /tmp/migsim"
evidence_head: "e4918fa"
scope: "numinia-nwos @ e4918fa · public surface: numinia.org"
---
# §5.2 — Third-party declaration

> **Scope:** `numinia-nwos` @ `e4918fa` · public surface: `numinia.org`
> **Nature:** proposed canon text for C-005 v2.0.0 plus the measurements that produced
> it. **Nothing was migrated.** The repository still carries 79 `.license` files.

---

## 1. Proposed text for the canon

> ### 5.2 Third-party material [UNIVERSAL]
>
> Third-party material keeps its origin holder and licence (§2). Declaring it is
> **not** a matter of writing the right annotation — it is a matter of writing one
> that **cannot be silently overridden**.
>
> **Canonical form: a `REUSE.toml` in the third-party directory.** REUSE resolves
> annotations by **proximity to the covered file** (`PrecedenceType.CLOSEST`), not by
> order of appearance. A directory-level `REUSE.toml` therefore beats a general block
> in the root `REUSE.toml` regardless of where that block sits. It scales with the
> number of *directories*, not of files.
>
> **`.license` adjacent file** is reserved for third-party material that has **no
> directory of its own** — a single vendored file among our own. Same precedence,
> worse scaling.
>
> **`precedence = "override"` over third-party paths: FORBIDDEN.** A root annotation
> carrying that flag defeats both a directory `REUSE.toml` **and** an adjacent
> `.license`. Without this prohibition, every attribution guarantee in this section is
> revocable by one line in one file.
>
> **Verification is on the effective regime, never on the annotation.** Correctness is
> established with `reuse spdx`, comparing **both** `LicenseInfoInFile` **and**
> `FileCopyrightText` per file. Reading `REUSE.toml` and finding it correct is not
> verification: an annotation can be present, correct, and inert.
>
> *Worked example, from this repository.* Three `.license` files were written for
> `LICENSE-Geist.txt`, `LICENSE-Alegreya.txt` and `LICENSE-PixelifySans.txt`. They are
> correct in content and they do nothing: `reuse` does not cover files it recognises as
> licence texts, so those three names appear in **no** SBOM — not today's, not the one
> archived before the fix. The declaration looked like coverage and produced none. **Only
> the effective regime showed it**, which is the whole reason this rule is written as a
> verification method rather than as advice.
>
> **CI (DEBE).** A guard **DEBE** fail on the appearance of `precedence = "override"`
> in any `REUSE.toml` of the repository, and **DEBE** assert that no file under a
> declared third-party path carries a Numen Games copyright. **A prohibition no CI
> evaluates is prose, not a rule** (§5, exit thresholds).

---

## 2. How this was measured

Everything below is reproducible without this conversation.

### 2.1 The spec was not trusted — the implementation was read

`reuse 6.2.0`, file `reuse/global_licensing.py`:

| Line | What it establishes |
|---|---|
| 53–67 | `PrecedenceType` has **three** modes: `AGGREGATE`, `CLOSEST`, `OVERRIDE` |
| 318 | Default is `PrecedenceType.CLOSEST` |
| 500 | `NestedReuseTOML` — a hierarchy of `REUSE.toml` files is supported |
| 626 | Found TOMLs are sorted "from topmost to deepest directory" |
| 560 | Resolution iterates `reversed(...)` → **the deepest match wins** |
| 551–553 | On `OVERRIDE`, resolution **breaks immediately** — nothing deeper is consulted |

### 2.2 Laboratory 1 — precedence between the three forms

Throwaway repository at `/tmp/reuse-lab` (`reuse_lab.sh`): three identical files under
`web/public/fonts/`, a root `REUSE.toml` whose **last** block is the hostile
`web/** = MIT` (the exact shape that caused the B1 defect), a directory `REUSE.toml`,
and a `.license` on the third file only.

| Scenario | `a.woff2` | `c.woff2` (has `.license`) |
|---|---|---|
| root + directory TOML + `.license` | **OFL-1.1 · DIRECTORY** | CC0 · ADJACENT |
| root only | **MIT · ROOT-GENERAL** ← the bug | CC0 · ADJACENT |
| root with `precedence = "override"` | MIT · ROOT | **MIT · ROOT — the `.license` is defeated** |

**Three findings.** A directory TOML wins by proximity. It wins **exactly like** an
adjacent `.license`. And `override` defeats both — which is why §5.2 must forbid it
rather than merely recommend a form.

### 2.3 Laboratory 2 — can one TOML express several holders?

`web/public/diseno/assets/fonts/` holds **three different copyright holders** in one
directory (5 Alegreya, 3 Vercel, 2 Pixelify). A per-directory TOML is only viable if
one file can discriminate them.

`/tmp/reuse-lab2` (`reuse_lab2.sh`), one `REUSE.toml` with three `[[annotations]]`
blocks keyed by filename pattern: **7 of 7 font files resolved to the correct holder,
0 wrong.** Per-directory does not force a single holder per directory.

### 2.4 Migration simulation — the acceptance criterion

`/tmp/migsim` (`migsim.sh`) copies the **whole real tree** to `/tmp`, deletes all 79
`.license` files, writes the 2 directory `REUSE.toml` files, and diffs the effective
regime of every file before and after:

```
== ANTES ==     ficheros en SBOM: 523
== DESPUES ==   ficheros en SBOM: 523
  solo en ANTES  : 0
  solo en DESPUES: 0
  CAMBIOS DE REGIMEN: 0
  VEREDICTO: PASS - cero cambios de regimen
```

**79 files → 2 files, zero regime changes.** This is refactoring of declaration, not a
licence change. The real repository was untouched (`git status --porcelain` empty).

---

## 3. What the measurement found that nobody asked for

### 3.1 Three of the 79 `.license` files are inert

`reuse` does not cover files it recognises as licence texts. `LICENSE-Geist.txt`,
`LICENSE-Alegreya.txt` and `LICENSE-PixelifySans.txt` **do not appear in the SBOM at
all** — not today, and not in the archived pre-fix SBOM
(`reports/audits/AUD-2026-08-26-licensing-c005/sbom.spdx`, 510 files).

So `fix-font-attribution.sh` writes 10 `.license` files of which **3 have no effect
whatsoever**. They are harmless, and they are also evidence for §5.2's own rule: their
presence looked like coverage and produced none. **The only way to know was to read the
effective regime.**

### 3.2 The corrected claim from PR #69

The commit message of `db948e9` states:

> "adjacent .license: resolved ahead of REUSE.toml **REGARDLESS of block order**.
> **Cannot be overridden by a future general glob.**"

**The second sentence is false.** It is true under the default precedence and false
under `precedence = "override"`, as scenario 3 of §2.2 shows. I asserted an
impossibility having tested a single case.

The claim is corrected here rather than silently: PR #69's fix remains correct and its
verification remains valid — what was wrong is the *reason* given for it, and that
reason is exactly what §5.2 now turns into an explicit prohibition.

**Method lesson, third of the same shape today:**

| Where | I compared | I concluded about | Reality |
|---|---|---|---|
| B1, audit | the licence (`MIT == MIT`) | licence **and** attribution | 69 icons had a false holder |
| #22, report | the abstract I read (v1) | the paper at its bare URL | v2 had rewritten the claim |
| PR #69 | the default precedence | **all** precedences | `override` defeats `.license` |
| PR #71, `PROP-` | the convention **once** (for `AUD-`) | **every** identifier I would mint | `ADR-005` declares no `PROP-` |
| Provenance census | the **string** in `author:` | the **nature** of the authorship | `ursa` *is* `claude-sonnet-4-6` |

Same error in five domains: **verify one dimension, conclude about another.** The first
three are about *content* — I checked one field, one version, one mode. **The fourth is
about *process*, and that makes it different in kind:** I performed the verification
correctly, derived `AUD-2026-08-26-licensing-c005` from six precedents, and then treated
the *act of having verified* as a property I now possessed rather than a step to repeat.

A content error is caught by measuring again. A process error is not: measuring the
prefix would have worked perfectly — I simply did not do it the second time. **The
correction for the first three is a better instrument; for the fourth it is a checklist,
because the failure is in the omission, not in the method.**

**The fifth is the most expensive**, because it landed in the one measurement that gates
the canon signature: the provenance census swept 72 files authored by agent personas and
held 51 authored by named models, when `agents/ursa/SOUL.md` declares
`model: "anthropic/claude-sonnet-4-6"`. The classifier read strings and reported on
authorship. Corrected in `AUD-2026-08-26-provenance` v1.1.0 §6 — the partition inverted
from 139/51 to 67/123.

Three of the five were caught by measuring rather than re-reading. **Two — the fourth and
the fifth — were caught by the Oracle**, and both are of the same subtype: not a wrong
instrument, but a category confused for the thing it names.



---

## 4. Proposed migration — measured, not executed

| | Today | After |
|---|---|---|
| `web/src/icons/**` | 69 `.license` | 1 `REUSE.toml` |
| `web/public/diseno/assets/fonts/**` | 10 `.license` | 1 `REUSE.toml` |
| **Total** | **79 files** | **2 files** |
| Effective regime changes | — | **0 (verified)** |

**Not in this PR**, per instruction: this document proposes the canon text; the
migration is a separate PR, and it should not land before §5.2 is signed — otherwise
the tree would follow a rule the canon does not yet state.

---

## 5. Why the prohibition is narrow — decided, not pending

The prohibition on `precedence = "override"` covers **third-party paths only**. This was
initially left open. **It is now decided: it stays narrow**, and the reason is measured,
not assumed.

The argument for widening it was that the same flag could defeat the reserved-regime
annotations on `canon/**`, `guilds/**` and `agents/**`. The surface sweep of 2026-08-26
(AUD-2026-08-26 v1.2.0 §C4, evidence in `surface-sweep-batch1.json`) shows those
annotations protect nothing:

| Reserved files in `numinia-nwos` | 42 |
|---|---|
| Already published under root CC0, irrevocably (§E4) | 31 |
| Reachable in production today, HTTP 200 on 22 probes | 11 |
| **Retaining an effective reservation** | **0** |

**A repository-wide ban would defend a surface that no longer exists.**

The narrow ban stands on its own footing, and on a different kind of right: Phosphor
Icons, Vercel/basement.studio, Huerta Tipográfica and the Pixelify Sans authors hold
**live** rights. Ours were waived or published; theirs were never ours to waive. An
`override` line would revoke their attribution silently, and that is the case §5.2
exists to prevent.

This is recorded here, in the section itself, so that whoever proposes widening the ban
finds the reason where they will look for it — rather than re-deriving it from a sweep
nobody remembers.

