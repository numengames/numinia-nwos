---
id: "DBT-018"
uid: ""
title: "The design system is four documents in one file, and a build script reads it by heading"
type: documentation
status: active
version: "0.2.0"
created: "2026-09-07T12:40:00+02:00"
updated: "2026-09-07T14:20:00+02:00"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, design, standards, protocols, axis]
license: "CC-BY-4.0"
severity: high
severity_reason: "the largest document in the corpus mixes three layers of the axis and a build script depends on its section numbers"
detected: "2026-09-07"
visibility: "restricted-oracle"
visibility_reason: "internal structural debt"
opened_by: "ursa"
related: ["MIS-0146", "STD-008", "DBT-013", "DBT-014", "DBT-016"]
---

# DBT-018 — The design system is four documents in one file

> **Summary:** `STD-008` is 18,447 words — two thirds of everything the standards
> series has in draft. It holds art direction, a standard, a protocol and a
> published artefact in one file, and `generate-design-kit.mjs` extracts three of
> the kit's files by searching for literal heading strings — fixed in this entry.
> **Epistemic:** What the file actually contains, measured section by section.
> **Pragmatic:** The generator blocker is removed here; the split remains.
> **Audience:** Agents · Oracles

---

## 1. The measurement

18,447 words. **33 obligations.** One obligation per 559 words; `STD-010` carries
one per 74.

Six of nineteen sections are marked `[CANON — direction decision]` **in their own
titles**. The file says what it is and no one acted on it.

| Layer | Words | What it is |
|---|---|---|
| Art direction (§2, §6, §7, §8, §10) | ~7,300 | The 40/40/20 mix, the four registers, textures, motion. Reasoning and taste, not rules |
| Standard (§3, §4, §5, §11, §12) | ~3,400 | Colour, type, grid, verbal identity, accessibility. Checkable |
| Protocol (§13, §19) | ~3,600 | Recipes per medium, and a seven-step algorithm an agent executes |
| Register and apparatus (§0, §1, §9, §14–§17) | ~4,100 | How to read it, components, roadmap, credits |

§19 is the clearest case in the corpus: a precedence list, a numbered algorithm,
a pre-delivery checklist and a reusable instruction fragment. That is a protocol
in every respect except its address.

---

## 2. The generator no longer blocks the split

`scripts/generate-design-kit.mjs` built the published kit — `sistema.css`,
`sistema.js`, `sistema.tokens.json`, `sistema.prompt.txt` — by locating **literal
heading strings** inside the master:

```js
const css = header("css") + block("### 13.1", "css");
const js  = header("js")  + block("### 13.1", "js");
```

Moving §13.1 into another document broke the kit. Renumbering it broke the kit
**silently**: `indexOf` returned −1 and the error named a missing heading rather
than the cause.

**Fixed here.** The master now carries `<!-- kit:css -->` and `<!-- kit:js -->`
immediately before the two published blocks, and the generator extracts by
marker. A marker survives renumbering, reordering, and moving the section into a
different file. Duplicate markers are rejected rather than resolved by position.

Verified at `6cbbc76`:

```
$ node scripts/generate-design-kit.mjs && diff -q before.css …/sistema.css
   → byte-identical, both files

$ sed -i 's/^### 13\.1 /### 99.7 /' standards/STD-008-design-system.md
$ node scripts/generate-design-kit.mjs
   → OK, css still byte-identical
```

The second command is the one that mattered: under the old generator it produced
a broken kit with no diagnostic.

This removes the blocker, not the debt. The file is still four documents.

## 3. What is NOT wrong with it

The document is **not** out of sync with the code. Verified at `6cbbc76`: the kit
holds 239 tokens and 36 hex colours, and **every one of them appears in the
master**. The six hexes in the document that are absent from the kit are all
quoted as defects — colours the live site uses that the system rejects.

The generator runs clean and reproduces the committed kit byte for byte.

So this entry is not about drift. It is about a file that is four documents, and
a script that pins it to its own layout.

---

## 4. Closure condition

> **Closes when:** art direction, standard and protocol each live in their own
> document, and the kit generator extracts by an explicit marker rather than by
> heading number.

The order is forced: **the generator must be fixed first.** Any split attempted
before that breaks the published kit or, worse, silently empties it.

---

## 5. What this does not claim

It does not claim the content is wrong or should be shortened. The 40/40/20 mix
and the four registers are the most carefully reasoned material in the corpus.

The defect is that a reader looking for *what must I comply with* has to read
7,300 words of taste to find 3,400 words of rule, and an agent looking for the
algorithm finds it at the end of a file about colour.
