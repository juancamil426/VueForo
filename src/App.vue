<template>
  <div id="app">
    <Navegacion></Navegacion>
    <router-view>

    </router-view>  
  </div>
</template>

<script>
import Navegacion from './components/Navegacion.vue'   // Este en la barra de navegacion


export default {
  name: 'App',
  components: {
    Navegacion
  }
}
</script>

<style lang="scss" >
  @import './scss/App.scss';
  @import url("https://fonts.googleapis.com/css?family=Roboto|Material+Icons");
  
</style>
