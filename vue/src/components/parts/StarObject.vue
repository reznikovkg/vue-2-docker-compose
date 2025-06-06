<template>
  <div
      class="star-object"
      :style="objectStyle"
  />
</template>

<script>
import GameObject from '@/components/core/GameObject'

export default {
  name: 'StarObject',
  extends: GameObject,
}
</script>

<style scoped lang="less">
.star-object {
  border-radius: 50%;
}
</style>
