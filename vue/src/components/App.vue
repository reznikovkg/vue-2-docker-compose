<template>
  <div class="app">
    <GameBoard ref="gameBoard" />
    <ModalContainer />
  </div>
</template>

<script>
import GameBoard from '@/components/GameBoard.vue'
import ModalContainer from '@/components/parts/ModalContainer.vue'

export default {
  name: 'App',
  components: {
    GameBoard,
    ModalContainer
  }
}
</script>

<style scoped lang="less">
.app {
  height: 100vh;
  overflow: hidden;
  background-color: @cGameBackground;
}
</style>