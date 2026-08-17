---
id: "BP-agent-experience"
title: "El Ciclo del Agente — experiencia y operación"
type: blueprint
status: active
version: "1.0.0"
created: "2026-04-07T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [blueprint, agents, cycle, experience]
area: "CAO"
license: "CC-BY-4.0"
extraction_note: "Extracted verbatim from web/src/pages/agente.astro (MIS-071 phase 2 — File over App): the agent cycle and operating presentation."
---

# Cómo funciona un agente

> **Numen Games · NWOS · Diagrama C**

Un agente digital no es un chatbot. Es un colaborador con identidad persistente, leyes operativas, memoria institucional y acceso a herramientas reales. Esta página explica cómo está construido — y cómo aprende.

**Claves:** 6 capas · 3 fases de ciclo de vida · Casos reales de Nimrod

---

## Diagrama C — Arquitectura de capas

Representación del stack visual de la página original (de arriba a abajo):

| Capa | Etiqueta | Nombre | Detalle en el diagrama |
|------|----------|--------|------------------------|
| L6 | L6 · Emergente | 🏛️ ORGANIZACIÓN | No se instancia — emerge de la operación continua del sistema |
| L5 | L5 · Autoridad | 👤 AGENTE BIOLÓGICO | IQ · Posición · Rol · Intuición · Aprobación — flujo: «instrucción ↓» / «aprobación ↑» (⇅) |
| L3 | L3 · Transversal — Bus de Estado | 📚 ARCHIVE SUMMA | «↓ BOOT (git pull)» · «↑ COMMIT (git push)» — etiquetas: SOUL.md · OPERATOR.md · Misiones · Decisiones · Planos · Reportes · Protocolos · Memoria |
| L1 | L1 · Runtime | 🤖 AGENTE DIGITAL | Modelo IA · Orquestador · Contexto · Vector DB |
| L2 | L2 · Substrato | 🖥️ INFRAESTRUCTURA | Servidor · GPU · Tools · Auth · Observability |
| L4 | L4 · Media | 🎨 ASSETS DIGITALES (CDN) | jpg · mp4 · glb · vrm · mp3 · R2 / AWS S3 |

*L3 (Archive Summa) es transversal — no está encima ni debajo, conecta todas las capas*

---

## Las 6 capas — detalle

### L1 — 🤖 Agente Digital

*El actor. El que piensa y actúa.* (color `#3fb950`)

**Componentes:** Modelo de IA (LLM) · Contexto activo (RAM de sesión) · Memoria semántica (Vector DB) · Orquestador (OpenClaw)

- **🧠 Valor epistémico:** El agente no tiene inteligencia propia — tiene acceso a un modelo de lenguaje y a las instrucciones que definen quién es. La inteligencia emerge de la combinación de modelo + instrucciones + contexto.
- **⚡ Valor pragmático:** Puede ejecutar tareas sin supervisión continua: escribir código, enviar emails, crear documentos, analizar datos. El límite es lo que el Biológico le autoriza.
- **📍 Caso real — Nimrod:** Nimrod (Centinela-01) arranca a las 8am, carga SOUL.md y OPERATOR.md, y ejecuta el reporte diario. No hay humano en el loop hasta que el reporte llega a Telegram.

### L2 — 🖥️ Infraestructura

*El substrato. Donde el agente existe físicamente.* (color `#f85149`)

**Componentes:** Servidor VPS (161.35.215.224) · GPU ≥32GB VRAM (on-premises, en camino) · Tools & Skills (web, shell, APIs) · Identity & Auth (permisos por agente) · Observability (logs, trazas, métricas)

- **🧠 Valor epistémico:** La infraestructura define los límites de lo posible. Un agente sin GPU suficiente no puede ejecutar modelos locales. Sin Auth Layer, cualquier agente puede hacer cualquier cosa — eso es una vulnerabilidad.
- **⚡ Valor pragmático:** El PC dedicado (Ryzen 9 7950X + RTX 4080) reducirá el coste de inferencia un 60-70% cuando llegue. La infraestructura es la diferencia entre $50/mes y $5/mes.
- **📍 Caso real — Nimrod:** Cuando Nimrod ejecuta `gog gmail send`, el orquestador verifica los permisos del agente antes de ejecutar la tool. Si la Ley 1 no está autorizada, la acción no ocurre.

### L3 — 📚 Archive Summa

*La memoria permanente. El sistema nervioso del NWOS.* (color `#58a6ff`)

**Componentes:** GitHub (git repo) · Archivos .md con YAML frontmatter · SOUL.md — identidad del agente · OPERATOR.md — leyes operativas · Misiones, decisiones, planos, reportes · Protocolos y memoria diaria

