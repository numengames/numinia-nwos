---
id: "RPT-017"
uid: ""
title: "The MVP story: sixty-six missions, five arcs, one road still open to Alpha"
type: report
subtype: analysis
status: active
version: "0.1.0"
created: "2026-09-08T10:27:15Z"
created_source: "git:59f5cfa"
created_confidence: exact
updated: "2026-09-08T10:27:15Z"
author: "ursa"
owner: "oracle"
guild: "Alchemists"
tags: [mvp, narrative, missions, alpha, reset, compression]
license: "CC-BY-4.0"
visibility: "public"
scope: "What `missions/` shows as `done` at the measured commit, compressed into a narrative; not an audit of quality or of what remains."
related: ["MIS-0001", "MIS-127", "MIS-146", "ADR-005"]
---

# The MVP story: sixty-six missions, five arcs, one road still open to Alpha

> **Summary:** Sixty-six missions are `done` at `59f5cfa` (2026-09-08). This
> report compresses them into one narrative — what was actually built, not a
> list of cards — ahead of a planned corpus reset that will remove most of
> `missions/`'s present detail.
> **Epistemic:** What the `done` missions, read together, say happened.
> Individual mission bodies remain the primary source; this report is a
> lossy summary of them, made on purpose.
> **Pragmatic:** Read this instead of sixty-six files to understand what
> exists today. Cite the missions themselves, not this report, for any
> claim needing acceptance-criteria detail.
> **Audience:** Agents · Oracles · External collaborators

---

## Why this report exists, and why it stays open

Numen Games is about to do a **gran reseteo**: a deliberate reduction of
`missions/` that will strip most present-tense detail from the corpus and
start much of the system's operating memory close to zero. That is a good
move — it is the same "reduce uncertainty, keep only what a live question
needs" discipline `MIS-127` has been running on `decisions/`, `canon/`,
`operations/`, `reports/` and `debt/` since 2026-08-30 (see that mission's
ledger for the token-by-token accounting of each cut).

The problem a reset creates: once a `done` mission's record thins out or
disappears, the *story* of what was built goes with it — not the
acceptance criteria (nobody needs those after the fact), the narrative.
This report exists to save that narrative before the corpus does not carry
it any more.

**It stays `status: active`, not `closed`.** `STD-001` describes `reports/`
as a `closed`-from-publication series — but `scripts/lib/rules.json`, the
lifecycle the CI guard actually enforces, has no `report`-specific entry
and falls through to the default `draft → active → closed`. Enforcement
allows what the prose does not name. This report uses that room
deliberately: it is meant to be **appended to** — with dated notes, never
silent rewrites — as more missions close on the way to Alpha, and closed
only when the Oracle decides the MVP chapter is over. That is a
premise gap between doctrine and guard worth the Oracle's attention on its
own terms; it is not litigated here, only used and flagged.

**Measured at:** `59f5cfa`, 2026-09-08. Method: every `missions/MIS-*.md`
front matter parsed (`id`, `status`, `completed`, `guild`, `territory`,
`title`), template and annex files excluded. 149 mission files read; 66
carry `status: done`.

---

## The story, in five arcs

Sixty-six done missions, read by date and territory, cluster into five
arcs. Titles are exactly the missions' own; nothing paraphrased.

### Arc 1 — Bootstrap (2026-04-05 to 04-08, 11 missions)

The company got a repository, its agents got working tools, and the first
two protocols were written. `MIS-037` created the canon repository itself
(then `numinia-digital-agents`). `MIS-016` put Caddy and SSL in front of
every server service; `MIS-011` audited numengames.com. `MIS-051` and
`MIS-053` wired Gmail, Calendar, Drive and email (Khepri) into the agent
layer. `MIS-059` and `MIS-038` wrote the Context Load Protocol and the
Design Briefing Protocol — the first two things an agent was told to obey
before doing anything else. (The mission's own title still calls it
"P-007"; no live protocol answers to that id today — an unrenamed relic
of the pre-`PRO-` prefix scheme, not a citable identifier.) `MIS-057` ran the first deep QA of the whole
NWOS system. `MIS-042` and `MIS-047` gave the org a README and a standing
weekly report. `MIS-063` deployed the first public form, at `/velo`.

### Arc 2 — The archive becomes legible (2026-08-17/18, 11 missions)

