<template>
  <div class="player-score-counter">
    {{ score }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PlayerScoreCounter',
  props: {
    opponent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
    score() {
      return this.opponent ?
          this.getGameEngine.opponent.getScore() :
          this.getGameEngine.player.getScore()
    }
  },
}
</script>

<style scoped lang="less">
.player-score-counter {
  font-size: 40px;
  font-family: "Franklin Gothic Medium", serif;
}
</style>
