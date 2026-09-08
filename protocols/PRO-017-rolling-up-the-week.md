---
id: "PRO-017"
uid: ""
title: "Rolling up the week: closed records become one line, and the line is what stays"
type: protocol
status: active
version: "1.0.0"
created: "2026-09-08T22:00:00Z"
updated: "2026-09-08T22:00:00Z"
author: "ursa"
owner: "oracle"
tags: [protocol, rollup, deflation, weekly, reports]
license: "CC0-1.0"
applies_to: [all-agents]
mandatory: true
ratified_by: "ADR-042"
related: ["STD-012", "ADR-030", "ADR-040", "CAN-001", "RPT-018"]
---

# PRO-017 — Rolling up the week

> **Summary:** Once a week, before the Dark Council, one agent turns every
> record that closed that week into one line in the weekly report and
> deletes the record. Quarterly and annual roll-ups are the same procedure
> applied to the level below.
> **Epistemic:** The procedure that makes `STD-012` happen without the
> Oracle in the loop.
> **Pragmatic:** Fifteen minutes on Monday; the corpus does not grow.
> **Audience:** Agents

---

## 1. Purpose and trigger

**Trigger:** every Monday before the Dark Council (`CAN-001`), for the
week that ended Sunday. The quarterly roll-up runs on the first Monday of
a quarter over the thirteen weekly reports; the annual on the first Monday
of a year over the four quarterlies.

**Executor:** any agent on `PRO-001` session. The Oracle is not required
to run it; the Oracle reviews the PR.

---

## 2. Preconditions

- `main` is green.
- `git log --since=<monday-of-the-week>` is at hand: it is the daily record
  (`DEF-01`) and the only input besides the closed files themselves.
- `node scripts/check-deletable.mjs --candidates` lists what closed.

---

## 3. Procedure

1. **Open or create the weekly report.** `reports/RPT-NNN-<yyyy>-w<ww>.md`,
   `subtype: rollup`, `period: "2026-W37"`. Template: `RPT-TEMPLATE`. One
   section, *Closed this week*, and one, *Carried up*.
2. **One line per closed record.** For every mission `done` or `frozen`,
   every debt resolved, every blueprint decided this week: identifier,
   title, one sentence of what was done or decided, the commit or PR that
   proves it. The line is written from the record's own Closure, not
   rewritten.
3. **Mark what survives.** For each line, state which of `DEF-03`'s three
   it meets — `rule`, `debt`, `address` — or `none`. `none` lines stay in
   the weekly report and fall at the quarterly. A line the executor cannot
   classify is marked `oracle` and stays until the Oracle rules.
4. **Absorb.** Add every identifier from step 2 to the weekly report's
   `absorbs:`, in both `MIS-NNN` and `MIS-NNNN` forms.
5. **Redirect.** Add a rule per deleted record's public URL, both locales,
   to `web/astro.config.mjs`, pointing at the weekly report.
6. **Delete the records.** `git rm` every file from step 2.
7. **Point the phase report.** Add one line to the open phase report
   (`RPT-018` today) citing this week's report — *not* its lines
   (`DEF-06`).
8. **Verify and measure.** Run every guard in `ci.yml`; run `npm run
   build`; then `node scripts/telemetry.mjs` **as the last action before
   the commit**, commit, re-run `--check`, amend if a figure moved.
9. **Open the PR.** Title `rollup: <period>`. Body: the lines, the token
   delta, the four `ADR-030` tests answered.

**Quarterly and annual.** Same steps, where the "closed records" are the
weekly (or quarterly) reports of the period. Only lines marked `rule`,
`debt` or `address` are carried up; the `absorbs:` lists move whole
(`DEF-05`); redirects are repointed; the lower reports are deleted.

---

## 4. Verification

- `check-references`: 0 new broken. `check-url-lifecycle`: 0 dead.
- `check-deletable --candidates` after the PR: empty for the period.
- The weekly report's `absorbs:` equals the set of identifiers deleted.
- `tokens.total` in `telemetry/latest.json` is lower than before the
  roll-up. If it is not, the roll-up wrote more than it removed and the
  PR says why.

---

## 5. Escalation

- A closed record whose Closure is empty or claims something the tree
  does not show (as `MIS-137`, `MIS-139`, `MIS-140` did): the line says
  *claimed, not delivered*, and the record is still deleted — the debt
  survives in the line, not in the card. `PRO-005` if the executor thinks
  the claim was deliberate.
- A record the executor thinks should not be deleted: it is not the
  executor's call. Carry the line, mark it `oracle`, delete the record;
  git holds the body.
- The Oracle wants a line back in full: `git show <commit>:<path>`.
  Nothing is lost; what is lost is only the obligation to read it.
