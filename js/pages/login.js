// js/pages/login.js

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-login');
    const userInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');

    // Creamos un elemento para el mensaje de error de manera dinámica
    const mensajeError = document.createElement('p');
    mensajeError.style.color = '#ff4d4d';
    mensajeError.style.marginTop = '15px';
    mensajeError.style.fontWeight = '500';
    mensajeError.style.textAlign = 'center';
    formulario.appendChild(mensajeError);

    // Escuchamos el envío del formulario
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Frenamos la recarga de la página
        
        mensajeError.textContent = ''; // Limpiamos errores previos

        // Llamamos a la función global de auth.js
        const resultado = iniciarSesion(userInput.value, passwordInput.value);

        if (resultado.exito) {
            alert('¡Ingreso exitoso al sistema!');
            window.location.href = './index.html'; // Redirige al inicio
        } else {
            // Mostramos el error devuelto por el autenticador
            mensajeError.textContent = `❌ ${resultado.mensaje}`;
        }
    });
});