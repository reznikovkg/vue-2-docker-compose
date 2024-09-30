<script>
import Quiz from './components/Quiz.vue'

export default {
  name: 'App',
  components: {
    Quiz
  }
}
</script>

<template>
 <div id="app">
    <Quiz />
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
