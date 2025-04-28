<template>
  <div class="game-board__wrapper">
    <div class="game-board">
      <BoardCell
        v-for="(cell, index) in board"
        :key="index"
        :index="index"
        :color="cell.color"
        :isSelected="selectedIndexes.has(index)"
        :isFading="cell.isFading"
        :position="getCellPosition(index)"
        :isAppearing="cell.isAppearing"
        @cell-click="() => handleClick(index)"
        @transition-end="() => handleTransitionEnd(index)"
        @animation-end="() => handleAnimationEnd(index)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BoardCell from "./BoardCell.vue";

export default {
  components: { BoardCell },
  computed: {
    ...mapGetters("board", [
      "board",
      "boardSize",
      "cellSize",
      "gapSize",
      "isSelected",
    ]),
    selectedIndexes() {
      return new Set([this.$store.state.board.selectedCell]);
    }
  },
  methods: {
    ...mapActions("board", ["handleCellClick", "generateBoard", "notifyTransitionEnd", "notifyAnimationEnd"]),
    handleClick(index) {
      this.handleCellClick(index);
    },
    getCellPosition(index) {
      const row = Math.floor(index / this.boardSize);
      const col = index % this.boardSize;
      const x = col * (this.cellSize + this.gapSize);
      const y = row * (this.cellSize + this.gapSize);
      return { x, y };
    },
    handleTransitionEnd(index) {
      this.notifyTransitionEnd(index);
    },
    handleAnimationEnd(index) {
      this.notifyAnimationEnd(index);
    }
  },
  created() {
    this.generateBoard();
  },
};
</script>

<style lang="less" scoped>
.game-board__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.game-board {
  position: relative;
  width: calc((@cell-size + @gap-size) * 8 - @gap-size);
  height: calc((@cell-size + @gap-size) * 8 - @gap-size);
}
</style>
