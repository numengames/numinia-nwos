---
id: "AUD-2026-08-26-licensing-c005"
uid:
title: "Licensing audit of numinia-nwos against C-005 v1.3.0, and the measured impact of the CC0 decision"
type: report
subtype: audit
status: published
version: "1.3.0"
created: "2026-08-26T09:40:00Z"
created_source: "git:8a529fa"
created_confidence: "exact"
updated: "2026-08-26T14:25:00Z"
author: "ursa"
owner: "oracle"
guild: "Procuradores"
territory: "Legal"
tags: [audit, licensing, C-005, CC0, REUSE, robots, read-only]
license: "CC-BY-4.0"
evidence_script: "reuse 6.2.0 · reuse lint · reuse spdx"
evidence_head: "8a529fa"
---
# AUD-2026-08-26 — Licensing audit of `numinia-nwos` against C-005 v1.3.0

> **Scope:** `numinia-nwos` only, at `8a529fa`. No other repository was inventoried.
> **Nature:** report. Zero files modified except this one.
> **Norm audited against:** `canon/C-005-licensing.md` v1.3.0, read in full (434 lines).
> **Tooling:** `reuse 6.2.0` (installed for this audit), literal output in Annexes.

---

## 1. Executive summary

1. **The repository is NOT REUSE-compliant.** `reuse lint` exits 1: two invalid SPDX
   expressions and one file with no licensing information.
