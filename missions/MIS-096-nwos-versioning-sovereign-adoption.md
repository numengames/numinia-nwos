---
id: "MIS-096"
title: "NWOS se versiona y las organizaciones adoptan: soberanía con actualizaciones ofrecidas"
type: mission
status: draft
version: "1.0.0"
created: "2026-08-18"
updated: "2026-08-18"
author: "claude-fable-5"
owner: "oracle"
tags: [nwos, governance, versioning, sovereignty, propagation]
license: "CC-BY-4.0"
mission_id: "MIS-096"
area: "NWOS core / gobernanza"
guild: "Procurators"
type_execution: "digital"
priority: "high"
effort: "L"
requested_by: "oracle"
assigned_to: "numinia-nwos"
requires_oracle_approval: true
depends_on: ["MIS-068"]
---
# MIS-096 — NWOS se versiona y las organizaciones adoptan

> **Resumen:** Hoy el NWOS original no tiene versión y su propagación se
> apoya en la relación de fork: quien genera su workspace «recibe» el
> documento y se espera que sincronice. Eso niega la soberanía del repo
> derivado (G-12, CON-006). Esta misión versiona el NWOS original y define
> el modelo de adopción: publicamos versiones, la organización decide.
> **Epistémico:** Cuál es la unidad de versión de NWOS y qué significa
> «estar en la v.X» para una organización soberana.
> **Pragmático:** Una organización puede saber en qué versión está, qué
> hay de nuevo y decidir si sube — sin que nadie le empuje nada.
> **Audiencia:** Oráculo · Agentes de todos los repos NWOS

---

**Area:** NWOS core / gobernanza · **Guild:** Procurators
**Type:** digital · **Priority:** high · **Effort:** L

---

## Story

Como organización que ha creado su repositorio NWOS, quiero saber en qué
versión del NWOS original estoy y qué trae la siguiente, para decidir yo
si me actualizo — sin que ninguna ley entre en mi repo por herencia.

---

## El error que la origina (verificado 2026-08-18)

`standards/engineering-standards.md` declara en su cabecera y en §7.1 que
numinia-nwos y «any workspace generated from the mould» son *downstream
forks* que **reciben el documento por la relación de fork**, dejando el
mecanismo de sync como decisión abierta. De ahí se sigue, sin decirlo, que
lo escrito upstream obliga abajo. Dos problemas:

1. **Soberanía** (G-12): una organización con su repo NWOS no recibe ley
   por linaje. Se le **ofrece** una versión.
2. **Procedencia** (CON-003, abierta): el documento afirma que
   numinia-nwos es fork del molde cuando numinia-nwos **es la fuente**.

La doctrina correcta ya estaba escrita para otro artefacto —**G-11**, el
canon se fija, no se copia (Sistema de Diseño, MIS-094)— y no se había
aplicado a los estándares mismos.

## Preguntas que esta misión debe responder

1. **¿Cuál es la unidad versionada?** ¿El molde entero
   (`nwos-workspace-template`), el documento de estándares, o un
   «NWOS core» declarado (protocolos + estándares + plantillas)?
   *Recomendación:* un **NWOS core** explícito con su manifiesto — es lo
   que una organización adopta, y evita versionar prosa suelta.
2. **¿Dónde vive el número?** Semver en un `nwos.json` del core, publicado
   con digest (patrón del kit de diseño, MIS-094).
3. **¿Cómo declara una organización su versión?** Un fichero de fijación
   en su repo (`nwos-source.json`, análogo a `design-source.json` de
   numinia-web) con versión + digest + fecha de adopción.
4. **¿Qué hace la herramienta cuando hay versión nueva?** Avisa y muestra
   el diff/changelog. **Nunca** falla el build ajeno por no estar al día
   (G-12); el guard de deriva de MIS-068 se reformula: detecta y reporta,
   no obliga.
5. **¿Y las divergencias deliberadas?** Una organización puede quedarse
   atrás o apartarse: eso se **declara**, no se corrige. Formato de esa
   declaración, por definir.

## Acceptance criteria

- [ ] «NWOS core» definido: qué artefactos lo componen, listados desde la
      realidad del repo, no de memoria.
- [ ] Versión semver + manifiesto con digest publicados en una URL estable.
- [ ] Formato de fijación (`nwos-source.json`) especificado y aplicado en
      al menos un repo consumidor real como prueba.
- [ ] Changelog del core en lenguaje de adopción: qué cambia, qué obliga
      (dentro de esa versión) y qué se puede ignorar.
- [ ] MIS-068 reformulada a la luz de G-12: el guard **reporta** deriva,
      no la prohíbe; se retira la premisa «consumer repos never drift».
- [ ] ADR upstream que corrija §7.1 (autoridad por fork → adopción por
      versión) y la procedencia de CON-003.
- [ ] `GOVERNANCE.md` G-12 referenciado desde el CLAUDE.md del molde.

---

## Epistemic value

Separa dos cosas que el sistema mezclaba: **de dónde viene un documento**
(linaje) y **quién manda en un repo** (soberanía). El linaje explica; no
obliga.

## Pragmatic value

Una organización puede adoptar NWOS sin miedo a que su repo cambie por
decisiones ajenas, y nosotros podemos publicar mejoras sin negociar con
cada una.

---

## Execution log

*(Fill when completing the mission)*

---

## Execution Reality

*(Fill when closing the mission — the real plans vs the ideal plans)*

- **Technology/approach used:** (vs what was planned)
- **Why it diverged:** (what challenge modified the path)
- **Key learning:** (the knowledge that lives in that gap)
- **Closing date:** YYYY-MM-DD
- **Executing agent:** (name / agent-id)

> *"The ideal plans show the intention. The real plans show the knowledge."*
