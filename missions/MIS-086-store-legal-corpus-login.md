---
id: "MIS-086"
title: "El corpus legal real entra en numinia.com y la puerta pide aceptarlo"
type: mission
status: backlog
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

- [ ] Copias verbatim de los dos másters en `apps/store/src/content/legal/`
      (frontmatter incluido), con anotación REUSE
      `LicenseRef-Numen-AllRightsReserved` para esa ruta.
- [ ] `/legal/terms/` y `/legal/privacy/` renderizan el markdown real en los
      5 locales; el banner DRAFT desaparece SOLO de esos dos documentos
      (cookies y legal-notice siguen en borrador con su banner).
- [ ] Idiomas honestos: terms es EN-only → aviso de idioma en es/ja/ko/pt-br;
      privacy es ES-only → aviso en en/ja/ko/pt-br (FLAG-5 queda para el
      abogado; no traducir por cuenta propia).
- [ ] `/lap/session/`: la isla de login no monta el widget de conexión hasta
      que el usuario marque una casilla de aceptación con enlaces a
      `/legal/terms/` y `/legal/privacy/` (con `data-metric`, instrumentación
      obligatoria). Sesiones ya autenticadas no ven la casilla.
- [ ] `npm run ci` (type-check → lint → test → build) en verde; presupuesto
      de peso y gates a11y respetados.
- [ ] Desplegado a numinia.com y verificado en vivo.
- [ ] Al cerrar: Execution Reality rellenada aquí, y aviso al Oráculo de que
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

*(Fill when completing the mission)*

---

## Execution Reality

*(Fill when closing the mission — the real plans vs the ideal plans)*

- **Technology/approach used:** (vs what was planned)
- **Why it diverged:** (what challenge modified the path)
- **Key learning:** (the knowledge that lives in that gap)
- **Closing date:** YYYY-MM-DD
- **Executing agent:** (name / agent-id)

> *"The ideal plans show the intention. The real plans show the knowledge."*
