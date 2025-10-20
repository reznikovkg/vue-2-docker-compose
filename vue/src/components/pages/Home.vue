<template>
  <div class="game">
    <GameStatus />
    <GameField />
  </div>
</template>

<script>
import GameField from "../visual/GameField.vue";
import GameStatus from "../visual/GameStatusHeader.vue";
import { gameModals } from "@/mixins/modals";

export default {
  name: 'HomePage',
  mixins: [gameModals],
  components: {
    GameField,
    GameStatus
  },
  mounted() {
    this.openStartGameModal()
  }
}
</script>

<style lang="less" scoped>
.game {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
