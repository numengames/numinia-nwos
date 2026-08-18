---
id: "MIS-087"
title: "El reflejo completo: todo .md del canon navegable en numinia.org"
type: mission
status: backlog
version: "1.0.0"
created: "2026-08-18"
updated: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [web, viewer, canon, mirror]
license: "CC-BY-4.0"
mission_id: "MIS-087"
area: "Viewer / numinia.org"
guild: "Exegetes"
type_execution: "digital"
priority: "medium"
effort: "L"
requested_by: "oracle"
assigned_to: "numinia-nwos"
depends_on: []
---
# MIS-087 — El reflejo completo: todo .md del canon navegable en numinia.org

> **Resumen:** Cada documento .md del repo (fuera de `web/`) gana su página
> renderizada en numinia.org, para que los agentes biológicos decidan leyendo
> el canon en la web, sin abrir GitHub.
> **Epistémico:** Qué partes del canon estaban invisibles y por qué.
> **Pragmático:** Decisiones más informadas: el corpus entero navegable,
> con frontmatter visible y descarga del .md canónico.
> **Audiencia:** Agente numinia-nwos · Oráculo · Agentes biológicos

---

**Area:** Viewer / numinia.org
**Guild:** Exegetes
**Type:** digital
**Priority:** medium
**Effort:** L

---

## Story

Como agente biológico del sistema, quiero navegar TODOS los documentos .md
del canon en numinia.org con su frontmatter visible, para tomar decisiones
informadas sin depender de GitHub ni del filesystem.

---

## Premisas verificadas (2026-08-18)

- Inventario .md fuera de `web/`: agents/ 21 · blueprints/ 24 · canon/ 14 ·
  decisions/ 9 · guilds/ 8 · missions/ 87 · operations/ 10 · protocols/ 11 ·
  reports/ 13 · standards/ 2 · raíz 10 (~209 en total).
- El viewer hoy solo refleja: missions, reports/audits, decisions,
  blueprints y el lore del archivo (`content.config.ts`, patrón MIS-066:
  glob loader al build, la carpeta es la fuente).
- Invisibles hoy: agents/, canon/ (salvo lore), guilds/, operations/,
  protocols/, standards/, reports/ no-audit y los .md de raíz.
- El repo es PÚBLICO — reflejar no expone nada nuevo, pero el reflejo debe
  respetar el régimen por fichero: contenido reservado se muestra
  "solo display" (precedente canonLore, C-005 §5); la licencia de cada .md
  está en su frontmatter y en REUSE.toml.
- Patrón de detalle ya resuelto: página renderizada + endpoint .md crudo +
  DocToolbar (copiar/descargar), como en audits y misiones.

## Decisiones de diseño a tomar (no resueltas aquí)

- Estructura de rutas: ¿una colección genérica `/canon/[dir]/[id]` o una
  ruta por directorio? Los esquemas de frontmatter varían por carpeta —
  el loader necesita un schema laxo (`passthrough` con mínimos comunes).
- Índice: una página que liste el corpus completo agrupado por directorio,
  con estado/versión, enlazada desde la navegación.
- Exclusiones: ninguna silenciosa. Si algo se excluye (p. ej. TEMPLATE.md),
  la lista de exclusiones es explícita en la página índice.

---

## Acceptance criteria

- [ ] Todo .md del repo fuera de `web/` tiene página renderizada en
      numinia.org con su frontmatter clave visible (id, título, estado,
      versión, licencia) y endpoint `.md` crudo con DocToolbar.
- [ ] Página índice del corpus completo, agrupada por directorio, enlazada
      desde la navegación del sitio.
- [ ] Exclusiones explícitas y listadas; cero exclusiones silenciosas.
- [ ] El régimen por fichero se respeta: los reservados se muestran
      display-only sin afirmar licencia abierta (C-005 §5).
- [ ] Guard de licencias y build en verde; deploy verificado en vivo.

---

## Epistemic value

El corpus deja de tener zonas oscuras: sabremos qué documentos existen, en
qué estado están y quién los posee, desde cualquier navegador.

## Pragmatic value

Los agentes biológicos deciden con el canon delante; los digitales enlazan
URLs canónicas en vez de rutas de filesystem.

---

## Execution log

*(Fill when completing the mission)*

---

## Execution Reality

*(Fill when closing the mission — the real plans vs the ideal plans)*

- **Technology/approach used:** (vs what was planned)
- **Why it diverged:** (what challenge modified the path)
- **Key learning:** (the knowledge that lives in that gap)
- **Closing date:** YYYY-MM-DD
- **Executing agent:** (name / agent-id)

> *"The ideal plans show the intention. The real plans show the knowledge."*