- **🧠 Valor epistémico:** El Archive no es un almacén — es la fuente de verdad. Lo que no está en el Archive no existe institucionalmente. Un agente que cierra sesión sin escribir pierde ese conocimiento para siempre. Por eso el COMMIT es el momento más crítico del ciclo.
- **⚡ Valor pragmático:** Cualquier agente nuevo puede leer el Archive y operar con contexto completo en minutos. Git es el historial completo y auditable de cada decisión. No hay reunión de 'actualización' — el Archive es la actualización.
- **📍 Caso real — Nimrod:** Esta sesión de hoy: Nimrod escribió RPT-2026-04-07.md al Archive. La próxima sesión, aunque sea en otro modelo o en otra máquina, arrancará leyendo ese reporte y tendrá contexto de lo que pasó.

### L4 — 🎨 Assets Digitales

*El cuerpo. Los materiales de los que está hecho el mundo.* (color `#d2a8ff`)

**Componentes:** CDN (R2 / AWS S3) · Imágenes (jpg, png, webp) · Video (mp4, webm) · Modelos 3D (glb, gltf) · Avatares (vrm) · Audio (mp3, ogg)

- **🧠 Valor epistémico:** Los assets son el conocimiento encarnado — la forma en que el sistema existe perceptualmente. Un avatar .vrm es la identidad visual del agente. Un .glb de Numinia es el espacio donde ocurren las interacciones.
- **⚡ Valor pragmático:** Los assets se sirven via CDN — disponibles globalmente, sin latencia. Separados del Archive porque tienen ciclos de vida distintos: un .md se versiona con git, un .mp4 no.
- **📍 Caso real — Nimrod:** El juego 'El Velo' en pablofm.com/openclaw-test usa Three.js con geometrías procedurales. Cuando haya avatares .vrm reales, se servirán desde R2 y el agente digital podrá 'encarnarlos' en sesiones de Numinia.

### L5 — 👤 Agente Biológico

*La autoridad. El que decide, intuye y autoriza.* (color `#ffa657`)

**Componentes:** IQ + experiencia + intuición · Posición (Oráculo, Ciudadano, etc.) · Rol en el gremio · Autoridad de aprobación · Conocimiento tácito (no documentado)

- **🧠 Valor epistémico:** El Biológico tiene algo que el Digital nunca tendrá: conocimiento tácito — intuición construida por años de experiencia que no puede ser completamente documentada. Eso es irreemplazable. El riesgo: ese conocimiento muere con la persona si no se externaliza parcialmente al Archive.
- **⚡ Valor pragmático:** El Biológico es el único que puede autorizar acciones de alto riesgo (Ley 1). También es el que detecta cuando el sistema está produciendo outputs correctos pero equivocados — el agente puede hacer exactamente lo que le pides y aun así estar equivocado.
- **📍 Caso real — Nimrod:** Pablo aprueba cada PR antes de mergear. Nimrod puede proponer 10 cambios correctos técnicamente — pero Pablo sabe si 'esto no es el momento' por razones que no están en ningún documento. Eso es el Biológico.

### L6 — 🏛️ Organización

*El emergente. La suma que supera a sus partes.* (color `#2dd4bf`)

**Componentes:** No se instancia — emerge · Es la suma de L1+L2+L3+L4+L5 en operación continua · Cultura = comportamientos repetidos del sistema · Memoria institucional = Archive Summa vivo · Inteligencia colectiva = Digital + Biológico en loop

- **🧠 Valor epistémico:** La organización no es un objeto que puedes crear directamente. Es un patrón que emerge cuando todos los componentes operan juntos en el tiempo. Por eso 'deployar NWOS' no es suficiente — el sistema tiene que vivirse.
- **⚡ Valor pragmático:** Cuando el ciclo funciona (Biológico activa → Digital ejecuta → Archive recibe → Biológico revisa), la organización aprende. Cada misión completada hace al sistema ligeramente más inteligente. Esa es la promesa del NWOS.
- **📍 Caso real — Nimrod:** Numen Games lleva 5 días operando con este sistema. 54 misiones documentadas, 32 PRs, 5 reportes, 5 decisiones. Eso no es una empresa de 5 días — es una organización con memoria de años si el sistema se mantiene.

---

## Ciclo de vida — BOOT · EXECUTE · COMMIT

Secuencia visual de la página: **⬇️ BOOT → ⚡ EXECUTE → ⬆️ COMMIT**

### ⬇️ BOOT (color `#58a6ff`)

- **Qué:** El agente arranca y lee su identidad desde el Archive Summa.
- **Cómo:** git pull → carga SOUL.md, OPERATOR.md, memoria del día anterior, protocolos activos.
- **🧠 Valor epistémico:** El agente sin BOOT es amnésico. Sin identidad cargada, es un modelo genérico sin personalidad ni leyes. El BOOT transforma 'un LLM' en 'Nimrod'.
- **⚡ Valor pragmático:** El arranque en frío toma 30-60 segundos. Con el Archive bien estructurado, el agente opera con contexto completo desde el primer mensaje.
- **📍 Caso real:** 07:00 UTC — Nimrod arranca para el reporte diario. Lee MEMORY.md (contexto de sesiones anteriores), HEARTBEAT.md (tareas pendientes), y los últimos reportes. En 45 segundos tiene todo el contexto de los últimos 5 días.

