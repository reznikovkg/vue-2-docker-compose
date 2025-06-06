<template>
  <div
      class="asteroid-object"
      :style="objectStyle"
  />
</template>

<script>
import GameObject from '@/components/core/GameObject'

export default {
  name: 'AsteroidObject',
  extends: GameObject,
  props: {
    health: {
      type: Number,
      default: 3
    }
  },
  computed: {
    asteroidColor() {
      switch(this.health) {
        case 2: return '#f36812'
        case 1: return '#f1880f'
        default: return '#e74c3c'
      }
    },
    objectStyle() {
      return {
        ...this.$options.extends.computed.objectStyle.call(this),
        backgroundColor: this.asteroidColor
      }
    }
  }
}
</script>

<style scoped lang="less">
.asteroid-object {
  border-radius: 50%;
  transition: background-color 0.3s ease;
}
</style>
