<template>
  <div class="game">
    <div class="game__controls">
      <div class="game__status">
        <h3 class="game__level">
          Уровень: {{ currentLevel + 1 }} / {{ levels.length }}
        </h3>
        <h3 class="game__coins">
          Монеты: {{ coins }}
        </h3>
      </div>
      <p class="game__level-buttons">
        <button
            v-for="level in levels.length"
            :key="level" @click="() => changeLevel(level-1)"
            class="game__level-button">
          Уровень {{level}}
        </button>
      </p>
    </div>
    <div class="game__content">
      <!-- Игровая сетка -->
      <div class="game__grid grid">
        <div
            v-for="(cell, index) in grid"
            :key="index"
            class="grid__cell"
            :class="{
              'grid__cell--road': isRoad(index),
              'grid__cell--road-first': isRoad(index) && isFirstRoadCell(index),
              'grid__cell--road-last': isRoad(index) && isLastRoadCell(index),
              'grid__cell--enemy': enemyPosition === index && enemyHealth > 0,
              'grid__cell--tower': isTower(index),
              'grid__cell--can-place-tower': canPlaceTower(index)
            }"
            @click="() => handleCellClick(index)"
        >
          <EnemyUnit
              v-if="enemyPosition === index && enemyHealth > 0"
              :enemyHealth="enemyHealth"
          />
          <TowerUnit
              v-if="isTower(index)"
              :towerGrade="getTower(index).grade"
              :towerHealth="getTower(index).health"
              :index="index"
          />
        </div>
      </div>
      <div v-if="gameOver" class="game__end game__end--over">Игра окончена!</div>
      <div v-if="enemyDefeated" class="game__end game__end--victory">Враг повержен!</div>
      <div v-if="message && !gameOver && !enemyDefeated" class="game__message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import EnemyUnit from "./EnemyUnit.vue"
import TowerUnit from "./TowerUnit.vue"
export default {
  name: 'GameMap',
  components: {TowerUnit, EnemyUnit},
  data() {
    return {
      rows: 10,
      cols: 10,
    }
  },
  computed: {
    ...mapGetters([
      "coins",
      "currentLevel",
      "levels",
      "enemyDefeated",
      "gameOver",
      "towerCost",
      "upgradeCost",
      "sellRefund",
      "enemyPosition",
      "enemyHealth",
      "attackIntervals",
      "healthIncrease",
      "damageIncrease",
      "fireRateIncrease",
      "rangeIncrease",
      "message",
      "canPlaceTower",
    ]),
    grid() {
      return new Array(this.rows * this.cols).fill(null)
    },
    path() {
      return this.levels[this.currentLevel].path
    },
    towers() {
      return this.levels[this.currentLevel].towers
    },
    buildableCells() {
      return this.levels[this.currentLevel].buildableCells
    }
  },
  methods: {
    ...mapActions([
      "updateCoins",
      "changeCurrentLevel",
      "setEnemyDefeated",
      "setGameOver",
      "setEnemyPosition",
      "setEnemyHealth",
      "pushTower",
      "stopTowerAttacks",
      "startEnemyAttacks",
      "stopEnemyAttacks",
      "moveEnemy",
      "showMessage",
      "startTowerAttacks",
      "placeTower",
      "upgradeTower",
      "deleteTower",
      "changeLevel",
    ]),
    isRoad(index) {
      return this.path.includes(index)
    },
    isTower(index) {
      return this.towers.some(tower => tower.position === index)
    },
    getTower(index) {
      return this.towers.find(tower => tower.position === index)
    },
    isFirstRoadCell(index) {
      return this.path[0] === index
    },
    isLastRoadCell(index) {
      return this.path[this.path.length - 1] === index
    },
    handleCellClick(index) {
      if (this.gameOver || this.enemyDefeated) return // взаимодействие с ячейками после окончания игры запрещено
      if (this.isTower(index)) {
        this.upgradeTower(index)
      } else {
        this.placeTower(index)
      }
    },
  },
  mounted() {
    this.startTowerAttacks()
    this.moveEnemy()
  },
}
</script>

<style lang="less" scoped>
  @import '../less/game.less';
</style>