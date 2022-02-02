// const fitcheros = db.collection("fitcheros");

// Funcion para cargar los items de la BBDD
function loadFicheros() {
    selectAll(fitcheros, "title")
        //selectWhere(items, "title", "==", "ruben")
        .then((arrayItems) => {
            console.log(arrayItems)
            $("#listFicheros").innerHTML = `<tr>
												<th class="text-white">Títol</th>
												<th class="text-white">Contingut</th>
												<th></th>
											</tr>`;
            arrayItems.forEach((doc) => {
                /*selectById(categories, doc.data().category.id)
            .then((docCategory) => {
                let image = "";
                if (doc.data().image != null) {
                    image = `<img src="${doc.data().image}" class="rounded" style="max-width: 100px; max-height: 100px;" "alt="${doc.data().title}">`;
                }
                document.getElementById("listItems").innerHTML += 	`<tr>
                                                                        <td>${image}</td>
                                                                        <td>${doc.data().title} - ${docCategory.data().name}</td>
                                                                        <td>${doc.data().content}</td>
                                                                        <td>
                                                                            <button type="button" class="btn btn-danger float-right" onclick="eliminar('${doc.id}', '${doc.data().image}')">
                                                                                Eliminar
                                                                            </button>
                                                                            <button type="button" class="btn btn-primary mr-2 float-right" onclick="editItem('${doc.id}')">
                                                                                Editar
                                                                            </button>
                                                                        </td>
                                                                    </tr>`;
            })
            .catch(() => {
                showAlert("Error al mostrar els elements", "alert-danger");
            });
        });*/
                $("#listFicheros").innerHTML += `<tr>
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


// Funcion para añadir un fitchero
function addFichero(doc) {
    add(fitcheros, doc).then(() => {
        loadFitxeros();

        $("#tituloFitxero").val() = "";
        $("#contenidoFitxero").val() = "";
        $("#fitxer").val() = "";

        showAlert("Fitxer guardat correctament", "alert-success");
    }).catch(() => {
        showAlert("Error al guardar el fitcher", "alert-danger");
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

            document.getElementById("elementId").value = "";
            $("tituloFitxero").val() = "";
            $("contenidoFitxero").value = "";
            ("fitxer").value = "";
            document.getElementById("thumbFitxeros").style.visibility = "hidden";

            showAlert("Fitxer actualitzat correctament", "alert-success");
        })
        .catch(() => {
            showAlert("Error al intentar actualitzat el Fitxer", "alert-danger");
        });
}