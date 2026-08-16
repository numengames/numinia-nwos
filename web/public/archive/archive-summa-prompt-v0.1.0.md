# Prompt — Archive Summa para análisis con otras IAs
**Versión:** v0.1.0 · 2026-04-06
**Uso:** Pegar en cualquier IA para obtener análisis, críticas o mejoras

---

## PROMPT COMPLETO

```
Estoy diseñando el repositorio GitHub que será la fuente de verdad canónica del sistema de agentes digitales de Numen Games — una empresa que construye Numinia, un sistema operativo organizacional con lore narrativo, roles por gremios y agentes digitales de IA.

CONTEXTO DE LA EMPRESA:
- Numen Games opera con un sistema híbrido: 4 Oráculos humanos + agentes digitales de IA
- Los agentes ejecutan "misiones" (tareas con criterios de aceptación verificables)
- El sistema tiene 4 gremios: Centinelas, Exegetas, Alquimistas, Procuradores
- Hay un coordinador supremo (Procyon, futuro) que coordina todos los agentes
- Actualmente en fase Alpha — procesos validados pero bajo supervisión humana total

FILOSOFÍA DEL REPO:
"Este repositorio no documenta el sistema. Es el lugar donde el sistema ocurre."
- git pull = alineación con el canon
- commit = inscripción en la historia
- merge = integración en la realidad del sistema

ESTRUCTURA ACTUAL DISEÑADA (v0.1.0):

numinia-agents/
├── README.md               ← Portal ontológico (no documentación)
├── LICENSE (CC0)
├── CONTRIBUTING.md
├── CHANGELOG.md            ← Resincronización temporal para agentes
├── canon/                  ← Memoria Inmutable (9 documentos, CODEOWNERS bloqueante)
├── agents/
│   └── guilds/
│       ├── centinelas/charter.md + members/nimrod/{SOUL,OPERATOR,STATUS}.md
│       ├── exegetas/charter.md + members/adonaz/{SOUL,OPERATOR,STATUS}.md
│       ├── alquimistas/charter.md (futuro)
│       └── coordinacion/charter.md + members/procyon/ (futuro)
├── operations/             ← governance.md, security.md, credential-map.md
├── protocols/              ← briefing, onboarding, ciclo-misión, inter-agent, escalation
├── missions/               ← active/, done/, backlog/ + TEMPLATE.md
├── decisions/              ← ADRs (append-only)
├── blueprints/             ← diseños y arquitecturas
└── reports/                ← daily/, weekly/

FRONTMATTER YAML en cada .md:
- id, title, type, status, version, created, updated, author, owner, tags, license
- Misiones añaden: mission_id, executor, phase, divergence_log, requires_oracle_approval

GOVERNANCE:
- canon/ → inmutable, solo oracle con label canon-change
- agents/*/SOUL.md → solo oracle (los agentes no se reescriben)
- missions/active/ → crea oracle/procyon, edita solo el executor
- missions/done/ → inmutable una vez cerrada
- decisions/ → append-only, nunca eliminar

JERARQUÍA DE DELEGACIÓN:
- Alpha: todo con supervisión oracle
- Beta: agentes operan su dominio, oracle aprueba estructural
- v1.0.0: sistema autónomo, oracle interviene en estratégico
- canon/ → oracle, siempre, sin excepción

PERMISOS TÉCNICOS NECESARIOS:
- PAT GitHub fine-grained: contents:read (git pull) + contents:write + pull_requests:write (PRs)
- CODEOWNERS en canon/ apuntando a owner inexistente (bloqueo físico)
- Branch protection en main: require PR + 1 oracle approval
- GitHub Actions: validar frontmatter YAML en PRs, detectar credenciales en commits

FASES:
- Alpha → Beta: 10 misiones completadas, 0 incidentes seguridad, 20 arranques canónicos exitosos
- Beta → v1.0.0: 30 misiones autónomas, Procyon activo, ciclo completo <48h sin oracle

HALLAZGOS DE SIMULACIONES (100 escenarios):
Los 5 fallos más frecuentes encontrados:
1. Urgencia rompe protocolos → arranque mínimo de 4 pasos inviolables
2. Oracle como single point of failure → timeout 48h + Lead Oráculo delegado
3. divergence_log ausente → campo obligatorio en template de misiones
4. CHANGELOG no actualizado → agentes inactivos se convierten en entropía activa
5. canon protegido solo por norma (no por técnica) → CODEOWNERS bloqueante obligatorio

PREGUNTAS PARA TI:
1. ¿Qué fallos críticos ves en esta arquitectura que las simulaciones no capturaron?
2. ¿La separación canon/operations/protocols es la correcta o hay superposición problemática?
3. ¿Cómo escala esta estructura cuando hay 50+ agentes y 500+ misiones?
4. ¿Qué mecanismo de coordinación inter-agente propones para cuando dos agentes necesitan el mismo recurso?
5. ¿Hay algún patrón de repositorios similares (knowledge bases para IA, org wikis, multi-agent systems) del que podamos aprender?
6. ¿Qué falta en el frontmatter YAML que necesitaremos cuando escalemos?
7. ¿La licencia CC0 es la correcta para un sistema así, o CC BY-SA 4.0 protege mejor la identidad de Numen Games?

CONTEXTO ADICIONAL:
- Los agentes son LLMs (actualmente Claude Sonnet/Haiku de Anthropic)
- El sistema opera sobre OpenClaw (framework de agentes) sobre Telegram como canal
- El servidor es un VPS Ubuntu con Caddy, pronto migraremos a un PC on-premises con RTX 4080
- Presupuesto actual: ~$3-5/día en tokens. Objetivo: reducir con modelos locales (Ollama)
- Construimos en público — el repo será público desde el primer día

Proporciona tu análisis estructurado con: críticas, lo que está bien, lo que cambiarías y por qué.
```

---

## Instrucciones de uso

1. **Pegar el prompt completo** en la IA que quieras consultar
2. Si la IA pide más contexto, puedes adjuntar también `archive-summa-fundacional-v0.1.0.md`
3. Las respuestas interesantes se documentan como ADR o modifican este documento en v0.2.0
4. El objetivo es llegar a la reunión de construcción con el diseño validado por múltiples perspectivas

---

*Nimrod 🗡️ · Numen Games · 2026-04-06*
