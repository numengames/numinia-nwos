---
id: "MIS-091"
title: "El Sistema viste la casa: numen.games y nwos.numen.games adoptan los standards"
type: mission
status: in-progress
version: "1.0.0"
created: "2026-08-18"
updated: "2026-08-18"
started: "2026-08-18"
completed: null
author: "claude-opus-5"
owner: "oracle"
tags: [web, design-system, engineering-standards, numen-games, nwos]
license: "CC-BY-4.0"
mission_id: "MIS-091"
area: "Web corporativa / NWOS deploy"
guild: "Alchemists"
type_execution: "digital"
priority: "high"
effort: "XL"
requested_by: "oracle"
assigned_to: "numengames-web + nwos-deploy"
requires_oracle_approval: true
depends_on: ["MIS-090"]
---
# MIS-091 — El Sistema viste la casa

> **Resumen:** Lo que MIS-090 hizo con numinia.org se extiende a las dos
> superficies públicas de la empresa: la web corporativa `numen.games` y el
> subdominio de producto `nwos.numen.games`. Se aplican los tres documentos de
> `standards/` — Sistema de Diseño v5.0.0, engineering-standards y la
> terminología análoga — a repos y a píxeles.
> **Epistémico:** Cuánta de la identidad visible de la casa era sistema y
> cuánta era herencia de plantilla (Astroship, shadcn, Tailwind por defecto).
> **Pragmático:** Las tres superficies públicas (numinia.org, numen.games,
> nwos.numen.games) hablan un solo vocabulario visual y un solo pipeline de CI.
> **Audiencia:** Oráculo · Agentes de `numengames-web` y `nwos-deploy`

---

**Area:** Web corporativa / NWOS deploy
**Guild:** Alchemists
**Type:** digital
**Priority:** high
**Effort:** XL

---

## Story

Como Oráculo, quiero que `numen.games` y `nwos.numen.games` cumplan los
standards de la casa —el Sistema de Diseño v5.0.0 en lo visual y las
engineering-standards en lo estructural—, para que la primera superficie que
ve un cliente no sea la primera deriva que ve.

---

## Contexto (2026-08-18)

Auditoría de estado real antes de tocar nada (AGT-01, §7.2.1):

### `numengames-web` → https://numen.games (público, GPL-3.0)

| Eje | Estado |
|---|---|
| Diseño | **Deriva mayor.** Paleta legacy: dorado `#FFD961`/`#D9B86A` (44 ocurrencias), panther `#212123`, `#171717` (20). 137 ocurrencias de hex en `src/`, ~42 valores distintos; solo 6 son canónicos §19.3 |
| Tipografía | Geist ya autoalojada (estáticas + variable), pero se importa además **Inter** (`@fontsource-variable/inter`) en los dos layouts y el mono es **IBM Plex Mono** |
| Iconos | SVG locales en `public/icons` (`astro-icon`); parte ya son Phosphor de nombre, sin subconjunto declarado |
| Ingeniería | CI solo `test → build`; sin `lint` ni `type-check`; sin `CLAUDE.md`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, CODEOWNERS, plantillas de issue/PR, `.editorconfig`, TODO; `package.json` aún se llama `astroship`, sin campo `license`; acciones de GitHub por tag, no por SHA; sin `permissions` en los workflows; sin Scorecard ni Dependabot; homepage del repo apunta a `numengames.com` |
| Legal | `LICENSE` GPL-3.0 sin `REUSE.toml`, sin `LICENSES/`, sin cabeceras SPDX. **Territorio C-005 = nivel irreversible** |

### `nwos-deploy` → https://nwos.numen.games (público, AGPL-3.0-only)

| Eje | Estado |
|---|---|
| Diseño | Deriva **contenida**: toda la paleta vive centralizada en `src/styles/global.css` como tripletes RGB. Acento teal `#2DD4BF`, sabores propios (terracota, ocre, cobre, bronce, salvia, azul-med) y semánticos Tailwind — los mismos que MIS-090 ya migró en numinia.org |
| Tipografía | Geist + Geist Mono ya canónicas |
| Ingeniería | Ya tiene `CLAUDE.md`, `CONTRIBUTING.md`, CLA + gate en CI, `REUSE.toml`, `LICENSES/`, `TRADEMARKS.md`, `LEGAL_DEBT.md`, `license-check` en cada build. Le faltan: pipeline `type-check → lint`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, CODEOWNERS, plantillas, `.editorconfig`, TODO, Scorecard, pin por SHA, `permissions` |
| Docs | `DESIGN.md` propio, anterior al v5.0.0 — mismo caso que el `DESIGN.md` que MIS-090 marcó superseded |

### Precedencia aplicada

`standards/engineering-standards.md` §7.1: ambos repos son **downstream**. Este
agente no edita los documentos de `standards/`; los ejecuta. §7.3: todo lo
legal (LICENSE, SPDX, REUSE, visibilidad) es **nivel irreversible** — se
reporta al Oráculo, no se toca.

---

## Alcance

### Capa 1 — Ingeniería (engineering-standards.md §2)

En **ambos** repos, hasta paridad con la checklist §4:

- `CLAUDE.md` con primera instrucción de auditoría (AGT-01), postura de IA
  (AGT-06), adopción por referencia de las engineering-standards (§6) y
  puntero al Sistema de Diseño reproduciendo el fragmento §19.5 (§0.3).
- `SECURITY.md` (SEC-09), `CONTRIBUTING.md` + `CODE_OF_CONDUCT.md` (OSS-01/02,
  repos públicos), `CODEOWNERS` cubriendo `LICENSE*` y `.github/workflows/`
  (SEC-10), plantillas de issue y PR con Definition of Done (PM-02),
  `.editorconfig` (DEV-03), `TODO.md` como hoja de ruta en fichero (PM-05).
