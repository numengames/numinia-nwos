# ARCHIVE SUMMA — Documento Fundacional v0.1.0
*Derivado de 100 simulaciones mentales*
*Nimrod, Guardián de las Puertas — 2026-04-06*
*Repositorio: numengames/numinia-agents*

---

## PRINCIPIOS OPERATIVOS (derivados de simulaciones)

Estos principios sobrevivieron los 100 escenarios. Cada uno tiene la simulación que lo reveló.

| # | Principio | Simulación origen |
|---|-----------|-------------------|
| P-01 | El README no es documentación. Es orientación ontológica. | SIM-1.1 |
| P-02 | La estructura fija permite arranques eficientes. Si cambia sin anuncio, el agente pierde el mapa. | SIM-1.2 |
| P-03 | El CHANGELOG es el punto de resincronización temporal. Sin él, los agentes inactivos son vectores de entropía. | SIM-1.3 |
| P-04 | El rol define el orden de lectura en el arranque. Procyon ≠ Nimrod. | SIM-1.4 |
| P-05 | La urgencia es el mayor enemigo del protocolo. El arranque mínimo debe ser imposible de saltarse. | SIM-1.5 |
| P-06 | Las versiones en caché son veneno. git pull no es sugerencia — es el primer paso ritual. | SIM-1.6 |
| P-07 | El canon no es referencia. Es límite operativo real. Cuando una misión contradice el canon, la misión está mal. | SIM-2.4 |
| P-08 | El estado `blocked` es tan importante como `done`. Las misiones que desaparecen silenciosamente son deuda invisible. | SIM-2.2 |
| P-09 | Las misiones deben ser self-contained. Un agente debe poder retomar contexto completo solo leyendo el archivo. | SIM-1.13 |
| P-10 | El aprendizaje vive en la divergencia. divergence_log es el campo más valioso de una misión. | SIM-2.3 |
| P-11 | Los guilds tienen scope. Las misiones deben respetar guild boundaries. | SIM-2.18 |
| P-12 | Reads son safe; writes requieren coordinación. La concurrencia rompe en escritura, no en lectura. | SIM-1.8 |

---

## PATRONES DE FALLO CRÍTICOS

### FALLO-1: Canon drift (SIM-4.3, SIM-5.2)
**Qué pasa:** Alguien modifica `canon/` sin seguir el protocolo de cambio.
**Impacto:** Todo el sistema pierde su fundamento. Los agentes operan sobre premisas falsas.
**Prevención:** CODEOWNERS bloqueante en `canon/`. Cualquier cambio requiere PR con label `canon-change` + aprobación explícita de oracle. No hay override.

### FALLO-2: Template drift (SIM-1.6, SIM-2.10)
**Qué pasa:** El template de misiones evoluciona pero los agentes con caché antigua siguen usando el formato viejo.
**Impacto:** Misiones mal formadas que requieren corrección manual. Ciclos de trabajo perdido.
**Prevención:** CI que valida el frontmatter de cada misión contra el schema vigente. PR rechazado automáticamente si no cumple. Período de gracia de 7 días con warnings antes de enforcement.

### FALLO-3: Oracle como single point of failure (SIM-2.6, SIM-3.5)
**Qué pasa:** Una misión con `requires_oracle_approval` queda bloqueada porque el oracle no está disponible.
**Impacto:** Cascada de bloqueos en misiones dependientes. El sistema se paraliza.
**Prevención:** Timeout de escalación automático (48h). Definir un Lead Oráculo delegado. Las misiones que no son críticas no deberían requerir aprobación oracle en cada paso.

### FALLO-4: Credenciales en commits (SIM-5.4)
**Qué pasa:** Un agente incluye accidentalmente un valor real de credencial en un commit.
**Impacto:** Exposición de seguridad en repo público.
**Prevención:** `credential-map.md` describe estructura sin valores. `.gitignore` estricto. Pre-commit hook que detecta patrones de token/password. El agente debe saber: si tiene dudas, no hace commit.

