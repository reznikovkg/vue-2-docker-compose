<template>
  <div class="grid-dimension">
    <div class="grid-dimension__control">
      <label>Rows:</label>
      <button class="grid-dimension__control__button" @click="decreaseRows">
        -
      </button>
      <input
        class="grid-dimension__control__input"
        type="number"
        v-model="gridRows"
        readonly
      />
      <button @click="increaseRows">+</button>
    </div>

    <div class="grid-dimension__control">
      <label>Columns:</label>
      <button class="grid-dimension__control__button" @click="decreaseCols">
        -
      </button>
      <input
        class="grid-dimension__control__input"
        type="number"
        v-model="gridColumns"
        readonly
      />
      <button @click="increaseCols">+</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "GridDimention",
  data() {
    return {
      minRows: 5,
      maxRows: 15,
      minCols: 5,
      maxCols: 20,
    };
  },
  computed: {
    ...mapGetters("game", ["gridRows", "gridColumns"]),
  },
  methods: {
    ...mapActions("game", ["setGridSize"]),

    increaseRows() {
      if (this.gridRows < this.maxRows) {
        this.setGridSize({
          rows: this.gridRows + 1,
          columns: this.gridColumns,
        });
      }
    },

    decreaseRows() {
      if (this.gridRows > this.minRows) {
        this.setGridSize({
          rows: this.gridRows - 1,
          columns: this.gridColumns,
        });
      }
    },

    increaseCols() {
      if (this.gridColumns < this.maxCols) {
        this.setGridSize({
          rows: this.gridRows,
          columns: this.gridColumns + 1,
        });
      }
    },

    decreaseCols() {
      if (this.gridColumns > this.minCols) {
        this.setGridSize({
          rows: this.gridRows,
          columns: this.gridColumns - 1,
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.matrix-dimension {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__control {
    display: flex;
    align-items: center;
    gap: 10px;

    &__button {
      width: 30px;
      height: 30px;
      text-align: center;
    }

    &__input {
      width: 50px;
      text-align: center;
    }
  }
}
</style>
