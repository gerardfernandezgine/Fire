const storage = firebase.storage();

// Funcion para eliminar la imagen
function deleteFile(url) {
    return new Promise((resolve, reject) => {
        storage.refFromURL(url).delete()
            .then(() => {
                resolve();
            })
            .catch(() => {
                reject();
            });
    });
}

// Funcion para añador la imagen
function uploadFile(url) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(url);
        reader.onloadend = () => {
            let randomId = Math.random().toString(36).substr(2);
            storage.ref().child('images').child('items').child(randomId).putString(reader.result, "data_url")
                .then((snapshot) => {
                    resolve(snapshot.downloadURL);
                })
                .catch(() => {
                    reject();
                });
        }
    });
}