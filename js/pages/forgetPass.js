// js/pages/forgetPass.js

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-forget-pass');
    const emailInput = document.getElementById('forget-email');

    // Elemento para mostrar mensajes de error o éxito
    const mensaje = document.createElement('p');
    mensaje.style.marginTop = '15px';
    mensaje.style.fontWeight = '500';
    mensaje.style.textAlign = 'center';
    formulario.appendChild(mensaje);

    // --- VALIDACIONES EN TIEMPO REAL (Blur y Focus) ---
    emailInput.addEventListener('blur', () => {
        if (emailInput.value.trim() === '') {
            emailInput.style.border = '2px solid #ff4d4d';
            emailInput.style.boxShadow = '0 0 5px rgba(255, 77, 77, 0.5)';
        }
    });

    emailInput.addEventListener('focus', () => {
        emailInput.style.border = '';
        emailInput.style.boxShadow = '';
        mensaje.textContent = '';
    });

    // --- MANEJO DEL SUBMIT ---
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue o redirija sola

        const emailValue = emailInput.value.trim();

        // 1. Validar campo vacío
        if (emailValue === '') {
            emailInput.style.border = '2px solid #ff4d4d';
            mensaje.style.color = '#ff4d4d';
            mensaje.textContent = '❌ Por favor, ingresá tu correo electrónico.';
            return;
        }

        // 2. Validar formato de email con una expresión regular básica (Regex)
        const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!expresionEmail.test(emailValue)) {
            emailInput.style.border = '2px solid #ff4d4d';
            mensaje.style.color = '#ff4d4d';
            mensaje.textContent = '❌ El formato del correo electrónico no es válido.';
            return;
        }

        // Si pasa las validaciones, mostramos éxito y redirigimos de forma controlada
        mensaje.style.color = '#4caf50'; // Color verde de éxito
        mensaje.textContent = '✨ Enlace de recuperación enviado con éxito.';

        // Simulamos un retraso de 2 segundos para que el usuario lea el mensaje y lo mandamos al login
        setTimeout(() => {
            window.location.href = './login.html';
        }, 2000);
    });
});