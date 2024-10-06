<template>
  <div class="game-cell">
    <div class="game-cell__body" :class="'game-cell__body--' + getCellTypeName"></div>
  </div>
</template>

<script>
import CellTypeMap from '../../GameEngine/CellTypes'

export default {
  props: {
    cellType: Number,
  },
  computed: {
    getCellTypeName () {
      return CellTypeMap[this.cellType];
    }
  }
};
</script>

<style scoped lang="less">
.game-cell {
  margin: 5px;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  &__body {
    width: 100%;
    height: 100%;
    border-radius: 10%;
    &--air {
      background-color: rgba(255, 255, 255, 0);
    }

    &--blue {
      background-color: rgb(0, 0, 255);
    }

    &--purple {
      background-color: rgb(230, 0, 255);
    }

    &--green {
      background-color: rgb(13, 255, 0);
    }
  }
}
</style>
