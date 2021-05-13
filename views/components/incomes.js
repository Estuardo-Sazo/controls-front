import ModelIncomes from './models/modelGastos.js';

document.addEventListener('DOMContentLoaded', () => { /* Ejecuta js hasta renderizar todo el html*/
    const model = new ModelIncomes();

    const lista = $('#lista');
    const period = {
        0: "Una vez",
        1: "Cada día",
        7: "Cada semana",
        15: "Cada Quincena",
        30: "Cada Mes",
    }

});