---
documento: Numinia · Canon de Licencias
canon: C-005
ruta_en_repositorio: canon/C-005-licensing.md   # NWOS dentro del repo
archivo_distribuido: 2026_08_16-Numinia_Canon_C005_Licencias-v1.3.0.md   # Khepri §11 fuera de él
guia_publica: 2026_08_16-Numinia_Guia_Licencias-v1.1.0.html
edicion_razonada: 2026_08_16-Numinia_Legal_Book_Edicion_Razonada-v0.6.1.md
version: 1.3.0
fecha: 2026-08-16
estado: canon — inmutable; su modificación exige consenso formal (NWOS)
ambito: toda pieza creada a partir de esta fecha
no_ambito: inventario de lo heredado (`LEGAL_DEBT.md`) · razonamiento y alternativas (Legal Book v0.6.1, archivado)
idioma_canonico: es-ES   # el canon es gobierno interno; los artefactos exigibles van en inglés (§5)
procedencia_secciones: cada sección marcada [UNIVERSAL] o [NUMEN] (§0)
convenciones_normativas: RFC 2119 (DEBE / DEBERÍA / PUEDE)
autoridad: Brand & Culture > C-001…C-004 > este canon > cualquier repositorio de Numen Games
revision: por consenso formal, no por calendario
---

# C-005 · Canon de Licencias

## 0. Alcance y procedencia

Este canon gobierna los repositorios de **Numen Games**, incluidos los de Numinia y los
de NWOS. No gobierna los *workspaces* de cliente generados por nuestras herramientas
(§2.5).

Cada sección lleva marca de procedencia, para que la promoción futura a un canon de
organización superior sea mecánica y no una reescritura:

- **[UNIVERSAL]** — vale para cualquier proyecto de software: SPDX, REUSE, regla del
  suelo, dirección del arrastre, presente≠distribuido, la regla del generador.
- **[NUMEN]** — propio de nuestro negocio: los cuatro regímenes, VRM, catálogo CC0,
  lore reservado, marca.

> No es asesoramiento legal. Es la norma interna y su implementación técnica.

---

## 1. La regla [NUMEN]

**Toda pieza nace en el régimen más cerrado que tenga sentido y se abre por actos
deliberados, nunca por defecto.**

Cuatro regímenes, uno por tipo de valor:

| Qué | Licencia | Por qué |
|---|---|---|
| Catálogo — activos, datos, metadata, tokens de diseño | **CC0-1.0** | Se regala: es el canal de adquisición, no el producto |
| Borde — dominio, UI, visor, SDK, scripts, infraestructura | **MIT** | Se comparte: su valor crece con la adopción |
| Núcleo — identidad, progresión, facturación | **AGPL-3.0-only + CLA** | Libre para quien comparte; de pago para quien cierra |
| Mundo y nombre — lore, narrativa, marca | **Reservado** | Lo irreplicable no se licencia |

Un archivo sin licencia declarada no es neutral: por defecto son **todos los derechos
reservados**. Declarar es lo que libera.

**Pero el silencio no declara.** El silencio *equivale* jurídicamente a reserva; no la
*expresa*, y es indistinguible de un olvido. Por eso lo reservado **DEBE** declararse
igual que lo abierto: con `LICENSE` presente cuyo texto diga expresamente que no se
concede derecho alguno, y con `LicenseRef-Numen-AllRightsReserved` en `REUSE.toml`.
Justo donde más importa proteger es donde menos se puede depender de que el lector
infiera bien.

---

## 2. Qué licencia le toca a cada pieza [NUMEN, salvo §2.5–§2.6 UNIVERSAL]

Cuatro preguntas, en orden. La primera que detiene el flujo, gana.

**1 · ¿Es nuestro?** Sin titularidad demostrable —contrato laboral, encargo, cesión
escrita o licencia de origen compatible— **no se publica**.

**2 · ¿Es ejecutable o es contenido?** Un shader es código. Un `.blend` es contenido.

**3 · ¿Decide o muestra?** Si decide con autoridad, es núcleo. Si muestra, calcula o
describe, es borde.

**4 · ¿Se puede deshacer?** Si no, la decisión la firma un Oráculo (§4).

**El repositorio no es una unidad jurídica.** La licencia se determina por lo que se
distribuye o se sirve, no por dónde vive el archivo. Un monorepo PUEDE contener
`apps/*` bajo AGPL y `packages/*` bajo MIT, declarados por `REUSE.toml`. Lo que **DEBE**
garantizarse es la **dirección de las dependencias**: MIT importado por AGPL es
correcto —y el paquete MIT publicado aparte sigue siendo MIT—; AGPL importado por MIT
está prohibido y una regla de lint lo impide.

