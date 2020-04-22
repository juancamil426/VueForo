<template>
  <div class="container mt-50" v-if="user.estado == 'online'">
    <article class="media">
      <figure class="media-left">
        <v-img :src="datosPublicacion.urlImagen" height="80" width="80"></v-img>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea
              class="textarea"
              placeholder="Escribir publicacion..."
              v-model="datosPublicacion.mensaje"
            ></textarea>
          </p>
        </div>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <button @click="publicar()" class="button is-primary">Publicar</button>
            </div>
          </div>
        </nav>
        <div class="notification is-danger mt-10" v-if="error">          
          {{error}}
        </div>
      </div>
    </article>
  </div>
  <div v-else>
    
  </div>
</template>

<script>

import db from '../../config/firebase'

export default {
  name: "publicar",
  data() {
    return {
      datosPublicacion: {
        mensaje: "",
        usuarioCorreo: "",
        usuarioId: "",
        usuarioNombre: "",
        urlImagen: "",
        estado: ""
      },
      error: ''
    };
  },
  methods: {
    publicar() {
      this.error = ''
      if (this.datosPublicacion.mensaje) {
        db.collection('publicaciones').add({
          Mensaje: this.datosPublicacion.mensaje,
          UsuarioCorreo : this.datosPublicacion.usuarioCorreo,
          UsuarioId: this.datosPublicacion.usuarioId,
          UsuarioNombre: this.datosPublicacion.usuarioNombre,
          UrlImagen: this.datosPublicacion.urlImagen,
        })
        this.datosPublicacion.mensaje = ''
        this.$router.push({name: 'foro'}) 
      }else {
        this.error = 'Es necesario que redacte algo.'
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    var usuario = this.$store.state.user;
    if (usuario.correo != "") {
      this.datosPublicacion.usuarioCorreo = usuario.correo;
      this.datosPublicacion.usuarioId = usuario.id;
      this.datosPublicacion.usuarioNombre = usuario.nombre;
      this.datosPublicacion.urlImagen = usuario.rutaImagen;
      this.datosPublicacion.estado = usuario.estado;
    }
  }
};
</script>