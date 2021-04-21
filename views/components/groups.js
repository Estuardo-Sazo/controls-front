import ModelGroups from './modelGroups.js';


document.addEventListener('DOMContentLoaded', () => { /* Ejecuta js hasta renderizar todo el html*/
    const modelGroups = new ModelGroups();
    const lista = document.getElementById('lista');

    //editar grupo
    const editar = (id) => {
        console.log(id);
    }


    // Consulta de todo el listado de grupos
    modelGroups.getAll().then((result) => {
        let template = '';
        result.body.forEach(d => {
            template += `
            <tr>
                <td>${d.name}</td>
                <td>${d.description}</td>
                <td><button class="btn btn-primary btn-sm editar" uuid=${d.uuid}">Editar</button></td>
            </tr>
            `;
        });
        lista.innerHTML = template;
    });

});