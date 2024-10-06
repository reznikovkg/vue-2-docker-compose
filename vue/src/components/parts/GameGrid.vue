<template>
  <div class="game-grid">
    <div v-for="(row, rowIndex) in getGrid" :key="rowIndex" class="game-grid__row">
      <GameCell
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        :cellType="cell"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GameCell from "./GameCell.vue";

export default {
  components: {
    GameCell,
  },
  computed: {
    ...mapGetters('game', [
      'getGrid'
    ]),
  }
};
</script>

<style scoped lang="less">
.game-grid {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__row {
    display: flex;
  }
}
</style>
