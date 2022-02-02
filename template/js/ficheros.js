const fitcheros = db.collection("fitcheros");

// Funcion para añadir un fitchero
function addFichero(doc) {
    add(fitcheros, doc).then(() => {
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
    deleteById(fitcheros, id).then(() => {
        loadFicheros();
        showAlert("Fitxer eliminat correctament", "alert-success");
    }).catch(() => {
        showAlert("Error al intentar eliminar el Fitxer", "alert-danger");
    });
}

// Funcion para adaptar el item
function updateFitxero(id, doc) {
    updateById(fitcheros, id, doc)
        .then(() => {
            loadFicheros();

            $("#elementId").val() = "";
            $("tituloFitxero").val() = "";
            $("contenidoFitxero").value = "";
            $("fitxer").value = "";
            document.getElementById("thumbFitxeros").style.visibility = "hidden";

            showAlert("Fitxer actualitzat correctament", "alert-success");
        })
        .catch(() => {
            showAlert("Error al intentar actualitzat el Fitxer", "alert-danger");
        });
}

// Funcion para cargar los items de la BBDD
function loadFicheros() {
    selectAll(fitcheros, "title")
        //selectWhere(items, "title", "==", "ruben")
        .then((arrayFitxeros) => {
            console.log(arrayFitxeros)
            $("#listFicheros").html() = `<tr>
    											<th class="text-white">Títol</th>
    											<th class="text-white">Contingut</th>
    											<th></th>
    										</tr>`;
            arrayFitxeros.forEach((doc) => {
                $("#listFicheros").html() += `<tr>
                                                    <td>${doc.data().title}</td>
                                                    <td>${doc.data().content}</td>
                                                    <td>
                                                        <button type="button" class="btn btn-danger float-right" onclick="eliminar('${doc.id}')">
                                                            Eliminar
                                                        </button>
                                                        <button type="button" class="btn btn-primary mr-2 float-right" onclick="editItem('${doc.id}')">
                                                            Editar
                                                        </button>
                                                    </td>
                                                </tr>`;
            })
        })
        .catch(() => {
            showAlert("Error al mostrar els fitxers", "alert-danger");
        });
}