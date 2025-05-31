<template>
  <GameObject
      :position="position"
      :dimensions="dimensions"
      :color="asteroidColor"
      class="asteroid-object"
  />
</template>

<script>
import GameObject from '@/components/core/GameObject'

export default {
  name: 'AsteroidObject',
  components: { GameObject },
  props: {
    position: Object,
    dimensions: Object,
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