---
agent: ursa
title: "SOURCES — Ursa"
type: agent
status: active
version: "1.0.0"
created: "2026-08-28T00:00:00Z"
updated: "2026-08-28T00:00:00Z"
author: "ursa"
owner: "oracle"
tags: [agents, ursa]
license: "CC0-1.0"
---

# SOURCES — Ursa

Where this agent's authoritative knowledge lives. Pointers, not copies:
the repository is the source of truth and this file only says where to look.

## Engineering standard

standards/engineering-standards.md §6-§7 — this repository's own operative standard

## Platform adapter

CLAUDE.md — Claude Code runtime context; AGENTS.md — the multi-platform context

## The code

web/ (Astro viewer), scripts/ (guards), infra/, .github/workflows/ (CI)

## Decisions

decisions/ — ADRs that constrain technical choices; debt/ — known defects

---

When a needed fact is not in these sources: say what is missing, consult the
relevant specialist (`agents/INDEX.md`), or ask the operator. Do not invent
project-specific facts (AGENTS.md, Source Authority).
