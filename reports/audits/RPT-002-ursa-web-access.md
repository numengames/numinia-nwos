---
id: "RPT-002"
uid:
title: "Acceso web a Ursa para terceros: qué existe, qué no, y por qué el canal es una decisión de producto"
type: report
subtype: audit
status: active
version: "2.0.0"
created: "2026-09-01T08:40:00Z"
created_source: "git:c5bf8ef"
created_confidence: exact
updated: "2026-09-01T09:15:00Z"
author: "ursa"
owner: "oracle"
guild: "Procurators"
territory: "Archive"
tags: [audit, hermes, acceso, web, seguridad, numinia.org]
license: "CC-BY-4.0"
evidence_head: "c5bf8ef"
scope: "numinia-nwos @ c5bf8ef · superficie pública: numinia.org · máquina: arkitecktonia-lab"
requested_by: "oracle"
---

# Acceso web a Ursa para María y Christian

> **v2.0.0 (2026-09-01)** — enmienda fechada. La v1.0.0 afirmó que no existía
> interfaz web de comunidad. **Era falso**, por búsqueda deficiente del agente.
> El Oráculo señaló el proyecto real (`hermes-webui`, 17.942 ★) con su cifra de
> estrellas. Reescritas §4 y §5; errores registrados en §11.
>
> **Medición y hallazgo, no decisión.** El Oráculo pidió acceso a Ursa para dos
> terceros desde `numinia.org`, «primera iteración sencilla». Este informe
> documenta qué existe realmente, dos errores propios corregidos, y la decisión
> que queda abierta. **Nada fue modificado ni contratado.**

---

## 0. Resumen

| Pregunta | Respuesta verificada |
|---|---|
| ¿Existe hosting gestionado de Hermes? | **Sí** — Hermes Cloud, en preview, desde $10 |
| ¿Necesitan María y Christian cuenta propia? | **Depende del canal** (ver §3) |
| ¿Existe una web UI de comunidad madura? | **Sí — `hermes-webui`, 17.942 ★, MIT** (ver §4.1) |
| ¿La hay con audio TTS/STT? | Sí, `hermes-studio` — **descartada por licencia BSL** (ver §4.2) |
| ¿Existe lo que el Oráculo describe? | **Casi todo, salvo el embebido en la página** (ver §5) |
| ¿Es una decisión de infraestructura? | **No — es de producto** (ver §6) |

---

## 1. Estado de partida, medido

Máquina `arkitecktonia-lab`, perfil `ursa`, 2026-09-01:

| Medida | Valor |
|---|---|
| Perfiles Hermes | 3 (`default`, `antunj`, `ursa`) |
| Gateway | corriendo **a mano** (PID 3085267), no como servicio |
| `hermes serve` / dashboard | no corriendo |
| Pairings registrados | 0 |
| Portal (Nous) | **no logueado** |
| `cloudflared` / `wrangler` | no instalados |
| `numinia-nwos` | `github.com/numengames/numinia-nwos` @ `c5bf8ef`, árbol limpio |

**Consecuencia de la última fila:** el corpus está en GitHub, luego un agente
alojado puede clonarlo. El acceso remoto **no** requiere exponer la máquina del
Oráculo. Esto elimina la opción del túnel doméstico antes de evaluarla.

---

## 2. Hermes Cloud (verificado en `portal.nousresearch.com/cloud`)

Agente alojado, siempre activo, contenedor aislado por instancia, memoria
persistente, conectores Telegram/Discord/Slack/Email/CLI. Mínimo $10 en créditos
o suscripción activa. **En preview.**

Resuelve la objeción registrada del Oráculo («depender de mi máquina no es lo
deseado») y elimina túnel, DNS y certificado.

**Aislamiento de sesión.** Hermes usa `group_sessions_per_user: true` por
defecto: cada persona obtiene su propia sesión y transcripción. **Un solo agente
compartido es suficiente**; dos agentes duplicarían coste sin ganar aislamiento.

---

## 3. Error propio nº1 — corregido

> **Afirmé:** «María y Christian no necesitan cuenta de Portal; solo gastan tus
> tokens.»
>
> **Es cierto solo en mensajería.** En el dashboard web es **falso**.

El dashboard ofrece tres proveedores de autenticación:

| Proveedor | Identidades separadas | Apto para internet |
|---|---|---|
| Usuario/contraseña | **No** — credencial compartida | **No** (la doc lo prohíbe explícitamente) |
| OAuth Nous Portal | Sí — pero **cada uno necesita cuenta Nous** | Sí |
| OIDC propio (Keycloak/Auth0/Google) | Sí | Sí |

