const formularioCarrera = document.querySelector("#formCarrera");

const nombreCarrera = document.getElementById("nombreCarrera");
const descripcionCarrera = document.getElementById("descripcionCarrera");

const errorNombreCarrera = document.getElementById("errorNombreCarrera");
const errorDescripcionCarrera = document.getElementById("errorDescripcionCarrera");

const listaCarrerasHTML = document.getElementById("listaCarreras");


formularioCarrera.addEventListener("submit", function(evento){

    evento.preventDefault();

    limpiarErroresCarrera();

    let hayErrores = validarCarrera();

    if(hayErrores == false){

        registrarCarrera();

    }

});


function validarCarrera(){

    let error = false;

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;


    if(nombreCarrera.value.trim() == ""){

        errorNombreCarrera.textContent = "Debe ingresar el nombre de la carrera.";
        nombreCarrera.classList.add("input-error");
        error = true;

    }else if(!regexNombre.test(nombreCarrera.value.trim())){

        errorNombreCarrera.textContent = "El nombre de la carrera contiene un formato inválido.";
        nombreCarrera.classList.add("input-error");
        error = true;

    }


    if(descripcionCarrera.value.trim() == ""){

        errorDescripcionCarrera.textContent = "Debe ingresar una descripción.";
        descripcionCarrera.classList.add("input-error");
        error = true;

    }


    return error;

}


function obtenerCarreras(){

    fetch("http://localhost:3000/carreras", {

        method: "GET",

        headers: {
            "Content-Type": "application/json"
        }

    })

    .then(function(response){

        if(!response.ok){

            throw new Error("No se pudieron obtener las carreras.");

        }

        return response.json();

    })

    .then(function(listaCarreras){

        mostrarCarreras(listaCarreras);

    })

    .catch(function(error){

        listaCarrerasHTML.innerHTML =
            "<p>No se pudieron cargar las carreras.</p>";

        console.error(error);

    });

}


function registrarCarrera(){

    let carrera = {

        nombre: nombreCarrera.value.trim(),
        descripcion: descripcionCarrera.value.trim()

    };


    fetch("http://localhost:3000/carreras", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(carrera)

    })

    .then(function(response){

        if(!response.ok){

            return response.json().then(function(datos){

                throw new Error(
                    datos.mensaje || "No se pudo registrar la carrera."
                );

            });

        }

        return response.json();

    })

    .then(function(datos){

        console.log("Carrera registrada:");
        console.log(datos);

        alert("Carrera registrada correctamente.");

        formularioCarrera.reset();

        limpiarErroresCarrera();

        obtenerCarreras();

    })

    .catch(function(error){

        alert(error.message);

        console.error(error);

    });

}


function mostrarCarreras(listaCarreras){

    listaCarrerasHTML.innerHTML = "";


    if(listaCarreras.length == 0){

        listaCarrerasHTML.innerHTML =
            "<p>No hay carreras registradas.</p>";

        return;

    }


    listaCarreras.forEach(function(carrera){

        let registro = document.createElement("article");

        registro.classList.add("registro");


        registro.innerHTML = `
            <h3>${carrera.nombre}</h3>

            <p>
                <strong>Descripción:</strong>
                ${carrera.descripcion || "Sin descripción"}
            </p>
        `;


        listaCarrerasHTML.appendChild(registro);

    });

}


function limpiarErroresCarrera(){

    errorNombreCarrera.textContent = "";
    errorDescripcionCarrera.textContent = "";

    nombreCarrera.classList.remove("input-error");
    descripcionCarrera.classList.remove("input-error");

}


obtenerCarreras();