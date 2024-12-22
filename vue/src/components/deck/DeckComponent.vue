<template>
  <div class="deck__wrapper center-horizontal">
    <TransitionGroup name="slide" tag="div"
      class="deck center-horizontal center-vertical"
      :style="{'--card-spacing': `${getXSpacing}px`}"
      @after-enter="afterEnter"
    >
      <CardComponent 
        v-for="(card, index) in getHand" 
        :key="index"
        :card="card"
        :style="applyTransform(index)"
        @onMouseOver="(isHovered) => handleMouseOver(isHovered, index)"
        @onCardClick="() => handleCardClick(card, index)"
      />
    </TransitionGroup>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CardComponent from '../card/CardComponent.vue';

export default {
  components: {
    CardComponent,
  },
  data() {
    return {
      hoveredIndex: null,
      selectedIndex: null,
      selectedCard: null,
      animated: [],
      sfx: new Audio(require('../../assets/sounds/card/tap.mp3')),
    };
  },
  beforeMount() {
    this.sfx.volume = 0.1;

    this.$root.$on('playCard', payload => {
      this.animated.pop();
      this.playCard(payload.cardIndex);
    });

    this.$root.$on('discardCard', () => {
      this.animated.pop();
    });

    this.$root.$on('discardHand', () => {
      this.animated = [];
    });

    this.$root.$on('selectCard', (card, index) => {
      this.selectedCard = card,
      this.selectedIndex = index;
    });
  },
  computed: {
    ...mapGetters("deck", ["getHand"]),

    handLength() {
      return this.getHand.length;
    },

    getXSpacing() {
      return this.handLength * -11;
    },

    getScaling() {
      return 0.9;
    },
  },
  methods: {
    ...mapActions("deck", ["playCard"]),

    handleCardClick(card, index) {
      this.$root.$emit("selectCard", card, index);
    },

    handleMouseOver(isHovered, index) {
      this.hoveredIndex = isHovered ? index : null;
      this.sfx.currentTime = 0;
      this.sfx.play().catch(() => console.log("Can't play sound without user interaction"));
    },

    afterEnter(el) {
      const index = Array.from(el.parentElement.children).indexOf(el);
      this.animated.push(index);
    },

    applyTransform(index) {
      if (!this.animated.includes(index)) {
        return;
      }
      const isHovered = this.hoveredIndex == index;
      const isSelected = this.selectedIndex == index;
      if (isHovered || isSelected)
      {
        return {
          transform: `scale(${this.getScaling + 0.05}) rotate(0deg) translateY(-35px)`,
          transition: `transform 0.1s ease-out`,
          boxShadow: `2px 2px 7px 2px rgba(45, 255, 255, 0.9)`,
          zIndex: 100
        }
      } else {
        return {
          transform: `scale(${this.getScaling}) rotate(${this.getRotation(index)}deg) translateY(${this.getYShift(index)}px)`,
          transition: `transform 0.05s ease-in`,
        }
      }
    },

    getRotation(index) {
      const maxAngle = 20;
      const centerIndex = (this.handLength - 1) / 2;
      const scaleFactor = Math.min(1, this.handLength / 5);
      return maxAngle * ((index - centerIndex) / centerIndex) * scaleFactor;
    },

    getYShift(index) {
      const centerIndex = (this.handLength - 1) / 2;
      const maxDrop = 30;
      const distanceFromCenter = Math.abs(index - centerIndex);
      const scaleFactor = Math.min(1, this.handLength / 9);
      return (maxDrop * (distanceFromCenter / centerIndex) ** 2) * 5 * scaleFactor;
    },
  },
};
</script>

<style scoped lang="less">
.deck {
  height: 290px;
  width: 1100px;
  padding-left: 120px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: start;

  &__wrapper {
    height: fit-content;
    width: fit-content;
    padding-top: 35px;
    overflow: hidden;
  }

  >.card {
    margin-left: var(--card-spacing);
  }
}

.slide-enter-active, .slide-leave-active {
  transition: .15s;
}
.slide-enter, .slide-leave-active {
  transform: translate(-500px, 50px) rotate(90deg) scale(0);
}
</style>