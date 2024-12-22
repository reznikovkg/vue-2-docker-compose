<template>
  <div v-if="visible"
    :class="'card-pile__wrapper--'+type"
    class="center-horizontal center-vertical"
    @click.self="() => close()"
  >
    <div
      :class="'card-pile--'+type"
      class="center-horizontal center-vertical">
      <div :class="'card-pile__container--'+type">
        <CardComponent v-for="(card, index) in cardList"
          :key="index"
          :card="card"
          :style="applyTransform(index)"
          @onMouseOver="(isHovered) => handleMouseOver(isHovered, index)"
          @onCardClick="() => handleCardClick(card)"
          @onCardRightClick="() => handleCardRightClick(card)"
        />
      </div>
      <div v-if="showingCard"
        class="card-showcase center-horizontal center-vertical"
        @click.self="() => setShowingCard(null)"
      >
        <CardComponent :card="showingCard" :style="enlargedCard"/>
      </div>
    </div>
  </div>
</template>

<script>
import CardComponent from './CardComponent.vue';

export default {
  components: {
    CardComponent,
  },
  props: {
    type: String,
  },
  data() {
    return {
      cardList: [],
      showingCard: null,
      visible: false,
      hoveredIndex: null,
    };
  },
  mounted() {
    if (this.type == "pile") {
      this.$root.$on('setPile', (cards) => this.setCardList(cards));
      this.$root.$on('showPile', () => this.show());
    } else if (this.type == "reward") {
      this.$root.$on('setRewards', (cards) => this.setCardList(cards));
      this.$root.$on('showRewards', () => this.show());
    }
  },
  computed: {
    getScaling() {
      return 1;
    },

    enlargedCard() {
      return {
        transform: `scale(1.9)`, 
        boxShadow: `2px 2px 15px 4px rgba(45, 255, 255, 0.9)`,
      };
    },
  },
  methods: {
    applyTransform(index) {
      const isHovered = this.hoveredIndex == index;
      if (isHovered)
      {
        return {
          transform: `scale(${this.getScaling + 0.05})`,
          transition: `transform 0.1s ease-out`,
          boxShadow: `2px 2px 7px 2px rgba(45, 255, 255, 0.9)`,
          zIndex: 100,
        }
      } else {
        return {
          transform: `scale(${this.getScaling})`,
          transition: `transform 0.05s ease-in`,
        }
      }
    },

    handleCardClick(card) {
      if (this.type  == "pile") {
        if (this.showingCard)
          return;

        this.hoveredIndex = null;
        this.setShowingCard(card);
      } else if (this.type == "reward") {
        if (this.showingCard)
          return;
        
        this.$root.$emit("choseReward", card)
        this.visible = false;
      }
    },

    handleCardRightClick(card) {
      if (this.showingCard)
        return;

      this.hoveredIndex = null;
      this.setShowingCard(card);
    },

    handleMouseOver(isHovered, index) {
      this.hoveredIndex = isHovered ? index : null;
    },

    setShowingCard(card) {
      this.showingCard = card;
    },

    setCardList(cards) {
      this.cardList = cards;
    },

    show() {
      this.visible = true;
    },

    close() {
      this.visible = false;
    },
  },
}
</script>

<style scoped lang="less">
.card-pile {
  &--pile {
    position: absolute;
    top: 5%;
    bottom: 5%;
    left: 10%;
    right: 10%;
    padding: 10px;
    border: 3px solid #353434;
    border-radius: 15px;;
    background: #3b3b3bf3;
    justify-items: normal;
    z-index: 10;
  }

  &--reward {
    position: absolute;
    left: 20%;
    right: 20%;
    top: 25%;
    height: 340px;
    padding: 10px;
    border: 3px solid #353434;
    border-radius: 15px;;
    background: #3b3b3bf3;
    justify-items: normal;
    z-index: 5;
  }

  &__wrapper {
    &--pile {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      z-index: 100;
      background: #22222281;
      backdrop-filter: blur(10px);
    }

    &--reward {
      position: fixed;
      top: 60px;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 50;
      background: #22222281;
    }
  }

  &__container {
    &--pile {
      display: grid;
      padding: 15px;
      height: 95%;
      right: 1%;
      left: 1%;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
      border-radius: 10px;
      overflow-y: scroll;
      background: #72727259;
          
      &::-webkit-scrollbar {
        background: transparent;
        width: 15px;
      }

      &::-webkit-scrollbar-track {
        margin: 0px 0px;
        background: radial-gradient(circle at center, #000 75%, transparent);
      }

      &::-webkit-scrollbar-thumb {
        background: #747474;
        border-radius: 0px 15px 15px 0px;
      }
    }
    &--reward {
      display: grid;
      padding: 15px;
      height: 95%;
      right: 1%;
      left: 1%;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
      border-radius: 10px;
      overflow-y: hidden;
      background: #72727259;
    }
  }
}

.card-showcase{
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #000000ce;
  backdrop-filter: blur(3px);
}
</style>
