#!/usr/bin/env python3
"""
Tanda C, parte mecanica: tipos fuera de vocabulario y campos vacios.

1 · TIPOS FUERA DEL VOCABULARIO (H-03, 16 de 22)
------------------------------------------------
TYPES cerrado en S-004 §4: mission adr protocol blueprint report seminal
legal charter documentation meta agent. Lo encontrado y su destino:

  technical (4)  -> documentation   debt/D-034..D-037. `technical` no es
                    un tipo de documento, es su asunto. Son notas de deuda
                    tecnica: documentacion.
  roster (4)     -> charter         guilds/*/roster.md. `charter` ES el
                    tipo de la serie guilds/ (TYPE_SERIES). El roster es
                    la parte del charter que lista quien esta dentro.
  standard (3)   -> documentation + subtype: standard
                    SUBTYPES ya declara documentation:[standard, guide].
                    El tipo era `documentation`, `standard` era el subtipo:
                    estaba escrito en el campo equivocado.
  audit (2)      -> report + subtype: audit
                    Mismo caso. SUBTYPES declara report:[audit, daily].
  proposal (2)   -> documentation   missions/ANNEX-*, missions/PROPOSAL-*.
                    Una propuesta no es una mision: no tiene ciclo de vida
                    de mision ni aparece en el tablero.
  template (1)   -> documentation   protocols/APPROVAL-REQUEST-template.md.
                    La plantilla de un protocolo no es un protocolo.

NO SE TOCAN LOS 6 `decision`
----------------------------
decisions/DEC-001..DEC-006 llevan type: decision frente a los ADR-* que
llevan type: adr, en la MISMA carpeta. No es un error de escritura:

  - decisions/INDEX.md lista solo los ADR. Los seis DEC no estan.
  - pero estan VIVOS: `status: active`, ninguno superseded_by, y los
    referencian al menos agents/ursa/SOUL.md, BLU-007.md,
    BP-cao.md y BP-datos.md.

Dos series de decisiones conviviendo con nombres distintos es una
cuestion de nomenclatura, no de formato: o los DEC se renumeran como ADR
(y hay que arreglar las referencias), o `decision` entra en TYPES como
serie propia. Eso decide que significan las cosas. Va al Oraculo.

2 · CAMPOS ESCRITOS VACIOS (H-09, 10)
-------------------------------------
`supersedes:` (4), `fondos`, `graph`, `changelog`, `lore`, `sub_missions`,
`series_change`. Un campo vacio no informa de nada y ademas MIENTE: hace
creer que el dato existe. S-004 lo dice literalmente — "omit the field
instead". Se retiran; el valor que tenian queda en el censo.

`uid` NO SE TOCA — Y CASI LO BORRO
-----------------------------------
Mi primer simulacro retiraba 66 `uid:` vacios que el linter no reporta.
Fui a mirar por que el linter callaba y la respuesta estaba en el canon:

  S-001 §6.2, "Reserved: uid":
  "The field is declared and left empty. Oracle decision, non-negotiable."

Son 100 documentos (66 vacios + 34 con comillas vacias). El campo esta
reservado a proposito, esperando UUIDv7 con procedencia real; los 32 que
llegaron a tener valor estaban hechos a mano y con 2 colisiones. Que el
linter no se queje no significa que sobre: significa que ya se decidio.

Lo unico que me salvo fue preguntar por que el instrumento callaba, en
vez de dar por bueno mi propio criterio.

USO
    python3 scripts/phase7-types-and-empties.py            # simulacro
    python3 scripts/phase7-types-and-empties.py --write    # aplica
"""
import os
import re
import sys
import subprocess
import collections

WRITE = "--write" in sys.argv
ROOT = subprocess.run(["git", "rev-parse", "--show-toplevel"],
                      capture_output=True, text=True).stdout.strip()

