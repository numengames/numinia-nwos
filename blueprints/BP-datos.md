---
id: "BP-datos"
title: "Modelo de Datos"
type: blueprint
status: active
version: "v0.1.0"
created: "2026-04-05T00:00:00Z"
updated: "2026-04-05T00:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, product, tech, data, blockchain, nft]
area: "Producto / Tech"
semaforo: "amarillo"
license: "CC-BY-4.0"
---
# BP — Modelo de Datos

> **Resumen:** Plano del sistema: estado actual, objetivo, gaps y dependencias.
> **Epistémico:** El estado real vs. el objetivo — dónde estamos y hacia dónde vamos.
> **Pragmático:** Identificar qué misiones abren los gaps documentados.
> **Audiencia:** Agentes · Oráculos

---


> *El Registro Akáshico no miente. Todo lo que existe en Numinia deja una huella. Los datos son esa huella.*

**Semáforo:** 🟡 En progreso

---

## Estado actual

- Modelo conceptual diseñado — sin implementación
- Sin smart contracts
- Sin DB operativa para Numinia
- Sin indexador (The Graph)

## Estado objetivo

- Smart contracts ERC-721/1155 en Arbitrum Sepolia (Milestone 1)
- Metadata en IPFS/Arweave
- The Graph indexando eventos on-chain
- PostgreSQL como capa operativa sincronizada

## Decisiones relacionadas

- DEC-003: Arbitrum L2 — fees bajos, EVM compatible, ecosistema de grants
- Burn-and-Mint para upgrades: el historial del objeto queda on-chain para siempre
- On-chain gana siempre: la DB es una caché, el NFT es la verdad

## Delta (brecha → misión)

| Brecha | Misión |
|---|---|
| Sin smart contracts | Pendiente — /numinia-contracts |
| Sin ERD completo | Diseñar en Dark Council |
| Sin API | Pendiente cuando existan contratos |

## Preguntas abiertas

- ¿Los avatares de ciudadano son soulbound o transferibles?
- ¿Los Prism Cells tienen supply máximo?
- ¿La DB operativa la gestiona Numen Games o hay un nodo por organización?

## Dependencias

- BP-infraestructura
- BP-misiones

---

*Nimrod 🗡️ — 2026-04-05*
