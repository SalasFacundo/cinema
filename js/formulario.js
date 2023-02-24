let form = document.querySelector('.formulario');
let barraProgreso = document.querySelectorAll('.barra__option');

form.addEventListener('click', formControllers);

function formControllers(e) {
    let elemento = e.target;
    let isButtonNext = elemento.classList.contains('step__button--next');
    let isButtonBack = elemento.classList.contains('step__button--back');
    if (isButtonNext || isButtonBack) {
        let pasoActual = document.getElementById('step-' + elemento.dataset.step);
        let cambiarPaso = document.getElementById('step-' + elemento.dataset.to_step);
        pasoActual.addEventListener('animationend', function callback() {
            pasoActual.classList.remove('active');
            cambiarPaso.classList.add('active');
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            if (isButtonNext) {
                pasoActual.classList.add('to-left');
                barraProgreso[elemento.dataset.to_step - 1].classList.add('active');
            } else {
                cambiarPaso.classList.remove('to-left');
                barraProgreso[elemento.dataset.step - 1].classList.remove('active');
                
            }
            pasoActual.removeEventListener('animationend', callback);
        });
        pasoActual.classList.add('inactive');
        cambiarPaso.classList.remove('inactive');
    }
}

buildSeats();

function buildSeats(){
    let butacas = document.querySelector('.butacas');
    let filas = "";

    for (let i = 1; i <= 10; i++) {
        filas += `<div class="fila">`;
        for (let j = 1; j <= 15; j++) {  
            filas += `
                <div class=${(Math.random() < 0.5) ? "disponible" : "ocupado"} id="${i}-${j}"  onclick="butacas(id)"></div>
            `;
        } 
        filas +=  `</div>`
    }    
    filas += `<div id="seatValidate" class="d-flex justify-content-center mt-5 text-danger"></div>`
    butacas.innerHTML = filas;
    let botonConfirmar = document.querySelector('#butacasConfirmar');
    botonConfirmar.addEventListener("click", seatValidator)
    
}

function butacas(id) {
    let elemento = document.getElementById(id);

    if(elemento.className == "disponible"){
        elemento.className = "elegido";
        return;
    }
    if(elemento.className == "elegido"){
        elemento.className = "disponible";
        return;
    }             
}

function seatValidator(e){
    let butacas = document.querySelectorAll(".elegido");
    let seatValidate = document.querySelector('#seatValidate');
    if(butacas.length == 0){
        seatValidate.innerHTML = "Elija algun asiento";
        e.stopImmediatePropagation();
    }else{
        seatValidate.innerHTML = "";
        chosenSeats();
    }
}

function chosenSeats(){
    let butacas = document.querySelectorAll(".elegido");
    let resultado = "";

    for (let i = 0; i < butacas.length; i++) {        
        resultado += butacas[i].id + ","
    }

    console.log("RESULTADO");
    console.log(resultado);
}


