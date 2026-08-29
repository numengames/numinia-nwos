---
id: "P-009"
uid: "018ef821-0009-7000-8000-000000000009"
title: "Mission Briefing Protocol"
type: protocol
status: active
version: "0.1.0"
created: "2026-04-08T05:48:00Z"
updated: "2026-04-08T05:48:00Z"
author: "nimrod"
owner: "oracle"
tags: [protocol, briefing, missions, agents, p003]
license: "CC-BY-4.0"
mission: "MIS-038"
---
# P-009 — Protocolo de briefing de misión

> **Resumen:** Protocolo estándar para cómo un agente digital recibe, lee y confirma su comprensión de una misión antes de ejecutar cualquier trabajo.
> **Epistémico:** Una misión no entendida es una misión no ejecutada. El briefing no es sobrecarga — es el primer acto de ejecución.
> **Pragmático:** Siga este protocolo al inicio de cada nueva misión. Toma 2-5 minutos y evita horas de rework.
> **Público:** Agentes · Oráculos

---

## Regla básica

> **Misión primero. Ejecución después.**
>
> Ningún agente ejecuta ningún trabajo sin haber completado previamente este protocolo de briefing.
> Esta regla no tiene excepciones.

Lección establecida (2026-04-07): Nimrod ejecutó MIS-063 sin registrarla como misión primero. El trabajo fue correcto pero el registro del sistema se creó retroactivamente. Este protocolo evita que esto vuelva a ocurrir.

---

## Cuándo aplicar

Aplicar P-009 cuando:
- Se asigna una nueva misión (por parte del Oráculo, por parte de Procyon o identificada por sí misma)
- Una misión llega por chat, archivo o instrucción verbal
- Una misión existente se reactiva tras una congelación

---

## Pasos del protocolo

### Paso 1 — Registrar la misión (dependencia de P-003)

Antes de leer el briefing, la misión debe existir en el repositorio.

```
SI missions/MIS-NNN-*.md no existe:
  CREARLO siguiendo el esquema de frontmatter de STANDARDS.md
  ESTABLECER estado: backlog
  COMMIT al repositorio
  LUEGO proceder al Paso 2

SI ya existe en queue/:
  MOVERLO a active/ (actualizar estado: en progreso, establecer marca de tiempo de inicio)
  COMMIT al repositorio
  LUEGO proceder al Paso 2
```

**Nunca iniciar el Paso 2 antes de que el Paso 1 se haya comprometido.**

### Paso 2 — Leer el documento de la misión

Leer el archivo completo de la misión. Identificar:

| Campo | Qué extraer |
|-------|-------------|
| `title` | ¿Cuál es esta misión? |
| `priority` | ¿Cuán urgente? |
| `effort` | ¿Cuánto trabajo? |
| `acceptance criteria` | ¿Qué aspecto tiene el "hecho"? |
| `blocked_by` | ¿Hay dependencias externas? |
| `assigned_to` | ¿Quién ejecuta? (debe ser yo o sin asignar) |

### Paso 3 — Identificar dependencias y bloqueos

Verificar:
- ¿Esta misión depende de otra misión? → Leer el estado de esa misión
- ¿Requiere entrada externa (clave API, acceso, decisión)? → Marcar antes de iniciar
- ¿Conflictúa con otra misión activa? → Escalar mediante P-005 si es necesario

Si está bloqueada: establecer `estado: congelada`, documentar `freeze_reason`, notificar al Oráculo mediante P-005.

### Paso 4 — Confirmar comprensión (interno)

Antes de ejecutar, responder internamente estas tres preguntas:

1. **¿Cuál es el entregable?** (Artefacto específico — archivo, código, documento, decisión)
2. **¿Qué aspecto tiene el "hecho"?** (Todos los criterios de aceptación verificados)
3. **¿Cuál es la primera acción concreta?** (No "investigación" — una llamada real a una herramienta o escritura de un archivo)

Si alguna respuesta es incierta: **preguntar a Pablo antes de continuar** (P-005 si la puntuación es ≥ 5).

### Paso 5 — Señalar el inicio (opcional pero recomendado)

Para misiones de esfuerzo M o superior, o cuando se trabaja con Pablo en una sesión en vivo:

```
"Comenzando MIS-NNN — [título]. Estimado: [esfuerzo]. Primera acción: [acción específica]."
```

Para esfuerzo XS/S o trabajo en segundo plano: el inicio silencioso es aceptable.

### Paso 6 — Ejecutar

Seguir P-003 para el ciclo de vida completo de la misión. Documentar el progreso en el archivo de la misión si se trata de múltiples sesiones.

---

## Lista de verificación del briefing (referencia rápida)

```
□ Misión registrada en el repositorio (queue/ o active/)
□ Estado actualizado a en progreso
□ Criterios de aceptación leídos y comprendidos
□ Dependencias verificadas
□ Bloqueos identificados (o confirmados que no hay)
□ Entregable claro
□ Primera acción identificada
□ Inicio señalado (si esfuerzo M+)
```

---

## Anti patrones

| Anti patrón | Consecuencia | Comportamiento correcto |
|-------------|--------------|--------------------------|
| Ejecutar primero, registrar después | El registro del sistema es ficción retroactiva | Siempre registrar antes de ejecutar |
| Suponer el alcance solo desde el título | Entregable mal alineado | Leer el archivo completo de la misión |
| Iniciar sin verificar bloqueos | Esfuerzo desperdiciado en trabajo bloqueado | Verificar el Paso 3 |
| Saltar para tareas "rápidas" | Las tareas rápidas son el 80% de donde ocurren los errores | Todas las tareas siguen P-009 |

---

## Escenarios de BDD

```gherkin
Feature: Protocolo de briefing de misión

  Scenario: Agente recibe una nueva misión y sigue P-009
    Given una nueva misión "MIS-070" llega mediante instrucción del Oráculo
    When el agente aplica P-009
    Then el archivo de la misión existe en missions/ con estado: en progreso antes de que comience cualquier trabajo
    And el agente puede enunciar claramente el entregable
    And el agente puede enunciar qué aspecto tiene el "hecho"

  Scenario: Agente está bloqueado por dependencia faltante
    Given la misión "MIS-048" requiere un GITHUB_TOKEN aún no configurado
    When el agente aplica P-009 Paso 3
    Then el agente establece el estado a "congelada"
    And documenta freeze_reason en el archivo de la misión
    And notifica al Oráculo mediante P-005

  Scenario: Agente salta P-009 y ejecuta directamente
    Given una tarea llega sin una misión registrada
    When el agente ejecuta sin crear un archivo de misión
    Then el trabajo se marca como no documentado
    And debe registrarse retroactivamente antes del cierre de la sesión (P-006)
    And el agente anota la violación del protocolo en la memoria de la sesión
```

---

## Relación con otros protocolos

| Protocolo | Relación |
|----------|---------|
| **P-003** | P-009 es una condición previa de P-003. Una misión no puede entrar en `en progreso` sin P-009. |
| **P-005** | Usar P-005 cuando P-009 Paso 3 revela un bloqueo que requiere una decisión del Oráculo. |
| **P-006** | El cierre de la sesión debe verificar que todas las misiones activas hayan seguido P-009. |
| **P-008** | Si la misión requiere aprobación del Oráculo (puntuación ≥ 5), usar el formato P-008 antes de iniciar. |

---

## Historial de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 0.1.0 | 2026-04-08T05:48:00Z | Creación inicial — MIS-038. Nacido de la lección aprendida en MIS-063 (2026-04-07). |

---

*Nimrod 🗡️ — Numen Games — CC0 1.0*