Four months later, the corpus stopped being a private git tree and became
a public, English, on-brand website. `MIS-056` translated the canon to
English; `MIS-066` unified the mission system into one folder, one
language. `MIS-087` mirrored every canon document on numinia.org, `MIS-088`
made it downloadable as formatted PDF, `MIS-090` built a frozen demo
workspace so the system could be shown without burning tokens. `MIS-092`
`MIS-092` through `MIS-094` moved the whole surface onto Design System v5 — palette,
Phosphor icons, typography — commissioned by numinia.org as the consumer,
not handed down from elsewhere. `MIS-010` published the public roadmap
v1.0, `MIS-041` wrote the agent onboarding protocol, `MIS-044` published
the GAPS capability map — see `RPT-008` today.

### Arc 3 — Governance becomes visible (2026-08-25, 10 missions)

The board that tracks the work got designed as carefully as the product.
`MIS-132` and `MIS-133` reordered the Mission Board by operability and gave
mission cards a three-level hierarchy. `MIS-039` built the agent log
system. `MIS-045`
documented the CAO architecture. `MIS-091` extended the design system to
numen.games and nwos.numen.games. `MIS-110`, `MIS-111` and `MIS-114`
cleared dead nav entries, gave every corpus section a real index ordered
by certainty, and let `debt/` rejoin the build glob while an unready entry
stayed unpublished. `MIS-027` improved numengames.com itself.

### Arc 4 — The entropy-reduction line (2026-08-27 to 09-05, 20 missions)

This is the largest arc, and it is the one still running: it is the same
line `MIS-127` (still `in-progress`, not `done` — the umbrella outlives
its own child PRs) has been ruling on since 2026-08-30. `MIS-116` finished
the English translation; `MIS-064` updated `PRO-001` (then still cited as
"P-001") to Agent Briefing Protocol v2; `MIS-125` found and closed the
prefix register
gap across four series no rule knew about; `MIS-129` sent six blueprints to
the shelves their content actually belonged on. `MIS-144` retired dead
migration scripts; `MIS-145` gave every registered series a real
copy-from template (twelve of fourteen templates weren't even `.md` files
before this); `MIS-147` documented the relations between the corpus's
document genres. `MIS-062` shipped Mission System v2 (states,
sub-missions, IDs, kanban); `MIS-065` moved canon rendering to build time,
out of the code regime; `MIS-089` reordered the archive's information
architecture; `MIS-105` signed the standards governing three repositories
at once; `MIS-115` redesigned the Mission Board around what's actionable.
`MIS-117` added client-side search; `MIS-118` replaced the agent roster
with real operative definitions; `MIS-120` shipped `es-ES` as the first
additional locale. `MIS-122`, `MIS-126`, `MIS-128` and `MIS-130` are the
smaller repairs this line produces as a matter of course: a `uid` rule
that contradicted its own standard, a field-decision index so the canon
gets asked before the Oracle does, post-rename link hygiene, four dead
links in the front door. `MIS-058` and `MIS-060` are the protocol and
sync-mechanism side of the same discipline: structured human-machine
approval, and agents kept synchronized with the canonical repo.

### Arc 5 — The platform gets built (dates not recorded, 14 missions)

`numinia-web` — the product itself — is `done` in fourteen missions that
share one gap worth naming plainly: **none of them carries a `completed`
date.** `MIS-072` laid the monorepo foundations, domain model and quality
floor; `MIS-073` made the CC0 Archive browsable in five locales; `MIS-075`
reached functional parity with the original numinia.store; `MIS-076`
delivered the three pillars — La Ciudad, Assets, L.A.P.; `MIS-078` dressed
the platform (Khepri); `MIS-079` wrote the City as one scrolling
narrative; `MIS-080` turned L.A.P. into a real platform; `MIS-081` opened
the Manual and made the Archive count; `MIS-082` built the session
surface (Settings, the door); `MIS-083` opened the Oracle's admin zone
behind real sessions; `MIS-086` brought the real legal corpus into
numinia.com with a consent gate; `MIS-109` made canon filable
(frontmatter, registration, the term-divergence question); `MIS-119` let
the archive read any document aloud; `MIS-0143` integrated three new
agents — Calliope, Nimrod, Talos. **This report does not know when any of
these fourteen shipped**, only that `status: done` is asserted. That is a
data gap in `missions/` itself, not something this report can resolve by
summarizing harder.

---

## What this story leaves out, on purpose

Sixty-six `done` missions are roughly 44% of the 149 read at this commit.
The rest, briefly, so the MVP does not read as the whole picture:

- **32 `todo`**, **11 `in-progress`**, **2 `in-review`** — live work,
  covered by the board itself, not by a narrative report.
