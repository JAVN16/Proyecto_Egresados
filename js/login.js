const formularioLogin = document.querySelector("#formLogin");

const correoLogin = document.getElementById("correoLogin");
const contrasena = document.getElementById("contrasena");

const errorCorreoLogin = document.getElementById("errorCorreoLogin");
const errorContrasena = document.getElementById("errorContrasena");
const mensajeLogin = document.getElementById("mensajeLogin");


formularioLogin.addEventListener("submit", function(evento){

    evento.preventDefault();

    mensajeLogin.textContent = ""; 

    limpiarErroresLogin();

    let hayErrores = validarLogin();

    if(hayErrores == false){

        guardarLogin();

    }

});


function validarLogin(){

    let error = false;

    const regexCorreo = /^[^\s@]+@ucenfotec\.ac\.cr$/;


    if(correoLogin.value.trim() == ""){

        errorCorreoLogin.textContent = "Debe ingresar el correo institucional.";
        correoLogin.classList.add("input-error");
        error = true;

    }else if(!regexCorreo.test(correoLogin.value.trim())){

        errorCorreoLogin.textContent = "Debe ingresar un correo institucional válido.";
        correoLogin.classList.add("input-error");
        error = true;

    }


    if(contrasena.value.trim() == ""){

        errorContrasena.textContent = "Debe ingresar la contraseña.";
        contrasena.classList.add("input-error");
        error = true;

    }else if(contrasena.value.length < 6){

        errorContrasena.textContent = "La contraseña debe tener al menos 6 caracteres.";
        contrasena.classList.add("input-error");
        error = true;

    }


    return error;

}


function guardarLogin(){

    let datosLogin = {

        correo: correoLogin.value.trim(),
        contrasena: contrasena.value

    };


    localStorage.setItem(
        "login",
        JSON.stringify(datosLogin)
    );


    formularioLogin.reset();

    limpiarErroresLogin();

    mensajeLogin.textContent = "Inicio de sesión realizado correctamente.";
    
    console.log("Datos de inicio de sesión:");
    console.log(datosLogin);

}


function limpiarErroresLogin(){

    errorCorreoLogin.textContent = "";
    errorContrasena.textContent = "";

    correoLogin.classList.remove("input-error");
    contrasena.classList.remove("input-error");

}