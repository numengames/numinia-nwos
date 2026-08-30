#!/usr/bin/env node
/**
 * check-frontmatter-yaml.mjs — el frontmatter tiene que PARSEAR.
 *
 * POR QUE EXISTE
 * --------------
 * D-039 punto 2 llevaba abierto desde la fase 2: ningun instrumento
 * comprobaba que el frontmatter fuese YAML valido. lint-frontmatter.mjs
 * lee el bloque con expresiones regulares, asi que un YAML roto le pasa
 * por delante sin que se entere.
 *
 * Dejo de teorizar sobre el agujero: hoy me he caido dentro. La tanda C
 * retiro cinco campos que parecian vacios (`fondos:`, `graph:`,
 * `changelog:`, `lore:`, `sub_missions:`) y que en realidad eran claves
 * con decenas de lineas indentadas debajo. Al borrar la clave, los hijos
 * quedaron huerfanos. Resultado:
 *
 *   lint-frontmatter          verde
 *   frontmatter-delimiter     verde
 *   licence / reference       verde
 *   build de la web           REVENTADO en 4 documentos
 *
 * Cuatro guards en verde sobre un corpus que no parsea. Es exactamente el
 * patron que D-039 describe, y la web fue quien lo dijo — no nosotros.
 *
 * POR QUE NO USA js-yaml
 * ----------------------
 * El CI corre los guards ANTES de `npm install` (verificado en el log del
 * run 33316990787, PR #136): esa fue la leccion del #134, que el guard
 * llegaba tarde. Un guard que importa js-yaml no arrancaria ahi. Asi que
 * comprueba estructura sin dependencias.
 *
 * QUE COMPRUEBA
 * -------------
 * El fallo real que se nos colo: una linea INDENTADA que no cuelga de
 * ninguna clave padre. Es lo que deja huerfano borrar una clave con
 * hijos, y basta para que el YAML no parsee.
 *
 * No pretende ser un parser de YAML. Pretende que el agujero concreto por
 * el que nos hemos caido dos veces no se abra una tercera.
 */
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const root = execSync('git rev-parse --show-toplevel').toString().trim();
const files = execSync('git ls-files "*.md"', { cwd: root })
  .toString().split('\n')
  .filter(f => f && !f.startsWith('web/'));

const bad = [];
let checked = 0;

for (const rel of files) {
  const txt = readFileSync(`${root}/${rel}`, 'utf8');
  const m = txt.match(/^---\s*\n([\s\S]*?)\n---[ \t]*(\r?\n|$)/);
  if (!m) continue;              // sin frontmatter: es cosa de H-00
  checked++;

  const lines = m[1].split('\n');
  let inBlockScalar = false;
  let blockIndent = 0;
  // La ultima clave RAIZ: ¿quedo abierta (sin valor en linea, puede tener
  // hijos indentados) o cerrada (valor en la misma linea)?
  // Esa es la distincion que importa: al borrar `fondos:` la clave raiz
  // anterior es `extraction_note: "..."` — CERRADA — y los hijos huerfanos
  // `  - id: canon` quedan indentados bajo una clave que no admite hijos.
  let rootOpen = false;
  let sawAnyRootKey = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const indent = line.match(/^[ \t]*/)[0].length;

    // dentro de un escalar de bloque (`campo: |` o `campo: >`) todo vale
    if (inBlockScalar) {
      if (indent > blockIndent) continue;
      inBlockScalar = false;
    }

    if (/^[ \t]*#/.test(line)) continue;

    const isKey = /^[ \t]*[A-Za-z_][\w.-]*:/.test(line);
    const isItem = /^[ \t]*-/.test(line);

    if (indent === 0) {
      if (isKey) {
        sawAnyRootKey = true;
        const rest = line.replace(/^[A-Za-z_][\w.-]*:/, '');
        if (/^\s*[|>][-+]?\s*$/.test(rest)) {
          inBlockScalar = true; blockIndent = 0; rootOpen = false;
        } else {
          // sin valor tras los dos puntos = clave abierta, admite hijos
          rootOpen = /^\s*(#.*)?$/.test(rest);
        }
      } else if (isItem) {
        // item a nivel raiz: solo es valido colgando de una clave abierta
        if (!rootOpen) {
          bad.push([rel, `line ${i + 1}: list item under no open key — "${line.trim().slice(0, 46)}"`]);
          break;
        }
      } else {
        bad.push([rel, `line ${i + 1}: not a key, not a list item — "${line.slice(0, 46)}"`]);
        break;
      }
      continue;
    }

    // linea indentada: solo valida bajo una clave raiz ABIERTA.
    // Mi 1a version aceptaba cualquier clave anterior (nunca fallaba);
    // la 2a comparaba contra la ultima clave vista a cualquier nivel
    // (falsos positivos en changelog:/- version:/date:). La referencia
    // correcta es el estado abierto/cerrado de la ultima clave RAIZ.
    if (!rootOpen) {
      bad.push([rel, sawAnyRootKey
        ? `line ${i + 1}: indented under a closed key — "${line.trim().slice(0, 46)}"`
        : `line ${i + 1}: indented line with no parent key — "${line.trim().slice(0, 46)}"`]);
      break;
    }
    // escalares de bloque anidados (`  notes: |`)
    if (isKey && /:\s*[|>][-+]?\s*$/.test(line)) { inBlockScalar = true; blockIndent = indent; }
  }
}

if (bad.length) {
  console.error(`frontmatter-yaml guard: ${bad.length} file(s) have a broken header\n`);
  for (const [rel, err] of bad) console.error(`  ${rel}\n      ${err}`);
  console.error('\nA header no parser can read is a header no instrument can trust.');
  process.exit(1);
}

console.log(`frontmatter-yaml guard: OK — ${checked} .md files, every header is structurally sound.`);
