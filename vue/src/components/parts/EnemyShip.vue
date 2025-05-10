<template>
  <div
      class="enemy-ship"
      :style="enemyStyle"
  ></div>
</template>

<script>
export default {
  name: 'EnemyShip',
  props: {
    position: {
      type: Object,
      required: true,
      default: () => ({ x: 0, y: 0 })
    },
    dimensions: {
      type: Object,
      required: true,
      default: () => ({ width: 40, height: 40 })
    },
    health: {
      type: Number,
      required: true
    }
  },
  computed: {
    enemyStyle() {
      return {
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
        width: `${this.dimensions.width}px`,
        height: `${this.dimensions.height}px`,
        backgroundColor: this.health > 1 ? '#781dc6' : '#a467d5'
      }
    }
  }
}
</script>

<style scoped lang="less">
.enemy-ship {
  position: absolute;
  transition: left 0.1s ease-out;
}
</style>