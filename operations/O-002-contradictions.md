---
id: "O-002"
title: "Contradicciones pendientes — registro"
type: documentation
status: active
version: "1.2.0"
created: "2026-08-17T00:00:00Z"
updated: "2026-08-20T00:00:00Z"
author: "claude-fable-5"
owner: "oracle"
tags: [operations, contradictions, backlog, truth]
license: "CC-BY-4.0"
---
# Contradicciones pendientes — registro

> **Resumen:** Contradicciones detectadas entre fuentes del sistema que
> nadie ha resuelto todavía. Se documentan, no se reconcilian en
> silencio: zanjarlas es decisión del Oráculo, en sesión dedicada.
> **Audiencia:** Oráculos · Agentes

**Regla:** un agente que detecta una contradicción la añade aquí con
sus dos fuentes y NO elige bando. Cuando el Oráculo la resuelve, la
entrada pasa a la sección "Resueltas" con la decisión y su fecha.

---

## Abiertas

### CON-001 — Roster CAO: página vs blueprint

- **Detectada:** 2026-08-17 (MIS-071 fase 2)
- **Fuente A:** `web/src/pages/cao.astro` — lista Alquimista-01 y
  Exegeta-01 como agentes diseñados; Adonaz en `claude-sonnet-4.6`;
  Procurador-01 "diseñado" sin año objetivo.
- **Fuente B:** `blueprints/BP-cao.md` (v0.2.0) — lista Ursa y Senet;
  Adonaz en `claude-haiku-3-5`.
- **Detalle:** `extraction_note` de `blueprints/BP-cao-overview.md`.

### CON-002 — Wardley: ventana de commoditización y capas

- **Detectada:** 2026-08-17 (MIS-071 fase 2, reconciliación)
- **Fuente A:** `blueprints/WARDLEY-MAP.md` (pre-v0.2.0) — ventana de
  12–18 meses; Mission System agrupado en "Frontier (Genesis)".
- **Fuente B:** página `/wardley` — ventana de 18–24 meses; Mission
  System en "The Differentiators"; coordenadas con jitter ±1 en 7 de
  12 componentes.
- **Estado actual:** ambas versiones conviven en `WARDLEY-MAP.md`
  v0.2.0, las de la página marcadas "(según /wardley)".

### CON-004 — Legales publicados con flags de revisión abiertos

- **Detectada:** 2026-08-18 (publicación de legales en numinia.org)
- **Fuente A:** `operations/legal/O-003-privacy-policy-numengames.md`
  — frontmatter: FLAG-2..6 abiertos, "must be resolved before external
  use"; los T&C piden "verify against the original before external
  use". Nota del Oráculo (registro FLAG-1): estos textos no estaban
  publicados en ninguna web; el archivo es el máster.
- **Fuente B:** orden del Oráculo (sesión 2026-08-18) — publicar ambos
  documentos en numinia.org (footer + páginas) con los flags abiertos,
  registrando aquí la excepción para tratarla más adelante.
- **Estado actual:** publicados en `/legal/terminos` y
  `/legal/privacidad` derivando del máster en build; los flags siguen
  abiertos en el frontmatter del máster.
- **Alcance ampliado (2026-08-18, MIS-086):** publicados también en
  numinia.com (`/legal/terms/`, `/legal/privacy/`, cinco locales), como
  copias verbatim del máster en `apps/store/src/content/legal/`. La
  excepción vale ahora para dos sitios: resolver los flags cierra ambos.

### CON-005 — Ámbito de los legales: numen.games vs numinia.org

