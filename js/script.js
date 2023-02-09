const valor = 500;
let tarjeta;
let tipo;
let cuotas;
let numeroTarjeta;
let vencimiento;
let numeroSeguridad;
let validacion = false;
let capacidadSala = 100;

do {
    cantidad = prompt("Ingrese cantidad de tickets ($" + valor + "c/u)");
    validacion = !isEmpty(cantidad) && isNumber(cantidad) && isValidCapacidad(cantidad);
} while (!validacion);
do {
    tarjeta = prompt("Ingrese tarjeta VISA/MASTERCARD");
    validacion = !isEmpty(tarjeta) && !isNumber(tarjeta) && isValidCard(tarjeta);
} while (!validacion);
do {
    tipo = prompt("Ingrese tipo de tarjeta DEBITO/CREDITO");
    validacion = !isEmpty(tipo) && !isNumber(tipo) && isValidTypeOfCard(tipo);
} while (!validacion);
if (tipo.toUpperCase() == "CREDITO") {
    do {
        cuotas = prompt("Ingrese cantidad de cuotas 1-3-6-12");
        validacion = !isEmpty(cuotas) && isNumber(cuotas) && isValidInstallment(cuotas);
    } while (!validacion);
}
do {
    numeroTarjeta = prompt("Ingrese numero de tarjeta sin espacios  ni guiones");
    validacion = !isEmpty(numeroTarjeta) && isNumber(numeroTarjeta) && isValidDigits(numeroTarjeta, 16);
} while (!validacion);
do {
    vencimiento = prompt("Ingrese mes y año de vencimiento en formado dd-yy");
    validacion = !isEmpty(vencimiento) && isValidDigits(vencimiento, 5);
} while (!validacion);
do {
    numeroSeguridad = prompt("Ingrese numero de seguridad");
    validacion = !isEmpty(numeroSeguridad) && isValidDigits(numeroSeguridad, 3);
} while (!validacion);

if (validacion) {
    let precioTicket = 500;
    let precioFinal = 500;
    let mensaje = " Precio de ticket: $" + precioTicket + "\n Cantidad: " + cantidad;

    if (tipo.toUpperCase() == "CREDITO") {
        precioFinal = calcularInteres(valor * cantidad, cuotas);
        mensaje += "\n Cuotas: " + cuotas;
    } else {
        precioFinal = valor * cantidad;
    }
    mensaje += "\n Precio final: $" + precioFinal;

    if (confirm(mensaje)) {
        mensaje = "¡ Entradas acompradas con exito !";
    } else {
        mensaje = "Compra cancelada";
    }

    alert(mensaje);
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

function isValidCard(dato) {
    if (dato.toUpperCase() == "MASTERCARD" || dato.toUpperCase() == "VISA") {
        return true;
    }
    return false;
}

function isValidTypeOfCard(dato) {
    if (dato.toUpperCase() == "DEBITO" || dato.toUpperCase() == "CREDITO") {
        return true;
    }
    return false;
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

function isValidCapacidad(dato) {
    if (dato > capacidadSala) {
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