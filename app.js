// Lista de amigos
let listaAmigos = [];
let amigosConteo = 0; // Contador de amigos
let maximoAmigos = 10; // Máximo de amigos permitidos

// Función para inicializar el evento de agregar amigo al presionar Enter
window.onload = function () {
  inicializar();
};

// Función para inicializar los eventos
function inicializar() {
  document.getElementById("amigo").addEventListener("keypress", function (event) {
    if (event.key === "Enter" && amigosConteo < maximoAmigos) {
      agregarAmigo();
    } else if (amigosConteo >= maximoAmigos) {
      bloquearBotonAgregar();
      alert("No puedes agregar más amigos");
    }
  });
}

// Función para agregar un amigo
function agregarAmigo() {
  // trim() elimina espacios al inicio y al final
  // toUpperCase() convierte el nombre a mayúsculas
  let nombre = document.getElementById("amigo").value.trim().toUpperCase();

  if (nombre) {
    if (verificarNombre(nombre)) {
      // No se permite agregar un nombre que ya existe
      alert("Este nombre ya está en la lista de amigos, ¿tal vez un apodo?");
      return;
    } else {
      listaAmigos.push(nombre);
      document.getElementById("amigo").value = ""; // Limpiar el campo de entrada
      amigosConteo++; // Incrementar el contador de amigos
      actualizarLista(amigosConteo); // Actualizar la lista en el HTML
    }
  } else {
    alert("Por favor, ingresa un nombre.");
  }
}

// Función para verificar si un nombre ya está en la lista de amigos
function verificarNombre(nombre) {
  bloquearBotonAgregar(); // Bloquear el botón si se alcanza el máximo de amigos
  return listaAmigos.includes(nombre);
}

// Función para actualizar la lista de amigos en el HTML
function actualizarLista(conteo) {
  let lista = document.getElementById("listaAmigos");
  lista.innerHTML = ""; // Limpiar la lista actual
  for (let i = 0; i < conteo; i++) {
    let li = document.createElement("li");
    li.textContent = (i + 1) + ". " + listaAmigos[i];
    lista.appendChild(li);
  }
}

// Función para bloquear el botón añadir si se alcanza el máximo de amigos
function bloquearBotonAgregar() {
  let botonAgregar = document.querySelector(".button-add");
  let inputAmigo = document.getElementById("amigo");
  if (amigosConteo >= maximoAmigos) {
    botonAgregar.disabled = true;
    inputAmigo.disabled = true; // Deshabilitar el campo de entrada
  } else {
    botonAgregar.disabled = false;
    inputAmigo.disabled = false; // Habilitar el campo de entrada
  }
}

// Función para hacer el sorteo de amigos
function sortearAmigo() {
  let totalAmigos = listaAmigos.length;

  // Verificar si hay al menos dos amigos para hacer el sorteo
  if (totalAmigos < 2) {
    alert("Se necesitan al menos dos amigos para hacer el sorteo.");
    return;
  }

  // Generar un índice aleatorio para seleccionar un amigo
  let indiceAleatorio = Math.floor(Math.random() * totalAmigos);
  let amigoSeleccionado = listaAmigos[indiceAleatorio];

  // Mostrar el amigo seleccionado en el HTML
  document.getElementById("resultado").textContent = "¡¡" + amigoSeleccionado + "!!";

  let botonReiniciar = document.querySelector(".button-restart");
  botonReiniciar.style.display = "block"; // Mostrar el botón de reiniciar
  botonReiniciar.disabled = false; // Habilitar el botón de reiniciar
}

// Función para reiniciar el sorteo
function reiniciarSorteo() {
  yesno = confirm("¿Estás seguro de que quieres reiniciar el sorteo? Esto eliminará todos los amigos y resultados actuales.");
  if (!yesno) {
    return; // Si el usuario cancela, salir de la función
  }

  document.getElementById("resultado").textContent = "";
  amigosConteo = 0;
  listaAmigos = [];
  actualizarLista(amigosConteo);
  bloquearBotonAgregar();
  let botonReiniciar = document.querySelector(".button-restart");
  botonReiniciar.style.display = "none"; // Ocultar el botón de reiniciar
}