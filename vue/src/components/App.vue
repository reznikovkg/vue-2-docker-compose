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

<style>
#app {
  text-align: center;
  font-family: Arial, sans-serif;
}
h1 {
  font-size: 28px;
  margin: 16px;
}
</style>