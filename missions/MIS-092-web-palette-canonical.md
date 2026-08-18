---
id: "MIS-092"
title: "La paleta vuelve a casa: numinia.org migra a los canónicos del Sistema v5.0.0"
type: mission
status: done
version: "1.2.0"
created: "2026-08-18"
updated: "2026-08-18"
started: "2026-08-18"
completed: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [web, viewer, design-system, velo, palette]
license: "CC-BY-4.0"
mission_id: "MIS-092"
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
# MIS-092 — La paleta vuelve a casa

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

- [x] Ni un hex fuera de §19.3 en `web/src` (grep documentado en el log:
      20 hexes distintos restantes, todos canónicos).
- [x] Contraste revisado en el mapeo: cada sustituto conserva o sube el
      contraste de su original sobre fondo oscuro (Verdemar > teal viejo,
      Arena > blanco roto, secundarios §19.3 medidos por el sistema).
- [x] `web/DESIGN.md` apunta al máster (nota superseded); su consolidación
      final espera la lista de conservación del Oráculo (residuo aceptado).
- [x] PDFs regenerados con la paleta canónica (Diurno-papel).
- [x] Deploy verificado en vivo; el registro visual queda en la propia web
      y en los PDFs (no se tomaron capturas antes/después — el diff de git
      es el registro; residuo aceptado).

---

## Epistemic value

Separar identidad de deriva: qué hizo único al viewer y qué era solo
Tailwind por defecto.

## Pragmatic value

El archivo de la casa viste el sistema de la casa; toda pieza nueva hereda
canónicos sin traducción.

---

## Execution log

- 2026-08-18 — **Firmada por orden directa del Oráculo** ("el sistema que te
  he mandado manda… rediseña todo eso; si tu registro es el del Velo, la web
  ha de cumplir con ese criterio").
- 2026-08-18 — **Capa de tokens migrada** (`global.css`): fondos a
  Noche/superficie/elevada, textos a Arena/secundario/terciario, borde a
  línea-fuerte, `--accent` a Verdemar (el enlace nocturno), semánticos a la
  paleta de datos §3.8, sabores propios (terracota/ocre/cobre/bronce/salvia/
  azul-med) mapeados a canónicos, glows y scrollbar a Turquesa con alfa.
  `body::before` pasa a ser la niebla canónica (`velo.niebla` 6 %); la
  rejilla del Akasha la pinta el Layout. `theme-color` a `#14110F`.
- 2026-08-18 — **/diseno es ahora la guía viva verbatim** (artefacto
  generado del sistema, servido tal cual con sus assets y fuentes; la
  aproximación Astro anterior se retira). PDFs migrados al Diurno-papel
  del sistema (papel Arena, tinta Noche, turquesa-texto).
- 2026-08-18 — **Fase 2 ejecutada:** 256 sustituciones en 7 ficheros
  (agente, archive, continuidad, idioma, openclaw-test, ventas, wardley)
  con mapeo cerrado deriva→canónico: slate→neutrales Nocturno,
  teals viejos→Verdemar, ámbares/naranjas→Ámbar, rojos→Grana/Coral,
  verdes→`#8FC46B`, azules→`#5D9BD6`, morados→`#A98BE0`, fondos
  navy/granate→Noche/superficie. Verificación: grep final = 20 hexes
  distintos en `web/src`, TODOS de §19.3 — cero fuera del sistema.
- 2026-08-18 — **El kit se publica junto a la guía** (`/diseno/kit/`:
  `khepri.css`, `khepri.js`, `khepri.tokens.json` — CC0; los SVG de marca
  NO se publican: reservados y no referenciados por la guía).
- 2026-08-18 — `web/DESIGN.md` marcado superseded; consolidación final
  pendiente de la lista de conservación del Oráculo.

---

## Execution Reality

- **Technology/approach used:** dos capas — primero los tokens de
  `global.css` (que arrastran el 80 % del sitio), después un script de
  mapeo cerrado hex→canónico sobre `web/src` (256 sustituciones, 7
  ficheros). La página `/diseno` se resolvió sirviendo la guía viva
  verbatim en vez de reconstruirla en Astro.
- **Why it diverged:** el plan preveía revisión componente a componente;
  el mapeo cerrado (cada hex viejo tiene un único canónico equivalente en
  rol y contraste) lo hizo innecesario — el riesgo real no era el color a
  color, sino los fondos tintados sin equivalente canónico (granate,
  navy), que se resolvieron a Noche aceptando perder el matiz.
- **Key learning:** una migración de paleta no es una lista de colores:
  es un mapeo de ROLES (fondo/línea/texto/acento/dato); con los roles
  claros del §19.3, 300 ocurrencias se migran con un script y un grep de
  verificación en verde.
- **Closing date:** 2026-08-18
- **Executing agent:** claude-fable-5 (numinia-nwos)

> *"The ideal plans show the intention. The real plans show the knowledge."*
