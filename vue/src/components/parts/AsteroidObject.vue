<template>
  <div
      class="asteroid-object"
      :style="asteroidObjectStyle"
  ></div>
</template>

<script>
export default {
  name: 'AsteroidObject',
  props: {
    position: {
      type: Object,
      required: true,
      default: () => ({ x: 0, y: 0 })
    },
    size: {
      type: Number,
      required: true
    }
  },
  computed: {
    asteroidObjectStyle () {
      return {
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    }
  }
}
</script>

<style scoped lang="less">
.asteroid-object {
  position: absolute;
  background-color: @cAsteroid;
  border-radius: 50%;
}
</style>