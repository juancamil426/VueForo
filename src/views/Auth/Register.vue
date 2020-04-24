<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Crear una cuenta</h3><hr>
        <form action="#" @submit.prevent="register">
          
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input class="input" type="text" placeholder="Juan Cubillos" v-model="newUser.name">
            </div>
          </div>

          <div class="field">
            <label class="label">Correo</label>
            <div class="control">
              <input class="input" type="email" placeholder="juan@correo.com" v-model="newUser.email">
            </div>
          </div>

          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control">
              <input class="input" type="password" placeholder="*****" v-model="newUser.password">
            </div>
          </div>

          <button type="submit" class="button is-primary">Registrarme</button>
        </form>

        <div class="notification is-danger mt-10" v-if="error">          
          {{ error }}
        </div>

      </div>
    </div>
  </div>
</template>
<script>

import db from '../../config/firebase'

export default {
  data () {
    return {
      newUser: {
        name: '',
        email: '',
        password: '',
        rol: 1,
        rutaImagen: ''
      },
      error: ''
    }
  },
  name: 'Register',
  methods: {
    register() {
      this.error = ''
      var md5 = require('md5');
      if (this.newUser.name && this.newUser.email && this.newUser.password) {
        this.definirImagen();
        db.collection('usuarios').add({
          Nombre: this.newUser.name,
          Correo: this.newUser.email,
          Contraseña: md5(this.newUser.password),
          Rol: this.newUser.rol,
          Ruta: this.newUser.rutaImagen

        })
        this.newUser.name = ''
        this.newUser.email = ''
        this.newUser.password = ''
        this.newUser.rutaImagen = ''
        this.$router.push({name: 'login'}) 

      }else {
        this.error = 'Todos los campos son requeridos'
      }
    },
    definirImagen() {
      var numero = Math.floor(Math.random() * (7 - 0 + 1) + 0)
      if(numero < 8){
        var rutas = this.$store.state.urls
        this.newUser.rutaImagen = rutas[numero].ruta
      }
      else{
        this.newUser.rutaImagen = rutas[0].ruta
      }
    }
  }
}
</script>

<style lang="scss">
    .mt-10{
        margin-top: 10px;
    }
    .mt-50{
        margin-top: 50px;
    }
</style>