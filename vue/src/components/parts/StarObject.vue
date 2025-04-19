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
    starObjectStyle () {
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
.star-object {
  position: absolute;
  background-color: @cStar;
  border-radius: 50%;
}
</style>