- **38 `frozen`** — 22 of them marked `cancelled` outright, 16 blocked or
  parked. The cancelled 22 are concentrated in the original commercial
  plan: `Product`, `Sales`, `Funding` and `Content` territory missions
  (34 total, only 3 `done`) include `MIS-001` — **"Define the Numinia MVP
  in one page,"** the mission that named the MVP this report is about —
  now itself `frozen: cancelled`, along with the first prototype
  (`MIS-003`), the first pricing model (`MIS-004`), the first landing page
  (`MIS-005`), and eight more of the same April cohort. **The MVP that
  shipped is not the MVP that was planned.** That is not a defect this
  report is positioned to judge; it is a fact worth the Oracle reading
  plainly rather than inferring from a missing card.

---

## The road to Alpha

The gran reseteo, when it lands, is expected to remove references and
restart most of `missions/` close to zero — the same reduction discipline
Arc 4 above has already been running, taken to a larger scope. This
report is written to survive that: its claims are sourced to commit
`59f5cfa` and to the missions themselves (recoverable from git history
even after a card is gone), and it is meant to grow — one dated section,
never a silent edit — as the corpus keeps moving from this MVP toward
Alpha. When the Oracle judges that transit complete, this report closes
(`status: closed`) as its own final entry, not before.

---

## Appendix — the 66, in arc order

