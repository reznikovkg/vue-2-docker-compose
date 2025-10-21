<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#app {
  min-height: 100vh;
  background: @white;
  font-family: Arial, sans-serif;
}
</style>