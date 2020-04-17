import vue from 'vue';
import Vuetify from 'vuetify';
import "vuetify/dist/vuetify.min.css";

vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    }
});