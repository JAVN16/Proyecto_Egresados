const formularioEgresado = document.querySelector("#formEgresado");

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const identificacion = document.getElementById("identificacion");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const carrera = document.getElementById("carrera");
const titulo = document.getElementById("titulo");
const graduacion = document.getElementById("graduacion");

const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");
const errorIdentificacion = document.getElementById("errorIdentificacion");
const errorFechaNacimiento = document.getElementById("errorFechaNacimiento");
const errorCorreo = document.getElementById("errorCorreo");
const errorTelefono = document.getElementById("errorTelefono");
const errorCarrera = document.getElementById("errorCarrera");
const errorTitulo = document.getElementById("errorTitulo");
const errorGraduacion = document.getElementById("errorGraduacion");

const listaEgresadosHTML = document.getElementById("listaEgresados");
const botonEgresado = document.getElementById("botonEgresado");

let indiceEdicionEgresado = null;


formularioEgresado.addEventListener("submit", function(evento){

    evento.preventDefault();

    limpiarErroresEgresado();

    let hayErrores = validarEgresado();

    if(hayErrores == false){

        guardarEgresado();

    }

});


function validarEgresado(){

    let error = false;

    const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,60}$/;
    const regexIdentificacion = /^[1-9]-[0-9]{4}-[0-9]{4}$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefono = /^[0-9]{4}-[0-9]{4}$/;


    if(nombre.value.trim() == ""){

        errorNombre.textContent = "Debe ingresar el nombre.";
        nombre.classList.add("input-error");
        error = true;

    }else if(!regexTexto.test(nombre.value.trim())){

        errorNombre.textContent = "El nombre contiene un formato inválido.";
        nombre.classList.add("input-error");
        error = true;

    }


    if(apellido.value.trim() == ""){

        errorApellido.textContent = "Debe ingresar los apellidos.";
        apellido.classList.add("input-error");
        error = true;

    }else if(!regexTexto.test(apellido.value.trim())){

        errorApellido.textContent = "Los apellidos contienen un formato inválido.";
        apellido.classList.add("input-error");
        error = true;

    }


    if(identificacion.value.trim() == ""){

        errorIdentificacion.textContent = "Debe ingresar la identificación.";
        identificacion.classList.add("input-error");
        error = true;

    }else if(!regexIdentificacion.test(identificacion.value.trim())){

        errorIdentificacion.textContent = "La identificación debe tener un formato como 1-2345-6789.";
        identificacion.classList.add("input-error");
        error = true;

    }


    if(fechaNacimiento.value == ""){

        errorFechaNacimiento.textContent = "Debe ingresar la fecha de nacimiento.";
        fechaNacimiento.classList.add("input-error");
        error = true;

    }


    if(correo.value.trim() == ""){

        errorCorreo.textContent = "Debe ingresar el correo electrónico.";
        correo.classList.add("input-error");
        error = true;

    }else if(!regexCorreo.test(correo.value.trim())){

        errorCorreo.textContent = "Debe ingresar un correo electrónico válido.";
        correo.classList.add("input-error");
        error = true;

    }


    if(telefono.value.trim() == ""){

        errorTelefono.textContent = "Debe ingresar el teléfono.";
        telefono.classList.add("input-error");
        error = true;

    }else if(!regexTelefono.test(telefono.value.trim())){

        errorTelefono.textContent = "El teléfono debe tener un formato como 8888-8888.";
        telefono.classList.add("input-error");
        error = true;

    }


    if(carrera.value.trim() == ""){

        errorCarrera.textContent = "Debe ingresar la carrera.";
        carrera.classList.add("input-error");
        error = true;

    }else if(!regexTexto.test(carrera.value.trim())){

        errorCarrera.textContent = "La carrera contiene un formato inválido.";
        carrera.classList.add("input-error");
        error = true;

    }


    if(titulo.value.trim() == ""){

        errorTitulo.textContent = "Debe ingresar el título obtenido.";
        titulo.classList.add("input-error");
        error = true;

    }else if(!regexTexto.test(titulo.value.trim())){

        errorTitulo.textContent = "El título contiene un formato inválido.";
        titulo.classList.add("input-error");
        error = true;

    }


    if(graduacion.value.trim() == ""){

        errorGraduacion.textContent = "Debe ingresar el año de graduación.";
        graduacion.classList.add("input-error");
        error = true;

    }else if(graduacion.value < 1980 || graduacion.value > 2100){

        errorGraduacion.textContent = "El año de graduación debe estar entre 1980 y 2100.";
        graduacion.classList.add("input-error");
        error = true;

    }


    return error;

}


