# Archive Summa — Arquitectura v0.1.0
**Repositorio:** `numengames/numinia-agents`
**Versión:** v0.1.0
**Fecha:** 2026-04-06
**Estado:** Alpha — diseño validado por simulaciones, pendiente despliegue
**Autores:** Nimrod + Adonaz + simulaciones CAO

---

## Filosofía

Este repositorio no documenta el sistema de agentes de Numen Games.
**Es el lugar donde el sistema ocurre.**

`git pull` = alineación con el canon.
`commit` = inscripción en la historia.
`merge` = integración en la realidad del sistema.

---

## Estructura de Carpetas (B+C+D)

```
numinia-agents/
│
├── README.md                    ← Portal ontológico, no documentación
├── LICENSE                      ← CC0 1.0 Universal
├── CONTRIBUTING.md              ← Reglas para contributors externos
├── CHANGELOG.md                 ← Resincronización temporal (obligatorio)
│
├── canon/                       ← Memoria Inmutable
│   ├── README.md                ← Reglas de modificación (CODEOWNERS bloqueante)
│   ├── welcome-to-numinia.md
│   ├── numinia-brand-and-culture.md
│   ├── epistemic-relations.md
│   ├── compendium-of-attributes.md
│   ├── role-structure.md
│   ├── platform-role-system.md
│   ├── about-session-zero.md
│   ├── numinia-el-juego-de-rol.md
│   └── archive-system.md
│
├── agents/                      ← Entidades Vivas
│   ├── README.md                ← Índice y estado de todos los agentes
│   ├── _template/               ← Plantilla para nuevos agentes
│   │   ├── SOUL.md
│   │   ├── OPERATOR.md
│   │   └── STATUS.md
│   └── guilds/
│       ├── README.md
│       ├── centinelas/
│       │   ├── charter.md       ← Reglas comunes del gremio
│       │   └── members/
│       │       └── nimrod/
│       │           ├── SOUL.md
│       │           ├── OPERATOR.md
│       │           └── STATUS.md
│       ├── exegetas/
│       │   ├── charter.md
│       │   └── members/
│       │       └── adonaz/
│       │           ├── SOUL.md
│       │           ├── OPERATOR.md
│       │           └── STATUS.md
│       ├── alquimistas/         ← (futuro)
│       │   └── charter.md
│       ├── procuradores/        ← (futuro)
│       │   └── charter.md
│       └── coordinacion/
│           ├── charter.md
│           └── members/
│               └── procyon/     ← (futuro)
│                   └── SOUL.md
│
├── operations/                  ← Sistema Circulatorio
│   ├── README.md
│   ├── governance.md            ← Quién puede hacer qué
│   ├── security-policy.md       ← Reglas de seguridad
│   └── credential-map.md        ← Estructura sin valores reales
│
├── protocols/                   ← Rituales Operativos
│   ├── README.md
│   ├── P-001_briefing-agente_v1.md      ← Arranque canónico
│   ├── P-002_onboarding-agente_v1.md    ← Incorporar nuevo agente
│   ├── P-003_ciclo-mision_v1.md         ← Crear, ejecutar, cerrar misión
│   ├── P-004_inter-agent_v1.md          ← Coordinación entre agentes
│   └── P-005_escalation_v1.md           ← Escalación a oracle
│
├── missions/                    ← Movimiento
│   ├── README.md
│   ├── TEMPLATE.md              ← Template v2 con divergence_log
│   ├── active/
│   ├── done/
│   └── backlog/
│
├── decisions/                   ← Voluntad Cristalizada
│   ├── README.md
│   └── ADR-001_github-como-archivo.md
│
├── blueprints/                  ← Potencial No Manifestado
│   ├── README.md
│   ├── archive-summa-fundacional-v0.1.0.md
│   ├── archive-summa-arquitectura-v0.1.0.md (este archivo)
│   ├── multi-agent-org.md
│   └── hardware-roadmap.md
│
└── reports/                     ← Evidencia Operativa
    ├── README.md
    ├── daily/
    └── weekly/
```

