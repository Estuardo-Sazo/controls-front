import ModelGroups from './models/modelGroups.js';


document.addEventListener('DOMContentLoaded', () => { /* Ejecuta js hasta renderizar todo el html*/
    const modelGroups = new ModelGroups();
    const lista = $('#lista');

    // Consulta de todo el listado de grupos
    const list = () => {
        modelGroups.getAll().then((result) => {
            let template = '';
            result.body.forEach(d => {
                template += `
                <tr>
                    <td>${d.name}</td>
                    <td>${d.description}</td>
                    <td><button class="btn btn-primary btn-sm editar" uuid="${d.uuid}">Editar</button></td>
                </tr>             
                `;
            });
            lista.html(template);

        });
    }

    const limpiar = () => {
        $('#name').val('');
        $('#description').val('');
    }


    //editar grupo
    const editar = (id) => {
        console.log(id);
    }

    // Laamar funcion lsitar
    list();



    //Agregar un nuevo grupo
    $('#frm-grupo').submit(function(e) {
        e.preventDefault(); // evita recargue la pagina
        const datos = { //secrea unobjeto
            name: $('#name').val(),
            description: $('#description').val(),
        }

        modelGroups.setData(datos).then(r => {
            if (!r.error) { //analizo que no alla un error
                list();
                limpiar();
                $('#nuevoGrupo').modal('hide');
            } else {
                console.log(r.body);
            }
        });
    });



});