function obtenerEgresados(){

    let listaEgresados = localStorage.getItem("egresados");

    if(listaEgresados == null){

        return [];

    }else{

        return JSON.parse(listaEgresados);

    }

}


function guardarEgresado(){

    let listaEgresados = obtenerEgresados();

    let egresado = {

        nombre: nombre.value.trim(),
        apellido: apellido.value.trim(),
        identificacion: identificacion.value.trim(),
        fechaNacimiento: fechaNacimiento.value,
        correo: correo.value.trim(),
        telefono: telefono.value.trim(),
        carrera: carrera.value.trim(),
        titulo: titulo.value.trim(),
        graduacion: graduacion.value

    };


    if(indiceEdicionEgresado == null){

        listaEgresados.push(egresado);

    }else{

        listaEgresados[indiceEdicionEgresado] = egresado;
        indiceEdicionEgresado = null;

    }


    localStorage.setItem(
        "egresados",
        JSON.stringify(listaEgresados)
    );


    formularioEgresado.reset();

    limpiarErroresEgresado();

    botonEgresado.textContent = "Registrar egresado";

    mostrarEgresados();


    console.log("Egresados registrados:");
    console.log(listaEgresados);

}


function mostrarEgresados(){

    let listaEgresados = obtenerEgresados();

    listaEgresadosHTML.innerHTML = "";


    if(listaEgresados.length == 0){

        listaEgresadosHTML.innerHTML = "<p>No hay egresados registrados.</p>";

        return;

    }


    listaEgresados.forEach(function(egresado, indice){

        let registro = document.createElement("article");

        registro.classList.add("registro");


        registro.innerHTML = `
            <h3>${egresado.nombre} ${egresado.apellido}</h3>

            <p><strong>Identificación:</strong> ${egresado.identificacion}</p>

            <p><strong>Fecha de nacimiento:</strong> ${egresado.fechaNacimiento}</p>

            <p><strong>Correo:</strong> ${egresado.correo}</p>

            <p><strong>Teléfono:</strong> ${egresado.telefono}</p>

            <p><strong>Carrera:</strong> ${egresado.carrera}</p>

            <p><strong>Título:</strong> ${egresado.titulo}</p>

            <p><strong>Año de graduación:</strong> ${egresado.graduacion}</p>

            <div class="acciones-registro">

                <button type="button" onclick="editarEgresado(${indice})">
                    Editar
                </button>

                <button type="button" onclick="eliminarEgresado(${indice})">
                    Eliminar
                </button>

            </div>
        `;


        listaEgresadosHTML.appendChild(registro);

    });

}


function editarEgresado(indice){

    let listaEgresados = obtenerEgresados();

    let egresado = listaEgresados[indice];


    nombre.value = egresado.nombre;
    apellido.value = egresado.apellido;
    identificacion.value = egresado.identificacion;
    fechaNacimiento.value = egresado.fechaNacimiento;
    correo.value = egresado.correo;
    telefono.value = egresado.telefono;
    carrera.value = egresado.carrera;
    titulo.value = egresado.titulo;
    graduacion.value = egresado.graduacion;


    indiceEdicionEgresado = indice;

    botonEgresado.textContent = "Guardar cambios";

    window.scrollTo(0, 0);

}


function eliminarEgresado(indice){

    let listaEgresados = obtenerEgresados();

    listaEgresados.splice(indice, 1);


    localStorage.setItem(
        "egresados",
        JSON.stringify(listaEgresados)
    );


    mostrarEgresados();


    console.log("Egresados registrados:");
    console.log(listaEgresados);

}


function limpiarErroresEgresado(){

    errorNombre.textContent = "";
    errorApellido.textContent = "";
    errorIdentificacion.textContent = "";
    errorFechaNacimiento.textContent = "";
    errorCorreo.textContent = "";
    errorTelefono.textContent = "";
    errorCarrera.textContent = "";
    errorTitulo.textContent = "";
    errorGraduacion.textContent = "";

    nombre.classList.remove("input-error");
    apellido.classList.remove("input-error");
    identificacion.classList.remove("input-error");
    fechaNacimiento.classList.remove("input-error");
    correo.classList.remove("input-error");
    telefono.classList.remove("input-error");
    carrera.classList.remove("input-error");
    titulo.classList.remove("input-error");
    graduacion.classList.remove("input-error");

}


mostrarEgresados();