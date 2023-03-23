const open = document.getElementsByClassName('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');


var keys = ['Avatar: El camino del agua', 'Alerta extrema', 'Babilonia', 'Faelman', '1985', 'Llaman a la puerta'] ;

var values = [
            "En un exuberante planeta llamado Pandora viven los Na'vi, seres que aparentan ser primitivos pero que en realidad son muy evolucionados. Debido a que el ambiente de Pandora es venenoso, los híbridos humanos/Na'vi, llamados Avatares, están relacionados con las mentes humanas, lo que les permite moverse libremente por Pandora. Jake Sully, un exinfante de marina paralítico se transforma a través de un Avatar, y se enamora de una mujer Na'vi.",
            "El piloto Brodie Torrance salva a los pasajeros de la aeronave de un accidente al realizar un aterrizaje forzoso en una isla en guerra. Los rebeldes toman a todos como rehenes, y solo Torrance y un pasajero, un asesino, pueden salvarlos.",
            "La decadencia, la depravación y los excesos escandalosos provocan el ascenso y la caída de varios ambiciosos soñadores en el Hollywood de la década de 1920.",
            "Tras ver la película 'El mayor espectáculo del mundo', el joven Sammy Fabelman se enamora perdidamente del cine. Armado con una cámara y contando con la ayuda de su madre, Sammy trata de filmar su primera película en casa.",
            "Durante la década de 1980, un grupo de abogados investiga y lleva a juicio a los responsables de la dictadura cívico-militar argentina.",
            "Mientras vacacionan en una cabaña remota, una pequeña niña y sus padres son tomados como rehenes por cuatro extraños armados, quienes exigen que la familia tome una decisión impensable para evitar el apocalipsis. Con acceso limitado al mundo exterior, la familia deberá decidir en qué creen antes de que todo se pierda."
        ]

        consumeApi();
let keyMap = {};
builKeyMap();
close.addEventListener('click', () => {
    modal_container.classList.remove('show');
});

function getSinopsisByTitle(title){
    for (var key of Object.keys(keyMap)) {
        if( title == key){
            return keyMap[key];
        }
    }
}

function cargarModal(title, subtitle){
    document.getElementById("tituloModal").innerText = title;
    document.getElementById("sinopsisModal").innerText = subtitle;
}

function builKeyMap(){
    for(var i = 0; i < keys.length; i++){
        keyMap[keys[i]] = values[i];
    }
    
    for (const e of open) {
        e.addEventListener('click', () => {
            let title = e.getElementsByClassName("movieTitle")[0].innerText;
        
        cargarModal(title, getSinopsisByTitle(title));
    
            modal_container.classList.add('show');
        });
    }
}

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

    console.log(responseMovies)
    for (let i = 0; i < 4; i++) {
        firstPageHtml += `
        <div class="cardPremiere open">
            <img class=" img-fluid" src="https://image.tmdb.org/t/p/w500/${inicio[i].poster_path}" alt="First slide">
            <small class="movieTitle">${inicio[i].title}</small>
            <small><i class="fa fa-star"></i><label>${findGenreById(responseGenres, inicio[i].genre_ids[0])}</label></small>
        </div>
    `
    }


for (let i = 0; i < 4; i++) {
    secondPageHtml += `
    <div class="cardPremiere open">
            <img class=" img-fluid" src="https://image.tmdb.org/t/p/w500/${final[i].poster_path}" alt="First slide">
            <small class="movieTitle">${final[i].title}</small>
            <small><i class="fa fa-star"></i><label>${findGenreById(responseGenres, final[i].genre_ids[0])}</label></small>
        </div>
`
}

firstPage.innerHTML = firstPageHtml;
secondPage.innerHTML = secondPageHtml;

}


function findGenreById(responseGenres, id){
    let respuesta;
    responseGenres.genres.forEach(e => {
        if(e.id == id){     
            console.log("aca2")
            console.log( e.name)
            console.log("aca2")
            respuesta= e.name;
        }
    })
    return respuesta;
}