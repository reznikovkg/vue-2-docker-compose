<template>
  <div class="game-controls">
    <button
        class="game-controls__button game-controls__button--left"
        @mousedown="$emit('move-left')"
        @mouseup="$emit('stop-move')"
        @mouseleave="$emit('stop-move')"
    >←</button>
    <button
        class="game-controls__button game-controls__button--right"
        @mousedown="$emit('move-right')"
        @mouseup="$emit('stop-move')"
        @mouseleave="$emit('stop-move')"
    >→</button>
  </div>
</template>

<script>
export default {
  name: 'GameControls',
  emits: ['move-left', 'move-right', 'stop-move']
}
</script>

<style scoped lang="less">
.game-controls {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;

  &__button {
    background-color: @cBaseThree;
    color: @cBaseOne;
    border: none;
    padding: 15px 25px;
    font-size: 20px;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;
  }
}
</style>