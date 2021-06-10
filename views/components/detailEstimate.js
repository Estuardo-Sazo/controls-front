import ModelEstimate from './models/modelEstimate.js';
document.addEventListener('DOMContentLoaded', () => { /* Ejecuta js hasta renderizar todo el html*/
    const model = new ModelEstimate();

    let uuid = localStorage.getItem("presupuesto");
    console.log(uuid);
    const period = {
        0: "Una vez",
        1: "Cada día",
        7: "Cada semana",
        15: "Cada Quincena",
        30: "Cada Mes",
        365: "año",
    }


    function verDetalle() {
     
            model.getDetail(uuid).then((result) => { //consulta datos 
                console.log(result);
                let template1 = ''; // variable que guarda momentaneamente los datos asta que se inserten  
                let template2 = ''
                result.body.forEach(d => { // es un bucle que repite la lista

                    if (d.type == 0) {
                        template2 += `
                    <tr >
                        <td>${d.expense_name}</td>
                        <td>${d.expense_value}</td>
                        <td>${period[d.expense_period]}</td>                            
                    </tr>
    
                    `;
                    } else {
                        template1 += `
                    <tr >
                        <td>${d.income_name}</td>
                        <td>${d.income_value}</td>
                        <td>${period[d.income_period]}</td>                            
                    </tr>
    
                    `;
                    }
                    
                });
                $('#ingresos').html(template1); 
                 $('#gastos').html(template2);
               
            });
    }
    

    verDetalle();
});