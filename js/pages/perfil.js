import { elementos } from "../data.js";
const contenedorFav = document.getElementById("contenedor_fav");
const grillaFav = document.getElementById("grilla-favoritos");

//Guardo en variables los localStorage
let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios_db")) || [];
let favoritos = JSON.parse(localStorage.getItem("favs_list")) || [];

//Aca filtro los elementos favoritos
function obtenerProductosFavoritos() {
  return elementos.filter((element) =>
    favoritos.includes(element.numero_atomico),
  );
}

//Renderizo la parte de favoritos..
function rendeFavs(lista) {
  grillaFav.innerHTML = "";

  //Cierro sesion
  document.getElementById("cerrar-sesion").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioLogueado");
    window.location.href = "./login.html";
  });

  //Agrego los elementos
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

    const boton = document.createElement("button");
    boton.classList.add("btn-fav");

    boton.innerText = "🗙";

    //Los agrego de hijos a la card (viene sus atributos del css =  components.css)
    card.appendChild(numero_atomico);
    card.appendChild(simbolo);
    card.appendChild(nombre);
    card.appendChild(masa_atomica);
    card.appendChild(boton);
    grillaFav.appendChild(card);

    //SACO EL ELEMENTO
    boton.addEventListener("click", () => {
      favoritos = favoritos.filter((id) => id !== elemento.numero_atomico);

      localStorage.setItem("favs_list", JSON.stringify(favoritos));

      //Actualizo la parte de favoritos para sacar el elemento
      rendeFavs(obtenerProductosFavoritos());
    });
  });
}

//Renderizo la parte de perfil..
function renderPerfil() {
  const usuarioActivoSesion = JSON.parse(sessionStorage.getItem("usuarioActivo"));
  const emailLogueado = usuarioActivoSesion ? usuarioActivoSesion.email : null;

  const usuarioActual = usuariosRegistrados.find(
    (usuario) => usuario.email === emailLogueado,
  );
/*
  //Prueba del codigo sin logeo (ya que todavia no terminan la parte del login)
  console.log("usuariosRegistrados:", usuariosRegistrados);
  console.log("emailLogueado:", emailLogueado);
  console.log("usuarioActual:", usuarioActual);
*/
  // verifica si no hay un usuario logueado en la sesión activa
  if (!usuarioActual) {
        console.warn("No se encontró ningún usuario activo en la sesión.");
        return;
    }

  document.getElementById("email").value = usuarioActual.email;
  document.getElementById("nombre").value = usuarioActual.username;
  document.getElementById("password").value = usuarioActual.password;
  document.getElementById("error-user").textContent = "";
  document.getElementById("error-password").textContent = "";
    
  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const nuevoUsername = document.getElementById("nombre").value.trim();
    const nuevaPassword = document.getElementById("password").value.trim();

    //Valido y verifico que la contraseña y el usuario cumplan con la condicion o no exista el usuario
    const errorUser = validarUsername(nuevoUsername);
    const errorPass = validarPassword(nuevaPassword);
    document.getElementById("error-user").textContent = errorUser;
    document.getElementById("error-password").textContent = errorPass;

    if (errorUser || errorPass) {
      return;
    }

    usuarioActual.username = nuevoUsername;
    usuarioActual.password = nuevaPassword;

    localStorage.setItem("usuarios_db", JSON.stringify(usuariosRegistrados));
    alert("Cambios guardados correctamente");
  });

  function validarUsername(username) {
    const REGEX_USER = /^[a-zA-Z_]{6,15}$/;

    if (!REGEX_USER.test(username)) {
      return "Debe tener entre 6 y 15 caracteres y contener solo letras o _";
    }
    const usuarioExiste = usuariosRegistrados.some(
      (usuario) =>
        usuario.username.toLowerCase() === username.toLowerCase() &&
        usuario.email !== usuarioActual.email,
    );

    if (usuarioExiste) {
      return "Ese nombre de usuario ya está registrado";
    }

    return "";
  }

  function validarPassword(password) {
    const REGEX_PASS =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#?_\-+])[A-Za-z\d!#?_\-+]{8,12}$/;
    // Entre 8 y 12 caracteres, al menos una mayúscula, una minúscula, un dígito y un carácter especial del grupo idóneo.

    if (!REGEX_PASS.test(password)) {
      return " Entre 8 y 12 caracteres, al menos una mayúscula, una minúscula, un dígito y un carácter especial del grupo idóneo.";
    }

    return "";
  }
}
//Renderizo y cargo la página.
window.addEventListener("load", () => {
  const listaFavs = obtenerProductosFavoritos();
  rendeFavs(listaFavs);
  renderPerfil();
});
