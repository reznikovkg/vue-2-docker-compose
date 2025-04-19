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
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  computed: {
    playerStyle () {
      return {
        left: `${this.x}px`,
        top: `${this.y}px`,
        width: `${this.width}px`,
        height: `${this.height}px`
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