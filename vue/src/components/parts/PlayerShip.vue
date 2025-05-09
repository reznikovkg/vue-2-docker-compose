<template>
  <div
      class="player-ship"
      :style="playerStyle"
      @mousedown="(e) => handleMouseDown(e)"
  ></div>
</template>

<script>
export default {
  name: 'PlayerShip',
  props: {
    position: {  // Вместо отдельных x, y
      type: Object,
      required: true,
      default: () => ({ x: 0, y: 0 })
    },
    dimensions: {  // Вместо отдельных width, height
      type: Object,
      required: true,
      default: () => ({ width: 40, height: 40 })
    }
  },
  computed: {
    playerStyle () {
      return {
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
        width: `${this.dimensions.width}px`,
        height: `${this.dimensions.height}px`
      }
    }
  },
  methods: {
    handleMouseDown (e) {
      this.$emit('move', e.clientX > this.x ? 1 : -1)
    }
  }
}
</script>

<style scoped lang="less">
.player-ship {
  position: absolute;
  background-color: @cPlayerShip;
  transition: left 0.1s ease-out;
}
</style>