**Repositorio separado solo para copyleft heredado.** El copyleft de un tercero puede
hacerse valer contra nosotros y su frontera de obra derivada es discutible: se aísla. El
copyleft propio no tiene ese riesgo, porque somos titulares: basta declararlo por
directorio.

### Rama de software

| Caso | Licencia |
|---|---|
| Depende de un motor copyleft **heredado de un tercero** | la del motor, en **repositorio separado** |
| Aplicación desplegable: plataforma, backend o servicio que **decide** (`apps/*`) | `AGPL-3.0-only` |
| Biblioteca, paquete, SDK, tipos, tokens, script, CI, infraestructura (`packages/*`) | `MIT` |
| Prototipo o spike sin publicar | reservado hasta decidir |

### Rama de cultura

| Caso | Licencia |
|---|---|
| Catálogo público: GLB, VRM, texturas, sprites, audio, vídeo | `CC0-1.0` |
| Datos, metadata, índices | `CC0-1.0` |
| Sistema de diseño: tokens, CSS, iconografía propia | `CC0-1.0` |
| Documentación, ADR, especificaciones | `CC-BY-4.0` |
| Lore, narrativa, guiones, marca | reservado |
| Material de terceros | su licencia de origen, sin excepción |

### 2.5 Moldes, generadores y obra generada [UNIVERSAL]

**Un generador nunca propaga su licencia a lo que genera.** La titularidad de la obra
sigue a quien la encarga, no a la herramienta que la produce. Aplica a plantillas de
repositorio, *scaffolding*, generadores de documentos y a NWOS.

- El **molde** es una pieza nuestra y se licencia por §2: normalmente `MIT`.
- La **obra generada** pertenece al cliente. El molde **NO DEBE** emitir su propia
  licencia al artefacto.
- El molde **DEBE** emitir en el artefacto un `LICENSE` de **reserva a nombre del
  cliente** —no la suya, y tampoco ninguna—, porque el silencio no declara (§1).
- Los *workspaces* de cliente **no** están sujetos a §5: su régimen lo fija el cliente.

### 2.6 Contenido generado por IA [UNIVERSAL]

En varias jurisdicciones la obra puramente generada por máquina **no genera derecho de
autor**, luego puede no haber titularidad que ceder ni que reclamar.

- Toda pieza **DEBE** declarar su procedencia: `human`, `ai-assisted` o `ai-generated`.
- Lo que se entregue o publique **como obra propia** DEBE tener intervención humana
  sustancial y registrada; `ai-generated` puro no se declara obra de nadie.
- **[ABOGADO]** Qué titularidad promete un contrato sobre documentos redactados por un
  modelo es cuestión contractual, no de este canon, y precede a facturar por ellos.

### Antes de aplicar CC0 a medios

**DEBE** verificarse: origen de cada *sample* en audio; consentimiento escrito si
aparecen personas identificables; limpieza de EXIF en fotografía; cadena de derechos
completa en vídeo; consentimiento que contemple clonación en voz. **CC0 no se aplica a
lo que contiene personas sin consentimiento documentado** — CC0 renuncia a derechos
propios, no puede renunciar a los de otro.

---

## 3. Qué podemos usar [UNIVERSAL]

| | Licencias |
|---|---|
| **Libremente** | `MIT` `ISC` `BSD-2-Clause` `BSD-3-Clause` `Apache-2.0` `0BSD` `CC0-1.0` `CC-BY-4.0` · `OFL-1.1` solo tipografías |
| **Con aislamiento** | `MPL-2.0` `EPL-2.0` `LGPL-3.0` |
| **Con decisión firmada, aislado y declarado** | `GPL-3.0` `AGPL-3.0` — repositorio separado si es de un tercero (§2) |
| **Nunca** | `BUSL` `SSPL` `Elastic` Commons Clause · propietario · `CC-BY-NC-*` `CC-BY-ND-*` · cualquier dependencia sin campo `license` |

