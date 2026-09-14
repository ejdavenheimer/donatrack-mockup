# DonaTrack · Guía de estilo

Sistema **"Cátedra"**: marfil, tinta y borgoña. Institucional, sobrio, con la
jerarquía construida a base de tipografía y filetes finos, no de sombras ni colores.

Todos los valores viven en **`tokens.css`**. Regla única: **ninguna página
hardcodea colores, tamaños ni espacios.** Si necesitás un valor que no existe,
agregalo como token acá, no en la página.

---

## 1. Color

Hay dos capas. La **paleta cruda** (`--marfil-*`, `--tinta-*`, `--borgona-*`)
sólo se usa para definir la capa **semántica**. En los componentes se usa
siempre la semántica, nunca la cruda.

| Token | Para qué |
|---|---|
| `--color-fondo` | Fondo de toda la página. Marfil, nunca blanco puro. |
| `--color-superficie` | Blanco. Sólo para bloques que deben despegarse del fondo (tarjeta "ver más"). |
| `--color-texto` | Títulos y texto principal. |
| `--color-texto-2` | Texto secundario **sobre fondo plano**: bajadas de sección, cuerpo de tarjeta, pie. |
| `--color-texto-sobre-foto` | Texto secundario **sobre la foto de portada**. Más oscuro a propósito (ver §5). |
| `--color-borde` | Todos los filetes finos de 1px. |
| `--color-regla-fuerte` | Sólo el filete de 2px que abre una sección. |
| `--color-acento` | Borgoña. Uso **escaso**: botón principal, versalitas de marca, subrayado activo, metadato de tarjeta. |
| `--color-acento-hover` | Únicamente el hover del botón principal. |
| `--color-acento-tenue` | Fondo teñido en hover de bloques grandes. |

**El borgoña es un acento, no un color de relleno.** En páginas públicas, si
aparece en más de tres lugares por pantalla, algo está mal. La única excepción
es la **sub-navegación de los dashboards** (§9): ahí `--color-acento` se usa
como fondo sólido de toda la barra, a propósito, para que pese igual que el
botón "Sumarse" de la portada — es la marca afirmándose en un contexto de
aplicación, no una página de marketing.

Los tokens `--color-exito / alerta / error / info` (+ sus variantes `-tenue`)
son los **estados de las donaciones y de las entidades** en los dashboards
(disponible / en traslado / vencida / pendiente, etc.). No usarlos en páginas
públicas. `--color-oro / plata / bronce` (+ `-tenue`) son exclusivos del podio
del ranking de donantes: no reutilizarlos para otra cosa.

---

## 2. Tipografía

Dos familias, con roles que no se cruzan:

- **`--fuente-titulo`** (Newsreader, serif) → títulos, nombre de marca, `h3` de
  tarjeta, números de sección. Siempre en peso regular (`--peso-titulo`): la
  presencia la da el tamaño, no la negrita.
- **`--fuente-texto`** (Inter, sans) → todo el resto: párrafos, navegación,
  botones, etiquetas.

La escala está nombrada **por rol, no por tamaño**. Elegí por función:

| Token | Dónde |
|---|---|
| `--fs-display` | El `h2` de la portada. Uno solo por página. |
| `--fs-titulo` | `h2` de sección ("Donaciones destacadas"). |
| `--fs-marca` | "DonaTrack" en la barra. |
| `--fs-subtitulo` | `h3` de tarjeta. |
| `--fs-lede` | La bajada de la portada. Un solo párrafo. |
| `--fs-base` | Cuerpo por defecto. |
| `--fs-sm` | Texto de apoyo bajo un título de sección. |
| `--fs-card` | Descripción dentro de una tarjeta. |
| `--fs-nav` | Navegación, botones y pie. |
| `--fs-etiqueta` | Versalitas espaciadas (fila de confianza, "ver más"). |
| `--fs-micro` | Metadato de tarjeta ("ALTA DEMANDA"). |

**Todo lo que va en mayúsculas lleva `letter-spacing`.** Sin eso, las versalitas
se leen apretadas. Usá el token que corresponda: `--ls-eyebrow` (el más abierto,
para la línea sobre el título), `--ls-meta`, `--ls-boton`, `--ls-nav`.

Los títulos llevan `letter-spacing` **negativo** (`--ls-display`, `--ls-titulo`):
a tamaños grandes el serif necesita cerrarse.

---

## 3. Espaciado

Escala de **múltiplos de 4px**, de `--esp-1` (4px) a `--esp-12` (96px).
`--esp-05` (2px) existe sólo para trazos finos, como el offset de un subrayado.

**No inventes valores intermedios.** Si algo "necesita 26px", usá 24 (`--esp-6`).
La coherencia del ritmo vale más que el píxel exacto.

Lógica de la escala, de menor a mayor:

- **`--esp-1` a `--esp-3`** (4–12px): separaciones dentro de un mismo elemento
  (título y su descripción, ícono y su texto).
