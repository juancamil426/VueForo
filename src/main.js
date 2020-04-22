import Vue from 'vue'
// Dar por consola= npm i vue-router --save esto me permite el routeo
// Dar por consola npm install bulma
import App from './App.vue'
import vuetify from './config/vuetify'  //Dar por consola npm install --save vuetify
import router from './router.js'
import store from "./config/store"

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App), //Si yo quiero que todas las ventanas se parezcan lo meto a app
}).$mount('#app')

