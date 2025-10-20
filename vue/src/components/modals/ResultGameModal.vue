<template>
  <ModalComponent>
    <div class="result-modal scroll-modal">
      <h2 class="result-modal__winner">
        {{ getResultMessage }}
      </h2>
      <h4 class="result-modal__rating-place">
        <span v-if="currentUserInRating10">
          Вы занимаете место в Топ-10 общего рейтинга!
        </span>
        <span v-else>
          Теперь Вы занимаете {{ sortedRating.at(-1).position }} место в общем рейтинге
        </span>
      </h4>
      <button class="button-green" @click="() => restartGame()">
        Новая игра
      </button>
      <UserRating :users="sortedRating" class="rating-container" />
    </div>
  </ModalComponent>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { WinnerStates } from "@/core/constants";
import ModalComponent from "@/components/parts/Modal";
import UserRating from "../parts/UserRating.vue";

export default {
  name: "ResultGameModal",
  components: {
    ModalComponent,
    UserRating
  },
  props: {
    params: Object,
    ratingUsers: {
      type: Array,
      default() {
        return []
      }
    }
  },

  computed: {
    ...mapGetters('gameEngine', [
      'getWinner'
    ]),
    getResultMessage() {
      let resultObj = {}
      resultObj[WinnerStates.PLAYER_WINS] = 'Вы выиграли!';
      resultObj[WinnerStates.BOT_WINS] = 'Противник выиграл!';
      resultObj[WinnerStates.DRAW] = 'Ничья!';

      return resultObj[this.getWinner];
    },
    sortedRating() {
      const copy = this.ratingUsers
      return copy.sort((a, b) => b.scores - a.scores)
    },
    currentUserInRating10() {
      return this.ratingUsers.length <= 10
    }
  },

  methods: {
    ...mapActions('gameEngine', [
      'startNewGame'
    ]),

    restartGame() {
      this.startNewGame();
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
.result-modal {
  &__winner {
    color: #17211E;
    font-size: 38px;

    @media(max-width: 540px) {
      font-size: 28px;
    }
  }

  &__rating-place {
    color: #17211E;
    font-size: 21px;
    margin: 10px 0 20px 0;

    @media(max-width: 540px) {
      font-size: 18px;
      margin: 6px 0 12px 0;
    }
  }
}

.rating-container {
  margin-top: 40px;

  @media(max-width: 540px) {
    margin-top: 32px;
  }
}
</style>
