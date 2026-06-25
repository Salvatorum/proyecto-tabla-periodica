// js/auth.js

/**
 * Intenta iniciar sesión buscando en el localStorage (Requerimiento 4.2)
 */
function iniciarSesion(userInput, password) {
    const loginLimpio = userInput.trim();
    const passLimpio = password.trim();

    // 1. Traemos los usuarios registrados en el LocalStorage (los que guardará tu compañero)
    // Si no hay ninguno todavía, usamos un array vacío
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // 2. Buscamos si existe un usuario cuyo email o username coincida
    const usuarioEncontrado = usuariosRegistrados.find(user => 
        user.username === loginLimpio || user.email === loginLimpio
    );

    // 3. Validamos la existencia y la contraseña
    if (usuarioEncontrado && usuarioEncontrado.password === passLimpio) {
        // Guardamos la sesión activa en sessionStorage
        sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));
        return { exito: true };
    }

    // Un usuario de respaldo por si quieren probar el login sin registrarse primero
    if ((loginLimpio === "admin" || loginLimpio === "admin@tabla.com") && passLimpio === "123456") {
        const adminUser = { username: "admin", email: "admin@tabla.com" };
        sessionStorage.setItem('usuarioActivo', JSON.stringify(adminUser));
        return { exito: true };
    }

    return { exito: false, mensaje: "Usuario o contraseña incorrectos." };
}

function obtenerUsuarioLogueado() {
    const usuario = sessionStorage.getItem('usuarioActivo');
    return usuario ? JSON.parse(usuario) : null;
}

function cerrarSesion() {
    sessionStorage.removeItem('usuarioActivo');
    window.location.href = './login.html';
}