---
sistema: Numen Games · Sistema de Diseño
version: 5.0.0
fecha: 2026-08-18
estado: propuesto — consolidado sobre v4.2.0, pendiente de firma de Oráculo
deriva_de: 2026_08_15-Numen_Design_System-v4_2_0 + 2026_03_20-Numinia_Brand_and_Culture-v0.1.2
registros: "1 Umbral · 2 Velo · 3 Low-poly · 4 Píxel" 
idioma_canonico: es-ES
formato_tokens: W3C Design Tokens (DTCG) + CSS Custom Properties
convenciones_normativas: RFC 2119 (DEBE / DEBERÍA / PUEDE)
direccion: Solarpunk 40 · Steampunk 40 · Cyberpunk 20
registro_pixel: Píxel-16 + Pixelify Sans + guía de producción 90s (herencia de aventuras gráficas)
tipografia: Geist + Geist Mono (vercel.com/font, SIL OFL 1.1) · tercera voz Alegreya solo libro [EXTENSIÓN — validar]
iconografia: Phosphor Icons (phosphoricons.com, MIT)
licencia: CC0 1.0 Universal (Legal by Design) · marcas excluidas
revision: cada seis meses, junto al Brand & Culture
presupuesto_lectura:  # generado por script al versionar — nunca a mano
  documento: "pendiente de regeneración (5.0.0)"
  contrato_s19: "pendiente de regeneración"
  fragmento_s19_5: "pendiente de regeneración"
---

# Numen Games · Sistema de Diseño

**Ya sin nombre clave.** El nombre de trabajo se retira en la 5.0.0 (§0.5); el sistema se llama por lo que es.
Un único archivo maestro. Todo lo que se diseñe —webs, plataforma, presentaciones, documentos y facturas, juegos, cómics, libros, materiales de evento, activos digitales y mundos 3D— se deriva de aquí. La guía viva con todos los ejemplos renderizados es `index.html` (junto a `/assets/`).

Este documento **no inventa la identidad**. La ejecuta. La identidad está en `Brand & Culture Numinia v0.1.2`; lo que falta ahí para producir se añade aquí y se marca como extensión.

---

## 0. Cómo usar este documento

**Persona:** lee §1–§2 para el porqué; trabaja desde §13 (Recetas); vuelve a §3–§11 para valores concretos.
**Agente digital:** empieza por §19 (Contrato) y sigue el orden de §0.3; el kit de arranque vive en §13.1. No inventes valores fuera de §19.3. El YAML declara el **presupuesto de lectura**: elige entre fragmento (tarea rápida), §19 + plano (producción) o documento entero (auditoría).

### 0.1 Palabras normativas

**DEBE / NO DEBE** = requisito absoluto; incumplirlo invalida la pieza. **DEBERÍA / NO DEBERÍA** = recomendación fuerte; se incumple solo con justificación escrita. **PUEDE** = criterio propio.

### 0.2 Marcas de procedencia

**[CANON]** consta en el Brand & Culture o es decisión de dirección tomada; se cambia allí. **[DERIVADO]** consecuencia necesaria de algo CANON. **[EXTENSIÓN]** añadido aquí para poder producir; es lo que hay que validar.

### 0.3 Uso por agentes de código (Claude Code y similares) [EXTENSIÓN — validar]

Este documento está pensado para **ejecutarse**, no solo leerse. Un agente de código que reciba «hazlo con el Sistema» DEBE seguir este orden:

0. Identificar el **registro** (§2.8): Umbral, Velo, low-poly o píxel — antes que el medio.

1. Cargar §19 (contrato) y §19.3 (tokens) como fuente única de valores; nada se inventa.
2. Copiar el **kit de arranque** de §13.1 como base CSS/JS de toda web o documento HTML — se copia, no se reescribe de memoria.
3. Elegir el **plano del medio** en §13.2–§13.10 y rellenarlo. Los esqueletos son normativos: la estructura no se improvisa; el contenido, sí.
4. Escribir el copy con §11: nivel declarado, y léxico del mundo (§11, cápsula Numinia) solo si la pieza es nivel II.
5. Pasar la checklist §19.4 antes de entregar.

**El entregable para agentes es el kit (zip).** Es autosuficiente y autoexplicativo: `LEEME.md` en la raíz trae la orden de instalación, y `kit/` contiene `sistema.css`, `sistema.js` y `sistema.tokens.json` **generados de este documento al empaquetar** — se enlazan o copian, jamás se reescriben. El `.md` a solas PUEDE bastar para tareas de estilo y consulta; su degradación es explícita: sin el kit, las fuentes se obtienen de sus orígenes (§4.1, §14) y **las piezas con firma no se producen** — los wordmarks y activos de marca solo viven en el kit.

**Integración en repositorio:** el `CLAUDE.md` del proyecto DEBERÍA apuntar a este archivo y reproducir el fragmento §19.5. **Precedencia sobre material antiguo:** si el agente recibe además decks, PDFs o webs anteriores, este documento manda — lo que lo contradiga (p. ej., una serif de display en presentaciones antiguas) es legado a migrar, no referencia a imitar.

### 0.4 El renombrado — tabla de equivalencias [CANON — decisión de dirección, 5.0.0]

El nombre clave «Khepri» se retira del sistema. Motivo funcional: este manual es también la semilla del sabor por defecto de organizaciones ajenas (§2.8.2), y una semilla no viaja con nombre propio. Los agentes que encuentren el nombre antiguo en material previo aplican esta tabla; **ninguna regla cambia por el renombrado**:

| Antes | Ahora |
|---|---|
| Khepri (el sistema) | el Sistema / Sistema de Diseño |
| paleta Píxel-16 | paleta **Píxel-16** |
| sprite de Khepri | sprite del escarabajo |
| «Khepri cierra toda pieza» | «**el escarabajo** cierra toda pieza» |
| `kit/khepri.{css,js,tokens.json}` | `kit/sistema.{css,js,tokens.json}` |

**Lo que no se renombra:** el escarabajo (isotipo) es marca, no nombre del sistema; los archivos de activos (`Khepri_Logo.svg`, `pixel/khepri-sprite-24.png`) conservan su nombre físico hasta el rearmado del kit para no romper repositorios; el historial (§18) es append-only y no se reescribe. `[ORACLE — pendiente]`: si el escarabajo conserva su nombre mitológico como personaje de nivel II (el borrador asume que sí: solo el sistema se renombra).

### 0.5 Sobre los estándares

No existe un estándar universal de design systems. Existen: el formato de tokens **W3C DTCG** (estándar abierto real: `$value`, `$type`), los sistemas de referencia ajenos (Material, Carbon — se citan, no se cumplen) y **WCAG 2.2 AA** (norma con fuerza legal en la UE, EN 301 549 — obligatoria). Estrategia: prosa normativa + tablas + un bloque DTCG, los mismos valores tres veces. Un sistema solo-JSON no lo lee nadie; uno solo-prosa no lo aplica ninguna máquina.

---

## 1. Fundamento

### 1.1 De dónde viene todo [CANON]

Propósito: *Leveling up organizations to build better relationships.* Misión: *Build games to make work better.* Causa: Digital Humanism — *Humans are not the problem.* HXC: *Build organizations that elevate lives.* Emoción: Joy + Trust + Interest = Optimism & Love. Arquetipos: Mago (Sanador) · Cuidador · Explorador. Cierre: *Leave things better than we found them.*

### 1.2 Los valores, traducidos a diseño [DERIVADO]

**Cosmic Harmony** → nada existe por decoración; si un recurso no codifica algo verdadero del contenido, se elimina.
**Equable** → la accesibilidad es equidad, no cumplimiento; AA es el suelo.
**Curiosity** → inferencia activa (referencia científica declarada): **minimizar la sorpresa donde el usuario actúa** (nada se mueve bajo el cursor) y **maximizar la exploración donde descubre** (revelación progresiva).
**Healthy Environments** → el material dura y pesa poco: presupuesto de rendimiento, formatos abiertos, soportes reutilizables, autoalojado antes que CDN.

### 1.3 Los tres pilares [CANON]

**Craft** — el arte como motor. **Learn** — los humanos juegan para aprender. **Remix** — cópialo y hazlo mejor → este sistema se publica bajo CC0 (§15).

---

## 2. Dirección creativa

### 2.1 La mezcla · 40 / 40 / 20 [CANON — decisión de dirección]

El *SolarSteamCyberPunk* del Brand & Culture, con la dosis fijada:

| Hilo | Dosis | **Época** | Qué es | Qué aporta al sistema |
|---|---|---|---|---|
| **Solarpunk** | **40 %** | **2120** | El optimismo mediterráneo: tecnología al servicio de la vida, luz, comunidad, sostenibilidad | Arena, Verdemar y el Ámbar-sol; el modo Diurno entero; la serenidad compositiva; la sostenibilidad como requisito técnico (§1.2). El Nocturno es **su noche cálida de jardín** —negros marrones, arena a la luz de la luna—, no la noche ácida de neón |
| **Steampunk** | **40 %** | **1920** | La máquina: bronce, mecanismo, medida, la II Revolución Industrial | Los neutrales bronce del Nocturno; Geist Mono; la retícula mecánica; el relieve de circuito (§6); los instrumentos en la iconografía |
| **Cyberpunk** | **20 %** | **2020** | La señal: el destello que atraviesa | Coral y Turquesa como neón **dosificado**; la textura binaria; el tecleo de terminal (§10). Al 20 %, el cyber es acento, jamás ambiente |

**Regla de mezcla.** La luz domina, la máquina estructura, la señal parpadea. **Test de dosis** (entrecerrando los ojos): ¿parece un jardín mediterráneo con maquinaria de bronce donde parpadea una señal? Correcto. ¿Parece Blade Runner? Sobra ciber. ¿Parece un catálogo de jardinería? Falta máquina.

**La línea de los cien años [CANON].** Los tres hilos no son tres estéticas: son **tres décadas de la misma historia**, la de Numinia. **1920** — la ciudad material arde; queda la máquina: el bronce, el mecanismo, la medida, los Registros. **2020** — la década de la invocación; la señal atraviesa: los Oráculos llaman a la ciudad de vuelta. **2120** — la ciudad plena; el jardín: la tecnología al servicio de la vida. Siempre hablamos de décadas: los años 20 de tres siglos. El sistema no mezcla épocas — **atraviesa un viaje de dos siglos**, y el escarabajo es quien empuja el sol de uno al siguiente.

**El sello de las tres décadas.** La época se hace visible con un microcomponente: `1920 · 2020 · 2120` en `type.etiqueta` (Mono, versales no — son cifras), separado por puntos medios, siempre en orden cronológico. Acompaña al cierre del escarabajo en piezas expresivas y portadas; la década **dominante** de una pieza PUEDE ir en Ámbar. No sustituye a fechas reales ni aparece en documentos de nivel III.

**Guardrail: la época es sabor, no skin.** Una pieza no «se ambienta» en 1920 ni en 2120: la dosis 40/40/20 se mantiene siempre, y la época solo se enfatiza con los dispositivos sancionados — el sello, la pátina de imagen (§6.3) y el léxico de época (§11). Test: si retiras el sello y la fotografía, la pieza debe seguir siendo inconfundiblemente del Sistema.

**El escarabajo** —Khepri, el escarabajo solar: creación, ciclo, renacimiento; único lugar donde el nombre antiguo pervive, como origen de la marca— atraviesa los tres hilos y pone el cierre de toda pieza.

### 2.2 El repertorio de firma [EXTENSIÓN]

Cinco elementos, y no hay más; todo lo demás es tipografía, espacio y color. (1) **El ciclo lunar** como marcador de secuencia y de progreso — la Luna es símbolo canónico y una fase es de verdad una secuencia; solo donde exista secuencia o progreso real, incluido el avance de lectura de un documento largo. (2) **La textura binaria** como separador: señal que se convierte en sedimento — y que además **habla**: codifica frases del canon en 8 bits (§6.1). (3) **El relieve de circuito** (§6): la materia. (4) **El escarabajo** como marca de cierre: cierra, nunca abre. (5) **El juego de marca** (§8.5): los tres glifos *space · people · connect* y el color sobre la marca — solo en registro expresivo, nunca en la firma.

### 2.3 Arquitectura de marca [EXTENSIÓN — validar]

`NUMEN GAMES` (la organización, esta identidad) → `NUMINIA` (el mundo narrativo propio) → `PROYECTOS DE CLIENTE` (sistemas a medida, p. ej. OutThink). **REGLA DURA:** un sistema de proyecto NO DEBE sustituir esta identidad; hereda paleta, tipografía y retícula, y añade encima su léxico e iconografía.

### 2.4 El registro píxel [CANON — decisión de dirección]

Cuando la narrativa lo pide, Numen habla en píxel: la herencia de **Monkey Island, Day of the Tentacle y La Abadía del Crimen** — las aventuras gráficas que enseñaron que se aprende jugando (*Learn*, hecho forma). No es un tema decorativo: es un **registro de renderizado** del nivel II, con su propia disciplina.

**Cuándo sí:** momentos de juego y lore, escenas narrativas de evento, contenido del mundo Numinia, logros e insignias, pantallas de carga de producto, piezas de nostalgia con propósito.
**Cuándo no:** comunicación corporativa, propuestas y documentación (nivel III), visualización de datos, y cualquier pieza donde el píxel sea disfraz y no narrativa.

**Las reglas del registro, en una vista** (cada una desarrollada donde se indica; este bloque es índice, no duplicado):

- **Se entra y se sale por completo.** Una escena es píxel o no lo es; densidades mezcladas, prohibidas. Un sprite PUEDE vivir como contenido enmarcado dentro de una pieza del sistema, nunca fundido con vector o fotografía. Frontera de interfaz → §5.1.
- **Paleta cerrada Píxel-16** con dominancia neutral ≥ 60 % → §3.7; rampas, clústeres y tramado → §3.7.1–3.7.2.
- **Gramática de dibujo** — silueta primero, luz única arriba-izquierda, escalones deliberados → §2.4.1; escalas y consistencia → §2.4.2; profundidad → §2.4.3.
- **Contorno**: Noche separa la **silueta** del fondo activo (la legibilidad SCUMM y nuestro velo son la misma idea); **dentro** de la figura, las divisiones se resuelven con la rampa, nunca con contorno uniforme (§2.4.1). En sprites ≤ 12 px el contorno PUEDE cerrarse completo: a ese tamaño la silueta es todo lo que hay.
- **Escalado solo entero** con `image-rendering: pixelated` → §5.1.
- **El diálogo colorea por hablante** con el subconjunto aprobado (§3.7) y hereda el **tecleo** (§10.1-01): el registro píxel es el hábitat natural de la bandera del sistema. Composición del texto → §4.5.1; animación de sprites → §10.4.
- **Sprite canónico del escarabajo**: existe una única traducción píxel de la marca (`assets/pixel/khepri-sprite-24.png`), demostrada en la guía, como excepción cerrada a la regla de no redibujar (§8.3). Su estatus es [EXTENSIÓN — validar]: la consagración de toda traducción píxel de la marca la firma un Oráculo (§17); hasta entonces, es el único borrador autorizado y nadie pixela otro.
- El registro debe seguir pasando el **test de dosis** (§2.1): el píxel cambia la resolución, no la mezcla.
- **El registro píxel no tiene modo Diurno.** El índice Píxel-16 nace de la Noche: una escena píxel dentro de una pieza clara conserva su lienzo Nocturno, enmarcada — nunca se recolorea a claro.

#### 2.4.1 Gramática visual · legibilidad antes que detalle [EXTENSIÓN — validar]

La referencia de los años 90 no se reproduce como filtro nostálgico: se adopta su disciplina. El artista trabaja con pocos píxeles, pocos colores y decisiones visibles. Cada píxel DEBE pertenecer a una forma, una luz, un material o una acción; el ruido que no comunica se retira.

- **Silueta primero.** Personajes, objetos interactivos y emblemas DEBEN reconocerse en una masa de un solo color a escala nativa. Si dos elementos cumplen funciones distintas, sus siluetas NO DEBEN depender de la paleta para distinguirse. La prueba se hace sobre Noche y Basalto **y, si la figura es oscura, sobre Ceniza** [aprendido produciendo]: una silueta en Noche desaparece sobre su propio color.
- **Lectura por masas.** Toda figura principal se organiza en sombra, cuerpo y luz antes de añadir detalle. Los acentos llegan al final. El detalle que rompe la lectura a tamaño real se elimina aunque resulte atractivo ampliado.
- **Clúster, no confeti.** Los píxeles se agrupan en clústeres continuos. Un píxel aislado solo PUEDE existir como brillo especular, estrella, partícula funcional o rasgo facial imprescindible; nunca como textura indiscriminada.
- **Escalones deliberados.** Las diagonales y curvas mantienen un ritmo regular de píxeles. Dientes accidentales, dobles contornos y cambios arbitrarios de grosor se corrigen a escala ×1.
- **Contorno selectivo.** Noche (`#14110F`) separa la silueta del fondo activo; dentro de la figura, las divisiones se resuelven con sombras de la propia rampa. Un contorno negro uniforme alrededor de todo aplana el volumen y NO DEBERÍA usarse salvo en sprites muy pequeños.
- **Luz única.** La fuente principal viene de arriba-izquierda, como ya fija el registro. Cada plano, sombra proyectada, brillo metálico y cambio de material DEBE obedecerla. No hay *pillow shading* —luz centrada que rodea la forma— ni reflejos sin fuente.
- **Carácter por proporción.** Cabeza, torso, herramientas y gesto se exageran solo para mejorar la lectura; no para imitar una franquicia concreta. Se hereda la economía narrativa de la aventura gráfica, no sus diseños propietarios.

#### 2.4.2 Escalas de trabajo y consistencia [EXTENSIÓN — validar]

| Familia | Rejilla canónica | Se decide primero | Se comprueba a ×1 |
|---|---:|---|---|
| **Objeto / insignia** | `12×12 px` | silueta, orientación, punto de interacción | que el objeto no se confunda con otro del mismo inventario |
| **Personaje / emblema** | `24×24 px` | pose, eje de equilibrio, herramienta o rasgo dominante | que acción y dirección se lean sin animación |
| **Módulo de escena** | `48×48 px` | profundidad, entrada/salida, foco y masa de luz | que el foco siga visible sin zoom |

- Se dibuja y corrige a **×1**; ×2, ×3, ×4, ×6 y ×8 sirven para inspección y presentación, no para decidir el píxel.
- La escala de un activo se fija al iniciar. NO DEBE dibujarse grande para reducirlo después ni rotarse con interpolación. Una nueva escala exige redibujo sobre su rejilla.
- Todos los puntos de anclaje —pies, centro de objeto, origen de herramienta y caja de diálogo— usan coordenadas enteras y se mantienen entre fotogramas.
- El *hitbox* y la zona táctil pertenecen a la interacción, no al contorno visual: PUEDE ser mayor que el sprite para cumplir los `44×44 px` de accesibilidad sin agrandar el dibujo.

#### 2.4.3 Profundidad y composición de escena [EXTENSIÓN — validar]

La profundidad se construye con **solapamiento, escala, contraste y densidad de detalle**; no con desenfoque. El fondo usa más neutrales, menos contraste interno y clústeres mayores. El primer plano PUEDE tener bordes más oscuros y detalle mayor, pero NO DEBE tapar acciones necesarias.

1. **Fondo:** establece lugar y clima; evita acentos salvo una señal narrativa.
2. **Plano de juego:** concentra personajes, objetos interactivos y rutas. Es la zona con mayor claridad de silueta.
3. **Primer plano:** enmarca o da profundidad; nunca compite con el objetivo.
4. **Foco:** un único punto dominante por escena. Ámbar señala valor o descubrimiento; Turquesa, interacción; Coral, tiempo real.

Un objeto interactivo DEBE poder localizarse por al menos dos vías: silueta + posición, nombre + símbolo, o contraste + respuesta de foco. Nunca solo por color.

#### 2.4.4 Matriz visual · cómo sí / cómo no [EXTENSIÓN — validar]

| Cómo sí | Cómo no |
|---|---|
| Dibujar la silueta y probarla sobre Noche y Basalto | Añadir textura antes de resolver la forma |
| Compartir colores entre materiales para cohesionar la escena | Crear una rampa nueva para cada objeto |
| Reservar los píxeles sueltos para brillos o partículas funcionales | Salpicar ruido para que «parezca retro» |
| Exagerar gesto, herramienta o dirección para leer a ×1 | Confiar en detalles que solo se ven ampliados |
| Mantener el mismo origen y volumen entre fotogramas | Hacer que el personaje tiemble por cambios de contorno |
| Usar la nostalgia como gramática de producción | Copiar composiciones, personajes o interfaces propietarias |

### 2.5 El mapa de superficies [CANON — decisión de dirección]

Dónde vive el sistema, de un vistazo. Cada superficie tiene su modo por defecto, su nivel de lengua y su plano:

| Superficie | Modo por defecto | Nivel | Registro | Plano |
|---|---|---|---|---|
| Web narrativa (numen.games, numinia.com) | Nocturno | II en home, I/III en internas | Umbral | §13.2 |
| **Plataforma** (paneles, tienda) | **Diurno, con Nocturno conmutable** | I | Umbral | §13.11 |
| Documento y factura | Diurno | III | Umbral | §13.4 |
| Presentación | Nocturno | II/III | Umbral | §13.3 |
| Evento físico | Diurno (soportes) | I/II | Umbral | §13.5 |
| **Archivo · Summa (numinia.org, visores NWOS)** | **Nocturno** | I/III | **Velo** | §2.7 |
| **Libro · códex digital (el LAP)** | **Diurno** (papel), Nocturno conmutable | II/III | Umbral-papel; su marco de lectura, Velo | §13.12 |
| Registro píxel | **Nocturno siempre** | II | Píxel | §2.4, §13.9 |
| Registro low-poly (3D) | el de su superficie anfitriona | — | Low-poly | §2.6, §13.7 |
| Correo | claro del cliente | I/III | Umbral | §13.8 |
| Cómic / novela gráfica | Nocturno | II | Píxel (hereda) | pendiente — hereda registro píxel, pátinas §6.3 y voz §11 |

