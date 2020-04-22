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
      <template v-if="user.estado == 'online'">
        <template v-if="user.rol == 1">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/foro">Foro</router-link>
            <router-link class="navbar-item" to="/publicar">Publicar</router-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="navbar-item">{{ user.nombre }}</a>
                <a class="button is-primary" @click.prevent="logout">
                  <strong>Cerrar sesion</strong>
                </a>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="navbar-start">
            <router-link class="navbar-item" to="/foro">Foro</router-link>
            <router-link class="navbar-item" to="/publicar">Publicar</router-link>
            <router-link class="navbar-item" to="/usuarios">Usuarios</router-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="navbar-item">{{ user.nombre }}</a>
                <a class="button is-primary" @click.prevent="logout">
                  <strong>Cerrar sesion</strong>
                </a>
              </div>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-primary" to="/register">
                <strong>Registrarme</strong>
              </router-link>
              <router-link class="button is-light" to="/">Iniciar sesion</router-link>
            </div>
          </div>
        </div>
      </template>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    toggleMenu() {
      const status = !this.isOpen;
      this.isOpen = status;
    },
    logout() {
      this.$store.commit('exitUser'),
      this.$router.push({ name: "login" });
      
    }
  }
};
</script>
