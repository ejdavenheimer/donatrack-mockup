/* =============================================================
   DONATRACK · Desplegables propios
   Reemplaza cada <select class="pill-input|admin-input|admin-select-action">
   por un botón + lista propios (mismo look que el resto del sitio),
   dejando el <select> original oculto para conservar su valor/nombre.
   No requiere tocar el HTML de cada página: se auto-aplica al cargar.
   ============================================================= */
(function () {
  "use strict";

  var CHEVRON =
    '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="m6 9 6 6 6-6"/></svg>';

  function mejorar(select) {
    if (select.dataset.dzHecho) return;
    select.dataset.dzHecho = "1";

    var clases = select.className;
    var estiloInline = select.getAttribute("style") || "";
    var opciones = Array.prototype.slice.call(select.options);
    var idBase = "dz" + Math.random().toString(36).slice(2, 9);

    var wrapper = document.createElement("div");
    wrapper.className = "ddz " + clases;
    if (estiloInline) wrapper.setAttribute("style", estiloInline);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = clases + " ddz-btn";
    btn.id = idBase + "-btn";
    btn.setAttribute("aria-haspopup", "listbox");
    btn.setAttribute("aria-expanded", "false");
    if (select.disabled) btn.disabled = true;

    var valorSpan = document.createElement("span");
    valorSpan.className = "ddz-valor";

    var lista = document.createElement("ul");
    lista.className = "ddz-lista";
    lista.id = idBase + "-lista";
    lista.setAttribute("role", "listbox");
    lista.hidden = true;
    btn.setAttribute("aria-controls", lista.id);

    var resaltado = -1;

    function pintar() {
      var actual = select.options[select.selectedIndex];
      valorSpan.textContent = actual ? actual.textContent : "";
    }

    opciones.forEach(function (opt, i) {
      var li = document.createElement("li");
      li.className = "ddz-opcion";
      li.setAttribute("role", "option");
      li.textContent = opt.textContent;
      li.dataset.indice = i;
      if (opt.disabled) li.setAttribute("aria-disabled", "true");
      li.setAttribute("aria-selected", i === select.selectedIndex ? "true" : "false");
      li.addEventListener("click", function () {
        if (opt.disabled) return;
        elegir(i);
      });
      lista.appendChild(li);
    });

    function resaltar(i) {
      resaltado = i;
      Array.prototype.forEach.call(lista.children, function (li, idx) {
        li.classList.toggle("resaltada", idx === i);
      });
    }

    function elegir(i) {
      select.selectedIndex = i;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      pintar();
      Array.prototype.forEach.call(lista.children, function (li, idx) {
        li.setAttribute("aria-selected", idx === i ? "true" : "false");
      });
      cerrar();
      btn.focus();
    }

    function abrir() {
      if (btn.disabled) return;
      document.querySelectorAll(".ddz-lista").forEach(function (l) {
        if (l !== lista) l.hidden = true;
      });
      document.querySelectorAll(".ddz-btn").forEach(function (b) {
        if (b !== btn) b.setAttribute("aria-expanded", "false");
      });
      lista.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      resaltar(select.selectedIndex);
      var actual = lista.children[select.selectedIndex];
      if (actual) actual.scrollIntoView({ block: "nearest" });
    }

    function cerrar() {
      lista.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      resaltado = -1;
    }

    btn.addEventListener("click", function () {
      if (lista.hidden) abrir();
      else cerrar();
    });

    btn.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (lista.hidden) {
          abrir();
          return;
        }
        var dir = e.key === "ArrowDown" ? 1 : -1;
        var n = opciones.length;
        var siguiente = resaltado;
        var vueltas = 0;
        do {
          siguiente = (siguiente + dir + n) % n;
          vueltas++;
        } while (opciones[siguiente].disabled && vueltas <= n);
        resaltar(siguiente);
        lista.children[siguiente].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (lista.hidden) abrir();
        else if (resaltado >= 0) elegir(resaltado);
      } else if (e.key === "Escape") {
        if (!lista.hidden) {
          e.preventDefault();
          cerrar();
        }
      } else if (e.key === "Tab") {
        cerrar();
      }
    });

    document.addEventListener("click", function (e) {
      if (!wrapper.contains(e.target)) cerrar();
    });

    pintar();
    btn.appendChild(valorSpan);
    var flechaSpan = document.createElement("span");
    flechaSpan.className = "ddz-flecha";
    flechaSpan.innerHTML = CHEVRON;
    btn.appendChild(flechaSpan);

    select.hidden = true;
    select.setAttribute("aria-hidden", "true");
    select.tabIndex = -1;

    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(btn);
    wrapper.appendChild(lista);
    wrapper.appendChild(select);
  }

  function iniciar() {
    document
      .querySelectorAll(
        "select.pill-input, select.admin-input, select.admin-select-action"
      )
      .forEach(mejorar);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
