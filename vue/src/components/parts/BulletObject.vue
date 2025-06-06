<template>
  <div
      class="bullet-object"
      :style="objectStyle"
  />
</template>

<script>
import GameObject from '@/components/core/GameObject'

export default {
  name: 'BulletObject',
  extends: GameObject,
  props: {
    isEnemy: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    objectStyle() {
      return {
        ...this.$options.extends.computed.objectStyle.call(this),
        backgroundColor: this.isEnemy ? '#ffc155' : '#ffffff'
      }
    }
  }
}
</script>

<style scoped lang="less">
.bullet-object {
  border-radius: 50%;
}
</style>
