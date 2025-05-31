<template>
  <GameObject
      :position="position"
      :dimensions="dimensions"
      :color="enemyColor"
      class="enemy-ship"
  />
</template>

<script>
import GameObject from '@/components/core/GameObject'

export default {
  name: 'EnemyShip',
  components: { GameObject },
  props: {
    position: Object,
    dimensions: Object,
    health: {
      type: Number,
      default: 2
    }
  },
  computed: {
    enemyColor() {
      switch(this.health) {
        case 1: return '#a467d5'
        default: return '#781dc6'
      }
    }
  }
}
</script>

<style scoped lang="less">
.enemy-ship {
  transition: left 0.1s ease-out;
}
</style>