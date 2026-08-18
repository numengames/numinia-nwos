---
id: "MIS-086"
title: "El corpus legal real entra en numinia.com y la puerta pide aceptarlo"
type: mission
status: done
version: "1.0.0"
created: "2026-08-18"
updated: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [web, platform, legal, auth]
license: "CC-BY-4.0"
mission_id: "MIS-086"
area: "Platform / numinia-web"
guild: "Procurators"
type_execution: "digital"
priority: "high"
effort: "M"
requested_by: "oracle"
assigned_to: "numinia-web"
depends_on: []
---
# MIS-086 — El corpus legal real entra en numinia.com y la puerta pide aceptarlo

> **Resumen:** Los Términos y Condiciones y la Política de Privacidad reales
> (máster en `numinia-nwos:operations/legal/`) sustituyen a los borradores
> placeholder de numinia.com, y el login de `/lap/session/` exige aceptar los
> términos antes de conectar.
> **Epistémico:** Cómo el corpus legal derivado del máster llega a producción
> sin bifurcar la fuente de verdad.
> **Pragmático:** numinia.com deja de mostrar "DRAFT — pending Oracle review"
> en terms y privacy, y ninguna sesión se crea sin aceptación registrable.
> **Audiencia:** Agente de numinia-web · Oráculo

---

**Area:** Platform / numinia-web
**Guild:** Procurators
**Type:** digital
**Priority:** high
**Effort:** M

---

## Story

Como Oráculo, quiero que numinia.com publique los documentos legales reales y
que el flujo de entrada exija aceptarlos antes del login, para que ninguna
sesión exista sin marco legal aceptado.

---

## Premisas verificadas (auditoría 2026-08-18, agente numinia-nwos)

El diagnóstico ya está hecho; el ejecutor debe re-auditar lo que toque
(AGT-01), pero no partir de cero:

1. numinia.com se sirve desde `apps/store` (wrangler.jsonc raíz: worker
   `numinia-web`, rutas numinia.com y www).
2. Las páginas legales YA existen: `/legal/terms/`, `/legal/privacy/`,
   `/legal/cookies/`, `/legal/legal-notice/` ×5 locales, generadas por
   `apps/store/src/pages/**/legal/[doc].astro` →
   `components/legal/LegalPage.astro` → contenido inline en
   `src/i18n/legal.ts` (borradores con placeholders `[PENDING]` y banner
   "DRAFT — pending Oracle review", MISSION-003 P3).
3. El footer (`components/chrome/SiteFooter.astro`) ya enlaza los cuatro
   documentos — no hay que tocarlo.
4. El login es la isla `components/auth/LoginSpike.tsx` (thirdweb + SIWE),
   montada en `/lap/session/` vía `SessionPage.astro` y en `/spike/auth`.
5. Los másters viven en `numinia-nwos:operations/legal/`
   (`terms-and-conditions-numengames.md` v1.0.0 EN,
   `politica-de-privacidad-numengames.md` v1.1.0 ES). La nota FLAG-1 del
   máster ordena: lo publicado DERIVA del máster, nunca al revés.
6. El glob de docs (`components/docs/content.ts`) solo cubre
   `content/docs/**` — un `content/legal/` nuevo no colisiona.
7. REUSE: `apps/store/src/content/**` está anotado CC-BY-4.0; los legales son
   `LicenseRef-Numen-AllRightsReserved` y necesitan anotación propia más
   cercana (last-match-wins).

## Contexto de excepción (ya registrado, no re-litigar)

El Oráculo ordenó publicar CON los flags de revisión abiertos
(privacidad FLAG-2..6) y con el desajuste de ámbito (los textos dicen regir
www.numen.games). Ambos están registrados en
`numinia-nwos:operations/contradictions.md` como **CON-004** y **CON-005** —
publicar es correcto; resolver los flags es de otra sesión (del abogado /
Oráculo). Los textos se copian **verbatim**: ninguna corrección de contenido,
ni siquiera las erratas flageadas.

---

## Acceptance criteria

- [x] Copias verbatim de los dos másters en `apps/store/src/content/legal/`
      (frontmatter incluido), con anotación REUSE
      `LicenseRef-Numen-AllRightsReserved` para esa ruta.
- [x] `/legal/terms/` y `/legal/privacy/` renderizan el markdown real en los
      5 locales; el banner DRAFT desaparece SOLO de esos dos documentos
      (cookies y legal-notice siguen en borrador con su banner).
- [x] Idiomas honestos: terms es EN-only → aviso de idioma en es/ja/ko/pt-br;
      privacy es ES-only → aviso en en/ja/ko/pt-br (FLAG-5 queda para el
      abogado; no traducir por cuenta propia).
- [x] `/lap/session/`: la isla de login no monta el widget de conexión hasta
      que el usuario marque una casilla de aceptación con enlaces a
      `/legal/terms/` y `/legal/privacy/` (con `data-metric`, instrumentación
      obligatoria). Sesiones ya autenticadas no ven la casilla.
- [x] `npm run ci` (type-check → lint → test → build) en verde; presupuesto
      de peso y gates a11y respetados.
- [x] Desplegado a numinia.com y verificado en vivo.
- [x] Al cerrar: Execution Reality rellenada aquí, y aviso al Oráculo de que
      CON-004/005 ganan una nota "publicado también en numinia.com".

---

## Epistemic value

Primera vez que contenido reservado (regimen all-rights-reserved) derivado del
archivo legal de NWOS llega a una app AGPL pública manteniendo un fichero, un
régimen (C-005 §5) vía anotación REUSE.

## Pragmatic value

