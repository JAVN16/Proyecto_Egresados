const formularioCarrera = document.querySelector("#formCarrera");

const nombreCarrera = document.getElementById("nombreCarrera");
const codigoCarrera = document.getElementById("codigoCarrera");
const escuela = document.getElementById("escuela");
const duracion = document.getElementById("duracion");

const errorNombreCarrera = document.getElementById("errorNombreCarrera");
const errorCodigoCarrera = document.getElementById("errorCodigoCarrera");
const errorEscuela = document.getElementById("errorEscuela");
const errorDuracion = document.getElementById("errorDuracion");

const listaCarrerasHTML = document.getElementById("listaCarreras");
const botonCarrera = document.getElementById("botonCarrera");

let indiceEdicionCarrera = null;


formularioCarrera.addEventListener("submit", function(evento){

    evento.preventDefault();

    limpiarErroresCarrera();

    let hayErrores = validarCarrera();

    if(hayErrores == false){

        guardarCarrera();

    }

});


function validarCarrera(){

    let error = false;

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;
    const regexCodigo = /^[A-Za-z]{2,5}-[0-9]{3}$/;
    const regexEscuela = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;


    if(nombreCarrera.value.trim() == ""){

        errorNombreCarrera.textContent = "Debe ingresar el nombre de la carrera.";
        nombreCarrera.classList.add("input-error");
        error = true;

    }else if(!regexNombre.test(nombreCarrera.value.trim())){

        errorNombreCarrera.textContent = "El nombre de la carrera contiene un formato inválido.";
        nombreCarrera.classList.add("input-error");
        error = true;

    }


    if(codigoCarrera.value.trim() == ""){

        errorCodigoCarrera.textContent = "Debe ingresar el código de la carrera.";
        codigoCarrera.classList.add("input-error");
        error = true;

    }else if(!regexCodigo.test(codigoCarrera.value.trim())){

        errorCodigoCarrera.textContent = "El código debe tener un formato como DS-001.";
        codigoCarrera.classList.add("input-error");
        error = true;

    }


    if(escuela.value.trim() == ""){

        errorEscuela.textContent = "Debe ingresar el nombre de la escuela.";
        escuela.classList.add("input-error");
        error = true;

    }else if(!regexEscuela.test(escuela.value.trim())){

        errorEscuela.textContent = "El nombre de la escuela contiene un formato inválido.";
        escuela.classList.add("input-error");
        error = true;

    }


    if(duracion.value.trim() == ""){

        errorDuracion.textContent = "Debe ingresar la duración de la carrera.";
        duracion.classList.add("input-error");
        error = true;

    }else if(duracion.value < 1 || duracion.value > 10){

        errorDuracion.textContent = "La duración debe estar entre 1 y 10 años.";
        duracion.classList.add("input-error");
        error = true;

    }


    return error;

}


function obtenerCarreras(){

    let listaCarreras = localStorage.getItem("carreras");

    if(listaCarreras == null){

        return [];

    }else{

        return JSON.parse(listaCarreras);

    }

}


function guardarCarrera(){

    let listaCarreras = obtenerCarreras();

    let carrera = {

        nombre: nombreCarrera.value.trim(),
        codigo: codigoCarrera.value.trim(),
        escuela: escuela.value.trim(),
        duracion: duracion.value

    };


    if(indiceEdicionCarrera == null){

        listaCarreras.push(carrera);

    }else{

        listaCarreras[indiceEdicionCarrera] = carrera;
        indiceEdicionCarrera = null;

    }


    localStorage.setItem(
        "carreras",
        JSON.stringify(listaCarreras)
    );


    formularioCarrera.reset();

    limpiarErroresCarrera();

    botonCarrera.textContent = "Registrar carrera";

    mostrarCarreras();


    console.log("Carreras registradas:");
    console.log(listaCarreras);

}


function mostrarCarreras(){

    let listaCarreras = obtenerCarreras();

    listaCarrerasHTML.innerHTML = "";


    if(listaCarreras.length == 0){

        listaCarrerasHTML.innerHTML = "<p>No hay carreras registradas.</p>";

        return;

    }


    listaCarreras.forEach(function(carrera, indice){

        let registro = document.createElement("article");

        registro.classList.add("registro");


        registro.innerHTML = `
            <h3>${carrera.nombre}</h3>

            <p><strong>Código:</strong> ${carrera.codigo}</p>

            <p><strong>Escuela:</strong> ${carrera.escuela}</p>

            <p><strong>Duración:</strong> ${carrera.duracion} años</p>

            <div class="acciones-registro">

                <button type="button" onclick="editarCarrera(${indice})">
                    Editar
                </button>

                <button type="button" onclick="eliminarCarrera(${indice})">
                    Eliminar
                </button>

            </div>
        `;


        listaCarrerasHTML.appendChild(registro);

    });

}


function editarCarrera(indice){

    let listaCarreras = obtenerCarreras();

    let carrera = listaCarreras[indice];


    nombreCarrera.value = carrera.nombre;
    codigoCarrera.value = carrera.codigo;
    escuela.value = carrera.escuela;
    duracion.value = carrera.duracion;


    indiceEdicionCarrera = indice;

    botonCarrera.textContent = "Guardar cambios";

    window.scrollTo(0, 0);

}


function eliminarCarrera(indice){

    let listaCarreras = obtenerCarreras();

    listaCarreras.splice(indice, 1);


    localStorage.setItem(
        "carreras",
        JSON.stringify(listaCarreras)
    );


    mostrarCarreras();


    console.log("Carreras registradas:");
    console.log(listaCarreras);

}


function limpiarErroresCarrera(){

    errorNombreCarrera.textContent = "";
    errorCodigoCarrera.textContent = "";
    errorEscuela.textContent = "";
    errorDuracion.textContent = "";

    nombreCarrera.classList.remove("input-error");
    codigoCarrera.classList.remove("input-error");
    escuela.classList.remove("input-error");
    duracion.classList.remove("input-error");

}


mostrarCarreras();