import ModelGroups from './models/modelGroups.js'; //importar archivo de logica


document.addEventListener('DOMContentLoaded', () => { /* Ejecuta js hasta renderizar todo el html*/
    const modelGroups = new ModelGroups();
  //editar grupo
    function editar(id) {
        console.log('editar',id);
    }

    //editar grupo
    function eliminar(id) {
        console.log('Eliminar',id);
    }

    // Consulta de todo el listado de grupos
    const list = () => {
        modelGroups.getAll().then((result) => {
            let template = '';
            result.body.forEach(d => {// recorremos el resultado
                template += `
                <tr>
                    <td>${d.name}</td>
                    <td>${d.description}</td>
                    <td><button class="btn btn-primary btn-sm editar" uuid="${d.uuid}" onClick="editar(${d.uuid})">Editar</button> <button class="btn btn-danger btn-sm eliminar" uuid="${d.uuid}" onClick="eliminar(${d.uuid})">Eliminar</button></td>
                </tr>
                `;
            });
            $('#lista').html(template);
        });
    }
    
    const limpiar = () => {
        $('#name').val('');
        $('#description').val('');
    }
    
   

    // Llamar funcion lsitar
    list();



    //Agregar un nuevo grupo
    $('#frm-grupo').submit(function(e) {
        e.preventDefault();/// evitar que recargue pagina
        const datos = {
            name: $('#name').val(),
            description: $('#description').val()
        }
        modelGroups.setData(datos).then(r => {  //setdata funcion logica de guardado de datos
            if (!r.error) {
                list();//consula de lista
                limpiar();
                $('#nuevoGrupo').modal('hide');
            } else {
                console.log(r.body);
            }
        });
    });



});