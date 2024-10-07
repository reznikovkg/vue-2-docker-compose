<template>
  <div>
    <GameCard
      :strength="cardStrength"
      :type="cardType"
      :highlighted="isHighlighted"
      :faceDown="isFaceDown"
      @flip="flipCardState"
    />
  </div>
</template>

<script>
import GameCard from './card/card.vue';  // Обновим импорт

export default {
  components: {
    GameCard
  },
  data() {
    return {
      cardStrength: 5,
      cardType: 'Warrior',
      isHighlighted: false,
      isFaceDown: false
    };
  },
  methods: {
    flipCardState() {
      this.isFaceDown = !this.isFaceDown;
    }
  }
};
</script>
