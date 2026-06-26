    document.addEventListener('DOMContentLoaded', () => {
        
    const formulario = document.querySelector('.form-estilo');
    const inputUsuario = document.querySelector('input[name="usuario"]');
    const inputCorreo = document.querySelector('input[name="correo"]');
    const inputPass = document.querySelector('input[name="pass"]');
    const inputPassConfirm = document.querySelector('input[name="pass-confirm"]');
    
    //Elemento dinámico para errores generales
    const mensajeError = document.createElement('p');
    mensajeError.style.color = '#ff4d4d';
    mensajeError.style.marginTop = '15px';
    mensajeError.style.fontWeight = '500';
    mensajeError.style.textAlign = 'center';
    formulario.appendChild(mensajeError);

    //Validaciones en tiempo real
    const inputs = [inputUsuario, inputCorreo, inputPass, inputPassConfirm];

    inputs.forEach(input => {
        //Cuando el usuario sale del campo
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#ff4d4d';
                input.style.boxShadow = '0 0 5px rgba(255, 77, 77, 0.5)';
            }
        });

        //Cuando el usuario entra al campo
        input.addEventListener('focus', () => {
            input.style.borderColor = '#cccccc';
            input.style.boxShadow = 'none';
            mensajeError.textContent = ''; //Limpia el mensaje de error general
        });
    });

    //Control del reset
    formulario.addEventListener('reset', () => {
        inputs.forEach(input => {
            input.style.borderColor = '#cccccc';
            input.style.boxShadow = 'none';
        });
        mensajeError.textContent = '';
    });

    //Control del envío
    formulario.addEventListener('submit', (e) => {
        //Cargamos la base de datos local para verificar duplicados
        let usuariosDB = JSON.parse(localStorage.getItem("usuarios_db")) || [];
        let registroValido = true;

        //Validar que no haya campos vacíos
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#ff4d4d';
                registroValido = false;
            }
        });

        if (!registroValido) {
            e.preventDefault(); //Restringe el envío
            mensajeError.textContent = '❌ Por favor, completa todos los campos obligatorios.';
            return;
        }

        //Validar formato de contraseña
        // Patrón: 8-12 caracteres, al menos 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial (!#?_-+)
        const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#?_\-+])[A-Za-z\d!#?_\-+]{8,12}$/;
        
        if (!regexPass.test(inputPass.value)) {
            e.preventDefault(); //Evita el envío
            
            mensajeError.textContent = '❌ La contraseña debe tener entre 8 y 12 caracteres, incluir al menos una mayúscula, una minúscula, un número y un carácter especial (!#?_-+).';
            
            inputPass.style.borderColor = '#ff4d4d';
            return;
        }

        //Validar que las contraseñas coincidan
        if (inputPass.value !== inputPassConfirm.value) {
            e.preventDefault();
            mensajeError.textContent = '❌ Las contraseñas no coinciden.';
            inputPassConfirm.style.borderColor = '#ff4d4d';
            return;
        }

        //Control de duplicados
        const usernameVal = inputUsuario.value.trim().toLowerCase();
        const emailVal = inputCorreo.value.trim().toLowerCase();

        const existe = usuariosDB.some(u => 
            u.username.toLowerCase() === usernameVal || u.email.toLowerCase() === emailVal
        );

        if (existe) {
            e.preventDefault();
            mensajeError.textContent = '❌ El usuario o email ya se encuentra registrado.';
            return;
        }

        //Persistencia en localstorage
        const nuevoUsuario = {
            username: inputUsuario.value.trim(),
            email: emailVal,
            password: inputPass.value //Se guarda para validar luego en el Login
        };

        usuariosDB.push(nuevoUsuario);
        localStorage.setItem("usuarios_db", JSON.stringify(usuariosDB)); //Guardado definitivo

        alert('¡Cuenta creada con éxito! Serás redirigido al Login.');
        //El formulario seguirá su curso hacia login.html mediante el action del HTML
    });
});