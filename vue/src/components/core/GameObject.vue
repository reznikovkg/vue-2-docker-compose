<template>
  <div
      class="game-object"
      :style="{
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      backgroundColor: color,
      position: 'absolute'
    }"
      v-on="$listeners"
  ></div>
</template>

<script>
export default {
  name: 'GameObject',
  props: {
    position: {
      type: Object,
      required: true,
      default: () => ({ x: 0, y: 0 })
    },
    dimensions: {
      type: Object,
      default: () => ({ width: 40, height: 40 })
    },
    color: {
      type: String,
      default: '#ffffff'
    }
  },
  computed: {
    objectStyle() {
      return {
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
        width: `${this.dimensions.width}px`,
        height: `${this.dimensions.height}px`,
        backgroundColor: this.color,
        position: 'absolute'
      }
    }
  }
}
</script>

<style scoped lang="less">
.game-object {
  position: absolute;
}
</style>