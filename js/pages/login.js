login.js
// js/pages/login.js

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-login');
    const userInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');

    // Elemento dinámico para errores generales
    const mensajeError = document.createElement('p');
    mensajeError.style.color = '#ff4d4d';
    mensajeError.style.marginTop = '15px';
    mensajeError.style.fontWeight = '500';
    mensajeError.style.textAlign = 'center';
    formulario.appendChild(mensajeError);

    // --- VALIDACIONES EN TIEMPO REAL (Punto 4.1: focus y blur) ---
    const inputs = [userInput, passwordInput];

    inputs.forEach(input => {
        // Cuando el usuario sale del input (blur)
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#ff4d4d'; // Borde rojo si está vacío
                input.style.boxShadow = '0 0 5px rgba(255, 77, 77, 0.5)';
            }
        });

        // Cuando el usuario vuelve a entrar al input (focus)
        input.addEventListener('focus', () => {
            input.style.borderColor = ''; // Limpiamos el error visual
            input.style.boxShadow = '';
        });
    });
    // -------------------------------------------------------------

    // Escuchamos el envío del formulario
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Detiene el envío nativo
        
        mensajeError.textContent = ''; 

        // Forzamos la validación visual si intentan enviar directo
        let formularioValido = true;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#ff4d4d';
                formularioValido = false;
            }
        });

        if (!formularioValido) {
            mensajeError.textContent = '❌ Por favor, completá los campos obligatorios.';
            return;
        }

        // Llamamos a la autenticación por localStorage
        const resultado = iniciarSesion(userInput.value, passwordInput.value);

        if (resultado.exito) {
            alert('¡Ingreso exitoso al sistema!');
            window.location.href = './index.html'; 
        } else {
            mensajeError.textContent = `❌ ${resultado.mensaje}`;
        }
    });
});