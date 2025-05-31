<template>
  <div
      class="star-object"
      :style="objectStyle"
      v-on="$listeners"
  />
</template>

<script>
import GameObject from '@/components/core/GameObject'

export default {
  name: 'StarObject',
  extends: GameObject,
  data() {
    return {
      dimensions: { width: 20, height: 20 },
      color: '#ffda00'
    }
  }
}
</script>

<style scoped lang="less">
.star-object {
  border-radius: 50%;
}
</style>