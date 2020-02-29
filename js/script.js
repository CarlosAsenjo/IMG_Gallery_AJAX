var pag = document.getElementById("numeropagina").value;

/********* BOTON MOSTRAR *********/
document.getElementById("botonShow").addEventListener("click", () => {

    var gatoID = document.getElementById("gato").value;
    var gatoRaza = document.getElementById("gatoRaza").value;
    console.log(gatoID)
    console.log(gatoRaza)
    if (gatoID != 0)
        var imagenes = 'https://api.thecatapi.com/v1/images/search?category_ids=' + gatoID + '&limit=12&page=1&order=desc';
    else
        var imagenes = 'https://api.thecatapi.com/v1/images/search?breed_id=' + gatoRaza + '&limit=12';
    const promesa2 = request(imagenes);

    document.getElementById("numeropagina").value = "1";
    pag = document.getElementById("numeropagina").value;
    document.getElementById("anterior").style.display = 'none';


    promesa2
        .then(function botonShow(json) {
            const listGato = JSON.parse(json);
            document.getElementById("gatos").innerHTML = "";
            listGato.forEach(gato => document.getElementById("gatos").innerHTML += "<div class='container w-25 p-2'><img src=" + gato.url + " class='img-fluid'></div>");
        })

    .catch(function handleErrors(error) {
        // console.log('when a reject is executed it will come here ignoring the then statement ', error)
        // document.getElementById("error").innerHTML = '<div class="alert alert-danger">Algo ha ido mal. Consulta con el administrador o prueba a recargar la página.</div>';
    })

    document.getElementById("siguiente").style.display = 'block';

    for (let i = 0; i < document.getElementsByTagName('li').length; i++) {

        if (document.getElementsByTagName('li')[i].textContent == pag) {
            document.getElementsByTagName('li')[i].className = 'page-item active';

        } else {
            document.getElementsByTagName('li')[i].className = 'page-item';
        }
    }
});



/********* PROMESA DE CATEGORIA *********/
const categorias = 'https://api.thecatapi.com/v1/categories';
const promesaCategoria = request(categorias);

promesaCategoria
    .then(function categorias(json) {
        const listGato = JSON.parse(json);
        listGato.forEach(gato => document.getElementById("gato").innerHTML += "<option value=" + gato.id + ">" + gato.name + "</option>");

    })
    .catch(function handleErrors(error) {
        console.log('when a reject is executed it will come here ignoring the then statement ', error)
        document.getElementById("error").innerHTML = '<div class="alert alert-danger">Algo ha ido mal. Consulta con el administrador o prueba a recargar la página.</div>';
    })

/********* PROMESA DE RAZAS *********/
const razas = 'https://api.thecatapi.com/v1/breeds';
const promesaRaza = request(razas);

promesaRaza
    .then(function categorias(json) {
        const listGato = JSON.parse(json);
        listGato.forEach(gato => document.getElementById("gatoRaza").innerHTML += "<option value=" + gato.id + ">" + gato.name + "</option>");

    })
    .catch(function handleErrors(error) {
        console.log('when a reject is executed it will come here ignoring the then statement ', error)
        document.getElementById("error").innerHTML = '<div class="alert alert-danger">Algo ha ido mal. Consulta con el administrador o prueba a recargar la página.</div>';
    })

/********* PRIMERA CARGA DE IMAGENES *********/
const promesaImagenes = request('https://api.thecatapi.com/v1/images/search?category_ids=5&limit=12&page=1&order=desc');

window.onload = promesaImagenes
    .then(function ponerImagenes(json) {
        const listGato = JSON.parse(json);
        document.getElementById("gatos").innerHTML = "";
        listGato.forEach(gato => document.getElementById("gatos").innerHTML += "<div class='container w-25 p-2'><img src=" + gato.url + " class='img-fluid'></div>");
        document.getElementById("anterior").style.display = 'none';
    })

.catch(function handleErrors(error) {
    document.getElementById("error").innerHTML = '<div class="alert alert-danger">Algo ha ido mal. Consulta con el administrador o prueba a recargar la página.</div>';
})

/********* PAGINACION *********/
const paginas = document.querySelector("ul.pagination");

