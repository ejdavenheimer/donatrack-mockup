/* =============================================================
   DONATRACK · Cerrar sesión
   El botón "Salir" de la sub-nav de cada dashboard avisa con un
   toast y devuelve a la persona a la pantalla de ingreso.
   ============================================================= */
(function () {
  "use strict";

  var boton = document.querySelector(".logout-btn");
  if (!boton) return;

  boton.addEventListener("click", function () {
    if (window.DonaToast) DonaToast.show("Sesión cerrada. ¡Hasta pronto!", "info");
    setTimeout(function () {
      window.location.href = "ingresar.html";
    }, 700);
  });
})();
