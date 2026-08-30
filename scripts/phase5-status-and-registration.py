#!/usr/bin/env python3
"""
Tanda A: `status` fuera de ciclo + documentos que no son series numeradas.

DOS ARREGLOS, NINGUNA INVENCION
-------------------------------
1. H-04 (66 de 68): `status` con un valor que su ciclo de vida no admite.
2. H-01 (38): documentos a los que el guard exige `<PREFIX>-<NNN>` sin que
   sean una serie numerada.

1 · STATUS FUERA DE CICLO
-------------------------
El ciclo documental es [draft active closed]. Los valores encontrados
vienen de vocabularios de otros sistemas (issue trackers, sobre todo):

    open        -> active    31 + 4   un documento "abierto" esta vivo
    published   -> closed    19       publicado = cerrado y servido
    resolved    -> closed     2       resuelto = cerrado
    designed    -> active     3       (agentes) disenado y en uso
    provisional -> draft      1       (decision) aun no firme
    done        -> closed     1       (report) terminado

Un caso NO se toca: `draft` en 5 misiones. El ciclo de mision es
[todo in-progress in-review done frozen] y `draft` no traduce a ninguno
sin decidir si la mision esta por empezar o congelada. Eso es criterio,
va a la tanda C con la mision delante.

2 · LO QUE NO ES UNA SERIE NO LLEVA NUMERO DE SERIE
---------------------------------------------------
38 documentos incumplen H-01, y ninguno esta mal escrito:

    25 partes de agente   agents/<nombre>/{SOUL,OPERATOR,SOURCES}.md
    13 singulares         INDEX.md, README.md, charter.md, roster.md,
                          canon/archive-lore.md

Las partes de agente ya se identifican con `agent: byblos`, y el
directorio dice cual de las tres partes es. Un `AG-003` encima seria un
segundo identificador para lo mismo — y habria que inventar la
numeracion, porque hoy no existe en ningun sitio: ni en AGENT.yaml
(`id: byblos`) ni en agents/INDEX.md. Numerar siete agentes para
satisfacer una regex es dejar constancia de una decision que nadie tomo.

Los 13 singulares son piezas unicas de su carpeta. `canon-index` no es el
indice numero N de nada.

S-004 §5.0 ya preve exactamente esto: `registration: exempt` con motivo.
El mecanismo estaba implementado en el lint (linea 236) y sin usar. No
hace falta regla nueva: hace falta declararlo.

USO
    python3 scripts/phase5-status-and-registration.py            # simulacro
    python3 scripts/phase5-status-and-registration.py --write    # aplica
"""
import os
import re
import sys
import subprocess
import collections

WRITE = "--write" in sys.argv
ROOT = subprocess.run(["git", "rev-parse", "--show-toplevel"],
                      capture_output=True, text=True).stdout.strip()

# (valor actual, tipo de ciclo) -> valor canonico.  El ciclo de mision se
# excluye a proposito: ver docstring.
STATUS = {
    "open": "active",
    "published": "closed",
    "resolved": "closed",
    "designed": "active",
    "provisional": "draft",
    "done": "closed",
}
CICLO_MISION = {"todo", "in-progress", "in-review", "done", "frozen"}

MOTIVO_AGENTE = "agent parts are identified by `agent:` and their filename, not by a series number (ADR-005)"
MOTIVO_UNICO = "singular document, not a numbered series"


def es_parte_agente(rel):
    return rel.startswith("agents/") and os.path.basename(rel) in (
        "SOUL.md", "OPERATOR.md", "SOURCES.md")


def es_singular(rel, fm):
    base = os.path.basename(rel)
    if base in ("INDEX.md", "README.md", "charter.md", "roster.md"):
        return True
    mid = re.search(r'^id:[ \t]*["\']?([^"\'\n]*)', fm, re.M)
    # Exactamente lo que H-01 rechaza: un id sin prefijo en MAYUSCULAS.
    # `BP-cao` o `AUDIT-2026-04-07` son convenciones vivas de su serie y el
    # guard los acepta; `canon-index` o `charter-alchemists` no tienen serie.
    # El detector debe coincidir con el guard, no ser mas estricto que el.
    return bool(mid and not re.match(r'^[A-Z]+-', mid.group(1).strip()))


files = subprocess.run(["git", "-C", ROOT, "ls-files", "*.md"],
                       capture_output=True, text=True).stdout.split()
files = [f for f in files if not f.startswith("web/")]

casos = collections.Counter()
tocados = set()

for rel in files:
    path = os.path.join(ROOT, rel)
    txt = open(path, encoding="utf8", errors="replace").read()
    m = re.match(r'^---\s*\n(.*?)\n---[ \t]*(\r?\n|$)', txt, re.S)
    if not m:
        continue
    fm = m.group(1)
    cierre = "---" + m.group(2)      # salto de linea original intacto (D-039)
    resto = txt[m.end():]

    tipo = re.search(r'^type:[ \t]*["\']?([^"\'\n]*)', fm, re.M)
    tipo = tipo.group(1).strip() if tipo else ""
    ya_exento = re.search(r'^registration:[ \t]*["\']?exempt', fm, re.M)

    out = []
    tocado = False
    for linea in fm.split("\n"):
        ms = re.match(r'^status:[ \t]*["\']?([^"\'#\n]*)', linea)
        if ms:
            v = ms.group(1).strip()
            # una mision se rige por su propio ciclo: no se toca aqui
            if tipo == "mission" or v in CICLO_MISION:
                out.append(linea)
                continue
            nuevo = STATUS.get(v)
            if nuevo and nuevo != v:
                out.append('status: %s' % nuevo)
                casos["status: %s -> %s" % (v, nuevo)] += 1
                tocado = True
                continue
        out.append(linea)

    # exencion de registro para lo que no es serie numerada
    if not ya_exento:
        motivo = None
        if es_parte_agente(rel):
            motivo = MOTIVO_AGENTE
        elif es_singular(rel, fm):
            motivo = MOTIVO_UNICO
        if motivo:
            out.append('registration: exempt')
            out.append('registration_reason: "%s"' % motivo)
            casos["registration: exempt (%s)" % (
                "parte de agente" if es_parte_agente(rel) else "singular")] += 1
            tocado = True

    if tocado:
        tocados.add(rel)
        if WRITE:
            open(path, "w", encoding="utf8").write(
                "---\n%s\n%s%s" % ("\n".join(out), cierre, resto))

print("%s — %d documentos" % ("APLICADO" if WRITE else "SIMULACRO", len(tocados)))
for k, n in casos.most_common():
    print("   %-52s %d" % (k, n))
if not WRITE:
    print("\n(simulacro — usa --write para aplicar)")
