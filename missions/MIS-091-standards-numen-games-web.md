---
id: "MIS-091"
title: "El Sistema viste la casa: numen.games y nwos.numen.games adoptan los standards"
type: mission
status: done
version: "1.3.0"
created: "2026-08-18"
updated: "2026-08-25"
started: "2026-08-18"
completed: "2026-08-25"
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

- [x] Cero hex fuera de §19.3 en `numengames-web/src` — 23 hexes distintos
      restantes, todos canónicos; los rgb() restantes son 7 tripletes, todos
      canónicos (grep en el log)
- [x] Cero deriva de paleta en `nwos-deploy/src/styles/global.css` — y en todo
      `src`: ni un hex ni un rgb() fuera de §19.3
- [x] Solo Geist y Geist Mono en ambos sitios (Inter e IBM Plex retiradas)
- [x] Pipeline `type-check → lint → test → build` verde en local en ambos
      repos, y en los dos con **cero errores de tipos** (el trinquete que
      sostenía los 31 de `numengames-web` se retiró al arreglarlos)
- [x] Checklist §4 completa en ambos repos salvo lo gated (branch protection,
      ajustes de organización, C-005 en numengames-web)
- [x] `permissions: read-all` y acciones pinneadas por SHA en los cinco
      workflows de los dos repos
- [x] `DESIGN.md` de `nwos-deploy` superseded, apuntando al máster
- [x] Deuda observada reportada en los `TODO.md` de cada repo, no arreglada
      por iniciativa propia (§7.4)

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

### numengames-web · rama `feat/standards-v5` · 2 commits

- **Capa de tokens.** `tailwind.config.cjs` pasa a ser el §19.3: marca,
  texto-sobre-claro, interactivo con estados que oscurecen, enlace, Nocturno,
  Diurno y la paleta de datos §3.8. Los nombres viejos (`primary.coralRed`,
  `primary.panther`, `basics.white`…) sobreviven como alias apuntando al
  canónico de su ROL, para no reescribir ~200 clases de golpe.
- **Barrido cerrado deriva→canónico:** 298 sustituciones de color en `src/`
  (44 del dorado `#D9B86A`, 20 de `#171717`, 84 de `rgb(217,184,106)`, 44 de
  `rgb(255,255,255)`…) + 103 clases de la paleta por defecto de Tailwind
  (`text-white`, `text-slate-*`, `bg-black`, `text-red-*`). **Verificación:**
  23 hexes distintos y 7 tripletes rgb() en `src/`, todos de §19.3.
- **Corrección de rol (§9.1).** Los rellenos de acción dejan de ser ámbar:
  navbar CTA, CTAs de hero, variantes primary/outline de `Button.astro`,
  la tarjeta VRM y el widget de chat pasan a Turquesa `#017C8D`. Tres casos de
  Arena sobre Ámbar (1.9:1) se resuelven con tinta — la accesibilidad manda
  sobre la paleta (§19.1).
- **Tipografía.** Fuera Inter (dependencia y dos layouts) y fuera IBM Plex
  Mono; Geist pasa de nueve cortes estáticos a una variable, y entra Geist Mono
  autoalojada.
- **Banner de cookies** tematizado por sus propias variables (sin tocar el CSS
  de terceros): superficies canónicas, relleno Turquesa, Geist, dos radios.
- **Ingeniería.** CI `type-check → lint → test → build` + job de presencia;
  Scorecard semanal; Dependabot; `permissions: read-all`; acciones por SHA.
  Nuevos: `CLAUDE.md`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
  CODEOWNERS, plantillas, `.editorconfig`, `TODO.md`, README ejecutable con
  badges. El paquete deja de llamarse `astroship`.
- **Deuda de lint saldada, no silenciada:** 74 errores de ESLint a cero — 23
  `{#each}` con clave, componentes e imports muertos retirados, `console.*`
  sustituido por estado de error visible en el chat (§9.7), frontmatter YAML
  con tabuladores corregido, y los `any` del contenido tipados una vez en su
  frontera (`src/types/content.ts`) en vez de quince veces sueltos.

### numengames-web · segunda pasada (orden del Oráculo: «aplica el sistema de diseño a numen.games, las buenas prácticas etc»)

- **El vocabulario deja de ser heredado.** 227 clases renombradas a los nombres
  §19.3 y el bloque de alias eliminado del config: la paleta que un
  desarrollador puede escribir es exactamente §19.3, nada más compila a color.
- **Superficies (§6):** todas las sombras del repo eran resplandores —20
  utilidades `shadow-[…]` y una docena de bloques `box-shadow` de hasta 70px—.
  Quedan diez sombras y las diez son el halo legendario canónico.
