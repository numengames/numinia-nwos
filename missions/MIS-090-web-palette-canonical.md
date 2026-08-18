---
id: "MIS-090"
title: "La paleta vuelve a casa: numinia.org migra a los canónicos del Sistema v5.0.0"
type: mission
status: draft
version: "1.0.0"
created: "2026-08-18"
updated: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [web, viewer, design-system, velo, palette]
license: "CC-BY-4.0"
mission_id: "MIS-090"
area: "Viewer / numinia.org"
guild: "Alchemists"
type_execution: "digital"
priority: "medium"
effort: "L"
requested_by: "oracle"
assigned_to: "numinia-nwos"
requires_oracle_approval: true
depends_on: []
---
# MIS-090 — La paleta vuelve a casa

> **Resumen:** El Sistema de Diseño v5.0.0 detecta en numinia.org una
> "deriva mayor": paleta propia (teal `#2DD4BF`, terracota, ocre) fuera de
> los canónicos. Esta misión migra todo el sitio a §19.3 — es un restyle
> integral y se firma antes de tocar.
> **Epistémico:** Cuánta identidad visual del viewer era deriva y cuánta
> era sistema.
> **Pragmático:** Un solo vocabulario de color en toda la casa; el tema
> Velo del template NWOS (§2.8.2) gana su primera implementación real.
> **Audiencia:** Oráculo · Agente numinia-nwos

---

**Area:** Viewer / numinia.org
**Guild:** Alchemists
**Type:** digital
**Priority:** medium
**Effort:** L

---

## Story

Como Oráculo, quiero que numinia.org hable la paleta canónica del Sistema de
Diseño v5.0.0, para que el archivo de la casa no sea la primera deriva que un
visitante ve.

---

## Contexto (2026-08-18)

- El máster vive en `standards/2026_08_18-Sistema_de_Diseno-v5.0.0.md`
  (estado: propuesto, pendiente de firma; el Oráculo ya ordenó aplicar el
  registro del Velo a este sitio).
- **Ya aplicado** (misma fecha, fuera de esta misión): atmósfera del Velo
  (rejilla + niebla, alfas canónicos) en todo el sitio salvo `/diseno`;
  cielo estelar recoloreado a la escala de rareza §3.6; regla
  `prefers-reduced-motion` del §2.7.1; página `/diseno` con el sistema
  renderizado y descargas del máster.
- **Pendiente y objeto de esta misión** (la "deriva mayor" que marca §16.16
  de la hoja de ruta del sistema): el resto de la paleta del sitio —
  acento teal `#2DD4BF`, fondos/terracotas/ocres propios en
  `web/src/styles/global.css` y `web/DESIGN.md` — no es canónica.

## Alcance

- Mapear cada token actual de `global.css`/Tailwind a su canónico §19.3
  (acento → Turquesa/Verdemar según rol; fondos → Noche/Basalto/Elevada;
  textos → Arena/secundario/terciario; interactivo → `#017C8D` y estados).
- Revisar componente a componente (nav, cards, chips, tablas, DocToolbar,
  board de misiones, footer) el contraste tras el cambio.
- `web/DESIGN.md` queda superseded: pasa a apuntar al máster del sistema y
  conserva solo lo específico del viewer que el máster no cubre (lista de
  piezas a conservar: pendiente del Oráculo, ver memoria de integración).
- La variante de impresión de los PDFs (MIS-088) migra en la misma pasada.

## Acceptance criteria

- [ ] Ni un hex fuera de §19.3 en `web/src` (guard o grep documentado).
- [ ] Contraste verificado en las superficies principales (AA).
- [ ] `web/DESIGN.md` apunta al máster; lo conservado, listado y firmado.
- [ ] PDFs regenerados con la paleta canónica.
- [ ] Deploy verificado; captura antes/después para el registro.

---

## Epistemic value

Separar identidad de deriva: qué hizo único al viewer y qué era solo
Tailwind por defecto.

## Pragmatic value

El archivo de la casa viste el sistema de la casa; toda pieza nueva hereda
canónicos sin traducción.

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
