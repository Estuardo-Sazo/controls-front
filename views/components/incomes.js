import ModelIncomes from './models/modelIncomes.js';

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


    // Consulta de todo el listado de gastos
    const list = () => {
        model.getAll().then((result) => {
            let template = '';
            result.body.forEach(d => {
                template += `
                <tr>
                <td>${d.name}</td>
                <td>Q${d.value}</td>
                <td> <strong>${period[d.period]}</strong></td>
                <td><button class="btn btn-primary btn-sm editar" uuid="${d.uuid}" onClick="editar(${d.uuid})">Editar</button> <button class="btn btn-danger btn-sm eliminar" uuid="${d.uuid}" onClick="eliminar(${d.uuid})">Eliminar</button></td>
            </tr>
                `;
            });
            lista.html(template);
        });
    }

    //Registrar nuevo 
    $('#nuevo').submit(function(e) {
        e.preventDefault();
        const data = {
            name: $('#name').val(),
            period: $('#period').val(),
            value: $('#value').val()
        }

        model.setData(data).then(r => { //setdata funcion logica de guardado de datos
            if (!r.error) {
                list(); //consula de lista

                $('#modal').modal('hide');
            } else {
                console.log(r.body);
            }
        });
    });


    //Llamado de funciones
    list();
});