**Presente no es distribuido.** La lista de *nunca* se aplica a lo que se **distribuye o
se sirve**. Una dependencia transitiva prohibida que queda fuera del artefacto final por
*tree-shaking* **NO DEBE** bloquear el desarrollo, pero **DEBE**: registrarse en
`LEGAL_DEBT.md` con **umbral de salida** —no una fecha, la condición que la vuelve
insostenible—; protegerse con una guardia de CI que inspeccione el **contenido** del
artefacto, no los nombres del árbol, porque los empaquetadores incorporan código en
línea; y verificarse contra el texto real de la licencia, no contra su etiqueta.
Comprobación obligatoria antes de conceder la excepción: **si esa licencia impone
restricciones adicionales y el artefacto es AGPL, no hay excepción posible** — sería un
estado imposible de cumplir, no meramente indeseable.

**Ausencia de campo `license` en dependencia transitiva.** Es una señal de higiene, no
una infracción autónoma: bloquea mientras los términos sean desconocidos y se levanta al
documentarlos leyendo el `LICENSE` del paquete. Lo que el canon prohíbe es depender de
términos que nadie ha leído.

**Regla del suelo.** El copyleft más fuerte del árbol distribuido fija el mínimo de la
licencia de salida: un solo `import` de GPL excluye MIT como salida. Las
`devDependencies` y herramientas de construcción no cuentan; lo que se empaqueta en el
cliente, sí.

**Dirección del arrastre.** `MIT / BSD / ISC → Apache-2.0 → GPL-3.0 → AGPL-3.0`, y
nunca al revés.

**La frontera de proceso es la frontera de licencia.** Dos programas que se hablan por
HTTP son dos obras; dos módulos que se importan son una sola.

El SPDX de toda dependencia se resuelve **contra el registro antes de añadirla**, nunca
de memoria.

---

## 4. Lo irreversible [UNIVERSAL]

**Abrir es un acto. Cerrar es imposible para lo ya publicado.** Los permisos concedidos
no se revocan: una versión publicada bajo MIT es MIT para siempre y cualquiera la
bifurca desde ahí.

| Posición | Régimen | Margen de maniobra |
|---|---|---|
| 1 | Reservado, sin publicar | Total |
| 2 | Copyleft **con** CLA | Total: se puede abrir más o licenciar en paralelo |
| 3 | Copyleft **sin** CLA | Parcial: exige permiso de cada contribuyente |
| 4 | Permisivo publicado | Ninguna en la práctica |
| 5 | CC0 publicado | Ninguna. La renuncia es irrevocable |

**Compuerta de publicación permanente (DEBE).** Antes de escribir en Arweave se
verifica titularidad, ausencia de material de terceros incompatible y ausencia de datos
personales, y firma un Oráculo. Lo que no pasa se sirve solo desde CDN, que sí se puede
retirar.

**Licencia de nacimiento ≠ publicación.** Un repositorio nace con su `LICENSE` desde el
primer commit; mientras sea privado no concede permiso a nadie.

**Compuerta de cambio de visibilidad (DEBE).** Pasar un repositorio de privado a público
**es la concesión**: una oferta de licencia hecha públicamente con la obra disponible
otorga derechos a quien los tome, sin necesidad de `npm publish` ni de Arweave. Es
irreversible en la práctica y por tanto es acto firmado por un Oráculo, con la misma
compuerta que la publicación permanente. Antes de cambiar la visibilidad se verifica:

1. `LICENSES/`, `REUSE.toml`, `TRADEMARKS.md` y `NOTICE` completos y correctos.
2. **Listado real de directorios sensibles frente a las anotaciones**, no una lista
   escrita a mano: lo enumerado a mano se desincroniza y lo reservado se publica solo.
3. Ningún archivo reservado alcanzable por una anotación general.
4. Ningún dato personal ni secreto en el historial, no solo en `HEAD`.

---

## 5. Cómo se declara [UNIVERSAL]

Todo repositorio público **DEBE** contener `LICENSE`, `LICENSES/` con el texto de cada
licencia usada, `REUSE.toml`, `TRADEMARKS.md`, y `NOTICE` si distribuye alguna
dependencia Apache-2.0. Todo `package.json` **DEBE** declarar `license` con el SPDX
exacto.

```ts
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
```

```toml
version = 1
[[annotations]]
path = "assets/**"
SPDX-FileCopyrightText = "2026 Numen Games S.L."
SPDX-License-Identifier = "CC0-1.0"
```

**Un archivo, un régimen (DEBE).** Una expresión SPDX con `AND` significa que el
receptor debe cumplir **ambas licencias sobre todo el archivo**, no «esta parte sí y
esta no». Combinar así una licencia abierta con la reserva produce un permiso
imposible de cumplir: es el mismo defecto por el que rechazamos las licencias que
imponen restricciones adicionales sobre artefactos copyleft, solo que autoinfligido.

