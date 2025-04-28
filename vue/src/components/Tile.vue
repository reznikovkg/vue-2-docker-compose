<template>
  <span
      class="game__tile"
      :class="tileClass"
  >
    {{ formattedValue }}
  </span>
</template>

<script>
export default {
  name: 'GameTile',
  props: {
    tile: {
      type: Number,
      required: true,
    },
    formattedValue: {
      type: String,
      required: true,
    },
  },
  computed: {
    tileClass() {
      if (this.tile === 0) {
        return 'game__tile--0';
      }
      let baseValue = this.tile;
      while (baseValue >= 2048) {
        baseValue /= 1024;
      }
      const powersOfTwo = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
      const closestPowerOfTwo = powersOfTwo.find((power) => power >= baseValue) || 2048;
      return `game__tile--${closestPowerOfTwo}`;
    },
  },
};
</script>

<style lang="less" scoped>
.game__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cecdcd;
  border-radius: 5px;
  aspect-ratio: 1;
  font-weight: bold;
  transition: transform 0.1s ease, background-color 0.3s ease;
  text-align: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 14px;


  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 400px) {
    font-size: clamp(10px, 3vw, 18px);
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
</style>
