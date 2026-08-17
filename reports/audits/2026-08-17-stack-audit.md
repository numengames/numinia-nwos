---
id: "AUD-2026-08-17-stack"
title: "Auditoría de stack — Repos Numen Games / NWOS"
type: report
subtype: audit
status: published
version: "1.1.0"
created: "2026-08-17T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
author: "claude (a petición de Pablo)"
tags: [audit, numengames, nwos, stack, github, astro, licensing, ci-cd]
license: "CC-BY-4.0"
provenance: "ai-assisted"
language: "es-ES"
editorial_note: |
  v1.1.0 — Revisión de archivado (claude-fable-5, 2026-08-17), corrections
  verified against this repo and the official Anthropic model catalog:
  (1) "14 misiones" → 69 (post-MIS-066 count);
  (2) LD-001 detection/resolution attributed to the Oráculo + session
  agent, not to Nimrod (inactive);
  (3) numengames.com does not redirect — it 404s;
  (4) the hardcoded model claude-sonnet-4-20250514 is deprecated with
  announced retirement 2026-06-15 — a date ALREADY PAST — replacement
  claude-sonnet-5; the current-models list was corrected;
  (5) "cerró ayer (17 ago)" → today, same date as the document;
  (6) references to "Tessera" and "tu Manifiesto" point to documents
  OUTSIDE this repo (Pablo's personal doc system) — kept as-is.
  Pending iteration: translation to English per DEC-006.
---

# 🔍 Auditoría de stack — Repos Numen Games / NWOS

> **Naturaleza:** Documento de diagnóstico técnico. Juicio razonado sobre
> evidencia verificada, no un veredicto absoluto — cada hallazgo lleva su
> fuente para que sea auditable y discutible.
> **Método:** clonado y lectura directa del código de cada repo (no
> descripciones de terceros, no memoria de entrenamiento). Donde no pude
> verificar algo, lo digo.
> **Nota de archivo:** las referencias a «Tessera» y «tu Manifiesto»
> apuntan a documentos del sistema personal de Pablo, fuera de este repo.

---

## Control de versiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| v1.0.0 | 2026-08-17 | Auditoría inicial de los 5 repos solicitados. |
| v1.1.0 | 2026-08-17 | Archivado en numinia-nwos con correcciones verificadas (ver `editorial_note`). |

---

## 0. Resumen ejecutivo

Pediste 5 repos; **4 existen y se auditaron con código real, 1 no existe**
con esa ruta (ver § 1). Hallazgo más importante: **no hay ni un solo
pipeline de CI/CD** (GitHub Actions) en ninguno de los 4 repos — los
despliegues dependen de integraciones automáticas de plataforma
(Cloudflare Workers Builds, Vercel), lo cual funciona pero no es lo mismo
que tener tests obligatorios antes de mergear. Segundo hallazgo
relevante: **hay tres codebases Astro casi gemelas** repartidas entre 3
repos distintos, con nombres que se pisan entre sí (`nwos-web` es a la
vez nombre de paquete, nombre de repo, y nombre de Cloudflare Worker,
todos referidos a cosas ligeramente distintas). Tercero: el propio
sistema de gobernanza NWOS ya detectó y corrigió una fuga real de
licencia (CC0 sobre contenido reservado) — buena señal de que el sistema
funciona, mala señal de que ya ha hecho falta usarlo. *(Corrección de
archivado: la detección y resolución de LD-001 la firmó el Oráculo con el
agente de sesión, no Nimrod — que está inactivo. Ver § 4.)*

| Repo | Existe | Stack | CI/CD | Licencia | Estado |
|---|---|---|---|---|---|
| `numengames-web` | ✅ | Astro 7 + Svelte 5 + Cloudflare Workers | ❌ ninguno | GPL-3.0 | Activo, salud buena |
| `numinia-web` | ❌ **no existe con esa ruta** | — | — | — | Ver § 1 |
| `nwos-workspace-template` (org `numen-games-nwos-orgs`) | ✅ | Sin código — plantilla Markdown pura | ❌ (no aplica) | MIT (molde) / reservada (artefacto) | Recién auditado (C-005) |
| `nwos-deploy` | ✅ | Astro 5 + React 19 + Vercel + SDK Anthropic + Octokit | ❌ ninguno | **Sin LICENSE** ⚠️ | Activo, deuda de higiene |
| `numinia-nwos` | ✅ | Repo de gobernanza NWOS + subapp Astro (`web/`) en Cloudflare | ❌ ninguno | Multi-régimen vía `REUSE.toml` | Activo, con incidente legal reciente resuelto |

---

## 1. El repo que no existe: `numengames/numinia-web`

Verificado por clonado directo (`git clone` → fallo de autenticación,
típico de repo inexistente) y por `web_fetch` a
`github.com/numengames/numinia-web` → **404**. También confirmé que no
aparece en el listado completo de la organización `numengames` en GitHub
(21 repos).

**Lo que sí existe y probablemente es a lo que te referías:**
- **`numengames/nwos-web`** — repo Astro real, activo, actualizado el 14
  de agosto. No lo cloné (no estaba en tu lista), pero aparece en el
  listado de la org.
- Un **Cloudflare Worker** llamado `nwos-web` (dominio
  `nwos-web.pablofm.workers.dev`) que, según un comentario dejado por el
  propio equipo en `numinia-nwos/web/wrangler.toml`, **podría ser el
  único host real del producto NWOS** (`/velo`, `/api/registro`) — es
  decir, la cosa importante de verdad podría estar viviendo en un Worker
  cuyo repo de origen no está del todo claro ni para el propio equipo
  interno. Cito el comentario textual porque es una pista operativa, no
  narrativa:

  > *"deliberately not reusing the existing `numinia-web` worker
  > (nwos-web.pablofm.workers.dev), which may still be the only host of
  > the NWOS product (/velo, /api/registro)"*

**Recomendación:** antes de seguir, vale la pena que confirmes tú mismo
(con acceso admin a Cloudflare + GitHub) qué repo alimenta ese Worker en
producción. Yo no tengo forma de verificarlo desde aquí sin credenciales
— lo señalo como pregunta abierta, no como hecho.

---

## 2. Inventario de stack por repo (detalle verificado)

### 2.1 — `numengames/numengames-web`
Web pública de Numen Games (numen.games).

- **Framework:** Astro 7.2 + islas Svelte 5.56, algo de React (Title.tsx)
  y un componente `.jsx` suelto (Game.jsx) — **tres frameworks de UI a la
  vez** en un solo sitio (Astro+Svelte+React). Funciona porque Astro
  permite islas mixtas, pero es peso y complejidad cognitiva extra sin
  motivo aparente.
- **Estilos:** Tailwind 3.4.
- **Runtime/deploy:** Cloudflare Workers (`wrangler.jsonc`), sirviendo
  `numen.games` y `www.numen.games` como dominios custom.
  `run_worker_first: true` + `worker/index.js` propio — no es solo
  "assets estáticos", hay lógica de servidor.
- **Gestor de paquetes:** pnpm 9.12 (fijado por hash en `packageManager`,
  buena práctica de reproducibilidad).
- **Testing:** Vitest configurado, un archivo de test real
  (`i18n/index.test.ts`). Único repo de los 4 con algo de testing.
- **i18n:** sistema propio (`src/i18n/`), sitio en `[locale]/...`.
- **Analítica/consentimiento:** Google Analytics + `vanilla-cookieconsent`
  + `astro-cookieconsent` — cumple RGPD con banner, correcto para una
  empresa española/UE.
- **IA:** hay un componente `AIAgent.svelte` y variables
  `PUBLIC_AI_API_URL` / `PUBLIC_AI_ASSISTANT_ID` en `.env.example` — la
  web ya integra un asistente conversacional apuntando a una API externa
  propia.
- **Licencia:** GPL-3.0 (copyleft fuerte) — copyleft fuerte en una
  landing comercial es una decisión filosófica válida pero inusual en el
  sector. *(Nota de archivado: C-005 permite copyleft propio declarado
  por directorio; el copyleft de terceros es el que exige repo
  separado.)*
- **Higiene reciente:** el último commit dice literalmente *"fix security
  vulnerabilities and clean up project"* (17 ago) — señal de que hay
  proceso de revisión, aunque no hay forma de saber qué vulnerabilidades
  eran sin el diff completo del PR.
- **Sin CI/CD:** ningún workflow en `.github/`. El despliegue depende de
  que Cloudflare Workers Builds esté enganchado al push a `main`
  (probable, dado el `wrangler.jsonc`, pero no verificable desde el
  código solo).

### 2.2 — `numen-games-nwos-orgs/nwos-workspace-template`
El "molde" que se clona para crear el workspace NWOS de cada cliente
nuevo.

- **No es una app de código** — es una plantilla Markdown pura: `canon/`,
  `missions/`, `decisions/`, `protocols/`, `operations/`,
  `agents/_template/`, más un único `web/index.html` estático de "en
  construcción".
- **Doble licencia deliberada y bien documentada:** el molde en sí es
  MIT; el `LICENSE.client` es una plantilla de licencia "todos los
  derechos reservados" que se renombra a `LICENSE` en el workspace
  generado, a nombre del cliente. La lógica de qué archivos se quedan y
  cuáles se descartan al generar vive en `REUSE.toml`, con un comentario
  que dice que fue **verificado línea a línea contra el inventario
  completo el 17 de agosto** — esto es la corrección del incidente de
  licencia que se describe en § 4.
- **Último commit** (17 ago): *"Merge audit/c005-licensing: C-005
  remediation of the mould (Oracle-approved)"* — es decir, este repo se
  tocó hoy mismo específicamente para arreglar un problema de
  licenciamiento. Ver § 4.

### 2.3 — `numengames/nwos-deploy`
Herramienta interna que genera workspaces NWOS nuevos desde el molde.

- **Nombre interno real:** el `package.json` dice `"name": "nwos-web"`,
  **no** `nwos-deploy` — el nombre del repo en GitHub y el nombre del
  paquete no coinciden. Añade confusión al problema de nombres de § 1.
- **Framework:** Astro 5.18 + islas React 19, shadcn/ui, Tailwind 3,
  Framer Motion.
- **Deploy:** adaptador de **Vercel** (`@astrojs/vercel`), sirviendo
  `nwos.numen.games` — a diferencia de los otros repos Astro de la org,
  que van a Cloudflare Workers. Es el único de los 4 que usa Vercel;
  inconsistencia de plataforma dentro de la misma organización (coste
  operativo de mantener dos proveedores de hosting distintos para
  proyectos hermanos).
- **Backend/SSR real:** tiene rutas de servidor de verdad
  (`export const prerender = false`) que llaman al **SDK de Anthropic**
  (`@anthropic-ai/sdk`, modelo `claude-sonnet-4-20250514` hardcodeado —
  ⚠️ ver nota abajo) con la tool de `web_search`, y a **Octokit** para
  crear repos privados de GitHub desde la plantilla y commitear los
  documentos canon generados. Es decir: este repo tiene una API key de
  Anthropic y un token de GitHub con permisos de escritura en el flujo de
  `/api/registro`.
- **Manejo de secretos:** correcto — `.env` en `.gitignore`,
  `.env.example` sin valores reales, variables leídas por
  `import.meta.env` server-side, nunca expuestas al cliente. Sin
  hallazgos negativos aquí.
- **⚠️ Modelo de Anthropic hardcodeado deprecado — posiblemente ya
  retirado:** *(corregido en v1.1.0 contra el catálogo oficial)*
  `claude-sonnet-4-20250514` (Claude Sonnet 4) está **deprecado con
  retiro anunciado para el 15 de junio de 2026 — fecha que ya pasó**. El
  reemplazo directo es `claude-sonnet-5`. Si el retiro se ejecutó, el
  endpoint devuelve 404 y **`/api/registro` está roto en producción ahora
  mismo sin alarma visible** — verificar con una llamada de prueba es
  urgente, no opcional. (La familia vigente hoy: Claude Fable 5, Opus 5,
  Opus 4.8/4.7/4.6, Sonnet 5, Sonnet 4.6, Haiku 4.5.)
- **⚠️ Sin fichero LICENSE.** Es el único de los 4 repos sin ningún tipo
  de licencia declarada. Dado que el resto del ecosistema Numen (incluida
  la propia plantilla que este repo despliega) es muy riguroso con
  REUSE.toml y regímenes de licencia explícitos, esto es una laguna, no
  una decisión — probablemente un descuido más que una elección de "todos
  los derechos reservados" consciente.
- **Sin tests, sin lint, sin CI** — declarado explícitamente así en su
  propio `CLAUDE.md`: *"No tests, lint, or CI."*
- **Deuda técnica documentada por ellos mismos:** `api/populate.ts` está
  descrito en `CLAUDE.md` como *"a leftover duplicate of logic inlined in
  registro.ts"* — código muerto conocido y sin limpiar.

### 2.4 — `numengames/numinia-nwos`
El workspace NWOS real de Numinia (instancia operativa, no plantilla) —
este es el más grande e interesante de los 5, y también contiene una
subapp de código.

- **Cuerpo principal:** documentación de gobernanza NWOS igual que la
  plantilla (§ 2.2) pero llena de contenido real: **69 misiones**
  *(corregido en v1.1.0 — la cifra original decía 14; tras la
  unificación MIS-066 la carpeta plana `missions/` contiene 69 archivos
  de misión)*, 5 agentes con personalidad propia (Adonaz, Nimrod, Senet,
  Ursa, Procurador-01), decisiones (ADR/DEC), informes diarios desde
  abril hasta hoy.
- **Subapp `web/`:** una **tercera** copia del stack Astro 5 + React 19 +
  shadcn/ui + Tailwind, con configuración propia
  (`site: "https://numinia.org"`, deploy en Cloudflare Workers vía
  `wrangler.toml`, **sin** SDK de Anthropic ni Octokit — es un visor
  público de solo lectura de las misiones/decisiones/planos, sin las
  rutas privadas de generación que sí tiene `nwos-deploy`).
- **Ver § 3** para el análisis de por qué esto es three-way duplication y
  qué hacer con ello.
- **Gobernanza de licencias, la más madura de los 4 repos con código:**
  `REUSE.toml` reparte regímenes por carpeta (`canon/`, `guilds/`,
  `agents/` → reservado; `decisions/`, `missions/`, `blueprints/` →
  CC-BY-4.0), con un script propio
  (`scripts/check-license-frontmatter.mjs`) que **falla el build** si el
  frontmatter `license:` de un documento no coincide con lo declarado en
  `REUSE.toml`.
- **Incidente legal real y ya resuelto:** ver § 4.
- **Ya tiene su propia misión de CI/CD y se cerró hoy mismo como
  obsoleta** — ver § 5, es relevante para tu pregunta.

---

## 3. Redundancia arquitectónica: tres Astro casi gemelos

Hay **tres repos** sirviendo variantes del mismo stack Astro 5 + React 19
+ Tailwind + shadcn/ui, con componentes de nombre idéntico
(`FeatureCard.astro`, `Navigation.astro`, `Footer.astro`, etc.) y
estructura de páginas muy parecida (`missions`, `decisions`,
`blueprints`, `reports`, `archive`...):

| | `nwos-deploy` | `numinia-nwos/web` | `numengames/nwos-web` (no auditado, fuera de tu lista) |
|---|---|---|---|
| Dominio | `nwos.numen.games` | `numinia.org` | probablemente el producto NWOS público |
| Hosting | Vercel | Cloudflare Workers | ? |
| Backend SSR privado (Anthropic + GitHub) | ✅ sí | ❌ no | ? |
| Propósito | Herramienta interna de generación de workspaces | Visor público de solo lectura de un workspace concreto | ? |

**Por qué importa:** cada vez que se cambia un componente compartido (por
ejemplo `Navigation.astro` o el sistema de diseño de `DESIGN.md`), hay
que recordar tocarlo en dos o tres sitios a mano. Ya hay evidencia de
deriva: comparé `astro.config.mjs` de `nwos-deploy` contra el de
`numinia-nwos/web` y difieren en adaptador (Vercel vs ninguno/estático),
dominio, y redirecciones — es decir, ya se han bifurcado, no son copias
sincronizadas.

**No digo que esto esté "mal"** — separar el visor público (sin secretos,
sin API keys) de la herramienta privada de generación (con Anthropic +
GitHub token) es una decisión de seguridad razonable. Lo que sí es una
mejora disponible: extraer los componentes UI compartidos (`FeatureCard`,
`Navigation`, `Footer`, `DESIGN.md`, tokens de Tailwind) a un paquete npm
interno o a un monorepo con workspaces (pnpm workspaces / Turborepo),
para que el sistema de diseño se actualice en un sitio y se propague, en
vez de mantenerse a mano en 2-3 repos que ya no coinciden. *(Nota de
archivado: esto es la variante inter-repo del problema que MIS-068 —
propagación sin deriva — ya tiene encargado para los artefactos NWOS.)*

---

## 4. Incidente de licencia (LD-001) — resuelto, vale la pena que lo conozcas

Documentado por el propio sistema en `numinia-nwos/LEGAL_DEBT.md`,
firmado por el Oráculo (Pablo) el 16 de agosto. *(Corrección de archivado:
la detección y la remediación las ejecutaron el Oráculo y el agente de
sesión de Claude — no Nimrod, que está inactivo; la versión original de
esta auditoría se lo atribuía a Nimrod.)*

El repo `numinia-nwos` se publicó originalmente con un `LICENSE` raíz
CC0-1.0 heredado de otra decisión (DEC-002, "construir en público bajo
CC0" para el catálogo de assets 3D). Ese CC0 se arrastró sin querer sobre
contenido que debía ser reservado: el manual de rol completo de Numinia,
el compendio de rangos, las "personas" (SOUL.md) de los agentes
Adonaz/Nimrod/Senet/Ursa, y las guías de marca. **Todo el historial hasta
el commit `0157be9` quedó ofrecido bajo CC0 de forma irrevocable** — una
renuncia CC0 no se puede retirar una vez publicada, así que cualquiera
puede legalmente usar ese contenido histórico. La marca (Numinia, Numen
Games, Khepri) no se vio afectada, porque el trademark es un régimen
aparte de los derechos de autor.

**Resolución aplicada:** de ese commit en adelante, `REUSE.toml` reparte
licencias por carpeta con precisión, y el script de verificación de
frontmatter falla el build si algo se declara mal. Es una solución
correcta y bien documentada — el propio documento dice explícitamente que
**no** se intenta revocar lo ya publicado (sería imposible), solo cerrar
la fuga hacia adelante.

**Por qué te lo señalo:** es un caso de estudio real de qué pasa cuando
una licencia por defecto se hereda sin auditar el contenido que cubre.

---

## 5. CI/CD — ya te lo preguntaste tú mismo, y la respuesta está en el propio repo

`numinia-nwos/missions/MIS-012-numengames-cicd.md` es una misión que
pedía exactamente esto — GitHub Actions con build obligatorio antes de
merge y deploy automático — y **se cerró hoy (17 ago) como cancelada, por
obsoleta**, con esta justificación textual del propio sistema:

> *"Target site no longer exists; deploy pipelines are now per-repo
> Workers Builds."*

Esto confirma lo que vi en el código: `numengames.com` como sitio
standalone ya no existe (devuelve 404 — la web corporativa vive en
`numen.games`) *(corrección de archivado: no redirige, simplemente
404)*, y el patrón de despliegue elegido para toda la org es
**Cloudflare Workers Builds** (integración nativa de Cloudflare con
GitHub, sin YAML propio) en vez de GitHub Actions clásico. Es una
elección válida — menos código de infraestructura que mantener — pero
tiene un coste que no está mitigado en ningún repo: **nada bloquea un
merge a `main` si el build falla o si hay un error de tipos**. Workers
Builds construye *después* de mergear, no antes. Si te importa que un PR
roto no llegue nunca a `main`, eso sigue siendo un hueco real en los 4
repos. *(Nota de archivado adicional: hoy mismo se comprobó otra arista
del mismo coste — un incidente de GitHub degradó los webhooks y Workers
Builds dejó de desplegar sin señal alguna; ver MIS-069, plan B de
continuidad.)*

---

## 6. Hallazgos priorizados

### 🔴 Importante
1. **`nwos-deploy` sin LICENSE** — decidir régimen (probablemente "todos
   los derechos reservados" explícito, dado que maneja lógica de negocio
   y credenciales) y declararlo, para no depender del default legal
   implícito.
2. **Modelo de Anthropic hardcodeado deprecado — retiro anunciado ya
   vencido** en `nwos-deploy/src/pages/api/registro.ts`
   (`claude-sonnet-4-20250514`, reemplazo `claude-sonnet-5`) — verificar
   HOY que el endpoint sigue respondiendo; si el retiro se ejecutó,
   `/velo` está roto en producción sin alarma visible.
3. **Confirmar qué repo alimenta realmente el Worker
   `nwos-web.pablofm.workers.dev`** — ni el propio equipo interno parece
   tenerlo 100% claro (comentario en el propio código, § 1).

### 🟠 A vigilar
4. **Tres codebases Astro con componentes duplicados y ya divergentes**
   (§ 3) — no urge arreglarlo, pero cada mes que pase sin unificar el
   sistema de diseño compartido, más caro será hacerlo. Candidato natural
   a monorepo con pnpm workspaces.
5. **Ningún repo bloquea merges rotos** — Workers Builds despliega, no
   audita antes de mergear. Si algún día un PR con un error de build
   llega a `main`, se desplegará igual.
6. **Inconsistencia de gestor de paquetes:** pnpm en `numengames-web`,
   npm en `nwos-deploy` y `numinia-nwos/web`. No es grave, pero mezclar
   lockfiles añade fricción si algún día se comparte código entre repos.
7. **Inconsistencia de plataforma de hosting:** Cloudflare Workers en 3
   sitios, Vercel en 1 (`nwos-deploy`). Mantener dos proveedores para
   proyectos hermanos duplica la superficie operativa (cuentas, billing,
   límites, DNS) sin beneficio evidente — a menos que haya una razón
   concreta (p. ej. `nwos-deploy` necesita algo que Workers no ofrece
   bien, como funciones server-side largas).

### 🟢 Positivo, para que quede constancia
8. El sistema de gobernanza (Oráculo + agente de sesión) **ya detectó y
   corrigió** el incidente de licencia CC0 (§ 4) con un proceso de
   auditoría real, documentado, con alcance temporal acotado y script que
   falla el build ante drift futuro.
9. `numengames-web` migró de SPA cliente-only (auditoría de abril,
   puntuación 4.5/10, sin SEO, sin SSR) a Astro con SSR/SSG real — la
   mayoría de los problemas críticos de esa auditoría de abril (`C-001` a
   `C-004`) parecen resueltos hoy, aunque no re-ejecuté
   Lighthouse/PageSpeed para confirmarlo con números (ver § 7).
10. Manejo de secretos correcto en `nwos-deploy` (`.env` ignorado, nunca
    expuesto al cliente).
11. `numengames-web` es el único de los 4 con testing real configurado
    (Vitest) y con `packageManager` fijado por hash para
    reproducibilidad.

---

## 7. Límites de esta auditoría (honestidad epistémica)

Para que sepas exactamente qué verifiqué y qué no:

- **Sí verifiqué:** estructura de ficheros completa, `package.json` y
  dependencias declaradas, configuración de build/deploy, manejo de
  `.env` y secretos, presencia/ausencia de CI, licencias declaradas,
  historial de commits reciente (solo el último commit — clon superficial
  `--depth 1`), contenido de documentos de gobernanza y misiones.
- **No verifiqué (no tenía forma de hacerlo desde aquí):**
  vulnerabilidades reales en dependencias (no corrí `npm audit` ni
  `pnpm audit`), métricas de rendimiento reales (Lighthouse/PageSpeed),
  estado real de despliegue en producción de cada dominio, ni qué repo
  alimenta exactamente el Worker `nwos-web` mencionado en § 1 — eso
  requiere acceso al dashboard de Cloudflare o GitHub que no tengo.
- **Repos con historial recortado:** todos los clones fueron `--depth 1`
  (solo el commit más reciente), así que las fechas de "última actividad"
  que cito son del último commit visible, no un análisis de frecuencia de
  commits a lo largo del tiempo.

Trabajo futuro posible: (a) correr `npm audit`/`pnpm audit` sobre los
lockfiles reales para buscar CVEs conocidos, (b) clonar
`numengames/nwos-web` (el repo que sí existe con ese nombre) para
completar el cuadro de § 3, o (c) mirar el histórico completo de commits
de cada repo en vez de solo el último.

---

*Documento generado a petición de Pablo como insumo para mejores
decisiones sobre el stack de Numen Games / NWOS. Método: lectura directa
de código, no inferencia. Versionar cada cambio (SemVer).*
