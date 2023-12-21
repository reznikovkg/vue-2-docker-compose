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

.element {
  padding-top: 60px;
}
.element_first {
  margin-top: 85px;
  margin-left: 20px;
  font-size: 12px;
}

.home {
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: black!important;
    font-weight: 700;
  }
}
</style>