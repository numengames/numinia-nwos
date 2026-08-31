#!/usr/bin/env python3
"""
Fase 4 del burndown de cabeceras: alinear valores con su vocabulario.

QUE ARREGLA
-----------
Los checks H-33..H-36 (nuevos en este mismo PR) sacaron 39 hallazgos. Este
script cierra los 20 de `guild` y `type_execution`. Los 19 de `territory`
NO se tocan aqui: son criterio, no mecanica (ver abajo).

Ninguno de estos valores es una opinion. Los cuatro gremios y los tres
tipos de ejecucion estan declarados en STD-001 desde que se escribio el
glosario; lo unico que faltaba era alguien que los comprobara. Por eso el
corpus derivo siempre de las mismas tres formas:

    castellano sin migrar      Procuradores -> Procurators   (8)
                               hibrido      -> hybrid        (3)
    minusculas                 alchemists   -> Alchemists    (4+1)
    comentario de plantilla    'alchemists        # alchemists|sentinels|...'
    pegado al valor            'digital  # biological|digital|hybrid'   (2)

DOS CASOS QUE NO SON MECANICOS
------------------------------
`technical` y `tecnico` no tienen equivalente en el vocabulario: no son
traducciones, son un cuarto valor que alguien invento. Verificado documento
a documento antes de decidir:

  MIS-060  assigned_to: "nimrod" (un agente) -> digital
  MIS-061  web desplegada que sincroniza sola -> digital

Se anotan aqui porque un lector futuro merece saber que estos dos NO se
resolvieron por tabla, sino leyendo la mision.

LO QUE NO TOCA
--------------
Los 19 H-36 de `territory` (Canon 8, Standards 6, Legal 3, Governance 2).
Verificado contra el historial: todos anteriores a la fase 3, ninguno
introducido por la migracion. Son un desacuerdo real entre el corpus y el
vocabulario de 8 palabras — o falta vocabulario, o sobran valores — y esa
decision es del Oraculo. Duena: MIS-124.

USO
    python3 scripts/phase4-vocabulary.py            # simulacro
    python3 scripts/phase4-vocabulary.py --write    # aplica
"""
import os
import re
import sys
import subprocess
import collections

WRITE = "--write" in sys.argv
ROOT = subprocess.run(["git", "rev-parse", "--show-toplevel"],
                      capture_output=True, text=True).stdout.strip()

# valor exacto (ya sin comillas ni comentario) -> valor canonico
GUILD = {
    "procuradores": "Procurators",
    "alchemists": "Alchemists",
    "procurators": "Procurators",
    "sentinels": "Sentinels",
    "exegetes": "Exegetes",
}
EXEC = {
    "hibrido": "hybrid",
    "híbrido": "hybrid",
    "tecnico": "digital",     # MIS-060/061: verificado documento a documento
    "técnico": "digital",
    "technical": "digital",
    "digital": "digital",
    "biological": "biological",
    "hybrid": "hybrid",
}
TABLA = {"guild": GUILD, "type_execution": EXEC}

files = subprocess.run(["git", "-C", ROOT, "ls-files", "*.md"],
                       capture_output=True, text=True).stdout.split()
files = [f for f in files if not f.startswith("web/")]

casos = collections.Counter()
cambios = []

for rel in files:
    path = os.path.join(ROOT, rel)
    txt = open(path, encoding="utf8", errors="replace").read()
    m = re.match(r'^---\s*\n(.*?)\n---[ \t]*(\r?\n|$)', txt, re.S)
    if not m:
        continue
    fm = m.group(1)
    cierre = "---" + m.group(2)      # el salto de linea original, intacto (D-039)
    resto = txt[m.end():]

    out = []
    tocado = False
    for linea in fm.split("\n"):
        mm = re.match(r'^(guild|type_execution):[ \t]*(.*)$', linea)
        if not mm:
            out.append(linea)
            continue
        campo, bruto = mm.group(1), mm.group(2)
        # separar el comentario de plantilla pegado al valor
        limpio = re.sub(r'\s+#.*$', '', bruto).strip().strip('"\'')
        canon = TABLA[campo].get(limpio.lower())
        # Solo se toca lo que el vocabulario rechaza. Un valor correcto sin
        # comillas es correcto: reescribirlo seria estilo, no correccion, y
        # ensuciaria el diff con 22 lineas que nadie pidio.
        if canon is None or limpio == canon:
            out.append(linea)
            continue
        out.append('%s: "%s"' % (campo, canon))
        casos["%s: %s -> %s" % (campo, limpio, canon)] += 1
        cambios.append((rel, campo, limpio, canon))
        tocado = True

    if tocado and WRITE:
        open(path, "w", encoding="utf8").write(
            "---\n%s\n%s%s" % ("\n".join(out), cierre, resto))

print("%s — %d valores en %d documentos" % (
    "APLICADO" if WRITE else "SIMULACRO",
    len(cambios), len(set(c[0] for c in cambios))))
for k, n in casos.most_common():
    print("   %-46s %d" % (k, n))
if not WRITE:
    print("\n(simulacro — usa --write para aplicar)")
