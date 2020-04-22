import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyD8-FANYRKmXHDQgum6TXDzB4F23ehtc94",
    authDomain: "proyectoforo-dcebc.firebaseapp.com",
    databaseURL: "https://proyectoforo-dcebc.firebaseio.com",
    projectId: "proyectoforo-dcebc",
    storageBucket: "proyectoforo-dcebc.appspot.com",
    messagingSenderId: "866752610522",
    appId: "1:866752610522:web:522403b636bb92ee4965e3",
    measurementId: "G-22PTR61FCE"
}

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();