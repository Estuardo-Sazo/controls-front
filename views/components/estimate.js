import ModelEstimate from './models/modelEstimate.js';
document.addEventListener('DOMContentLoaded', () => { /* Ejecuta js hasta renderizar todo el html*/
    const model = new ModelEstimate();
    const period = {
        0: "Una vez",
        1: "Cada día",
        7: "Cada semana",
        15: "Cada Quincena",
        30: "Cada Mes",
        365: "año",
    }


    //Consulta de presupuestos
    const listPresupuesto = () => {
        model.getAll().then((result) => { //consulta datos 
            console.log(result);
            let template = ''; // variable que guarda momentaneamente los datos asta que se inserten       
            result.body.forEach(d => { // es un bucle que repite la lista
                template += `
                <tr uuid="${d.uuid}">
                    <td>${d.uuid}</td>
                    <td>${d.description}</td>
                    <td>${d.date}</td>
                    <td>${d.range} dias</td>
                    <td> <button class="btn btn-primary btn-sm ver"  >Ver datos</button><td>

                </tr>

                `;
            });
            $('#lista').html(template);
        });
    }

    //Consulta de presupuestos
    const listaDetail = (id) => {
        model.getDetail(id).then((result) => { //consulta datos 
            console.log(result);
            /* let template = ''; // variable que guarda momentaneamente los datos asta que se inserten       
            result.body.forEach(d => { // es un bucle que repite la lista
                template += `
                <option value="${d.uuid}">${d.name}</option>

                `;
            });
            $('#group').html(template); */
        });
    }

        //Registrar nuevo presupuesto
        $('#frm-nuevo').submit(function(e) {
            e.preventDefault();
            var fecha1 = moment($('#date').val());
            var fecha2 = moment($('#date1').val());
            const data = {
               
                description: $('#description').val(),
                date: $('#date').val(),
                range: fecha2.diff(fecha1, 'days'),
    
            }
            
            console.log(data);
            model.setData(data).then(r => { //setdata funcion logica de guardado de datos
                if (!r.error) {
                    listPresupuesto(); //consula de lista
                    $('#nuevo').modal('hide');
                } else {
                    console.log(r.body);
                }
            });
        });
    
    
        $(document).on("click", ".ver", function() {
            let element = $(this)[0].parentElement.parentElement;
            let uuid = $(element).attr("uuid");
            localStorage.setItem("presupuesto",uuid);
            location.href ="detailEstimate.html";
        });
    

   
    //Llamado de funciones globales
    listPresupuesto();
});