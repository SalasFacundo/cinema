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

let keyMap = {};
builKeyMap();

console.log("LOCAL STORAGE")
console.log(localStorage)


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
