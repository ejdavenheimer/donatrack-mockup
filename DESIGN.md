# DonaTrack — Sistema de diseño (celeste)

Fuente de verdad visual de los mockups de DonaTrack. Un único sistema para los tres roles
(**donante**, **entidad beneficiaria**, **admin**). Se abandonó la idea de 3 sistemas separados:
todo vive en este lenguaje celeste + navy.

Mockups estáticos (HTML + Tailwind CDN, sin build). Se abren directo en el navegador.
No son el frontend real (ese es Thymeleaf + CSS plano en `frontend/`); acá solo se explora la estética.

Carpetas vivas: `donante_mockups/` (11), `entidad_mockups/` (5), `admin_mockups/` (6).

---

## 1. Color

### Estructura (navy)
| Uso | Hex |
|---|---|
| Header, sub-nav, texto de botón primario, títulos fuertes | `#07324A` |
| Base del footer | `#07202C` |

### Acento (celeste)
| Uso | Hex |
|---|---|
| Acción primaria (fondo de botón), link activo del nav, rutas en mapa, estado "en curso" | `#3CC2FF` |
| Eyebrows, links, texto de acento | `#0B84B3` |
| Texto sobre fondos celestes claros | `#0B5A78` |

### Tinta y superficie
| Uso | Hex |
|---|---|
| Texto principal / regla gruesa de listas | `#121A20` |
| Texto secundario | `#5B6670` |
| Texto apagado / metadatos | `#8C9AA3`, `#9BA7AE` |
| Fondo | `#FFFFFF` |
| Tintes de fondo | `#F3FBFF`, `#E3F7FF`, `#F7FCFF` (hover), `#E9F3F9` (mapa) |
| Divisores finos | `#E3EBEE`, `#EAF0F2`, `#F0F4F6` |
| Borde de inputs | `#C7D6DC` |

### Estado (semántico) — **siempre como punto + texto, nunca badge de fondo de color**
| Significado | Hex |
|---|---|
| Éxito / entregada / cubierta | `#0F7A4A` |
| Atención / por confirmar / sin cubrir | `#92600A` |
| Error / fallida / vencida / urgente | `#A3231F` |
| Secundario (uso puntual, olivo) | `#4C6E4A` |

---

## 2. Tipografía

- Familia: **Plus Jakarta Sans** (400, 500, 600, 700, 800).
- Títulos: `font-extrabold` + `tracking-tight`.
- **Eyebrow** (etiqueta de sección): 12px, `font-bold`, `uppercase`, `tracking-wide`, color `#0B84B3`.
- Cuerpo: 13–14px. Metadatos: 11.5–12px en `#8C9AA3`.

---

## 3. Botones (un solo sistema, siempre pill `border-radius:999px`)

| Clase | Fondo / texto | Para qué |
|---|---|---|
| `.btn-primary` | celeste `#3CC2FF` / texto navy `#07324A` | la acción principal de la página/sección |
| `.btn-secondary` | navy `#07324A` / blanco | acciones de apoyo |
| `.btn-outline` | blanco / borde `#C7D6DC` | acciones opcionales |
| `.btn-primary-sm`, `.btn-outline-sm` | versiones chicas | acciones en filas / feeds |
| `.btn-add` | borde **punteado** `#9ED4EE` | "+ agregar fila" repetible |

Nada de padding/tamaños ad-hoc: usar siempre una de estas clases.

---

## 4. Shell (igual en las ~20 páginas)

- **Header** sticky `h-16`, fondo `#07324A`: logo (`logo-mark-light.png`) + "DonaTrack" a la izquierda; a la derecha, links globales (Inicio / Donaciones) o "Administración".
- **Sub-nav** sticky (`top:64px`), mismo navy: links del rol. Activo = `#3CC2FF` con `border-bottom:2px solid #3CC2FF`; inactivo = `text-white/55`. A la derecha: chip de rol + "Salir".
- **Footer** `#07202C`, textura de íconos line-art finos (celeste, opacidad ~.14). Layout **de dos lados**:
  izquierda = marca + 3 redes; derecha = links legales (Términos · Política · Contacto) + copyright.
  Una sola fila. **Nunca** footer de columnas tipo SaaS.

