---
id: "MIS-110"
uid: ""
title: "Retire the thirteen Sistema entries from the nav, leaving their pages reachable"
status: done
priority: medium
effort: XS
guild: "Alchemists"
territory: "TBA"
type_execution: digital
assigned_to: "ursa"
completed: "2026-08-25"

type: mission
version: "1.0.1"
created: "2026-08-25T18:54:47Z"
created_source: "git:716f20c"
created_confidence: exact
updated: "2026-09-02T01:55:26+02:00"
author: "ursa"
owner: "oracle"
tags: [web, nav, archive]
license: "CC0-1.0"

context: "2026-08-25"
paths: [web/src/data/navigation.ts]
---
# MIS-110 — Retire the thirteen Sistema entries from the nav, leaving their pages reachable

> **Summary:** the "Sistema" dropdown drops its thirteen entries; the four main
> ones stay and every page stays built and reachable by URL.
> **Epistemic:** what a nav costs when it is a hand-written list — and whether
> removing an entry is separable from removing a page.
> **Pragmatic:** a smaller nav, and a reversible commit that touches one file.
> **Audience:** Agents · Oracles

## Scope

`web/src/data/navigation.ts`, and only that file. The thirteen entries under
the `Sistema` dropdown are removed from the `navItems` array:

```
/agente  /archive  /audits  /cao  /continuidad  /corpus
/diseno  /gaps     /idioma  /simulaciones  /soluciones
/ventas  /wardley
```

The four top-level entries — `/missions`, `/decisiones`, `/planos`,
`/reportes` — stay.

One commit, reversible, with the thirteen named in the message.

> **Scope and Acceptance criteria are written now and are not edited later.**
> What actually happens goes in `Closure`.

### Out of scope

**Nothing is deleted.** Not `web/src/pages/`, not a single file, not a redirect
added. The pages keep building and keep answering at their URLs — they stop
being *listed*, not being *served*.

That separation is deliberate and comes from the phase-0 measurement: ten of
these thirteen routes are **orphan pages**, hand-written `.astro` holding
1,668–16,679 characters of prose that exists in no `.md`. Deleting the file
would destroy the only copy. Removing the nav entry achieves the intended
effect with none of that risk; deletion is decided later, with the
classification in hand.

Also out of scope: `D-032`'s question of whether that prose should move into
the corpus, and any change to `content.config.ts`.

## Acceptance criteria

*(Each states what it returns today at base commit `4a87219`, so it is visibly
false before the work starts. Phrased as final states — a count of removed
entries would rot as soon as the nav changes again.)*

- [ ] The rendered nav on the home page contains exactly **5** unique internal
      links — `/`, `/missions`, `/decisiones`, `/planos`, `/reportes`.
      **Today: 18.**
      ```bash
      python3 -c "import re;s=open('web/dist/index.html').read();\
      m=re.search(r'<nav\b.*?</nav>',s,re.S);\
      print(len(dict.fromkeys(re.findall(r'href=\"(/[^\"#]*)\"',m.group(0)))))"
      ```
- [ ] All thirteen pages still build: each of
      `web/dist/{agente,archive,audits,cao,continuidad,corpus,diseno,gaps,idioma,simulaciones,soluciones,ventas,wardley}/index.html`
      exists. **Today: 13 of 13, and this must not regress.**
- [ ] `find web/dist -name index.html | wc -l` returns **643**, unchanged.
      **Today: 643**, with this mission already in the tree — it adds three
      artefacts of its own (`/missions/mis-110/`, `/print/…`, and the
      `/misiones/…` redirect). Removing a nav entry must not remove a page.
- [ ] `git diff --stat -- web/src/pages/ web/src/content.config.ts` is empty.
      **Today: empty, and it stays empty.**
- [ ] `npm run build` exits 0 and `node scripts/check-references.mjs` reports
      no new broken references against the baseline of 17. **Today: 13+4, baseline 17.**

## Closure

*(Written at closing. Nothing above this line was edited.)*

- **What was done:** the `Sistema` dropdown and its thirteen entries removed
  from `navItems` in `web/src/data/navigation.ts`. One file, 13 insertions and
  19 deletions, and the thirteen routes are listed in a comment in place of the
  entries so the next reader knows what was there and why it went.

  All five criteria met, measured after the change:

  ```
  nav links       5  ['/', '/missions', '/decisiones', '/planos', '/reportes']
  13 pages        13 of 13 still built
  page count      643, unchanged
  pages/ + config diff empty
  references      baseline 17, no new broken
  ```

- **What diverged, and why:** the plan said "one commit touching one file", and
  that held — but it left the `NavChild` type and the `children` branch of the
  `NavItem` union with no remaining user. The build passes (`exit 0`, 527
  pages) because unused exported types are not an error, so **no criterion
  caught it**.

  Left in place deliberately rather than tidied: removing them is a change to
  the nav's type contract, not to the nav's content, and this mission's scope
  was the entries. **A criterion set that is fully green can still leave dead
  code behind** — the criteria checked what the nav renders and what still
  builds, which is what was asked, and neither question can see an unused type.

  Worth stating because it is the same shape as everything else measured
  today: the guard verifies what it was pointed at, and is silent about the
  rest.

- **Evidence:** `385c29d` is the base commit; every criterion above was run
  before and after. Before: 18 nav links, 13/13 pages, 643 pages. After: 5, 13,
  643. Pages confirmed still serving real content, not stubs — `/gaps` 50,861 B,
  `/soluciones` 53,762 B, `/agente` 57,385 B, `/wardley` 48,269 B.
  Guards: licence 265/288, references baseline 17 no new, orphan-content exit 0.

### Verified in production — the first complete chain

Merged as `a3ccf34` (PR #58) and confirmed **from outside**, against
`numinia.org` rather than `dist/`:

```
nav                5 links   /  /missions  /decisiones  /planos  /reportes
the thirteen       13 of 13 return 200
footer             v0.0.1 · a3ccf34  → github.com/…/commit/a3ccf34
```

The footer SHA equals the merge commit of this mission, so the page states
which build it is and that statement is checkable by anyone.

**This is the first time the chain ran end to end: merge → checks → deploy →
verifiable in the footer.** Eight days earlier the same site served a build from
2026-08-17 while `main` moved on, and nothing on the page said so; the only way
to tell was probing URLs. Two of the four links in that chain were built today —
the footer (`cecaae7`) and the reconnected Workers Builds integration — and this
mission is the first to cross all four.

Worth separating, because they are different claims: **the thirteen pages
returning 200 is the mission's substance**, not a side effect. Removing an entry
from a list and deleting a page look identical to a visitor reading the nav, and
only the second is destructive. The 13/13 is what proves this was the first.

- **Closed:** 2026-08-25 · **by:** ursa

## Version history

- v1.0.1 (2026-09-02) — Form: import-era `---` rules removed. missions/ normalisation, lot 4.
