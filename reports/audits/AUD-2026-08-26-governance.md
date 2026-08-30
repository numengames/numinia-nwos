---
id: "AUD-2026-08-26-governance"
uid:
title: "Three governance findings that are probably one, and the YAML two guards are waiting for"
type: report
subtype: audit
status: closed
version: "1.0.0"
created: "2026-08-26T17:15:00Z"
created_source: "git:6ca384a"
created_confidence: exact
updated: "2026-08-26T17:15:00Z"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Archive"
tags: [audit, governance, D-017, P-003, layers, guards, ci, escalation]
license: "CC-BY-4.0"
evidence_head: "6ca384a"
scope: "numinia-nwos @ 6ca384a · public surface: numinia.org"
---
# Governance findings, and the YAML the guards are waiting for

> **Registered, not resolved.** No redesign is proposed. The Oracle asked for
> these to be recorded together because they are probably one problem seen from
> three places.

---

## Part 1 — The YAML, ready to paste

Two guards exist, are verified, and do not run. Both are blocked by the same
thing: `D-017` forbids the agent from touching `.github/workflows/`. This section
removes every step between "written" and "running" except the paste itself.

### 1.1 What each guard protects, and since when it has not

| Guard | Protects | Never run since |
|---|---|---|
| `check-orphan-content.mjs` | that nothing reaches the published site without passing through the renderer or a declared exception — content in `web/public/` served with no frontmatter, no `id`, no licence and in no index | **2026-08-25** — born disconnected, 3 revisions the same day |
| `resolve-citations.py` | that no document cites an identifier (`S-004`, `ADR-006`…) that does not exist in the repository | **2026-08-25** |

Neither is a regression. Both are **incomplete installations**, and both debts
say so in writing — see Part 2.

### 1.2 Behaviour measured at `6ca384a`, before proposing anything

```
$ node scripts/check-orphan-content.mjs
  files in public/            : 66
  of those, present in dist/  : 56
  non-asset (orphan content)  : 2
  [known] /diseno/index.html                                  D-032 · accepted
  [known] /diseno/plantillas/2026_08_03-Plantilla_Factura...  D-032 · accepted
  OK — 2 orphan(s), all tracked.
  exit=0
```

**Green today.** It carries its own allow-list with a reason per entry, so wiring
it does not break the build.

```
$ python3 scripts/resolve-citations.py
  identificadores rotos : 5
  exit=1
```

**Red today.** Line 156 is an unconditional `sys.exit(1)` on any broken citation,
and there are 5 (`S-004`…`S-007`, `S-010` and similar). **Wiring it as-is turns
CI red on the next PR.**

That difference decides the shape of the paste: one guard is ready, the other
needs a baseline first — exactly the mechanism `check-references.mjs` already
uses (`scripts/references-baseline.json`, 17 frozen entries).

### 1.3 The paste

**File:** `.github/workflows/ci.yml`
**Insertion point:** after the existing `reference lint` step (line 30), before
`install` (line 31). Order matters only in that guards run before the build, so
a failure is attributable.

```yaml
      - name: orphan-content guard (D-032 — nothing reaches the site unrendered)
        run: node scripts/check-orphan-content.mjs
```

That is the whole change for guard 1: **two lines, one step.**

**Guard 2 is deliberately NOT proposed for pasting yet.** Wiring
`resolve-citations.py` today makes CI fail immediately on 5 pre-existing broken
citations. It needs the same treatment `check-references.mjs` got: a frozen
baseline of what is already broken, so the guard fails only on *new* breakage.
That is a code change to the script, not a YAML paste, and it is not blocked by
`D-017`.

### 1.4 What breaks if the paste is wrong

| Failure mode | Symptom | Recovery |
|---|---|---|
| Wrong indentation | GitHub Actions refuses the workflow file entirely — **all** CI stops, including the licence guard | revert the file; YAML is whitespace-sensitive at 6 spaces for `- name:` under `steps:` |
| Pasted after `install`/`build` | Guard still runs, but a build failure masks a guard failure | move the step above `install` |
| Node missing | `node: command not found` | must sit after `actions/setup-node`, which is line 22 — the proposed point already does |
| Guard goes red later | PR blocked with `orphan-content guard: N untracked` | either register the file in the guard's allow-list with a reason, or move it into the corpus. Both are legitimate; the point is that it becomes a decision |

