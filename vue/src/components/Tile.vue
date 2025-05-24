<template>
  <div
      class="game__tile"
      :class="tileClass"
      :style="tileStyle"
  >
  {{ formattedValue }}
  </div>
</template>

<script>
export default {
  name: 'GameTile',
  props: {
    tile: {
      type: Number,
      required: true
    },
    formattedValue: {
      type: String,
      required: true
    },
    isFrozen: {
      type: Boolean,
      default: false
    },
    position: {
      type: Object,
      required: true
    },
    moveFrom: {
      type: Object,
      default: null
    },
  },
  computed: {
    tileClass() {
      if (this.tile === 0) return 'game__tile--0';
      let baseValue = this.tile;
      while (baseValue > 2048) baseValue /= 1024;

      const powersOfTwo = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
      const closestPowerOfTwo = powersOfTwo.find(power => power >= baseValue) || 2048;

      const classes = [`game__tile--${closestPowerOfTwo}`];
      if (this.isFrozen) classes.push('game__tile--frozen');
      if (this.moveFrom) classes.push('game__tile--moving');
      return classes.join(' ');
    },
    tileStyle() {
      const gridSize = this.$store.getters['game/getGridSize'];
      const cellSize = 100 / gridSize;

      return {
        position: 'absolute',
        left: `${this.position.x * cellSize}%`,
        top: `${this.position.y * cellSize}%`,
        width: `${cellSize - 2}%`,
        height: `${cellSize - 2}%`,
        fontSize: `${Math.max(14, cellSize * 0.7)}px`,
        transition: this.moveFrom ? 'transform 0.15s ease-out' : 'none',
        zIndex: this.moveFrom ? 10 : 'auto'
      };
    }
  }
};
</script>

<style lang="less" scoped>
.game__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  aspect-ratio: 1;
  font-weight: bold;
  text-align: center;
  box-sizing: border-box;
  will-change: transform;

  &--moving {
    transition: transform 0.1s ease-out;
  }

  @media (max-width: 400px) {
    font-size: clamp(10px, 3vw, 18px);
  }
  @keyframes appear {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  &--0 {
    background-color: #cec0b3;
  }

  &--2 {
    background-color: #eee4da;
  }

  &--4 {
    background-color: #ece0ca;
  }

  &--8 {
    background-color: #f3b07a;
  }

  &--16 {
    background-color: #f59462;
  }

  &--32 {
    background-color: #f57b5f;
  }

  &--64 {
    background-color: #f55d3b;
  }

  &--128 {
    background-color: #eccd71;
  }

  &--256 {
    background-color: #eccb61;
  }

  &--512 {
    background-color: #edc53f;
  }

  &--1024 {
    background-color: #edc52f;
  }

  &--2048 {
    background-color: #edc12e;
  }

  &--default {
    background-color: #3c3a32;
  }
}
.game__tile--frozen {
  background-color: rgba(173, 216, 230, 0.7); /* Light blue with transparency */
  box-shadow: inset 0 0 10px rgba(0, 128, 255, 0.5); /* Icy glow effect */
}
</style>
