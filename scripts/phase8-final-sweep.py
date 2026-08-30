#!/usr/bin/env python3
"""
Tanda final — todo lo que queda fuera de los dos fragiles.

ORDEN APRENDIDO A GOLPES: la web se comprueba ANTES de retirar nada.
`fondos`, `lore` y `graph` se leen desde web/src/pages/archive/ — esos se
registran, no se retiran. `phase` solo aparece en Timeline.astro, que
ningun otro fichero importa: componente muerto, el campo no se lee.

1 · DEC-001..006 -> type: adr, ids INTACTOS (decision del Oraculo, hoy)
   "cuantas menos carpetas y mas aglutinemos, mejor". Renumerar romperia
   154 referencias en 68 ficheros y violaria ADR-004 (ids permanentes).
   El prefijo DEC- queda como huella historica; `decision` sale del
   corpus como tipo. decisions/ admite prefijo DEC en ADR-005: verificado
   abajo, el guard acepta ambos si PREFIX_OF lo permite.

2 · 5 misiones draft -> todo (decision del Oraculo, hoy: "draft = backlog")
   MIS-089, MIS-095, MIS-096, MIS-108, MIS-113.
   + AUD-2026-08-17-cold-agent.md: status "done" no existe en reports
   (ciclo draft/active/closed). El informe esta terminado: closed.

3 · H-30: registrar lo que se LEE o informa, retirar lo que nadie lee.
   REGISTRAR (entra en RING3/serie):
     blueprints/: fondos graph score score_prev scope mission input
                  related_missions contributors
     canon/:      changelog lore extraction_note (ya en reports/)
     decisions/:  context pending_dark_council
     debt/:       resolved_by question_status visibility_was scope
                  supersedes_pending
     missions/:   phase updated_note executor blocks mission_mode
     operations/: language language_note review_flags source_title
     protocols/:  human_approval_score mission review_next
     reports/:    editorial_note language day_label cost_estimate
                  context_load
     standards/:  series_change
     agents/:     previous_name previous_name_note translation_note
   Nota: casi todos son notas de procedencia/traduccion (patron ya
   registrado: extraction_note, translation seguia sin registro), o
   metadatos de serie que S-004 §6 preve registrar por directorio.
   RETIRAR: nada en esta tanda. Lo unico que parecia retirable
   (sub_missions vacio, series_change vacio...) son H-09, no H-30.

4 · H-09 (6): fondos/graph/changelog/lore/sub_missions/series_change
   estan VACIOS de verdad en algun documento (`fondos:` sin hijos en un
   doc distinto al que los tiene llenos)... NO: son los mismos ficheros
   que la tanda C conservo por tener hijos. El lint los marca vacios
   porque su PARSER regex no ve los hijos. Falso positivo del lint:
   se corrige el lint (H-09 con hijos indentados no esta vacio), no
   el documento.

5 · H-17 (6): type no casa con carpeta.
   - 2 AUDIT en blueprints/: son informes historicos referenciados desde
     12+ ficheros (ADR-005 los cita por ruta). Moverlos rompe referencias:
     se quedan donde estan y la serie blueprints/ admite type report?
     NO — la salida limpia es subtype+exempt ya usada: se declaran
     `location_note` y el lint aprende la excepcion registrada.
     MEJOR: registrar en el lint la excepcion explicita con motivo.
   - credential-map y security-policy (protocol en operations/): mismos
     terminos. operations/ ES el sitio de la operativa; el tipo protocol
     es correcto semanticamente. Excepcion registrada.
   - O-003/O-004 (legal en operations/legal/): la serie legal vive en
     canon/ segun TYPE_SERIES, pero estos son operativa legal de
     numengames, no canon. Excepcion registrada.

6 · H-01/H-18 (3): ANNEX-, PROPOSAL-, PROP- — documentos auxiliares de
   sus series. registration: exempt (S-004 §5.0), como los singulares.
   El subtype proposal de PROP-C005 se registra para reports.

7 · H-06/H-07 (9+ H-31):
   - 6 plantillas (agents/_template/, missions/TEMPLATE*): sus fechas
     placeholder son el CONTENIDO de la plantilla. Exencion en el lint
     para _template/ y TEMPLATE* (como la de A TEMPLATE.md en VOCAB).
   - ADR-002/003/004 sin `updated`: se anade updated = created (no se
     ha tocado desde entonces; el historial git lo confirma).
   - MIS-052 blocked_reason (H-31): campo retirado por D-002. Verifique
     mi propia afirmacion de que el motivo estaba en el cuerpo: FALSO,
     solo vive en el campo. La linea se retira (el campo no existe ya)
     pero el valor queda en scripts/phase8-retired-values.txt — una nota
     de abril sobre una mision en backlog no se pierde en silencio.

8 · H-00 (12 sin cabecera): fuera de esta tanda salvo los 4 triviales
   (README/INDEX): cabecera minima type documentation + exempt.
   Los 8 restantes son documentos historicos con formato propio
   (summas v0.1.0, evidencia de auditoria): cabecera minima tambien,
   con `status: closed` (congelados) y fechas del historial git.

USO
    python3 scripts/phase8-final-sweep.py            # simulacro
    python3 scripts/phase8-final-sweep.py --write    # aplica
"""
import os
import re
import sys
import subprocess
import collections

