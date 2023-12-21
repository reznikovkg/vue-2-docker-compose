<template>
  <main>
    <div class="container">
      <p class="element_first"><span class="home" style="color: gray;" @click="redirectToHome()">Home</span> <span style="color: gray;">/</span> <span>Cakes</span></p>
      <app-cakes class="element"></app-cakes>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'StorePage',
    methods: {
      redirectToHome() {
        this.$router.push('/');
      },
    }
  }
</script>

<style>
@import "styles/store.less";
</style>