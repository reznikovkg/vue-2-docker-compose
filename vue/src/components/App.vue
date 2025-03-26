<template>
  <div id="app">
    <h1>Tower Defense</h1>
    <GameMap />
  </div>
</template>

<script>
import GameMap from "@/components/GameMap.vue";

export default {
  components: {
    GameMap
  }
};
</script>

<style lang="less" scoped>
  @import '@/less/styles.less';
</style>