<template>
  <span :class="['game__tile', `game__tile--${tile}`]">
    {{ tile > 0 ? tile : '' }}
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
  },
};
</script>

<style lang="less" scoped>
.game__tile {
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  margin: 5px;
  border-radius: 5px;
  color: #3f3b3b;

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