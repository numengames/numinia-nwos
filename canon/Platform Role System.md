---
id: "S-003"
uid:
title: "Platform Role System"
type: seminal
status: active
version: "1.0.0"
created: "2026-04-07T12:34:04Z"
created_source: "git:f765b99"
created_confidence: "inferred"
updated: "2026-04-07T12:34:04Z"
author: "Centinela-01"
owner: "oracle"
guild: "Exegetes"
territory: "Canon"
tags: [standards, ranks, permissions, digital-goods]
license: "LicenseRef-Numen-AllRightsReserved"
registration: exempt
registration_exemption: "moves-to-standards"
registration_reason: >
  Genre ruled by the Oracle 2026-08-25: this is a permissions matrix for an
  artifact, not world vocabulary. It moves to standards/ in phase B and takes
  S-003. The id is written now so phase B renames the file only — never the
  identifier (ADR-004).
threshold: sealed
---

# Sistema de Rangos y Permisos — Numinia Digital Goods

> **Resumen:** Documento del sistema NWOS — Platform Role System.
> **Epistémico:** Qué aprendes leyendo este documento.
> **Pragmático:** Qué puedes hacer con este documento.
> **Audiencia:** Agentes · Oráculos

---


> Basado en el framework STSI del EEM Institute
> y los documentos seminales de Numinia.
> v2 — Abril 2026

---

## Principio fundamental

Los **rangos** dan permisos. Son **acumulativos**: cada rango hereda todos
los permisos de los rangos inferiores.

```
  ORACLE ──── 4 max. Administracion total.
     │
  ARCHON ──── Moderacion + gestion de contenido global.
     │
  VERNACULAR ─ Creacion y gestion de contenido propio.
     │
  PILGRIM ──── Ha comprado un digital good en Numinia.
     │
  CITIZEN ──── Puede editar su ficha y tiene loot.
     │
  NOMAD ────── Login con wallet/social. Solo lectura.
```

---

## Matriz de permisos por rango

```
Permiso                                  NOM  CIT  PIL  VER  ARC  ORA
──────────────────────────────────────── ───  ───  ───  ───  ───  ───

LECTURA
  Navegar galeria publica                 x    x    x    x    x    x
  Descargar assets CC0                    x    x    x    x    x    x
  Buscar y filtrar                        x    x    x    x    x    x
  Ver su ficha de personaje (solo leer)   x    x    x    x    x    x
  Ver su lista de favoritos               x    x    x    x    x    x
  Ver colecciones NFT                     x    x    x    x    x    x

IDENTIDAD
  Editar su ficha de personaje            ·    x    x    x    x    x
  Acceder al loot / inventario            ·    x    x    x    x    x
  Participar en Session Zero              ·    x    x    x    x    x

COMERCIO
  Acceder a contenido premium comprado    ·    ·    x    x    x    x
  Participar en burn ritual               ·    ·    x    x    x    x
  Acceder a aventuras de temporada        ·    ·    x    x    x    x

CREACION (contenido propio)
  Subir assets propios                    ·    ·    ·    x    x    x
  Editar metadatos de sus assets          ·    ·    ·    x    x    x
  Borrar sus propios assets               ·    ·    ·    x    x    x
  Ver estadisticas de sus assets          ·    ·    ·    x    x    x
  Acceder al LAP (panel de creador)       ·    ·    ·    x    x    x

ADMINISTRACION (contenido global)
  Crear/editar/borrar CUALQUIER asset     ·    ·    ·    ·    x    x
  Gestionar temporadas                    ·    ·    ·    ·    x    x
  Ver estadisticas globales               ·    ·    ·    ·    x    x
  Ver audit log                           ·    ·    ·    ·    x    x
  Sync a R2 / IPFS / Arweave             ·    ·    ·    ·    x    x

MODERACION
  Banear / desbanear usuarios             ·    ·    ·    ·    x    x
  Nombrar Vernaculars                     ·    ·    ·    ·    x    x
  Gestionar rangos inferiores al suyo     ·    ·    ·    ·    x    x

SISTEMA (Oracle only — max 4)
  Nombrar / eliminar Archons              ·    ·    ·    ·    ·    x
  Editar matriz de permisos               ·    ·    ·    ·    ·    x
  Configuracion del sistema               ·    ·    ·    ·    ·    x
  No puede ser baneado                    ·    ·    ·    ·    ·    x
```