- **Movimiento (§10.1):** se retiran los pulsos ambientales de cuatro
  componentes (6s infinite, incluido el que da nombre a `PulseAnimatedBtn`) y
  dos animaciones muertas de la plantilla. Las dos marquesinas se conservan
  como **desviación declarada** (son contenido, no decoración) y con
  `prefers-reduced-motion` se detienen donde están en vez de saltar al último
  fotograma.
- **Iconografía (§7):** los iconos son Phosphor de verdad, pero venían con
  relleno blanco puro —un valor que no existe en §19.3—. Los 21 usados pasan a
  Arena, y los dos servidos por `astro-icon`, a `currentColor`. Siete chips de
  icono sobre Ámbar (1.9:1) pasan a relleno Turquesa.
- **Type-check 31 → 0.** Los 31 errores que el trinquete sostenía eran **dos
  bugs reales**:
  1. `class` nunca llegaba a `Container` (solo leía `className`). Dieciséis
     llamadas llevaban años pasando clases al vacío. El componente ya acepta
     ambas props; las dieciséis cadenas muertas **se retiran** en vez de
     encenderse, porque encenderlas es un rediseño: cuatro pintaban el texto
     de `text-nocturno-base` sobre fondo oscuro y `manifesto.astro` llevaba
     `md:px-80`. Las cadenas quedan listadas en `TODO.md` y en el historial.
  2. `locale` nunca llegaba a nueve componentes: **la ruta `/es/` renderiza
     copy en inglés** por debajo del pliegue. Cada componente declara ahora la
     prop con un `TODO(MIS-091)` en el punto exacto de la carencia.
  El trinquete y su script se borran: `pnpm type-check` vuelve a ser
  `astro check` a secas, con cero errores, como gate real.
- Cifras en Mono tabular, enlace nocturno en Verdemar, y fuera la prop `px`
  que `Container` nunca tuvo.

### Publicación (2026-08-18)

- **`nwos-deploy`: cerrado.** La rama se mergeó a `main` (`528e7db`), otra
  sesión le subió el puntero a **5.1.0** (`b016e62`) y restauró `.env.example`
  sincronizado con `src/lib/env.ts` (`093ab65`). Está en `origin/main`.
- **`numengames-web`: rama publicada** (`origin/feat/standards-v5`, cuatro
  commits). PR pendiente de abrir a mano: `gh` no está autenticado en esta
  máquina. Cuerpo del PR redactado y entregado al Oráculo.
- **Re-fijado a 5.1.0 antes de publicar.** Para una superficie Umbral el delta
  es documental: E1 reescribió el fragmento §19.5 (doce → **trece**
  animaciones, con trazo y cielo, y retirada la 12) y E2 corrigió el `marco
  10px` de la prosa al 8px que sus propios tokens ya decían. MIS-091 tomó los
  valores de §19.3 y no de la prosa, así que el radio ya era correcto — el
  casi-fallo queda registrado en MIS-102 como argumento a favor de fijar
  tokens en vez de leer prosa.
- **Errata detectada en el máster 5.1.0:** la primera línea de su propio
  fragmento §19.5 sigue diciendo `v5.0.0`. Las copias de los consumidores la
  conservan verbatim y lo declaran en su cabecera — una copia verbatim que
  corrige en silencio deja de ser una copia. Corresponde un *patch* upstream.

### nwos-deploy · rama `feat/standards-v5` · 1 commit

- **Capa de tokens** migrada en `src/styles/global.css`: acento teal `#2DD4BF`
  y los sabores propios (terracota, ocre, cobre, bronce, salvia, azul-med)
  pasan a canónicos conservando su nombre como alias. Entra `interactivo`.
- **El cielo del Velo (§2.7.1)** deja de ser blanco: 175 estrellas, pesos
  60/25/10/4/1, colores de la escala de rareza §3.6, y con
  `prefers-reduced-motion` **se detiene** en vez de desaparecer.
- **Se retira el overlay de ruido** (pintaba sobre todo a z-index 9999; §6 pide
  superficies elevadas lisas y el grano es del papel).
- **SRE-03 real:** `src/lib/log.ts` es el único sitio con `console`, y emite
  JSON por evento. Los nueve `console.error` con concatenación de la ruta de
  deploy son ahora eventos estructurados con claves estables.
- **Type-check en cero:** 20 `any` fuera (contenido de GitHub tipado, cuerpo de
  la petición tipado, resultado del deploy tipado) y los imports de fontsource
  declarados. 26 tests en verde.
- CI, Scorecard, Dependabot, SECURITY/CoC/CODEOWNERS/plantillas/.editorconfig/
  TODO como en la otra casa; `license-check.yml` conserva lo suyo (guardia
  C-005 y gate de CLA) y deja de duplicar los tests. `DESIGN.md` superseded.

