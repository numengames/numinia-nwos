---
id: "BP-datos"
title: "Data Model"
type: blueprint
status: active
version: "0.1.0"
created: "2026-04-07T05:49:03Z"
created_source: "git:e56f6e8"
created_confidence: exact
updated: "2026-08-27T22:02:10Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, product, tech, data, blockchain, nft]
area: "Product / Tech"
semaforo: "amarillo"
license: "CC-BY-4.0"
---
# BP — Data Model

> **Summary:** System blueprint: current state, target, gaps and dependencies.
> **Epistemic:** The real state vs. the target — where we are and where we are going.
> **Pragmatic:** Identify which missions close the documented gaps.
> **Audience:** Agents · Oracles

---


> *The Akashic Record does not lie. Everything that exists in Numinia leaves a trace. Data is that trace.*

**Traffic light:** 🟡 In progress

---

## Current state

- Conceptual model designed — no implementation
- No smart contracts
- No operational DB for Numinia
- No indexer (The Graph)

## Target state

- ERC-721/1155 smart contracts on Arbitrum Sepolia (Milestone 1)
- Metadata on IPFS/Arweave
- The Graph indexing on-chain events
- PostgreSQL as the synchronized operational layer

## Related decisions

- DEC-003: Arbitrum L2 — low fees, EVM compatible, grants ecosystem
- Burn-and-Mint for upgrades: the object's history stays on-chain forever
- On-chain always wins: the DB is a cache, the NFT is the truth

## Delta (gap → mission)

| Gap | Mission |
|---|---|
| No smart contracts | Pending — /numinia-contracts |
| No complete ERD | Design in Dark Council |
| No API | Pending until contracts exist |

## Open questions

- Are citizen avatars soulbound or transferable?
- Do Prism Cells have a maximum supply?
- Does Numen Games manage the operational DB, or is there one node per organization?

## Dependencies

- BP-infraestructura
- BP-misiones

---

*Nimrod 🗡️ — 2026-04-05*
