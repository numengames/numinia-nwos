---
id: "MIS-088"
title: "El canon en papel: descarga PDF de los .md con formato del sistema de diseño"
type: mission
status: done
version: "1.1.0"
created: "2026-08-18"
updated: "2026-08-18"
completed: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [web, viewer, pdf, design-system]
license: "CC-BY-4.0"
mission_id: "MIS-088"
area: "Viewer / numinia.org"
guild: "Alchemists"
type_execution: "digital"
priority: "medium"
effort: "M"
requested_by: "oracle"
assigned_to: "numinia-nwos"
depends_on: ["MIS-087"]
---
# MIS-088 — El canon en papel: descarga PDF de los .md con formato del sistema de diseño

> **Resumen:** Cada documento del canon reflejado en numinia.org se puede
> descargar como PDF maquetado según el sistema de diseño — no un "imprimir
> página" genérico, sino un artefacto con identidad.
> **Epistémico:** Cómo un sitio 100% estático produce PDFs de diseño.
> **Pragmático:** Los .md del canon circulan fuera de la web (correo,
> impresión, firma) sin perder formato ni procedencia.
> **Audiencia:** Agente numinia-nwos · Oráculo

---

**Area:** Viewer / numinia.org
**Guild:** Alchemists
**Type:** digital
**Priority:** medium
**Effort:** M

---

## Story

Como lector del canon, quiero descargar cualquier documento .md como PDF con
el formato del sistema de diseño, para llevarlo, imprimirlo o compartirlo
fuera de la web manteniendo su identidad y procedencia.

---

## Premisas verificadas (2026-08-18)

- numinia.org es 100% estático en Cloudflare Workers (solo assets, sin
  runtime): el PDF no puede generarse por petición en servidor. Opciones
  reales: (a) pre-generar PDFs en build (p. ej. Chromium headless/Playwright
  imprimiendo cada página de detalle con CSS de impresión), o (b) CSS
  `@media print` + botón "Guardar como PDF" del navegador. (a) da un
  artefacto descargable idéntico para todos; (b) es gratis en peso pero el
  resultado depende del navegador del usuario.
- El DocToolbar ya existe en cada página de detalle (copiar/descargar .md):
  es el sitio natural del botón PDF.
- Volumen: ~209 documentos si MIS-087 completa el reflejo — el tiempo de
  build y el peso del bundle de assets deben medirse (presupuesto: decidir
  umbral aceptable en ejecución y registrarlo).
- Sistema de diseño: `web/DESIGN.md` es dark-only (fondo oscuro, acento teal
  #2DD4BF, Geist/Geist Mono). El papel es blanco: el PDF necesita una
  adaptación clara del sistema (tipografía y jerarquía se conservan; el
  fondo no). **Decisión de diseño a firmar con el Oráculo antes de
  ejecutar**: variante de impresión del sistema (recomendación: fondo
  claro, tinta oscura, acento teal en titulares y filetes, Geist Mono para
  metadatos).
- Contexto del Oráculo (2026-08-18): `web/DESIGN.md` se integrará con el
  sistema de diseño de numinia-web (Khepri, más trabajado), conservando
  algunas piezas de este que el Oráculo señalará. La variante de impresión
  debe diseñarse mirando Khepri (que ya tiene plano de libro/impreso, ver
  MIS-085 "printable sheet") para no maquetar dos veces — qué piezas del
  DESIGN.md local sobreviven es decisión del Oráculo, pendiente de lista.

## Formato del PDF (mínimos)

- Cabecera con identidad: id del documento, título, versión, estado, fecha
  de actualización.
- Pie con procedencia: URL canónica en numinia.org y fecha de generación.
- Tipografía del sistema (Geist / Geist Mono) embebida.
- Frontmatter clave visible como bloque de metadatos, no como YAML crudo.

---

## Acceptance criteria

- [ ] Decisión de la variante de impresión del sistema de diseño registrada
      (con el Oráculo) antes de maquetar.
- [ ] Botón "PDF" en el DocToolbar de cada documento reflejado; descarga un
      PDF con el formato definido arriba.
- [ ] El PDF se genera de forma reproducible en build (o la alternativa
      elegida queda registrada con su porqué en Execution Reality).
- [ ] Presupuesto medido y registrado: tiempo de build y peso añadido al
      deploy; umbral acordado no superado.
- [ ] Muestra verificada en producción: un documento largo (p. ej. una
      misión) y uno con tablas renderizan correctamente.
- [ ] Guard de licencias y build en verde; deploy verificado.

---

## Epistemic value

Aprendemos a producir artefactos portables desde un sitio estático sin
runtime — patrón reutilizable para fichas, informes y sellos.

## Pragmatic value

El canon viaja: PDFs con identidad para imprimir, adjuntar o firmar, sin
depender de cómo renderice el navegador de cada quien.

---

## Execution log

- 2026-08-18 — Decisión de diseño firmada por el Oráculo ("ejecútala" sobre
  la recomendación registrada): variante de impresión clara del sistema —
  papel blanco, tinta oscura (#16201f), teal en titulares/filetes/etiquetas
  (#0F766E texto, #2DD4BF filetes), Geist para texto, Geist Mono para
  metadatos. A4, cabecera con chips de frontmatter, pie con URL canónica ·
  fecha de generación · paginación.
- 2026-08-18 — Ruta `/print/[...slug]` (213 documentos: corpus + misiones +
  audits + decisiones + planos + legales; slugs espejo de las rutas
  públicas), excluida del sitemap y con noindex.
- 2026-08-18 — `scripts/generate-pdfs.mjs` (`npm run build:pdf`):
  servidor estático local + Chromium (playwright-core, Apache-2.0,
  devDependency) → `dist/pdf/<ruta-pública>.pdf`; borra `dist/print/`
  tras generar. Botón `.pdf` en el DocToolbar de las 6 superficies.
- 2026-08-18 — **Presupuesto medido:** 213/213 PDFs, 24,2 MB, 22 s
  (concurrencia 6). Muestras verificadas: MIS-086 (larga, checkboxes) y
  engineering-standards (tablas) — render correcto.
- 2026-08-18 — Desplegado y verificado en vivo.

---

## Execution Reality

- **Technology/approach used:** la opción (a) prevista — pre-generación en
  build con Chromium headless — usando el Chromium ya cacheado de
  Playwright (`~/.cache/ms-playwright`) vía `playwright-core` con
  `executablePath` explícito (override `PDF_CHROME`); fuentes fontsource
  autoalojadas, generación 100% offline.
- **Why it diverged:** apenas divergió; el único ajuste fue mantener
  `build:pdf` FUERA de `npm run build` para que la CI no necesite Chromium
  — el flujo de deploy es build → build:pdf → wrangler deploy (documentado
  en CLAUDE.md).
- **Key learning:** con las páginas print como rutas Astro más un Chromium
  cacheado, el PDF "de diseño" cuesta 22 s y 24 MB para todo el corpus —
  el presupuesto que parecía el riesgo resultó trivial; el patrón queda
  listo para fichas e informes.
- **Closing date:** 2026-08-18
- **Executing agent:** claude-fable-5 (numinia-nwos)

> *"The ideal plans show the intention. The real plans show the knowledge."*
