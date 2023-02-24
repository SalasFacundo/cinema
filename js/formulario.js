let form = document.querySelector('.formulario');
let barraProgreso = document.querySelectorAll('.barra__option');

form.addEventListener('click', function(e) {
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
});
