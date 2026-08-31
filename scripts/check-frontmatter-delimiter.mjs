#!/usr/bin/env node
/**
 * check-frontmatter-delimiter — el frontmatter cierra en linea propia.
 *
 * POR QUE EXISTE
 * --------------
 * El PR #134 (fase 2 del burndown de cabeceras) reescribio 85 documentos con
 * un bug de una linea: la regex de lectura consumia el salto de linea del
 * cierre y el formato de escritura no lo reponia. 79 ficheros quedaron con
 * el delimitador pegado al cuerpo:
 *
 *     ---# BP — CAO (Centralized Autonomous Organization)
 *
 * Los cinco guards siguieron VERDES. El lint de cabeceras parte el
 * frontmatter con una regex tolerante, Astro tambien, y la web renderizo
 * bien. El dano era invisible para todos los instrumentos y habria explotado
 * el dia que alguien usara un parser YAML estricto: 79 documentos perdiendo
 * su cabecera de golpe.
 *
 * Este guard cierra ese hueco. No mide calidad de cabecera — mide que el
 * fichero SIGA SIENDO PARSEABLE por cualquiera, no solo por nuestras regex.
 *
 * QUE COMPRUEBA
 * -------------
 *   1. si un .md empieza por `---`, existe un `---` de cierre en linea propia
 *   2. ese cierre va seguido de fin de linea, no de contenido pegado
 *
 * Falla con exit 1 y lista los ficheros. Sin baseline: el corpus esta a cero
 * hoy y cualquier reaparicion es una regresion, no deuda heredada.
 */
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { declareBlindSpots } from './lib/blindness.mjs';
declareBlindSpots('check-frontmatter-delimiter');

const ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const files = execSync('git ls-files "*.md"', { cwd: ROOT })
  .toString().split('\n')
  .filter((f) => f && !f.startsWith('web/'));

const pegados = [];
const sinCierre = [];

for (const rel of files) {
  const txt = readFileSync(`${ROOT}/${rel}`, 'utf8');
  if (!txt.startsWith('---')) continue;

  // El PRIMER \n--- tras la apertura es el cierre del frontmatter. Hay que
  // mirar ese y solo ese: un `---` mas abajo en el cuerpo (regla horizontal)
  // no dice nada sobre si la cabecera cierra bien.
  const cierre = /\n---/.exec(txt.slice(3));
  if (!cierre) {
    sinCierre.push(`${rel} :: opens with --- but never closes it`);
    continue;
  }
  const tras = txt.slice(3 + cierre.index + 4);   // lo que sigue al ---
  if (/^[ \t]*(\r?\n|$)/.test(tras)) continue;    // cierra en linea propia: OK
  pegados.push(`${rel} :: closing --- glued to ${JSON.stringify(tras[0])}`);
}

const total = pegados.length + sinCierre.length;
if (total === 0) {
  console.log(`frontmatter-delimiter guard: OK — ${files.length} .md files, every fence closes on its own line.`);
  process.exit(0);
}

console.log(`frontmatter-delimiter guard: ${total} file(s) with an unparseable fence\n`);
for (const l of [...pegados, ...sinCierre]) console.log(`  ${l}`);
console.log(`
A YAML parser that requires --- on its own line reads NO frontmatter in these
files. Our lint and Astro tolerate it; a standard parser does not.
Fix: scripts/repair-frontmatter-delimiter.py --write`);
process.exit(1);