---

## Como se determina el rango

El rango se **infiere** automaticamente de las acciones del usuario:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Sin sesion ─────────────────────────────► (no accede)      │
│                                                             │
│  Login con wallet o cuenta social ───────► NOMADA           │
│                                                             │
│  + Completa Session Zero (gremio/faccion) ► CIUDADANO       │
│                                                             │
│  + Compra un digital good en Numinia ────► PEREGRINO        │
│                                                             │
│  + Promocion manual por Archon/Oracle ───► VERNACULO        │
│                                                             │
│  + Promocion manual por Oracle ──────────► ARCONTE          │
│                                                             │
│  + Definido en rank-overrides.json ──────► ORACULO (max 4)  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Reglas de promocion y degradacion

```
  Quien promueve          A que rango        Quien degrada
  ─────────────────────── ────────────────── ──────────────────
  Sistema (automatico)    Nomada → Ciudadano Sistema (automatico)
  Sistema (automatico)    Ciudadano → Pilgrim Sistema (automatico)
  Archon o Oracle         → Vernacular       Archon o Oracle
  Oracle                  → Archon           Oracle
  rank-overrides.json     → Oracle (max 4)   Solo edicion manual
```

**Restricciones:**
- Un Archon solo puede gestionar rangos **inferiores** al suyo
  (puede promover/degradar hasta Vernacular, no puede tocar Archons ni Oracles)
- Un Oracle puede gestionar **todos** los rangos excepto otros Oracles
- Los Oracles solo se gestionan editando `rank-overrides.json`
- Maximo 4 Oracles simultaneos
- Los Oracles **no pueden ser baneados** (proteccion en 3 capas: storage, API, UI)

---

## Ficha de personaje por rango

```
  NOMADA     → Ficha pre-completada, SOLO LECTURA
               (generada al hacer login, datos basicos del wallet/social)

  CIUDADANO  → Ficha EDITABLE
               (completa Session Zero → elige gremio + faccion)
               Accede a loot / inventario

  PEREGRINO  → Ficha editable + historial de compras
               Loot premium desbloqueado

  VERNACULO+ → Ficha editable + portfolio de assets subidos
```

---

## Deteccion tecnica de cada rango

| Rango | Señal de deteccion | Almacenamiento |
|---|---|---|
| Nomad | `wallet_session` o `session` cookie presente | Cookie de sesion |
| Citizen | Completó Session Zero | `data/characters/{address}.md` tiene gremio/faccion |
| Pilgrim | Compró un digital good | `data/seasons/*-progress.json` o futuro `data/purchases/` |
| Vernacular | Promocion manual | `data/system/rank-overrides.json` |
| Archon | Promocion manual | `data/system/rank-overrides.json` |
| Oracle | Bootstrap / edicion manual | `data/system/rank-overrides.json` (max 4 entries) |

---

## Diferencias con v1 (lo que cambia)

| Aspecto | v1 (actual) | v2 (este documento) |
|---|---|---|
| Nomad + wallet | Era citizen | Ahora es nomad (solo lectura) |
| Nomad permisos | Podia editar ficha y favoritos | Solo lectura + favoritos |
| Citizen trigger | Wallet conectada | Session Zero completada |
| Pilgrim trigger | Season Pass | Cualquier compra de digital good |
| Vernacular | Role 'creator' en GitHub | Promocion manual por Archon+ |
| Archon nombra | No podia | Puede nombrar Vernaculars |
| Archon scope | Todos los permisos admin | Solo rangos inferiores |
| Oracle max | Sin limite | Maximo 4 |

---

## Resumen en una frase

> **Nomada lee. Ciudadano edita su identidad. Peregrino compra.**
> **Vernaculo crea. Arconte modera. Oraculo gobierna.**

---

*Documento basado en el framework STSI del EEM Institute,
los documentos seminales de Numinia,
y la estructura de roles del sistema Numinia.*

*Numinia Digital Goods — Abril 2026*
