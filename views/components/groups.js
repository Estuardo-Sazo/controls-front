import ModelGroups from './modelGroups.js';


document.addEventListener('DOMContentLoaded', () => { /* Ejecuta js hasta renderizar todo el html*/
    const modelGroups = new ModelGroups();
    const data = modelGroups.getAll();
    console.log(data);
});