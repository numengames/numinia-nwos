---
id: "MIS-090"
title: "Workspace demo congelado: enseñar NWOS sin consumir tokens de IA"
type: mission
status: backlog
version: "1.0.0"
created: "2026-08-18"
updated: "2026-08-18"
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

- [ ] Workspace demo generado una vez y congelado (sin regeneración periódica)
- [ ] Navegable públicamente sin access key, solo lectura, solo ese slug
- [ ] Ninguna visita al demo provoca llamadas a la API de Anthropic
- [ ] Enlaces desde `/velo` e `/idioma`
- [ ] El repo demo cumple C-005 (LICENSE del cliente ficticio instalada por el
      flujo nuevo, molde retirado, PROVENANCE.md presente)

## Historial de versiones

- v1.0.0 (2026-08-18) — Registro inicial. Decidido en la sesión MIS-055: se
  documenta, no se ejecuta todavía.

*Claude (Fable 5) + Pablo — 2026-08-18*