La Plataforma es la **única superficie emitida donde Diurno manda**: es herramienta de trabajo prolongado sobre datos, y el papel cansa menos que la noche. La regla «emite = Nocturno» del §5 queda así matizada por esta tabla.

### 2.6 El registro low-poly [CANON — decisión de dirección]

El hermano 3D del registro píxel, para entornos, props y personajes web (visor de la Plataforma, portales, metaverso). **La malla es honesta como el píxel es honesto**: la geometría facetada se muestra, no se disimula.

- **Economía de masas.** Silueta primero, facetas después — la teoría de clústeres (§2.4.1) en tres dimensiones: masas continuas legibles a distancia de uso; el detalle que no lee, se elimina.
- **Color plano de paleta.** Materiales en color plano (*flat shading* o *vertex colors*) tomados de los canónicos y sus rampas (§3.7 como guía de familias); nada de texturas fotográficas. El único mapa fotorrealista permitido sigue siendo el normal canónico (§6).
- **Presupuesto orientativo** [EXTENSIÓN — validar]: personaje 2.000–10.000 tris; prop 200–2.000; entorno modular por piezas. El presupuesto se valida con los assets reales de la tienda.
- **Iluminación de la casa**: Ámbar cálida clave + Turquesa relleno frío (§13.7); la época entra por temperatura y materiales (pátinas §6.3), no por skins.
- **Formatos**: GLB/glTF, los estándares que la Plataforma ya publica.
- Relación entre registros: **el píxel es la memoria 2D del mundo; el low-poly es su cuerpo 3D** — misma economía de medios, distinta dimensión. Ninguno de los dos se mezcla con fotorrealismo en la misma escena.

### 2.7 El registro del Velo [CANON — decisión de dirección, 5.0.0]

**Qué es.** En el mundo, el Velo es la piel simbólica que sostiene la ciudad: la zona del Akasha donde vive el Summa y donde el conocimiento **se ordena al ser descubierto** (manual v0.6.0). En el sistema, el Velo es el **registro de la profundidad**: la atmósfera que se ve detrás y a través de las cosas. Ya vivía aquí sin nombre — el velo de imagen `rgba(20,17,15,.72)` que protege la marca (§8.2) y funda el modal (§9.8) fue siempre su primera pieza. La 5.0.0 le da el resto del cuerpo.

**Dónde vive.** Archivo Summa y visores NWOS (`numinia.org`), el marco de lectura del LAP fuera del papel, superficies de descubrimiento (fichas al abrirse, revelaciones del Registro Akáshico). Y, por decisión de dirección, es la **semilla del sabor por defecto** de organizaciones sin sistema propio (§2.8.2).

**La regla única del registro: el Velo no añade hexes — añade alfa.** Todo valor del Velo es un canónico con transparencia. Ningún hue nuevo entra al sistema por esta puerta.

| Token | Valor | Origen | Papel |
|---|---|---|---|
| `velo.rejilla` | `rgba(166,218,213,.025)` · celda **40 px** | Verdemar al 2.5 % | La retícula del Akasha, apenas visible; la celda coincide con la fila de Plataforma (40 px) — el archivo y la herramienta comparten compás `[DERIVADO — verificado en producción, pablofm-web]` |
| `velo.niebla` | `rgba(1,142,161,.06)` · radial desde abajo-izquierda | Turquesa al 6 % | La niebla de los corredores: la señal difusa del fondo `[DERIVADO — verificado en producción]` |
| `velo.imagen` | `rgba(20,17,15,.72)` | Noche al 72 % | El velo fundacional (§8.2, §9.8, §13.3) — sin cambios; Jardín puede aligerar a `.60` (§6.3) |
| `velo.cristal` | `rgba(30,26,23,.65)` + `backdrop-filter: blur(12px)` | Basalto al 65 % | Superficie de cristal: se lee a través `[EXTENSIÓN — validar]` |
| `velo.cristal-borde` | `rgba(58,51,45,.5)` | Línea fuerte al 50 % | El canto del cristal `[EXTENSIÓN — validar]` |
| `velo.cielo` | 175 estrellas · pesos `60/25/10/4/1` | **Escala de rareza §3.6** | El cielo del Velo (§2.7.1) — verificado en producción, numinia.org |
| `velo.lectura` | `blur(2.2px)` + máscara `0→90 %` | — | Lo que está tras el Umbral se ve y no se lee (§2.7.2) |

**Reglas duras del Velo:**

- **Solo en Nocturno.** El papel es papel: en Diurno el Velo no existe (misma lógica que el relieve, §6.2).
- **Intensidades techo:** rejilla ≤ 3 % de alfa, niebla ≤ 8 %. Más es decorado; el Velo se siente, no se mira.
- **Detrás, nunca encima.** Rejilla y niebla son capa de fondo; jamás sobre texto de lectura ni dentro de tarjetas y superficies elevadas — esas siguen lisas (§6.2).
- **El cristal exige atmósfera.** `velo.cristal` solo sobre fondos con rejilla, niebla o imagen velada detrás: desenfocar la nada es humo. Texto sobre cristal: mínimo el secundario; AA verificado contra el peor fondo posible.
- **Materia y atmósfera no compiten.** El relieve de circuito (§6.2) es la máquina; el Velo es el Akasha. En una vista DEBERÍA dominar uno. La niebla PUEDE posarse sobre el relieve a la mitad de su alfa; **rejilla y relieve no conviven** — dos tramas pelean `[EXTENSIÓN — validar]`.
- Contraste, foco y `prefers-reduced-motion`: las reglas generales mandan; el Velo no las matiza.

#### 2.7.1 El cielo · la rareza hecha cosmos [CANON — decisión de dirección, 5.0.0]

El fondo de estrellas de `numinia.org` no es decoración: **la distribución del cielo es la escala de rareza** (§3.6). Sesenta de cada cien estrellas son comunes y una es legendaria — quien mira el cielo lee la misma gramática con la que lee el botín, sin que nadie se lo explique. Es la **única aparición sancionada de la rareza fuera del juego**, y se autoriza porque el cielo *es* mundo: no colorea datos, precios ni plazos (§3.6 sigue intacta en eso).

| Tier | Peso | Radio | Color canónico |
|---|---:|---|---|
| Común | 60 | 0.3–1.2 px | Arena `#F9EBDC` |
| Poco común | 25 | 0.5–1.5 px | Verde `#8FC46B` |
| Raro | 10 | 0.6–1.8 px | Azul templado `#5D9BD6` |
| Épico | 4 | 0.8–2.5 px | Morado `#A98BE0` |
| Legendario | 1 | 1.0–3.0 px | Ámbar `#EFA517` |

Comportamiento (canonizado tal cual está en producción): **175 estrellas**; deriva de `±0.06 px` por fotograma con reaparición por el lado opuesto; **respiración de alfa** entre `.05` y `.85`, cada estrella a su ritmo (`.002–.006` por fotograma); resiembra al redimensionar. Reglas duras: solo Nocturno; **sin parallax y sin reacción al cursor o al scroll** — es fondo, no interacción; nunca bajo texto de lectura larga; con `prefers-reduced-motion` el cielo se detiene y las estrellas quedan fijas a alfa media.

**Deriva detectada `[CORREGIR]`:** numinia.org dibuja hoy el cielo con hexes ajenos al sistema (`#22C55E`, `#3B82F6`, `#A855F7`, `#F97316` — valores por defecto de Tailwind). La regla queda escrita con los canónicos de §3.6; el recoloreo va a la hoja de ruta §16.

#### 2.7.2 El velo de lectura · se ve, no se lee [CANON — decisión de dirección, 5.0.0]

La frontera de sesión del códex, ya en producción: el capítulo cerrado **se muestra** desenfocado (`blur(2.2px)`) y disolviéndose hacia abajo con una máscara lineal de `0→90 %`. No es un muro que oculta — es un velo que promete; el embudo es blando por decisión (D2 del LAP). Reglas: el texto velado queda **inerte** (`user-select:none`, `pointer-events:none`, fuera del orden de foco); el sello del Umbral y su llamada flotan **nítidos por encima**; nunca se vela contenido que la persona ya tenía abierto.

**Sus animaciones** viven en §10.1 (10–14). El catálogo 01–09 sigue disponible para Umbral y Velo por igual; 10–12 son exclusivas del Velo y del papel vivo (§13.12).

### 2.8 Los cuatro registros — jerarquía y valores [CANON — decisión de dirección, 5.0.0]

El Sistema habla en cuatro registros, ordenados por importancia. Cada pieza declara el suyo **antes que su medio** (§19.2). Como toda misión del NWOS, cada registro responde por su **valor epistémico** (qué enseña) y su **valor pragmático** (qué produce).

**1 · El Umbral** — el registro general. El nombre viene del mundo: el Umbral es la frontera que cualquiera puede cruzar. Es el sistema base entero (§3–§13): webs, presentaciones, documentos, **facturas** (§13.4; pieza real 2026-A-014), interfaz, evento y correo.
*Epistémico:* fija los priors de quien llega de fuera — el primer contacto enseña qué es Numen sin necesitar el mundo.
*Pragmático:* produce toda pieza corporativa y de producto **sin decisiones nuevas**; es el registro que factura.

**2 · El Velo** — el registro de la profundidad (§2.7). El Akasha visible: archivo, Summa, visores, descubrimiento.
*Epistémico:* hace visible **cómo se ordena el conocimiento al descubrirse** — las capas de verdad como capas literales: fondo, niebla, cristal, contenido.
*Pragmático:* viste los visores NWOS hoy y es la semilla del tema por defecto del template (§2.8.2) — la apuesta de las skins intercambiables, encarnada.

**3 · Low-poly** — el cuerpo 3D del mundo (§2.6). Hyperfy, Oncyber y lo que Three.js levante: sillas, edificios, personajes.
*Epistémico:* demuestra la honestidad material en tres dimensiones — la malla se muestra; la economía de medios se aprende mirando.
*Pragmático:* produce assets GLB/glTF con presupuesto verificable para la tienda y los mundos.

**4 · Píxel** — la memoria 2D del mundo (§2.4). Aventuras arcade, minijuegos, lore jugable.
*Epistémico:* *Learn* hecho forma — la herencia de las aventuras gráficas, citada y nunca copiada.
*Pragmático:* escenas, logros y sprites con pipeline y QA cerrados (§13.9–13.10).

**Regla de fusión.** Los registros no se apilan: una pieza vive en uno y PUEDE **enmarcar** contenido de otro (un sprite dentro de una web del Umbral; un visor Velo mostrando un GLB low-poly). La frontera entre registros DEBE ser visible — la misma disciplina que rige la entrada y salida del píxel (§2.4).

#### 2.8.2 El Velo como semilla del template [CANON — decisión de dirección, 5.0.0 · implementación pendiente]

Decisión de Oráculo (2026-08-18): las organizaciones generadas por el NWOS que no aporten evidencia de marca no arrancan neutras — arrancan con **sabor Velo**. Implementación recomendada: el Velo se distribuye como **tema** (`theme/velo.tokens.json` en el mould) que `nwos-deploy` instala cuando los slots S1–S3 resuelven a `[DEFAULT]`; **el contrato del template no cambia** — la doctrina de contrato congelado + valores variables queda intacta y el Velo es la primera skin de la galería, no una mutación del mould. `[ORACLE — confirmar tema vs. defaults]`. Nota de frontera: el tema Velo usa alfas sobre los canónicos de la casa; es deliberado — el sabor por defecto **es** ADN de Numen, y la organización que derive su propio sistema lo reemplaza entero.

---

## 3. Color

### 3.1 Paleta canónica [CANON]

| Hex | Nombre | Hilo | Papel |
|---|---|---|---|
| `#A6DAD5` | **Verdemar** | Solar | Confirmación, calma, tintes de superficie |
| `#018EA1` | **Turquesa** | Cyber | Interacción: enlaces, foco, acentos (el relleno de acción es su sombra `#017C8D`, §9.1) |
| `#EFA517` | **Ámbar** | Solar | Énfasis, valor, logro; el sol del escarabajo |
| `#F9EBDC` | **Arena** | Solar | Neutral principal |
| `#F35059` | **Coral** | Cyber | Aviso, tiempo real; destello, nunca ambiente |
| `#D33440` | **Grana** | — | Crítico, gravedad |

### 3.2 Neutrales [EXTENSIÓN]

**Nocturno** (pantalla, por defecto): fondo `#14110F` Noche · superficie `#1E1A17` Basalto · elevada `#292420` Bronce oscuro · líneas `#241F1B` / `#3A332D` · texto `#F9EBDC` (16.1:1) / `#C4B5A6` (9.6:1) / `#8A7D72` Ceniza (4.7:1).
**Diurno** (impreso, documento largo): papel `#F9EBDC` · superficie `#FDF6EE` · línea `#E2D3C2` · tinta `#14110F` (15.8:1) / `#4A423B` (8.6:1) / `#6E6259` (5.1:1).

**Regla del terciario [aprendido auditando]:** los contrastes de esta tabla son contra el **fondo base**. El terciario Nocturno cae a 4.3:1 sobre superficie y 3.8:1 sobre elevada: **dentro de superficies, el mínimo es el secundario**; el terciario vive solo sobre fondo base.

**Tintes semánticos Diurno** [DERIVADO — fórmula canónica: 12 % del acento sobre papel]: confirmación `#EFE9DB` · aviso `#F8D8CC` · crítico `#F4D5C9` · interactivo `#DBE0D5` — todos con tinta ≥13.6:1 encima. Para bandas de estado en documentos y producto claro. Sustituyen al antiguo tinte `#E4F2F0`, retirado por huérfano y por ser la única nota fría-clínica del Diurno.

### 3.3 Variantes de texto sobre claro [DERIVADO]

Los canónicos son colores de *mood*; sobre Arena, como texto, se usa la variante: Turquesa→`#016E7D` (5.1:1) · Grana→`#B02330` (5.8:1) · Ámbar→`#7A5100` (6.0:1) · **Verdemar→`#1F6B5F` (5.4:1)** — el éxito por fin puede escribirse sobre claro. **Coral no tiene variante y es decisión, no descuido:** un coral-texto sería gemelo perceptual del grana-texto y rompería la separación aviso/crítico. El aviso sobre claro se compone por regla: chip de relleno Coral con tinta Noche, o icono + texto en tinta.

### 3.4 Semántica y reglas [DERIVADO]

Interactivo→Turquesa · Éxito→Verdemar · Énfasis/logro→Ámbar · Aviso/tiempo real→Coral · Error→Grana. **Enlaces** [decisión escrita, antes accidente]: en Nocturno, Verdemar (12.2:1 — el Turquesa queda al límite como texto corrido); en Diurno, turquesa-texto `#016E7D`. **Regla de interacción sobre rellenos con texto claro: al interactuar se oscurece, nunca se aclara** — aclarar destruye el contraste justo cuando el usuario mira. Máximo **tres** colores por composición contando el neutral (las capas de datos §3.5–3.6 no cuentan: son codificación). **Coral y Grana no conviven.** El Ámbar es el sol, no el cielo: enfatiza, no cubre. Nada significa solo por color. Texto 4.5:1; grande y componentes 3:1.

### 3.5 Paletas categóricas de proyecto [DERIVADO]

Primero los seis canónicos; después variantes de luminosidad; nunca hues ajenos. Toda categoría lleva **nombre + símbolo + color**, los tres siempre. **Única excepción de hue en todo el sistema:** el azul raro y el morado épico de la escala de rareza (§3.6) — existen precisamente para leerse como categorías de juego y no como voz corporativa, viven solo donde vive la rareza, y ningún proyecto puede invocarlos como precedente.

### 3.6 Escala de rareza [CANON — decisión de dirección]

Capa categórica para juego y producto (objetos, recompensas, Cartas de Navegación, activos digitales). Convención MMO que cualquier jugador reconoce sin manual, afinada a esta paleta y verificada:

| Rareza | Nocturno | vs Noche | Texto en Diurno | vs Arena | Coherencia |
|---|---|---|---|---|---|
| **Pobre** | `#F9EBDC` | 16.1 | `#6E6259` | 5.1 | = Arena: lo pobre es el papel |
| **Común** | `#8A7D72` | 4.7 | `#5A4F45` | 6.8 | = Ceniza, la neutral existente |
| **Poco común** | `#8FC46B` | 9.2 | `#356C19` | 5.4 | Verde cálido, hermano de Verdemar |
| **Raro** | `#5D9BD6` | 6.4 | `#2E6BB0` | 4.7 | Azul templado, distinto del Turquesa interactivo |
| **Épico** | `#A98BE0` | 6.7 | `#6B44B8` | 5.7 | Morado suavizado al mundo cálido |
| **Legendario** | `#EFA517` | 9.0 | `#7A5100` | 6.0 | **= Ámbar**: lo legendario y el logro son el mismo sol |

**Por qué el color nunca va solo, con nombre y apellidos:** bajo protanopia y deuteranopia, épico y raro colapsan — el morado pierde su rojo y queda a un paso del azul (verificado por simulación). El borde progresivo y el nombre escrito no son cortesía: son el canal que sigue funcionando cuando el color falla.

Reglas: escala completa y en orden, sin peldaños inventados. **Tratamiento progresivo además del color**: pobre/común borde `linea.tenue`; poco común/raro borde de su color al 40 %; épico borde pleno; legendario borde pleno + halo `0 0 12px rgba(239,165,23,.25)` — **el único glow del sistema**. Nombre escrito en `type.etiqueta` la primera vez por vista. Vive en producto y juego; NUNCA en comunicación corporativa: un precio no es épico y un plazo no es legendario.

### 3.7 Paleta Píxel-16 · el índice del registro píxel [CANON — decisión de dirección]

Dieciséis colores, **cero hexes nuevos**: siete neutrales, los seis de marca y tres sombras ya definidas, más el verde de rareza. Todo sprite y toda escena píxel DEBE limitarse a este índice.

| Nº | Hex | Nombre | Origen | Papel en píxel |
|---|---|---|---|---|
| 01 | `#14110F` | Noche | nocturno.fondo-base | Fondo, contorno de sprite |
| 02 | `#1E1A17` | Basalto | nocturno.superficie | Sombra profunda |
| 03 | `#292420` | Bronce oscuro | nocturno.elevada | Sombra |
| 04 | `#3A332D` | Bronce | nocturno.linea-fuerte | Sombra media, metal |
| 05 | `#8A7D72` | Ceniza | nocturno.terciario | Gris de trabajo |
| 06 | `#C4B5A6` | Arena velada | nocturno.secundario | Luz media |
| 07 | `#F9EBDC` | Arena | marca | Luz, brillo, sprite base |
| 08 | `#A6DAD5` | Verdemar | marca | Acento solar |
| 09 | `#018EA1` | Turquesa | marca | Acento cyber |
| 10 | `#016E7D` | Turquesa profunda | texto-sobre-claro | Sombra de 09 |
| 11 | `#EFA517` | Ámbar | marca | Oro, logro, sol |
| 12 | `#7A5100` | Ámbar tostado | texto-sobre-claro | Sombra de 11 |
| 13 | `#F35059` | Coral | marca | Señal viva |
| 14 | `#D33440` | Grana | marca | Rojo profundo — **solo relleno** |
| 15 | `#B02330` | Grana profunda | texto-sobre-claro | Sombra de 14 |
| 16 | `#8FC46B` | Verde | rareza.poco-comun | Naturaleza, el jardín solarpunk |

**Dominancia:** ≥ 60 % de la superficie en los neutrales 01–07. **Subconjunto de diálogo** (texto píxel sobre Noche, ≥ 4.5:1 verificado): Arena 16.1 · Verdemar 12.2 · Arena velada 9.4 · Verde 9.2 · Ámbar 9.0 · Coral 5.5 · Turquesa 4.8 · Ceniza 4.7. **Grana queda fuera del diálogo** (3.9:1): relleno sí, texto jamás.

#### 3.7.1 Rampas funcionales [EXTENSIÓN — validar]

La paleta es única, pero se trabaja por **rampas compartidas**. Una rampa no añade colores: ordena los existentes para que materiales distintos parezcan pertenecer al mismo mundo.

| Rampa | Colores disponibles | Uso principal |
|---|---|---|
| **Neutral mecánica** | Noche · Basalto · Bronce oscuro · Bronce · Ceniza · Arena velada · Arena | estructura, piedra, metal, ropa, volumen general |
| **Solar** | Ámbar tostado · Ámbar · Arena | sol, recompensa, latón iluminado, punto de valor |
| **Señal fría** | Turquesa profunda · Turquesa · Verdemar | interacción, energía, vidrio, tecnología al servicio de la vida |
| **Señal cálida** | Grana profunda · Grana · Coral | daño, alarma y tiempo real; Coral y Grana siguen sin convivir en una composición |
| **Jardín** | Verde · Verdemar · Arena | vegetación y materia viva |

Cada material DEBERÍA resolverse con **2–4 colores** de una o dos rampas. Compartir una sombra o una luz entre materiales cohesiona la escena y conserva el carácter limitado de los gráficos de los 90.

#### 3.7.2 Clústeres, tramado y transiciones [EXTENSIÓN — validar]

- El volumen se construye primero con áreas planas. El tramado NO sustituye una rampa mal elegida.
- Solo se permite el damero de **dos colores adyacentes de una misma rampa**, como ya fija §2.4. Se usa para transición de material, niebla o superficie amplia; nunca para «crear» un color de marca nuevo.
- NO se trama el contorno exterior, la tipografía, los ojos, los iconos de inventario ni los objetos que deban encontrarse rápido.
- El damero mantiene un patrón estable. Cambiar el patrón sin razón produce ruido y parpadeo al animar.
- Las bandas de color visibles son válidas y preferibles a un degradado suavizado. No se aplica *blur*, antialias ni transparencia intermedia para esconderlas.

