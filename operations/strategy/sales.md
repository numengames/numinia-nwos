---
id: "ops-strategy-sales"
title: "Ventas — estrategia comercial"
type: documentation
status: active
version: "1.0.0"
created: "2026-04-07T00:00:00Z"
updated: "2026-08-17T00:00:00Z"
author: "nimrod"
owner: "oracle"
tags: [strategy, sales, commercial]
license: "LicenseRef-Numen-AllRightsReserved"
extraction_note: "Extracted verbatim from web/src/pages/ventas.astro (MIS-071 phase 2 — File over App). Reserved regime: commercial strategy is born closed (C-005 §1; Oracle-delegated decision 2026-08-17)."
---

# Cómo conseguir los primeros clientes

> **Resumen:** Guía operativa para los Oráculos. ICP definido, funnel de ventas, bloqueadores actuales y el plan de piloto de 8 semanas.
> **Audiencia:** Oráculos de Numen Games (guía de ventas del Narrative Work OS — página `/ventas`).

**Diagnóstico honesto (abril 2026):** NWOS tiene coherencia teórica sólida, validación interna de 4 Oráculos y 0 clientes externos. La brecha entre ambos extremos no es de producto — es de secuencia. Primero validación externa, luego ICP, luego producto vendible. Este documento es el mapa para recorrer esa distancia.

---

## Los bloqueadores — Qué impide vender hoy

| ID | Severidad | Bloqueador | Urgencia | Descripción | Acción concreta |
|----|-----------|-----------|----------|-------------|-----------------|
| B1 | 🔴 | No hay prueba externa | 10/10 | Nadie puede comprar lo que no ha visto funcionar fuera de los fundadores. Mientras no exista un caso real, el ciclo de ventas comienza con una pregunta sin respuesta. | Protocolo de exposición ciega: 2 personas externas, 48h, sin contexto previo. Esta semana. |
| B2 | 🔴 | Sin ICP operativo | 9/10 | Sin saber quién firma el cheque, qué métrica justifica la compra y desde qué línea de presupuesto, no hay go-to-market. Solo esperanza. | Apostar por UN perfil: CEO de startup técnica 5–15p. Diseñar todo el mensaje para él. |
| B3 | 🔴 | Sin formato de venta | 9/10 | Si una empresa dice 'lo quiero' mañana, no hay nada que mandar, nada que cobrar, nadie libre para implementarlo. | Definir el producto mínimo vendible: piloto de 8 semanas con precio fijo, entregables y criterio de éxito. |
| B4 | 🟠 | Coste cognitivo de entrada | 7/10 | El vocabulario completo de NWOS en la primera reunión cierra puertas. La barrera de adopción ocurre antes de que el cliente haya sentido valor. | Crear el deck de ventas con 5 conceptos máximo. Numinia es capa 3, no capa 1. |
| B5 | 🟠 | Sin métricas de ROI para el decisor | 7/10 | Un CHRO o CEO no puede aprobar un gasto sin saber qué número mejora. 'Más significado' no es una métrica de negocio. | Definir 3 KPIs pre-piloto que el cliente acuerda medir. Retención, velocidad de decisión, NPS interno. |

---

## ICP — A quién vender · Ranking de perfiles objetivo

Basado en las 100 simulaciones y el análisis de gaps. Puntuación combinada: tasa de adopción + velocidad de valor + accesibilidad del decisor.

| # | Perfil | Score | Adopción | Tiempo a valor | Decisor | Presupuesto | Veredicto |
|---|--------|-------|----------|----------------|---------|-------------|-----------|
| 1 | Startup técnica 5–15p | 92 | 85% | 2–4 sem | CEO / CTO | €500–2.000/mes | ICP ideal ahora |
| 2 | Startup mixta 15–50p | 74 | 75% | 4–8 sem | CEO / Head of People | €1.500–5.000/mes | ICP de expansión |
| 3 | Agencia creativa 10–30p | 68 | 75% | 3–6 sem | CEO / Director Creativo | €800–3.000/mes | ICP de oportunidad |
| 4 | PYME tradicional 50–150p | 31 | 35% | 6–12 mes | CHRO / Director General | €3.000–8.000/mes | Evitar ahora |
| 5 | Equipo corporativo 100–500p | 18 | 30% | 9–18 mes | CHRO / VP People | €10.000–40.000/mes | Evitar hasta Serie A |

### Detalle — dolor y señal de compra

| # | Perfil | Dolor | Señal de compra |
|---|--------|-------|-----------------|
| 1 | Startup técnica 5–15p | Cultura de equipo se rompe al pasar de 5 a 10 personas | Busca alternativas a Notion + Linear + reuniones de alineación |
| 2 | Startup mixta 15–50p | Perfiles técnicos y no-técnicos hablan idiomas distintos | Ha probado OKRs y no funcionaron. Busca algo más vivo. |
| 3 | Agencia creativa 10–30p | Cada proyecto nuevo reinicia la cultura desde cero | Menciona 'identidad de empresa' o 'cómo hacemos las cosas aquí' |
| 4 | PYME tradicional 50–150p | Rotación alta, desconexión con los valores de empresa | Ha invertido en formación de liderazgo sin resultados |
| 5 | Equipo corporativo 100–500p | Transformación cultural post-fusión o remote-first | RFP activo, presupuesto anual de cultura aprobado |

