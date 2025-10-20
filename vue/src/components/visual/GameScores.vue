<template>
  <div class="scores">
    <h4 class="scores__player">
      Вы: {{ getPlayerScore }}
    </h4>
    <h4 class="scores__delimeter">
      /
    </h4>
    <h4 class="scores__bot">
      Бот: {{ getBotScore }}
    </h4>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { WinnerStates } from '@/core/constants';
import { gameModals } from '@/mixins/modals';
import axios from 'axios';

export default {
  name: "GameScores",

  mixins: [gameModals],

  computed: {
    ...mapGetters('gameEngine', [
      'getPlayerScore',
      'getBotScore',
      'getWinner'
    ]),
    ...mapGetters('userData', [
      'getUserId'
    ]),

    gameEnded() {
      return this.getWinner != WinnerStates.NONE;
    }
  },
  methods: {
    async updatePlayerScore() {
      axios.defaults.baseURL = 'http://localhost:9992/' // TODO: move to config
      try {
        await axios.patch('/updateUserScore',{
          userId: this.getUserId
        })
      }
      catch (error) {
        console.error(`Error when updating user score: ${error.message}`);
      }
    }
  },

  watch: {
    gameEnded(ended) {
      if(ended) {
        this.updatePlayerScore();
        this.openResultGameModal();
      }
    }
  }
}
</script>

<style lang="less" scoped>
.scores {
  &__player, &__delimeter, &__bot {
    display: inline;
  }

  &__delimeter {
    margin: 0 15px;
  }
}
</style>
