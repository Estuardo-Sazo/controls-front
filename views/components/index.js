import ModelGastos from './models/modelGastos.js';
import ModelIncomes from './models/modelIncomes.js';

document.addEventListener('DOMContentLoaded', () => { /* Ejecuta js hasta renderizar todo el html*/
    const modelGastos = new ModelGastos();
    const modelIncomes = new ModelIncomes();
    const period = {
        0: "Una vez",
        1: "Cada día",
        7: "Cada semana",
        15: "Cada Quincena",
        30: "Cada Mes",
    };

    // Variables globales
    var totalIngreso=0;
    var totalGastos=0;
    var saldo=0;
    var tiempo=30;

    const evaluarGasto =(valor, period) => {
        let total = 0;
        console.log(valor,period);
        switch (period) {
            case 0:
                total= valor;
                break;
            case 1:
                total= valor*tiempo;
                break;
            case 7:
                total= valor*(parseInt(tiempo/7));
                break;
            case 15:
                total= valor*(parseInt(tiempo/15));
                break;
            case 30:
                total= valor*(parseInt(tiempo/30));
                break;

            default:
                break;
        }
       
        totalGastos = totalGastos + total;
    
    }


    const evaluarIngresos =(valor, period) => {
        let total = 0;
        console.log(valor,period);
        switch (period) {
            case 0:
                total= valor;
                break;
            case 1:
                total= valor*tiempo;
                break;
            case 7:
                total= valor*(parseInt(tiempo/7));
                break;
            case 15:
                total= valor*(parseInt(tiempo/15));
                break;
            case 30:
                total= valor*(parseInt(tiempo/30));
                break;

            default:
                break;
        }
       
        totalIngreso = totalIngreso + total;
    
    }


    // Consulta de todo el listado de ingres
    const listaIngreso = () => {
        modelIncomes.getAll().then((result) => {
            let template = '';
            result.body.forEach(d => {
                evaluarIngresos(d.value, d.period);

                template += `
                <tr>
                <td>${d.name}</td>
                <td>Q${d.value}</td>
                <td> <strong>${period[d.period]}</strong></td>
           </tr>
                `;
            });
            $('#ingresos').html(template);
            $('#totalI').html(totalIngreso);

        });
    }


    // Consulta de todo el listado de gastos
    const listaGasto = () => {
        modelGastos.getAll().then((result) => {
            let template = '';
            result.body.forEach(d => {
                evaluarGasto(d.value, d.period);
                //targetas de gastos
                template += `
                <tr>
                    <td>${d.name}</td>
                    <td>Q${d.value}</td>
                    <td> <strong>${period[d.period]}</strong></td>
                </tr>                
                `;
            });
            $('#gastos').html(template);
            $('#totalG').html(totalGastos);

            calcularSaldo();

        });
    }

    const calcularSaldo=()=> {
        saldo = totalIngreso - totalGastos;
        $('#saldo').html('Q' + saldo);
    
    }
    

    // formulario para presupuesto
    $('#evaluar').submit(function(e) {
        e.preventDefault();
        totalIngreso=0;
        totalGastos=0;
        saldo=0;


       var fecha1 = moment($('#dateI').val());
        var fecha2 = moment($('#dateF').val());
        tiempo=fecha2.diff(fecha1, 'days');
        listaIngreso();
        listaGasto();
        console.log(totalIngreso,totalGastos);
    });

    //Llamado de funciones
    listaIngreso();
    listaGasto();
});