*(La página destaca en tarjetas de detalle solo los 3 primeros perfiles del ranking.)*

---

## Mensaje de ventas — Qué decir a cada decisor

### CEO startup técnica

- **Su dolor:** "El equipo crece y la cultura se rompe"
- **Tu mensaje:** NWOS es la infraestructura de cultura que escala con el equipo. No es una herramienta más — es la gramática común que conecta a las personas con lo que construyen.
- **KPI prometido →** Tiempo de onboarding cultural: de 3 meses a 3 semanas

### Head of People startup mixta

- **Su dolor:** "Los OKRs no funcionan y el equipo está desconectado"
- **Tu mensaje:** NWOS reemplaza la motivación por métricas con motivación por propósito. Las misiones tienen contexto. Las decisiones tienen memoria. Las personas saben por qué importa lo que hacen.
- **KPI prometido →** eNPS: objetivo +20 puntos en 6 meses

### Director Creativo agencia

- **Su dolor:** "Cada cliente nuevo reinicia la identidad del equipo"
- **Tu mensaje:** NWOS da identidad permanente al equipo más allá de cada proyecto. El Archive es la memoria institucional que sobrevive a cada entrega.
- **KPI prometido →** Retención de talento creativo senior: objetivo -50% rotación

---

## Funnel de ventas — El embudo objetivo

Proyección conservadora para los primeros 12 meses. Conversión awareness → cliente: ~0.9%.

| Etapa | n | Descripción |
|-------|---|-------------|
| Awareness | 1.000 | Contactos que saben que NWOS existe |
| Interés | 180 | Han leído el one-pager o visitado /nwos |
| Cualificado | 54 | ICP correcto + dolor activo + decisor identificado |
| Piloto | 18 | Acuerdan un piloto de 8 semanas |
| Cliente | 9 | Renuevan tras el piloto |

**Tasas de conversión:** Awareness → Interés: **18%** · Interés → Cualificado: **30%** · Cualificado → Piloto: **33%** · Piloto → Cliente: **50%**

---

## El producto vendible — Piloto de 8 semanas

El formato de entrada. Precio fijo, entregables definidos, criterio de éxito acordado antes de empezar. Sin este formato, no hay nada que vender.

| Semanas | Fase | Tareas |
|---------|------|--------|
| S1–S2 | Diagnóstico | Maslach organizacional · Mapa de roles actuales · 3 KPIs acordados |
| S3–S4 | MVV | 5 conceptos instalados · Primera misión en vivo · Ritual semanal (30 min) |
| S5–S6 | Expansión | Gremio asignado · Primer agente digital · Primera Piedra del Camino |
| S7–S8 | Evaluación | Medición vs. KPIs · Informe de adopción · Decisión de renovación |

### Precios

| Segmento | Precio | Incluye |
|----------|--------|---------|
| Startup (<15p) | €1.500 | piloto 8 semanas · todo incluido |
| Startup (15–50p) — **Recomendado** | €3.500 | piloto 8 semanas · con agente digital |
| Agencia / PYME | €6.000 | piloto 8 semanas · 2 agentes + modo corp. |

---

## Plan de acción — Los próximos 30 días

| Nº | Plazo | Acción | Owner |
|----|-------|--------|-------|
| 01 | Esta semana | Protocolo de exposición ciega: 2 personas externas, 48h sin contexto. Observar sin intervenir. | Pablo + Oráculo libre |
| 02 | Esta semana | Confirmar ICP #1: CEO startup técnica 5–15p. Listar 10 contactos concretos que encajan. | Dark Council |
| 03 | Semana 2 | Crear el deck de ventas con máximo 5 conceptos. Sin Numinia en capa 1. | Alquimista-01 |
| 04 | Semana 2 | Definir los 3 KPIs del piloto que el cliente va a medir. Sin esto no hay criterio de éxito. | Dark Council |
| 05 | Semana 3 | Primera conversación exploratoria con 3 contactos del ICP #1. No es una demo — es escucha. | Pablo |
| 06 | Semana 4 | Si hay señal positiva: propuesta de piloto formalizada. Precio, entregables, criterio. Firma. | Pablo + Oráculo legal |

---

## Cierre

**El único número que importa ahora mismo:** 1. Un cliente externo real que haya pasado el piloto de 8 semanas y renovado. Ese caso convierte todo lo demás — el one-pager, el deck, las simulaciones, el análisis de gaps — de teoría en evidencia. Con evidencia, el ciclo de ventas se divide por tres.

La secuencia es: validación ciega → ICP confirmado → piloto vendido → caso documentado → escala. No hay atajo.

---

*Metadatos de la página original (`ventas.astro`): título HTML «NWOS — Estrategia de Ventas — Pablo FM» · descripción «Guía de ventas del Narrative Work OS para los Oráculos de Numen Games. ICP, funnel, bloqueadores y plan de piloto.» · ruta canónica `/ventas` · label del hero «NWOS — Ventas».*
