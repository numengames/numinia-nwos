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
created_confidence: "exact"
updated: "2026-08-26T13:05:00Z"
author: "ursa"
owner: "oracle"
guild: "Procuradores"
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

Same error in three domains: **verify one dimension, conclude about another.** Each was
caught by measuring rather than re-reading.

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

## 5. Open question this raises for §5.2

The prohibition on `precedence = "override"` is stated for **third-party paths**. Should
it extend to the whole repository?

Argument for: the same flag can defeat any annotation, including the reserved-regime
ones on `canon/**`, `guilds/**` and `agents/**`. Argument against: `override` is a
legitimate REUSE feature and a blanket ban forecloses uses nobody has needed yet.

**Not decided here.** The guard proposed in §5.2 detects every occurrence, so the
narrow prohibition is enforceable today and can be widened later without rework.