- **`--esp-4` a `--esp-7`** (16–32px): separaciones entre elementos hermanos
  (foto de tarjeta y su texto, botones entre sí, padding de la barra).
- **`--esp-8` a `--esp-9`** (40–48px): separación entre bloques (cabecera de
  sección y su grilla).
- **`--esp-10` a `--esp-12`** (64–96px): aire vertical de secciones enteras.

**El espaciado no sirve para dimensionar componentes.** El alto de una foto o el
diámetro de un círculo tienen sus propios tokens (`--alto-foto-tarjeta`,
`--tam-icono-circulo`). Mezclarlos fue un error que ya cometimos: forzar el
círculo del "+" a `--esp-10` lo agrandó de 52 a 64px.

---

## 4. Trazo, radio y sombra

Tres decisiones que definen el carácter del sistema:

- **Filetes, no cajas.** `--borde-fino` (1px) para casi todo; `--borde-grueso`
  (2px) sólo para abrir una sección.
- **Esquinas cuadradas por defecto** (`--radio-nulo`) en todo lo estructural:
  tarjetas, botones sólidos/outline, contenedores de tabla. Dos excepciones,
  y sólo dos:
  - `--radio-circulo` — círculos reales: el ícono "+", avatares, `.rank-bubble`.
  - `--radio-pastilla` (999px) — **controles interactivos chicos**: badges de
    estado, chips, `pill-input`, toggles (`role-toggle`, `pill-filters`,
    `view-toggle`), paginación. La lógica: algo que se **selecciona o indica
    estado** es pastilla; algo que **contiene contenido** es cuadrado. Un
    `admin-form-card` nunca lleva `--radio-pastilla`; un `badge-status` nunca
    lleva `--radio-nulo`.
- **Sombra según el contexto, no por gusto.** Páginas públicas (portada,
  donaciones, login): `--sombra-nula`, la jerarquía la dan los filetes. Paneles
  de dashboard (`admin-form-card`, `stat-card`, `sidebar-card`, etc.):
  `--sombra-sutil` — son "tarjetas de aplicación" que conviven con tablas
  densas y necesitan despegarse un poco del fondo `--color-superficie-alt`
  sin sumar más líneas. `--sombra-media/elevada` quedan para overlays reales
  (menú desplegable, modal) que todavía no existen en el maquetado.

---

## 5. La foto de portada

La imagen va **detrás del texto**, como capa de fondo, nunca compitiendo con él.
Se controla con cuatro tokens: `--foto-opacidad`, `--foto-filtro`,
`--foto-mascara` y los tres velos `--foto-velo-*`.

Tres capas la vuelven legible:

1. La imagen atenuada (`--foto-opacidad`) y saturada (`--foto-filtro`) — a baja
   opacidad el color se lava, por eso se compensa subiendo la saturación.
2. Una máscara radial que la desvanece hacia los bordes.
3. Un velo radial claro justo detrás del texto, más un desvanecido vertical
   arriba y abajo para que no corte con un borde duro.

> **Si tocás `--foto-opacidad`, verificá el contraste.** Ese es el motivo de que
> exista `--color-texto-sobre-foto` (`#57534B`) separado de `--color-texto-2`
> (`#6E6A61`): con la foto detrás, el gris normal cae a 4.0:1 y no llega al
> mínimo AA de 4.5. El valor actual da 5.3:1 o más en los tres textos del hero.

---

## 6. Movimiento

- `--trans-rapida` — cambios de color (hover de enlaces y botones).
- `--trans-media` — cambios de estado más notorios.
- `--trans-imagen` — sólo el `scale` de las fotos de tarjeta al hover; es lenta y
  con curva suave a propósito.

Todo se anula bajo `prefers-reduced-motion`.

---

## 7. Íconos — nunca emoji

**Cero emoji en toda la aplicación.** Ni siquiera como relleno rápido: un emoji
se ve distinto en cada sistema operativo y rompe la paleta (trae su propio
color). Todo ícono es **línea, `stroke="currentColor"`, sin relleno** — mismo
lenguaje visual que el logo.

