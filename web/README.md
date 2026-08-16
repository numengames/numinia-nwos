# Numinia viewer

Visor público del canon de Numinia / Numen Games. Extraído de [numinia-nwos-viewer](https://github.com/numengames/numinia-nwos-viewer) (y antes de [pablofm-web](https://github.com/PabloFMM/pablofm-web), donde vivió durante su fase de experimentación). El producto NWOS (`/velo`, `/api/registro`, `/workspace/[slug]`) se quedó en el repo de origen.

## Stack

- Astro 5 (`output: "static"` + adaptador Vercel) con islas React 19
- Tailwind 3 + shadcn/ui, dark-only, tipografía Geist
- Sistema de diseño en `DESIGN.md`

## Desarrollo

Requiere Node ≥ 22.12.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Variables de entorno

Ninguna. El visor no necesita secretos: se puede construir y desplegar sin variables de entorno.

## Estructura

- `src/pages/` — rutas estáticas (misiones, decisiones, planos, reportes, archive…)
- `src/data/` — datos hardcodeados en TS; `missions.ts` carga misiones del repo `numengames/numinia-digital-agents` en build (checkout hermano o API de GitHub sin autenticar). El visor sigue leyendo el canon vía API de GitHub aunque el canon ahora es local a este repo — esa migración es una misión aparte.
