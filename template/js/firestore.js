//
const db = firebase.firestore();

// Funcion para añadir
function add(collection, doc) {
    return new Promise((resolve, reject) => {
        collection.add(doc)
            .then((doc) => {
                resolve(doc);
            })
            .catch(() => {
                reject();
            });
    });
}

// Funcion para eliminar objetos por id
function deleteById(collection, id) {
    return new Promise((resolve, reject) => {
        collection.doc(id).delete()
            .then((doc) => {
                resolve(doc);
            })
            .catch(() => {
                reject();
            });
    });
}


// Funcion para selecionar todos los atributos guardados en la BBDD
function selectAll(collection, field = null) {

    return new Promise((resolve, reject) => {
        if (field != null) {
            collection.orderBy(field).get()
                .then((querySnapshot) => {
                    let docs = [];
                    querySnapshot.forEach((doc) => {
                        docs.push(doc);
                    });
                    resolve(docs);
                })
                .catch(() => {
                    reject();
                });
        } else {
            collection.get()
                .then((querySnapshot) => {
                    let docs = [];
                    querySnapshot.forEach((doc) => {
                        docs.push(doc);
                    });
                    resolve(docs);
                })
                .catch(() => {
                    reject();
                });
        }
    });
}

// Funcion para selecionar por Id
function selectById(collection, id) {
    return new Promise((resolve, reject) => {
        collection.doc(id).get()
            .then((doc) => {
                resolve(doc);
            })
            .catch(() => {
                reject();
            });
    });
}

function selectWhere(collection, field, operator, value) {
    return new Promise((resolve, reject) => {
        collection.where(field, operator, value).get()
            .then((querySnapshot) => {
                let docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push(doc);
                });
                resolve(docs);
            })
            .catch(() => {
                reject();
            });
    });
}

function updateById(collection, id, doc) {
    return new Promise((resolve, reject) => {
        collection.doc(id).update(doc)
            .then((doc) => {
                resolve(doc);
            })
            .catch(() => {
                reject();
            });
    });
}