- **Detectada:** 2026-08-18 (publicación de legales en numinia.org)
- **Fuente A:** los dos documentos legales definen su ámbito como
  `www.numen.games` ("These Terms … govern your access to and use of
  our website www.numen.games"; la política de privacidad, ídem).
- **Fuente B:** la orden los publica como legales del footer de
  `numinia.org`, sitio que los textos no mencionan.
- **Detalle:** la orden incluye además que los términos se acepten
  antes del login en el flujo de onboarding; numinia.org no tiene
  login ni onboarding (sitio estático) — ese requisito queda pendiente
  para la app que implemente ese flujo.
- **Estado actual (2026-08-18, MIS-086):** requisito cumplido en
  numinia.com — `/lap/session/` no monta el widget hasta aceptar, y el
  endpoint de login rechaza (400) cualquier alta que no nombre el corpus
  vigente (`terms@1.0.0+privacy@1.1.0`), que viaja dentro de la sesión
  firmada. El desajuste de ámbito sigue abierto: la página lo declara en
  una nota fuera del texto ("Numinia está operada por Numen Games S.L.;
  este texto se refiere a www.numen.games; su alcance está en revisión"),
  sin tocar ni una coma del máster.

### CON-006 — Autoridad por fork vs soberanía del repo derivado

- **Detectada:** 2026-08-18 (el Oráculo, sobre el borrador de MIS-095)
- **Fuente A:** `standards/engineering-standards.md` §7.1 y cabecera —
  numinia-nwos y «any workspace generated from the mould» son
  **downstream forks** que «reciben este documento por la relación de
  fork»; el mecanismo de sync queda abierto pero la autoridad se da por
  supuesta: lo que se escribe upstream aplica abajo (MUST incluidos).
- **Fuente B:** principio de soberanía (Oráculo, 2026-08-18): **una vez
  una organización ha creado su repositorio NWOS, es soberana.** Lo que
  tiene sentido es que el NWOS original esté **versionado** y que la
  organización pueda **actualizarse** si quiere — no que reciba ley por
  herencia de fork.
- **Detalle:** el error de diseño se coló en el borrador de MIS-095, que
  proponía escribir una práctica upstream «para que aplique a todas las
  webs». Corregido allí. Emparenta con **CON-003** (procedencia: el
  documento dice que numinia-nwos es fork del molde cuando es la fuente)
  y con la doctrina **G-11** (el canon no se copia: se fija) — que ya
  resolvía este patrón para el Sistema de Diseño y no se había aplicado
  a los estándares mismos.
- **Qué falta:** versionar el NWOS original y definir el modelo de
  adopción soberana (MIS-096). La parte de §7.1 quedó resuelta en
  **ADR-003** (2026-08-20): no va upstream porque no hay upstream — la
  corrección es local y al molde se le **ofrece** (MIS-108).

## Resueltas

### CON-003 — Procedencia de engineering-standards.md

- **Detectada:** 2026-08-17 (adopción del estándar)
- **Fuente A:** `standards/engineering-standards.md` §Downstream y
  §7.1 — afirma que `numengames/numinia-nwos` "is a fork of the mould"
  (`numen-games-nwos-orgs/nwos-workspace-template`) y recibe el
  documento por la relación de fork.
- **Fuente B:** canon operativo del ecosistema — numinia-nwos ES la
  fuente de verdad; los repos de `numen-games-nwos-orgs` no beben de
  él, y numinia-nwos no es fork de nwos-workspace-template.
- **Nota:** la corrección, si procede, va upstream vía ADR + PR
  (§7.1); la copia local no se edita.
- **Resuelta:** 2026-08-20 por **ADR-003**.
- **Decisión:** no era una falsedad, era una **confusión de registro**
  entre dos artefactos distintos. `engineering-standards.md` **se origina
  aquí**: Numinia es el primer cliente de NWOS y su banco de pruebas. La
  copia del molde es una **propuesta de partida** que no obliga a nadie y
  que pasa a ser gobernada por quien la adopte (G-12). No son el mismo
  documento; los bytes idénticos eran coincidencia de juventud, no
  dependencia. La divergencia es adopción, no deriva, y no se sincroniza.
- **Evidencia de linaje:** raíces git distintas — numinia-nwos `9f51ad1`
  (2026-04-06), nwos-workspace-template `8f2037d` (2026-04-07, «Add files
  via upload»). Sin historia compartida.
- **Coste real antes de resolverse:** el §7.1 no solo no evitó el error,
  lo **ordenó**: un agente leyó «refuse the local edit» y propuso enviar
  la corrección al repo de otra organización.