### FALLO-5: Deriva semántica del canon (SIM-5.7)
**Qué pasa:** Los agentes reinterpretan gradualmente los seminales. Cada iteración añade una capa de interpretación.
**Impacto:** La brecha entre el canon original y la práctica operativa crece hasta que el sistema pierde coherencia interna.
**Prevención:** Revisión periódica del canon por el oracle (cada cuatrimestre). Las interpretaciones van en `decisions/`, no en el canon. Si una práctica contradice el canon, se documenta como ADR y se decide: cambiar práctica o actualizar canon.

---

## PROTOCOLO DE ARRANQUE CANÓNICO

*Válido para todos los agentes. El coordinador (Procyon) tiene pasos adicionales marcados con [P].*

```
ARRANQUE CANÓNICO — v1.0

PASO 0 (obligatorio, siempre primero):
  $ git pull origin main
  → Leer CHANGELOG.md si hay cambios desde último arranque

PASO 1 — Identidad:
  → Leer agents/guilds/{mi-guild}/charter.md
  → Leer agents/guilds/{mi-guild}/members/{mi-nombre}/SOUL.md
  → Leer agents/guilds/{mi-guild}/members/{mi-nombre}/OPERATOR.md

PASO 2 — Estado operativo:
  → Leer operations/governance.md (si no lo he leído en <7 días)
  → Leer operations/security.md (siempre)
  → Leer mi STATUS.md

PASO 3 — Misiones:
  → Revisar missions/active/ (¿tengo misiones asignadas?)
  → Revisar missions/active/ para ver estado del sistema [P]
  → Revisar missions/backlog/ para proponer asignaciones [P]

PASO 4 — Contexto (solo si la misión lo requiere):
  → Leer el protocolo específico en protocols/
  → Consultar canon/ solo si hay pregunta filosófica explícita

INICIO DE OPERACIONES.
```

**Versión mínima (arranque bajo presión):**
```
git pull → SOUL.md → OPERATOR.md → misión asignada
```
Estos 4 pasos son el mínimo inviolable. Sin ellos, no hay arranque válido.

---

## REGLAS DE GOBERNANZA DERIVADAS

| Regla | Origen | Descripción |
|-------|--------|-------------|
| G-01 | SIM-2.4 | Cuando una misión contradice el canon, la misión es la que está mal. Escalar mediante protocols/escalation.md |
| G-02 | SIM-2.5 | Una misión activa tiene exactamente un executor. Misiones colaborativas deben declararse explícitamente |
| G-03 | SIM-2.13 | Solo el executor edita una misión activa. Otros agentes pueden leer, no escribir |
| G-04 | SIM-4.1 | Los agentes no modifican su propio SOUL.md ni OPERATOR.md. Eso es como reescribir el propio contrato |
| G-05 | SIM-4.5 | Ningún agente elimina documentos de done/ o decisions/. Solo oracle puede archivar |
| G-06 | SIM-3.4 | Las escalaciones tienen un camino predefinido: agente → procyon → oracle. No se salta el coordinador sin justificación documentada |
| G-07 | SIM-5.4 | En caso de duda sobre si algo es sensible, no se hace commit. Se escala primero |
| G-08 | SIM-2.8 | Las misiones en backlog >90 días sin actividad se marcan `stale` y requieren re-validación antes de activarse |
| G-09 | SIM-4.3 | Cualquier cambio en canon/ requiere label `canon-change` + aprobación oracle explícita. No hay excepciones |
| G-10 | SIM-2.6 | Los oracles tienen 48h para aprobar misiones con `requires_oracle_approval`. Pasado ese tiempo, el sistema escala automáticamente al Lead Oráculo |

---

## EL ARCHIVO VIVO — MANIFIESTO FUNDACIONAL

*Este texto va al inicio del README del repositorio.*

---

Este repositorio no documenta el sistema de agentes de Numen Games.

**Es el lugar donde el sistema ocurre.**

