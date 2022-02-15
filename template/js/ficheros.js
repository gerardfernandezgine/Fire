const fitcheros = db.collection("fitcheros");
var usuari2 = false;

// Funcion para añadir un fitchero
function addFichero(doc) {
    add(fitcheros, doc)
        .then(() => {
            loadFicheros("", 5, usuari2);
            $("#tituloFitxero").val() = "";
            $("#contenidoFitxero").val() = "";
            $("#fitxer").val() = "";

            showAlert("Fitxer guardat correctament", "alert-success");
        }).catch(() => {
            showAlert("Error al guardar el fitxer", "alert-danger");
        });
}


// Funcion para adaptar el Fitxero
function updateFitxero(id, doc) {
    updateById(fitcheros, id, doc)
        .then(() => {
            loadFicheros("", 5, usuari2);

            $("#elementIdFitxer").val() = "";
            $("tituloFitxero").val() = "";
            $("contenidoFitxero").value = "";
            $("fitxer").value = "";
            document.getElementById("thumbFitxeros").style.visibility = "hidden";

            showAlert("Fitxer actualitzat correctament", "alert-success");
        })
        .catch(() => {
            showAlert("Error al intentar actualitzat el fitxer", "alert-danger");
        });
}

// Funcion para cargar los ficheros de la BBDD
function loadFicheros(busqueda = "", limite = 5, usuari = false) {
    usuari2 = usuari;
    if (usuari2) {
        $("#formusuari1").css("display", "none");
        $("#formusuari2").css("display", "none");
        $("#formusuari3").css("display", "none");
        $("#formusuari4").css("display", "none");
        $("#formusuari9").css("display", "none");
        $("#formusuari10").css("display", "none");
        $("#formusuari11").css("display", "none");
        $("#formusuari5").css("display", "none");
        $("#formusuari6").css("display", "none");
        $("#formusuari7").css("display", "none");
        $("#formusuari8").css("display", "none");
        $("#save").css("display", "none");
        $("#saveFitxer").css("display", "none");
    }
    let select = "";
    if (busqueda == "") {
        $('#tbodyFicheros').empty();
        select = selectAll(fitcheros, "title", limite);
    } else
    if (busqueda != "") {
        $('#tbodyFicheros').empty();
        select = selectLike(fitcheros, "title", busqueda);
    };
    select
        .then((arrayFitxeros) => {
            if (usuari) {

                $("#theadFitcheros").html("<tr>" +
                    "<th class='text-white'> Títol </th>" +
                    "<th class='text-white'> Contingut </th>" +
                    "<th class='text-white'> Comentari </th>" +
                    "</tr>");
            } else {
                $("#theadFitcheros").html("<tr>" +
                    "<th class='text-white'> Títol </th>" +
                    "<th class='text-white'> Contingut </th>" +
                    "<th class='text-white'> Comentari </th>" +
                    "<th></th>" +
                    "<th></th>" +
                    "<th><input type='search' name='busquedaFitxeros' id='busquedaFitxeros' placeholder='Busqueda... '>" +
                    "<button type='button' onclick='searchFitxer()' class='btn btn-default'>Buscar</button></th>" +
                    "</tr>");
            }

            arrayFitxeros.forEach((doc) => {
                if (usuari) {
                    $("#tbodyFicheros").append(
                        "<tr>" +
                        "<td>" + doc.data().title + "</td>" +
                        "<td>" + doc.data().content + "</td>" +
                        "<td>" + doc.data().comentari + "</td>" +
                        "<td>" +
                        "</tr>");
                } else {
                    $("#tbodyFicheros").append(
                        "<tr>" +
                        "<td>" + doc.data().title + "</td>" +
                        "<td>" + doc.data().content + "</td>" +
                        "<td>" + doc.data().comentari + "</td>" +
                        "<td>" +
                        "<td>" +
                        "<td>" +
                        "<td>" +
                        "<button type='button' class='btn btn-danger float-right eliminarFitchero' onclick=\"deleteFitxer('" + doc.id + "','" + doc.data().fitxer + "')\">" +
                        "Eliminar" +
                        "</button>" +
                        "<button type='button' class='btn btn-primary mr-2 float-right' onclick=\"editFitxer('" + doc.id + "')\">" +
                        "Editar" +
                        "</button>" +
                        "</td>" +
                        "</tr>");
                }
            })

        })
        .catch(() => {
            showAlert("Error al mostrar els fitxers", "alert-danger");
        });
}