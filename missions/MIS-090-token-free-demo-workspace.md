---
id: "MIS-090"
title: "Frozen demo workspace: showing NWOS without burning AI tokens"
type: mission
status: done
version: "1.1.0"
created: "2026-08-18"
updated: "2026-08-18"
completed: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [nwos, deploy, demo, marketing, cost, velo]
license: "CC-BY-4.0"
mission_id: "MIS-090"
area: "NWOS deploy / nwos.numen.games"
guild: "Alchemists"
type_execution: "digital"
priority: "medium"
effort: "M"
requested_by: "oracle"
assigned_to: null
requires_oracle_approval: false
depends_on: []
---
# MIS-090 — Frozen demo workspace

> **Summary:** Generate a real NWOS workspace ONCE, freeze the result and
> serve it as a navigable public example — without an access key and
> without calling the Anthropic API again. AI cost: a single generation;
> afterwards, zero.
> **Epistemic:** How to show the product without every curious visitor
> burning tokens.
> **Pragmatic:** A "see an example" link on `/velo` and `/idioma` that
> anyone can open.
> **Audience:** Oracle · nwos-deploy agents

---

**Area:** NWOS deploy / nwos.numen.games
**Guild:** Alchemists
**Type:** digital
**Priority:** medium
**Effort:** M

---

## Origin

MIS-055 work session (2026-08-18). While implementing the 1–5 selectors on
`/idioma`, the need for a tangible product example emerged. Today the only
way to see an NWOS workspace is launching a real deploy from `/velo`, which
(a) creates a private repo, (b) consumes Anthropic tokens generating the
canon, and (c) returns a single-use access key. That same day, an aborted
deploy (`rituals-marca-de-cremas`) made the fragility and cost of using the
real flow as a demo plain.

**Oracle's decision:** not implemented now; recorded as a mission.

## Story

As a visitor to nwos.numen.games evaluating NWOS, I want to browse an
already-generated example workspace, to understand what the system produces
without launching a deploy and without Numen burning AI tokens per visit.

## Proposed scope

1. Run the real `/api/registro` flow a single time with a fictitious demo
   organization (name and canon hand-tuned if retouching is needed).
2. Freeze the result: the generated repo is marked as demo and never
   regenerated.
3. Serve it in public read-only mode: a route like `/workspace/demo` (or
   the real slug) accessible **without an access key** — an explicit,
   bounded exception to the `src/lib/token.ts` HMAC, read-only, that slug
   only.
4. Link it as "See a live example" from `/velo` (nwos-deploy) and
   `/idioma` (numinia.org).
5. Zero Anthropic calls on the viewing path: the viewer is already
   read-only over GitHub; verify no visit triggers generation.

### Discardable/complementary alternative

A 100% client-side demo: template personalization in the browser
(placeholders → org name) with no generated canon. Zero cost always, but it
shows the empty mould, not the result. It can serve as a prior step or a
substitute if the public read-only mode gets complicated.

## Acceptance criteria

- [x] Demo workspace generated once and frozen (no periodic regeneration)
      — repo `faro-austral` archived on GitHub on 2026-08-18
- [x] Publicly navigable without an access key, read-only, that slug only —
      `tree`/`file` exempt only `DEMO_WORKSPACE_SLUG` (`src/lib/demo.ts`);
      any other slug remains 403
- [x] No demo visit triggers Anthropic API calls — the viewer only reads
      from GitHub; Anthropic lives solely in `/api/registro`
- [x] Links from `/velo` (demo + numinia.org as the 5/5 reference) and
      `/idioma`
- [x] The demo repo complies with C-005 — reserved LICENSE in Faro
      Austral's name with no placeholders, zero mould artifacts,
      PROVENANCE.md present

## Execution Reality

- **Organization chosen:** Faro Austral (fictitious; the Oracle ruled out
  using Numinia — it would have produced a parallel generated canon
  competing with the real consecrated canon). Navigable at
  https://nwos.numen.games/workspace/faro-austral
- **Two real flow defects came to light and were fixed in nwos-deploy:**
  1. The strip deleted artifact by artifact through the contents API (one
     commit and 2+ subrequests per file); with the mould's grown spec the
     first attempt aborted midway, leaving an orphan. Now
     `buildInstallTree` (pure, tested) emits a single commit via the Git
     Data API — ~6 fixed subrequests.
  2. The mould's workflows fired zombie runs in the generated repo with
     every personalization commit (failing in cascade after the strip).
     Now the deploy disables Actions in the generated repo before the
     first push.
- **Minor divergence:** the inline canon generation stalled at C-003 and
  the HTTP client hit its timeout (the known abort of the long POST).
  C-003 and C-004 were completed with the same model, tool and prompts as
  `registro.ts`, committed with the agent's same messages, before
  freezing. Deferred generation (a queue instead of a synchronous POST)
  remains known debt of the flow, outside this mission's scope.
- **Executing agent:** claude-fable-5 (Pablo's session)

## Version history

- v1.0.0 (2026-08-18) — Initial record. Decided in the MIS-055 session:
  documented, not yet executed.
- v1.1.0 (2026-08-18) — Executed and closed the same day: the
  `faro-austral` demo generated, frozen and linked; two flow fixes landed
  in nwos-deploy along the way.

*Claude (Fable 5) + Pablo — 2026-08-18*