2. **`CLAUDE.md` is the non-compliant file, and the cause is C-005 §9 itself.** The
   canon's copy-paste fragment contains `SPDX-License-Identifier: MIT   (or the
   applicable ID)`, which is not a parseable expression. **The canon breaks the tool
   that enforces the canon.**
3. **57 files carry a licence nobody declared for them.** `REUSE.toml`'s last-match-wins
   ordering silently overrides three third-party annotations: **7 fonts declared
   `OFL-1.1` and 43 Design-System files declared `CC0-1.0` are all emitted as `MIT`**.
   **Zero files in the SBOM carry `OFL-1.1`.**
4. **The MIT stamp on third-party fonts is a false attribution.** Geist, Alegreya and
   Pixelify Sans ship with `SPDX-FileCopyrightText: 2026 Numen Games S.L.` — we are
   claiming copyright over other people's typefaces.
5. **31 of the 42 files reserved today were already published under root CC0.** Per
   C-005 §4 position 5 the waiver is irrevocable; reserving them now does not recover
   what was granted between `9f51ad1` (2026-04-06) and `2efd546` (2026-08-16).
6. **The CC0 decision would move 249 files** from `CC-BY-4.0`, of which **59 already
   left under CC0** — for those it is a formalisation, not a new grant.
7. **`ai-train=no` is live on 6 of 7 hosts and contradicts the regime.** Not an
   effective reservation over what is already CC0, but a real de-facto block: 9 AI
   user-agents under `Disallow: /`. **AI Crawl Control is not enforcing** — ClaudeBot
   receives HTTP 200.
8. **`NOTICE` is absent** while `Apache-2.0` ships in the dependency tree (§5).
9. **The CI guard is green and blind**: it inspects `*.md` only, so it cannot see any
   of finding 3's 57 files.
10. **`numinia-web` has no `CLAUDE.md`**, though §9 says the fragment is copied into
    every repository.

---

## 2. Findings by block

### A · Declaration (C-005 §5)

**A1 — Required artifacts.** Five of six present.

| Artifact | State |
|---|---|
| `LICENSE` | present, 4.0K |
| `LICENSES/` | present — `CC0-1.0.txt`, `CC-BY-4.0.txt`, `MIT.txt`, `LicenseRef-Numen-AllRightsReserved.txt` |
| `REUSE.toml` | present, 8.0K |
| `TRADEMARKS.md` | present, 699 B |
| `LEGAL_DEBT.md` | present, 2 208 B |
| **`NOTICE`** | **ABSENT** |

**Severity: medium.** §5 requires `NOTICE` "si distribuye alguna dependencia
Apache-2.0". The tree contains 11 `Apache-2.0` packages, two of them direct
(`class-variance-authority`, `playwright-core`). Whether `NOTICE` is *required*
depends on whether those reach the artifact — see C3. Reported as a gap, not resolved.

**A2 — REUSE coverage (literal tool output, Annex 1).**

```
* Files with copyright information: 510 / 510
* Files with license information:   509 / 510
* Invalid SPDX License Expressions: 2
* Used licenses: CC-BY-4.0, CC0-1.0, LicenseRef-Numen-AllRightsReserved, MIT
Unfortunately, your project is not compliant with version 3.3 of the REUSE Specification
```

Exit code 1.

**A3 — The two invalid expressions. Severity: high.**

```
'CLAUDE.md' contains invalid SPDX License Expressions:
* MIT   (or the applicable ID)
'canon/C-005-licensing.md' contains invalid SPDX License Expressions:
* MIT   (or the applicable ID)
```

Both trace to the same source: **C-005 §9 line 372**. The canonical fragment instructs
every repository to write a line that REUSE cannot parse. `canon/C-005-licensing.md`
fails because it *contains* the fragment; `CLAUDE.md` fails because it *obeys* it.

`CLAUDE.md` is additionally the single file with no licensing information — REUSE reads
the pseudo-expression, fails to parse it, and concludes the file declares nothing, even
though `REUSE.toml` annotates it `CC-BY-4.0`.

This is self-application failure (cf. D-021): the norm does not satisfy itself.

**A4 — `package.json`.** One only, `web/package.json`: `"license": "MIT"`. Compliant
with §5. Not `private`.

**A5 — Header exception (§5).** 69 Phosphor SVGs, 7 `.woff2` fonts and 53
`web/public/diseno/**` files are declared via `REUSE.toml`, not headers — correct per
§5. **But the regime they receive is not the one declared: see B1.**

---

### B · Structural contradictions

**B1 — Annotation ordering silently overrides third-party licences. Severity: HIGH.**

`REUSE.toml` documents its own rule: *"when several annotations match a file, the LAST
one in this file wins."* The third-party and CC0 annotations sit **before** the final
code block:

```toml
[[annotations]]                              # line ~78
path = "web/src/icons/**"                    # Phosphor, MIT
[[annotations]]                              # line ~83
path = "web/public/diseno/assets/fonts/**"   # OFL-1.1
...
[[annotations]]                              # LAST BLOCK — wins over all the above
path = ["web/**", "scripts/**", "infra/**"]
SPDX-License-Identifier = "MIT"
```

Measured effect, from `reuse spdx` (not from reading the TOML):

| Declared intent | Files | Effective regime |
|---|---|---|
| `web/public/diseno/**` → `CC0-1.0` | 43 | **`MIT`** |
| `web/public/diseno/assets/fonts/**` → `OFL-1.1` | 7 | **`MIT`** |
| `web/src/icons/**` → `MIT` (Phosphor) | 69 | `MIT` — correct by accident |
| **Total misdeclared** | **50** | |

**`OFL-1.1` appears zero times in the SBOM.** The annotation is inert.

**B2 — False attribution over third-party typefaces. Severity: HIGH.**

The same override replaces the third-party copyright holders with ours:

```
FileName: ./web/public/diseno/assets/fonts/Geist-Variable.woff2
LicenseInfoInFile: MIT
FileCopyrightText: SPDX-FileCopyrightText: 2026 Numen Games S.L.
```

Identical for `GeistMono-Variable`, `Alegreya-Variable`, `PixelifySans-Variable`. C-005
§2 says third-party material keeps "su licencia de origen, sin excepción". The artifact
asserts the opposite. This is not a formatting defect: it is a copyright claim over
Vercel/basement.studio, Huerta Tipográfica and the Pixelify Sans authors, published in
a public repository.

**B3 — `AND` expressions mixing open with reserved (§5).** **None found.** Compliant.

**B4 — Reserved files reachable by a general annotation (§4.2).** Enumerated the tree
rather than trusting a hand-written list: the four reserved-path annotations
(`canon/**`, `guilds/**`, `agents/**`, `operations/legal/**`, `operations/strategy/**`,
`standards/S-003`) all resolve as intended. **42 files effectively reserved.** No
reserved file is caught by a general open annotation.

**B5 — Silence does not declare (§1).** `LICENSES/LicenseRef-Numen-AllRightsReserved.txt`
exists and 42 files resolve to it. Compliant.

---

### C · Dependencies (C-005 §3)

**C1 — Direct dependencies: 19 (16 runtime, 3 dev). All in the "freely" tier.**

| SPDX | Count |
|---|---|
| `MIT` | 14 |
| `OFL-1.1` | 2 (`@fontsource-variable/geist`, `geist-mono`) |
| `Apache-2.0` | 2 (`class-variance-authority`, `playwright-core`) |
| `ISC` | 1 (`lucide-react`) |

No direct dependency falls in "aislamiento", "decisión firmada" or "nunca".

**C2 — Full tree: 415 packages.**

| SPDX | Count |
|---|---|
| MIT | 357 |
| ISC | 23 |
| Apache-2.0 | 11 |
| BSD-2-Clause | 9 |
| BSD-3-Clause | 3 |
| CC0-1.0 | 2 |
| BlueOak-1.0.0 | 2 |
| OFL-1.1 | 2 |
| Python-2.0 · CC-BY-4.0 · 0BSD · (MIT OR CC0-1.0) | 1 each |
| **LGPL-3.0-or-later** | **1** — `@img/sharp-libvips-linux-x64` |
| **(no `license` field)** | **1** — `zod-to-ts` |

**C3 — Present is not distributed: the content test (§3).** `dist/` exists (20 MB), so
this was tested against artifact *contents*, not tree names.

```
dist/ composition: 737 html · 290 md · 35 png · 18 woff2 · 4 txt · 3 js · 3 css · 2 xml · 2 svg · 2 json
Native binaries (.node/.so/.wasm) in dist/: NONE
JS files containing "libvips" or "sharp":   0 of 3
JS files containing "GPL" or "LGPL":        0 of 3
```

`sharp` is an **optional** dependency of `astro`, used at build time for image
processing; `output: "static"`. **The LGPL component does not reach the artifact.**
Per §3 this does not block, but it **DEBE** be recorded in `LEGAL_DEBT.md` with an exit
threshold and a CI guard inspecting artifact contents. **`LEGAL_DEBT.md` does not
record it and no such guard exists.** Severity: medium.

Note: a naive `grep -rl "sharp" dist/` returns 5 hits — all prose inside published
audit documents, not code. Reported because the same grep would mislead a future check.

**C4 — Dependency without `license` field.** `zod-to-ts` is declared by
`node_modules/astro/package.json` but **is not installed** in the tree. Per §3 this is
a hygiene signal that blocks while terms are unknown. Not installed, not distributed.
Severity: low.

**C5 — Floor rule.** Strongest copyleft in the *distributed* tree: none. Declared
outbound `MIT` is satisfiable.

**C6 — Drag direction.** No `apps/*` ← `packages/*` structure exists in this repo;
inapplicable. Reported as not-applicable, not as compliant.

---

### D · Content and media (C-005 §2.6 and §5)

**D1 — Formats present. This is an inventory, not a compliance rate.**

| Format regulated by §5 | Files tracked in git |
|---|---|
| glTF / GLB | **0** |
| VRM | **0** |
| MP3 / WAV / FLAC / OGG | **0** |
| MP4 / MOV | **0** |
| JPEG | 1 |
| PNG | 35 |
| WebP | 1 |
| SVG | 70 |

**"0 assets present" is not "0 assets compliant".** The VRM obligation of §5 has no
subject in this repository. Any statement that `numinia-nwos` fails VRM metadata would
be false.

For the 37 raster images and 70 SVGs present, embedded-licence verification (XMP,
EXIF, RDF) was **not performed**: it requires `exiftool`, which is not installed, and
installing further tooling exceeded what the mission scoped. **Declared as a gap, not
as a pass.** 69 of the 70 SVGs are Phosphor third-party icons already covered by B1.

**D2 — AI provenance (§2.6).** **3 of 296 `.md` files** carry a provenance field.
§2.6 says "Toda pieza DEBE declarar su procedencia: `human`, `ai-assisted` or
`ai-generated`". Compliance: **1.0 %**. Severity: medium — and directly relevant to E,
since material without demonstrable authorship cannot be waived under CC0.

No record was found of which tools generated catalogue material. **Not inferred.**

**D3 — CC0 gate over media (§2.6).** No audio, no video, no identifiable persons found
in the 37 images by filename inspection. EXIF cleanliness **not verified** (same
tooling gap as D1).

---

### E · Impact of the CC0 decision

This is the core section. All counts come from `reuse spdx` with REUSE precedence
applied — not from reading `REUSE.toml`.

**E1 — Current effective regime, 510 files.**

| Regime | Files |
|---|---|
| `CC-BY-4.0` | 249 |
| `MIT` | 213 |
| `LicenseRef-Numen-AllRightsReserved` | 42 |
| `CC0-1.0` | 5 |
| none | 1 (`CLAUDE.md`) |

**E2 — What moves from `CC-BY-4.0` to `CC0-1.0`: 249 files.**

| Directory | Files |
|---|---|
| `missions/` | 119 |
| `debt/` | 35 |
| `blueprints/` | 24 |
| `reports/` | 22 |
| `protocols/` | 14 |
| `decisions/` | 13 |
| root | 10 |
| `operations/` | 7 |
| `standards/` | 3 |
| `canon/` | 2 (`C-005-licensing.md`, `INDEX.md`) |

**Of these 249, 59 already existed at `2efd546`** and were therefore offered under root
CC0. For those the decision **formalises an existing grant**; for the remaining 190 it
is a new one.

**E3 — What moves from reserved to `CC0-1.0`: 42 files.**

| Directory | Files |
|---|---|
| `agents/` | 21 |
| `canon/` | 9 |
| `guilds/` | 8 |
| `operations/` | 3 (legal ×2, strategy ×1) |
| `standards/` | 1 (`S-003-platform-role-system.md`) |

**E4 — The irrevocability finding. Severity: HIGH.**

**31 of those 42 reserved files were already published under root CC0.**

```
Window: 9f51ad1 (2026-04-06 19:14) → 2efd546 (2026-08-16 19:58)
82 commits · 282 files present at close · root LICENSE = CC0 1.0 Universal
```

All 21 `agents/**`, all 8 `guilds/**`, and 2 `canon/**` files
(`Epistemic_Relations`, `Pragmatic_Numen_System`) fall inside it. Per C-005 §4
position 5 — *"CC0 publicado · Ninguna. La renuncia es irrevocable"* — the current
reserved annotation **does not recover those rights**. It declares an intent the
regime cannot deliver.

Full list in Annex 4.

The 11 reserved files **not** in the window, where reservation is effective:
`canon/C-001`, `C-002`, `C-003`, `C-004`, `C-006`, `C-007`, `archive-lore.md`,
`operations/legal/O-003`, `O-004`, `operations/strategy/O-007`, `standards/S-003`.

**E5 — What stays reserved after the decision.** Per the Oracle's stated decision only
the brand is excluded (§7). But two categories cannot pass to CC0 regardless:

1. **Third-party material** — 7 font files (`OFL-1.1`) and 69 Phosphor icons (`MIT`).
   A blanket CC0 declaration over `web/**` would be **false by composition**. Today
   B1 already misdeclares them as our MIT; a CC0 sweep would compound the error.
2. **Material without demonstrable ownership** — undetermined, because D2 shows only
   1.0 % of documents declare provenance. **This is an open question, not a count.**

**E6 — Sections of C-005 v1.3.0 contradicted by the decision, by number.**

| § | What it says | Effect |
|---|---|---|
| §1 | Four regimes; "toda pieza nace en el régimen más cerrado" | Table collapses; the founding rule is inverted |
| §2, culture branch | "Documentación, ADR, especificaciones → `CC-BY-4.0`" | Row replaced |
| §2, culture branch | "Lore, narrativa, guiones, marca → reservado" | Row splits: brand stays, lore leaves |
| §2.6 | "CC0 no se aplica a lo que contiene personas sin consentimiento documentado" | **Survives — a hard limit on the sweep** |
| §4, table | Position 5 "CC0 publicado · irrevocable" | **Survives — and is what makes E4 unrecoverable** |
| §5 | `LICENSES/` must hold the text of each licence used | `CC-BY-4.0.txt` may become unused; `OFL-1.1.txt` is **missing today** |
| §6 | "Activos: declaración explícita de CC0 en el PR" | Extends to documentation |
| §7 | Brand out of every free licence | **Survives unchanged** |
| §9 | The `CLAUDE.md` fragment | Must be reissued — see I |

---

### F · Historical state

**F1 — The CC0 trace, exact reference.**

| Fact | Value |
|---|---|
| First commit | `9f51ad1` — 2026-04-06 19:14:26 +0200, PabloFM, "Initial commit" |
| Root `LICENSE` at that commit | **CC0 1.0 Universal** (verbatim first line: `Creative Commons Legal Code`) |
| Tap closed at | `2efd546` — 2026-08-16 19:58:17 +0200, "Close the CC0 tap forward: per-regime licensing per C-005, Oráculo-signed" |
| Commits in window | **82** |
| Files present at close | **282** |
| Mechanical application of C-005 v1.3.0 | `0157be9` — 2026-08-16 19:52:03, six minutes earlier |

`REUSE.toml` cites `0157be9` as the cut-off; the commit that actually replaces the root
CC0 `LICENSE` is `2efd546`, six minutes later. **A six-minute discrepancy between the
cited commit and the effective one.** Low severity, but the canon should cite the
effective commit. Recorded as debt, not resolved.

**F2 — Chronological contradictions and phantom IDs found in passing.** Recorded, not
resolved, per instruction:
- `2026_08_16-Numinia_Legal_Book_Edicion_Razonada-v0.6.1.md`, cited in C-005
  frontmatter line 7, **does not exist in this repository**.
- `guia_publica: 2026_08_16-Numinia_Guia_Licencias-v1.1.0.html` — **not in this
  repository**.
- `archivo_distribuido: 2026_08_16-Numinia_Canon_C005_Licencias-v1.3.0.md` — **not in
  this repository**.

---

### G · Public surface

**G1 — Per-host capture.** Literal outputs in Annex 3.

| Host | HTTP | Server | Managed block | `Content-Signal` | UAs `Disallow: /` |
|---|---|---|---|---|---|
| `numinia.com` | 200 | cloudflare | yes | `search=yes,ai-train=no,use=reference` | 9 |
| `www.numinia.com` | 200 | cloudflare | yes | idem | 9 |
| `numinia.org` | 200 | cloudflare | yes | idem | 9 |
| `numinia.store` | 200 | cloudflare | yes | idem | 9 |
| `numen.games` | 200 | cloudflare | yes | idem | 9 |
| `numengames.com` | **404** on `/robots.txt` | **awselb/2.0** | **no** | **absent** | 0 |
| `nwos.numen.games` | 200 | cloudflare | yes | idem | 9 |

The 9 blocked user-agents, identical on all six Cloudflare hosts: `Amazonbot`,
`Applebot-Extended`, `Bytespider`, `CCBot`, `ClaudeBot`,
`CloudflareBrowserRenderingCrawler`, `Google-Extended`, `GPTBot`, `meta-externalagent`.

**G2 — Zone mapping.** Six hosts are on Cloudflare; **`numengames.com` is on AWS ELB**
and serves no `robots.txt` at all, yet redirects to `numen.games` for `/`. Distinct
`cf-ray` values per host indicate distinct zones. The managed block is byte-identical
across the five compared; **what differs is each site's own tail** appended after it
(`.com` adds `Disallow: /spike/` and `/api/`; `.store` has no `User-agent: *` /
`Sitemap` tail). **Six Cloudflare zones to visit, not one** — and `numengames.com`
needs a different mechanism entirely.

**G3 — AI Crawl Control: observable, not enforcing.**

```
curl -A "ClaudeBot/1.0 (+claudebot@anthropic.com)" https://numinia.org/  → HTTP/2 200
curl -A "ClaudeBot/1.0 (+claudebot@anthropic.com)" https://numinia.com/  → HTTP/2 200
```

Both served `cf-cache-status: HIT` with no challenge, no 403. **No evidence of AI Crawl
Control enforcement from outside.** Reported as an observable, not a certainty: the
dashboard state cannot be confirmed externally, and a rule could be scoped to paths not
probed.

**G4 — What each host serves.**

| Host | Title | Bytes |
|---|---|---|
| `numinia.com` / `www` | Numinia | 25 176 |
| `numinia.org` | Narrative Work OS — Numen Games | 38 557 |
| `numinia.store` | Numinia Digital Goods — **Free CC0 3D Assets for Games** | 45 821 (redirects to `www.numinia.store/en`) |
| `numen.games` / `numengames.com` | Numen Games - Coming Soon | 4 410 |
| `nwos.numen.games` | Narrative Work OS — Numen Games | 29 260 |

**`numinia.org` does serve published content** — the corpus viewer, in production.

**G5 — The declarative contradiction, stated precisely.** Three separate effects, not
one:

1. **What the signal says vs. what the regime is.** `ai-train=no` is an express
   reservation under Article 4 of EU Directive 2019/790. The repository's regime for
   249 files is `CC-BY-4.0` and for 5 files `CC0-1.0`; **`numinia.store` advertises
   itself in its own page title as "Free CC0 3D Assets"**. Over anything already
   CC0-published the reservation has no object: per §4 position 5 the waiver is
   irrevocable and no `robots.txt` recovers it.
2. **Inducement of third parties to error.** A reader encountering `ai-train=no` on
   `numinia.store` alongside "Free CC0 3D Assets" receives two contradictory signals
   about the same material. The reservation reads as current and enforceable.
3. **De-facto blocking — this one is real.** Nine crawlers that honour `robots.txt`
   are excluded from six hosts. The reservation may be void as to already-waived
   material, but the exclusion of compliant crawlers is a live, measurable effect and
   is the only one of the three that actually changes who can read the corpus.

**Nobody in the project decided this**: it is Cloudflare's managed default. That it is
a default does not make it less of a legal declaration published in our name.

---

### H · Scattered legal corpus

| Document | Path | State |
|---|---|---|
| Privacy policy | `operations/legal/O-003-privacy-policy-numengames.md` | present, 12 618 B, **reserved** |
| Terms & conditions | `operations/legal/O-004-terms-and-conditions-numengames.md` | present, 22 027 B, **reserved** |
| C-006 Session Zero | `canon/C-006-session-zero.md` | present, 24 546 B, **reserved** |
| `TRADEMARKS.md` | root | present, **699 B** |
| `LEGAL_DEBT.md` | root | present, 2 208 B |
| `NOTICE` | — | **ABSENT** |
| `GOVERNANCE.md` | root | present, 8 080 B |
| `CONTRIBUTING.md` | root | present, 1 339 B |
| `SECURITY.md` | root | present, 1 050 B |
| **ICLA / CLA** | — | **DOES NOT EXIST as a file** |
| Legal Book v0.6.1 | cited in C-005 frontmatter | **DOES NOT EXIST here** |
| Public licensing guide | cited in C-005 frontmatter | **DOES NOT EXIST here** |

**H1 — No CLA/ICLA file exists.** §6 requires a CLA for any repository containing AGPL
code. This repository contains none (`MIT` + docs), so **DCO is the applicable
instrument** and `CONTRIBUTING.md` should state it. Whether it does was not verified
beyond existence. The `[ABOGADO]` question about ICLA fields is **moot here**: there is
no ICLA in this repository to leave unfilled. Its state elsewhere is out of scope.

**H2 — `[ABOGADO]` markers.** Two occurrences, both inside `canon/C-005-licensing.md`
itself (§2.6 line 133 and the changelog line 430) — plus two mirrored copies in
`web/dist/` (build output, not tracked). **No unfilled `[ABOGADO]` field in an
operative legal document in this repo.**

**H3 — `TRADEMARKS.md` is 699 bytes.** Present and therefore §5-compliant in form.
Whether 699 bytes is adequate for a trademark notice is a judgement I do not make.
Signature state: not determinable from the file.

---

### I · `CLAUDE.md` vs C-005 §9 — *added block, approved*

**I1 — It is a literal copy, verified.**

```
C-005 §9 fragment : 70 lines, 4 072 chars
Block in CLAUDE.md: 70 lines, 4 073 chars
Identical after whitespace normalisation: TRUE
CLAUDE.md total: 103 lines → the copy is 68 % of the file
```

**I2 — Repository count.** Within the four local repositories:

| Repository | `CLAUDE.md` | C-005 fragment |
|---|---|---|
| `numinia-nwos` | present | **yes** |
| `numinia-web` | present | **NO** |
| `numinia-lore` | absent | — |
| `numengames-web` | absent | — |

§9 states "Se copia literal en cada repositorio". **One of four holds it.**
`numinia-web` has a `CLAUDE.md` without the fragment — divergence, not absence.

**Open question:** the true denominator is the GitHub organisation, not my local
clones. **I cannot determine the org-wide count without leaving scope.** Reported as
1-of-4-locally, explicitly not as an organisation figure.

**I3 — What breaks at v2.0.0.** The fragment asserts `docs/ADRs/specs → CC-BY-4.0`
and `lore/brand/unpublished → none, all rights reserved`. Under the CC0 decision both
become false. Since the block loads at the start of every agent session and carries its
own "source of truth; do not edit here", **an agent would be authoritatively misinformed
about the licensing regime on every run**, in at least one repository, until the copy is
reissued. Severity: high — it is the same failure as J, in the human channel.

---

### J · The CI guard vs C-005 — *added block, approved*

**J1 — What it asserts today.**

```
$ node scripts/check-license-frontmatter.mjs
license-frontmatter guard: OK — 273/296 .md files declare a license, all match REUSE.toml
exit=0
```

Its header declares its own scope: *"The human-readable `license:` frontmatter field is
not an SPDX tag: REUSE.toml is the declaration of record. This check fails when the two
contradict."* It enforces **§5**, coherence between frontmatter and `REUSE.toml`.

**J2 — What it is blind to.** Line 26: `execFileSync("git", ["ls-files", "*.md"])`.

**The guard inspects `.md` files only.** Every file in finding B1 — 7 `.woff2` fonts,
43 Design-System assets, 69 SVG icons — is invisible to it. The guard is green while
57 files carry a licence nobody declared, and it will stay green because those files
have no frontmatter to check. Consistent with D-025 (*no guard declares what it is
blind to*).

**J3 — What breaks at v2.0.0.** The guard validates against `REUSE.toml`, not against
C-005 directly. If the CC0 decision lands in `REUSE.toml`, the guard follows
automatically for `.md`. **But 273 of 296 `.md` files carry a `license:` frontmatter
field** that would each need updating, and the guard fails on mismatch — so it will
correctly turn red until every one is migrated. That is the guard working as designed,
and it is the CC0 sweep's real unit of work: **273 frontmatter edits**, not one TOML
line.

---

## 3. CC0 decision impact — consolidated

| Question | Measured answer |
|---|---|
| Files moving `CC-BY-4.0` → `CC0-1.0` | **249** |
| …of which already left under root CC0 | **59** (formalisation, not new grant) |
| …genuinely new grants | **190** |
| Files moving reserved → `CC0-1.0` | **42** |
| …of which already left under root CC0 | **31** (§4 pos. 5: unrecoverable anyway) |
| …where reservation is currently effective | **11** |
| Files that cannot pass to CC0 (third-party) | **76** (7 fonts + 69 icons) |
| Files with undemonstrable ownership | **undetermined** — only 1.0 % declare provenance |
| `.md` frontmatter edits required | **273** |
| C-005 sections contradicted | §1, §2 (two rows), §5, §6, §9 |
| C-005 sections that survive and constrain | §2.6, §4 pos. 5, §7 |
| Cloudflare zones needing a `robots.txt` decision | **6** (+1 non-Cloudflare host) |

---

## 4. Open questions — require an Oracle decision

1. **Is `ai-train=no` deliberate policy or an unreviewed Cloudflare default?** The
   answer determines whether the ADR ratifies or corrects. Six zones affected.
2. **`REUSE.toml` ordering (B1): a bug to fix, or is `MIT` the intended regime for
   `web/public/diseno/**`?** The annotation and the effect disagree; only the Oracle
   can say which was meant.
3. **The false attribution over third-party fonts (B2): who authorises the correction?**
   It is not cosmetic — it is a copyright claim over third parties, live in a public
   repository.
4. **Does `NOTICE` need to exist?** Depends on whether Apache-2.0 material is
   distributed. C3 shows it is not in the current artifact.
5. **Do the 31 already-CC0 reserved files (E4) keep a reservation the regime cannot
   deliver, or is the annotation corrected to reflect reality?**
6. **Is `standards/S-003` truly reserved?** It is one of the 11 where reservation is
   still effective, and the CC0 decision would reverse an Oracle ruling from
   2026-08-25 recorded in `REUSE.toml` itself.
7. **Ownership of catalogue material (E5.2)** — undeterminable at 1.0 % provenance
   declaration.
8. **Does `LICENSES/` need `OFL-1.1.txt`?** It is referenced by `REUSE.toml` but the
   text is absent — currently masked because the annotation never takes effect (B1).

---

## 5. Annexes

- **Annex 1** — `reuse lint` literal output: `/tmp/aud26/reuse-lint.txt`
- **Annex 2** — full SPDX SBOM (`reuse spdx`, 510 files, 194 001 B): `/tmp/aud26/sbom.spdx`
- **Annex 3** — `robots.txt` per host, seven files: `/tmp/aud26/robots/`
- **Annex 4** — the 31 already-CC0 reserved files: `/tmp/aud26/cc0_irrevocable.json`

> **Annex note.** These live outside the repository because this audit modified no
> tracked file other than this report. They are reproducible: `reuse lint`,
> `reuse spdx`, and the per-host `curl` loop, all at `8a529fa` with `reuse 6.2.0`.

---

## 6. Method and limits

**Verified, not assumed:**
- C-005 v1.3.0 read in full before auditing.
- Regimes taken from `reuse spdx` output, **not** from reading `REUSE.toml` — which is
  how B1 surfaced.
- `dist/` inspected by **contents** for the LGPL question, per §3.
- Historical CC0 window derived from `git ls-tree` at the actual commit.
- `robots.txt` captured live per host, byte-compared.

**Not verified, declared as gaps:**
- Embedded licence metadata in 37 images and 70 SVGs (XMP/EXIF/RDF) — `exiftool` absent.
- Organisation-wide count of the §9 fragment (I2) — out of scope.
- AI Crawl Control dashboard state (G3) — not externally observable.
- `TRADEMARKS.md` signature state.
- Ownership chain of catalogue material.

**Instrument caveat:** `reuse 6.2.0` was installed for this audit and is not pinned in
the repository. A future run with a different version may differ.

---

## 7. Correction note — v1.1.0, 2026-08-26

> Appended, not edited in place. This report is evidence; the superseded figure stays
> visible so the correction is auditable.

### C1 — Finding B1 understated its own scope: 50 files, not 119

**What v1.0.0 said** (§2, block B1, table row 3):

> `web/src/icons/**` → `MIT` (Phosphor) · 69 · `MIT` — correct by accident

**That is false.** The audit compared the *licence* (`MIT` declared, `MIT` effective),
concluded the row was harmless, and **never read the copyright line**. All 69 Phosphor
SVGs carried:

```
FileName: ./web/src/icons/archive.svg
LicenseInfoInFile: MIT
FileCopyrightText: <text>SPDX-FileCopyrightText: 2026 Numen Games S.L.</text>
```

while `REUSE.toml` declares `SPDX-FileCopyrightText = "Phosphor Icons
(https://phosphoricons.com)"` for that path. The same `["web/**", "scripts/**",
"infra/**"] = MIT` block that swallowed the `OFL-1.1` annotation also replaced the
Phosphor copyright holder with ours — the licence happened to coincide, the attribution
did not.

**Corrected count of B1:**

| | v1.0.0 | v1.1.0 |
|---|---|---|
| Fonts, wrong licence **and** wrong holder | 7 | 7 (10 incl. their `LICENSE-*.txt`) |
| Design system, wrong licence, holder correct (our work) | 43 | 43 |
| **Icons, licence correct, wrong holder** | **0 — reported as compliant** | **69** |
| **Total misdeclared** | **50** | **119** |
| **Of which are third-party misattribution** | **7** | **76** |

The false-attribution exposure was understated by a factor of ten: 7 files reported,
76 actual.

**How it was caught.** Not by re-reading the report — by executing the fix. Capturing
the "before" state for the B1 correction surfaced the copyright column the audit had
skipped. The audit checked one of the two fields REUSE resolves per file.

**Method lesson, for the next audit.** §6 of this report claims regimes were taken from
`reuse spdx` "not from reading `REUSE.toml`". True, but insufficient: the SBOM carries
`LicenseInfoInFile` **and** `FileCopyrightText`, and only the first was compared.
Reading the right instrument is not the same as reading all of it.

### C2 — Status of the corrected finding

Fixed in `fix/third-party-attribution` (merged, PR #69): 79 adjacent `.license` files
plus `LICENSES/OFL-1.1.txt`. Verified by effect with
`scripts/verify-third-party-attribution.py` — `OFL-1.1` occurrences in the SBOM went
from **0 to 7**, and no third-party file claims Numen Games copyright.

**Not fixed and still open:** the 43 own design-system files, which remain declared
`CC0-1.0` and effective `MIT`. Deliberately excluded — they are our work and expose no
third party. Separate PR.

### C3 — Annexes moved into the repository

Section 5 listed annex paths under `/tmp`, which does not survive. They now live in
`reports/audits/AUD-2026-08-26-licensing-c005/`:

| §5 said | Now at |
|---|---|
| `/tmp/aud26/reuse-lint.txt` | `AUD-2026-08-26-licensing-c005/reuse-lint.txt` |
| `/tmp/aud26/sbom.spdx` | `AUD-2026-08-26-licensing-c005/sbom.spdx` |
| `/tmp/aud26/robots/` | `AUD-2026-08-26-licensing-c005/robots/` |
| `/tmp/aud26/cc0_irrevocable.json` | `AUD-2026-08-26-licensing-c005/cc0-irrevocable.json` |

The `robots/` capture is the one that could not be reproduced later: the Oracle is
expected to switch off the Cloudflare managed block, and this is the only record of the
prior state that will exist.

---

## 8. Correction note — v1.2.0, 2026-08-26 · surface sweep, batch 1

> Appended, not edited in place. Batch 1 of the public-surface sweep. Later batches go
> to v1.3.0 and successive versions.
> **Scope of this measurement:** `numinia-nwos` @ `e4918fa` · public surface:
> `numinia.org`. Evidence: `AUD-2026-08-26-licensing-c005/surface-sweep-batch1.json`.

### C4 — The 11 "effective" reservations are not effective. None of them.

§E4 of v1.0.0 concluded that of the 42 reserved files, 31 had already been published
under root CC0 and **11 retained an effective reservation**. That conclusion measured
history (`git`), not the live surface. Measured against production, it is wrong.

**11 of 11 are reachable by URL. 22 probes, HTTP 200 on all of them.**

| Document | HTML | raw `.md` |
|---|---|---|
| `canon/C-001-welcome-to-numinia.md` | 200 · 59 109 B | 200 · 31 826 B |
| `canon/C-002-brand-and-culture.md` | 200 · 88 273 B | 200 · 54 150 B |
| `canon/C-003-attributes-and-ranks.md` | 200 · 31 915 B | 200 · 9 488 B |
| `canon/C-004-role-structure.md` | 200 · 56 717 B | 200 · 33 660 B |
| `canon/C-006-session-zero.md` | 200 · 47 716 B | 200 · 24 546 B |
| `canon/C-007-rank-specifications.md` | 200 · 22 817 B | 200 · 1 686 B |
| `canon/archive-lore.md` | 200 · 21 739 B | 200 · 1 667 B |
| `operations/legal/O-003-privacy-policy-numengames.md` | 200 · 33 591 B | 200 · 12 618 B |
| `operations/legal/O-004-terms-and-conditions-numengames.md` | 200 · 45 181 B | 200 · 22 027 B |
| `operations/strategy/O-007-sales.md` | 200 · 32 627 B | 200 · 9 107 B |
| `standards/S-003-platform-role-system.md` | 200 · 35 159 B | 200 · 10 270 B |

**Method note:** the URLs were **derived from the real routes in `dist/`** before
probing, not guessed. Each document was requested twice — the rendered page and the raw
markdown — because a document can be reachable as one and not the other. Both answered.

**Corrected count: effective reservations in `numinia-nwos` = 0.**

| | v1.0.0 | v1.2.0 |
|---|---|---|
| Reserved files | 42 | 42 |
| Already published under root CC0 (§E4) | 31 | 31 |
| **Retaining an effective reservation** | **11** | **0** |

### C5 — We are publishing a file that says it is not published

`S-003` is served in production and the served `.md` is **byte-for-byte identical** to
the one in the repository (10 270 B, verified with `diff`). Its own frontmatter, visible
to any reader, declares:

```yaml
license: "LicenseRef-Numen-AllRightsReserved"
```

**Estamos publicando un fichero que dice que no se publica.**

C-005 §4 is explicit: turning a repository public **is** the grant — *"una oferta de
licencia hecha públicamente con la obra disponible otorga derechos a quien los tome, sin
necesidad de `npm publish` ni de Arweave"*. The reservation is not weakened by this; it
is contradicted by it.

**Effect on open question 6 (`S-003`).** Dissolved. The 2026-08-25 ruling recorded in
`REUSE.toml` reasoned that CC-BY would let anyone adapt Numinia's ranks. Whatever the
merits of that argument, it protects nothing: the six ranks — NOMAD, CITIZEN, PILGRIM,
VERNACULAR, ARCHON, ORACLE — are legible today at
`numinia.org/corpus/standards/s-003-platform-role-system.md`. There is nothing left to
reserve.

### C6 — The `precedence = "override"` prohibition stays narrow, and here is why

The proposal for C-005 v2.0.0 §5.2 forbids `precedence = "override"` **on third-party
paths only**. It was left open whether to extend the ban repository-wide.

**This measurement settles it, and the answer is no.** The argument for extending it was
that `override` could silently revoke the reserved-regime annotations on `canon/**`,
`guilds/**` and `agents/**`. Those annotations protect nothing: 31 of the 42 files left
under irrevocable CC0, and the remaining 11 are served in the open. **The wider ban would
defend a surface that no longer exists.**

The narrow ban stands on its own footing: Phosphor Icons, Vercel/basement.studio, Huerta
Tipográfica and the Pixelify Sans authors hold **live** rights that an `override` line
would silently revoke, and unlike ours those are not ours to waive.

Recorded here so that whoever proposes widening it in a year finds the reason where they
will look for it.

---

## 9. Escalation — a governance finding, not a licensing one

> Separated deliberately. This is not about which regime a file carries.

**`O-003` (privacy policy) and `O-004` (terms and conditions) are served in full,
publicly, and no record shows anyone deciding it.**

- `numinia.org/corpus/operations/legal/o-003-privacy-policy-numengames.md` — 12 618 B
- `numinia.org/corpus/operations/legal/o-004-terms-and-conditions-numengames.md` — 22 027 B

`REUSE.toml` reserves `operations/legal/**` with an explicit rationale: *"Enforceable
legal texts of the company are not documentation: C-005 is silent on their regime, so
they stay in the birth regime (§1, reserved)."* Someone reasoned about their **licence**.
Nobody appears to have decided their **publication**.

`O-007` (`operations/strategy/**`, commercial strategy, "born closed" per MIS-071 phase
2) is likewise served: 9 107 B.

**Why this is a distinct class of problem.** A licence regime governs what others may
*do* with a text. Publication governs whether the text is *offered* at all, and an
enforceable legal document — one the company would rely on against a third party — that
reaches production without a decision is a governance failure regardless of its licence.
Changing the licence would not address it; a CC0 sweep would not address it either.

**Not resolved here.** It requires an Oracle decision on two separate questions: whether
these three documents should be publicly served at all, and — if the answer is that some
should — what gate their publication passes through, given that `C-005 §4` already
defines a signed gate for irreversible exposure and it was not applied.

---

## 10. Correction note — v1.3.0, 2026-08-26 · surface sweep, batch 2

> Evidence: `AUD-2026-08-26-licensing-c005/surface-sweep-batch2.json`.
> Completes the sweep over all 42 reserved files.

### C7 — The full picture: 39 of 42 reserved files are served

Batch 2 covered the 31 files that had already left under root CC0 (§E4). URLs derived
from `dist/` routes before probing, as in batch 1.

| | Files | Reachable |
|---|---|---|
| Batch 1 — "effective" reservations | 11 | **11** |
| Batch 2 — already CC0-irrevocable | 31 | **28** |
| **Total** | **42** | **39 (93%)** |

All 21 `agents/**` files are served (`SOUL`, `OPERATOR`, `MEMORY`, `STATUS` for adonaz,
nimrod, senet, ursa, procurador-01 and the template) at ~22–30 KB each. All 8
`guilds/**` charters and rosters likewise.

**The 3 that are not reachable**, confirmed by probing rather than by absence from
`dist/`:

| File | Evidence |
|---|---|
| `agents/INDEX.md` | `/corpus/agents/index/` → **307**; the section index `/corpus/agents/` → 200 |
| `canon/2026_04_15-Epistemic_Relations…-v0.2.0.md` | `/corpus/canon/…epistemic_relations…/` → **404** |
| `canon/2026_04_15-Pragmatic_Numen_System-v0.2.0.md` | `/corpus/canon/…pragmatic_numen_system…/` → **404** |

`agents/INDEX.md` is not withheld — it is superseded by a generated section index. The
two 2026-04-15 canon papers are genuinely absent from the public surface; **they are the
only two documents in the whole reserved set that are neither waived-and-served nor
reachable.** Their CC0 exposure from the 2026-04-06→08-16 window stands regardless (§E4).

**This does not change the v1.2.0 conclusion.** Effective reservations remain **0**: the
31 of batch 2 were already waived irrevocably, so their reachability adds evidence, not
a new legal fact. What it adds is scope — the exposure is not theoretical, it is 39
documents served today.

### C8 — Provenance census: the number that unblocks the canon

Full report: `reports/audits/AUD-2026-08-26-provenance.md`.

The population that matters is **190**, not 291: the 249 `CC-BY-4.0` files minus the 59
that already left under root CC0, plus zero from the reserved set (all 42 already waived
or served).

```
DECLARED_FORM      1     0.5%   explicit provenance field
DECLARED_SUBST    51    26.8%   author: names an LLM
HUMAN_OR_AGENT    98    51.6%   author: names a person or agent
NO_SIGNAL         40    21.1%   no author field — but all 40 have a git author
IRRECOVERABLE      0     0.0%
```

**Proposed cut: sweep 139 now (73.2%), hold 51 pending with a threshold (26.8%).** The
51 are the LLM-authored files, where §2.6 warns that purely machine-generated work may
generate no copyright — so a CC0 declaration over them would be **void of object**, not
merely premature. Criterion, alternatives rejected, and the exit threshold are in the
provenance report. **Proposed, not applied.**
