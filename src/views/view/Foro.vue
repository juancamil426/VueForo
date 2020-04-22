<template>
  <div class="container mt-50" v-if="user.estado == 'online'">
        <div v-for="publica in publicaciones" :key="publica.PublicacionId"> <!-- la key es el identificar dentro del arreglo-->
          <publicacion :publi="publica"></publicacion> <!-- dentro de la clase Dog.vue en el export dentro de props esta el dog, y pet es el iterador de la linea de codigo anterior-->
          <br/>
        </div>
  </div>
  <div v-else>
    
  </div>
</template>


<script>
import Publicacion from "../../components/Publicacion.vue";
import db from "../../config/firebase";

export default {
  name: "foro",
  data() {
    return {
      publicaciones: [],
      comentariosTotales: []
    }
  },
  components: {
    publicacion: Publicacion
  },
  methods: {
    llamarPublicaciones() {
      this.publicaciones = [];
      db.collection("publicaciones")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const publisi = {
                Mensaje: `${doc.data().Mensaje}`,
                UrlImagen: `${doc.data().UrlImagen}`,
                UsuarioCorreo: `${doc.data().UsuarioCorreo}`,
                UsuarioId: `${doc.data().UsuarioId}`,
                UsuarioNombre: `${doc.data().UsuarioNombre}`,
                PublicacionId: `${doc.id}`,
                ComentarioUnitarios: this.calcularComentarios(`${doc.id}`)
            }
            this.publicaciones.push(publisi);
          });
        });
    },
    llamarComentarios(){
      this.comentariosTotales = [];
      db.collection("comentarios")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const publisi = {
                Mensaje: `${doc.data().Mensaje}`,
                PublicacionId: `${doc.data().PublicacionId}`,
                UrlImagen: `${doc.data().UrlImagen}`,
                UsuarioCorreo: `${doc.data().UsuarioCorreo}`,
                UsuarioId: `${doc.data().UsuarioId}`,
                UsuarioNombre: `${doc.data().UsuarioNombre}`,
                ComentarioId: `${doc.id}`
            }
            this.comentariosTotales.push(publisi);
          });
        });
    },
    calcularComentarios(idPublicacion){
      var auxiliar=[];
      for(var i=0; i<this.comentariosTotales.length;i++){
        if(this.comentariosTotales[i].PublicacionId == idPublicacion){
          auxiliar.push(this.comentariosTotales[i])
        }
      }
      return auxiliar;
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.llamarComentarios();
    this.llamarPublicaciones();
  }
};
</script>