#### 3.7.3 Cambio de paleta [EXTENSIÓN — validar]

La rotación o sustitución de índices —recurso clásico para agua, luz y señales— PUEDE utilizarse como optimización, pero **no crea una décima animación**. Solo implementa una animación ya autorizada: barrido de señal (§10.1-03), fase de progreso (§10.1-06) o pulso legendario (§10.1-05). Mantiene geometría y contraste, respeta `prefers-reduced-motion` y no altera el color del texto de lectura.

### 3.8 Paleta de datos [CANON — decisión de dirección]

Los informes de inteligencia son producto: las gráficas tienen color canónico. Como las rampas, esta paleta **no añade hexes: ordena los existentes**.

| Serie | Orden categórico | Verificación sobre Noche (objeto gráfico ≥3:1) |
|---|---|---|
| 1–6 | **Turquesa → Ámbar → Verdemar → Grana → Verde → Ceniza** | 4.8 · 9.0 · 12.2 · 3.9 · 9.2 · 4.7 ✓ |

**Secuencial** (magnitud): Noche → Turquesa profunda → Turquesa → Verdemar → Arena. **Divergente** (dos polos): Grana ↔ Ceniza ↔ Turquesa. Reglas: máximo **6 series** por gráfica (más series = otra gráfica); cada serie con etiqueta directa o leyenda, nunca solo color; en Diurno, las series usan sus variantes de texto donde existan y las líneas engordan a 2 px; la rareza (§3.6) jamás colorea datos — un dato no es épico.

---

## 4. Tipografía

### 4.1 La familia [CANON]

