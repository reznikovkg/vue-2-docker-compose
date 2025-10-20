<template>
  <div class="board">
    <div class="board__cards droppable">
      <GameCard 
        v-for="(card, i) in getCardsOnBoard"
        :key="i"
        :card="card"
        :on-board="true"
      />
    </div>
  </div>

</template>

<script>
import GameCard from './GameCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: "ActiveBoard",
  components: {
    GameCard
  },
  props: {
    cards: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters('gameEngine', [
      'getCardsOnBoard',
    ]),
  }
}
</script>

<style lang="less" scoped>
.board {
  height: inherit;
  padding: 20px;
  background-color: #C6DABF;
  border: solid 1px #216652;

  &__cards {
    height: inherit;
    display: flex;
    justify-content: space-around;
    max-width: 800px;
    margin: auto;
    align-items: center;
  }
}

@media(max-width: 560px){
  .board {
    padding: 10px;
    
    &__cards {
      max-width: 286px;
    }
  }
}
</style>