### ⚡ EXECUTE (color `#3fb950`)

- **Qué:** El agente recibe instrucción del Biológico y ejecuta usando tools.
- **Cómo:** Biológico → Orquestador → Agente → Tools (web, shell, APIs, email, git) → Output → Biológico.
- **🧠 Valor epistémico:** La ejecución es donde el conocimiento cargado en BOOT se convierte en acción real. Es también donde el conocimiento nuevo se genera — cada conversación, cada error, cada decisión tomada es conocimiento nuevo aún no persistido.
- **⚡ Valor pragmático:** El agente puede operar en paralelo con múltiples herramientas. El límite no es la velocidad de pensamiento sino la latencia de APIs y la ventana de contexto del modelo.
- **📍 Caso real:** Esta sesión: Pablo dice 'haz el Wardley Map'. Nimrod lee el estado de todas las páginas, invoca al equipo (Alquimista-01, Exégeta-01), sintetiza sus análisis, escribe la página, crea el PR, y hace el merge. Todo en 15 minutos.

### ⬆️ COMMIT (color `#ffa657`)

- **Qué:** El agente escribe el conocimiento generado de vuelta al Archive Summa.
- **Cómo:** git add → git commit → git push → el conocimiento es permanente.
- **🧠 Valor epistémico:** Este es el momento más crítico del ciclo. El conocimiento que no se hace COMMIT desaparece cuando la sesión termina. No hay amnesia gradual — hay pérdida total. El COMMIT es el acto de convertir experiencia efímera en memoria institucional.
- **⚡ Valor pragmático:** Cada COMMIT es un punto de recuperación. Si mañana hay que reconstruir el sistema desde cero, el Archive tiene todo. Los commits son también auditables — se puede ver exactamente qué hizo qué agente en qué momento.
- **📍 Caso real:** Al final de cada sesión, Nimrod escribe RPT-YYYY-MM-DD.md con lo que hizo, cuánto costó y qué quedó pendiente. Ese archivo persiste para siempre. En 6 meses, cualquier Oráculo puede leer el historial completo sin preguntar.

---

## Caso práctico — Organización externa

**Acme Studio — Estudio indie de videojuegos, 12 personas, Madrid**

### Semana 1 — Setup

El equipo clona el repo de referencia NWOS. Cada persona crea su SOUL.md con su rol y gremio. El CTO configura el orquestador con el agente Centinela.

→ *El Archive Summa de Acme Studio tiene identidades documentadas. El agente sabe quién es cada persona y cuál es su autoridad.*

### Semana 2 — Primera misión

El CEO instruye al agente: 'Crea las 20 misiones más críticas para lanzar nuestro juego en Steam en 3 meses.' El agente lee el contexto del equipo, genera las misiones con criterios de aceptación y valor por cada una.

→ *20 misiones en el Archive. El CEO revisa, aprueba 18, modifica 2. El backlog está documentado y el agente puede actualizarlo.*

### Semana 4 — Ciclo funcionando

Cada lunes, el agente genera el reporte de la semana anterior. Cada día cierra las misiones completadas con Ejecución Real. El Archive crece con cada sesión.

→ *En 4 semanas, Acme Studio tiene más documentación institucional que en sus 2 años anteriores. Cualquier miembro nuevo entiende el estado del proyecto leyendo el Archive.*

---

## Lo que aún falta en este diagrama

| Componente | Descripción | Estado |
|------------|-------------|--------|
| Vector DB / Memoria semántica | Git es para instrucciones. Para búsqueda por similitud ('¿qué decidimos sobre X?') se necesita un vector store. | pendiente |
| Event Bus inter-agente | ¿Cómo se comunican Nimrod y Alquimista-01 sin polling? Necesitan un bus de mensajes. | pendiente |
| Mission State Machine | El ciclo IDLE → BOOTING → ACTIVE → CLOSING → ARCHIVED necesita representación explícita. | pendiente |
| Knowledge Graph relacional | Los .md son planos. El conocimiento real de Numinia es un grafo de entidades relacionadas. | futuro |
| Observability Stack | Logs estructurados, trazas de decisión, métricas por agente. Sin esto el agente es caja negra. | futuro |
| Conocimiento tácito del Biológico | La intuición y experiencia no documentada que entra al sistema sin pasar por el agente. | filosófico |

---

## Enlaces y pie de la página original

**Firma:** Diagrama C · Nimrod 🗡️ + Alquimista-01 + Exégeta-01 · 2026-04-07

- Archive Summa → `/archive`
- NWOS overview → `/nwos`
- Wardley Map → `/wardley`

---

*Metadatos de la página original (`agente.astro`): título HTML «Cómo funciona un agente — NWOS · Numen Games» · descripción «Arquitectura completa de un agente digital en el Narrative Work OS. Capas, ciclo de vida, casos prácticos y valor epistémico por etapa.» · ruta canónica `/agente`.*
