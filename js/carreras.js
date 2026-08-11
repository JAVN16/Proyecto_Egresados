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


async function obtenerCarreras(){

    try{

        const response = await fetch("http://localhost:3000/carreras", {

            method: "GET",

            headers: {
                "Content-Type": "application/json"
            }

        });

        if(!response.ok){

            throw new Error("No se pudieron obtener las carreras.");

        }

        const listaCarreras = await response.json();

        mostrarCarreras(listaCarreras);

    }catch(error){

        listaCarrerasHTML.innerHTML =
            "<p>No se pudieron cargar las carreras.</p>";

        console.error(error);

    }

}


async function registrarCarrera(){

    let carrera = {

        nombre: nombreCarrera.value.trim(),
        descripcion: descripcionCarrera.value.trim()

    };

    try{

        const response = await fetch("http://localhost:3000/carreras", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(carrera)

        });

        if(!response.ok){

            const datos = await response.json();

            throw new Error(
                datos.mensaje || "No se pudo registrar la carrera."
            );

        }

        const datos = await response.json();

        console.log("Carrera registrada:");
        console.log(datos);

        alert("Carrera registrada correctamente.");

        formularioCarrera.reset();

        limpiarErroresCarrera();

        await obtenerCarreras();

    }catch(error){

        alert(error.message);

        console.error(error);

    }

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