const items = db.collection("items");
const estados = db.collection("estados");
//const categories = db.collection("categories");
var usuari2 = false;

// Funcion para añadir un item a la BBDD
function addItem(doc) {
    add(items, doc)
        .then(() => {
            loadItems("", 5, usuari2);
            document.getElementById("title").value = "";
            document.getElementById("content").value = "";
            document.getElementById("image").value = "";

            showAlert("Element guardat correctament", "alert-success");
        })
        .catch(() => {
            showAlert("Error al intentar guardar l'element", "alert-danger");
        });
}

// Funcion para eliminar un fitxer de la BBDD
function deleteItem(id) {
    deleteById(items, id)
        .then(() => {
            loadItems("", 5, usuari2);
            console.log("b");
            showAlert("Element eliminat correctament", "alert-success");
        }).catch(() => {
            showAlert("Error al intentar eliminar l'element", "alert-danger");
        });
}

// Funcion per eliminar un fitxer de la BBDD
function deleteFitxeros(id) {
    deleteById(fitcheros, id)
        .then(() => {
            loadItems("", 5, usuari2);
            showAlert("Element eliminat correctament", "alert-success");
        }).catch(() => {
            showAlert("Error al intentar eliminar l'element", "alert-danger");
        });
}

// Funcion para editar un item de la base de datos
function editItem(id) {
    document.getElementById("elementId").value = id;
    document.getElementById("thumbnail").style.visibility = "visible";
    selectById(items, id)
        .then((doc) => {
            document.getElementById("title").value = doc.data().title;
            document.getElementById("content").value = doc.data().content;
            document.getElementById("thumbnail").src = doc.data().image;
        })
        .catch(() => {
            showAlert("Error al intentar editar l'element", "alert-danger");
        });
}
// Funcion para editar un item de la base de datos
function editFitxer(id) {
    document.getElementById("elementId").value = id;
    document.getElementById("thumbnail").style.visibility = "visible";
    selectById(fitcheros, id)
        .then((doc) => {
            document.getElementById("tituloFitxero").value = doc.data().title;
            document.getElementById("contenidoFitxero").value = doc.data().content;
            // document.getElementById("fitxer").src = doc.data().fitxer;
        })
        .catch(() => {
            showAlert("Error al intentar editar l'element", "alert-danger");
        });
}

// Funcion para cargar los items de la BBDD
function loadItems(busqueda = "", limite = 5, usuari = false) {
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
        select = selectAll(items, "title", limite);
    } else if (busqueda != "") {
        select = selectLike(items, "title", busqueda);
    }

    select
        .then((arrayItems) => {
            if (usuari) {

                document.getElementById("listItems").innerHTML = `<tr>
																<th class="text-white">Fotos</th>
																<th class="text-white">Títol</th>
																<th class="text-white">Contingut</th>
                                                                <th class="text-white">Comentari</th>
                                                                <th></th>
                                                                <th></th>
															</tr>`;
            } else {
                document.getElementById("listItems").innerHTML = `<tr>
																<th class="text-white">Fotos</th>
																<th class="text-white">Títol</th>
																<th class="text-white">Estado</th>
                                                                <th class="text-white">Comentari</th>
                                                                <th></th>
                                                                <th></th>

                                                                <th>
                                                                    <input type='search' name='busquedaItems' id='busquedaItems' placeholder='Busqueda... '>
                                                                    <button type='button' onclick='searchItems()' class='btn btn-default'>Buscar</button></th>
                                                                </th>
															</tr>`;
            }
            arrayItems.forEach((doc) => {
                selectById(estados, doc.data().estado.id).then((docEstado) => {
                    console.log(doc);
                    let image = "";
                    if (doc.data().image != null) {
                        image = `<img src="${doc.data().image}" class="rounded" style="max-width: 100px; max-height: 100px;" "alt="${doc.data().title}">`;
                    }
                    if (usuari) {
                        document.getElementById("listItems").innerHTML += `<tr>
                        <td>${image}</td>
                        <td>${doc.data().title}</td>
                        <td>${doc.data().content}</td>
                        <td>${doc.data().comentari}</td>
                        <td></td>
                        </tr>`;
                    } else {
                        document.getElementById("listItems").innerHTML += `<tr>
                                                                    <td>${image}</td>
                                                                    <td>${doc.data().title}</td>
                                                                    <td>${doc.data().content}</td>
                                                                    <td>${docEstado.data().estado}</td>
                                                                    <td>${doc.data().comentari}</td>
                                                                    <td></td>
                                                                    <td>
                                                                        <button type="button" class="btn btn-danger eliminarItem float-right" onclick="eliminar('${doc.id}', '${doc.data().image}')">
                                                                            Eliminar
                                                                        </button>
                                                                        <button type="button" class="btn btn-primary mr-2 adaptarItem float-right" onclick="editItem('${doc.id}')">
                                                                            Editar
                                                                        </button>
                                                                    </td>
                                                                </tr>`;
                    }
                });
            });
            document.getElementById("listItems").innerHTML += `<tr>
            <button type='button' onclick='sumapagines()' class='btn btn-default'>Ver mas</button>
            </td>
        </tr>`;
        })
        .catch(() => {
            showAlert("Error al mostrar els elements", "alert-danger");
        });
}


// Funcion para adaptar el item
function updateItem(id, doc) {
    updateById(items, id, doc)
        .then(() => {
            loadItems("", 5, usuari2);
            document.getElementById("elementId").value = "";
            document.getElementById("title").value = "";
            document.getElementById("content").value = "";
            document.getElementById("image").value = "";
            document.getElementById("thumbnail").style.visibility = "hidden";

            showAlert("Element actualitzat correctament", "alert-success");
        })
        .catch(() => {
            showAlert("Error al intentar actualitzat l'element", "alert-danger");
        });
}