Cuando dos regímenes conviven en un archivo, **el contenido se separa**: los datos, el
lore o la configuración salen a su propio archivo con su propia anotación, y el código
queda limpio. Es además lo que *File Over App* ya exigía — el lore incrustado en un
componente viola ese principio con independencia de las licencias. Si por una razón
técnica no puede separarse, REUSE admite `SPDX-SnippetBegin`/`SnippetEnd` para el
fragmento; eso es el parche, no la solución.

**Excepción — archivos que no pueden modificarse.** Kits de terceros fijados por prueba
de identidad byte a byte, código *vendored*, artefactos generados y binarios sin campo
de metadatos **NO DEBEN** alterarse para insertar la cabecera: se declaran por
`REUSE.toml` o por un archivo `.license` adjunto. Modificar un archivo pineado para
cumplir esta norma es incumplir otra.

**La licencia viaja dentro del archivo.** Un binario que sale del CDN pierde el README.
Si la licencia no va dentro, deja de existir.

| Formato | Campo |
|---|---|
| glTF / GLB | `asset.copyright` |
| VRM | `VRMC_vrm.meta` — `licenseUrl`, `otherLicenseUrl`, permisos |
| MP3 | ID3v2 `TCOP` + `TXXX:LICENSE` |
| WAV / FLAC / OGG | comentarios Vorbis `LICENSE`, `COPYRIGHT` |
| JPEG / PNG / WebP | XMP `xmpRights:WebStatement` + `cc:license`; EXIF `Copyright` |
| MP4 / MOV | XMP incrustado |
| SVG | RDF con `dc:rights` y `cc:license` |

**VRM (DEBE).** Los valores por defecto de la especificación son restrictivos y
bloquearían un archivo declarado CC0. Obligatorio: `otherLicenseUrl` a CC0,
`avatarPermission: everyone`, `commercialUsage: corporation`, `creditNotation:
unnecessary`, `allowRedistribution: true`,
`modification: allowModificationRedistribution`.

**Idioma de los artefactos exigibles (DEBE).** `LICENSE`, `LICENSES/`, `TRADEMARKS.md`,
`NOTICE`, el CLA y el fragmento para agentes van **en inglés**. Son lo que se opone a un
tercero. Este canon es gobierno interno y permanece en `es-ES`.

**CI (DEBE).** `license-check` falla ante licencia desconocida, prohibida o ausente.
**Régimen por defecto: error.** El aviso es la excepción y requiere lista explícita:
solo pistas que no despliegan a producción y no se publican. La severidad sigue a la
**exposición**, no al nombre del directorio ni del dominio; si el sistema no puede
determinar la exposición, error.

**Umbrales de deuda (DEBE).** Las salidas registradas en `LEGAL_DEBT.md` se expresan
como condición, no como fecha, y **el guardia de CI las evalúa en cada build**. La
condición es el disparador: un umbral que nadie mide no es una salida, es un deseo.

---

## 6. Contribuciones [UNIVERSAL]

| Dónde | Instrumento |
|---|---|
| Todo repositorio que contenga código AGPL, aunque sea en una parte | **CLA** tipo Apache: el contribuyente conserva su copyright y nos concede licencia amplia con sublicencia y patentes |
| Repositorios exclusivamente MIT y documentación | **DCO**: firma `git commit -s` |
| Activos | Declaración explícita de CC0 en el PR |

El CLA se exige **por repositorio, no por ruta**. Un CLA condicionado a qué archivos
toca cada PR es confuso para quien contribuye y su fallo es silencioso: una aportación
a código AGPL aceptada sin CLA elimina la doble licencia sobre ese archivo para
siempre, sin que nadie lo note.

---

## 7. La marca [NUMEN]

CC0 no cede derechos de marca. Es la única frontera dura.

Quedan fuera de toda licencia libre los nombres **Numinia**, **Numen Games** y
**Khepri** como identificadores de origen, el logotipo, el isotipo y los wordmarks de
firma.

**Sí:** citar, enlazar, escribir sobre el proyecto, declarar que un producto usa
activos de Numinia. **No:** usarlos como marca propia, sugerir patrocinio, presentar un
fork como oficial.

*Se puede copiar el sistema; no se puede decir que se es Numen.*

---

## 8. Fuentes