**Segundo matiz que corrijo:** el aislamiento por persona de §2 aplica a
plataformas de mensajería, **no** al dashboard con credencial compartida. Con
contraseña única, María y Christian verían la misma conversación —y además las
claves API y la configuración del Oráculo.

El dashboard es una **consola de operador** (`managing config, API keys, and
sessions`), no un chat multiusuario.

---

## 4. Los proyectos de la comunidad

El Oráculo conjeturó que alguien de la comunidad estaría construyendo una
interfaz web, y estimó «unas 17k estrellas». **Ambas cosas eran correctas.**

### 4.0 Censo, verificado contra la API de GitHub (2026-09-01)

Estrellas leídas de `api.github.com/repos/*`, no de descripciones de terceros
(las búsquedas devolvían cifras contradictorias: 1.100, 1.500, 10k+).

| Repo | ★ | Forks | Issues | Licencia | Creado | Último push |
|---|---:|---:|---:|---|---|---|
| `nesquena/hermes-webui` | **17.942** | 2.493 | 818 | MIT | 2026-03-30 | 2026-08-31 |
| `EKKOLearnAI/hermes-studio` | **10.752** | 1.299 | 321 | **BSL-1.1** | 2026-04-11 | 2026-09-01 |
| `NousResearch/Hermes-Bot-Mode` | 658 | 117 | 13 | MIT | 2026-08-13 | **archivado** |
| `boshify/hermes-chat-bot-example` | **0** | 1 | 0 | MIT | 2026-05-27 | 2026-05-27 |

### 4.1 `nesquena/hermes-webui` — el candidato viable

MIT · v0.50.8 · 791 tests · 8 contribuidores. Python + JS vanilla, sin build.
Del autor: *«1:1 parity with Hermes CLI from a convenient web UI»*.

Contra los requisitos enunciados por el Oráculo:

| Requisito | Estado |
|---|---|
| Ver los distintos agentes | ✅ selector de perfiles con estado de gateway y modelo |
| Ver las distintas conversaciones | ✅ gestor de sesiones con búsqueda, etiquetas, proyectos |
| Chat como el de Hermes | ✅ streaming, tool cards, bloques de pensamiento, Mermaid |
| Audio | ⚠️ **solo entrada de voz** (Web Speech API); no reproducción |
| Botón a sesión más compleja | ✅ paridad CLI: slash commands, cron, skills, memoria, ficheros |

**Resuelve el bloqueante de auth de §3:** OIDC nativo (`webui_oidc.issuer`,
`client_id`, `allow_claim`, `allow_values`), passkeys/WebAuthn, cookie HMAC
HTTP-only, cabeceras de seguridad. `allow_claim`/`allow_values` es el allowlist
que faltaba: entran María y Christian por Google, nadie más.

**Dos límites:**

1. **No es embebible.** App de tres paneles a pantalla completa. Envía
   `X-Frame-Options`, que **bloquea el iframe por diseño**. Enlace desde
   `numinia.org`: sí. Incrustado en la página: no.
2. **No es multi-tenant.** El login da acceso *a la instancia* — todos los
   perfiles, ficheros, memoria y cron del Oráculo. No es «María ve lo suyo»,
   es «María entra en tu Hermes».

Las 818 issues sobre 17.9k estrellas son proporción normal en proyecto joven y
muy activo (cinco meses de vida), no señal de abandono.

### 4.2 `EKKOLearnAI/hermes-studio` — descartado por licencia

Cubre el audio que falta en §4.1: TTS (Edge, OpenAI, ElevenLabs, Gemini, xAI,
MiniMax…), STT, escenario de voz a pantalla completa, y multiusuario real
(superadministradores, usuarios, vinculación de perfiles).

**Pero su licencia lo descarta para Numinia.** No es software libre:

> **BSL-1.1** · Licensor: EKKOLearnAI · Change Date: **2029-05-10** → Apache-2.0
>
> *«Commercial use (including but not limited to selling, licensing, SaaS
> hosting, or **embedding in a commercial product**) requires a separate
> commercial license from the Licensor.»*

Tres razones para descartarlo, en orden de peso:

1. **El uso previsto es exactamente el prohibido.** Servir Ursa desde
   `numinia.org` —dominio de un proyecto con tienda y actividad comercial— es
   *SaaS hosting* y/o *embedding in a commercial product*. Requiere licencia
   comercial de EKKOLearnAI hasta 2029-05-10.
