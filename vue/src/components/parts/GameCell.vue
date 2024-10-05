<template>
  <div class="game-cell">
    <div class="game-cell__body" :class="'game-cell__body--' + cellType"></div>
  </div>
</template>

<script>
export default {
  props: {
    cellType: Number,
  },
};
</script>

<style scoped lang="less">
.game-cell {
  margin: 5px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  &__body {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    &--1 {
      background-color: rgba(255, 255, 255, 0);
    }

    &--2 {
      background-color: rgb(0, 0, 255);
    }

    &--3 {
      background-color: rgb(230, 0, 255);
    }

    &--4 {
      background-color: rgb(13, 255, 0);
    }
  }
}
</style>
