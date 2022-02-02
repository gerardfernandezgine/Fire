let imatgeModificada = false;

// Funcion para eliminar un elemento selecionado
function eliminar(itemId, imageUrl) {
    deleteFile(imageUrl)
        .then(() => {
            deleteItem(itemId);
        }).catch(() => {
            showAlert("Error al intentar eliminar la imatge", "alert-danger");
        });
}

// Funcion para enseñar el alert
function showAlert(text = "", type) {
    document.getElementById("alert").innerText = text;
    document.getElementById("alert").className = "alert " + type;
    document.getElementById("alert").style.display = "block";
    window.setTimeout(function() {
        document.getElementById("alert").style.display = "none";
    }, 2000);
}

window.addEventListener("load", function() {
    loadItems();
});

// Funciom para iniciar Session
document.getElementById("login").addEventListener("click", function() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            showAlert("Usuari autenticat", "alert-success");

            document.getElementById("loginForm").style.display = "none";
            document.getElementById("itemsForm").style.display = "block";
            document.getElementById("listItems").style.display = "table";
        })
        .catch(function(error) {
            showAlert("Error d’autenticació", "alert-danger");
        });
});

// Funcion para hacer aparecer el formulario de Sing UP
document.getElementById("newUser").addEventListener("click", function() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
});

// Funcion para hacer aparecer el formulario de Login
$("#Tornar").click(function() {
    $("#loginForm").attr("style", "display: block");
    $("#signupForm").attr("style", "display: none");
});

// Funcion para crear un nuevo usuario
document.getElementById("signup").addEventListener("click", function() {
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    let passwordConfirm = document.getElementById("signupPasswordConfirm").value;

    if (email.length > 0 && email.indexOf("@") > 1) {
        if (password.length > 0) {
            if (password == passwordConfirm) {
                auth.createUserWithEmailAndPassword(email, password)
                    .then(function() {
                        showAlert("Usuari creat correctament", "alert-success");
                        document.getElementById("loginForm").style.display = "block";
                        document.getElementById("signupForm").style.display = "none";
                    })
                    .catch(function(error) {
                        showAlert("Error al intentar crear l'usuari", "alert-danger");
                    });
            } else {
                showAlert("Les contrasenyes no coincideixen", "alert-danger");
            }
        } else {
            showAlert("La contrasenya és obligatòria", "alert-danger");
        }
    } else {
        showAlert("Email incorrecte", "alert-danger");
    }
});

// Funcion para guardar una foto
document.getElementById("save").addEventListener("click", function() {
    let id = document.getElementById("elementId").value;
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let image = document.getElementById("image").files[0];
    let doc = {
        content: content,
        title: title
    };

    if (id == "") {
        uploadFile(image)
            .then((imageUrl) => {
                doc.image = imageUrl;
                addItem(doc);
            })
            .catch(() => {
                showAlert("Error al intentar guardar l'element", "alert-danger");
            });
    } else {
        if (imatgeModificada) {
            let currentImageUrl = document.getElementById("thumbnail").src;
            deleteFile(currentImageUrl)
                .then(() => {
                    uploadFile(image)
                        .then((imageUrl) => {
                            doc.image = imageUrl;
                            updateItem(id, doc);
                        })
                        .catch(() => {
                            showAlert("Error al intentar actualitzat l'element", "alert-danger");
                        });
                })
                .catch(() => {
                    showAlert("Error al intentar actualitzat l'element", "alert-danger");
                });
        } else {
            updateItem(id, doc);
        }
    }

    imatgeModificada = false;
});

document.getElementById("image").addEventListener("change", function() {
    imatgeModificada = true;
});

// Funcion para cambiar al formulario de ficheros
$("#Archivos").click(function() {
    $("#FitcherosForm").attr("style", "display: block");
    $("#listItems").attr("style", "display: none");
    $("#itemsForm").attr("style", "display: none");
});

// Funcion para cambiar al formulario de ficheros
$("#images").click(function() {
    $("#FitcherosForm").attr("style", "display: none");
    $("#itemsForm").attr("style", "display: block");
    $("#listItems").attr("style", "display: block");
});