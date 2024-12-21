<template>
  <ModalComponent>
    <div class="mulligan-container">
      <h1>
        It is Mulligan time!
      </h1>
      <div class="mulligan-container__cards">
        <GameCard
          v-for="(card, index) in cards"
          :key="index"
          :type="card.getType()"
          :score="card.getScore()"
          :image-uri="card.getImage()"
          :index="index"
        />
      </div>
      <button class="ok-button" @click="() => performMulligan()">
        Ok
      </button>
    </div>
  </ModalComponent>
</template>

<script>
import ModalComponent from "@/components/parts/Modal";
import GameCard from '@/components/game/GameCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: "MulliganModal",
  components: {
    ModalComponent,
    GameCard
  },
  computed: {
    cards() {
      return this.getGameEngine.player.cards;
    },
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
  },
  methods: {
    performMulligan() {
      this.$emit('close');
      this.getGameEngine.performMulligan();
    },
  },
}
</script>

<style scoped lang="less">
.mulligan-container {
  height: 60vh;
  width: 60vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__cards {
    padding: 20px;
    display: flex;
    flex-direction: row;
  }
}

.ok-button {
  height: 64px;
  width: 128px;
  border: none;
  border-radius: 4px;
  background-color: burlywood;

  &:hover {
    background-color: bisque;
  }
}
</style>
