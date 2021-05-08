import ModelSubGroups from './models/modelSubGroups.js';
import ModelGroups from './models/modelGroups.js';


document.addEventListener('DOMContentLoaded', () => { /* Ejecuta js hasta renderizar todo el html*/
    const model = new ModelSubGroups();
    const modelG = new ModelGroups();

    const lista = $('#lista');


    //editar SUBgrupo
    function editar(id) {
        console.log('editar',id);
    }

    //editar SUBgrupo
    function eliminar(id) {
        console.log('Eliminar',id);
    }
    // Consulta de todo el listado de sub grupos
    const list = () => {
        model.getAll().then((result) => {  //llama la lista de datos de bd

            let template = ''; 
            result.body.forEach(d => {
                template += `
                <tr>
                    <td>${d.group}</td>
                    <td>${d.name}</td>
                    <td>${d.description}</td>
                    <td>
                    <button class="btn btn-primary btn-sm editar" uuid="${d.uuid}">Editar</button>
                    <button class="btn btn-danger btn-sm editar" uuid="${d.uuid}">Eliminar</button>
                    </td>
                </tr>
                `;
            });
            lista.html(template);
        });
    }
    
    const limpiar = () => {
        $('#group').val('');
        $('#name').val('');
        $('#description').val('');
    }
    
     // Consulta de todo el listado de  grupos
     const listGroup = () => {
        modelG.getAll().then((result) => {  //conslta lista de grupos de bd
            let template = '';
            result.body.forEach(d => {
                template += `
                <option value="${d.uuid}">${d.name}</option>
                `;
            });
            $('#group').html(template);
        });
    }
    

    //Guardar un nuevo Sub grupo
    $('#frm-subgroup').submit(function (e) {
        e.preventDefault();

        const datos = {
            group: $('#group').val(),   //obtener los datos de id          
            name: $('#name').val(),
            description: $('#description').val()
        }
         model.setData(datos).then(r => {
            if (!r.error) {
                list();
                limpiar();
                $('#Modal').modal('hide');
            } else {
                console.log(r.body);
            }
        });
    });
    
    // Llamar funcion lisitar
    listGroup();
    list();
});