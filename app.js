// Lista de amigos y configuración
let listaAmigos = [];
let amigosConteo = 0;
const MAXIMO_AMIGOS = 10;

// Inicializar eventos cuando la página carga
window.onload = function () {
  document
    .getElementById("amigo")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        if (amigosConteo < MAXIMO_AMIGOS) {
          agregarAmigo();
        } else {
          alert("No puedes agregar más amigos");
        }
      }
    });
};

// Función para agregar un amigo
function agregarAmigo() {
  if (amigosConteo >= MAXIMO_AMIGOS) {
    alert(`No puedes agregar más amigos, el máximo es ${MAXIMO_AMIGOS}`);
    return;
  }

  let nombre = document.getElementById("amigo").value.trim().toUpperCase();

  if (!nombre) {
    alert("Por favor, ingresa un nombre.");
    return;
  }

  if (listaAmigos.includes(nombre)) {
    alert("Este nombre ya está en la lista de amigos, ¿tal vez un apodo?");
    return;
  }

  listaAmigos.push(nombre);
  document.getElementById("amigo").value = "";
  amigosConteo++;
  actualizarLista();
  bloquearBotonAgregar();
}

// Función para actualizar la lista de amigos en el HTML
function actualizarLista() {
  let lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";
  listaAmigos.forEach((amigo, index) => {
    let li = document.createElement("li");
    li.textContent = `${index + 1}. ${amigo}`;
    lista.appendChild(li);
  });
}

// Función para bloquear/desbloquear controles según el límite
function bloquearBotonAgregar() {
  let botonAgregar = document.querySelector(".button-add");
  let inputAmigo = document.getElementById("amigo");
  let bloqueado = amigosConteo >= MAXIMO_AMIGOS;

  botonAgregar.disabled = bloqueado;
  inputAmigo.disabled = bloqueado;
}

// Función para hacer el sorteo de amigos
function sortearAmigo() {
  if (listaAmigos.length < 2) {
    alert("Se necesitan al menos dos amigos para hacer el sorteo.");
    return;
  }

  let indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
  let amigoSeleccionado = listaAmigos[indiceAleatorio];

  document.getElementById("resultado").textContent = `¡¡${amigoSeleccionado}!!`;

  let botonReiniciar = document.querySelector(".button-restart");
  botonReiniciar.style.display = "block";
  botonReiniciar.disabled = false;
}

// Función para reiniciar el sorteo
function reiniciarSorteo() {
  if (
    !confirm(
      "¿Estás seguro de que quieres reiniciar el sorteo? Esto eliminará todos los amigos y resultados actuales."
    )
  ) {
    return;
  }

  document.getElementById("resultado").textContent = "";
  amigosConteo = 0;
  listaAmigos = [];
  actualizarLista();
  bloquearBotonAgregar();
  document.querySelector(".button-restart").style.display = "none";
}
