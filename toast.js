/* =============================================================
   DONATRACK · Sistema de toasts
   Notificación no intrusiva tras una acción (guardar, confirmar,
   error). Vive en una región aria-live para lectores de pantalla;
   se auto-descarta y no bloquea la interacción con la página.
   Uso: DonaToast.show("Mensaje", "exito" | "error" | "info")
   ============================================================= */
(function () {
  "use strict";

  var contenedor = null;

  function asegurarContenedor() {
    if (contenedor) return contenedor;
    contenedor = document.createElement("div");
    contenedor.className = "toast-container";
    contenedor.setAttribute("role", "status");
    contenedor.setAttribute("aria-live", "polite");
    contenedor.setAttribute("aria-atomic", "true");
    document.body.appendChild(contenedor);
    return contenedor;
  }

  var ICONOS = {
    exito: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>',
    error: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
    info: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  };

  function show(mensaje, tipo, duracionMs) {
    tipo = tipo === "error" || tipo === "info" ? tipo : "exito";
    duracionMs = duracionMs || 4000;

    var cont = asegurarContenedor();
    var toast = document.createElement("div");
    toast.className = "toast toast-" + tipo;
    toast.innerHTML =
      '<span class="toast-icon" aria-hidden="true">' + ICONOS[tipo] + "</span>" +
      '<span class="toast-msg"></span>' +
      '<button type="button" class="toast-cerrar" aria-label="Cerrar aviso">' +
      '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
      "</button>";
    toast.querySelector(".toast-msg").textContent = mensaje;
    cont.appendChild(toast);

    // Fuerza el reflow para que la transición de entrada corra.
    requestAnimationFrame(function () {
      toast.classList.add("toast-visible");
    });

    var descartado = false;
    function descartar() {
      if (descartado) return;
      descartado = true;
      toast.classList.remove("toast-visible");
      toast.addEventListener("transitionend", function () {
        toast.remove();
      });
      setTimeout(function () {
        if (toast.parentNode) toast.remove();
      }, 400);
    }

    toast.querySelector(".toast-cerrar").addEventListener("click", descartar);
    setTimeout(descartar, duracionMs);

    return { close: descartar };
  }

  window.DonaToast = { show: show };
})();
