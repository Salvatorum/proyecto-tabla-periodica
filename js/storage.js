const KEY_FAVS = "favs_list"; 


export function obtenerFavoritos() {
    const datos = localStorage.getItem(KEY_FAVS);
    return JSON.parse(datos) || [];
}


export function toggleFavoritoStorage(idElemento) {
    let favs = obtenerFavoritos();
    const yaEraFavorito = favs.includes(idElemento);

    if (yaEraFavorito) {
        favs = favs.filter(id => id !== idElemento);
    } else {
        favs.push(idElemento);
    }

    localStorage.setItem(KEY_FAVS, JSON.stringify(favs));

    return !yaEraFavorito;
}