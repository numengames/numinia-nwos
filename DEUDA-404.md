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

## Cómo se usa este registro

- Una retirada de fuente **no está terminada** hasta que su entrada aquí está
  RESUELTA. Borrar el fichero es la mitad del trabajo.
- Si una entrada lleva abierta más de una iteración, es deuda real: sube a la
  Fase 2 del plan de unificación (*ambigüedad con consecuencia fuera del repo*).
- El índice de entropía **no ve estas rupturas**: E4 solo mide enlaces markdown
  dentro del corpus, y todo esto son referencias cross-repo por ruta, URL o
  digest. Este fichero es el complemento manual de esa ceguera.
