# LEGAL_DEBT

Registro de deuda legal por C-005 §3/§5. Cada entrada lleva umbral de salida
expresado como condición, no como fecha — salvo donde ninguna salida existe,
que se registra para acotar el alcance.

## LD-001 · CC0 arrastrado sobre el lore (2026-08-16)

**Qué pasó.** El repositorio se publicó con `LICENSE` raíz CC0-1.0 heredado
del régimen del catálogo (ver DEC-002, construir en público CC0), sin
partición por regímenes. El CC0 sobre el lore no fue un acto deliberado: se
arrastró. Mientras el repo fue público con ese LICENSE, todo su contenido
quedó ofrecido bajo CC0 — incluido lo que C-005 §2 clasifica como reservado.

**Qué quedó publicado bajo CC0.** Todo el historial hasta el commit
`0157be9` inclusive. En particular, del régimen que hoy es reservado:
`canon/` (manual del juego de rol de Numinia, Welcome to Numinia, Brand and
Culture, Compendium of Attributes and Ranks, Rank Specifications, Role
structure, Platform Role System, About Session Zero, papers epistémico y
pragmático), `guilds/` (alquimistas, centinelas, exegetas, procuradores) y
`agents/` (personas de adonaz, nimrod, procurador-01, senet y la plantilla).
También la documentación y las misiones, hoy CC-BY-4.0.

**Resolución (firmada por Oráculo, 2026-08-16).** Lo publicado queda CC0 y
no se intenta revocar — C-005 §4: la renuncia es irrevocable. El grifo se
cierra hacia adelante: `LICENSE` raíz deja de ser CC0, `REUSE.toml` declara
los paths por régimen y lo reservado se expresa con
`LicenseRef-Numen-AllRightsReserved`. Las versiones posteriores al corte ya
no se ofrecen bajo CC0.

**Umbral de salida.** No existe: la renuncia sobre lo publicado es
irrevocable por construcción. La entrada permanece para acotar el alcance
temporal del grant (hasta `0157be9`) y como insumo de la compuerta de
cambio de visibilidad (§4) de futuros repositorios: la verificación de
directorios sensibles contra listado real existe porque este incidente
ocurrió.

**Consecuencia operativa.** Cualquier tercero puede usar, bifurcar o
redistribuir el contenido de esas versiones bajo CC0, lore incluido. La
marca no: CC0 nunca cedió Numinia, Numen Games ni Khepri (§7,
`TRADEMARKS.md`).

---

## LD-002 · `NOTICE` ausente con Apache-2.0 en el árbol (2026-08-26)

**Qué pasó.** C-005 §5 exige `NOTICE` en todo repositorio público «si
distribuye alguna dependencia Apache-2.0». El árbol contiene **11 paquetes
Apache-2.0**, dos de ellos directos (`class-variance-authority`,
`playwright-core`). `NOTICE` no existe.

**Estado medido** (AUD-2026-08-26 §C3, evidencia en
`reports/audits/AUD-2026-08-26-licensing-c005/`). La prueba se hizo sobre el
**contenido** de `dist/`, como manda §3, no sobre nombres del árbol:

```
dist/: 737 html · 290 md · 35 png · 18 woff2 · 4 txt · 3 js · 3 css · 2 xml · 2 svg · 2 json
binarios nativos (.node/.so/.wasm): 0
ficheros .js que mencionan Apache-2.0 o su aviso: 0 de 3
```

`playwright-core` es herramienta de build (`build:pdf`);
`class-variance-authority` es MIT-compatible en su uso y no emite aviso al
bundle. **Presente, no distribuido** (§3).

**Umbral de salida.** `NOTICE` pasa a ser obligatorio en el momento en que
un artefacto servido desde `web/dist/` incorpore código Apache-2.0 —
condición verificable inspeccionando el contenido del bundle, no el árbol de
dependencias. Hoy la condición no se cumple.

**Guardia.** No existe. §3 exige que el umbral lo evalúe el CI en cada
build; hoy nadie lo mide. Registrado como parte de D-001 (ausencia de
guardias de CI).

---

## LD-003 · LGPL-3.0-or-later presente en el árbol de dependencias (2026-08-26)

