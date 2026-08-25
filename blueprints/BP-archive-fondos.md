---
id: "BP-archive-fondos"
title: "Los Fondos del Archive"
type: blueprint
status: active
version: "1.0.0"
created: "2026-08-17T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
author: "claude-fable-5"
owner: "oracle"
tags: [blueprint, archive, fondos, taxonomy]
area: "CAO / Archive"
license: "CC-BY-4.0"
extraction_note: "Extracted from web/src/pages/archive/[fondo].astro and archive/index.astro (MIS-065 phase C — File over App). Document paths corrected to the post-MIS-066 flat layout (agents flat, missions flat, P-001 English); 'Archive System' has no matching file in canon/ today — kept as declared, flagged for MIS-071. The per-fondo lore lines live separately in canon/archive-lore.md (reserved regime — one file, one regime)."
fondos:
  - id: canon
    titulo: "Canon"
    subtitulo: "Memoria Inmutable"
    icono: "📜"
    color: green
    descripcion: "Los 9 documentos fundacionales de Numinia. Inmutables por política y por técnica. Son el suelo sobre el que todo lo demás se construye."
    governance: "Solo Oracle puede modificar. CODEOWNERS bloqueante. Sin excepciones."
    documentos:
      - { nombre: "Welcome to Numinia", desc: "Puerta de entrada al mundo. Contexto histórico y propósito del sistema.", file: "canon/Welcome to Numinia.md" }
      - { nombre: "Numinia Brand & Culture", desc: "Identidad visual, verbal y cultural de Numinia v0.1.2.", file: "canon/Numinia Brand and Culture.md" }
      - { nombre: "Epistemic Relations", desc: "La tríada OS→Modelo→Narrativa. Peirce + Jung aplicados a organizaciones.", file: "canon/2026_04_15-Epistemic_Relations_Between_Numen_Games_and_Numina-v0.2.0.md" }
      - { nombre: "Compendium of Attributes", desc: "Sistema de atributos, rangos y ficha de personaje del agente.", file: "canon/Compendium of Attributes and Ranks in Numinia.md" }
      - { nombre: "Role Structure", desc: "Teoría de roles: Nivel Básico (gremios) + Prototipo (facciones).", file: "canon/Role structure in the Numinia system.md" }
      - { nombre: "Platform Role System", desc: "Rangos y permisos de la plataforma Digital Goods v2.", file: "canon/Platform Role System.md" }
      - { nombre: "About Session Zero", desc: "4 escape rooms de introducción, sellos, Celdas Prisma.", file: "canon/About Session Zero.md" }
      - { nombre: "Numinia — El Juego de Rol", desc: "Manual RPG completo en español, v0.6.0. Vive en numinia-lore, no en este repo.", file: "numinia-lore:seminal/Numinia_Manual_del_juego_de_rol_v0_6_0.md" }
      - { nombre: "Archive System", desc: "El sistema de archivo documental de Numinia. Cómo se organiza el conocimiento.", file: "archive-system.md" }
  - id: agents
    titulo: "Agentes"
    subtitulo: "Entidades Vivas"
    icono: "🤖"
    color: teal
    descripcion: "Los agentes digitales que operan en el sistema. Organizados por gremio. Cada uno con identidad (SOUL), reglas (OPERATOR) y estado operativo (STATUS)."
    governance: "SOUL y OPERATOR solo los modifica Oracle. STATUS lo actualiza el propio agente."
    documentos:
      - { nombre: "Nimrod — SOUL.md", desc: "Guardián de las Puertas. Centinela-01. Identidad, voz, valores, límites.", file: "agents/nimrod/SOUL.md" }
      - { nombre: "Nimrod — OPERATOR.md", desc: "Las 4 leyes operativas de Nimrod. Lo que puede y no puede hacer.", file: "agents/nimrod/OPERATOR.md" }
      - { nombre: "Adonaz — SOUL.md", desc: "Archivista General. Exégeta. El custodio del conocimiento de Numinia.", file: "agents/adonaz/SOUL.md" }
      - { nombre: "Charter — Centinelas", desc: "Reglas comunes del gremio Centinelas. Seguridad, guardia, puertas.", file: "guilds/centinelas/charter.md" }
      - { nombre: "Charter — Exégetas", desc: "Reglas comunes del gremio Exégetas. Conocimiento, archivo, narrativa.", file: "guilds/exegetas/charter.md" }
  - id: missions
    titulo: "Misiones"
    subtitulo: "Movimiento"
    icono: "⚡"
    color: yellow
    descripcion: "Las tareas con criterios de aceptación verificables. Una misión es la unidad mínima de trabajo del sistema. Cuando se completa, permanece con su Ejecución Real documentada."
    governance: "Solo el executor edita su misión activa. Una misión done es inmutable."
    documentos:
      - { nombre: "Mission Template v2", desc: "Plantilla estándar con divergence_log, executor, blocked_reason.", file: "missions/TEMPLATE.md" }
      - { nombre: "MIS-037 — Archive Summa", desc: "La misión de crear este repositorio. Completada.", file: "missions/MIS-037-create-archive-summa-repo.md" }
      - { nombre: "MIS-051 — Gmail/Drive/Calendar", desc: "Integración de Google Workspace con gog CLI. Completada.", file: "missions/MIS-051-gmail-calendar-drive-gog.md" }
      - { nombre: "MIS-054 — Acceso multi-Oráculo", desc: "Onboarding de Oráculos a Telegram con Nimrod. En curso.", file: "missions/MIS-054-multi-oracle-telegram-access.md" }
  - id: protocols
    titulo: "Protocolos"
    subtitulo: "Rituales Operativos"
    icono: "📋"
    color: blue
    descripcion: "Los procedimientos exactos para iniciar sesiones, ejecutar misiones, coordinarse entre agentes y escalar decisiones. Nunca se editan — se versionan."
    governance: "Nueva versión = nuevo archivo. Nunca editar en sitio. Oracle aprueba."
    documentos:
      - { nombre: "P-001 Agent Briefing", desc: "El arranque canónico. Los pasos inviolables para iniciar cualquier sesión.", file: "protocols/P-001-agent-briefing.md" }
      - { nombre: "P-002 Onboarding de Agente v1", desc: "Cómo incorporar un nuevo agente al sistema sin perder coherencia.", file: "protocols/P-002-onboarding-agente-v1.md" }
      - { nombre: "P-003 Ciclo de Misión", desc: "Crear, ejecutar, documentar y cerrar una misión correctamente (v3: carpeta plana, estado en frontmatter).", file: "protocols/P-003-ciclo-mision-v1.md" }
      - { nombre: "P-004 Inter-Agent v1", desc: "Coordinación entre agentes sin ambigüedad ni conflictos de escritura.", file: "protocols/P-004-inter-agent-v1.md" }
      - { nombre: "P-005 Escalation v1", desc: "Cuándo y cómo escalar al coordinador o al Oracle.", file: "protocols/P-005-escalation-v1.md" }
  - id: decisions
    titulo: "Decisiones"
    subtitulo: "Voluntad Cristalizada"
    icono: "🗿"
    color: purple
    descripcion: "Las decisiones arquitectónicas que no se revisan, solo se superan. Cada ADR existe porque alguien tuvo que elegir y lo hizo explícitamente. Son el registro permanente del por qué."
    governance: "Append-only. Nunca eliminar. Solo se puede añadir 'superseded by ADR-XXX'."
    documentos:
      - { nombre: "ADR-001 — GitHub como Archive", desc: "¿Por qué GitHub y no Notion, Confluence u otro sistema?", file: "decisions/ADR-001-github-como-archivo.md" }
      - { nombre: "ADR-002 — Markdown Universal", desc: "¿Por qué .md y no PDF, Word u otros formatos?", file: "decisions/ADR-002-formato-markdown.md" }
  - id: blueprints
    titulo: "Blueprints"
    subtitulo: "Potencial No Manifestado"
    icono: "🔮"
    color: indigo
    descripcion: "Los diseños y arquitecturas que están siendo pensados. El Archive Summa mismo comenzó como un blueprint. Aquí vive el futuro antes de ser presente."
    governance: "Oracle y agentes pueden crear. Oracle aprueba el merge."
    documentos:
      - { nombre: "Archive Summa — Arquitectura v0.1.0", desc: "Estructura completa, governance, permisos y jerarquía de delegación.", file: "blueprints/archive-summa-arquitectura-v0.1.0.md", descargable: true, downloadPath: "/archive/archive-summa-arquitectura-v0.1.0.md" }
      - { nombre: "Archive Summa — Fundacional v0.1.0", desc: "100 simulaciones, 12 principios operativos, protocolo de arranque canónico.", file: "blueprints/archive-summa-fundacional-v0.1.0.md", descargable: true, downloadPath: "/archive/archive-summa-fundacional-v0.1.0.md" }
      - { nombre: "Prompt para IAs v0.1.0", desc: "Prompt completo para estudiar el Archive Summa con cualquier IA externa.", file: "blueprints/archive-summa-prompt-v0.1.0.md", descargable: true, downloadPath: "/archive/archive-summa-prompt-v0.1.0.md" }
  - id: operations
    titulo: "Operaciones"
    subtitulo: "Sistema Circulatorio"
    icono: "⚙️"
    color: orange
    descripcion: "Las reglas de quién puede hacer qué, los mapas de credenciales y las políticas de seguridad. Es el sistema circulatorio que mantiene todo cohesionado."
    governance: "Oracle modifica. Agentes pueden proponer via PR."
    documentos:
      - { nombre: "Governance", desc: "Tabla completa: quién puede crear, modificar, archivar cada tipo de documento.", file: "GOVERNANCE.md" }
      - { nombre: "Security Policy", desc: "Reglas de seguridad del sistema. Qué nunca va en el repo.", file: "operations/security-policy.md" }
      - { nombre: "Credential Map", desc: "Estructura de credenciales sin valores reales. Mapa de dónde vive qué.", file: "operations/credential-map.md" }
