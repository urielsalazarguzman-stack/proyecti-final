
// Variables principales de la aplicación
let puntos = 0;
let limpiezas = 0;
let recompensasCanjeadas = 0;
let puntoSeleccionado = "";

// Disponibilidad de cada zona
let parqueDisponible = true;
let escuelaDisponible = true;
let tiendasDisponible = true;

// Cambiar entre las pantallas
function mostrarSeccion(nombre) {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("mapa").style.display = "none";
    document.getElementById("recompensas").style.display = "none";
    document.getElementById("perfil").style.display = "none";

    document.getElementById("btnInicio").className = "";
    document.getElementById("btnMapa").className = "";
    document.getElementById("btnRecompensas").className = "";
    document.getElementById("btnPerfil").className = "";

    document.getElementById(nombre).style.display = "block";

    if (nombre == "inicio") {
        document.getElementById("btnInicio").className = "nav-activo";
    } else if (nombre == "mapa") {
        document.getElementById("btnMapa").className = "nav-activo";
    } else if (nombre == "recompensas") {
        document.getElementById("btnRecompensas").className = "nav-activo";
    } else if (nombre == "perfil") {
        document.getElementById("btnPerfil").className = "nav-activo";
    }
}

// Actualizar las estadísticas
function actualizarEstadisticas() {
    document.getElementById("puntosEncabezado").textContent = puntos;
    document.getElementById("puntosInicio").textContent = puntos;
    document.getElementById("puntosTienda").textContent = puntos;
    document.getElementById("puntosPerfil").textContent = puntos;

    document.getElementById("limpiezasInicio").textContent = limpiezas;
    document.getElementById("limpiezasPerfil").textContent = limpiezas;

    document.getElementById("recompensasInicio").textContent = recompensasCanjeadas;
    document.getElementById("recompensasPerfil").textContent = recompensasCanjeadas;
}

// Seleccionar un punto del mapa
function seleccionarPunto(lugar) {
    puntoSeleccionado = lugar;

    let nombre = "";
    let descripcion = "";
    let cantidad = 0;
    let disponible = false;

    if (lugar == "parque") {
        nombre = "Parque Central";
        descripcion = "Se encontraron residuos en el área verde y cerca de las bancas.";
        cantidad = 50;
        disponible = parqueDisponible;
    } else if (lugar == "escuela") {
        nombre = "Cerca de la escuela";
        descripcion = "Hay basura acumulada en la banqueta y alrededor de la entrada.";
        cantidad = 60;
        disponible = escuelaDisponible;
    } else if (lugar == "tiendas") {
        nombre = "Zona comercial";
        descripcion = "Se reportaron residuos cerca de los comercios y los contenedores.";
        cantidad = 75;
        disponible = tiendasDisponible;
    }

    document.getElementById("detalleNombre").textContent = nombre;
    document.getElementById("detalleDescripcion").textContent = descripcion;
    document.getElementById("detalleCantidad").textContent = cantidad + " puntos";

    if (disponible == true) {
        document.getElementById("btnRecolectar").disabled = false;
        document.getElementById("btnRecolectar").textContent = "Marcar como limpia";
        document.getElementById("mensajeMapa").textContent = "Después de recoger la basura, marca esta zona como limpia.";
    } else {
        document.getElementById("btnRecolectar").disabled = true;
        document.getElementById("btnRecolectar").textContent = "Zona ya limpia";
        document.getElementById("mensajeMapa").textContent = "¡Esta zona ya fue limpiada!";
    }
}

// Recoger basura y ganar puntos
function recolectarBasura() {
    if (puntoSeleccionado == "") {
        document.getElementById("mensajeMapa").textContent = "Primero selecciona una zona del mapa.";

    } else if (puntoSeleccionado == "parque" && parqueDisponible == true) {
        parqueDisponible = false;
        puntos = puntos + 50;
        limpiezas = limpiezas + 1;

        document.getElementById("pinParque").className = "marcador limpio";
        document.getElementById("pinParque").textContent = "✓";

        actualizarEstadisticas();
        seleccionarPunto("parque");

        document.getElementById("mensajeMapa").textContent = "¡Muy bien! Ganaste 50 EcoPuntos.";

    } else if (puntoSeleccionado == "escuela" && escuelaDisponible == true) {
        escuelaDisponible = false;
        puntos = puntos + 60;
        limpiezas = limpiezas + 1;

        document.getElementById("pinEscuela").className = "marcador limpio";
        document.getElementById("pinEscuela").textContent = "✓";

        actualizarEstadisticas();
        seleccionarPunto("escuela");

        document.getElementById("mensajeMapa").textContent = "¡Muy bien! Ganaste 60 EcoPuntos.";

    } else if (puntoSeleccionado == "tiendas" && tiendasDisponible == true) {
        tiendasDisponible = false;
        puntos = puntos + 75;
        limpiezas = limpiezas + 1;

        document.getElementById("pinTiendas").className = "marcador limpio";
        document.getElementById("pinTiendas").textContent = "✓";

        actualizarEstadisticas();
        seleccionarPunto("tiendas");

        document.getElementById("mensajeMapa").textContent = "¡Muy bien! Ganaste 75 EcoPuntos.";

    } else {
        document.getElementById("mensajeMapa").textContent = "Esta zona ya fue limpiada. Elige otro punto.";
    }
}

// Canjear recompensas
function canjearRecompensa(costo, nombre) {
    if (puntos >= costo) {
        puntos = puntos - costo;
        recompensasCanjeadas = recompensasCanjeadas + 1;

        document.getElementById("mensajeTienda").textContent = "¡Canje realizado! Obtuviste: " + nombre + ".";

        actualizarEstadisticas();

    } else {
        document.getElementById("mensajeTienda").textContent = "Aún no tienes suficientes puntos. ¡Sigue limpiando zonas!";
    }
}

// Mostrar estadísticas iniciales
actualizarEstadisticas();

