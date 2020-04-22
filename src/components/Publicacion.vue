<template>
  <v-card class="mx-auto container" max-width=100%>
  <div>
    <article class="media">
      <figure class="media-left">
          <v-img :src="publi.UrlImagen" height="80" width="80"></v-img>
      </figure>
      <div class="media-content">
        <div class="content">
            <strong> {{ publi.UsuarioNombre }} </strong>
            <br />
            <strong> {{ publi.UsuarioCorreo }} </strong>
            <br /> {{ publi.Mensaje }}
         
        </div>
        <div class="notification is-danger mt-10" v-if="errorEliminacion">{{errorEliminacion}}</div>
          
        <div v-for="indiv in publi.ComentarioUnitarios" :key="indiv.ComentarioId"> <!-- la key es el identificar dentro del arreglo-->
          <comentarios :comenta="indiv" :userLogeado="datosPublicacion"></comentarios> <!-- dentro de la clase Dog.vue en el export dentro de props esta el dog, y pet es el iterador de la linea de codigo anterior-->
          <br/>
        </div>
        
      </div>
      <div class="media-right">   
        <button @click="deletepublicacion(publi)" class="delete is-large">Borrar Publicacion</button>
      </div>
    </article>
    
    <article class="media">
      <figure class="media-left">
          <v-img :src="datosPublicacion.urlImagen" height="44" width="44"></v-img>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea class="textarea" v-model="datosPublicacion.mensaje" placeholder="Añadir comentario"></textarea>
          </p>
        </div>
        <div class="notification is-danger mt-10" v-if="error">          
         {{error}}
        </div>
        <div class="field">
          <p class="control">
            <button @click="comentar()" class="button is-primary">Comentar</button>
          </p>
        </div>
      </div>
    </article>
  </div>

  </v-card>
  
</template>
<script>
import Comentarios from "./Comentarios.vue"
import db from '../config/firebase'

export default {
  props: {
    publi: {
      type: Object
    }
  },
  components:{
    comentarios: Comentarios
  },
  data() {
    return {
      datosPublicacion: {
        mensaje: "",
        usuarioCorreo: "",
        usuarioId: "",
        usuarioNombre: "",
        urlImagen: "",
        estado: "",
        publicacionId: ""
      },
      error: '',
      errorEliminacion:''
    };
  },
  methods: {
    comentar() {
      this.error = ''
      if (this.datosPublicacion.mensaje) {
        db.collection('comentarios').add({
          Mensaje: this.datosPublicacion.mensaje,
          UsuarioCorreo : this.datosPublicacion.usuarioCorreo,
          UsuarioId: this.datosPublicacion.usuarioId,
          UsuarioNombre: this.datosPublicacion.usuarioNombre,
          UrlImagen: this.datosPublicacion.urlImagen,
          PublicacionId: this.datosPublicacion.publicacionId
        })
        this.datosPublicacion.mensaje = ''
      }else {
        this.error = 'Es necesario que redacte algo.'
      }
    },
    deletepublicacion(item) {
        this.errorEliminacion = "";
        if (item.UsuarioId == this.datosPublicacion.usuarioId) {
          if(this.publi.ComentarioUnitarios == 0){
              db.collection("publicaciones")
            .doc(item.PublicacionId)
            .delete();
          }
          else{
            this.errorEliminacion = "No se puede eliminar una publicacion con comentarios";
          }
        } else {
          this.errorEliminacion = "No se puede eliminar una publicacion que no sea de su propiedad";
        }
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
      this.datosPublicacion.publicacionId = this.publi.PublicacionId;
    }
  }
};
</script>