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
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  computed: {
    asteroidObjectStyle () {
      return {
        left: `${this.x}px`,
        top: `${this.y}px`,
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