Set usado: **[Lucide](https://lucide.dev)** (línea fina, MIT). Se consumen como
SVG **inline** (copiado dentro del HTML), no como fuente de íconos ni como
`<script>` de CDN — esto es un maquetado estático sin build, y un SVG inline no
depende de que cargue JS para mostrarse. Cada ícono se descarga una vez,
se le saca el comentario de licencia y los atributos `width="24" height="24"`
(para que el tamaño lo decida el CSS del contexto, no el propio SVG), y se le
agrega `aria-hidden="true"`.

**Cada contexto donde aparece un ícono define su propio tamaño en `styles.css`**
(`.item-icon-box svg`, `.rule-icon svg`, `.badge-gray svg`, etc.). Un ícono sin
regla de tamaño se renderiza como un SVG de 24×24 sin restricción y rompe el
layout — pasó más de una vez armando esto. Antes de usar un ícono en un
contexto nuevo, agregale su regla de tamaño; no asumas que "ya va a heredar"
nada.

Para texto simple con un ícono adelante, envolvé el ícono en
`<span class="icon-inline">` (14px, ya resuelto). Para un ícono suelto dentro
de un componente que ya tiene su propia clase (`.badge-gray`, `.rule-icon`,
`.user-avatar`…), no hace falta el wrapper: alcanza con la regla de tamaño de
ese componente.

**Símbolos tipográficos simples** (→, —, •, +) no son emoji y no hace falta
reemplazarlos: son caracteres monocromos que heredan el color del texto, igual
que una letra. La regla es sobre *pictogramas* (📦🚚👤❤️…), no sobre
tipografía.

---

## 8. Avatares de personas

Cuando una persona real y nombrada aparece con foto (ranking de donantes,
conductor de un camión, donante seleccionada en el alta rápida), usamos una
**foto real**, no un ícono ni un emoji de cara. Se resuelve con
[pravatar.cc](https://pravatar.cc) (`https://i.pravatar.cc/64?img=N`): son
fotos de stock reales, gratuitas, sin key, estables por número — no un
avatar generado ni iniciales.

El nombre de la persona ya está siempre visible como texto al lado de la foto,
así que la foto es **decorativa**: `alt=""` + `aria-hidden="true"`, para que un
lector de pantalla no lo anuncie dos veces. Si en algún punto una foto fuera la
*única* fuente del nombre (sin texto al lado), ahí sí llevaría `alt` descriptivo.

Un ícono de persona genérico (`user`, sin foto) queda reservado para cuando
**no** hay un individuo específico: el estado antes de seleccionar un donante,
un ícono conceptual ("si el email ya existe"), o una entidad que no es una
persona (`building-2`, `home`, `heart` para tipos de institución en
Asignaciones).

---

## 9. Sub-navegación de los dashboards

La barra de tabs de cada rol (Registrar / Estado / Asignaciones…) usa
`--color-acento` sólido de fondo — el mismo tono que el botón "Sumarse" de la
portada — con el texto inactivo en `--color-texto-invertido` a **opacidad
.68** y el activo a opacidad 1 con un filete inferior. Es la única superficie
grande de la aplicación pintada enteramente en el acento; existe porque un
panel de administración necesita un ancla visual fuerte que diga "estás
adentro de una sección de trabajo", distinta de la navbar de arriba (marfil)
y del contenido (superficie-alt). No agregar una segunda barra con el mismo
tratamiento en otro lugar — si hiciera falta, es señal de que el sub-nav
debería moverse ahí en cambio.

---

## 10. La costura curva de login / registro

En `crear-cuenta.html` e `ingresar.html`, el borde entre el panel de marca
(oscuro) y el formulario no es una línea recta: es un `<svg class="split-curve">`
superpuesto en la costura, con un único `path` en forma de **S sutil** (dos
curvas cúbicas opuestas que cruzan el eje en la mitad de la altura) pintado
del color de fondo del lado del formulario — así "come" una porción ondulada
del panel oscuro, tapiándose a sí mismo con el mismo color en el resto. La
amplitud es deliberadamente chica (±22 unidades sobre un ancho de caja de
200): si se nota como una sola panza hacia un lado en vez de una S, se perdió
la segunda curva o se exageró la amplitud. El SVG **tiene que ser absolutamente posicionado**
(`.split-curve`, ya resuelto en `styles.css`): si se inserta sin su CSS, al
ser hijo directo de un `display:grid` sin `grid-column` asignado, el navegador
lo trata como una fila implícita nueva y dispara el alto de toda la página
(pasó al armar esto: 1000px → ~3900px). Se oculta por completo en el quiebre
móvil, donde el layout pasa a una sola columna y la costura deja de existir.

---

## 11. Limitación conocida

CSS **no admite `var()` dentro de `@media`**. Los puntos de quiebre están en
`tokens.css` como `--bp-tablet` (820px) y `--bp-movil` (600px) sólo a modo de
referencia: si cambiás uno, hay que actualizar también las reglas `@media` a mano.

---

## 12. Cómo sumar una página nueva

1. Enlazar `tokens.css` **antes** de cualquier otro estilo (y las fuentes de
   Google, antes que ambos).
2. Componer con `var(--…)` únicamente.
3. Si necesitás un pictograma, sacalo de Lucide (inline, sin `width`/`height`
   fijos) y agregale su regla de tamaño — nunca un emoji.
4. Si es la foto de una persona nombrada, `pravatar.cc`; si es un concepto o
   una entidad no-persona, ícono de línea.
5. Antes de dar por terminado: revisar que no queden literales sueltos ni emoji.

```bash
# no debería devolver nada salvo los dos breakpoints de @media
grep -oE '#[0-9A-Fa-f]{3,8}|[0-9.]+(px|rem)' tu-pagina.html

# no debería devolver nada
python3 -c "
import re
s = open('tu-pagina.html', encoding='utf-8').read()
print(re.findall(r'[\U0001F300-\U0001FAFF\U00002600-\U000026FF\U00002700-\U000027BF]', s))
"
```
