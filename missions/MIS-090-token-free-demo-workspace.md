---
id: "MIS-090"
title: "Workspace demo congelado: enseñar NWOS sin consumir tokens de IA"
type: mission
status: done
version: "1.1.0"
created: "2026-08-18"
updated: "2026-08-18"
completed: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [nwos, deploy, demo, marketing, cost, velo]
license: "CC-BY-4.0"
mission_id: "MIS-090"
area: "NWOS deploy / nwos.numen.games"
guild: "Alchemists"
type_execution: "digital"
priority: "medium"
effort: "M"
requested_by: "oracle"
assigned_to: null
requires_oracle_approval: false
depends_on: []
---
# MIS-090 — Workspace demo congelado

> **Resumen:** Generar UNA vez un workspace NWOS real, congelar el resultado y
> servirlo como ejemplo público navegable — sin access key y sin volver a llamar
> a la API de Anthropic. Coste de IA: una sola generación; después, cero.
> **Epistémico:** Cómo enseñar el producto sin que cada curioso queme tokens.
> **Pragmático:** Un enlace "ver un ejemplo" en `/velo` e `/idioma` que
> cualquiera puede abrir.
> **Audiencia:** Oráculo · Agentes de nwos-deploy

---

**Area:** NWOS deploy / nwos.numen.games
**Guild:** Alchemists
**Type:** digital
**Priority:** medium
**Effort:** M

---

## Origen

Sesión de trabajo de MIS-055 (2026-08-18). Al implementar los selectores 1–5
en `/idioma` surge la necesidad de un ejemplo tangible del producto. Hoy la
única forma de ver un workspace NWOS es lanzar un deploy real desde `/velo`,
que (a) crea un repo privado, (b) consume tokens de Anthropic en la generación
de canon, y (c) devuelve una access key de un solo uso. Ese mismo día, un
deploy abortado (`rituals-marca-de-cremas`) dejó patente la fragilidad y el
coste de usar el flujo real como demo.

**Decisión del Oráculo:** no se implementa ahora; queda registrada como misión.

## Story

Como visitante de nwos.numen.games que evalúa NWOS, quiero navegar un
workspace de ejemplo ya generado, para entender qué produce el sistema sin
lanzar un deploy ni que Numen queme tokens de IA por cada visita.

## Alcance propuesto

1. Ejecutar el flujo real de `/api/registro` una única vez con una organización
   ficticia de demo (nombre y canon cuidados a mano si hace falta retocar).
2. Congelar el resultado: el repo generado se marca como demo y no se regenera.
3. Servirlo en modo lectura pública: una ruta tipo `/workspace/demo` (o el
   slug real) accesible **sin access key** — excepción explícita y acotada al
   HMAC de `src/lib/token.ts`, solo lectura, solo ese slug.
4. Enlazarlo como "See a live example" desde `/velo` (nwos-deploy) e `/idioma`
   (numinia.org).
5. Cero llamadas a Anthropic en la ruta de visualización: el viewer ya es solo
   lectura de GitHub; verificar que ninguna visita dispara generación.

### Alternativa descartable/complementaria

Demo 100 % cliente: personalización de plantillas en el navegador
(placeholders → nombre de la org) sin canon generado. Cero coste siempre, pero
enseña el molde vacío, no el resultado. Puede servir como paso previo o
sustituto si el modo lectura pública se complica.

## Criterios de aceptación

- [x] Workspace demo generado una vez y congelado (sin regeneración periódica)
      — repo `faro-austral` archivado en GitHub el 2026-08-18
- [x] Navegable públicamente sin access key, solo lectura, solo ese slug —
      `tree`/`file` eximen únicamente `DEMO_WORKSPACE_SLUG` (`src/lib/demo.ts`);
      cualquier otro slug sigue en 403
- [x] Ninguna visita al demo provoca llamadas a la API de Anthropic — el viewer
      solo lee de GitHub; Anthropic vive únicamente en `/api/registro`
- [x] Enlaces desde `/velo` (demo + numinia.org como referencia 5/5) e `/idioma`
- [x] El repo demo cumple C-005 — LICENSE reservada a nombre de Faro Austral
      sin placeholders, cero artefactos del molde, PROVENANCE.md presente

## Execution Reality

- **Organización elegida:** Faro Austral (ficticia; el Oráculo descartó usar
  Numinia — habría producido un canon paralelo generado compitiendo con el
  canon real consagrado). Navegable en
  https://nwos.numen.games/workspace/faro-austral
- **Dos defectos reales del flujo salieron a la luz y se corrigieron en
  nwos-deploy:**
  1. El strip borraba artefacto a artefacto con la API de contents (un commit
     y 2+ subrequests por archivo); con el spec crecido del molde el primer
     intento abortó a mitad, dejando huérfano. Ahora `buildInstallTree` (pura,
     testeada) emite un único commit vía Git Data API — ~6 subrequests fijos.
  2. Los workflows del molde disparaban runs zombis en el repo generado con
     cada commit de personalización (fallando en cascada tras el strip). Ahora
     el deploy desactiva Actions en el repo generado antes del primer push.
- **Divergencia menor:** la generación inline de canon se atascó en C-003 y el
  cliente HTTP agotó su timeout (el abort conocido del POST largo). C-003 y
  C-004 se completaron con el mismo modelo, tool y prompts de `registro.ts`,
  commiteados con los mismos mensajes del agente, antes de congelar. La
  generación diferida (cola en vez de POST síncrono) queda como deuda conocida
  del flujo, fuera del alcance de esta misión.
- **Agente ejecutor:** claude-fable-5 (sesión de Pablo)

## Historial de versiones

- v1.0.0 (2026-08-18) — Registro inicial. Decidido en la sesión MIS-055: se
  documenta, no se ejecuta todavía.
- v1.1.0 (2026-08-18) — Ejecutada y cerrada el mismo día: demo `faro-austral`
  generada, congelada y enlazada; dos fixes de flujo aterrizados en
  nwos-deploy por el camino.

*Claude (Fable 5) + Pablo — 2026-08-18*
