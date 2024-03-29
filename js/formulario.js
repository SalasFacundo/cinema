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
    precioFinal
}

ticket = new Ticket();

let valorTicket= 500;
let ticketMap= [];

document.querySelector('.formulario').addEventListener('click', formControllers);
document.querySelector('#tarjetaConfirmar').addEventListener("click", validarTarjeta);
document.querySelector('#finalizePurchase').addEventListener("click", finalizePurchase);
const modal_container = document.getElementById('modal_container');
document.getElementsByClassName('open')[0].addEventListener('click', () => {cargarModal();modal_container.classList.add('show')});
document.getElementById('cancelarCompraModal').addEventListener('click', cancelPurchase);
document.getElementById('confirmarCompraModal').addEventListener('click',confirmPurchase);
document.getElementById('cerrarModal').addEventListener('click', () => { modal_container.classList.remove('show')});

setMinMonth();
hiddenWarningPending();
buildSeats();


function formControllers(e) {    
    let elemento = e.target;
    let isBotonSiguiente = elemento.classList.contains('step__button--next');
    let isBotonAnterior = elemento.classList.contains('step__button--back');
    if (isBotonSiguiente || isBotonAnterior) {
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
            if (isBotonSiguiente) {
                pasoActual.classList.add('to-left');
            } else {
                cambiarPaso.classList.remove('to-left');
            }
            pasoActual.removeEventListener('animationend', callback);
        });
        pasoActual.classList.add('inactive');
        cambiarPaso.classList.remove('inactive');
    }
}

//Creo butacas ocupadas al azar con una probabilidad del 50%, solo para pruebas
function buildSeats(){
    let butacas = document.querySelector('.butacas');
    let filas = "";

    for (let i = 1; i <= 10; i++) { //se indican la cantidad filas
        filas += `<div class="fila">`;
        for (let j = 1; j <= 15; j++) {   //se indican la cantidad de columnas
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
    local_storage();

    let resumen = document.querySelector("#confirmResumen");
    let template ="";

    for (var key of Object.keys(ticketMap)) {
        template += `
            <div class="resumen">
                <div class="resumeTitle">${key}</div>
                <div class="subtitle">${ticketMap[key]}</div>
            </div>
        `
    }
    resumen.innerHTML = template;
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
    values.push(calcularInteres(valorTicket * ticket.cantidad, 1));

    keys.push("Precio Final");
    ticket.precioFinal = calcularInteres(valorTicket * ticket.cantidad, ticket.cuotas);
    values.push(ticket.precioFinal);

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
    ticket.butacas = converRowFromSeatsToLetters(resultado);
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
        numeroTarjeta: document.getElementById("numeroTarjeta").value.split(" ").join(""),
        vencimientoTarjeta: document.getElementById("vencimientoTarjeta").value,
        seguridadTarjeta: document.getElementById("seguridadTarjeta").value,
        tipoTarjeta: document.getElementById("tipoTarjeta").value,
        cuotas: document.getElementById("cuotas").value,
    }
    let errores = 0;

    if(isEmpty(ticket.nombreTarjeta) || ticket.nombreTarjeta.length>21){
        document.querySelector("#errorNombre").innerHTML = "Nombre invalido";
        errores++;
    }else{
        document.querySelector("#errorNombre").innerHTML = "";
    }
    if(isEmpty(ticket.numeroTarjeta) || !isValidDigits(ticket.numeroTarjeta,16) || !isNumber(ticket.numeroTarjeta)){
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

// el ID de las butacas era en formato "5-5", lo que era confuso saber cual era columna y cual era fila
//por lo que se convierte el primer numero a letra "E-5"
function converRowFromSeatsToLetters(seats){
    
    letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ', 'O','P','Q','R','S','T','U','V','W','X','Y','Z']
    
    let letterSeats = seats.map(e =>{ 
        array = e.split('-');
        array[0] = letras[array[0]-1];
        return array[0]+"-"+array[1];
        });

    return letterSeats;
}

function local_storage(){

    let ticketLocal = ticket;

    delete ticketLocal.nombreTarjeta;
    ticketLocal.numeroTarjeta = ticket.numeroTarjeta.substring(12,ticket.numeroTarjeta.length);
    delete ticketLocal.vencimientoTarjeta;
    delete ticketLocal.seguridadTarjeta;
    delete ticketLocal.tipoTarjeta;

    window.localStorage.setItem('ticket', JSON.stringify(ticketLocal));
}

function cargarModal(){        
    ticketJson = JSON.parse(window.localStorage.getItem('ticket'));

    let title = "Compra pendiente"
    let subtitle =
    `
    Ciudad: ${ticketJson.ciudad}\n
    Sucursal: ${ticketJson.sucursal}\n
    Pelicula: ${ticketJson.pelicula}\n
    Otro: ${ticketJson.otro}\n
    Funcion: ${ticketJson.funcion}\n
    Butacas: ${ticketJson.butacas}\n
    Cantidad: ${ticketJson.cantidad}\n
    Cuotas: ${ticketJson.cuotas}\n
    Ultimos 4 numeros de la tarjeta: ${ticketJson.numeroTarjeta}\n
    Precio final: ${ticketJson.precioFinal}\n
    `;
    document.getElementById("tituloModal").innerText = title;
    document.getElementById("detalleModal").innerText = subtitle;        
}

function hiddenWarningPending(){
    
    let warningPending = document.querySelector('#warningPending');
    if(window.localStorage.getItem('ticket') == null){
        warningPending.classList.add('hidden')
    }
    else{
        warningPending.classList.remove('hidden')
    }
    
}

function setMinMonth(){
    let date = new Date();
    let monthPlus=date.getMonth()+1;
    let month = String(monthPlus).length == 1 ? "0"+monthPlus:monthPlus;
    document.getElementById('vencimientoTarjeta').min = date.getFullYear()+'-'+month;
}

function finalizePurchase(){
    window.localStorage.clear();
    alert("La compra fue confirmada con exito")
}

function cancelPurchase(){
    window.localStorage.clear();
    location.reload();
    alert("La compra fue cancelada con exito");
}
function confirmPurchase(){
    window.localStorage.clear();
    location.reload();
    alert("La compra fue confirmada con exito")
}