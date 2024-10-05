<template>
  <div class="game-page">
    <h2>Level {{ levelNumber }}</h2>
    <GameGrid />
  </div>
</template>

<script>
import GameGrid from "../parts/GameGrid.vue";

export default {
  name: 'GamePage',
  components: {
    GameGrid,
  },
  props: {
    levelNumber: {
      type: Number,
      required: false,
    },
  }
};
</script>

<style scoped lang="less">
.game-page {
}
</style>