**Verified before proposing:** the guard exits 0 at `6ca384a`, so pasting it does
not turn `main` red. `scripts/verify-orphan-guard.sh` breaks it on purpose and
asserts it names the probe — the guard has a test, which is more than the two
guards currently in CI have.

---

## Part 2 — Governance findings

### F-1 · The workflow of this session contradicted the NWOS layer design

**What happened.** Layer 3 — the human layer — approves and sets direction. In
this session the Oracle approved six or seven **git operations in terminal
boxes**: resets, a force-push, conflict resolutions. That is layer 1 work.

And the inverse: the decisions that genuinely were the Oracle's — the CC0 regime,
bounding the sweep, the narrow `override` prohibition, ruling that the P-003/P-009
cycle constitutes substantial human intervention — **were taken in a chat and do
not exist in the repository.**

| | Where it happened | Where it should live |
|---|---|---|
| `git reset --hard`, force-push, conflict resolution | Oracle approval, one by one | agent, layer 1 |
| CC0 regime for the corpus | chat | canon / ADR |
| Sweep partition 179/11 | chat | signed decision |
| Narrow `override` ban | chat | C-005 §5.2 |
| P-003 = substantial human intervention | chat | ADR — it is a legal reading of §2.6 |

**What did not need approval got it. What needed a signature left no trace.**

**The question this raises, and it is the one that matters:** if layer 3 is only
meant to approve, **through what surface should an approval arrive?** Today it
arrives as a terminal box asking the Oracle to adjudicate a `--force-with-lease`.
Deciding whether a force-push is safe is not an Oracle decision — it is a
mechanical question about whether a backup exists, and the agent can answer it.
Meanwhile the decisions that *are* Oracle-shaped arrive as chat messages, which
no protocol records and no document preserves.

**Not proposed here.** Registered.

### F-2 · `D-017` has no handover protocol

`D-017` forbids the agent from touching `.github/workflows/`. **The restriction is
correct** — CI configuration is the one surface where an agent could disable its
own supervision.

**What does not exist is the mechanism by which finished work reaches the hands
that can apply it.** The guard was written, tested and documented on 2026-08-25.
It has not run once since. Nothing was blocked, nobody was waiting on a decision:
the four lines of YAML simply had no route from the agent to the Oracle's clipboard.

This report's Part 1 *is* that route, improvised. **A restriction without a
handover protocol converts finished work into stalled work, silently** — no
alert fires, no board shows it, and the debt entry that documents it is itself
only read when someone goes looking.

### F-3 · The board cannot represent responsive work — and neither can the archive

Recorded in `AUD-2026-08-26-process` §5: `numinia.org/missions` is built from
`missions/`, and 4 of today's 7 PRs have no mission. P-003 describes a cycle for
*planned* work; roughly 79% of merged commits are not planned that way.

The provenance census hit the same wall from the other side
(`AUD-2026-08-26-provenance` §7.3): 3 documents could not be anchored to any
protocol cycle, and **two of them are exactly this kind of responsive work** —
`P-012-ruling-with-a-condition.md` and `AUD-2026-08-24-canon-edit.md`.

### Why these are probably one finding

All three are the same shape: **the system has no artefact for work that is
decided and executed inside a single conversation.**

- **F-1**: the decision has no document, so it lives in a chat.
- **F-2**: the finished work has no handover, so it waits in a branch.
- **F-3**: the executed work has no mission, so the board cannot show it and the
  provenance census cannot anchor it.

A mission is briefed, approved, executed and closed across sessions. Today's work
was briefed, decided, executed and merged inside one. That is not a violation of
P-003 — P-003 simply does not describe it, and four fifths of the repository's
history was produced that way.

**Registered as one probable finding with three faces. Not resolved, not
redesigned.**

---

## What is NOT in this report

- Any proposed redesign of the layer model, the mission cycle, or `D-017`.
- Any edit to `.github/workflows/` — `D-017` holds, and this report exists
  precisely because it does.
- The baseline for `resolve-citations.py`. Identified as the blocker for guard 2;
  writing it is a separate piece of work.