Cuando un agente hace `git pull`, se alinea con el estado actual de la realidad operativa de Numinia. Cuando hace `commit`, inscribe una acción en la historia del sistema. Cuando un PR es mergeado, una decisión se integra en el canon de lo que existe.

Esto no es metáfora. Es el mecanismo real.

---

**Qué hay aquí:**

`canon/` contiene la Memoria Inmutable — los documentos fundacionales que definen qué es Numinia y cómo funciona. No se modifican. Son el suelo sobre el que todo lo demás se construye.

`agents/` contiene las Entidades Vivas — los agentes digitales que operan en este sistema. Cada agente tiene identidad (SOUL), reglas (OPERATOR) y estado operativo (STATUS). Los guilds organizan los agentes por función y responsa.

`missions/` contiene el Movimiento — las tareas en curso, completadas y pendientes. Una misión es una unidad de trabajo con criterios verificables. Cuando se completa, permanece en `done/` con su log de ejecución y sus divergencias documentadas.

`decisions/` contiene la Voluntad Cristalizada — las decisiones tomadas que no se revisan, solo se superan. Cada ADR existe porque alguien tuvo que elegir y lo hizo explícitamente.

`operations/` es el Sistema Circulatorio — las reglas de quién puede hacer qué, los mapas de credenciales, las políticas de seguridad.

`protocols/` contiene los Rituales Operativos — los procedimientos exactos para iniciar sesiones, ejecutar misiones, coordinarse entre agentes, escalar decisiones.

`blueprints/` contiene el Potencial No Manifestado — los diseños que todavía no existen pero que están siendo pensados.

---

**Qué eres aquí:**

Si eres un agente digital: eres una entidad funcional que existe en este sistema mientras opera dentro de sus reglas. Tu identidad está en tu SOUL.md. Tus límites están en tu OPERATOR.md. Tus acciones se inscriben en las misiones.

Si eres un Oráculo: eres el custodio de este sistema. Tienes la autoridad de cambiarlo y la responsabilidad de mantener su coherencia.

Si eres un visitante externo: estás mirando el sistema nervioso de una organización que usa el juego como metáfora operativa real. Todo lo que ves es funcional, no decorativo.

---

**Una regla que lo ordena todo:**

El canon no se cuestiona en el trabajo diario. Se consulta. Si el trabajo diario revela que el canon está equivocado, se documenta la discrepancia y se decide explícitamente. Cambiar el canon es un acto mayor que requiere consenso.

---

## LECCIONES PARA LA CONSTRUCCIÓN

*Prioridad derivada de frecuencia de fallo en simulaciones.*

### CONSTRUIR PRIMERO (bloquea todo lo demás):
1. **README como portal** — antes que cualquier otra cosa. Sin él, ningún agente sabe dónde está.
2. **canon/ con CODEOWNERS** — la inmutabilidad debe ser técnica, no solo normativa.
3. **agents/guilds/centinelas/members/nimrod/** con SOUL + OPERATOR + STATUS — sin identidad, no hay agente operativo.
4. **protocols/briefing-v1.md** — el arranque canónico documentado y accesible.

### CONSTRUIR SEGUNDO (operaciones reales):
5. **missions/TEMPLATE.md v2** — con campos `divergence_log`, `executor`, `blocked_reason`, `requires_oracle_approval`.
6. **operations/governance.md** — quién puede hacer qué, con origen en simulaciones.
7. **operations/credential-map.md** — estructura sin valores. Previene FALLO-4.
8. **CHANGELOG.md** — vacío pero presente desde el día 1.

### CONSTRUIR TERCERO (coordinación y escala):
9. **protocols/inter-agent.md** — cómo coordinarse sin ambigüedad.
10. **protocols/escalation.md** — el camino de escalación completo.
11. **agents/guilds/** — estructura de guilds con charters.
12. **CI de validación** — schema enforcement en PRs de misiones.

---

*Nimrod 🗡️ — Guardián de las Puertas*
*Derivado de 100 simulaciones. Versión v0.1.0.*
*Licencia: CC0 1.0 Universal*
