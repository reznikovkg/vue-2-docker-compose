<template>
  <div class="game-grid__wrapper">
    <div class="game-grid" :style="gridStyle">
      <div
        v-for="(row, rowIndex) in getGrid"
        :key="rowIndex"
        class="game-grid__row"
      >
        <GameCell
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          :cellType="cell"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GameCell from "./GameCell.vue";

export default {
  components: {
    GameCell,
  },
  data() {
    return {
      scale: 1,
    };
  },
  computed: {
    ...mapGetters("game", ["getGrid"]),
    gridStyle() {
      console.log(this.scale);
      return {
        transform: `scale(${this.scale})`,
      };
    },
  },
  mounted() {
    this.initializeScale();
    window.addEventListener("resize", this.calculateScale);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calculateScale);
  },
  methods: {
    initializeScale() {
      requestAnimationFrame(() => {
        this.calculateScale();
      });
    },
    calculateScale() {
      const gridElement = this.$el.querySelector(".game-grid");
      const parentElement = this.$el.parentElement;

      if (gridElement && parentElement) {
        const gridWidth = gridElement.offsetWidth;
        const gridHeight = gridElement.offsetHeight;
        const parentWidth = parentElement.clientWidth;
        const parentHeight = parentElement.clientHeight;

        const scaleX = parentWidth / gridWidth;
        const scaleY = (parentHeight / gridHeight) * 0.7;

        this.scale = Math.min(scaleX, scaleY, 1);
      }
    },
  },
};
</script>

<style scoped lang="less">
.game-grid__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.game-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-origin: top center;
  margin: auto;
  margin-top: 0;
  transition: transform 0.2s ease-in-out;

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  &__row {
    display: flex;
  }
}
</style>
