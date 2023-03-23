const open = document.getElementsByClassName('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');
let triggerModal = document.getElementsByClassName('triggerModal');
let keyMap = {};


consumeApi();

function consumeApi() {
    let movies;
    let genres;

    fetch("https://api.themoviedb.org/3/discover/movie?api_key=a813ce03ea202b120e2307c4325bd6c3&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
        .then(res => res.json())
        .then(responseMovies => {
            fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=a813ce03ea202b120e2307c4325bd6c3&language=es-ES")
                .then(res => res.json())
                .then(responseGenres => {
                    movies = responseGenres;
                    fillCarousel(responseGenres, responseMovies)
                });
        });
}

function fillCarousel(responseGenres, responseMovies){

    const firstPage = document.getElementById('firstPage')
    const secondPage = document.getElementById('secondPage')
    let firstPageHtml = "";
    let secondPageHtml = "";

    results = responseMovies.results.slice(0,8);

    inicio = results.slice(0, 4);
    final = results.slice(4);

    for (let i = 0; i < 4; i++) {
        firstPageHtml += `
        <div class="cardPremiere open">
            <img class=" img-fluid triggerModal" src="https://image.tmdb.org/t/p/w500/${inicio[i].poster_path}" data-movie="${inicio[i].id}" alt="First slide"">
            <small class="movieTitle">${inicio[i].title}</small>
            <small><i class="fa fa-star"></i><label>${findGenreById(responseGenres, inicio[i].genre_ids[0])}</label></small>
        </div>
    `
    }


for (let i = 0; i < 4; i++) {
    secondPageHtml += `
    <div class="cardPremiere open">
            <img class=" img-fluid triggerModal" src="https://image.tmdb.org/t/p/w500/${final[i].poster_path}" data-movie="${inicio[i].id}" alt="First slide">
            <small class="movieTitle">${final[i].title}</small>
            <small><i class="fa fa-star"></i><label>${findGenreById(responseGenres, final[i].genre_ids[0])}</label></small>
        </div>
`
}

firstPage.innerHTML = firstPageHtml;
secondPage.innerHTML = secondPageHtml;


crearModales(responseMovies.results);
}


function findGenreById(responseGenres, id){
    let respuesta;
    responseGenres.genres.forEach(e => {
        if(e.id == id){
            respuesta= e.name;
        }
    })
    return respuesta;
}

function openModal(title, sinopsis){

    cargarModal(title, sinopsis);    
    modal_container.classList.add('show');
}

function cargarModal(title, subtitle){

    
    document.getElementById("tituloModal").innerText = title;
    document.getElementById("sinopsisModal").innerText = subtitle;
    modal_container.classList.add('show');
    close.addEventListener('click', () => {
        modal_container.classList.remove('show');
    }); 
}

function crearModales(responseMovies){

    for (let modal of triggerModal) {
        for (const movie of responseMovies) {
            if(modal.dataset.movie == movie.id){
                modal.addEventListener('click', e=> cargarModal(movie.title, movie.overview))
            }
        } 
    }
}