# type actual -> (type canonico, subtype que hay que anadir o None)
TIPOS = {
    "technical": ("documentation", None),
    "roster": ("charter", None),
    "standard": ("documentation", "standard"),
    "audit": ("report", "audit"),
    "proposal": ("documentation", None),
    "template": ("documentation", None),
}
# `decision` NO esta en el mapa: ver docstring.

# Campos reservados a proposito: se declaran vacios y NO se retiran.
# `uid` es decision del Oraculo, no negociable (S-001 §6.2).
RESERVADOS = {"uid"}

files = subprocess.run(["git", "-C", ROOT, "ls-files", "*.md"],
                       capture_output=True, text=True).stdout.split()
files = [f for f in files if not f.startswith("web/")]

casos = collections.Counter()
censo = []
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

    out = []
    tocado = False
    tiene_subtype = bool(re.search(r'^subtype:', fm, re.M))
    lineas = fm.split("\n")

    for i, linea in enumerate(lineas):
        # 1 · type fuera de vocabulario
        mt = re.match(r'^type:[ \t]*["\']?([^"\'#\n]*)', linea)
        if mt:
            v = mt.group(1).strip()
            if v in TIPOS:
                nuevo, sub = TIPOS[v]
                out.append("type: %s" % nuevo)
                casos["type: %s -> %s" % (v, nuevo)] += 1
                # el subtipo va inmediatamente detras del tipo, aqui mismo:
                # el bloque de abajo nunca lo veia porque este `continue`
                # se salta el append normal de la linea.
                if sub and not tiene_subtype:
                    out.append("subtype: %s" % sub)
                    casos["subtype anadido: %s" % sub] += 1
                tocado = True
                continue

        # 2 · campo escrito vacio — tanto `campo:` como `campo: ""`
        #
        # CUIDADO: `campo:` seguido de lineas INDENTADAS no esta vacio, es
        # una clave YAML con hijos anidados. Borrar la clave deja el bloque
        # huerfano y el YAML deja de parsear. Me paso con
        # blueprints/BLU-005.md (`fondos:` y `graph:`, ~90 lineas
        # de hijos cada uno): el lint seguia verde y el build de la web
        # reventaba. Un campo solo esta vacio si la linea siguiente no esta
        # indentada.
        me = re.match(r'^([a-z_]+):[ \t]*(?:""|\'\')?[ \t]*$', linea)
        if me and me.group(1) not in RESERVADOS:
            sig = lineas[i + 1] if i + 1 < len(lineas) else ""
            if re.match(r'^[ \t]+\S', sig):
                out.append(linea)          # tiene hijos: no esta vacio
                casos["clave con hijos CONSERVADA: %s" % me.group(1)] += 1
                continue
            casos["campo vacio retirado: %s" % me.group(1)] += 1
            censo.append((rel, me.group(1)))
            tocado = True
            continue

        out.append(linea)

    if tocado:
        tocados.add(rel)
        if WRITE:
            open(path, "w", encoding="utf8").write(
                "---\n%s\n%s%s" % ("\n".join(out), cierre, resto))

print("%s — %d documentos" % ("APLICADO" if WRITE else "SIMULACRO", len(tocados)))
for k, n in casos.most_common():
    print("   %-46s %d" % (k, n))

if WRITE and censo:
    p = os.path.join(ROOT, "scripts", "phase7-emptied-fields.txt")
    with open(p, "w", encoding="utf8") as fh:
        fh.write("# Campos que estaban escritos VACIOS y se han retirado.\n")
        fh.write("# S-004 H-09: 'omit the field instead'. Un campo vacio no\n")
        fh.write("# informa de nada y hace creer que el dato existe.\n")
        fh.write("# Ninguno tenia valor: se retira la linea, no un dato.\n#\n")
        fh.write("# documento\tcampo\n")
        for rel, campo in sorted(censo):
            fh.write("%s\t%s\n" % (rel, campo))
    print("\n   censo -> scripts/phase7-emptied-fields.txt (%d lineas)" % len(censo))

if not WRITE:
    print("\n(simulacro — usa --write para aplicar)")