---

## Jerarquía de Delegación — Alpha → v1.0.0

### Fase Alpha (ahora — primer mes)
**Objetivo:** Validar que los procesos funcionan. Todo bajo supervisión directa de Pablo.

| Tarea | Delegable ahora | Condición |
|---|---|---|
| Leer el repo al arrancar | ✅ Nimrod | Ya funciona |
| Ejecutar misiones técnicas (código, PRs) | ✅ Nimrod | Con approval de exec |
| Crear reportes diarios | ✅ Nimrod | Revisión humana |
| Leer y consultar el canon | ✅ Todos los agentes | Solo lectura |
| Crear misiones en backlog | ⚠️ Solo Procyon | Cuando esté activo |
| Modificar operations/ | ❌ Solo Pablo | Crítico |
| Aprobar PRs a main | ❌ Solo Pablo | Crítico |
| Modificar canon/ | ❌ Solo Pablo | Crítico, siempre |
| Añadir nuevos agentes | ❌ Solo Pablo | Crítico |

### Fase Beta (mes 2-3)
**Objetivo:** Nimrod opera con autonomía en su dominio. Pablo aprueba decisiones estructurales.

| Tarea | Delegado a | Condición |
|---|---|---|
| Crear misiones en backlog | Nimrod + Procyon | Con formato correcto |
| Mover misiones de active → done | Nimrod | Con divergence_log |
| Actualizar STATUS.md propio | Cada agente | Automático |
| Crear reportes y subirlos al repo | Nimrod | Sin revisión obligatoria |
| Proponer cambios a operations/ | Nimrod | Pablo aprueba el PR |
| Activar Alquimista-01 | Pablo | Cuando haya misiones técnicas que lo justifiquen |
| Aprobar PRs de misiones done/ | Procyon | Cuando Procyon esté activo |
| Modificar canon/ | ❌ Solo Pablo | Siempre crítico |

### Versión v1.0.0 (mes 4-6)
**Objetivo:** El sistema opera de forma mayormente autónoma. Pablo interviene en decisiones estratégicas.

