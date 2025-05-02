<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Главная</router-link> |
      <router-link to="/about">О проекте</router-link>
    </div>
    <router-view/>
    <agreement-modal/>
  </div>
</template>


<script>
import AgreementModal from './parts/AgreementModal.vue'


export default {
  components: {
    AgreementModal
  },
  created() {
    this.$store.dispatch('agreement/initialize')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>