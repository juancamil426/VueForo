<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Crear una cuenta</h3><hr>
        <form action="#" @submit.prevent="register">
          
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input class="input" type="text" placeholder="Juan Cubillos" v-model="name">
            </div>
          </div>

          <div class="field">
            <label class="label">Correo</label>
            <div class="control">
              <input class="input" type="email" placeholder="juan@correo.com" v-model="email">
            </div>
          </div>

          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control">
              <input class="input" type="password" placeholder="*****" v-model="password">
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
import firebase from 'firebase'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  },
  name: 'Register',
  methods: {
    register() {
      this.error = ''
      if (this.name && this.email && this.password) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            //actualizar el usuario
            if (user) {
              user.user.updateProfile({
                displayName: this.name                
              }).then((u) => {
                this.name = ''
                this.email = ''
                this.password = ''
                this.$router.push({name: 'dashboard'}) 
                console.log(u);                             
              }).catch((err) => {
                this.error = err.message
              })             
            }            
          }).catch(err => {
            this.error = err.message
          })
      }else {
        this.error = 'Todos los campos son requeridos'
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