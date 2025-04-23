<template>
  <div
    class="game-board__cell"
    :class="{
      'game-board__cell--fading': isFading,
      'game-board__cell--appearing': isAppearing
    }"
    :style="{
      backgroundColor: this.color,
      border: isSelected ? '2px solid #000' : 'none',
      transform: `translate(${position.x}px, ${position.y}px)`
    }"
    @click="emitClick"
  />
</template>

<script>
export default {
  props: {
    index: Number,
    color: String,
    isSelected: Boolean,
    isFading: Boolean,
    position: Object,
    isAppearing: Boolean
  },
  methods: {
    emitClick() {
      this.$emit('cell-click', this.index);
    }
  }
};
</script>

<style lang="less" scoped>
.game-board__cell {
  position: absolute;
  width: @cell-size;
  height: @cell-size;
  border-radius: 50%;
  background-color: gray;
  transition:
    transform 0.3s ease,
    border 0.2s ease,
    opacity 0.6s ease,
    scale 0.6s ease;

  &--fading {
    opacity: 0;
    transform: scale(0.2);
  }

  &--appearing {
    transform: scale(0.2);
    opacity: 0;
    animation: appear 0.3s ease forwards;
  }
  @keyframes appear {
    from {
      transform: scale(0.2);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
