---
id: "MIS-110"
title: "Retire the thirteen Sistema entries from the nav, leaving their pages reachable"
status: backlog
priority: medium
effort: XS
guild: alchemists
area: web
type_execution: digital
assigned_to: null
completed: null

type: mission
version: "1.0.0"
created: "2026-08-25"
updated: "2026-08-25"
author: "ursa"
owner: "oracle"
tags: [web, nav, archive]
license: "CC-BY-4.0"
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

---

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

---

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

---

## Closure

*(Fill when the mission closes. Not before, and not with intentions.
Add here — never edit `Scope` or the criteria to match what happened.)*

- **What was done:**
- **What diverged, and why:**
- **Evidence:**
- **Closed:** YYYY-MM-DD · **by:**