---

## 5. Patrones (cómo se resuelve cada cosa)

### Listas editoriales (no tarjetas)
El contenido principal es una **lista full-width**, no cajas en grilla:
- regla superior **gruesa** `1.5px solid #121A20` para la lista principal de una página;
- divisores finos entre filas (`#EAF0F2`);
- filas navegables = `<a class="row-link">` con hover `#F7FCFF`; filas sin acción quedan sin link.

### Estado = punto + texto
Siempre un punto de color + palabra (verde cubierta/entregada, celeste en curso, ámbar por confirmar/sin cubrir, rojo fallida/vencida). **Prohibido** el badge con fondo de color.

### Progreso / tracking
- En **listas**: barra de 4 segmentos finos (recorrido celeste, pendiente gris, verde cuando se completó).
- En **detalle/seguimiento**: stepper horizontal con etapas nombradas (Confirmada → Asignada → En camino → Entregada) + timestamp por etapa. Las excepciones (fallida/vencida) no entran al stepper: van como alerta roja aparte.

### Mapa de seguimiento (no iframe con pins flotando)
Minimapa **SVG estilizado** propio: dot de origen → tramo recorrido sólido → marcador del camión (círculo celeste) → tramo restante punteado → pin de destino (rojo para donante, verde para "mi entidad"). Un chip con patente + distancia. El ETA y las etapas van en texto, fuera del mapa.

**La página de Seguimiento es master-detail, con UN solo mapa.** Nunca apilar un mapa debajo de otro. A la izquierda, lista seleccionable de entregas en curso (`.trk-item`, activa = acento celeste a la izquierda + `#F3FBFF`); a la derecha, el detalle de la seleccionada (eyebrow + titular ETA + stepper + el mapa). Es como lo hacen PedidosYa/Uber (un mapa activo, el resto en lista) y Amazon/MercadoLibre (lista de envíos, mapa en el detalle).

### Recepción de mercadería (nota de recepción / GRN, no mensaje de delivery ni Excel)
Lo recibido se modela como un **remito / nota de recepción**: nº de documento ("Recepción #N") + fecha + estado (En tránsito / Pendiente de confirmación / Recibida) como punto+texto, y el detalle en **líneas `cantidad · unidad · descripción`** (`.rline`: columna de cantidad de ancho fijo + descripción), más la acción (Confirmar recepción / Reportar diferencia). Nada de titulares tipo "En camino hacia tu entidad" ni "Suma a…".

### Feeds / notificaciones = timeline
**Un solo componente** para todos los roles: riel vertical + nodos, agrupado por fecha (Hoy / Esta semana / Anteriores). No-leído = punto de color + peso medio; leído = gris. Acciones inline opcionales (`.btn-primary-sm` / `.btn-outline-sm`).

### Paneles de info compactos
Lista chica (p. ej. 2 columnas) de punto + texto. Secundarios, bajos, escaneables; sin números innecesarios ni barras que ocupen de más.

### Formularios
Inputs pill (`.f-input`), foco en celeste. Confirmaciones breves: lo justo, nada de párrafos explicativos ni cajas de "qué pasa si confirmo".

### Imágenes
Fotos reales (Pexels) en home y catálogo. Tiles de catálogo = imagen con `group-hover:scale-105`, navegables.

---

## 6. Reglas duras (qué NO hacer)

- ❌ Tarjetas bordeadas blancas en grilla tipo Bootstrap/Tailwind.
- ❌ Pills usadas como tags/chips, o badges de estado con fondo de color.
- ❌ Footer de columnas tipo SaaS; wordmark gigante de marca de agua.
- ❌ Glassmorphism, blobs/ondas SVG decorativas, texturas ajenas al line-art de la marca.
- ❌ Inventar contenido: usar el contenido real de la app (enums, categorías, stats).
- ❌ Barras estiradas full-width que dicen poco; densidad y utilidad por encima del relleno.

**Antes de diseñar algo nuevo:** investigar cómo lo resuelven productos serios y actuales,
y preferir un rediseño en este lenguaje antes que un parche.