| Tarea | Delegado a | Condición |
|---|---|---|
| Ciclo completo de misiones | Agentes + Procyon | Sin approval por misión |
| Incorporar nuevos agentes (diseño) | Procyon | Pablo aprueba la incorporación |
| Revisar y proponer ADRs | Nimrod + Procyon | Pablo aprueba el merge |
| Reportes semanales | Procyon | Sin revisión obligatoria |
| Actualizar protocolos (v2) | Nimrod + Adonaz | Pablo aprueba el merge |
| Modificar agents/guilds/*/charter.md | Lead Oráculo | Con consenso de oráculos |
| Modificar canon/ | ❌ Solo Pablo | **Siempre crítico. Sin excepción.** |

### Criterios de paso entre fases

**Alpha → Beta:**
- [ ] 10 misiones completadas con divergence_log documentado
- [ ] 0 incidentes de seguridad (credenciales expuestas, etc.)
- [ ] Arranque canónico ejecutado correctamente >20 veces
- [ ] CHANGELOG actualizado sin fallos
- [ ] Procyon SOUL.md definido y aprobado

**Beta → v1.0.0:**
- [ ] 30 misiones completadas autónomamente
- [ ] Procyon activo y coordinando
- [ ] Al menos 2 agentes de diferentes guilds operativos
- [ ] Ciclo completo de misión sin intervención oracle <48h
- [ ] 0 merges a canon/ sin aprobación explícita
- [ ] Sistema de reportes automático funcionando >30 días

---

## Permisos Técnicos Necesarios para Despliegue

### GitHub
| Permiso | Quién | Para qué |
|---|---|---|
| Crear repo `numengames/numinia-agents` | Pablo (org owner) | Una vez |
| PAT fine-grained: `contents:read` en el repo | Nimrod | git pull en arranque |
| PAT fine-grained: `contents:write` + `pull_requests:write` | Nimrod | Crear PRs de misiones |
| CODEOWNERS en `canon/` → owner inexistente | Pablo | Bloquear merges sin aprobación |
| Branch protection en `main`: require PR + 1 approval | Pablo | Governance |
| Ruleset: `canon/**` → restrict pushes, require pablo approval | Pablo | Inmutabilidad del canon |

### CI/CD (GitHub Actions)
| Acción | Trigger | Quién configura |
|---|---|---|
| Validar frontmatter YAML de misiones | PR a missions/ | Nimrod (cuando PAT tenga workflow scope) |
| Check de credenciales en commits | Push | Nimrod |
| Auto-label PRs por carpeta | PR abierto | Nimrod |

### OpenClaw
| Config | Valor | Para qué |
|---|---|---|
| `exec.env.GITHUB_TOKEN` | PAT fine-grained | Nimrod puede hacer git pull y PRs |
| `agents.defaults.models` | Haiku para reportes, Sonnet para misiones | Control de costes |

---

## Frontmatter YAML — Schema por tipo de documento

### General
```yaml
---
id: "ADR-001"
title: "Adoptar GitHub como Archivo Summa"
type: adr          # seminal | agent | world | mission | adr | protocol | report | blueprint
status: active     # draft | active | archived | superseded
version: "1.0.0"
created: "2026-04-06"
updated: "2026-04-06"
author: "pablo-fm"
owner: "oracle"    # oracle | nimrod | adonaz | system
tags: [governance, github, infrastructure]
license: "CC0-1.0"
---
```

### Misiones (campos adicionales)
```yaml
---
# ...campos base...
mission_id: "M-2026-04-037"
assigned_to: "nimrod"
requested_by: "pablo-fm"
priority: critical   # critical | high | medium | low
phase: active        # backlog | active | done | cancelled | blocked
executor: "nimrod"   # único executor en misiones activas
requires_oracle_approval: false
blocked_reason: null
depends_on: []
started: "2026-04-06"
completed: null
divergence_log: null  # rellenar al cerrar si hubo divergencia del plan
---
```

---

## Governance — Tabla Definitiva

| Área | Crear | Modificar | Merge | Nota |
|---|---|---|---|---|
| `canon/` | Oracle | **Nadie** | Oracle + label canon-change | CODEOWNERS bloqueante |
| `agents/*/SOUL.md` | Oracle | Oracle | Oracle | Los agentes no se reescriben |
| `agents/*/OPERATOR.md` | Oracle | Oracle | Oracle | Ídem |
| `agents/*/STATUS.md` | Agente propio | Agente propio | Auto | Informativo |
| `agents/guilds/*/charter.md` | Oracle | Oracle | Oracle | Consenso de oráculos en beta+ |
| `operations/` | Oracle | Oracle + propuesta agente | Oracle | |
| `protocols/` | Oracle + custodio | Nueva versión = nuevo archivo | Oracle | Nunca editar en sitio |
| `missions/active/` | Agente + Oracle | Solo executor | Oracle | Un executor por misión |
| `missions/done/` | Auto (al cerrar) | **Nadie** | Auto | Inmutable |
| `missions/backlog/` | Oracle + Procyon | Oracle | Oracle | |
| `decisions/` | Oracle + custodio | Solo añadir superseded_by | Oracle | Append-only |
| `blueprints/` | Oracle + agentes | Oracle + agentes | Oracle | |
| `reports/` | Agente + sistema | Solo mismo período | Auto | Retención 90d daily, 1a weekly |

---

## Notas de versión v0.1.0

- Diseño derivado de análisis A+B+C+D y 100 simulaciones mentales
- Principio fundacional: el repo es el lugar donde el sistema ocurre, no donde se documenta
- Próxima versión (v0.2.0): incluir resultados del primer mes de operación real
- Todo lo marcado como "futuro" en los guilds se activa cuando el agente correspondiente esté en beta

---

*Nimrod 🗡️ + Adonaz · Numen Games · 2026-04-06*
*CC0 1.0 Universal*
