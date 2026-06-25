// js/auth.js

// Credenciales fijas para probar el TP en la facultad
const CREDENCIALES_TP = {
    usuario: "admin",
    email: "admin@tabla.com",
    password: "123456"
};

/**
 * Intenta iniciar sesión comparando los datos ingresados
 */
function iniciarSesion(userInput, password) {
    const loginLimpio = userInput.trim();
    const passLimpio = password.trim();

    // Validamos si coincide con el usuario o con el email
    if ((loginLimpio === CREDENCIALES_TP.usuario || loginLimpio === CREDENCIALES_TP.email) && 
        passLimpio === CREDENCIALES_TP.password) {
        
        // Guardamos el usuario activo en sessionStorage (dura hasta cerrar la pestaña)
        const usuarioSesion = { username: CREDENCIALES_TP.usuario, email: CREDENCIALES_TP.email };
        sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioSesion));
        
        return { exito: true };
    }

    return { exito: false, mensaje: "Usuario o contraseña incorrectos." };
}

/**
 * Verifica si actualmente hay alguien logueado
 */
function obtenerUsuarioLogueado() {
    const usuario = sessionStorage.getItem('usuarioActivo');
    return usuario ? JSON.parse(usuario) : null;
}

/**
 * Cierra la sesión activa
 */
function cerrarSesion() {
    sessionStorage.removeItem('usuarioActivo');
    window.location.href = './login.html';
}