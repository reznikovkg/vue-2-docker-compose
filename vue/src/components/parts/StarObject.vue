<template>
  <div
      class="star-object"
      :style="starObjectStyle"
  ></div>
</template>

<script>
export default {
  name: 'StarObject',
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
    starObjectStyle () {
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
.star-object {
  position: absolute;
  background-color: @cStar;
  border-radius: 50%;
}
</style>