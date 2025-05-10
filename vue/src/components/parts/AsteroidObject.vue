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
    },
    health: {
      type: Number,
      required: true,
      default: 3
    }
  },
  computed: {
    asteroidObjectStyle () {
      let color;
      switch(this.health) {
        case 3:
          color = '#e74c3c';
          break;
        case 2:
          color = '#f36812';
          break;
        case 1:
          color = '#f1880f';
          break;
      }

      return {
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
        width: `${this.size}px`,
        height: `${this.size}px`,
        backgroundColor: color
      }
    }
  }
}
</script>

<style scoped lang="less">
.asteroid-object {
  position: absolute;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}
</style>