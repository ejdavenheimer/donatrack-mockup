/* =============================================================
   DONATRACK · Menú hamburguesa (navbar principal y sub-nav del
   dashboard, mobile)
   Se desliza como un panel encima del contenido (no lo empuja),
   con fondo oscuro detrás — misma familia visual que los modales
   del sitio. Se cierra con el botón X, tocando el fondo o Escape.
   ============================================================= */
(function () {
  "use strict";

  var toggles = document.querySelectorAll(".menu-toggle");
  if (!toggles.length) return;

  var backdrop = document.createElement("div");
  backdrop.className = "mobile-nav-backdrop";
  document.body.appendChild(backdrop);

  var abierto = null; // el <header class="navbar"> o <nav class="sub-nav"> actualmente abierto

  function cerrar() {
    if (!abierto) return;
    abierto.classList.remove("menu-abierto");
    var btn = abierto.querySelector(".menu-toggle");
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Abrir menú");
    }
    backdrop.classList.remove("visible");
    document.body.style.overflow = "";
    abierto = null;
  }

  function abrir(contenedor) {
    if (abierto === contenedor) { cerrar(); return; }
    cerrar();
    abierto = contenedor;
    contenedor.classList.add("menu-abierto");
    var btn = contenedor.querySelector(".menu-toggle");
    if (btn) {
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Cerrar menú");
    }
    backdrop.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  toggles.forEach(function (btn) {
    var contenedor = btn.closest(".navbar, .sub-nav");
    if (!contenedor) return;

    btn.addEventListener("click", function () { abrir(contenedor); });

    var cerrarBtn = contenedor.querySelector(".menu-cerrar");
    if (cerrarBtn) cerrarBtn.addEventListener("click", cerrar);

    contenedor.querySelectorAll(".nav-links a, .sub-nav-links a").forEach(function (a) {
      a.addEventListener("click", cerrar);
    });
  });

  backdrop.addEventListener("click", cerrar);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && abierto) cerrar();
  });
})();
