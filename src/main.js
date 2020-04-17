import Vue from 'vue'
// Dar por consola= npm i vue-router --save esto me permite el routeo
// Dar por consola npm install bulma
import App from './App.vue'
import vuetify from './config/vuetify'  //Dar por consola npm install --save vuetify
import router from './router.js'
import * as firebase from "firebase";

Vue.config.productionTip = false

const configOptions = {
  apiKey: "AIzaSyD8-FANYRKmXHDQgum6TXDzB4F23ehtc94",
  authDomain: "proyectoforo-dcebc.firebaseapp.com",
  databaseURL: "https://proyectoforo-dcebc.firebaseio.com",
  projectId: "proyectoforo-dcebc",
  storageBucket: "proyectoforo-dcebc.appspot.com",
  messagingSenderId: "866752610522",
  appId: "1:866752610522:web:522403b636bb92ee4965e3",
  measurementId: "G-22PTR61FCE"
};
firebase.initializeApp(configOptions);

let app = null

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})


