<template>
  <div 
    class="foe"
    :class="{ 'foe--selected': selected }"
    :style="{
      left: `${position.x - 10}px`,
      top: `${position.y - 10}px`,
      'background-color': `hsl(${health * 1.2}, 70%, 50%)`
    }"
    @click="handleClick"
  >
    <div class="foe__health-bar" :style="{ width: `${health}%` }"></div>
  </div>
</template>

<script>
export default {
  name: 'Foe',
  props: {
    position: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    health: {
      type: Number,
      default: 100
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less">
.foe {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 20;
  transition: transform 0.2s;

  &--selected {
    transform: scale(1.3);
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.7);
  }

  &__health-bar {
    position: absolute;
    top: -5px;
    left: 0;
    height: 2px;
    background-color: #4caf50;
  }
}
</style>