<template>
  <div
      class="enemy-ship"
      :style="objectStyle"
  />
</template>

<script>
import GameObject from '@/components/core/GameObject'

export default {
  name: 'EnemyShip',
  extends: GameObject,
  props: {
    health: {
      type: Number,
      default: 2
    }
  },
  computed: {
    objectStyle() {
      return {
        ...this.$options.extends.computed.objectStyle.call(this),
        backgroundColor: this.enemyColor
      }
    },
    enemyColor() {
      switch (this.health) {
        case 1:
          return '#a467d5'
        default:
          return '#781dc6'
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
