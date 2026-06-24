import { elementos } from "../data.js";
const contenedorFav = document.getElementById("contenedor_fav");
const grillaFav = document.getElementById("grilla-favoritos");

const REGEX_USER = /^[a-zA-Z_]{6,15}$/;
// Entre 8 y 12 caracteres, al menos una mayúscula, una minúscula, un dígito y un carácter especial del grupo idóneo.
const REGEX_PASS =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#?_\-+])[A-Za-z\d!#?_\-+]{8,12}$/;

// Base de datos local simulada (inicializada desde localStorage)
let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios_db")) || [];
let favoritos = JSON.parse(localStorage.getItem("favs_list")) || [];

function obtenerProductosFavoritos() {
  return elementos.filter((element) =>
    favoritos.includes(element.numero_atomico),
  );
}
function rendeFavs(lista) {
  grillaFav.innerHTML = "";

  if (lista.length === 0) {
    const noResultados = document.createElement("p");
    noResultados.classList.add("oracion");
    noResultados.innerText = "No se agregaron favoritos";
    const volverHome = document.createElement("a");
    volverHome.classList.add("boton_falso");
    volverHome.href = "./index.html";
    volverHome.innerText = "Ver elementos disponibles";
    contenedorFav.appendChild(noResultados);
    contenedorFav.appendChild(volverHome);
    return;
  }

  lista.forEach((elemento) => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.dataset.id = elemento.numero_atomico;

    const numero_atomico = document.createElement("span");
    numero_atomico.classList.add("atomic-number");
    numero_atomico.innerText = elemento.numero_atomico;

    const simbolo = document.createElement("h3");
    simbolo.innerText = elemento.simbolo;

    const nombre = document.createElement("p");
    nombre.classList.add("name");
    nombre.innerText = elemento.nombre;

    const masa_atomica = document.createElement("span");
    masa_atomica.classList.add("atomic-mass");
    masa_atomica.innerText = elemento.masa_atomica;

    card.appendChild(numero_atomico);
    card.appendChild(simbolo);
    card.appendChild(nombre);
    card.appendChild(masa_atomica);
    grillaFav.appendChild(card);
  });
}

window.addEventListener("load", () => {
  const listaFavs = obtenerProductosFavoritos();
  rendeFavs(listaFavs);
});
