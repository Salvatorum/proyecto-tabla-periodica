// Inyeción de header
export function renderHeader() {
  const header = document.getElementById("main-header");
  const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));

  if (!header) return;

  header.innerHTML = `
        <nav>
            <ul> 
                <li><img id="logo" src="./assets/img/logo01.png" alt="logo"></li>
                <li><a href="./index.html" id="elementos">Elementos</a></li>
  ${
    usuarioActivo
      ? `
                    <li>
                        <a href="./perfil.html" class="nav-shadow-icon">
                            <img src="./assets/img/perfil.svg" alt="Perfil">
                        </a>
                    </li>
                  `
      : `
                    <li>
                        <a href="./login.html" class="nav-shadow-icon">
                            <img src="./assets/img/login.svg" alt="Login">
                        </a>
                    </li>
                  `
  }
        </nav>
    `;
}
// Inyeción de footer

export function renderFooter() {
  const footer = document.getElementById("main-footer");

  if (!footer) return;

  footer.innerHTML = `
        <div id="logo-footer">
            <img src="./assets/img/logo01.png" alt="logo">
        </div>

       <nav aria-label="Redes sociales" class="nav-redes">
            <ul>
                <li>
                    <a href="https://github.com/Salvatorum/proyecto-tabla-periodica" target="_blank" aria-label="GitHub">
                        <img src="./assets/img/github.png" alt="">
                    </a>
                </li>
                <li>
                    <a href="#" target="_blank" aria-label="LinkedIn">
                        <img src="./assets/img/social.png" alt="">
                    </a>
                </li>
                <li>
                    <a href="#" target="_blank" aria-label="Instagram">
                        <img src="./assets/img/logotipo-de-instagram.png" alt="">
                    </a>
                </li>
            </ul>
        </nav>

        <nav aria-label="Enlaces de ayuda" class="nav-ayuda">
            <ul>
                <li><a href="#">Contáctanos</a></li>
                <li><a href="#">Ayuda</a></li>
                <li><a href="#">Preguntas frecuentes</a></li>
            </ul>
        </nav>

        <div id="text-footer">
            <p>&copy; 2026 Tabla Periódica. Todos los derechos reservados.</p>
        </div>
    `;
}

// Generador de tarjetas de elementos
export function generarTarjetaHTML(
  elemento,
  esFavorito = false,
  esVistaPerfil = false,
) {
  let iconoBoton = "";

  if (esVistaPerfil) {
    iconoBoton = "🗙";
  } else {
    iconoBoton = esFavorito ? "❤️" : "🖤";
  }

  const claseActiva = esFavorito && !esVistaPerfil ? "activa" : "";

  return `
        <article class="card" data-id="${elemento.numero_atomico}">
            <span class="atomic-number">${elemento.numero_atomico}</span>
            <h3>${elemento.simbolo}</h3>
            <p class="name">${elemento.nombre}</p>
            <span class="atomic-mass">${elemento.masa_atomica}</span>
            <button class="btn-fav ${claseActiva}">${iconoBoton}</button>
        </article>
    `;
}