**Geist** y **Geist Mono** — la fuente de Vercel ([vercel.com/font](https://vercel.com/font)) — en toda la organización. Simplicidad, minimalismo, velocidad; herencia suiza (así la declara el Brand & Culture). SIL OFL 1.1; cobertura latina completa. Fallbacks: `'Inter','Aptos','Segoe UI',Arial,sans-serif` / `'Consolas','Courier New',monospace`.

**Distribución.** DEBE autoalojarse en producción: variable woff2 (`Geist-Variable.woff2` 56 KB, `GeistMono-Variable.woff2` 58 KB, en `/assets/fonts/` con su licencia), `font-display: swap`. Origen: paquete npm `geist`. CDN solo para prototipos.

### 4.2 El contraste sans / mono [DERIVADO]

**Sans para lo que se afirma, Mono para lo que se mide.** Titulares, cuerpo e interfaz en Sans; cifras, coordenadas, etiquetas, código y lore técnico en Mono. El monoespaciado *es* la máquina: resuelve el steampunk sin tipografías temáticas.

### 4.3 Escala [EXTENSIÓN]

Escala 1.200, base 16 px; pt para lienzo 1920×1080: `display.xl` 4.300rem/50pt · `display.l` 3.583/42 · `display.m` 2.986/34 · `titulo.l` 2.488/28 · `titulo.m` 2.074/24 · `titulo.s` 1.728/20 · `cuerpo.l` 1.440/17 · `cuerpo.m` 1/14 · `cuerpo.s` 0.875/12 · `etiqueta` 0.750/11 (Mono 500, versales, tracking `+0.10em`) · `dato.xl` 2.986 Mono 500 · `dato.m` 1 Mono 400. Pesos display 500, títulos 600; tracking display `-0.03/-0.02em`.

### 4.4 Composición

Interlínea 1.1 display / 1.55 cuerpo / 1.35 datos. Medida 60–75 caracteres, máx. 90. Sentence case salvo etiquetas. Énfasis con peso 600 o Ámbar; cursiva solo citas y lore. Cifras siempre Mono tabular. Un nivel de display por pieza. Viudas prohibidas en titulares.

### 4.5 Tipografía píxel [CANON — decisión de dirección]

En el registro píxel, la voz de display y diálogo es **Pixelify Sans** (Stefie Justprince, SIL OFL 1.1, Google Fonts) — proporcional y de caja baja amable, lo más cercano con licencia libre al espíritu de los diálogos SCUMM. Las fuentes originales de Monkey Island, DOTT y La Abadía son **propietarias**: se citan como herencia, no se usan ni se imitan píxel a píxel.

Reglas: autoalojada (`PixelifySans-Variable.woff2`, 22 KB, con su OFL en `/assets/fonts/`); tamaños en **múltiplos exactos** de su rejilla (22, 33, 44 px…), sin subpíxel; solo para diálogo, titulares de escena y HUD — **el cuerpo largo sigue siendo Geist** incluso dentro del registro; el texto de diálogo lleva contorno de 1 px en Noche sobre escenas activas y colorea por hablante (§3.7); nunca en nivel III ni en Diurno impreso.

#### 4.5.1 Composición del texto en escena [EXTENSIÓN — validar]

- Pixelify Sans se renderiza sin falso bold, falso italic, contorno suavizado ni transformaciones CSS. El peso se elige en la fuente; no se simula.
- El diálogo se presenta sobre una superficie sólida `nocturno.fondo-superficie` o `fondo-elevada`, con borde Noche cuando la escena permanece visible. Si se superpone directamente a la imagen, aplica el velo canónico antes del texto.
- El nombre de hablante usa Pixelify y el color aprobado; el cuerpo breve PUEDE usar Pixelify. Explicaciones, ayuda, accesibilidad y texto largo pasan a Geist para conservar legibilidad.
- Las líneas NO DEBEN forzarse con espacios. Los saltos se deciden por unidad de sentido y se prueban en el ancho mínimo de la interfaz.
- El cursor de bloque acompaña al tecleo y se retira al terminar. No se deja parpadeando junto a texto ya finalizado.
- El texto se compone sobre coordenadas enteras. Escala, `line-height`, traslación y caja NO DEBEN producir medias posiciones de píxel.

### 4.6 La tercera voz — la serif que narra [EXTENSIÓN — validar · ORACLE]

Sans afirma, Mono mide, **la serif narra**. El códex en producción ya la usa — colofón vivo: *«Compuesto en Alegreya con el Sistema»*. **Alegreya** (Juan Pablo del Peral, Huerta Tipográfica, SIL OFL 1.1) entra **entera**, porque el códex ya usa las tres cortes — auditado en el repositorio de producción:

| Corte | Archivo | Papel en el libro |
|---|---|---|
| Redonda variable | `Alegreya-Variable.woff2` | Cuerpo de lectura larga |
| Itálica variable | `Alegreya-Italic-Variable.woff2` | Apertura literaria, citas, epígrafes, términos del glosario |
| **Small caps** (400/500) | `AlegreyaSC-{Regular,Medium}.woff2` | **Capitular**, títulos de capítulo, versalitas de sección |

La **small caps es la pieza que faltaba registrar**: no es un efecto tipográfico simulado (`font-variant` sintético queda prohibido, como el falso bold de Pixelify en §4.5), es un corte propio con sus formas dibujadas. Voz **exclusiva del libro** (superficie Libro · códex, §13.12); autoalojada con su OFL en `/assets/fonts/`, pendiente de entrar al kit en el rearmado v5. **Jamás** en interfaz, deck (la guarda de legado §13.3 sigue intacta), documento corporativo ni factura. Hasta la firma del Oráculo, su uso queda acotado al LAP ya publicado.

---

## 5. Espacio, retícula, forma

**Espaciado** base 4 px: `4·8·12·16·24·32·48·64·96·128` (`space.100–1000`); todo hueco DEBE ser de la escala.
**Retículas**: web ≤1280 / 12 col / margen 64 / medianil 24; tablet 8/40/24; móvil 4/20/16; diapositiva 1920×1080 / 12 / 120 / 32; A4 12 / 20 mm / 5 mm. Baseline 8 (4 mm impreso). Ritmo: secciones `s900` web · `s800` deck; bloques `s700`; titular→cuerpo `s400`; tarjeta `s500`.
**Forma [CANON — decisión de dirección, 4.0.0]**: dos radios y nada más — **control `6px`** (botones, campos, chips, toggles) y **marco `8px`** (tarjetas, paneles, diálogos, lienzos, bandas de estado). Cálido sin moda: el marco se redondea un poco; el contenido dentro no hereda radio propio. Círculo solo en marcadores, avatares y pegatinas; la píldora es cápsula. **El registro píxel conserva los cantos rectos** (el píxel no se curva) y las tablas impresas también. Bordes 1 px.
**Elevación**: en Nocturno sin sombras — escalón de superficie + hairline (`base→superficie→elevada`); única excepción el halo legendario. En Diurno una sola sombra `0 1px 2px rgba(20,17,15,.08), 0 8px 24px rgba(20,17,15,.06)`.
**Foco**: `outline: 2px solid #018EA1; offset 2px`, visible siempre, sin animación. No negociable.

### 5.1 Retícula interna del registro píxel [EXTENSIÓN — validar]

La retícula web organiza la página; la retícula píxel organiza el contenido dentro de la escena. No se mezclan.

- Posición, escala, recorte y origen de cada sprite usan números enteros. `translate`, zoom de cámara y desplazamiento que generen subpíxel están prohibidos.
- Cuando el viewport no admite una escala entera, la escena reduce al múltiplo inferior y completa el espacio restante con Noche. No se estira para llenar.
- El filtrado es `nearest-neighbor`; en web, `image-rendering: pixelated`. Se desactivan suavizado y mipmaps cuando el motor pueda alterar el píxel a escala de juego.
- Todos los fotogramas de una animación comparten celda, origen y caja de ocupación. El cambio de pose ocurre dentro de la celda, no moviendo accidentalmente el lienzo.
- El HUD y la caja de diálogo PUEDEN pertenecer al registro píxel; navegación, formularios, ayudas extensas y controles del producto siguen el sistema vectorial del Sistema. La frontera entre ambos registros DEBE ser visible.
- La prueba se realiza en tres vistas: ×1 para decisión, una escala entera de presentación y el viewport mínimo soportado. Si falla en ×1, no se corrige ampliando.

---

## 6. Materia · texturas [CANON — decisión de dirección]

Dos texturas, los dos estados de la máquina: la señal (lo que fluye) y el circuito (por donde fluye).

### 6.1 La señal — binaria

`0100110001100101…` degradando a `xxxxxx…`, Geist Mono `cuerpo.s`, color `linea.fuerte`, tracking `.15em`. Es texto real, no imagen. Uso: separador de sección.

**La binaria habla [CANON — decisión de dirección].** La señal no es ruido: **codifica una frase del canon en ASCII de 8 bits por carácter**, seguida del sedimento de `x`. Quien decodifique el separador encuentra la promesa — el huevo de pascua de la casa, muy de los Registros Akáshicos: todo deja huella. Frase vigente:

> **«Leave things better than we found them.»** — 39 caracteres, 312 bits.

```
010011000110010101100001011101100110010100100000011101000110100001101001011011100110011101110011001000000110001001100101011101000111010001100101011100100010000001110100011010000110000101101110001000000111011101100101001000000110011001101111011101010110111001100100001000000111010001101000011001010110110100101110
```

Reglas: la cadena se **copia** de aquí o de `§19.3 → binaria.bits` (o se genera con el kit §13.1) — no se inventa ruido nuevo; el sedimento `x` va **después** de completar el mensaje (la señal termina de hablar y luego sedimenta); el separador sigue siendo decorativo (`aria-hidden`), el mensaje es para quien mira el código; los recortes visuales por ancho no importan — el DOM lleva siempre la frase entera. Las frases futuras del huevo de pascua se añaden aquí con su versión.

### 6.2 El circuito — relieve

Derivado del **normal map canónico** (`textura-circuito-normal.png`, 4096², panel greeble: la II Revolución Industrial encontrándose con lo digital, literal). Derivados entregados:

| Activo | Formato | Peso | Uso | Distribución |
|---|---|---|---|---|
| `textura-circuito-normal.png` | PNG 4096² | 9.5 MB | Material 3D (canal normal PBR, Three.js — el stack de Numinia) | **materiales** |
| `textura-relieve-nocturno-768.webp` | WebP 768² | 14 KB | **CSS**: fondos Nocturno, horneado al 5.5 % | kit |
| `textura-relieve-nocturno.png` | PNG 1536² | 683 KB | Alta calidad: portadas, impresión de pantalla, OG | kit |
| `textura-relieve-alpha.webp` | WebP 1536² RGBA | 695 KB | Líneas Arena sobre transparente, para hornear derivados | **materiales** |

**Dos paquetes, una razón:** el **kit** lleva lo que un repositorio web necesita en producción (~1,5 MB); los **materiales** (normal 4096² y alpha de horneado, ~10 MB) viajan aparte, al repositorio de 3D y diseño — el material pesado no se muda a cada web.

```css
.hero { background: var(--fondo-base) url("textura-relieve-nocturno-768.webp") center/cover; }
```

**Dónde sí:** fondo de hero Nocturno, portadas de deck, OG images, bandas separadoras anchas, materiales 3D.
**Dónde no:** en Diurno (el papel es papel); en tarjetas, modales y toda superficie elevada (van lisas); detrás de lectura larga; por encima del **6 %** de visibilidad; como relleno de botones o iconos; en `repeat` directo (**no tesela** — verificado; usar `cover` o espejar).
La textura NO DEBE bajar el contraste efectivo del texto de AA; el horneado entregado mantiene ≥15:1 contra Arena.

### 6.3 La pátina de época [EXTENSIÓN — validar]

Semilla de la dirección de fotografía e ilustración: toda imagen se trata hacia **una** de las tres décadas, sin abandonar el mundo cálido ni el velo (§6.2). Tres pátinas:

| Pátina | Década | Tratamiento | Acento permitido |
|---|---|---|---|
| **Bronce** | 1920 | Duotono cálido Noche→Bronce/Arena velada; grano fino visible; contraste suave de plata antigua | Ámbar (una fuente de luz) |
| **Señal** | 2020 | Velo Noche pleno; contraste duro; un único destello frío puntual (pantalla, letrero, luz) | Turquesa o Coral (uno, nunca ambos) |
| **Jardín** | 2120 | Luz natural cálida de mañana; verdes vivos; aire y respiración; el velo PUEDE aligerarse a `.60` si no hay texto encima | Verdemar y Verde |

Reglas: una pátina por pieza; la pátina no cambia la paleta — la interpreta; retratos de personas siempre en Bronce o Jardín (la Señal deshumaniza); con texto encima, el velo vuelve a `.72` sea cual sea la pátina. Pendiente de validar con seis fotografías reales — entonces ascenderá a dirección completa.

### 6.5 El gramaje — el grano del papel [CANON — decisión de dirección, 5.0.0]

El códex en producción demuestra la cuarta materia, y es la del Diurno: **el grano**. Ruido fractal generado (`feTurbulence` `fractalNoise`, `baseFrequency 0.85`, `numOctaves 3`, teñido a `rgba(74,64,51,.045)` por matriz de color), fijo en el fondo, en un SVG embebido de 240² — sin descarga, sin imagen.

**Por qué no contradice al §6.2.** Aquella regla —«nada de textura en Diurno»— prohíbe el **relieve de circuito** sobre el papel: la máquina no se imprime. El grano no es una textura *aplicada* al papel: **es** el papel. Reglas: máximo **5 %** de intensidad; solo capa de fondo, `position: fixed`, `pointer-events: none`; nunca en superficies elevadas ni bajo tablas de datos; en Nocturno el mismo grano **baja a la mitad** (el papel de noche es el mismo papel con menos luz); no se combina con relieve ni con rejilla del Velo — el papel no tiene circuito ni Akasha.

Con esto, las materias son cuatro y cada una tiene su mundo: **la señal separa, el circuito da cuerpo, la atmósfera da profundidad, el grano da papel.**

### 6.4 La atmósfera — el Velo como materia [CANON — decisión de dirección, 5.0.0]

El §6 tenía dos texturas: la señal (lo que fluye) y el circuito (por donde fluye). La 5.0.0 nombra la tercera: **la atmósfera** — la rejilla y la niebla del Velo (§2.7), el medio donde lo descubierto se ordena. Las tres se reparten el fondo Nocturno —y el grano (§6.5) toma el Diurno—: **la señal separa, el circuito da cuerpo, la atmósfera da profundidad, el grano da papel.** Convivencia: reglas duras en §2.7 (una domina por vista; niebla sobre relieve a media alfa; rejilla y relieve no conviven). En Diurno no existe ninguna de las tres: el papel es papel.

---

## 7. Iconografía · Phosphor [CANON — decisión de dirección]

Sistema único: **[Phosphor Icons](https://phosphoricons.com)** — Helena Zhang y Tobias Fried, MIT, ~1.500 glifos × 6 pesos, rejilla 256, disponible como SVG, fuente web, React, Vue y Figma. Encaja porque su trazo geométrico de terminación redondeada es la misma construcción de los wordmarks, y porque seis pesos permiten una **regla** en lugar de una elección estética por icono.

### 7.1 Pesos

`regular` **por defecto** (16–40 px) · `fill` estado activo o alcanzado · `bold` en < 16 px · `light` ilustrativo en ≥ 48 px · **`thin` prohibido** (desaparece sobre Noche) · **`duotone` prohibido** (rompe la disciplina plana).

### 7.2 Uso

**Sí:** acción, objeto y navegación, con etiqueta de texto en el primer uso por pieza; un concepto = un icono en todo el sistema; heredan `currentColor` y solo toman acento cuando el texto adyacente lo toma.
**No:** como viñetas decorativas; mezclar pesos en una misma fila de interfaz; recolorearlos fuera del sistema; usarlos sin significado.
Icono a medida solo si Phosphor no cubre el concepto; se dibuja en su rejilla y se propone aquí como extensión. **El escarabajo y la Luna no son iconos: son marcas** — las fases del marcador de secuencia se construyen como glifo geométrico propio, no con `moon` de Phosphor.

### 7.3 Implementación

**El subconjunto de la casa [CANON — auditado en producción, 5.0.0].** De los ~1.500 glifos de Phosphor, la organización usa **veintiséis**, autoalojados en `packages/ui/src/icons/` y servidos como SVG inline con `currentColor`. Este es el vocabulario, no una muestra del catálogo ajeno: `archive · bell · book-open · caret-down · caret-left · chart-bar · download-simple · flame · flame-light · gear · github-logo · globe-hemisphere-west · globe-hemisphere-west-light · house · magnifying-glass · moon · moon-stars · music-notes · package · sign-out · sun · sword · sword-light · user · users · x-logo`. Ampliarlo es una decisión, no un descuido: un icono nuevo entra al subconjunto con su concepto declarado.

### 7.4 El conmutador de modo [CANON — decisión de dirección, 5.0.0]

El par `moon-stars` / `sun` es una pieza, no dos iconos sueltos. **Regla dura: el icono muestra el modo al que lleva un toque, no el modo en el que se está** — la luna con estrellas invita al Nocturno, el sol invita al Diurno. Solo uno visible a la vez, en `regular` 20 px, entre los utilitarios de la barra (§13.2). Comportamiento canonizado desde producción: mientras nadie elige, la página **sigue al sistema operativo** y cambia con él al anochecer; una elección explícita termina el seguimiento y se recuerda; la preferencia se aplica **antes de pintar** para que la página no parpadee. El estado se escribe en el documento como `data-modo`, y su **ausencia significa Nocturno** — el modo claro se declara siempre de forma explícita.

### 7.5 Los iconos del libro [EXTENSIÓN — validar]

El registro papel tiene su propio juego, **de trazo y no de masa**: rejilla `16`, `stroke 1.5`, terminación redonda, sin relleno. Piezas en producción: índice, marcapáginas, narrador, pausa, sol, luna, umbral (chevron) y el **filete** —el glifo hexagonal con tres nodos que separa las secciones del libro—. No compiten con Phosphor ni lo sustituyen: viven dentro del registro, igual que el píxel tiene su propia iconografía dentro del suyo (§9.6). Fuera del libro, manda Phosphor.

En producción, **subconjunto autoalojado** (SVG inline o sprite), como hace la propia guía `index.html`. Para prototipos: `@phosphor-icons/web` en npm/unpkg. Fuente de los SVG oficiales: `github.com/phosphor-icons/core` (`assets/{peso}/{nombre}[-{peso}].svg`).

---

## 8. Marca y activos [CANON]

### 8.1 Inventario (todos normalizados a `fill="currentColor"`, en `/assets/`)

| Archivo | Qué es | viewBox | Uso canónico |
|---|---|---|---|
| `Khepri_Logo.svg` | Isotipo: el escarabajo | 75.44×75.53 | Cierre, favicon, avatar, sello |
| `Khepri_NG_Logo.svg` | Isotipo + NG | 75.44×75.53 | Compacto con atribución |
| `NG_Logo.svg` | Monograma | 113.37×50.29 | < 120 px de ancho |
| `Numen_Games_Horizontal_Word.svg` | Wordmark horizontal | 382.79×28.09 | **Firma principal** |
| `Numen_Games_Vertical_Word.svg` | Wordmark apilado | 180.74×73.25 | Formatos cuadrados/verticales |
| `Numen_Word.svg` | «numen» | 180.74×28.09 | Cuando «games» es evidente |
| `Numinia_Word.svg` | El mundo | 194.25×28.01 | **Solo** piezas de Numinia |
| `pixel/khepri-sprite-24.png` | Sprite canónico del escarabajo | 24×24 px | Registro píxel; única traducción píxel de la marca |
| `pixel/moneda-12.png` | Moneda de Ámbar (corregida a rampa Solar) | 12×12 px | Objeto de ejemplo del registro; tokens, recompensas |
| `pixel/moneda-giro-12x4.png` | Hoja de giro de la moneda | 48×12 px · 4 fotogramas | Ciclo canónico de referencia: 200 ms · steps(4) · volumen estable |
| `pixel/cartografo-24.png` | El Cartógrafo | 24×24 px | Personaje de referencia del pipeline §13.9; estatus [EXTENSIÓN — validar] |
| `pixel/guia/` | Pares didácticos cómo sí / cómo no | 16×16 px ×1 y ×8 | Material de la guía de producción; no son activos de juego |
| `fonts/PixelifySans-Variable.woff2` | Tipografía píxel | variable 400–700 | Diálogo y display del registro píxel |
| `marca/glifo-space.svg` | Glifo *space* (la n del wordmark) | 31×29 | Juego de marca §8.5: el espacio, el territorio |
| `marca/glifo-people.svg` | Glifo *people* (n + punto) | 31×39 | Juego de marca §8.5: la persona |
| `marca/glifo-connect.svg` | Glifo *connect* (la ɑ final) | 29×29 | Juego de marca §8.5: la conexión |

Selección: horizontal por defecto → vertical en cuadrado → NG bajo 120 px → isotipo para cierre/avatar. `Numinia_Word` jamás firma comunicación corporativa.

### 8.2 Cómo sí

Arena sobre Nocturno, Noche sobre Diurno — **la firma no tiene versión en color**; el color sobre la marca existe, pero vive en otro registro: el juego de marca (§8.5). Área de respeto = altura de la «n» por los cuatro lados. Mínimos: wordmark 24 px / 12 mm; isotipo-favicon 16 px. Sobre imagen: velo `rgba(20,17,15,.72)` mínimo. Sobre la textura de circuito: solo dentro de una **zona de calma** (área lisa equivalente al doble del área de respeto).

### 8.3 Cómo no

NO recolorear a acentos (la marca no compite con la señal) · NO rotar ni inclinar · NO sombras, degradados ni relieves · NO deformar proporciones · NO encerrar en formas ajenas · NO sobre fondo activo sin velo · NO `Numinia_Word` firmando lo corporativo · **NO redibujar el escarabajo**: el path canónico (abajo) es el único válido — sustituye cualquier reconstrucción previa. Única excepción cerrada: el sprite píxel canónico de §2.4, que tampoco se redibuja — se usa el entregado.

### 8.4 Isotipo canónico (referencia embebida)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.44 75.53" fill="currentColor">
<path d="M75.44,48.41v-6.01c0-7.43-2.44-12.51-6.61-15.5,3.83-2.74,6.21-7.23,6.58-13.69h0V0h-15.86v7.92h8.44v5.29h-.01c-.58,7.07-4.65,10.37-11.02,10.37h0s-.79,0-.79,0c-.91-11.22-8.07-16.29-18.43-16.29s-17.51,5.07-18.43,16.29h-.8c-6.37,0-10.44-3.3-11.02-10.37h-.01v-5.29h8.44V0H.03v13.22h0c.37,6.46,2.75,10.96,6.58,13.69-4.17,2.99-6.61,8.06-6.61,15.5v6.01h7.43v-6.01c0-8.32,4.21-12.17,11.1-12.17h0s.66,0,.66,0v13.83c0,2.48.28,4.7.79,6.67h-1.51C7.91,50.73.68,56.02,0,67.71h0v7.81h23.14v-7.8H7.45c.58-7.07,4.65-10.37,11.02-10.37h4.91c3.26,3.74,8.24,5.51,14.34,5.51s11.09-1.77,14.34-5.51h4.91c6.37,0,10.44,3.3,11.02,10.37h-15.7v7.8h23.14v-7.81h0c-.68-11.7-7.9-16.98-18.46-16.98h-1.51c.52-1.97.79-4.19.79-6.67v-13.83h.66c6.89,0,11.1,3.85,11.1,12.17v6.01h7.43ZM37.72,13.91c6.21,0,10.22,3.13,10.97,9.83-4.62.66-8.39,2.55-10.94,5.81-2.56-3.28-6.35-5.16-10.99-5.82.74-6.69,4.76-9.82,10.97-9.82ZM26.62,44.07v-13.54c4.67,1.22,7.41,5.02,7.41,11.73v13.55c-4.67-1.22-7.41-5.02-7.41-11.73ZM48.82,44.07c0,6.68-2.72,10.48-7.35,11.72v-13.53c0-6.68,2.72-10.48,7.35-11.71v10.73h0v2.79Z"/>
<path d="M46.18,7.36c-.57-4.16-4.14-7.36-8.46-7.36s-7.89,3.2-8.46,7.36c2.55-.77,5.39-1.15,8.46-1.15s5.91.38,8.46,1.15Z"/>
</svg>
```

### 8.5 El juego de marca [CANON — decisión de dirección]

La firma es monocroma y solemne; el **juego** es de color y expresivo. Son dos registros de la misma marca, con frontera dura: el juego vive en el mundo y en lo expresivo — piezas de Numinia, evento, redes, pegatinas, telones, portadas internas, merchandising —; la firma vive en lo corporativo — facturas, propuestas, cabeceras legales, firma de web y documento. **Una pieza corporativa con la marca en color es un error de registro, no una variante.**

**Los tres glifos · space · people · connect.** Nacen de las letras reales del wordmark: *space* es la **n** (el arco, el portal, el territorio), *people* es la **n con un punto** del grosor exacto del trazo (la persona), *connect* es la **ɑ** final (el lazo que une). Son el servicio de Numen contado en tres formas: diseñamos espacios, para personas, que conectan. Activos canónicos en `assets/marca/glifo-{space,people,connect}.svg`, normalizados a `currentColor`.

Reglas de los glifos: se usan **los tres juntos y en ese orden** cuando cuentan el modelo (portada, cierre de deck expresivo, telón), o **sueltos como marcador conceptual** de su dimensión (territorios → space, roles → people, conexiones → connect); llevan su etiqueta en Mono minúscula la primera vez por pieza; un solo color de tinta por composición, de la paleta; no se recolorean por partes, no se rotan, no se mezclan con Phosphor en la misma fila — son marca, no iconos.

**El mosaico de escarabajos.** El isotipo PUEDE repetirse en secuencia tomando colores de la paleta (Grana, Ámbar, Verdemar, Turquesa…) sobre campo de paleta — el escarabajo multiplicándose es el renacimiento hecho patrón. Usos: portadas expresivas, cabeceras de redes, pegatinas, telones de evento. Cada escarabajo un solo color pleno; sin degradados, sombras ni rotaciones; ritmo de repetición regular.

**El wordmark en color.** En registro expresivo, el wordmark PUEDE componer color-sobre-color con pares de paleta. Pares aprobados de partida: Turquesa/Arena · Arena/Ámbar · Ámbar/Turquesa · Arena/Coral · Grana/Arena. Regla de contraste: como pieza decorativa dentro de una composición mayor, libre; cuando la marca es el **único identificador** de la pieza (una pegatina, un avatar), el par DEBE dar ≥ 3:1.

*Variante observada en exploraciones:* el wordmark con punto sobre la primera n («la ciudad son sus gentes») queda registrada como [EXTENSIÓN — validar] a la espera de activo oficial; hasta entonces no se usa.

---

## 9. Componentes [EXTENSIÓN]

Todos demostrados en vivo en `index.html`.

### 9.1 Botones

| Tipo | Estilo | Cuándo |
|---|---|---|
| **Primario** | Fondo de acción `#017C8D`, texto blanco | La acción principal. **Uno por vista**. En Plataforma, el primario es tinta (§13.11) |
| **Fantasma** | Transparente, borde `linea.fuerte`; hover borde+texto Verdemar | Acción secundaria |
| **Silencioso** | Solo texto Verdemar, subrayado al hover | Acción terciaria |
| **Destructivo** | Fondo Grana, texto blanco | Irreversible. **Confirmación obligatoria. Nunca junto al primario** |

Especificación: radio `control` (6 px), padding `10×24`, altura M 40 px / S 32 px, peso 500. **Relleno de acción `#017C8D`** (blanco encima 4.9:1 — el Turquesa canónico `#018EA1` daba 3.9 y queda para iconos, enlaces y acentos). Estados [corregido en 3.6.0 — la interacción **oscurece**]: hover `#016E7D` (=turquesa-texto, 5.95), active `#015866` (8.1), disabled `superficie` + texto secundario + `not-allowed`, cargando con **puntos de espera** (§10) y ancho bloqueado. El destructivo arrastraba el mismo bug: su hover es ahora `#B02330` (=grana-texto, 6.7), nunca `#E04450`. Icono opcional a la izquierda, 16 px, `gap s200`, mismo color. La etiqueta es un **verbo que dice exactamente lo que ocurre** y conserva el nombre en todo el flujo. Nunca versales.

### 9.2 Píldoras de estado

Mono `cuerpo.s`, radio `control`, punto de 8 px en `currentColor`, borde del color al 40 %. Mapeo semántico §3.4. Siempre con texto: el punto nunca va solo.

### 9.3 Campo de entrada

Fondo `base`, borde `linea.fuerte`, radio `control`, padding `10×16`; etiqueta encima en `type.etiqueta`; placeholder en terciario (nunca como sustituto de la etiqueta); foco = outline Turquesa del sistema; error = borde Grana + mensaje que explica qué pasó y cómo seguir.

### 9.4 Tarjeta

Fondo `superficie`, borde `linea.tenue`, radio `marco` (8 px), padding `s500`, **sin textura** (y sin sombra en Nocturno; en Diurno, la sombra del §5); hover PUEDE subir un escalón de superficie (§10, elevación). Titular `titulo.s`, cuerpo `cuerpo.s` en secundario.

### 9.5 Dato / KPI

Cifra en Mono tabular `dato.xl`, etiqueta en `type.etiqueta` terciario debajo. El color de la cifra sigue la semántica (§3.4). Fondo `base` con borde: el dato es una sonda, no una tarjeta.

### 9.6 Componentes del registro píxel [EXTENSIÓN — validar]

Estos componentes viven **dentro de una escena o experiencia píxel**. No sustituyen los componentes corporativos de §9.1–9.5.

| Componente | Construcción | Regla de uso |
|---|---|---|
| **Caja de diálogo** | superficie Basalto o Bronce oscuro, borde 1 px Noche, texto Pixelify, hablante en color aprobado | una voz por bloque; lectura completa disponible antes o después del tecleo |
| **Retrato** | rejilla `24×24` o módulo `48×48`, silueta clara, mismo sentido de luz que la escena | acompaña a una conversación; no sustituye el nombre del hablante |
| **Ranura de inventario** | objeto `12×12`, marco recto `linea-fuerte`, nombre visible en foco o selección | estado seleccionado = borde Turquesa + etiqueta; no solo cambio de color |
| **HUD breve** | icono `12×12`, fondo liso; números en **Geist Mono si el dato persiste** (contadores, tiempo, recursos) y en **Pixelify si es diegético** (daño flotante, botín, voz del mundo) | solo estado necesario durante la acción; nada ornamental; las dos voces no se mezclan en el mismo indicador |
| **Logro / insignia** | rejilla `12×12` o `24×24`, rareza escrita y tratamiento §3.6 | el halo legendario sigue siendo el único glow |

El foco del sistema (`2 px` Turquesa, offset `2 px`) permanece vectorial y visible incluso alrededor de un componente píxel. La accesibilidad tiene precedencia sobre la fidelidad histórica.

### 9.9 Componentes del libro [EXTENSIÓN — auditados en producción]

La carpintería editorial del códex. Viven **dentro del registro papel** (§13.12) y no sustituyen a los componentes de §9.1–9.5.

| Componente | Construcción | Regla de uso |
|---|---|---|
| **Barra del libro** | 54 px, fondo del papel al 88 % + `blur(10px)`, hairline inferior; al leer **cede a 40 px** y esconde etiquetas y el control A·A·A | **Nunca desaparece**: marcapáginas, índice y narrador quedan siempre a un toque; la acción principal conserva su nombre — jamás se reduce a una flecha críptica |
| **Capitular** | primera letra del capítulo en small caps a `4.4em`, flotada, color de estructura | Una por capítulo y solo en el primer párrafo; se retira en fichas imprimibles |
| **Cuadro de lectura** | papel profundo, borde 1 px + filo solar de 3 px a la izquierda, radio `0 10px 10px 0`, etiqueta `LECTURA` cabalgando el borde superior | Cita larga, regla de mesa o aparte del autor; en cursiva, texto secundario |
| **Lámina** | marco `marco`, hueco con tramado diagonal cuando la ilustración aún no existe, pie con descripción + ficha técnica en Mono | El hueco **se muestra**, no se disimula: un libro en obra lo dice |
| **Tabla numerada** | `caption` en Mono versales («Tabla I · …»), cabecera en estructura, primera columna en cursiva, filas con hairline | La tabla del libro no es la de producto (§13.11): aquí manda la lectura, no la densidad |
| **Nota al margen** | columna lateral de 200–220 px desde `1200 px`; por debajo, baja al pie del párrafo | **Nunca duplicada**: o margen, o pie. Llamada en Mono, superíndice en color interactivo |
| **Filete** | glifo hexagonal centrado entre dos degradados de 96 px | Separador de secciones del libro; sustituye a la binaria dentro del papel |
| **Sello del Umbral** | disco de 100 px, borde de estructura, halo `0 0 12px rgba(239,165,23,.25)` y degradado radial interior | El **único** uso del halo legendario fuera de la rareza: marca la frontera de sesión, no un objeto |
| **Glosario** | `dt` en small caps cursiva sobre estructura + `dd` con la definición y su fuente; el término al que se llega desde un capítulo se marca con filo solar | **Las definiciones salen solo del texto del manual y cada una cita su fuente**: un glosario que inventa deja de ser glosario |
| **Término en el cuerpo** | subrayado punteado en estructura, `text-underline-offset 3px`; al hover pasa a sólido e interactivo | Dice «esto está definido» sin robarle el color a la prosa; no se usa para enlaces normales |
| **Tarjeta de descarga** | marco, formato en Mono versales sobre estructura + una frase de por qué | Las tres siempre juntas (.md, pdf, epub): el libro viaja libre o no viaja |
| **Colofón** | binaria **de barras** (la palabra en bits, cada bit una barra de 5×12; el uno en estructura), sello circular, autoría, licencia y firma | Cierra el libro; la binaria de barras es la variante impresa de §6.1 — el mensaje sigue siendo texto real en el marcado |

### 9.7 Mensajes al usuario [CANON — decisión de dirección]

Cómo habla la interfaz cuando pasa algo. Plantilla universal: **qué pasó + qué hacer**, en nivel I, sin drama y sin disculpa vacía. El error mudo («Algo salió mal», sin causa ni salida) está PROHIBIDO.

| Pieza | Cuándo | Anatomía | Reglas duras |
|---|---|---|---|
| **Aviso (toast)** | resultado de una acción o suceso del sistema | superficie elevada, radio `marco`, borde izquierdo 2 px del color semántico (§3.4), una frase (título opcional), cierre silencioso | inferior derecha (si la luna de progreso ocupa la esquina, apila encima); auto-cierre 6 s, pausado al hover; máx. 3 apilados; entra con revelado 02; `aria-live="polite"` — `assertive` solo crítico |
| **Tooltip** | aclarar un control; nunca contener lo esencial | una línea `cuerpo.s`, radio `control`; **habla en el modo contrario**: Arena/Noche en Nocturno, Noche/Arena en Diurno | retardo 400 ms (0 al encadenar); también en foco de teclado; en táctil no existe — la etiqueta visible manda |
| **Consejo (tip)** | ayuda contextual descartable | tarjeta `marco` con icono `light` + eyebrow CONSEJO + una frase | descartado no vuelve; máximo uno por vista; jamás bloquea |
| **Error de carga** | un recurso no llega | estado vacío: icono `light` 48 px + qué pasó + **una** acción (Reintentar, fantasma) | no culpa al usuario; sin tecleo — el error no es teatro; si la causa se conoce, se dice |
| **Validación de campo** | dato inválido | mensaje bajo el campo: qué pasó y cómo corregirlo (§9.3) | nunca solo color; al enviar, el foco va al primer campo con error |
| **Confirmación destructiva** | antes de lo irreversible | diálogo mínimo `marco`: verbo en el título, consecuencia en una frase, [Cancelar fantasma] [Verbo destructivo] | el destructivo nunca preenfocado; Esc cancela; el verbo se repite, no «Aceptar» |

### 9.8 Controles de formulario y piezas de producto [CANON — decisión de dirección]

La carpintería que faltaba, unificada por una sola regla: **lo activo se viste de tinta** — casilla marcada, interruptor encendido, opción elegida, página actual y fila activa usan la misma píldora/relleno de tinta (Noche sobre claro, Arena sobre oscuro) que el sidebar de la Plataforma. Simétrico entre modos, 16:1, cero decisiones por control. Las transiciones de estado (≤ `120 ms`) son estados, no piezas del catálogo §10.

| Control | Especificación | Reglas duras |
|---|---|---|
| **Casilla** | 18×18, radio `control`, borde `linea.fuerte`; marcada = fondo tinta + check en papel; indeterminada = guion | etiqueta a la derecha, siempre clicable; error según §9.3 |
| **Opción (radio)** | círculo 18, punto interior 8 en tinta | grupo con leyenda visible; nunca una opción sola |
| **Interruptor** | cápsula 36×20, disco 14; apagado = superficie + disco secundario; encendido = tinta + disco papel | siempre con etiqueta; el estado también se lee por posición; para acciones inmediatas (no sustituye a la casilla en formularios que se envían) |
| **Selector** | cerrado = campo §9.3 + `caret-down` regular 16; abierto = panel `elevada`, radio `marco`, sombra §5 en Diurno; opciones en filas de 40 px; **elegida = píldora tinta/papel** | teclado completo (flechas, Enter, Esc, escritura salta); máx. 7 visibles + scroll; el nativo PUEDE en formularios simples y DEBERÍA en móvil |
| **Diálogo modal** | **velo canónico `rgba(20,17,15,.72)`** — la misma pieza que protege la marca sobre imagen; panel `elevada`, radio `marco`, 480 px (confirmación) / 640 (contenido); entra con revelado 02 | foco atrapado y primer foco en el control seguro; Esc cierra; el fondo no scrollea; la confirmación destructiva sigue §9.7 |
| **Paginación** | Mono; `‹ 1 2 … 9 ›`; **actual = píldora tinta/papel**; táctil 44 | siempre informa el total («3 de 9» en `etiqueta`); «Cargar más» PUEDE en flujos continuos |
| **Barra de progreso** | 4 px, cápsula; pista `linea.fuerte`, **relleno de tinta**; SIEMPRE con cifra Mono al lado | **solo con porcentaje real conocido** — la indeterminada está prohibida: para eso existen la luna (§10.1-06) y los puntos (07). Variante expresiva [EXTENSIÓN — validar]: la binaria llenándose — bits reemplazando sedimento |

**Regla de selección del progreso:** ¿secuencia discreta o lectura? luna. ¿Espera corta sin medida? puntos. ¿Porcentaje real? barra. Tres formas, cero ambigüedad.

**Matiz Velo (5.0.0):** en superficies del registro Velo, el modal PUEDE entrar por **cristalización** (§10.1-11) en lugar de revelado 02; el velo de fondo sigue siendo `velo.imagen` canónico y las reglas de foco no cambian. En el Umbral, el modal no cambia.

---

## 10. Movimiento y animación [CANON — decisión de dirección]

El tecleo —la bandera— tiene **doble herencia de época**: es la máquina de escribir de 1920 y la terminal de 2020 a la vez; por eso es el movimiento más numiniano del catálogo. Principios (de *Curiosity*): nada se mueve donde el usuario actúa; el contenido se revela donde el usuario descubre; **un solo momento orquestado por pieza**; con `prefers-reduced-motion` todo aparece al instante (se conserva la opacidad, se elimina el desplazamiento); el movimiento no bloquea el scroll. Curva por defecto `cubic-bezier(.2,0,0,1)`.

### 10.1 El catálogo — catorce animaciones, y ninguna más

| # | Animación | Especificación | Dónde sí | Dónde no |
|---|---|---|---|---|
| **01** | **Tecleo** — la bandera [CANON]: texto letra a letra con cursor de bloque, herencia de las aventuras gráficas y terminales de los 90 | `22 ms/carácter`, lineal; cursor de bloque en Ámbar | Titulares hero, revelaciones de lore (nivel II), cargas de producto | Cuerpo largo, interfaz funcional, nivel III, impreso |
| 02 | Revelado por avance | `320 ms` · ciclo; opacidad + 8 px de ascenso, al entrar en viewport, una vez | Contenido al descubrirse | Controles; re-disparo en scroll |
| 03 | Barrido de señal | `8 s` lineal infinito; banda Turquesa recorriendo la binaria | **Máximo uno por vista** — la dosis cyber ambiental | Varios a la vez; sobre texto de lectura |
| 04 | Elevación | `120 ms` · ciclo; sube un escalón de superficie, **sin desplazamiento** | Hover de superficies | Cualquier movimiento de posición |
| 05 | Pulso legendario | `2.4 s` ease-in-out **× 2**; el halo respira | Solo el momento de obtención; después, halo estático | Loop ambiental; otros elementos |
| 06 | Fase lunar | **Carga [cadencia corregida en 5.0.0]**: ciclo completo de las **ocho fases** —cuartos incluidos— a `1.400 ms`/fase con fundido ≤ `240 ms` (una vuelta ≈ 11,2 s). A 900 ms los cuartos no se llegaban a leer: **una fase que no da tiempo a reconocerse no es una fase**. La forma se calcula —limbo fijo + terminador elíptico—, no se conmutan dibujos sueltos: así la luna crece de verdad. **Progreso real y lectura**: solo fases crecientes, de nueva a llena — terminar es luna llena | Cargas largas, progreso de secuencia real, avance de lectura de un documento largo (la propia guía lo demuestra) | Esperas < 2 s; ciclo completo en progreso (menguar al avanzar confunde) |
| 07 | Puntos de espera | `900 ms` · steps(3); `Cargando···` | Botones cargando | Texto corriente |
| 08 | Cursor de bloque | `1 s` · steps(2) | Acompañando al tecleo o a un campo activo | Suelto, decorativo |
| 09 | Momento orquestado | Tecleo del titular + revelados escalonados a `80 ms` | La entrada de la pieza — uno por pieza | Repetido; en cada sección |
| **10** | **Afloramiento** — el conocimiento sale de la niebla [5.0.0] | `560 ms` · ciclo; opacidad 0→1 + `blur(8px)→0` + 8 px de ascenso; al entrar en viewport, una vez | Registro Velo: archivo, Summa, fichas al abrirse, revelaciones | Interfaz funcional; listas largas (el revelado 02 basta); Diurno; Umbral corporativo |
| **11** | **Cristalización** — el cristal se materializa [5.0.0] | `320 ms` · ciclo; `backdrop-blur 0→12px` + borde 0→50 % + opacidad | Paneles y modales del Velo (§9.8) | Fuera del Velo; sobre fondos sin atmósfera |
| **12** | **Paso de página** — el códex pasa hoja [5.0.0 · EXTENSIÓN] | `320 ms` · ciclo; deslizamiento horizontal corto + fundido — specs exactas por verificar contra el código del LAP (`numinia.com/lap/codex`) | Navegación entre capítulos del papel vivo (§13.12) | Navegación de interfaz general; scroll |
| **13** | **Trazo** — las esquinas se dibujan solas [5.0.0 · en producción] | `1.6 s` · ease · `stroke-dashoffset: 340 → 0`; cuatro marcos de grabado escalonados a `120 ms` | Portada de libro y apertura de capítulo (§13.12) — **es** el momento orquestado de esa vista | Interfaz; re-disparo en scroll; junto a otro momento orquestado |
| **14** | **Cielo** — el fondo del Velo respira [5.0.0 · en producción] | Deriva de `±0.06 px`/fotograma con reaparición por el lado opuesto + alfa oscilando entre `.05` y `.85` a ritmo propio (`.002–.006`) | Fondo del registro Velo (§2.7.1) — **única excepción sancionada** al veto de loops ambientales | Sobre lectura larga; con parallax; reaccionando al cursor o al scroll |

Las tres primeras piezas de la 5.0.0 (10–12) son **transiciones, no loops** y **no inventan duraciones**: reutilizan `duration.largo` (560) y `duration.medio` (320). El **trazo** (13) llega medido desde producción con `1.6 s` propios — es la única duración nueva del catálogo, y se justifica porque dibujar cuatro esquinas más rápido las convierte en un parpadeo. El **cielo** (14) es la única excepción sancionada al veto de loops ambientales del §10.2: se autoriza porque es **fondo del registro**, no ornamento de una vista — y por eso no reacciona a nada. La **luna de lectura** del códex no es animación nueva: es la fase lunar (06) demostrada en producción. 10–12 pertenecen al registro Velo y al papel vivo; el catálogo 01–09 sirve a Umbral y Velo por igual. El momento orquestado sigue siendo **uno por pieza**. Con `prefers-reduced-motion`, afloramiento y cristalización aparecen al instante: se conserva la opacidad, se eliminan blur y desplazamiento.

### 10.2 Prohibido siempre

*Enmienda 5.0.0: el cielo del Velo (§10.1-14) es la única excepción sancionada al veto de loops ambientales; sigue prohibido cualquier otro.*

Parallax. **Glitch** (tentador con el cyber al 20 %: rompe la calma solar y la accesibilidad). Loops ambientales fuera del barrido. Animar el color del texto de lectura. Animar el foco. Autoplay con sonido.

### 10.3 Referencia de implementación del tecleo

El texto completo DEBE estar en el DOM antes de animarse (SEO y accesibilidad): se fija `aria-label` con el contenido íntegro, se vacían los nodos de texto conservando el marcado, se escriben a `22 ms` con el cursor `▌` siguiendo la escritura, y al terminar se retira cursor y `aria-label`. Sin JS o con movimiento reducido: el texto simplemente está.

### 10.4 Animación de sprites [EXTENSIÓN — validar]

La animación interna de un sprite es contenido del registro píxel, no una décima animación de interfaz. Se limita a acciones narrativas o de juego y NO autoriza movimiento del layout, botones o superficies.

- **Dos fotogramas:** alternancia de gesto, chispa, indicador o movimiento mínimo. Los extremos deben ser distintos y legibles.
- **Cuatro fotogramas:** ciclo de marcha o acción sencilla. Orden recomendado para locomoción: contacto · paso · contacto opuesto · paso opuesto.
- **Cadencia:** usa duraciones ya existentes: `120 ms` por fotograma para acciones rápidas, `200 ms` para locomoción y gestos, `320 ms` para revelaciones deliberadas. No se inventa una duración por sprite.
- **Pose clave primero:** se dibujan las poses de mayor lectura antes de los intermedios. Si un ciclo no se entiende con las poses clave, añadir fotogramas no lo arregla.
- **Sin interpolación:** no hay *tweening*, desenfoque de movimiento, rotación suavizada ni desplazamiento subpíxel. El movimiento ocurre en saltos enteros y las poses cargan con la sensación de peso.
- **Volumen estable:** cabeza, torso y masa principal conservan tamaño. El contorno solo cambia cuando la acción lo exige; el temblor involuntario invalida el ciclo.
- **Loops con causa:** marcha mientras el personaje camina, máquina mientras opera, señal mientras comunica. Un personaje inmóvil no necesita respirar eternamente; la quietud también es una decisión.
- **Movimiento reducido:** se muestra la pose de mayor información, se completan estados funcionales al instante y se detienen ciclos decorativos.

La rotación de paleta de §3.7.3 y los ciclos de sprite no pueden competir en la misma zona focal: un solo momento orquestado por pieza sigue siendo la regla.

---

## 11. Identidad verbal

**Voz [CANON]:** cultivada, llana y clara; precisión con un toque de fantasía; sin tecnicismos hasta alcanzar al receptor. Líneas: *Precision meets playfulness* · *Building Bridges, Not Walls* · *Innovation with a human touch*.

**Tres niveles [CANON] — REGLA DURA:** cada pieza declara su nivel y lo mantiene. **I Coloquial** (comunidad, jerga tech/web3): redes, producto, interfaz. **II Literario** (lore): home, portadas, evento, campañas. **III Técnico** (fundamento): documentación, propuesta, contrato. Un contrato con lore no se firma; una home con KPIs no convoca.

**Ejemplos de registro (sí / no):**
- **Nivel I** — Sí: «Elige tu rol y entra. Dos minutos y estás dentro.» · No: «Proceda a seleccionar su arquetipo participativo.» (burocracia disfrazada)
- **Nivel II** — Sí: «El Ágora recuerda a quienes preguntan.» · No: «Nuestra plataforma optimiza el networking.» (vende, no narra)
- **Nivel III** — Sí: «El sistema de roles reduce el coste de iniciar conversación; medimos conexiones con seguimiento a 7 días.» · No: «Los Oráculos invocarán tus KPIs.» (lore en documento técnico)

**Mensajes clave [CANON]** (se eligen por espacio, no se reescriben): 15 palabras *Empower and transform organizational culture with engaging experiences that foster fun and drive impactful social change* · 11 *Foster organizational transformation and social change through engaging, fun experiences* · 8 *Cultivate fun, transformative experiences for organizational and social change* · 7 *Create fun, drive social change in organizations*.

**Léxico interno [CANON]:** Oráculos · Numinianos · Dark Councils · Public Domain Day.

**Léxico de época** — palabras que huelen a su década, para teñir el nivel II sin disfrazarlo: **1920** cenáculo · iniciados · registros · bronce · expedición · mecanismo · correspondencia. **2020** señal · invocación · terminal · red · destello · latido. **2120** jardín · cosecha · ágora plena · luz de mañana · florecer. Se usan como especias, no como plato: dos o tres por pieza bastan.

**Léxico del mundo Numinia [CANON — fuente: Presentación Numinia v0.6.0]** — el vocabulario propio del nivel II; en nivel III se cita, no se narra. **Numinia**: la ciudad para el conocimiento, proyectada sobre un tablero de juego. **El Ágora**: su centro y lugar de convergencia. **Los cuatro distritos**: Vitruvian (educación) · Sycamore (arte) · Solomon (organización) · Ouroboros (juego). **Los Registros Akáshicos**: la memoria viva donde toda contribución deja huella. **El Velo**: la piel simbólica que sostiene la ciudad — la zona del Akasha donde vive el Summa y donde el conocimiento se ordena al descubrirse. **El Umbral**: la frontera que cualquiera puede cruzar; tras él, los corredores de niebla llevan al Archivo. **La génesis**: cinco iniciados encabezados por **Holberins**; la ciudad física ardió en 1920 y renació un siglo después, invocada por los Oráculos. **Numínido**: todo lo que participa de la identidad de Numinia — no es un origen, es una forma de pertenecer. **Identidades**: las Especies responden a ¿quién eres?, los Gremios a ¿qué sabes?, las Facciones a ¿qué persigues?; las agrupaciones son Logias, Ligas y Hermandades. **Rituales**: Dark Council (deliberar, decidir) y Lunar Coven (imaginar, narrar, construir). Regla: estos nombres se escriben siempre así, no se traducen ni se les inventan parientes; su desarrollo completo vive en la Presentación Numinia, no aquí — esta cápsula existe para que ninguna pieza de nivel II hable del mundo con vocabulario inventado.

**Interfaz [DERIVADO]:** voz activa; el control dice exactamente qué ocurre y conserva el nombre en el flujo; el error explica qué pasó y cómo seguir, sin disculpa y sin vaguedad; la pantalla vacía invita a actuar; específico antes que ingenioso.

**Archivos [CANON]:** `AAAA_MM_DD-Nombre_Del_Documento-vX.Y.Z.ext`, sin espacios ni acentos.

---

## 12. Accesibilidad · *Equable*

**WCAG 2.2 AA** (EN 301 549, obligación legal UE). Contraste 4.5:1 / 3:1. Foco visible siempre. Teclado en orden lógico. Nada solo por color — rareza incluida. Táctil 44×44. Alternativa textual en imagen informativa. `prefers-reduced-motion` respetado (§10). En evento: señalética legible a 10 m sin depender del color; instrucciones también en nivel I.

---

## 13. Recetas de aplicación

Cada medio tiene su **plano**: la regla en una línea, el esqueleto normativo y un ejemplo trabajado. La estructura de los planos no se improvisa; el contenido, sí. El kit de §13.1 es el punto de partida obligatorio de toda pieza HTML.

### 13.1 Kit de arranque (CSS y JS canónicos) [CANON — decisión de dirección]

Base de toda web y documento HTML. Se **copia tal cual** — reescribirlo de memoria produce deriva de tokens. Rutas relativas a `/assets/`. Distribución: el kit incluye `kit/sistema.css` y `kit/sistema.js` **generados de estos bloques al empaquetar** — enlázalos o cópialos; editar los archivos sin tocar este § es deriva.

```css
/* Sistema de Diseño v5.0.0 · kit de arranque */
@font-face{font-family:'Geist';src:url('assets/fonts/Geist-Variable.woff2') format('woff2');font-weight:100 900;font-display:swap}
@font-face{font-family:'Geist Mono';src:url('assets/fonts/GeistMono-Variable.woff2') format('woff2');font-weight:100 900;font-display:swap}
:root{
  --verdemar:#A6DAD5;--turquesa:#018EA1;--ambar:#EFA517;--arena:#F9EBDC;--coral:#F35059;--grana:#D33440;
  --fondo:#14110F;--superficie:#1E1A17;--elevada:#292420;--linea:#241F1B;--linea-f:#3A332D;
  --texto:#F9EBDC;--texto-2:#C4B5A6;--texto-3:#8A7D72;
  --sans:'Geist',system-ui,'Segoe UI',Arial,sans-serif;--mono:'Geist Mono','Consolas',monospace;
  --s1:4px;--s2:8px;--s3:12px;--s4:16px;--s5:24px;--s6:32px;--s7:48px;--s8:64px;--s9:96px;--s10:128px;
  --radio-control:6px;--radio-marco:8px;--ciclo:cubic-bezier(.2,0,0,1);
  --interactivo-fondo:#017C8D;--interactivo-hover:#016E7D;--interactivo-activo:#015866;
  --enlace:#A6DAD5;
  --tinte-confirmacion:#EFE9DB;--tinte-aviso:#F8D8CC;--tinte-critico:#F4D5C9;--tinte-interactivo:#DBE0D5
}
/* Diurno: documentos, o forzado con data-modo */
[data-modo="diurno"]{--fondo:#F9EBDC;--superficie:#FDF6EE;--elevada:#FDF6EE;--linea:#E2D3C2;--linea-f:#E2D3C2;
  --texto:#14110F;--texto-2:#4A423B;--texto-3:#6E6259;--turquesa:#016E7D;--grana:#B02330;--ambar:#7A5100;
  --enlace:#016E7D;--verdemar:#1F6B5F}
@media print{:root{--fondo:#F9EBDC;--superficie:#FDF6EE;--elevada:#FDF6EE;--linea:#E2D3C2;--linea-f:#E2D3C2;
  --texto:#14110F;--texto-2:#4A423B;--texto-3:#6E6259;--turquesa:#016E7D;--grana:#B02330;--ambar:#7A5100}
  body{print-color-adjust:exact;-webkit-print-color-adjust:exact}}
*{box-sizing:border-box}
body{margin:0;background:var(--fondo);color:var(--texto);font-family:var(--sans);font-size:1rem;line-height:1.55}
:focus-visible{outline:2px solid #018EA1;outline-offset:2px}
a{color:var(--enlace)}
h1,h2,h3{font-weight:600;letter-spacing:-.02em;line-height:1.1;margin:0 0 var(--s4)}
h1{font-size:2.986rem;font-weight:500}
.etiqueta{font-family:var(--mono);font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ambar)}
.mono{font-family:var(--mono);font-variant-numeric:tabular-nums}
.binaria{font-family:var(--mono);font-size:.875rem;color:var(--linea-f);letter-spacing:.15em;white-space:nowrap;overflow:hidden;user-select:none}
.tarjeta{background:var(--superficie);border:1px solid var(--linea);padding:var(--s5);border-radius:var(--radio-marco)}
.btn{font:500 1rem var(--sans);min-height:40px;padding:10px var(--s6);border-radius:var(--radio-control);border:1px solid transparent;
  cursor:pointer;display:inline-flex;align-items:center;gap:var(--s2);transition:background 120ms var(--ciclo),border-color 120ms var(--ciclo)}
.btn-primario{background:var(--interactivo-fondo);color:#fff}.btn-primario:hover{background:var(--interactivo-hover)}.btn-primario:active{background:var(--interactivo-activo)}
.btn-fantasma{background:transparent;border-color:var(--linea-f);color:var(--texto)}.btn-fantasma:hover{border-color:var(--verdemar);color:var(--verdemar)}
.btn-silencioso{background:transparent;color:var(--verdemar);padding-inline:var(--s2)}
.btn-destructivo{background:#D33440;color:#fff}.btn-destructivo:hover{background:#B02330}
.btn:disabled{background:var(--superficie);border-color:var(--linea);color:var(--texto-2);cursor:not-allowed}
/* Mensajes §9.7 */
.aviso{position:fixed;right:var(--s5);bottom:var(--s5);max-width:360px;background:var(--elevada);border:1px solid var(--linea);border-left:2px solid var(--turquesa);border-radius:var(--radio-marco);padding:var(--s3) var(--s4);box-shadow:0 1px 2px rgba(20,17,15,.08),0 8px 24px rgba(20,17,15,.06)}
.aviso[data-tono="exito"]{border-left-color:var(--verdemar)}
.aviso[data-tono="aviso"]{border-left-color:#F35059}
.aviso[data-tono="critico"]{border-left-color:var(--grana)}
[data-tip]{position:relative}
[data-tip]:hover::after,[data-tip]:focus-visible::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);white-space:nowrap;font-size:.875rem;padding:4px 10px;border-radius:var(--radio-control);background:var(--texto);color:var(--fondo);transition-delay:400ms}
@media(prefers-reduced-motion:no-preference){
  .reveal{opacity:0;transform:translateY(8px);transition:opacity 320ms var(--ciclo),transform 320ms var(--ciclo)}
  .reveal.visible{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.001ms!important;transition-duration:.001ms!important}}
```

```js
/* Sistema · tecleo (01) y revelado (02), implementación de referencia accesible */
const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
function tecleo(el, ms = 22){
  if (rm) return;                                   // reduce: el texto simplemente está
  el.setAttribute('aria-label', el.textContent);    // lectura íntegra desde el inicio
  const nodos = [];
  (function walk(n){ [...n.childNodes].forEach(c => {
    if (c.nodeType === 3){ nodos.push({node:c, text:c.nodeValue}); c.nodeValue=''; } else walk(c);
  }); })(el);
  const cur = Object.assign(document.createElement('span'),
    {className:'cursor', style:'display:inline-block;width:.55em;height:1em;background:var(--ambar);animation:parpadeo 1s steps(2,start) infinite'});
  cur.setAttribute('aria-hidden','true'); el.appendChild(cur);
  let i=0, j=0;
  (function paso(){
    if (i >= nodos.length){ setTimeout(()=>{cur.remove(); el.removeAttribute('aria-label');}, 900); return; }
    const n = nodos[i];
    if (j < n.text.length){ n.node.nodeValue += n.text[j++]; el.appendChild(cur); setTimeout(paso, ms); }
    else { i++; j=0; paso(); }
  })();
}
if (!rm && 'IntersectionObserver' in window){
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  }), {rootMargin:'0px 0px -10% 0px'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
```

La animación de parpadeo del cursor: `@keyframes parpadeo{50%{opacity:0}}`.

El generador de la binaria (§6.1) — cualquier frase del canon, en señal:

```js
/* Sistema · binaria(frase) → bits + sedimento (§6.1) */
const binaria = (frase, sed = 60) =>
  [...frase].map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('') + 'x'.repeat(sed);
// binaria('Leave things better than we found them.')
```

### 13.2 Web

Nocturno, 12 col ≤1280 px, hero = tesis con relieve al fondo y tecleo del titular (el momento orquestado); nivel II en home, I/III en internas; LCP < 2.5 s, < 1 MB inicial; fuentes e iconos autoalojados.

**Esqueleto del hero** (anotado; único momento orquestado de la pieza):

```html
<section class="hero"><!-- background: var(--fondo) url(assets/textura-relieve-nocturno-768.webp) center/cover -->
  <div class="marca"><!-- isotipo del escarabajo 44px + wordmark 20px, ambos en var(--arena) --></div>
  <h1 data-tecleo>La tesis en una frase, con <span style="color:var(--ambar)">una palabra</span> en Ámbar.</h1>
  <p class="sub"><!-- cuerpo.l, texto-2, máx 56ch, nivel II --></p>
  <a class="btn btn-primario" href="#"><!-- verbo exacto; ÚNICO primario de la vista --></a>
  <div class="binaria" aria-hidden="true">0100110001100101…xxxx</div><!-- la frase del canon en 8 bits: §6.1 · binaria() del kit -->
</section>
```

Secciones siguientes: `eyebrow` → `h2` → prosa/tarjetas con `.reveal`; un `barrido` de señal como máximo por vista.

**El menú** (web y plataforma pública): barra superior de una línea — wordmark a la izquierda; **≤5 entradas** en Mono `type.etiqueta` mayúsculas; utilitarios a la derecha (idioma, modo, GitHub/X) como iconos Phosphor `regular` 20 px; entrada activa con subrayado de 2 px en Ámbar; en móvil, panel a pantalla completa con las mismas entradas y nada más. El menú es piel, no arquitectura: qué entradas existen lo decide cada producto.

### 13.3 Presentación

1920×1080, Nocturno, márgenes 120 px; una idea por diapositiva; máx. 4 tarjetas; separadores binarios; cierre = contacto + pasos + escarabajo. **Guarda de legado:** el display del deck es **Geist 500** — la serif de presentaciones anteriores (incluida la Presentación Numinia v0.6.0) es legado fuera de sistema y NO DEBE imitarse al generar diapositivas nuevas.

**Planos de diapositiva** (rejilla 12 col; medidas en px del lienzo):

```
PORTADA                                CONTENIDO + IMAGEN (el patrón de la casa)
┌──────────────────────────────┐      ┌───────────────────────────────────────┐
│         (retícula 6%)        │      │ EYEBROW MONO ÁMBAR        ┌──────────┐│
│                              │      │ Título display.m          │ imagen   ││
│        [wordmark]            │      │                           │ velo .72 ││
│   Subtítulo cuerpo.l ámbar   │      │ Cuerpo cuerpo.m/l         │ [icono   ││
│   Presentado por … texto-2   │      │ máx 58ch, texto-2         │  light   ││
│                              │      │                           │  ≥48px]  ││
└──────────────────────────────┘      └───────────────────────────┴──────────┘

TARJETAS (máx. 4)                      CIERRE
┌──────────────────────────────┐      ┌───────────────────────────────────────┐
│ EYEBROW · Título display.m   │      │ EYEBROW pregunta · Título CTA         │
│ Entradilla                   │      │ [personas: foto b/n + cargo + mono]   │
│ ┌─────┐ ┌─────┐ ┌─────┐      │      │                                       │
│ │icono│ │icono│ │icono│      │      │   Frase de marca con better en Ámbar  │
│ │ h3  │ │ h3  │ │ h3  │      │      │            [escarabajo]               │
│ └─────┘ └─────┘ └─────┘      │      └───────────────────────────────────────┘
└──────────────────────────────┘
```

La imagen lleva **siempre** el velo `rgba(20,17,15,.72)` como mínimo; el icono fantasma superior derecho es Phosphor `light` en `texto-3` y PUEDE omitirse.

### 13.4 Documento y factura

Diurno, A4, nivel III, sin textura; cifras Mono tabular; pie `AAAA_MM · Confidencial`; la propuesta cierra con alcance, total sin IVA y tres pasos numerados. **Ritmo compacto** [aprendido produciendo]: en A4 el ritmo de sección es `s500` y el interior `s300–s400` — el `s700` es ritmo de pantalla y desborda el papel. Una factura DEBE caber en una página; plantilla canónica en `plantillas/2026_08_03-Plantilla_Factura-v1.0.0.html`, con el total como única cifra display en Ámbar tostado y `page-break-inside: avoid` en filas y pie.

**Orden de bloques de la factura** (el esqueleto que la plantilla implementa):

```
[wordmark 22px, tinta]……………………[«Factura» 19pt · nº en mono ámbar-texto]
[EMISOR | CLIENTE]           ← dos columnas, borde superior 1px tinta
[fecha · vencimiento · referencia]   ← banda en superficie FDF6EE
[tabla: CONCEPTO (con detalle en 9pt) | CANT | PRECIO | IMPORTE]
[base imponible / IVA / TOTAL]       ← derecha, 72mm; TOTAL única cifra display
[forma de pago | IBAN]               ← banda en superficie
[legal 8pt terciario]
[escarabajo 26px]…………………………[id de documento en mono 8pt]
```

### 13.5 Evento físico

Credencial en Diurno legible a 1,5 m; distintivos con nombre+símbolo+color; señalética legible a 10 m sin depender del color; soportes reutilizables, tintas de bajo consumo.

### 13.6 Producto e interfaz

Nocturno por defecto, nivel I, Turquesa para lo interactivo, Phosphor por peso (§7.1), rareza (§3.6) donde haya objetos y recompensas.

### 13.7 3D y metaverso

Normal map canónico como material PBR (Three.js); Ámbar como luz cálida clave, Turquesa como relleno frío; los objetos llevan su rareza en material + etiqueta, nunca solo emisivo.

### 13.8 Correo

Cuerpo en nivel I o III, texto plano o HTML mínimo; sin imágenes decorativas. **Firma:** nombre en Sans 600 · cargo en terciario · contacto en Mono, cada dato en su línea; sin logotipo como imagen adjunta (el wordmark solo si el cliente de correo lo soporta inline); un único enlace en color, el resto en tinta.

### 13.9 Pipeline de producción de una escena píxel [EXTENSIÓN — validar]

*El plano en una línea:* Nocturno, nivel II; índice Píxel-16 con dominancia neutral ≥60 %; sprites a rejilla 24/12/48 con contorno Noche; Pixelify a múltiplos; diálogo tecleado y coloreado por hablante; escalado entero con `pixelated`; se entra y se sale del registro por completo.

1. **Declarar función y nivel.** Escribir qué debe comprender, descubrir o hacer la persona; confirmar que el nivel II está justificado.
2. **Elegir la rejilla.** Asignar `12×12`, `24×24` y módulos `48×48` antes de dibujar. Inventariar activos y estados.
3. **Miniatura de masas.** Componer fondo, plano de juego, primer plano y foco solo con neutrales. Verificar la dosis 40/40/20 entrecerrando los ojos.
4. **Siluetas.** Resolver personajes y objetos interactivos en un color. Probar dirección, pose y jerarquía a ×1.
5. **Valores y luz.** Añadir sombra, cuerpo y luz desde arriba-izquierda; bloquear sombras proyectadas antes de los detalles.
6. **Asignar rampas.** Elegir rampas de §3.7.1, mantener neutrales ≥60 % y reservar los acentos para función o relato.
7. **Construir clústeres.** Limpiar píxeles aislados, regular diagonales, aplicar contorno selectivo y usar tramado solo donde §3.7.2 lo permite.
8. **Añadir interfaz y texto.** Integrar componentes de §9.6, contraste AA, foco visible y alternativa de movimiento reducido.
9. **Animar desde poses clave.** Seleccionar 2–4 fotogramas y una cadencia de §10.4. Probar el ciclo a ×1 sin suavizado.
10. **Exportar y validar.** Exportar maestro en PNG indexado; sprite sheets con celdas uniformes; comprobar paleta, transparencia, escala entera, peso, nombres y ausencia de colores fuera de Píxel-16.

### 13.10 Entregables mínimos [EXTENSIÓN — validar]

| Entregable | Debe contener |
|---|---|
| **Maestro editable** | modo indexado, paleta Píxel-16 ordenada, capas o grupos nombrados, fotogramas etiquetados |
| **PNG individual** | dimensiones nativas, transparencia binaria, sin suavizado ni reescalado |
| **Sprite sheet** | celdas uniformes, mismo origen, secuencia documentada, sin margen accidental entre fotogramas |
| **Ficha de activo** | función, rejilla, estados, rampa, duración, punto de anclaje, texto alternativo si aplica |
| **Captura de QA** | vista ×1 y escala entera, fondo real, estado de foco y variante de movimiento reducido |

**Criterio de salida:** el activo se aprueba primero a ×1. La ampliación solo demuestra; nunca rescata.

### 13.11 Plataforma (producto web) [CANON — decisión de dirección]

*El plano en una línea:* Diurno por defecto con Nocturno conmutable, nivel I, densidad de herramienta, sidebar + contenido, datos con §3.8 y cifras en Mono tabular.

**La decisión de dirección — el primario de la Plataforma es tinta:** Noche sobre claro, Arena sobre oscuro (16.1:1). La plataforma es herramienta sobria: la acción principal se viste de tinta, y el color queda para lo que informa — enlaces y foco en turquesa-texto, estados con los tintes semánticos (§3.2), datos con la paleta §3.8. El relleno `#017C8D` (§9.1) sigue siendo el primario del producto-juego y de la web; aquí sería ruido de marca sobre trabajo. El producto vivo ya lo practicaba: se canoniza.

**Esqueleto:**

```
┌ sidebar 240px ────────┬─ contenido ────────────────────────────┐
│ [wordmark 20px tinta] │  Título de vista (titulo.m)            │
│ GRUPO (etiqueta)      │  pestañas: activa subrayado 2px Ámbar  │
│ ○ Ítem  (fila 40px)   │  tarjetas en superficie + sombra §5    │
│ ● Activo = píldora    │  tablas: cabecera etiqueta Ámbar,      │
│   tinta/papel         │  cifras Mono tabular, filas 40px       │
│ …                     │  [primario tinta]  [fantasma]          │
│ [usuario · wallet]    │                                        │
└───────────────────────┴────────────────────────────────────────┘
```

Reglas: sidebar en `superficie`; ítems en texto secundario con icono Phosphor `regular` 18 px; **activo = píldora de tinta con texto de papel** (radio `control`, la misma pieza en ambos modos); grupos con `type.etiqueta`; densidad: filas 36–40 px, padding `s300/s400` (la plataforma es compacta, el marketing respira); importes y direcciones de wallet SIEMPRE en Mono (truncado `0x42e6…cA26` con título completo); vacíos de estado con icono `light` 48 px + una frase nivel I; la rareza (§3.6) solo en inventario y loot, jamás en facturación. Migración de lo vivo: blanco → papel `#F9EBDC`/`#FDF6EE`, negro → Noche `#14110F`; la estructura no se toca.

**La tabla de plataforma (resuelta, con ordenación).** Cabecera en `type.etiqueta` Ámbar (tostado en Diurno); columna ordenable = botón con caret `bold` 12 px que aparece al hover y queda fijo en la columna activa (label a texto primario); `aria-sort` en el `th` activo; cifras en Mono tabular alineadas a la derecha; filas de 40 px, hover = escalón de superficie (§10-04); selección por casilla en primera columna; estado en píldora §9.2; vacío y error según §9.7. Demostrada ordenando en vivo en la guía.

### 13.12 El papel vivo — plano del códex [EXTENSIÓN — validar contra el LAP]

*El plano en una línea:* Diurno por defecto (es papel) con Nocturno conmutable como lectura nocturna real; la tercera voz narra el cuerpo (§4.6); el marco de lectura pertenece al Velo; el libro siempre se puede llevar.

Todo papel de lectura larga (códex, libro, editorial digital) usa estas piezas, **verificadas en producción** en `numinia.com/lap/codex`:

```
PORTADA                                CAPÍTULO
┌──────────────────────────────┐      ┌───────────────────────────────────────┐
│  [quien] presenta            │      │ ← título del capítulo →   ○ luna      │
│  TÍTULO display (serif)      │      │ eyebrow de sección                    │
│  subtítulo nivel II          │      │ Apertura literaria en cursiva (II)    │
│  autores · edición · versión │      │ Cuerpo en la tercera voz (II/III),    │
│  «↓ abre el códex»           │      │ enlaces de glosario en línea          │
└──────────────────────────────┘      └───────────────────────────────────────┘

ÍNDICE                                 CIERRE DE LIBRO
┌──────────────────────────────┐      ┌───────────────────────────────────────┐
│ I   Capítulo …    abierto    │      │ «El libro viaja libre»                │
│ II  Capítulo …    tras el    │      │ [.md] [pdf] [epub]  ← siempre visible │
│                    Umbral    │      │ Agradecimientos                       │
│ ✦   Anexos        abierto    │      │ Colofón: «Compuesto en [voz] con el   │
│                              │      │ Sistema · La fuente de verdad vive    │
│                              │      │ en Git» · [escarabajo]                │
└──────────────────────────────┘      └───────────────────────────────────────┘
```

**Reglas del papel vivo:**

- **Marco y página son registros distintos.** La página (el papel) es Umbral-Diurno con la tercera voz; el **marco de lectura** (barra del LAP, marcapáginas, controles A·A·A, conmutador) PUEDE vivir en Velo cuando el modo es Nocturno. La frontera se ve.
- **La luna es el marcapáginas** (§10.1-06, fases crecientes): el avance de lectura se dice en luna, de nueva a llena — terminar es luna llena. La posición de lectura se persiste.
- **A · A · A:** el tamaño de lectura es del lector, no del diseñador — tres pasos sobre la escala tipográfica (§4.3), sin romper la retícula.
- **El estado de acceso se nombra en el mundo:** capítulos `abierto` / `tras el Umbral` — la frontera de sesión usa el léxico canónico (§11), nunca «login required».
- **«El libro viaja libre» es principio, no feature:** las descargas (.md primero — File Over App hecho interfaz —, pdf Diurno para imprimir, epub) están siempre a un paso.
- **La apertura literaria** en cursiva es el único nivel II dentro de un cuerpo II/III y no se funde con él.
- **El colofón firma siempre:** voz tipográfica + Sistema + «La fuente de verdad vive en Git» + escarabajo. El pie de factura y el colofón de libro son la misma idea en dos papeles.
- **El libro tiene su propio conmutador**, independiente del resto de la plataforma: alguien puede leer de noche sin apagar la ciudad entera. El Nocturno del libro es papel oscuro (`#14110F` / `#1E1A17`) con el grano a media intensidad, no el Nocturno de producto.
- **Las piezas editoriales** (capitular, cuadro de lectura, lámina, tabla numerada, nota al margen, filete, sello, glosario, descargas, colofón) están especificadas en §9.9; los iconos del libro, en §7.5; el grano, en §6.5.
- **La factura no lo hereda** (§13.4): el papel administrativo sigue siendo Geist puro, una página, total en Ámbar tostado; ni tercera voz ni marco Velo.

---

## 14. Referencias y créditos

| Recurso | Autoría | Licencia | Enlace · distribución | Uso en el sistema |
|---|---|---|---|---|
| **Geist · Geist Mono** | Vercel | SIL OFL 1.1 | [vercel.com/font](https://vercel.com/font) · npm `geist` · autoalojado en `/assets/fonts/` | Tipografía única (§4) |
| **Phosphor Icons** | Helena Zhang · Tobias Fried | MIT | [phosphoricons.com](https://phosphoricons.com) · [github.com/phosphor-icons/core](https://github.com/phosphor-icons/core) · npm `@phosphor-icons/web` | Iconografía única (§7) |
| **Pixelify Sans** | Stefie Justprince | SIL OFL 1.1 | [Google Fonts](https://fonts.google.com/specimen/Pixelify+Sans) · autoalojada en `/assets/fonts/` | Tipografía del registro píxel (§4.5) |
| **Alegreya · Alegreya SC** | Juan Pablo del Peral · Huerta Tipográfica | SIL OFL 1.1 | [Google Fonts](https://fonts.google.com/specimen/Alegreya) · redonda + itálica variables y small caps 400/500, autoalojadas (rearmado v5) | Tercera voz — libro y códex (§4.6) [EXTENSIÓN] |
| **W3C Design Tokens (DTCG)** | W3C Community Group | Especificación abierta | [design-tokens.github.io/community-group/format](https://design-tokens.github.io/community-group/format/) | Formato de tokens (§19.3) |
| **WCAG 2.2** | W3C | Norma (EN 301 549) | [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/) | Suelo de accesibilidad (§12) |
| **Octalysis** | Yu-kai Chou | Marco conductual | [yukaichou.com](https://yukaichou.com/gamification-examples/octalysis-complete-gamification-framework/) | Diseño conductual de las propuestas |
| **8 Bit & ‘8 Bitish’ Graphics — Outside the Box** | Mark Ferrari · GDC 2016 | Referencia profesional | [gdcvault.com/play/1023586](https://www.gdcvault.com/play/1023586/8-Bit-8-Bitish-Graphics) | Clústeres, paleta limitada y cambio de paleta; referencia de producción, no canon visual |
| **ScummVM · Understanding the graphics settings** | Proyecto ScummVM | GPL / documentación | [docs.scummvm.org](https://docs.scummvm.org/en/latest/advanced_topics/understand_graphics.html) | Escalado de gráficos de aventura, nearest-neighbor y preservación del píxel |
| **SDL · Integer scale** | Simple DirectMedia Layer | zlib | [wiki.libsdl.org](https://wiki.libsdl.org/SDL2/SDL_RenderSetIntegerScale) | Referencia técnica para escalado entero |
| **Aseprite · Indexed color y sprite sheets** | Igara Studio | Documentación oficial | [aseprite.org/docs](https://www.aseprite.org/docs/color-mode/) | Flujo indexado, paleta cerrada y exportación de hojas de sprites |
| **Rueda de Plutchik · Arquetipos de Jung** | — | Fundamento teórico | — | Emoción y personalidad del Brand & Culture |
| **Brand & Culture Numinia v0.1.2** | Numen Games | Interno | `2026_03_20-Numinia_Brand_and_Culture-v0.1.2.pdf` | Fuente de la identidad |

---

## 15. Licencia · *Legal by Design* [DERIVADO]

**CC0 1.0 Universal** para todo el sistema. **Excepción:** logotipo, isotipo del escarabajo, «Numen Games» y «Numinia» son identificadores de origen y quedan fuera. Se puede copiar el sistema; no se puede decir que se es Numen. Lo liberado usa formatos abiertos y licencias libres (OFL, MIT); los textos de licencia **acompañan a las fuentes** en `assets/fonts/` dentro del kit. Public Domain Day es el momento de liberar lo acumulado.

---

## 16. Lo que falta · hoja de ruta [EXTENSIÓN]

1. **Dirección de fotografía e ilustración** — germinada en §6.3 con las tres pátinas de época; falta validarla con seis fotografías reales y fijar encuadre y qué no fotografiar. 2. **Biblioteca Figma** con Variables sincronizadas al DTCG. 3. **Plantillas maestras** (deck, A4, propuesta). 4. **`@numen/sistema-css`** en npm, CC0. 5. **Set de aplicación** (favicon, app icons, OG, redes, firma email). 6. **Material 3D completo** (albedo, roughness, AO + guía de iluminación). 7. **Biblioteca de sprites** — la guía de producción ya define gramática, rampas, clústeres, componentes, animación, exportación y QA; faltan el set de trabajo y sus maestros editables (personajes 24 px con ciclos de 2–4 fotogramas, objetos 12 px, módulos de escena 48 px), **nombrar la guía de producción dentro del lore** (propuesta sobre la mesa: «La Escuela del Píxel») **y fijar qué Oráculo firma la validación de sprites canónicos** — sin dueño, la excepción cerrada de §2.4 no puede cerrarse. 8. **Biblioteca de movimiento** grabada (el catálogo §10 ya especifica; faltan capturas de referencia por medio). 9. **Glosario/lore versionado**. 10. **Identidad sonora** (logo sonoro, SFX de interfaz y su variante píxel — el tecleo pide su clic —, regla de silencio). 11. **Proceso de auditoría** semestral. 12. **Tema de Plataforma** (shadcn/Tailwind mapeado a los tokens del Sistema) — la tienda viva converge por sustitución de neutrales: blanco→papel, negro→tinta; los assets low-poly de la tienda validan el presupuesto §2.6; los controles, el modal, la paginación y la barra ya están especificados (§9.8) y la tabla resuelta (§13.11); al tema le queda solo el empaquetado. 13. **Planos editoriales** (cómic y libro): página, calle, bocadillo y rotulación para el cómic; caja tipográfica, folio y capitular para el libro — hoy heredan de §2.4/§6.3/§13.4, les falta su plano propio. 14. **Equivalencias de imprenta** (Pantone/CMYK de Ámbar, Turquesa y Arena): el evento físico iguala tintas, no pantallas — un telón mal igualado es el error de color más caro. 15. **Validación del Velo (5.0.0)** — convivencia rejilla/relieve con piezas reales; specs del paso de página extraídas del código del LAP; empaquetado del **tema `velo.tokens.json`** para el mould NWOS (§2.8.2); Alegreya autoalojada con su OFL en el kit; consagración de la tercera voz y del alcance del renombrado por un Oráculo. 16. **Recoloreo del cielo** (§2.7.1): numinia.org usa hoy hexes por defecto de Tailwind en las estrellas; migrar a la escala §3.6 — y, en la misma pasada, auditar la deriva mayor de esa web (paleta propia con teal, terracota y ocre fuera del sistema).

---

## 17. Gobernanza

Semver: MAYOR ruptura/dirección · MENOR adiciones · PARCHE correcciones. Jerarquía: Brand & Culture > este documento > cualquier pieza. Revisión semestral. Cambios con problema + pieza + valor propuesto. Toda EXTENSIÓN validada asciende al Brand & Culture.

---

## 18. Registro de versiones

| Versión | Fecha | Cambios |
|---|---|---|
| **5.0.0** | 2026-08-18 | **Los cuatro registros y el Velo.** MAYOR por ruptura triple. (1) **Renombrado**: el nombre clave se retira; el sistema pasa a llamarse **Sistema de Diseño**; tabla de equivalencias §0.4; kit a `sistema.*` y claves de token renombradas (`paleta-pixel16`, `logo-escarabajo`, `sprite-escarabajo`); el historial no se reescribe. (2) **Jerarquía de registros** (§2.8): 1 Umbral · 2 Velo · 3 Low-poly · 4 Píxel, cada uno con valor epistémico y pragmático y regla de fusión por enmarcado; el algoritmo del agente gana el paso 1b. (3) **El registro del Velo** (§2.7): la profundidad como registro — regla «no añade hexes, añade alfa», tokens `velo.{rejilla,niebla,imagen,cristal,cristal-borde}` (rejilla = Verdemar 2.5 % a 40 px, niebla = Turquesa 6 %, verificados en producción en pablofm-web), techos de intensidad, cristal con atmósfera obligatoria, convivencia con el relieve (§6.4: la señal separa, el circuito da cuerpo, la atmósfera da profundidad); el velo de imagen `.72` reconocido como pieza fundacional. Además: **tercera voz** Alegreya solo-libro [EXTENSIÓN·ORACLE] (§4.6, verificada en el colofón vivo del LAP); **§13.12 papel vivo** — plano del códex desde la producción real (portada, índice con `abierto / tras el Umbral`, luna-marcapáginas, A·A·A, «el libro viaja libre», colofón; la factura no lo hereda); animaciones **10 Afloramiento · 11 Cristalización · 12 Paso de página** — transiciones sin duraciones nuevas, §10.2 intacta; mapa de superficies con columna Registro y filas Archivo/Summa y Libro/LAP (§2.5); **el Velo como semilla del tema por defecto** del template NWOS con contrato congelado (§2.8.2, implementación recomendada `theme/velo.tokens.json`); léxico del mundo con el Velo y el Umbral (§11); grupo `velo` y `fontFamily.serif` en tokens (§19.3); checklist y fragmento ampliados (§19.4–19.5); Alegreya en referencias (§14). **Segunda pasada — lo que ya estaba vivo entra al canon** (auditoría de los repositorios de producción `numinia-web` y `numinia-nwos`): **§2.7.1 el cielo** — el campo estelar de numinia.org canonizado, con su hallazgo de fondo: *la distribución del cielo es la escala de rareza* (pesos 60/25/10/4/1), única aparición sancionada de la rareza fuera del juego, con deriva de color detectada y marcada para corrección; **§2.7.2 el velo de lectura** (`blur 2.2px` + máscara) — lo que está tras el Umbral se ve y no se lee; **§4.6 ampliado**: Alegreya entra **entera** — redonda, itálica y **small caps**, la pieza que faltaba registrar (capitulares y títulos de capítulo); **§6.5 el gramaje**: el grano de papel como cuarta materia, con la enmienda explícita al §6.2 (el grano no es textura sobre el papel: es el papel); **§7.3 el subconjunto de la casa** — los 26 iconos Phosphor realmente autoalojados, listados; **§7.4 el conmutador de modo** — el par `moon-stars`/`sun`, con la regla dura «el icono muestra el modo al que lleva un toque», seguimiento del sistema operativo hasta la primera elección y aplicación pre-pintado; **§7.5 los iconos del libro** (rejilla 16, trazo 1.5) [EXTENSIÓN]; **§9.9 los componentes del libro** — doce piezas editoriales auditadas (barra que cede sin desaparecer, capitular, cuadro de lectura, lámina, tabla numerada, nota al margen, filete, sello del Umbral, glosario con fuente obligatoria, término punteado, tarjeta de descarga, colofón con binaria de barras); **animaciones 13 Trazo** (1.6 s, los marcos de grabado que se dibujan — única duración nueva del catálogo) **y 14 Cielo** (única excepción sancionada al veto de loops ambientales, §10.2 enmendada); **cadencia lunar corregida** 900 → 1.400 ms con forma calculada (limbo fijo + terminador elíptico) y las ocho fases legibles. Tokens nuevos: `velo.cielo`, `velo.lectura`, `papel.*`, `icon.subconjunto`, `icon.conmutador-modo`, `icon.libro`, `duration.trazo`. Guía: secciones Registros, Velo (con cielo en vivo), **Low-poly**, Papel vivo completo e iconografía reducida al set real. Consolidado sobre v4.2.0 a la espera de firma de Oráculo. | |
| 4.2.0 | 2026-08-15 | **El kit de traspaso.** Decisión de distribución: *el .md es la ley; el kit es la mudanza con la ley dentro* — el entregable para agentes es el zip, autoexplicativo (`LEEME.md` con la orden de instalación y el bloque para `CLAUDE.md`) y sin ruido: el material 3D pesado (normal 4096² + alpha, ~10 MB) sale a un **paquete de materiales** aparte y el kit queda en ~1,5 MB de producción. Dentro: `kit/khepri.css`, `kit/khepri.js` y `kit/khepri.tokens.json` **generados del documento al empaquetar** (editarlos sin tocar la fuente es deriva), y las **licencias OFL acompañando a las fuentes** como exige Legal by Design. Degradación explícita del .md a solas: sirve para estilo y consulta; sin kit, las fuentes se obtienen de origen y las piezas con firma no se producen. |
| 4.1.0 | 2026-08-15 | **La carpintería de producto** — respuesta directa a la simulación de tres perfiles del test de producción. **§9.8 Controles** [CANON] unificados por una sola regla: *lo activo se viste de tinta* (la píldora del sidebar extendida a casilla, opción, interruptor, selector, paginación y fila): casilla 18 con check en papel, interruptor 36×20, selector con panel elevado y opción-píldora, **modal que reutiliza el velo canónico `.72`** con foco atrapado, paginación Mono, y **barra de progreso** de 4 px en tinta con cifra Mono — solo determinate, con regla de selección luna/puntos/barra y la variante binaria-llenándose como EXTENSIÓN. **Tabla de plataforma resuelta** (§13.11): ordenación con caret, `aria-sort`, Mono tabular, hover por elevación — demostrada ordenando en vivo en la guía. Tokens `controles`; checklist y fragmento ampliados; la ruta 12 queda reducida al empaquetado del tema. |
| 4.0.1 | 2026-08-15 | Ajuste fino tras la primera revisión de dirección. **Marco 10→8 px**: el 10 sobre hairline de 1 px leía a tarjeta de app; el 8 pule el bronce sin volverlo juguete. **Carga lunar recompuesta**: ciclo completo de las ocho fases —cuartos incluidos— a 900 ms/fase con fundido de 240 ms (una vuelta ≈ 7,2 s, en armonía con el barrido de 8 s); el *progreso* sigue siendo solo creciente porque terminar es luna llena. **Presupuesto de lectura** declarado en el YAML (documento · §19 · fragmento, en tokens aprox.), generado por script al versionar — un contador a mano sería una fábrica de fósiles. Hoja de ruta 12 nombra los pendientes de producto (controles de formulario, modal, paginación, barra de progreso). |
| **4.0.0** | 2026-08-15 | **Primera release para producción.** MAYOR por cambio de dirección en la Forma: **dos radios** — control 6 px y marco 10 px (cálido sin moda; el píxel conserva cantos rectos) — con renombrado de tokens `borderRadius` (150→control, +marco). **§9.7 Mensajes al usuario** [CANON]: avisos, tooltips (hablan en el modo contrario), consejos, errores de carga, validación y confirmación destructiva — plantilla universal «qué pasó + qué hacer», el error mudo queda prohibido; tokens `mensajes` y piezas en el kit. Mapa de superficies ampliado con honestidad: cómic y libro entran como pendientes que heredan (píxel/pátinas/voz y tipografía/ritmo), con planos editoriales en hoja de ruta. Relectura íntegra de coherencia: corregidos dos fósiles del Turquesa como «primario» (§3.1 y tabla §9.1, contradecían el relleno `#017C8D` de la 3.6.0) y un duplicado en la hoja de ruta. Kit y guía actualizados; con esta versión se testea en las webs de producción. |
| 3.9.0 | 2026-08-15 | **La Plataforma y el low-poly entran en el sistema** (referencia: numinia.store en producción). §2.5 mapa de superficies [CANON] — dónde vive el sistema de un vistazo; la Plataforma es la única superficie emitida con Diurno por defecto. §2.6 registro low-poly [CANON] — el hermano 3D del píxel: malla honesta, color plano de paleta, GLB/glTF, presupuesto orientativo [EXTENSIÓN]. §13.11 plano de Plataforma con la decisión de dirección: **el primario de plataforma es tinta** (el producto vivo ya lo practicaba: se canoniza); sidebar 240/filas 40, activo = píldora tinta/papel, wallets en Mono truncado, migración blanco→papel y negro→tinta. Menú de web especificado en tres líneas dentro de §13.2 (piel, no arquitectura). Algoritmo con paso 3D; tokens `plataforma` y `lowpoly`; tema shadcn a hoja de ruta. |
| 3.8.0 | 2026-08-15 | **La binaria habla** [CANON]: el separador deja de ser ruido y codifica frases del canon en ASCII de 8 bits + sedimento — huevo de pascua de la casa. Primera frase: «Leave things better than we found them.» (312 bits), cadena canónica en §6.1 y en tokens (`binaria.bits`), generador `binaria()` en el kit §13.1, desplegada en todos los separadores de la guía (el espécimen didáctico de Materia muestra «Le» + sedimento). |
| 3.7.0 | 2026-08-15 | **El Diurno demostrado.** La guía unificada gana conmutador Nocturno/Diurno que ejecuta el §5 en vivo: sin textura en claro, elevación por sombra doble suave, ámbar/turquesa/grana/verdemar cayendo a sus variantes de texto, enlaces conmutando por token, e **imprimir = Diurno automático**. Regla explicitada: **el registro píxel no tiene Diurno** — sus lienzos permanecen Nocturno aunque la pieza que los enmarca sea clara (el índice Khepri-16 nace de la Noche). Coherencia integral verificada: tokens DTCG validados programáticamente, cero residuos de valores retirados (#02A4BA/#017486/#E04450/#E4F2F0 solo como menciones de retirada), factura limpia, algoritmo enlaza la paleta de datos (§3.8) y declara la excepción píxel. |
| 3.6.0 | 2026-08-15 | **Auditoría de color aplicada + la línea de los cien años.** Color: relleno de acción `#017C8D` con estados que oscurecen reutilizando variantes existentes (hover=turquesa-texto, destructivo-hover=grana-texto — el hover que aclaraba daba 2.99:1 y el destructivo 4.11); regla del terciario (solo fondo base); `verdemar-texto #1F6B5F` (el éxito ya se escribe sobre claro); aviso-en-claro por regla, no por hex; tintes semánticos Diurno por fórmula 12 % (retirado `#E4F2F0`); token de enlace; **§3.8 paleta de datos** (categórica, secuencial, divergente — cero hexes nuevos); mención CVD en rareza (épico/raro colapsan bajo protan/deutan); equivalencias de imprenta a hoja de ruta. Época [CANON]: columna de década en la mezcla (1920·2020·2120 = incendio·invocación·ciudad plena), **sello de las tres décadas**, guardrail «la época es sabor, no skin», **§6.3 pátinas de época** (Bronce/Señal/Jardín — semilla de la dirección de fotografía), doble herencia del tecleo, léxico de época en §11, tokens de época. Kit §13.1 actualizado. |
| 3.5.0 | 2026-08-15 | **El juego de marca** [CANON — decisión de dirección], recuperado de las exploraciones originales: los tres glifos *space · people · connect* construidos desde las letras reales del wordmark (la n, la n con punto, la ɑ), el mosaico de escarabajos en paleta y el wordmark color-sobre-color con pares aprobados — todo en registro expresivo, con frontera dura frente a la firma corporativa, que sigue monocroma. Repertorio de firma ampliado a cinco. Fase lunar sancionada como progreso de lectura de documentos largos (§10.1-06). **Guía unificada**: norma y demo en un solo HTML — cada sección de la guía viva incorpora su norma completa desplegable, con navegación lunar y luna de progreso de scroll. Glifos añadidos al inventario y a los tokens. |
| 3.4.1 | 2026-08-15 | Retirada de la tabla de referencias la fila de franquicias (Monkey Island · DOTT · La Abadía / LucasArts · Opera Soft) por decisión de dirección: una tabla de créditos no es lugar para marcas ajenas. Las menciones contextuales en la prosa de §2.4 y §4.5 se mantienen como herencia declarada. |
| 3.4.0 | 2026-08-15 | **Los ejemplos prácticos entran en el documento** y el sistema se vuelve directamente ejecutable por agentes de código. §0.3: orden de trabajo para Claude Code e integración vía `CLAUDE.md`, con precedencia explícita sobre material antiguo. §13 reestructurado en **planos por medio**: kit de arranque canónico (CSS + JS de tecleo y revelado accesibles, que se copia y no se reescribe), esqueleto anotado del hero, planos ASCII de las cuatro diapositivas (con **guarda anti-serif de legado**), orden de bloques de la factura, y receta de correo. §11: ejemplos de registro sí/no por nivel y **cápsula del léxico del mundo Numinia** [CANON — fuente: Presentación Numinia v0.6.0] — el Ágora, los cuatro distritos, los Registros Akáshicos, Holberins, lo numínido, Especies/Gremios/Facciones, Dark Council y Lunar Coven — para que ninguna pieza de nivel II hable del mundo con vocabulario inventado. Pipeline píxel renumerado a §13.9–13.10. |
| 3.3.1 | 2026-08-15 | Parche de reconciliación tras la revisión de la 3.3.0. **Historial restaurado**: la fila 3.2.1 y su regla de ritmo compacto A4 habían desaparecido al ramificar desde la 3.2.0. Contorno reconciliado (§2.4 ↔ §2.4.1: silueta sí, interiores por rampa; ≤12 px puede cerrarse). Hues ajenos reconciliados (§3.5 ↔ §3.6: la rareza es la única excepción, sin precedente). HUD desambiguado (Mono si persiste, Pixelify si es diegético). §2.4 base convertido en índice sin duplicados. Prueba de silueta con fondo Ceniza para figuras oscuras [aprendido produciendo]. Inventario ampliado (Cartógrafo, hoja de giro, pares didácticos). El sprite canónico de Khepri y el Cartógrafo quedan marcados [EXTENSIÓN — validar] a la espera de firma de un Oráculo. Fragmento de agente recortado. Errata PUEDE→PUEDEN. |
| 3.2.1 | 2026-08-04 | Primera pieza real producida con el sistema: **plantilla de factura** (Diurno, A4, nivel III) en `plantillas/2026_08_03-Plantilla_Factura-v1.0.0.html` + PDF de referencia. Aprendizaje incorporado: ritmo vertical compacto para documento (el ritmo `s700` es de pantalla; en papel, `s500/s300–s400`). Regla nueva: la factura cabe en una página. |
| 3.3.0 | 2026-08-04 | **Guía detallada de producción de Pixel Art** [EXTENSIÓN — validar], integrada en las secciones existentes: gramática visual, silueta, clústeres, contorno selectivo, rampas funcionales, tramado, cambio de paleta limitado al catálogo, composición y profundidad, rejilla interna, componentes de escena, animación de sprites con duraciones canónicas, pipeline, entregables, exportación indexada y QA a ×1. Referencias profesionales y técnicas añadidas sin convertirlas en canon visual. |
| 3.2.0 | 2026-08-03 | **Registro píxel** [CANON]: la herencia de las aventuras gráficas como registro de renderizado del nivel II. Paleta indexada **Khepri-16** (cero hexes nuevos, dominancia neutral ≥60 %, subconjunto de diálogo verificado — Grana excluida). Tipografía píxel **Pixelify Sans** autoalojada (las fuentes SCUMM son propietarias: herencia citada, no imitada). **Sprite canónico de Khepri** 24 px y moneda 12 px como excepción cerrada al no-redibujo. Reglas de rejilla, escalado entero, contorno, tramado y entrada/salida completa del registro. Demostrado en vivo en la guía. |
| 3.1.0 | 2026-08-03 | Dosis de dirección fijada: **Solarpunk 40 · Steampunk 40 · Cyberpunk 20**, con test de mezcla. **Catálogo de animación** (9 piezas; el Tecleo de aventuras gráficas como bandera) con prohibiciones. **Componentes**: botones (4 tipos + estados), píldoras, campo, tarjeta, KPI. Cómo sí / cómo no de marca, texturas e iconos. Sección de **Referencias y créditos**. Guía web completa con todo demostrado en vivo y autoalojado. Tokens: duraciones de animación añadidas. |
| 3.0.0 | 2026-08-03 | Phosphor sustituye a los iconos a medida (ruptura). Escala de rareza. Materia (normal map + derivados CSS). Activos reales normalizados; isotipo embebido. Geist=Vercel confirmado. Hoja de ruta. |
| 2.0.0 | 2026-08-03 | Reescritura desde el Brand & Culture: paleta canónica, Geist, niveles de lengua, CC0, procedencias. |
| 1.0.0 | 2026-08-03 | «La Carta». Obsoleta: identidad inventada previa a la lectura del Brand & Culture. |

---

## 19. Contrato de agente

### 19.1 Precedencia

1 Instrucción de la persona → 2 Accesibilidad y REGLAS DURAS → 3 Brand & Culture → 4 este documento → 5 material previo → 6 criterio propio. Si 1 contradice 2, señalarlo y proponer la alternativa accesible antes de ejecutar.

### 19.2 Algoritmo

```
1 Medio (§13) → 1b Registro (§2.8): Umbral | Velo | Low-poly | Píxel — el Velo solo en Nocturno → 2 Modo (emite=Nocturno | imprime=Diurno; el registro píxel no tiene Diurno) → 3 Nivel de lengua (§11)
→ 4 Tokens (§19.3) → 5 Retícula (§5) → 6 Escala tipo (§4.3) → 7 Iconos Phosphor (§7.1) → 7b ¿Gráficas? paleta de datos (§3.8)
→ 8 ¿Juego? rareza (§3.6) → 8b ¿3D? registro low-poly (§2.6) → 9 ¿Registro píxel? producción (§2.4, §3.7, §4.5, §5.1, §9.6, §10.4, §13.9)
→ 10 ¿Movimiento? solo del catálogo (§10.1) → 11 Copy en el nivel fijado → 12 Checklist (§19.4)
```

Un valor fuera de §19.3 NO DEBE inventarse.

### 19.3 Tokens canónicos (W3C DTCG)

Este bloque es la fuente; el kit lo distribuye además como `kit/sistema.tokens.json`, generado al empaquetar.

```json
{
  "$description": "Numen Games · Sistema de Diseño · v5.0.0 · Solar 40 / Steam 40 / Cyber 20 · Registros: Umbral, Velo, Low-poly, Píxel",
  "color": {
    "$type": "color",
    "marca": {
      "verdemar": { "$value": "#A6DAD5" }, "turquesa": { "$value": "#018EA1" },
      "ambar": { "$value": "#EFA517" }, "arena": { "$value": "#F9EBDC" },
      "coral": { "$value": "#F35059" }, "grana": { "$value": "#D33440" }
    },
    "texto-sobre-claro": {
      "turquesa": { "$value": "#016E7D" }, "grana": { "$value": "#B02330" }, "ambar": { "$value": "#7A5100" },
      "verdemar": { "$value": "#1F6B5F" }
    },
    "interactivo": {
      "$description": "Rellenos de acción con texto claro · la interacción oscurece (§3.4, §9.1)",
      "fondo": { "$value": "#017C8D" }, "hover": { "$value": "#016E7D" }, "activo": { "$value": "#015866" },
      "destructivo-hover": { "$value": "#B02330" }
    },
    "enlace": { "nocturno": { "$value": "#A6DAD5" }, "diurno": { "$value": "#016E7D" } },
    "datos": {
      "$description": "Paleta de datos §3.8 · máx. 6 series",
      "categorica": { "$value": ["#018EA1", "#EFA517", "#A6DAD5", "#D33440", "#8FC46B", "#8A7D72"] },
      "secuencial": { "$value": ["#14110F", "#016E7D", "#018EA1", "#A6DAD5", "#F9EBDC"] },
      "divergente": { "$value": ["#D33440", "#8A7D72", "#018EA1"] }
    },
    "nocturno": {
      "fondo-base": { "$value": "#14110F" }, "fondo-superficie": { "$value": "#1E1A17" },
      "fondo-elevada": { "$value": "#292420" }, "linea-tenue": { "$value": "#241F1B" },
      "linea-fuerte": { "$value": "#3A332D" }, "texto-primario": { "$value": "#F9EBDC" },
      "texto-secundario": { "$value": "#C4B5A6" }, "texto-terciario": { "$value": "#8A7D72" }
    },
    "diurno": {
      "fondo-base": { "$value": "#F9EBDC" }, "fondo-superficie": { "$value": "#FDF6EE" },
      "tinte-confirmacion": { "$value": "#EFE9DB" }, "tinte-aviso": { "$value": "#F8D8CC" },
      "tinte-critico": { "$value": "#F4D5C9" }, "tinte-interactivo": { "$value": "#DBE0D5" },
      "linea-tenue": { "$value": "#E2D3C2" },
      "texto-primario": { "$value": "#14110F" }, "texto-secundario": { "$value": "#4A423B" },
      "texto-terciario": { "$value": "#6E6259" }
    },
    "rareza": {
      "pobre":      { "$value": "#F9EBDC", "$extensions": { "numen": { "diurnoTexto": "#6E6259", "alias": "arena" } } },
      "comun":      { "$value": "#8A7D72", "$extensions": { "numen": { "diurnoTexto": "#5A4F45", "alias": "ceniza" } } },
      "poco-comun": { "$value": "#8FC46B", "$extensions": { "numen": { "diurnoTexto": "#356C19" } } },
      "raro":       { "$value": "#5D9BD6", "$extensions": { "numen": { "diurnoTexto": "#2E6BB0" } } },
      "epico":      { "$value": "#A98BE0", "$extensions": { "numen": { "diurnoTexto": "#6B44B8" } } },
      "legendario": { "$value": "#EFA517", "$extensions": { "numen": { "diurnoTexto": "#7A5100", "alias": "ambar", "halo": "0 0 12px rgba(239,165,23,.25)" } } }
    }
  },
  "fontFamily": {
    "$type": "fontFamily",
    "sans": { "$value": ["Geist", "Inter", "Aptos", "Segoe UI", "Arial", "sans-serif"] },
    "mono": { "$value": ["Geist Mono", "Consolas", "Courier New", "monospace"] },
    "serif": { "$value": ["Alegreya", "Georgia", "serif"], "$description": "Tercera voz · solo libro y códex (§4.6) [EXTENSIÓN — validar]" },
    "pixel": { "$value": ["Pixelify Sans", "Geist", "sans-serif"], "$description": "Solo registro píxel: diálogo, display de escena, HUD" }
  },
  "fontSize": {
    "$type": "dimension",
    "display-xl": { "$value": "4.300rem" }, "display-l": { "$value": "3.583rem" },
    "display-m": { "$value": "2.986rem" }, "titulo-l": { "$value": "2.488rem" },
    "titulo-m": { "$value": "2.074rem" }, "titulo-s": { "$value": "1.728rem" },
    "cuerpo-l": { "$value": "1.440rem" }, "cuerpo-m": { "$value": "1rem" },
    "cuerpo-s": { "$value": "0.875rem" }, "etiqueta": { "$value": "0.750rem" }
  },
  "space": {
    "$type": "dimension",
    "100": { "$value": "4px" }, "200": { "$value": "8px" }, "300": { "$value": "12px" },
    "400": { "$value": "16px" }, "500": { "$value": "24px" }, "600": { "$value": "32px" },
    "700": { "$value": "48px" }, "800": { "$value": "64px" }, "900": { "$value": "96px" },
    "1000": { "$value": "128px" }
  },
  "borderRadius": { "$type": "dimension", "0": { "$value": "0px" }, "control": { "$value": "6px" }, "marco": { "$value": "8px" }, "completo": { "$value": "9999px" } },
  "duration": {
    "$type": "duration",
    "instante": { "$value": "120ms" }, "corto": { "$value": "200ms" },
    "medio": { "$value": "320ms" }, "largo": { "$value": "560ms" },
    "tecleo-caracter": { "$value": "22ms" }, "cursor": { "$value": "1000ms" },
    "puntos-espera": { "$value": "900ms" }, "pulso": { "$value": "2400ms" },
    "fase-lunar": { "$value": "1400ms" }, "fundido-fase": { "$value": "240ms" }, "barrido": { "$value": "8000ms" }, "trazo": { "$value": "1600ms" },
    "escalonado": { "$value": "80ms" }
  },
  "cubicBezier": { "$type": "cubicBezier", "ciclo": { "$value": [0.2, 0, 0, 1] } },
  "asset": {
    "logo-escarabajo": { "$value": "Khepri_Logo.svg" }, "logo-escarabajo-ng": { "$value": "Khepri_NG_Logo.svg" },
    "logo-ng": { "$value": "NG_Logo.svg" }, "word-horizontal": { "$value": "Numen_Games_Horizontal_Word.svg" },
    "word-vertical": { "$value": "Numen_Games_Vertical_Word.svg" }, "word-numen": { "$value": "Numen_Word.svg" },
    "word-numinia": { "$value": "Numinia_Word.svg" },
    "glifo-space": { "$value": "marca/glifo-space.svg" },
    "glifo-people": { "$value": "marca/glifo-people.svg" },
    "glifo-connect": { "$value": "marca/glifo-connect.svg" },
    "plantilla-factura": { "$value": "../plantillas/2026_08_03-Plantilla_Factura-v1.0.0.html" },
    "fuente-sans": { "$value": "fonts/Geist-Variable.woff2" }, "fuente-mono": { "$value": "fonts/GeistMono-Variable.woff2" },
    "textura-normal-3d": { "$value": "textura-circuito-normal.png" }, "textura-css": { "$value": "textura-relieve-nocturno-768.webp" },
    "textura-hq": { "$value": "textura-relieve-nocturno.png" }, "textura-alpha": { "$value": "textura-relieve-alpha.webp" }
  },
  "pixel": {
    "$description": "Registro píxel y guía de producción · §2.4, §3.7, §4.5, §5.1, §9.6, §10.4, §13.9",
    "paleta-pixel16": { "$value": ["#14110F","#1E1A17","#292420","#3A332D","#8A7D72","#C4B5A6","#F9EBDC","#A6DAD5","#018EA1","#016E7D","#EFA517","#7A5100","#F35059","#D33440","#B02330","#8FC46B"] },
    "modo-color": { "$value": "indexed" },
    "dominancia-neutral-min": { "$value": "60%" },
    "dialogo-excluidos": { "$value": ["#D33440"] },
    "rejillas": { "$value": [12, 24, 48] },
    "escalas": { "$value": [2, 3, 4, 6, 8] },
    "interpolacion": { "$value": "nearest-neighbor" },
    "coordenadas": { "$value": "integer-only" },
    "contorno": { "$value": "#14110F" },
    "luz": { "$value": "top-left" },
    "dithering": { "$value": "two-color-checkerboard" },
    "fotogramas-ciclo": { "$value": [2, 4] },
    "duracion-fotograma": { "$value": ["120ms", "200ms", "320ms"] },
    "formato-maestro": { "$value": "indexed-png" },
    "transparencia": { "$value": "binary-alpha" },
    "sprite-escarabajo": { "$value": "pixel/khepri-sprite-24.png" },
    "sprite-moneda": { "$value": "pixel/moneda-12.png" },
    "sprite-moneda-giro": { "$value": "pixel/moneda-giro-12x4.png" },
    "sprite-cartografo": { "$value": "pixel/cartografo-24.png" },
    "fuente": { "$value": "fonts/PixelifySans-Variable.woff2" }
  },
  "velo": {
    "$description": "Registro del Velo · §2.7 · solo alfa sobre canónicos · solo Nocturno · animaciones 10–12 con duration.largo y duration.medio",
    "rejilla":       { "$value": "rgba(166,218,213,.025)", "$extensions": { "numen": { "celda": "40px", "alfaMax": ".03", "origen": "verdemar" } } },
    "niebla":        { "$value": "rgba(1,142,161,.06)",    "$extensions": { "numen": { "alfaMax": ".08", "posicion": "abajo-izquierda", "origen": "turquesa" } } },
    "imagen":        { "$value": "rgba(20,17,15,.72)",     "$extensions": { "numen": { "jardin": ".60", "origen": "noche" } } },
    "cristal":       { "$value": "rgba(30,26,23,.65)",     "$extensions": { "numen": { "blur": "12px", "origen": "basalto" } } },
    "cristal-borde": { "$value": "rgba(58,51,45,.5)",      "$extensions": { "numen": { "origen": "linea-fuerte" } } },
    "cielo": {
      "$description": "El cielo del Velo · la rareza hecha cosmos (§2.7.1) · colores = escala §3.6",
      "$value": { "estrellas": 175, "pesos": [60, 25, 10, 4, 1], "alfa": [0.05, 0.85], "deriva": "0.06px/frame", "radios": [[0.3,1.2],[0.5,1.5],[0.6,1.8],[0.8,2.5],[1.0,3.0]] }
    },
    "lectura": { "$value": { "blur": "2.2px", "mascara": "linear-gradient(180deg,#000,transparent 90%)" }, "$description": "Velo de lectura §2.7.2 · lo velado queda inerte" },
    "afloramiento":  { "$value": { "duracion": "{duration.largo}", "blur": "8px", "ascenso": "8px" } },
    "cristalizacion":{ "$value": { "duracion": "{duration.medio}" } },
    "paso-pagina":   { "$value": { "duracion": "{duration.medio}", "estado": "verificar contra LAP" } }
  },
  "papel": {
    "$description": "Registro del libro · §6.5 grano, §4.6 tercera voz, §9.9 componentes",
    "grano": { "$value": "feTurbulence fractalNoise · baseFrequency 0.85 · numOctaves 3 · rgba(74,64,51,.045)", "$extensions": { "numen": { "intensidadMax": "5%", "nocturno": "50% del valor" } } },
    "capitular": { "$value": "4.4em" }, "medida": { "$value": "70ch" },
    "tamanos-lector": { "$value": ["1rem", "1.125rem", "1.25rem"], "$description": "A · A · A" },
    "barra": { "$value": "54px" }, "barra-compacta": { "$value": "40px" }
  },
  "registros": {
    "$description": "Jerarquía canónica · §2.8",
    "orden": { "$value": ["umbral", "velo", "low-poly", "pixel"] }
  },
  "controles": {
    "$description": "Carpintería de producto · §9.8 · lo activo se viste de tinta",
    "casilla": { "$value": "18px" }, "interruptor": { "$value": "36x20px" },
    "opcion-fila": { "$value": "40px" }, "barra": { "$value": "4px" },
    "modal-confirmacion": { "$value": "480px" }, "modal-contenido": { "$value": "640px" }
  },
  "mensajes": {
    "$description": "Mensajes al usuario · §9.7",
    "aviso-auto": { "$value": "6s" }, "aviso-max": { "$value": 3 }, "tooltip-retardo": { "$value": "400ms" }
  },
  "plataforma": {
    "$description": "Plano §13.11 · Diurno por defecto, primario tinta",
    "sidebar": { "$value": "240px" }, "fila": { "$value": "40px" },
    "primario": { "$value": "tinta" }
  },
  "lowpoly": {
    "$description": "Registro §2.6 · presupuesto [EXTENSIÓN — validar]",
    "tris-personaje": { "$value": "2000–10000" }, "tris-prop": { "$value": "200–2000" },
    "formatos": { "$value": ["glb", "gltf"] }
  },
  "binaria": {
    "$description": "La binaria habla · §6.1 · ASCII 8 bits + sedimento",
    "frase": { "$value": "Leave things better than we found them." },
    "bits": { "$value": "010011000110010101100001011101100110010100100000011101000110100001101001011011100110011101110011001000000110001001100101011101000111010001100101011100100010000001110100011010000110000101101110001000000111011101100101001000000110011001101111011101010110111001100100001000000111010001101000011001010110110100101110" }
  },
  "epoca": {
    "$description": "La línea de los cien años · §2.1",
    "steampunk": { "$value": "1920" }, "cyberpunk": { "$value": "2020" }, "solarpunk": { "$value": "2120" },
    "sello": { "$value": "1920 · 2020 · 2120" }
  },
  "marca-juego": {
    "$description": "Juego de marca §8.5 · registro expresivo, nunca firma",
    "glifos-orden": { "$value": ["space", "people", "connect"] },
    "pares-aprobados": { "$value": ["turquesa/arena", "arena/ambar", "ambar/turquesa", "arena/coral", "grana/arena"] },
    "contraste-identificador": { "$value": "3:1" }
  },
  "icon": {
    "sistema": { "$value": "phosphor" }, "defecto": { "$value": "regular" },
    "activo": { "$value": "fill" },
    "pequeno": { "$value": "bold", "$extensions": { "numen": { "umbral": "<16px" } } },
    "display": { "$value": "light", "$extensions": { "numen": { "umbral": ">=48px" } } },
    "prohibidos": { "$value": ["thin", "duotone"] },
    "subconjunto": { "$description": "Los 26 iconos que la casa usa (§7.3)", "$value": ["archive","bell","book-open","caret-down","caret-left","chart-bar","download-simple","flame","flame-light","gear","github-logo","globe-hemisphere-west","globe-hemisphere-west-light","house","magnifying-glass","moon","moon-stars","music-notes","package","sign-out","sun","sword","sword-light","user","users","x-logo"] },
    "conmutador-modo": { "$value": ["moon-stars", "sun"], "$description": "§7.4 · el icono muestra el modo al que lleva un toque" },
    "libro": { "$value": { "rejilla": "16", "stroke": "1.5", "piezas": ["indice","marcapaginas","narrador","pausa","sol","luna","umbral","filete"] }, "$description": "§7.5 [EXTENSIÓN]" }
  }
}
```

### 19.4 Checklist previa a la entrega

- [ ] **Registro declarado antes que el medio** (§2.8): Umbral, Velo, low-poly o píxel; la frontera entre registros, visible.
- [ ] Modo, nivel de lengua y **dosis 40/40/20** correctos (test de mezcla §2.1: ni Blade Runner ni catálogo de jardinería).
- [ ] Colores solo de §19.3; máx. tres por composición; Coral y Grana no coexisten; variantes de texto sobre claro.
- [ ] Espaciado en escala de 4; solo Geist Sans/Mono autoalojadas; un nivel de display; cifras Mono tabular.
- [ ] Iconos Phosphor por peso; nunca thin/duotone; etiqueta en primer uso; sin mezclar pesos en fila; el escarabajo y la Luna nunca como iconos.
- [ ] Rellenos con texto claro: fondo `#017C8D` y estados que **oscurecen** (hover turquesa-texto, active `#015866`; destructivo hover grana-texto). Terciario solo sobre fondo base. Datos con la paleta §3.8 y nunca con rareza.
- [ ] Controles §9.8: lo activo en tinta; etiqueta siempre; modal con velo canónico y foco atrapado; tabla con `aria-sort`; barra solo con porcentaje real.
- [ ] Forma: radio `control` en controles, `marco` en tarjetas y diálogos; rectos solo en píxel y tablas impresas. Mensajes según §9.7: causa + salida, nunca mudos.
- [ ] Superficie identificada en el mapa §2.5; si es Plataforma: Diurno por defecto, primario de tinta, densidad compacta, wallets e importes en Mono. Si hay 3D: registro low-poly §2.6, color plano de paleta, sin texturas fotográficas.
- [ ] Época solo por dispositivos sancionados: sello `1920 · 2020 · 2120`, pátina única (§6.3), léxico como especia; retirados, la pieza sigue siendo del Sistema.
- [ ] Registro de marca correcto: firma monocroma en lo corporativo; el color, los glifos y el mosaico solo en juego (§8.5), con etiqueta en primer uso y ≥3:1 si la marca es el único identificador.
- [ ] Marca según §8: lockup correcto, Arena/Noche, respeto, zona de calma sobre textura; sin recolorear/rotar/sombrear/deformar; el escarabajo es el path de §8.4.
- [ ] Textura solo en fondo Nocturno ≤6 %, `cover`, superficies elevadas lisas, nunca en Diurno.
- [ ] Si hay juego: rareza completa con tratamiento progresivo y nombre; nunca en lo corporativo.
- [ ] Movimiento solo del catálogo §10.1; un momento orquestado; un barrido máximo; pulso solo en obtención; nada de parallax/glitch; `prefers-reduced-motion` respetado; foco sin animar.
- [ ] Botones: un primario por vista; destructivo con confirmación y lejos del primario; etiquetas = verbos, sin versales.
- [ ] Contrastes AA; nada solo por color; medida ≤90; secuencias con fases lunares solo si hay secuencia real; cierre con el escarabajo en pieza mayor; nombre de archivo §11.
- [ ] Si es registro píxel: solo Píxel-16, neutrales ≥60 %, Grana sin diálogo, rejilla 12/24/48, escalado entero con `pixelated`, contorno Noche, Pixelify a múltiplos, sprite del escarabajo el canónico, entrada/salida completa del registro, y nunca en nivel III.
- [ ] Pixel Art producido a ×1: silueta legible, clústeres continuos, diagonales regulares, sin *pillow shading*, luz arriba-izquierda, máximo 2–4 colores por material, tramado solo entre colores adyacentes, sin píxeles aislados decorativos.
- [ ] Sprites: celdas y anclajes estables, 2–4 fotogramas, duraciones 120/200/320 ms, sin interpolación ni subpíxel; movimiento reducido muestra la pose más informativa.
- [ ] Exportación: PNG indexado, transparencia binaria, paleta Píxel-16 verificada, sprite sheet uniforme, prueba ×1 + escala entera + viewport mínimo.
- [ ] Si es registro Velo: solo alfas de canónicos (cero hexes nuevos); rejilla ≤3 % y niebla ≤8 %; atmósfera detrás del contenido, nunca en tarjetas ni superficies elevadas; cristal solo con atmósfera detrás y texto ≥ secundario; nada de Velo en Diurno; una materia dominante por vista (rejilla y relieve no conviven); animaciones 10–11 solo aquí; momento orquestado sigue siendo uno.
- [ ] Si hay cielo (§2.7.1): pesos 60/25/10/4/1 con los colores de §3.6, sin parallax ni reacción al cursor, detenido con movimiento reducido; el grano (§6.5) solo en papel, ≤5 %, nunca con relieve ni rejilla.
- [ ] Iconos del subconjunto §7.3; conmutador de modo mostrando el modo **destino**; los iconos del libro solo dentro del registro papel.
- [ ] Si es papel vivo (§13.12): tercera voz solo en el libro (redonda cuerpo, SC capitular y títulos, itálica lore, sin versalitas sintéticas); barra que cede pero no desaparece; glosario con fuente por definición; luna como marcapáginas (fases crecientes); estados `abierto / tras el Umbral`; descargas .md/pdf/epub visibles; apertura literaria separada del cuerpo; colofón completo con escarabajo; la factura no hereda nada de esto.
- [ ] Se ha retirado un elemento antes de entregar.

### 19.5 Fragmento de instrucción reutilizable

```
Diseña con el Sistema de Diseño de Numen Games v5.0.0.
Registro antes que medio (§2.8): 1 Umbral (general: web, deck, documento, factura,
interfaz) · 2 Velo (archivo, Summa, visores — la profundidad) · 3 Low-poly (3D) ·
4 Píxel (2D). Los registros no se apilan: se enmarcan, con frontera visible.
Kit de arranque CSS/JS y planos por medio: §13.1–13.10 — cópialos, no los reescribas.
Dirección: Solarpunk 40 / Steampunk 40 / Cyberpunk 20. La luz domina, la máquina
estructura, la señal parpadea. Ni Blade Runner ni catálogo de jardinería. El
escarabajo cierra toda pieza; nunca la abre.
Paleta: verdemar #A6DAD5, turquesa #018EA1 (interactivo), ámbar #EFA517 (énfasis/logro),
arena #F9EBDC (neutral), coral #F35059 (aviso), grana #D33440 (crítico). Máx. 3 por
composición; coral y grana no coexisten. Texto sobre claro: #016E7D #B02330 #7A5100.
Nocturno: fondo #14110F, superficies #1E1A17/#292420, texto #F9EBDC/#C4B5A6, líneas
#241F1B/#3A332D. Diurno: papel #F9EBDC, tinta #14110F. Sin sombras en oscuro salvo el
halo legendario 0 0 12px rgba(239,165,23,.25).
Rareza (solo juego, borde progresivo + nombre escrito): pobre #F9EBDC, común #8A7D72,
poco común #8FC46B, raro #5D9BD6, épico #A98BE0, legendario #EFA517.
Tipografía: solo Geist y Geist Mono (Vercel, autoalojadas). Sans afirma, Mono mide;
etiquetas Mono versales +0.10em; cifras tabulares.
Iconos: Phosphor. regular defecto, fill activo, bold <16px, light ≥48px; thin y duotone
prohibidos; etiqueta en primer uso; el escarabajo y la Luna no son iconos.
Materia: relieve de circuito solo en fondos Nocturno ≤6% cover sin repeat; binaria
10100→xxx como separador; superficies elevadas lisas; nada de textura en Diurno.
El Velo (§2.7) no añade hexes, añade alfa: rejilla rgba(166,218,213,.025) a 40px,
niebla rgba(1,142,161,.06) abajo-izquierda, cristal rgba(30,26,23,.65)+blur 12px con
borde rgba(58,51,45,.5); atmósfera DETRÁS del contenido, techos 3%/8%, solo Nocturno;
cristal solo con atmósfera detrás y texto ≥ secundario; rejilla y relieve no conviven.
El cielo del Velo (§2.7.1) es la rareza hecha cosmos: 175 estrellas con pesos
60/25/10/4/1 y los colores de la escala §3.6, deriva lenta y alfa .05–.85, sin
parallax; lo velado tras el Umbral se ve y no se lee (blur 2.2px + máscara, inerte).
Tercera voz Alegreya SOLO libro/códex (§4.6, §13.12) y entera: redonda para el cuerpo,
itálica para lore, small caps para capitular y títulos — nunca versalitas sintéticas.
El papel lleva grano (§6.5: ruido fractal ≤5%, fondo, mitad en Nocturno), nunca
relieve. El libro es Diurno con conmutador propio, la luna es el marcapáginas, estados
«abierto / tras el Umbral», descargas .md/pdf/epub visibles, colofón con escarabajo;
la factura no hereda nada de esto. Piezas editoriales en §9.9; iconos del libro en §7.5
(rejilla 16, trazo 1.5) — fuera del libro manda Phosphor, subconjunto de §7.3, y el
conmutador de modo muestra el modo AL QUE LLEVA un toque, no el actual.
Animación, solo estas doce: tecleo 22ms/car con cursor de bloque (titulares hero, lore,
cargas — la bandera, herencia de aventuras gráficas); revelado 320ms al entrar en
viewport; barrido de señal 8s máx. uno; elevación 120ms sin desplazamiento; pulso
legendario 2.4s ×2 solo al obtener; fase lunar 560ms/paso en cargas largas; puntos de
espera 900ms en botones; cursor 1s; momento orquestado (tecleo + escalonado 80ms), uno
por pieza. Del Velo y el papel vivo (nunca en Umbral corporativo): afloramiento
560ms (opacidad + blur 8→0 + 8px de ascenso, al descubrirse), cristalización 320ms
(blur 0→12 + borde), paso de página 320ms (capítulos del códex; specs por verificar
contra el LAP). Prohibido: parallax, glitch, loops ambientales, animar foco o color
de texto. prefers-reduced-motion: todo instantáneo.
Botones: relleno de acción #017C8D con blanco (uno por vista) y estados que OSCURECEN
(hover #016E7D, active #015866; destructivo grana con hover #B02330, con confirmación y
lejos del primario), fantasma, silencioso; radio 6px; etiquetas = verbos, sin versales.
Enlaces: Verdemar en oscuro, #016E7D en claro. Éxito sobre claro: #1F6B5F. Datos: solo
la paleta §3.8, máx 6 series. Época: tres décadas de una historia (1920 máquina · 2020
señal · 2120 jardín); sello «1920 · 2020 · 2120» junto al cierre en piezas expresivas;
pátina de imagen única (§6.3); la época es sabor, no skin. El registro píxel no tiene
Diurno: sus escenas permanecen Nocturno aunque la pieza que las enmarca sea clara.
La binaria habla: codifica «Leave things better than we found them.» en 8 bits +
sedimento x — cópiala de tokens binaria.bits o usa binaria() del kit; no inventes ruido.
Forma: dos radios — control 6px, marco 10px; el registro píxel conserva cantos rectos.
Mensajes (§9.7): qué pasó + qué hacer, nivel I; el error mudo está prohibido; tooltip
habla en el modo contrario; aviso 6s máx 3; destructivo nunca preenfocado.
Entregable: el kit zip (LEEME.md en raíz); kit/sistema.{css,js,tokens.json} generados —
enlázalos, no los reescribas. Sin kit no hay marca: los wordmarks solo viven ahí.
Controles (§9.8): lo activo se viste de tinta — casilla 18 marcada, interruptor 36×20
encendido, opción del selector, página actual y fila: todos píldora/relleno tinta-papel.
Modal = velo canónico .72 + panel elevado, foco atrapado, Esc cierra. Barra 4px cápsula
tinta + cifra Mono, solo determinate — indeterminada prohibida (luna o puntos).
Superficies: mapa en §2.5. Plataforma = Diurno por defecto, primario de TINTA
(Noche/papel), sidebar 240, filas 40, wallets en Mono truncado. 3D = registro low-poly
(§2.6): malla honesta, color plano de paleta, GLB/glTF, sin texturas fotográficas.
Copy: cultivada, llana y clara; declara nivel I/II/III y mantenlo.
Registro píxel (solo cuando la narrativa lo pide, nivel II): paleta cerrada Píxel-16,
neutrales ≥60%, Grana solo relleno; silueta primero y validación a ×1; luz
arriba-izquierda; contorno Noche solo en silueta; 2–4 colores por material de rampas
compartidas; sin pillow shading, antialias ni píxeles sueltos; tramado solo entre
adyacentes; escalado entero pixelated y coordenadas enteras; Pixelify a múltiplos solo
para diálogo/HUD; sprites de 2–4 fotogramas a 120/200/320ms sin tweening; PNG indexado y
alpha binaria. El detalle normativo completo vive en §2.4, §3.7, §4.5.1, §5.1, §9.6,
§10.4 y §13.9 — ante duda, esas secciones mandan sobre este resumen. El sprite del
escarabajo es el entregado, no se redibuja. Herencia: Monkey Island, DOTT, La Abadía — citada,
nunca copiada.
Marca: wordmark horizontal firma por defecto; Arena/Noche; nunca recolorear, rotar,
sombrear ni deformar; Numinia solo para el mundo. El color sobre la marca existe solo
en el juego (§8.5): glifos space·people·connect, mosaico de escarabajos y wordmark en
pares de paleta — registro expresivo, jamás facturas, propuestas ni cabeceras. WCAG 2.2 AA. Nada solo por color.
```

---

*Numen Games · numengames.com · CC0 1.0 Universal (marcas excluidas)*
*Leave things better than we found them.*
