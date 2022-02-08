const fitcheros = db.collection("fitcheros");

// Funcion para añadir un fitchero
function addFichero(doc) {
    add(fitcheros, doc)
        .then(() => {
            loadFicheros();
            $("#tituloFitxero").val() = "";
            $("#contenidoFitxero").val() = "";
            $("#fitxer").val() = "";

            showAlert("Fitxer guardat correctament", "alert-success");
        }).catch(() => {
            showAlert("Error al guardar el fitcher1", "alert-danger");
        });
}

// Funcion para eliminar un item de la BBDD
function deleteFitxer(id) {
    deleteById(fitcheros, id)
        .then(() => {
            loadFicheros();
            showAlert("Fitxer eliminat correctament", "alert-success");
        }).catch(() => {
            showAlert("Error al intentar eliminar el Fitxer", "alert-danger");
        });
}

// Funcion para editar un item de la base de datos
function editFichero(id) {
    $("#elementIdFitxer").val() = id;
    selectById(items, id)
        .then((doc) => {
            $("#tituloFitxero").val() = doc.data().title;
            $("#contenidoFitxero").val() = doc.data().content;
        })
        .catch(() => {
            showAlert("Error al intentar editar l'element", "alert-danger");
        });
}

// Funcion para adaptar el item
function updateFitxero(id, doc) {
    updateById(fitcheros, id, doc)
        .then(() => {
            loadFicheros();

            $("#elementIdFitxer").val() = "";
            $("tituloFitxero").val() = "";
            $("contenidoFitxero").value = "";
            $("fitxer").value = "";
            document.getElementById("thumbFitxeros").style.visibility = "hidden";

            showAlert("Fitxer actualitzat correctament", "alert-success");
        })
        .catch(() => {
            showAlert("Error al intentar actualitzat el Fitxer1", "alert-danger");
        });
}

// Funcion para cargar los items de la BBDD
function loadFicheros(busqueda = "") {
    let select = "";
    if (busqueda == "") {
        $('#tbodyFicheros').empty();
        select = selectAll(fitcheros, "title");
    } else
    if (busqueda != "") {
        $('#tbodyFicheros').empty();
        select = selectWhere(fitcheros, "title", "==", busqueda);
    };
    console.log(select);
    select
        .then((arrayFitxeros) => {
            $("#theadFitcheros").html("<tr>" +
                "<th class='text-white'> Títol </th>" +
                "<th class='text-white'> Contingut </th>" +
                "<th><input type='search' name='busquedaFitxeros' id='busquedaFitxeros' placeholder='Busqueda... '></th>" +
                "<th><button type='button' onclick='searchFitxer()' class='btn btn-default float-right'>Buscar</button></th>",
                "<th></th>",
                "</tr>");


            arrayFitxeros.forEach((doc) => {
                $("#tbodyFicheros").append(
                    "<tr>" +
                    "<td>" + doc.data().title + "</td>" +
                    "<td>" + doc.data().content + "</td>" +
                    "<td>" +
                    "<button type='button' class='btn btn-danger float-right' onclick='deleteFitxer(" + doc.id + ")'>" +
                    "Eliminar" +
                    "</button>" +
                    "</td>" +
                    "<td>" +
                    "<button type='button' class='btn btn-primary mr-2 float-right' onclick='editFichero(" + doc.id + "," + doc.data().fitxer + ")'>" +
                    "Editar" +
                    "</button>" +
                    "</td>" +
                    "</tr>");
            })
        })
        .catch(() => {
            showAlert("Error al mostrar els fitxers", "alert-danger");
        });
}