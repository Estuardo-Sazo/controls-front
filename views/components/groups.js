import ModelGroups from "./models/modelGroups.js"; //importar archivo de logica

document.addEventListener("DOMContentLoaded", () => {
  /* Ejecuta js hasta renderizar todo el html*/
  const modelGroups = new ModelGroups();

  //Eliminar grupo -- funccion que detecta cuando se preciona el btn Elimiar
  $(document).on("click", ".eliminar", function () {
    let element = $(this)[0].parentElement.parentElement;
    let uuid = $(element).attr("uuid");
    $.confirm({
      title: "¿Estas seguro de elimiar?",
      content: "Perderan todos los regitros realcionados.",
      type: "red",
      buttons: {
        confirm: {
          text: "Continuar",
          btnClass: "btn-red",
          action: function () {
            modelGroups.delete(uuid).then((result) => {
             
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

  //editar grupo -- funccion que detecta cuando se preciona el btn Editar
  $(document).on("click", ".editar", function () {
    let element = $(this)[0].parentElement.parentElement;
    let uuid = $(element).attr("uuid");
    modelGroups.get(uuid).then((result) => {
      //consulta  datos
      let template = "";
      result.body.forEach((d) => {
        // recorremos el resultado
        $("#id").val(d.uuid);
        $("#na").val(d.name);
        $("#des").val(d.description);
      });
      $("#editar").modal("show");
    });
  });

  // Consulta de todo el listado de grupos
  const list = () => {
    modelGroups.getAll().then((result) => {
      //consulta  datos
      let template = "";
      result.body.forEach((d) => {
        // recorremos el resultado
        template += `
                <tr uuid="${d.uuid}">
                    <td>${d.name}</td>
                    <td>${d.description}</td>
                    <td><button class="btn btn-primary btn-sm editar"  >Editar</button> <button class="btn btn-danger btn-sm eliminar"  >Eliminar</button></td>
                </tr>
                `;
      });
      $("#lista").html(template);
    });
  };

  /*
   */
  const limpiar = () => {
    $("#name").val("");
    $("#description").val("");
  };

  // Llamar funcion lsitar
  list();

  //Agregar un nuevo grupo
  $("#frm-grupo").submit(function (e) {
    e.preventDefault(); /// evitar que recargue pagina
    const datos = {
      name: $("#name").val(),
      description: $("#description").val(),
    };
    modelGroups.setData(datos).then((r) => {
      //setdata funcion logica de guardado de datos
      if (!r.error) {
        list(); //consula de lista recargar
        limpiar();
        $("#nuevoGrupo").modal("hide");
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

      name: $("#na").val(),
      description: $("#des").val(),
    };
    modelGroups.putData(datos).then((r) => {
      //setdata funcion logica de guardado de datos
      if (!r.error) {
        list(); //consula de lista recargar
        limpiar();
        $("#editar").modal("hide");
      } else {
        console.log(r.body);
      }
    });
  });
});
