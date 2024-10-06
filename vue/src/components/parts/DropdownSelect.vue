<template>
  <div class="dropdown-container">
    <select
      v-model="selectedCellType"
      class="dropdown"
      :disabled="!isActive"
      @change="updateSelectedCells"
    >
      <option v-for="type in cellTypes" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
    <span v-if="isActive" class="dropdown-text">
      {{ displayText }}
    </span>
  </div>
</template>

<script>
import {mapGetters, mapActions } from "vuex";


export default {
  name: "DropdownSelect",
  data() {
    return {
      selectedCellType: null,
    };
  },
  computed: {
    ...mapGetters('game', [
      'getGrid', 'selectedGrid', 'cellTypes'
    ]),
    isActive() {
      return this.selectedCount > 0;
    },
    selectedCount() {
      return this.selectedGrid.flat().filter((cell) => cell).length;
    },
    displayText() {
      const selectedValues = this.selectedGrid
        .flat()
        .map((cell, index) => {
          if (cell) {
            const rowIndex = Math.floor(index / this.selectedGrid[0].length);
            const colIndex = index % this.selectedGrid[0].length;
            return this.getGrid[rowIndex][colIndex];
          }
          return null;
        })
        .filter(Boolean);

      const allSame = selectedValues.every((val) => val === selectedValues[0]);
      return selectedValues.length > 0 && allSame
        ? selectedValues[0]
        : "Разные";
    },
  },
  methods: {
    ...mapActions('game', [
        'toggleSelectedCell', 'updateCell'
    ]),
    updateSelectedCells() {
      this.selectedGrid.forEach((row, rowIndex) => {
        row.forEach((isSelected, colIndex) => {
          if (isSelected) {
            this.updateCell({
              row: rowIndex,
              col: colIndex,
              cellType: this.selectedCellType,
            });
          }
        });
      });
      this.resetSelection();
      this.selectedCellType = "";
    },
    resetSelection() {
      this.selectedGrid.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
          if (this.selectedGrid[rowIndex][colIndex]) {
            this.toggleSelectedCell({ row: rowIndex, col: colIndex });
          }
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
.dropdown-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.dropdown {
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:disabled {
    background-color: #f1f1f1;
    cursor: not-allowed;
  }
  &:hover {
    border-color: #888;
  }
}

.dropdown-text {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
</style>
