---
id: "DEUDA-404"
title: "DEUDA-404.md — Consumidores rotos por retiradas de fuente"
type: documentation
status: active
version: "1.0.0"
created: "2026-08-24T10:00:00Z"
updated: "2026-08-24T10:00:00Z"
author: "claude-opus"
owner: "oracle"
license: "CC-BY-4.0"
---

# DEUDA-404 — consumidores rotos por retiradas de fuente

Registro de rupturas **conocidas y aceptadas** provocadas por decisiones de
coherencia en el archivo. La regla del Oráculo (2026-08-24):

> *«De aquí borramos la fuente. Los `.md` tienen que ser coherentes. No importa
> si rompemos algo de camino — asumimos y documentamos los 404 para cuando
> vayamos a los que estén consumiendo.»*

Este fichero es el «después» de esa frase: lo que se rompió, quién lo consume y
qué hay que hacer para repararlo. **Una entrada no se borra al arreglarse: se
marca RESUELTA**, para que la traza quede.

---

## 404-001 · Sistema de Diseño v5.0.0 retirado

**Decisión:** el Sistema de Diseño tiene una sola versión vigente, la **v5.1.0**.
La v5.0.0 se retira del repositorio.

**Retirado:** `standards/2026_08_18-Sistema_de_Diseno-v5.0.0.md`
**Vigente:** `standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md` (declara `supersedes:`)
**Fecha:** 2026-08-24 · **Commit:** ver PR «chore: retire Design System v5.0.0»

### Qué se rompe

| # | Consumidor | Qué pasa | Severidad |
|---|---|---|---|
| 1 | `numinia.org/corpus/standards/2026_08_18-sistema_de_diseno-v500.md` | **HTTP 404.** La ruta se genera desde el repo (`web/src/pages/corpus/[...slug].astro`). Hoy devuelve 200. | alta |
| 2 | `numinia-web/design-source.json` | Pin colgando: `path`, `published` y `sha256` (`a075e215…`) apuntan al fichero retirado. | **crítica** |
| 3 | `numinia-web/scripts/check-design-source.mjs` | Falla con *"Could not read the published master: HTTP 404"* → exit 1. Se invoca con `npm run design:check`. | alta |
| 4 | `numinia-web/apps/store/src/lib/__tests__/design-system-bridge.test.ts` | Lee `design-source.json`; el pin es incoherente aunque el test no descargue. | media |
| 5 | 6 misiones de nwos (MIS-078, 085, 091, 092, 093 y otras) | Citan «v5.0.0» **en texto**, no por enlace: no dan error, quedan como referencia histórica a un documento inexistente. | baja |

> **Aviso sobre el CI:** el CI de `numinia-nwos` **no detecta ninguna de estas
> rupturas** — son cross-repo. Un PR verde aquí no significa que numinia.org y
> numinia-web sigan sanos. Verificación manual obligatoria.

### Estado de verificación (2026-08-24, antes del borrado)

Los tres digests coincidían — el pin estaba **sano** hasta esta decisión:

```
fichero local nwos ................ a075e2154aa648d44484d7df2bf8d573da044f7154c96464a1c1bd58680c107a
pin numinia-web/design-source.json  a075e2154aa648d44484d7df2bf8d573da044f7154c96464a1c1bd58680c107a
publicado en numinia.org (HTTP 200) a075e2154aa648d44484d7df2bf8d573da044f7154c96464a1c1bd58680c107a
```

La v5.1.0 ya está publicada y responde **HTTP 200** en
`numinia.org/corpus/standards/2026_08_18-sistema_de_diseno-v510.md`.

### Reparación pendiente — orden exacto

1. **`numinia-web`** — actualizar `design-source.json`:
   - `path` → `standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md`
   - `published` → `…/2026_08_18-sistema_de_diseno-v510.md`
   - `version` → `5.1.0`
   - `sha256` → recalcular sobre el publicado
2. **`numinia-web`** — revisar el kit vendorizado (`packages/ui/src/sistema.css`,
   `apps/store/src/scripts/sistema.js`): la v5.1.0 puede haber movido tokens.
   Sus sha256 en el bloque `vendored` también se re-pinean.
3. **Verificar:** `npm run design:check` → debe salir *"✓ In sync"*.
4. **`numinia-nwos`** — las 6 misiones que citan «v5.0.0» en texto: decidir si se
   anotan como históricas o se actualizan. No bloquean.
5. **Marcar esta entrada RESUELTA** con fecha y commit.

**Responsable:** Oráculo · **Estado:** ⬜ ABIERTA

---

## 404-002 · El manual RPG deja de vivir en `canon/`

**Decisión (Oráculo, 2026-08-25).** Los dos ficheros que se disputaban ser «el
manual» se retiran y **no se sustituyen por una copia**: `canon/INDEX.md` apunta a
`numinia-lore`, que es el dueño.

Cita literal de la corrección que fijó el diseño:

> *«Acabamos de borrar un stub de 131 líneas por hacerse pasar por canon. Crear un
> fichero nuevo en canon/, con nombre de manual y un C-00N, fabrica el mismo objeto
> con mejores intenciones. Un puntero no es un documento fundacional.»*