paginas.addEventListener("click", (event) => {

    var gatoID = document.getElementById("gato").value;
    var gatoRaza = document.getElementById("gatoRaza").value;

    if (event.target.textContent === "Anterior" && pag != '1') {
        document.getElementById("siguiente").style.display = 'block';
        pag = (parseInt(pag) - 1);
        document.getElementById("numeropagina").value = pag.toString();

        // var imagenes = 'https://api.thecatapi.com/v1/images/search?category_ids=' + gatoID + '&limit=12&page=' + pag + '&order=DESC';
        if (gatoID != 0)
            var imagenes = 'https://api.thecatapi.com/v1/images/search?category_ids=' + gatoID + '&limit=12&page=' + pag + '&order=desc';
        else
            var imagenes = 'https://api.thecatapi.com/v1/images/search?breed_id=' + gatoRaza + '&limit=12&page=' + pag;
        const promesaPagina = request(imagenes);

        if (pag == '1') {
            document.getElementById("anterior").style.display = 'none';
            document.getElementById("siguiente").style.display = 'block';
        }
        promesaPagina
            .then(function cambiarPagina(json) {
                const listGato = JSON.parse(json);
                document.getElementById("gatos").innerHTML = "";
                listGato.forEach(gato => document.getElementById("gatos").innerHTML += "<div class='container w-25 p-2'><img src=" + gato.url + " class='img-fluid'></div>");

            }).catch(function handleErrors(error) {
                document.getElementById("error").innerHTML = '<div class="alert alert-danger">Algo ha ido mal. Consulta con el administrador o prueba a recargar la página.</div>';
            })

    } else if (event.target.textContent === "Siguiente" && pag != '5') {
        document.getElementById("anterior").style.display = 'block';
        pag = (parseInt(pag) + 1);
        document.getElementById("numeropagina").value = pag.toString();

        // var imagenes = 'https://api.thecatapi.com/v1/images/search?category_ids=' + gatoID + '&limit=12&page=' + pag + '&order=DESC';
        if (gatoID != 0)
            var imagenes = 'https://api.thecatapi.com/v1/images/search?category_ids=' + gatoID + '&limit=12&page=' + pag + '&order=desc';
        else
            var imagenes = 'https://api.thecatapi.com/v1/images/search?breed_id=' + gatoRaza + '&limit=12&page=' + pag;
        const promesaPagina = request(imagenes);

        if (pag == '5') {
            document.getElementById("siguiente").style.display = 'none';
            document.getElementById("anterior").style.display = 'block';
        }

        promesaPagina
            .then(function cambiarPagina(json) {
                const listGato = JSON.parse(json);
                document.getElementById("gatos").innerHTML = "";
                listGato.forEach(gato => document.getElementById("gatos").innerHTML += "<div class='container w-25 p-2'><img src=" + gato.url + " class='img-fluid'></div>");

            }).catch(function handleErrors(error) {
                document.getElementById("error").innerHTML = '<div class="alert alert-danger">Algo ha ido mal. Consulta con el administrador o prueba a recargar la página.</div>';
            })

    } else {
        pag = parseInt(event.target.textContent);
        document.getElementById("numeropagina").value = pag.toString();

        // var imagenes = 'https://api.thecatapi.com/v1/images/search?category_ids=' + gatoID + '&limit=12&page=' + pag + '&order=DESC';
        if (gatoID != 0)
            var imagenes = 'https://api.thecatapi.com/v1/images/search?category_ids=' + gatoID + '&limit=12&page=' + pag + '&order=DESC';
        else
            var imagenes = 'https://api.thecatapi.com/v1/images/search?breed_id=' + gatoRaza + '&limit=12&page=' + pag;

        if (document.getElementById("numeropagina").value == '5') {
            document.getElementById("siguiente").style.display = 'none';
            document.getElementById("anterior").style.display = 'block';

        } else if (document.getElementById("numeropagina").value == '1') {
            document.getElementById("anterior").style.display = 'none';
            document.getElementById("siguiente").style.display = 'block';

        } else {
            document.getElementById("anterior").style.display = 'block';
            document.getElementById("siguiente").style.display = 'block';
        }
        const promesaPagina = request(imagenes);

        promesaPagina
            .then(function cambiarPagina(json) {
                const listGato = JSON.parse(json);
                document.getElementById("gatos").innerHTML = "";
                listGato.forEach(gato => document.getElementById("gatos").innerHTML += "<div class='container w-25 p-2'><img src=" + gato.url + " class='img-fluid'></div>");
            }).catch(function handleErrors(error) {
                document.getElementById("error").innerHTML = '<div class="alert alert-danger">Algo ha ido mal. Consulta con el administrador o prueba a recargar la página.</div>';
            })
    }
    for (let i = 0; i < document.getElementsByTagName('li').length; i++) {

        if (document.getElementsByTagName('li')[i].textContent == pag) {
            document.getElementsByTagName('li')[i].className = 'page-item active';

        } else {
            document.getElementsByTagName('li')[i].className = 'page-item';
        }
    }
});