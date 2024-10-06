<template>
  <div class="editor_grid">
    <div
      class="editor-grid__row"
      v-for="(row, rowIndex) in getGrid"
      :key="rowIndex"
    >
      <EditorCellWrapper
        v-for="(cell, cellIndex) in row"
        :key="`${rowIndex}-${cellIndex}`"
        :isSelected="selectedGrid[rowIndex][cellIndex]"
        @onClick="() => handleCellClick(rowIndex, cellIndex)"
      >
        <GameCell :cellType="cell" />
      </EditorCellWrapper>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GameCell from "./GameCell.vue";
import EditorCellWrapper from "./EditorCellWrapper.vue";

export default {
  name: "EditorGrid",
  components: {
    GameCell,
    EditorCellWrapper,
  },
  computed: {
    ...mapGetters('game', [
      'getGrid', 'selectedGrid'
    ]),
  },
  methods: {
    ...mapActions('game', [
        'toggleSelectedCell',
    ]),
    handleCellClick(row, col) {
      this.toggleSelectedCell({row, col});
    },
  },
};
</script>

<style scoped lang="less">
.editor-grid {
  display: flex;
  flex-direction: column;

  &__row {
    display: flex;
  }
}
</style>
