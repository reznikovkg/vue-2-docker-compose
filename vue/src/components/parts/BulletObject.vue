<template>
  <div
      class="bullet-object"
      :style="bulletStyle"
      :class="{ 'enemy-bullet': isEnemy }"
  ></div>
</template>

<script>
export default {
  name: 'BulletObject',
  props: {
    position: {
      type: Object,
      required: true,
      default: () => ({ x: 0, y: 0 })
    },
    size: {
      type: Number,
      default: 8
    },
    isEnemy: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    bulletStyle() {
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
.bullet-object {
  position: absolute;
  background-color: white;
  border-radius: 50%;

  &.enemy-bullet {
    background-color: #ffc155;
  }
}
</style>