import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';


import Login from './views/Auth/Login.vue'
import Register from './views/Auth/Register.vue'
import Foro from './views/view/Foro.vue'
import Publicar from './views/view/Publicar.vue'


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
        component: Foro,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/publicar',
        name: 'publicar',
        component: Publicar,
        meta: {
          requiresAuth: true
        }
      }     
    ]
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some(ruta => ruta.meta.requiresAuth)) {
      const user = firebase.auth().currentUser;
      if (user) {
        next();
      } else {
        next({
          name: 'login'
        })
      }
    } else {
      next();
    }
})
export default router;