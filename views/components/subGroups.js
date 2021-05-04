import ModelSubGroups from './models/modelSubGroups.js';
import ModelGroups from './models/modelGroups.js';


document.addEventListener('DOMContentLoaded', () => { /* Ejecuta js hasta renderizar todo el html*/
    const model = new ModelSubGroups();
    const modelG = new ModelGroups();

    const lista = $('#lista');


    // Consulta de todo el listado de sub grupos
    const list = () => {
        model.getAll().then((result) => {
            let template = '';
            result.body.forEach(d => {
                template += `
                <tr>
                    <td>${d.group}</td>

                    <td>${d.name}</td>
                    <td>${d.description}</td>
                    <td><button class="btn btn-primary btn-sm editar" uuid=${d.uuid}">Editar</button></td>
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
    
     // Consulta de todo el listado de  grupos
     const listGroup = () => {
        modelG.getAll().then((result) => {
            let template = '';
            result.body.forEach(d => {
                template += `
                <option value="${d.uuid}">${d.name}</option>
                `;
            });
            $('#group').html(template);
        });
    }
    

    //Agregar un nuevo Sub grupo
    $('#frm-subgroup').submit(function (e) {
        e.preventDefault();

        const datos = {
            group: $('#group').val(),
            
            name: $('#name').val(),
            description: $('#description').val()
        }
        console.log(datos);
        /*  model.setData(datos).then(r => {
            if (!r.error) {
                list();
                limpiar();
                $('#Modal').modal('hide');
            } else {
                console.log(r.body);
            }
        }); */
    });
    
    // Laamar funcion lsitar
    listGroup();
    list();
});