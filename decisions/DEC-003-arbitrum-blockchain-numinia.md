---
id: "DEC-003"
title: "Arbitrum as Numinia blockchain"
type: decision
status: provisional
version: "1.1.0"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: exact
updated: "2026-04-07T18:00:00Z"
author: "pablo-fm"
owner: "oracle"
tags: [decisions, product, tech, blockchain, arbitrum]
territory: "Product"
pending_dark_council: true
superseded_by: null
license: "CC-BY-4.0"
---
# DEC-003 — Arbitrum as Numinia blockchain

> **Summary:** Architectural or strategic decision with context and alternatives.
> **Epistemic:** What was decided, why, and what alternatives were discarded.
> **Pragmatic:** Consult before making decisions in the same domain.
> **Audience:** Agents · Oracles

---

> ⚠️ **Status: Provisional** — Pending ratification at Dark Council

## Context

Numinia needs a blockchain for NFTs, seal smart contracts, and Digital Goods.

## Decision

**Arbitrum One (L2 on Ethereum).**

## Why

- Very low fees — viable for microtransactions
- EVM compatible — known stack, Solidity, mature tooling
- Active grants ecosystem (AGV, DAO Grants)
- Community-owned (DAO governance)

## Discarded alternatives

- **Ethereum mainnet** — prohibitive fees for the use case
- **Solana** — different ecosystem, less EVM tooling
- **Polygon** — similar but less active grants ecosystem in gaming
- **Base / Optimism** — valid, lower traction in gaming

## Pros / Cons

**Pros:** Low fees · Available grants · Known EVM stack
**Cons:** Lower speed than Solana · Dependency on Ethereum ecosystem

---

## Version history

- v1.0.0 (2026-04-05) — Initial decision (provisional).
- v1.1.0 (2026-04-07) — Translated to English (MIS-056).

*Oracle: Pablo FM — 2026-04-05*
