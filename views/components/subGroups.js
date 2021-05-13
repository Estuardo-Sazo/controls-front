import ModelSubGroups from "./models/modelSubGroups.js";
import ModelGroups from "./models/modelGroups.js";

document.addEventListener("DOMContentLoaded", () => {
  /* Ejecuta js hasta renderizar todo el html*/
  const model = new ModelSubGroups();
  const modelG = new ModelGroups();

  const lista = $("#lista");

  //editar  -- funccion que detecta cuando se preciona el btn Editar
  $(document).on("click", ".editar", function () {
    let element = $(this)[0].parentElement.parentElement;
    let uuid = $(element).attr("uuid");
    model.get(uuid).then((result) => {
      result.body.forEach((d) => {
        $("#id").val(d.uuid);
        $("#g").val(d.group);
        $("#na").val(d.name);
        $("#des").val(d.description);
        $("#ModalEditar").modal("show");
      });
    });
  });

  //Eliminar  -- funccion que detecta cuando se preciona el btn Elimiar
  $(document).on("click", ".eliminar", function () {
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
          action: function () {
            model.delete(uuid).then((result) => {             
              list(); //consula de lista recargar
            });
          },
        },
        cancel: {
          text: "Cancelar",
          btnClass: "btn-blue",
          action: function () {},
        },
      },
    });
  });

  // Consulta de todo el listado de sub grupos
  const list = () => {
    model.getAll().then((result) => {
      //llama la lista de datos de bd

      let template = "";
      result.body.forEach((d) => {
        template += `
                <tr uuid="${d.uuid}">
                    <td>${d.group}</td>
                    <td>${d.name}</td>
                    <td>${d.description}</td>
                    <td>
                    <button class="btn btn-primary btn-sm editar" >Editar</button>
                    <button class="btn btn-danger btn-sm eliminar" >Eliminar</button>
                    </td>
                </tr>
                `;
      });
      lista.html(template);
    });
  };

  const limpiar = () => {
    $("#group").val("");
    $("#name").val("");
    $("#description").val("");
  };

  // Consulta de todo el listado de  grupos
  const listGroup = () => {
    modelG.getAll().then((result) => {
      //conslta lista de grupos de bd
      let template = "";
      result.body.forEach((d) => {
        template += `
                <option value="${d.uuid}">${d.name}</option>
                `;
      });
      $("#group").html(template);
      $("#g").html(template);
    });
  };

  //Guardar un nuevo Sub grupo
  $("#frm-subgroup").submit(function (e) {
    e.preventDefault();

    const datos = {
      group: $("#group").val(), //obtener los datos de id
      name: $("#name").val(),
      description: $("#description").val(),
    };
    model.setData(datos).then((r) => {
      if (!r.error) {
        list();
        limpiar();
        $("#Modal").modal("hide");
      } else {
        console.log(r.body);
      }
    });
  });
    
    //Formulario Editar  grupo
  $("#frm-editar").submit(function (e) {
    e.preventDefault(); /// evitar que recargue pagina
    const datos = {
        uuid: $("#id").val(),
        group: $("#g").val(),
        name: $("#na").val(),
        description: $("#des").val(),
    };
    model.putData(datos).then((r) => {
      // funcion logica de guardado de datos
      if (!r.error) {
        list(); //consula de lista recargar
        $("#ModalEditar").modal("hide");
      } else {
        console.log(r.body);
      }
    });
  });
    

  // Llamar funcion lisitar
  listGroup();
  list();
});