2. **Contamina el marco de licencias del repo.** `REUSE.toml`, C-005 y la
   política declarada (packages MIT, apps AGPL-3.0, assets CC0, docs CC-BY-4.0)
   no admiten una dependencia BSL sin una excepción explícita y documentada.
3. **Asimetría declarada.** El licenciante se exime a sí mismo de las
   restricciones que impone al resto («are not subject to the Additional Use
   Grant restrictions»).

Riesgo adicional, menor pero real: credenciales de arranque `admin` / `123456`,
con un comando (`reset-default-login`) que las restablece sobre una cuenta
existente.

**Conclusión:** el proyecto que resuelve el audio es el que no se puede usar.

### 4.3 `boshify/hermes-chat-bot-example` — descartado por abandono

MIT, widget flotante para Next.js. **Este fue el hallazgo erróneo de la primera
búsqueda** (ver §11, error nº4).

| Medida | Valor |
|---|---|
| Estrellas | **0** |
| Commits | **1** |
| Creado | 2026-05-27T21:07:37Z |
| Último push | 2026-05-27T21:07:55Z (**18 segundos después**) |
| Issues abiertas | 0 |

No es un proyecto: es una demo de una tarde, abandonada el día que nació.

**Lo que hace por dentro** (leído en `src/app/api/chat/route.ts`):

- **Sin autenticación.** El README: *«no auth required (add your own if you need it)»*.
  Cualquiera que abra la página chatea y gasta los tokens del Oráculo.
- **Historial en `localStorage`.** Las conversaciones viven en el navegador de
  cada persona: no son portables entre dispositivos ni auditables.
- **`stream: false`, un solo endpoint.** Sin streaming, sin audio, sin
  herramientas visibles, sin selector de agentes.

### 4.1 Riesgo de seguridad — el hallazgo que importa más que el widget

Ese widget se conecta al **API server** (`api_server`), superficie distinta del
dashboard. La documentación de Hermes advierte:

> «The API server gives full access to hermes-agent's toolset, **including
> terminal commands**.»

Y documenta un incidente real:

> «An unauthenticated public dashboard was the entry point for the June 2026
> MCP-config persistence campaign: internet scanners reached exposed dashboards
> (and OpenAI API servers) and drove the agent into planting an SSH-key backdoor.»

**Un widget sin auth delante del API server es una consola remota abierta a
internet.** Esta combinación queda desaconsejada sin matices.

---

## 5. Lo que el Oráculo describe: existe casi entero, salvo el embebido

Requisitos enunciados: chatear, oír audios, copiar, compartir, refrescar, ver los
distintos agentes y las distintas conversaciones, y un botón que escale a una
sesión Hermes completa, **incrustado en la página**.

| Requisito | ¿Existe? | Dónde |
|---|---|---|
| Chat con agentes y conversaciones | **Sí** | `hermes-webui` (§4.1) |
| Botón a sesión completa | **Sí** | `hermes-webui`, paridad CLI |
| Identidades separadas | **Sí** | `hermes-webui` + OIDC |
| Audio (TTS + STT) | Solo en `hermes-studio` | **descartado por licencia** (§4.2) |
| **Incrustado en la página** | **No existe** | `X-Frame-Options` lo impide |
| Aislamiento por persona | **No** | ninguna instancia es multi-tenant |

**Corrección respecto a v1.0.0 de este informe:** se afirmó que «no existe».
Es falso. Existe `hermes-webui`, con 17.942 estrellas, y cubre la mayor parte de
lo pedido. Lo que **no** existe es la versión *embebible* dentro de
`numinia.org` — y esa carencia es de diseño, no de madurez: la app manda
`X-Frame-Options` deliberadamente.

**Premisa del Oráculo verificada y confirmada.** La intuición de que Desktop
introduce estado local es correcta: `HERMES_DESKTOP_CWD`, sesiones y directorio
de proyecto residen en la máquina de cada persona. El razonamiento «chateamos y
comprobamos en GitHub, todo en web» es sólido, y ahora tiene herramienta.

---

## 6. La decisión abierta: es producto, no infraestructura

El canal determina **qué es Ursa**:

- un enlace a Telegram la convierte en **bot de soporte**;
- un chat en la propia web la convierte en **la puerta del tablero**.

