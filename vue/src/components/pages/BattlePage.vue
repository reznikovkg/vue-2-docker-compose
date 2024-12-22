<template>
  <div class="battle-screen" @contextmenu="(event) => onPageRightClick(event)">
    <img class="background" src="../../assets/common/background.jpg">
    <div class="header">
      <div class="deck__button" @click="() => showPile(getDeck)">
        <img src="../../assets/common/deck.png">
        <p class="deck__text center-vertical center-horizontal">{{ getDeck.length }}</p>
      </div>
    </div>

    <div class="middle center-vertical">
      <div class="player-area">
        <PlayerComponent :player="player"/>
      </div>
      <div class="enemy-area center-vertical center-horizontal"
        @click.self="() => handleCardPlay('player')"
      >
        <EnemyComponent
          v-for="(enemy) in enemies"
          :key="enemy.id"
          :enemy="enemy"
          @onEnemyClick="() => handleCardPlay(enemy)"
        />
      </div>
    </div>

    <div class="footer">
      <div class="pile__button" @click="() => showDrawPile()">
        <img src="../../assets/common/draw.png">
        <p class="pile__text center-vertical center-horizontal">{{ getDrawPile.length }}</p>
      </div>
      <div class="mana">
        <img src="../../assets/common/mana.png">
        <p class="mana__text center-vertical center-horizontal">
          {{ getMana.current }}/{{ getMana.max}}
        </p>
      </div>
      <DeckComponent/>
      <div class="end-turn__button center-vertical center-horizontal"
        @click="() => onEndTurnButton()"
      >
        <p class="end-turn__text center-vertical center-horizontal">End Turn</p>
      </div>

      <div class="pile__button" @click="() => showPile(getDiscardPile)">
        <img src="../../assets/common/discard.png">
        <p class="pile__text center-vertical center-horizontal">{{ getDiscardPile.length }}</p>
      </div>
    </div>
    <CardPile :type="'pile'"/>
    <EncounterComponent/>
    <RewardComponent/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import cardEffect from "../common/cardEffect";
import { shuffleArray } from "../common/helpers";
import CardPile from '../card/CardPile.vue';
import DeckComponent from '../deck/DeckComponent.vue';
import EnemyComponent from "../enemy/EnemyComponent.vue";
import PlayerComponent from "../player/PlayerComponent.vue";
import enemyAction from "../common/enemyAction";
import EncounterComponent from "../map/EncounterComponent.vue";
import RewardComponent from "../reward/RewardComponent.vue";

