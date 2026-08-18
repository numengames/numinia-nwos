---
id: "MIS-094"
title: "El emisor gobierna: Sistema de Diseño 5.1.0 por encargo del consumidor"
type: mission
status: done
version: "1.0.0"
created: "2026-08-18"
updated: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [design-system, governance, emission, kit]
license: "CC-BY-4.0"
mission_id: "MIS-094"
area: "Standards + Viewer / numinia.org"
guild: "Procurators"
type_execution: "digital"
priority: "high"
effort: "L"
requested_by: "numinia-web (ADR-022), vía Oráculo"
assigned_to: "numinia-nwos"
started: "2026-08-18"
completed: "2026-08-18"
depends_on: ["MIS-068", "MIS-092", "MIS-093"]
---
# MIS-094 — El emisor gobierna: Sistema de Diseño 5.1.0

> **Resumen:** numinia-web borró su copia del Sistema (su ADR-022) y fijó
> este repo como fuente. Su encargo de vuelta: una 5.1.0 con las erratas
> E1–E5 y los huecos H1–H5 resueltos, el kit regenerado como `sistema.*`
> con manifest de sha256, Alegreya entera, y la doctrina de emisión
> escrita. Ejecutado íntegro.
> **Epistémico:** Qué debe el emisor cuando el consumidor deja de copiar.
> **Pragmático:** numinia-web puede re-fijar a 5.1.0 con digest verificable.
> **Audiencia:** Oráculo · numinia-web · Agente numinia-nwos

---

## Lo entregado (contra el encargo, punto a punto)

- **N1–N2** — Kit regenerado DEL documento vigente por
  `scripts/generate-design-kit.mjs`: `sistema.{css,js,tokens.json}` con los
  grupos `velo`, `papel` y `registros` dentro; los `khepri.*` v4.2.0
  retirados de la publicación.
- **N3** — Alegreya entera autoalojada en la guía: redonda, itálica
  variable y AlegreyaSC Regular/Medium, con su OFL.
- **N4** — Ruta versionada `numinia.org/diseno/kit/5.1.0/` +
  `kit/manifest.json` con sha256 por fichero y digest del máster.
- **E1** — §19.5: «doce» → **trece** animaciones, con trazo y cielo
  descritos (y la 12 declarada retirada).
- **E2** — §19.5: radio marco 10px → **8px** (coincide con §19.3 y el kit).
- **E3** — §6.4 recolocada antes que §6.5.
- **E4** — Presupuesto de lectura medido en el YAML (≈46k · ≈7,5k · ≈2,1k).
- **E5** — Guía viva: `kit/khepri.*` → `kit/sistema.*` en §0.3, §13.1 y
  §19.3; la tabla §0.4 conserva `khepri.*` solo en «Antes».
- **H1** — Tintas del libro: token `papel.tinta-terciaria`
  (`#75695E`/`#97897D`) en §19.3 + regla en §13.12 (el terciario del
  sistema daba 3.7:1 sobre papel).
- **H2** — Engranajes de valoración 0–5 (cuarto de vuelta al fijar,
  MIS-085) especificados en §9.9.
- **H3** — El Narrador especificado en §9.9 (Web Speech, resalte del
  bloque leído, ritmo, play/pausa en barra, alcance a glosario y ficha).
- **H4** — Las ediciones entran como plano en §13.12 (pdf por
  `@media print` A4 del propio CSS, ficha imprimible sin barra, epub con
  enlaces de glosario) — decisión tomada: dentro del Sistema, no fuera.
- **H5** — Animación 12 **retirada** (la verificación contra el LAP dio
  vacío); el número no se reutiliza — decisión tomada: retirar, no
  especular una spec nueva.
- **§18** — Fila 5.1.0 en el historial (append-only).
- **§16** — Hoja de ruta: ítem 16 resuelto (MIS-092); ítem 15 poda lo
  resuelto (Alegreya, paso de página).
- **Doctrina** — `GOVERNANCE.md` gana «Canon emission» (regla G-11: el
  canon no se copia — se fija; deberes del emisor: publicar, versionar,
  firmar, generar, avisar, historial append-only). MIS-068 sale de
  backlog con este primer caso ejecutado.
- **§4 «No se toca»** — respetado: el escarabajo, los activos con nombre
  físico Khepri, el Templo y el correo quedan intactos; historial §18
  append-only.

## Para re-fijar (numinia-web)

- Máster: `standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md` · v5.1.0 ·
  sha256 en `numinia.org/diseno/kit/manifest.json` (campo `master`).
- Kit: `numinia.org/diseno/kit/5.1.0/sistema.{css,js,tokens.json}` con
  sha256 por fichero en el mismo manifest.
- La 5.0.0 queda publicada e intacta: el pin viejo no se rompe hasta que
  el consumidor decida moverse.

## Execution Reality

- **Technology/approach used:** generador de kit por extracción de los
  bloques canónicos del .md (§13.1 css/js, §19.3 json con `JSON.parse` de
  guardia) + manifest sha256 — el mismo commit produce documento, kit y
  firma.
- **Why it diverged:** el encargo dejaba H4 y H5 a criterio con
  prohibición de silencio; se decidió ediciones-como-plano y retirada de
  la 12, ambas registradas en el §18.
- **Key learning:** gobernar un canon no es custodiar un fichero: es
  publicar artefactos generados, versionados y firmados que un consumidor
  pueda verificar sin fiarse de nadie.
- **Closing date:** 2026-08-18
- **Executing agent:** claude-fable-5 (numinia-nwos)