El corpus legal deja de ser placeholder en producción y la puerta de entrada
queda condicionada a su aceptación — requisito previo para cualquier
onboarding real de ciudadanos.

---

## Execution log

**2026-08-18 — agente numinia-web (claude-opus-5), tres cortes revisables.**

Tres decisiones se elevaron al Oráculo antes de escribir código, y las tres
ampliaron el alcance escrito: (1) «registrable» significa registrado en la
sesión, no solo un gate de UI; (2) el desajuste de ámbito se declara en una
nota fuera del texto; (3) el banner de consentimiento entra en la misión.

**Corte 1 — el corpus (`720588c`).** Copias byte a byte de los dos másters en
`apps/store/src/content/legal/{terms,privacy}.md` (sha256 verificado contra
`numinia-nwos:operations/legal/`). Registro por glob de Vite en
`components/legal/content.ts` (patrón de `components/docs/`, porque el store
no usa content collections). `LegalPage.astro` pasa a ser dispatcher puro y
delega en `LegalCorpusDoc.astro` (real) o `LegalDraftDoc.astro` (cookies y
aviso legal siguen en borrador, con su banner). Los borradores de terms y
privacy se eliminaron de `i18n/legal.ts`: el texto real los sustituye.
`lib/legal.ts` fija las versiones de los másters y un test unitario falla si
una copia refrescada se desvía de ellas. REUSE: bloque para
`apps/store/src/content/legal/**` con `LicenseRef-Numen-AllRightsReserved`
DESPUÉS del bloque `content/**` (CC-BY) — last-match-wins; `reuse lint`
confirma que ambos ficheros resuelven a reservado.

**Corte 2 — la puerta (`380186f`).** `LegalConsentGate.tsx` (casilla + enlaces
a los dos documentos, con `data-metric`); la isla no monta `ConnectEmbed`
hasta que se marca, y a una sesión ya autenticada no se le pregunta. La
cerradura real es el servidor: `POST /api/auth/login` responde 400 salvo que
el cuerpo nombre `LEGAL_CORPUS_VERSION` (`terms@1.0.0+privacy@1.1.0`), y la
comprobación va ANTES de verificar la firma, así que un login sin aceptar
nunca llega al proveedor. La versión aceptada viaja dentro del payload
firmado de sesión (`@numinia/auth`), opcional en el esquema para no invalidar
sesiones en vuelo. `SessionPanel` salió a su fichero: la isla cruzó las 200
líneas.

**Corte 3 — el aviso (`bf0a139`).** El banner de Layer 0 dejó el lorem ipsum:
copy real en cinco idiomas que nombra exactamente lo que la plataforma guarda
(una cookie para el aviso, otra para la sesión, preferencias y ficha en el
navegador, sin rastreo de terceros), enlace añadido a `/legal/privacy/` y
`CONSENT_VERSION` a `2026-08-18` — toda aceptación del texto placebo se vuelve
a pedir. El suite de aceptación falla si «lorem ipsum» reaparece en un build.

**Release `v0.46.0` (`1243a07`)** con su tarjeta en la línea de tiempo.

**En vivo (2026-08-18 11:36 UTC, SHA `1243a07`).** Comprobado contra
numinia.com: `/legal/terms/` (v1.0.0, sin banner de borrador) y
`/legal/privacy/` (v1.1.0) con nota de ámbito en los cinco locales y aviso de
idioma en todos menos el propio; `/legal/cookies/` conserva su borrador; el
banner sirve `data-consent-version="2026-08-18"` sin rastro de lorem ipsum; la
puerta de `/es/lap/session/` llega ya con la casilla en el HTML servido; y
`POST /api/auth/login` sin aceptación —o con una caducada— responde
`400 {"error":"Legal acceptance is required","required":"terms@1.0.0+privacy@1.1.0"}`.

Verificación: `npm run ci` en verde (28 tareas), 28 escenarios Gherkin, 180
tests Playwright (los 2 fallos locales son el hueco conocido de `/descargas/`
sin hornear, que CI sí hornea), `reuse lint` conforme con REUSE 3.3, WCAG
A/AA sin violaciones en `/legal/terms/` y `/es/legal/privacy/`.

---

## Execution Reality

*(Fill when closing the mission — the real plans vs the ideal plans)*

- **Technology/approach used:** lo planificado (copias verbatim + glob de
  Vite + gate en la isla), más dos cosas que el brief no pedía: la aceptación
  registrada dentro de la sesión firmada y el banner de cookies real.
- **Why it diverged:** el AC decía «ninguna sesión se crea sin aceptación
  registrable» mientras el bullet solo describía un gate de UI. Preguntado al
  Oráculo, eligió registrar de verdad — lo que obligó a tocar `@numinia/auth`.
  El banner entró porque publicar el corpus real detrás de un aviso en latín
  era una incoherencia visible en la misma pantalla.
- **Key learning:** el CSS delata al dispatcher. Un componente que solo
  renderiza una rama sigue enviando los estilos de la otra al bundle de la
  ruta, así que un `html.includes('data-legal-draft')` daba falso positivo en
  una página ya publicada. Las aserciones sobre marcado deben mirar el
  elemento (`/<p[^>]*data-…/`), no el texto plano del HTML. Segundo hallazgo:
  la isla se renderiza en servidor y se hidrata después — marcar la casilla
  antes de la hidratación es un clic que React descarta, y el e2e tiene que
  esperar a `networkidle`.
- **Closing date:** 2026-08-18
- **Executing agent:** claude-opus-5 (sesión numinia-web)

> *"The ideal plans show the intention. The real plans show the knowledge."*
