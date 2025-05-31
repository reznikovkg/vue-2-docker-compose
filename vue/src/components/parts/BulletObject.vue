<template>
  <GameObject
      :position="position"
      :dimensions="dimensions"
      :color="bulletColor"
      class="bullet-object"
  />
</template>

<script>
import GameObject from '@/components/core/GameObject'

export default {
  name: 'BulletObject',
  components: { GameObject },
  props: {
    position: Object,
    dimensions: Object,
    isEnemy: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    bulletColor() {
      return this.isEnemy ? '#ffc155' : '#ffffff'
    }
  }
}
</script>

<style scoped lang="less">
.bullet-object {
  border-radius: 50%;
}
</style>