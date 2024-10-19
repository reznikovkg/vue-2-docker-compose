<template>
  <div class="desk">
    <div>
      <GameDeskLine :cards="opponentRangeCards" :isMelee="false" :isOpponent="true" />
      <GameDeskLine :cards="opponentMeleeCards" :isMelee="true" :isOpponent="true" />
    </div>
    <div class="desk__separator">
      <span class="desk__separator__line" />
      <span class="desk__separator__text">VS</span>
      <span class="desk__separator__line" />
      <CountDown :initialValue="60" />
    </div>
    <div>
      <GameDeskLine :cards="playerMeleeCards" :isMelee="true" :isOpponent="false" />
      <GameDeskLine :cards="playerRangeCards" :isMelee="false" :isOpponent="false" />
    </div>
  </div>
</template>

<script>
import GameDeskLine from "./DeskLine";
import CountDown from '../game/CountDown.vue';
import { mapGetters } from 'vuex';
import { CardType } from '@/engine/constants'

export default {
  components: {
    GameDeskLine,
    CountDown,
  },
  name: "GameDesk",
  computed: {
    playerMeleeCards() {
      return this.getGameEngine.player.board.firstLineCards;
    },
    playerRangeCards() {
      return this.getGameEngine.player.board.secondLineCards;
    },
    opponentMeleeCards() {
      return this.getGameEngine.opponent.board.firstLineCards;
    },
    opponentRangeCards() {
      return this.getGameEngine.opponent.board.secondLineCards;
    },
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
  },
  mounted() {
    //! FIXME: mock
    this.getGameEngine.player.board.firstLineCards = new Array(6).fill({ score: 1, type: CardType.MELEE })
    this.getGameEngine.player.board.secondLineCards = new Array(6).fill({ score: 1, type: CardType.MELEE })
  },
}
</script>

<style scoped lang="less">
.desk {
  display: flex;
  flex-direction: column;

  &__separator {
    display: flex;

    align-items: center;
    text-align: center;

    margin: 20px 0;

    &__line {
      flex: 1;
      height: 2px;

      background-color: rgb(204, 204, 204);
      margin: 0 10px;
    }

    &__text {
      font-weight: bold;
      color: rgb(51, 51, 51);
      font-size: 32px;
    }
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
