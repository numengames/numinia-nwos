#!/usr/bin/env python3
"""
measuring_root.py — la cabecera de procedencia que todo medidor debe imprimir.

Regla del Oráculo (2026-08-24, STD-001 §10.1):

    Todo script de medición declara en su salida contra qué ROOT y qué HEAD
    midió. Sin esa línea, su resultado no es evidencia. Y un resultado de
    cero se trata como sospechoso hasta que se demuestre que el instrumento
    apuntaba al sitio correcto.

Por qué existe: dos veces el mismo día un script calculó su ROOT desde su
propia ubicación y midió el directorio equivocado. `cancel_to_frozen.py`
devolvió «0 misiones convertidas» ejecutado desde /tmp; `resolve-citations.py`
devolvió «0 rotos, 0 citas» por lo mismo. **El segundo es el fallo más
peligroso posible en un verificador: ceros que parecen éxito.** El Oráculo
habría mergeado con esa prueba delante.

Uso:

    from measuring_root import cabecera, sospechoso_si_cero
    print(cabecera(ROOT, ref))          # imprime ROOT, HEAD y si hay cambios
    sospechoso_si_cero(n_docs, 'documentos')
"""
import os
import subprocess
import sys

__all__ = ['cabecera', 'sospechoso_si_cero', 'verificar_root']


def verificar_root(root):
    """¿Es `root` un repositorio git con corpus? Devuelve (ok, motivo)."""
    if not os.path.isdir(os.path.join(root, '.git')):
        return False, f'no es un repositorio git: {root}'
    n = len([f for f in subprocess.run(
        ['git', '-C', root, 'ls-files'], capture_output=True, text=True
    ).stdout.split('\n') if f.endswith('.md')])
    if n == 0:
        return False, f'el repositorio no contiene .md rastreados: {root}'
    return True, f'{n} .md rastreados'


def cabecera(root, ref=None, titulo=None):
    """La línea de procedencia. Aborta si el ROOT no es medible."""
    ok, motivo = verificar_root(root)
    if not ok:
        print(f'✗ INSTRUMENTO MAL APUNTADO — {motivo}', file=sys.stderr)
        print('  Un resultado medido contra el sitio equivocado no es '
              'evidencia. Abortado.', file=sys.stderr)
        sys.exit(2)

    head = subprocess.run(
        ['git', '-C', root, 'rev-parse', '--short', ref or 'HEAD'],
        capture_output=True, text=True).stdout.strip() or '(sin git)'
    sucio = bool(subprocess.run(
        ['git', '-C', root, 'status', '--porcelain'],
        capture_output=True, text=True).stdout.strip())

    lineas = []
    if titulo:
        lineas.append(f'  {titulo}')
    lineas.append(f'  ROOT : {root}')
    lineas.append(f'  HEAD : {head}'
                  f"{'  (working tree con cambios sin commitear)' if sucio and not ref else ''}"
                  f"{'  (fijado con --at)' if ref else ''}")
    lineas.append(f'  corpus: {motivo}')
    return '\n'.join(lineas)


def sospechoso_si_cero(valor, etiqueta='resultado'):
    """Un cero no se reporta como éxito: se marca hasta demostrar lo contrario."""
    if valor == 0:
        print(f'\n  ⚠ CERO SOSPECHOSO — {etiqueta} = 0.\n'
              f'    Un cero puede significar «nada que reportar» o «medí el\n'
              f'    sitio equivocado». Compruebe la cabecera ROOT/HEAD antes\n'
              f'    de tratar esto como evidencia.\n')
    return valor


def cifra(n, unidad, total=None):
    """Formatea una cuenta CON su unidad. STD-001 §10.2.

    Regla del Oráculo (2026-08-25): «el problema no es contar mal, es que
    ninguna salida declara QUÉ cuenta. "0/17" y "0/5" no son dos cifras del
    mismo hecho: son unidades distintas sin etiqueta. Si dijera "0/5 carpetas
    de agente", el error se ve solo.»

    Tres de los seis errores de conteo fueron un contenedor contado en lugar
    de su contenido. Todos se leen como correctos sin unidad y como
    evidentemente falsos con ella: «0/17 carpetas de agente» es falso a
    simple vista, porque hay cinco agentes.

    Levanta ValueError si no se da unidad: una cifra sin unidad no es una
    medida, y este módulo no la formatea.

        cifra(17, 'entradas')              -> '17 entradas'
        cifra(0, 'carpetas de agente', 5)  -> '0/5 carpetas de agente'
    """
    if not unidad or not str(unidad).strip():
        raise ValueError(
            f'cifra({n!r}) sin unidad. STD-001 §10.2: toda cuenta declara qué '
            f'cuenta. Un número desnudo no es una medida.')
    cuerpo = f'{n:,}' if total is None else f'{n:,}/{total:,}'
    return f'{cuerpo} {unidad}'
