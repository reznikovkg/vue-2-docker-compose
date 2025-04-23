<template>
  <div class="game-board__wrapper">
    <div class="game-board">
      <BoardCell
        v-for="(cell, index) in board"
        :key="index"
        :index="index"
        :color="cell.color"
        :isSelected="isSelected(index)"
        :isFading="cell.isFading"
        :position="getCellPosition(index)"
        :isAppearing="cell.isAppearing"
        @cell-click="handleClick"
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
    ...mapGetters("board", ["isSelected"]),
    board() {
      return this.$store.state.board.board;
    },
    boardSize() {
      return this.$store.state.board.boardSize;
    },
    cellSize() {
      return parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--cell-size') || '60', 10);
    },
    gapSize() {
      return parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--gap-size') || '4', 10);
    }
  },
  methods: {
    ...mapActions("board", ["handleCellClick", "generateBoard"]),
    handleClick(index) {
      this.handleCellClick(index);
    },
    getCellPosition(index) {
      const row = Math.floor(index / this.boardSize);
      const col = index % this.boardSize;
      const x = col * (this.cellSize + this.gapSize);
      const y = row * (this.cellSize + this.gapSize);
      return { x, y };
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
