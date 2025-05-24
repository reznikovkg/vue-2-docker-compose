<template>
  <div class="game-status">
    Score: {{ score }} | Health: {{ health }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GameStatus',
  computed: {
    ...mapGetters('game', {
      score: 'getScore',
      health: 'getPlayerHealth'
    })
  }
}
</script>

<style scoped lang="less">
.game-status {
  position: absolute;
  top: 10px;
  left: 10px;
  color: @cBaseOne;
  font-size: 24px;
  z-index: 10;
  font-family: @ffOne;
}
</style>