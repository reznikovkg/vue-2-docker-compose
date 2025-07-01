<template>
  <div id="app">
    <GameController />
  </div>
</template>

<script>
import GameController from './components/GameController.vue';

export default {
  name: 'App',
  components: {
    GameController
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
