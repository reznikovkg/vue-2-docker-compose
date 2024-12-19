<template>
  <div class="matrix-dimension">
    <div class="matrix-dimension__control">
      <div div class="matrix-dimension__text">Строки:</div>
      <button class="matrix-dimension__control__button" @click="decreaseRows">
        -
      </button>
      <input
        class="matrix-dimension__control__input"
        type="number"
        v-model="gridRows"
        readonly
      />
      <button class="matrix-dimension__control__button" @click="increaseRows">+</button>
    </div>

    <div class="matrix-dimension__control">
      <div div class="matrix-dimension__text">Столбцы:</div>
      <button class="matrix-dimension__control__button" @click="decreaseCols">
        -
      </button>
      <input
        class="matrix-dimension__control__input"
        type="number"
        v-model="gridColumns"
        readonly
      />
      <button class="matrix-dimension__control__button" @click="increaseCols">+</button>
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
@import "../../assets/styles/variables.less";

.matrix-dimension {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__text {
      font-family: "Babayka", sans-serif;
      font-size: 26px;
      flex: 1;
      text-align: center
    }

  &__control {
    display: flex;
    align-items: center;
    gap: 10px;

    &__button {
      width: 30px;
      height: 30px;
      font-size: 20px;
      text-align: center;
      font-family: "Adigiana Ultra", sans-serif;
      background-color: var(--button-background-color);
      color: var(--button-text-color);
      border: none;
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.3s ease;
      z-index: 1;
      &:hover {
        opacity: 0.8;
      }
    }

    &__input {
      width: 50px;
      height: 24px;
      font-size: 20px;
      text-align: center;
      font-family: "Babayka", sans-serif;
    }
  }
}

@media (max-width: 480px) {
  .matrix-dimension{
    margin: 1vh;
    * {
      font-size: 2vh;
      height: 2vh;
    }
  }
}

</style>