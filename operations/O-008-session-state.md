---
id: "O-008"
title: "Estado de sesión — dónde retomar"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-18"
updated: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [operations, handoff, session, state]
license: "CC-BY-4.0"
---
# Estado de sesión — dónde retomar

> **Resumen:** Punto de continuación al cierre de la sesión del
> 2026-08-18. Qué quedó vivo, qué espera firma y cuál es el siguiente
> paso de cada frente.
> **Epistémico:** El estado real del sistema al cerrar, sin reconstruirlo
> de los commits.
> **Pragmático:** Un agente nuevo (o el Oráculo) abre esto y sabe por
> dónde seguir.
> **Audiencia:** Agentes · Oráculo

**Regla de uso:** este documento se reescribe al cerrar cada sesión —
no se acumula historia aquí (para eso está `CHANGELOG.md` y el board).
Primer paso de cualquier sesión: `git pull` y auditar (AGT-01); lo escrito
abajo era cierto al cerrar, no necesariamente ahora.

---

## 1. Lo que espera tu firma (Oráculo)

| Qué | Dónde | Decisión pendiente |
|---|---|---|
| **Sistema de Diseño v5.1.0** | `standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md` · [web](https://numinia.org/corpus/standards/2026_08_18-sistema_de_diseno-v510) | Estado sigue «propuesto»; firmarlo o devolverlo |
| **P-010 How to Archive v0.3.0** | [web](https://numinia.org/corpus/protocols/p-010-how-to-archive) | Es la **F0** de MIS-089: sin firma no se mueve un fichero del archivo |
| **MIS-089** arquitectura de la información | [web](https://numinia.org/missions/mis-089) | Registro D1–D8 de duplicados: aprobar disposiciones |
| **MIS-095** práctica de Updates (PM-06) | [web](https://numinia.org/missions/mis-095) | 3 decisiones: versionado de numinia.org, idioma, nivel SHOULD/MUST |
| **MIS-096** versionado soberano de NWOS | [web](https://numinia.org/missions/mis-096) | 5 preguntas abiertas; la clave: qué es el «NWOS core» |
| **Ampliación del subconjunto de iconos** | [MIS-093](https://numinia.org/missions/mis-093) | 69 glifos Phosphor en uso; ratificar el vocabulario |

## 2. Frentes abiertos, por estado

- **Archivo / información (MIS-089, draft):** plan en 5 fases, F0 espera
  firma. Duplicados detectados y sin tocar: manual del juego duplicado
  (.txt y .md), 2 auditorías en `blueprints/`, 3 `archive-summa-*` que son
  fondo, reportes con doble fuente (`reports/daily/` vs 5 páginas
  hardcodeadas), tres convenciones de nombre, INDEX manuales, ~32 ficheros
  sin frontmatter.
- **Propagación / soberanía (MIS-068 in-progress, MIS-096 draft):** G-11 y
  G-12 escritas en `GOVERNANCE.md`; CON-006 registrada. Falta versionar el
  NWOS core y reformular el guard (detecta, no obliga).
- **Diseño (MIS-092, MIS-093, MIS-094 done):** paleta canónica, iconos
  Phosphor, kit 5.1.0 con manifiesto sha256 publicado en
  `/diseno/kit/5.1.0/`. Pendiente: kit regenerado como `sistema.*` cuando
  el emisor lo empaquete, y `web/DESIGN.md` (superseded) espera la lista
  de conservación del Oráculo.
- **Legales (MIS-086 done):** publicados en numinia.org y numinia.com con
  aceptación pre-login en el LAP. **CON-004 y CON-005 siguen abiertas**:
  flags de revisión FLAG-2..6 y el desajuste de ámbito (los textos rigen
  www.numen.games).
- **Del agente de numinia-web (backlog, sin asignar):** MIS-100 a MIS-107
  — protección de ramas, el molde cumpliendo su propio checklist,
  consumidores fijando el kit 5.1.0, inventario de 17 repos, el Worker
  fantasma, **MIS-105 (firmar los estándares y definir el sync — toca
  directamente G-12/MIS-096)**, el nombre retirado en el molde, y
  numen.games ignorando su locale.

## 3. Estado técnico verificado al cierre

- Working tree limpio, `main` == `origin/main`, todo desplegado.
- numinia.org: 475+ páginas, 232 PDFs (28,6 MB), sprite de iconos en
  `/icons.svg` cacheado; board de misiones 186 KB (era 293).
- Guard de licencias en verde (202/236 .md declaran licencia).
- Flujo de deploy: `npm run build` → `npm run build:pdf` → `npx wrangler
  deploy` (la CI solo hace build; los PDFs necesitan Chromium local).

## 4. Reglas aprendidas esta sesión (ya escritas donde tocan)

- **G-11** (`GOVERNANCE.md`): el canon no se copia, se fija.
- **G-12** (`GOVERNANCE.md`): un repo NWOS derivado es soberano; se le
  ofrecen versiones, no se le impone ley. Con su clase de error a vigilar.
- **P-008 v1.2.0**: todo lo que se presente a revisión lleva su URL
  canónica de numinia.org (puente L3 entre agentes).
- **P-010 §3.1**: IDs de misión se calculan sobre lo commiteado tras pull;
  en colisión, renumera quien commiteó segundo.
