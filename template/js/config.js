// Iniciar Sesion en Nuestro Servidor de FireBase
firebase.initializeApp({
    apiKey: "AIzaSyAlONEekeGFQ-hLi5ftmqD86yKTCxqWexA",
    authDomain: "ruedas-194fa.firebaseapp.com",
    projectId: "ruedas-194fa",
    storageBucket: "ruedas-194fa.appspot.com",
    messagingSenderId: "940158935676",
    appId: "1:940158935676:web:053dd47e6c91e8991c1ff9"
});

// Para poder usar el firebase
const auth = firebase.auth();