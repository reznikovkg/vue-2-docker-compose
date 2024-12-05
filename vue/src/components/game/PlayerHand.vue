<template>
  <div class="hand-container">
    <div :class="handClass">
      <div
          class="hand__card"
          v-for="(card, index) in cards"
          :key="index"
          @mouseover="() => onMouseOver(index)"
          @mouseleave="() => onMouseLeave()"
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
    }
  },
  methods: {
    getHandStyles(index) {
      if (this.opponent) {
        return index === 1 ? { 'margin-left': '0' } : {}
      }

      const angle = (index - (this.cards.length - 1) / 2) * 7;
      const isHovered = this.hoveredIndex === index;
      const mid = Math.round(this.cards.length / 2)
      const style = {
        zIndex: isHovered ? 100 : index,
      }

      if (this.draggedIndex !== index) {
        style.transform = `translate(${index * 60 - this.cards.length * 30}px, ${Math.abs(mid - index) * 15}px)  rotate(${angle}deg)`;
      }

      return style;
    },
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
    }
  }
};
</script>

<style scoped lang="less">
.hand {
  position: absolute;
  z-index: 666;
  width: 80vw;
  left: 50vw;

  &__card {
    width: 150px;
    height: 60%;
    display: flex;
    align-items: center;
    font-size: 18px;
    color: black;
    transform-origin: bottom center;
    justify-content: center;
    position: absolute;
  }

  &-player:extend(.hand) {
    bottom: -70px;
    height: 20vh;
  }

  &-opponent:extend(.hand) {
    top: -25px;
    height: 15vh;
  }
}

.hand-container {
  display: flex;
  justify-content: center;
}
</style>