| Licencia | SPDX | Texto oficial |
|---|---|---|
| CC0 1.0 Universal | `CC0-1.0` | <https://creativecommons.org/publicdomain/zero/1.0/legalcode.en> |
| CC Attribution 4.0 | `CC-BY-4.0` | <https://creativecommons.org/licenses/by/4.0/> |
| MIT | `MIT` | <https://spdx.org/licenses/MIT.html> |
| Apache License 2.0 | `Apache-2.0` | <https://www.apache.org/licenses/LICENSE-2.0> |
| Mozilla Public License 2.0 | `MPL-2.0` | <https://www.mozilla.org/MPL/2.0/> |
| GNU GPL v3 | `GPL-3.0-only` | <https://www.gnu.org/licenses/gpl-3.0.html> |
| GNU AGPL v3 | `AGPL-3.0-only` | <https://www.gnu.org/licenses/agpl-3.0.html> |
| SIL Open Font License 1.1 | `OFL-1.1` | <https://openfontlicense.org/open-font-license-official-text/> |
| Obras Culturales Libres | — | <https://freedomdefined.org/Definition/Es> |
| Identificadores | SPDX | <https://spdx.org/licenses/> |
| Declaración | REUSE 3.3 | <https://reuse.software/spec-3.3/> |
| VRM 1.0 · meta | — | <https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm-1.0/meta.md> |

---

## 9. Fragmento para `CLAUDE.md`

Se copia literal en cada repositorio. Si diverge, manda este canon. En inglés por ADR-008.

````markdown
## Licensing — from Numinia canon C-005 (source of truth; do not edit here)

**Emit:** `packages/*` — library/SDK/types/tokens/script/CI/infra → `MIT` ·
`apps/*` — deployable app that *decides* (identity, progression, billing) →
`AGPL-3.0-only` · code on a third-party strong-copyleft engine, **separate repo** →
the engine's · assets/data/metadata/design tokens → `CC0-1.0` · docs/ADRs/specs →
`CC-BY-4.0` · lore/brand/unpublished → none, all rights reserved.

A monorepo may mix these: declare per directory in `REUSE.toml`. Dependencies MUST
flow apps → packages, never the reverse. **One file, one regime:** never write an
`AND` expression mixing an open license with reserved — that is an unsatisfiable
permission. Split the content out into its own file instead.

**Generators:** a generator never propagates its own license to what it generates. The
template is ours (usually MIT); the generated work belongs to whoever commissioned it,
and the template MUST emit a reserved-rights `LICENSE` in the client's name — never its
own, never none. Reserved means a `LICENSE` that says so; silence does not declare.

Every code file starts with:
// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT   (or the applicable ID)

**Consume:** MIT · ISC · BSD · Apache-2.0 · 0BSD · CC0-1.0 · CC-BY-4.0 freely.
MPL-2.0 · EPL-2.0 · LGPL-3.0 with isolation. **Third-party** GPL/AGPL only in a
separate repo with a signed decision. NEVER: BUSL, SSPL, Elastic, Commons Clause,
proprietary, CC-NC, CC-ND. Resolve every dependency's SPDX from the registry BEFORE
adding it — never from memory.

**Present is not distributed.** A forbidden transitive dependency that tree-shaking
keeps out of the artifact does NOT block work, but MUST be logged in `LEGAL_DEBT.md`
with an **exit threshold** (a condition, not a date, evaluated by CI on every build)
and guarded by a check that inspects the artifact's **contents** — bundler metafile or
module paths, never comment strings, which minifiers strip. Hard limit: **if that
licence imposes additional restrictions and the artifact is AGPL, no exception is
possible** — the result is unsatisfiable, not merely undesirable. A missing `license`
field is a hygiene signal, not a breach on its own: it blocks while the terms are
unknown and clears once you read the package's LICENSE and document them.

**Floor rule:** the strongest copyleft in the distributed tree sets the minimum
outbound license — one GPL import excludes MIT output. devDependencies and build tools
don't count; whatever ships in the client bundle does.

**Contributions:** any repo containing AGPL code requires a CLA (per repo, not per
path); MIT-only repos and docs use DCO (`git commit -s`); asset PRs need an explicit
CC0 declaration.

**Header exception:** never edit pinned third-party kits, vendored code, generated
artifacts or metadata-less binaries to insert an SPDX header — declare them in
`REUSE.toml` or an adjacent `.license` file.

