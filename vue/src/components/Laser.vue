<template>
  <svg class="laser">
    <line 
      class="laser__line"
      :x1="start.x"
      :y1="start.y"
      :x2="end.x"
      :y2="end.y"
      stroke="#ff5722"
      stroke-width="2"
    />
  </svg>
</template>

<script>
export default {
  name: 'Laser',
  props: {
    start: {
      type: Object,
      required: true
    },
    end: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less">
.laser {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;

  &__line {
    stroke-opacity: 0.8;
  }
}
</style>