export default {
  components: {
    DeckComponent,
    CardPile,
    PlayerComponent,
    EnemyComponent,
    EncounterComponent,
    RewardComponent,
  },
  data() {
    return {
      selectedCard: null,
      selectedCardIndex: null,
      actionBuffer: [],
      processingBuffer: false,
      tickTimer: 450,
      deckMounted: false,
      sfx: {
        hit: new Audio(require('../../assets/sounds/hit.wav')),
        block: new Audio(require('../../assets/sounds/block.wav')),
      }
    }
  },
  computed: {
    ...mapGetters("deck", [
      "getDeck",
      "getDeckIds",
      "getHand",
      "getDrawPile",
      "getDiscardPile",
      "drawAmount",
    ]),
    ...mapGetters("battle", [
      "getPlayer",
      "getEnemies",
      "getMana",
    ]),
    ...mapGetters("encounter", [
      "getCurrentEncounter",
    ]),

    player() {
      return this.getPlayer;
    },

    enemies() {
      return this.getEnemies;
    },

    loose() {
      return this.player.health <= 0
    }
  },
  watch: {
    enemies: function (newVal) {
      if (newVal.length == 0) {
        this.$root.$emit("encounterFinished");
      } else if (newVal.length < this.getCurrentEncounter.enemies.length) {
        this.$root.$emit("enemyDied");
      }
    },
    loose: function () {
      this.$root.$emit("playerDied")
    }
  },
  mounted() {
    Object.keys(this.sfx).forEach(sound => 
      this.sfx[sound].volume = 0.2,
    );

    this.$root.$on('selectCard', (card, index) => {
      this.selectedCard = card,
      this.selectedCardIndex = index;
    });

    this.$root.$on('encounterChosen', (encounter) => {
      this.startEncounter(encounter);
    });

    this.$root.$on('encounterFinished', () => {
      this.onVictory();
    });

    this.$root.$on('enemyDied', () => {
      //this.onEnemyDeath();
    });

    this.$root.$on('playerDied', () => {
      this.onLoose();
    });

    this.$root.$emit("chooseEncounter");
  },
  methods: {
    ...mapActions("battle", [
      "clearEnemies",
      "addEnemyById",
      "applyDamage",
      "applyHeal",
      "applyShield",
      "setShield",
      "changeMaxMana",
      "changeCurrentMana",
      "setCurrentMana",
      "enemySetIntent",
      "enemyNextAction",
    ]),
    ...mapActions("deck", [
      "drawCards",
      "discardRandom",
      "setDrawPile",
      "clearPiles",
      "discardHand",
    ]),
    
    playSound(sound) {
      sound.currentTime = 0;
      sound.play().catch(() => console.log("Can't play sound without user interaction"));
    },
    
    sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    },

    showDrawPile() {
      this.$root.$emit('setPile', shuffleArray(this.getDrawPile));
      this.$root.$emit('setPile', this.getDrawPile);
      this.$root.$emit('showPile');
    },

    showPile(pile) {
      this.$root.$emit('setPile', pile);
      this.$root.$emit('showPile');
    },
    
    async processBuffer() {
      this.processingBuffer = true;
      while(this.actionBuffer.length > 0) {
        const action = this.actionBuffer[0];
        await action();
        await this.sleep(this.tickTimer);
        this.actionBuffer.shift();
      }
      this.processingBuffer = false;
    },

    handleCardPlay(target) {
      if (this.selectedCard == null) {
        return;
      }
      if (this.selectedCard.targeted && target == "player") {
        return;
      }

      const card = this.selectedCard;
      const index = this.selectedCardIndex;

      this.actionBuffer.push(() => this.tryPlayCard(card, index, target));
      if (!this.processingBuffer) {
        this.processBuffer();
      }
      this.$root.$emit("selectCard", null, null)
    },

    async tryPlayCard(card, index, target) {
      let shouldExecute = true;
      if (!this.getHand.includes(card)) {
        shouldExecute = false;
      }
      if (card.cost > this.getMana.current) {
        this.$root.$emit("selectCard", null, null);
        shouldExecute = false;
      }

      if (card.targeted && target.health <= 0) {
        shouldExecute = false;
      }

      if (!shouldExecute) {
        this.actionBuffer = [];
        return;
      }

      this.$root.$emit("playCard", {
        card: card,
        cardIndex: index,
        target: target,
      });
      this.changeCurrentMana(-card.cost)

      for (const effect of card.effects) {
        await this.resolveEffect(effect, target, "player");
        await this.sleep(this.tickTimer)
      }
    },

    async endTurn() {
      this.discardHand();
      this.$root.$emit("discardHand");
      this.enemies.forEach((enemy) => {
        this.setShield({ amount: 0, target: enemy });
      });
      for (const enemy of this.enemies) {
        await this.resolveEffect(enemy.intent, "player", enemy);
        this.enemyNextAction(enemy);
        await this.sleep(this.tickTimer);
      }

      this.setShield({amount: 0, target: "player"});
      await this.sleep(this.tickTimer);
      this.setCurrentMana(this.getMana.max);
      for (let i = 0; i < this.drawAmount; i++) {
        this.drawCards(1);
        await this.sleep(this.tickTimer/2);
      }
      this.actionBuffer = [];
    },

    onEndTurnButton() {
      this.$root.$emit('endTurn');
      this.actionBuffer.push(() => this.endTurn())
      if (!this.processingBuffer) {
        this.processBuffer();
      }
    },

    onPageRightClick(event) {
      event.preventDefault();
      this.$root.$emit('selectCard', null, null);
    },

    async resolveEffect(effect, target, caster) {
      switch (effect.type) {
        case enemyAction.ATTACK_MULTIPLE:
        case enemyAction.ATTACK:
        case cardEffect.ATTACK: {
          for (let i = 0; i < (effect.values[1] || 1); i++) {
            this.applyDamage({ amount: effect.values[0], target });
            this.playSound(this.sfx.hit);
            await this.sleep(this.tickTimer/2);
          }
          break;
        }
        case enemyAction.DEFEND:
        case cardEffect.DEFEND: {
          this.applyShield({ amount: effect.values[0], target: caster });
          this.playSound(this.sfx.block);
          break;
        }
        case cardEffect.DRAW: {
          for (let i = 0; i < effect.values[0]; i++) {
            this.drawCards(1);
            await this.sleep(this.tickTimer/2);
          }
          break;
        }
        case cardEffect.SHUFFLE: {
          break;
        }
        case cardEffect.DISCARDRANDOM: {
          this.discardRandom(effect.values[0]);
          this.$root.$emit("discardCard");
          this.actionBuffer = [];
          break;
        }
        case cardEffect.DISCARDHAND: {
          this.$root.$emit("discardHand");
          this.discardHand();
          break;
        }
        case cardEffect.EXHAUSTSELF: {
          break;
        }
        case enemyAction.ATTACK_AND_DEFEND: {
          this.applyDamage({ amount: effect.values[0], target: target });
          this.playSound(this.sfx.hit);
          await this.sleep(this.tickTimer/2)
          this.applyShield({ amount: effect.values[1], target: caster });
          this.playSound(this.sfx.block);
          break;
        }
      }
    },

    onVictory() {
      this.applyHeal({target: "player", amount: this.getCurrentEncounter.heal});
    },

    onLoose() {
      this.$router.push('/');
      this.$router.go();
      // location.reload();
    },

    startEncounter(encounter) {
      encounter.enemies.forEach(id => this.addEnemyById(id));
      this.enemies.forEach(enemy => {
        this.enemySetIntent(enemy);
      });

      this.clearPiles();
      this.setShield({amount: 0, target: "player"});
      let shuffle = structuredClone(this.getDeckIds);
      shuffle = shuffleArray(shuffle);
      this.setDrawPile(shuffleArray(shuffle));
      this.drawCards(this.drawAmount);
      this.setCurrentMana(this.getMana.max);
    },
  }
}
</script>

