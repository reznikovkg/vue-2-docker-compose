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
  data() {
    return {
      color: '#3498db',
      dimensions: { width: 40, height: 40 }
    }
  }
}
</script>

<style scoped lang="less">
.player-ship {
  transition: left 0.1s ease-out;
}
</style>