| # | ID | Completed | Territory | Title |
|---|---|---|---|---|
| 1 | MIS-016 | 2026-04-05 | Infrastructure | Caddy + SSL for all server services |
| 2 | MIS-051 | 2026-04-05 | CAO | Gmail, Calendar and Drive integration with agents |
| 3 | MIS-053 | 2026-04-05 | CAO | Khepri — Numen Games email operational |
| 4 | MIS-037 | 2026-04-06 | CAO | Create numinia-digital-agents repository (Archive Summa) |
| 5 | MIS-059 | 2026-04-07 | CAO | P-007 — Context Load Protocol |
| 6 | MIS-057 | 2026-04-07 | CAO | Deep QA of the NWOS System — Coherence, Cycles, Human-in-the-Loop, Metrics |
| 7 | MIS-042 | 2026-04-07 | TBA | Main README for numinia-agents |
| 8 | MIS-047 | 2026-04-07 | TBA | Configure automatic weekly report |
| 9 | MIS-063 | 2026-04-07 | Product | NWOS Phase 2 — Iteration 1: Deploy Form at /velo |
| 10 | MIS-011 | 2026-04-08 | Infrastructure | Technical audit of numengames.com |
| 11 | MIS-038 | 2026-04-08 | CAO | Design Briefing Protocol v1.0 |
| 12 | MIS-010 | 2026-08-17 | Product | Numinia public roadmap v1.0 |
| 13 | MIS-041 | 2026-08-17 | CAO | Onboarding protocol for new agents |
| 14 | MIS-044 | 2026-08-17 | TBA | GAPS.md — Numen Games capability map |
| 15 | MIS-056 | 2026-08-17 | TBA | Repo Translation to English — NWOS Canon in English Only |
| 16 | MIS-066 | 2026-08-17 | CAO | Unify the mission system: one folder, one language, one page |
| 17 | MIS-087 | 2026-08-18 | TBA | The complete mirror: every canon .md navigable on numinia.org |
| 18 | MIS-088 | 2026-08-18 | TBA | The canon on paper: PDF download of the .md files with design-system formatting |
| 19 | MIS-090 | 2026-08-18 | TBA | Frozen demo workspace: showing NWOS without burning AI tokens |
| 20 | MIS-092 | 2026-08-18 | TBA | The palette comes home: numinia.org migrates to the System v5.0.0 canonicals |
| 21 | MIS-093 | 2026-08-18 | TBA | The icons speak Phosphor and the typography falls in line with the system |
| 22 | MIS-094 | 2026-08-18 | TBA | The emitter governs: Design System 5.1.0 commissioned by the consumer |
| 23 | MIS-027 | 2026-08-25 | Content | numengames.com improvement |
| 24 | MIS-039 | 2026-08-25 | CAO | Agent log system |
| 25 | MIS-045 | 2026-08-25 | TBA | Document CAO architecture |
| 26 | MIS-064 | 2026-08-25 | CAO | Update P-001 — Agent Briefing Protocol v2 |
| 27 | MIS-091 | 2026-08-25 | TBA | The System dresses the house: numen.games and nwos.numen.games adopt the standards |
| 28 | MIS-110 | 2026-08-25 | TBA | Retire the thirteen Sistema entries from the nav, leaving their pages reachable |
| 29 | MIS-111 | 2026-08-25 | TBA | Give each corpus section a real index, ordered from least to most uncertain |
| 30 | MIS-114 | 2026-08-25 | TBA | Filter the build by visibility, so debt/ can return to the glob without publishing D-033 |
| 31 | MIS-132 | 2026-08-25 | TBA | Order the Mission Board by operability, and show the date it sorts by |
| 32 | MIS-133 | 2026-08-25 | TBA | Give the mission card a three-level hierarchy, on the design system's scale |
| 33 | MIS-116 | 2026-08-27 | Archive | Translate the repo's remaining Spanish documents to English |
| 34 | MIS-117 | 2026-08-28 | TBA | Add client-side search to numinia.org with Pagefind |
| 35 | MIS-118 | 2026-08-28 | TBA | Replace the agent roster with the operative agent definitions |
| 36 | MIS-120 | 2026-08-29 | TBA | Multi-language numinia.org: es-ES first |
| 37 | MIS-128 | 2026-08-30 | Archive | Link hygiene after the English renames: canonicals, raw-md, OG image, and a 404 that helps |
| 38 | MIS-122 | 2026-08-30 | Archive | The uid rule contradicts its standard: fix H-09 before anyone obeys it |
| 39 | MIS-126 | 2026-08-30 | Archive | The field decision index — ask the canon before asking the Oracle |
| 40 | MIS-130 | 2026-09-01 | Archive | Fix the four dead links in README.md — the entry point resolves |
| 41 | MIS-058 | 2026-09-02 | TBA | Approval Brief Protocol: Structured communication for human-machine approvals |
| 42 | MIS-060 | 2026-09-02 | CAO | Agent Synchronization with the Canonical Repo |
| 43 | MIS-062 | 2026-09-02 | CAO | Mission System v2 — States, Sub-missions, IDs, Kanban |
| 44 | MIS-065 | 2026-09-02 | TBA | Canon at build time — narrative out of the code regime |
| 45 | MIS-089 | 2026-09-02 | Archive | Information architecture: the archive gets ordered and the web mirrors it by sections |
| 46 | MIS-105 | 2026-09-02 | TBA | Sign the standards and define the sync: a draft is governing three repositories |
| 47 | MIS-115 | 2026-09-02 | TBA | Redesign the Mission Board so its order and cards say what is actionable |
| 48 | MIS-125 | 2026-09-02 | Archive | The prefix register — four series carry identifiers no rule knows about |
| 49 | MIS-129 | 2026-09-02 | Archive | Send each blueprint to the shelf its content belongs on, and open the two shelves that were missing |
| 50 | MIS-144 | 2026-09-03 | Archive | Retire dead migration scripts and superseded one-shot fixes from scripts/ |
| 51 | MIS-145 | 2026-09-04 | Archive | Series template library: every registered series gets a copy-from template in templates/ |
| 52 | MIS-147 | 2026-09-05 | Archive | Document the relations between the NWOS document genres |
| 53 | MIS-072 | — | Platform | numinia-web foundations: monorepo, domain model, quality floor |
| 54 | MIS-073 | — | Platform | The CC0 Archive: every public asset browsable in 5 locales |
| 55 | MIS-075 | — | Platform | Functional parity with the original numinia.store public surface |
| 56 | MIS-076 | — | Platform | Three pillars: La Ciudad, Assets, L.A.P. |
| 57 | MIS-078 | — | Platform | Khepri: the platform dresses itself |
| 58 | MIS-079 | — | Platform | The City chronicle: /city/ as one scrolling narrative |
| 59 | MIS-080 | — | Platform | The L.A.P. becomes a platform |
| 60 | MIS-081 | — | Platform | The Manual opens, the Archive counts |
| 61 | MIS-082 | — | Platform | Settings and the door: L.A.P. session surface |
| 62 | MIS-083 | — | Platform | The Oracle's zone: admin surface behind real sessions |
| 63 | MIS-086 | — | Platform | The real legal corpus enters numinia.com and the gate asks for its acceptance |
| 64 | MIS-109 | — | Archive | Make canon filable: frontmatter, registration and the term divergence |
| 65 | MIS-119 | — | TBA | Listen to the archive: speak any document aloud from its page |
| 66 | MIS-0143 | — | Archive | Integrate three new agents: Calliope, Nimrod, Talos |

---

## Version history

- v0.1.0 (2026-09-08) — First publication. 66 `done` missions at `59f5cfa`
  compressed into five narrative arcs, ahead of the planned corpus reset.
