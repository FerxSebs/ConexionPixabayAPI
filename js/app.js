const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario= document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarImagen)
})

function buscarImagen(e){
    e.preventDefault();
    console.log('Buscando Imagenes');

    let busqueda = document.querySelector('#buscador').value;

    if (busqueda ===''){
        mostrarError('Debe ingresar un parametro');
        return;
    }
    consultarAPI(busqueda);
}
function consultarAPI(busqueda){
    const appID ='49177102-4eb04dd4e527e26476733e4b1';
    const url=`https://pixabay.com/api/?key=${appID}&q=${encodeURIComponent(busqueda)}&image_type=photo&per_page=12`;

    console.log(url);

    fetch(url)
        .then(respuesta=>{
            return respuesta.json();
        })
        .then(datos=>{
            console.log(datos);
            mostrarImagenes(datos);
        })
}

function mostrarError(mensaje) {
    const error = document.createElement('div'); // Cambiado a div para mejor estilo
    error.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${mensaje}</span>
    `;
    error.classList.add('alert'); // Agregar clase de alerta

    const mensajeErrorContainer = document.querySelector("#mensaje-error");
    mensajeErrorContainer.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, 3000);
}
function mostrarImagenes(datos) {
    resultado.innerHTML = '';

    // Verificar si hay resultados
    if (datos.hits.length === 0) {
        mostrarError('No se encontraron imágenes.');
        return;
    }

    // Recorrer los resultados y crear elementos de imagen
    datos.hits.forEach(hit => {
        // Crear un contenedor para la imagen
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container'); // Agregar clase para estilos

        // Crear el elemento de imagen
        const img = document.createElement('img');
        img.src = hit.webformatURL; // URL de la imagen
        img.alt = hit.tags; // Etiquetas de la imagen

        // Agregar la imagen al contenedor
        imgContainer.appendChild(img);

        // Agregar el contenedor de la imagen al resultado
        resultado.appendChild(imgContainer);
    });
}
