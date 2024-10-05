<template>
  <div class="game-page">
    <h2>Level {{ levelNumber }}</h2>
    <GameGrid />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import GameGrid from "../parts/GameGrid.vue";

export default {
  name: 'GamePage',
  components: {
    GameGrid,
  },
  props: {
    levelNumber: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.loadLevel(this.levelNumber);
  },
  methods: {
    ...mapActions('game', ['loadLevel'])
  }
};
</script>

<style scoped lang="less">
.game-page {
}
</style>
