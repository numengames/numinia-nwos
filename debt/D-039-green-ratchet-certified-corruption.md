---
id: "D-039"
uid:
title: "A green ratchet certified 85 corrupted files"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-30T14:07:58Z"
created_source: "git:d4c2975"
created_confidence: exact
updated: "2026-08-30T14:07:58Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
territory: "Archive"
tags: [debt, guards, ci, blind-spots, frontmatter, D-025, D-001]
license: "CC-BY-4.0"
visibility: "public"
severity: high
opened_by: "Ursa, 2026-08-30"
---

# D-039 — A green ratchet certified 85 corrupted files

## What happened

PR #134 (`d4c2975`, phase 2 of the header burndown) rewrote 85 documents. Its
migration script read frontmatter with this regex:

```
r'^---\s*\n(.*?)\n---(\n|$)'
```

Group 2 **consumed** the newline that closes the fence. The write format did
not put it back:

```
"---\n%s\n---%s" % (frontmatter, rest)
```

Two distinct corruptions followed, depending on what came after the fence:

| | files |
|---|---|
| fence glued to the body — `---# BP — CAO` | 79 |
| blank line after the fence silently deleted | 6 |

Eighty-five, exactly the documents the phase touched.

## Why nothing caught it

**All five guards stayed green.** The ratchet reported `446 findings (446
baselined) — no new violations`, and the PR merged on that evidence.

- `lint-frontmatter.mjs` splits frontmatter with a **tolerant** regex, so it
  read all 85 headers correctly and found nothing to report.
- Astro's parser is equally tolerant: the site built 679 pages, the `H1`
  rendered correctly, and the `---` never leaked into the page as text.
- The license guard reads the same tolerant way.

Every instrument the corpus owns agreed the files were fine. **The damage was
invisible precisely because our tools are more forgiving than the standard.**

A YAML parser that requires `---` on its own line — the behaviour the spec
describes — reads **no frontmatter at all** in the 79 glued files. The day
anyone points a standard tool at this corpus, 79 documents lose their headers
at once, and the blast radius is every downstream consumer, not this repo.

## The general shape

This is D-025 (*"no guard declares what it is blind to"*) with a sharper
edge. D-025 says a guard should declare its blind spots. D-039 says something
worse: **a guard's tolerance is itself a blind spot, and a tolerant reader
cannot detect damage that only a stricter reader would see.**

Green does not mean correct. It means *no instrument we own disagreed*.

The gap between those two statements is where this bug lived for one merge.

## What was done

- `scripts/repair-frontmatter-delimiter.py` restores the original separator
  byte for byte, read from the pre-damage git object rather than assumed.
  Verified: 307 document bodies identical to their pre-phase-2 state, 0
  differing.
- `scripts/check-frontmatter-delimiter.mjs` is a new guard that asserts the
  fence closes on its own line — the property a strict parser needs and the
  tolerant ones never checked. No baseline: the corpus is at zero today, so
  any reappearance is a regression, not inherited debt.
- The phase 2 script itself was fixed, so re-running it is safe.

## What remains open

1. **The new guard is not in CI.** It runs locally only. Wiring it into the
   workflow is the Oracle's territory (D-017). Until then this protection is
   a script someone has to remember to run.
2. **No guard reads the corpus with a strict parser.** The delimiter check
   closes the specific hole; it does not close the class. A second reader that
   parses every header the way an outside tool would — and disagrees loudly
   when our tolerant reader accepts something it rejects — is the real fix.
3. **The census is unproven for older commits.** The repair verified against
   `d4c2975~1`. Whether earlier migrations left similar tolerant-only damage
   has not been measured.

## Owner

Oracle. Item 1 requires workflow access the agent does not have.