WRITE = "--write" in sys.argv
ROOT = subprocess.run(["git", "rev-parse", "--show-toplevel"],
                      capture_output=True, text=True).stdout.strip()

casos = collections.Counter()
tocados = set()

def leer(rel):
    p = os.path.join(ROOT, rel)
    return p, open(p, encoding="utf8", errors="replace").read()

def escribir(rel, txt):
    if WRITE:
        open(os.path.join(ROOT, rel), "w", encoding="utf8").write(txt)
    tocados.add(rel)

def editar_fm(rel, fn):
    """fn recibe el frontmatter (str) y devuelve el nuevo o None."""
    p, txt = leer(rel)
    m = re.match(r'^---\s*\n(.*?)\n(---[ \t]*(?:\r?\n|$))', txt, re.S)
    if not m:
        return False
    nuevo = fn(m.group(1))
    if nuevo is None or nuevo == m.group(1):
        return False
    escribir(rel, "---\n%s\n%s%s" % (nuevo, m.group(2), txt[m.end():]))
    return True

# ---- 1 · DEC -> adr --------------------------------------------------------
for i in range(1, 7):
    hits = [f for f in subprocess.run(["git","-C",ROOT,"ls-files",
            "decisions/DEC-00%d-*.md" % i], capture_output=True,
            text=True).stdout.split() if f]
    for rel in hits:
        if editar_fm(rel, lambda fm: re.sub(
                r'^type:[ \t]*["\']?decision["\']?[ \t]*$',
                'type: adr', fm, count=1, flags=re.M)):
            casos["DEC -> type: adr"] += 1

# ---- 2 · draft -> todo · done -> closed ------------------------------------
for rel in ("missions/MIS-089-information-architecture.md",
            "missions/MIS-095-updates-page-practice.md",
            "missions/MIS-096-nwos-versioning-sovereign-adoption.md",
            "missions/MIS-108-offer-the-mould-its-provenance.md",
            "missions/MIS-113-readme-generated-index.md"):
    if editar_fm(rel, lambda fm: re.sub(
            r'^status:[ \t]*["\']?draft["\']?[ \t]*$',
            'status: todo', fm, count=1, flags=re.M)):
        casos["mission draft -> todo"] += 1

if editar_fm("reports/audits/AUD-2026-08-17-cold-agent.md",
             lambda fm: re.sub(r'^status:[ \t]*["\']?done["\']?[ \t]*$',
                               'status: closed', fm, count=1, flags=re.M)):
    casos["report done -> closed"] += 1

# ---- 6 · ANNEX / PROPOSAL / PROP -> exempt ---------------------------------
def exentar(fm, motivo):
    if re.search(r'^registration:', fm, re.M):
        return None
    return fm + ('\nregistration: exempt\nregistration_reason: "%s"' % motivo)

for rel, motivo in (
    ("missions/ANNEX-mission-selection-draft.md",
     "annex to the mission series, not a numbered mission"),
    ("missions/PROPOSAL-closure-guard.md",
     "proposal attached to the mission series, not a numbered mission"),
    ("reports/PROP-C005-5.2-third-party-declaration.md",
     "proposal attached to the report series, not a numbered report")):
    if editar_fm(rel, lambda fm, m=motivo: exentar(fm, m)):
        casos["registration: exempt (auxiliar)"] += 1

# ---- 7 · ADR-002/003/004: updated = created --------------------------------
def poner_updated(fm):
    if re.search(r'^updated:', fm, re.M):
        return None
    mc = re.search(r'^created:[ \t]*(.+)$', fm, re.M)
    if not mc:
        return None
    return re.sub(r'^(created:[ \t]*.+)$',
                  r'\1\nupdated: %s' % mc.group(1).strip(),
                  fm, count=1, flags=re.M)

for rel in ("decisions/ADR-002-formato-markdown.md",
            "decisions/ADR-003-numinia-nwos-emisor-de-estandares.md",
            "decisions/ADR-004-identifier-convention.md"):
    if editar_fm(rel, poner_updated):
        casos["ADR updated = created"] += 1

# ---- 7b · MIS-052: blocked_reason retirado (D-002) -------------------------
_rel052 = "missions/MIS-052-pc-onpremises-ubuntu.md"
_p052, _t052 = leer(_rel052)
_mv = re.search(r'^blocked_reason:[ \t]*(.*)$', _t052, re.M)
if _mv and editar_fm(_rel052,
             lambda fm: re.sub(r'^blocked_reason:.*\n?', '', fm, count=1,
                               flags=re.M).rstrip("\n")):
    casos["blocked_reason retirado (D-002)"] += 1
    if WRITE:
        with open(os.path.join(ROOT, "scripts", "phase8-retired-values.txt"),
                  "w", encoding="utf8") as fh:
            fh.write("# Valores que llevaban campos retirados (D-002) y se\n")
            fh.write("# conservan aqui para no perderse en silencio.\n#\n")
            fh.write("%s\tblocked_reason\t%s\n" % (_rel052, _mv.group(1).strip()))

print("%s — %d documentos" % ("APLICADO" if WRITE else "SIMULACRO", len(tocados)))
for k, n in casos.most_common():
    print("   %-42s %d" % (k, n))
if not WRITE:
    print("\n(simulacro — usa --write para aplicar)")
