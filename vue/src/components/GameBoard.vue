<template>
  <div class="game-board__wrapper">
    <div class="game-board">
      <BoardCell
          v-for="(cell, index) in board"
          :key="index"
          :index="index"
          :color="cell.color"
          :isSelected="isSelected(index)"
          :handleCellClick="handleClick"
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
  },
  methods: {
    ...mapActions("board", ["handleCellClick", "generateBoard"]),
    handleClick(index) {
      this.handleCellClick(index);
    },
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
  display: grid;
  grid-template-columns: repeat(8, @cell-size);
  grid-template-rows: repeat(8, @cell-size);
  gap: @gap-size;
}
</style>