graph:
  nodes:
    - { id: canon, label: "canon/", subtitle: "Memoria Inmutable", color: "0x00ff88", x: 0, y: 2, z: 0 }
    - { id: agents, label: "agents/", subtitle: "Entidades Vivas", color: "0x00d9c4", x: 2, y: 0.5, z: 1 }
    - { id: missions, label: "missions/", subtitle: "Movimiento", color: "0xffcc00", x: -2, y: 0.5, z: 1 }
    - { id: protocols, label: "protocols/", subtitle: "Rituales Operativos", color: "0x4488ff", x: 0, y: 0.5, z: -2.5 }
    - { id: decisions, label: "decisions/", subtitle: "Voluntad Cristalizada", color: "0xaa44ff", x: 2, y: -1, z: -1 }
    - { id: blueprints, label: "blueprints/", subtitle: "Potencial", color: "0x8844cc", x: -2, y: -1, z: -1 }
    - { id: operations, label: "operations/", subtitle: "Sistema Circulatorio", color: "0xff8800", x: 0, y: -2, z: 0.5 }
  edges:
    - [canon, agents]
    - [canon, missions]
    - [protocols, agents]
    - [protocols, missions]
    - [operations, agents]
    - [operations, missions]
    - [missions, decisions]
    - [missions, blueprints]
    - [agents, missions]
