<template>
  <svg class="area">
    <polygon 
      class="area__polygon"
      :points="polygonPoints"
      fill="#a5d6a7"
      fill-opacity="0.3"
      stroke="#81c784"
      stroke-width="2"
    />
  </svg>
</template>

<script>
export default {
  name: 'Area',
  props: {
    points: {
      type: Array,
      required: true
    }
  },
  computed: {
    polygonPoints() {
      return this.points.map(point => `${point.x},${point.y}`).join(' ')
    }
  }
}
</script>

<style lang="less">
.area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &__polygon {
    pointer-events: visible;
  }
}
</style>