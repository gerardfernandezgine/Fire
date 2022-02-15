const items = db.collection("items");
//const categories = db.collection("categories");


// Funcion para añadir un item a la BBDD
function addItem(doc) {
    add(items, doc)
        .then(() => {
            loadItems();
            document.getElementById("title").value = "";
            document.getElementById("content").value = "";
            document.getElementById("image").value = "";

            showAlert("Element guardat correctament", "alert-success");
        })
        .catch(() => {
            showAlert("Error al intentar guardar l'element", "alert-danger");
        });
}

// Funcion para eliminar un item de la BBDD
function deleteItem(id) {
    deleteById(items, id)
        .then(() => {
            loadItems();
            console.log("b");
            showAlert("Element eliminat correctament", "alert-success");
        }).catch(() => {
            showAlert("Error al intentar eliminar l'element", "alert-danger");
        });
}

function deleteFitxeros(id) {
    deleteById(fitcheros, id)
        .then(() => {
            loadItems();
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
function loadItems(busqueda = "") {
    let select = "";
    if (busqueda == "") {
        select = selectAll(items, "title");
    } else if (busqueda != "") {
        select = selectWhere(items, "title", "==", busqueda);
    }

    select
        .then((arrayItems) => {
            document.getElementById("listItems").innerHTML = `<tr>
																<th class="text-white">Fotos</th>
																<th class="text-white">Títol</th>
																<th class="text-white">Contingut</th>
                                                                <th>
                                                                    <input type='search' name='busquedaItems' id='busquedaItems' placeholder='Busqueda... '>
                                                                    <button type='button' onclick='searchItems()' class='btn btn-default'>Buscar</button></th>
                                                                </th>
															</tr>`;
            arrayItems.forEach((doc) => {
                console.log(doc);
                let image = "";
                if (doc.data().image != null) {
                    image = `<img src="${doc.data().image}" class="rounded" style="max-width: 100px; max-height: 100px;" "alt="${doc.data().title}">`;
                }
                document.getElementById("listItems").innerHTML += `<tr>
                                                                    <td>${image}</td>
                                                                    <td>${doc.data().title}</td>
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
        })
        .catch(() => {
            showAlert("Error al mostrar els elements", "alert-danger");
        });
}


// Funcion para adaptar el item
function updateItem(id, doc) {
    updateById(items, id, doc)
        .then(() => {
            loadItems();
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