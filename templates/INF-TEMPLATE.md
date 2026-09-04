---
# Copy this file to infra/INF-NNN-<kebab-slug>.md and fill it in.
# The filename shape is enforced: INF-NNN-slug.md, three digits, kebab-case.
# infra/ holds the repository's OWN machinery — rulesets, workflow config,
# runner setup. What the PRODUCT runs on is system/; what it should run on is
# blueprints/. If your document is neither of those, it belongs here.
id: "INF-NNN"
uid: ""
title: "The machinery, described as it is configured today"
type: documentation
subtype: reference
# default lifecycle: draft -> active -> closed
status: active
version: "0.1.0"
created: "YYYY-MM-DDTHH:MM:SSZ"
updated: "YYYY-MM-DDTHH:MM:SSZ"
author: "agent-id"
owner: "oracle"
tags: [infra]
territory: "Infrastructure"
license: "MIT"

# OPTIONAL — use when they apply, omit without guilt.
# guild: "Sentinels"
# mission: "MIS-NNNN"               # the mission that configured this
# related: ["SYS-NNN"]
---

# INF-NNN — The machinery

> **Summary:** One sentence. WHAT piece of repository machinery this documents.
> **Epistemic:** How it is configured today, and what enforces it.
> **Pragmatic:** Change it here, and how to verify the change took.
> **Audience:** Agents

<!-- Title: name the machinery and its state. "Branch protection on main, as
     applied" — not "Repository settings". -->

---

## 1. What it governs

The piece of the repository this configuration controls, and what happens
without it.

---

## 2. The configuration

What is set, where it lives, and in what form. Point at the file that IS the
configuration — a description that duplicates a JSON file will diverge from
it within a month.

**Source of truth:** `infra/<file>`, applied by `<command or console>`.

---

## 3. How to verify it

The command that shows the live configuration matches the file.

```
$ the command
what a healthy result looks like
```

Repository machinery drifts silently: the console allows what the file
forbids, and nobody notices until the day it mattered.

---

## 4. Accuracy

**Verified against:** the live setting, on YYYY-MM-DD. What is known unchecked.

<!--
NOTES ON USING THIS TEMPLATE — delete this block.

LICENCE: infra/ is MIT — it is machinery, licensed like the scripts, not like
the corpus. Do not copy a CC0 or CC-BY header in from another series.

The INF prefix was reserved before the series had content. Keep the folder for
the repository's own machinery; the product's runtime belongs in system/.

Sections 1-4 are required. §3 is the section that makes this a reference
instead of a memory of a settings page.
-->
