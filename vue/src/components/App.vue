<template>
  <div id="app">
    <SubscriptionBanner>
      <router-view />
    </SubscriptionBanner>
  </div>
</template>

<script>
import SubscriptionBanner from './parts/SubscriptionBanner.vue';

export default {
  components: {
    SubscriptionBanner
  },
  created() {
    let tg = window.Telegram.WebApp;
    tg.disableVerticalSwipes();
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

body {
  margin: 0;
}
</style>