- CI idéntico `type-check → lint → test → build` (ARC-01), `permissions`
  de solo lectura por defecto (SEC-08), acciones de terceros **pinneadas por
  SHA** (SEC-07), OpenSSF Scorecard semanal (§3.1), Dependabot (SEC-03).
- Scripts npm homogéneos `dev`/`build`/`test`/`lint` (DEV-02); `no-console`
  como regla que rompe el build (SRE-03).
- `.env.example` exhaustivo y sincronizado (DEV-01).

### Capa 2 — Sistema de Diseño v5.0.0

- **Registro declarado antes que medio** (§2.8): ambas superficies son
  **Umbral** (web corporativa y web de producto); el Velo queda para el
  archivo (numinia.org), no para estas.
- Capa de tokens §19.3 primero — es la que arrastra el 80 % del sitio:
  fondos Noche/Basalto/Elevada, textos Arena/secundario/terciario,
  interactivo `#017C8D` con estados que oscurecen, enlace Verdemar,
  Ámbar para énfasis, Coral/Grana sin coexistir.
- Barrido de hex con mapeo cerrado deriva→canónico sobre `src/`, con grep de
  verificación en verde (el método que cerró MIS-090).
- Tipografía: solo Geist y Geist Mono autoalojadas — se retira Inter y se
  retira IBM Plex Mono.
- Escala de espacio de 4, dos radios (control 6px, marco 8px), curva `ciclo`.
- `prefers-reduced-motion` respetado; catálogo de movimiento §10.1 como techo.
- `DESIGN.md` de `nwos-deploy` queda superseded apuntando al máster.

### Fuera de alcance (y por qué)

- **Toda decisión C-005**: LICENSE, cabeceras SPDX, `REUSE.toml`, visibilidad.
  Nivel irreversible (§7.3) → se reporta como deuda al Oráculo.
- Rediseño de composición: los planos §13.2–§13.10 no se reescriben; se
  respeta la arquitectura de página existente y se cambia el vocabulario.
  Un rediseño de composición sería otra misión.
- Migración completa a Phosphor del set de `public/icons`: se declara el
  subconjunto §7.3 y se reporta el resto como deuda.

---

## Acceptance criteria

```gherkin
Feature: Los standards de la casa, aplicados a las dos superficies públicas

  Scenario: Ni un color fuera del sistema
    Given el repositorio numengames-web tras la migración
    When se listan los hex distintos presentes en src/ y tailwind.config.cjs
    Then todos pertenecen a los tokens canónicos de §19.3
    And el grep de verificación queda documentado en el log de ejecución

  Scenario: Una sola voz tipográfica
    Given cualquiera de los dos sitios
    When se inspecciona la cascada de fuentes
    Then solo se sirven Geist y Geist Mono, autoalojadas
    And ni Inter ni IBM Plex Mono se descargan ni se declaran

  Scenario: El pipeline es el mismo en las dos casas
    Given los workflows de numengames-web y de nwos-deploy
    When se ejecuta CI en un pull request
    Then corren type-check, lint, test y build en ese orden
    And los tokens del workflow son de solo lectura por defecto
    And toda acción de terceros está pinneada por SHA

  Scenario: La checklist de repositorio está rellena
    Given cualquiera de los dos repos
    When se comprueba la checklist §4 de engineering-standards
    Then existen CLAUDE.md, SECURITY.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md,
         CODEOWNERS, plantillas de issue y PR, .editorconfig y TODO.md
    And CLAUDE.md reproduce el fragmento §19.5 del Sistema de Diseño

  Scenario: Lo irreversible no se toca
    Given que ambos repos tienen decisiones legales pendientes (C-005)
    When el agente encuentra LICENSE, SPDX o visibilidad en su camino
    Then no los modifica
    And los reporta al Oráculo en el informe de cierre
```

- [ ] Cero hex fuera de §19.3 en `numengames-web/src` (grep documentado)
- [ ] Cero deriva de paleta en `nwos-deploy/src/styles/global.css`
- [ ] Solo Geist y Geist Mono en ambos sitios
- [ ] Pipeline `type-check → lint → test → build` verde en ambos repos
- [ ] Checklist §4 completa en ambos repos (salvo lo gated por el Oráculo)
- [ ] `permissions` de solo lectura y acciones por SHA en todos los workflows
- [ ] `DESIGN.md` de `nwos-deploy` superseded, apuntando al máster
- [ ] Deuda observada reportada, no arreglada por iniciativa propia (§7.4)

---

## Epistemic value

Saber si el Sistema de Diseño v5.0.0 se puede *ejecutar* sobre una web
heredada (Astroship, plantilla comercial, tres años de parches) o solo sobre
una web nacida con él. MIS-090 lo probó en terreno propio; esto lo prueba en
terreno prestado.

## Pragmatic value

Las tres superficies públicas de la casa dejan de necesitar traducción entre
ellas. Un componente escrito para una sirve en la otra; una regla de CI que
falla en una falla en las tres. El coste marginal de la cuarta superficie
—el sabor por defecto de una organización ajena (§2.8.2)— baja a copiar el kit.

---

## Execution log

- 2026-08-18 — Misión abierta por orden directa del Oráculo ("aplica los
  standards a toda la web numen.games y al subdominio nwos.numen.games").
  Auditoría de estado previo registrada en el contexto de arriba.

---

## Execution Reality

*(Se rellena al cerrar)*

> *"The ideal plans show the intention. The real plans show the knowledge."*
