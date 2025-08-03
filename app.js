// Lista de amigos
let listaAmigos = [];

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
      actualizarLista(); // Actualizar la lista en el HTML
    }
  } else {
    alert("Por favor, ingresa un nombre.");
  }
}

// Función para verificar si un nombre ya está en la lista de amigos
function verificarNombre(nombre) {
  return listaAmigos.includes(nombre);
}

// Función para actualizar la lista de amigos en el HTML
function actualizarLista() {
  let lista = document.getElementById("listaAmigos");
  lista.innerHTML = ""; // Limpiar la lista actual
  for (let amigo of listaAmigos) {
    // Crear un nuevo elemento de lista para cada amigo
    let li = document.createElement("li");
    li.textContent = amigo;
    lista.appendChild(li);
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
  document.getElementById("resultado").textContent = amigoSeleccionado;
}