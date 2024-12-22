<template>
  <div v-if="visible">
    <CardPile :type="'reward'"/>
    <div class="reward__wrapper center-vertical center-horizontal">
      <div class="reward-container center-horizontal">
        <p class="reward-container__text">Choose reward:</p>
        <div
          v-for="(reward, index) in this.getCurrentEncounter.rewards"
          :key="index"
          class="reward-card center-vertical center-horizontal"
          @click="() => chooseReward(reward)"
        >
          <p class="reward-card__text"> {{ reward.type }}</p>
        </div>
        <div class="reward-container__footer">
          <button class="continue-button" @click="() => onContinue()"> Continue </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CardPile from '../card/CardPile.vue';
import { randomInteger } from '../common/helpers';

export default {
  components: {
    CardPile,
  },
  data() {
    return {
      visible: false,
      selectedReward: null,
      numOfCards: 3,
    }
  },
  mounted() {
    this.$root.$on('encounterFinished', () => {
      this.visible = true;
    });
    this.$root.$on('choseReward', (card) => {
      this.removeReward(this.selectedReward);
      this.selectedReward = null;
      this.addCardToDeck(card.id);
    });
  }, 
  computed: {
    ...mapGetters("encounter", [
      "getEncounters",
      "getCurrentEncounter",
    ]),
    ...mapGetters("cards", [
      "getCards",
    ]),
  },
  methods: {
    ...mapActions("encounter", [
      "removeReward",
    ]),
    ...mapActions("deck", [
      "addCardToDeck",
    ]),

    chooseReward(reward) {
      this.selectedReward = reward;
      let choice = []
      if (reward.type == "card") {
        let cardPool = this.getCards.filter(card => card.rarity >= reward.minRarity);
        for (let i = 0; i < this.numOfCards; i++) {
          if (cardPool.length > 0) {
            const cardId = randomInteger(0, cardPool.length - 1);
            const card = structuredClone(cardPool[cardId]);
            cardPool.splice(cardId, 1);
            choice.push(card);
          }
        }
      }
      this.$root.$emit('setRewards', choice);
      this.$root.$emit('showRewards');
    },

    onContinue() {
      this.visible = false;
      this.$root.$emit('chooseEncounter');
    }
  }
}
</script>

<style lang="less" scoped>
.reward {
  &__wrapper {
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  
  &-container {
    position: relative;
    height: fit-content;
    min-height: 250px;
    width: 350px;
    padding: 10px;
    text-align: center;
    border-radius: 15px;
    background: #18011a;
    
    &__text {
      margin-bottom: 15px;
      color: #dbdbdb;
      font-size: 25px;
      background: #1b1b1b1f;
    }
    &__footer {
      position: absolute;
      height: 40px;
      width: 100%;
      bottom: 0;
      left: 0;

      .continue-button {
        color: #999999;
        height: 30px;
        width: 100px;
        bottom: 10px;
        border: 1px solid;
        border-radius: 10px;
        cursor: pointer;
        background: #1b1b1b1f;
      }
    }
  }

  &-card {
    position: relative;
    height: 70px;
    width: 300px;
    margin-right: 5px;
    display: inline-block;
    cursor: pointer;
    border-radius: 10px;
    background: #1f1616a1;

    &__text {
      margin-top: 2px;
      color: #999999;
      font-size: 20px;
      background: #1b1b1b1f;
    }
  }
}
</style>