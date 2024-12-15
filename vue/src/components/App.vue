<template>
  <div>
    <PlayerHand opponent/>
    <GameDesk ref="playerDesk"/>
    <PlayerHand @onCardDrop="(payload) => this.onCardDrop(payload)"/>
    <ModalContainer/>
  </div>
</template>

<script>
import GameDesk from '@/components/game/GameDesk.vue';
import PlayerHand from '@/components/game/PlayerHand.vue';
import { mapGetters } from 'vuex';
import ModalContainer from '@/components/parts/ModalContainer.vue';
import { CardType } from '@/engine/constants';
import { getCardDropPosition } from '@/utils/utils';

export default {
  components: {
    ModalContainer,
    PlayerHand,
    GameDesk,
  },
  methods: {
    onCardDrop({ index: cardIndex, x, y, cursor }) {
      const engine = this.getGameEngine;
      const { left, right, top, bottom } = this.$refs.playerDesk.$refs.lines.getBoundingClientRect();
      const card = engine.player.cards[cardIndex];
      const lineId = card.type === CardType.MELEE ? 'player-melee-cards' : 'player-range-cards';
      const line = document.querySelector(`#${lineId} > .desk-line__cards`);
      const cardsNodes = line.childNodes;

      if (x > left && x < right && y < bottom && y > top) {
        const position = getCardDropPosition(cardsNodes, cursor.x);
        engine.playCard(cardIndex, position);
      }
    }
  },
  computed: {
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
  }
};
</script>

<style lang="less">
html {
  overflow: hidden;
}
</style>