**Qué pasó.** `@img/sharp-libvips-linux-x64` declara `LGPL-3.0-or-later`.
C-005 §3 sitúa `LGPL-3.0` en el nivel «con aislamiento», no en «libremente».

**Por qué no bloquea.** `sharp` es dependencia **opcional** de `astro`, usada
en build para procesar imágenes; `output: "static"`. Prueba sobre el
contenido del artefacto (§3, «nunca cadenas de comentario»):

```
ficheros .js de dist/ que contienen "libvips" o "sharp": 0 de 3
ficheros .js de dist/ que contienen "GPL" o "LGPL":      0 de 3
binarios nativos en dist/:                               0
```

**Presente no es distribuido** (§3). El componente LGPL no alcanza el
artefacto servido.

**Umbral de salida.** La excepción decae si `dist/` pasa a contener un
binario nativo o cualquier módulo que enlace `libvips` — es decir, si el
proyecto adopta `output: "server"`, un adaptador con SSR, o procesamiento de
imagen en runtime. Condición, no fecha.

**Guardia.** No existe. §3 la exige y debe inspeccionar el **contenido** del
bundle (metafile o rutas de módulo). Mientras no exista, este umbral es un
deseo, no una salida — exactamente lo que §5 advierte.

**Nota colateral.** `zod-to-ts` figura sin campo `license` en la declaración
de `astro`, pero **no está instalado** en el árbol. Señal de higiene (§3),
sin efecto: no se depende de términos que nadie ha leído porque no se depende
del paquete.

---

## LD-004 · El instrumento de verificación no está pineado (2026-08-26)

**Qué pasó.** La auditoría AUD-2026-08-26 se realizó con `reuse 6.2.0`,
instalado *ad hoc* en el entorno del agente. El repositorio no fija esa
versión en ningún sitio: ni `package.json`, ni CI, ni un fichero de
requisitos.

**Por qué importa.** Las cifras del informe —510 ficheros, 2 expresiones
inválidas, `OFL-1.1` de 0 a 7 apariciones— sólo son comparables entre
iteraciones si el instrumento es el mismo. Una versión distinta puede
resolver la precedencia de anotaciones o el parseo de expresiones de otra
forma, y entonces un cambio de cifra no distingue entre «el repositorio
cambió» y «la herramienta cambió».

**Umbral de salida.** Se cierra cuando `reuse` quede fijado a una versión
concreta y ejecutable por CI, de modo que el SBOM sea reproducible por un
tercero sin depender del entorno local de quien audita.

**Alcance.** Afecta a la comparabilidad de futuras auditorías, no a la
validez de la de hoy: el SBOM literal queda archivado en
`reports/audits/AUD-2026-08-26-licensing-c005/sbom.spdx` con la versión
declarada.

---

## LD-005 · El canon cita un commit de corte que no es el efectivo (2026-08-26)

**Qué pasó.** `REUSE.toml` y LD-001 sitúan el cierre del grifo CC0 en el
commit `0157be9`. El commit que **realmente sustituye** el `LICENSE` raíz
CC0-1.0 es `2efd546`, seis minutos posterior:

```
0157be9  2026-08-16 19:52:03 +0200  Apply C-005 v1.3.0 mechanically: REUSE skeleton, trademark notice
2efd546  2026-08-16 19:58:17 +0200  Close the CC0 tap forward: per-regime licensing per C-005, Oráculo-signed
```

**Efecto medido.** La ventana CC0 real va de `9f51ad1` (2026-04-06 19:14:26)
a `2efd546` (2026-08-16 19:58:17): **82 commits, 282 ficheros presentes al
cierre**. Citar `0157be9` deja fuera seis minutos de historial en el que el
`LICENSE` raíz seguía siendo CC0.

**Severidad: baja.** Ningún commit intermedio añade contenido — la diferencia
es de precisión documental, no de alcance del grant. Pero LD-001 acota el
alcance temporal de una renuncia irrevocable, y ese acotamiento debe citar el
commit efectivo.

**Umbral de salida.** Se cierra cuando la referencia de corte en `REUSE.toml`
y en LD-001 cite `2efd546`, o cuando quede documentado por qué `0157be9` es
la referencia correcta pese a la evidencia. La corrección toca canon y
`REUSE.toml`: es decisión del Oráculo, no higiene de agente.

