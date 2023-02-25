class Ticket{
    ciudad;
    sucursal;
    pelicula;
    funcion;
    nombreTarjeta;
    numeroTarjeta;
    vencimientoTarjeta;
    seguridadTarjeta;
    tipoTarjeta;
    cuotas;
    butacas;
    cantidad;
}

ticket = new Ticket();

let form = document.querySelector('.formulario');
let barraProgreso = document.querySelectorAll('.barra__option');
form.addEventListener('click', formControllers);
let tarjetaConfirmar = document.querySelector('#tarjetaConfirmar');
    tarjetaConfirmar.addEventListener("click", validarTarjeta);



let cine = {
    valorTicket: 500
}

let ticketMap= [];

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
                <div class=${(Math.random() < 0.5) ? "disponible" : "ocupado"} id="${i}-${j}"  onclick="butacasAction(id)"></div>
            `;
        } 
        filas +=  `</div>`
    }    
    filas += `<div id="seatValidate" class="d-flex justify-content-center mt-5 text-danger"></div>`
    butacas.innerHTML = filas;
    let botonConfirmar = document.querySelector('#butacasConfirmar');
    botonConfirmar.addEventListener("click", seatValidator)
    
}

function buildResume(){
    chosenSeats();
    crearArrayMap();
    
    
    let resumen = document.querySelector("#confirmResumen");
    let template ="";

    console.log("dentro de build resume")
    console.log(ticketMap)

    for (var key of Object.keys(ticketMap)) {
        template += `
            <div class="resumen">
                <div class="resumeTitle">${key}</div>
                <div class="subtitle">${ticketMap[key]}</div>
            </div>
        `
    }
    resumen.innerHTML = template;   
    
    console.log("TICKET FINAL");
    console.log(ticket)
}

function crearArrayMap(){

    let keys = [];
    let values = [];

    keys.push("Ciudad");
    values.push(ticket.ciudad);
    
    keys.push("Sucursal");
    values.push(ticket.sucursal);
    
    keys.push("Pelicula");
    values.push(ticket.pelicula);
    
    keys.push("Funcion");
    values.push(ticket.funcion);

    keys.push("Butacas");
    values.push(ticket.butacas);
    
    keys.push("Cantidad");
    values.push(ticket.cantidad);

    keys.push("Cuotas");
    values.push(ticket.cuotas);

    keys.push("Precio en 1 pago");
    values.push(calcularInteres(cine.valorTicket * ticket.cantidad, 1));

    keys.push("Precio Final");
    values.push(calcularInteres(cine.valorTicket * ticket.cantidad, ticket.cuotas));

    for(var i = 0; i < keys.length; i++){
        ticketMap[keys[i]] = values[i];
    }
}


function butacasAction(id) {
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
    }
}

function chosenSeats(){
    let butacas = document.querySelectorAll(".elegido");
    let resultado = [];

    for (let i = 0; i < butacas.length; i++) {        
        resultado.push(butacas[i].id);
    }
    ticket.butacas = resultado;
    ticket.cantidad = resultado.length;
}

function validarTarjeta(event){
    ticket = {
        ciudad: document.getElementById("ciudad").value,
        sucursal: document.getElementById("sucursal").value,
        pelicula: document.getElementById("pelicula").value,
        funcion: document.getElementById("funcion").value,
        otro: document.getElementById("otro").value,
        nombreTarjeta: document.getElementById("nombreTarjeta").value,
        numeroTarjeta: document.getElementById("numeroTarjeta").value,
        vencimientoTarjeta: document.getElementById("vencimientoTarjeta").value,
        seguridadTarjeta: document.getElementById("seguridadTarjeta").value,
        tipoTarjeta: document.getElementById("tipoTarjeta").value,
        cuotas: document.getElementById("cuotas").value,
    }
    let errores = 0;

    if(isEmpty(ticket.nombreTarjeta) || ticket.nombreTarjeta.length>=20){
        document.querySelector("#errorNombre").innerHTML = "Nombre invalido";
        errores++;
    }else{
        document.querySelector("#errorNombre").innerHTML = "";
    }
    if(isEmpty(ticket.numeroTarjeta) || !isValidDigits(ticket.numeroTarjeta,19) || !isNumber(ticket.numeroTarjeta)){
        document.querySelector("#errorNumero").innerHTML = "Numero de tarjeta invalido";
        errores++;
    }else{
        document.querySelector("#errorNumero").innerHTML = "";
    }
    if(isEmpty(ticket.vencimientoTarjeta)){
        document.querySelector("#errorVencimiento").innerHTML = "Fecha invalida";
        errores++;
    }else{
        document.querySelector("#errorVencimiento").innerHTML = "";
    }
    if(isEmpty(ticket.seguridadTarjeta) || !isValidDigits(ticket.seguridadTarjeta,3) || !isNumber(ticket.seguridadTarjeta)){
        document.querySelector("#errorSeguridad").innerHTML = "Numero de seguridad invalido";
        errores++;
    }else{
        document.querySelector("#errorSeguridad").innerHTML = "";
    }
    if(ticket.tipoTarjeta.toUpperCase() == "DEBITO" && ticket.cuotas != 1){
        document.querySelector("#errorTipoTarjeta").innerHTML = "Cuotas solo disponible con credito";
        errores++;
    }else{
        document.querySelector("#errorTipoTarjeta").innerHTML = "";
    }
    if(errores!=0){
        event.stopImmediatePropagation();
    }else{
        buildResume();
    }    
}

function isEmpty(dato) {
    if (dato.trim() == "") {
        return true;
    }
    return false;
}

function isNumber(dato) {
    if (isNaN(parseInt(dato))) {
        return false;
    }
    return true;
}

function isValidInstallment(dato) {
    if (dato != 1 && dato != 3 && dato != 6 && dato != 12) {
        return false;
    }
    return true;
}

function isValidDigits(dato, cantidad) {
    if (dato.length != cantidad) {
        return false;
    }
    return true;
}

function calcularInteres(valor, cuotas) {
    switch (cuotas) {
        case '1':
            return valor; 
            break;
        case '3':
            return valor * 1.12;
            break;
        case '6':
            return valor * 1.25;
            break;
        case '12':
            return valor * 1.50;
            break;
    }
    return valor;
}
