<template>
  <div
      class="player-ship"
      :style="objectStyle"
  />
</template>

<script>
import GameObject from '@/components/core/GameObject'

export default {
  name: 'PlayerShip',
  extends: GameObject,
}
</script>

<style scoped lang="less">
.player-ship {
  transition: left 0.1s ease-out;
}
</style>
