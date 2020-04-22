import Vue from 'vue';
import Router from 'vue-router';



import Login from './views/Auth/Login.vue'
import Register from './views/Auth/Register.vue'
import Foro from './views/view/Foro.vue'
import Publicar from './views/view/Publicar.vue'
import Usuarios from './views/view/Usuarios.vue'


Vue.use(Router);

const router = new Router({
    routes: [
      {
        path: '/',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/foro',
        name: 'foro',
        component: Foro
      },
      {
        path: '/publicar',
        name: 'publicar',
        component: Publicar
      },  
      {
        path: '/usuarios',
        name: 'usuarios',
        component: Usuarios
      }   
    ]
  });


export default router;