

const $nombreTarjeta = document.querySelector("#nombreTarjeta");
const $numeroTarjeta = document.querySelector("#numeroTarjeta");
const $vencimientoTarjeta = document.querySelector("#vencimientoTarjeta");
const $seguridadTarjeta = document.querySelector("#seguridadTarjeta");




function writeTextCard() {
    const nombreTarjeta = document.querySelector(".nombre-tarjeta");
    const numeroTarjeta = document.querySelector(".numero-tarjeta");
    const vencimientoTarjeta = document.querySelector(".vencimiento-tarjeta");
    const seguridadTarjeta = document.querySelector(".seguridad");

    $nombreTarjeta.addEventListener("input", () => {
        nombreTarjeta.innerText = $nombreTarjeta.value;
        
        if ($nombreTarjeta.value === "") {
            nombreTarjeta.innerText = "Nombre";
        }
    });
    $numeroTarjeta.addEventListener("input", () => {
        $numeroTarjeta.value = agregarEspacios($numeroTarjeta.value);
        numeroTarjeta.innerText = $numeroTarjeta.value;

        if ($numeroTarjeta.value === "") {
            numeroTarjeta.innerText = "0000 0000 0000 0000";
        }
    });
    $vencimientoTarjeta.addEventListener("input", () => {
        vencimientoTarjeta.innerText = formatearInputMonth($vencimientoTarjeta.value);
        
        if ($vencimientoTarjeta.value === "") {
            vencimientoTarjeta.innerText = "00/00";
        }
    });
    $seguridadTarjeta.addEventListener("input", () => {
        seguridadTarjeta.innerText = $seguridadTarjeta.value;

        if ($seguridadTarjeta.value === "") {
            seguridadTarjeta.innerText = "000";
        }
    });

}

writeTextCard();


function formatearInputMonth(valor){
    let separado = valor.split('-');
    return separado[1]+"-"+separado[0].slice(2);
}


function agregarEspacios(valor){
    console.log("VALOR");
    console.log(valor)
    if(valor.length == 4 || valor.length == 9 || valor.length == 14  ){
        return valor + " ";
    }
    else{
        return valor;
    }
}