<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        role="button"
        class="navbar-burger burger"
        :class="{'is-active': isOpen}"
        @click.prevent="toggleMenu"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': isOpen}">
      <template v-if="user">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/foro">Foro</router-link>
          <router-link class="navbar-item" to="/publicar">Publicar</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="navbar-item">{{ user.displayName || user.email }}</a>
              <a class="button is-primary" @click.prevent="logout">
                <strong>Cerrar sesion</strong>
               </a>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-primary" to="/register">
                <strong>Registrarme</strong>
              </router-link>
              <router-link class="button is-light" to='/'>Iniciar sesion</router-link>
            </div>
          </div>
        </div>
      </template>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      isOpen: false,
      user: null
    };
  },
  methods: {
    toggleMenu() {
      const status = !this.isOpen;
      this.isOpen = status;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>
