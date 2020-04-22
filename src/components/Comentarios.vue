<template>
<div>
   <article class="media">
      <figure class="media-left">
          <v-img :src="comenta.UrlImagen" height="80" width="80"></v-img> 
      </figure>
      <div class="media-content">
        <div class="content">
          <strong> {{ comenta.UsuarioNombre }} </strong>
            <br />
            <strong> {{ comenta.UsuarioCorreo }} </strong>
            <br /> {{ comenta.Mensaje }}
        </div>
      </div>
      <div class="media-right">   
        <button @click="deleteComentario(comenta)" class="delete is-large">Borrar Comentario</button>
      </div>
      
    </article>
    <div class="notification is-danger mt-10" v-if="errorEliminacion">{{errorEliminacion}}</div>
</div>
</template>
<script>
import db from "../config/firebase";

export default {
  props: {
    comenta: {
      type: Object
    },
    userLogeado: {
      type: Object
    }
  },
  data() {
    return {
      errorEliminacion: ''
    };
  },
  methods: {
    deleteComentario(item) {
        this.errorEliminacion = "";
        if (item.UsuarioId == this.userLogeado.usuarioId) {
          db.collection("comentarios")
            .doc(item.ComentarioId)
            .delete();
        } else {
          this.errorEliminacion = "No se puede eliminar un comentario que no sea de su propiedad";
        }
    }
  },
}
</script>

