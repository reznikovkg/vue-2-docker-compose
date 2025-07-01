<template>
  <div
      class="grid-cell"
      :class="{
        'was-hit': wasHit,
        'was-missed': wasMissed
      }"
      @click="() => $emit('cell-click', index)"
  >
    <div v-if="hasMole" class="mole">🐹</div>
  </div>
</template>

<script>
export default {
  name: 'GridCell',
  props: {
    hasMole: Boolean,
    index: Number,
    wasHit: Boolean,
    wasMissed: Boolean
  },
};
</script>

<style lang="less" scoped>
@import '@/less/const.less';

.grid-cell {
  width: @size-cell;
  height: @size-cell;
  background-color: @color-bg-default;
  border-radius: @border-radius-cell;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: @transition-bg-color, transform 0.1s ease;

  &:hover {
    background-color: @color-bg-hover;
  }

  &:active {
    transform: scale(0.95);
  }

  &--was-hit {
    background-color: @color-hit;
  }

  &--was-missed {
    background-color: @color-missed;
  }

  .mole {
    font-size: @size-mole;
  }
}
</style>