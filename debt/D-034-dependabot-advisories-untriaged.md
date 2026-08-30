---
id: "D-034"
uid:
title: "Ten Dependabot advisories on main, unreviewed and unrecorded"
type: technical
status: open
version: "1.0.0"
created: "2026-08-25T18:30:00Z"
created_source: "git:6d96106"
created_confidence: exact
updated: "2026-08-25T18:30:00Z"
author: "ursa"
owner: "oracle"
guild: "Sentinels"
territory: "Infrastructure"
tags: [debt, security, dependencies, dependabot, astro, D-017]
license: "CC-BY-4.0"
visibility: "public"
visibility_reason: >
  Dependabot advisories are PUBLIC on a public repository — anyone can read
  /security/dependabot, and `git push` prints them. Restricting the record
  does not restrict the fact; it only suggests there is something to protect
  where there is not.
severity: medium
opened_by: "Ursa, 2026-08-25, from git push output"
evidence_script: "git push (remote advisory banner) — counts not independently verified"
evidence_head: "392ffc6"
---
# D-034 — Ten Dependabot advisories on `main`, and no record that anyone saw them

> **Summary:** GitHub reports **10 vulnerabilities on the default branch —
> 3 high, 4 moderate, 3 low**. Nothing in the corpus acknowledges them.
> **Epistemic:** The repository has a security surface nobody has triaged. The
> figure came from a `git push` banner, not from any instrument this repo owns.
> **Pragmatic:** This entry exists so the count is on the record. **It is not a
> work item for today and nothing is to be merged.**

## The finding

Printed by the remote on every push:

```
remote: GitHub found 10 vulnerabilities on numengames/numinia-nwos's
remote: default branch (3 high, 4 moderate, 3 low).
```

**This is the only place the number appears.** It is not in a report, not in a
blueprint, not in `debt/`, and no audit mentions it. It scrolls past on every
push and is gone.

## Why it is registered rather than fixed

Three reasons, in order:

1. **Not today's frontier.** The Oracle stopped the debt front to return to
   web↔corpus synchrony. Registering costs a file; triaging does not.
2. **A pending Astro 7 PR must not be used as the fix.** Astro 5 → 7 is two
   major versions and is explicitly excluded from all current work. An
   advisory count is not a reason to take a major upgrade.
3. **The counts are unverified by me.** They come from GitHub's banner. I have
   not enumerated the advisories, checked whether they affect built output or
   only dev dependencies, or looked for false positives. **Stating them as
   measured would be exactly the failure `D-033` describes.**

## Why this entry is public

Signed by the Oracle, 2026-08-25:

> **The advisories are public in the repository; restricting the record does not
> restrict the fact — and it suggests there is something to protect where there
> is not.**

It is worth keeping the reasoning next to the entry rather than only in a
frontmatter field, because the temptation runs the other way: an entry titled
*"ten vulnerabilities"* reads as though it should be hidden. Anyone can read
`/security/dependabot` on a public repository, and `git push` prints the count
to the console of whoever pushes. Hiding our own record of a public fact buys
no safety and costs the archive a page.

And it would be the exact defect `D-033` registers, committed by us: a control
that looks protective, protects nothing, and is never re-examined because
nobody questions a restriction.

## What is NOT claimed here

- Not that the site is exploitable. Most Astro-ecosystem advisories affect
  build-time or dev-server code paths, and this is a **static** build.
- Not that 3 high implies urgency. Severity is the advisory's, in the
  abstract, not this repository's.
- Not that anything is safe. **Nobody has looked**, which is the entry.

## What would close it

- [ ] The 10 are enumerated with package, severity, and whether they reach
      built output or stop at dev/build dependencies
- [ ] Each has a verdict: patch, accept with reason, or not applicable
- [ ] The accepted ones carry a reason and a date, like the orphan allow-list
- [ ] A decision on whether advisory state is surfaced anywhere the corpus
      can see it, rather than only in a push banner

| | |
|---|---|
| Severity | medium — unknown exposure on a public repo; static output limits blast radius |
| Owner | Oracle |
| Blocked by | `D-017` for any CI-side automation |
| Opened | 2026-08-25, noted from push output while landing the orphan guard |
| Closes when | every advisory has a verdict and accepted ones have a reason |