### Qué se retiró

| Fichero | Tamaño | Qué era |
|---|---|---|
| `canon/Numinia-El-juego-de-rol-manual-completo.md` | 131 líneas | **Stub.** Nunca contuvo el manual |
| `canon/Numinia. El juego de rol (manual completo).txt` | 4.667 líneas | Manual real, v0.1.0 (S-008) |

**Fuente de verdad ahora:** `numengames/numinia-lore` →
`seminal/Numinia_Manual_del_juego_de_rol_v0_6_0.md` (v0.6.0, 21.459 líneas).

### Estado de verificación previo al borrado

- `.txt` retirado: `sha256 2f9e58dea73a4629c9c370dc8ab46c440a133fd4e12e267421c548b6a591a0ea`
  — **byte-idéntico** a `numinia-lore/seminal-legacy/…txt`. No se pierde nada.
- **¿Es el `.txt` v0.6.0 el mismo documento que el `.md` de lore?** Sí:
  **98,82 %** de la secuencia de palabras coincide (`difflib` sobre flujo
  continuo, 128.504 de 130.041 palabras). Los 1.469 tokens que solo tiene lore
  son **notas al pie y referencias a figuras del PDF** que la exportación en
  texto plano descarta. **La copia de lore es la más rica.**
- `numinia-lore` es **público** (`visibility: public`, verificado sin
  credenciales) y `seminal/**` declara `LicenseRef-Numen-AllRightsReserved` en su
  `REUSE.toml` — reserva expresa, decisión firmada por el Oráculo 2026-08-17
  (MIS-085 D1). El puntero resuelve para cualquiera y el régimen se conserva.

### Por qué puntero y no copia — con las cifras que lo deciden

Una versión previa de este cambio (descartada sin subir, `72bff4c`) metía el
manual convertido en `canon/`. El build lo publicó y midió el daño:

| Página generada | Peso |
|---|---:|
| `/corpus/canon/c-006-manual-juego-de-rol/` | **890,4 KB** |
| `/corpus/standards/…sistema_de_diseno-v510/` (la mayor hasta entonces) | 336,4 KB |

`web/src/content.config.ts` globea `canon/**/*.md` sin negación: además de la
página, Astro publicaba el **`.md` crudo de 848 KB** — contenido de derechos
reservados servido en abierto. Y era **regresión nueva**, no herencia: el `.txt`
nunca se publicó (el glob es `*.md`) y el stub pesaba 131 líneas.

### Consumidores reparados en esta rama

| Documento | Estado |
|---|---|
| `agents/senet/MEMORY.md:63` | ✅ **directo a lore** (commit propio, el primero) |
| `agents/senet/STATUS.md:43` | ✅ **directo a lore** (ídem) |
| `canon/INDEX.md:57` | ✅ fila S-008 remitida a la sección nueva |
| `canon/README.md:20` | ✅ repuntado |
| `blueprints/BP-archive-fondos.md:31` | ✅ repuntado + descripción corregida |
| `decisions/ADR-005:154` | ✅ marcada resuelta |
| `missions/MIS-089:68` | ✅ D1 corregida con la evidencia |

Senet va **directo**, no a través del índice: la tabla de lectura obligatoria de
un agente resuelve en un salto o no es lectura operativa.

### Roturas fuera del alcance de escritura — ABIERTAS

| Repo | Fichero | Severidad |
|---|---|---|
| `numinia-web` | `DECISIONS.md:111` | 🟠 media |
| `numinia-web` | `docs/onboarding-report.md:23` | 🟠 media |
| `numinia-lore` | `seminal-legacy/README.md:20` | 🟢 baja |

### Reparación pendiente — orden exacto

1. **`numinia-web`** — repuntar `DECISIONS.md:111` y `docs/onboarding-report.md:23`
   a `numinia-lore/seminal/Numinia_Manual_del_juego_de_rol_v0_6_0.md`.
2. **`numinia-lore`** — decidir qué pasa con las tres copias que conviven allí:
   `seminal/…v0_6_0.md` (viva), `seminal/Numinia__El_juego_de_rol__manual_completo_.md`
   y `seminal-legacy/….txt` (ambas v0.1.0). Ninguna declara `derived_from`.
3. **Marcar esta entrada RESUELTA** con fecha y commit.

**Responsable:** Oráculo · **Estado:** ⬜ ABIERTA

---

## Cómo se usa este registro

- Una retirada de fuente **no está terminada** hasta que su entrada aquí está
  RESUELTA. Borrar el fichero es la mitad del trabajo.
- Si una entrada lleva abierta más de una iteración, es deuda real: sube a la
  Fase 2 del plan de unificación (*ambigüedad con consecuencia fuera del repo*).
- El índice de entropía **no ve estas rupturas**: E4 solo mide enlaces markdown
  dentro del corpus, y todo esto son referencias cross-repo por ruta, URL o
  digest. Este fichero es el complemento manual de esa ceguera.
