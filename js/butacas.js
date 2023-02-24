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