<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Iniciar sesion</h3><hr>
        <form action="#" @submit.prevent="login">    

          <div class="field">
            <label class="label">Correo</label>
            <div class="control">
              <input class="input" type="email" placeholder="juan@correo.com" v-model="datosLoguear.email">
            </div>
          </div>

          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control">
              <input class="input" type="password" placeholder="*****" v-model="datosLoguear.password">
            </div>
          </div>

          <button type="submit" class="button is-primary">Iniciar sesion</button>
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
      datosLoguear: {
        email: '',
        password: '',     
      },
      userLogueado: {
        nombre: '',
        correo: '',
        rol: '',
        id: '',
        rutaImagen: ''
      },
      error: ''  
    }
  },
  name: 'Login',
  methods: {
    login() {
      this.error = ''
      var md5 = require('md5');
      if (this.datosLoguear.email && this.datosLoguear.password) {
        db.collection('usuarios').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

              if(this.datosLoguear.email == `${doc.data().Correo}` && 
                 md5(this.datosLoguear.password) == `${doc.data().Contraseña}`){
                 this.userLogueado.nombre= `${doc.data().Nombre}`,
                 this.userLogueado.correo= `${doc.data().Correo}`,
                 this.userLogueado.rol= `${doc.data().Rol}`,
                 this.userLogueado.rutaImagen= `${doc.data().Ruta}`,
                 this.userLogueado.id = `${doc.id}` ,
                 this.$store.commit('addUser', this.userLogueado),
                 this.$router.push({name: 'foro'})
              }
              else{
                this.error = 'Usuario o contraseña incorrectos'
              }
              
            });
        });
        //firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          //.then(user => {
            //this.$router.push({name: 'dashboard'})
           // console.log(user);
          //}).catch(err => {
          //  this.error = err.message
        //  })
        
        
        
        
      }else {
        this.error = 'Todos los campos son requeridos'
      }
    }
  }
}
</script>


<style lang="scss">

.mt-10 {
  margin-top: 10px;
}
.mt-50 {
  margin-top: 50px;
}
</style>