---
# BP — Los Fondos del Archive

> **Resumen:** La taxonomía del Archive: los siete fondos documentales,
> qué contiene cada uno, quién lo gobierna, y cómo se relacionan entre
> sí. Los datos de este frontmatter alimentan las páginas `/archive` del
> visor — el archivo es la fuente, la web la lente.
> **Epistémico:** Cómo se organiza la memoria del sistema.
> **Pragmático:** Referencia canónica de los fondos y sus relaciones.
> **Audiencia:** Agentes · Oráculos

---

## Los siete fondos

| Fondo | Subtítulo | Gobernanza |
|---|---|---|
| `canon/` | Memoria Inmutable | Solo Oracle. CODEOWNERS bloqueante. |
| `agents/` | Entidades Vivas | SOUL/OPERATOR: Oracle. STATUS: el agente. |
| `missions/` | Movimiento | Solo el executor edita su misión activa. |
| `protocols/` | Rituales Operativos | Nueva versión = nuevo archivo. |
| `decisions/` | Voluntad Cristalizada | Append-only. Nunca eliminar. |
| `blueprints/` | Potencial No Manifestado | Oracle aprueba el merge. |
| `operations/` | Sistema Circulatorio | Oracle modifica; agentes proponen. |

## Relaciones

```
            canon
           /     \
      agents ←→ missions ── decisions
        |      /   |
   protocols  /    blueprints
        |    /
    operations
```

El canon alimenta a agentes y misiones; los protocolos ritualizan a
ambos; las operaciones los sostienen; las misiones cristalizan en
decisiones y nacen de blueprints. Las posiciones y aristas exactas del
diagrama 3D del visor viven en el frontmatter (`graph:`).

## Historial

- v1.0.0 (2026-08-17) — Extracción desde los componentes del visor
  (MIS-065 fase C), con rutas de documentos corregidas al layout plano
  post-MIS-066. El lore de cada fondo vive en `canon/archive-lore.md`
  (régimen reservado).
