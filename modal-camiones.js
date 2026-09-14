/* =============================================================
   DONATRACK · Modales de Camiones ("Editar" y "Registrar")
   Abren con los datos de la fila clickeada o vacíos. No persisten
   nada (no hay backend): "Guardar"/"Registrar" sólo cierra el modal
   y dispara un toast de confirmación.
   Ambos atrapan el foco (Tab/Shift+Tab) mientras están abiertos y
   devuelven el foco a quien los abrió al cerrarse — WCAG 2.4.3.
   ============================================================= */
(function () {
  "use strict";

  function atraparFoco(overlay) {
    var SELECTOR =
      'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';
    return function (e) {
      if (e.key !== "Tab" || overlay.hidden) return;
      var focoables = Array.prototype.filter.call(
        overlay.querySelectorAll(SELECTOR),
        function (el) { return el.offsetParent !== null; }
      );
      if (!focoables.length) return;
      var primero = focoables[0];
      var ultimo = focoables[focoables.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };
  }

  function configurarModal(overlay, form, opciones) {
    var quienAbrio = null;

    function abrir(prefill) {
      quienAbrio = document.activeElement;
      if (prefill) prefill();
      overlay.hidden = false;
      document.body.style.overflow = "hidden";
      var primerCampo = overlay.querySelector("input, select, textarea");
      if (primerCampo) primerCampo.focus();
    }

    function cerrar() {
      overlay.hidden = true;
      document.body.style.overflow = "";
      if (quienAbrio && typeof quienAbrio.focus === "function") quienAbrio.focus();
    }

    overlay.querySelectorAll("[data-modal-cerrar]").forEach(function (el) {
      el.addEventListener("click", cerrar);
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) cerrar();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !overlay.hidden) cerrar();
    });
    document.addEventListener("keydown", atraparFoco(overlay));

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      cerrar();
      if (window.DonaToast) DonaToast.show(opciones.mensajeExito, "exito");
    });

    return { abrir: abrir, cerrar: cerrar };
  }

  /* ---- Modal "Editar camión" ---- */
  var overlayEditar = document.getElementById("modal-camion");
  if (overlayEditar) {
    var formEditar = document.getElementById("form-modal-camion");
    var campoVehiculo = document.getElementById("mc-vehiculo");
    var campoPatente = document.getElementById("mc-patente");
    var campoCapacidad = document.getElementById("mc-capacidad");
    var campoConductor = document.getElementById("mc-conductor");
    var campoEstado = document.getElementById("mc-estado");

    var modalEditar = configurarModal(overlayEditar, formEditar, {
      mensajeExito: "Cambios guardados correctamente.",
    });

    document.querySelectorAll(".trucks-table-row .btn-action-outline").forEach(function (btn) {
      if (btn.disabled) return;
      btn.addEventListener("click", function () {
        var fila = btn.closest(".trucks-table-row");
        modalEditar.abrir(function () {
          var vehiculo = fila.querySelector(".col-donacion strong");
          var patente = fila.querySelector(".col-donacion .sub-text");
          var capacidad = fila.children[1];
          var conductorSpan = fila.querySelector(".driver-info span");
          var estadoBadge = fila.querySelector(".badge-status");

          campoVehiculo.value = vehiculo ? vehiculo.textContent.trim() : "";
          campoPatente.value = patente ? patente.textContent.replace(/^Patente:\s*/, "").trim() : "";
          campoCapacidad.value = capacidad ? capacidad.textContent.trim() : "";
          campoConductor.value = conductorSpan ? conductorSpan.textContent.trim() : "";

          var estadoTexto = estadoBadge ? estadoBadge.textContent.trim() : "Disponible";
          Array.prototype.forEach.call(campoEstado.options, function (opt, i) {
            if (opt.textContent.trim() === estadoTexto) campoEstado.selectedIndex = i;
          });
          campoEstado.dispatchEvent(new Event("change"));
        });
      });
    });
  }

  /* ---- Modal "Registrar camión" (alta de un camión nuevo) ---- */
  var botonNuevo = document.getElementById("btn-nuevo-camion");
  var overlayNuevo = document.getElementById("modal-nuevo-camion");
  if (botonNuevo && overlayNuevo) {
    var formNuevo = document.getElementById("form-modal-nuevo-camion");
    var modalNuevo = configurarModal(overlayNuevo, formNuevo, {
      mensajeExito: "Camión registrado correctamente.",
    });
    botonNuevo.addEventListener("click", function () {
      modalNuevo.abrir(function () { formNuevo.reset(); });
    });
  }
})();
