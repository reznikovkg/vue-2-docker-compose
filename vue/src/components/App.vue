<template>
  <div class="app">
    <h1 class="header">Tower Defense</h1>
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

<style lang="less">
@import '@/less/const.less';
.app {
  text-align: center;
  font-family: @font-family;
}
.header {
  font-size: @font-size-heading;
  margin: @margin-base;
  font-family: @font-family;
}
</style>