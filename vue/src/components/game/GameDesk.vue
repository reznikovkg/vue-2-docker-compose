<template>
  <div class="desk">
    <div class="desk__enemy_line">
      <GameDeskLine :cards="opponentRangeCards" :isMelee="false" :isOpponent="true" />
      <GameDeskLine :cards="opponentMeleeCards" :isMelee="true" :isOpponent="true" />
    </div>
    <div class="desk__separator">
      <GameScore />
      <span class="desk__separator__line" />
      <span class="desk__separator__text">VS</span>
      <span class="desk__separator__line" />
      <CountDown />
      <PassButton />
      <EndTurnButton />
    </div>
    <div ref="lines">
      <GameDeskLine :cards="playerMeleeCards" :isMelee="true" :isOpponent="false" id="player-melee-cards" />
      <GameDeskLine :cards="playerRangeCards" :isMelee="false" :isOpponent="false" id="player-range-cards" />
    </div>
  </div>
</template>

<script>
import GameDeskLine from "./DeskLine";
import CountDown from '../game/CountDown.vue';
import { mapGetters } from 'vuex';
import EndTurnButton from '@/components/game/EndTurnButton.vue';
import PassButton from '@/components/game/PassButton.vue';
import GameScore from '@/components/game/GameScore.vue';
import { mulliganModal } from '@/mixins/modals';
import { GamePhases } from '@/engine/constants';

export default {
  components: {
    GameScore,
    PassButton,
    EndTurnButton,
    GameDeskLine,
    CountDown,
  },
  name: "GameDesk",
  mixins: [mulliganModal],
  computed: {
    gamePhase() {
      return this.getGameEngine.currentPhase;
    },
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
    this.handleMulligan();
  },
  methods: {
    handleMulligan() {
      this.openMulliganModal();
    },
  },
  watch: {
    gamePhase: function () {
      if (this.gamePhase !== GamePhases.MULLIGAN) {
        return;
      }

      this.handleMulligan();
    },
  },
}
</script>

<style scoped lang="less">
.desk {
  display: flex;
  flex-direction: column;
  margin: 4vh 0;
  height: 15vh;
  border-radius: 7px;
  position: relative;
  z-index: 0;

  &__enemy_line {
    margin-top: 2vh;
  }

  &__separator {
    display: flex;
    align-items: center;
    text-align: center;

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
}
</style>
