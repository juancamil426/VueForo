import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        urls: [
            {ruta: "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg"},
            {ruta: "https://images.dog.ceo/breeds/shiba/shiba-13.jpg"},
            {ruta: "https://images.dog.ceo/breeds/boxer/n02108089_14112.jpg"},
            {ruta: "https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg"},
            {ruta: "https://images.dog.ceo/breeds/doberman/n02107142_4653.jpg"},
            {ruta: "https://images.dog.ceo/breeds/malamute/n02110063_1104.jpg"},
            {ruta: "https://images.dog.ceo/breeds/pug/n02110958_15626.jpg"},
            {ruta: "https://images.dog.ceo/breeds/samoyed/n02111889_4470.jpg"}
        ],
        user: {
            nombre: '',
            correo: '',
            rol: '',
            id: '',
            rutaImagen: '',
            estado: 'offline'
        }
    },
    mutations: {
        addUser(state, user) {
            state.user.nombre= user.nombre,
            state.user.correo= user.correo,
            state.user.rol= user.rol,
            state.user.id= user.id,
            state.user.rutaImagen= user.rutaImagen,
            state.user.estado= 'online'
        },
        exitUser(state){
            state.user.nombre= '',
            state.user.correo= '',
            state.user.rol= '',
            state.user.id= '',
            state.user.rutaImagen= '',
            state.user.estado= 'offline'
        }
    },
    actions: {
        addUser({ commit }, user){
            commit("addUser", user);
        },
        exitUser({ commit }){
            commit("exitUser");
        }
    }
})