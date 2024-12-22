<template>
  <div v-if="visible">
    <div class="encounter__wrapper center-vertical center-horizontal">
      <div class="encounter-container center-vertical center-horizontal">
        <p class="encounter-container__text">CHOOSE YOUR NEXT ENCOUNTER</p>
        <div
          v-for="(encounter, index) in encountersToChoose"
          :key="index"
          class="encounter-card center-vertical center-horizontal"
          @click="() => encounterChosen(encounter)"
        >
          <p class="encounter-card__text">enemies: {{ encounter.enemies.length }}</p>
          <p
            v-for="(reward, index) in encounter.rewards" 
            :key="index"
            class="encounter-card__text"
          >
            {{ reward.type }}: 1
          </p>
          <p
            v-if="encounter.heal > 0"
            class="encounter-card__text"
          >
            heal: {{ encounter.heal }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { randomInteger } from "../common/helpers";

export default {
  data() {
    return {
      visible: false,
      encountersToChoose: [],
      numOfEncounters: null,
    }
  },
  mounted() {
    this.$root.$on('chooseEncounter', () => {
      this.numOfEncounters = 2 + randomInteger(0, 1);

      const encounterPool = this.getEncounters;
      for (let i = 0; i < this.numOfEncounters; i++) {
        this.encountersToChoose.push(encounterPool[randomInteger(0, encounterPool.length -1)]);
      }
      this.visible = true;
    });
  },
  computed: {
    ...mapGetters("encounter", [
      "getEncounters",
      "getCurrentEncounter",
    ]),
    ...mapGetters("enemy", [
      "getEnemies",
    ]),
  },
  methods: {
    ...mapActions("encounter", [
      "setCurrentEncounter"
    ]),

    encounterChosen(encounter) {
      const builtEncounter = structuredClone(encounter);
      builtEncounter.enemies = [];
      encounter.enemies.forEach((enemy) => {
        if (enemy.id > -1) {
          builtEncounter.enemies.push(enemy.id);
        } else {
          let enemyPool = this.getEnemies;
          enemyPool = enemyPool.filter(e => e.rarity >= enemy.rarity);
          const randomEnemy = enemyPool[randomInteger(0,enemyPool.length-1)];
          builtEncounter.enemies.push(randomEnemy.id);
        }
      });
      this.setCurrentEncounter(builtEncounter);
      this.$root.$emit("encounterChosen", builtEncounter);
      this.visible = false;
      this.encountersToChoose = [];
    },
  }
}
</script>

<style lang="less" scoped>
.encounter {
  &__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
  
  &-container {
    position: relative;
    height: 280px;
    width: fit-content;
    padding: 10px;
    text-align: center;
    border-radius: 15px;
    background: #18011a;
    display: inline-block;
    
    &__text {
      margin-bottom: 15px;
      color: #dbdbdb;
      font-size: 25px;
      background: #1b1b1b1f;
    }
  }

  &-card {
    position: relative;
    height: 200px;
    width: 200px;
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