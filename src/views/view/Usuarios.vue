<template>
  <div class="container mt-50" v-if="user.estado == 'online' && user.rol == '2'">
    <div>
      <v-card
        class="mx-auto container mt-50"
        color="#26c6da"
        dark
        max-width="400"
        v-if="dialog ==true"
      >
        <v-card-title>
          <span class="title font-weight-light">Editar usuario</span>
          <hr />
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input class="input" type="text" v-model="userEdit.name" />
            </div>
          </div>

          <div class="field">
            <label class="label">Correo</label>
            <div class="control">
              <input class="input" type="email" v-model="userEdit.email" />
            </div>
          </div>

          <div class="field">
            <label class="label">Rol</label>
            <div class="control">
              <input class="input" type="text" v-model="userEdit.rol" />
            </div>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div id="butt">
              <v-btn @click="actualizacionUsuario">Editar</v-btn>
              <v-btn text @click="cancelar">Cancelar</v-btn>
            </div>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </div>
    <div>
      <v-card v-if="dialog == false">
        <v-card-title>
          Lista de usuarios
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <div class="card">
          <div class="card-body">
            <v-data-table height="300px" :headers="headers" :items="users" :search="search">
              <template v-slot:item.actionOne="{ item }">
                <v-btn @click="editarUsuario(item)" class="btn btn-danger">Editar</v-btn>
              </template>
              <template v-slot:item.actionTwo="{ item }">
                <button @click="deleteUsuario(item)" class="delete is-large">Borrar</button>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-card>
    </div>
    <div class="notification is-danger mt-10" v-if="errorEliminacion">{{errorEliminacion}}</div>
    <div class="container mt-50" v-if="dialog == false">
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <h3 class="title is-3">Agregar nueva cuenta</h3>
          <hr />
          <form action="#" @submit.prevent="crearUsuario">
            <div class="field">
              <label class="label">Nombre</label>
              <div class="control">
                <input class="input" type="text" placeholder="Juan Cubillos" v-model="newUser.name" />
              </div>
            </div>
            <div class="field">
              <label class="label">Correo</label>
              <div class="control">
                <input
                  class="input"
                  type="email"
                  placeholder="juan@correo.com"
                  v-model="newUser.email"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Rol</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Admin: 2  -  User: 1"
                  v-model="newUser.rol"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Contraseña</label>
              <div class="control">
                <input class="input" type="password" placeholder="*****" v-model="newUser.password" />
              </div>
            </div>
            <div>
              <button type="submit" class="button is-primary">Guardar</button>
            </div>
          </form>
          <div class="notification is-danger mt-10" v-if="error">{{ error }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    
  </div>
</template>

<script>
import db from "../../config/firebase";

export default {
  name: "Usuarios",
  data() {
    return {
      dialog: false,
      search: "",
      headers: [
        {
          text: "Nombre",
          align: "left",
          sortable: false,
          value: "Nombre"
        },
        { text: "Correo", value: "Correo" },
        { text: "Rol", value: "Rol" },
        { text: "Publicaciones", value: "Publicaciones" },
        { text: "Editar", value: "actionOne" },
        { text: "Eliminar", value: "actionTwo" }
      ],
      users: [],
      publicacionesTotales: [],
      newUser: {
        name: "",
        email: "",
        password: "",
        rol: "",
        rutaImagen: ""
      },
      userEdit: {
        name: "",
        email: "",
        rol: "",
        id: ""
      },
      error: "",
      errorEliminacion: ""
    };
  },

  methods: {
    crearUsuario() {
      this.error = "";
      this.errorEliminacion = "";
      if (
        this.newUser.name &&
        this.newUser.email &&
        this.newUser.password &&
        this.newUser.rol
      ) {
        this.definirImagen();
        db.collection("usuarios").add({
          Nombre: this.newUser.name,
          Correo: this.newUser.email,
          Contraseña: this.newUser.password,
          Rol: this.newUser.rol,
          Ruta: this.newUser.rutaImagen
        });
        this.newUser.name = "";
        this.newUser.email = "";
        this.newUser.password = "";
        this.newUser.rol = "";
        this.newUser.rutaImagen = "";
        this.llamarUsuarios();
      } else {
        this.error = "Todos los campos son requeridos";
      }
    },
    definirImagen() {
      var numero = Math.floor(Math.random() * (7 - 0 + 1) + 0);
      if (numero < 8) {
        var rutas = this.$store.state.urls;
        this.newUser.rutaImagen = rutas[numero].ruta;
      } else {
        this.newUser.rutaImagen = rutas[0].ruta;
      }
    },
    cancelar() {
      this.userEdit.name = "";
      this.userEdit.email = "";
      this.userEdit.rol = "";
      this.userEdit.id = "";
      this.dialog = false;
    },
    editarUsuario(item) {
      this.errorEliminacion = "";
      db.collection("usuarios")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (item.UsuarioId == `${doc.id}`) {
              this.userEdit.name = doc.data().Nombre;
              this.userEdit.email = doc.data().Correo;
              this.userEdit.rol = doc.data().Rol;
              this.userEdit.id = doc.id;
              this.dialog = true;
            }
          });
        });
    },
    actualizacionUsuario() {
      var userRef = db.collection("usuarios").doc(this.userEdit.id);
      this.dialog = false;
      userRef.update({
        Nombre: this.userEdit.name,
        Correo: this.userEdit.email,
        Rol: this.userEdit.rol
      });
      this.llamarUsuarios();
      this.actualizarPublicaciones(
        this.userEdit.id,
        this.userEdit.name,
        this.userEdit.email
      );
      this.actualizarComentarios(
        this.userEdit.id,
        this.userEdit.name,
        this.userEdit.email
      );
    },
    actualizarPublicaciones(userId, nuevoNombre, nuevoCorreo) {
      db.collection("publicaciones")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (userId == doc.data().UsuarioId) {
              var publiRef = db.collection("publicaciones").doc(`${doc.id}`);
              publiRef.update({
                Mensaje: doc.data().Mensaje,
                UrlImagen: doc.data().UrlImagen,
                UsuarioCorreo: nuevoCorreo,
                UsuarioId: doc.data().UsuarioId,
                UsuarioNombre: nuevoNombre
              });
            }
          });
        });
    },
    actualizarComentarios(userId, nuevoNombre, nuevoCorreo) {
      db.collection("comentarios")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (userId == doc.data().UsuarioId) {
              var comenRef = db.collection("comentarios").doc(`${doc.id}`);
              comenRef.update({
                Mensaje: doc.data().Mensaje,
                UrlImagen: doc.data().UrlImagen,
                PublicacionId: doc.data().PublicacionId,
                UsuarioId: doc.data().UsuarioId,
                UsuarioCorreo: nuevoCorreo,
                UsuarioNombre: nuevoNombre
              });
            }
          });
        });
    },
    deleteUsuario(item) {
      this.errorEliminacion = "";

      if (item.Publicaciones == 0) {
        db.collection("usuarios")
          .doc(item.UsuarioId)
          .delete();
        this.llamarUsuarios();
        alert("Usuario eliminado")
      } else {
        this.errorEliminacion = "No se puede eliminar un usuario que haya realizado una publicacion";
      }
    },
    llamarUsuarios() {
      this.users = [];
      this.llamarPublicaciones();
      db.collection("usuarios")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const useri = {
              Nombre: `${doc.data().Nombre}`,
              Correo: `${doc.data().Correo}`,
              Rol: `${doc.data().Rol}`,
              Ruta: `${doc.data().Ruta}`,
              UsuarioId: `${doc.id}`,
              Publicaciones: this.calcularPubicaciones(`${doc.id}`)
            };
            this.users.push(useri);
          });
        });
    },
    llamarPublicaciones() {
      this.publicacionesTotales = [];
      db.collection("publicaciones")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.publicacionesTotales.push(doc.data());
          });
        });
    },
    calcularPubicaciones(idUser) {
      var cantidad = 0;
      for (var i = 0; i < this.publicacionesTotales.length; i++) {
        if (this.publicacionesTotales[i].UsuarioId == idUser) {
          cantidad++;
        }
      }
      return cantidad;
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.llamarUsuarios();
  }
};
</script>
<style >
</style>