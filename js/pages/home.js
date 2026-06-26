import { elementos } from "../data.js";
import {generarTarjetaHTML} from "../components.js";
import {toggleFavoritoStorage,obtenerFavoritos} from "../storage.js";

const contenedorCard = document.getElementById("sect-card"); 
const inputBusqueda = document.getElementById("search");

let favoritos = obtenerFavoritos();
/*
function rendeCard(lista) {
    contenedorCard.innerHTML = "";

    if (lista.length === 0) {
        const noResults = document.createElement("p");
        noResults.innerText = "No se encontraron elementos coincidentes.";
        contenedorCard.appendChild(noResults);
        return;
    }

    lista.forEach(elemento => {
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
        
        const esFav = favoritos.includes(elemento.numero_atomico);
        boton.innerText = esFav ? "❤️" : "🖤";

        if (esFav) {
            boton.classList.add("active");
        }

        boton.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleFavorito(elemento.numero_atomico, boton);
        });

        card.appendChild(numero_atomico);
        card.appendChild(simbolo);
        card.appendChild(nombre);
        card.appendChild(masa_atomica);
        card.appendChild(boton);

        contenedorCard.appendChild(card);
    });
}*/
function rendeCard(lista) {
    contenedorCard.innerHTML = "";

    if (lista.length === 0) {
        const noResults = document.createElement("p");
        noResults.innerText = "No se encontraron elementos coincidentes.";
        contenedorCard.appendChild(noResults);
        return;
    }

    const conjuntoTarjetasHTML = lista.map((elem)=>{
        const esFav = favoritos.includes(elem.numero_atomico);
        return generarTarjetaHTML(elem,esFav,false); 
    }).join('');
    contenedorCard.innerHTML = conjuntoTarjetasHTML;
}
// escucha y ejecuta toggleFavorito()
contenedorCard.addEventListener("click", (event) => {
    const botonTocado = event.target.closest(".btn-fav");

    if(!botonTocado) return;

    console.log("click en boton favorito");
    const tarjeta = botonTocado.closest(".card");
    const idElemento = Number(tarjeta.dataset.id);
    toggleFavorito(idElemento, botonTocado)
});

function toggleFavorito(idElemento, boton) {
    const esAhoraFavorito = toggleFavoritoStorage(idElemento);

    boton.innerText = esAhoraFavorito ? "❤️" : "🖤";
    boton.classList.toggle("activa", esAhoraFavorito);
}


inputBusqueda.addEventListener("keyup", (event) => {
    const textoBuscado = event.target.value.toLowerCase();

    const elementosFiltrados = elementos.filter(elem => {
       const coincideNombre = elem.nombre.toLowerCase().includes(textoBuscado);
       const coincideNumero = elem.numero_atomico.toString().includes(textoBuscado);
       const coincideMasa = elem.masa_atomica.toString().includes(textoBuscado);

       return coincideNombre || coincideNumero || coincideMasa;
    });

    rendeCard(elementosFiltrados);    
});

// Render inicial
rendeCard(elementos);  

// === LÓGICA DEL MODAL (CORREGIDA) ===
const modal = document.querySelector("#modal-h");
const closeBtn = document.querySelector(".close-btn");

// 1. Evento para abrir y rellenar el modal al tocar una tarjeta
document.addEventListener("click", (event) => {
    if (event.target.closest(".btn-fav")) {
        return; 
    }

    const tarjetaClickeada = event.target.closest(".card");

    if (tarjetaClickeada) {
        const idElemento = Number(tarjetaClickeada.dataset.id);
        const infoElemento = elementos.find(elem => elem.numero_atomico === idElemento);

        if (infoElemento) {
            modal.querySelector("h2").innerText = `${infoElemento.nombre} (${infoElemento.simbolo})`;
            
            modal.querySelector(".modal-body").innerHTML = `
                <p><strong>Número Atómico:</strong> ${infoElemento.numero_atomico}</p>
                <p><strong>Masa Atómica:</strong> ${infoElemento.masa_atomica}</p>
                <p><strong>Grupo:</strong> ${infoElemento.grupo || 'No especificado'}</p>
                <p><strong>Descripción:</strong> ${infoElemento.descripcion || 'Sin descripción disponible.'}</p>
            `;
            
            modal.classList.add("open-modal");
        }
    }
});

closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modal.classList.remove("open-modal"); 
});