<style scoped lang="less">
.battle-screen {
  position: absolute;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  
  .background {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -5;
    overflow: clip;

    filter: blur(3px);
  }

  .header {
    height: 60px;
    width: 100vw;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
    z-index: 0;
    background: rgb(23, 1, 26);
    
    .deck {
      &__button {
        position: relative;
        left: 45%;
        height: 65px;
        width: 65px;
        
        img {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          z-index: -1;
        }
      }

       &__text {
        position: absolute;
        height: 20px;
        width: 20px;
        bottom: 3px;
        z-index: 1;
        color: #000000;
        font-size: 16px;
        font-weight: bold;
        text-shadow: #03e6f7 0px 1px 1px;
        background: #ffffff91;
        border: 2px solid #000000;
        border-radius: 20px;
      }
    }
  }

  .middle {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    height: 100px;
    width: 100vw;
    margin-top: 100px;

    .player-area {
      height: 300px;
      width: 300px;
      margin-left: 5%;
      margin-top: 5%;
    }

    .enemy-area {
      display: flex;
      flex-grow: 1;
      height: 100%;
      justify-items: center;
      margin-right: 2%;
      margin-left: 10%;
    }
  }

  .footer {
    height: fit-content;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;

    .mana {
      position: relative;
      height: 100px;
      width: 100px;

      img {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: -1;
        filter:hue-rotate(190deg);
      }

      &__text {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 1;
        color: #000000;
        font-size: 20px;
        font-weight: bold;
        text-shadow: #03e6f7 0px 1px 1px;
      }
    }

    .pile {
      &__button {
        position: relative;
        height: 80px;
        width: 80px;

        img {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          z-index: -1;
        }
      }

      &__text {
        position: absolute;
        height: 22px;
        width: 22px;
        bottom: 0px;
        z-index: 1;
        color: #000000;
        font-size: 18px;
        font-weight: bold;
        text-shadow: #03e6f7 0px 1px 1px;
        background: #ffffff91;
        border: 2px solid #000000;
        border-radius: 20px;
      }
    }
    
    .end-turn {
      &__button {
        position: relative;
        height: 45px;
        width: 120px;
        border: 5px solid;
        border-radius: 30px;
        cursor: pointer;
        filter: drop-shadow(0px 4px 1px #5f3131);
        background: #240333;
      }

      &__text {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        z-index: 1;
        color: #eb9292d8;
        font-size: 20px;
        font-weight: bold;
        text-shadow: #330202 0px 1px 1px;
      }
    }
  }
}
</style>
