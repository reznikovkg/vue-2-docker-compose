<template>
  <div class="hand-container" :style="handStyle">
    <div :class="handClass">
      <div
          class="hand__card"
          v-for="(card, index) in cards"
          :key="index"
          @mouseover="() => onMouseOver(index)"
          @mouseleave="() => onMouseLeave()"
          :style="cardStyle(index)"
      >
        <GameCard
            :key="index"
            :type="card.type"
            :score="card.score"
            :image-uri="card.image"
            :face-down="opponent"
            :enlarged="!opponent"
            :is-opponent="opponent"
            :index="index"
            @onDrag="(i) => onCardStartDrag(i)"
            @onDrop="(params) => onCardStopDrag(params)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from '@/components/game/GameCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'PlayerHand',
  components: { GameCard },
  emits: [
    'onCardDrop',
  ],
  props: {
    opponent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return { hoveredIndex: null, draggedIndex: null };
  },
  computed: {
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
    cards() {
      return this.opponent ?
          this.getGameEngine.opponent.cards :
          this.getGameEngine.player.cards
    },
    handClass() {
      return this.opponent ? 'hand-opponent' : 'hand-player';
    },
    handStyle() {
      return this.opponent ? { transform: 'rotate(180deg)' } : {}
    }
  },
  methods: {
    onMouseOver(index) {
      this.hoveredIndex = index;
    },
    onMouseLeave() {
      this.hoveredIndex = null;
    },
    onCardStartDrag(index) {
      this.draggedIndex = index;
    },
    onCardStopDrag(params) {
      this.$emit('onCardDrop', params);
      this.draggedIndex = null;
    },
    cardStyle(index) {
      if (this.draggedIndex === index) {
        return {};
      }

      const cardsLength = this.opponent ? this.getGameEngine.opponent.cards.length : this.getGameEngine.player.cards.length
      const angle = (index - (cardsLength - 1) / 2) * 7;

      return {
        transform: `rotate(${angle}deg)`,
      }
    }
  }
};
</script>

<style scoped lang="less">
.hand {
  position: absolute;
  z-index: 666;
  width: 150px;

  &__card {
    width: 150px;
    height: 60%;
    display: flex;
    align-items: center;
    font-size: 18px;
    color: black;
    position: absolute;
  }

  &-player:extend(.hand) {
    bottom: -360px;
  }

  &-opponent:extend(.hand) {
    top: 380px;
  }
}

.hand-container {
  display: flex;
  justify-content: center;
}
</style>