---

## Execution Reality

- **Technology/approach used:** el mismo método de dos capas que cerró MIS-090
  —primero los tokens, después un mapeo cerrado hex/rgb→canónico verificado con
  grep— pero aquí hubo una tercera capa que MIS-090 no tuvo: **las clases de la
  paleta por defecto de Tailwind**. `text-white`, `text-slate-500`, `bg-black`
  no son hexes, así que no aparecen en ningún grep de color y sin embargo son
  deriva pura. Fueron 103 ocurrencias.
- **Why it diverged (1):** el plan decía «capa de tokens y barrido». La realidad
  añadió una corrección de ROL que no era mecánica: el sitio usaba el dorado
  como relleno de acción, y §9.1 reserva los rellenos al Turquesa. Traducir
  color a color habría dado un sitio con botones ámbar y texto claro — es decir,
  1.9:1 de contraste. **La accesibilidad rompió el mapeo automático y obligó a
  revisar botón a botón.**
- **Why it diverged (2):** poner `lint` en el CI no es añadir un paso: es
  descubrir 74 errores reales (cada uno con su decisión) y 51 de tipos. Los de
  lint se saldaron. Los de tipos, no: **27 de los 31 que quedan son un solo
  bug** —páginas que pasan `class="…"` a componentes Svelte que solo leen
  `className`, de modo que esas clases nunca se aplican—. Arreglarlo cambia el
  layout renderizado; borrarlo tira la intención del autor. Es una decisión de
  producto, no una corrección mecánica, así que se reporta y se congela con un
  **trinquete**: `pnpm type-check` falla si el número sube, y falla igual si
  baja sin actualizar la línea base. La regla no es prosa aunque el bug siga.
- **Why it diverged (3):** en la segunda pasada, los 31 errores de tipos que
  la primera había congelado resultaron ser **dos bugs de producto**, no deuda
  cosmética: `class` que nunca llegaba a `Container` (dieciséis llamadas) y
  `locale` que nunca llegaba a nueve componentes —es decir, **la web en
  español no está traducida por debajo del pliegue**—. Ninguno de los dos se
  ve mirando la web; los dos los encontró el type-check.
- **Key learning:** un estándar de diseño se aplica con un script; un estándar
  de ingeniería se aplica descubriendo lo que el repositorio llevaba años sin
  mirar. El coste de la migración no estuvo en los 298 colores —eso fueron
  minutos— sino en los 125 defectos que el primer `lint` y el primer
  `type-check` de la historia del repo pusieron encima de la mesa. **Encender la
  luz es la parte cara; pintar es la barata.** Y el corolario de la segunda
  pasada: **un error de tipos que nadie arregla acaba siendo un bug que nadie
  ve** — el trinquete sirvió para no perderlos, pero el sitio donde debían
  acabar era en cero.
- **Closing date:** pendiente (rama abierta, ver residuos)
- **Executing agent:** claude-opus-5

### Residuos y decisiones para el Oráculo

1. **Nada está publicado.** Las dos ramas `feat/standards-v5` están en local:
   sin `push`, sin PR, sin deploy. Es acto del Oráculo.
2. **C-005 en `numengames-web`** sigue sin aplicar (LICENSE GPL-3.0 sin
   `REUSE.toml`, sin `LICENSES/`, sin cabeceras SPDX, sin `TRADEMARKS.md`).
   Nivel irreversible: no se ha tocado.
3. **Las dieciséis cadenas de layout retiradas** (el bug de `class` vs
   `className`) esperan decisión: re-aplicarlas sección a sección con revisión
   visual, o darlas por muertas. Están listadas en el `TODO.md` del repo.
6. **La web en español no está traducida por debajo del pliegue** (nueve
   componentes con copy en inglés fijo). Es tarea de contenido, no de código.
4. **`DESIGN.md` de nwos-deploy** conserva su título heredado (*pablofm.com*);
   su consolidación espera la lista de conservación del Oráculo, igual que la
   de numinia.org en MIS-090.
5. **Ajustes de organización y branch protection** (SEC-01/02/11, ARC-02) no son
   accesibles desde el repo.

> *"The ideal plans show the intention. The real plans show the knowledge."*

---

## Closure

*(Administrative close. The brief above is untouched — not one line of Scope
or of the criteria.)*

- **Category:** A — done in fact. The reality already satisfies the brief.
- **Evidence:** numen.games → 200 and nwos.numen.games → 200. 8/8 criteria ticked.
- **Signed by:** Oracle, 2026-08-25, as part of the board triage of the 111 missions.
  Classified read-only first; nothing was closed on impression.
- **Closed:** 2026-08-25 · **by:** ursa (administrative), on the Oracle's signature