**Repo skeleton on creation:** `LICENSE` · `LICENSES/` · `REUSE.toml` ·
`TRADEMARKS.md` · `NOTICE` if Apache-2.0 ships · `license` field in every
package.json. CI runs `license-check`: error on `.com`, warning on `.store`.

**Stop and ask — never proceed alone:**
- **Turning any repository public** — that IS the grant, before any `npm publish`.
  Gated and signed off, like Arweave. Verify the sensitive directories against a real
  listing, never a hand-written list.
- Publishing anything CC0 to Arweave (irreversible; gated; requires sign-off)
- Ownership of a piece is unclear or undocumented
- Files containing people, voices, or personal data — CC0 waives our rights, never
  someone else's
- Any license outside the lists above

**CI severity defaults to error.** Warning is the listed exception, for surfaces that
neither deploy to production nor publish. Severity follows exposure, not directory or
domain names; if exposure can't be determined, error.

Full canon: `C-005 · Canon de Licencias`. This block is authoritative for day-to-day
work; when it is silent, ask rather than infer.
````

---

## 10. Registro de versiones

| Versión | Fecha | Cambios |
|---|---|---|
| 1.3.0 | 2026-08-16 | **Consolidación.** Resuelta la contradicción §1↔§5: *el silencio no declara* — lo reservado se expresa con `LICENSE` de reserva, no con ausencia. Nueva **§2.5, regla del generador** [UNIVERSAL]: un molde nunca propaga su licencia a lo generado y emite reserva a nombre del cliente; los *workspaces* de cliente quedan fuera de §5. Nueva **§2.6, procedencia de IA**: `human · ai-assisted · ai-generated`, con la parte contractual marcada [ABOGADO]. Nueva **compuerta de cambio de visibilidad** (§4): pasar un repo a público **es** la concesión, antes que `npm publish`, y se verifica contra un listado real de directorios, no contra una lista escrita a mano. **Un archivo, un régimen** (§5): un `AND` que mezcla licencia abierta con reserva es un permiso imposible; el contenido se separa. **Severidad por defecto error** y sin nombrar dominios; los umbrales de deuda los evalúa el CI en cada build. **Idioma**: los artefactos exigibles —`LICENSE`, `TRADEMARKS.md`, `NOTICE`, CLA, fragmento— en inglés; el canon sigue en es-ES. Nuevo **§0**: alcance limitado a repositorios de Numen Games y marcas [UNIVERSAL]/[NUMEN] por sección para que la promoción futura sea mecánica. El fragmento §9 se vuelve autosuficiente: presente≠distribuido, un archivo un régimen, generadores, visibilidad en *stop and ask*. |
| 1.2.0 | 2026-08-16 | **Presente no es distribuido** (§3). Primer choque del gate con el árbol real: una dependencia transitiva prohibida que el *tree-shaking* deja fuera del artefacto no bloquea el desarrollo, pero exige registro en `LEGAL_DEBT.md` con **umbral** de salida, guardia de CI sobre el contenido del artefacto —no sobre los nombres del árbol— y lectura del texto real de la licencia. Con un límite duro: **si la licencia impone restricciones adicionales y el artefacto es AGPL, no cabe excepción**, porque el estado resultante es incumplible por construcción. La ausencia de campo `license` queda degradada de infracción a señal de higiene: bloquea mientras los términos sean desconocidos, se levanta al documentarlos. |
| 1.1.0 | 2026-08-16 | Tres enmiendas tras el primer contacto con el código. **El repositorio no es una unidad jurídica** (§2): la frontera es `apps/*` AGPL / `packages/*` MIT declarada por `REUSE.toml`, con la dirección de dependencias como condición real; el repositorio separado queda reservado al copyleft **heredado**, que es el único que un tercero puede hacer valer. **Excepción de cabecera** (§5): los archivos que no pueden modificarse —kits pineados, *vendored*, generados, binarios— se declaran por `REUSE.toml` o `.license`. **CLA por repositorio, no por ruta** (§6): un CLA condicionado a rutas falla en silencio. El fragmento §9 incorpora contribuciones y excepciones, que antes solo vivían en el canon. |
| 1.0.0 | 2026-08-16 | Entrada en canon como C-005. Se retira el razonamiento —alternativas descartadas, precedentes, justificaciones— que queda archivado en el Legal Book v0.6.1. Este canon contiene solo norma. |
| 0.1.0 – 0.6.1 | 2026-08-16 | Elaboración. Ver Legal Book archivado. |
