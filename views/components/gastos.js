import ModelGastos from './models/modelGastos.js';
import ModelGroups from './models/modelGroups.js';
import ModelSubGroups from './models/modelSubGroups.js';

document.addEventListener('DOMContentLoaded', () => { /* Ejecuta js hasta renderizar todo el html*/
    const model = new ModelGastos();
    const modelGroups = new ModelGroups();
    const modelSubGroups = new ModelSubGroups();


    const lista = $('#lista');
    const period = {
        0: "Una vez",
        1: "Cada día",
        7: "Cada semana",
        15: "Cada Quincena",
        30: "Cada Mes",
    }

    //Consulta de grupos
    const listGroup = () => {
        modelGroups.getAll().then((result) => {
            let template = '';
            result.body.forEach(d => {
                template += `
                <option value="${d.uuid}">${d.name}</option>

                `;
            });
            $('#group').html(template);
        });
    }

    // Consulta de todo el listado de sub grupos
    const listSubGroup = (id) => {
        modelSubGroups.getForGroup(id).then((result) => {
            let template = '';
            result.body.forEach(d => {
                template += `
                <option value="${d.uuid}">${d.name}</option>
                `;
            });
            $('#subgroup').html(template);
        });
    }

    // Consulta de todo el listado de gastos
    const list = () => {
        model.getAll().then((result) => {
            let template = '';
            result.body.forEach(d => {
                template += `
                <div class="col-md-7 mt-2">
                    <div class="fondo-tabla p-2 pl-3 pr-3">
                        <h2 class="text-center title-card">${d.name}</h2>
                        <div class="row">
                            <div class="col-7">
                                <p class="m-0">Grupo: <strong>${d.group}</strong></p>
                                <p class="m-0">Sub Grupo: <strong>${d.sub_group}</strong></p>
                                <p class="m-0">Peridodo: <strong>${period[d.period]}</strong></p>
                                <p class="m-0">Estado: <strong>${d.status == 1 ? 'Activo':'Desactivado'}</strong></p>
                                <p> <button class="btn btn-primary btn-sm editar" >Edit</button>  <button class="btn btn-danger btn-sm editar" >Eliminar</button> </p>
                            </div>
                            <div class="col-5 text-center">
                                <h5>Monto:</h5>
                                <h1 class="monto-card"><strong>Q${parseFloat(d.value).toFixed(2)}</strong></h1>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });
            lista.html(template);
        });
    }

    //Deteccion de grupo seleccionado
    $('#group').change(function() {
        console.log($('#group').val());
        listSubGroup($('#group').val());
    });

    //Registrar nuevo gasto
    $('#nuevoGasto').submit(function(e) {
        e.preventDefault();
        const data = {
            group: $('#group').val(),
            subgroup: $('#subgroup').val(),
            name: $('#name').val(),
            description: $('#description').val(),
            period: $('#period').val(),
            value: $('#value').val()
        }

        model.setData(data).then(r => { //setdata funcion logica de guardado de datos
            if (!r.error) {
                list(); //consula de lista

                $('#nuevo').modal('hide');
            } else {
                console.log(r.body);
            }
        });
    });




    //Llamado de funciones para
    list();
    listGroup();

});