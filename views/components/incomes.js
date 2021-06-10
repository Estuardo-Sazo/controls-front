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
                <tr uuid="${d.uuid}">
                <td>${d.name}</td>
                <td>Q${d.value}</td>
                <td> <strong>${period[d.period]}</strong></td>
                <td><button class="btn btn-primary btn-sm editar" >Editar</button> <button class="btn btn-danger btn-sm eliminar" >Eliminar</button></td>
            </tr>
                `;
            });
            lista.html(template);
        });
    }


    const limpiar = () => {
        $('#name').val('');
        $('#periodo').val('');
        $('#value').val('');
       

    }
    //Registrar nuevo 
    $('#nuevo').submit(function(e) {
        e.preventDefault();
        const data = {
            name: $('#name').val(),
            period: $('#period').val(),
            value: $('#value').val(),
            date: $('#date').val(),

        }

        model.setData(data).then(r => { //setdata funcion logica de guardado de datos
            if (!r.error) {
                list(); //consula de lista
                limpiar();
                $('#nuevo').modal('hide');
                $('#modal').modal('hide');
            } else {
                console.log(r.body);
            }
        });
    });

     //Eliminar  -- funccion que detecta cuando se preciona el btn Elimiar
     $(document).on("click", ".eliminar", function() {
        let element = $(this)[0].parentElement.parentElement;
        let uuid = $(element).attr("uuid");
        $.confirm({
            title: "¿Estas seguro de eliminar?",
            content: "Perderan todos los regitros realcionados.",
            type: "red",
            buttons: {
                confirm: {
                    text: "Continuar",
                    btnClass: "btn-red",
                    action: function() {
                        model.delete(uuid).then((result) => {

                            list(); //consula de lista recargar
                        });
                    },
                },
                cancel: {
                    text: "Cancelar",
                    btnClass: "btn-blue",
                    action: function() {},
                },
            },
        });
    });

    //Llamado de funciones
    list();
});