Esto choca con `salida/brief-landing-numinia-org.md`, donde `numinia.org` es «el
tablero donde se construye la ciudad» y las dos puertas (convocado / descubierto)
definen la landing entera. Si Ursa es la puerta, no puede ser un icono en un pie
de página.

**Bloqueante de orden:** ese brief está en estado *«propuesta. No implementar sin
el visto bueno del Oráculo»*. Se está pidiendo colocar un acceso en una landing
cuya estructura aún no está aprobada.

**Dependencia dura:** el widget correcto requiere identidad de usuarios en
`numinia.org` — sin login no existe «mis conversaciones». Eso es un proyecto
(auth, sesiones en servidor, streaming, audio), no una iteración sencilla.

---

## 7. Opciones, sin recomendación única

| # | Opción | Coste | Aislamiento real | Cuándo |
|---|---|---|---|---|
| 1 | Telegram/Discord + Hermes Cloud | Bajo | **Sí** (por defecto) | Esta semana |
| 2 | **`hermes-webui` + OIDC (Google)** | **Medio** | Login sí; datos no (§4.1) | **Días** |
| 3 | Dashboard oficial + OIDC | Alto | Sí | Tras el brief |
| 4 | Dashboard + contraseña compartida | Bajo | **No** | **Desaconsejado** — comparte claves API |
| 5 | `hermes-studio` | Medio | Sí, multiusuario real | **Descartado** — BSL-1.1 (§4.2) |
| 6 | Widget propio embebido en `numinia.org` | Proyecto | Sí, si se construye | Tras identidad en `.org` |

La opción 5 queda descartada por licencia y la 4 por §3. **La 2 es la novedad de
la v2.0.0 de este informe**: da web con identidades en días, no en semanas, a
cambio de aceptar que quien entra ve la instancia entera. La 1 sigue siendo la
más simple. La 6 es la que el Oráculo describe literalmente y la única que exige
construir.

---

## 8. Acordado en sesión

- Un solo agente `Ursa` compartido (no dos).
- Escribe en su clon y entrega **vía Pull Request**; nunca push a `main`.
  Razón: el corpus es evidencia, y la evidencia se enmienda con nota fechada,
  nunca en silencio. Un push directo de un agente es una enmienda silenciosa.
- Tope de gasto configurado **antes** de abrir el acceso: terceros consumen la
  bolsa del Oráculo sin ver el contador.

---

## 9. Pendiente de decisión del Oráculo

**Pregunta única:** ¿María y Christian necesitan acceso **esta semana** para
trabajar, o esto es diseño de cómo debe ser Numinia dentro de tres meses?

- Si es lo primero → opción 1, y la web cuando exista.
- Si es lo segundo → esto deja de ser una tarea de acceso y se convierte en una
  misión de producto, subordinada al brief de la landing.

---

## 10. Observado de paso (sin acción)

1. El gateway del perfil `ursa` corre a mano (PID 3085267), no como servicio:
   muere con la sesión.
2. `hermes serve --status` no reporta procesos pese a estar operando la app de
   escritorio.
3. `numinia.org` y `nwos.numen.games` siguen sirviendo la misma página con pies
   de licencia contradictorios («Open by licence, per file» vs «Todos los
   derechos reservados»). Documentado como avería verificada en el brief; sigue
   en producción hoy.

---

## 11. Errores propios registrados

| # | Error | Corrección |
|---|---|---|
| 1 | «No necesitan cuenta propia» dicho sin distinguir canal | Válido en mensajería, falso en dashboard OAuth (§3) |
| 2 | Aislamiento por persona presentado como universal | Aplica a mensajería, no al dashboard compartido (§3) |
| 3 | Tres URLs de documentación inventadas (404) | Se descargó `llms-full.txt` (3,9 MB) y se buscó en el índice real |
| 4 | **Se declaró que no existía interfaz web de comunidad** | Falso. La búsqueda fue una sola consulta en inglés y se aceptó el primer resultado plausible (`boshify`, 0 ★). El Oráculo señaló el proyecto real y su cifra de estrellas; `hermes-webui` (17.942 ★) apareció al ampliar la búsqueda (§4) |
| 5 | Estrellas tomadas de descripciones de buscador | Devolvían 1.100 / 1.500 / 10k+ para el mismo repo. Contrastado contra `api.github.com` (§4.0) |

**Lección de método registrada:** una sola consulta de búsqueda no es un censo.
Las cifras de popularidad se leen de la API del proveedor, nunca de la prosa de
terceros. El Oráculo tenía el dato correcto —«unas 17k»— antes que el agente.
